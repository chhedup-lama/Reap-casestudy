# Reap AI Platform — KYB Review Copilot: Technical PRD

A static GitHub Pages website providing the technical deep-dive layer for the KYB Review Copilot PRD submission.

## Structure

```
reap-kyb-prd/
├── index.html              # Home page — 8-block card grid (39 sections)
├── css/styles.css          # Stripe Docs-inspired design system
├── js/main.js              # Mermaid.js init + interactions
└── sections/               # 39 HTML section pages
    ├── Block 1: Executive Framing (5 sections)
    ├── Block 2: Users & Workflow (5 sections, 1 diagram)
    ├── Block 3: Product Scope (5 sections)
    ├── Block 4: Solution Architecture (5 sections, 2 diagrams)
    ├── Block 5: Retrieval & Reasoning (5 sections, 1 diagram)
    ├── Block 6: Governance (5 sections, 2 diagrams)
    ├── Block 7: Delivery Strategy (5 sections, 2 diagrams)
    └── Block 8: Measurement & Recommendation (4 sections)
```

## Mermaid Diagrams (8 total)

| Section | Diagram Type |
|---------|-------------|
| 2.5 Reviewer Workflow | Swimlane flowchart |
| 4.1 E2E Solution Architecture | System architecture flowchart |
| 4.2 Data Model | Entity-relationship diagram |
| 5.3 Policy-Grounded Retrieval | Detailed flowchart |
| 6.1 HITL & Fallback Control | Decision gate flowchart |
| 6.2 Audit & Logging | Event pipeline flowchart |
| 7.1 Workflow State Transitions | State machine diagram |
| 7.2 Platform Reuse Map | Service layer diagram |

## Deployment

Push to `main` branch of `https://github.com/chhedup-lama/Reap-casestudy`.  
Enable GitHub Pages → Source: main branch, root folder.  
Site will be live at: `https://chhedup-lama.github.io/Reap-casestudy`

## Status

Stubs built — ready for content population section by section.
---

## Extended Technical README

<div align="center">

### Reap AI Platform — KYB Review Copilot  
Technical PRD — Deep-Dive Documentation Site

</div>

This repository hosts the **technical deep-dive layer** for the KYB Review Copilot PRD.  
It is designed as a Stripe Docs–style, single-page documentation experience with linked section pages and diagram support via **Mermaid.js**.

### Purpose

- Communicate the end-to-end design of the KYB Review Copilot.  
- Align product, engineering, data, and risk/compliance stakeholders on a shared source of truth.  
- Provide an implementation-ready blueprint (APIs, data flows, governance, rollout plan).  

The site is intended to be deployed either via **GitHub Pages** or **Vercel** as a static site.

### Repository Structure (Detailed)

```text
/
├── index.html          # Home page — 8-block card grid (39 sections)
├── css/                # Stripe Docs–inspired visual system
│   └── styles.css      # Layout, typography, tokens, responsive grid
├── js/
│   └── main.js         # Mermaid.js init + basic interactions
└── sections/           # 39 HTML section pages (PRD deep-dive)
    ├── Block 1 — Executive Framing          (5 sections)
    ├── Block 2 — Users & Workflow           (5 sections, 1 diagram)
    ├── Block 3 — Product Scope              (5 sections)
    ├── Block 4 — Solution Architecture      (5 sections, 2 diagrams)
    ├── Block 5 — Retrieval & Reasoning      (5 sections, 1 diagram)
    ├── Block 6 — Governance                 (5 sections, 2 diagrams)
    ├── Block 7 — Delivery Strategy          (5 sections, 2 diagrams)
    └── Block 8 — Measurement & Recommendation (4 sections)
```

### Content Blocks & Diagrams

The PRD content is organized into eight thematic blocks:

1. **Executive Framing** — Problem statement, objectives, constraints, and success criteria.  
2. **Users & Workflow** — Personas, reviewer workflow, operating model, and UX framing.  
3. **Product Scope** — KYB copilot features, non-goals, and guardrails.  
4. **Solution Architecture** — System components, services, and integration points.  
5. **Retrieval & Reasoning** — Data sources, retrieval strategy, and RAG orchestration.  
6. **Governance** — Controls for HITL, fallback, and policy compliance.  
7. **Delivery Strategy** — Phasing, rollout, migrations, and operational readiness.  
8. **Measurement & Recommendation** — KPIs, quality loops, and recommendation surfaces.

Key Mermaid diagrams:

- Reviewer workflow (swimlane).  
- End‑to‑end solution architecture.  
- Data model (ERD).  
- Policy‑grounded retrieval flow.  
- HITL & fallback control gates.  
- Audit & logging event pipeline.  
- Workflow state transitions.  
- Platform reuse map across services.  

### Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — No build step required.  
- **Mermaid.js** — Client-side diagram rendering.  
- **Responsive layout** — Optimized for desktop review, but usable on tablets.  
- **Static hosting** — Compatible with GitHub Pages, Vercel, Netlify, or any static file host.  

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/chhedup-lama/Reap-casestudy.git
   cd Reap-casestudy
   ```
2. Open `index.html` in your browser:
   - Option A: Double-click `index.html` from your file explorer.  
   - Option B: Serve locally via a simple HTTP server (recommended):
     ```bash
     # Example using Python 3
     python -m http.server 8000
     # then open http://localhost:8000 in your browser
     ```
3. Navigate via the 8-block card grid to explore all 39 sections.

### Editing & Contribution Workflow

- Edit existing sections under `sections/` for content changes.  
- Add new sections as HTML files and link them from `index.html`.  
- Wrap any Mermaid diagrams in the expected container so `js/main.js` can initialize them.  
- Open PRs describing which blocks/sections you changed, any new diagrams, and any layout/token tweaks.

### Current Status & Roadmap

- ✅ Scaffolding and navigation in place.  
- ✅ Mermaid diagrams wired and rendering.  
- 🚧 Content population across all 39 sections.  
- 🚧 Iterative design polish (spacing, typography, interactions).  

Treat this repository as **proprietary internal documentation** unless a license is explicitly added.
