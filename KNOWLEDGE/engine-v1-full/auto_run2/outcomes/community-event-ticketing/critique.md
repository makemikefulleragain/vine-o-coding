# Critique: community-event-ticketing

## Constitutional Questions

### 1. Does this serve community sovereignty?
**Yes.** Recommending Humanitix serves sovereignty — it's a social enterprise, not VC-funded, and donates profits to charity. TryBooking is Australian-owned. Pretix offers full data sovereignty via self-hosting. All three are better than Eventbrite. Building a new tool would not add sovereignty value.

### 2. Could this concentrate power?
**No.** Humanitix is a social enterprise. TryBooking is Australian-owned. Pretix is open source. None concentrate power. A custom build would arguably concentrate more power (single maintainer, no community, untested).

### 3. Could this be used for surveillance or data extraction?
**Low risk.** Humanitix is not ad-funded. Its business model is ticket fees donated to charity. However, attendee data is still hosted on Humanitix infrastructure — for maximum sovereignty, Pretix self-hosted is the answer.

### 4. Is the scope appropriate?
**Yes — because we're not building.** The recommendation is well-scoped: primary tool + alternatives + adoption path + cost + gaps.

### 5. Is the evidence sufficient?
**Yes.** Humanitix pricing page confirmed directly. TryBooking features confirmed. Pretix GitHub and docs confirmed. Multiple Australian-specific sources.

### 6. Was Triage honest?
**Yes.** Three mature tools found, all values-aligned, all covering 100% of stated requirements. No gap justifies building.

### 7. Am I biased toward building?
**Checked.** The only possible rationalization for building would be "we need it embedded in kamunity.ai" — but the outcome asks for a standalone web app, which these already are. No building bias detected.

## Critique of the Recommendation

### Weaknesses of Humanitix
- **Not open source.** Unlike Loomio, Humanitix is proprietary. If it fails or changes model, communities lose their platform.
- **Data hosted externally.** Attendee data is on Humanitix servers. Community doesn't own the data infrastructure.
- **Fees still exist for paid events.** 2.5% + $0.50/ticket adds up for large events. TryBooking may be cheaper.
- **Dependency risk.** Social enterprise status doesn't guarantee permanence.

### Mitigations
- Pretix exists as open-source fallback for sovereignty-maximalist orgs
- TryBooking provides competitive alternative keeping the market honest
- For free events (majority of community events), there are zero fees on any platform
- The alternative of building introduces much higher dependency risk (single developer, no support ecosystem)

### Could I have done more?
Could have tested Humanitix's actual event creation flow. Could have compared Humanitix vs TryBooking on specific community org use cases. But the core finding — mature tools exist, building is redundant — would not change.
