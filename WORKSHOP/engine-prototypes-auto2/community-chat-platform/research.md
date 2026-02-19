# Research: community-chat-platform

## Search 1: Mattermost

**Mattermost** (mattermost.com) — Open-core, self-hosted collaboration platform. Written in Go + React. Single Linux binary.

**Features matching outcome:**
- Real-time messaging with channels ✅
- Threaded conversations ✅
- File sharing ✅
- Search ✅
- User profiles and presence ✅
- Mobile apps (iOS, Android) ✅
- Self-hosted (full data sovereignty) ✅

**Pricing:**
- Free "Entry" tier: Self-hosted, up to 10,000 chat history messages visible, core features
- Professional: $10/user/month
- Enterprise: Custom pricing
- Open source (MIT license for core)

**Maturity:** 10+ years development. Used by US Armed Forces, Fortune 500. 40k+ GitHub stars. Active development.

**Trade-offs for community orgs:** Entry tier has message history limit. Professional tier ($10/user/month) may be expensive for volunteer orgs. Requires server administration for self-hosting.

## Search 2: Element / Matrix

**Element** (element.io) on the **Matrix** protocol — Open source, decentralized, federated messaging.

**Features matching outcome:**
- Real-time messaging with rooms ✅
- Threaded conversations ✅
- File sharing ✅
- Search ✅
- User profiles and presence ✅
- Mobile apps ✅
- End-to-end encryption ✅
- Federation (connect with other Matrix servers) ✅
- Self-hosted via Synapse server ✅

**Pricing:**
- Self-hosted: Free (Matrix/Synapse is fully open source, Apache 2.0)
- Element Cloud: From free (limited) to paid tiers
- Element Server Suite: Enterprise pricing

**Maturity:** Matrix protocol is a W3C-adjacent open standard. Element is backed by significant funding. Used by French government, German military, Mozilla.

**Trade-offs for community orgs:** Self-hosting Synapse requires significant technical capacity (Python server, PostgreSQL). Can be resource-heavy. Federation adds complexity. UX is improving but historically less polished than Slack.

## Search 3: Rocket.Chat and Zulip

**Rocket.Chat** — Open source (MIT), self-hosted chat. 44k+ GitHub stars. Features: channels, threads, file sharing, search, video calls. However, recent community sentiment is negative — "felt a bit unloved," adding AI features while core product stagnated. License changes have caused concern.

**Zulip** — Open source chat with unique topic-based threading model. All features included in open source version (no enterprise-gated features). Good for organized discussions. Self-hostable. However: mandatory license fees for mobile push notifications on self-hosted servers >10 people. Mobile app quality concerns noted.

## Scope Analysis: Why Building Is Not Feasible

The outcome asks for:
1. Real-time messaging with rooms/channels
2. Threaded conversations
3. File sharing and search
4. User profiles and presence
5. Mobile-friendly
6. Standalone web app

This is the feature set of Slack, Discord, Mattermost, Rocket.Chat, Element, and Zulip. These platforms represent:
- **Combined:** Hundreds of millions of dollars in development
- **Engineering years:** Thousands of person-years
- **Key challenges:** WebSocket infrastructure, real-time sync, presence systems, file storage/CDN, full-text search indexing, mobile responsive design, push notifications, offline support, moderation tools, rate limiting, abuse prevention

A single autonomous engine iteration cannot produce anything competitive. Even a dramatically narrowed version (text-only chat, no threads, no file sharing, no search, no presence) would be a worse version of what already exists — and the outcome doesn't ask for a narrowed version.

## Key Finding

Multiple excellent open-source, self-hostable chat platforms exist:
- **Element/Matrix:** Best for sovereignty (federated, open protocol, end-to-end encrypted)
- **Mattermost:** Best UX for teams migrating from Slack
- **Zulip:** Best for topic-organized discussion (all features in open source)

The scope of the requested build is years of engineering. Building is not warranted. The honest answer is: recommend an existing platform, or escalate the scope problem.
