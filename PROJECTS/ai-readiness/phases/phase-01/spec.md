# Phase 1 Spec — The Quiz

## Acceptance Criteria

1. **Landing page** loads at `/` with clear value proposition — Priya understands what this is in under 30 seconds
2. **Quiz** accessible from landing page, presents 12 questions (3 per dimension) one at a time
3. **4-point Likert scale** for each question (Strongly Disagree → Strongly Agree, scored 1-4)
4. **Progress indicator** visible throughout quiz
5. **Results page** shows:
   - Radar chart across 4 dimensions
   - Dimension score summaries with plain-English interpretation
   - 3 personalised next-step recommendations based on lowest-scoring dimensions
   - Sensitive data warning for orgs handling vulnerable populations
6. **Mobile-first** — works beautifully on phones, tablets, and desktop
7. **No data collection** — everything client-side, nothing stored or transmitted
8. **Screenshot-friendly** — results fit in a single mobile viewport
9. **Accessible** — WCAG 2.1 AA: keyboard navigable, screen reader friendly, sufficient contrast
10. **Builds and deploys** — `npm run build` produces working `dist/`
11. **Design language** — moss green accent, warm and professional, companion to kamunity-audit.netlify.app

## The 12 Questions

### Dimension 1: Understanding (Q1-Q3)
1. "Our team has a shared understanding of what AI tools can and can't do."
2. "We could explain to a new staff member how AI might relate to our work."
3. "We know the difference between AI tools (like ChatGPT) and our existing software."

### Dimension 2: Current Use (Q4-Q6)
4. "Some people in our organisation are already using AI tools in their work."
5. "We have discussed as a team which tasks AI tools might help with."
6. "We have tried using an AI tool for a specific work task (e.g. drafting, summarising, research)."

### Dimension 3: Safety & Ethics (Q7-Q9)
7. "We have guidelines about what information staff should NOT put into AI tools."
8. "Our team understands that AI tools can produce incorrect or biased results."
9. "We've considered how AI use might affect the people and communities we serve."

### Dimension 4: Readiness to Act (Q10-Q12)
10. "Our leadership supports exploring how AI could help our organisation."
11. "We have someone who could champion a small AI pilot project."
12. "We could set aside a few hours for the team to learn about AI together."

### Scoring
- Each question: 1 (Strongly Disagree) to 4 (Strongly Agree)
- Dimension score: average of 3 questions, scaled to 0-100 for radar chart
- Overall score: average of 4 dimension scores

### Interpretation Bands
- **0-25%: Just Starting** — "You're at the beginning, and that's perfectly fine. Most community orgs are here."
- **26-50%: Building Awareness** — "You've started thinking about AI. Now it's time to get structured."
- **51-75%: Getting Organised** — "You have good foundations. Focus on filling specific gaps."
- **76-100%: Ready to Move** — "You're well-positioned. Time to put a plan into action."

### Personalised Recommendations
Based on lowest-scoring dimension(s), provide 3 specific, actionable recommendations. Examples:

**Low Understanding:**
- "Start with a 30-minute team lunch-and-learn about what AI tools actually do"
- "Try the Kamunity AI Prompt Kit — 20 practical prompts your team can test today"
- "Read our Plain English AI Guide — no jargon, just what community orgs need to know"

**Low Current Use:**
- "Pick ONE low-risk task to try with an AI tool this week (e.g. summarising meeting notes)"
- "Ask your team: 'Is anyone already using AI tools?' — you might be surprised"
- "Check our 'First Steps' guide for community-safe ways to experiment"

**Low Safety & Ethics:**
- "IMPORTANT: Create a one-page policy: 'Never put client names, case details, or personal information into any AI tool'"
- "Run our 10-minute Safety Checklist with your team"
- "If you handle sensitive data (health, family violence, children), seek specialist advice before AI adoption"

**Low Readiness to Act:**
- "Share your quiz results with your CEO or board — it's a great conversation starter"
- "Identify one AI-curious person on your team to be your AI champion"
- "Book a free 30-minute discovery call with Kamunity to talk through your options"

### Sensitive Data Warning
If ANY Safety & Ethics question scores 1, display prominent warning:
> "Your responses suggest your organisation may not yet have safeguards for sensitive data. If you work with vulnerable populations, we strongly recommend getting specialist advice before adopting AI tools. This quiz is a starting point, not a substitute for professional guidance."

## Technical Design

### Stack
- **React 18** + **React Router** for SPA routing
- **Vite** for build tooling
- **Tailwind CSS 3** for styling
- **Recharts** for radar chart
- **No backend** — all client-side

### Project Structure
```
src/
  main.jsx            # Entry point
  App.jsx             # Router setup
  index.css           # Tailwind imports + custom styles
  components/
    Layout.jsx        # Header, footer, navigation shell
    Landing.jsx       # Home/landing page
    Quiz.jsx          # Quiz flow (question display, navigation, progress)
    Results.jsx       # Radar chart + recommendations
    RadarChart.jsx    # Recharts radar wrapper
  data/
    questions.js      # Question bank with dimension mappings
    recommendations.js # Recommendation text by dimension/band
  utils/
    scoring.js        # Score calculation logic
```

### Design Tokens
- **Primary accent:** Moss green (#4A7C59)
- **Background:** Warm off-white (#FAFAF5)
- **Text:** Dark charcoal (#2D2D2D)
- **Secondary:** Soft sage (#8FB996)
- **Warning:** Warm amber (#D4A373)
- **Font:** System font stack (fast, accessible)

### Routing
- `/` — Landing page
- `/quiz` — Quiz flow
- `/results` — Results display

### Key Behaviours
- Quiz state managed in React state (not localStorage for Phase 1)
- Back/forward navigation within quiz
- Cannot skip to results without answering all questions
- Results page has "Take Again" and "Screenshot This" prompt
- Mobile: single question per viewport, large touch targets (min 48px)
