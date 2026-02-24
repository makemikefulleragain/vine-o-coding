// THE KITCHEN TABLE — widgets.js
// Today page widgets: rhythm reminder, NLnet countdown, ally follow-up tracker

import { ALLIES, TASKS } from './data.js';
import { weeklyRhythm, nlnetDays } from './utils.js';
import { esc } from './utils.js';

// ─── Weekly Rhythm Reminder ───────────────────────────────────────

function renderRhythm() {
  const r = weeklyRhythm();
  return `
    <div class="widget rhythm-widget" style="background:var(--surface); border-radius:var(--rl); padding:16px; margin-bottom:12px; display:flex; gap:12px; align-items:center;">
      <div class="widget-icon" style="font-size:2rem; background:var(--bg); border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${r.icon}</div>
      <div class="widget-body">
        <div class="widget-label" style="font-family:'Fraunces', serif; color:var(--ember); font-size:1.1rem; margin-bottom:2px;">${r.label} Rhythm</div>
        <div class="widget-text" style="font-size:0.85rem; color:var(--text); line-height:1.4;">${esc(r.action)}</div>
      </div>
    </div>
  `;
}

// ─── NLnet Countdown ──────────────────────────────────────────────

function renderNLnet() {
  const days = nlnetDays();
  if (days > 45) return ''; // only show when it matters

  const urgencyColor = days <= 14 ? 'var(--danger)' : days <= 30 ? 'var(--ember)' : 'var(--text)';
  const label = days > 0 ? `${days} days` : 'DUE NOW';
  const sub = days > 0
    ? `NLnet NGI Zero Commons deadline — April 1, 2026 (€35K ask)`
    : `NLnet deadline has passed — submit if not yet done`;

  return `
    <div class="widget nlnet-widget" style="background:var(--surface); border-radius:var(--rl); padding:16px; margin-bottom:12px; display:flex; gap:12px; align-items:center; border:1px solid ${urgencyColor};">
      <div class="widget-icon" style="font-size:2rem; background:var(--bg); border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">⏳</div>
      <div class="widget-body" style="flex:1;">
        <div class="widget-label" style="font-family:'Fraunces', serif; color:${urgencyColor}; font-size:1.1rem; margin-bottom:2px;">${label} to NLnet</div>
        <div class="widget-text" style="font-size:0.85rem; color:var(--dim); line-height:1.4;">${sub}</div>
      </div>
      <a href="money.html" class="widget-action" style="font-size:0.85rem; color:var(--sky); text-decoration:none; padding:8px; background:var(--bg); border-radius:var(--r);">View →</a>
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
    <div class="followup-card followup-card--meeting" style="background:var(--surface); border-radius:var(--r); padding:10px; margin-top:8px;">
      <div class="followup-name" style="font-family:'Fraunces', serif; color:var(--ember);">${esc(a.name)}</div>
      <div class="followup-status" style="font-size:0.75rem; color:var(--dim);">${esc(a.status)}</div>
      <div class="followup-action" style="font-size:0.75rem; color:var(--text);">${esc(a.action)}</div>
    </div>
  `).join('');

  const contactCards = toContact.map(a => `
    <div class="followup-card followup-card--contact" style="background:var(--surface); border-radius:var(--r); padding:10px; margin-top:8px;">
      <div class="followup-name" style="font-family:'Fraunces', serif; color:var(--sky);">${esc(a.name)}</div>
      <div class="followup-status" style="font-size:0.75rem; color:var(--dim);">${esc(a.status)}</div>
      <div class="followup-action" style="font-size:0.75rem; color:var(--text);">${esc(a.action)}</div>
    </div>
  `).join('');

  const followUpBanner = needsFollowUp ? `
    <div class="followup-banner" style="background:var(--danger); color:#fff; padding:8px 12px; border-radius:var(--r); font-size:0.8rem; margin-top:8px;">
      ⚡ You have completed meetings — follow up within 24hrs.
      <a href="allies.html" style="color:#fff; text-decoration:underline;">Open Allies →</a>
    </div>
  ` : '';

  return `
    <div class="widget ally-widget" style="margin-top:16px;">
      <div class="widget-header" style="display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--hover); padding-bottom:4px;">
        <span class="widget-icon">⭐</span>
        <span class="widget-label" style="font-family:'Fraunces', serif; color:var(--text); font-size:1.1rem;">Ally Radar</span>
        <a href="allies.html" class="widget-action" style="margin-left:auto; font-size:0.8rem; color:var(--sky); text-decoration:none;">All allies →</a>
      </div>
      ${followUpBanner}
      <div class="followup-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
        ${meetingCards}
        ${contactCards}
      </div>
    </div>
  `;
}

// ─── Revenue & Pipeline Tracker ─────────────────────────────────────

function renderPipeline() {
  return `
    <div class="widget pipeline-widget" style="background:var(--surface); border-radius:var(--rl); padding:16px; margin-bottom:12px; display:flex; gap:12px; align-items:center; border:1px solid var(--moss);">
      <div class="widget-icon" style="font-size:2rem; background:var(--bg); border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">💰</div>
      <div class="widget-body" style="flex:1;">
        <div class="widget-label" style="font-family:'Fraunces', serif; color:var(--moss); font-size:1.1rem; margin-bottom:2px;">Consulting Pipeline</div>
        <div class="widget-text" style="font-size:0.85rem; color:var(--dim); line-height:1.4;">
          <strong>$10k-$20k</strong> received · <strong>$10k</strong> outstanding invoice<br>
          <em>Runway secured. Ops stable.</em>
        </div>
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
    renderPipeline(),
    renderNLnet(),
    renderAllyFollowUps(),
  ].filter(Boolean).join('');

  el.innerHTML = html || '';
}