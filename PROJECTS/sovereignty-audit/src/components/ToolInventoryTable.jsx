import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ku-tool-inventory';
const EMPTY_ROW = { name: '', purpose: '', cost: '', manager: '', exportable: '', notes: '' };

function loadInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveInventory(rows) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rows)); } catch { /* full */ }
}

export default function ToolInventoryTable() {
  const [rows, setRows] = useState(() => {
    const saved = loadInventory();
    return saved && saved.length > 0 ? saved : [{ ...EMPTY_ROW }, { ...EMPTY_ROW }, { ...EMPTY_ROW }];
  });

  const persist = useCallback(() => saveInventory(rows), [rows]);

  useEffect(() => {
    const t = setTimeout(persist, 400);
    return () => clearTimeout(t);
  }, [persist]);

  function updateCell(index, field, value) {
    setRows(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addRow() {
    setRows(prev => [...prev, { ...EMPTY_ROW }]);
  }

  function removeRow(index) {
    if (rows.length <= 1) return;
    setRows(prev => prev.filter((_, i) => i !== index));
  }

  function exportCSV() {
    const header = ['Tool Name', 'What It Does', 'Monthly Cost ($)', 'Who Manages It', 'Can You Export Data?', 'Notes'];
    const csvRows = [header];
    for (const row of rows) {
      csvRows.push([
        row.name, row.purpose, row.cost, row.manager, row.exportable, row.notes
      ].map(c => `"${(c || '').replace(/"/g, '""')}"`));
    }
    const csv = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tool-Inventory.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Summary stats
  const filledRows = rows.filter(r => r.name.trim());
  const totalCost = filledRows.reduce((sum, r) => {
    const n = parseFloat(r.cost);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
  const noExport = filledRows.filter(r => r.exportable.toLowerCase().startsWith('no')).length;
  const singleManager = (() => {
    const mgrs = {};
    filledRows.forEach(r => { if (r.manager.trim()) mgrs[r.manager.trim().toLowerCase()] = (mgrs[r.manager.trim().toLowerCase()] || 0) + 1; });
    return Object.entries(mgrs).find(([, c]) => c > 2);
  })();

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h2 className="font-bold text-ku-navy text-lg mb-0.5">Your Digital Tool Inventory</h2>
          <p className="text-gray-500 text-sm">Fill in your tools below. Data stays on your device.</p>
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

      {/* Table */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[18%]">Tool Name</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[20%]">What It Does</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[10%]">Cost/mo ($)</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[14%]">Who Manages</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[12%]">Can Export?</th>
              <th className="text-left p-2 border border-gray-200 font-semibold text-ku-navy w-[20%]">Notes</th>
              <th className="p-2 border border-gray-200 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="group">
                <td className="p-1 border border-gray-200">
                  <input
                    type="text"
                    value={row.name}
                    onChange={e => updateCell(i, 'name', e.target.value)}
                    placeholder="e.g. Google Workspace"
                    className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300"
                  />
                </td>
                <td className="p-1 border border-gray-200">
                  <input
                    type="text"
                    value={row.purpose}
                    onChange={e => updateCell(i, 'purpose', e.target.value)}
                    placeholder="Email, files..."
                    className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300"
                  />
                </td>
                <td className="p-1 border border-gray-200">
                  <input
                    type="text"
                    value={row.cost}
                    onChange={e => updateCell(i, 'cost', e.target.value)}
                    placeholder="0"
                    className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300 text-right"
                  />
                </td>
                <td className="p-1 border border-gray-200">
                  <input
                    type="text"
                    value={row.manager}
                    onChange={e => updateCell(i, 'manager', e.target.value)}
                    placeholder="Name"
                    className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300"
                  />
                </td>
                <td className="p-1 border border-gray-200">
                  <select
                    value={row.exportable}
                    onChange={e => updateCell(i, 'exportable', e.target.value)}
                    className="w-full px-1 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded cursor-pointer"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partial">Partial</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </td>
                <td className="p-1 border border-gray-200">
                  <input
                    type="text"
                    value={row.notes}
                    onChange={e => updateCell(i, 'notes', e.target.value)}
                    placeholder="Lock-in risk, contract end..."
                    className="w-full px-2 py-1.5 text-xs border-0 bg-transparent focus:outline-none focus:bg-blue-50 rounded placeholder:text-gray-300"
                  />
                </td>
                <td className="p-1 border border-gray-200 text-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm"
                      title="Remove row"
                    >
                      ✕
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="mt-3 text-xs text-ku-teal hover:text-ku-teal-dark font-medium cursor-pointer bg-transparent border-0"
      >
        + Add another tool
      </button>

      {/* Summary insights */}
      {filledRows.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-ku-navy">{filledRows.length}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tools Tracked</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-ku-navy">${totalCost.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Monthly Cost</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${noExport > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            <p className={`text-lg font-bold ${noExport > 0 ? 'text-red-600' : 'text-green-600'}`}>{noExport}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">No Export</p>
          </div>
          <div className={`rounded-lg p-3 text-center ${singleManager ? 'bg-amber-50' : 'bg-gray-50'}`}>
            {singleManager ? (
              <>
                <p className="text-lg font-bold text-amber-600">⚠</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Key-person risk</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-green-600">✓</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">No key-person risk</p>
              </>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-3">
        Saved on this device only. Download CSV to keep a copy.
      </p>
    </section>
  );
}
