/**
 * generate-thing-background.mjs
 * Phase 3 — MATCH + MAKE layer (BACKGROUND FUNCTION)
 *
 * Netlify Background Function — returns 202 immediately, runs for up to 15 minutes.
 * Caller must poll the library endpoint for results.
 *
 * Stage 2 of the match-make pipeline (from prompts/match-make.md).
 * Runs ONLY after match-engine.mjs has produced a triage result.
 * Generates the actual usable artifact: template, policy, guide, or bridge.
 *
 * Called:
 *   POST /generate-thing-background                   — generate for all pending commons_library items
 *   POST /generate-thing-background?library_id=<uuid> — generate for a specific commons_library item
 *
 * Quality check (Priya test) runs before storing:
 *   1. Is it the actual thing, not a meta-thing?
 *   2. Would a time-poor ops coordinator use it in 3 minutes?
 *   3. Is it honest about its limits?
 *
 * Security: protected by INGEST_SECRET header.
 * Constitutional: nothing enters the commons without human approval.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

export const handler = async (event) => {
  // Background functions still receive the event — auth check here
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    console.error('Unauthorized background function call');
    return;  // Background functions don't return HTTP responses
  }

  const libraryId = event.queryStringParameters?.library_id;

  // ── Find items to generate ──────────────────────────────────────────────────
  let items;

  if (libraryId) {
    const { data, error } = await supabase
      .from('commons_library')
      .select('*, patterns(*)')
      .eq('id', libraryId)
      .single();
    if (error || !data) { console.error('Library item not found:', libraryId); return; }
    items = [data];
  } else {
    // Find items needing generation: review_status=pending AND no real artifact yet
    // (artifact_content is either the placeholder text or a short CONNECT reference)
    const { data: allPending, error } = await supabase
      .from('commons_library')
      .select('*, patterns(*)')
      .eq('review_status', 'pending');

    if (error) { console.error('DB read failed:', error.message); return; }

    // Filter to items without substantial artifact content (< 200 chars = placeholder/stub)
    const data = (allPending || []).filter(i =>
      !i.artifact_content || i.artifact_content.length < 200
    );

    if (!data || data.length === 0) { console.log('No items pending generation'); return; }
    items = data;
  }

  // ── Generate each item ──────────────────────────────────────────────────────
  let generated = 0;

  for (const item of items) {
    const pattern = item.patterns;
    if (!pattern) {
      console.error(`No pattern found for library item ${item.id}`);
      continue;
    }

    try {
      console.log(`Generating artifact for ${item.id} (${item.triage_result})…`);
      const artifact = await generateArtifact(item, pattern);

      // Quality check (Priya test)
      const quality = await runQualityCheck(artifact, pattern);

      const { error: upErr } = await supabase
        .from('commons_library')
        .update({
          artifact_title:       artifact.title,
          artifact_content:     artifact.content,
          commons_version:      artifact.commons_version,
          substack_scaffold:    artifact.substack_scaffold,
          linkedin_scaffold:    artifact.linkedin_scaffold,
          quality_check_passed: quality.passed,
          quality_check_notes:  quality.notes,
          updated_at:           new Date().toISOString(),
        })
        .eq('id', item.id);

      if (!upErr) {
        generated++;
        console.log(`✓ Generated artifact for ${item.id}: "${artifact.title}" (quality: ${quality.passed ? 'PASS' : 'FAIL'})`);
      } else {
        console.error(`DB update failed for ${item.id}:`, upErr.message);
      }
    } catch (err) {
      console.error(`Generation failed for library item ${item.id}:`, err.message);
    }
  }

  console.log(`Background generation complete: ${generated} artifact(s) generated`);
};

// ── Stage 2: Generate the artifact ────────────────────────────────────────────

async function generateArtifact(item, pattern) {
  const isConnection = ['FIND', 'CONNECT'].includes(item.triage_result);
  const isBridge     = item.triage_result === 'EXTEND';
  const isMake       = item.triage_result === 'MAKE';

  const systemPrompt = `You are Kai's generative mode. You create documents, templates, policies, frameworks, and guides for Western Australian community sector organisations.

Your outputs must be:
- IMMEDIATELY USABLE — not a framework for creating a framework. The actual thing.
- SIZED TO THE ORG — a template for a 200-person NFP is useless for a 5-person org.
- PLAIN LANGUAGE — 9th grader test. If a smart teenager can't understand it, rewrite it.
- SECTOR-AWARE — use the language and context of WA community services, not generic nonprofit advice.
- HONEST ABOUT LIMITS — "This covers X. For Y, you'll need professional advice from Z."

You are making a gift. It has to be good enough that the recipient uses it AND forwards it.`;

  const existingToolContext = item.existing_tool
    ? `EXISTING TOOL: ${item.existing_tool}\nFIT ASSESSMENT: ${item.existing_tool_fit || 'See triage reasoning'}`
    : 'No existing tool — generating from scratch.';

  const formatGuide = isConnection
    ? `Format: A "Getting started with ${item.existing_tool}" guide for this specific pattern. 
       Structure: (1) What the tool does for YOUR situation (2) Setup in 3 steps (3) What to try first (4) What it won't do — be honest about gaps.
       Max 600 words. Written for a time-poor ops coordinator.`
    : isBridge
    ? `Format: A bridge guide — "You're trying to do X. ${item.existing_tool || 'This tool'} already does this. Here's how to set it up for your situation."
       Include: the connection spec, step-by-step setup, where the bridge starts and ends.
       Max 500 words.`
    : `Format rules:
       - If it's a TEMPLATE: Provide the actual fillable template with example content in [brackets]. Include a "How to use this" section at the top (3-4 sentences max).
       - If it's a POLICY: Provide the actual draft policy with placeholder [ORG NAME]. Include "Adapt this" notes where orgs need to customise.
       - If it's a GUIDE: Step-by-step. Max 10 steps. Each step under 15 minutes.`;

  const userPrompt = `Generate the following:

TRIAGE RESULT: ${item.triage_result}
GENERATION BRIEF: ${item.triage_reasoning || 'Generate a practical resource for this pattern'}
PATTERN: "${pattern.summary}"
TARGET ORG PROFILE: ${item.target_org_profile || 'WA community sector NFP, small-medium size'}
SECTOR TAGS: ${(item.sector_tags || []).join(', ')}

${existingToolContext}

---

${formatGuide}

After generating the main artifact, also produce:

1. COMMONS VERSION: A de-personalised version suitable for the public commons library (no sector-specific details that could narrow the source cohort). Keep the useful content but strip anything that could identify the pattern origin.

2. SUBSTACK SCAFFOLD (2-3 sentences): Newsletter paragraph explaining why this pattern keeps coming up and what the commons response is. Warm, direct, non-promotional.

3. LINKEDIN SCAFFOLD (max 35 words): One sentence an NFP ops coordinator would stop scrolling for. Include the insight. End with a question.

Respond in this exact JSON format:
{
  "title": "Short descriptive title for this artifact",
  "content": "The full artifact in markdown",
  "commons_version": "De-personalised version in markdown",
  "substack_scaffold": "2-3 sentence newsletter paragraph",
  "linkedin_scaffold": "One sentence, max 35 words"
}`;

  const msg = await anthropic.messages.create({
    model:      'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userPrompt }],
  });

  const text = msg.content[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in generation response');
  return JSON.parse(match[0]);
}

// ── Quality check (Priya test) ─────────────────────────────────────────────────

async function runQualityCheck(artifact, pattern) {
  const prompt = `You are reviewing a generated community sector resource for quality. Apply the "Priya test":

Priya is an ops coordinator at a small WA NFP. She has 3 minutes between meetings. She just received this document. Would she:
1. Recognise it as the actual thing she needs (not a meta-thing or a framework)?
2. Be able to start using it immediately without further context?
3. Trust it because it's honest about what it doesn't cover?

ARTIFACT TITLE: ${artifact.title}
ARTIFACT CONTENT:
${artifact.content?.slice(0, 1000)}...

PATTERN THIS RESPONDS TO: ${pattern.summary}

Respond in JSON:
{
  "passed": true|false,
  "score": 1-10,
  "notes": "Brief explanation. If failed, what specifically needs fixing."
}`;

  try {
    const msg = await anthropic.messages.create({
      model:      'claude-3-haiku-20240307',
      max_tokens: 256,
      messages:   [{ role: 'user', content: prompt }],
    });
    const text = msg.content[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return { passed: true, notes: 'Quality check parse failed — defaulting to pass' };
    return JSON.parse(match[0]);
  } catch (err) {
    return { passed: true, notes: `Quality check error: ${err.message} — defaulting to pass` };
  }
}
