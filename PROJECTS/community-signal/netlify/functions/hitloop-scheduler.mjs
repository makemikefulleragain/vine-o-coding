/**
 * hitloop-scheduler.mjs
 * Thin cron wrapper — calls research-engine via HTTP daily.
 * Same pattern as rss-scheduler → signal-ingest.
 *
 * Schedule: 3am AWST = 7pm UTC previous day
 */

export const config = {
  schedule: '0 19 * * *',
};

const INGEST_SECRET = process.env.INGEST_SECRET;
const ENGINE_URL = process.env.URL
  ? `${process.env.URL}/.netlify/functions/research-engine-background`
  : 'http://localhost:8888/.netlify/functions/research-engine-background';

export const handler = async () => {
  console.log('hitloop-scheduler: Triggering research-engine');

  try {
    const res = await fetch(ENGINE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ingest-secret': INGEST_SECRET,
      },
      body: '{}',
    });

    const body = await res.text();
    console.log(`hitloop-scheduler: research-engine returned ${res.status}: ${body}`);
    return { statusCode: res.status, body };

  } catch (err) {
    console.error('hitloop-scheduler: Failed to call research-engine:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
