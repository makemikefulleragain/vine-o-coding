# Critique: sovereignty-calculator

## 7 Constitutional Questions

### 1. Does something already exist?
No. Checked enterprise SaaS management tools, open-source alternatives, and community-focused calculators. Nothing matches this specific use case for community organizations.

### 2. Is the outcome clearly defined?
Yes. Input: select tools. Output: three-dimension cost visualization. The test case is specific and verifiable.

### 3. Could this cause harm?
Low risk. The tool helps organizations understand their dependencies. It doesn't collect data, doesn't require accounts, and doesn't surveil anyone. The only risk is inaccurate cost estimates, which could mislead decisions — mitigated by clearly labeling values as estimates.

### 4. Is it scope-appropriate?
Yes. Single page, hardcoded data, no backend. This is a focused PoC.

### 5. Does it serve community sovereignty?
Directly. This is a sovereignty-awareness tool — its entire purpose is making invisible power dynamics visible.

### 6. Is the tech stack compatible?
Yes. Next.js + Tailwind, TypeScript. No exotic dependencies.

### 7. Can it be built in the time budget?
Yes. Single page with embedded data. The complexity is in the data curation (estimating realistic values) not in the code.

## Identified Biases
- **Estimation bias:** The data extraction values are estimates. I'll use conservative figures and clearly label them. The risk is either over-alarming (too high) or under-representing (too low) the costs.
- **Selection bias:** The tool list skews toward tools that community orgs use in Australia/Western contexts. Acknowledged and acceptable for a PoC.
- **Anti-SaaS bias:** The tool inherently frames SaaS as having hidden costs. This is the point of the outcome, but it's worth noting that SaaS also provides real value. The tool should acknowledge what you GET, not just what you give.

## Flagged Decisions
- I'll estimate ARPU-based data values conservatively. These are illustrative, not precise.
- I chose not to add a chart library — CSS-based visualization keeps it dependency-free.
