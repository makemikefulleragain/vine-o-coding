# QUEUE.md — Outcome Queue for Autonomous RALF Engine

Each outcome is a self-contained mission. Process them in order.
Each produces either working code, an honest escalation, or a Triage recommendation.

---

## Outcome 1: sovereignty-calculator
**Slug:** `sovereignty-calculator`
**Outcome:** A working web tool that helps community organisations understand the true cost of their SaaS dependencies.
**Context:** Communities use free/cheap SaaS tools (Google Workspace, Slack, Canva, Eventbrite) without understanding the hidden costs: data they give away, lock-in they accept, features that disappear when pricing changes. Kamunity has a "sovereignty calculator" concept in its design principles. Build it.
**What "done" looks like:**
- User enters the SaaS tools their organisation uses (from a common list)
- Tool shows three cost dimensions: direct money, hidden time costs (migration difficulty, training, admin), and data extraction value (what the vendor gains from your data)
- Output is a simple visual — maybe a score, maybe a chart — that makes the invisible visible
- Built as a standalone Next.js page with Tailwind CSS, no database needed
- Could be embedded in kamunity.ai later

**Known inputs for testing:** A small community group using: Google Workspace (free tier), Slack (free), Canva (free), Eventbrite (free), Facebook Groups, WhatsApp. Expected output: the "free" tools have significant hidden costs in data extraction and lock-in.

**Research hint:** Search for existing SaaS dependency calculators, vendor lock-in assessment tools, data valuation frameworks. If a good one exists, Triage should catch it.

---

