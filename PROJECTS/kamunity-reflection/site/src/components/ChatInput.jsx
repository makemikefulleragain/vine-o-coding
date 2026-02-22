import React, { useState, useRef, useEffect, useCallback } from 'react';

const LINE_HEIGHT = 24;
const MIN_ROWS = 3;
const MAX_ROWS = 6;

export default function ChatInput({ onSend, isLoading, isSending }) {
  const [text, setText] = useState('');
  const [rows, setRows] = useState(MIN_ROWS);
  const [expanded, setExpanded] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const recalcRows = useCallback((val) => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    const scrollH = textareaRef.current.scrollHeight;
    const naturalRows = Math.ceil(scrollH / LINE_HEIGHT);
    setRows(Math.min(Math.max(naturalRows, MIN_ROWS), MAX_ROWS));
    textareaRef.current.style.height = '';
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    recalcRows(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText('');
    setRows(MIN_ROWS);
  };

  const toggleSpeech = () => {
    if (!speechSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = 'en-AU';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setText(prev => prev + (prev ? ' ' : '') + transcript);
      recalcRows(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  const textareaStyle = {
    height: expanded ? '50vh' : `${rows * LINE_HEIGHT + 24}px`,
    maxHeight: expanded ? '50vh' : `${MAX_ROWS * LINE_HEIGHT + 24}px`,
    overflowY: rows >= MAX_ROWS || expanded ? 'auto' : 'hidden',
    transition: 'height 0.15s ease',
  };

  return (
    <div
      className={`w-full px-4 pb-4 pt-2 ${isSending ? 'animate-slide-down pointer-events-none' : 'animate-slide-up'}`}
    >
      <div className="relative max-w-xl mx-auto">
        <div className="flex items-end gap-2 bg-parchment border border-tan rounded-[20px] px-4 py-2 shadow-sm focus-within:border-bark transition-colors">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Tell Kai what's happening for you..."
            disabled={isLoading}
            className="flex-1 bg-transparent resize-none font-serif text-bark text-[0.92rem] leading-6 placeholder-tan outline-none scrollbar-hide"
            style={textareaStyle}
            aria-label="Message Kai"
            rows={MIN_ROWS}
          />
          <div className="flex flex-col gap-1 items-center pb-0.5 flex-shrink-0">
            {speechSupported && (
              <button
                onClick={toggleSpeech}
                title={listening ? 'Stop listening' : 'Speak your message'}
                className={`p-1.5 rounded-full transition-colors ${listening ? 'text-ember' : 'text-tan hover:text-bark'}`}
                aria-label={listening ? 'Stop voice input' : 'Start voice input'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm6.5 10.5A6.5 6.5 0 0 1 5.5 11.5H4a8 8 0 0 0 7 7.938V22h2v-2.562A8 8 0 0 0 20 11.5h-1.5z"/>
                </svg>
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!text.trim() || isLoading}
              className="p-1.5 rounded-full text-bark disabled:text-tan hover:text-ember transition-colors"
              aria-label="Send message"
              title="Send (or press Enter)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-1.5 px-2">
          <p className="font-mono text-[0.58rem] text-tan tracking-wide">
            shift+enter for new line · you can stop anytime
          </p>
          <button
            onClick={() => setExpanded(e => !e)}
            className="font-mono text-[0.58rem] text-tan hover:text-bark tracking-wide transition-colors"
          >
            {expanded ? '↙ collapse' : '↗ expand'}
          </button>
        </div>
      </div>
    </div>
  );
}
