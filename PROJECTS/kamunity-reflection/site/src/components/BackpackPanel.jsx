import React, { useState } from 'react';

const STATUS_LABELS = {
  new: { label: 'New', color: 'text-ember' },
  considering: { label: 'Considering', color: 'text-sky' },
  acting: { label: 'Acting on it', color: 'text-moss' },
};

export default function BackpackPanel({ items, open, onToggle, onUpdateStatus, onClearSession }) {
  return (
    <>
      <button
        onClick={onToggle}
        className="font-mono text-[0.65rem] tracking-widest uppercase flex items-center gap-2 text-bark hover:text-ember transition-colors py-2 px-4"
        aria-expanded={open}
        aria-label={`Backpack — ${items.length} item${items.length !== 1 ? 's' : ''}`}
      >
        <BackpackIcon />
        <span>Backpack</span>
        {items.length > 0 && (
          <span className="bg-bark text-parchment text-[0.55rem] rounded-full w-4 h-4 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="backpack-panel border-t border-tan bg-parchment">
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-bark">
              Your backpack — {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={onClearSession}
              className="font-mono text-[0.58rem] text-tan hover:text-ember transition-colors"
            >
              Clear session
            </button>
          </div>

          {items.length === 0 ? (
            <p className="px-4 pb-4 font-mono text-[0.72rem] text-tan italic">
              Nothing in your backpack yet. Add gifts, stories, or connections as you go.
            </p>
          ) : (
            <div className="overflow-y-auto max-h-[50vh] scrollbar-hide divide-y divide-tan">
              {items.map(item => (
                <BackpackItem
                  key={item.id}
                  item={item}
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </div>
          )}

          <div className="px-4 py-3 border-t border-tan">
            <p className="font-mono text-[0.58rem] text-tan leading-relaxed">
              Nothing here is sent anywhere. What you have is yours.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function BackpackItem({ item, onUpdateStatus }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_LABELS[item.status] || STATUS_LABELS.new;

  return (
    <div className="px-4 py-3">
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 pr-2">
          <p className="font-serif text-bark text-[0.85rem] leading-snug">{item.title}</p>
          <p className={`font-mono text-[0.58rem] tracking-wide mt-0.5 ${statusCfg.color}`}>
            {statusCfg.label}
          </p>
        </div>
        <span className="text-tan text-sm">{expanded ? '↑' : '↓'}</span>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3">
          <p className="font-serif text-bark text-[0.82rem] leading-relaxed">{item.body}</p>

          {item.earworm && (
            <p className="font-mono text-[0.7rem] text-gold italic">{item.earworm}</p>
          )}

          {item.action && (
            <div className="bg-tan bg-opacity-20 rounded p-2">
              <p className="font-mono text-[0.62rem] uppercase tracking-wide text-moss mb-1">Purpose / use</p>
              <p className="font-mono text-[0.72rem] text-bark">{item.action}</p>
            </div>
          )}

          {item.latent && item.latent.length > 0 && (
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-wide text-tan mb-1">Could also be...</p>
              {item.latent.map((l, i) => (
                <p key={i} className="font-mono text-[0.7rem] text-tan italic leading-snug">· {l}</p>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            {Object.entries(STATUS_LABELS).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => onUpdateStatus(item.id, key)}
                className={`font-mono text-[0.6rem] tracking-wide px-3 py-1 rounded-full border transition-colors ${
                  item.status === key
                    ? 'border-bark bg-bark text-parchment'
                    : 'border-tan text-tan hover:border-bark hover:text-bark'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BackpackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.47 0 12 0S6 2.53 6 4.65c0 .47.11.91.18 1.35H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-4c1.84 0 3 1.16 3 2.65 0 .47-.11.91-.18 1.35H9.18C9.11 6.11 9 5.67 9 5.2 9 3.53 10.16 2 12 2zm2 13h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
    </svg>
  );
}
