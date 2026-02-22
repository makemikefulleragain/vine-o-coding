import React, { useEffect, useRef, forwardRef } from 'react';

export default function FloatingOutput({ messages, isWarmingUp }) {
  const scrollRef = useRef(null);
  const lastMsgRef = useRef(null);

  useEffect(() => {
    if (isWarmingUp && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else if (!isWarmingUp && lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, isWarmingUp]);

  if (messages.length === 0 && !isWarmingUp) return null;

  return (
    <div
      ref={scrollRef}
      className="output-fade-mask scrollbar-hide flex-1 overflow-y-auto w-full px-6 md:px-16 pt-8 pb-2"
      style={{ maxHeight: '100%' }}
    >
      <div className="flex flex-col gap-1.5 justify-end min-h-full">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            msg={msg}
            ref={idx === messages.length - 1 ? lastMsgRef : null}
          />
        ))}
        {isWarmingUp && <WarmUpIndicator />}
      </div>
    </div>
  );
}

function splitParagraphs(text) {
  if (!text) return [''];
  if (text.includes('\n\n')) return text.split(/\n\n+/).filter(Boolean);
  // Fallback: split on sentence boundaries (. ! ?) to avoid wall of text
  const sentences = text.match(/[^.!?]+[.!?]+["']?\s*/g) || [text];
  if (sentences.length <= 2) return [text];
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join('').trim(),
    sentences.slice(mid).join('').trim(),
  ].filter(Boolean);
}

const MessageBubble = forwardRef(function MessageBubble({ msg }, ref) {
  const isKai = msg.role === 'assistant';
  const paragraphs = splitParagraphs(msg.content);

  return (
    <div ref={ref} className={`animate-fade-in pt-1 ${isKai ? '' : 'self-end'}`}>
      {isKai ? (
        <div className="flex items-start gap-2.5">
          {/* Small Kai orb indicator */}
          <div className="flex-shrink-0 mt-1.5" aria-label="Kai">
            <div className="w-4 h-4 rounded-full bg-ember opacity-80" style={{ boxShadow: '0 0 6px 1px rgba(210,100,40,0.4)' }} />
          </div>
          <div className="flex-1 space-y-3">
            {msg.isOpening && (
              <p className="font-mono text-[0.55rem] tracking-widest uppercase text-tan mb-1">
                Kamunity · Reflection
              </p>
            )}
            {paragraphs.map((para, i) => (
              <p key={i} className="font-serif leading-relaxed text-bark text-[1.05rem]">
                {para.replace(/\n/g, ' ')}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="font-serif leading-relaxed text-sky text-[0.95rem] italic self-end text-right">
          {msg.content}
        </p>
      )}
    </div>
  );
});

function WarmUpIndicator() {
  return (
    <div className="animate-fade-in flex items-center gap-2.5">
      <div className="flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-ember opacity-60 animate-pulse" />
      </div>
      <p className="font-mono text-sm text-tan italic">Just a moment...</p>
    </div>
  );
}
