/**
 * source-discovery.mjs
 * Phase 1.5 — PRODUCTION SOURCES
 *
 * Automated source discovery — finds new WA community sector RSS feeds.
 * Runs weekly (Sunday 6am AWST = 22:00 UTC Saturday) OR on manual trigger.
 *
 * Discovery methods:
 *   1. RSS autodiscovery — parse <link rel="alternate"> from seed URLs
 *   2. Sector directory crawling — WALGA, Linkwest member lists
 *   3. Related org discovery — outbound .org.au/.gov.au links from approved sources
 *
 * Scores each candidate (0-1). Stores in discovered_sources table for human review.
 * No sources are activated without Mike's explicit approval in Kitchen Table.
 *
 * Schedule: "0 22 * * 6"  (10pm UTC Saturday = 6am AWST Sunday)
 *
 * Manual trigger: POST /.netlify/functions/source-discovery
 *   Header: x-ingest-secret: <INGEST_SECRET>
 *
 * Env vars required:
 *   INGEST_SECRET
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import SOURCES_DATA from '../../data/rss-sources.json' assert { type: 'json' };

export const config = {
  schedule: '0 22 * * 6',
};

const INGEST_SECRET = process.env.INGEST_SECRET;
const supabase      = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_CRAWL_PER_RUN = 50;
const FETCH_TIMEOUT_MS  = 8000;

// WA sector directory seed pages for member list crawling
const DIRECTORY_SEEDS = [
  { url: 'https://walga.asn.au/our-members',          discovered_via: 'walga_member_list' },
  { url: 'https://linkwest.asn.au/find-a-centre',     discovered_via: 'linkwest_member_list' },
  { url: 'https://wacoss.org.au/our-members/',        discovered_via: 'wacoss_member_list' },
];

// Known personal data indicators — auto-reject if found in RSS items
const PERSONAL_DATA_PATTERNS = [
  /\b[A-Z][a-z]+ [A-Z][a-z]+\b.*\b(phone|mobile|email|address)\b/i,
  /\b\d{10}\b/,                        // phone number
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/,  // email address
  /\b\d{1,3} [A-Z][a-z]+ (St|Rd|Ave|Dr|Blvd|Ln)\b/i,  // street address
];

// ── Handler ───────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  // Allow both scheduled invocation and manual POST trigger
  const isManual = event?.httpMethod === 'POST';

  if (isManual) {
    if (event.headers['x-ingest-secret'] !== INGEST_SECRET) {
      return json(401, { error: 'Unauthorized' });
    }
  }

  console.log(`source-discovery: starting run (${isManual ? 'manual' : 'scheduled'})`);

  // Build set of already-known URLs (approved + rejected) to avoid re-suggesting
  const knownUrls = await getKnownUrls();

  const candidates = [];
  let crawlCount   = 0;

  // ── Method 1: RSS autodiscovery from active approved sources ─────────────────
  const approvedSources = SOURCES_DATA.sources.filter(s => s.status === 'active' && s.website);
  for (const source of approvedSources) {
    if (crawlCount >= MAX_CRAWL_PER_RUN) break;
    try {
      const found = await discoverRSS(source.website, 'approved_source_link');
      crawlCount++;
      for (const feed of found) {
        if (!knownUrls.has(feed.rss_url)) {
          candidates.push({ ...feed, relevance_score: 0.5 + scoreBonus('approved_source_link') });
        }
      }
    } catch { /* silent — individual failures don't stop the run */ }
  }

  // ── Method 2: Sector directory crawling ──────────────────────────────────────
  for (const seed of DIRECTORY_SEEDS) {
    if (crawlCount >= MAX_CRAWL_PER_RUN) break;
    try {
      const orgLinks = await extractOrgLinks(seed.url);
      crawlCount++;
      for (const orgUrl of orgLinks.slice(0, 10)) {
        if (crawlCount >= MAX_CRAWL_PER_RUN) break;
        if (knownUrls.has(orgUrl)) continue;
        try {
          const found = await discoverRSS(orgUrl, seed.discovered_via);
          crawlCount++;
          for (const feed of found) {
            if (!knownUrls.has(feed.rss_url)) {
              candidates.push({ ...feed, relevance_score: scoreCandidate(feed, seed.discovered_via) });
            }
          }
        } catch { /* silent */ }
      }
    } catch { /* silent */ }
  }

  // ── Method 3: Outbound .org.au / .gov.au links from approved sources ─────────
  for (const source of approvedSources.slice(0, 5)) {
    if (crawlCount >= MAX_CRAWL_PER_RUN) break;
    try {
      const links = await extractOrgLinks(source.website);
      crawlCount++;
      const waLinks = links.filter(l => isWAOrg(l) && !knownUrls.has(l));
      for (const link of waLinks.slice(0, 5)) {
        if (crawlCount >= MAX_CRAWL_PER_RUN) break;
        try {
          const found = await discoverRSS(link, 'approved_source_link');
          crawlCount++;
          for (const feed of found) {
            if (!knownUrls.has(feed.rss_url)) {
              candidates.push({ ...feed, relevance_score: scoreCandidate(feed, 'approved_source_link') });
            }
          }
        } catch { /* silent */ }
      }
    } catch { /* silent */ }
  }

  // ── Deduplicate by rss_url ────────────────────────────────────────────────────
  const seen = new Set();
  const unique = candidates.filter(c => {
    if (!c.rss_url || seen.has(c.rss_url)) return false;
    seen.add(c.rss_url);
    return true;
  });

  // ── Validate RSS feeds + privacy check ───────────────────────────────────────
  const validated = [];
  for (const candidate of unique.slice(0, 20)) {
    try {
      const valid = await validateRSS(candidate.rss_url);
      if (valid.ok && !valid.hasPersonalData) {
        validated.push({
          ...candidate,
          small_cohort_flag: candidate.small_cohort_flag || false,
        });
      } else if (valid.hasPersonalData) {
        console.log(`source-discovery: auto-rejected ${candidate.rss_url} — personal data detected`);
      }
    } catch { /* silent */ }
  }

  // ── Store in discovered_sources ───────────────────────────────────────────────
  if (validated.length > 0) {
    const rows = validated.map(c => ({
      org_name:          c.org_name || c.rss_url,
      website_url:       c.website_url || '',
      rss_url:           c.rss_url,
      discovered_via:    c.discovered_via,
      relevance_score:   Math.min(1, Math.max(0, c.relevance_score)),
      small_cohort_flag: c.small_cohort_flag || false,
      status:            'pending_review',
    }));

    const { error } = await supabase.from('discovered_sources').insert(rows);
    if (error) {
      console.error('source-discovery: DB write failed:', error.message);
    }
  }

  const result = {
    crawled:    crawlCount,
    candidates: unique.length,
    stored:     validated.length,
    skipped_personal_data: unique.length - validated.length,
  };

  console.log('source-discovery complete:', JSON.stringify(result));

  if (isManual) return json(200, result);
};

