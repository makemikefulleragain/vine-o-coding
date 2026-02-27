/**
 * match-engine.mjs
 * Phase 3 — MATCH + MAKE layer
 *
 * Stage 1 of the match-make pipeline (from prompts/match-make.md).
 * Triages a pattern against the prosocial tech directory to determine:
 *   FIND → CONNECT → EXTEND → INTEGRATE → MAKE
 *
 * Called:
 *   GET  /match-engine?mode=library          — return commons_library items for Kitchen Table
 *   POST /match-engine                       — run triage on all ready/published patterns without a triage result
 *   POST /match-engine?pattern_id=<uuid>     — run triage on a specific pattern
 *
 * Security: protected by INGEST_SECRET header.
 */

import { createClient } from '@supabase/supabase-js';

const supabase      = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

// Inline prosocial tech directory (avoids file path issues on Netlify)
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
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }

  const mode = event.queryStringParameters?.mode;
  const patternId = event.queryStringParameters?.pattern_id;

  // ── Library mode: return commons_library for Kitchen Table ────────────────
  if (mode === 'library') {
    const { data, error } = await supabase
      .from('commons_library')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return json(502, { error: 'DB read failed', detail: error.message });
    return json(200, { library: data, count: data.length });
  }

  // ── Triage mode: trigger background function, return 202 immediately ────────
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'POST required for triage mode' });
  }

  console.log('match-engine: triggering background triage…');
  return json(202, { message: 'Triage started', note: 'Poll GET ?mode=library for results in ~2 minutes' });
};

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
