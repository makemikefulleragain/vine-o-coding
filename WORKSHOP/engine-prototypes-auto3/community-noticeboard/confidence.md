# Confidence Score: community-noticeboard

## Decision: BUILD

### Research Signal: 18/25
Found the landscape clearly: Facebook Groups and Nextdoor are the dominant solutions, Discourse is the closest OSS option, no purpose-built noticeboard exists. Deduction: didn't deeply evaluate Discourse plugin ecosystem (might have auto-expiry plugins), and the GitHub "community-bulletin-board" repo was unexamined.

### Source Convergence: 15/25
Sources converge on the fact that Facebook Groups are the de facto community noticeboard. The absence of open-source alternatives is confirmed by negative search results. However, the "sovereignty vs practicality" tension isn't resolved by sources — it's a values judgment. Lower convergence because the decision rests partly on Constitutional values, not purely on empirical evidence.

### Constitutional Alignment: 23/25
Building directly serves community sovereignty. Recommending Facebook would conflict with Constitutional harm check (surveillance, data extraction, power concentration). The build provides an alternative that doesn't currently exist in open-source form.

### Build Confidence: 22/25
A noticeboard is one of the simplest possible web apps: create/read/list with categories, search, and expiry logic. Technically straightforward. High confidence the code will work. Minor risk: the demo's value proposition may be unclear without real community adoption.

## Total: 78/100

## Routing: EXECUTE with review_needed.md (60-79 range)
