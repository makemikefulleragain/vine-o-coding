import React, { useState } from 'react';

const TYPE_EMOJI = { gift: '🎁', story: '📖', exchange: '🔄' };

export default function BackpackPanel({ newCards, savedItems, open, onToggle, onSave, onNotNow, onNotForMe, onDone, onDontNeed }) {
  const newCount = newCards.length;
  const savedCount = savedItems.length;
  const total = newCount + savedCount;

  return (
    <>
      {/* Persistent trigger strip — always visible in Act 2 */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`Kamunity Backpack — ${total} item${total !== 1 ? 's' : ''}`}
        className="flex flex-col items-center justify-center w-full h-full gap-2 bg-ember hover:bg-bark transition-colors"
      >
        <span className="text-2xl" aria-hidden="true">🎒</span>
        {total > 0 && (
          <span className="bg-parchment text-ember font-mono text-[0.6rem] rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {total}
          </span>
        )}
      </button>

      {/* Slide-in modal panel */}
      <div
        className={`fixed top-0 right-0 h-full z-40 flex flex-col bg-parchment shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 'min(360px, 90vw)', borderRadius: '16px 0 0 16px' }}
      >
        {/* Orange header */}
        <div className="bg-ember rounded-tl-2xl px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🎒</span>
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-parchment">
              Kamunity Backpack
            </span>
          </div>
          <button
            onClick={onToggle}
            className="font-mono text-[0.7rem] text-parchment hover:text-white transition-colors"
            aria-label="Close backpack"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">

          {/* NEW section */}
          {newCount > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] tracking-widest uppercase text-tan px-5 pt-4 pb-2">
                New — {newCount}
              </p>
              <div className="divide-y divide-tan">
                {newCards.map(card => (
                  <NewCard
                    key={card.id}
                    card={card}
                    onSave={onSave}
                    onNotNow={onNotNow}
                    onNotForMe={onNotForMe}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SAVED section */}
          {savedCount > 0 && (
            <div className={newCount > 0 ? 'border-t border-tan mt-2' : ''}>
              <p className="font-mono text-[0.58rem] tracking-widest uppercase text-tan px-5 pt-4 pb-2">
                Saved — {savedCount}
              </p>
              <div className="divide-y divide-tan">
                {savedItems.map(item => (
                  <SavedCard
                    key={item.id}
                    item={item}
                    onDone={onDone}
                    onDontNeed={onDontNeed}
                  />
                ))}
              </div>
            </div>
          )}

          {total === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="font-serif text-bark text-[0.9rem] leading-relaxed mb-2">
                Nothing here yet.
              </p>
              <p className="font-mono text-[0.65rem] text-tan leading-relaxed">
                Gifts and connections will appear as the conversation unfolds.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-tan flex-shrink-0">
          <p className="font-mono text-[0.56rem] text-tan leading-relaxed text-center">
            Nothing here is sent anywhere. What you have is yours.
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-bark bg-opacity-20"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}

function NewCard({ card, onSave, onNotNow, onNotForMe }) {
  const emoji = TYPE_EMOJI[card.type] || '🎁';
  return (
    <div className="px-5 py-4">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-base flex-shrink-0 mt-0.5" aria-hidden="true">{emoji}</span>
        <h3 className="font-serif text-bark text-[0.95rem] leading-snug">{card.title}</h3>
      </div>
      <p className="font-serif text-bark text-[0.85rem] leading-relaxed mb-2 pl-6">{card.body}</p>
      {card.earworm && (
        <p className="font-mono text-[0.7rem] text-gold italic leading-relaxed mb-2 pl-6">
          {card.earworm}
        </p>
      )}
      {card.action && (
        <p className="font-mono text-[0.65rem] text-moss leading-relaxed mb-3 pl-6">
          {card.action}
        </p>
      )}
      {card.how && (
        <p className="font-mono text-[0.62rem] text-tan leading-relaxed mb-3 pl-6">
          {card.how}
        </p>
      )}
      <div className="flex gap-2 flex-wrap pl-6">
        <button
          onClick={() => onSave(card)}
          className="font-mono text-[0.65rem] tracking-wider uppercase px-4 py-1.5 bg-bark text-parchment rounded-full hover:bg-ember transition-colors"
        >
          Thanks
        </button>
        <button
          onClick={() => onNotNow(card.id)}
          className="font-mono text-[0.65rem] tracking-wider uppercase px-3 py-1.5 border border-tan text-bark rounded-full hover:border-bark transition-colors"
        >
          Not now
        </button>
        <button
          onClick={() => onNotForMe(card.id)}
          className="font-mono text-[0.65rem] tracking-wider uppercase px-3 py-1.5 text-tan hover:text-bark transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}

function SavedCard({ item, onDone, onDontNeed }) {
  const [expanded, setExpanded] = useState(false);
  const emoji = TYPE_EMOJI[item.type] || '🎁';
  return (
    <div className="px-5 py-3">
      <button
        className="w-full flex items-center justify-between gap-2 text-left"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-base flex-shrink-0" aria-hidden="true">{emoji}</span>
          <p className="font-serif text-bark text-[0.88rem] leading-snug truncate">{item.title}</p>
        </div>
        <span className="font-mono text-[0.65rem] text-tan flex-shrink-0">{expanded ? '↑' : '↓'}</span>
      </button>

      {expanded && (
        <div className="mt-3 pl-6 space-y-2">
          <p className="font-serif text-bark text-[0.83rem] leading-relaxed">{item.body}</p>
          {item.earworm && (
            <p className="font-mono text-[0.68rem] text-gold italic">{item.earworm}</p>
          )}
          {item.action && (
            <p className="font-mono text-[0.63rem] text-moss leading-relaxed">{item.action}</p>
          )}
          {item.how && (
            <p className="font-mono text-[0.6rem] text-tan leading-relaxed">{item.how}</p>
          )}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onDone(item.id)}
              className="font-mono text-[0.63rem] tracking-wider uppercase px-3 py-1.5 bg-moss text-parchment rounded-full hover:opacity-80 transition-opacity"
            >
              Done
            </button>
            <button
              onClick={() => onDontNeed(item.id)}
              className="font-mono text-[0.63rem] tracking-wider uppercase px-3 py-1.5 text-tan hover:text-bark transition-colors"
            >
              Don't need
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
