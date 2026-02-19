# AI Readiness for Communities — Site & Service Scope

*Companion to the Digital Sovereignty Audit (kamunity-audit.netlify.app)*
*Built February 2026*

---

## Overview: What Is This?

The Digital Sovereignty Audit asks "what's your relationship with your current tools?" This site asks the next question: **"What's your relationship with AI — and what should it be?"**

The community sector is drowning in AI hype. Microsoft is pushing Copilot into every NFP's donated O365. Google's Gemini is appearing in Workspace. Every conference has an "AI for Good" panel. Meanwhile, the average volunteer coordinator at a neighbourhood centre just wants to know: "Should I be worried? Should I be excited? What should I actually do?"

This site answers that — from a position of community sovereignty, not vendor sales.

---

## What the Site Looks Like

### The Audit Site Pattern (Learning From kamunity-audit.netlify.app)

Based on the existing sovereignty audit: clean campfire aesthetic (warm paper tones, Fraunces headers, DM Sans body), mobile-first, no tracking, runs entirely client-side. The sovereignty audit likely follows a flow of: questions → score → recommendations → pathways to deeper help. This site does the same but for AI readiness.

### Site Structure

```
Landing (hero + value prop + "Take the quiz" CTA)
│
├── 🧭 AI Readiness Quiz (free, 2-3 minutes)
│   └── Results dashboard with score across 4 dimensions
│       ├── Recommendations (personalised to their score)
│       ├── Free toolkit links (guides, prompt kits, playbooks)
│       └── "Want help?" → services pathways
│
├── 📚 Free Toolkit (the generous freemium layer)
│   ├── Getting Started with AI — Plain Language Guide
│   ├── AI Safety Checklist for Community Orgs
│   ├── Prompt Kit: 20 Ready-to-Use Prompts for NFPs
│   ├── Tool Comparison: AI Tools That Respect Your Data
│   ├── "Questions to Ask Before Adopting Any AI Tool" (one-pager)
│   └── Constitutional AI Principles — What Your Org Should Demand
│
├── 🔥 Workshop & Services (the paid layer)
│   ├── AI Readiness Workshop (half-day, group)
│   ├── AI Strategy Session (1:1, focused)
│   ├── Full Digital Needs Mapping (comprehensive)
│   ├── Transparent pricing (NFP rate / Standard rate)
│   └── Booking/contact flow
│
├── 💬 Community (feedback loop)
│   ├── "How did you go?" — share your DIY experience
│   └── Case studies (as they accumulate)
│
└── About / Values / Contact
```

### Look and Feel

Same campfire aesthetic as the audit site. Consistent Kamunity ecosystem branding. Key difference: where the sovereignty audit might use shield/lock metaphors, this site uses **compass/pathfinding** metaphors — you're navigating new terrain, not defending a fortress.

Colours: Same warm palette. AI-specific accent could be a soft blue-green (the "moss" from the Constellation) to distinguish from the ember-red of the sovereignty audit while staying in family.

Hero message: Something like:

> **AI is here. Your community gets to decide what that means.**
> Take 2 minutes to find out where you stand — and what to do next.

---

## The Free AI Readiness Quiz

### Design Philosophy

Not a test. Not a grade. A **map.** "Here's where you are, here are some paths forward." No shame, no pressure. The 9th grader test applies: every question and every result must be immediately comprehensible to someone with no technical background.

### Four Dimensions Scored

1. **Understanding** — Does your team know what AI actually is (vs. the hype)?
2. **Current Use** — Are you already using AI? Do you know which tools have AI in them?
3. **Safety & Ethics** — Do you have any guardrails around AI use?
4. **Readiness to Act** — Could your org make informed decisions about AI right now?

### The Questions (12 questions, ~2 minutes)

**Understanding (3 questions):**

1. "How would you describe your team's understanding of AI?"
   - ○ "What even is AI?" — We haven't really discussed it
   - ○ "We've heard the buzz" — Some awareness but it feels overwhelming
   - ○ "We get the basics" — We understand what it can and can't do
   - ○ "We're confident" — We could explain it to our community

