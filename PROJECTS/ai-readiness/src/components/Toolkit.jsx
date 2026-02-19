import { Link } from 'react-router-dom'

const RESOURCES = [
  {
    title: 'AI Prompt Kit',
    description: '20 practical, copy-paste prompts for community organisations. The crown jewel of the toolkit.',
    path: '/toolkit/prompt-kit',
    icon: '✨',
    tag: 'Most Popular',
  },
  {
    title: 'Safety Checklist',
    description: '8 questions to ask before using any AI tool. Especially important if you handle sensitive data.',
    path: '/toolkit/safety-checklist',
    icon: '🛡️',
    tag: 'Essential',
  },
  {
    title: 'Plain English AI Guide',
    description: 'What is AI? What can it do? What are the limits? A 5-minute read with no jargon.',
    path: '/toolkit/ai-guide',
    icon: '📖',
  },
  {
    title: 'First Steps Guide',
    description: 'A 4-week plan for community organisations ready to start exploring AI safely.',
    path: '/toolkit/first-steps',
    icon: '🚀',
  },
  {
    title: 'Ethics Checklist',
    description: '6 questions to help you decide if a particular AI use is appropriate for your community.',
    path: '/toolkit/ethics-checklist',
    icon: '⚖️',
  },
  {
    title: 'Board Briefing',
    description: 'A one-page overview your CEO can hand to the board. Covers risks, opportunities, and next steps.',
    path: '/toolkit/board-briefing',
    icon: '📋',
  },
]

export default function Toolkit() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
          Free AI Toolkit
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Practical guides, checklists, and prompts designed specifically for
          community organisations. No jargon. No login required. Just useful
          resources you can start using today.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 mb-12">
        {RESOURCES.map((resource) => (
          <Link
            key={resource.path}
            to={resource.path}
            className="card group hover:border-moss-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{resource.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-charcoal group-hover:text-moss-600 transition-colors">
                    {resource.title}
                  </h2>
                  {resource.tag && (
                    <span className="text-xs bg-moss-100 text-moss-700 px-2 py-0.5 rounded-full font-medium">
                      {resource.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-charcoal mb-2">
          ⚠️ Important reminder
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Never put client names, case details, or personal information into any
          AI tool. These resources help you use AI safely, but they are not a
          substitute for specialist advice if your organisation handles sensitive
          data.
        </p>
      </section>

      <section className="text-center">
        <p className="text-gray-500 mb-3">
          Not sure where to start? Take the quiz first.
        </p>
        <Link to="/quiz" className="btn-primary">
          Take the AI Readiness Quiz
        </Link>
      </section>
    </div>
  )
}
