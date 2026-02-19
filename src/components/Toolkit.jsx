import { Monitor, Globe, FileDown } from 'lucide-react'
import FadeIn from './FadeIn.jsx'

const tools = [
  {
    icon: FileDown,
    title: 'This site',
    desc: "Use the widget to describe your idea. You'll get a set of foundation documents \u2014 the plan your AI assistant needs to start building.",
    note: 'Free. No sign-up.',
  },
  {
    icon: Monitor,
    title: 'An AI coding assistant',
    desc: "Open the documents in an AI-enabled IDE. The assistant reads your plan and writes the code. You review and guide it.",
    note: 'Windsurf, Cursor, or GitHub Copilot.',
    privacy: 'Your project details are processed by the AI provider (e.g., OpenAI, Anthropic). Avoid including sensitive personal data.',
    links: [
      { label: 'Windsurf', url: 'https://windsurf.com' },
      { label: 'Cursor', url: 'https://cursor.com' },
      { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
    ],
  },
  {
    icon: Globe,
    title: 'Somewhere to host it',
    desc: "When your app is built, you'll need a place to put it online. Most have a free tier that's more than enough to start.",
    note: 'Netlify, Vercel, or GitHub Pages.',
    links: [
      { label: 'Netlify', url: 'https://www.netlify.com' },
      { label: 'Vercel', url: 'https://vercel.com' },
      { label: 'GitHub Pages', url: 'https://pages.github.com' },
    ],
  },
]

export default function Toolkit() {
  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What you'll need
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              This site gives you the plan. You'll need a couple of free tools to
              turn that plan into a working app.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 h-full flex flex-col">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-1">{tool.desc}</p>
                  <p className="text-xs text-slate-400 italic">{tool.note}</p>
                  {tool.privacy && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-2 border border-amber-200">
                      {tool.privacy}
                    </p>
                  )}
                  {tool.links && (
                    <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-200">
                      {tool.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
