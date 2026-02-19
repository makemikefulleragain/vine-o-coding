import ToolkitLayout from './ToolkitLayout'

const CHECKLIST_ITEMS = [
  {
    id: 1,
    question: 'Is this information safe to share with an external service?',
    detail: 'AI tools like ChatGPT send your input to external servers. Ask yourself: would I be comfortable emailing this to a stranger? If not, don\'t put it into an AI tool.',
    examples: ['Client names or case notes', 'Medical or health information', 'Financial details of individuals', 'Details about family violence situations', 'Children\'s information or records'],
  },
  {
    id: 2,
    question: 'Have I removed all client names, case numbers, and personal details?',
    detail: 'Before pasting anything into an AI tool, strip out all identifying information. Use generic descriptions like "a client" or "Person A" instead.',
    examples: null,
  },
  {
    id: 3,
    question: 'Could this output be wrong? How would I check?',
    detail: 'AI tools confidently produce incorrect information. Always verify facts, statistics, legal references, and specific claims. Never use AI output as your sole source for important decisions.',
    examples: null,
  },
  {
    id: 4,
    question: 'Am I using a tool that stores my inputs? Do I understand their data policy?',
    detail: 'Some AI tools use your inputs to train future models. Check the tool\'s privacy settings. In ChatGPT, you can opt out of data training in Settings → Data Controls.',
    examples: null,
  },
  {
    id: 5,
    question: 'Would I be comfortable if the people we serve knew we used AI for this?',
    detail: 'Transparency builds trust. If you\'d feel uneasy explaining your AI use to clients or community members, that\'s a signal to reconsider.',
    examples: null,
  },
  {
    id: 6,
    question: 'Have I told my manager or team that I\'m using AI for this task?',
    detail: 'AI use should be visible, not hidden. Even if your org doesn\'t have a formal policy yet, keeping AI use transparent helps the whole team learn and stay safe.',
    examples: null,
  },
  {
    id: 7,
    question: 'Is there a policy or guideline I should check first?',
    detail: 'Your organisation may have policies about technology use, data handling, or communications that apply to AI tools. Your funder may also have requirements. Check before you start.',
    examples: null,
  },
  {
    id: 8,
    question: 'If this involves vulnerable people, have I sought specialist advice?',
    detail: 'If your work involves family violence, child protection, mental health, homelessness, disability, or Aboriginal and Torres Strait Islander communities, get specialist guidance before using AI in any way connected to that work.',
    examples: null,
  },
]

export default function SafetyChecklist() {
  return (
    <ToolkitLayout
      title="AI Safety Checklist"
      description="8 questions to ask before using any AI tool. Print this out, stick it on the wall, and check it every time."
    >
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-8">
        <h3 className="font-bold text-red-800 mb-2 text-lg">
          🚨 The Golden Rule
        </h3>
        <p className="text-red-700 font-medium text-lg">
          Never put client names, case details, or personal information into any
          AI tool. Ever.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {CHECKLIST_ITEMS.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {item.id}
              </span>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.detail}
                </p>
                {item.examples && (
                  <div className="mt-2 bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800 mb-1">
                      Never put these into AI tools:
                    </p>
                    <ul className="text-sm text-red-700 space-y-0.5">
                      {item.examples.map((ex, i) => (
                        <li key={i}>→ {ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-charcoal mb-2">
          ⚠️ Working with vulnerable populations?
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          If your organisation works with people experiencing family violence,
          homelessness, mental health challenges, disability, or other
          vulnerabilities, this checklist is your minimum starting point — not
          your complete safety framework. Please seek specialist advice from
          your peak body or a qualified consultant before integrating AI into
          any part of your service delivery.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-charcoal mb-2">
          📎 Want to learn more?
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            →{' '}
            <a
              href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              OAIC Guidance on Privacy and AI
            </a>{' '}
            — Australian privacy regulator's guidance
          </li>
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
            — 10 guardrails for responsible AI use
          </li>
        </ul>
      </div>
    </ToolkitLayout>
  )
}
