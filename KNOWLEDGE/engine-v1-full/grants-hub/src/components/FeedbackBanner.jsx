import React, { useState } from 'react';

const DISMISSED_KEY = 'gah_feedback_dismissed';

export default function FeedbackBanner({ feedbackUrl }) {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISSED_KEY) === '1');

  if (dismissed || !feedbackUrl || feedbackUrl.includes('PLACEHOLDER')) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 no-print">
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-indigo-600 text-white rounded-lg shadow-lg px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm">
            <span className="font-medium">Help us improve!</span> Share your feedback as a treasurer or community group member.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a href={feedbackUrl} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white text-indigo-700 rounded text-sm font-medium hover:bg-indigo-50 transition-colors">
              Give Feedback
            </a>
            <button onClick={dismiss} className="text-indigo-200 hover:text-white text-lg leading-none" aria-label="Dismiss">&times;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
