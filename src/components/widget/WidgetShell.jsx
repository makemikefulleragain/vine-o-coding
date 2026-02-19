import { ChevronLeft, ChevronRight } from 'lucide-react'

const STEPS = [
  { label: 'Your Idea', shortLabel: '1' },
  { label: 'Your Users', shortLabel: '2' },
  { label: 'Boundaries', shortLabel: '3' },
  { label: 'First Steps', shortLabel: '4' },
  { label: 'Setup', shortLabel: '5' },
  { label: 'Review', shortLabel: '6' },
]

const STEP_HEADINGS = [
  { title: 'What do you want to build?', subtitle: "Don't worry about technical details. Just describe your idea like you'd explain it to a friend." },
  { title: 'Who exactly will use this?', subtitle: 'Think of one specific person. Give them a name. What\'s their day like when they use your tool?' },
  { title: 'What should this NOT do?', subtitle: 'Every project needs edges. What\'s out of scope? What could go wrong?' },
  { title: 'What should be built first?', subtitle: "You don't have to plan everything. Just the first three steps. The method will help you figure out the rest." },
  { title: 'Where will this live?', subtitle: "Your tool needs a home on the internet. Don't worry — we'll help you set it up." },
  { title: 'Your foundation documents are ready', subtitle: 'These 6 files tell an AI coding assistant everything it needs to know about your project. Review them, then download.' },
]

export default function WidgetShell({ currentStep, onNext, onBack, canNext, children }) {
  const isLastStep = currentStep === STEPS.length - 1
  const isFirstStep = currentStep === 0
  const heading = STEP_HEADINGS[currentStep]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Progress bar — sticky below header */}
      <nav className="sticky top-16 z-40 bg-white pt-4 pb-4 mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-100 shadow-sm">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep
            const isCurrent = i === currentStep
            return (
              <li key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium hidden sm:block ${
                      isCurrent ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-3 ${
                      i < currentStep ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Step heading */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {heading.title}
        </h2>
        <p className="mt-2 text-slate-500 text-base">{heading.subtitle}</p>
      </div>

      {/* Step content */}
      <div className="mb-10">
        {children}
      </div>

      {/* Navigation */}
      {!isLastStep && (
        <div className="flex justify-between items-center pt-6 border-t border-slate-200">
          <button
            onClick={onBack}
            disabled={isFirstStep}
            className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
              isFirstStep
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onNext}
            disabled={!canNext}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-colors ${
              canNext
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
