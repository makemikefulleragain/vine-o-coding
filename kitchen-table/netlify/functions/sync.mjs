// Kitchen Table — sync.mjs
// Netlify Blobs: GET retrieves state, POST saves state.
// Cross-device sync: mobile saves on session end, PC reads on open.

import { getStore } from '@netlify/blobs';

const STORE_KEY = 'kt-session';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const store = getStore('kitchen-table');

    if (event.httpMethod === 'GET') {
      const data = await store.get(STORE_KEY, { type: 'json' });
      if (!data) {
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ exists: false }),
        };
      }
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ exists: true, data }),
      };
    }

    if (event.httpMethod === 'POST') {
      const payload = JSON.parse(event.body || '{}');
      const sessionData = {
        ...payload,
        savedAt: new Date().toISOString(),
        savedFrom: event.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop',
      };
      await store.setJSON(STORE_KEY, sessionData);
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: true, savedAt: sessionData.savedAt }),
      };
    }

    return { statusCode: 405, headers, body: 'Method not allowed' };

  } catch (err) {
    console.error('Sync error:', err);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
