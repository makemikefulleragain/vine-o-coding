// THE KITCHEN TABLE — tasks.js
// Task rendering, filtering, and state management

import { TASKS, PHASES, saveTaskState } from './data.js';
import { priLabel, phaseLabel, tagBadge } from './utils.js';

// Expose togDetail and togDone globally for onclick handlers in HTML strings
window.KT = window.KT || {};

window.KT.togDetail = function(id) {
  const el = document.getElementById('d-' + id);
  if (el) el.classList.toggle('open');
};

window.KT.togDone = function(id, rerender) {
  const t = TASKS.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  saveTaskState(id, t.done);
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) {
    el.classList.toggle('is-done', t.done);
    const span = el.querySelector('.task-text');
    if (span) span.classList.toggle('struck', t.done);
    const cb = el.querySelector('input[type=checkbox]');
    if (cb) cb.checked = t.done;
  }
  if (typeof rerender === 'function') rerender();
};

export function renderTask(t) {
  const tags = t.tags.filter(x => x !== 'today');
  return `
<div class="task p-${t.pri}${t.done ? ' is-done' : ''}" data-id="${t.id}">
  <div class="task-row" onclick="KT.togDetail('${t.id}')">
    <input type="checkbox" ${t.done ? 'checked' : ''}
      onclick="event.stopPropagation(); KT.togDone('${t.id}')"
      aria-label="Mark complete">
    <div class="task-content">
      <div class="task-text${t.done ? ' struck' : ''}">${t.text}</div>
      <div class="task-tags">
        ${priLabel(t.pri)}
        ${phaseLabel(t.phase)}
        ${tags.map(tagBadge).join('')}
      </div>
    </div>
  </div>
  <div class="task-detail" id="d-${t.id}" role="region">
    <div class="task-notes">${t.detail}</div>
    <div class="btn-row">
      ${t.tags.includes('outreach')
        ? `<button class="btn btn-ghost" onclick="KT.openCM('${t.text.split('—')[0].trim()}')">✉ Draft Email</button>`
        : ''}
    </div>
  </div>
</div>`.trim();
}

export function renderGroup(label, tasks, collapsible = true) {
  const done = tasks.filter(t => t.done).length;
  return `
<div class="tg">
  <div class="tg-head${collapsible ? ' collapsible' : ''}" onclick="${collapsible ? "this.nextElementSibling.classList.toggle('collapsed')" : ''}">
    ${label}
    <span class="tg-count">${done}/${tasks.length}</span>
  </div>
  <div class="tg-body">
    ${tasks.map(renderTask).join('')}
  </div>
</div>`.trim();
}

export function renderTodayGroups(container) {
  const today = TASKS.filter(t => t.tags.includes('today'));
  const groupDef = [
    { key: 'critical',  label: '🔴 Critical — Before Meetings', test: t => t.pri === 'critical' },
    { key: 'meeting',   label: '📅 Meeting Prep',               test: t => t.tags.includes('meeting') && t.pri !== 'critical' },
    { key: 'build',     label: '🔧 Build',                      test: t => t.tags.includes('build') && !t.tags.includes('meeting') && t.pri !== 'critical' },
    { key: 'revenue',   label: '💰 Revenue',                    test: t => t.tags.includes('revenue') && !t.tags.includes('meeting') && t.pri !== 'critical' },
    { key: 'other',     label: '📋 Other',                      test: () => true },
  ];

  const assigned = new Set();
  const groups = groupDef.map(g => {
    const tasks = today.filter(t => !assigned.has(t.id) && g.test(t));
    tasks.forEach(t => assigned.add(t.id));
    return { label: g.label, tasks };
  }).filter(g => g.tasks.length);

  container.innerHTML = groups.map(g => renderGroup(g.label, g.tasks)).join('');
}

export function renderAllTaskGroups(container, filter = 'all') {
  let tasks = [...TASKS];
  if (filter === 'done')       tasks = tasks.filter(t => t.done);
  else if (filter === 'open')  tasks = tasks.filter(t => !t.done);
  else if (filter === 'p4+')   tasks = tasks.filter(t => ['p4','p5','p6'].includes(t.phase));
  else if (filter.startsWith('p')) tasks = tasks.filter(t => t.phase === filter);
  else if (filter !== 'all')   tasks = tasks.filter(t => t.tags.includes(filter));

  // Group by phase
  const phaseOrder = ['p1','p2','p3','p4','p5','p6',''];
  const groups = {};
  tasks.forEach(t => {
    const ph = PHASES.find(p => p.key === t.phase);
    const key = t.phase || 'unphased';
    const label = ph ? ph.title : 'Unphased';
    if (!groups[key]) groups[key] = { label, tasks: [] };
    groups[key].tasks.push(t);
  });

  const html = phaseOrder
    .filter(k => groups[k])
    .map(k => renderGroup(groups[k].label, groups[k].tasks))
    .join('');

  container.innerHTML = html || '<p class="empty-msg">No tasks match this filter.</p>';
}

export const TASK_FILTERS = [
  { k: 'all',      l: 'All' },
  { k: 'open',     l: 'Open' },
  { k: 'done',     l: 'Done' },
  { k: 'p1',       l: 'Phase 1' },
  { k: 'p2',       l: 'Phase 2' },
  { k: 'p3',       l: 'Phase 3' },
  { k: 'p4+',      l: 'P4+' },
  { k: 'safety',   l: 'Safety' },
  { k: 'build',    l: 'Build' },
  { k: 'revenue',  l: 'Revenue' },
  { k: 'outreach', l: 'Outreach' },
  { k: 'meeting',  l: 'Meetings' },
  { k: 'grants',   l: 'Grants' },
];

export function renderFilterBar(container, activeFilter, onFilter) {
  container.innerHTML = TASK_FILTERS.map(f =>
    `<button class="fbtn${f.k === activeFilter ? ' active' : ''}"
      onclick="KT._setFilter('${f.k}')">${f.l}</button>`
  ).join('');
  window.KT._setFilter = (f) => {
    container.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
    const btn = [...container.querySelectorAll('.fbtn')].find(b => b.textContent.trim() === TASK_FILTERS.find(x => x.k === f)?.l);
    if (btn) btn.classList.add('active');
    onFilter(f);
  };
}

export function updateStats(ids) {
  const done = TASKS.filter(t => t.done).length;
  const total = TASKS.length;
  const crit = TASKS.filter(t => t.pri === 'critical' && !t.done).length;
  if (ids.done)  document.getElementById(ids.done).textContent  = done;
  if (ids.total) document.getElementById(ids.total).textContent = total;
  if (ids.crit)  document.getElementById(ids.crit).textContent  = crit;
}
