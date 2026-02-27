/**
 * pattern-detect-background.mjs
 * Phase 2 — PROPAGATE layer (BACKGROUND FUNCTION)
 *
 * Netlify Background Function — returns 202 immediately, runs up to 15 minutes.
 * Triggered by cs-proxy.mjs in kitchen-table when user clicks "Detect patterns".
 * Results are read back via GET /pattern-detect?mode=patterns.
 *
 * What it does:
 *   1. Loads unpatternated signals from BOTH sector_signals (RSS/email ingest) and
 *      community_signals (Kai bilateral), normalises column names.
 *   2. Asks Claude to group signals into patterns.
 *   3. Runs traceability test on each group.
 *   4. Creates or updates patterns in the patterns table.
 *   5. Links signals back to their source table with the pattern_id.
 *   6. Matches community_offers to patterns.
 *
 * Security: protected by INGEST_SECRET header.
 * No personal data — all signals are anonymised at point of entry.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

export const handler = async (event) => {
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    console.error('pattern-detect-background: Unauthorized');
    return;
  }

  console.log('pattern-detect-background: Starting detection pass…');

  // 1. Load unpatternated signals from BOTH tables
  const [sectorRes, communityRes] = await Promise.all([
    supabase.from('sector_signals').select('*').is('pattern_id', null).eq('reviewed', true).order('created_at', { ascending: true }),
    supabase.from('community_signals').select('*').is('pattern_id', null).order('created_at', { ascending: true }),
  ]);

  if (sectorRes.error)    { console.error('DB read failed (sector_signals):', sectorRes.error.message); return; }
  if (communityRes.error) { console.error('DB read failed (community_signals):', communityRes.error.message); return; }

  // Normalise sector_signals columns to match community_signals shape
  const normalisedSector = (sectorRes.data || []).map(s => ({
    ...s,
    need_summary:  s.summary,
    sector_tags:   s.tags,
    _source_table: 'sector_signals',
  }));
  const normalisedCommunity = (communityRes.data || []).map(s => ({
    ...s,
    _source_table: 'community_signals',
  }));

  const signals = [...normalisedSector, ...normalisedCommunity];

  if (signals.length === 0) {
    console.log('pattern-detect-background: No unprocessed signals found.');
    return;
  }

  console.log(`pattern-detect-background: ${signals.length} signals to process (${normalisedSector.length} sector, ${normalisedCommunity.length} community)`);

  // 2. Load existing accumulating patterns to check for new contributions
  const { data: existingPatterns } = await supabase
    .from('patterns')
    .select('*')
    .eq('status', 'accumulating');

  // 3. Ask Claude to group signals into patterns (chunked to avoid response truncation on large datasets)
  const CHUNK_SIZE = 25;
  const allGroups = [];
  for (let i = 0; i < signals.length; i += CHUNK_SIZE) {
    const chunk = signals.slice(i, i + CHUNK_SIZE);
    console.log(`pattern-detect-background: grouping chunk ${Math.floor(i/CHUNK_SIZE)+1}/${Math.ceil(signals.length/CHUNK_SIZE)} (${chunk.length} signals)…`);
    const result = await groupSignalsWithClaude(chunk, existingPatterns || []);
    if (result?.groups) allGroups.push(...result.groups);
    else console.warn(`pattern-detect-background: chunk ${Math.floor(i/CHUNK_SIZE)+1} grouping returned null — skipping`);
  }
  const grouped = { groups: allGroups };
  if (allGroups.length === 0) { console.error('pattern-detect-background: all chunks failed grouping'); return; }

  let patternsCreated = 0;
  let patternsUpdated = 0;

  for (const group of grouped.groups) {
    const signalIds  = group.signal_ids;
    const contributing = signals.filter(s => signalIds.includes(s.id));
    if (contributing.length === 0) continue;

    const allTags = [...new Set(contributing.flatMap(s => s.sector_tags || s.tags || []))];
    const earliest = contributing.reduce((a, b) => a.created_at < b.created_at ? a : b).created_at;
    const latest   = contributing.reduce((a, b) => a.created_at > b.created_at ? a : b).created_at;

    // 4. Run traceability test
    const traceResult = await runTraceabilityTest({
      pattern_summary: group.pattern_summary,
      signal_count:    contributing.length,
      sector_tags:     allTags,
      earliest_signal: earliest,
      latest_signal:   latest,
      output_type:     'newsletter mention',
      output_summary:  group.pattern_summary,
    });

    // 5. Check if this matches an existing pattern
    const matchedPattern = findMatchingPattern(group.pattern_summary, existingPatterns || []);

    if (matchedPattern) {
      const { error: upErr } = await supabase
        .from('patterns')
        .update({
          signal_count:            matchedPattern.signal_count + contributing.length,
          latest_signal_at:        latest,
          sector_tags:             [...new Set([...matchedPattern.sector_tags, ...allTags])],
          traceability_verdict:    traceResult.verdict,
          traceability_reasoning:  traceResult,
          traceability_checked_at: new Date().toISOString(),
          updated_at:              new Date().toISOString(),
        })
        .eq('id', matchedPattern.id);

      if (!upErr) {
        await linkSignalsToPattern(signals, signalIds, matchedPattern.id, traceResult);
        patternsUpdated++;
        console.log(`✓ Updated pattern ${matchedPattern.id}: "${matchedPattern.summary}" (verdict: ${traceResult.verdict}, +${contributing.length} signals)`);
      } else {
        console.error(`DB update failed for pattern ${matchedPattern.id}:`, upErr.message);
      }
    } else {
      const { data: newPattern, error: insErr } = await supabase
        .from('patterns')
        .insert({
          summary:                 group.pattern_summary,
          sector_tags:             allTags,
          signal_count:            contributing.length,
          earliest_signal_at:      earliest,
          latest_signal_at:        latest,
          traceability_verdict:    traceResult.verdict,
          traceability_reasoning:  traceResult,
          traceability_checked_at: new Date().toISOString(),
          status:                  traceResult.verdict === 'PASS' ? 'ready' : 'accumulating',
        })
        .select('id')
        .single();

      if (!insErr && newPattern) {
        await linkSignalsToPattern(signals, signalIds, newPattern.id, traceResult);
        patternsCreated++;
        console.log(`✓ Created pattern ${newPattern.id}: "${group.pattern_summary}" (verdict: ${traceResult.verdict}, ${contributing.length} signals)`);
      } else {
        console.error('DB insert failed for new pattern:', insErr?.message);
      }
    }
  }

  // 6. Match offers to patterns
  await matchOffers();

  console.log(`pattern-detect-background: Complete — ${patternsCreated} created, ${patternsUpdated} updated`);
};

// ── Claude: group signals into patterns ────────────────────────────────────────

async function groupSignalsWithClaude(signals, existingPatterns) {
  const signalList = signals.map((s, i) =>
    `[${i}] ID:${s.id} | Tags:${(s.sector_tags || []).join(',')} | Need:"${s.need_summary}"`
  ).join('\n');

  const existingList = existingPatterns.length > 0
    ? '\n\nEXISTING PATTERNS (check if any new signals belong to these):\n' +
      existingPatterns.map(p => `- ${p.id}: "${p.summary}" (${p.signal_count} signals, tags: ${(p.sector_tags || []).join(',')})`).join('\n')
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
    const text  = msg.content[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON in response');
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Claude grouping error:', err.message);
    return null;
  }
}

// ── Traceability test ──────────────────────────────────────────────────────────

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
    const text  = msg.content[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON in traceability response');
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Traceability test error:', err.message);
    return { verdict: 'REVIEW', confidence: 'low', recommendation: 'Traceability test failed to run — human review required', mitigation: 'Re-run pattern detection' };
  }
}

// ── Pattern matching (tag overlap + summary similarity) ───────────────────────

function findMatchingPattern(summary, existingPatterns) {
  if (!existingPatterns || existingPatterns.length === 0) return null;
  const words = new Set(summary.toLowerCase().split(/\W+/).filter(w => w.length > 4));
  for (const p of existingPatterns) {
    const pWords  = new Set(p.summary.toLowerCase().split(/\W+/).filter(w => w.length > 4));
    const overlap = [...words].filter(w => pWords.has(w)).length;
    if (overlap >= 3) return p;
  }
  return null;
}

// ── Write pattern_id back to correct source table ─────────────────────────────

async function linkSignalsToPattern(allSignals, signalIds, patternId, traceResult) {
  const sectorIds    = allSignals.filter(s => signalIds.includes(s.id) && s._source_table === 'sector_signals').map(s => s.id);
  const communityIds = allSignals.filter(s => signalIds.includes(s.id) && s._source_table === 'community_signals').map(s => s.id);

  await Promise.allSettled([
    sectorIds.length > 0
      ? supabase.from('sector_signals').update({ pattern_id: patternId }).in('id', sectorIds)
      : Promise.resolve(),
    communityIds.length > 0
      ? supabase.from('community_signals').update({ pattern_id: patternId, traceability_verdict: traceResult.verdict, traceability_reasoning: traceResult }).in('id', communityIds)
      : Promise.resolve(),
  ]);
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
      p.sector_tags.some(t => (offer.sector_tags || []).includes(t))
    );
    if (tagMatch) {
      await supabase
        .from('community_offers')
        .update({ matched_signal_id: tagMatch.id, match_confidence: 'medium' })
        .eq('id', offer.id);
    }
  }
}
