import { useState } from 'react';
import { getStatusLabel } from '../utils/scoring';

export default function ShareResults({ results, stage }) {
  const [copied, setCopied] = useState(false);

  function generateSummary() {
    const dims = Object.values(results.dimensions)
      .map((d) => `  ${d.name}: ${d.score}/${d.maxScore} (${getStatusLabel(d.status)})`)
      .join('\n');

    return `🔐 My Digital Sovereignty Score: ${results.totalScore}/100, ${stage.name}

${dims}

Take the free 2-minute audit: https://audit.kamunity.ai
Built by Kamunity Consulting, digital sovereignty for community organisations.`;
  }

  async function handleCopy() {
    const text = generateSummary();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  async function handleShare() {
    const text = generateSummary();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Digital Sovereignty Score',
          text: text,
          url: 'https://audit.kamunity.ai',
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-10 print:hidden">
      <h2 className="font-semibold text-ku-navy mb-2 text-center">Share your results</h2>
      <p className="text-gray-500 text-sm text-center mb-4">
        Share with your board, team, or colleagues. No data is transmitted.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-ku-navy font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ku-teal text-white font-medium rounded-xl hover:bg-ku-teal-dark transition-colors text-sm cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-ku-navy font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>
    </div>
  );
}
