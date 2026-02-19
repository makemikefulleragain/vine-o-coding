import { Link } from 'react-router-dom'
import ToolkitLayout from './ToolkitLayout'

export default function FirstSteps() {
  return (
    <ToolkitLayout
      title="First Steps Guide"
      description="A 4-week plan for community organisations ready to start exploring AI. No big commitments — just structured curiosity."
    >
      {/* Week 1 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-10 h-10 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold">
            1
          </span>
          <h2 className="text-2xl font-bold text-charcoal">
            Week 1: Have the Conversation
          </h2>
        </div>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            Before anyone touches an AI tool, your team needs to talk about it.
            Schedule a 30-minute team discussion using these questions:
          </p>
          <ul className="space-y-2 ml-1">
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"Has anyone here used an AI tool like ChatGPT? What was that like?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"What are you curious about? What are you worried about?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"What tasks eat up the most time in your week?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"What information would we NEVER want to put into an AI tool?"</span>
            </li>
          </ul>
          <div className="bg-moss-50 rounded-lg p-4 mt-2">
            <p className="text-sm text-moss-700">
              <strong>Goal:</strong> Everyone has a chance to voice their thoughts.
              No decisions needed yet — just open the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Week 2 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-10 h-10 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold">
            2
          </span>
          <h2 className="text-2xl font-bold text-charcoal">
            Week 2: Try One Thing
          </h2>
        </div>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            Pick <strong>one low-risk task</strong> and try it with an AI tool.
            Here are good first experiments:
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              'Summarise your last team meeting notes',
              'Draft a volunteer thank-you email',
              'Brainstorm 10 ideas for your next event',
              'Rewrite a paragraph of your website in simpler language',
              'Create a social media post about an upcoming activity',
              'Turn rough dot points into a structured paragraph',
            ].map((task, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                {task}
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Remember:</strong> Don't use any client names, case
              details, or personal information. Use our{' '}
              <Link
                to="/toolkit/safety-checklist"
                className="text-moss-600 underline hover:text-moss-700"
              >
                Safety Checklist
              </Link>{' '}
              before you start.
            </p>
          </div>
          <div className="bg-moss-50 rounded-lg p-4">
            <p className="text-sm text-moss-700">
              <strong>Goal:</strong> One person tries one task and notes how it
              went. Use our{' '}
              <Link
                to="/toolkit/prompt-kit"
                className="text-moss-600 underline hover:text-moss-700"
              >
                Prompt Kit
              </Link>{' '}
              for ready-made prompts.
            </p>
          </div>
        </div>
      </section>

      {/* Week 3 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-10 h-10 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold">
            3
          </span>
          <h2 className="text-2xl font-bold text-charcoal">
            Week 3: Talk About What Happened
          </h2>
        </div>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            Share the experiment with your team. Use these reflection prompts:
          </p>
          <ul className="space-y-2 ml-1">
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"What did we try? What was the result?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"Did it save time? How much?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"Was the quality good enough to use? What needed editing?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"Did anything feel uncomfortable or risky?"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500 mt-0.5">→</span>
              <span>"Would we do this again? What else could we try?"</span>
            </li>
          </ul>
          <div className="bg-moss-50 rounded-lg p-4 mt-2">
            <p className="text-sm text-moss-700">
              <strong>Goal:</strong> Honest assessment of what worked and what
              didn't. No pressure to be enthusiastic — scepticism is healthy.
            </p>
          </div>
        </div>
      </section>

      {/* Week 4 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-10 h-10 bg-moss-500 text-white rounded-full flex items-center justify-center font-bold">
            4
          </span>
          <h2 className="text-2xl font-bold text-charcoal">
            Week 4: Decide What's Next
          </h2>
        </div>
        <div className="card space-y-3 text-gray-700 leading-relaxed">
          <p>
            Based on what you've learned, make a simple decision about your next
            step. Pick <strong>one</strong>:
          </p>
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-medium text-green-800 text-sm">
                ✅ "This is useful — let's create basic guidelines and try more tasks"
              </p>
              <p className="text-xs text-green-700 mt-1">
                Next: Draft a one-page AI use policy. Identify 3 more tasks to try next month.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-800 text-sm">
                ⏸️ "Interesting, but we need more information before going further"
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Next: Read our AI Guide. Consider a Kamunity workshop for the team.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-700 text-sm">
                ⏹️ "Not right for us right now — and that's a valid decision"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Next: Revisit in 6 months. The tools will be different and your needs may change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common first projects */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          Common first projects for community orgs
        </h2>
        <div className="card">
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span><strong>Meeting notes system:</strong> Use AI to turn rough notes into structured minutes with action items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span><strong>Newsletter assistant:</strong> Draft newsletter sections, then edit to add your voice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span><strong>Grant language helper:</strong> Turn dot points into well-structured grant report paragraphs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span><strong>Plain language translator:</strong> Rewrite complex policies or documents in simpler language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moss-500">→</span>
              <span><strong>Social media batch:</strong> Generate a week's worth of social media post drafts in 15 minutes</span>
            </li>
          </ul>
        </div>
      </section>

      {/* What NOT to do */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          What NOT to do first
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <ul className="space-y-2 text-red-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-bold">✗</span>
              <span>Don't start with anything involving client or personal data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✗</span>
              <span>Don't buy AI software or subscriptions before trying free tools</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✗</span>
              <span>Don't ask AI to make decisions about people's services or support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✗</span>
              <span>Don't publish AI-generated content without a human reviewing it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✗</span>
              <span>Don't expect AI to replace any staff member's job — it's a tool, not a replacement</span>
            </li>
          </ul>
        </div>
      </section>
    </ToolkitLayout>
  )
}
