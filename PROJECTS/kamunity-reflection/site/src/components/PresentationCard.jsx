import React, { useState, useRef, useEffect } from 'react';

const TYPE_CONFIG = {
  gift: {
    label: 'Your gift from this question',
    blobClass: 'card-blob',
    accentClass: 'border-l-4 border-ember',
    labelColor: 'text-ember',
    bg: 'bg-parchment',
  },
  story: {
    label: 'Others at this fork',
    blobClass: 'card-blob-story',
    accentClass: 'border-l-4 border-moss',
    labelColor: 'text-moss',
    bg: 'bg-parchment',
  },
  exchange: {
    label: 'Possible connection',
    blobClass: 'card-blob-exchange',
    accentClass: 'border-l-4 border-sky',
    labelColor: 'text-sky',
    bg: 'bg-parchment',
  },
};

const CONFIDENCE_CONFIG = {
  high:   { label: 'Strong signal', dot: 'bg-moss',  text: 'text-moss' },
  medium: { label: 'Worth exploring', dot: 'bg-gold', text: 'text-gold' },
  low:    { label: 'Tentative',      dot: 'bg-tan',  text: 'text-tan' },
};

const EXCHANGE_TYPE_LABEL = {
  swap:  'Direct swap',
  loop:  'Three-way loop',
  chain: 'Chain possibility',
};

export default function PresentationCard({ card, onAddToBackpack, onNotNow, onNotForMe }) {
  const [dismissed, setDismissed] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [showHoldMenu, setShowHoldMenu] = useState(false);
  const holdTimerRef = useRef(null);

  useEffect(() => {
    return () => { if (holdTimerRef.current) clearTimeout(holdTimerRef.current); };
  }, []);

  const cfg = TYPE_CONFIG[card.type] || TYPE_CONFIG.gift;

  const handleAddToBackpack = () => {
    onAddToBackpack(card);
    setMinimised(true);
  };

  const handleNotNow = () => {
    onNotNow(card.id);
    setMinimised(true);
  };

  const handleNotForMe = () => {
    onNotForMe(card.id);
    setDismissed(true);
  };

  const handleTouchStart = () => {
    holdTimerRef.current = setTimeout(() => setShowHoldMenu(true), 3000);
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null; }
  };

  if (dismissed) return null;

  if (minimised) {
    return (
      <div
        className={`animate-card-in ${cfg.blobClass} ${cfg.bg} border border-tan px-4 py-2 flex items-center justify-between cursor-pointer`}
        onClick={() => setMinimised(false)}
      >
        <span className={`font-mono text-[0.6rem] tracking-widest uppercase ${cfg.labelColor}`}>{cfg.label}</span>
        <span className="font-mono text-[0.65rem] text-tan">tap to expand ↓</span>
      </div>
    );
  }

  return (
    <div
      className={`animate-card-in ${cfg.blobClass} ${cfg.bg} border border-tan shadow-sm p-5 relative`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {showHoldMenu && (
        <HoldMenu
          onAddToBackpack={handleAddToBackpack}
          onNotNow={handleNotNow}
          onNotForMe={handleNotForMe}
          onClose={() => setShowHoldMenu(false)}
        />
      )}

      <div className={`${cfg.accentClass} pl-4 mb-4`}>
        <p className={`font-mono text-[0.6rem] tracking-widest uppercase mb-2 ${cfg.labelColor}`}>
          {cfg.label}
        </p>
        <h3 className="font-serif text-bark text-[1rem] leading-snug mb-2">{card.title}</h3>
        <p className="font-serif text-bark text-[0.9rem] leading-relaxed">{card.body}</p>
      </div>

      {card.earworm && (
        <p className="font-mono text-[0.75rem] text-gold italic leading-relaxed mb-3 pl-4">
          {card.earworm}
        </p>
      )}

      {card.type === 'exchange' && (card.confidence || card.exchangeType) && (
        <div className="flex items-center gap-3 pl-4 mb-3">
          {card.confidence && (() => {
            const cc = CONFIDENCE_CONFIG[card.confidence] || CONFIDENCE_CONFIG.medium;
            return (
              <span className={`flex items-center gap-1.5 font-mono text-[0.58rem] tracking-widest uppercase ${cc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cc.dot} inline-block`} />
                {cc.label}
              </span>
            );
          })()}
          {card.exchangeType && (
            <span className="font-mono text-[0.58rem] tracking-widest uppercase text-tan">
              {EXCHANGE_TYPE_LABEL[card.exchangeType] || card.exchangeType}
            </span>
          )}
        </div>
      )}

      {card.how && (
        <p className="font-mono text-[0.65rem] text-tan leading-relaxed mb-3 pl-4">
          {card.how}
        </p>
      )}

      {card.action && (
        <p className="font-mono text-[0.7rem] text-moss leading-relaxed mb-4 pl-4">
          One thing you could do: {card.action}
        </p>
      )}

      <div className="flex gap-2 flex-wrap pt-1">
        <button
          onClick={handleAddToBackpack}
          className="font-mono text-[0.68rem] tracking-wider uppercase px-4 py-2 bg-bark text-parchment rounded-full hover:bg-ember transition-colors"
        >
          Add to backpack
        </button>
        <button
          onClick={handleNotNow}
          className="font-mono text-[0.68rem] tracking-wider uppercase px-3 py-2 border border-tan text-bark rounded-full hover:border-bark transition-colors"
        >
          Not now
        </button>
        <button
          onClick={handleNotForMe}
          className="font-mono text-[0.68rem] tracking-wider uppercase px-3 py-2 text-tan hover:text-bark transition-colors"
        >
          Not for me
        </button>
      </div>
    </div>
  );
}

function HoldMenu({ onAddToBackpack, onNotNow, onNotForMe, onClose }) {
  return (
    <div className="absolute inset-0 bg-parchment bg-opacity-95 rounded-[inherit] flex flex-col items-center justify-center gap-3 z-10 p-4">
      <button onClick={() => { onAddToBackpack(); onClose(); }} className="font-mono text-[0.72rem] tracking-wider uppercase px-6 py-2 bg-bark text-parchment rounded-full w-full">Add to backpack</button>
      <button onClick={() => { onNotNow(); onClose(); }} className="font-mono text-[0.72rem] tracking-wider uppercase px-6 py-2 border border-tan text-bark rounded-full w-full">Not now</button>
      <button onClick={() => { onNotForMe(); onClose(); }} className="font-mono text-[0.72rem] tracking-wider uppercase px-6 py-2 text-tan w-full">Not for me</button>
      <button onClick={onClose} className="font-mono text-[0.6rem] text-tan mt-1">cancel</button>
    </div>
  );
}
