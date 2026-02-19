import { useState } from 'react'

const EMOJIS = [
  { value: 'happy', icon: '😊', label: 'Helpful' },
  { value: 'thinking', icon: '🤔', label: 'Not sure' },
  { value: 'unhappy', icon: '😟', label: 'Not helpful' },
]

export default function FeedbackWidget() {
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedEmoji) return

    try {
      const formData = new URLSearchParams()
      formData.append('form-name', 'feedback')
      formData.append('emoji', selectedEmoji)
      formData.append('message', message)

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })

      setSubmitted(true)
    } catch {
      setError(true)
    }
  }

  if (submitted) {
    return (
      <div className="bg-moss-50 border border-moss-200 rounded-xl p-4 text-center">
        <p className="text-moss-700 font-medium text-sm">
          Thanks for your feedback! 🙏
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <form onSubmit={handleSubmit}>
        <p className="text-gray-600 text-sm font-medium mb-3 text-center">
          Was this helpful?
        </p>
        <div className="flex justify-center gap-2 mb-3">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji.value}
              type="button"
              onClick={() => setSelectedEmoji(emoji.value)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200
                ${
                  selectedEmoji === emoji.value
                    ? 'bg-moss-100 border-2 border-moss-400 scale-110'
                    : 'bg-white border-2 border-gray-200 hover:border-moss-300'
                }
              `}
              aria-label={emoji.label}
            >
              <span className="text-2xl">{emoji.icon}</span>
              <span className="text-xs text-gray-500">{emoji.label}</span>
            </button>
          ))}
        </div>

        {selectedEmoji && (
          <>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more (optional)..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-moss-400 focus:border-transparent resize-none mb-2"
              rows={2}
              maxLength={500}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-moss-500 text-white text-sm font-medium hover:bg-moss-600 transition-colors"
            >
              Send Feedback
            </button>
            {error && (
              <p className="text-red-500 text-xs mt-1 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}

        <p className="text-gray-400 text-xs text-center mt-2">
          Anonymous — no email or name collected.
        </p>
      </form>
    </div>
  )
}
