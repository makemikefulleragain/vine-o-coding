import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Legal
        </p>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">Terms of Use</h1>
        <p className="text-gray-500 text-sm">Version 1.0 &mdash; Last updated: February 2026</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">About This Tool</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Kamunity AI Audit and Digital Sovereignty Toolkit ("the Tool") is a free,
            browser-based self-assessment tool provided by Kamunity Consulting. It is designed
            to help Australian community organisations, nonprofits, and social enterprises
            understand their digital sovereignty posture and take practical steps to improve it.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Free to Use</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Tool is provided free of charge. You may use it for your own organisation's
            assessment purposes without restriction. You do not need to create an account,
            provide an email address, or share any personal information to use any feature.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">What the Tool Does and Does Not Do</h2>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 text-sm mb-2">The Tool does:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Provide a self-assessment of your digital sovereignty across four dimensions</li>
                <li>• Offer practical, actionable checklists with structured data entry</li>
                <li>• Generate downloadable templates for offline completion</li>
                <li>• Provide interactive tools for tracking your tool inventory and costs</li>
                <li>• Save your progress locally on your device for return visits</li>
                <li>• Export your data as CSV files you can use elsewhere</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 text-sm mb-2">The Tool does not:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Constitute legal, financial, or professional IT advice</li>
                <li>• Replace a professional IT audit or security assessment</li>
                <li>• Guarantee the accuracy or completeness of any recommendation</li>
                <li>• Guarantee the accuracy of nonprofit discount information (verify directly with vendors)</li>
                <li>• Store your data on any server or cloud service</li>
                <li>• Provide any warranty about the suitability of suggested tools or alternatives</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Your Data</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            All data you enter into the Tool (audit answers, checklist responses, tool inventory
            entries, cost calculator data, and notes) is stored exclusively in your browser's
            localStorage on your device. See our{' '}
            <Link to="/privacy" className="text-ku-teal hover:text-ku-teal-dark no-underline">
              Privacy Policy
            </Link>{' '}
            for full details.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Important:</strong> Because data is stored only in your browser, it can be
            lost if you clear your browser data, use a different browser, or use a different
            device. We strongly recommend downloading CSV exports and Word templates as backup
            copies of your work.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Downloadable Templates</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Tool generates downloadable Word-compatible documents (.doc files) as templates.
            These are provided as starting points for your organisation's use. You are free to
            modify, share, and distribute these templates within your organisation. Templates
            are generated in your browser and contain placeholder text only; they do not include
            any data you have entered into the Tool.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">External Links and Resources</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Tool contains links to third-party websites, tools, and nonprofit discount
            programs. These links are provided for informational purposes. We do not control
            these external sites and are not responsible for their content, availability,
            pricing, or data practices. Nonprofit discount eligibility, pricing, and terms
            are set by each vendor and may change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Limitation of Liability</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Tool is provided "as is" without warranty of any kind, express or implied.
            Kamunity Consulting does not warrant that the Tool will be error-free, that
            recommendations will be suitable for your specific situation, or that information
            about third-party products and pricing is current and accurate. To the fullest
            extent permitted by Australian law, Kamunity Consulting shall not be liable for
            any damages arising from your use of the Tool.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Intellectual Property</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The content, design, and code of the Tool are owned by Kamunity Consulting.
            The educational content within the toolkit guides may be freely referenced and
            shared for non-commercial purposes with attribution. Downloaded templates may be
            used and modified freely by your organisation.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Consulting Services</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The Tool includes links to Kamunity Consulting's commercial services. Use of the
            Tool does not create a client-consultant relationship. If you engage Kamunity
            Consulting for paid services, those will be governed by a separate agreement.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Changes to These Terms</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            We may update these terms from time to time. Material changes will be reflected
            in the version number and date at the top of this page.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-ku-navy text-sm mb-2">Version History</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li><strong>v1.0 (Feb 2026)</strong> &mdash; Initial terms of use covering the audit tool, toolkit guides, interactive components (tool inventory, cost calculator), downloadable templates, and data handling.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Governing Law</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            These terms are governed by the laws of Western Australia. Any disputes will be
            subject to the jurisdiction of the courts of Western Australia.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-ku-navy text-lg mb-2">Contact</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            If you have questions about these terms, contact us via{' '}
            <a
              href="https://kamunityconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ku-teal hover:text-ku-teal-dark no-underline"
            >
              kamunityconsulting.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="text-ku-teal font-medium text-sm hover:text-ku-teal-dark no-underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
