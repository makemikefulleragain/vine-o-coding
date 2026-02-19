import React, { useState, useRef } from 'react';
import { genId } from '../lib/storage';

const KNOWN_FORMATS = [
  { name: 'Auto-detect', dateCol: null, descCol: null, amountCol: null, debitCol: null, creditCol: null },
];

function detectColumns(headers) {
  const lower = headers.map(h => h.toLowerCase().trim());
  let dateCol = lower.findIndex(h => h === 'date' || h === 'transaction date' || h === 'posted date' || h === 'value date');
  let descCol = lower.findIndex(h => h === 'description' || h === 'narration' || h === 'narrative' || h === 'transaction description' || h === 'details' || h === 'memo');
  let amountCol = lower.findIndex(h => h === 'amount' || h === 'value');
  let debitCol = lower.findIndex(h => h === 'debit' || h === 'debit amount' || h === 'withdrawal');
  let creditCol = lower.findIndex(h => h === 'credit' || h === 'credit amount' || h === 'deposit');

  if (dateCol === -1) dateCol = lower.findIndex(h => h.includes('date'));
  if (descCol === -1) descCol = lower.findIndex(h => h.includes('desc') || h.includes('narr') || h.includes('detail') || h.includes('memo'));
  if (amountCol === -1 && debitCol === -1) amountCol = lower.findIndex(h => h.includes('amount') || h.includes('value'));

  return { dateCol, descCol, amountCol, debitCol, creditCol };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { result.push(current.trim()); current = ''; }
      else { current += ch; }
    }
  }
  result.push(current.trim());
  return result;
}

function parseAmount(val) {
  if (!val) return 0;
  const cleaned = val.replace(/[$,\s]/g, '').replace(/[()]/g, m => m === '(' ? '-' : '');
  return Math.abs(parseFloat(cleaned)) || 0;
}

