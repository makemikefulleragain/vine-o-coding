import { initNav }      from './nav.js';
import { initCompose }  from './compose.js';
import { SITES, loadState } from './data.js';
import { initWaymaker } from './waymaker.js';

loadState();
initNav('ecosystem-map');
initCompose();
initWaymaker('ecosystem-map');

// ── VIEW SWITCHER ──────────────────────────────────────────────
window.switchView = v => {
  ['blueprint', 'vsm', 'simple'].forEach(id => {
    document.getElementById(id + '-view').style.display = id === v ? 'block' : 'none';
    document.getElementById('vb-' + id).classList.toggle('active', id === v);
  });
  const bpTog = document.getElementById('bp-tog');
  if (bpTog) bpTog.style.display = v === 'blueprint' ? 'flex' : 'none';
  const vsmTog = document.getElementById('vsm-tog');
  if (vsmTog) vsmTog.style.display = v === 'vsm' ? 'flex' : 'none';
  const div = document.getElementById('mc-div');
  if (div) div.style.display = v === 'simple' ? 'none' : 'block';
};

window.tog = (btn, cls, wid, inv) => {
  const w = document.getElementById(wid);
  w.classList.toggle(cls);
  btn.classList.toggle('on', inv ? !w.classList.contains(cls) : w.classList.contains(cls));
};

// ── SITE → BLUEPRINT COLUMN ────────────────────────────────────
const STAGE = {
  'Kai — Encounter Interface':         'discover',
  'Kamunity.Ai — Community Rooms':     'discover',
  'Kai Constitution':                  'discover',
  'AI Readiness Assessment':           'understand',
  'Digital Sovereignty Audit':         'understand',
  'Sovereignty Calculator':            'understand',
  'Copilot Risk Check':                'understand',
  'Grant Acquittal Helper':            'act',
  'FactoryK — Community Build System': 'act',
  'Outcome Vine Coding':               'act',
  "Nonna's Knitting Circle":           'grow',
};

const byStage = {};
SITES.forEach(s => {
  const st = STAGE[s.name];
  if (st) (byStage[st] = byStage[st] || []).push(s);
});

const chip = (label, cls, url) => {
  const click = url ? `onclick="window.open('${url}','_blank')" style="cursor:pointer"` : '';
  return `<span class="chip ${cls}" ${click}>${label}</span>`;
};

// ── BLUEPRINT LANE DATA ────────────────────────────────────────
const LANES = [
  {
    id: 'l1', label: '🧑 Community', sub: 'visible experience',
    cells: {
      discover:   { emo: '😰', text: '"Worried about AI, tool costs, or data risk — not sure where to start"',
                    flows: ['Entry: Google, ally referral, word of mouth'], safe: [] },
      understand: { emo: '🧐', text: 'Explores tools, takes quizzes, reads constitution, checks risk rating',
                    flows: ['All quiz results stay on-device — zero data collection'], safe: [] },
      act:        { emo: '💡', text: 'Applies insight — shares with colleagues, contacts Kamunity, requests workshop',
                    flows: [], safe: ['S5: Honest disclaimer visible without scrolling'] },
      grow:       { emo: '🌱', text: 'Advocates for peers, refers other orgs, proposes constitution amendments',
                    flows: [], safe: [] },
    }
  },
  {
    sep: 'LINE OF INTERACTION',
    id: 'l2', label: '🔥 Kai + Tools', sub: 'frontstage',
    cells: {
      discover:   { stage: 'discover',   plans: [],
                    flows: ['Kai surfaces cards based on conversation context'],
                    safe:  ['S1: Crisis protocol hardcoded — never AI-generated'] },
      understand: { stage: 'understand', plans: [],
                    flows: ['ecosystem-state.json → Kai knows all tools + descriptions'], safe: [] },
      act:        { stage: 'act',        plans: [], flows: [], safe: [] },
      grow:       { stage: 'grow',
                    plans: ['Perth Directory (Phase 2)', 'Community Rooms (Phase 3)', 'Pattern Dashboard (Phase 3)'],
                    flows: [], safe: [] },
    }
  },
  {
    sep: 'LINE OF VISIBILITY',
    id: 'l3', label: '💾 Data / Infra', sub: 'backstage',
    cells: {
      discover:   { items: ['llms.txt on all 11 sites', 'All sites → kamunity.org cross-links'],
                    flows: ['AI crawlers discover tools via llms.txt'], safe: [] },
      understand: { items: ['ecosystem-state.json → Kai prompt', 'constitution.md → AI guardrails', 'BRAIN/PLAN → Waymaker context'],
                    flows: ['Constitution + state read on every Kai request'],
                    safe:  ['S12: Ecosystem state integrity (open)'] },
      act:        { items: ['GitHub → Netlify CI/CD · 6 repos', '11 live sites · Anthropic Claude API · ElevenLabs TTS'],
                    flows: [], safe: [] },
      grow:       { items: ['session-end: BRAIN/PLAN → kitchen-table/data/', 'Weekly ecosystem-state.json rhythm', 'Supabase (future — Community Rooms)'],
                    flows: ['Data flows one-way: BRAIN → KT snapshot'], safe: [] },
    }
  },
  {
    id: 'l4', label: '🔨 Build / Ops', sub: 'support layer',
    cells: {
      discover:   { items: ['Cascade (builder AI)', 'Waymaker (ops AI)', 'Kitchen Table dashboard'],
                    flows: [], safe: [] },
      understand: { items: ['47 tasks · 6 phases tracked', 'STATE.md updated each session', 'Safety gate check every build'],
                    flows: ['Waymaker reads full BRAIN/PLAN markdown'],
                    safe:  ['S3: Insurance ⚠️ OPEN — blocks revenue', 'Resolve before ALIKE engagement'] },
      act:        { items: ['4 consulting services (NFP pricing)', 'NLnet grant €35K — due Apr 1', '3 meetings: ALIKE · Activate MH · AI Speaker'],
                    flows: [], safe: [] },
      grow:       { items: ['16 allies mapped · 3 meetings this week', 'WACOSS · Linkwest · Spacecubed to contact', 'Infoxchange (May) · Bangkok (Nov)'],
                    flows: [], safe: [] },
    }
  },
];

