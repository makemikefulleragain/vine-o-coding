import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolkitTracker from '../ToolkitTracker';
import FillableChecklist from '../FillableChecklist';
import CostCalculator from '../CostCalculator';
import ContactModal from '../ContactModal';
import { downloadCostAuditTemplate } from '../../utils/templateExport';
import { exportGuideAsCSV } from '../../utils/auditStorage';

const SECTIONS = [
  {
    id: 'spend-audit',
    title: '1. Monthly Digital Spend Audit',
    subtitle: 'Set aside 30 minutes this month to do this once. It pays for itself.',
    items: [
      { label: 'Pull your organisation\'s bank and credit card statements for the last 3 months', inputType: 'dropdown', options: ['Done', 'In progress', 'Haven\'t started', 'Don\'t have access to statements'], placeholder: 'Select...' },
      { label: 'Search for recurring charges: "subscription", "cloud", "software", "SaaS", "hosting", "domain"', inputType: 'number', placeholder: 'How many recurring charges did you find?' },
      { label: 'Check email inboxes for payment receipts and renewal notices', inputType: 'dropdown', options: ['Done, found additional charges', 'Done, nothing new', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Ask team members: "What tools have you signed up for?" There are almost always tools you don\'t know about', inputType: 'textarea', placeholder: 'e.g. Marketing uses Canva Pro ($20/mo); Programs team signed up for Monday.com ($30/mo)...' },
      { label: 'Add it all up. The total will likely surprise you.', inputType: 'number', placeholder: 'Total monthly digital spend ($)' },
      { label: 'Note which subscriptions are annual vs monthly. Annual renewals are easy to forget', inputType: 'textarea', placeholder: 'e.g. Annual: Domain renewal ($50, due Sept); Website hosting ($240, due Jan). Monthly: all others...' },
    ],
  },
  {
    id: 'hidden-costs',
    title: '3. Hidden Costs Checklist',
    subtitle: 'The subscription price is only part of the real cost.',
    items: [
      { label: 'Staff time spent managing tools: how many hours per week on IT administration?', inputType: 'number', placeholder: 'Estimated hours per week' },
      { label: 'Training costs: when you adopt a new tool, how long does it take everyone to learn it?', inputType: 'dropdown', options: ['Less than an hour', 'Half a day', '1-2 days', 'A week or more'], placeholder: 'Select...' },
      { label: 'Workaround costs: are people using manual processes because the tools don\'t quite fit?', inputType: 'dropdown', options: ['No workarounds needed', 'A few minor workarounds', 'Significant manual workarounds', 'Major processes are manual'], placeholder: 'Select...' },
      { label: 'Integration costs: are you paying for extra tools just to connect other tools together?', inputType: 'text', placeholder: 'e.g. Zapier ($30/mo) to connect CRM to email; nothing extra needed...' },
      { label: 'Opportunity costs: what could your team do with the time they spend on technology?', inputType: 'textarea', placeholder: 'e.g. Estimated 5 hrs/week on IT = could serve 3 more clients, or write 2 grant applications...' },
      { label: 'Data cost: are "free" tools collecting and monetising your organisation\'s data?', inputType: 'dropdown', options: ['No free tools with data concerns', 'Some free tools, data practices unclear', 'Yes, using tools that monetise data', 'Not sure'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'budget-planning',
    title: '5. Budget Planning Checklist',
    subtitle: 'Build digital costs into your annual budget properly.',
    items: [
      { label: 'Create a line item for "digital infrastructure" in your annual budget', inputType: 'dropdown', options: ['Already exists', 'Will add for next budget', 'No annual budget process'], placeholder: 'Select...' },
      { label: 'Include subscription costs, domain renewals, hosting, and any paid integrations', inputType: 'number', placeholder: 'Estimated annual total ($)' },
      { label: 'Budget for staff training time when adopting new tools (typically 2-4 hours per person)', inputType: 'number', placeholder: 'Annual training budget ($)' },
      { label: 'Set aside a small contingency (10-15%) for unexpected price increases or emergency tool changes', inputType: 'number', placeholder: 'Contingency amount ($)' },
      { label: 'Track actual vs budgeted spending quarterly', inputType: 'dropdown', options: ['Already tracking quarterly', 'Will start tracking', 'No tracking process yet'], placeholder: 'Select...' },
      { label: 'Document digital spending for grant applications', inputType: 'dropdown', options: ['Already documented for grants', 'Can compile from records', 'Not documented, need to start'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'tool-consolidation',
    title: '6. Tool Consolidation Assessment',
    subtitle: 'Fewer tools means less cost, less training, and less risk.',
    items: [
      { label: 'List tools with overlapping functions (e.g. Slack AND Teams AND email for messaging)', inputType: 'textarea', placeholder: 'e.g. Slack + Teams (both messaging); Google Drive + Dropbox (both file storage)...' },
      { label: 'For each overlap, decide which tool to keep. Consider: cost, team preference, data portability', inputType: 'textarea', placeholder: 'e.g. Keep Teams (free with M365), drop Slack (saves $50/mo); Keep Google Drive (better sharing)...' },
      { label: 'Check if your primary platform already includes features you\'re paying separately for', inputType: 'dropdown', options: ['Checked, found overlap', 'Checked, no overlap', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Ask your team: "Which tools do you actually use daily?" Unused subscriptions are the easiest cut', inputType: 'textarea', placeholder: 'e.g. Nobody uses Basecamp anymore; only 2 people use Trello...' },
      { label: 'Review free tiers. Many tools offer free plans that cover what small orgs actually need', inputType: 'dropdown', options: ['Reviewed, can downgrade some', 'Reviewed, already on best plans', 'Haven\'t reviewed yet'], placeholder: 'Select...' },
      { label: 'After consolidation, cancel unused subscriptions immediately', inputType: 'dropdown', options: ['All cancelled', 'Some cancelled, more to do', 'Identified but not cancelled yet', 'Not applicable yet'], placeholder: 'Select...' },
    ],
  },
];

export default function CostTransparency() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <ToolkitTracker currentGuideId="cost-transparency" />
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/toolkit" className="text-ku-teal text-sm font-medium hover:text-ku-teal-dark no-underline mb-6 inline-block">
        ← Back to Toolkit
      </Link>

      <div className="mb-8">
        <span className="text-3xl mb-3 block">💰</span>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">Cost Transparency Toolkit</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Most community orgs don't know what they're actually spending on digital tools.
          This toolkit helps you find out, and shows you where you might be overpaying.
        </p>
      </div>

      <FillableChecklist guideId="cost-transparency" guideTitle="Cost Transparency Toolkit" sections={SECTIONS} />

      {/* Cost Comparison Calculator */}
      <CostCalculator />

      {/* Download template */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={downloadCostAuditTemplate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Cost Audit Worksheet
        </button>
        <span className="text-xs text-gray-400">Opens in Word or Google Docs</span>
      </div>

      {/* Nonprofit Discounts */}
      <section className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-green-800 text-lg mb-1">2. Nonprofit Discounts You Might Be Missing</h2>
        <p className="text-green-700 text-sm mb-4">
          Many orgs pay full price for tools that offer free or deeply discounted nonprofit plans.
          Check if you qualify. Most Australian registered charities and DGR-status organisations do.
        </p>
        <div className="space-y-3">
          {[
            {
              tool: 'Google for Nonprofits',
              deal: 'Free Google Workspace (up to 100 users), $10k/month in Google Ad Grants',
              url: 'https://www.google.com/nonprofits/',
            },
            {
              tool: 'Microsoft Nonprofits',
              deal: 'Free Microsoft 365 Business Basic (up to 300 users), discounted Premium plans',
              url: 'https://nonprofit.microsoft.com/',
            },
            {
              tool: 'Canva for Nonprofits',
              deal: 'Free Canva Pro for up to 50 users',
              url: 'https://www.canva.com/canva-for-nonprofits/',
            },
            {
              tool: 'Slack for Nonprofits',
              deal: '85% discount on Slack Pro',
              url: 'https://slack.com/intl/en-au/for-nonprofits',
            },
            {
              tool: 'Zoom for Nonprofits',
              deal: '50% discount on Zoom plans',
              url: 'https://zoom.us/en/nonprofits',
            },
            {
              tool: 'TechSoup',
              deal: 'Aggregator: access dozens of nonprofit discounts through one registration',
              url: 'https://www.techsoup.org/join',
            },
            {
              tool: 'Atlassian Community',
              deal: 'Free Jira, Confluence, Trello for eligible nonprofits',
              url: 'https://www.atlassian.com/software/views/community-license-request',
            },
            {
              tool: '1Password for Nonprofits',
              deal: 'Free Teams plan for nonprofits',
              url: 'https://1password.com/for/nonprofits',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-green-200">
              <span className="text-green-600 font-bold text-sm shrink-0 mt-0.5">$</span>
              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-ku-navy hover:text-ku-teal no-underline"
                >
                  {item.tool} ↗
                </a>
                <p className="text-sm text-gray-600">{item.deal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grant Reporting */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-1">4. Grant Reporting Tips</h2>
        <p className="text-gray-500 text-sm mb-4">Many grants now accept digital infrastructure as a legitimate expense.</p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-ku-teal shrink-0">•</span>
            <span>Keep your digital tool inventory updated. It makes grant applications and acquittals much easier</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ku-teal shrink-0">•</span>
            <span>Track time spent on digital administration. This is a real cost you can include in grant budgets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ku-teal shrink-0">•</span>
            <span>Some grants specifically fund digital transformation. Your audit results can support these applications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ku-teal shrink-0">•</span>
            <span>Document your "before and after" when making tool changes. Funders love evidence of improvement</span>
          </li>
        </ul>
      </section>

      {/* Download all buttons */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-3 text-center">Download Your Work</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => exportGuideAsCSV('cost-transparency', 'Cost Transparency Toolkit', SECTIONS)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download CSV
          </button>
          <button
            onClick={downloadCostAuditTemplate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Cost Audit Worksheet
          </button>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-2 border-ku-teal rounded-xl p-6 text-center">
        <h2 className="font-bold text-ku-navy mb-2">Need help with this?</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          A full cost audit and tool review can save your organisation thousands per year.
          Kamunity Consulting offers affordable workshops and consulting for community organisations.
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
