# KITCHEN TABLE v3 — ALIGNMENT & IMPROVEMENT PLAN
## Re-aligning the Nerve Centre with the Ecosystem
### Created: Feb 24, 2026

*The Kitchen Table (KT) is the operational heart of Kamunity. It must not only function as a mission control but also feel like Kamunity. This plan outlines the upgrade from v2 (functional data round-trip) to v3 (visual ecosystem alignment and frontier readiness).*

---

## 1. The Visual Alignment (Parchment & Ember)

Currently, the Kitchen Table has a functional but distinct visual style. It needs to inherit the core Kamunity design language established in `kamunity-consulting` and `kamunity-reflection`.

### 1.1 Palette Migration
Update `kitchen-table/css/kitchen.css` to use the canonical ecosystem variables:
- `--parchment` (`#F7F0E2`) — Background replacement
- `--bark` (`#4A3728`) — Primary text replacement
- `--ember` (`#C4622D`) — Warm accent, CTA buttons, active states
- `--sky` (`#2B6CB0`) — Sibling links, secondary actions
- `--moss` (`#7A8C6E`) — Status indicators, completed tasks

### 1.2 Topography & Flow
- **Remove "Boxes":** The current KT uses hard-edged cards for widgets. Transition to the "blob/rounded" card topography seen in `kamunity-reflection` (e.g., `border-radius: 24px` or irregular radii).
- **Typography:** Introduce the Georgia serif for headers and primary reading text, keeping a clean sans-serif for dense data tables.

---

## 2. Waymaker Interface Upgrade (The AI Orb)

Waymaker currently operates as a standard chat interface. It must adopt the "Orb" interaction model designed for Kai.

### 2.1 The Waymaker Orb
- Implement the glowing orb indicator (`radial-gradient`) in the Waymaker chat header.
- **Idle:** Ember pulse.
- **Thinking:** Fast ember pulse.
- **Speaking:** Blue/Indigo ripple.

### 2.2 Floating Output
- Transition Waymaker's output from rigid chat bubbles to the floating text model with a top-fade mask (`mask-image: linear-gradient`).
- This reinforces the "encounter" feel, even for internal operations.

---

## 3. Operational Coordination Enhancements (Frontier Report Alignment)

With revenue secure (KP-03 complete), the KT must coordinate the expansions identified in the Frontier Report.

### 3.1 Financial & Pipeline Widget
- **Current State:** The "Today" page shows rhythm, NLnet, and allies.
- **Upgrade:** Add a specific "Pipeline & Runway" widget. Since revenue is flowing, tracking paid engagements (Consulting, Audits, Workshops) against the monthly burn rate is critical.

### 3.2 The "Sync Protocol" Button
- **The Gap:** `data.js` and the `BRAIN/` markdown files can drift.
- **Upgrade:** Build a `/sync` slash command or a dedicated UI button in the Source Editor that cross-checks the JSON arrays in `data.js` against the Markdown truth and flags discrepancies. 

### 3.3 Phase 3 & 4 Preparations (Local Kai & Peer Routing)
- As we move toward open-weight models (Hugging Face / Groq) for specific tasks, the Kitchen Table needs an "API Switchboard" in its settings.
- **Upgrade:** A configuration panel allowing Mike to route specific Waymaker tasks to different models (e.g., "Use Haiku 3.0 for chat, use Llama-3 for data extraction").

---

## 4. Execution Sequence

| Step | Focus | Effort |
|---|---|---|
| **1. CSS Migration** | Replace variables, update typography, soften borders in `kitchen.css`. | 1-2 hours |
| **2. Waymaker Orb** | Port the CSS and logic from `kamunity-reflection` to `kitchen-table`. | 1 hour |
| **3. Pipeline Widget** | Add revenue tracking to the Today page. | 1 hour |
| **4. Sync Tooling** | Build the markdown ↔ js drift checker. | 2-3 hours |

*This plan bridges the gap between the functional success of KT v2 and the aesthetic/operational demands of the Kamunity v3 ecosystem.*
