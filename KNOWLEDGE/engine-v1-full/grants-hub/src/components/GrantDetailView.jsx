import React from 'react';
import SetupTab from './SetupTab';
import ExpensesTab from './ExpensesTab';
import DashboardTab from './DashboardTab';
import ReportTab from './ReportTab';

export default function GrantDetailView({ grant, setGrant, tab, setTab, onBack, feedbackUrl }) {
  const catSpent = (catId) => grant.expenses.filter(e => e.catId === catId).reduce((s, e) => s + e.amount, 0);
  const totalBudgeted = grant.categories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = grant.expenses.reduce((s, e) => s + e.amount, 0);

  const tabs = [
    { id: 'setup', label: '📋 Setup' },
    { id: 'expenses', label: '💰 Expenses' },
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'report', label: '📄 Report' },
  ];

  return (
    <div>
      <button onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800 mb-3 no-print">
        ← Back to Grants
      </button>
      <div className="mb-4 no-print">
        <h2 className="text-lg font-semibold text-gray-800">{grant.grantName || 'Untitled Grant'}</h2>
        <p className="text-sm text-gray-500">{grant.funder || 'No funder set'}</p>
      </div>

      <nav className="flex border-b mb-6 overflow-x-auto no-print">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm whitespace-nowrap transition-colors ${tab === t.id ? 'tab-active' : 'text-gray-500 hover:text-indigo-600'}`}>
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'setup' && <SetupTab grant={grant} setGrant={setGrant} />}
      {tab === 'expenses' && <ExpensesTab grant={grant} setGrant={setGrant} />}
      {tab === 'dashboard' && <DashboardTab grant={grant} catSpent={catSpent} totalBudgeted={totalBudgeted} totalSpent={totalSpent} />}
      {tab === 'report' && <ReportTab grant={grant} catSpent={catSpent} totalBudgeted={totalBudgeted} totalSpent={totalSpent} setGrant={setGrant} feedbackUrl={feedbackUrl} />}
    </div>
  );
}
