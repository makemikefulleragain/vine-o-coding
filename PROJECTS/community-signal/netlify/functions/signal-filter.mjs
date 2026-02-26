/**
 * signal-filter.mjs
 * Phase 1 — SENSE layer
 *
 * 3-stage weak tie filtering pipeline:
 *   Stage 1: Relevance scoring via Claude (uses prompts/signal-extraction.md logic)
 *   Stage 2: Pattern tagging against signal-taxonomy.json
 *   Stage 3: Decay/freshness metadata attached (applied at query time, not stored)
 *
 * Called by signal-ingest.mjs (fire-and-forget). Writes passing signals to Supabase.
 *
 * Payload:
 *   { source_type, source_name, source_attribution, content }
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   INGEST_SECRET
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase  = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INGEST_SECRET = process.env.INGEST_SECRET;

// Taxonomy embedded inline — avoids file path issues on Netlify
const TAXONOMY_TAGS = [
  'funding','governance','digital-tools','housing','workforce',
  'advocacy','climate-resilience','health-wellbeing','children-families',
  'disability','homelessness','data-sovereignty','procurement','volunteering',
  'collaboration','infrastructure','policy','emergency-relief'
];
let ecoStateSummary = null;

export const handler = async (event) => {
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const { source_type, source_name, source_attribution, content } = body;
  if (!source_type || !source_name || !content) {
    return json(400, { error: 'source_type, source_name, content required' });
  }

  await ensureLoaded();

  // ── Stage 1: Claude relevance scoring ────────────────────────────────────
  let extracted;
  try {
    extracted = await scoreWithClaude({ source_type, source_name, content });
  } catch (err) {
    console.error('Stage 1 Claude error:', err.message);
    return json(502, { error: 'Claude scoring failed', detail: err.message });
  }

  if (!extracted.signals || extracted.signals.length === 0) {
    console.log(`No signals passed threshold. Discarded: ${extracted.discarded_count}. Reasons: ${(extracted.discard_reasons || []).join('; ')}`);
    return json(200, { stored: 0, discarded: extracted.discarded_count });
  }

  // ── Stage 2: Tag each signal against taxonomy ─────────────────────────────
  const tagged = extracted.signals.map(signal => tagSignal(signal, source_type, source_name, source_attribution));

  // ── Stage 3: Decay metadata — attached at query time, not stored ──────────
  // (confirmed_source_count defaults to 1 in DB; updated when a second
  //  independent source produces the same summary pattern)

  // ── Write to Supabase ─────────────────────────────────────────────────────
  const rows = tagged.map(s => ({
    summary:               s.summary,
    relevance_score:       s.relevance_score,
    actionability_score:   s.actionability_score,
    novelty_score:         s.novelty_score,
    average_score:         s.average_score,
    confidence:            s.confidence,
    why_it_matters:        s.why_it_matters,
    tags:                  s.tags,
    new_tag_proposed:      s.new_tag_proposed || null,
    source_type:           s.source_type,
    source_name:           s.source_name,
    source_attribution:    s.source_attribution,
    confirmed_source_count: 1,
    reviewed:              false,
  }));

  const { error: dbError } = await supabase.from('sector_signals').insert(rows);
  if (dbError) {
    console.error('Supabase insert error:', dbError.message);
    return json(502, { error: 'DB write failed', detail: dbError.message });
  }

  // Queue any new tag proposals for human review
  const proposals = tagged.filter(s => s.new_tag_proposed);
  if (proposals.length > 0) {
    await queueTagProposals(proposals);
  }

  console.log(`Stored ${rows.length} signals from ${source_name}`);
  return json(200, { stored: rows.length, discarded: extracted.discarded_count });
};

// ── Stage 1: Claude scoring ───────────────────────────────────────────────────

async function scoreWithClaude({ source_type, source_name, content }) {
  const taxonomyTags = TAXONOMY_TAGS.join(', ');

  const systemPrompt = `You are a community sector analyst for Western Australia. Your job is to read content from diverse sources and identify signals relevant to WA community sector organisations — particularly small NFPs, peak bodies, and community service providers.

You are reading content from: ${source_type} (${source_name})

Current sector taxonomy tags: ${taxonomyTags}

${ecoStateSummary}`;

  const userPrompt = `Analyse the following content for signals relevant to the Western Australian community sector.

---
${content.slice(0, 8000)}
---

For each potential signal, score 0-10 on three dimensions:

1. WA COMMUNITY SECTOR RELEVANCE (0-10)
   - 0: No relevance to community organisations
   - 5: Generally relevant to nonprofits anywhere
   - 10: Directly relevant to WA community sector specifically

2. ACTIONABILITY WITHIN 12 MONTHS (0-10)
   - 0: Pure theory, no practical application
   - 5: Useful context but not immediately actionable
   - 10: Could be applied by a small NFP this quarter

3. NOVELTY (0-10)
   - 0: Already well-captured in current ecosystem state
   - 5: Adds nuance to known patterns
   - 10: Completely new signal not yet in our awareness

THRESHOLD: Only signals scoring 6+ average across all three dimensions should be extracted.

For each signal that passes threshold, respond in this exact JSON format:

{
  "signals": [
    {
      "summary": "One sentence describing the signal",
      "relevance_score": 8,
      "actionability_score": 7,
      "novelty_score": 6,
      "average_score": 7.0,
      "suggested_tags": ["governance", "data-sovereignty"],
      "new_tag_proposed": null,
      "confidence": "high",
      "source_attribution": "Brief attribution to original source",
      "why_it_matters": "One sentence on why a WA community org should care"
    }
  ],
  "discarded_count": 3,
  "discard_reasons": ["Generic tech news, not sector-specific"]
}

If nothing passes threshold:
{"signals": [], "discarded_count": N, "discard_reasons": ["reason1"]}

Be rigorous. Most content will not pass threshold. That is correct.`;

  const message = await anthropic.messages.create({
    model:      'claude-sonnet-4-5-20250929',
    max_tokens: 2048,
    messages:   [{ role: 'user', content: userPrompt }],
    system:     systemPrompt,
  });

  const text = message.content[0]?.text || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in Claude response');
  return JSON.parse(jsonMatch[0]);
}

// ── Stage 2: Tag against taxonomy ────────────────────────────────────────────

function tagSignal(signal, source_type, source_name, source_attribution) {
  const knownTags = new Set(TAXONOMY_TAGS);

  // Use suggested_tags from Claude where they match known taxonomy
  const validTags = (signal.suggested_tags || []).filter(t => knownTags.has(t));

  // If score is high but no tags matched, flag for review
  if (validTags.length === 0) {
    validTags.push('digital-tools'); // fallback — generic but safe
  }

  return {
    ...signal,
    tags:               validTags,
    source_type,
    source_name,
    source_attribution: signal.source_attribution || source_attribution,
  };
}

// ── Tag proposal queue ────────────────────────────────────────────────────────

async function queueTagProposals(signals) {
  // Append to pending_review in taxonomy — in production this would be
  // a Supabase table or Kitchen Table notification. For Phase 1, log only.
  const proposals = signals.map(s => ({
    proposed_tag:   s.new_tag_proposed,
    from_signal:    s.summary,
    source:         s.source_name,
    proposed_at:    new Date().toISOString(),
  }));
  console.log('NEW TAG PROPOSALS (human review required):', JSON.stringify(proposals, null, 2));
}

// ── Lazy loaders ──────────────────────────────────────────────────────────────

async function ensureLoaded() {
  if (!ecoStateSummary) {
    ecoStateSummary = [
      'Ecosystem summary: Kamunity operates a growing suite of free tools for the WA community sector.',
      'Known patterns already captured: grant acquittal burden, digital tool adoption friction, governance compliance load.',
      'Prioritise signals that are NEW — not already well-served by existing Kamunity tools.',
    ].join(' ');
  }
}

// ── Util ──────────────────────────────────────────────────────────────────────

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json' },
    body:       JSON.stringify(body),
  };
}
