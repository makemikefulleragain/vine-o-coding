import React from 'react';
import KaiOrb from './KaiOrb.jsx';

export default function LandingPage({ onStart, onAbout }) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-12">

      {/* Orb */}
      <div className="mb-8">
        <KaiOrb state="idle" size={90} />
      </div>

      {/* Title */}
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-tan mb-3 text-center">
        Kamunity · Reflection
      </p>

      {/* Pitch */}
      <h1 className="font-serif text-bark text-[1.6rem] leading-snug text-center max-w-sm mb-3">
        A conversation tool for WA community organisations.
      </h1>

      <p className="font-serif text-bark text-[0.95rem] leading-relaxed text-center max-w-xs mb-2 opacity-80">
        A bit like talking to your toaster, but about better communities — not hot buttered crumpets.
      </p>

      {/* What happens */}
      <div className="mt-6 mb-8 max-w-sm w-full space-y-3">
        <div className="flex items-start gap-3">
          <span className="font-mono text-[0.7rem] text-ember mt-0.5 flex-shrink-0">01</span>
          <p className="font-serif text-bark text-[0.88rem] leading-relaxed">
            Kai asks four questions most organisations never sit with.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="font-mono text-[0.7rem] text-ember mt-0.5 flex-shrink-0">02</span>
          <p className="font-serif text-bark text-[0.88rem] leading-relaxed">
            You choose where to go next — deeper into what it means, or who in WA might be worth talking to.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="font-mono text-[0.7rem] text-ember mt-0.5 flex-shrink-0">03</span>
          <p className="font-serif text-bark text-[0.88rem] leading-relaxed">
            You leave with something worth keeping. Nothing is stored anywhere.
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="font-mono text-[0.75rem] tracking-widest uppercase px-8 py-3.5 bg-bark text-parchment rounded-full hover:bg-ember transition-colors shadow-sm mb-4"
      >
        Start the conversation
      </button>

      {/* Transparency */}
      <div className="mt-6 max-w-sm w-full border-t border-tan pt-5 space-y-2">
        <p className="font-mono text-[0.62rem] text-tan leading-relaxed text-center">
          Kai is an AI wayfinder — not a counsellor, therapist, or professional advisor.
          What you share isn't stored or sent anywhere.
        </p>
        <p className="font-mono text-[0.6rem] text-tan leading-relaxed text-center">
          Built by{' '}
          <a href="https://kamunity.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-bark">
            Kamunity
          </a>{' '}
          · Whadjuk Noongar boodja
        </p>
        <p className="font-mono text-[0.58rem] text-tan leading-relaxed text-center">
          Crisis support: Lifeline 13 11 14 · Beyond Blue 1300 22 4636 · 13YARN 13 92 76
        </p>
        <div className="text-center pt-1">
          <button
            onClick={onAbout}
            className="font-mono text-[0.6rem] text-tan underline hover:text-bark transition-colors"
          >
            More about this tool
          </button>
        </div>
      </div>

    </div>
  );
}
