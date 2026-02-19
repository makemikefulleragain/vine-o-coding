# PLATFORM_STATE.md
# What kamunity.ai IS Right Now

**Last updated:** 2026-02-13
**Source:** Public site inspection + member/operator input from Mike

---

## The Live Platform: kamunity.ai

Kamunity is a **room-based community platform** that is live, in beta, with real users.

### Current Stats (from landing page)
- 100+ Active Rooms
- 500+ Members
- 1000+ Events Created

### Core Features (live now)
- **Rooms** — the fundamental unit. Create a room for any purpose: events, discussions, collaborations
- **Chat** — in-room messaging
- **Calendar** — event planning with RSVPs, reminders, updates
- **Files** — file sharing within rooms
- **Polls** — voting/decision-making within rooms
- **AI assistant** — AI room credits (Pro tier)
- **Discovery** — browse and explore public rooms
- **Offline support** — works offline, syncs automatically
- **Cross-device** — phone, tablet, desktop, PWA available

### Pricing Tiers
- **Free** — unlimited public rooms, 1 private room, email signup
- **Pro** ($5/month) — 4 private rooms, priority feature requests, personalisation, AI credits
- **Kamunity+** (Pro pricing) — dev room access, Value Exchange rooms, special benefits, shape the future

### Positioning
- "No algorithms, no data mining. Just you and your community in your own space."
- "No ads or algorithms, ever."
- "You moderate. You control. It's yours."
- Anti-enshittification stance explicitly stated
- Room metaphor: "What if you could just open a door to find what you need?"

### Tech Stack
- Next.js 14 with App Router
- Supabase (database + auth)
- Prisma (ORM)
- Tailwind CSS
- Deployed on Netlify

---

## What Members Are Asking For

Based on direct input from Mike (platform operator):

### 1. More Specific Tools
Members want purpose-built tools within rooms, not just generic chat + files. The room concept works but needs deeper functionality per use case.

### 2. New Room Layouts
Different room types for different purposes — not every room should look the same. A music collaboration room has different needs than a volunteer coordination room or a P&C meeting room.

### 3. File Management
Current file sharing is basic. Members want better organisation, versioning, or structured file management within rooms.

### 4. Notification Schema
Members want control over how and when they're notified. Current notifications are either too much or not enough. Needs granularity — per-room, per-type, per-urgency.

### 5. Permissions
More granular control over who can do what within rooms. Role-based access, moderation tools, member management.

---

## The Pack Music — Specific Needs

The Pack Music is a live Kamunity member with a specific, articulated vision:

### What They Want
- **Their own branded version** — a "Pack version" of Kamunity that looks and feels like The Pack, not like a generic platform they've joined
- **Rooms for stakeholders** — artists, fans, venues, LGAs, businesses each get rooms to champion aspects of music they care about
- **A space that is THEIRS** — not joining someone else's platform. Ownership and identity matter. They want to be ON Kamunity infrastructure but it should feel like The Pack's own space.
- **Federation with Mastodon/Bluesky** — they want their space to connect OUT to the fediverse and other ethical platforms, but the home base is theirs. They post from their space, it appears on Mastodon/Bluesky. They don't leave their space to participate elsewhere.

### What This Means Architecturally
This is a **white-label/multi-tenant** request. The Pack wants:
1. Kamunity infrastructure (reliability, features, development pipeline)
2. Pack branding and identity (their logo, their colours, their domain potentially)
3. Room structure tailored to music ecosystem (artist rooms, venue rooms, fan rooms, LGA partnership rooms)
4. Outbound federation (ActivityPub/AT Protocol integration so content flows to Mastodon/Bluesky without leaving the Pack space)
5. Sovereignty — their data, their moderation, their rules, while benefiting from shared infrastructure

This is exactly the "build when extractive" model amendment in action. The Pack isn't asking for capacity building. They're asking for sovereign infrastructure that connects to the open web.

---

## What This Means for the RALF Engine

### The question is no longer "should we build"
kamunity.ai exists with 500+ members and 100+ rooms. The question is: **what should be built NEXT, and in what order?**

### The member requests map to the research
- "More specific tools" = the Coordination Support Gap manifesting as feature requests
- "New room layouts" = different communities need different coordination patterns (I01 finding)
- "File management" = the tool fragmentation problem at micro scale (I01 Finding 1)
- "Notification schema" = the accessibility-efficiency tension (I01 Finding 2) — too many notifications excludes people, too few means things get missed
- "Permissions" = governance as trust infrastructure (I04 Theme 4)

### The Pack's request is the highest-signal spec target
It combines:
- A specific, articulated need from a real member
- Direct alignment with the "build when extractive" amendment
- A technically interesting challenge (multi-tenant + federation)
- Alignment with the sovereignty principle
- A live relationship with established trust

### Triage for The Pack's request
1. **Find:** Does a white-label federated community platform already exist? (Mastodon instances are single-purpose. Discourse has some multi-tenant. Matrix/Element has spaces. None combine rooms + calendar + files + polls + federation + branding.)
2. **Connect:** Could The Pack use an existing federated platform? (They could run a Mastodon instance, but that's microblogging, not room-based coordination.)
3. **Extend:** Could kamunity.ai be extended with multi-tenant branding and ActivityPub federation? **This is likely the right answer.**
4. **Integrate:** Could kamunity.ai integrate with Mastodon/Bluesky APIs for outbound posting? (Simpler than full federation, might be a good first step.)
5. **Build:** Build from scratch? No — kamunity.ai already exists. Extend it.
