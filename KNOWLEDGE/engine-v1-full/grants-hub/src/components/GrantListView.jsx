import React, { useState } from 'react';
import { GRANT_STATUSES } from '../lib/storage';

export default function GrantListView({ grants, onSelect, onCreate, onDelete, onExport, onUpdateGrant }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filter, setFilter] = useState('active');

  const filteredGrants = filter === 'all' ? grants : grants.filter(g => (g.status || 'active') === filter);
  const statusCounts = { all: grants.length };
  for (const g of grants) { const s = g.status || 'active'; statusCounts[s] = (statusCounts[s] || 0) + 1; }

  return (
    <div className="no-print">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Grants ({grants.length})</h2>
        <div className="flex gap-2">
          {grants.length > 0 && (
            <button onClick={onExport} className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              📥 Export All Data
            </button>
          )}
          <button onClick={onCreate} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
            + New Grant
          </button>
        </div>
      </div>

      {grants.length > 0 && (
        <div className="flex gap-1 mb-4">
          {['active', 'draft', 'acquitted', 'all'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s === 'all' ? 'All' : GRANT_STATUSES[s]?.label || s} {statusCounts[s] ? `(${statusCounts[s]})` : ''}
            </button>
          ))}
        </div>
      )}

      {grants.length === 0 ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Track Your Grant Spending.<br />Generate Acquittal Reports.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-6">
              A free tool for small Australian nonprofits and community groups.
              No sign-up required — start tracking in seconds.
            </p>
            <button onClick={onCreate} className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-base font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              Create Your First Grant
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-700 mb-1">Budget Tracking</h3>
              <p className="text-sm text-gray-500">Set up categories, log expenses, and see exactly where your grant money is going with real-time budget vs actual breakdowns.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="font-semibold text-gray-700 mb-1">CSV Bank Import</h3>
              <p className="text-sm text-gray-500">Import expenses directly from your bank statement CSV. Auto-detects columns from CBA, ANZ, Westpac, NAB and other Australian banks.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-2xl mb-2">✍️</div>
              <h3 className="font-semibold text-gray-700 mb-1">Narrative Guidance</h3>
              <p className="text-sm text-gray-500">Structured prompts help you write the narrative section funders expect — activities delivered, reach, challenges, and learnings.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-2xl mb-2">🖨️</div>
              <h3 className="font-semibold text-gray-700 mb-1">Printable Reports</h3>
              <p className="text-sm text-gray-500">Generate a clean, printable acquittal report with financial summary, expense details, and your narrative — ready to send to your funder.</p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>No sign-up required · Your data stays yours · Export anytime</p>
            <p>Built by <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Kamunity</a> for Australian communities</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredGrants.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400 text-sm">
              No {filter !== 'all' ? GRANT_STATUSES[filter]?.label.toLowerCase() : ''} grants
            </div>
          )}
          {filteredGrants.map(g => {
            const totalSpent = g.expenses.reduce((s, e) => s + e.amount, 0);
            const pct = g.amount > 0 ? (totalSpent / g.amount) * 100 : 0;
            const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline) - new Date()) / 86400000) : null;
            const deadlineColor = daysLeft === null ? 'text-gray-400' : daysLeft > 30 ? 'text-green-600' : daysLeft > 0 ? 'text-amber-600' : 'text-red-600';

            return (
              <div key={g.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelect(g.id)}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 truncate">{g.grantName || 'Untitled Grant'}</h3>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${GRANT_STATUSES[g.status || 'active']?.color || 'bg-gray-100 text-gray-600'}`}>
                          {GRANT_STATUSES[g.status || 'active']?.label || 'Active'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{g.funder || 'No funder set'}</p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="font-semibold text-gray-800">${g.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">${totalSpent.toLocaleString()} spent</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${pct > 100 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">{pct.toFixed(0)}% spent</span>
                      <span className={`text-xs ${deadlineColor}`}>
                        {daysLeft === null ? 'No deadline' : daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t">
                    <span className="text-xs text-gray-400">{g.categories.length} categories · {g.expenses.length} expenses</span>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <select className="text-xs border rounded px-1.5 py-0.5 text-gray-500" value={g.status || 'active'}
                        onChange={e => onUpdateGrant({ ...g, status: e.target.value })}>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="acquitted">Acquitted</option>
                      </select>
                      <button onClick={() => setConfirmDelete(g.id)}
                        className="text-xs text-red-400 hover:text-red-600 px-1 py-0.5">Delete</button>
                    </div>
                  </div>
                </div>
                {confirmDelete === g.id && (
                  <div className="bg-red-50 border-t border-red-200 p-3 rounded-b-lg" onClick={e => e.stopPropagation()}>
                    <p className="text-sm text-red-800 mb-2">Delete &ldquo;{g.grantName || 'Untitled Grant'}&rdquo;? This cannot be undone.</p>
                    <div className="flex gap-2">
                      <button onClick={() => { onDelete(g.id); setConfirmDelete(null); }}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete</button>
                      <button onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
