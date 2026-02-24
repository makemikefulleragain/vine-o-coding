// THE KITCHEN TABLE — source.js
// Live source editor — read/write BRAIN/ + PLAN/ markdown files
// Local (server.py): full read + write. Netlify: read-only.

import { refreshWaymakerFiles } from './waymaker.js';

const IS_NETLIFY = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';
const API_ENDPOINT = IS_NETLIFY ? '/.netlify/functions/markdown' : '/api/files';

const FILES = [
  { key: 'STATE',          label: '🧠 STATE.md',          desc: 'Current operational state — live pulse of the ecosystem' },
  { key: 'PHASE_QUEUE',    label: '🗺️ PHASE_QUEUE.md',    desc: 'Cross-project priority queue — what gets built next and why' },
  { key: 'SAFETY_GATES',   label: '🛡️ SAFETY_GATES.md',   desc: 'Safety gate status — critical/high/medium gates and PASS/FAIL' },
  { key: 'ECOSYSTEM',      label: '🌿 ECOSYSTEM.md',       desc: 'Ecosystem map — all live sites, repos, domains, tech stacks' },
  { key: 'MEETING_BRIEFS', label: '⭐ MEETING_BRIEFS.md',  desc: 'Upcoming meeting prep — ALIKE, Activate MH, AI Speaker' },
  { key: 'ROADMAP_KAMUNITY_ORG',      label: '🔥 Kai ROADMAP',              desc: 'kamunity.org development queue — user feedback, now/next/later, research' },
  { key: 'ROADMAP_AI_READINESS',      label: '🧭 AI Readiness ROADMAP',      desc: 'AI Readiness site development queue — user feedback, now/next/later' },
  { key: 'ROADMAP_SOVEREIGNTY_AUDIT', label: '🛡️ Sovereignty Audit ROADMAP', desc: 'Sovereignty Audit development queue — user feedback, now/next/later' },
  { key: 'ROADMAP_KAMUNITY_AI',       label: '🤖 kamunity.ai ROADMAP',       desc: 'kamunity.ai development queue — user feedback, now/next/later' },
  { key: 'ROADMAP_WEDDING',           label: '💍 Wedding ROADMAP',           desc: 'Wedding site development queue — dogfood learnings, now/next/later' },
];

let currentKey = 'STATE';
let loadedContent = {};
let isDirty = false;

// ─── Fetch ────────────────────────────────────────────────────────

async function loadAllFiles() {
  setStatus('loading', 'Loading files…');
  try {
    const resp = await fetch(API_ENDPOINT);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    loadedContent = data.files || {};
    setStatus('ok', IS_NETLIFY
      ? '📦 Deployed snapshot — read-only. Edit locally and push to update.'
      : '✅ Live from disk — edits write directly to BRAIN/ + PLAN/'
    );
    renderEditor();
  } catch (err) {
    setStatus('error', `Failed to load files: ${err.message}`);
  }
}

