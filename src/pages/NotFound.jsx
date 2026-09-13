import { Link } from 'react-router-dom'
import useDocTitle from '../hooks/useDocTitle.js'

export default function NotFound() {
  useDocTitle('Page not found')

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          This page is not part of the vine
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          The link may be old, mistyped, or from a draft that moved during a later phase.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/widget"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Building
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:border-indigo-200 hover:text-indigo-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
