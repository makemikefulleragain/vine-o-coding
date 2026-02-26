/**
 * pattern-detect.mjs
 * Phase 2 — PROPAGATE layer
 *
 * Aggregates community_signals into patterns, runs the traceability test
 * (from prompts/traceability-test.md), and writes patterns to the patterns table.
 * Also matches community_offers to patterns.
 *
 * Called:
 *   GET  /pattern-detect          — run detection pass, return summary
 *   GET  /pattern-detect?mode=patterns — return existing patterns for Kitchen Table
 *
 * Security: protected by INGEST_SECRET header.
 * No personal data — all signals are already anonymised at point of entry.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic    = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase     = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
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

  const mode = event.queryStringParameters?.mode || 'detect';

  // ── Read mode: return existing patterns for Kitchen Table ─────────────────
  if (mode === 'patterns') {
    const { data, error } = await supabase
      .from('patterns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return json(502, { error: 'DB read failed', detail: error.message });

    return json(200, { patterns: data, count: data.length });
  }

  // ── Detection pass ─────────────────────────────────────────────────────────
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  // 1. Load unpatternated signals (no pattern_id yet, PENDING traceability)
  const { data: signals, error: sigErr } = await supabase
    .from('community_signals')
    .select('*')
    .is('pattern_id', null)
    .order('created_at', { ascending: true });

  if (sigErr) return json(502, { error: 'DB read failed', detail: sigErr.message });

  if (!signals || signals.length === 0) {
    return json(200, { message: 'No unprocessed signals', patterns_created: 0 });
  }

  // 2. Also load existing accumulating patterns to check for new contributions
  const { data: existingPatterns } = await supabase
    .from('patterns')
    .select('*')
    .eq('status', 'accumulating');

  // 3. Ask Claude to group signals into patterns
  const grouped = await groupSignalsWithClaude(signals, existingPatterns || []);
  if (!grouped) return json(502, { error: 'Claude grouping failed' });

  let patternsCreated = 0;
  let patternsUpdated = 0;
  const results = [];

  for (const group of grouped.groups) {
    const signalIds = group.signal_ids;
    const contributing = signals.filter(s => signalIds.includes(s.id));
    if (contributing.length === 0) continue;

    const allTags = [...new Set(contributing.flatMap(s => s.sector_tags))];
    const earliest = contributing.reduce((a, b) => a.created_at < b.created_at ? a : b).created_at;
    const latest   = contributing.reduce((a, b) => a.created_at > b.created_at ? a : b).created_at;

    // 4. Run traceability test
    const traceResult = await runTraceabilityTest({
      pattern_summary:  group.pattern_summary,
      signal_count:     contributing.length,
      sector_tags:      allTags,
      earliest_signal:  earliest,
      latest_signal:    latest,
      output_type:      'newsletter mention',
      output_summary:   group.pattern_summary,
    });

    // 5. Check if this matches an existing pattern
    const matchedPattern = findMatchingPattern(group.pattern_summary, existingPatterns || []);

    if (matchedPattern) {
      // Update existing pattern
      const { error: upErr } = await supabase
        .from('patterns')
        .update({
          signal_count:              matchedPattern.signal_count + contributing.length,
          latest_signal_at:          latest,
          sector_tags:               [...new Set([...matchedPattern.sector_tags, ...allTags])],
          traceability_verdict:      traceResult.verdict,
          traceability_reasoning:    traceResult,
          traceability_checked_at:   new Date().toISOString(),
          updated_at:                new Date().toISOString(),
        })
        .eq('id', matchedPattern.id);

      if (!upErr) {
        // Link signals to this pattern
        await supabase
          .from('community_signals')
          .update({ pattern_id: matchedPattern.id, traceability_verdict: traceResult.verdict, traceability_reasoning: traceResult })
          .in('id', signalIds);
        patternsUpdated++;
        results.push({ pattern_id: matchedPattern.id, action: 'updated', verdict: traceResult.verdict, signals: contributing.length });
      }
    } else {
      // Create new pattern
      const { data: newPattern, error: insErr } = await supabase
        .from('patterns')
        .insert({
          summary:                   group.pattern_summary,
          sector_tags:               allTags,
          signal_count:              contributing.length,
          earliest_signal_at:        earliest,
          latest_signal_at:          latest,
          traceability_verdict:      traceResult.verdict,
          traceability_reasoning:    traceResult,
          traceability_checked_at:   new Date().toISOString(),
          status:                    traceResult.verdict === 'PASS' ? 'ready' : 'accumulating',
        })
        .select('id')
        .single();

      if (!insErr && newPattern) {
        // Link signals to this new pattern
        await supabase
          .from('community_signals')
          .update({ pattern_id: newPattern.id, traceability_verdict: traceResult.verdict, traceability_reasoning: traceResult })
          .in('id', signalIds);
        patternsCreated++;
        results.push({ pattern_id: newPattern.id, action: 'created', verdict: traceResult.verdict, signals: contributing.length });
      }
    }
  }

  // 6. Match offers to patterns
  await matchOffers();

  console.log(`Pattern detection complete: ${patternsCreated} created, ${patternsUpdated} updated`);
  return json(200, {
    signals_processed: signals.length,
    patterns_created:  patternsCreated,
    patterns_updated:  patternsUpdated,
    results,
  });
};

// ── Claude: group signals into patterns ───────────────────────────────────────

async function groupSignalsWithClaude(signals, existingPatterns) {
  const signalList = signals.map((s, i) =>
    `[${i}] ID:${s.id} | Tags:${s.sector_tags.join(',')} | Need:"${s.need_summary}"`
  ).join('\n');

  const existingList = existingPatterns.length > 0
    ? '\n\nEXISTING PATTERNS (check if any new signals belong to these):\n' +
      existingPatterns.map(p => `- ${p.id}: "${p.summary}" (${p.signal_count} signals, tags: ${p.sector_tags.join(',')})`).join('\n')
    : '';

  const prompt = `You are analysing anonymous community sector signals from Western Australia to identify emerging patterns.

SIGNALS TO ANALYSE:
${signalList}${existingList}

Group these signals into patterns. A pattern requires at least 2 signals pointing to the same underlying need. Single signals with no match can form a singleton group.

For each group, write a pattern summary that:
- Is generalised (no org-specific detail)
- Describes the structural need, not the individual instance
- Is safe to discuss publicly at sector level

Respond in this exact JSON format:
{
  "groups": [
    {
      "signal_ids": ["uuid1", "uuid2"],
      "pattern_summary": "One generalised sentence describing the pattern",
      "primary_tags": ["tag1", "tag2"]
    }
  ]
}

Only group signals that genuinely share the same underlying pattern. When in doubt, keep them separate.`;

  try {
    const msg = await anthropic.messages.create({
      model:      'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages:   [{ role: 'user', content: prompt }],
    });
    const text = msg.content[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON in response');
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Claude grouping error:', err.message);
    return null;
  }
}

// ── Traceability test (from prompts/traceability-test.md) ─────────────────────

async function runTraceabilityTest({ pattern_summary, signal_count, sector_tags, earliest_signal, latest_signal, output_type, output_summary }) {
  const prompt = `Assess the following pattern for traceability risk before publication.

PATTERN SUMMARY:
${pattern_summary}

NUMBER OF INDEPENDENT SIGNALS:
${signal_count}

SECTOR TAGS:
${sector_tags.join(', ')}

SIGNAL TIMESPAN:
${earliest_signal} to ${latest_signal}

PROPOSED OUTPUT TYPE:
${output_type}

PROPOSED OUTPUT CONTENT SUMMARY:
${output_summary}

---

Assess on these dimensions:

1. COHORT SIZE: How many organisations operate in this sector/region combination? If the cohort is small (under 20), traceability risk is elevated regardless of signal count.

2. SPECIFICITY: How specific is the pattern? "Small NFPs need help with grant reporting" is low specificity (safe). A named service type in a specific region with a small cohort is high specificity (dangerous).

3. TIMING CORRELATION: Could the publication timing correlate with a known event, incident, or public crisis that would narrow the source?

4. INFERENCE CHAIN: Could a knowledgeable sector insider, seeing this publication, plausibly reason backwards to identify which organisation(s) triggered it?

5. SENSITIVITY: Does the topic involve crisis services, child protection, mental health, organisational failure, or other sensitive domains where identification could cause harm? If in doubt about sensitivity — treat as high risk.

Respond in this exact JSON format:
{
  "verdict": "PASS|FAIL|REVIEW",
  "confidence": "high|medium|low",
  "risk_dimensions": {
    "cohort_size": {"risk": "low|medium|high", "reasoning": "..."},
    "specificity": {"risk": "low|medium|high", "reasoning": "..."},
    "timing_correlation": {"risk": "low|medium|high", "reasoning": "..."},
    "inference_chain": {"risk": "low|medium|high", "reasoning": "..."},
    "sensitivity": {"risk": "low|medium|high", "reasoning": "..."}
  },
  "recommendation": "One sentence recommendation",
  "mitigation": "If FAIL or REVIEW, what would need to change for this to become PASS"
}

VERDICT RULES:
- Any dimension rated "high" risk → FAIL
- Two or more dimensions rated "medium" → REVIEW (human decides)
- All dimensions "low" → PASS
- Sensitivity domain (crisis services, child protection, mental health) → automatically elevate all other dimensions by one level`;

  try {
    const msg = await anthropic.messages.create({
      model:      'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }],
    });
    const text = msg.content[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON in traceability response');
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Traceability test error:', err.message);
    // Default to REVIEW on error — conservative
    return { verdict: 'REVIEW', confidence: 'low', recommendation: 'Traceability test failed to run — human review required', mitigation: 'Re-run pattern detection' };
  }
}

// ── Simple pattern matching (tag overlap + summary similarity) ────────────────

function findMatchingPattern(summary, existingPatterns) {
  if (!existingPatterns || existingPatterns.length === 0) return null;
  const words = new Set(summary.toLowerCase().split(/\W+/).filter(w => w.length > 4));
  for (const p of existingPatterns) {
    const pWords = new Set(p.summary.toLowerCase().split(/\W+/).filter(w => w.length > 4));
    const overlap = [...words].filter(w => pWords.has(w)).length;
    if (overlap >= 3) return p; // 3+ meaningful words in common = same pattern
  }
  return null;
}

// ── Match offers to patterns ───────────────────────────────────────────────────

async function matchOffers() {
  const { data: offers } = await supabase
    .from('community_offers')
    .select('*')
    .is('matched_signal_id', null);

  if (!offers || offers.length === 0) return;

  const { data: patterns } = await supabase
    .from('patterns')
    .select('id, summary, sector_tags')
    .in('status', ['ready', 'accumulating']);

  if (!patterns || patterns.length === 0) return;

  for (const offer of offers) {
    const tagMatch = patterns.find(p =>
      p.sector_tags.some(t => offer.sector_tags.includes(t))
    );
    if (tagMatch) {
      await supabase
        .from('community_offers')
        .update({ matched_signal_id: tagMatch.id, match_confidence: 'medium' })
        .eq('id', offer.id);
    }
  }
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
