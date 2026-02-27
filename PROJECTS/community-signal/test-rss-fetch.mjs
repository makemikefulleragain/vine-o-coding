/**
 * test-rss-fetch.mjs
 * Manual test script to trigger RSS ingestion for WACOSS and YACWA
 * Run: node test-rss-fetch.mjs
 */

const INGEST_SECRET = process.argv[2];
const INGEST_URL = 'https://community-signal.netlify.app/.netlify/functions/signal-ingest';

if (!INGEST_SECRET) {
  console.error('Usage: node test-rss-fetch.mjs <INGEST_SECRET>');
  console.error('Get INGEST_SECRET from: netlify env:get INGEST_SECRET --context production');
  process.exit(1);
}

const sources = [
  {
    source_id: 'wacoss',
    source_name: 'WACOSS',
    rss_url: 'https://wacoss.org.au/feed/',
  },
  {
    source_id: 'yacwa',
    source_name: 'YACWA',
    rss_url: 'https://www.yacwa.org.au/feed/',
  },
];

async function testRSSFetch() {
  console.log('Testing RSS ingestion for WACOSS and YACWA...\n');

  for (const source of sources) {
    console.log(`Fetching ${source.source_name}...`);
    
    try {
      const response = await fetch(`${INGEST_URL}?mode=rss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ingest-secret': INGEST_SECRET,
        },
        body: JSON.stringify({
          source_id: source.source_id,
          source_name: source.source_name,
          feed_url: source.rss_url,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${source.source_name}: ${data.queued} signal(s) queued`);
        if (data.job_ids) {
          console.log(`   Job IDs: ${data.job_ids.join(', ')}`);
        }
      } else {
        console.log(`❌ ${source.source_name}: ${response.status} - ${data.error || JSON.stringify(data)}`);
      }
    } catch (err) {
      console.log(`❌ ${source.source_name}: ${err.message}`);
    }
    
    console.log('');
  }
  
  console.log('Done. Check Kitchen Table Sector Pulse in ~30 seconds.');
}

testRSSFetch();