const COLS = ['discover', 'understand', 'act', 'grow'];

// ── RENDER BLUEPRINT ───────────────────────────────────────────
function renderBlueprint() {
  let h = `
    <div class="bpch e"></div>
    <div class="bpch">🔍 Discover</div>
    <div class="bpch">🧭 Understand</div>
    <div class="bpch">⚡ Act</div>
    <div class="bpch">🌱 Grow</div>`;

  LANES.forEach(lane => {
    if (lane.sep) {
      h += `<div class="bpsep">── ${lane.sep} ──────────────────────────────────────────────</div>`;
    }
    h += `<div class="bplh ${lane.id}">${lane.label}<span class="sl">${lane.sub}</span></div>`;

    COLS.forEach(col => {
      const c = lane.cells[col];
      let inner = '';

      if (c.emo)  inner += `<span class="emo">${c.emo}</span>`;
      if (c.text) inner += `<div class="jtext">${c.text}</div>`;

      if (c.stage !== undefined) {
        const chips = (byStage[c.stage] || [])
          .map(s => chip(s.name.split('—')[0].trim(), 'cl', s.url)).join('');
        inner += `<div class="chips">${chips}</div>`;
      }
      if (c.plans && c.plans.length) {
        inner += `<div class="chips pi" style="margin-top:4px">${c.plans.map(p => chip(p, 'cp')).join('')}</div>`;
      }
      if (c.items && c.items.length) {
        const cls = lane.id === 'l3' ? 'cd' : 'co';
        inner += `<div class="chips">${c.items.map(i => chip(i, cls)).join('')}</div>`;
      }
      (c.flows || []).forEach(f => { inner += `<div class="fi">↔ ${f}</div>`; });
      (c.safe  || []).forEach(s => { inner += `<div class="si">⚠ ${s}</div>`; });

      h += `<div class="bpcell ${lane.id}">${inner}</div>`;
    });
  });

  document.getElementById('bp-wrap').innerHTML = h;
}

// ── PRIYA STEPS ────────────────────────────────────────────────
const PRIYA = [
  { emo: '😰', title: 'Stuck',
    desc: "Priya's org is being pushed to adopt Microsoft Copilot. She's worried but doesn't know the right questions to ask.",
    time: 'Day 0' },
  { emo: '🔥', title: 'Finds Kai',
    desc: "She finds kamunity.org. Kai asks what's happening — no jargon. She types one sentence.",
    time: '2 minutes' },
  { emo: '🧭', title: 'Understands',
    desc: 'Kai surfaces the Copilot Risk Check. 5 questions. Risk rating: High. Specific findings + action steps.',
    time: '5 minutes' },
  { emo: '💡', title: 'Acts',
    desc: "She shares the report with her CEO. They pause the Copilot rollout and book a Kamunity AI Readiness Workshop.",
    time: 'Same week' },
  { emo: '🤝', title: 'Grows',
    desc: 'After the workshop she tells three peer orgs. Each does the audit. The network grows — one conversation at a time.',
    time: 'One month later' },
];

function renderPriya() {
  document.getElementById('priya-strip').innerHTML = PRIYA.map(s => `
    <div class="pstep">
      <span class="pemo">${s.emo}</span>
      <div class="ptitle">${s.title}</div>
      <div class="pdesc">${s.desc}</div>
      <div class="ptime">${s.time}</div>
    </div>`).join('');
}

