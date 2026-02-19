import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Sprout className="w-5 h-5" />
            <span className="text-sm">
              Made by{' '}
              <a
                href="https://kamunity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Kamunity
              </a>
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-400">
            <Link to="/about" className="hover:text-slate-600 transition-colors">About</Link>
            <Link to="/about#privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link to="/about#terms" className="hover:text-slate-600 transition-colors">Terms</Link>
          </nav>
        </div>
        <p className="text-xs text-slate-400 text-center mt-6">
          Outcome Vine Coding is open methodology — use it, share it, improve it.
        </p>
      </div>
    </footer>
  )
}
