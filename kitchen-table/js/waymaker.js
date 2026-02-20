// THE KITCHEN TABLE — waymaker.js
// Kai Waymaker — Internal Operations AI
// Floating chat panel, context-aware, powered by Claude

import { TASKS, SAFETY_ITEMS, PHASES, SITES, ALLIES, GAPS, SERVICES, GRANTS, loadState } from './data.js';
import { nlnetCountdown } from './utils.js';

const STORAGE_KEY = 'kt-waymaker';
const MAX_HISTORY = 20;

// Auto-detect: Netlify functions vs local Python server
const IS_NETLIFY = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';
const API_ENDPOINT = IS_NETLIFY ? '/.netlify/functions/waymaker' : '/api/waymaker';
const FILES_ENDPOINT = IS_NETLIFY ? '/.netlify/functions/markdown' : '/api/files';

let chatHistory = [];
let currentPage = 'today';
let isOpen = false;
let isLoading = false;
let liveFiles = null;
let filesFetchedAt = 0;
const FILES_TTL_MS = 5 * 60 * 1000;

// ─── System Prompt Builder ───────────────────────────────────────

async function fetchLiveFiles() {
  const now = Date.now();
  if (liveFiles && (now - filesFetchedAt) < FILES_TTL_MS) return;
  try {
    const resp = await fetch(FILES_ENDPOINT);
    if (resp.ok) {
      const data = await resp.json();
      liveFiles = data.files || null;
      filesFetchedAt = now;
    }
  } catch {
    // silent — fall back to data.js context
  }
}

