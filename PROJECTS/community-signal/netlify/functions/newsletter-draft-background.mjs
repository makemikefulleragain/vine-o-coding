/**
 * newsletter-draft-background.mjs
 * Phase 2 — PROPAGATE layer (BACKGROUND FUNCTION)
 *
 * Generates newsletter, Substack, and LinkedIn drafts for all PASS patterns
 * that haven't been drafted yet. Triggered by POST /newsletter-draft (202).
 * Results polled via GET /newsletter-draft?mode=queue.
 *
 * Security: protected by INGEST_SECRET header.
 * Constitutional: drafts are NEVER published automatically. Human reviews first.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

export const handler = async (event) => {
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    console.error('newsletter-draft-background: Unauthorized');
    return;
  }

  console.log('newsletter-draft-background: Starting draft generation…');

  const { data: patterns, error: pErr } = await supabase
    .from('patterns')
    .select('*')
    .eq('traceability_verdict', 'PASS')
    .eq('status', 'ready')
    .is('drafts_generated_at', null);

  if (pErr) { console.error('DB read failed:', pErr.message); return; }

  if (!patterns || patterns.length === 0) {
    console.log('newsletter-draft-background: No patterns ready for drafting.');
    return;
  }

  console.log(`newsletter-draft-background: ${patterns.length} pattern(s) to draft`);

  let drafted = 0;

  for (const pattern of patterns) {
    try {
      const drafts = await generateDrafts(pattern);

      const { error: upErr } = await supabase
        .from('patterns')
        .update({
          newsletter_draft:    drafts.newsletter,
          substack_draft:      drafts.substack,
          linkedin_draft:      drafts.linkedin,
          drafts_generated_at: new Date().toISOString(),
          updated_at:          new Date().toISOString(),
        })
        .eq('id', pattern.id);

      if (!upErr) {
        drafted++;
        console.log(`✓ Drafted content for pattern ${pattern.id}: "${pattern.summary.slice(0, 60)}…"`);
      } else {
        console.error(`DB update failed for pattern ${pattern.id}:`, upErr.message);
      }
    } catch (err) {
      console.error(`Draft generation failed for pattern ${pattern.id}:`, err.message);
    }
  }

  console.log(`newsletter-draft-background: Complete — ${drafted} drafted`);
};

// ── Generate newsletter, Substack, and LinkedIn drafts ────────────────────────

async function generateDrafts(pattern) {
  const tagList     = (pattern.sector_tags || []).join(', ');
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

  const text  = msg.content[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in Claude draft response');
  const parsed = JSON.parse(match[0]);

  return {
    newsletter: parsed.newsletter,
    substack:   parsed.substack_title ? `# ${parsed.substack_title}\n\n${parsed.substack}` : parsed.substack,
    linkedin:   parsed.linkedin,
  };
}
