import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isQuiz = location.pathname === '/quiz'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-moss-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-moss-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <span className="font-bold text-charcoal group-hover:text-moss-600 transition-colors">
                Kamunity
              </span>
              <span className="text-moss-500 font-medium ml-1 text-sm">
                AI Readiness
              </span>
            </div>
          </Link>
          {!isQuiz && (
            <nav className="flex items-center gap-4 text-sm">
              <Link
                to="/"
                className="text-charcoal hover:text-moss-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/toolkit"
                className="text-charcoal hover:text-moss-600 transition-colors"
              >
                Toolkit
              </Link>
              <Link
                to="/services"
                className="text-charcoal hover:text-moss-600 transition-colors"
              >
                Services
              </Link>
              <Link to="/quiz" className="btn-primary !py-2 !px-4 !text-sm">
                Take the Quiz
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-moss-100 mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>
            A free tool by{' '}
            <a
              href="https://kamunity.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Kamunity
            </a>
            . No data is collected or stored.
          </p>
          <p className="mt-1">
            Companion to{' '}
            <a
              href="https://kamunity-audit.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-moss-500 hover:text-moss-600 underline"
            >
              Kamunity Audit
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Kamunity is a community project, not a certified professional service. This tool is a starting point, not professional advice.
            For legal, financial, health, or safety matters, consult a qualified professional.
          </p>
        </div>
      </footer>
    </div>
  )
}
