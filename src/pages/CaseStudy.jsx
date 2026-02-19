import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import useDocTitle from '../hooks/useDocTitle.js'
import FadeIn from '../components/FadeIn.jsx'
import Timeline from '../components/Timeline.jsx'
import DeepDives from '../components/DeepDives.jsx'

export default function CaseStudy() {
  useDocTitle('Case Study — How the Grants Hub Was Built')
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-indigo-50 -z-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <FadeIn>
            <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-4">
              Case Study
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              How the Community Grants Hub was built with AI
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              A real tool for Australian nonprofit treasurers — built from scratch using
              Outcome Vine Coding. Eight phases. One failure. One recovery. A working tool
              at the end.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://grants-hub.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Visit the live tool
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Deep Dives */}
      <DeepDives />

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to build something?
          </h2>
          <p className="mt-3 text-indigo-200 text-lg">
            Use the widget to generate your foundation documents and start building with AI.
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
              to="/our-story"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-colors text-base border border-indigo-400"
            >
              How This Site Was Built
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
