import ToolkitLayout from './ToolkitLayout'
import CopyButton from './CopyButton'

const BRIEFING_TEXT = `AI BRIEFING FOR THE BOARD
[Organisation Name] — [Date]

WHAT IS AI?
AI tools like ChatGPT can draft text, summarise documents, brainstorm ideas, and answer questions. They work by predicting likely text based on patterns in training data. They are tools — useful but imperfect.

WHAT OUR STAFF ARE DOING WITH AI
[Choose one:]
- Our staff are not currently using AI tools in their work.
- Some staff may be using AI tools informally. We are exploring how to manage this.
- We have begun structured experimentation with AI for [specific tasks].

THREE RISKS THE BOARD SHOULD KNOW ABOUT
1. Data Privacy: Staff could inadvertently enter client information, case notes, or personal data into AI tools, which send inputs to external servers.
2. Accuracy: AI tools confidently produce incorrect information. Without review processes, inaccurate content could be published or used in decision-making.
3. Unmanaged Use: Staff may already be using AI tools without organisational awareness, guidelines, or oversight.

THREE OPPORTUNITIES WORTH EXPLORING
1. Administrative Efficiency: AI can assist with meeting notes, grant reporting drafts, and communications — potentially saving hours per week.
2. Accessibility: AI can rewrite complex documents in plain language, create FAQs, and help with translations.
3. Strategic Positioning: Understanding AI readiness positions us to make informed decisions as the technology evolves, rather than reacting to change.

WHAT WE RECOMMEND AS NEXT STEPS
1. Establish a basic AI use policy — even a one-page document covering what's OK and what's not.
2. Run our team through the Kamunity AI Readiness Quiz to establish a baseline.
3. Trial AI tools for 2-3 low-risk administrative tasks over the next quarter.

QUESTIONS FOR DISCUSSION
- Are we comfortable with the current level of AI use (or non-use) in our organisation?
- Do we need a formal AI policy, or are guidelines sufficient for now?
- Should we allocate any resources (time, not necessarily money) to AI exploration?
- Are there specific risks related to our client group that we need to address?`

export default function BoardBriefing() {
  return (
    <ToolkitLayout
      title="Board Briefing"
      description="A one-page overview your CEO can hand to the board chair. Customise the parts in [brackets] and you're ready to go."
    >
      <div className="bg-moss-50 border border-moss-200 rounded-xl p-5 mb-8">
        <p className="text-moss-700 text-sm leading-relaxed">
          <strong>How to use this:</strong> Copy the template below, replace the
          parts in [brackets] with your organisation's details, and share it
          with your board. It's designed to fit on one page when printed.
        </p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-charcoal">Board Briefing Template</h2>
          <CopyButton text={BRIEFING_TEXT} />
        </div>

        <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {BRIEFING_TEXT}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-charcoal mb-3">
          Tips for presenting to the board
        </h2>
        <div className="card">
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span>
                <strong>Keep it brief.</strong> Board members are time-poor. The template
                is designed for a 5-minute discussion item, not a 30-minute presentation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span>
                <strong>Lead with risks.</strong> Boards think in terms of risk and
                governance. Leading with "here's what could go wrong" gets their
                attention. Then follow with opportunities.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span>
                <strong>Be honest about what you don't know.</strong> "We're early in
                understanding this" is a strength, not a weakness. It shows you're
                being proactive.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span>
                <strong>Avoid the hype.</strong> Don't promise AI will
                revolutionise your org. Promise that you'll explore it carefully
                and report back.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span>
                <strong>Share the quiz.</strong> Suggest board members take the{' '}
                <a href="/quiz" className="text-moss-600 underline">
                  AI Readiness Quiz
                </a>{' '}
                themselves — it takes 2 minutes and gives them context.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-charcoal mb-2">
          📎 Want more governance resources?
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
            </a>
          </li>
          <li>
            → Our{' '}
            <a
              href="/toolkit/ethics-checklist"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Ethics Checklist
            </a>{' '}
            — for evaluating specific AI use cases
          </li>
          <li>
            → Our{' '}
            <a
              href="/toolkit/safety-checklist"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Safety Checklist
            </a>{' '}
            — practical guardrails for staff
          </li>
        </ul>
      </div>
    </ToolkitLayout>
  )
}