// ── VSM DATA ──────────────────────────────────────────────────
const VSMDATA = [
  { label:'P1 — Now',       hcls:'now', bcls:'pc1',
    community: 'Worried about AI adoption · tool costs · data risk · being left behind',
    product:   'Kai · AI Readiness · Sovereignty Audit · Calculator · Copilot Check · FactoryK · Vine-o-Code · Grants Hub · Constitution · Nonna\'s',
    ops:       '47 tasks tracked · Kitchen Table v2 · Waymaker AI · 3 meetings this week · NLnet grant draft',
    flow:      'ecosystem-state.json → Kai prompt · BRAIN/PLAN → Waymaker · session-end → KT data snapshot',
    waste: [{l:'Insurance ⚠️ — blocks revenue',s:'crit'},{l:'Legal entity not formed',s:'high'},{l:'Financial runway',s:'high'}] },
  { label:'P2 — Wks 3–6',  hcls:'near', bcls:'pc2',
    community: 'Needs local services · wants verified referrals to trusted help',
    product:   'Perth Directory (13 life domains) · Referral intelligence · Expanded Kai sector sensing',
    ops:       'WACOSS + Linkwest contacted · First consulting revenue · Directory verification team',
    flow:      'Verified CSV → Kai context · Org listings → directory',
    waste: [{l:'Directory verification labour',s:'high'},{l:'Auspicing partner',s:'high'},{l:'Cultural safety review',s:'high'}] },
  { label:'P3 — Wks 7–12', hcls:'mid', bcls:'pc3',
    community: 'Wants async peer connection · shared patterns · community-governed AI',
    product:   'Community Rooms · Kai as facilitator · Vibes indicator · Pattern Dashboard',
    ops:       'Supabase persistence · Moderation model · Cultural safety protocol · NLnet milestone 1',
    flow:      'Room conversations → anonymised patterns → Pattern Dashboard',
    waste: [{l:'Moderation model undefined',s:'high'},{l:'Trust marks (scam risk)',s:'crit'}] },
  { label:'P4 — Mo 4–6',   hcls:'fut', bcls:'pcf',
    community: 'Local orgs want their own Kai instance',
    product:   'Neighbourhood Kai instances · Federated patterns · Vine-o-Code as product',
    ops:       'Trust mark system · Deploy methodology published · 20+ orgs target',
    flow:      'Local Kai → federated pattern sharing',
    waste: [{l:'API cost dependency',s:'med'}] },
  { label:'P5 — Mo 6–12',  hcls:'fut', bcls:'pcf',
    community: 'Community governs the AI directly',
    product:   'Open-source model · Polis constitutional convention · Self-hosted option',
    ops:       'NLnet funded (if successful) · Legal entity active · International allies engaged',
    flow:      'Community votes → constitution amended → model behaviour updated',
    waste: [] },
  { label:'P6 — Year 2',   hcls:'fut', bcls:'pcf',
    community: 'Other communities worldwide replicate the model',
    product:   '"Build Your Kai" methodology · Global Solidarity AI network · Open commons',
    ops:       'Infoxchange conference · Bangkok Solidarity AI · International replication',
    flow:      'Kamunity methodology → globally replicated as open commons',
    waste: [] },
];

function renderVSM() {
  const wrap = document.getElementById('vsm-wrap');
  wrap.style.gridTemplateColumns = '85px repeat(6, minmax(155px, 1fr))';
  let h = '';

  // Phase headers
  h += `<div style="border:none;background:transparent"></div>`;
  VSMDATA.forEach(p => { h += `<div class="vph ${p.hcls} ${p.bcls}">${p.label}</div>`; });

  // Content layers
  [['community','Community'],['product','Product / Tool'],['ops','Build / Ops']].forEach(([key, lbl]) => {
    h += `<div class="vll">${lbl}</div>`;
    VSMDATA.forEach(p => { h += `<div class="vcell ${p.bcls}">${p[key]}</div>`; });
  });

  // Data flow row (toggled via show-flows on vsm-wrap)
  h += `<div class="vflow-label">Data Flow</div>`;
  VSMDATA.forEach(p => { h += `<div class="vfcell ${p.bcls}">${p.flow}</div>`; });

  // Waste row (toggled via show-waste on vsm-wrap)
  h += `<div class="wlabel">Waste / Gaps</div>`;
  VSMDATA.forEach(p => {
    const kz = p.waste.map(w => `<span class="kz ${w.s}">${w.l}</span>`).join('');
    h += `<div class="wcell ${p.bcls}">${kz || '<span style="opacity:.3;font-size:.6rem">—</span>'}</div>`;
  });

  wrap.innerHTML = h;
}

// ── INIT ───────────────────────────────────────────────────────
renderBlueprint();
renderPriya();
renderVSM();
