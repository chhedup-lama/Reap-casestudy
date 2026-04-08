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
