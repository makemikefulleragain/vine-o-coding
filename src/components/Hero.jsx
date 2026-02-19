import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import FadeIn from './FadeIn.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22 lg:py-28">
        <div className="max-w-3xl">
          <FadeIn>
            {/* Eyebrow */}
            <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-4">
              No coding experience needed
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Turn your idea into a
              <span className="text-indigo-600"> real, working app</span>
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Walk through a few short steps to describe your idea. Get a complete
              plan. Drop it into an AI coding assistant and start building.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/widget"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-base shadow-lg shadow-indigo-200"
              >
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://grants-hub.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-base"
              >
                See a tool built this way
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
