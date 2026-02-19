import { Link } from 'react-router-dom'
import { ArrowRight, Sprout } from 'lucide-react'
import useDocTitle from '../hooks/useDocTitle.js'
import FadeIn from '../components/FadeIn.jsx'

const faqs = [
  {
    q: 'What is Outcome Vine Coding?',
    a: 'A step-by-step method for building real software using AI coding assistants. You walk through a series of short steps describing what you want, the AI builds it, and the method keeps everything on track.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. The method is open — use it, share it, improve it. The website, the widget, and the methodology are all free.',
  },
  {
    q: 'Do I need to know how to code?',
    a: "No. The whole point is that you describe what you need in plain language. The AI handles the code. You handle the decisions.",
  },
  {
    q: 'What AI coding assistants does it work with?',
    a: 'Any AI coding assistant that accepts text prompts — Windsurf, Cursor, GitHub Copilot, or others. The foundation documents you create are universal.',
  },
  {
    q: 'What happens to my data?',
    a: 'Nothing leaves your browser. The widget runs entirely on your device. No data is sent to any server, no cookies are set, nothing is tracked.',
  },
  {
    q: 'Has this actually been used to build something real?',
    a: 'Yes. The Community Grants Hub (grants-hub.netlify.app) was built from scratch using this method. It went through 8 phases, including a failure that the method caught and fixed.',
  },
  {
    q: 'Can I use this for a school project?',
    a: "Absolutely — that's one of the main use cases. The method helps you plan properly before building, which is exactly what teachers want to see.",
  },
  {
    q: 'Who made this?',
    a: 'Kamunity — a small organisation focused on helping communities build the digital tools they actually need.',
  },
]

export default function About() {
  useDocTitle('About')
  return (
    <>
      {/* Hero */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Sprout className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                About
              </h1>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Kamunity */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Kamunity</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Kamunity is a small organisation that believes communities should be able to build
                the digital tools they actually need — without waiting for someone else to build
                them, and without needing a computer science degree.
              </p>
              <p>
                We develop open methods and tools that make technology accessible. Outcome Vine Coding
                is our approach to helping anyone turn an idea into working software using AI coding
                assistants.
              </p>
              <p>
                Learn more at{' '}
                <a
                  href="https://kamunity.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2"
                >
                  kamunity.ai
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <span className="text-slate-400 text-xs shrink-0 group-open:hidden">+</span>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-900">
                Short version: we only collect what you choose to send us.
              </p>
              <p>
                The widget runs entirely in your browser. No cookies are set. No analytics
                are used. No tracking pixels. No third-party scripts that collect information
                about you.
              </p>
              <p>
                When you use the widget to generate your foundation documents, everything stays
                on your device. When you download the ZIP file, it's created in your browser and
                saved directly to your computer. Nothing passes through our servers.
              </p>
              <p>
                The feedback button opens an anonymous form. If you choose to submit feedback,
                your reaction and optional comment are stored by Netlify (our hosting provider).
                No name, email, or identifying information is collected. You can read{' '}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-2"
                >
                  Netlify's privacy policy
                </a>{' '}
                for details on how they handle form submissions.
              </p>
              <p className="font-medium text-slate-900">
                When you use your documents with an AI coding assistant
              </p>
              <p>
                The foundation documents you create here stay on your device. But when you paste them
                into an AI coding assistant (Windsurf, Cursor, GitHub Copilot, or others), your project
                description, user details, and business logic are sent to that provider's servers
                (e.g., OpenAI, Anthropic, Microsoft). This is how AI assistants work — they process
                your input in the cloud. Review your AI provider's privacy policy before sharing
                sensitive project details.
              </p>
              <p>
                If you visit the Community Grants Hub (a separate project), that site has its own
                privacy policy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Terms of Use */}
      <section id="terms" className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Terms of Use</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Outcome Vine Coding is open methodology. You're free to use, share, adapt, and
                build upon it for any purpose.
              </p>
              <p>
                The foundation documents generated by the widget are yours. We don't claim any
                rights over what you create.
              </p>
              <p>
                This tool is provided as-is, without warranty. We do our best to make it helpful
                and accurate, but we can't guarantee that software built using this method will work
                perfectly. You're responsible for reviewing and testing anything you build.
              </p>
              <p>
                The method involves using AI coding assistants. AI can make mistakes. Always review
                generated code and content before publishing or deploying it.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to try it?
            </h2>
            <Link
              to="/widget"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-base shadow-lg shadow-indigo-200"
            >
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
