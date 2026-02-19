# Triage: data-export

## Find → Connect → Extend → Integrate → Build

### Find
No community platform provides room-level, user-initiated data export with both machine-readable and human-readable formats. Discourse has admin exports (CSV). Slack has workspace-level JSON exports (admin only). Discord has no meaningful export at all.

### Connect
GDPR Article 20 establishes the legal requirement for data portability. The Data Transfer Project defines standard data models. The dual-format (JSON + Markdown) approach exceeds both requirements by making data human-readable without special tools.

### Extend
Could potentially build on the Data Transfer Project's data models, but they're designed for platform-to-platform transfer, not for human consumption. The Markdown layer is the innovation.

### Integrate
N/A — no existing room-level export tool to integrate.

### Build
**Decision: BUILD.** This fills a genuine gap that directly serves kamunity.ai's sovereignty mission. Room-level, user-initiated, dual-format export is novel. JSZip enables a fully client-side PoC.

## Triage Result: BUILD
Justification: Major gap in existing platforms. Directly serves sovereignty. Well-scoped with proven technical approach (JSZip).
