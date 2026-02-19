# Escalation: community-chat-platform

## Why This Is Escalated

This outcome is escalated for two independent, reinforcing reasons:

### Reason 1: Excellent existing tools already solve this
Multiple open-source, self-hostable chat platforms exist that cover 100% of the stated requirements. Building a new one would produce an inferior duplicate.

### Reason 2: Scope is far too large for a single build session
A real-time chat platform with rooms, threads, file sharing, search, presence, and mobile support is a multi-year, multi-team engineering effort. The stated requirements match the feature set of platforms that have consumed hundreds of millions of dollars in combined development.

## Existing Tools — Recommendations

### Primary: Element / Matrix (best for sovereignty)
- **Website:** https://element.io / https://matrix.org
- **License:** Apache 2.0 (Matrix protocol + Synapse server)
- **Why:** Federated protocol means no single point of control. End-to-end encrypted. Self-hostable. Used by French government, German military. Strongest sovereignty story.
- **Cost:** Free (self-hosted). Element Cloud has free and paid tiers.
- **Trade-offs:** Self-hosting Synapse requires technical capacity. Resource-heavy. UX improving but not as polished as Slack.
- **Best for:** Orgs that prioritize data sovereignty and decentralization.

### Alternative: Mattermost (best UX)
- **Website:** https://mattermost.com
- **License:** MIT (core), proprietary (enterprise features)
- **Why:** Most Slack-like experience. Clean UI. Good mobile apps. Strong enterprise adoption.
- **Cost:** Free "Entry" tier (self-hosted, 10k message history). Professional: $10/user/month.
- **Trade-offs:** Free tier has message history limit. Enterprise features gated. Not federated.
- **Best for:** Orgs migrating from Slack who want familiar UX.

### Alternative: Zulip (best threading model)
- **Website:** https://zulip.com
- **License:** Apache 2.0 (all features in open source — no enterprise gating)
- **Why:** Unique topic-based threading makes discussions more organized than channel-based chat. All features in open source version.
- **Cost:** Free (self-hosted). Zulip Cloud has free and paid tiers.
- **Trade-offs:** Topic model is different from Slack/Discord — learning curve. Mobile push notifications on self-hosted >10 users requires license fee.
- **Best for:** Orgs that value organized discussion over real-time chat.

## Adoption Path for Community Organisations

### Simplest path: Element free tier or Zulip Cloud
1. Sign up for Element (element.io) or Zulip Cloud (zulip.com) free tier
2. Create a workspace/space for your organisation
3. Invite members
4. No self-hosting needed to start

### Sovereignty path: Self-host Element/Synapse or Zulip
1. Provision a Linux server (VPS, ~$20-40/month)
2. Deploy via Docker
3. Full control of all data
4. Requires ongoing server administration

### Easiest migration from Slack: Mattermost
1. Sign up for Mattermost Cloud or self-host
2. Import Slack history (Mattermost has Slack import tools)
3. Familiar interface for existing Slack users

## What Would Be Needed If Building Were Warranted

If none of these tools existed and building were the right answer, the minimum viable scope would need to be dramatically narrowed:

**Absolute minimum (still months of work):**
- Text-only messaging (no file sharing)
- Flat channels (no threads)
- No search
- No presence indicators
- Web only (no mobile apps)
- No federation
- No end-to-end encryption

Even this minimal version would be worse than the free tier of any existing platform.

## This Is a Successful Outcome

Identifying that a problem is already well-solved by mature open-source tools is a better result than building a worse version. The community sector benefits more from guidance on which existing tool to adopt than from a toy prototype that can't compete.
