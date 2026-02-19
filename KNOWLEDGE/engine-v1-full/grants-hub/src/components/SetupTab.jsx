import React from 'react';
import { genId } from '../lib/storage';

export default function SetupTab({ grant, setGrant }) {
  const updateField = (f, v) => setGrant({ ...grant, [f]: f === 'amount' ? parseFloat(v) || 0 : v });
  const addCat = () => setGrant({ ...grant, categories: [...grant.categories, { id: genId(), name: '', budgeted: 0 }] });
  const updateCat = (id, f, v) => setGrant({ ...grant, categories: grant.categories.map(c => c.id === id ? { ...c, [f]: f === 'budgeted' ? parseFloat(v) || 0 : v } : c) });
  const removeCat = (id) => setGrant({ ...grant, categories: grant.categories.filter(c => c.id !== id), expenses: grant.expenses.filter(e => e.catId !== id) });
  const totalBudgeted = grant.categories.reduce((s, c) => s + c.budgeted, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Grant Details</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Funder</label>
            <input className="w-full border rounded px-3 py-2 text-sm" value={grant.funder} onChange={e => updateField('funder', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Grant Name</label>
            <input className="w-full border rounded px-3 py-2 text-sm" value={grant.grantName} onChange={e => updateField('grantName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Total Amount ($)</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-sm" value={grant.amount} onChange={e => updateField('amount', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Reporting Deadline</label>
            <input type="date" className="w-full border rounded px-3 py-2 text-sm" value={grant.deadline} onChange={e => updateField('deadline', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Budget Categories</h2>
          <span className={`text-sm font-medium ${Math.abs(totalBudgeted - grant.amount) < 0.01 ? 'text-green-600' : 'text-amber-600'}`}>
            Allocated: ${totalBudgeted.toLocaleString()} / ${grant.amount.toLocaleString()}
          </span>
        </div>
        {grant.categories.map(c => (
          <div key={c.id} className="flex gap-2 mb-2 items-center">
            <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="Category name" value={c.name} onChange={e => updateCat(c.id, 'name', e.target.value)} />
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" className="w-32 border rounded pl-7 pr-3 py-2 text-sm" value={c.budgeted} onChange={e => updateCat(c.id, 'budgeted', e.target.value)} />
            </div>
            <button onClick={() => removeCat(c.id)} className="text-red-400 hover:text-red-600 px-2">✕</button>
          </div>
        ))}
        <button onClick={addCat} className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">+ Add Category</button>
      </div>
    </div>
  );
}
