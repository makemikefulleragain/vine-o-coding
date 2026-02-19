# Spec: grant-acquittal-helper

## Overview
A self-contained web tool that helps small community organisations prepare grant acquittal reports. Tracks budget categories, logs expenses, calculates budget vs actual, and generates a printable acquittal report.

## Acceptance Criteria
1. **Grant setup** — Enter grant details: funder name, grant name, total amount, reporting deadline. Define budget categories with allocated amounts.
2. **Expense logging** — Add expenses with: date, description, amount, budget category, receipt reference.
3. **Budget vs actual** — Dashboard showing per-category: budgeted, spent, remaining, percentage used. Color-coded (green=under, amber=close, red=over).
4. **Summary dashboard** — Total grant amount, total spent, total remaining, deadline countdown.
5. **Generate report** — Printable/downloadable acquittal report with: grant details, budget vs actual table, expense list, narrative field.
6. **CSV export** — Export expense list as CSV.

## Technical Design
- **Stack:** Single HTML file, React 18 + Tailwind via CDN
- **State:** localStorage persistence
- **Layout:** Tab navigation — Setup, Expenses, Dashboard, Report
- **Print:** CSS @media print for clean report output

## Mock Data
Pre-loaded example: "$15,000 Community Wellbeing Grant" with 4 budget categories and 8 sample expenses.

## Disclaimer
Tool includes clear notice: "This tool helps organize your acquittal data. It does not constitute financial advice. Always verify reporting requirements with your funder."

## Out of Scope
- Receipt image upload/storage
- Multi-grant management (one grant at a time for simplicity)
- Funder-specific report formats
- Audit-grade financial controls
