import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolkitTracker from '../ToolkitTracker';
import FillableChecklist from '../FillableChecklist';
import ContactModal from '../ContactModal';
import { downloadDataMapTemplate } from '../../utils/templateExport';
import { exportGuideAsCSV } from '../../utils/auditStorage';

const SECTIONS = [
  {
    id: 'admin-access',
    title: '1. Admin Access Audit',
    subtitle: 'Who has the keys to your digital kingdom?',
    items: [
      { label: 'List every critical account (email platform, website, banking, CRM, cloud storage, social media)', inputType: 'textarea', placeholder: 'e.g. Google Workspace, ANZ banking, WordPress, Salesforce, Dropbox, Facebook...' },
      { label: 'For each account, record who has admin/owner access right now', inputType: 'textarea', placeholder: 'e.g. Google Workspace: Priya + Sam; Website: Sam only; Banking: Priya + Board Chair...' },
      { label: 'At least two current staff members have admin access to every critical account', inputType: 'dropdown', options: ['Yes, all accounts', 'Some accounts', 'No, several are single-person', 'Not sure'], placeholder: 'Select...' },
      { label: 'Remove access for anyone who has left the organisation', inputType: 'dropdown', options: ['Done', 'In progress', 'Haven\'t checked yet', 'No former staff to remove'], placeholder: 'Select...' },
      { label: 'Store admin credentials securely (a password manager, not a sticky note or shared spreadsheet)', inputType: 'dropdown', options: ['Using a password manager', 'Using a shared spreadsheet (needs fixing)', 'Written down somewhere', 'No system yet'], placeholder: 'How are credentials stored?' },
      { label: 'Document the "what if" plan: if the main admin is suddenly unavailable, who takes over?', inputType: 'textarea', placeholder: 'e.g. If Priya is unavailable, Sam has access to password manager. Board chair has emergency IT contact...' },
    ],
  },
  {
    id: 'data-export',
    title: '2. Data Export Test',
    subtitle: 'Can you actually leave if you need to?',
    items: [
      { label: 'Pick your most important tool (email, files, or database)', inputType: 'text', placeholder: 'e.g. Google Workspace, Microsoft 365, Salesforce...' },
      { label: 'Find the export function. Google: Takeout · Microsoft: Privacy dashboard · Other tools: look for "Export" in settings', inputType: 'dropdown', options: ['Found it easily', 'Found it but it was buried', 'Couldn\'t find an export option', 'Haven\'t looked yet'], placeholder: 'Select...' },
      { label: 'Actually try exporting a small sample. Don\'t wait until you need it', inputType: 'dropdown', options: ['Done, export worked', 'Done, export was incomplete', 'Done, got unusable format', 'Haven\'t tried yet'], placeholder: 'Select...' },
      { label: 'Does the export give you usable files (CSV, PDF, standard formats), or proprietary formats?', inputType: 'dropdown', options: ['Standard formats (CSV, PDF, etc.)', 'Mix of standard and proprietary', 'Mostly proprietary formats', 'Not sure'], placeholder: 'Select...' },
      { label: 'Note which tools DON\'T have an export option. These are your biggest lock-in risks', inputType: 'textarea', placeholder: 'e.g. Our CRM has no bulk export; the booking system only exports PDFs...' },
      { label: 'Set a calendar reminder to test exports annually', inputType: 'dropdown', options: ['Reminder set', 'Will do this now', 'Not yet'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'data-location',
    title: '3. Where Is Your Data?',
    subtitle: 'You can\'t protect what you can\'t find.',
    items: [
      { label: 'List everywhere your organisation stores data: cloud platforms, local drives, USB sticks, personal devices, paper files', inputType: 'textarea', placeholder: 'e.g. Google Drive, local NAS, USB backup drive in safe, paper files in filing cabinet...' },
      { label: 'For each location, note: who owns the account, what type of data, is it backed up?', offlineOnly: true, offlineReason: 'Use the Data Map template for a complete register with all fields' },
      { label: 'Flag any data stored on personal accounts (staff Gmail, personal Dropbox)', inputType: 'dropdown', options: ['No personal accounts used', 'Some data on personal accounts', 'Significant data on personal accounts', 'Not sure'], placeholder: 'Select...' },
      { label: 'Cloud provider stores data in Australia or overseas?', inputType: 'dropdown', options: ['All in Australia', 'Mix of AU and overseas', 'Mostly overseas', 'Not sure'], placeholder: 'Select...' },
      { label: 'Identify sensitive data (client records, health info, financial data). Does it have extra protection?', inputType: 'textarea', placeholder: 'e.g. Client records in Salesforce (access-controlled); health data in locked filing cabinet...' },
    ],
  },
  {
    id: 'backup-strategy',
    title: '4. Backup Strategy',
    subtitle: 'The question isn\'t if you\'ll lose data, it\'s when.',
    items: [
      { label: 'Identify your 3 most critical data sets', inputType: 'textarea', placeholder: 'e.g. 1. Client database 2. Financial records 3. Grant documentation' },
      { label: 'Is each one backed up automatically? Where does the backup live?', inputType: 'dropdown', options: ['All backed up automatically', 'Some backed up', 'No automatic backups', 'Not sure'], placeholder: 'Select...' },
      { label: 'Test a restore. Can you actually get your data back from the backup?', inputType: 'dropdown', options: ['Tested, restore works', 'Tested, had issues', 'Haven\'t tested yet'], placeholder: 'Select...' },
      { label: 'Backups are in a different location from the originals', inputType: 'dropdown', options: ['Yes, separate location', 'No, same cloud account', 'No backup exists', 'Not sure'], placeholder: 'Select...' },
      { label: 'Backup frequency: daily is ideal for active data; weekly minimum for everything else', inputType: 'dropdown', options: ['Daily or continuous', 'Weekly', 'Monthly or less', 'No scheduled backups'], placeholder: 'Current frequency?' },
      { label: 'Document your backup process so anyone on the team can verify or restore in an emergency', inputType: 'dropdown', options: ['Documented', 'Partially documented', 'Only in one person\'s head', 'No documentation'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'data-retention',
    title: '5. Data Retention & Deletion',
    subtitle: 'Keeping data you don\'t need is a risk, not an asset.',
    items: [
      { label: 'Identify data you\'re legally required to keep (financial records: 7 years, employee records: 7 years after leaving)', inputType: 'textarea', placeholder: 'e.g. Financial records since 2019, employee files for 3 former staff...' },
      { label: 'Identify data you\'re keeping "just in case" but have no legal obligation to retain', inputType: 'textarea', placeholder: 'e.g. Old event registrations from 2018, outdated mailing lists...' },
      { label: 'Set a retention schedule: for each data type, decide how long to keep it', offlineOnly: true, offlineReason: 'Best completed in the Data Map template where you can detail each data type' },
      { label: 'Delete data that has passed its retention period', inputType: 'dropdown', options: ['Done', 'In progress', 'Identified but not yet deleted', 'Haven\'t started'], placeholder: 'Select...' },
      { label: 'Review what data your tools are collecting automatically', inputType: 'dropdown', options: ['Reviewed, all necessary', 'Reviewed, some unnecessary collection', 'Haven\'t reviewed yet'], placeholder: 'Select...' },
      { label: 'For client data: can clients request deletion? Do you have a process?', inputType: 'dropdown', options: ['Yes, process documented', 'Yes, but informal process', 'No process yet', 'Not applicable'], placeholder: 'Select...' },
    ],
  },
];

export default function DataOwnership() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <ToolkitTracker currentGuideId="data-ownership" />
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/toolkit" className="text-ku-teal text-sm font-medium hover:text-ku-teal-dark no-underline mb-6 inline-block">
        ← Back to Toolkit
      </Link>

      <div className="mb-8">
        <span className="text-3xl mb-3 block">🔐</span>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">Data Ownership Checklist</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Your organisation's data is one of its most valuable assets. This checklist helps you
          understand who controls it, whether you can take it with you, and who has the keys.
        </p>
      </div>

      <FillableChecklist guideId="data-ownership" guideTitle="Data Ownership Checklist" sections={SECTIONS} />

      {/* Download template */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={downloadDataMapTemplate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Data Map Template
        </button>
        <span className="text-xs text-gray-400">Opens in Word or Google Docs</span>
      </div>

      {/* Useful links */}
      <section className="bg-ku-teal-light rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-3">Useful Resources</h2>
        <ul className="space-y-2">
          {[
            { text: 'Google Takeout, export all your Google data', url: 'https://takeout.google.com' },
            { text: 'Microsoft Privacy Dashboard, export your Microsoft data', url: 'https://account.microsoft.com/privacy' },
            { text: 'OAIC, Australian Privacy Principles guide', url: 'https://www.oaic.gov.au/privacy/australian-privacy-principles' },
            { text: '1Password (nonprofit pricing available), password manager', url: 'https://1password.com/teams/' },
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
            onClick={() => exportGuideAsCSV('data-ownership', 'Data Ownership Checklist', SECTIONS)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download CSV
          </button>
          <button
            onClick={downloadDataMapTemplate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Data Map Template
          </button>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-2 border-ku-teal rounded-xl p-6 text-center">
        <h2 className="font-bold text-ku-navy mb-2">Need help with this?</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          If your data ownership situation is complex (multiple platforms, legacy systems,
          or sensitive client data), Kamunity Consulting can help you sort it out.
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
