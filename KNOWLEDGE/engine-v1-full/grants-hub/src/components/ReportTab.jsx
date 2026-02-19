import React, { useState } from 'react';

const NARRATIVE_FIELDS = [
  { key: 'activities', label: 'Activities Delivered', placeholder: 'What activities, programs, or services were delivered during this period? Include specific dates, locations, and descriptions.', hint: 'Be specific — funders look for concrete details, not vague summaries.' },
  { key: 'reach', label: 'Reach & Participation', placeholder: 'How many people participated or benefited? Break down by group if relevant (e.g., 45 youth aged 12-18, 12 volunteers).', hint: "Include numbers. 'Many people attended' is a red flag for funders." },
  { key: 'challenges', label: 'Challenges & Changes', placeholder: 'Were there any challenges, delays, or changes to the original plan? How were they addressed?', hint: 'Honest reflection builds trust. Reporting only success can raise concerns.' },
  { key: 'learnings', label: 'Learnings & Improvements', placeholder: 'What would you do differently next time? What did you learn from this project?', hint: 'Funders value organisations that learn and adapt.' },
  { key: 'additional', label: 'Additional Notes (optional)', placeholder: 'Any other information relevant to the acquittal.', hint: '' },
];

function parseNarrative(raw) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
  } catch (e) { /* not JSON */ }
  return { additional: raw };
}

function serializeNarrative(fields) {
  return JSON.stringify(fields);
}

const REPORT_FEEDBACK_KEY = 'gah_report_feedback_shown';

export default function ReportTab({ grant, catSpent, totalBudgeted, totalSpent, setGrant, feedbackUrl }) {
  const [narrativeFields, setNarrativeFields] = useState(() => parseNarrative(grant.narrative));

  const updateField = (key, value) => {
    setNarrativeFields(prev => ({ ...prev, [key]: value }));
  };

  const syncNarrative = () => {
    const serialized = serializeNarrative(narrativeFields);
    if (serialized !== grant.narrative) {
      setGrant({ ...grant, narrative: serialized });
    }
  };

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="no-print mb-4 flex items-center gap-3">
        <button onClick={handlePrint} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">🖨️ Print / Save as PDF</button>
        {feedbackUrl && !feedbackUrl.includes('PLACEHOLDER') && !sessionStorage.getItem(REPORT_FEEDBACK_KEY) && (
          <a href={feedbackUrl} target="_blank" rel="noopener noreferrer"
            onClick={() => sessionStorage.setItem(REPORT_FEEDBACK_KEY, '1')}
            className="text-xs text-indigo-500 hover:text-indigo-700 hover:underline">
            How was this report? Tell us &rarr;
          </a>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-8" id="report">
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Grant Acquittal Report</h1>
          <p className="text-gray-500 mt-1">Generated {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Grant Details</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2 font-medium w-40">Funder</td><td className="py-2">{grant.funder}</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Grant Name</td><td className="py-2">{grant.grantName}</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Total Amount</td><td className="py-2">${grant.amount.toLocaleString()}</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Reporting Period</td><td className="py-2">To {grant.deadline}</td></tr>
              <tr><td className="py-2 font-medium">Total Expenditure</td><td className="py-2 font-semibold">${totalSpent.toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Financial Summary — Budget vs Actual</h2>
          <table className="w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 border">Budget Category</th>
                <th className="text-right p-2 border">Budgeted</th>
                <th className="text-right p-2 border">Actual</th>
                <th className="text-right p-2 border">Variance</th>
              </tr>
            </thead>
            <tbody>
              {grant.categories.map(c => {
                const spent = catSpent(c.id);
                const variance = c.budgeted - spent;
                return (
                  <tr key={c.id}>
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border text-right">${c.budgeted.toLocaleString()}</td>
                    <td className="p-2 border text-right">${spent.toLocaleString()}</td>
                    <td className={`p-2 border text-right ${variance < 0 ? 'text-red-600' : ''}`}>${variance.toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr className="font-semibold bg-gray-50">
                <td className="p-2 border">TOTAL</td>
                <td className="p-2 border text-right">${totalBudgeted.toLocaleString()}</td>
                <td className="p-2 border text-right">${totalSpent.toLocaleString()}</td>
                <td className="p-2 border text-right">${(totalBudgeted - totalSpent).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Expenditure Detail</h2>
          <table className="w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 border">Date</th>
                <th className="text-left p-2 border">Description</th>
                <th className="text-left p-2 border">Category</th>
                <th className="text-right p-2 border">Amount</th>
                <th className="text-left p-2 border">Receipt Ref</th>
              </tr>
            </thead>
            <tbody>
              {grant.expenses.sort((a, b) => a.date.localeCompare(b.date)).map(e => (
                <tr key={e.id}>
                  <td className="p-2 border">{e.date}</td>
                  <td className="p-2 border">{e.desc}</td>
                  <td className="p-2 border">{grant.categories.find(c => c.id === e.catId)?.name || '—'}</td>
                  <td className="p-2 border text-right">${e.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-2 border">{e.receipt || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Program Narrative</h2>

          <div className="no-print space-y-4">
            <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded p-2">
              These prompts help you write a stronger acquittal narrative. Funders look for specific details, honest reflection, and measurable outcomes.
            </p>
            {NARRATIVE_FIELDS.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                {f.hint && <p className="text-xs text-gray-400 mb-1">{f.hint}</p>}
                <textarea className="w-full border rounded p-3 text-sm min-h-[80px]"
                  value={narrativeFields[f.key] || ''} placeholder={f.placeholder}
                  onChange={e => updateField(f.key, e.target.value)} onBlur={syncNarrative} />
              </div>
            ))}
          </div>

          <div className="print-only">
            {NARRATIVE_FIELDS.filter(f => narrativeFields[f.key]).map(f => (
              <div key={f.key} className="mb-3">
                <h3 className="text-sm font-semibold text-gray-700">{f.label}</h3>
                <p className="text-sm whitespace-pre-wrap">{narrativeFields[f.key]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <p className="text-sm text-gray-500">Prepared by: ________________________________</p>
          <p className="text-sm text-gray-500 mt-2">Position: ________________________________</p>
          <p className="text-sm text-gray-500 mt-2">Date: ________________________________</p>
          <p className="text-sm text-gray-500 mt-2">Signature: ________________________________</p>
        </div>
      </div>
    </div>
  );
}
