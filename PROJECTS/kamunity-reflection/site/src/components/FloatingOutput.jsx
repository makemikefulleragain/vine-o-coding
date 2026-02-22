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
      className="output-fade-mask scrollbar-hide flex-1 overflow-y-auto w-full px-6 pt-8 pb-2"
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
    <div ref={ref} className={`animate-fade-in ${isKai ? '' : 'self-end'} pt-1`}>
      {isKai && (
        <p className="font-mono text-[0.6rem] tracking-widest uppercase text-moss mb-2">
          {msg.isOpening ? 'Kamunity · Reflection' : 'Kai'}
        </p>
      )}
      {isKai ? (
        <div className="space-y-3">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed text-bark text-[1.05rem]"
            >
              {para.replace(/\n/g, ' ')}
            </p>
          ))}
        </div>
      ) : (
        <p className="font-serif leading-relaxed text-sky text-[0.95rem] italic">
          {msg.content}
        </p>
      )}
    </div>
  );
});

function WarmUpIndicator() {
  return (
    <div className="animate-fade-in">
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-moss mb-1.5">Kai</p>
      <p className="font-mono text-sm text-tan italic">Just warming up...</p>
    </div>
  );
}
