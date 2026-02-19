const RESULTS_KEY = 'ku-audit-results';
const HISTORY_KEY = 'ku-audit-history';
const GUIDE_KEY_PREFIX = 'ku-guide-';

// --- Audit Results ---

export function saveAuditResults(answers, scores) {
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify({
      answers,
      scores,
      completedAt: new Date().toISOString(),
    }));
  } catch { /* storage full */ }
}

export function loadAuditResults() {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuditResults() {
  localStorage.removeItem(RESULTS_KEY);
}

// --- Audit History (retake & compare) ---

export function saveAuditToHistory(answers, scores) {
  try {
    const history = loadAuditHistory();
    history.push({
      answers,
      scores,
      completedAt: new Date().toISOString(),
    });
    // Keep last 10 entries
    if (history.length > 10) history.splice(0, history.length - 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* storage full */ }
}

export function loadAuditHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// --- Guide Progress ---

export function saveGuideProgress(guideId, data) {
  try {
    localStorage.setItem(GUIDE_KEY_PREFIX + guideId, JSON.stringify(data));
  } catch { /* storage full */ }
}

export function loadGuideProgress(guideId) {
  try {
    const raw = localStorage.getItem(GUIDE_KEY_PREFIX + guideId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearGuideProgress(guideId) {
  localStorage.removeItem(GUIDE_KEY_PREFIX + guideId);
}

export function getGuideCompletionStats(guideId) {
  const data = loadGuideProgress(guideId);
  if (!data || !data.sections) return { total: 0, checked: 0, pct: 0 };

  let total = 0;
  let checked = 0;
  for (const section of Object.values(data.sections)) {
    if (section.items) {
      for (const item of Object.values(section.items)) {
        if (!item) continue;
        total++;
        if (item.status === 'done' || item.checked) checked++;
      }
    }
  }
  return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
}

export function getAllGuideStats(guideIds) {
  return guideIds.map(id => ({ id, ...getGuideCompletionStats(id) }));
}

// --- CSV Export ---

export function exportGuideAsCSV(guideId, guideTitle, sections) {
  const data = loadGuideProgress(guideId);
  const rows = [['Section', 'Item', 'Done', 'Status', 'Your Data', 'Notes']];

  for (const section of sections) {
    for (let i = 0; i < section.items.length; i++) {
      const rawItem = section.items[i];
      const label = typeof rawItem === 'string' ? rawItem : (rawItem.label || '');
      const itemData = data?.sections?.[section.id]?.items?.[i] || {};
      rows.push([
        section.title,
        label.replace(/"/g, '""'),
        itemData.checked ? 'Yes' : 'No',
        (itemData.status || '').replace(/"/g, '""'),
        (itemData.value || '').replace(/"/g, '""'),
        (itemData.notes || '').replace(/"/g, '""'),
      ]);
    }
  }

  const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${guideTitle.replace(/[^a-zA-Z0-9]/g, '-')}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
