import ToolkitLayout from './ToolkitLayout'

const ETHICS_QUESTIONS = [
  {
    id: 1,
    question: 'Who benefits from this AI use? Who might be harmed?',
    guidance: 'Think beyond efficiency. If using AI saves your admin team 2 hours a week, that\'s a benefit. But if it means less personal contact with community members, that could be a harm. Consider the full picture.',
    greenFlag: 'Benefits are clear and harms are minimal or mitigable.',
    redFlag: 'Benefits mainly accrue to the organisation while risks fall on the people you serve.',
  },
  {
    id: 2,
    question: 'Does this replace human judgment in a high-stakes decision?',
    guidance: 'AI should support decisions, not make them — especially when those decisions affect people\'s access to services, safety, or wellbeing. A human must always be in the loop for important decisions.',
    greenFlag: 'AI is helping draft, summarise, or brainstorm — a human makes the final call.',
    redFlag: 'AI output is being used directly to determine eligibility, prioritise clients, or allocate resources.',
  },
  {
    id: 3,
    question: 'Could this create or reinforce bias against the communities we serve?',
    guidance: 'AI tools are trained on data that reflects existing societal biases. They can produce content that stereotypes cultural groups, underrepresents First Nations perspectives, or assumes a Western, middle-class default.',
    greenFlag: 'You\'re reviewing AI output specifically for cultural sensitivity and bias.',
    redFlag: 'AI-generated content about communities is being used without review by someone from that community.',
  },
  {
    id: 4,
    question: 'Are we transparent about our AI use with staff, clients, and community?',
    guidance: 'People have a right to know when AI is involved in creating content or supporting decisions that affect them. Transparency builds trust. Secrecy erodes it.',
    greenFlag: 'Your team knows when AI is being used and you\'d be comfortable telling clients.',
    redFlag: 'AI use is hidden or would cause concern if discovered.',
  },
  {
    id: 5,
    question: 'Does this respect cultural protocols and data sovereignty?',
    guidance: 'Aboriginal and Torres Strait Islander data sovereignty means First Nations peoples have the right to govern the collection, ownership, and application of data about their communities. AI tools that process information about First Nations communities must respect this.',
    greenFlag: 'You\'ve consulted with relevant community members or advisors about this use.',
    redFlag: 'You\'re using AI to process, analyse, or generate content about First Nations communities without consultation.',
  },
  {
    id: 6,
    question: 'Would we be comfortable explaining this use to our community?',
    guidance: 'This is the "front page test" for community organisations. If a community member, funder, or journalist asked "why are you using AI for this?", would you have a clear, confident answer?',
    greenFlag: 'You can explain the benefit clearly and address concerns honestly.',
    redFlag: 'You\'d feel defensive or uncomfortable explaining this use.',
  },
]

export default function EthicsChecklist() {
  return (
    <ToolkitLayout
      title="Ethics Checklist"
      description="6 questions to help your team decide if a particular AI use is appropriate for your community. Use this before starting any new AI project or task."
    >
      <div className="bg-moss-50 border border-moss-200 rounded-xl p-5 mb-8">
        <p className="text-moss-700 text-sm leading-relaxed">
          <strong>How to use this:</strong> Go through these questions as a team
          before adopting a new AI use case. If you hit multiple red flags, pause
          and seek advice. If everything is green, proceed with confidence — but
          check back in a month to see if anything has changed.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {ETHICS_QUESTIONS.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {item.id}
              </span>
              <h3 className="font-semibold text-charcoal text-lg leading-snug">
                {item.question}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3 ml-11">
              {item.guidance}
            </p>
            <div className="grid gap-2 md:grid-cols-2 ml-11">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-700 mb-1">
                  ✅ Green flag
                </p>
                <p className="text-sm text-green-800">{item.greenFlag}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-700 mb-1">
                  🚩 Red flag
                </p>
                <p className="text-sm text-red-800">{item.redFlag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-charcoal mb-2">
          ⚠️ When to stop and seek advice
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>→ You hit 2 or more red flags</li>
          <li>→ The AI use involves vulnerable populations in any way</li>
          <li>→ You're unsure about cultural implications</li>
          <li>→ The use case is new and no one in your sector has tried it</li>
          <li>→ A team member has a strong concern they can't fully articulate</li>
        </ul>
        <p className="text-sm text-gray-700 mt-3">
          Trust your instincts. If something feels wrong, it's worth pausing to
          understand why. Contact your peak body, a trusted advisor, or{' '}
          <a
            href="https://kamunity.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-moss-600 underline hover:text-moss-700"
          >
            Kamunity
          </a>{' '}
          for a conversation.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-charcoal mb-2">
          📎 Further reading
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            →{' '}
            <a
              href="https://www.industry.gov.au/publications/voluntary-ai-safety-standard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Australia's Voluntary AI Safety Standard
            </a>{' '}
            — includes Indigenous Data Sovereignty principles
          </li>
          <li>
            →{' '}
            <a
              href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              OAIC Guidance on Privacy and AI
            </a>
          </li>
        </ul>
      </div>
    </ToolkitLayout>
  )
}