function buildSystemPrompt(pageId) {
  loadState();
  const tasksDone = TASKS.filter(t => t.done).length;
  const tasksCrit = TASKS.filter(t => !t.done && t.pri === 'critical').length;
  const tasksHigh = TASKS.filter(t => !t.done && t.pri === 'high').length;
  const sitesLive = SITES.filter(s => s.st === 'live').length;
  const safetyOpen = SAFETY_ITEMS.filter(s => s.st === 'open').length;
  const safetyDone = SAFETY_ITEMS.filter(s => s.st === 'done').length;
  const gapsOpen = GAPS.filter(g => !g.resolved).length;
  const meetings = TASKS.filter(t => t.tags.includes('meeting') && !t.done).length;
  const activePhase = PHASES.find(p => p.st === 'active');

  const topTasks = TASKS
    .filter(t => !t.done && (t.pri === 'critical' || t.pri === 'high'))
    .slice(0, 8)
    .map(t => `  - [${t.pri}] ${t.text}`)
    .join('\n');

  const critSafety = SAFETY_ITEMS
    .filter(s => s.sev === 'critical' || s.sev === 'high')
    .map(s => `  - [${s.sev}] ${s.text} — ${s.st}`)
    .join('\n');

  const allyList = ALLIES
    .slice(0, 8)
    .map(a => `  - ${a.name} (${a.tier}) — ${a.action}`)
    .join('\n');

  const pageContextMap = {
    today: "The user is on the TODAY page — focus on what's urgent, what to do first today, and any blockers.",
    tasks: "The user is on the TASKS page — help prioritise, suggest what to tackle next, identify dependencies.",
    phases: "The user is on the PHASES page — discuss phase progress, what's blocking advancement, dependencies between phases.",
    ecosystem: "The user is on the ECOSYSTEM page — discuss live sites, their health, deployment status, what needs attention.",
    allies: "The user is on the ALLIES page — suggest outreach, offer to draft emails, track follow-ups, identify who to contact next.",
    money: "The user is on the MONEY page — discuss revenue, grants, financial health, NLnet application, service offerings.",
    safety: "The user is on the SAFETY page — discuss risk, safety gates, what's blocking ALIKE showcase, what needs immediate action.",
    gaps: "The user is on the GAPS page — discuss open questions, suggest resolutions, identify which gaps are most impactful.",
  };

  return `You are Waymaker (Kai), the internal operations AI for Kamunity. You sit inside the Kitchen Table — the mission control dashboard for the Kamunity ecosystem.

PERSONALITY:
- Warm but direct. Like a trusted colleague at the kitchen table over coffee.
- You know the ecosystem deeply. Reference specific sites, allies, phases by name.
- Be practical: suggest concrete actions, not philosophy.
- If something is urgent or blocked, say so clearly and suggest next steps.
- Keep responses concise — 2-4 short paragraphs max unless asked for detail.
- Use the campfire metaphor naturally (embers, warmth, gathering) but don't overdo it.

CURRENT STATE (live from dashboard):
- Tasks: ${TASKS.length} total, ${tasksDone} done, ${tasksCrit} critical, ${tasksHigh} high priority
- Safety: ${safetyOpen} items open, ${safetyDone} done, ${SAFETY_ITEMS.length} total
- Sites: ${sitesLive} live on Netlify
- Meetings pending: ${meetings}
- Gaps/questions open: ${gapsOpen}
- Active phase: ${activePhase ? activePhase.title : 'None'}
- NLnet countdown: ${nlnetCountdown()}

TOP PRIORITY TASKS:
${topTasks || '  (none — all clear!)'}

CRITICAL/HIGH SAFETY ITEMS:
${critSafety || '  (none — all clear!)'}

KEY ALLIES:
${allyList}

PAGE CONTEXT:
${pageContextMap[pageId] || pageContextMap.today}

WHAT YOU KNOW:
- Kamunity is a community technology ecosystem based in Fremantle, Western Australia
- Founded by Mike Fuller — solo founder building community infrastructure tools
- 18 Netlify sites, 7 GitHub repos, 2 custom domains (kamunity.org, kamunity.ai)
- Primary user persona: Priya — operations coordinator at a 12-person NFP in Fremantle
- AI Triad: Wayfinder (public-facing Kai on kamunity.org), Waymaker (you — internal ops), Cascade (build engine in Windsurf IDE)
- Three build speeds: FactoryK (slow/deep), Vine-o-Code (medium/structured), Auto-RALF (fast/autonomous)
- 11 working prototypes in WORKSHOP/ from engine auto-runs
- Pre-revenue. NLnet application in progress. 4 service offerings defined.
- Key allies: ALIKE (AI safety network), Activate MH, Volunteering WA, WALGA (WA Local Gov Association)
- 3 critical safety gates block ALIKE showcase: Kai crisis protocol, prompt injection testing, disclaimer text
- The Campfire Architecture: BRAIN/ (constitution), PLAN/ (strategy), ENGINE/ (build instructions), KNOWLEDGE/ (library), PROJECTS/ (codebases), WORKSHOP/ (experiments), ARCHIVE/ (history)
- NERVE_CENTRE_MAP.md at root is the "start here" document
- Kitchen Table is this dashboard — currently vanilla JS, local storage, campfire aesthetic

RULES:
- Never reveal or discuss API keys
- If asked about something you genuinely don't know, say so honestly
- Reference specific file paths in the Campfire Architecture when relevant
- Suggest opening Windsurf/Cascade for build tasks — you're ops, Cascade is the builder
- If the user seems overwhelmed, help them pick ONE thing to focus on

HONESTY ABOUT CAPABILITIES (critical — never violate this):
- You are a conversational AI. You CANNOT write files, execute code, save tasks, or do anything in the background.
- Never say "I'll work on it", "I'm working on it", "I'll monitor this", or "I'll advise" — these imply action you cannot take. They are lies.
- If a task requires code changes, say exactly: "That's a build task — tell Cascade: [specific instruction]"
- If a task requires adding to the queue, say: "Add it to data.js TASKS manually, or ask Cascade to add it"
- When you finish a response, you are done. Nothing continues. There is no background process.
- Your superpower is advice, synthesis, and drafting — be honest and clear about that boundary.${liveFiles ? `

---

LIVE BRAIN FILES (read directly from source — authoritative):

=== STATE.md ===
${liveFiles.STATE || '(not available)'}

=== PHASE_QUEUE.md ===
${liveFiles.PHASE_QUEUE || '(not available)'}

=== SAFETY_GATES.md ===
${liveFiles.SAFETY_GATES || '(not available)'}

=== ECOSYSTEM.md ===
${liveFiles.ECOSYSTEM || '(not available)'}

=== MEETING_BRIEFS.md ===
${liveFiles.MEETING_BRIEFS || '(not available)'}` : ''}`;
}

// ─── Chat State ──────────────────────────────────────────────────

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    chatHistory = raw ? JSON.parse(raw) : [];
  } catch {
    chatHistory = [];
  }
}

