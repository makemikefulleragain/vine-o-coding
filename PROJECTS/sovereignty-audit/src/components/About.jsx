import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-ku-teal font-semibold text-sm uppercase tracking-wide mb-2">
          About Us
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ku-navy mb-4">
          Kamunity Consulting
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          We help community organisations take control of their digital tools, data, and costs.
          Not by selling them more software, but by helping them understand what they already have
          and what they actually need.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-ku-teal-light rounded-xl p-6 mb-8">
        <h2 className="font-bold text-ku-navy text-lg mb-2">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Most community organisations don't know what they're actually paying for their
          digital tools, in money, time, AND data. They don't know what alternatives exist.
          They feel overwhelmed by AI hype. They need a starting point that isn't "hire a
          consultant" or "read 47 blog posts." We built this tool to be that starting point.
        </p>
      </section>

      {/* Experience */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-ku-navy text-lg mb-4">What We Bring</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: '30+ Years in Community',
              desc: 'Decades of experience working with and inside community organisations, NFPs, and social enterprises across Australia.',
            },
            {
              title: 'Small & Dedicated Team',
              desc: 'We\'re not a big consultancy. We\'re a small team that genuinely cares about the community sector and understands its constraints.',
            },
            {
              title: 'Growing Network',
              desc: 'Connected with community peak bodies, local government, and micro-NFPs serving communities doing it tough.',
            },
            {
              title: 'Practitioner-Led',
              desc: 'We don\'t just advise. We\'ve been the ones setting up the Google Workspace, managing the Xero, and choosing the booking system.',
            },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-ku-navy text-sm mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Work */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-ku-navy text-lg mb-3">What We're Working On</h2>
        <ul className="space-y-3">
          {[
            'Building a tailored digital sovereignty program for a local government peak body',
            'Developing a custom Kamunity platform for The Pack Music Australia',
            'Speaking with community peak bodies and micro-NFPs about shared digital infrastructure',
            'Growing a network of supporters who believe community organisations deserve better digital tools',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <span className="text-ku-teal shrink-0 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Values */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-ku-navy text-lg mb-4">Our Values</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Sovereignty',
              desc: 'Your data belongs to you. Your tools should work for you. You should be able to leave any provider, any time.',
            },
            {
              title: 'Transparency',
              desc: 'We show our pricing clearly. We explain what we do and don\'t do with data. No hidden costs, no surprises.',
            },
            {
              title: 'Community First',
              desc: 'We price for the sector we serve. NFP rates are always lower than corporate rates because the work matters more than the margin.',
            },
            {
              title: 'Practical Over Perfect',
              desc: 'We\'d rather give you a working checklist today than a perfect strategy document next month. Progress beats perfection.',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-ku-teal rounded-full mt-2 shrink-0"></div>
              <div>
                <h3 className="font-semibold text-ku-navy text-sm">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-ku-navy text-lg mb-3">The Kamunity Ecosystem</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The AI Audit is one part of a broader ecosystem of tools and services for community organisations.
        </p>
        <div className="space-y-2">
          {[
            { name: 'kamunity.ai', url: 'https://kamunity.ai', desc: 'AI tools and research for community organisations' },
            { name: 'kamunity.org', url: 'https://kamunity.org', desc: 'Community hub and resources' },
            { name: 'kamunityconsulting.com', url: 'https://kamunityconsulting.com', desc: 'Consulting services for digital sovereignty' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-ku-teal transition-colors no-underline group"
            >
              <div>
                <span className="font-medium text-ku-navy text-sm group-hover:text-ku-teal">{link.name}</span>
                <p className="text-gray-500 text-xs">{link.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-ku-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-4">Ready to understand your digital position?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/audit"
            className="inline-flex items-center justify-center px-6 py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors no-underline"
          >
            Take the Free Audit
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-ku-teal font-semibold rounded-xl border-2 border-ku-teal hover:bg-ku-teal-light transition-colors no-underline"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
