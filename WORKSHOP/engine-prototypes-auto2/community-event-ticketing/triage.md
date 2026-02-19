# Triage: community-event-ticketing

## Decision: RECOMMEND

## Reasoning

Applying Find → Connect → Extend → Integrate → Build:

### Find
Multiple mature, values-aligned event ticketing platforms exist that serve Australian community organizations:
1. **Humanitix** — Australian social enterprise. 100% of profits donated to charity. Free for free events. Low fees for paid events. All features on all plans.
2. **TryBooking** — Australian. Very low fees (50c/ticket). Popular with community groups already.
3. **Pretix** — Open source, self-hostable. Best for data sovereignty purists.

### Connect
Every feature in the outcome definition maps directly to existing Humanitix features:
- Create events with details, dates, capacity → ✅ Native
- Attendee register/RSVP (free events) → ✅ Free events cost $0
- Purchase tickets (paid events) → ✅ 2.5% + $0.50 for charities
- Attendee management: check-in, waitlists, reminders → ✅ Scanning app, waitlist, email campaigns
- No data mining of attendees → ✅ Social enterprise model, not ad-funded
- Standalone web app → ✅ Already a standalone platform

### Stop Here
There is no gap. Humanitix is Australian, social-enterprise, values-aligned, and covers 100% of stated requirements. Building a competitor to a charity makes no ethical or practical sense.

## Constitutional Check
- **Triage Before Build:** ✅ Found excellent existing tools.
- **Honesty Over Output:** ✅ Recommending is the honest answer.
- **Harm Check:** ✅ Humanitix donates profits to charity. TryBooking is Australian-owned. Neither is extractive.

## Prediction Alignment
QUEUE.md predicts "Recommend Humanitix or TryBooking." I agree — the evidence makes this clear. My primary recommendation is Humanitix (better values alignment) with TryBooking as alternative.
