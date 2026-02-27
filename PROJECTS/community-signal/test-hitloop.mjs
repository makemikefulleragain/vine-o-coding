/**
 * test-hitloop.mjs
 * Manual test tools for HitLoop research engine
 * 
 * Usage:
 *   node test-hitloop.mjs trigger    - Manually trigger research-engine
 *   node test-hitloop.mjs field      - Send test Mob Field Report
 *   node test-hitloop.mjs status     - Check research_strategy table
 */

const INGEST_SECRET = process.argv[3] || process.env.INGEST_SECRET;
const BASE_URL = 'https://community-signal.netlify.app/.netlify/functions';

const commands = {
  async trigger() {
    if (!INGEST_SECRET) {
      console.error('INGEST_SECRET required. Usage: node test-hitloop.mjs trigger <SECRET>');
      process.exit(1);
    }

    console.log('Triggering research-engine manually...\n');
    console.log('Background function — returns 202 immediately, runs async.\n');
    
    const res = await fetch(`${BASE_URL}/research-engine-background`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ingest-secret': INGEST_SECRET,
      },
      body: '{}',
    });

    const raw = await res.text();
    console.log(`Status: ${res.status}`);
    if (raw) console.log(`Response: ${raw}`);

    if (res.status === 202) {
      console.log('\n✅ Research engine triggered. Processing in background.');
      console.log('Check results in ~60s with: node test-hitloop.mjs status');
    }
  },

  async field() {
    if (!INGEST_SECRET) {
      console.error('INGEST_SECRET required. Usage: node test-hitloop.mjs field <INGEST_SECRET>');
      process.exit(1);
    }

    console.log('Sending test Mob Field Report...\n');

    const res = await fetch(`${BASE_URL}/signal-ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ingest-secret': INGEST_SECRET,
      },
      body: JSON.stringify({
        source_type: 'email',
        source_name: 'Housing crisis + disability services intersection',
        source_attribution: 'Test Mob Field Report',
        content: `Subject: [FIELD] Housing crisis + disability services intersection
From: mike@kamunity.org
To: signals@delisava.resend.app

I've heard from three orgs this week that NDIS participants are being displaced 
by rising rents in the northern suburbs. Shelter WA and Carers WA both flagged 
this as an emerging crisis.

Investigate:
- What funding is available for emergency accommodation?
- Which orgs are providing support?
- Any policy responses from state government?
- Connection to broader housing crisis trends

This needs urgent research - it's affecting real people right now.`,
      }),
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('\nCheck research_strategy table - new topic should be seeded with priority boost.');
  },

  async status() {
    console.log('To check research_strategy status, run this in Supabase SQL editor:\n');
    console.log('SELECT topic, source_type, score_avg, run_count, priority_weight, status');
    console.log('FROM research_strategy');
    console.log('ORDER BY priority_weight DESC, score_avg DESC;');
    console.log('\nOr check research_runs for execution history:\n');
    console.log('SELECT r.run_at, s.topic, r.signals_generated, r.avg_score, r.status');
    console.log('FROM research_runs r');
    console.log('JOIN research_strategy s ON r.strategy_id = s.id');
    console.log('ORDER BY r.run_at DESC');
    console.log('LIMIT 10;');
  },
};

const cmd = process.argv[2];
if (!cmd || !commands[cmd]) {
  console.log('Usage: node test-hitloop.mjs <command> [args]');
  console.log('\nCommands:');
  console.log('  trigger              - Manually trigger research-engine');
  console.log('  field <SECRET>       - Send test Mob Field Report');
  console.log('  status               - Show SQL queries to check status');
  process.exit(1);
}

commands[cmd]();