function normalizeDate(val) {
  if (!val) return '';
  // Try DD/MM/YYYY (Australian format)
  const auMatch = val.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (auMatch) {
    const [, d, m, y] = auMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  // Try YYYY-MM-DD (ISO)
  const isoMatch = val.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return val;
}

export default function CSVImport({ categories, onImport, onClose }) {
  const [step, setStep] = useState('upload'); // upload | preview | assign
  const [rawRows, setRawRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({ dateCol: -1, descCol: -1, amountCol: -1, debitCol: -1, creditCol: -1 });
  const [rows, setRows] = useState([]); // { date, desc, amount, catId, selected }
  const [defaultCatId, setDefaultCatId] = useState(categories[0]?.id || '');
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      if (lines.length < 2) return;

      const hdrs = parseCSVLine(lines[0]);
      const dataRows = lines.slice(1).map(l => parseCSVLine(l));
      setHeaders(hdrs);
      setRawRows(dataRows);

      const detected = detectColumns(hdrs);
      setMapping(detected);
      setStep('preview');
    };
    reader.readAsText(file);
  };

  const applyMapping = () => {
    const mapped = rawRows
      .map(row => {
        let amount = 0;
        if (mapping.amountCol >= 0) {
          amount = parseAmount(row[mapping.amountCol]);
        } else if (mapping.debitCol >= 0) {
          amount = parseAmount(row[mapping.debitCol]);
          if (amount === 0 && mapping.creditCol >= 0) {
            amount = parseAmount(row[mapping.creditCol]);
          }
        }

        const desc = mapping.descCol >= 0 ? (row[mapping.descCol] || '').trim() : '';
        const date = mapping.dateCol >= 0 ? normalizeDate((row[mapping.dateCol] || '').trim()) : '';

        return { date, desc, amount, catId: defaultCatId, selected: amount > 0 && desc.length > 0 };
      })
      .filter(r => r.desc || r.amount > 0);

    setRows(mapped);
    setStep('assign');
  };

  const toggleRow = (i) => setRows(prev => prev.map((r, idx) => idx === i ? { ...r, selected: !r.selected } : r));
  const toggleAll = () => {
    const allSelected = rows.every(r => r.selected);
    setRows(prev => prev.map(r => ({ ...r, selected: !allSelected })));
  };
  const setCatForRow = (i, catId) => setRows(prev => prev.map((r, idx) => idx === i ? { ...r, catId } : r));
  const setCatForAll = (catId) => setRows(prev => prev.map(r => ({ ...r, catId })));

  const handleImport = () => {
    const expenses = rows.filter(r => r.selected).map(r => ({
      id: genId(), date: r.date, desc: r.desc, amount: r.amount, catId: r.catId, receipt: '',
    }));
    onImport(expenses);
  };

  const selectedCount = rows.filter(r => r.selected).length;
  const selectedTotal = rows.filter(r => r.selected).reduce((s, r) => s + r.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {step === 'upload' && 'Import Expenses from CSV'}
            {step === 'preview' && 'Map Columns'}
            {step === 'assign' && 'Review & Categorise'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {step === 'upload' && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Upload a bank statement CSV</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                Download a CSV from your bank (CBA, ANZ, Westpac, NAB, or any bank). The importer will auto-detect date, description, and amount columns.
              </p>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />
              <button onClick={() => fileRef.current?.click()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                Choose CSV File
              </button>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Found <strong>{rawRows.length} rows</strong> and <strong>{headers.length} columns</strong>. Map the columns below:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Date column</label>
                  <select className="w-full border rounded px-2 py-1.5 text-sm" value={mapping.dateCol}
                    onChange={e => setMapping({ ...mapping, dateCol: parseInt(e.target.value) })}>
                    <option value={-1}>— none —</option>
                    {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description column</label>
                  <select className="w-full border rounded px-2 py-1.5 text-sm" value={mapping.descCol}
                    onChange={e => setMapping({ ...mapping, descCol: parseInt(e.target.value) })}>
                    <option value={-1}>— none —</option>
                    {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Amount column</label>
                  <select className="w-full border rounded px-2 py-1.5 text-sm" value={mapping.amountCol}
                    onChange={e => setMapping({ ...mapping, amountCol: parseInt(e.target.value) })}>
                    <option value={-1}>— none —</option>
                    {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400">If your bank uses separate Debit/Credit columns instead of Amount:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Debit column (optional)</label>
                  <select className="w-full border rounded px-2 py-1.5 text-sm" value={mapping.debitCol}
                    onChange={e => setMapping({ ...mapping, debitCol: parseInt(e.target.value) })}>
                    <option value={-1}>— none —</option>
                    {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Credit column (optional)</label>
                  <select className="w-full border rounded px-2 py-1.5 text-sm" value={mapping.creditCol}
                    onChange={e => setMapping({ ...mapping, creditCol: parseInt(e.target.value) })}>
                    <option value={-1}>— none —</option>
                    {headers.map((h, i) => <option key={i} value={i}>{h}</option>)}
                  </select>
                </div>
              </div>

              {rawRows.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Preview (first 3 rows):</p>
                  <div className="overflow-x-auto">
                    <table className="text-xs border w-full">
                      <thead><tr className="bg-gray-50">{headers.map((h, i) => <th key={i} className="p-1.5 border text-left">{h}</th>)}</tr></thead>
                      <tbody>
                        {rawRows.slice(0, 3).map((row, i) => (
                          <tr key={i}>{row.map((cell, j) => <td key={j} className="p-1.5 border">{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'assign' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  <strong>{selectedCount}</strong> of {rows.length} expenses selected · Total: <strong>${selectedTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Set all to:</span>
                  <select className="border rounded px-2 py-1 text-xs" value="" onChange={e => { if (e.target.value) setCatForAll(e.target.value); }}>
                    <option value="">—</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="overflow-auto max-h-[50vh]">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left w-8"><input type="checkbox" checked={rows.length > 0 && rows.every(r => r.selected)} onChange={toggleAll} /></th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-right">Amount</th>
                      <th className="p-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className={`border-t ${!r.selected ? 'opacity-40' : ''}`}>
                        <td className="p-2"><input type="checkbox" checked={r.selected} onChange={() => toggleRow(i)} /></td>
                        <td className="p-2 text-gray-500 whitespace-nowrap">{r.date}</td>
                        <td className="p-2 max-w-xs truncate" title={r.desc}>{r.desc}</td>
                        <td className="p-2 text-right font-medium">${r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="p-2">
                          <select className="border rounded px-2 py-1 text-xs w-full" value={r.catId}
                            onChange={e => setCatForRow(i, e.target.value)}>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-between">
          {step === 'preview' && (
            <>
              <button onClick={() => setStep('upload')} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">← Back</button>
              <button onClick={applyMapping} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                disabled={mapping.descCol < 0 && mapping.amountCol < 0 && mapping.debitCol < 0}>
                Next: Review Expenses →
              </button>
            </>
          )}
          {step === 'assign' && (
            <>
              <button onClick={() => setStep('preview')} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">← Back to Mapping</button>
              <button onClick={handleImport} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                disabled={selectedCount === 0}>
                Import {selectedCount} Expense{selectedCount !== 1 ? 's' : ''} (${selectedTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })})
              </button>
            </>
          )}
          {step === 'upload' && (
            <div className="w-full text-right">
              <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
