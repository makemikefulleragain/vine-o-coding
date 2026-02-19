import { Link } from 'react-router-dom'

export default function ToolkitLayout({ title, description, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <nav className="mb-6 text-sm">
        <Link to="/toolkit" className="text-moss-500 hover:text-moss-600 underline">
          ← Back to Toolkit
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        )}
      </header>

      <article className="prose-custom">{children}</article>

      <footer className="mt-12 pt-8 border-t border-moss-100">
        <div className="bg-moss-50 border border-moss-200 rounded-xl p-5 text-center">
          <p className="text-moss-700 font-medium mb-3">
            Want to know where your organisation stands?
          </p>
          <Link to="/quiz" className="btn-primary !text-base">
            Take the AI Readiness Quiz
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            12 questions &middot; 2 minutes &middot; Free
          </p>
        </div>
      </footer>
    </div>
  )
}
