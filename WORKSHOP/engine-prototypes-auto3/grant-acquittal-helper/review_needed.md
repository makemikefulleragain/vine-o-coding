# Review Needed: grant-acquittal-helper

## Confidence: 77/100 (60-79 range — build with review)

## Items Requiring Review

### 1. Domain Expertise Gap
The engine has no direct experience with grant acquittal processes. The assessment that "this is simple" is based on government documentation snippets and the stated requirements, not on domain knowledge. A community worker who has actually prepared acquittals should review whether the report format is genuinely useful.

### 2. Report Format Adequacy
The generated report includes: grant details, budget vs actual table, expense detail, narrative, and signature lines. This covers the basics per Community Grants Hub guidance. However, specific funders may require additional fields (e.g., co-contributions, in-kind support, participant numbers). The report may need customisation.

### 3. Financial Data Sensitivity
Grant financial data is sensitive. The tool uses localStorage (browser-only, no network transmission), which is appropriate for a demo. Production use would benefit from:
- Data export/backup functionality
- Clear guidance on data retention
- Consideration of shared computer scenarios

### 4. Prediction Disagreement Confidence
The engine contradicted the ESCALATE prediction. The reasoning is evidence-based (non-audited acquittals have flexible format, requirements are well-scoped). However, if the prediction was based on knowledge that acquittal complexity is higher than the stated requirements suggest, the engine may be underestimating scope. Review by someone with grants experience is warranted.
