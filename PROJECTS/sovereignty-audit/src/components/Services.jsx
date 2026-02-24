import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

export default function Services() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Services
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ku-navy mb-4">
          Here's exactly what you get,<br className="hidden sm:block" /> what it costs, and the process
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Three levels of support, from completely free to full consulting engagement.
          NFP rates shown clearly. No hidden costs. No surprises.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Free Tier */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Start Here</span>
            <h2 className="text-2xl font-bold text-ku-navy mt-1">Free</h2>
            <p className="text-3xl font-bold text-ku-teal mt-2">$0</p>
            <p className="text-gray-500 text-sm mt-1">Always free. No sign-up required.</p>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            {[
              '2-minute Digital Sovereignty Audit with personalised score',
              '4 interactive toolkit guides with fillable checklists',
              'Downloadable Word templates for offline completion',
              'Cost comparison calculator with NFP discount directory',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-ku-teal mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/audit"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-ku-navy font-semibold rounded-xl hover:bg-gray-200 transition-colors no-underline text-sm"
          >
            Start the Free Audit
          </Link>
        </div>

        {/* Workshop Tier */}
        <div className="bg-white border-2 border-ku-teal rounded-2xl p-6 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-ku-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </span>
          </div>
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Go Deeper</span>
            <h2 className="text-2xl font-bold text-ku-navy mt-1">Workshop</h2>
            <div className="mt-2">
              <p className="text-3xl font-bold text-ku-teal">
                $1,500
                <span className="text-sm font-normal text-gray-500 ml-1">NFP rate</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Corporate rate: $3,000
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-1">Half-day session for your team.</p>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            {[
              'Facilitated half-day workshop with your team',
              'Hands-on audit of your actual digital tool stack',
              'Action plan with priorities and timeline',
              'In-person (Perth metro) or online delivery',
              '30-day follow-up support included',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-ku-teal mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setContactOpen(true)}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline text-sm cursor-pointer"
          >
            Book a Workshop
          </button>
        </div>

        {/* Consulting Tier */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Support</span>
            <h2 className="text-2xl font-bold text-ku-navy mt-1">Consulting</h2>
            <div className="mt-2">
              <p className="text-3xl font-bold text-ku-teal">
                $2,500
                <span className="text-sm font-normal text-gray-500 ml-1">NFP rate</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Corporate rate: $5,000
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-1">Full-day / Deep Dive engagement.</p>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
            {[
              'Full digital sovereignty audit and tool landscape review',
              'Vendor negotiation and migration planning support',
              'AI integration strategy tailored to your sector',
              'Staff training and onboarding for new tools',
              'Board-ready reporting and ongoing support',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-ku-teal mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setContactOpen(true)}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-ku-navy text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors no-underline text-sm cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Process */}
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold text-ku-navy mb-6 text-center">The Process</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Take the Audit', desc: 'Start with the free self-assessment to understand your position.' },
            { step: '2', title: 'Review Toolkit', desc: 'Use the free guides to tackle quick wins yourself.' },
            { step: '3', title: 'Book a Session', desc: 'If you want deeper help, book a workshop or consultation.' },
            { step: '4', title: 'Implement & Grow', desc: 'We help you make changes and build long-term digital resilience.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-8 h-8 bg-ku-teal text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-ku-navy text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing transparency note */}
      <div className="bg-ku-teal-light rounded-xl p-6 text-center">
        <h3 className="font-semibold text-ku-navy mb-2">Why NFP rates?</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
          Community organisations operate on tight budgets doing essential work.
          Our NFP rates reflect that reality. Corporate clients pay more because they can,
          and that helps us keep community rates affordable. No judgement either way.
          The work is what matters.
        </p>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
