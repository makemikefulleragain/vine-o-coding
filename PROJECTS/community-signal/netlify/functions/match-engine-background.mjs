/**
 * match-engine-background.mjs
 * Phase 3 — MATCH + MAKE layer (BACKGROUND FUNCTION)
 *
 * Triages all PASS patterns against the prosocial tech directory.
 * Triggered by POST /match-engine (202).
 * Results polled via GET /match-engine?mode=library.
 *
 * Security: protected by INGEST_SECRET header.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic     = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

const PROSOCIAL_DIRECTORY = {
  directory_version: '1.0',
  tools: [
    { name: 'CiviCRM', url: 'https://civicrm.org', what_it_does: 'Open-source CRM for nonprofits — contacts, memberships, donations, events, case management.', wa_sector_fit: 7, best_for: ['contact management', 'membership tracking', 'donation processing', 'event management', 'case management'], limitations: 'Setup complexity for small orgs without tech capacity.' },
    { name: 'Loomio', url: 'https://www.loomio.com', what_it_does: 'Collaborative decision-making platform. Proposals, polls, discussions. Designed for democratic governance.', wa_sector_fit: 8, best_for: ['board decisions', 'committee governance', 'member consultation', 'policy discussion'], limitations: 'Adoption requires behaviour change — people default to email.' },
    { name: 'Decidim', url: 'https://decidim.org', what_it_does: 'Participatory democracy platform. Proposals, budgets, assemblies, consultations at scale.', wa_sector_fit: 6, best_for: ['community consultation', 'participatory budgeting', 'strategic planning at scale'], limitations: 'Overkill for small orgs. Setup requires Rails knowledge.' },
    { name: 'Open Food Network', url: 'https://www.openfoodnetwork.org', what_it_does: 'Platform for local food distribution. Online shopfronts, hub management.', wa_sector_fit: 5, best_for: ['food distribution', 'local food systems', 'community food hubs'], limitations: 'Food-specific only.' },
    { name: 'Humanitix', url: 'https://www.humanitix.com', what_it_does: 'Event ticketing platform that donates profits to childrens charities. Australian-founded.', wa_sector_fit: 8, best_for: ['event ticketing', 'fundraising events', 'community events'], limitations: 'Not open source.' },
    { name: 'Tally', url: 'https://tally.so', what_it_does: 'Simple form builder with generous free tier. Replaces Google Forms.', wa_sector_fit: 7, best_for: ['surveys', 'intake forms', 'feedback collection', 'registration forms'], limitations: 'Not open source. Data on their servers.' },
    { name: 'Baserow', url: 'https://baserow.io', what_it_does: 'Open-source Airtable alternative. No-code database with views, forms, automations.', wa_sector_fit: 6, best_for: ['data management', 'volunteer tracking', 'project management', 'inventory'], limitations: 'Self-hosting requires technical capacity.' },
    { name: 'Kamunity Grants Hub', url: 'https://grants-hub.netlify.app', what_it_does: 'Grant acquittal and reporting helper for WA community sector organisations. Built by Kamunity.', wa_sector_fit: 9, best_for: ['grant acquittal', 'grant reporting', 'funder reporting templates'], limitations: 'Early stage — limited to grant reporting use case.' },
    { name: 'Nextcloud', url: 'https://nextcloud.com', what_it_does: 'Self-hosted file storage and collaboration. Google Workspace / Microsoft 365 alternative.', wa_sector_fit: 5, best_for: ['file storage', 'document collaboration', 'replacing Google Workspace'], limitations: 'Requires hosting and maintenance.' },
    { name: 'Loomio Governance Templates', url: 'https://help.loomio.com/en/guides/governance/', what_it_does: 'Free governance templates and guides for boards and committees using Loomio.', wa_sector_fit: 7, best_for: ['governance templates', 'board process guides', 'committee decision templates'], limitations: 'Tied to Loomio platform adoption.' },
  ],
};

export const handler = async (event) => {
  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    console.error('match-engine-background: Unauthorized');
    return;
  }

  const patternId = event.queryStringParameters?.pattern_id;

  console.log('match-engine-background: Starting triage…');

  let patterns;

  if (patternId) {
    const { data, error } = await supabase
      .from('patterns')
      .select('*')
      .eq('id', patternId)
      .single();
    if (error || !data) { console.error('Pattern not found:', patternId); return; }
    patterns = [data];
  } else {
    const { data: allPass, error: pErr } = await supabase
      .from('patterns')
      .select('*')
      .eq('traceability_verdict', 'PASS')
      .in('status', ['ready', 'published']);

    if (pErr) { console.error('DB read failed:', pErr.message); return; }
    if (!allPass || allPass.length === 0) {
      console.log('match-engine-background: No PASS patterns to triage.');
      return;
    }

    const { data: existing } = await supabase
      .from('commons_library')
      .select('pattern_id');
    const existingIds = new Set((existing || []).map(e => e.pattern_id));
    patterns = allPass.filter(p => !existingIds.has(p.id));

    if (patterns.length === 0) {
      console.log('match-engine-background: All PASS patterns already triaged.');
      return;
    }
  }

  console.log(`match-engine-background: ${patterns.length} pattern(s) to triage`);

  let triaged = 0;

  for (const pattern of patterns) {
    try {
      const triage = await runTriage(pattern);
      console.log(`match-engine-background: pattern ${pattern.id} → ${triage.triage_result}`);

      const { error: insErr } = await supabase
        .from('commons_library')
        .insert({
          pattern_id:         pattern.id,
          triage_result:      triage.triage_result,
          triage_reasoning:   triage.reasoning,
          existing_tool:      triage.existing_tool || null,
          existing_tool_fit:  triage.existing_tool_fit || null,
          artifact_type:      triageToArtifactType(triage.triage_result, triage.generation_brief),
          artifact_title:     triage.recommended_action,
          artifact_content:   triage.generation_needed
            ? '(pending — run generate-thing to produce artifact)'
            : `CONNECT to existing tool: ${triage.existing_tool || 'see triage reasoning'}`,
          sector_tags:        pattern.sector_tags,
          target_org_profile: inferOrgProfile(pattern),
          review_status:      'pending',
        });

      if (insErr) {
        console.error(`Insert failed for pattern ${pattern.id}:`, insErr.message);
        continue;
      }

      triaged++;
      console.log(`✓ Triaged pattern ${pattern.id}: ${triage.triage_result} — "${triage.recommended_action}"`);
    } catch (err) {
      console.error(`Triage failed for pattern ${pattern.id}:`, err.message);
    }
  }

  console.log(`match-engine-background: Complete — ${triaged} triaged`);
};

// ── Stage 1: Triage ───────────────────────────────────────────────────────────

async function runTriage(pattern) {
  const directoryJson = JSON.stringify(PROSOCIAL_DIRECTORY.tools, null, 2);
  const orgProfile    = inferOrgProfile(pattern);

  const systemPrompt = `You are a community technology advisor for Western Australia. Your constitutional mandate is:

FIND → CONNECT → EXTEND → INTEGRATE → MAKE

You must check whether something already exists before generating anything new. The community sector does not need more tools. It needs the right tools, found and contextualised.`;

  const userPrompt = `A pattern has been identified from community signals:

PATTERN:
${pattern.summary}

SIGNAL COUNT: ${pattern.signal_count}
SECTOR TAGS: ${pattern.sector_tags.join(', ')}
TYPICAL ORG PROFILE: ${orgProfile}

PROSOCIAL TECH DIRECTORY:
${directoryJson}

---

Apply the triage order:

1. FIND: Does something in the directory already solve this? Check tool descriptions, sector fit scores, and known deployments. If yes → recommend CONNECT with specific tool and contextualisation notes.

2. CONNECT: Can we point to an existing tool and write a brief "how to use this for your situation" guide? If yes → recommend CONNECT with guide outline.

3. EXTEND: Can we build a lightweight bridge to an existing tool? (e.g., a template that feeds into CiviCRM, a guide that maps to Loomio's features) If yes → recommend EXTEND with bridge specification.

4. INTEGRATE: Can we wire an existing tool into the Kamunity ecosystem without rebuilding it? If yes → recommend INTEGRATE with integration spec.

5. MAKE: Only if nothing above works. Specify exactly what needs to be made, why nothing existing fits, and what format would be most useful.

Respond in this exact JSON format:
{
  "triage_result": "FIND|CONNECT|EXTEND|INTEGRATE|MAKE",
  "reasoning": "Why this triage level and not a higher one",
  "existing_tool": "Tool name if applicable, null if MAKE",
  "existing_tool_fit": "What it does well and where it falls short for this specific pattern",
  "recommended_action": "Specific action to take (one sentence)",
  "generation_needed": true,
  "generation_brief": "If generation_needed, what exactly should be generated and in what format"
}

Note: generation_needed is true for all triage levels — even CONNECT needs a contextualisation guide. The difference is whether we generate a new document (MAKE) or a guide to an existing tool (CONNECT/EXTEND).`;

  const msg = await anthropic.messages.create({
    model:      'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userPrompt }],
  });

  const text  = msg.content[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in triage response');
  return JSON.parse(match[0]);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inferOrgProfile(pattern) {
  const tags   = pattern.sector_tags || [];
  const tagStr = tags.length > 0 ? tags.join(', ') : 'community sector';
  return `${tagStr} organisation, WA, small-medium NFP (estimated from signal cohort)`;
}

function triageToArtifactType(triageResult, generationBrief) {
  if (!generationBrief) return 'tool-connection';
  const brief = (generationBrief || '').toLowerCase();
  if (brief.includes('template')) return 'template';
  if (brief.includes('policy'))   return 'policy';
  if (brief.includes('guide') || brief.includes('step')) return 'guide';
  if (brief.includes('bridge') || triageResult === 'EXTEND') return 'bridge';
  if (triageResult === 'MAKE') return 'template';
  return 'tool-connection';
}