2. "Has anyone in your organisation attended AI training or workshops?"
   - ○ No, and we wouldn't know where to look
   - ○ No, but we'd like to
   - ○ Yes, one or two people informally
   - ○ Yes, we've invested in team learning

3. "How does your team feel about AI right now?"
   - ○ Anxious — worried about jobs, privacy, the unknown
   - ○ Confused — too much hype, can't tell what's real
   - ○ Curious — interested but cautious
   - ○ Enthusiastic — ready to explore

**Current Use (3 questions):**

4. "Which of these does your organisation currently use?" (tick all)
   - □ Microsoft 365 / Google Workspace (these now include AI features)
   - □ ChatGPT, Claude, Gemini, or similar chatbots
   - □ AI writing tools (Grammarly, Jasper, etc.)
   - □ AI-powered scheduling, bookings, or CRM features
   - □ Social media tools with AI (Canva AI, Meta AI, etc.)
   - □ None of the above
   - □ I'm not sure

5. "Do you have a clear picture of which tools in your org use AI?"
   - ○ No — I'd be guessing
   - ○ Partly — I know about some but not all
   - ○ Mostly — we've done a basic audit
   - ○ Yes — we've mapped it out

6. "When a new AI tool appears, what typically happens?"
   - ○ Someone just starts using it without discussion
   - ○ A few people try it informally, no process
   - ○ We talk about it as a team before deciding
   - ○ We have a process for evaluating new tools

**Safety & Ethics (3 questions):**

7. "Does your organisation have any guidelines about using AI?"
   - ○ No, we haven't thought about it
   - ○ We've discussed it informally but nothing written
   - ○ We have some informal rules (e.g., "don't put client data into ChatGPT")
   - ○ We have a written AI use policy or guidelines

8. "When staff use AI chatbots, what happens with sensitive information?"
   - ○ I don't know — it hasn't come up
   - ○ No rules — people use their judgment
   - ○ We've told people not to put client/sensitive data in, informally
   - ○ We have clear guidelines about what data can and can't be used

9. "Has your organisation considered how AI might affect the people you serve?"
   - ○ No — we haven't thought about it from that angle
   - ○ A little — we've had informal conversations
   - ○ Yes — we've discussed it but haven't formalised anything
   - ○ Yes — we've involved our community in the conversation

**Readiness to Act (3 questions):**

10. "If your board asked 'what's our AI strategy?', how would you respond?"
    - ○ Panic — we have nothing
    - ○ Waffle — we'd talk about what we've heard but have no plan
    - ○ Basics — we could outline some first steps
    - ○ Confidently — we have a direction, even if it's early

11. "How much time could your team realistically spend learning about AI in the next month?"
    - ○ Zero — we're at capacity
    - ○ An hour or two — maybe a lunch-and-learn
    - ○ Half a day — we could do a workshop
    - ○ More — we're ready to invest properly

12. "What would help most right now?"
    - ○ Just tell me if I should be worried
    - ○ Show me what's real vs. hype — plain language
    - ○ Give me practical tools my team can use tomorrow
    - ○ Help us build a proper AI approach for our organisation

### Scoring

Each answer maps to 0–3 points per dimension. Total score out of 12 per dimension, presented as a visual map (not a number out of 48 — that feels like a test).

**Visual: Four-quadrant radar/compass chart**
- Understanding: 0–12
- Current Use: 0–12
- Safety & Ethics: 0–12
- Readiness: 0–12

**Result Profiles (not grades — identities):**

- **The Explorer** (low across the board): "You're at the beginning. That's OK — most community orgs are. Start with understanding, then build from there."
- **The Curious** (understanding is higher, action is low): "You get it, you just haven't started. Here are practical first steps."
- **The Unguarded** (current use is high, safety is low): "You're already using AI — but without guardrails. This is the most important thing to fix first."
- **The Ready** (high across the board): "You're in great shape. Here's how to go deeper."

