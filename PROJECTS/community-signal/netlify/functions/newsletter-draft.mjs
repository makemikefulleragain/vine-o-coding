/**
 * newsletter-draft.mjs
 * Phase 2 — PROPAGATE layer
 *
 * Generates a weekly newsletter draft from patterns that have passed the
 * traceability test. Kai drafts, human edits, Mike (or Mob member) publishes.
 *
 * Called:
 *   POST /newsletter-draft         — generate drafts for all ready patterns
 *   GET  /newsletter-draft?mode=queue — return patterns queued for human review
 *   POST /newsletter-draft?mode=approve — approve/skip a pattern draft
 *
 * Payload for approve mode:
 *   { pattern_id, action: 'approve'|'skip', review_notes? }
 *
 * Security: protected by INGEST_SECRET header.
 * Constitutional: drafts are NEVER published automatically. Human reviews first.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  const mode = event.queryStringParameters?.mode || 'generate';

  // ── Queue mode: return patterns awaiting human review ─────────────────────
  if (mode === 'queue') {
    const { data, error } = await supabase
      .from('patterns')
      .select('id, summary, sector_tags, signal_count, traceability_verdict, newsletter_draft, substack_draft, linkedin_draft, drafts_generated_at, status, review_notes')
      .in('status', ['ready', 'accumulating'])
      .order('created_at', { ascending: false });

    if (error) return json(502, { error: 'DB read failed', detail: error.message });
    return json(200, { queue: data, count: data.length });
  }

  // ── Approve/skip mode ─────────────────────────────────────────────────────
  if (mode === 'approve' && event.httpMethod === 'POST') {
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }

    const { pattern_id, action, review_notes } = body;
    if (!pattern_id || !['approve', 'skip'].includes(action)) {
      return json(400, { error: 'pattern_id and action ("approve"|"skip") required' });
    }

    const { error } = await supabase
      .from('patterns')
      .update({
        status:       action === 'approve' ? 'published' : 'skipped',
        reviewed:     true,
        reviewed_at:  new Date().toISOString(),
        review_notes: review_notes || null,
        updated_at:   new Date().toISOString(),
      })
      .eq('id', pattern_id);

    if (error) return json(502, { error: 'DB update failed', detail: error.message });
    return json(200, { updated: true, pattern_id, action });
  }

  // ── Generate mode: draft newsletters for ready patterns ───────────────────
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'POST required for generate mode' });
  }

  const { data: patterns, error: pErr } = await supabase
    .from('patterns')
    .select('*')
    .eq('traceability_verdict', 'PASS')
    .eq('status', 'ready')
    .is('drafts_generated_at', null);

  if (pErr) return json(502, { error: 'DB read failed', detail: pErr.message });

  if (!patterns || patterns.length === 0) {
    return json(200, { message: 'No patterns ready for drafting', drafted: 0 });
  }

  let drafted = 0;
  const results = [];

  for (const pattern of patterns) {
    try {
      const drafts = await generateDrafts(pattern);

      const { error: upErr } = await supabase
        .from('patterns')
        .update({
          newsletter_draft:     drafts.newsletter,
          substack_draft:       drafts.substack,
          linkedin_draft:       drafts.linkedin,
          drafts_generated_at:  new Date().toISOString(),
          updated_at:           new Date().toISOString(),
        })
        .eq('id', pattern.id);

      if (!upErr) {
        drafted++;
        results.push({ pattern_id: pattern.id, summary: pattern.summary });
        console.log(`Drafted content for pattern ${pattern.id}`);
      }
    } catch (err) {
      console.error(`Draft generation failed for pattern ${pattern.id}:`, err.message);
    }
  }

  return json(200, { drafted, results });
};

// ── Generate newsletter, Substack, and LinkedIn drafts ────────────────────────

async function generateDrafts(pattern) {
  const tagList = (pattern.sector_tags || []).join(', ');
  const signalCount = pattern.signal_count;

  const systemPrompt = `You are Kai, the Kamunity AI assistant for WA community sector organisations. You draft weekly sector intelligence content that is:
- Practically useful to NFP ops coordinators and community service managers
- Honest about what we know and don't know
- Non-extractive — the signal belongs to the sector, not to Kamunity
- Concise and plainly written (no jargon, no hype)
- Never traceable to individual organisations`;

  const userPrompt = `Generate three content pieces from this sector pattern:

PATTERN: "${pattern.summary}"
SECTOR TAGS: ${tagList}
SIGNAL COUNT: ${signalCount} independent signals
TRACEABILITY: PASS (safe to publish — pattern is not traceable to any individual org)

Generate:

1. NEWSLETTER BLURB (80-120 words)
   Format: One paragraph for a weekly sector pulse newsletter. Include: what the pattern is, why it matters right now, one practical suggestion for community orgs. Do NOT name specific organisations. Write in second person ("your organisation", "community orgs").

2. SUBSTACK POST (200-300 words)
   Format: Titled short post. Include: context paragraph, what the pattern means for the WA sector, one concrete recommendation, a closing question for readers to reflect on. Tone: warm, direct, knowledgeable. Not academic. Not promotional.

3. LINKEDIN ONE-LINER (max 40 words)
   Format: One compelling sentence that an NFP ops coordinator would stop scrolling for. Include the pattern insight. End with a question or call to think. No hashtags in the text (add them separately).

Respond in this exact JSON format:
{
  "newsletter": "...",
  "substack_title": "...",
  "substack": "...",
  "linkedin": "..."
}`;

  const msg = await anthropic.messages.create({
    model:      'claude-sonnet-4-5-20250929',
    max_tokens: 2048,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userPrompt }],
  });

  const text = msg.content[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in Claude draft response');
  const parsed = JSON.parse(match[0]);

  return {
    newsletter: parsed.newsletter,
    substack:   parsed.substack_title ? `# ${parsed.substack_title}\n\n${parsed.substack}` : parsed.substack,
    linkedin:   parsed.linkedin,
  };
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
