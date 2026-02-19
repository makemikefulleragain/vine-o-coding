import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 leading-tight">
          Is your organisation ready for{' '}
          <span className="text-moss-500">AI</span>?
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          A free, 2-minute self-assessment designed for community organisations,
          NFPs, and neighbourhood centres. No jargon. No data collected. Just
          practical, honest guidance.
        </p>
        <Link to="/quiz" className="btn-primary text-xl px-8 py-4">
          Start the Quiz
        </Link>
        <p className="mt-3 text-sm text-gray-400">
          12 questions &middot; About 2 minutes &middot; Instant results
        </p>
      </section>

      {/* What You Get */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
          What you&apos;ll get
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-charcoal mb-1">
              Your Readiness Map
            </h3>
            <p className="text-gray-600 text-sm">
              A visual snapshot across four dimensions: Understanding, Current
              Use, Safety &amp; Ethics, and Readiness to Act.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-charcoal mb-1">
              Personalised Next Steps
            </h3>
            <p className="text-gray-600 text-sm">
              Specific, actionable recommendations based on where your
              organisation is right now.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-charcoal mb-1">
              Completely Private
            </h3>
            <p className="text-gray-600 text-sm">
              Everything runs in your browser. We don&apos;t collect, store, or
              transmit any of your answers.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🤝</div>
            <h3 className="font-semibold text-charcoal mb-1">
              Built for Community
            </h3>
            <p className="text-gray-600 text-sm">
              Designed specifically for the community sector — not enterprise,
              not government, not tech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-charcoal mb-4 text-center">
          Is this for you?
        </h2>
        <div className="card">
          <p className="text-gray-600 leading-relaxed mb-4">
            This quiz is designed for people like <strong>Priya</strong> —
            operations coordinator at a 12-person NFP. She&apos;s the unofficial
            tech person because she&apos;s the most comfortable with computers.
            Her CEO just asked &ldquo;should we be using AI?&rdquo; and she
            doesn&apos;t know how to answer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            If you work at a community organisation, NFP, neighbourhood centre,
            or volunteer group and you&apos;re wondering where to start with AI
            — this is for you.
          </p>
        </div>
      </section>

      {/* Free Toolkit */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-charcoal mb-4 text-center">
          Free AI Toolkit
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Practical resources you can start using today — no login required.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { icon: '✨', title: 'Prompt Kit', desc: '20 copy-paste prompts', path: '/toolkit/prompt-kit' },
            { icon: '🛡️', title: 'Safety Checklist', desc: '8 essential checks', path: '/toolkit/safety-checklist' },
            { icon: '📖', title: 'AI Guide', desc: 'Plain English, 5 min read', path: '/toolkit/ai-guide' },
            { icon: '🚀', title: 'First Steps', desc: '4-week starter plan', path: '/toolkit/first-steps' },
            { icon: '⚖️', title: 'Ethics Checklist', desc: '6 decision questions', path: '/toolkit/ethics-checklist' },
            { icon: '📋', title: 'Board Briefing', desc: 'One-page template', path: '/toolkit/board-briefing' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="card !p-4 group hover:border-moss-300 hover:shadow-md transition-all duration-200 text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="font-semibold text-charcoal group-hover:text-moss-600 transition-colors text-sm mt-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-center mt-4">
          <Link to="/toolkit" className="text-moss-500 hover:text-moss-600 underline text-sm font-medium">
            View all toolkit resources →
          </Link>
        </p>
      </section>

      {/* Important Note */}
      <section className="mb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-charcoal mb-2">
            ⚠️ Important note
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This quiz is a conversation starter, not a compliance tool. Your AI
            readiness score should never be used by funders as a gate or
            requirement. If your organisation handles sensitive data (family
            violence, health, homelessness, children), please seek specialist
            advice alongside this assessment.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link to="/quiz" className="btn-primary text-xl px-8 py-4">
          Start the Quiz
        </Link>
      </section>
    </div>
  )
}
