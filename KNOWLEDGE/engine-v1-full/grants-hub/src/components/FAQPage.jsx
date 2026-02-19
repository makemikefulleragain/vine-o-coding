import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Is this tool really free?',
    a: 'Yes. The Grant Acquittal Helper is a free tool by Kamunity. There\'s no premium tier, no trial period, and no hidden costs. It\'s built specifically for small Australian nonprofits and community groups.',
  },
  {
    q: 'Where is my data stored?',
    a: 'In Cloud mode, your data is stored in a Supabase database (encrypted in transit and at rest). In Browser-only mode, data is stored in your browser\'s localStorage and never leaves your device. You can check which mode you\'re in by looking at the indicator in the header (☁️ Cloud or 💾 Browser only).',
  },
  {
    q: 'Can other people see my data?',
    a: 'No. Your data is protected by Row Level Security — only your anonymous session can access it. We (the tool creators) do not access, read, or monitor your grant data. There are no admin dashboards or analytics on user content.',
  },
  {
    q: 'What happens if I clear my browser data?',
    a: 'Because the tool uses anonymous authentication (no login), your session is tied to your browser. If you clear your browser data, you\'ll lose access to your cloud data and start a fresh session. Always export your data first using the "Export All Data" button on the grant list page.',
  },
  {
    q: 'Can I use this on my phone or tablet?',
    a: 'Yes. The tool is responsive and works on mobile devices. However, for detailed expense entry and report generation, a laptop or desktop provides a better experience.',
  },
  {
    q: 'Can I share this with my committee or board?',
    a: 'Currently, the tool supports one user per session. To share data with your committee, use the "Export All Data" button to download a JSON file, or use the Print/PDF function in the Report tab to generate a printable acquittal report you can distribute.',
  },
  {
    q: 'What happens when I hand over to the next treasurer?',
    a: 'Export all your data as JSON before handing over. The next treasurer can use the tool fresh, and you can share the exported data file and any PDF reports for their records. We\'re planning to add proper user accounts in a future update to make handover smoother.',
  },
  {
    q: 'Can I import expenses from my bank statement?',
    a: 'Yes! Go to the Expenses tab and click "Import CSV". You can upload a CSV file from any Australian bank (CBA, ANZ, Westpac, NAB, etc.). The tool auto-detects columns and lets you categorise expenses before importing.',
  },
  {
    q: 'Is the acquittal report this generates acceptable to funders?',
    a: 'The report provides a structured financial summary with budget vs actual, expense details, and a guided narrative section. However, every funder has different requirements. Always check your grant agreement for specific acquittal requirements. This tool helps you organise your data — it doesn\'t guarantee compliance with any particular funder\'s format.',
  },
  {
    q: 'Can I delete all my data?',
    a: 'Yes. You can delete individual grants from the grant list, or use "Delete All My Data" in the app footer to permanently remove all your grants and data from the cloud.',
  },
];

export default function FAQPage({ onBack }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4">&larr; Back</button>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-sm mb-6">Common questions from volunteer treasurers using the Grant Acquittal Helper.</p>

        <div className="divide-y">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-3">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left flex justify-between items-center group">
                <span className="font-medium text-gray-700 group-hover:text-indigo-600 pr-4">{faq.q}</span>
                <span className="text-gray-400 flex-shrink-0 text-lg">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <p className="text-gray-600 text-sm mt-2 pl-0">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
