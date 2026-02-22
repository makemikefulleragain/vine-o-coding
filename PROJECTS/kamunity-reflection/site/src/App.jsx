import React, { useState, useCallback, useEffect, useRef } from 'react';
import KaiOrb from './components/KaiOrb.jsx';
import ChatInput from './components/ChatInput.jsx';
import FloatingOutput from './components/FloatingOutput.jsx';
import PresentationCard from './components/PresentationCard.jsx';
import BackpackPanel from './components/BackpackPanel.jsx';
import ModalCard from './components/ModalCard.jsx';
import { OPENING_MESSAGE } from './data/questions.js';

const SESSION_KEY = 'kamunity-reflection-backpack';

function loadBackpack() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveBackpack(items) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(items));
  } catch { /* silent */ }
}

export default function App() {
  const [orbState, setOrbState]       = useState('idle');
  const [messages, setMessages]       = useState([OPENING_MESSAGE]);
  const [cards, setCards]             = useState([]);
  const [backpack, setBackpack]       = useState(loadBackpack);
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [modal, setModal]             = useState(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [isSending, setIsSending]     = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [ttsOn, setTtsOn]             = useState(false);

  function speakText(txt) {
    if (!('speechSynthesis' in window) || !txt) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(txt);
    utt.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const auVoice = voices.find(v => v.lang === 'en-AU') ||
                    voices.find(v => /en-AU/i.test(v.lang)) ||
                    voices.find(v => /en/i.test(v.lang));
    if (auVoice) { utt.voice = auVoice; utt.lang = auVoice.lang; }
    window.speechSynthesis.speak(utt);
  }

  useEffect(() => { saveBackpack(backpack); }, [backpack]);

  const sendMessage = useCallback(async (text) => {
    if (isLoading) return;

    const userMsg = { role: 'user', content: text, cards: [] };
    const history = [...messages, userMsg];
    setMessages(history);
    setIsSending(true);
    setIsLoading(true);
    setOrbState('thinking');

    setTimeout(() => {
      setIsSending(false);
      setIsWarmingUp(true);
    }, 350);

    try {
      const response = await fetch('/.netlify/functions/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json();

      setIsWarmingUp(false);
      setOrbState('speaking');

      const kaiMsg = {
        role: 'assistant',
        content: data.message || 'Something came up on my end. Could you say that again?',
        cards: data.cards || [],
      };

      setMessages(prev => [...prev, kaiMsg]);

      if (ttsOn) speakText(kaiMsg.content);

      if (kaiMsg.cards.length > 0) {
        setCards(prev => {
          const existingIds = new Set(prev.map(c => c.id));
          const newCards = kaiMsg.cards.filter(c => !existingIds.has(c.id));
          return newCards.length > 0 ? [...prev, ...newCards] : prev;
        });
      }

      setTimeout(() => setOrbState('idle'), 2000);
    } catch (err) {
      setIsWarmingUp(false);
      setOrbState('idle');
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Something went quiet on my end. Give it a moment and try again — or if it keeps happening, the team at Kamunity wants to know.",
          cards: [],
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsSending(false);
    }
  }, [isLoading, messages, ttsOn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToBackpack = useCallback((card) => {
    const item = {
      ...card,
      status: 'new',
      savedAt: Date.now(),
      latent: card.latent || generateLatentOptions(card),
    };
    setBackpack(prev => {
      if (prev.find(i => i.id === card.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const handleUpdateStatus = useCallback((id, status) => {
    setBackpack(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  }, []);

  const handleClearSession = useCallback(() => {
    if (window.confirm('Clear your backpack? This will remove all saved items from this session.')) {
      setBackpack([]);
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const handleNotNow = useCallback((cardId) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const handleNotForMe = useCallback((cardId) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const isMobile = window.innerWidth < 768;
  const orbSize  = isMobile ? 70 : 55;

  const giftCards     = cards.filter(c => c.type !== 'exchange');
  const exchangeCards = cards.filter(c => c.type === 'exchange');

  return (
    <div className="relative flex flex-col md:flex-row md:h-screen bg-parchment overflow-y-auto md:overflow-hidden">

      {/* ── LEFT COLUMN — 20% — gifts & needs (desktop only) ─────── */}
      <div className="hidden md:flex flex-col w-[20%] border-r border-tan overflow-hidden">
        <p className="font-mono text-[0.5rem] tracking-widest uppercase text-tan px-3 pt-3 pb-1 flex-shrink-0">
          Gifts &amp; Needs
        </p>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-3 space-y-2">
          {giftCards.length === 0 ? <EmptySideState label="Gifts and needs will appear here as the conversation unfolds." /> : giftCards.map(card => (
            <PresentationCard key={card.id} card={card}
              onAddToBackpack={handleAddToBackpack}
              onNotNow={handleNotNow} onNotForMe={handleNotForMe} />
          ))}
        </div>
      </div>

      {/* ── CENTRE COLUMN — 60% on desktop, full on mobile ──────── */}
      <div className="flex flex-col flex-1 md:w-[60%] md:flex-none md:h-full md:overflow-hidden">

        {/* Nav strip */}
        <div className="w-full flex justify-between items-center px-5 pt-3 pb-1 flex-shrink-0">
          <button onClick={() => setModal('about')}
            className="font-mono text-[0.6rem] tracking-widest uppercase text-tan hover:text-bark transition-colors">
            Kamunity · Reflection
          </button>
          {'speechSynthesis' in window && (
            <button
              onClick={() => {
                const next = !ttsOn;
                setTtsOn(next);
                if (next) speakText('Voice enabled.');
                else window.speechSynthesis.cancel();
              }}
              title={ttsOn ? 'Kai is speaking — click to mute' : 'Click to hear Kai speak'}
              className={`font-mono text-[0.6rem] tracking-widest uppercase transition-colors ${
                ttsOn ? 'text-ember' : 'text-tan hover:text-bark'
              }`}
              aria-label={ttsOn ? 'Mute Kai voice' : 'Enable Kai voice'}
            >
              {ttsOn ? '🔊 mute kai' : '🔇 hear kai'}
            </button>
          )}
          <button onClick={() => setModal('feedback')}
            className="font-mono text-[0.6rem] tracking-widest uppercase text-tan hover:text-bark transition-colors">
            Feedback
          </button>
        </div>

        {/* Kai orb — small, top-centre */}
        <div className="flex items-center justify-center flex-shrink-0 pt-1 pb-2">
          <KaiOrb state={orbState} size={orbSize} />
        </div>

        {/* Floating output */}
        <div className="min-h-[38vh] md:flex-1 md:min-h-0 w-full overflow-hidden relative">
          <FloatingOutput messages={messages} isWarmingUp={isWarmingUp} />
        </div>

        {/* Input */}
        <div className="w-full flex-shrink-0">
          <ChatInput onSend={sendMessage} isLoading={isLoading} isSending={isSending} />
        </div>

        {/* Disclaimer */}
        <p className="font-mono text-[0.5rem] text-tan text-center px-4 pb-1 flex-shrink-0">
          Kai is an AI wayfinder — not a counsellor or professional advisor ·{' '}
          <button onClick={() => setModal('about')} className="underline hover:text-bark">About</button>
        </p>
      </div>

      {/* ── RIGHT COLUMN — 20% — exchanges + backpack (desktop) ───── */}
      <div className="hidden md:flex flex-col w-[20%] border-l border-tan overflow-hidden">
        {/* Exchanges — top 3/5 */}
        <p className="font-mono text-[0.5rem] tracking-widest uppercase text-tan px-3 pt-3 pb-1 flex-shrink-0">
          Connections
        </p>
        <div className="flex-[3] overflow-y-auto scrollbar-hide px-2 pb-2 space-y-2 border-b border-tan min-h-0">
          {exchangeCards.length === 0 ? <EmptySideState label="Exchange possibilities will appear here once a sector is detected." /> : exchangeCards.map(card => (
            <PresentationCard key={card.id} card={card}
              onAddToBackpack={handleAddToBackpack}
              onNotNow={handleNotNow} onNotForMe={handleNotForMe} />
          ))}
        </div>
        {/* Backpack — bottom 2/5 */}
        <div className="flex-[2] overflow-hidden min-h-0">
          <BackpackPanel items={backpack} open={backpackOpen}
            onToggle={() => setBackpackOpen(o => !o)}
            onUpdateStatus={handleUpdateStatus}
            onClearSession={handleClearSession} />
        </div>
      </div>

      {/* ── MOBILE: cards stacked below chat ─────────────────────── */}
      <div className="md:hidden border-t border-tan">
        <p className="font-mono text-[0.5rem] tracking-widest uppercase text-tan px-3 pt-3 pb-1">Gifts &amp; Needs</p>
        <div className="px-3 pb-3 space-y-3">
          {giftCards.length === 0
            ? <EmptySideState label="Gifts and needs will appear as the conversation unfolds." />
            : giftCards.map(card => (
              <PresentationCard key={card.id} card={card}
                onAddToBackpack={handleAddToBackpack}
                onNotNow={handleNotNow} onNotForMe={handleNotForMe} />
            ))}
        </div>
        <div className="border-t border-tan">
          <p className="font-mono text-[0.5rem] tracking-widest uppercase text-tan px-3 pt-3 pb-1">Connections</p>
          <div className="px-3 pb-4 space-y-3">
            {exchangeCards.length === 0
              ? <EmptySideState label="Exchange possibilities will appear once a sector is detected." />
              : exchangeCards.map(card => (
                <PresentationCard key={card.id} card={card}
                  onAddToBackpack={handleAddToBackpack}
                  onNotNow={handleNotNow} onNotForMe={handleNotForMe} />
              ))}
          </div>
        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────── */}
      {modal && <ModalCard type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

function EmptySideState({ label }) {
  return (
    <p className="font-mono text-[0.55rem] text-tan leading-relaxed px-2 pt-2">{label}</p>
  );
}

function EmptyCardsState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-tan mb-3">
        Gifts &amp; connections
      </p>
      <p className="font-serif text-bark text-[0.9rem] leading-relaxed mb-2">
        As the conversation unfolds, gifts and possible connections will appear here.
      </p>
      <p className="font-mono text-[0.7rem] text-tan leading-relaxed italic">
        You can stop anytime. What you have is already yours.
      </p>
    </div>
  );
}

function generateLatentOptions(card) {
  const latents = {
    gift: [
      'A conversation starter for your next board meeting',
      'The frame for a funding submission narrative',
    ],
    story: [
      'A case study worth reaching out about',
      'A pattern that might apply to another challenge you have',
    ],
    exchange: [
      'A reason to have a coffee with someone in your network',
      'A joint proposal that neither of you could write alone',
    ],
  };
  return latents[card.type] || latents.gift;
}
