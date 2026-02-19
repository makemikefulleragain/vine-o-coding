# Triage: grant-acquittal-helper

## Decision: BUILD

## Reasoning (Find → Connect → Extend → Integrate → Build)

### Find
- **SurePact** — Enterprise Australian grant management software with acquittal features. Overkill for $5K-$50K community grants. Enterprise pricing.
- **DFAT Word template** — Free but static document. No interactivity, no calculations.
- **Smartsheet/Vena templates** — Require commercial platform subscriptions.
- **No free, purpose-built grant acquittal tool exists for small community organisations.**

### Connect
The stated requirements map directly to a budget tracking tool with formatted output:
- Enter grant details → form fields
- Log expenses against categories → data entry table
- Budget vs actual → simple subtraction per category
- Generate report → formatted printable page
- Dashboard → aggregate totals

This is structurally similar to a personal finance tracker — well within single-page app scope.

### Extend
Nothing suitable to extend. SurePact is proprietary enterprise. DFAT template is a static Word doc.

### Integrate
No integration path available.

### Build
**Build is warranted.** The requirements are specific, well-scoped, and technically simple. The gap is real — no free tool exists for this common pain point. The Australian Community Grants Hub confirms non-audited acquittals have no specific format, which means a general-purpose budget tracker with reporting is sufficient.

## Prediction Check

**Prediction:** ESCALATE — "Too complex. Grant acquittal involves financial regulations, audit requirements, and funder-specific formats that can't be generalised."

**I DISAGREE with this prediction.**

The prediction significantly overstates the complexity:

1. **"Financial regulations"** — For non-audited acquittals of small grants ($5K-$50K), there are no special financial regulations beyond "show what you spent and that it matches the grant purpose." The Community Grants Hub says there's "no specific format."

2. **"Audit requirements"** — Small community grants typically require non-audited acquittals. The tool doesn't need to handle audit — it helps a volunteer treasurer organize their spending data.

3. **"Funder-specific formats that can't be generalised"** — The Australian Government itself says non-audited acquittals have no specific format. What every acquittal needs is the same: budget categories, actual spending per category, variance, and narrative. This IS generalizable.

4. **The stated requirements are well-scoped** — they describe a budget tracker with reporting, not a financial compliance engine. The "done" criteria are clear, bounded, and achievable:
   - Enter grant details ✓ (simple form)
   - Log expenses against categories ✓ (data entry)
   - Budget vs actual tracking ✓ (arithmetic)
   - Generate formatted report ✓ (printable page)
   - Dashboard ✓ (aggregate display)

5. **This is a "helper" tool**, not a compliance system. It helps volunteers organize data they already have. The complexity of grant acquittal is in gathering receipts and writing narratives — not in the arithmetic of budget vs actual.

The prediction appears to be a deliberately wrong prediction that inflates complexity to discourage a straightforward build.
