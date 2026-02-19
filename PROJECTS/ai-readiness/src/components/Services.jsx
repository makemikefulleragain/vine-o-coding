import { Link } from 'react-router-dom'
import ContactButton from './ContactButton'

const SERVICES = [
  {
    name: 'AI Awareness Workshop',
    price: 'From $1,500',
    duration: 'Half-day or full-day',
    description:
      'A hands-on workshop for your whole team. We cover AI basics, safety guidelines, prompt practice, and Q&A — all tailored to your sector and your people.',
    includes: [
      'AI fundamentals in plain language',
      'Hands-on prompt practice with real community org tasks',
      'Safety and ethics guidelines for your context',
      'Follow-up resource pack for every participant',
      'Q&A session with practical next steps',
    ],
    for: 'Teams of 5–20 people',
    format: 'In-person (Perth metro) or virtual',
    highlight: 'Most Popular',
  },
  {
    name: 'AI Strategy Session',
    price: '$500',
    duration: '90 minutes',
    description:
      'A focused 1:1 session with your leadership to map AI priorities, risks, and opportunities for your organisation.',
    includes: [
      'Pre-session questionnaire to understand your context',
      'Facilitated 90-minute session',
      'Written summary with prioritised recommendations',
      'Template AI policy for your board',
      'Follow-up email support for 2 weeks',
    ],
    for: 'CEOs, operations managers, board members',
    format: 'Virtual or in-person',
    highlight: null,
  },
  {
    name: 'Full AI Readiness Mapping',
    price: 'From $3,500',
    duration: 'Multi-week engagement',
    description:
      'A comprehensive assessment of your organisation\'s AI readiness — from staff capability to data practices to governance. You get a custom roadmap, not a generic report.',
    includes: [
      'Staff interviews and capability assessment',
      'Systems and data practices review',
      'Risk assessment for your specific client groups',
      'Custom AI roadmap with 6 and 12-month milestones',
      'Board presentation of findings',
      '3-month follow-up check-in',
    ],
    for: 'Organisations ready to develop a formal AI strategy',
    format: 'Blended (virtual + in-person)',
    highlight: null,
  },
]

export default function Services() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
          AI Readiness Services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Practical, values-aligned support for community organisations navigating
          AI. Transparent pricing. No jargon. No upselling.
        </p>
      </header>

      {/* Free Discovery Call */}
      <section className="mb-10">
        <div className="bg-moss-50 border border-moss-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-charcoal text-xl mb-2">
            Start with a free discovery call
          </h2>
          <p className="text-gray-600 mb-4">
            30 minutes, no obligation. We'll talk about where your organisation is
            and what might help.
          </p>
          <ContactButton className="btn-primary">
            Book a Free Call
          </ContactButton>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="mb-12">
        <div className="space-y-6">
          {SERVICES.map((service) => (
            <div key={service.name} className="card relative">
              {service.highlight && (
                <span className="absolute -top-3 right-4 bg-moss-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {service.highlight}
                </span>
              )}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-charcoal">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>
                <span className="text-2xl font-bold text-moss-600 md:text-right whitespace-nowrap">
                  {service.price}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-charcoal mb-2">
                  What's included:
                </h4>
                <ul className="space-y-1">
                  {service.includes.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-moss-500 mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                <span>
                  <strong>For:</strong> {service.for}
                </span>
                <span>
                  <strong>Format:</strong> {service.format}
                </span>
              </div>

              <ContactButton className="btn-secondary w-full md:w-auto">
                Enquire About {service.name}
              </ContactButton>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Note */}
      <section className="mb-10">
        <div className="card bg-gray-50">
          <h3 className="font-semibold text-charcoal mb-2">
            A note on pricing
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            These prices reflect our commitment to making AI guidance accessible
            for the community sector. We offer the same quality of consulting
            that enterprise clients receive, at rates designed for NFPs and
            community organisations. If budget is a barrier, talk to us — we may
            be able to adjust scope or explore funding options together.
          </p>
        </div>
      </section>

      {/* Testimonials (empty, ready to populate) */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-4 text-center">
          What organisations say
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="card border-dashed border-gray-300 bg-gray-50 flex items-center justify-center min-h-[120px]"
            >
              <p className="text-gray-400 text-sm italic text-center">
                Testimonial coming soon
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          About Kamunity
        </h2>
        <div className="card">
          <p className="text-gray-600 leading-relaxed mb-3">
            Kamunity Consulting brings 30+ years of experience in quality
            assurance, operational improvement, and human-centred change — now
            infused with AI expertise to help organisations navigate this
            transition thoughtfully.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            We specialise in the community sector because we believe these
            organisations deserve the same quality of technology guidance that
            corporate clients receive — without the corporate price tag or the
            corporate assumptions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Based in Perth, working across Australia.{' '}
            <a
              href="https://www.kamunityconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Learn more about Kamunity Consulting →
            </a>
          </p>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="text-center mb-4">
        <p className="text-gray-500 mb-3">
          Not sure where to start? Take the free quiz first.
        </p>
        <Link to="/quiz" className="btn-primary">
          Take the AI Readiness Quiz
        </Link>
      </section>
    </div>
  )
}
