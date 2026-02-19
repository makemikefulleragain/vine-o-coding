import React from 'react';
import StatCard from './StatCard';

export default function DashboardTab({ grant, catSpent, totalBudgeted, totalSpent }) {
  const remaining = grant.amount - totalSpent;
  const daysLeft = Math.ceil((new Date(grant.deadline) - new Date()) / 86400000);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Grant Amount" value={`$${grant.amount.toLocaleString()}`} color="indigo" />
        <StatCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} color="blue" />
        <StatCard label="Remaining" value={`$${remaining.toLocaleString()}`} color={remaining >= 0 ? 'green' : 'red'} />
        <StatCard label="Days to Deadline" value={daysLeft > 0 ? daysLeft : 'Overdue'} color={daysLeft > 30 ? 'gray' : daysLeft > 0 ? 'amber' : 'red'} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget vs Actual</h2>
        {grant.categories.map(c => {
          const spent = catSpent(c.id);
          const pct = c.budgeted > 0 ? (spent / c.budgeted) * 100 : 0;
          const color = pct > 100 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-green-500';
          return (
            <div key={c.id} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{c.name}</span>
                <span className="text-gray-500">${spent.toLocaleString()} / ${c.budgeted.toLocaleString()} ({pct.toFixed(0)}%)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Remaining: ${(c.budgeted - spent).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
