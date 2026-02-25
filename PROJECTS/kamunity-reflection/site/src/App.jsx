import React, { useState, useCallback, useEffect } from 'react';
import KaiOrb from './components/KaiOrb.jsx';
import ChatInput from './components/ChatInput.jsx';
import FloatingOutput from './components/FloatingOutput.jsx';
import BackpackPanel from './components/BackpackPanel.jsx';
import LandingPage from './components/LandingPage.jsx';
import ModalCard from './components/ModalCard.jsx';
import { OPENING_MESSAGE } from './data/questions.js';

const SESSION_KEY = 'kamunity-reflection-backpack';

const BANNED_PHRASES = [
  /\bI see[,.]?\b/gi,
  /\bAh[,]? I see[,.]?\b/gi,
  /\bThat makes sense[,.]?\b/gi,
  /\bThat's a great question[,.]?\b/gi,
  /\bYou're absolutely right[,.]?\b/gi,
  /\bDoes this resonate\??\b/gi,
  /\bI commend you[,.]?\b/gi,
  /\bsuch important work\b/gi,
  /\bimportant work[,.]?\b/gi,
  /\bIt's a pleasure[,.]?\b/gi,
  /\bThat's powerful[,.]?\b/gi,
  /\bGreat insight[,.]?\b/gi,
  /\bWonderful[,.]?\b/gi,
];

