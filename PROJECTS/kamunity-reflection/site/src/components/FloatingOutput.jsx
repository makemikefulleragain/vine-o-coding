import React, { useEffect, useRef } from 'react';

export default function FloatingOutput({ messages, isWarmingUp }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isWarmingUp]);

  if (messages.length === 0 && !isWarmingUp) return null;

  return (
    <div
      ref={scrollRef}
      className="output-fade-mask scrollbar-hide flex-1 overflow-y-auto w-full px-6 pt-8 pb-2"
      style={{ maxHeight: '100%' }}
    >
      <div className="flex flex-col gap-4 justify-end min-h-full">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} />
        ))}
        {isWarmingUp && <WarmUpIndicator />}
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isKai = msg.role === 'assistant';

  return (
    <div className={`animate-fade-in ${isKai ? '' : 'self-end'}`}>
      {isKai && (
        <p className="font-mono text-[0.6rem] tracking-widest uppercase text-moss mb-1.5">
          {msg.isOpening ? 'Kamunity · Reflection' : 'Kai'}
        </p>
      )}
      <p
        className={`font-serif leading-relaxed whitespace-pre-line ${
          isKai
            ? 'text-bark text-[1.05rem]'
            : 'text-sky text-[0.95rem] italic'
        }`}
      >
        {msg.content}
      </p>
    </div>
  );
}

function WarmUpIndicator() {
  return (
    <div className="animate-fade-in">
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-moss mb-1.5">Kai</p>
      <p className="font-mono text-sm text-tan italic">Just warming up...</p>
    </div>
  );
}
