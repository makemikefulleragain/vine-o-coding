import { Lightbulb, Target, AlertTriangle, Users, ExternalLink } from 'lucide-react'

const dives = [
  {
    icon: Lightbulb,
    title: 'Phases are hypotheses',
    maya: "You don't have to get it right the first time. Each step is a guess you test.",
    lesson: 'The plan evolves as evidence accumulates. Phase 2 failing meant Phase 2 revealed something important — and the methodology adapted.',
    links: [
      { label: 'The Lean Startup — Eric Ries', url: 'https://theleanstartup.com/' },
      { label: 'Build-Measure-Learn (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Lean_startup#Build%E2%80%93measure%E2%80%93learn' },
    ],
    brian: [
      { type: 'paragraph', text: 'In Lean Startup methodology, every plan is a hypothesis to be validated through a build-measure-learn cycle. Outcome Vine Coding applies this directly: each phase is a guess about what to build next, tested by building it and seeing if it works.' },
      { type: 'heading', text: 'When the plan breaks — and that\'s fine' },
      { type: 'paragraph', text: 'The grants-hub planned 5 phases but actually went through 8 — including a Phase 2 failure and full architectural rebuild. The PHASE_QUEUE.md document is explicitly labeled "a hypothesis" that the engine can and should modify based on research.' },
      { type: 'pullquote', text: 'In a fixed plan, Phase 2 failing means the project is behind schedule. In Outcome Vine Coding, Phase 2 failing means Phase 2 revealed something important.' },
      { type: 'paragraph', text: 'This is fundamentally different from a traditional project plan. The key mechanism: after every phase, the engine writes NEXT_PHASE.md proposing what comes next, and updates the queue with reasoning.' },
    ],
  },
  {
    icon: Target,
    title: 'Confidence scoring',
    maya: "A simple checklist that tells you if you're ready to build, or if you should think more.",
    lesson: 'Four dimensions, scored out of 100. It makes your confidence explicit and auditable — but it\'s not a guarantee.',
    links: [
      { label: 'Decision Matrix Analysis (MindTools)', url: 'https://www.mindtools.com/a4woam1/decision-matrix-analysis' },
      { label: 'Pre-mortem technique (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pre-mortem' },
    ],
    brian: [
      { type: 'heading', text: 'The four dimensions' },
      { type: 'paragraph', text: 'Every phase is scored on 4 dimensions, each worth 25 points: Research Signal (is there evidence this is needed?), Source Convergence (do multiple signals agree?), Constitutional Alignment (does this serve real users?), and Build Confidence (can this be built reliably?).' },
      { type: 'paragraph', text: 'The routing is simple: 80+ means build. 60-79 means build with review flags. Below 60 means reassess — maybe this phase isn\'t right.' },
      { type: 'heading', text: 'When 85/100 still fails' },
      { type: 'paragraph', text: 'The grants-hub Phase 2 scored 85/100 and still failed. The confidence scoring evaluated code quality and feature design but missed infrastructure reliability. The Babel-in-browser timing bug wasn\'t a code problem — it was a delivery infrastructure problem.' },
      { type: 'pullquote', text: 'Confidence scoring catches design and research problems but can miss architectural risk. The scoring isn\'t a guarantee — it\'s a structured way to check your assumptions.' },
      { type: 'paragraph', text: 'The Phase 2 Review & Reflect added "Build Confidence" as a dimension that explicitly includes delivery infrastructure, not just code quality.' },
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Review & Reflect (The Andon cord)',
    maya: "When something goes wrong, you stop, figure out what happened, and fix the real problem — not just the symptom.",
    lesson: 'Stop early, find the root cause, fix it before it compounds. The process improvement was more valuable than the bug fix.',
    links: [
      { label: 'Andon cord (Toyota Production System)', url: 'https://en.wikipedia.org/wiki/Andon_(manufacturing)' },
      { label: 'Five Whys — root cause analysis', url: 'https://en.wikipedia.org/wiki/Five_whys' },
    ],
    brian: [
      { type: 'paragraph', text: 'In Toyota\'s production system, any worker can pull the "Andon cord" to stop the entire assembly line when they spot a defect. The principle: stop early, find the root cause, fix it before it compounds.' },
      { type: 'heading', text: 'How R&R triggers' },
      { type: 'paragraph', text: 'Outcome Vine Coding\'s equivalent is Review & Reflect (R&R). It triggers automatically when: a bug takes more than 2 attempts to fix, a phase fails user acceptance testing, or an architectural assumption is proven wrong.' },
      { type: 'heading', text: 'The grants-hub Phase 2 example' },
      { type: 'paragraph', text: 'After 7+ attempts to fix the Babel timing bug, R&R was triggered. The analysis revealed the root cause wasn\'t the code — it was the CDN + Babel-in-browser architecture that made the entire system untestable.' },
      { type: 'pullquote', text: 'The R&R didn\'t just fix the bug. It changed the architecture, amended the constitution, inserted new phases, and established automated testing. The process improvement was more valuable than the bug fix.' },
      { type: 'paragraph', text: 'R&R creates an "irony log" noting that Babel standalone — an in-browser JavaScript compiler — failed due to a "Tower of Babel" of CDN dependencies. Humor in documentation signals intellectual honesty.' },
    ],
  },
  {
    icon: Users,
    title: 'Human-AI collaboration',
    maya: "The AI builds. You decide. The documents are your way of telling the AI what you need.",
    lesson: 'The human owns the outcome. The AI owns the implementation. The foundation documents are the contract between them.',
    links: [
      { label: 'Human-in-the-loop AI (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Human-in-the-loop' },
      { label: 'Pair programming (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pair_programming' },
    ],
    brian: [
      { type: 'paragraph', text: 'The AI reads CONSTITUTION.md to understand principles. It reads MISSION.md to understand purpose. It reads PHASE_QUEUE.md to understand priorities. Then it researches, designs, builds, and critiques — all within the boundaries the human defined.' },
      { type: 'heading', text: 'What stays human' },
      { type: 'paragraph', text: 'Critical human actions remain human: deploying the site, running database migrations, reviewing content for accuracy, setting up accounts and credentials. These are documented in HUMAN_ACTION.md files so nothing is assumed.' },
      { type: 'pullquote', text: 'The kill switch (STOP.md) gives the human ultimate control. If the AI is going in the wrong direction, create STOP.md and it halts immediately. Sovereignty by design.' },
      { type: 'heading', text: 'How it played out' },
      { type: 'paragraph', text: 'The grants-hub demonstrated this model over 8 phases: the AI proposed, the human verified. When Phase 2 failed UAT, the human triggered R&R. When Phase 5.5 needed outreach, the human handled the community engagement. The AI never acts without the human\'s ability to review and redirect.' },
    ],
  },
]

function RichBlock({ block }) {
  if (block.type === 'heading') {
    return (
      <h4 className="text-sm font-bold text-slate-800 mt-4 mb-1">
        {block.text}
      </h4>
    )
  }
  if (block.type === 'pullquote') {
    return (
      <blockquote className="my-4 pl-4 border-l-4 border-indigo-300 bg-indigo-50/50 rounded-r-lg py-3 pr-4">
        <p className="text-sm text-indigo-900 leading-relaxed italic">
          {block.text}
        </p>
      </blockquote>
    )
  }
  return (
    <p className="text-sm text-slate-600 leading-relaxed">
      {block.text}
    </p>
  )
}

export default function DeepDives() {
  return (
    <section className="py-14 sm:py-18 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Why this works
        </h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          The method is built on tested ideas from Lean, Agile, and safety engineering.
        </p>

        <div className="space-y-6">
          {dives.map((dive, i) => {
            const Icon = dive.icon
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Always visible: icon, title, maya, lesson, links */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-lg">{dive.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{dive.maya}</p>
                    </div>
                  </div>

                  {/* Key lesson — always visible */}
                  <div className="mt-4 pl-0 sm:pl-14">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Key lesson</p>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">{dive.lesson}</p>
                    </div>
                  </div>

                  {/* Further reading — always visible */}
                  {dive.links && dive.links.length > 0 && (
                    <div className="mt-3 pl-0 sm:pl-14">
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide self-center">Further reading</span>
                        {dive.links.map((link, k) => (
                          <a
                            key={k}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Expandable: full analysis (magazine-style) */}
                <details className="group">
                  <summary className="flex items-center justify-between px-5 sm:px-6 py-3 cursor-pointer select-none list-none bg-slate-50 border-t border-slate-100 hover:bg-slate-100 transition-colors">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      Read the full analysis
                    </span>
                    <span className="text-xs text-slate-400 group-open:hidden">▼</span>
                    <span className="text-xs text-slate-400 hidden group-open:inline">▲</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-slate-100">
                    <div className="pl-0 sm:pl-14 space-y-2">
                      {dive.brian.map((block, j) => (
                        <RichBlock key={j} block={block} />
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
