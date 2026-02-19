import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import useDocTitle from '../hooks/useDocTitle.js'
import FadeIn from '../components/FadeIn.jsx'
import MethodologyFlow from '../components/MethodologyFlow.jsx'
import MethodologySummary from '../components/MethodologySummary.jsx'

export default function Method() {
  useDocTitle('The Method — Outcome Vine Coding')
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-indigo-50 -z-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-7 h-7 text-indigo-600" />
              <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
                The Method
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              How Outcome Vine Coding works
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              A structured loop that turns your idea into working software — one phase at a time.
              Research what's needed, build the highest-value next step, critique it, then move forward.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Loop */}
      <section className="py-14 lg:py-18 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                The phase loop
              </h2>
              <p className="mt-3 text-slate-500">
                Every phase follows the same seven steps. Press play to see how it works.
              </p>
            </div>
            <MethodologyFlow />
          </FadeIn>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-8">
              What makes it different
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {[
              {
                title: 'Evidence over assumptions',
                text: 'Every phase starts with research. You never build based on guesses — you build based on what real users need.',
              },
              {
                title: 'Always deployable',
                text: 'After every phase, your tool works. You can show it to people, get feedback, and improve. No "big reveal" at the end.',
              },
              {
                title: 'The plan can change',
                text: "The phase queue is a hypothesis, not a contract. If research shows something different is needed, the plan adapts.",
              },
              {
                title: 'Built-in quality checks',
                text: 'Every phase includes a critique step and a confidence score. If the score is too low, you reassess before moving on.',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Summary Download */}
      <MethodologySummary />

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            See it in action
          </h2>
          <p className="mt-3 text-indigo-200 text-lg">
            The Community Grants Hub was built from scratch using this method.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/case-study"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
            >
              Read the Case Study
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/widget"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-colors text-base border border-indigo-400"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
