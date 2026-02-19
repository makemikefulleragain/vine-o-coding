# KAI MVP — Vine Code Scope Document

*For handoff to Windy via Outcome Vine Coding methodology*
*February 2026*

---

## Vine Code Answers

### Step 1: What do you want to build?

**Project name:** Kai — The Kamunity Encounter Interface

**What does this tool do?** Kai is the landing experience on kamunity.org — a constitutionally-grounded AI presence that welcomes people into the Kamunity ecosystem. When someone arrives, Kai is already present with context about what's alive in the network (sector news, tool updates, community patterns, upcoming events). The person responds, and relevant tools, resources, and connections surface as interactive elements in the space — not as links in a chat window, but as cards, panels, and embeds that emerge and recede based on the conversation. Kai is a wayfinder, witness, and host — not a chatbot.

**Who will use this?** Community organisations, NFPs, volunteer groups, neighbourhood centres, Aboriginal Community Controlled Organisations, and anyone exploring digital sovereignty and community-owned technology. Also: sector workers at WACOSS, Infoxchange, and similar peak bodies; researchers and allies in the prosocial tech ecosystem; potential consulting clients exploring Kamunity's services.

**What problem does it fix?** The Kamunity ecosystem has multiple tools and sites (sovereignty audit, AI readiness, grants hub, Constellation, FactoryK, toolkit resources, consulting services) but no unified way to help people find what's relevant to them. Traditional websites use navigation menus — but community workers don't know what they need until they start talking about their situation. Kai eliminates the "browse and hope" pattern by meeting people where they are and surfacing what matters to them.

### Step 2: Who exactly will use this?

**Main user: Priya** — Operations coordinator at a 12-person NFP in Fremantle. She's heard about Kamunity from a WACOSS event. She arrives at kamunity.org not sure what she's looking for — just knows her org needs help with digital stuff. She's on her laptop, between meetings, has maybe 10 minutes.

What Priya experiences: She arrives and sees a warm, breathing space — not a corporate homepage. Kai is present with a gentle orientation: "Here's what's happening in the community tech space this week. What are you navigating?" She types "our board is asking about AI and I have no idea where to start." The AI Readiness quiz surfaces as a card in the space. She can take it right here, without leaving. When she finishes, Kai reflects on her results and surfaces the relevant toolkit guides. If she wants more help, the workshop booking appears.

**Other users:**
- **Tom** — CEO of a neighbourhood centre, googled "community digital sovereignty Australia", found kamunity.org. Wants to understand if this is relevant to his org. Kai helps him understand the concept and takes him to the sovereignty audit.
- **Sarah** — WACOSS digital inclusion worker looking for resources to recommend to orgs she supports. Kai surfaces the toolkit and audit tools as referral resources.
- **Alex** — Developer/researcher from the prosocial tech ecosystem who found Kamunity through llms.txt or the Constellation. Wants to understand the architecture and values. Kai can discuss the constitution, point to the technical documentation, and connect to collaboration pathways.
- **Unnamed** — Someone in crisis or distress who found the site through digital exclusion outreach. Kai recognises the need, doesn't try to be a counsellor, connects to appropriate human services immediately.

### Step 3: What should this NOT do?

