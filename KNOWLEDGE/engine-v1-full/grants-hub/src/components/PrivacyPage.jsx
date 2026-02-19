import React from 'react';

export default function PrivacyPage({ onBack }) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4">&larr; Back</button>

      <div className="bg-white rounded-lg shadow p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: February 2026</p>
          <p className="text-gray-600 mt-3">
            This policy explains what data the Grant Acquittal Helper collects, where it's stored, and what
            control you have over it. We've written it in plain English because we believe transparency
            builds trust.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">What data do we collect?</h2>
          <p className="text-gray-600 mb-2">Only what you type into the tool:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Grant details (funder name, grant name, amount, deadline)</li>
            <li>Budget categories and budgeted amounts</li>
            <li>Expense records (date, description, amount, category, receipt reference)</li>
            <li>Narrative text you write for acquittal reports</li>
          </ul>
          <div className="mt-3 bg-green-50 border border-green-100 rounded p-3">
            <p className="text-sm text-green-800">
              <strong>What we do NOT collect:</strong> your name, email address, phone number, location,
              IP address, bank account details, payment information, or any personal identifying information.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">How is data stored?</h2>
          <div className="space-y-3 text-gray-600">
            <div>
              <h3 className="font-medium text-gray-700">Cloud mode (default)</h3>
              <p>
                Your data is stored in a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Supabase</a> database.
                Supabase is an open-source platform built on PostgreSQL. Data is:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-sm">
                <li>Encrypted in transit (HTTPS/TLS)</li>
                <li>Encrypted at rest (AES-256)</li>
                <li>Protected by Row Level Security — only your anonymous session can access your data</li>
                <li>Hosted on cloud infrastructure with regular backups</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Browser-only mode (fallback)</h3>
              <p>
                If the cloud is unavailable, data is stored in your browser's localStorage. This data
                never leaves your device. It will be lost if you clear your browser data.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Anonymous authentication</h2>
          <p className="text-gray-600">
            The tool uses anonymous authentication — a random session ID is created when you first visit.
            No email, no password, no name. This means:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>We cannot identify who you are</li>
            <li>We cannot contact you</li>
            <li>If you clear your browser data, your session is lost (export your data first)</li>
            <li>Your data cannot be accessed from another browser or device without export/import</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your control over your data</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Export:</strong> Download all your data as JSON at any time from the grant list view</li>
            <li><strong>Delete individual grants:</strong> Delete any grant from the grant list view</li>
            <li><strong>Delete all data:</strong> Use "Delete All My Data" in the app footer to permanently remove everything</li>
            <li><strong>Leave:</strong> Simply stop using the tool. Anonymous sessions expire after extended inactivity</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Third parties</h2>
          <div className="space-y-2 text-gray-600">
            <p><strong>No analytics.</strong> We don't use Google Analytics, Mixpanel, Hotjar, or any tracking tools.</p>
            <p><strong>No cookies.</strong> The tool uses localStorage and Supabase session tokens only. No tracking cookies.</p>
            <p><strong>No advertising.</strong> There are no ads and never will be.</p>
            <p><strong>No data sharing.</strong> Your data is never shared with, sold to, or accessed by any third party.</p>
            <p>
              The only third-party service is <strong>Supabase</strong> for database hosting (cloud mode) and
              <strong> Netlify</strong> for website hosting. Both process data only as needed to serve the application.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Feedback & Testing</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Anonymous feedback.</strong> We offer an optional feedback form (hosted by Google Forms)
              accessible from within the app. Responses go directly to Google Forms — we do not store feedback
              data in our database. Any information you provide in the form is governed by
              {' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google's Privacy Policy</a>.
            </p>
            <p>
              <strong>Tester opt-in.</strong> On our About page, you can voluntarily join our tester group by
              providing your email address. If you opt in:
            </p>
            <ul className="list-disc list-inside text-sm space-y-0.5">
              <li>We store your email and the date you consented in our Supabase database</li>
              <li>We use your email only to contact you about testing new features</li>
              <li>You can unsubscribe at any time by emailing us via <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">kamunity.ai</a></li>
              <li>You can request deletion of your tester signup by using "Delete All My Data" or contacting us</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Changes to this policy</h2>
          <p className="text-gray-600">
            If we change this policy, we'll update the date at the top of this page. The tool's code is
            open and transparent — you can verify our claims by inspecting the source.
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Questions?</h2>
          <p className="text-gray-600">
            If you have questions about how your data is handled, reach out via{' '}
            <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">kamunity.ai</a>.
            We're happy to explain anything in more detail.
          </p>
        </div>
      </div>
    </div>
  );
}
