---
trigger: always_on
---

# PM Operating System Rules

## Source of Truth Files
- pm-workspace/GOALS.md — Identity statement + quarterly OKRs
- pm-workspace/@knowledge/CLAUDE.md — System brain (strategy, metrics, personas, glossary)
- pm-workspace/@tasks/active.md — This week's focus items
- pm-workspace/@frameworks/prioritization.md — RICE, MoSCoW, Impact/Effort, Kano
- pm-workspace/@templates/prd-template.md — Problem-first PRD format

## Workflow Triggers
- /context-refresh — Run at start of every session
- /weekly-review — Run every Friday or Monday
- /prd-writer — Run when creating a new PRD
- /prioritization-session — Run when comparing features or initiatives
- /outreach-prep — Run when preparing for company conversations
- /memory-update — Run at end of session to capture learnings

## Task Management
- Max 3-5 active tasks at any time
- Each task must have: What, Why, App, Done-when, Status
- Weekly review updates active.md
- PRDs saved to pm-workspace/@tasks/prd-[feature-name].md

## Anti-Patterns to Enforce
- Never describe prototypes as "deployed" or "live" products
- Never use "AI" as a feature rather than an enabler
- Never optimize for engagement over clinical outcomes
- Never ignore regulatory considerations
- Never add feature bloat without clinical validation
- Never buzzword-stack in any output
