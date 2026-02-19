import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolkitTracker from '../ToolkitTracker';
import FillableChecklist from '../FillableChecklist';
import ContactModal from '../ContactModal';
import { downloadAIPolicyTemplate } from '../../utils/templateExport';
import { exportGuideAsCSV } from '../../utils/auditStorage';

const SECTIONS = [
  {
    id: 'privacy-settings',
    title: '2. Privacy Settings Checklist',
    subtitle: 'Turn these on before your team starts using AI tools.',
    items: [
      { label: 'ChatGPT: Settings → Data Controls → turn OFF "Improve the model for everyone"', inputType: 'dropdown', options: ['Done, training opt-out enabled', 'Can\'t find the setting', 'We don\'t use ChatGPT', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Microsoft Copilot: Check Microsoft 365 admin settings for data sharing and Copilot access controls', inputType: 'dropdown', options: ['Reviewed and configured', 'Reviewed, needs changes', 'We don\'t use Copilot', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Google Gemini: Review Google Workspace admin console → Apps → Gemini settings', inputType: 'dropdown', options: ['Reviewed and configured', 'Reviewed, needs changes', 'We don\'t use Gemini', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Grammarly: Settings → Privacy → review what data is stored and how long', inputType: 'dropdown', options: ['Reviewed and acceptable', 'Reviewed, concerns found', 'We don\'t use Grammarly', 'Haven\'t checked yet'], placeholder: 'Select...' },
      { label: 'Any other AI tools: search "[tool name] privacy settings" and review', inputType: 'textarea', placeholder: 'e.g. Checked Otter.ai: disabled cloud storage of recordings; Jasper: reviewed data policy...' },
    ],
  },
  {
    id: 'ai-tool-eval',
    title: '5. AI Tool Evaluation Checklist',
    subtitle: 'Before adopting a new AI tool, work through these questions.',
    items: [
      { label: 'What problem does this tool solve? Can you describe it in one sentence?', inputType: 'text', placeholder: 'e.g. Drafting social media posts faster; summarising meeting notes...' },
      { label: 'Where does the data go? Check the privacy policy for data storage, training, and sharing', inputType: 'dropdown', options: ['Data stays private (confirmed)', 'Data may be used for training', 'Unclear from privacy policy', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Can you use it without entering sensitive data? If not, it may not be suitable', inputType: 'dropdown', options: ['Yes, no sensitive data needed', 'Mostly, but some edge cases', 'No, sensitive data required', 'Not sure'], placeholder: 'Select...' },
      { label: 'Is there a free tier that meets your needs?', inputType: 'dropdown', options: ['Yes, free tier is sufficient', 'Free tier too limited', 'No free tier available', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Does it integrate with tools you already use, or is it yet another silo?', inputType: 'dropdown', options: ['Integrates well', 'Some integration available', 'No integration, standalone', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Who on your team will manage this tool?', inputType: 'text', placeholder: 'e.g. Priya (operations); Sam (IT)...' },
      { label: 'What happens to your data if you stop using it? Can you export or delete?', inputType: 'dropdown', options: ['Can export and delete', 'Can delete but not export', 'Unclear', 'Haven\'t checked'], placeholder: 'Select...' },
      { label: 'Is there a nonprofit discount? Check TechSoup or contact the vendor directly', inputType: 'dropdown', options: ['Yes, discount available', 'No discount available', 'Haven\'t checked yet'], placeholder: 'Select...' },
    ],
  },
  {
    id: 'team-training',
    title: '6. Team AI Training Readiness',
    subtitle: 'Your team is only as safe as your least-trained member.',
    items: [
      { label: 'Run a 15-minute team session to explain your AI use policy (even informally)', inputType: 'dropdown', options: ['Done', 'Scheduled', 'Not yet planned'], placeholder: 'Select...' },
      { label: 'Show the team how to check privacy settings on tools they already use', inputType: 'dropdown', options: ['Done', 'Scheduled', 'Not yet planned'], placeholder: 'Select...' },
      { label: 'Practice the "headline test": would you be comfortable if this AI interaction appeared in the news?', inputType: 'dropdown', options: ['Team understands this concept', 'Need to introduce this', 'Not discussed yet'], placeholder: 'Select...' },
      { label: 'Create a shared doc of approved AI prompts / use cases for common tasks', offlineOnly: true, offlineReason: 'Best created as a shared Google Doc or internal wiki that your team can contribute to' },
      { label: 'Designate one person as the AI questions point-of-contact', inputType: 'text', placeholder: 'e.g. Priya is our AI go-to person; Sam handles technical questions...' },
      { label: 'Schedule a 6-monthly review to update the policy and discuss new tools', inputType: 'dropdown', options: ['Scheduled', 'Will schedule', 'Not yet planned'], placeholder: 'Select...' },
      { label: 'Celebrate good AI use. Share examples of time saved or quality improved', inputType: 'textarea', placeholder: 'e.g. Newsletter drafting takes 30 min instead of 2 hours; meeting notes auto-summarised...' },
    ],
  },
];

export default function AIReadiness() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <ToolkitTracker currentGuideId="ai-readiness" />
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/toolkit" className="text-ku-teal text-sm font-medium hover:text-ku-teal-dark no-underline mb-6 inline-block">
        ← Back to Toolkit
      </Link>

      <div className="mb-8">
        <span className="text-3xl mb-3 block">🤖</span>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">AI Safety Starter Kit</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          AI tools are powerful, but community organisations need to use them carefully,
          especially when handling sensitive data. This kit gives you a practical starting point.
        </p>
      </div>

      {/* Key stat */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8 text-center">
        <p className="text-purple-800 text-sm font-medium">
          Only 15% of nonprofits have implemented an AI use policy.
          <span className="text-purple-600 font-normal"> (2025 AI Equity Project)</span>
        </p>
      </div>

      {/* One-page policy template */}
      <section className="bg-white border-2 border-purple-300 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-1">1. One-Page AI Use Policy Template</h2>
        <p className="text-gray-500 text-sm mb-4">Copy this, fill in the blanks, and share it with your team. A simple policy is better than no policy.</p>

        <div className="bg-gray-50 rounded-lg p-5 text-sm space-y-4 border border-gray-200">
          <div>
            <h3 className="font-bold text-ku-navy mb-1">[Your Organisation Name] AI Use Guidelines</h3>
            <p className="text-gray-500 italic">Last updated: [date]</p>
          </div>

          <div>
            <h4 className="font-semibold text-ku-navy mb-1">Purpose</h4>
            <p className="text-gray-700 leading-relaxed">
              These guidelines help our team use AI tools safely and effectively.
              We encourage experimentation with AI for appropriate tasks, while protecting
              our clients' privacy and our organisation's integrity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-ku-navy mb-1">Applies to</h4>
            <p className="text-gray-700">All staff, volunteers, contractors, and board members.</p>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-1">✅ You CAN use AI for:</h4>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• Drafting social media posts, newsletters, and general communications</li>
              <li>• Brainstorming ideas and planning</li>
              <li>• Summarising long documents (that don't contain personal information)</li>
              <li>• Research and learning about topics relevant to your work</li>
              <li>• Proofreading and editing your own writing</li>
              <li>• Creating templates and checklists</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-red-700 mb-1">🚫 Do NOT enter into AI tools:</h4>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• Client names, case notes, or any personally identifying information</li>
              <li>• Confidential organisational information (financial details, board minutes, HR matters)</li>
              <li>• Passwords, access credentials, or security information</li>
              <li>• Information about vulnerable people (family violence, health, disability, youth)</li>
              <li>• Legal documents or content requiring professional advice</li>
              <li>• Anything you wouldn't paste into a public website</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-700 mb-1">⚠️ Always remember:</h4>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• AI can be wrong. Always check important facts and figures</li>
              <li>• AI-generated content should be reviewed before publishing</li>
              <li>• If you're unsure whether something is safe to enter, ask [designated person] first</li>
              <li>• We review these guidelines every [6 months/annually]</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ku-navy mb-1">Approved AI tools</h4>
            <p className="text-gray-700">
              [List the specific AI tools your organisation has approved, e.g.:]<br />
              • ChatGPT (with "don't train on my data" setting enabled)<br />
              • Microsoft Copilot (via your Microsoft 365 plan)<br />
              • Grammarly (free tier for proofreading)
            </p>
          </div>

          <div className="border-t border-gray-300 pt-3">
            <p className="text-gray-500 text-xs">
              Questions? Contact [name/role]. This policy was created using the Kamunity AI Safety Starter Kit.
            </p>
          </div>
        </div>
      </section>

      <FillableChecklist guideId="ai-readiness" guideTitle="AI Safety Starter Kit" sections={SECTIONS} />

      {/* Download template */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={downloadAIPolicyTemplate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download AI Policy Template
        </button>
        <span className="text-xs text-gray-400">Opens in Word or Google Docs</span>
      </div>

      {/* When NOT to use AI */}
      <section className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-red-800 text-lg mb-1">3. When NOT to Use AI</h2>
        <p className="text-red-700 text-sm mb-4">Some tasks are too sensitive, too important, or too relational for AI.</p>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            'Making decisions about client eligibility for services, benefits, or funding',
            'Drafting communications during a crisis, grief situation, or trauma response',
            'Creating or rewriting client case notes containing personal information',
            'HR decisions: performance reviews, disciplinary actions, hiring decisions',
            'Content that represents community voice without their consent and input',
            'Any situation where wrong information could cause real harm and you can\'t verify it',
            'Legal, medical, or financial advice. Always consult qualified professionals',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Self-hosted AI note */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-1">4. For Organisations Handling Very Sensitive Data</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          If your organisation handles highly sensitive information (family violence services, health data,
          disability services, youth protection), consider that <strong>no cloud-based AI tool can guarantee
          your data won't be accessed by the provider</strong>.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          For these organisations, self-hosted AI solutions exist that keep all data on your own servers.
          These are more complex to set up but offer the highest level of data control.
          This is specialist territory. Talk to a consultant who understands both the technology and
          the compliance requirements for your sector.
        </p>
        <p className="text-gray-500 text-xs italic">
          This is a conversation to have with a specialist, not a DIY project. But knowing the option
          exists is the first step.
        </p>
      </section>

      {/* Useful links */}
      <section className="bg-ku-teal-light rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ku-navy text-lg mb-3">Useful Resources</h2>
        <ul className="space-y-2">
          {[
            { text: 'Candid.org, Getting started on a responsible AI use policy for nonprofits', url: 'https://candid.org/blogs/how-to-create-responsible-ai-use-policy-for-nonprofits/' },
            { text: 'ChatGPT Privacy Settings, how to opt out of training', url: 'https://help.openai.com/en/articles/7730893-data-controls-faq' },
            { text: 'OAIC, Australian Privacy Principles', url: 'https://www.oaic.gov.au/privacy/australian-privacy-principles' },
            { text: 'Whole Whale, Top Nonprofit AI Policies 2025', url: 'https://wholewhale.com/tips/top-nonprofit-ai-policies-2025-analysis-and-trends/' },
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
            onClick={() => exportGuideAsCSV('ai-readiness', 'AI Safety Starter Kit', SECTIONS)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download CSV
          </button>
          <button
            onClick={downloadAIPolicyTemplate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download AI Policy Template
          </button>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-2 border-ku-teal rounded-xl p-6 text-center">
        <h2 className="font-bold text-ku-navy mb-2">Need help with this?</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          Setting up AI safely for a community organisation, especially one handling sensitive data,
          is something Kamunity Consulting specialises in. We can help you create policies,
          configure privacy settings, and train your team.
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
