/**
 * generate-thing.mjs
 * Phase 3 — MATCH + MAKE layer (SYNC — review operations only)
 *
 * Fast sync function for review operations (approve/reject).
 * Generation is handled by generate-thing-background.mjs (15-min timeout).
 *
 * Called:
 *   POST /generate-thing?mode=review&library_id=<uuid> — human review (approve/reject)
 *
 * Security: protected by INGEST_SECRET header.
 * Constitutional: nothing enters the commons without human approval.
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

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'POST required' });
  }

  const mode      = event.queryStringParameters?.mode;
  const libraryId = event.queryStringParameters?.library_id;

  // ── Review mode: approve or reject a generated artifact ───────────────────
  if (mode === 'review') {
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid JSON' }); }

    const { action, review_notes, reviewed_by } = body;
    if (!libraryId || !['approve', 'reject'].includes(action)) {
      return json(400, { error: 'library_id param and action ("approve"|"reject") required' });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const { error } = await supabase
      .from('commons_library')
      .update({
        review_status: newStatus,
        reviewed_at:   new Date().toISOString(),
        reviewed_by:   reviewed_by || 'Mike',
        review_notes:  review_notes || null,
        updated_at:    new Date().toISOString(),
      })
      .eq('id', libraryId);

    if (error) return json(502, { error: 'DB update failed', detail: error.message });
    return json(200, { updated: true, library_id: libraryId, action });
  }

  // ── Generate trigger: fire background function, return 202 immediately ─────
  const bgUrl = `${process.env.URL || 'https://community-signal.netlify.app'}/.netlify/functions/generate-thing-background${libraryId ? '?library_id=' + libraryId : ''}`;
  try {
    fetch(bgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-ingest-secret': INGEST_SECRET },
      body: event.body || '{}',
    }).catch(err => console.error('Background trigger failed:', err.message));
  } catch (err) {
    console.error('Background trigger error:', err.message);
  }

  return json(202, { status: 'generating', message: 'Background generation started — poll library for results' });
};

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
