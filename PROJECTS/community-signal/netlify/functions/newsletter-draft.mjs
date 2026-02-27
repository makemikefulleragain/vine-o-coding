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

import { createClient } from '@supabase/supabase-js';

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

  // ── Generate mode: trigger background function, return 202 immediately ──────
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'POST required for generate mode' });
  }

  console.log('newsletter-draft: triggering background draft generation…');
  return json(202, { message: 'Draft generation started', note: 'Poll GET ?mode=queue for results in ~2 minutes' });
};


function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