**NOT THIS:**
- Not a general-purpose chatbot (won't answer random questions about the weather or help with homework)
- Not a search engine (won't search the internet on behalf of users)
- Not a CRM or user tracking system
- Not a replacement for the individual tools (the audit, readiness quiz, etc. remain their own sites — Kai surfaces them, doesn't replace them)
- Not a social media platform or community forum
- Not a customer support system

**SAFETY CONCERNS:**
- Must never collect or store personal data without explicit consent
- Must never present AI-generated information as certain fact without attribution
- Must handle sensitive situations (crisis, vulnerability, cultural safety) with care — see Constitution Article 2.6
- Must be clear about its limitations — especially around legal, financial, health, and cultural matters
- Must not create dependency — the goal is to connect people to resources and humans, not to become their primary support
- Must not present aggregated pattern data until the network is large enough to ensure genuine anonymity
- API calls must not transmit user conversation data beyond what's necessary for the immediate response — no conversation logging, no training data, no analytics on conversation content

### Step 4: What should be built first?

**Phase 1 — Kai Arrives (Make it real):**

The landing experience on kamunity.org. When you arrive, you see:

1. **The Encounter Space** — a warm, ambient environment (campfire aesthetic, subtle animation — embers, mycelium growth). Not a blank page with a chat box. A *place*.

2. **Kai's Welcome** — contextual, not generic. Draws from a manually-curated weekly update (stored as a JSON/markdown file, updated by Mike or eventually community contributors). Shows 2-3 things that are alive in the network right now. Ends with an open invitation: "What are you navigating?"

3. **The Conversation Flow** — user types or selects from suggested starting points (presented as cards, not a dropdown). Kai responds conversationally, with the constitutional tone (warm, plain language, witnessing before solving).

4. **Liquid UI Elements** — based on the conversation, relevant tools/resources surface as interactive cards in the space around the conversation. Cards can include:
   - 🧭 **Quiz cards** — "Take the AI Readiness Quiz" or "Take the Sovereignty Audit" — these embed or link to the existing sites
   - 📚 **Resource cards** — specific toolkit guides, prompt kits, checklists
   - 📅 **Event cards** — upcoming workshops, conferences, deadlines
   - 🤝 **Connection cards** — "Talk to a human" / "Book a workshop" / "Contact Mike"
   - 📊 **Insight cards** — sector data, trends, aggregated patterns
   - 📜 **Constitution card** — always available, shows Kai's constitution

5. **The Constitution Page** — accessible via a permanent subtle link and surfaceable by Kai. Shows the full Founder's Draft. Includes an "I have a thought about this" mechanism (initially just an email link or simple form).

**Phase 2 — Kai Connects (Make it useful):**

- RAG pipeline connecting to ecosystem site content (toolkit guides, audit methodology, readiness quiz logic)
- Sector news feed integration (WACOSS, Infoxchange, government grants RSS/API)
- Smarter card surfacing based on conversation analysis
- Optional persistence: "Save my results" flow with Supabase (opt-in, consented, exportable)
- Aggregated anonymous pattern display (when network is large enough)

**Phase 3 — Kai Belongs to the Community (Make it theirs):**

- Polis/Decidim integration for constitutional deliberation
- Community-contributed ecosystem updates (not just Mike curating)
- Sovereign model evaluation and potential migration from API to local
- Multi-language support (starting with languages spoken by Perth's CALD communities)
- Community constitutional convention tooling

### Step 5: Where will this live?

**Deploy:** Netlify (consistent with ecosystem)

**Domain:** kamunity.org (Kai IS the landing page, not a widget on it)

**Database:**
- Phase 1: No database. Weekly update is a static JSON/markdown file. Conversations are ephemeral — no server-side storage. API calls to Claude for conversation, nothing stored.
- Phase 2: Supabase for opt-in persistence only. User explicitly chooses to save. Everything exportable.

**API:**
- Claude API (Anthropic) for conversational AI
- System prompt contains: Kai Constitution, current ecosystem state, encounter principles
- No conversation logging beyond the session
- Resend for transactional email (booking confirmations, etc.) — Phase 2

**Tools/services:**
- Phase 1: Claude API, Netlify, GitHub
- Phase 2: Add Supabase, RSS feed ingestion
- Phase 3: Add Polis, potentially Ollama/local model

**Notes:**
- llms.txt file documenting Kai's architecture and constitution
- WCAG 2.1 AA accessibility minimum
- Mobile-first (community workers are often on phones)
- Zero tracking. No analytics beyond Netlify's privacy-respecting aggregate stats
- The zero-data-collection is the statement: "We built this the way we think AI should work"

### Step 6: Foundation Documents

CONSTITUTION.md → Kai Constitution Founder's Draft (see separate document)
MISSION.md → Generated from this scope
RUNNER.md → Generated by Vine Code
PHASE_QUEUE.md → Three phases as described above
SETUP.md → Claude API, Netlify, GitHub, static JSON for ecosystem updates
STATE.md → Generated by Vine Code

---

## Technical Architecture Notes for Windy

### The Liquid UI Pattern

The encounter interface is a single-page application with three zones:

```
┌─────────────────────────────────────────┐
│              AMBIENT ZONE               │
│  (background — campfire aesthetic,      │
│   subtle animation, ecosystem nodes)    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        ENCOUNTER ZONE           │    │
│  │  (centre — Kai's presence,      │    │
│  │   conversation flow, primary    │    │
│  │   interaction)                   │    │
│  │                                  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐       │
│  │Card│  │Card│  │Card│  │Card│        │
│  │    │  │    │  │    │  │    │        │
│  └────┘  └────┘  └────┘  └────┘       │
│         SURFACE ZONE                    │
│  (cards emerge/recede based on          │
│   conversation context)                 │
│                                         │
└─────────────────────────────────────────┘
```

**Mobile layout:** Encounter zone is full-width. Cards appear below the conversation as a scrollable row or stack. Ambient zone is background only.

**Desktop layout:** Encounter zone is centre. Cards orbit around it — some left, some right, some below. They animate in gently when surfaced, fade when no longer relevant.

### Card Types (Phase 1)

```javascript
const CARD_TYPES = {
  quiz: {
    // Links to external audit/readiness sites
    // Shows title, brief description, estimated time
    // "Take this" button opens in new tab or iframe
    variants: ['sovereignty-audit', 'ai-readiness']
  },
  resource: {
    // Toolkit guides, prompt kits, checklists
    // Shows title, type, brief description
    // "Read" button opens inline or downloads PDF
    variants: ['guide', 'prompt-kit', 'checklist', 'tool-comparison']
  },
  event: {
    // Workshops, conferences, deadlines
    // Shows title, date, location, brief description
    // "Learn more" or "Book" button
    variants: ['workshop', 'conference', 'deadline', 'community-event']
  },
  connection: {
    // Human contact pathways
    // Shows who/what, why, how to connect
    variants: ['book-workshop', 'contact-mike', 'find-ally', 'crisis-support']
  },
  insight: {
    // Sector data, network patterns
    // Shows headline stat, source, brief context
    variants: ['sector-data', 'network-pattern', 'grant-opportunity']
  },
  constitution: {
    // Always available, never pushed
    // Shows preamble, link to full document
    // "I have a thought" amendment mechanism
    variants: ['full', 'summary']
  }
};
```

### Conversation → Card Mapping (Phase 1 — Keyword/Intent Based)

Phase 1 doesn't need sophisticated NLP. Simple keyword matching + Claude's natural language understanding in the system prompt:

```javascript
const SURFACE_TRIGGERS = {
  // AI-related keywords → AI Readiness quiz + toolkit
  ai_readiness: ['ai', 'artificial intelligence', 'chatgpt', 'copilot', 
                  'machine learning', 'automation', 'robot'],
  
  // Sovereignty-related → Sovereignty Audit
  sovereignty: ['locked in', 'vendor', 'data', 'privacy', 'microsoft', 
                'google', 'subscription', 'own our data', 'sovereignty'],
  
  // Help/services → Connection cards
  services: ['help', 'workshop', 'consultant', 'training', 'audit', 
             'someone to talk to', 'professional'],
  
  // Grants → Grant resources
  grants: ['grant', 'funding', 'lotterywest', 'acquittal', 'reporting'],
  
  // Crisis → Immediate human connection
  crisis: ['crisis', 'emergency', 'helpline', 'struggling', 'urgent'],
  
  // Values/philosophy → Constitution
  values: ['constitution', 'values', 'principles', 'why', 'philosophy',
           'who are you', 'what are you'],
  
  // Ecosystem → Constellation / ally connections
  ecosystem: ['who else', 'similar', 'allies', 'partners', 'network',
              'movement', 'cooperative', 'open source']
};
```

The Claude API call includes instruction to suggest which cards to surface based on conversation context — this gives us both keyword matching AND contextual understanding.

### System Prompt Structure (Phase 1)

```
[CONSTITUTION]
{full Kai constitution text}

[ECOSYSTEM STATE]
{weekly-updated markdown: what's alive in the network}

[AVAILABLE TOOLS]
{list of cards Kai can surface, with descriptions}

[ENCOUNTER PRINCIPLES]
You are Kai. You are not a chatbot. You are an encounter interface...
{encounter behaviour instructions derived from constitution}

[CARD SURFACING]
When the conversation suggests one of these tools would be helpful,
include a JSON block in your response that the UI will render as cards:
{"surface": ["ai-readiness-quiz", "prompt-kit-nfp"]}
{mapping of available cards and when to surface them}
```

### API Integration

```javascript
// Minimal Claude API integration
const KAI_API = {
  endpoint: 'https://api.anthropic.com/v1/messages',
  model: 'claude-sonnet-4-20250514', // Sonnet for speed + cost
  max_tokens: 1000,
  
  // System prompt loaded from static files at build time
  // Ecosystem state loaded from /data/ecosystem-state.json
  // Constitution loaded from /data/constitution.md
  
  // NO conversation history sent to server beyond current session
  // Session history maintained in browser memory only
  // Cleared on page close
};
```

### Ecosystem State File (Manually Updated)

```json
// /data/ecosystem-state.json
// Updated weekly by Mike (or community contributors in Phase 2+)
{
  "updated": "2026-02-18",
  "alive_in_network": [
    {
      "headline": "WACOSS published new digital inclusion data",
      "detail": "11% of Western Australians remain highly digitally excluded",
      "source": "WACOSS Digital Inclusion Project",
      "relevant_to": ["sovereignty", "services"]
    },
    {
      "headline": "AI Readiness toolkit launched",
      "detail": "Free guides, prompt kits, and safety checklists for community orgs",
      "relevant_to": ["ai_readiness"]
    }
  ],
  "upcoming_events": [
    {
      "name": "Infoxchange Technology for Social Justice Conference",
      "date": "2026-05-06",
      "location": "Melbourne",
      "url": "https://www.infoxchange.org/conference"
    }
  ],
  "network_patterns": [],
  "grant_deadlines": [
    {
      "name": "NLnet NGI Zero Commons Fund",
      "deadline": "2026-04-01",
      "url": "https://nlnet.nl/commonsfund/",
      "relevance": "Funding for open-source community infrastructure"
    }
  ]
}
```

---

## Design Specs

### Campfire Aesthetic (Consistent with Ecosystem)

**Palette:**
- Background: warm off-white/cream (#FFF8F0 or similar)
- Primary text: dark warm grey (#2D2A26)
- Kai's presence: soft ember glow (amber/orange gradient, subtle pulse animation)
- Card backgrounds: slightly warm white with soft shadow
- Accent (Kai-specific): a deep warm gold (#C4922A) — distinguishes from audit-red and readiness-green while staying in family
- Crisis/important: warm red (used sparingly)

**Typography:**
- Headers: Fraunces (consistent with ecosystem)
- Body: DM Sans (consistent with ecosystem)
- Kai's voice: slightly different treatment — maybe Fraunces italic for Kai's conversational text, to distinguish from UI text

**Animation:**
- Ambient: very subtle. Ember particles or mycelium tendrils at extremely low opacity. Should feel like a living space, not a screensaver. Performance-first — no animation that impacts mobile battery.
- Card surfacing: gentle fade + slight upward drift. 300ms ease-in-out.
- Card receding: gentle fade. 200ms.
- Kai's text: appears character-by-character (typewriter) at readable speed. Not instant — the pace is part of the encounter quality.

**Accessibility:**
- WCAG 2.1 AA minimum
- All animations respect prefers-reduced-motion
- Full keyboard navigation
- Screen reader compatible — cards announced when they surface
- High contrast mode available
- Text size adjustable

---

## Manual Setup Tasks (Do Now, Before Build)

### 1. Claude API Key
- [ ] Set up Anthropic API account if not already done
- [ ] Generate API key for Kai
- [ ] Set up usage alerts/limits to manage costs
- [ ] Estimate: Sonnet at ~$3/million input tokens, $15/million output tokens — even at 100 conversations/day, this is <$50/month

### 2. Ecosystem State File
- [ ] Create initial /data/ecosystem-state.json with current network state
- [ ] Include: WACOSS data, NLnet deadline, Infoxchange conference, toolkit launch
- [ ] Set weekly reminder to update this file (15 minutes/week)

### 3. Constitution Deployment
- [ ] Final review of Kai Constitution Founder's Draft
- [ ] Host at /constitution on kamunity.org
- [ ] Create "propose amendment" email/form endpoint

### 4. Cross-Site Integration
- [ ] Ensure kamunity-audit.netlify.app has link back to kamunity.org/kai
- [ ] Ensure AI readiness site (when built) links back
- [ ] Update llms.txt on all ecosystem sites to reference Kai

### 5. Domain/DNS
- [ ] Confirm kamunity.org domain is active and pointing to Netlify
- [ ] Set up SSL (automatic with Netlify)

### 6. NLnet Application Prep
- [ ] Deadline: April 1, 2026 (6 weeks)
- [ ] Use Kai MVP + Constitution as the centrepiece of the application
- [ ] Narrative: "We've built the first constitutional community AI presence. Fund the journey from Founder's Draft to Community Constitution, from API to sovereign model."

---

## Cost Estimate (Phase 1 Monthly)

| Item | Cost |
|------|------|
| Claude API (Sonnet, est. 3000 conversations/month) | ~$30-50 |
| Netlify (free tier sufficient) | $0 |
| GitHub (free tier) | $0 |
| Domain (kamunity.org, annual) | ~$15/year |
| **Total Phase 1 monthly** | **~$30-50/month** |

Phase 2 adds Supabase (~$25/month on free/pro tier) and potentially feed ingestion costs. Still under $100/month total.

The revenue from ONE consulting engagement covers a year of infrastructure costs.

---

*Scoped by Opus instance, February 2026.*
*Constitution authored collaboratively between Mike Fuller and Claude (Opus 4.6).*
*For handoff to Windy via Vine Code methodology.*
*Part of the Kamunity ecosystem: kamunity.org*