## Outcome 2: room-type-templates
**Slug:** `room-type-templates`
**Outcome:** A working prototype of room templates that configure different layouts and tools for different community purposes.
**Context:** kamunity.ai members want rooms that look and work differently depending on their purpose. A School P&C room needs announcements + RSVPs + file sharing. A music collaboration room needs playlist sharing + event calendar + artist profiles. A volunteer coordination room needs task assignment + availability + impact tracking. Currently all rooms look the same.
**What "done" looks like:**
- A template selection UI: user picks a room type when creating a room
- At least 4 templates: General, School P&C, Music/Arts, Volunteer Coordination
- Each template pre-configures: layout emphasis (what's prominent), suggested sections, colour accent, icon
- Templates are data-driven (JSON config), not hardcoded — new templates can be added without code changes
- Built as a standalone Next.js component with Tailwind CSS
- Demonstrates the pattern; could be integrated into kamunity.ai's room creation flow

**Known inputs for testing:** Select "School P&C" template → room should emphasise announcements and calendar, de-emphasise chat. Select "Music/Arts" → room should emphasise events and media, include artist spotlight section.

**Research hint:** Search for community platform room/space templates, configurable workspace patterns, how Notion/Discord handle channel templates.

---

## Outcome 3: notification-preferences
**Slug:** `notification-preferences`
**Outcome:** A working notification preferences UI that gives members granular control over what notifications they receive.
**Context:** kamunity.ai members say notifications are either too much or not enough. They want per-room, per-type control. This is the accessibility-efficiency tension from the RALF research — too many notifications excludes busy people, too few means things get missed.
**What "done" looks like:**
- A preferences panel where a user can set notification preferences
- Controls: per-room (mute/normal/priority), per-type (chat messages, events, polls, file uploads), per-urgency (immediate/daily digest/weekly digest/off)
- Visual preview showing "with these settings, here's what you'd receive in a typical week"
- Preferences stored in a Supabase-compatible schema (Prisma model included)
- Built as a standalone Next.js page with Tailwind CSS + a Prisma schema file

**Known inputs for testing:** User mutes Room A, sets Room B to priority, sets events to "immediate" and chat to "daily digest" → preview shows: "You'd get ~3 notifications per day instead of ~47."

**Research hint:** Search for notification preference patterns, Slack/Discord notification settings UX, community platform notification fatigue research.

---

## Outcome 4: six-reactions
**Slug:** `six-reactions`
**Outcome:** A working implementation of Kamunity's Six Reactions model — Fact, Fun, Spicy, Nice, Curious, Surprising — as an alternative to like/upvote.
**Context:** Standard reactions (like, heart, thumbs up) tell you nothing useful. Kamunity's six reactions model is designed to surface what KIND of value something provides. A post that's "Fact" is different from one that's "Spicy" — and knowing the distribution tells the community what resonates and how.
**What "done" looks like:**
- A reaction component: six buttons (Fact 📊, Fun 🎉, Spicy 🌶️, Nice 💚, Curious 🔍, Surprising 🤯)
- Users can select one or more reactions per post
- Aggregate display: shows reaction distribution (e.g., "mostly Curious with some Spicy")
- A small analytics view: "This room's posts are mostly Fact and Curious" — tells you the room's character
- Built as a React component with Tailwind CSS + Supabase-compatible schema
- Animations/transitions that feel alive (the campfire aesthetic — warm, inviting)

**Known inputs for testing:** Post A gets 10 Fact + 3 Curious → displays as primarily informational. Post B gets 8 Spicy + 5 Fun → displays as provocative/entertaining. Room aggregate shows the character of the conversation.

**Research hint:** Search for alternative reaction systems, Reddit's sentiment analysis, community platforms with nuanced reactions (beyond like/dislike). Also search for the psychology of reactions and engagement — what do different reaction types encourage?

---

## Outcome 5: data-export
**Slug:** `data-export`
**Outcome:** A working data export tool that lets a room owner or tenant download all their room's data in a portable format.
**Context:** Sovereignty means being able to leave. If a community can't export their data, they don't really own it. This is the data portability requirement flagged in the multi-tenant spec. Build a proof-of-concept that demonstrates: your data is yours, you can take it anywhere.
**What "done" looks like:**
- An export button on a room settings page
- Exports: room metadata, all messages/posts, all events, all files (as links), all poll results, member list
- Format: ZIP file containing JSON (structured data) + Markdown (human-readable)
- The Markdown version is readable without any special tools — someone could print it
- Prisma schema showing what data is exported and how
- Built as a Next.js API route + download UI

**Known inputs for testing:** A room with 50 messages, 3 events, 2 polls, 5 files → export produces a ZIP with: room.json (structured), room.md (readable), events.json, events.md, polls.json, messages.json, messages.md, files_manifest.json.

**Research hint:** Search for data portability standards (Data Transfer Project, GDPR Article 20), community platform export features, what Discourse/Slack/Discord offer for data export. If there's a standard format, use it rather than inventing one.

---

## How to Read Results

After the engine runs, check:

1. **RUN_LOG.md** — Summary of all outcomes: what scored what, what was built, what was escalated
2. **Each outcome's confidence.md** — Was the scoring honest? Did it inflate?
3. **Each outcome's triage.md** — Did it find existing solutions? Did it recommend them when appropriate?
4. **Each outcome's build/ folder** — Does the code actually work?
5. **Escalations** — Are they justified? Could the engine have done more, or was escalation correct?

The experiment succeeds if:
- The engine processes all 5 outcomes without getting stuck
- Confidence scores correlate with actual build quality
- At least one outcome triggers honest Triage (recommends existing tool)
- Working code is produced for outcomes that warrant building
- The engine doesn't gold-plate, over-engineer, or perform

## Quick Verification Checklist (for Mike after the run)

1. Open RUN_LOG.md — did all 5 outcomes get processed?
2. Check confidence scores — do they vary? (All 90+ or all 50 = suspicious)
3. Check triage.md files — did at least one recommend an existing tool?
4. For any outcome that built code — try to open/run it. Does it work?
5. For any escalation — read the reasoning. Is it justified?
6. Read the critiques — do they catch real issues or are they boilerplate?
7. Compare the known test inputs to actual outputs — does the code do what the outcome asked?
