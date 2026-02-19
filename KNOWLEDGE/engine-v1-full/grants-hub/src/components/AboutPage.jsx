import React, { useState } from 'react';
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase';

function TesterSignup({ authUser, showToast }) {
  const [email, setEmail] = useState(authUser?.email || '');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !consent) return;
    setLoading(true);
    try {
      if (SUPABASE_CONFIGURED && supabase) {
        const { error } = await supabase.from('tester_signups').insert({
          email: email.trim(),
          consent_at: new Date().toISOString(),
          source: 'about_page',
          user_id: authUser?.id || null,
        });
        if (error) throw error;
      }
      setDone(true);
      showToast?.('Thanks! We\'ll be in touch.', 'success', 5000);
    } catch (err) {
      console.error('Tester signup failed:', err);
      showToast?.('Could not save — please try again later.', 'error');
    } finally { setLoading(false); }
  };

  if (done) {
    return (
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Help Shape This Tool</h2>
        <div className="bg-green-50 border border-green-100 rounded p-3 text-sm text-green-800">
          You're signed up! We'll reach out when we need testers. Thanks for helping.
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Help Shape This Tool</h2>
      <p className="text-gray-600 text-sm mb-3">
        We're looking for volunteer treasurers and committee members to test new features
        and share feedback. Join our tester group and help make this tool work better for
        people like you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required
          className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none" />
        <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-gray-300" />
          <span>
            I agree to receive occasional emails about testing new features. I can unsubscribe anytime.
            {' '}<a href="#" onClick={(e) => { e.preventDefault(); /* navigate handled by parent */ }}
              className="text-indigo-600 hover:underline">Privacy Policy</a>
          </span>
        </label>
        <button type="submit" disabled={loading || !consent || !email.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Signing up...' : 'Join Tester Group'}
        </button>
      </form>
    </div>
  );
}

export default function AboutPage({ onBack, authUser, showToast }) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4">&larr; Back</button>

      <div className="bg-white rounded-lg shadow p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">About This Tool</h1>
          <p className="text-gray-600">
            The Grant Acquittal Helper is a free tool built specifically for small Australian nonprofits
            and community groups. It helps volunteer treasurers track grant spending, manage budget
            categories, and generate acquittal reports that meet funder expectations.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Why does this exist?</h2>
          <p className="text-gray-600">
            Small community organisations shouldn't need expensive accounting software to acquit a $5,000 grant.
            Most volunteer treasurers currently use spreadsheets — which work, but don't guide you through the
            acquittal process or help you avoid common reporting mistakes that funders flag.
          </p>
          <p className="text-gray-600 mt-2">
            This tool was built to be the simplest possible path from "we received a grant" to "here's our
            acquittal report" — with guidance along the way.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Who built it?</h2>
          <p className="text-gray-600">
            This tool is built by{' '}
            <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Kamunity</a>
            {' '}— a platform where communities come together. Kamunity builds rooms and tools
            that help community groups connect, collaborate, and get things done without juggling
            multiple apps.
          </p>
          <p className="text-gray-600 mt-2">
            The Grant Acquittal Helper is one of those tools — purpose-built for the treasurers
            and volunteers who keep small organisations running.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">What's the catch?</h2>
          <p className="text-gray-600">There isn't one. This tool is free to use. Specifically:</p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li><strong>No ads.</strong> Ever.</li>
            <li><strong>No tracking.</strong> We don't use analytics, cookies, or third-party trackers.</li>
            <li><strong>No data selling.</strong> Your grant data is yours. We don't access, read, or share it.</li>
            <li><strong>No sign-up required.</strong> The tool works with anonymous sessions — no email, no password, no name.</li>
            <li><strong>Your data is exportable.</strong> Download all your data as JSON anytime. You're never locked in.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">How is it built?</h2>
          <p className="text-gray-600">
            The tool is built with modern web technology (React, Tailwind CSS) and uses
            {' '}<a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Supabase</a>{' '}
            for secure cloud storage. Data is encrypted in transit (HTTPS/TLS) and at rest.
            If cloud storage is unavailable, the tool falls back to your browser's local storage automatically.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Can I trust it with my grant data?</h2>
          <p className="text-gray-600">
            We've designed the tool with a simple principle: <strong>collect only what's needed, be transparent
            about everything, and give you full control.</strong>
          </p>
          <p className="text-gray-600 mt-2">
            Read our <button onClick={() => onBack('privacy')} className="text-indigo-600 hover:underline font-medium">Privacy Policy</button> for
            the full details of what data is stored and how. Or visit{' '}
            <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">kamunity.ai</a>
            {' '}to learn more about the team behind this tool.
          </p>
        </div>

        <TesterSignup authUser={authUser} showToast={showToast} />

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Disclaimer</h2>
          <p className="text-sm text-gray-500">
            This tool helps you organise your grant acquittal data. It does not constitute financial, legal,
            or accounting advice. Always verify your acquittal requirements with your funder and consult a
            qualified professional if you're unsure about your obligations.
          </p>
        </div>
      </div>
    </div>
  );
}
