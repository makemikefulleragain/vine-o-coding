import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/board', label: 'Community Board' },
  { to: '/groups', label: 'Find Groups' },
  { to: '/resources', label: 'Resources' },
  { to: '/saved', label: 'My Saved' },
]

function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-earth-light/30 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/yarn.svg" alt="" className="w-8 h-8" />
            <span className="font-heading text-lg text-rose-deep group-hover:text-rose-warm transition-colors">
              Nonna's &amp; Auntie's
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  location.pathname === to
                    ? 'bg-sage-light/40 text-sage-deep font-medium'
                    : 'text-gray-600 hover:bg-cream hover:text-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-cream transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-earth-light/20 bg-white/95 backdrop-blur-sm" aria-label="Mobile navigation">
            <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    location.pathname === to
                      ? 'bg-sage-light/40 text-sage-deep font-medium'
                      : 'text-gray-600 hover:bg-cream hover:text-gray-800'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-earth-light/30 bg-white/50">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p className="font-heading text-base text-earth mb-1">
            Nonna's &amp; Auntie's Knitting Circle
          </p>
          <p>A cozy place for knitters, crocheters, and crafters.</p>
          <p className="mt-2 text-xs text-gray-400">
            Your data stays in your browser. No tracking. No ads. Just yarn and good company.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
