// THE KITCHEN TABLE — widgets.js
// Today page widgets: rhythm reminder, NLnet countdown, ally follow-up tracker

import { ALLIES, TASKS } from './data.js';
import { weeklyRhythm, nlnetDays } from './utils.js';
import { esc } from './utils.js';

// ─── Weekly Rhythm Reminder ───────────────────────────────────────

function renderRhythm() {
  const r = weeklyRhythm();
  const typeClass = {
    check:    'rhythm--check',
    work:     'rhythm--work',
    outreach: 'rhythm--outreach',
    wrap:     'rhythm--wrap',
    rest:     'rhythm--rest',
  }[r.type] || 'rhythm--work';

  return `
    <div class="widget rhythm-widget ${typeClass}">
      <div class="widget-icon">${r.icon}</div>
      <div class="widget-body">
        <div class="widget-label">${r.label} Rhythm</div>
        <div class="widget-text">${esc(r.action)}</div>
      </div>
    </div>
  `;
}

// ─── NLnet Countdown ──────────────────────────────────────────────

function renderNLnet() {
  const days = nlnetDays();
  if (days > 45) return ''; // only show when it matters

  const urgencyClass = days <= 14 ? 'nlnet--urgent' : days <= 30 ? 'nlnet--warning' : 'nlnet--normal';
  const label = days > 0 ? `${days} days` : 'DUE NOW';
  const sub = days > 0
    ? `NLnet NGI Zero Commons deadline — April 1, 2026 (€35K ask)`
    : `NLnet deadline has passed — submit if not yet done`;

  return `
    <div class="widget nlnet-widget ${urgencyClass}">
      <div class="widget-icon">⏳</div>
      <div class="widget-body">
        <div class="widget-label">${label} to NLnet</div>
        <div class="widget-text">${sub}</div>
      </div>
      <a href="money.html" class="widget-action">View →</a>
    </div>
  `;
}

// ─── Ally Follow-Up Tracker ───────────────────────────────────────

function renderAllyFollowUps() {
  // Upcoming meetings
  const meetings = ALLIES.filter(a =>
    /next week|interview|meeting/i.test(a.status) && a.tier === 1
  );

  // Overdue follow-ups: meeting tasks done but follow-up (t11) not done
  const followUpTask = TASKS.find(t => t.id === 't11');
  const meetingsDone = TASKS.filter(t =>
    t.tags.includes('meeting') && t.done && t.id !== 't11'
  );
  const needsFollowUp = followUpTask && !followUpTask.done && meetingsDone.length > 0;

  // Tier-1 allies ready to contact
  const toContact = ALLIES.filter(a =>
    /^to contact$/i.test(a.status.trim()) && a.tier === 1
  ).slice(0, 3);

  if (!meetings.length && !needsFollowUp && !toContact.length) return '';

  const meetingCards = meetings.map(a => `
    <div class="followup-card followup-card--meeting">
      <div class="followup-name">${esc(a.name)}</div>
      <div class="followup-status">${esc(a.status)}</div>
      <div class="followup-action">${esc(a.action)}</div>
    </div>
  `).join('');

  const contactCards = toContact.map(a => `
    <div class="followup-card followup-card--contact">
      <div class="followup-name">${esc(a.name)}</div>
      <div class="followup-status">${esc(a.status)}</div>
      <div class="followup-action">${esc(a.action)}</div>
    </div>
  `).join('');

  const followUpBanner = needsFollowUp ? `
    <div class="followup-banner">
      ⚡ You have completed meetings — follow up within 24hrs.
      <a href="allies.html">Open Allies →</a>
    </div>
  ` : '';

  return `
    <div class="widget ally-widget">
      <div class="widget-header">
        <span class="widget-icon">⭐</span>
        <span class="widget-label">Ally Radar</span>
        <a href="allies.html" class="widget-action">All allies →</a>
      </div>
      ${followUpBanner}
      <div class="followup-grid">
        ${meetingCards}
        ${contactCards}
      </div>
    </div>
  `;
}

// ─── Compose + render ─────────────────────────────────────────────

export function renderTodayWidgets(mountId) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const html = [
    renderRhythm(),
    renderNLnet(),
    renderAllyFollowUps(),
  ].filter(Boolean).join('');

  el.innerHTML = html || '';
}
