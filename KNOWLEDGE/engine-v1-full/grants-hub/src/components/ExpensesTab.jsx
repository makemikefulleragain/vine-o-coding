import React, { useState } from 'react';
import { genId } from '../lib/storage';
import CSVImport from './CSVImport';

export default function ExpensesTab({ grant, setGrant }) {
  const [form, setForm] = useState({ date: '', desc: '', amount: '', catId: grant.categories[0]?.id || '', receipt: '' });
  const [showCSVImport, setShowCSVImport] = useState(false);

  const isDateOutsideGrant = (date) => {
    if (!date || !grant.deadline) return null;
    const expDate = new Date(date);
    const deadline = new Date(grant.deadline);
    if (expDate > deadline) return 'after deadline';
    return null;
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!form.desc || !form.amount || !form.catId) return;
    const exp = { ...form, id: genId(), amount: parseFloat(form.amount) };
    setGrant({ ...grant, expenses: [...grant.expenses, exp] });
    setForm({ date: '', desc: '', amount: '', catId: form.catId, receipt: '' });
  };

  const removeExpense = (id) => setGrant({ ...grant, expenses: grant.expenses.filter(e => e.id !== id) });

  const exportCSV = () => {
    const header = 'Date,Description,Amount,Category,Receipt Ref\n';
    const rows = grant.expenses.map(e => {
      const cat = grant.categories.find(c => c.id === e.catId);
      return `"${e.date}","${e.desc}",${e.amount},"${cat?.name || ''}","${e.receipt}"`;
    }).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'grant_expenses.csv';
    a.click();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addExpense} className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Add Expense</h2>
        <div className="grid md:grid-cols-5 gap-2">
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="border rounded px-3 py-2 text-sm" />
          <input placeholder="Description *" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className="border rounded px-3 py-2 text-sm md:col-span-2" required />
          <input type="number" step="0.01" placeholder="Amount *" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="border rounded px-3 py-2 text-sm" required />
          <select value={form.catId} onChange={e => setForm({ ...form, catId: e.target.value })} className="border rounded px-3 py-2 text-sm">
            {grant.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2 mt-2">
          <input placeholder="Receipt reference" value={form.receipt} onChange={e => setForm({ ...form, receipt: e.target.value })} className="border rounded px-3 py-2 text-sm flex-1" />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">Add</button>
          <button type="button" onClick={() => setShowCSVImport(true)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm" title="Import expenses from a bank CSV">📄 Import CSV</button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-800">Expenses ({grant.expenses.length})</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowCSVImport(true)} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-sm hover:bg-indigo-100">📄 Import CSV</button>
            <button onClick={exportCSV} className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">📥 Export CSV</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-semibold">Date</th>
              <th className="text-left p-3 font-semibold">Description</th>
              <th className="text-right p-3 font-semibold">Amount</th>
              <th className="text-left p-3 font-semibold">Category</th>
              <th className="text-left p-3 font-semibold">Receipt</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {grant.expenses.sort((a, b) => a.date.localeCompare(b.date)).map(e => {
              const cat = grant.categories.find(c => c.id === e.catId);
              return (
                <tr key={e.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-500">
                    {e.date}
                    {isDateOutsideGrant(e.date) && (
                      <span className="ml-1 text-amber-500 text-xs" title={`This expense is ${isDateOutsideGrant(e.date)}`}>⚠</span>
                    )}
                  </td>
                  <td className="p-3">{e.desc}</td>
                  <td className="p-3 text-right font-medium">${e.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-3"><span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">{cat?.name || '—'}</span></td>
                  <td className="p-3 text-gray-400">{e.receipt || '—'}</td>
                  <td className="p-3"><button onClick={() => removeExpense(e.id)} className="text-red-400 hover:text-red-600">✕</button></td>
                </tr>
              );
            })}
            {grant.expenses.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-gray-400">No expenses logged yet</td></tr>}
          </tbody>
        </table>
      </div>

      {showCSVImport && (
        <CSVImport categories={grant.categories}
          onImport={(expenses) => {
            setGrant({ ...grant, expenses: [...grant.expenses, ...expenses] });
            setShowCSVImport(false);
          }}
          onClose={() => setShowCSVImport(false)} />
      )}
    </div>
  );
}