function sanitiseKaiResponse(data) {
  let { message = '', cards = [] } = data;

  // Extract any JSON card objects leaked into the message text
  const cardPattern = /\{[^{}]*"type"\s*:\s*"(?:gift|story|exchange)"[^{}]*\}/g;
  const leaked = [];
  message = message.replace(cardPattern, (match) => {
    try {
      const card = JSON.parse(match);
      if (card.id && card.type) leaked.push(card);
    } catch { /* malformed — leave stripped */ }
    return '';
  });
  if (leaked.length > 0) cards = [...cards, ...leaked];

  // Strip banned phrases
  for (const pattern of BANNED_PHRASES) {
    message = message.replace(pattern, '');
  }

  // Collapse multiple spaces/newlines left by stripping
  message = message.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

  // Truncate to 60 words at a sentence boundary
  const words = message.split(/\s+/);
  if (words.length > 60) {
    const truncated = words.slice(0, 60).join(' ');
    // Find last sentence-ending punctuation within the truncated text
    const sentenceEnd = truncated.search(/[.!?][^.!?]*$/);
    message = sentenceEnd > 20 ? truncated.slice(0, sentenceEnd + 1) : truncated;
  }

  return { message, cards };
}

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
  // UI state: 'landing' | 'act1' | 'act2'
  const [uiState, setUiState]         = useState('landing');
  const [orbState, setOrbState]       = useState('idle');
  const [messages, setMessages]       = useState([OPENING_MESSAGE]);
  // Cards held during act1, released to backpack on fork transition
  const [heldCards, setHeldCards]     = useState([]);
  // Backpack: newCards (unactioned) + savedItems (thanked)
  const [newCards, setNewCards]       = useState([]);
  const [savedItems, setSavedItems]   = useState(loadBackpack);
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [modal, setModal]             = useState(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [isSending, setIsSending]     = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [ttsOn, setTtsOn]             = useState(false);
  const [conversationPhase, setConversationPhase] = useState('identity');
  const [showFork, setShowFork]       = useState(false);

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

  useEffect(() => { saveBackpack(savedItems); }, [savedItems]);

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
          phase: conversationPhase,
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);
      const raw = await response.json();
      const data = sanitiseKaiResponse(raw);

      setIsWarmingUp(false);
      setOrbState('speaking');

      const kaiMsg = {
        role: 'assistant',
        content: data.message || 'Something came up on my end. Could you say that again?',
        cards: data.cards || [],
      };

      setMessages(prev => [...prev, kaiMsg]);

      if (ttsOn) speakText(kaiMsg.content);

      // Handle cards: hold during act1, release on fork
      if (kaiMsg.cards.length > 0) {
        if (conversationPhase === 'identity') {
          // Hold cards — they'll be revealed as Christmas morning on fork transition
          setHeldCards(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const fresh = kaiMsg.cards.filter(c => !existingIds.has(c.id));
            return fresh.length > 0 ? [...prev, ...fresh] : prev;
          });
        } else {
          // Act 2: cards go straight to newCards in backpack
          setNewCards(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const fresh = kaiMsg.cards.filter(c => !existingIds.has(c.id));
            return fresh.length > 0 ? [...prev, ...fresh] : prev;
          });
        }
      }

      // If Kai signals the fork, show path choice UI
      if (raw.fork === true && conversationPhase === 'identity') {
        setShowFork(true);
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
  }, [isLoading, messages, ttsOn, conversationPhase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleForkChoice = useCallback((choice) => {
    setConversationPhase(choice);
    setShowFork(false);
    setUiState('act2');
    // Christmas morning: release all held cards to the backpack newCards
    setNewCards(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const fresh = heldCards.filter(c => !existingIds.has(c.id));
      return fresh.length > 0 ? [...prev, ...fresh] : prev;
    });
    setHeldCards([]);
    // Open backpack automatically so they see what's waiting
    setBackpackOpen(true);
    // Bridge message
    const bridgeMsg = choice === 'relational'
      ? { role: 'assistant', content: 'Let’s go deeper. What thread from what you shared feels most unresolved?', cards: [] }
      : { role: 'assistant', content: 'Let’s find who’s worth talking to. From what you shared — what’s the thing you most need right now that you don’t have?', cards: [] };
    setMessages(prev => [...prev, bridgeMsg]);
    if (ttsOn) speakText(bridgeMsg.content);
  }, [ttsOn, heldCards]);

  // Backpack handlers
  const handleSave = useCallback((card) => {
    setSavedItems(prev => {
      if (prev.find(i => i.id === card.id)) return prev;
      return [...prev, { ...card, savedAt: Date.now() }];
    });
    setNewCards(prev => prev.filter(c => c.id !== card.id));
  }, []);

  const handleNotNow = useCallback((cardId) => {
    setNewCards(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const handleNotForMe = useCallback((cardId) => {
    setNewCards(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const handleDone = useCallback((id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleDontNeed = useCallback((id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const orbSize = window.innerWidth < 768 ? 60 : 50;

  // ── LANDING ────────────────────────────────────────────────────
  if (uiState === 'landing') {
    return (
      <>
        <LandingPage
          onStart={() => setUiState('act1')}
          onAbout={() => setModal('about')}
        />
        {modal && <ModalCard type={modal} onClose={() => setModal(null)} />}
      </>
    );
  }

  // ── SHARED CHAT AREA (act1 + act2) ─────────────────────────────
  const chatArea = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Nav */}
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
            className={`font-mono text-[0.6rem] tracking-widest uppercase transition-colors ${ttsOn ? 'text-ember' : 'text-tan hover:text-bark'}`}
            aria-label={ttsOn ? 'Mute Kai voice' : 'Enable Kai voice'}
          >
            {ttsOn ? '🔊 mute' : '🔇 hear kai'}
          </button>
        )}
        <button onClick={() => setModal('feedback')}
          className="font-mono text-[0.6rem] tracking-widest uppercase text-tan hover:text-bark transition-colors">
          Feedback
        </button>
      </div>

      {/* Orb */}
      <div className="flex items-center justify-center flex-shrink-0 pt-1 pb-2">
        <KaiOrb state={orbState} size={orbSize} />
      </div>

      {/* Chat output */}
      <div className="flex-1 min-h-0 w-full overflow-hidden relative">
        <FloatingOutput messages={messages} isWarmingUp={isWarmingUp} />
      </div>

      {/* Input or Fork */}
      <div className="w-full flex-shrink-0">
        {showFork ? (
          <div className="flex flex-col items-center gap-3 px-6 py-5">
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-tan text-center">
              Two paths from here
            </p>
            <button
              onClick={() => handleForkChoice('relational')}
              className="w-full max-w-sm px-5 py-3 bg-parchment border border-bark rounded-xl font-serif text-bark text-sm leading-snug hover:bg-bark hover:text-parchment transition-colors text-left"
            >
              <span className="block font-mono text-[0.55rem] tracking-widest uppercase text-ember mb-1">Sit with this</span>
              Help me understand what this means for us
            </button>
            <button
              onClick={() => handleForkChoice('practical')}
              className="w-full max-w-sm px-5 py-3 bg-parchment border border-bark rounded-xl font-serif text-bark text-sm leading-snug hover:bg-bark hover:text-parchment transition-colors text-left"
            >
              <span className="block font-mono text-[0.55rem] tracking-widest uppercase text-ember mb-1">Find who to talk to</span>
              Help me find the right connections in WA
            </button>
            <a
              href="https://kamunity.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-wide text-ember border border-ember/30 rounded-full px-3 py-1.5 hover:bg-ember/10 hover:border-ember/60 transition-colors no-underline mt-1"
            >
              <span>🔥</span>
              <span>Explore the full Kamunity ecosystem</span>
              <span className="opacity-60">↗</span>
            </a>
          </div>
        ) : (
          <ChatInput onSend={sendMessage} isLoading={isLoading} isSending={isSending} />
        )}
      </div>

      {/* Disclaimer */}
      <p className="font-mono text-[0.5rem] text-tan text-center px-4 pb-1 flex-shrink-0">
        Kai is an AI wayfinder — not a counsellor or professional advisor ·{' '}
        <button onClick={() => setModal('about')} className="underline hover:text-bark">About</button>
      </p>
    </div>
  );

  // ── ACT 1: full-width chat, no backpack ─────────────────────────
  if (uiState === 'act1') {
    return (
      <div className="h-screen bg-parchment flex flex-col overflow-hidden">
        {chatArea}
        {modal && <ModalCard type={modal} onClose={() => setModal(null)} />}
      </div>
    );
  }

  // ── ACT 2: 4/5 chat + 1/5 backpack trigger ─────────────────────
  return (
    <div className="h-screen bg-parchment flex overflow-hidden">
      {/* Chat — 4/5 */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {chatArea}
      </div>

      {/* Backpack trigger strip — 1/5, max 80px */}
      <div className="flex-shrink-0 overflow-hidden" style={{ width: 'clamp(48px, 8vw, 80px)' }}>
        <BackpackPanel
          newCards={newCards}
          savedItems={savedItems}
          open={backpackOpen}
          onToggle={() => setBackpackOpen(o => !o)}
          onSave={handleSave}
          onNotNow={handleNotNow}
          onNotForMe={handleNotForMe}
          onDone={handleDone}
          onDontNeed={handleDontNeed}
        />
      </div>

      {modal && <ModalCard type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
