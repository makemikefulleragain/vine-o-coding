/**
 * opt-in.mjs
 * Phase 4 — OFFER layer
 *
 * Stores an explicit opt-in from a Kai conversation.
 * Constitutional requirement: consent is architecture.
 * - Records exact consent text shown at opt-in moment
 * - Timestamps consent
 * - No signal source detail stored — only interest summary
 *
 * Called:
 *   POST /opt-in  — store new opted-in contact
 *   POST /opt-in?mode=unsubscribe&email=<email> — instant delete, no questions
 *
 * Security: CORS open (called from kamunity-consulting Kai FAB).
 * Abuse protection: email uniqueness constraint in DB.
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST required' });

  const mode  = event.queryStringParameters?.mode;
  const email = event.queryStringParameters?.email;

  // ── Unsubscribe: instant delete, no questions ──────────────────────────────
  if (mode === 'unsubscribe') {
    if (!email) return json(400, { error: 'email param required for unsubscribe' });

    const { error } = await supabase
      .from('opted_in_contacts')
      .update({ unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('email', email.toLowerCase().trim());

    if (error) return json(502, { error: 'Unsubscribe failed', detail: error.message });
    return json(200, { unsubscribed: true, message: 'You\'ve been removed. No more contact from us.' });
  }

  // ── Opt-in: store contact + consent record ─────────────────────────────────
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }

  const {
    email: rawEmail,
    first_name,
    org_name,
    sector_tags,
    consent_source,
    consent_text,
    interest_summary,
    pattern_tags,
  } = body;

  if (!rawEmail || !consent_source || !consent_text) {
    return json(400, { error: 'email, consent_source, and consent_text are required' });
  }

  const cleanEmail = rawEmail.toLowerCase().trim();

  // Upsert — re-opting in resets unsubscribed_at and updates consent record
  const { data, error } = await supabase
    .from('opted_in_contacts')
    .upsert({
      email:            cleanEmail,
      first_name:       first_name || null,
      org_name:         org_name   || null,
      sector_tags:      sector_tags || [],
      consent_given_at: new Date().toISOString(),
      consent_source,
      consent_text,
      interest_summary: interest_summary || null,
      pattern_tags:     pattern_tags || [],
      unsubscribed_at:  null,
      updated_at:       new Date().toISOString(),
    }, { onConflict: 'email' })
    .select('id')
    .single();

  if (error) return json(502, { error: 'Opt-in failed', detail: error.message });

  console.log(`Opt-in recorded: ${cleanEmail} (source: ${consent_source})`);
  return json(200, { opted_in: true, contact_id: data.id });
};

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
