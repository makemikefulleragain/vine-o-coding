import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sprout, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/method', label: 'Method' },
  { to: '/case-study', label: 'Case Study' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
          <Sprout className="w-7 h-7" />
          <span className="font-bold text-lg tracking-tight">Outcome Vine Coding</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                pathname === link.to
                  ? 'text-indigo-600'
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/widget" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
            Start Building
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/widget" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors">
            Start Building
          </Link>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
