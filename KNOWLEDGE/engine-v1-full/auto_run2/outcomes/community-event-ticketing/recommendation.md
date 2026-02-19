# Recommendation: Use Humanitix for Community Event Ticketing

## Primary Recommendation: Humanitix
**Website:** https://humanitix.com/au
**Type:** Social enterprise (Australian-founded)
**Model:** 100% of profits donated to charity

## Why Humanitix Is the Right Answer

Humanitix is an Australian social enterprise that was built specifically to replace extractive ticketing platforms like Eventbrite. It donates 100% of its profits to charities providing education, healthcare, and basic necessities. It has donated $16.5M+ to date.

The outcome explicitly states community organisations "don't want to use Eventbrite" because it "takes a cut and mines attendee data." Humanitix directly addresses both concerns: its cut goes to charity, and it's not an ad-funded data mining operation.

**Feature match:**
| Outcome Requirement | Humanitix Feature |
|---|---|
| Create events with details, dates, capacity | ✅ Full event creation |
| Attendees register/RSVP (free events) | ✅ Free events = $0 cost |
| Purchase tickets (paid events) | ✅ Low-fee ticketing |
| Attendee management: check-in | ✅ Scanning app |
| Waitlists | ✅ Native waitlist feature |
| Reminders | ✅ Email campaigns |
| No data mining | ✅ Social enterprise model |

## How to Adopt

1. Sign up at humanitix.com/au (free, no contract)
2. Create your first event
3. Set ticket types (free or paid)
4. Share event link with your community
5. Use scanning app for check-in on event day
- **Setup time:** 15-30 minutes per event
- **No technical skill required**

## What It Costs

| Event Type | Fee | Notes |
|---|---|---|
| Free events | $0 | Completely free |
| Paid (standard) | 4% + $0.99/ticket | Excl. GST |
| Paid (charities/schools) | 2.5% + $0.50/ticket | Must qualify |
| Subscription | $0 | No subscription fees ever |

All plans include all features. No tiered pricing.

## Alternative: TryBooking

If Humanitix doesn't suit (e.g., need even lower fees), **TryBooking** (trybooking.com) is another Australian platform:
- Free events: $0
- Paid events: 50c/ticket (or 15c if ≤$5) + 2.5% processing
- Very popular with Australian community groups, schools, associations
- Simpler interface, less feature-rich than Humanitix

## Alternative: Pretix (for data sovereignty maximalists)

**Pretix** (pretix.eu) is open-source (Apache 2.0) and self-hostable:
- Community edition: Free (self-hosted)
- Full data sovereignty
- More complex to set up (requires server, Docker)
- Best for organisations with technical capacity who want zero third-party data access

## What Gaps Remain

- **Integration with kamunity.ai:** Humanitix is a separate platform. Embedding event creation/ticketing within kamunity.ai would require API integration (Humanitix has an API).
- **Data sovereignty:** Humanitix hosts data on their infrastructure. For full sovereignty, Pretix (self-hosted) is the better option but harder to adopt.
- **Customisation limits:** Humanitix allows design customisation but not full white-labelling on standard plans.

## Why NOT to Build a Replacement

- You would be building a competitor to an Australian social enterprise that donates profits to charity
- Ticketing involves payment processing, refunds, fraud detection, accessibility compliance — years of edge cases
- Humanitix already has scanning apps, email campaigns, analytics, waitlists, reserved seating
- Community organisations already know and use these platforms
- Development time should go to problems where no solution exists
