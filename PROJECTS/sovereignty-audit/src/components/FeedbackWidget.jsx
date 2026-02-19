import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const reactions = [
  { emoji: '😊', label: 'Love it', value: 'love' },
  { emoji: '👍', label: 'Useful', value: 'useful' },
  { emoji: '💡', label: 'Idea', value: 'idea' },
];

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedReaction && !message.trim()) return;

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'feedback');
      formData.append('page', location.pathname);
      formData.append('reaction', selectedReaction || '');
      formData.append('message', message.trim());

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
        setSelectedReaction(null);
        setMessage('');
      }, 2500);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && !open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          aria-label="Send feedback"
        >
          <span className="text-base group-hover:scale-110 transition-transform">💬</span>
          <span className="text-sm font-medium text-gray-600 hidden sm:inline">Feedback</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 sm:w-80">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="text-sm font-semibold text-ku-navy">How's this going?</p>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close feedback"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="px-4 pb-4 text-center">
              <p className="text-2xl mb-1">🙏</p>
              <p className="text-sm text-gray-600">Thanks for your feedback!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-4 pb-4">
              {/* Emoji reactions */}
              <div className="flex gap-2 mb-3">
                {reactions.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setSelectedReaction(selectedReaction === r.value ? null : r.value)}
                    className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedReaction === r.value
                        ? 'border-ku-teal bg-ku-teal-light/50 scale-105'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{r.emoji}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{r.label}</span>
                  </button>
                ))}
              </div>

              {/* Message */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Comments, questions, or just say hi..."
                rows={2}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ku-teal/30 focus:border-ku-teal placeholder:text-gray-400 mb-3"
              />

              <button
                type="submit"
                disabled={submitting || (!selectedReaction && !message.trim())}
                className="w-full py-2 bg-ku-teal text-white text-sm font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? 'Sending...' : 'Send Feedback'}
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-2 leading-relaxed">
                Submitted via Netlify Forms. We see your feedback but not your identity.
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
