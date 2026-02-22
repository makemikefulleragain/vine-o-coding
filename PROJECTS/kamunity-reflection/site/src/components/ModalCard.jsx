import React, { useState } from 'react';

export default function ModalCard({ type, onClose }) {
  if (type === 'about') return <AboutModal onClose={onClose} />;
  if (type === 'feedback') return <FeedbackModal onClose={onClose} />;
  return null;
}

function ModalWrapper({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-parchment border border-tan rounded-2xl shadow-xl max-w-lg w-full p-6 animate-card-in relative">
        <div className="flex justify-between items-start mb-4">
          <p className="font-mono text-[0.6rem] tracking-widest uppercase text-moss">{title}</p>
          <button
            onClick={onClose}
            className="font-mono text-[0.7rem] text-tan hover:text-bark transition-colors ml-4"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AboutModal({ onClose }) {
  return (
    <ModalWrapper title="About Kamunity Reflection" onClose={onClose}>
      <h2 className="font-serif text-bark text-[1.3rem] leading-snug mb-3">
        Community self-perception infrastructure.
      </h2>
      <p className="font-serif text-bark text-[0.9rem] leading-relaxed mb-3">
        Kamunity Reflection helps community organisations discover what they're actually for — through a Kai conversation that leaves something useful in hand when it ends and a question lingering that wasn't there before.
      </p>
      <p className="font-serif text-bark text-[0.9rem] leading-relaxed mb-4">
        Kai is an AI wayfinder — not a counsellor, not a therapist, not a professional advisor. What you share in this conversation isn't stored anywhere or used by anyone. Nothing leaves your browser without your explicit consent.
      </p>
      <div className="border-t border-tan pt-4 space-y-2">
        <p className="font-mono text-[0.65rem] text-moss leading-relaxed">
          Built by <a href="https://kamunity.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-bark">Kamunity</a> · Whadjuk Noongar boodja · <a href="https://kamunityconsulting.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-bark">Consulting</a>
        </p>
        <p className="font-mono text-[0.62rem] text-tan leading-relaxed">
          If something more serious is happening for you or your team:<br />
          Lifeline 13 11 14 · Beyond Blue 1300 22 4636 · 13YARN 13 92 76 · Crisis Care WA 9223 1111
        </p>
      </div>
    </ModalWrapper>
  );
}

function FeedbackModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return;
    const form = e.target;
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <ModalWrapper title="Feedback" onClose={onClose}>
        <p className="font-serif text-bark text-[1rem] leading-relaxed mb-2">Thank you.</p>
        <p className="font-mono text-[0.75rem] text-moss leading-relaxed">Your feedback helps Kamunity Reflection become more useful for community organisations across WA.</p>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper title="Share feedback" onClose={onClose}>
      <p className="font-serif text-bark text-[0.9rem] leading-relaxed mb-4">
        Your experience with this conversation helps us improve it for other community organisations.
      </p>
      <form name="reflection-feedback" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-3">
        <input type="hidden" name="form-name" value="reflection-feedback" />
        <div>
          <label className="font-mono text-[0.62rem] uppercase tracking-wide text-moss block mb-1">
            Organisation (optional)
          </label>
          <input
            type="text"
            name="organisation"
            placeholder="e.g. ALIKE WA"
            className="w-full bg-transparent border border-tan rounded-lg px-3 py-2 font-serif text-bark text-[0.88rem] placeholder-tan outline-none focus:border-bark transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-[0.62rem] uppercase tracking-wide text-moss block mb-1">
            What happened for you in this conversation? *
          </label>
          <textarea
            name="feedback"
            required
            rows={4}
            placeholder="What was useful? What was missing? What surprised you?"
            className="w-full bg-transparent border border-tan rounded-lg px-3 py-2 font-serif text-bark text-[0.88rem] placeholder-tan outline-none focus:border-bark transition-colors resize-none"
          />
        </div>
        <label className="flex gap-2 items-start cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span className="font-mono text-[0.65rem] text-bark leading-relaxed">
            I consent to Kamunity using this feedback to improve the tool. I understand it won't be shared publicly without my permission.
          </span>
        </label>
        <button
          type="submit"
          disabled={!consent}
          className="w-full font-mono text-[0.7rem] tracking-widest uppercase px-4 py-2.5 bg-bark text-parchment rounded-full disabled:opacity-40 hover:bg-ember transition-colors"
        >
          Send feedback
        </button>
      </form>
    </ModalWrapper>
  );
}