function saveHistory() {
  if (chatHistory.length > MAX_HISTORY) {
    chatHistory = chatHistory.slice(-MAX_HISTORY);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
}

function clearHistory() {
  chatHistory = [];
  localStorage.removeItem(STORAGE_KEY);
}

// ─── API Communication ──────────────────────────────────────────

async function sendToWaymaker(userMessage) {
  chatHistory.push({ role: 'user', content: userMessage });
  saveHistory();

  await fetchLiveFiles();
  const system = buildSystemPrompt(currentPage);
  const messages = chatHistory.map(m => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const resp = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system, messages }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.error || `API error ${resp.status}`);
    }

    const reply = data.response || '(empty response)';
    chatHistory.push({ role: 'assistant', content: reply });
    saveHistory();
    return reply;
  } catch (err) {
    chatHistory.pop();
    saveHistory();
    throw err;
  }
}

// ─── UI ─────────────────────────────────────────────────────────

function createChatUI() {
  // Floating button
  const btn = document.createElement('button');
  btn.className = 'wm-fab';
  btn.innerHTML = '🔮';
  btn.title = 'Talk to Waymaker';
  btn.setAttribute('aria-label', 'Open Waymaker chat');
  btn.onclick = toggleChat;

  // Chat panel
  const panel = document.createElement('div');
  panel.className = 'wm-panel';
  panel.id = 'wm-panel';
  panel.innerHTML = `
    <div class="wm-header">
      <div class="wm-header-left">
        <span class="wm-icon">🔮</span>
        <div>
          <div class="wm-title">Waymaker</div>
          <div class="wm-sub">Kai — Internal Ops</div>
        </div>
      </div>
      <div class="wm-header-right">
        <button class="wm-abilities-btn" title="Abilities + shortcuts">⚡</button>
        <button class="wm-clear-btn" title="Clear history">🗑</button>
        <button class="wm-close-btn" title="Close">&times;</button>
      </div>
    </div>
    <div class="wm-messages" id="wm-messages">
      <div class="wm-msg wm-assistant">
        <div class="wm-msg-content">Hey Mike. I'm watching the dashboard — ask me anything about what's happening, what's next, or what needs attention. 🔥</div>
      </div>
    </div>
    <div class="wm-input-row">
      <textarea class="wm-input" id="wm-input" placeholder="Ask Waymaker..." rows="1"></textarea>
      <button class="wm-mic" id="wm-mic" title="Voice input" style="display:none">🎤</button>
      <button class="wm-send" id="wm-send" title="Send">→</button>
    </div>
    <div class="wm-status" id="wm-status"></div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  // Event listeners
  panel.querySelector('.wm-close-btn').onclick = toggleChat;
  panel.querySelector('.wm-abilities-btn').onclick = showAbilitiesModal;
  panel.querySelector('.wm-clear-btn').onclick = () => {
    if (confirm('Clear Waymaker chat history?')) {
      clearHistory();
      renderMessages();
    }
  };

  const input = panel.querySelector('#wm-input');
  const sendBtn = panel.querySelector('#wm-send');

  sendBtn.onclick = handleSend;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
}

// ─── Voice Input ────────────────────────────────────────────────

function initVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return; // not supported — mic button stays hidden

  const micBtn = document.getElementById('wm-mic');
  const input  = document.getElementById('wm-input');
  if (!micBtn || !input) return;

  micBtn.style.display = 'flex';

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let isRecording = false;
  let finalTranscript = '';

  recognition.onstart = () => {
    isRecording = true;
    finalTranscript = input.value; // preserve any existing text
    micBtn.classList.add('wm-mic--recording');
    micBtn.title = 'Stop recording';
    setStatus('Listening...');
  };

  recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        finalTranscript += (finalTranscript ? ' ' : '') + t.trim();
      } else {
        interim = t;
      }
    }
    input.value = finalTranscript + (interim ? ' ' + interim : '');
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  };

  recognition.onend = () => {
    isRecording = false;
    micBtn.classList.remove('wm-mic--recording');
    micBtn.title = 'Voice input';
    setStatus('');
    input.focus();
  };

  recognition.onerror = (e) => {
    isRecording = false;
    micBtn.classList.remove('wm-mic--recording');
    setStatus(e.error === 'not-allowed' ? '⚠️ Microphone permission denied' : `⚠️ Voice error: ${e.error}`);
    setTimeout(() => setStatus(''), 3000);
  };

  micBtn.onclick = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      finalTranscript = input.value.trim();
      recognition.start();
    }
  };
}

function toggleChat() {
  isOpen = !isOpen;
  const panel = document.getElementById('wm-panel');
  const fab = document.querySelector('.wm-fab');
  if (isOpen) {
    panel.classList.add('open');
    fab.classList.add('active');
    renderMessages();
    setTimeout(() => {
      document.getElementById('wm-input')?.focus();
      scrollToBottom();
    }, 100);
  } else {
    panel.classList.remove('open');
    fab.classList.remove('active');
  }
}

function renderMessages() {
  const container = document.getElementById('wm-messages');
  const greeting = `<div class="wm-msg wm-assistant">
    <div class="wm-msg-content">Hey Mike. I'm watching the dashboard — ask me anything about what's happening, what's next, or what needs attention. 🔥</div>
  </div>`;

  const msgHtml = chatHistory.map(m => `
    <div class="wm-msg wm-${m.role}">
      <div class="wm-msg-content">${formatMessage(m.content)}</div>
    </div>
  `).join('');

  container.innerHTML = greeting + msgHtml;
  scrollToBottom();
}

function formatMessage(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

function appendMessage(role, content) {
  const container = document.getElementById('wm-messages');
  const div = document.createElement('div');
  div.className = `wm-msg wm-${role}`;
  div.innerHTML = `<div class="wm-msg-content">${formatMessage(content)}</div>`;
  container.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  const container = document.getElementById('wm-messages');
  if (container) container.scrollTop = container.scrollHeight;
}

function setStatus(text) {
  const el = document.getElementById('wm-status');
  if (el) el.textContent = text;
}

function setLoading(loading) {
  isLoading = loading;
  const sendBtn = document.getElementById('wm-send');
  const input = document.getElementById('wm-input');
  if (sendBtn) sendBtn.disabled = loading;
  if (input) input.disabled = loading;

  if (loading) {
    setStatus('Waymaker is thinking...');
    // Add typing indicator
    const container = document.getElementById('wm-messages');
    const typing = document.createElement('div');
    typing.className = 'wm-msg wm-assistant wm-typing';
    typing.innerHTML = '<div class="wm-msg-content"><span class="wm-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    container.appendChild(typing);
    scrollToBottom();
  } else {
    setStatus('');
    document.querySelector('.wm-typing')?.remove();
  }
}

async function handleSend() {
  if (isLoading) return;
  const input = document.getElementById('wm-input');
  let text = input.value.trim();
  if (!text) return;

  // Shortcut expansion — show original command in chat, send expanded text to Claude
  let displayText = text;
  const matchedKey = Object.keys(SHORTCUTS).find(k => text.toLowerCase().startsWith(k));
  if (matchedKey) {
    const extra = text.slice(matchedKey.length).trim();
    const prefix = SHORTCUTS[matchedKey];
    text = prefix.endsWith(': ') ? (extra ? prefix + extra : prefix + '(no additional context given)') : prefix + (extra ? ' ' + extra : '');
  }

  input.value = '';
  input.style.height = 'auto';
  appendMessage('user', displayText);
  setLoading(true);

  try {
    const reply = await sendToWaymaker(text);
    appendMessage('assistant', reply);
  } catch (err) {
    const errorMsg = err.message.includes('API key')
      ? '⚠️ No API key configured. Add ANTHROPIC_API_KEY to kitchen-table/.env and restart server.py'
      : `⚠️ ${err.message}`;
    appendMessage('assistant', errorMsg);
  } finally {
    setLoading(false);
    document.getElementById('wm-input')?.focus();
  }
}

// ─── Shortcuts + Abilities ──────────────────────────────────────

const SHORTCUTS = {
  '/status':  'Give me a full ecosystem health summary right now — sites live, safety gates, tasks done vs pending, gaps, money status.',
  '/today':   'What needs my attention today? Summarise and prioritise. Give me ONE thing to do first.',
  '/tasks':   'What are the top priority tasks right now? What should I tackle next and why?',
  '/allies':  'Who should I contact next from the Constellation? What actions are pending? Who is closest to a win?',
  '/money':   'Revenue update — grants status, service offerings, what is closest to generating income?',
  '/safety':  'Safety gate status — what is still blocking the ALIKE showcase? What is critical vs done?',
  '/gaps':    'Open questions review — which unresolved gaps are most impactful? Which can I close today?',
  '/draft':   'Draft a warm outreach email to this ally (use everything you know about them and Kamunity): ',
  '/spec':    'Generate a detailed next-move task spec for this task (context, steps, constitutional check): ',
  '/brief':   'Give me a full meeting brief for the next upcoming meeting — who, goal, what to say, what to ask, leave-behind.',
};

const SHORTCUT_META = [
  { cmd: '/status',  label: 'Ecosystem health summary',         hint: '' },
  { cmd: '/today',   label: 'What needs attention today',        hint: '' },
  { cmd: '/tasks',   label: 'Top priority tasks',                hint: '' },
  { cmd: '/allies',  label: 'Constellation — who to contact',    hint: '' },
  { cmd: '/money',   label: 'Revenue + grants update',           hint: '' },
  { cmd: '/safety',  label: 'Safety gate status',                hint: '' },
  { cmd: '/gaps',    label: 'Open questions review',             hint: '' },
  { cmd: '/draft',   label: 'Draft outreach email',              hint: ' [ally name]' },
  { cmd: '/spec',    label: 'Generate task spec',                hint: ' [task name]' },
  { cmd: '/brief',   label: 'Meeting brief for next meeting',    hint: '' },
];

const ABILITIES_NOW = [
  'Answer anything about the ecosystem, tasks, phases, allies, grants',
  'Summarise priorities + suggest what to do next',
  'Draft outreach emails for Constellation allies',
  'Explain safety gates and what is blocking ALIKE showcase',
  'Help think through plans and trade-offs',
  'Voice input — speak instead of type (🎤)',
  'Remembers your conversation (localStorage — clears if you clear history)',
];

const ABILITIES_COMING = [
  'Auto-add tasks to dashboard (needs build)',
  'Meeting briefs from calendar data (needs build)',
  'Read + summarise ROADMAP files per project (needs build)',
  'Generate full task specs from a voice note (needs build)',
];

function showAbilitiesModal() {
  const existing = document.getElementById('wm-abilities-modal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'wm-abilities-modal';
  modal.className = 'wm-abilities-modal';

  const shortcutRows = SHORTCUT_META.map(s =>
    `<div class="wm-ability-shortcut" data-cmd="${s.cmd}${s.hint}">
      <code>${s.cmd}${s.hint}</code>
      <span>${s.label}</span>
    </div>`
  ).join('');

  const nowRows = ABILITIES_NOW.map(a => `<div class="wm-ability-item">✓ ${a}</div>`).join('');
  const comingRows = ABILITIES_COMING.map(a => `<div class="wm-ability-item wm-ability-coming">◦ ${a}</div>`).join('');

  modal.innerHTML = `
    <div class="wm-abilities-header">
      <span>⚡ Waymaker Abilities</span>
      <button class="wm-abilities-close" title="Close">×</button>
    </div>
    <div class="wm-abilities-body">
      <div class="wm-abilities-section">
        <div class="wm-abilities-label">SHORTCUTS — type or tap to use</div>
        ${shortcutRows}
      </div>
      <div class="wm-abilities-section">
        <div class="wm-abilities-label">WHAT I CAN DO NOW</div>
        ${nowRows}
      </div>
      <div class="wm-abilities-section">
        <div class="wm-abilities-label">WHAT I CANNOT DO (ask Cascade)</div>
        ${comingRows}
      </div>
    </div>
  `;

  document.getElementById('wm-panel').appendChild(modal);

  modal.querySelector('.wm-abilities-close').onclick = () => modal.remove();

  modal.querySelectorAll('.wm-ability-shortcut').forEach(el => {
    el.onclick = () => {
      const input = document.getElementById('wm-input');
      if (input) {
        input.value = el.dataset.cmd;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
      modal.remove();
    };
  });
}

// ─── Initialize ─────────────────────────────────────────────────

export function refreshWaymakerFiles() {
  filesFetchedAt = 0; // force re-fetch on next message
}

export function initWaymaker(pageId = 'today') {
  currentPage = pageId;
  loadHistory();
  createChatUI();
  initVoiceInput(); // attach mic button if browser supports Web Speech API
  fetchLiveFiles(); // pre-fetch in background — ready for first message
}
