// Netlify function — serve bundled markdown snapshots
// These files are copied from BRAIN/ + PLAN/ at deploy time via included_files
// On Netlify: read-only. On local: server.py serves live files instead.
//
// NOTE: No import.meta.url — esbuild converts ESM→CJS and import.meta crashes.
// Use process.cwd() instead: in Lambda runtime this is /var/task where
// included_files land. Falls back to __dirname for netlify dev.

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const FILE_KEYS = {
  STATE:          'data/STATE.md',
  PHASE_QUEUE:    'data/PHASE_QUEUE.md',
  SAFETY_GATES:   'data/SAFETY_GATES.md',
  ECOSYSTEM:      'data/ECOSYSTEM.md',
  MEETING_BRIEFS:           'data/MEETING_BRIEFS.md',
  ROADMAP_KAMUNITY_ORG:      'data/PROJECTS/kamunity-org/ROADMAP.md',
  ROADMAP_AI_READINESS:      'data/PROJECTS/ai-readiness/ROADMAP.md',
  ROADMAP_SOVEREIGNTY_AUDIT: 'data/PROJECTS/sovereignty-audit/ROADMAP.md',
  ROADMAP_KAMUNITY_AI:       'data/PROJECTS/kamunity-ai/ROADMAP.md',
  ROADMAP_WEDDING:           'data/PROJECTS/wedding/ROADMAP.md',
};

function findFile(relPath) {
  // Lambda: process.cwd() = /var/task, included_files land there
  const fromCwd = join(process.cwd(), relPath);
  if (existsSync(fromCwd)) return fromCwd;
  // netlify dev / esbuild local: __dirname is available in CJS output
  if (typeof __dirname !== 'undefined') {
    const fromDir = join(__dirname, relPath);
    if (existsSync(fromDir)) return fromDir;
  }
  return null;
}

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const files = {};
  for (const [key, relPath] of Object.entries(FILE_KEYS)) {
    try {
      const full = findFile(relPath);
      files[key] = full ? readFileSync(full, 'utf8') : null;
    } catch {
      files[key] = null;
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ files }),
  };
}
