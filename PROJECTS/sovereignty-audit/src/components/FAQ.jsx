import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const faqItems = [
  {
    q: 'What is digital sovereignty?',
    a: 'Digital sovereignty means having control over your organisation\'s digital tools, data, and costs. It\'s about knowing where your data is, who can access it, whether you could leave your current tools if you needed to, and whether you\'re paying a fair price. For community organisations, it\'s the difference between "our tools work for us" and "we work for our tools."',
  },
  {
    q: 'Who is this audit for?',
    a: 'Community organisations, NFPs, volunteer-led groups, neighbourhood centres, Aboriginal community organisations, local sporting clubs, anyone running on a mix of free tools and paid subscriptions who suspects they could be doing better. If you manage the tech because nobody else will, this is for you.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. The audit runs entirely in your web browser. Your answers are never sent to any server. We have no database, no user accounts, no analytics, and no tracking. When you close the tab, your data is gone. We practice what we preach about digital sovereignty.',
  },
  {
    q: 'How long does the audit take?',
    a: 'About 2 minutes. There are 10 questions, each with 3-4 answer options. No typing required. Just select the option that best fits your situation.',
  },
  {
    q: 'What do the scores mean?',
    a: 'Your sovereignty score (0-100) maps to four stages: Exposed (0-25), Aware (26-50), Progressing (51-75), and Sovereign (76-100). Each of the four dimensions (Data Ownership, Vendor Lock-in, Cost Transparency, AI Readiness) also gets its own score and status. These are a map of your position, not a grade. There\'s no pass or fail.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. No account, no email, no sign-up. Just open the page and start. This is a deliberate design choice. We don\'t want your personal information, and you shouldn\'t need to give it to get useful help.',
  },
  {
    q: 'Can I share my results?',
    a: 'Currently, results exist only in your browser session. You can take screenshots or note down your scores to share with colleagues or your board. We\'re considering adding a shareable results feature in the future that would still respect your privacy.',
  },
  {
    q: 'Who built this?',
    a: 'Kamunity Consulting, a small Australian consultancy focused on digital sovereignty for community organisations. We have 30+ years of experience working with and inside the community sector. This tool is free because we believe every community org deserves to understand their digital position, regardless of budget.',
  },
  {
    q: 'What if I need more help than the free tools provide?',
    a: 'We offer workshops (half-day sessions for your team) and consulting engagements (full digital sovereignty audits with implementation support). NFP rates are always lower than corporate rates. Visit our Services page for details and transparent pricing.',
  },
  {
    q: 'Is this really free? What\'s the catch?',
    a: 'It\'s genuinely free, with no catch. The audit and toolkit are designed to be valuable on their own. If some organisations decide they want deeper help and engage our paid services, that\'s great, but there\'s no pressure, no upselling, and the free tools will always be free.',
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-ku-navy text-sm pr-4">{item.q}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Help
        </p>
        <h1 className="text-3xl font-bold text-ku-navy mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 leading-relaxed">
          Common questions about the Kamunity AI Audit, digital sovereignty, and our services.
        </p>
      </div>

      <div className="space-y-3 mb-10">
        {faqItems.map((item, i) => (
          <FAQItem key={i} item={item} />
        ))}
      </div>

      <div className="bg-ku-teal-light rounded-xl p-6 text-center">
        <h2 className="font-bold text-ku-navy mb-2">Still have questions?</h2>
        <p className="text-gray-600 text-sm mb-4">
          If your question isn't answered here, get in touch.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/audit"
            className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline text-sm"
          >
            Take the Free Audit
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-ku-teal font-semibold rounded-xl border-2 border-ku-teal hover:bg-ku-teal-light transition-colors text-sm cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
