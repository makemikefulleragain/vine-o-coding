// THE KITCHEN TABLE — utils.js
// Shared utility functions

export function nlnetCountdown() {
  const deadline = new Date('2026-04-01T12:00:00+02:00');
  const now = new Date();
  const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff + 'd' : 'DUE';
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
