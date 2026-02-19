import { useState } from 'react'

export default function ContactButton({ className = '', children = 'Get in Touch' }) {
  const [showConsent, setShowConsent] = useState(false)

  function handleClick() {
    setShowConsent(true)
  }

  function handleConfirm() {
    setShowConsent(false)
    window.location.href =
      'mailto:mike@kamunityconsulting.com?subject=AI%20Readiness%20Enquiry'
  }

  function handleCancel() {
    setShowConsent(false)
  }

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>

      {showConsent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={handleCancel}
          role="dialog"
          aria-modal="true"
          aria-label="Contact consent"
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-charcoal text-lg mb-2">
              Open your email app?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-1">
              This will open your email app to contact:
            </p>
            <p className="text-moss-600 font-medium text-sm mb-3">
              mike@kamunityconsulting.com
            </p>
            <p className="text-gray-400 text-xs mb-5">
              No information is stored on this site. Your email app handles the
              message directly.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 rounded-lg bg-moss-500 text-white font-medium text-sm hover:bg-moss-600 transition-colors"
              >
                Open Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
