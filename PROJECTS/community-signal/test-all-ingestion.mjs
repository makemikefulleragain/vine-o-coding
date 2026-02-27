/**
 * test-all-ingestion.mjs
 * Comprehensive test suite for all signal ingestion pathways
 * 
 * Tests:
 * 1. Manual/programmatic ingestion (JSON POST)
 * 2. RSS feed ingestion (WACOSS, YACWA)
 * 3. Email ingestion (via Resend - requires sending actual email)
 * 
 * Usage: node test-all-ingestion.mjs <INGEST_SECRET>
 */

const INGEST_SECRET = process.argv[2];
const INGEST_URL = 'https://community-signal.netlify.app/.netlify/functions/signal-ingest';

if (!INGEST_SECRET) {
  console.error('Usage: node test-all-ingestion.mjs <INGEST_SECRET>');
  console.error('Get INGEST_SECRET from: https://app.netlify.com/projects/community-signal → Environment variables');
  process.exit(1);
}

const tests = {
  manual: {
    name: 'Manual/Programmatic Ingestion',
    run: async () => {
      const response = await fetch(INGEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ingest-secret': INGEST_SECRET,
        },
        body: JSON.stringify({
          source_type: 'manual',
          source_name: 'Test Manual Source',
          source_attribution: 'Ingestion Test Suite',
          content: `Test signal from comprehensive ingestion test suite.
          
This is a manually submitted test signal to verify the manual/programmatic ingestion pathway is working correctly.

Key test points:
- Authentication via x-ingest-secret header
- JSON payload parsing
- Content forwarding to signal-filter
- Job ID generation

Test timestamp: ${new Date().toISOString()}`,
        }),
      });

      const data = await response.json();
      return {
        success: response.ok,
        status: response.status,
        queued: data.queued || 0,
        job_ids: data.job_ids || [],
        error: data.error,
      };
    },
  },

  rss_wacoss: {
    name: 'RSS Ingestion — WACOSS',
    run: async () => {
      const response = await fetch(`${INGEST_URL}?mode=rss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ingest-secret': INGEST_SECRET,
        },
        body: JSON.stringify({
          source_id: 'wacoss',
          source_name: 'WACOSS',
          feed_url: 'https://wacoss.org.au/feed/',
        }),
      });

      const data = await response.json();
      return {
        success: response.ok,
        status: response.status,
        queued: data.queued || 0,
        job_ids: data.job_ids || [],
        error: data.error,
        note: data.note,
      };
    },
  },

  rss_yacwa: {
    name: 'RSS Ingestion — YACWA',
    run: async () => {
      const response = await fetch(`${INGEST_URL}?mode=rss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ingest-secret': INGEST_SECRET,
        },
        body: JSON.stringify({
          source_id: 'yacwa',
          source_name: 'YACWA',
          feed_url: 'https://www.yacwa.org.au/feed/',
        }),
      });

      const data = await response.json();
      return {
        success: response.ok,
        status: response.status,
        queued: data.queued || 0,
        job_ids: data.job_ids || [],
        error: data.error,
        note: data.note,
      };
    },
  },

  email_check: {
    name: 'Email Ingestion — Status Check',
    run: async () => {
      // Email ingestion is tested separately by sending actual email to signals@delisava.resend.app
      // This test just confirms the Resend webhook endpoint exists and responds
      const response = await fetch(`${INGEST_URL}?mode=resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'test',
        }),
      });

      const data = await response.json();
      return {
        success: response.status === 200 || response.status === 400, // 400 is expected for invalid payload
        status: response.status,
        note: 'Email ingestion requires sending actual email to signals@delisava.resend.app',
        error: data.error,
      };
    },
  },
};

async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Community Signal System — Ingestion Test Suite               ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const results = [];

  for (const [key, test] of Object.entries(tests)) {
    console.log(`\n▶ ${test.name}`);
    console.log('─'.repeat(65));

    try {
      const result = await test.run();
      results.push({ test: test.name, ...result });

      if (result.success) {
        console.log(`✅ SUCCESS (${result.status})`);
        if (result.queued > 0) {
          console.log(`   Signals queued: ${result.queued}`);
        }
        if (result.job_ids && result.job_ids.length > 0) {
          console.log(`   Job IDs: ${result.job_ids.join(', ')}`);
        }
        if (result.note) {
          console.log(`   Note: ${result.note}`);
        }
      } else {
        console.log(`❌ FAILED (${result.status})`);
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
        if (result.note) {
          console.log(`   Note: ${result.note}`);
        }
      }
    } catch (err) {
      console.log(`❌ EXCEPTION: ${err.message}`);
      results.push({ test: test.name, success: false, error: err.message });
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Test Summary                                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`Total tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  console.log('\n\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Next Steps                                                    ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('1. Check Kitchen Table Sector Pulse in ~30 seconds:');
  console.log('   https://coruscating-naiad-c0ccb9.netlify.app/control.html');
  console.log('   → Click 📡 Sector Pulse → Needs review');
  console.log('');
  console.log('2. Test email ingestion by sending email to:');
  console.log('   signals@delisava.resend.app');
  console.log('   Subject: [MANUAL] Test Email - ' + new Date().toISOString().split('T')[0]);
  console.log('   Body: Any community sector content (a few sentences)');
  console.log('');
  console.log('3. Verify all signals appear in Sector Pulse within 5 minutes');
  console.log('');
}

runAllTests();