async function saveCurrentFile() {
  if (IS_NETLIFY) return;
  const content = document.getElementById('src-editor').value;
  if (!content) return;

  setStatus('loading', 'Saving…');
  setSaveDisabled(true);

  try {
    const resp = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: currentKey, content }),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`);

    loadedContent[currentKey] = content;
    isDirty = false;
    refreshWaymakerFiles(); // Waymaker will re-fetch on next message
    setStatus('ok', `✅ Saved ${currentKey} — Waymaker will see changes on next message`);
    updateDirtyState();
  } catch (err) {
    setStatus('error', `Save failed: ${err.message}`);
  } finally {
    setSaveDisabled(false);
  }
}

// ─── Render ───────────────────────────────────────────────────────

function renderFileTabs() {
  const tabsEl = document.getElementById('src-tabs');
  tabsEl.innerHTML = FILES.map(f => `
    <button class="src-tab${f.key === currentKey ? ' active' : ''}" data-key="${f.key}">
      ${f.label}
    </button>
  `).join('');

  tabsEl.querySelectorAll('.src-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isDirty) {
        if (!confirm('You have unsaved changes. Switch file anyway?')) return;
        isDirty = false;
      }
      currentKey = btn.dataset.key;
      renderFileTabs();
      renderEditor();
    });
  });
}

function renderEditor() {
  const editor = document.getElementById('src-editor');
  const desc = document.getElementById('src-desc');
  const file = FILES.find(f => f.key === currentKey);

  if (desc) desc.textContent = file?.desc || '';
  if (editor) {
    editor.value = loadedContent[currentKey] || '';
    editor.readOnly = IS_NETLIFY;
    isDirty = false;
    updateDirtyState();
  }
}

function updateDirtyState() {
  const saveBtn = document.getElementById('src-save');
  const discardBtn = document.getElementById('src-discard');
  if (saveBtn) {
    saveBtn.disabled = !isDirty || IS_NETLIFY;
    saveBtn.textContent = isDirty ? '💾 Save to disk' : '💾 Saved';
  }
  if (discardBtn) discardBtn.disabled = !isDirty;

  const editor = document.getElementById('src-editor');
  if (editor) editor.classList.toggle('dirty', isDirty);
}

function setSaveDisabled(disabled) {
  const btn = document.getElementById('src-save');
  if (btn) btn.disabled = disabled;
}

function setStatus(type, msg) {
  const el = document.getElementById('src-status');
  if (!el) return;
  el.className = `src-status src-status--${type}`;
  el.textContent = msg;
}

// ─── Sync helper ─────────────────────────────────────────────────

function buildSyncCommands() {
  return `Copy-Item "BRAIN\\STATE.md" "kitchen-table\\data\\STATE.md"\nCopy-Item "PLAN\\PHASE_QUEUE.md" "kitchen-table\\data\\PHASE_QUEUE.md"\nCopy-Item "BRAIN\\SAFETY_GATES.md" "kitchen-table\\data\\SAFETY_GATES.md"\nCopy-Item "BRAIN\\ECOSYSTEM.md" "kitchen-table\\data\\ECOSYSTEM.md"\n\ncd kitchen-table\ngit add data/\ngit commit -m "data: sync BRAIN/PLAN snapshots"\ngit push`;
}

// ─── Init ─────────────────────────────────────────────────────────

export function initSource() {
  const mount = document.getElementById('source-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="src-layout">
      <div class="src-toolbar">
        <div id="src-tabs" class="src-tabs"></div>
        <div class="src-actions">
          ${IS_NETLIFY
            ? `<span class="src-readonly-badge">📦 Read-only on Netlify</span>`
            : `<button id="src-discard" class="src-btn src-btn--ghost" disabled>↩ Discard</button>
               <button id="src-save" class="src-btn src-btn--primary" disabled>💾 Save to disk</button>`
          }
          <button id="src-refresh" class="src-btn src-btn--ghost">🔄 Refresh</button>
        </div>
      </div>

      <p id="src-desc" class="src-desc"></p>
      <div id="src-status" class="src-status src-status--loading">Loading…</div>

      <textarea
        id="src-editor"
        class="src-editor"
        spellcheck="false"
        autocomplete="off"
        placeholder="Loading file content…"
      ></textarea>

      ${IS_NETLIFY ? '' : `
      <details class="src-deploy-box">
        <summary>📤 Deploy updated snapshots to Netlify</summary>
        <p>After saving, sync the <code>data/</code> snapshots so Netlify stays current:</p>
        <pre id="src-sync-cmds" class="src-sync-pre">${buildSyncCommands()}</pre>
        <button id="src-copy-sync" class="src-btn src-btn--ghost">📋 Copy commands</button>
      </details>
      `}
    </div>
  `;

  // Editor dirty tracking
  document.getElementById('src-editor').addEventListener('input', () => {
    isDirty = true;
    updateDirtyState();
  });

  // Save
  document.getElementById('src-save')?.addEventListener('click', saveCurrentFile);

  // Discard
  document.getElementById('src-discard')?.addEventListener('click', () => {
    if (!confirm('Discard unsaved changes?')) return;
    isDirty = false;
    renderEditor();
    setStatus('ok', 'Changes discarded');
  });

  // Refresh
  document.getElementById('src-refresh').addEventListener('click', () => {
    if (isDirty && !confirm('Reload and discard unsaved changes?')) return;
    isDirty = false;
    loadAllFiles();
  });

  // Copy sync commands
  document.getElementById('src-copy-sync')?.addEventListener('click', () => {
    navigator.clipboard.writeText(buildSyncCommands()).then(() => {
      const btn = document.getElementById('src-copy-sync');
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = '📋 Copy commands'; }, 2000);
    });
  });

  renderFileTabs();
  loadAllFiles();
}
