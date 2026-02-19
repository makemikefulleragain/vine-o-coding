# WHO THIS SERVES
## People, Personas & The Triad
### Last Updated: Feb 19, 2026

*This document answers: Who are we building for? Who operates the system? Who must never be harmed?*

---

## The Primary User: Priya

**Priya** — Operations coordinator at a 12-person NFP in Fremantle. She's the unofficial tech person because she's the most comfortable with computers. She's heard about AI at conferences but hasn't done anything with it yet. Her CEO just asked "should we be using AI?" and she doesn't know how to answer.

She's on her laptop between meetings, has maybe 15 minutes right now.

### What Priya needs:
- A quick way to understand where her org stands on AI readiness
- Practical guidance, not theory
- Tools that respect her time (2-minute quiz, not a 2-hour consultation)
- Resources she can take to her board
- Someone to point her to when she needs more help
- Zero jargon. Plain language. No dark patterns.

### The Priya Test
Every feature, every tool, every encounter: **"Does this serve Priya?"**
If no → why are we building it?
If yes → how quickly can Priya find it and use it?

---

## Secondary Users

| Persona | Context | What They Need |
|---|---|---|
| **Board members** | Want to understand AI risk for governance | Clear risk framing, not tech detail |
| **CEOs of small orgs** | Making technology decisions | Honest options, not vendor pitches |
| **Volunteer coordinators** | Staff using ChatGPT, unsure if OK | Practical policy guidance |
| **Grant managers** | Wondering if AI helps with reporting | Specific tools, not general advice |
| **WACOSS digital inclusion workers** | Looking for training resources to recommend | Curated, free, sector-appropriate |
| **ALIKE member orgs** | Disability sector, WCAG matters | Accessible tools, no dark patterns |
| **Community org staff generally** | Overwhelmed by AI hype | Calm, practical, values-aligned starting point |

---

## Anti-Personas (Who This Is NOT For)

| Anti-persona | Why they don't belong here |
|---|---|
| Tech startups looking for AI tools | They have resources; Kamunity serves those who don't |
| Enterprise IT teams | They have procurement processes; Priya has a laptop |
| People seeking therapy or counselling | Kai is a wayfinder, not a therapist. Redirect to humans. |
| AI vendors looking for sales channels | Kamunity is vendor-neutral by constitution |
| Bad actors building scam tools | Trust mark system and constitutional guardrails exist to exclude |

---

## The Operator: Mike

**Mike Fuller** — Sole operator. Facilitator. Builder. The single point of failure (acknowledged risk).

### Mike's context:
- Building Kamunity solo with AI assistance
- Based in Perth, WA (Whadjuk Noongar boodja)
- Pre-revenue — consulting pipeline opening
- Getting married (wedding planning is a live dogfooding project)
- WALGA project in progress (live consulting test case)
- Multiple meetings imminent (ALIKE, Activate MH, AI Speaker)
- Burnout risk is HIGH (acknowledged in risk register)

### What Mike needs from the system:
- Full context in every AI session without re-explaining
- A single place to see what's urgent, what's blocked, what's next
- Task tracking that doesn't become another burden
- A weekly rhythm that keeps things fresh without drowning
- AI assistance that proposes and Mike approves (not the other way around)

---

## The AI Triad

Three AI roles, same brain (BRAIN/), different scope:

### Kai Wayfinder (Public-facing)

| Attribute | Detail |
|---|---|
| **Lives on** | kamunity.org |
| **Reads** | BRAIN/ + KNOWLEDGE/ (public-safe subset only) |
| **Knows** | Ecosystem, sites, services, community context |
| **Job** | Connect people to the right tools, resources, humans |
| **Tone** | Warm, boundaried, honest |
| **Says** | "Here's what exists and how to find it" |
| **Never says** | "I care about you" / "Tell me more about how you feel" |
| **Never sees** | Ally strategy, financial state, internal gaps, decision log |
| **API** | Anthropic Claude (Sonnet) |
| **Budget** | $50/month cap |

