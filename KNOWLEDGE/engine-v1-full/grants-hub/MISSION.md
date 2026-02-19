# MISSION.md — Community Grants Hub

## Strategic Outcome

**Build a free, sovereignty-respecting tool that helps small Australian nonprofits manage their grant acquittals — from receiving the grant to submitting the final report.**

## Why This Matters

Small community organisations (under 20 staff, mostly volunteers) receive grants of $5K-$50K from government and philanthropic sources. The acquittal process — proving they spent the money as promised — is a significant burden:

- Volunteer treasurers spend hours matching receipts to budget lines in Excel
- Narrative reports are written from scratch each time
- Some orgs avoid applying for grants because acquittal is too hard
- Failed acquittals can blacklist orgs from future funding
- The Australian Community Grants Hub confirms most non-audited acquittals have "no specific format" — orgs over-engineer compliance out of fear

## What Exists (Starting Point)

A working HTML demo (`site/index.html`) that handles:
- Grant setup (funder, amount, budget categories, deadline)
- Expense logging against budget categories
- Budget vs actual dashboard
- Printable acquittal report with editable declaration
- Financial advice disclaimer

Currently uses localStorage (data lost if browser data cleared). Deployed on Netlify as a static site.

## What "Done" Looks Like (North Star)

A tool that a volunteer treasurer would:
1. **Find** when searching for help with grant acquittals
2. **Trust** enough to enter their grant data
3. **Use** throughout the grant lifecycle (not just at acquittal time)
4. **Recommend** to other orgs

This is a north star, not a Phase 1 target. The engine decides what to build in each phase based on research into what moves closest to this north star.

## Who This Is For

**Primary:** Volunteer treasurers and admin staff at small Australian nonprofits (community groups, sporting clubs, neighbourhood houses, men's sheds, community gardens, cultural associations)

**Secondary:** Grant managers at larger nonprofits who manage multiple small grants alongside their main programs

**Not for:** Large nonprofits with dedicated finance teams. Government grant administrators. Grant-writing consultants.

## Ecosystem Context

This tool exists in an ecosystem. It should integrate with, not replace:
- **Xero / MYOB** — accounting software many orgs already use
- **SmartyGrants** — grant application platform (handles applications, not acquittals)
- **GrantConnect** — government grant discovery portal
- **Community Grants Hub** — federal government grant administration
- **Lotterywest / Healthway / DevelopmentWA** — WA-specific funders with their own acquittal templates

## What This Is NOT

- Not accounting software (use Xero for that)
- Not a grant discovery tool (use GrantConnect)
- Not a grant application writer (use SmartyGrants)
- It IS the bridge between "we got the grant" and "we submitted the acquittal"
