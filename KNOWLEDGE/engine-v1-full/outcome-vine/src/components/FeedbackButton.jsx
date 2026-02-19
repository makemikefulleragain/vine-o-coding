import { MessageSquare, X } from 'lucide-react'

export default function FeedbackButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors hover:shadow-xl"
      title={isOpen ? 'Close feedback' : 'Send us feedback'}
    >
      {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
      <span className="hidden sm:inline">{isOpen ? 'Close' : 'Feedback'}</span>
    </button>
  )
}
