import { Link } from 'react-router-dom'
import { ExternalLink, CheckCircle, AlertTriangle, Zap, ArrowRight } from 'lucide-react'
import FadeIn from './FadeIn.jsx'

export default function Proof() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            {/* Section header */}
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              It's already been used to build a real tool
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              The Community Grants Hub — a tool for Australian nonprofits — was built
              from scratch with this method. AI did the coding. A human made the decisions.
            </p>
          </div>
        </FadeIn>

        {/* Stats / highlights */}
        <FadeIn delay={150}>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200">
            <Zap className="w-8 h-8 text-indigo-500 mb-3" />
            <span className="text-2xl font-bold text-slate-900">8 phases</span>
            <span className="text-sm text-slate-500 mt-1">of development</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200">
            <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
            <span className="text-2xl font-bold text-slate-900">1 failure</span>
            <span className="text-sm text-slate-500 mt-1 text-center">caught and fixed by the method</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200">
            <CheckCircle className="w-8 h-8 text-emerald-500 mb-3" />
            <span className="text-2xl font-bold text-slate-900">Live now</span>
            <span className="text-sm text-slate-500 mt-1">deployed and working</span>
          </div>
        </div>
        </FadeIn>

        {/* Story */}
        <FadeIn delay={300}>
        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-slate-600 leading-relaxed text-center">
            Things went wrong in Phase 2 — and the method caught it. The safety checkpoints
            spotted the problem, guided the fix, and the project came out stronger.
          </p>
        </div>
        </FadeIn>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://grants-hub.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-base shadow-lg shadow-indigo-200"
          >
            Visit the Community Grants Hub
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            to="/case-study"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-base"
          >
            See the full story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400 text-center">
          Built with Windsurf (an AI coding assistant) using Outcome Vine Coding.
        </p>
      </div>
    </section>
  )
}
