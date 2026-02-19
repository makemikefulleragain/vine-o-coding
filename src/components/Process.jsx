import { FileText, Layers, ShieldCheck } from 'lucide-react'
import FadeIn from './FadeIn.jsx'

const steps = [
  {
    icon: FileText,
    title: 'Describe your idea',
    body: 'Walk through 5 short steps. The method turns your answers into a plan you can hand to an AI coding assistant.',
    note: 'Like filling out a form — not writing code.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: Layers,
    title: 'Build one piece at a time',
    body: 'Each step is small. You check it works before moving on. No giant leap of faith.',
    note: 'Like Lego — one piece at a time, instructions included.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Catch problems early',
    body: "Built-in checkpoints spot when something's off. Fix it now, not after everything's built.",
    note: 'Like spell-check, but for your whole project.',
    color: 'bg-emerald-100 text-emerald-600',
  },
]

export default function Process() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Three steps. That's it.
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Describe → Build → Check. Repeat until it's done.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <FadeIn key={i} delay={i * 120}>
                <div
                  className="relative p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  {/* Step number */}
                  <span className="absolute top-6 right-6 text-5xl font-bold text-slate-100 select-none">
                    {i + 1}
                  </span>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${step.color} mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{step.body}</p>

                  {/* Maya analogy */}
                  <p className="text-sm text-slate-400 italic border-t border-slate-100 pt-3">
                    {step.note}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
