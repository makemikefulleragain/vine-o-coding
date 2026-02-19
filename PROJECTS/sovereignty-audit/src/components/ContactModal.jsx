import { Link } from 'react-router-dom';

export default function ContactModal({ onClose }) {
  function handleSendEmail() {
    window.location.href = 'mailto:mike@kamunityconsulting.com?subject=Hello%20from%20the%20Digital%20Sovereignty%20Audit&body=Hi%20Mike%2C%0A%0A';
    onClose();
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-ku-teal-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-ku-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-ku-navy mb-1">Talk to Kamunity</h2>
          <p className="text-sm text-gray-500">We'd love to hear from you.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm text-gray-600 leading-relaxed">
          <p className="mb-2">
            Clicking the button below will <strong>open your email app</strong> to send a message to{' '}
            <span className="font-medium text-ku-navy">mike@kamunityconsulting.com</span>.
          </p>
          <p>
            We don't collect or store any data from this site. Your email stays between you and us.
            It's your choice to send it.
          </p>
        </div>

        <button
          onClick={handleSendEmail}
          className="w-full py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors cursor-pointer mb-3"
        >
          Open Email App
        </button>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Read our{' '}
          <Link to="/privacy" onClick={onClose} className="text-ku-teal hover:text-ku-teal-dark no-underline">
            Privacy Policy
          </Link>.
          We practice what we preach about digital sovereignty.
        </p>
      </div>
    </div>
  );
}
