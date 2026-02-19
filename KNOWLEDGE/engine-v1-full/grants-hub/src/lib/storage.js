export function lsLoad(key, fallback) {
  try {
    const v = localStorage.getItem('gah_' + key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function lsSave(key, val) {
  try {
    localStorage.setItem('gah_' + key, JSON.stringify(val));
  } catch (e) {
    // silently fail
  }
}

export function genId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export const EMPTY_GRANT = {
  funder: '',
  grantName: '',
  amount: 0,
  deadline: '',
  narrative: '',
  status: 'active',
  categories: [],
  expenses: [],
};

export const GRANT_STATUSES = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-600' },
  acquitted: { label: 'Acquitted', color: 'bg-indigo-100 text-indigo-700' },
};

export function lsLoadGrants() {
  const multi = lsLoad('grants', null);
  if (multi && Array.isArray(multi)) return multi;
  const single = lsLoad('grant', null);
  if (single && single.funder) {
    const migrated = [{ ...single, id: single.id || genId() }];
    lsSave('grants', migrated);
    return migrated;
  }
  return [];
}

export function exportJSON(grants) {
  const data = {
    exportDate: new Date().toISOString(),
    exportedFrom: 'Grant Acquittal Helper',
    grantCount: grants.length,
    grants: grants.map(g => ({
      funder: g.funder, grantName: g.grantName, amount: g.amount,
      deadline: g.deadline, narrative: g.narrative,
      categories: g.categories, expenses: g.expenses,
    })),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `grants-hub-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}
