import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getFeedback, saveFeedback, generateId } from '../utils/storage'

const EMOJI_OPTIONS = [
  { key: 'happy', emoji: '😊', label: 'Loving it' },
  { key: 'neutral', emoji: '😐', label: 'It\'s okay' },
  { key: 'sad', emoji: '😟', label: 'Not great' },
]

function FeedbackWidget() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('emoji')
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleEmojiSelect(emojiKey) {
    setSelectedEmoji(emojiKey)
    setStep('text')
  }

  function handleSubmit() {
    const feedback = getFeedback()
    feedback.push({
      id: generateId(),
      emoji: selectedEmoji,
      text: text.trim(),
      page: location.pathname,
      createdAt: new Date().toISOString(),
    })
    saveFeedback(feedback)
    setSubmitted(true)
    setTimeout(() => {
      resetAndClose()
    }, 2000)
  }

  function handleSkipText() {
    handleSubmit()
  }

  function resetAndClose() {
    setIsOpen(false)
    setStep('emoji')
    setSelectedEmoji(null)
    setText('')
    setSubmitted(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-sage text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-sage-deep transition-all duration-200 text-sm font-medium flex items-center gap-2"
        aria-label="Share feedback"
      >
        <span className="text-base leading-none">💬</span>
        <span className="hidden sm:inline">Feedback</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-80 max-w-[calc(100vw-2.5rem)]">
      <div className="bg-white rounded-xl shadow-xl border border-earth-light/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-sage-light/20 border-b border-earth-light/20">
          <span className="font-heading text-sm text-gray-800">Share Feedback</span>
          <button
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close feedback"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">🧶</p>
              <p className="font-heading text-gray-800">Thanks for sharing!</p>
              <p className="text-sm text-gray-500 mt-1">Your feedback helps us make this better.</p>
            </div>
          ) : step === 'emoji' ? (
            <div>
              <p className="text-sm text-gray-700 mb-3">How are you finding the Knitting Circle?</p>
              <div className="flex justify-center gap-3">
                {EMOJI_OPTIONS.map(({ key, emoji, label }) => (
                  <button
                    key={key}
                    onClick={() => handleEmojiSelect(key)}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-cream transition-colors group"
                    aria-label={label}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
                    <span className="text-xs text-gray-500">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Tell us more <span className="text-gray-400">(take your time, or skip!)</span>
              </p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input-field min-h-[80px] resize-y text-sm"
                placeholder="What's on your mind?"
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSubmit}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Send
                </button>
                <button
                  onClick={handleSkipText}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackWidget
