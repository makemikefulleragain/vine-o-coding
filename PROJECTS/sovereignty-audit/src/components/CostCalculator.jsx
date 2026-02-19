import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ku-cost-calculator';
const EMPTY_ITEM = { tool: '', currentCost: '', altTool: '', altCost: '', notes: '' };

const NFP_ALTERNATIVES = [
  { name: 'Google Workspace (NFP)', cost: 0, replaces: 'Email, calendar, docs, storage', note: 'Free for up to 100 users via Google for Nonprofits' },
  { name: 'Microsoft 365 Basic (NFP)', cost: 0, replaces: 'Email, calendar, Office web apps', note: 'Free Business Basic for up to 300 users' },
  { name: 'Canva Pro (NFP)', cost: 0, replaces: 'Design, social media graphics', note: 'Free Canva Pro for up to 50 users' },
  { name: 'Slack Pro (NFP)', cost: 2, replaces: 'Team chat, channels', note: '85% discount on Pro plan (approx $2/user/mo)' },
  { name: 'Zoom (NFP)', cost: 7, replaces: 'Video calls, webinars', note: '50% discount on paid plans' },
  { name: '1Password (NFP)', cost: 0, replaces: 'Password management', note: 'Free Teams plan for nonprofits' },
  { name: 'Trello (Atlassian NFP)', cost: 0, replaces: 'Project management, task boards', note: 'Free via Atlassian Community license' },
  { name: 'Notion (NFP)', cost: 0, replaces: 'Wiki, docs, project management', note: 'Free Plus plan for nonprofits with <50 members' },
];

function load() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* full */ }
}

export default function CostCalculator() {
  const [items, setItems] = useState(() => {
    const saved = load();
    return saved && saved.length > 0 ? saved : [{ ...EMPTY_ITEM }, { ...EMPTY_ITEM }, { ...EMPTY_ITEM }];
  });
  const [showAlts, setShowAlts] = useState(false);

  const persist = useCallback(() => save(items), [items]);
  useEffect(() => { const t = setTimeout(persist, 400); return () => clearTimeout(t); }, [persist]);

  function update(i, field, value) {
    setItems(prev => { const n = [...prev]; n[i] = { ...n[i], [field]: value }; return n; });
  }
  function addRow() { setItems(prev => [...prev, { ...EMPTY_ITEM }]); }
  function removeRow(i) { if (items.length <= 1) return; setItems(prev => prev.filter((_, idx) => idx !== i)); }

  const filled = items.filter(r => r.tool.trim());
  const currentTotal = filled.reduce((s, r) => s + (parseFloat(r.currentCost) || 0), 0);
  const altTotal = filled.reduce((s, r) => s + (parseFloat(r.altCost) || 0), 0);
  const monthlySavings = currentTotal - altTotal;
  const annualSavings = monthlySavings * 12;

  function exportCSV() {
    const header = ['Current Tool', 'Current Cost/mo ($)', 'Alternative', 'Alternative Cost/mo ($)', 'Notes'];
    const csvRows = [header];
    for (const row of items) {
      csvRows.push([row.tool, row.currentCost, row.altTool, row.altCost, row.notes]
        .map(c => `"${(c || '').replace(/"/g, '""')}"`));
    }
    csvRows.push([]);
    csvRows.push(['"Current Monthly Total"', `"$${currentTotal.toFixed(2)}"`, '"Alternative Monthly Total"', `"$${altTotal.toFixed(2)}"`, `"Monthly Savings: $${monthlySavings.toFixed(2)}"`]);
    const csv = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Cost-Comparison.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h2 className="font-bold text-ku-navy text-lg mb-0.5">Cost Comparison Calculator</h2>
          <p className="text-gray-500 text-sm">Compare what you pay now vs nonprofit alternatives.</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CSV
        </button>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[22%]">Current Tool</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[12%]">Cost/mo ($)</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[22%]">Alternative</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[12%]">Alt Cost ($)</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[26%]">Notes</th>
              <th className="p-2 border border-gray-200 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => {
              const curr = parseFloat(row.currentCost) || 0;
              const alt = parseFloat(row.altCost) || 0;
              const saving = curr - alt;
              return (
                <tr key={i} className="group">
                  <td className="p-1 border border-gray-200">
                    <input type="text" value={row.tool} onChange={e => update(i, 'tool', e.target.value)}
                      placeholder="e.g. Zoom Pro" className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300" />
                  </td>
                  <td className="p-1 border border-gray-200">
                    <input type="text" value={row.currentCost} onChange={e => update(i, 'currentCost', e.target.value)}
                      placeholder="0" className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300 text-right" />
                  </td>
                  <td className="p-1 border border-gray-200">
                    <input type="text" value={row.altTool} onChange={e => update(i, 'altTool', e.target.value)}
                      placeholder="e.g. Zoom NFP" className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300" />
                  </td>
                  <td className="p-1 border border-gray-200">
                    <input type="text" value={row.altCost} onChange={e => update(i, 'altCost', e.target.value)}
                      placeholder="0" className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300 text-right" />
                  </td>
                  <td className="p-1 border border-gray-200">
                    <div className="flex items-center gap-1">
                      <input type="text" value={row.notes} onChange={e => update(i, 'notes', e.target.value)}
                        placeholder="Contract ends..."
                        className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300" />
                      {saving > 0 && row.tool.trim() && (
                        <span className="text-[10px] text-green-600 font-medium shrink-0 bg-green-50 px-1.5 py-0.5 rounded-full">
                          -${saving}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-1 border border-gray-200 text-center">
                    {items.length > 1 && (
                      <button onClick={() => removeRow(i)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm" title="Remove">
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={addRow}
        className="mt-3 text-xs text-ku-teal hover:text-ku-teal-dark font-medium cursor-pointer bg-transparent border-0">
        + Add another tool
      </button>

      {/* Savings summary */}
      {filled.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-ku-navy">${currentTotal.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Current / Month</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-ku-navy">${altTotal.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Alternative / Month</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${monthlySavings > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
            <p className={`text-lg font-bold ${monthlySavings > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              {monthlySavings > 0 ? `-$${monthlySavings.toLocaleString()}` : '$0'}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Monthly Savings</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${annualSavings > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
            <p className={`text-lg font-bold ${annualSavings > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              {annualSavings > 0 ? `-$${annualSavings.toLocaleString()}` : '$0'}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Annual Savings</p>
          </div>
        </div>
      )}

      {/* NFP alternatives reference */}
      <div className="mt-4">
        <button
          onClick={() => setShowAlts(!showAlts)}
          className="text-xs text-ku-teal hover:text-ku-teal-dark font-medium cursor-pointer bg-transparent border-0 flex items-center gap-1"
        >
          <svg className={`w-3 h-3 transition-transform ${showAlts ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {showAlts ? 'Hide' : 'Show'} nonprofit alternatives reference
        </button>

        {showAlts && (
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {NFP_ALTERNATIVES.map((alt, i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-ku-navy">{alt.name}</span>
                  <span className="text-xs font-bold text-green-600">${alt.cost}/mo</span>
                </div>
                <p className="text-[11px] text-gray-600">{alt.replaces}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{alt.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Saved on this device only. Download CSV to keep a copy or share with your team.
      </p>
    </section>
  );
}
