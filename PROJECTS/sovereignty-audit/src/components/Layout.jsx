import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactModal from './ContactModal';
import FeedbackWidget from './FeedbackWidget';

const navLinks = [
  { to: '/audit', label: 'Free Audit' },
  { to: '/toolkit', label: 'Toolkit' },
  { to: '/services', label: 'Services' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 bg-gradient-to-br from-ku-teal to-ku-teal-dark rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-ku-navy font-bold text-base leading-tight">Kamunity</span>
              <span className="text-[10px] text-gray-400 leading-tight tracking-wide">Digital Sovereignty</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium px-3 py-1.5 rounded-lg no-underline transition-colors ${
                  location.pathname === link.to || location.pathname.startsWith(link.to + '/')
                    ? 'text-ku-teal bg-ku-teal-light/60'
                    : 'text-gray-600 hover:text-ku-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setContactOpen(true)}
              className="text-sm font-medium px-3 py-1.5 rounded-lg text-gray-600 hover:text-ku-navy hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Talk to Us
            </button>
            <Link
              to="/audit"
              className="text-sm font-semibold text-white bg-ku-teal hover:bg-ku-teal-dark px-4 py-2 rounded-xl no-underline transition-colors ml-2 shadow-sm"
            >
              Start Audit
            </Link>
          </nav>

          {/* Mobile: audit button + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/audit"
              className="text-xs font-semibold text-white bg-ku-teal hover:bg-ku-teal-dark px-3 py-1.5 rounded-lg no-underline transition-colors"
            >
              Audit
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5 text-ku-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-ku-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg no-underline transition-colors ${
                    location.pathname === link.to
                      ? 'text-ku-teal bg-ku-teal-light/60'
                      : 'text-gray-600 hover:text-ku-navy hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setContactOpen(true); closeMenu(); }}
                className="text-sm font-medium px-3 py-2.5 rounded-lg text-gray-600 hover:text-ku-navy hover:bg-gray-50 transition-colors text-left cursor-pointer"
              >
                Talk to Kamunity
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Feedback widget */}
      <FeedbackWidget />

      {/* Contact consent modal */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

      <footer className="bg-ku-navy text-white mt-auto print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold text-white/90 text-sm mb-3">Tool</p>
              <ul className="space-y-2">
                <li><Link to="/audit" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Free Audit</Link></li>
                <li><Link to="/toolkit" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Toolkit</Link></li>
                <li><Link to="/faq" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">FAQ</Link></li>
                <li><Link to="/insights" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Insights</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white/90 text-sm mb-3">Company</p>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">About</Link></li>
                <li><Link to="/services" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Services</Link></li>
                <li><Link to="/privacy" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white/90 text-sm mb-3">Ecosystem</p>
              <ul className="space-y-2">
                <li><a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">kamunity.ai</a></li>
                <li><a href="https://kamunity.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">kamunity.org</a></li>
                <li><a href="https://kamunityconsulting.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-ku-teal-light no-underline transition-colors">kamunityconsulting.com</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white/90 text-sm mb-3">Privacy</p>
              <p className="flex items-center gap-1.5 text-sm text-white/60">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                No data collected
              </p>
              <p className="text-xs text-white/40 mt-2 leading-relaxed">No tracking. No cookies. Everything stays on your device.</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              Built by <a href="https://kamunityconsulting.com" target="_blank" rel="noopener noreferrer" className="text-ku-teal-light hover:text-white no-underline transition-colors">Kamunity Consulting</a>, digital sovereignty for community organisations.
            </p>
            <p className="text-xs text-white/30">Perth, Western Australia · 2026</p>
          </div>
          {/* G4 — Honest disclaimer */}
          <p className="text-xs text-white/30 text-center mt-4 pt-4 border-t border-white/10 print:hidden">
            Free tool by a community project, not a certified professional service. Results are a starting point — consult a qualified professional for legal, financial, health, or safety matters.
          </p>
        </div>
      </footer>
    </div>
  );
}
