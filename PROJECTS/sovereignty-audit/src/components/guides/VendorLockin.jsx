import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolkitTracker from '../ToolkitTracker';
import FillableChecklist from '../FillableChecklist';
import ToolInventoryTable from '../ToolInventoryTable';
import ContactModal from '../ContactModal';
import { downloadToolInventoryTemplate } from '../../utils/templateExport';
import { exportGuideAsCSV } from '../../utils/auditStorage';

const SECTIONS = [
  {
    id: 'tool-inventory',
    title: '1. Build Your Digital Tool Inventory',
    subtitle: 'You can\'t manage what you can\'t see. Use the interactive table above or the checklist to get started.',
    items: [
      { label: 'List every digital tool your organisation uses. Don\'t forget the ones people signed up for individually', inputType: 'none' },
      { label: 'Include free tools too. They still have switching costs (data, habits, training)', inputType: 'dropdown', options: ['All tools listed (including free)', 'Only paid tools listed so far', 'Haven\'t started yet'], placeholder: 'Select...' },
      { label: 'Count how many tools come from a single provider (Google, Microsoft, etc.)', inputType: 'text', placeholder: 'e.g. Google: 4 tools, Microsoft: 3 tools, Atlassian: 2 tools...' },
      { label: 'Flag tools where you CAN\'T export your data. These are your biggest risks', inputType: 'textarea', placeholder: 'e.g. CRM has no export; booking system locked to vendor...' },
    ],
  },
  {
    id: 'switching-costs',
    title: '2. Assess Your Switching Costs',
    subtitle: 'For each tool you flagged as a risk, work through this checklist.',
    items: [
      { label: 'How much data is stored in this tool?', inputType: 'dropdown', options: ['A few files / minimal', 'Moderate (months of data)', 'Significant (years of records)', 'Critical (can\'t lose any)'], placeholder: 'Select...' },
      { label: 'Can you export the data in a standard, open format (CSV, PDF, JSON)?', inputType: 'dropdown', options: ['Yes, standard formats', 'Partial export only', 'No export available', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'How long would it take to train your team on an alternative?', inputType: 'dropdown', options: ['Less than a day', '1-2 weeks', 'A month or more', 'Team would resist strongly'], placeholder: 'Select...' },
      { label: 'Are there integrations with other tools that would break if you switched?', inputType: 'textarea', placeholder: 'e.g. CRM connects to Mailchimp and Xero; switching CRM would break both...' },
      { label: 'Is there a contract or lock-in period? When does it end?', inputType: 'text', placeholder: 'e.g. Annual contract, ends March 2027; monthly, can cancel anytime...' },
      { label: 'What would you lose if this tool disappeared tomorrow? (the "bus test")', inputType: 'textarea', placeholder: 'e.g. 5 years of client history, all email archives, contact lists...' },
    ],
  },
  {
    id: 'contract-review',
    title: '3. Contract & Terms Review',
    subtitle: 'Read the fine print before it reads you.',
    items: [
      { label: 'Find the Terms of Service for each critical tool. Search for clauses about data ownership', inputType: 'dropdown', options: ['Found and reviewed all', 'Found some, need to review', 'Haven\'t looked yet'], placeholder: 'Select...' },
      { label: 'Who owns the data you store in this tool? (Hint: it should be you)', inputType: 'dropdown', options: ['We own our data (confirmed)', 'Unclear from the terms', 'Provider claims rights to data', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Look for automatic renewal clauses. Set calendar reminders 30 days before renewal dates', inputType: 'dropdown', options: ['Reminders set for all', 'Some reminders set', 'No reminders yet'], placeholder: 'Select...' },
      { label: 'Check cancellation terms. Some tools require 30-90 days notice', inputType: 'text', placeholder: 'e.g. Slack: cancel anytime; CRM: 60 days notice; Hosting: 30 days...' },
      { label: 'Review data deletion policies. What happens to your data when you cancel?', inputType: 'dropdown', options: ['Data returned/exportable', 'Data deleted after grace period', 'Unclear from terms', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Can the provider change pricing or terms unilaterally?', inputType: 'dropdown', options: ['Yes (most can)', 'No, pricing is locked', 'Haven\'t checked'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'migration-plan',
    title: '4. Migration Planning Checklist',
    subtitle: 'If you do decide to switch, here\'s how to do it safely.',
    items: [
      { label: 'Export ALL data from the old tool before cancelling. Test that the export is complete', inputType: 'dropdown', options: ['Export tested and complete', 'Export done, not verified', 'Not applicable yet', 'Haven\'t started'], placeholder: 'Select...' },
      { label: 'Set up the new tool and test it with a small group before rolling out', inputType: 'dropdown', options: ['Pilot group testing', 'New tool set up, not tested', 'Not applicable yet'], placeholder: 'Select...' },
      { label: 'Create written instructions for the new tool (screenshots help)', offlineOnly: true, offlineReason: 'Create instructions in a shared document your team can access' },
      { label: 'Run old and new tools in parallel for at least 2 weeks', inputType: 'dropdown', options: ['Currently running parallel', 'Planned', 'Not applicable yet'], placeholder: 'Select...' },
      { label: 'Set a firm cutover date and communicate it clearly to all staff', inputType: 'text', placeholder: 'e.g. Cutover date: 15 March 2027; communicated via email + team meeting' },
      { label: 'After cutover, keep the old account active (read-only) for at least 3 months', inputType: 'dropdown', options: ['Plan to keep active', 'Will cancel immediately', 'Not applicable yet'], placeholder: 'Select...' },
      { label: 'Update your tool inventory document with the new tool details', inputType: 'dropdown', options: ['Done', 'Will do after migration', 'Not applicable yet'], placeholder: 'Select...' },
    ],
  },
];

export default function VendorLockin() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <ToolkitTracker currentGuideId="vendor-lockin" />
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/toolkit" className="text-ku-teal text-sm font-medium hover:text-ku-teal-dark no-underline mb-6 inline-block">
        ← Back to Toolkit
      </Link>

      <div className="mb-8">
        <span className="text-3xl mb-3 block">🔗</span>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">Vendor Lock-in Assessment</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Most community orgs don't realise how dependent they are on a single provider until
          they try to leave. This guide helps you map your landscape and understand your options.
        </p>
      </div>

      {/* Interactive Tool Inventory */}
      <ToolInventoryTable />

      {/* Download template */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={downloadToolInventoryTemplate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Word Template
        </button>
        <span className="text-xs text-gray-400">Opens in Word or Google Docs</span>
      </div>

      <FillableChecklist guideId="vendor-lockin" guideTitle="Vendor Lock-in Assessment" sections={SECTIONS} />

      {/* Microsoft Changes Alert */}
      <section className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-amber-800 text-lg mb-1 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Microsoft 365 NFP Licensing Changes (July 2025)
        </h2>
        <p className="text-amber-700 text-sm leading-relaxed mb-3">
          Microsoft has ended free Business Premium and Office 365 E1 grants for nonprofits.
          Here's what this means for your organisation:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold shrink-0">Still free:</span>
            <span className="text-gray-700">Microsoft 365 Business Basic (up to 300 users): web/mobile Office apps, Outlook, 1TB OneDrive, Teams, SharePoint</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 font-bold shrink-0">No longer free:</span>
            <span className="text-gray-700">Desktop Office apps, advanced security (Defender, Intune), device management</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-600 font-bold shrink-0">Action needed:</span>
            <span className="text-gray-700">If you rely on desktop Office apps, you'll need to budget for discounted nonprofit licensing OR evaluate alternatives like Google Workspace for Nonprofits (free up to 100 users)</span>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-1">2. When to Stay vs When to Switch</h2>
        <p className="text-gray-500 text-sm mb-4">Not all lock-in is bad. Here's how to think about it:</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 text-sm mb-2">✅ It's probably fine to stay if:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• You can export your data in standard formats</li>
              <li>• The cost is reasonable and transparent</li>
              <li>• Multiple people know how to manage it</li>
              <li>• It meets your security needs</li>
              <li>• Your team is productive with it</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 text-sm mb-2">⚠️ Consider switching if:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• You can't export your data</li>
              <li>• Costs are increasing unpredictably</li>
              <li>• Only one person knows how it works</li>
              <li>• It doesn't meet basic security needs</li>
              <li>• You're paying for features you don't use</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Useful links */}
      <section className="bg-ku-teal-light rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-3">Useful Resources</h2>
        <ul className="space-y-2">
          {[
            { text: 'AlternativeTo, find alternatives to any software', url: 'https://alternativeto.net' },
            { text: 'Google Workspace for Nonprofits, free up to 100 users', url: 'https://www.google.com/nonprofits/' },
            { text: 'Microsoft Nonprofits, discounted licensing', url: 'https://nonprofit.microsoft.com/' },
            { text: 'TechSoup Australia, nonprofit software discounts', url: 'https://www.techsoup.org/join' },
          ].map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ku-teal hover:text-ku-teal-dark text-sm no-underline inline-flex items-center gap-1"
              >
                {link.text}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Download all buttons */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-3 text-center">Download Your Work</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => exportGuideAsCSV('vendor-lockin', 'Vendor Lock-in Assessment', SECTIONS)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download CSV
          </button>
          <button
            onClick={downloadToolInventoryTemplate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Word Template
          </button>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-2 border-ku-teal rounded-xl p-6 text-center">
        <h2 className="font-bold text-ku-navy mb-2">Need help with this?</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          Mapping your tool landscape and evaluating alternatives can be overwhelming.
          Kamunity Consulting can do a full digital audit and build you a transition plan.
        </p>
        <button
          onClick={() => setContactOpen(true)}
          className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors text-sm cursor-pointer"
        >
          Talk to Kamunity
        </button>
      </section>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
    </>
  );
}
