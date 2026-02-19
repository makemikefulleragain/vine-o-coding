# Spec: sovereignty-calculator

## Acceptance Criteria

1. **Tool Selection:** User can select SaaS tools from a predefined list of common community tools (Google Workspace, Slack, Canva, Eventbrite, Facebook Groups, WhatsApp, Zoom, Mailchimp, Trello, Discord).
2. **Three-Dimension Scoring:** For each selected tool, the app displays:
   - **Direct Cost:** Monthly cost (including likely upgrade triggers)
   - **Lock-in Score:** Migration difficulty (1-10) with explanation
   - **Data Extraction Value:** Estimated annual value of data the vendor extracts per user
3. **Aggregate View:** A summary visualization showing total hidden costs across all selected tools.
4. **Visual Output:** At minimum, a bar chart or score card showing the three dimensions. The "invisible made visible" moment.
5. **Test Case:** Selecting Google Workspace (free), Slack (free), Canva (free), Eventbrite (free), Facebook Groups, WhatsApp → output clearly shows significant hidden costs despite $0 direct cost.
6. **Standalone:** Runs as a single Next.js page, no database, no external API calls.
7. **Embeddable:** Built as a component that could be dropped into kamunity.ai.

## Technical Design

### Data Model
```typescript
interface SaasTool {
  id: string;
  name: string;
  icon: string;
  category: string;
  directCost: {
    freeTier: string;
    likelyMonthlyCost: number; // what orgs typically end up paying
    upgradeTrigggers: string[];
  };
  lockIn: {
    score: number; // 1-10
    dataExportEase: string; // easy/medium/hard
    migrationTime: string; // estimated hours
    alternatives: string[];
    explanation: string;
  };
  dataExtraction: {
    annualValuePerUser: number; // estimated $ value of data extracted per user per year
    dataTypes: string[]; // what data they collect
    explanation: string;
  };
}
```

### Architecture
- Single `page.tsx` with embedded tool data (JSON)
- Tailwind CSS for styling
- React state for tool selection
- Simple bar/radar chart using CSS (no chart library dependency needed for a PoC)
- Responsive, works on mobile

### Scope Boundaries
- Tool data is hardcoded (10 tools max)
- Values are estimates based on public ARPU data and migration difficulty assessments
- No user accounts, no persistence
- No API calls