Each profile gets 3–4 specific recommendations drawn from the toolkit, plus a "want hands-on help?" pathway to the services.

---

## The Free Toolkit (Freemium Layer)

Downloadable/viewable guides. No login required. No email gate (but an optional "want updates?" at the bottom).

### 1. Getting Started with AI — Plain Language Guide
What AI actually is (and isn't). What the different tools do. What "large language model" means in human terms. How it's different from Google. What it's good at. What it's terrible at. Common myths vs. reality. 2-page PDF or on-site article.

### 2. AI Safety Checklist for Community Orgs (One-Pager)
10 questions to ask before using any AI tool:
- Where does my data go?
- Who owns the outputs?
- Can I delete my data?
- Is it training on our information?
- Does it meet our privacy obligations?
- Could it produce harmful or biased results?
- Does it replace human judgment where it shouldn't?
- Can we explain to our community how we're using it?
- What happens if the tool disappears or changes pricing?
- Who in our org is responsible for AI decisions?

### 3. Prompt Kit: 20 Ready-to-Use Prompts for NFPs
Practical, tested prompts for common community sector tasks:
- Drafting grant applications (the bones, not the final version)
- Summarising meeting minutes
- Writing volunteer role descriptions
- Creating social media posts for events
- Explaining complex policies in plain language
- Analysing survey responses
- Writing thank-you letters to donors
- Preparing board reports from messy data
- Translating content for CALD communities (with caveats)
- Creating FAQ documents

Each prompt includes: the prompt itself, what to expect, what to check/edit, and what NOT to use it for.

### 4. Tool Comparison: AI Tools That Respect Your Data
A simple comparison of AI tools rated on privacy, cost, and community suitability:
- ChatGPT (Free/Plus/Team) — what it does, data policy, cost
- Claude (Free/Pro) — same
- Gemini (Free/Workspace) — same
- Local/offline options (Ollama, LM Studio) — for the adventurous
- Microsoft Copilot — what it does, what it costs, lock-in risks
- Canva AI — what the free tier gives you

Rated on: ✅ Data stays private / ⚠️ Data may be used for training / ❌ Data is used for training

### 5. "Questions to Ask Before Adopting Any AI Tool" (Decision Framework)
A printable one-page flowchart:
- Does it solve a real problem we have? → If no, stop
- Can we explain to our community why we're using it? → If no, reconsider
- Where does our data go? → If we don't know, find out before proceeding
- What happens when we stop paying? → If we lose everything, that's lock-in
- Does it replace human judgment in high-stakes decisions? → If yes, extra caution

### 6. Constitutional AI Principles — What Your Org Should Demand
The Kamunity constitutional principles, adapted as an advocacy document:
- No surveillance of community members
- No dark patterns in tool design
- No vendor lock-in — your data is always yours
- Transparent AI — know when AI is being used and how
- Human override — AI assists, humans decide
- Community benefit — AI should serve the community's goals, not the vendor's

---

## The Paid Services Layer

### Service 1: AI Readiness Workshop (Half-Day, Group)
**What it is:** A facilitated half-day (3–4 hours) for teams of up to 15. Not a lecture — hands-on, practical, and grounded in the organisation's actual context.

**What's covered:**
- Demystify AI: what it is, what it isn't, why it matters for community orgs
- Live demos: using AI tools safely for real NFP tasks
- Hands-on: participants try prompts from the toolkit with their own work scenarios
- Safety session: building your org's AI guidelines together (they leave with a draft)
- Sovereignty lens: understanding data flows, choosing tools that respect your values
- Action plan: three concrete next steps for the team

**What they leave with:**
- Draft AI use guidelines for their org
- Prompt kit (customised for their sector)
- AI safety checklist (printed and digital)
- Tool comparison sheet
- Recorded session summary (if they want it)
- 30-day email support for questions that come up

**Pricing:**
- Community/NFP rate: $1,500–$2,500 (depending on travel/location)
- Standard rate: $3,500–$5,000
- Remote delivery: $1,200–$2,000 (NFP) / $3,000–$4,000 (standard)

**What makes this different from every other AI workshop:**
Most AI workshops are vendor pitches in disguise ("here's how to use Copilot!"). This one starts from the community's needs, not the vendor's product. The sovereignty lens is built in — every tool recommendation includes data ownership and lock-in assessment. And participants build their own guidelines rather than being handed a template.

### Service 2: AI Strategy Session (1:1, Focused)
**What it is:** A 2-hour one-on-one session with the org's leadership or tech person. Deep dive into their specific situation.

**What's covered:**
- Review their quiz results together
- Map their current AI use (known and hidden)
- Identify highest-value opportunities (where AI actually helps vs. where it's hype)
- Flag risks specific to their context
- Build a 90-day AI action plan

**What they leave with:**
- Written AI strategy brief (2–3 pages, specific to their org)
- Priority action list
- Tool recommendations with data sovereignty assessment
- 30-day follow-up check-in

**Pricing:**
- Community/NFP: $800–$1,200
- Standard: $1,800–$2,500

### Service 3: Full Digital Needs Mapping (Comprehensive)
**What it is:** The full engagement from the revenue strategy. Combines sovereignty audit + AI readiness into a complete digital assessment.

**What's covered:**
- Everything from the AI Strategy Session
- Plus full sovereignty audit (current tools, costs, lock-in assessment)
- Plus needs mapping (what the org actually needs vs. what it has)
- Triage methodology: Find existing solutions → Connect → Extend → Integrate → Build (only if necessary)
- Costed roadmap with timeline

**What they leave with:**
- Complete digital roadmap document (10–15 pages)
- Tool recommendations with migration paths
- AI strategy integrated with broader digital sovereignty plan
- Budget estimates for recommended changes
- 60-day support window

**Pricing:**
- Community/NFP: $3,000–$5,000
- Standard: $8,000–$15,000

### Pricing Philosophy (Visible on Site)

A section that says something like:

> **Why two prices?**
>
> We believe community organisations shouldn't be priced out of good advice. Our community rate covers our costs and keeps the lights on. Our standard rate reflects the commercial value of this work and helps us subsidise community access.
>
> If you're a community organisation, NFP, volunteer group, or Aboriginal Community Controlled Organisation — you automatically qualify for the community rate. No questions asked, no means testing, no paperwork.
>
> If you're a for-profit business, government agency, or corporate — the standard rate applies. It's fair market value, and a portion funds our free tools and community work.
>
> If even the community rate is a stretch, talk to us. We'd rather help than not.

---

## Vine Code Answers (for Windy to build)

### Step 1: What do you want to build?

**Project name:** AI Groundwork

**What does this tool do?** A free AI readiness self-assessment for community organisations. Users answer 12 questions in about 2 minutes and get a personalised readiness map across four dimensions (Understanding, Current Use, Safety & Ethics, Readiness to Act) with specific recommendations. The site also hosts a free toolkit of guides, prompt kits, and checklists, plus a pathway to paid consulting services with transparent pricing.

**Who will use this?** Small-to-medium community organisations, NFPs, neighbourhood centres, volunteer groups, and Aboriginal Community Controlled Organisations in Australia. People who are overwhelmed by AI hype and want practical, values-aligned guidance.

**What problem does it fix?** Community orgs are adopting AI tools without understanding the implications — staff are putting client data into ChatGPT, boards are asking "what's our AI strategy?" and getting blank stares, and vendors are pushing products that create lock-in. There's no simple, free, sovereignty-aware starting point for the community sector.

### Step 2: Who exactly will use this?

**Main user: Priya** — Operations coordinator at a 12-person NFP in Fremantle. She's the unofficial tech person because she's the most comfortable with computers. She's heard about AI at conferences but hasn't done anything with it yet. Her CEO just asked "should we be using AI?" and she doesn't know how to answer. She's on her laptop between meetings, has maybe 15 minutes right now.

**Other users:** Board members wanting to understand AI risk for governance. CEOs of small orgs who need to make technology decisions. Volunteer coordinators who've noticed volunteers using ChatGPT and don't know if that's OK. Grant managers wondering if AI can help with reporting. WACOSS digital inclusion workers looking for training resources to recommend.

### Step 3: What should this NOT do?

**NOT THIS:** Not an AI chatbot itself. Not a tool that writes grants or reports (that's what the prompt kit helps you do elsewhere). Not a cybersecurity assessment. Not an IT procurement system. Not a Microsoft/Google/vendor-specific training platform.

**SAFETY CONCERNS:** Community orgs handle sensitive data — family violence, health, homelessness, children. The quiz must not collect or store any organisational data. Recommendations must flag when orgs handling sensitive data need specialist advice beyond what this tool provides. The prompt kit must include clear warnings: "Never put client names, case details, or personal information into any AI tool." AI readiness scores should not be used by funders as a gate or requirement — this must be stated explicitly.

### Step 4: What should be built first?

**Phase 1 — The Quiz (Make it real):** The 12-question AI readiness self-assessment with radar chart results and personalised recommendations. Entirely client-side. Beautiful, warm, accessible. Mobile-first. Takes 2 minutes. Produces a result that's immediately useful and shareable (screenshot-friendly).

**Phase 2 — The Toolkit (Make it useful):** Host the six free guides/resources. Each linked from relevant quiz recommendations. Downloadable as PDFs. The prompt kit is the crown jewel — 20 tested, practical prompts that community workers can copy-paste and use today.

**Phase 3 — The Services (Make it sustainable):** Workshop, strategy session, and full mapping service pages with transparent pricing, process descriptions, and booking/contact flow. Testimonials section (empty initially, ready to populate). Case studies section.

### Step 5: Where will this live?

**Deploy:** Netlify (drag-and-drop)

**Database:** No. Entirely client-side, localStorage for quiz progress. The zero-data-collection is the point — "we built this the way we think tools should work."

**Notes:** Companion site to kamunity-audit.netlify.app. Same design language, different colour accent (moss green vs. ember red). Cross-links between sites. Both link back to kamunity.org. llms.txt file included for ecosystem discoverability.

### Step 6: Foundation Documents

Generated by Vine Code wizard → CONSTITUTION.md, MISSION.md, RUNNER.md, PHASE_QUEUE.md, SETUP.md, STATE.md → handed to Windy for build.

---

## Cross-Site Ecosystem

```
kamunity.org (hub)
├── kamunity-audit.netlify.app (Digital Sovereignty Audit — "your tools")
├── ai-groundwork.netlify.app (AI Readiness — "your AI")    ← THIS SITE
├── vine-o-coding.netlify.app (build methodology)
├── factoryk1.netlify.app (the factory)
├── constellation.netlify.app (ally tracker)
└── grants-hub.netlify.app (grant acquittal helper)
```

Each site has llms.txt pointing to the others. The sovereignty audit and AI readiness sites are the **client-facing front door** — the consulting revenue generators. The others are ecosystem infrastructure.

The quiz results on both sites should cross-reference: "You scored low on data sovereignty? Take our Digital Sovereignty Audit too." / "You scored low on AI readiness? Take our AI Readiness quiz."

---

## Revenue Projection for This Site

**Free tier (cost: $0/month to run — static site, no server):**
- Builds awareness and email list
- Establishes expertise and trust
- Provides immediate value that generates word-of-mouth
- Every quiz completion is a potential lead

**Conversion estimates (conservative):**
- 100 quiz completions/month (achievable with WACOSS and Infoxchange networks)
- 5–10% download toolkit resources
- 2–3% enquire about paid services
- 1% convert to paid engagement

**That's 1 paid engagement per month from the site alone** — $1,500–$5,000/month on top of any direct outreach consulting.

The toolkit resources also work as leave-behinds for in-person networking: "Here, take this AI safety checklist — and there's a free quiz at ai-groundwork.netlify.app if you want to go deeper."

---

*Scoped by Opus instance, February 2026. For handoff to Windy via Vine Code wizard.*
*Part of the Kamunity ecosystem: kamunity.org*
