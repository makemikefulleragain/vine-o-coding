# VinoCode local release acceptance — 20 September 2026

## Outcome

The consolidated VinoCode source is accepted as a local release candidate. The six-step generator completes successfully, produces the approved eleven-file Core Plus pack, and remains usable at a 375 × 812 mobile viewport.

This acceptance does not authorise a GitHub push, Netlify deployment, domain change, redirect, or deletion.

## Evidence

- Source tests: 3 files and 12 tests passed.
- Production build: passed; 1,635 modules transformed.
- Dependency audit: 0 known vulnerabilities across 260 dependencies.
- Browser path: all six steps completed with a fictional community pantry project, including the persistent-data branch.
- Download: `river-pantry-foundation.zip` contained exactly the eleven files listed by `GENERATED_DOC_ORDER`.
- Trigger behaviour: the generated pack contained the expected shared-data and privacy/safety research triggers and did not falsely classify ordinary words containing the letters `ai` as an AI feature.
- Browser quality: no console errors or warnings and no horizontal overflow at 375 × 812.

## Defect found and closed

The acceptance run found that keyword detection used substring matching. The short keyword `ai` could therefore match ordinary words such as `details`, creating a false AI research trigger. Detection now requires term boundaries, and a regression test covers the failure.

## Public-site comparison (read-only)

| Address | Evidence on 20 September 2026 | Conclusion |
|---|---|---|
| `vine-o-coding.netlify.app` | Netlify deploy `6a9530e29afd19ad84e5e591`, published 31 August 2026 by API; public bundle contains all eleven Core Plus filenames, but its asset hash differs from this accepted local build. | Keep as the canonical public identity, but deploy the accepted source only after owner approval. |
| `outcome-vine.netlify.app` | Netlify deploy `699704d3878a25e21d97c997`, published 19 February 2026 from Git commit `73353d0`; public bundle contains only the earlier six-document pack. | Confirmed stale duplicate. Preserve it until the canonical release is deployed and verified, then handle redirect/retirement as a separate approved change. |

Both public addresses returned HTTP 200 with the configured CSP, HSTS, frame, content-type, referrer and permissions headers. No remote setting or deployment was changed during this review.

## Remaining release gates

1. Owner approves the exact GitHub push and canonical Netlify deployment.
2. Deploy this accepted source to `vine-o-coding.netlify.app` with a recorded rollback deployment.
3. Repeat the generator, eleven-file ZIP, mobile, console and security-header checks on the public deployment.
4. After canonical verification, owner separately approves the treatment of `outcome-vine.netlify.app` (recommended: redirect to the canonical address, not immediate deletion).
