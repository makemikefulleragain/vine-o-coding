import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const REACTIONS = [
  { emoji: '❤️', label: 'Love it', value: 'love' },
  { emoji: '🤔', label: 'Confused', value: 'confused' },
  { emoji: '💡', label: 'Idea', value: 'idea' },
  { emoji: '🐛', label: 'Bug', value: 'bug' },
]

const PAGE_NAMES = {
  '/': 'Landing page',
  '/widget': 'Build-it widget',
  '/method': 'The Method',
  '/case-study': 'Case study',
  '/our-story': 'Our Story',
  '/about': 'About page',
}

const encode = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

export default function FeedbackWidget({ onClose }) {
  const { pathname } = useLocation()
  const pageName = PAGE_NAMES[pathname] || pathname
  const [reaction, setReaction] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reaction) return

    setStatus('sending')
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'feedback',
        page: pageName,
        reaction,
        message: message || '(no comment)',
      }),
    })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }

  if (status === 'success') {
    return (
      <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center">
        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
        <p className="font-semibold text-slate-900">Thanks for the feedback!</p>
        <p className="text-sm text-slate-500 mt-1">It helps us make this better.</p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Close
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <p className="font-semibold text-slate-900">Something went wrong</p>
        <p className="text-sm text-slate-500 mt-1">
          You can email us directly at{' '}
          <a href="mailto:mike@kamunityconsulting.com" className="text-indigo-600 underline">
            mike@kamunityconsulting.com
          </a>
        </p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <p className="font-semibold text-slate-900 text-sm">Quick feedback</p>
          <p className="text-xs text-slate-400 mt-0.5">
            About: <span className="font-medium text-slate-600">{pageName}</span>
          </p>
        </div>

        {/* Reaction picker */}
        <div className="px-5 pb-4">
          <p className="text-xs text-slate-500 mb-2">How does this page feel?</p>
          <div className="grid grid-cols-4 gap-2">
            {REACTIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setReaction(r.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all text-center ${
                  reaction === r.value
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="text-xl">{r.emoji}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional message */}
        <div className="px-5 pb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything else? (optional)"
            rows={2}
            maxLength={500}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="px-5 pb-5">
          <button
            type="submit"
            disabled={!reaction || status === 'sending'}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              reaction
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            {status === 'sending' ? 'Sending...' : 'Send feedback'}
          </button>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Anonymous · no tracking · takes 30 seconds
          </p>
        </div>
      </form>
    </div>
  )
}
