/* ----------------------------------------------------
   Kamunity Multiplayer Server  (Node + Socket.IO)
   ----------------------------------------------------
   • Run:  npm install express socket.io
           node server.js
   • Serves no HTML – it only maintains and broadcasts
     game state at ws://localhost:3000
----------------------------------------------------*/
const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: '*' } });

/* --------- Decks (very light) --------- */
const ideaDeck = [
  { title: 'Community Garden Blitz', description: 'Turn an empty lot into a veggie oasis.' },
  { title: 'Beach Plastic Cleanup',  description: 'Weekend swarm to clear micro‑plastics.' },
  { title: 'Repair Café',            description: 'Share tools & mend broken stuff together.' },
  { title: 'Youth Coding Club',      description: 'Teach Python basics at the library.' },
];
const resourceDeck  = ['Volunteer Crew','Tool Kit','Council Permit','Seed Funding','Media Buzz'];
const actionDeck    = [
  { t:'Prep Site',        i:2},
  { t:'Run Workshop',     i:3},
  { t:'Purchase Materials',i:1},
  { t:'Launch Campaign',  i:2},
  { t:'Host Event',       i:3},
];
const challengeDeck = [
  { t:'Rainy Weather',   p:1},
  { t:'Supplier Delay',  p:1},
  { t:'Volunteer No‑show',p:2},
];
const reviewDeck    = ['High‑Five Huddle','Retro Board','Story Post'];
const draw = deck => deck[Math.floor(Math.random() * deck.length)];

/* --------- Shared game state --------- */
const state = {
  phase: 'chat',
  project: null,
  resources: [],
  impact: 0,
  tokens: 0,
  actionsDone: 0,
  message: 'Waiting for someone to start a New Idea…',
  players: {}      // { socketId: { name } }
};

const broadcast = () => io.emit('state', state);

/* --------- Socket handlers --------- */
io.on('connection', sock => {
  /* player joins with a name */
  sock.on('join', name => {
    state.players[sock.id] = { name };
    broadcast();
  });

  sock.on('newIdea', () => {
    if (state.phase !== 'chat') return;
    state.phase   = 'plan';
    state.project = draw(ideaDeck);
    state.resources = [];
    state.impact     = 0;
    state.actionsDone= 0;
    state.message    = `Idea: ${state.project.title}. Collect 3 resources.`;
    broadcast();
  });

  sock.on('drawResource', () => {
    if (state.phase !== 'plan') return;
    const r = draw(resourceDeck);
    state.resources.push(r);
    state.message = `Resource: ${r} (${state.resources.length}/3)`;
    if (state.resources.length >= 3) {
      state.phase  = 'act';
      state.message= 'Resources ready! Do 3 actions.';
    }
    broadcast();
  });

  sock.on('doAction', () => {
    if (state.phase !== 'act') return;
    if (Math.random() < 0.25) {             // challenge appears
      const c = draw(challengeDeck);
      state.impact  = Math.max(0, state.impact - c.p);
      state.message = `Challenge: ${c.t} (-${c.p})`;
    } else {                                // normal action
      const a = draw(actionDeck);
      state.impact     += a.i;
      state.actionsDone++;
      state.message     = `Action: ${a.t} (+${a.i})`;
    }
    if (state.actionsDone >= 3) {
      state.phase   = 'review';
      state.message = 'All actions done! Click Review.';
    }
    broadcast();
  });

  sock.on('review', () => {
    if (state.phase !== 'review') return;
    state.phase   = 'reward';
    state.tokens  = state.impact;
    state.message = `You earned ${state.tokens} tokens!`;
    broadcast();
  });

  sock.on('reset', () => {
    state.phase   = 'chat';
    state.project = null;
    state.resources = [];
    state.impact     = 0;
    state.tokens     = 0;
    state.actionsDone= 0;
    state.message    = 'Waiting for a New Idea…';
    broadcast();
  });

  sock.on('disconnect', () => {
    delete state.players[sock.id];
    broadcast();
  });
});

/* --------- Kick it off --------- */
server.listen(3000, () =>
  console.log('⚡ Kamunity server listening on http://localhost:3000')
);
