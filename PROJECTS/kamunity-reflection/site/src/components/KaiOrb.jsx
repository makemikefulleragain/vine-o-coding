import React from 'react';

const STATE_CONFIG = {
  idle:     { cls: 'kai-orb-ember', anim: 'animate-orb-idle',  label: 'Kai is listening' },
  thinking: { cls: 'kai-orb-ember', anim: 'animate-orb-think', label: 'Kai is thinking' },
  speaking: { cls: 'kai-orb-blue',  anim: 'animate-orb-speak', label: 'Kai is responding' },
};

export default function KaiOrb({ state = 'idle', size = 220 }) {
  const cfg = STATE_CONFIG[state] || STATE_CONFIG.idle;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
      aria-label={cfg.label}
      role="img"
    >
      <div
        className={`kai-orb ${cfg.cls} ${cfg.anim}`}
        style={{ width: size, height: size }}
      />
      {state === 'thinking' && (
        <div className="absolute flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full bg-amber-200 opacity-70"
              style={{ animation: `orbThink 1.5s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
