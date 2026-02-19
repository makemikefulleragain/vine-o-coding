// THE KITCHEN TABLE — utils.js
// Shared utility functions

export function nlnetDays() {
  const deadline = new Date('2026-04-01T12:00:00+02:00');
  return Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
}

export function nlnetCountdown() {
  const d = nlnetDays();
  return d > 0 ? d + 'd' : 'DUE';
}

export function weeklyRhythm() {
  const day = new Date().getDay();
  return [
    { icon: '🌿', label: 'Sunday',    action: 'Rest day. Let it settle. The system runs without you for one day.', type: 'rest' },
    { icon: '🌅', label: 'Monday',    action: '30-min weekly check — update STATE.md → glance SAFETY_GATES.md → review PHASE_QUEUE.md → ecosystem pulse.', type: 'check' },
    { icon: '🔥', label: 'Tuesday',   action: 'Deep work day. One priority. Close the door.', type: 'work' },
    { icon: '⚡', label: 'Wednesday', action: 'Mid-week pulse — still on track? Adjust if not. Ask Waymaker for a pulse check.', type: 'check' },
    { icon: '🔥', label: 'Thursday',  action: 'Deep work day. Push it forward.', type: 'work' },
    { icon: '📤', label: 'Friday',    action: 'Outreach day — emails, ally follow-ups, proposals. Send the thing you\'ve been sitting on.', type: 'outreach' },
    { icon: '🧘', label: 'Saturday',  action: 'Week wrap — what landed? What carries over? What to let go?', type: 'wrap' },
  ][day];
}

export function badge(cls, text) {
  return `<span class="badge b-${cls}">${text}</span>`;
}

export function priLabel(pri) {
  if (pri === 'critical') return badge('critical', 'CRITICAL');
  if (pri === 'high') return badge('high', 'HIGH');
  return '';
}

export function phaseLabel(phase) {
  if (!phase) return '';
  return badge(phase, phase.toUpperCase());
}

export function tagBadge(tag) {
  const labels = {
    safety: 'Safety', build: 'Build', revenue: 'Revenue',
    outreach: 'Outreach', meeting: 'Meeting', grants: 'Grants'
  };
  return badge(tag, labels[tag] || tag);
}

export function statusBadge(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('meeting') || s.includes('interview')) return badge('active', status);
  if (s.includes('contact') || s.includes('drafting') || s.includes('submit')) return badge('high', status);
  if (s.includes('map') || s.includes('investigate') || s.includes('monitor')) return badge('waiting', status);
  return badge('waiting', status);
}

export function completionBar(done, total) {
  if (!total) return '';
  const pct = Math.round((done / total) * 100);
  return `<div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>`;
}

export function esc(str) {
  return String(str).replace(/['"<>&]/g, c =>
    ({ "'": '&#39;', '"': '&quot;', '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}
