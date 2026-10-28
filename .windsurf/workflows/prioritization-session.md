---
description: Structured prioritization across multiple frameworks
---

## Feature Prioritization Session Workflow

1. Ask me to list the features or initiatives to prioritize
   - Accept a list (bullet points or numbered)
   - Ask for any missing context (user, problem, rough effort)
   - Confirm which app(s) are involved: HeartGuide, GlucoWise, BreathEasy, DocuFlow
   - Confirm the list before proceeding

2. Score each using RICE (Reach, Impact, Confidence, Effort)
   - Reference `pm-workspace/@frameworks/prioritization.md` for scoring tables
   - For each feature, assess:
     - Reach: How many users will this affect? (1-10)
     - Impact: How much will it improve outcomes? (0.25-3)
     - Confidence: How sure are we? (0-100%)
     - Effort: Rough person-months?
   - Calculate RICE score = (R × I × C) / E
   - Present in a table format

3. Re-score using MoSCoW (Must/Should/Could/Won't)
   - For each feature, categorize as Must-have, Should-have, Could-have, or Won't-have
   - Consider regulatory requirements (often Must)
   - Consider user pain intensity and clinical impact
   - Present MoSCoW categories with features listed

4. Cross-reference both and flag conflicts or surprises
   - Compare RICE ranking vs MoSCoW categorization
   - Flag any Must-haves with low RICE scores (why so costly?)
   - Flag any high RICE scores that are only Could-have (why deprioritized?)
   - Identify features where frameworks disagree
   - Ask clarifying questions if needed

5. Output a ranked table with recommended top 3 to tackle first
   - Combined scoring table with Rank, Feature, App, RICE, MoSCoW, Recommendation
   - Top 3 recommendations with rationale
   - Note any "quick wins" (high impact, low effort)
   - Note any "major projects" that need careful planning
   - Suggest sequencing: what to build first, second, third
