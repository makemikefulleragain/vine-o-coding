/**
 * cs-proxy.mjs
 * Kitchen Table — Community Signal proxy
 *
 * Proxies all community-signal.netlify.app function calls server-side.
 * This eliminates cross-origin issues (AdBlock, CORS on error responses).
 * The COMMUNITY_SIGNAL_SECRET env var is added server-side — never exposed to browser.
 *
 * Usage from browser:
 *   GET  /.netlify/functions/cs-proxy?fn=signals-read&mode=pulse
 *   POST /.netlify/functions/cs-proxy?fn=pattern-detect   (triggers background, returns 202)
 *   POST /.netlify/functions/cs-proxy?fn=newsletter-draft  { ... }
 *
 * Special routing:
 *   POST ?fn=pattern-detect → forwards to pattern-detect-background (15-min background function)
 *   All other calls → forwarded as-is
 */

const BASE   = 'https://community-signal.netlify.app/.netlify/functions';
const SECRET = process.env.COMMUNITY_SIGNAL_SECRET;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ingest-secret',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  const params = { ...(event.queryStringParameters || {}) };
  let fn = params.fn;

  if (!fn) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'fn query param required' }) };
  }

  delete params.fn;

  // Special routing: POST to pattern-detect → pattern-detect-background (avoids 10s timeout)
  if (fn === 'pattern-detect' && event.httpMethod === 'POST') {
    fn = 'pattern-detect-background';
  }

  const qs  = new URLSearchParams(params).toString();
  const url = `${BASE}/${fn}${qs ? '?' + qs : ''}`;

  try {
    const upstreamRes = await fetch(url, {
      method:  event.httpMethod,
      headers: {
        'Content-Type':    'application/json',
        'x-ingest-secret': SECRET || '',
      },
      body: ['POST', 'PUT', 'PATCH'].includes(event.httpMethod)
        ? (event.body || '{}')
        : undefined,
    });

    const body = await upstreamRes.text();

    return {
      statusCode: upstreamRes.status,
      headers:    { 'Content-Type': 'application/json', ...CORS },
      body,
    };
  } catch (err) {
    console.error('cs-proxy error:', fn, err.message);
    return {
      statusCode: 502,
      headers:    { 'Content-Type': 'application/json', ...CORS },
      body:       JSON.stringify({ error: 'Proxy request failed', detail: err.message }),
    };
  }
};