// ── RSS Autodiscovery ─────────────────────────────────────────────────────────

async function discoverRSS(url, discovered_via) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'KamunitySignalBot/1.0 (community intelligence; +https://kamunity.org)' },
    signal:  AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) return [];

  const html  = await res.text();
  const found = [];

  // <link rel="alternate" type="application/rss+xml" ...>
  const rssLinkRe = /<link[^>]+type=["']application\/(rss|atom)\+xml["'][^>]*>/gi;
  let match;
  while ((match = rssLinkRe.exec(html)) !== null) {
    const hrefMatch  = match[0].match(/href=["']([^"']+)["']/);
    const titleMatch = match[0].match(/title=["']([^"']+)["']/);
    if (!hrefMatch) continue;

    const rss_url  = new URL(hrefMatch[1], url).href;
    const org_name = titleMatch ? titleMatch[1] : extractDomainName(url);

    found.push({ org_name, website_url: url, rss_url, discovered_via });
  }

  return found;
}

// ── Extract org links from a directory page ───────────────────────────────────

async function extractOrgLinks(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'KamunitySignalBot/1.0 (community intelligence; +https://kamunity.org)' },
    signal:  AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) return [];

  const html  = await res.text();
  const links = new Set();
  const hrefRe = /href=["'](https?:\/\/[^"'#?]+)["']/gi;
  let match;
  while ((match = hrefRe.exec(html)) !== null) {
    const href = match[1];
    if (isEligibleOrgUrl(href) && !isSameOrigin(href, url)) {
      links.add(href.replace(/\/$/, ''));
    }
  }
  return [...links];
}

// ── RSS Validation ────────────────────────────────────────────────────────────

async function validateRSS(rssUrl) {
  const res = await fetch(rssUrl, {
    headers: { 'User-Agent': 'KamunitySignalBot/1.0 (community intelligence; +https://kamunity.org)' },
    signal:  AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) return { ok: false };

  const text = await res.text();

  // Basic check: looks like RSS/Atom
  const isRSS = /<(rss|feed|channel)\b/i.test(text);
  if (!isRSS) return { ok: false };

  // Privacy check: scan for personal data patterns
  const hasPersonalData = PERSONAL_DATA_PATTERNS.some(re => re.test(text));

  return { ok: true, hasPersonalData };
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreCandidate(feed, discovered_via) {
  let score = 0;
  const url = feed.website_url || feed.rss_url || '';

  if (url.endsWith('.gov.au'))               score += 0.3;
  else if (url.match(/\.(org|asn)\.au/))     score += 0.2;

  score += scoreBonus(discovered_via);

  if (/western.australia|perth|wa\.gov|wa\.asn/i.test(url)) score += 0.2;

  return Math.min(1, score);
}

function scoreBonus(discovered_via) {
  switch (discovered_via) {
    case 'walga_member_list':
    case 'wacoss_member_list':
    case 'linkwest_member_list': return 0.4;
    case 'approved_source_link': return 0.3;
    case 'grant_recipient':      return 0.2;
    default:                     return 0.1;
  }
}

// ── URL helpers ───────────────────────────────────────────────────────────────

function isEligibleOrgUrl(url) {
  return /\.(org|asn|gov|edu)\.au(\/|$)/.test(url);
}

function isWAOrg(url) {
  return /wa\.gov\.au|western.australia|perth|\.wa\./.test(url.toLowerCase());
}

function isSameOrigin(url, base) {
  try {
    return new URL(url).hostname === new URL(base).hostname;
  } catch { return false; }
}

function extractDomainName(url) {
  try {
    const host = new URL(url).hostname;
    return host.replace(/^www\./, '').split('.')[0];
  } catch { return url; }
}

// ── Known URLs set ────────────────────────────────────────────────────────────

async function getKnownUrls() {
  const known = new Set();

  // From rss-sources.json
  for (const s of SOURCES_DATA.sources) {
    if (s.rss_url)   known.add(s.rss_url);
    if (s.website)   known.add(s.website);
  }

  // From already-reviewed discovered_sources (approved or rejected)
  const { data } = await supabase
    .from('discovered_sources')
    .select('rss_url, website_url')
    .in('status', ['approved', 'rejected']);

  for (const row of (data || [])) {
    if (row.rss_url)    known.add(row.rss_url);
    if (row.website_url) known.add(row.website_url);
  }

  return known;
}

// ── Util ──────────────────────────────────────────────────────────────────────

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json' },
    body:       JSON.stringify(body),
  };
}
