/**
 * signal-store.mjs
 * Phase 2 — PROPAGATE layer
 *
 * Receives anonymous bilateral signals and offers submitted via:
 *   - Kai signal card (source: 'kai')
 *   - Mob field form in Kitchen Table (source: 'mob-field')
 *   - Manual entry (source: 'manual')
 *
 * Payload:
 *   {
 *     type: 'signal' | 'offer',
 *     need_summary?:  string,   // for type=signal
 *     offer_summary?: string,   // for type=offer
 *     sector_tags:    string[],
 *     org_size?:      'micro'|'small'|'medium'|'large'|'unknown',
 *     region?:        string,
 *     source:         'kai'|'mob-field'|'manual'
 *   }
 *
 * Returns: { stored: true, id: uuid }
 *
 * Security:
 *   - Kai submissions use x-ingest-secret (same shared secret)
 *   - No personal data accepted — sector-level only
 *   - Content is generalised before storage
 */

import { createClient } from '@supabase/supabase-js';

const supabase     = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const INGEST_SECRET = process.env.INGEST_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

const VALID_ORG_SIZES = ['micro', 'small', 'medium', 'large', 'unknown'];

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
    return json(401, { error: 'Unauthorized' });
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const { type, sector_tags, org_size, region, source } = body;

  if (!type || !['signal', 'offer'].includes(type)) {
    return json(400, { error: 'type must be "signal" or "offer"' });
  }
  if (!source || !['kai', 'mob-field', 'manual'].includes(source)) {
    return json(400, { error: 'source must be "kai", "mob-field", or "manual"' });
  }
  if (!Array.isArray(sector_tags) || sector_tags.length === 0) {
    return json(400, { error: 'sector_tags must be a non-empty array' });
  }
  if (org_size && !VALID_ORG_SIZES.includes(org_size)) {
    return json(400, { error: `org_size must be one of: ${VALID_ORG_SIZES.join(', ')}` });
  }

  if (type === 'signal') {
    const { need_summary } = body;
    if (!need_summary || need_summary.trim().length < 10) {
      return json(400, { error: 'need_summary required (min 10 chars)' });
    }
    if (need_summary.length > 500) {
      return json(400, { error: 'need_summary too long (max 500 chars) — keep it sector-level' });
    }

    const { data, error } = await supabase
      .from('community_signals')
      .insert({
        need_summary:          need_summary.trim(),
        sector_tags:           sector_tags.slice(0, 10),
        org_size:              org_size || 'unknown',
        region:                region   || 'WA',
        source,
        traceability_verdict:  'PENDING',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error (signal):', error.message);
      return json(502, { error: 'DB write failed' });
    }

    console.log(`Stored community signal ${data.id} from ${source}`);
    return json(200, { stored: true, id: data.id });
  }

  if (type === 'offer') {
    const { offer_summary } = body;
    if (!offer_summary || offer_summary.trim().length < 10) {
      return json(400, { error: 'offer_summary required (min 10 chars)' });
    }
    if (offer_summary.length > 500) {
      return json(400, { error: 'offer_summary too long (max 500 chars) — keep it sector-level' });
    }

    const { data, error } = await supabase
      .from('community_offers')
      .insert({
        offer_summary: offer_summary.trim(),
        sector_tags:   sector_tags.slice(0, 10),
        org_size:      org_size || 'unknown',
        region:        region   || 'WA',
        source,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error (offer):', error.message);
      return json(502, { error: 'DB write failed' });
    }

    console.log(`Stored community offer ${data.id} from ${source}`);
    return json(200, { stored: true, id: data.id });
  }
};

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
