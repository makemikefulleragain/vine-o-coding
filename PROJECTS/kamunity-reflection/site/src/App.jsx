import React, { useState, useCallback, useEffect } from 'react';
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

      if (kaiMsg.cards.length > 0) {
        setCards(prev => [...prev, ...kaiMsg.cards]);
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
  }, [isLoading, messages]);

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

  const orbSize = window.innerWidth < 768 ? 140 : 220;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-parchment overflow-hidden">

      {/* ── KAI SIDE ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center relative flex-1 md:w-[55%] h-1/2 md:h-full overflow-hidden">

        {/* Top nav strip */}
        <div className="w-full flex justify-between items-center px-5 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={() => setModal('about')}
            className="font-mono text-[0.6rem] tracking-widest uppercase text-tan hover:text-bark transition-colors"
          >
            Kamunity · Reflection
          </button>
          <button
            onClick={() => setModal('feedback')}
            className="font-mono text-[0.6rem] tracking-widest uppercase text-tan hover:text-bark transition-colors"
          >
            Feedback
          </button>
        </div>

        {/* Orb — centred in available space */}
        <div className="flex items-center justify-center flex-shrink-0 py-4">
          <KaiOrb state={orbState} size={orbSize} />
        </div>

        {/* Floating text output — grows upward, fills middle space */}
        <div className="flex-1 w-full overflow-hidden relative">
          <FloatingOutput messages={messages} isWarmingUp={isWarmingUp} />
        </div>

        {/* Input anchored to bottom of kai side */}
        <div className="w-full flex-shrink-0">
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            isSending={isSending}
          />
        </div>

        {/* Disclaimer */}
        <p className="font-mono text-[0.55rem] text-tan text-center px-4 pb-2 flex-shrink-0">
          Kai is an AI wayfinder — not a counsellor or professional advisor · <button onClick={() => setModal('about')} className="underline hover:text-bark">About</button>
        </p>
      </div>

      {/* ── CARDS SIDE ───────────────────────────────────────────── */}
      <div className="flex flex-col border-t md:border-t-0 md:border-l border-tan md:w-[45%] h-1/2 md:h-full overflow-hidden">

        {/* Cards scroll area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
          {cards.length === 0 ? (
            <EmptyCardsState />
          ) : (
            cards.map(card => (
              <PresentationCard
                key={card.id}
                card={card}
                onAddToBackpack={handleAddToBackpack}
                onNotNow={handleNotNow}
                onNotForMe={handleNotForMe}
              />
            ))
          )}
        </div>

        {/* Backpack anchored to bottom of cards side */}
        <div className="flex-shrink-0 border-t border-tan">
          <BackpackPanel
            items={backpack}
            open={backpackOpen}
            onToggle={() => setBackpackOpen(o => !o)}
            onUpdateStatus={handleUpdateStatus}
            onClearSession={handleClearSession}
          />
        </div>
      </div>

      {/* ── MODALS ───────────────────────────────────────────────── */}
      {modal && (
        <ModalCard type={modal} onClose={() => setModal(null)} />
      )}
    </div>
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