### Kai Waymaker (Internal operational)

| Attribute | Detail |
|---|---|
| **Lives on** | Private interface (Kitchen Table / CLI / chat) |
| **Reads** | BRAIN/ + PLAN/ + KNOWLEDGE/ + ENGINE/ (full system) |
| **Knows** | Everything Wayfinder knows PLUS: roadmap, phase queue, task status, ally outreach strategy, grant deadlines, safety gates, decision history, financial state |
| **Job** | Help plan, prioritise, draft, review, track. AI co-pilot for the solo operator. |
| **Tone** | Direct, strategic, action-oriented |
| **Says** | "Here's what's next and why" |
| **Processes** | Meeting transcripts → structured data → routed to correct Kitchen Table zone |
| **API** | Anthropic Claude (Sonnet) |
| **Budget** | Shared $50/month cap with Wayfinder |

### Cascade (Builder)

| Attribute | Detail |
|---|---|
| **Lives in** | Windsurf IDE |
| **Reads** | Current project context + BRAIN/ when directed |
| **Knows** | Code, architecture, file systems |
| **Job** | Build code, draft docs, audit systems |
| **Tone** | Terse, technical, precise |
| **Relationship** | Waymaker tells Cascade what to build. Cascade builds it. Mike approves. |
| **Cost** | IDE subscription (no additional API cost) |

### How They Interact

```
Community Person → Kai Wayfinder → connects to tools/humans
                                         ↑
Mike + Kai Waymaker → plan + prioritise + track
                ↓
         Cascade → build code + draft docs
                ↓
         Live tools ← Wayfinder serves these to community
```

**The key insight:** Wayfinder and Waymaker are the same API with different system prompts reading different document scopes. Cascade is a separate system (Windsurf) that does the building work. All three read the same BRAIN/ — it's the shared understanding.

---

## The Ally Network (Constellation)

16 allies mapped. 3 tiers:

### Tier 1 — Strategic (Active engagement)
| Ally | Sector | Status |
|---|---|---|
| ALIKE WA | Disability peak body | Meeting next week |
| Activate Mental Health | MH board opportunity | Interview next week |
| International AI Speaker | AI training + coder community | Meeting next week |
| WACOSS | Community services ($3.9M Digital Inclusion) | To contact |
| Linkwest | 140+ neighbourhood centres | To contact |
| Spacecubed | Innovation hub + workshops | To contact |
| Bonfire Networks | Federated platform (international) | To contact |
| Hypha Worker Co-op | Cooperative AI (international) | To contact |

### Tier 2 — Mapped (Future engagement)
| Ally | Sector |
|---|---|
| Infoxchange | National tech-for-justice (conference May) |
| Shelter WA | Housing/homelessness |
| YACWA | Youth affairs |
| WAAMH | Mental health |
| ECCWA | Ethnic communities |
| Carers WA | Carer support |
| Volunteering WA | Volunteering |
| Trebor Scholz / PCC | Platform cooperativism (international) |

---

## Vulnerable Populations (Must Never Be Harmed)

These people will find their way to Kamunity's tools. The system must be designed for them:

- People in mental health crisis
- People experiencing family/domestic violence
- People experiencing homelessness
- Aboriginal and Torres Strait Islander community members (history of surveillance and data extraction)
- CALD community members (language barriers, cultural differences)
- People with disabilities (accessibility is constitutional, not optional)
- People with low digital literacy
- Children and young people (Kids Helpline included in crisis resources for this reason)

**The constitutional response:** Recognise, redirect to humans, never attempt to be the solution. Crisis resources hardcoded. Acknowledgment of limitations explicit. "I'm an AI wayfinder, not a counsellor. Here are people who can help."

---

*This document answers "who?" so that every other document can focus on "what?" and "how?"*
