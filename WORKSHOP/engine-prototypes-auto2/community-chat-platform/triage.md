# Triage: community-chat-platform

## Decision: ESCALATE — Too big to build; recommend existing platforms

## Reasoning

Applying Find → Connect → Extend → Integrate → Build:

### Find
Multiple mature, open-source, self-hostable real-time chat platforms exist:
1. **Element/Matrix** — Federated, end-to-end encrypted, open protocol. Best for sovereignty.
2. **Mattermost** — Open-core, polished Slack alternative. Free self-hosted tier.
3. **Zulip** — Fully open source (all features), topic-based threading.
4. **Rocket.Chat** — Open source, feature-rich, though community sentiment declining.

### Connect
Every feature in the outcome maps to existing platforms:
- Real-time messaging with rooms/channels → ✅ All four
- Threaded conversations → ✅ All four
- File sharing and search → ✅ All four
- User profiles and presence → ✅ All four
- Mobile-friendly → ✅ All four have mobile apps
- Standalone web app → ✅ All four are standalone

### Scope Analysis
Even if no existing tools existed, this outcome is too large for a single engine iteration:
- Real-time messaging requires WebSocket infrastructure
- Threads require complex data models and UI
- File sharing requires storage, CDN, virus scanning
- Search requires full-text indexing
- Presence requires persistent connections and heartbeats
- Mobile-friendly at this scale means responsive design + push notifications

These platforms represent thousands of person-years of engineering. A single-session build cannot compete. Even a dramatically narrowed version would be inferior to installing Mattermost or Element.

### Stop Here — Two independent reasons not to build:
1. **Excellent existing tools exist** → RECOMMEND
2. **Scope is too large for one iteration** → ESCALATE

Both reasons apply simultaneously. This is the clearest "do not build" in the queue.

## Constitutional Check
- **Triage Before Build:** ✅ Found 4+ existing tools that cover 100% of requirements.
- **Honesty Over Output:** ✅ Acknowledging scope reality is honest.
- **Scope Discipline:** ✅ Recognising that a chat platform is years of work, not a session.
- **Harm Check:** ✅ N/A — not building.

## Prediction Alignment
QUEUE.md predicts "Escalate — too big, OR narrow + recommend existing." I'm doing both: escalating the scope AND recommending existing platforms. The evidence supports this independently of the prediction.
