---
description: Generates a full PRD from a one-line feature description
---

## PRD Auto-Writer Workflow

1. Ask me: "What is the feature or problem you want to address?"
   - Capture the one-liner or rough idea
   - Ask clarifying questions if it's ambiguous
   - Confirm the primary user, app (HeartGuide/GlucoWise/BreathEasy/DocuFlow), and context

2. Load context from `pm-workspace/@knowledge/CLAUDE.md` and `pm-workspace/@frameworks/prioritization.md`
   - Read strategy, personas, and metrics framework
   - Read prioritization frameworks for later scoring
   - Hold these as context for PRD generation

3. Draft a full PRD using `pm-workspace/@templates/prd-template.md`
   - Fill in all sections: Problem, Goals, Users, Solution, Success Metrics, Risks, Timeline
   - Use the persona details from CLAUDE.md
   - Apply clinical and regulatory context where relevant
   - Use realistic metrics based on the domain
   - Flag any assumptions made

4. Ask me to confirm the Problem and Goals sections before continuing
   - Present Problem section: "Is this the right problem? Did I capture the pain accurately?"
   - Present Goals section: "Do these metrics make sense? Are they measurable?"
   - Wait for confirmation or edits before proceeding

5. Complete the full PRD and save it to `pm-workspace/@tasks/prd-[feature-name].md`
   - Generate remaining sections (Solution, Success Metrics, Risks, Timeline)
   - Apply prioritization framework scoring (RICE, MoSCoW)
   - Include open questions and dependencies
   - Save to the specified file path
   - Confirm save and provide summary
