import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, CheckCircle, Loader } from 'lucide-react'
import useDocTitle from '../hooks/useDocTitle.js'
import FadeIn from '../components/FadeIn.jsx'
import { vinePhases } from '../lib/vineTimelineData.js'

export default function OurStory() {
  useDocTitle('Our Story — How This Site Was Built')
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-emerald-50 -z-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Sprout className="w-7 h-7 text-emerald-600" />
              <p className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">
                Our Story
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              How this site was built
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              This website — vine-o-coding.netlify.app — was built using the exact same
              Outcome Vine Coding methodology it teaches. Every page you see went through the
              same loop. This is a live, ongoing case study.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Live case study callout */}
      <section className="pb-4 sm:pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5">
              <p className="text-sm text-emerald-800 leading-relaxed">
                <strong>You're reading a live case study.</strong> Each phase below was driven by
                real user feedback — including yours. If you used the feedback button, your input
                may have shaped a phase you're reading about right now.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-emerald-200" />

            <div className="space-y-6">
              {vinePhases.map((phase) => (
                <FadeIn key={phase.id} delay={phase.id * 60}>
                  <div className="flex gap-4">
                    {/* Node */}
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        phase.status === 'current'
                          ? 'border-emerald-400 bg-emerald-100'
                          : 'border-emerald-300 bg-white'
                      }`}>
                        {phase.status === 'current' ? (
                          <Loader className="w-4 h-4 text-emerald-600 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                          Phase {phase.id}
                        </span>
                        <h3 className="font-bold text-slate-900">{phase.title}</h3>
                        {phase.score && (
                          <span className="text-xs text-slate-400 font-medium">{phase.score}/100</span>
                        )}
                        {phase.status === 'current' && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                            In progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{phase.outcome}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={500}>
            <div className="mt-8 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800">This is an ongoing story.</strong> Each phase is driven by real
                user feedback — including yours. If you used the feedback button, your input may shape the next phase.
                The full phase documents (research, triage, spec, build logs, critiques) are available in the project repository.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to build your own?
          </h2>
          <p className="mt-3 text-indigo-200 text-lg">
            Use the same method to build something for your community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/widget"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/method"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-colors text-base border border-indigo-400"
            >
              Learn the Method
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
