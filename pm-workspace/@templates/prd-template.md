# PRD Template — Problem-First Format

## 1. Problem Statement

**What pain are we solving?**

- **Current state:** [Describe the broken experience today]
- **Pain intensity:** [Who feels it, how often, what does it cost them?]
- **Root cause:** [Why does this problem exist?]
- **Evidence:** [Data, quotes, observations that validate this problem]
- **App context:** [HeartGuide / GlucoWise / BreathEasy / DocuFlow]

**NOT:** "We need an AI feature"
**YES:** "Clinicians spend 45 min reviewing CGM data because current dashboards prioritize volume over clinical relevance"

---

## 2. Goals

### User Goals
- [What does the user want to achieve?]
- [What does success look like for them?]

### Business Goals
- [What does the business need?]
- [What metrics will move?]

### Clinical Goals
- [What outcome will improve?]
- [What is the measurable clinical impact?]

**NOT:** "Improve user experience"
**YES:** "Reduce time-to-insulin-decision from 45 min to 5 min, improving clinician adoption from 20% to 60%"

---

## 3. Users

### Primary User
- **Name:** [Dr. Sarah Chen / Maria Santos / James Williams / etc.]
- **Role:** [Cardiologist / Patient / CMO]
- **Context:** [When/where do they encounter this problem?]
- **Pain:** [Specific frustration]
- **Goal:** [What they want to achieve]
- **Constraints:** [Time, literacy, access, etc.]

### Secondary Users
- [If applicable, who else touches this?]

### Economic Buyer (if B2B2C)
- [Who pays/decides? What's their criteria?]

---

## 4. Solution

### Core Experience
**The 30-second pitch:**
"We help [user] do [job] by [approach], resulting in [outcome]"

### Key Features
1. **[Feature name]** — [One-sentence description]
   - User story: "As a [user], I want [goal], so that [benefit]"
   - Acceptance criteria: [What defines done?]

2. **[Feature name]** — [Description]
   - User story:
   - Acceptance criteria:

3. **[Feature name]** — [Description]
   - User story:
   - Acceptance criteria:

### Out of Scope
Explicitly NOT building:
- [Feature that seems related but isn't]
- [Future enhancement]
- [Edge case that doesn't justify complexity]

### Open Questions
- [What do we still need to learn?]
- [What might derail this plan?]

---

## 5. Success Metrics

### North Star Metric
[The ONE metric that captures value]

### Secondary Metrics
- **Clinical:** [HbA1c, readmission rate, exacerbation frequency, documentation time]
- **Product:** [Activation, retention, engagement]
- **Business:** [Adoption, revenue, cost savings]

### Counter-Metrics (Watch-outs)
- [What could improve while overall experience degrades?]
- [e.g., "Task completion time" might drop if we hide critical info]

### Targets
| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| [Metric 1] | [X] | [Y] | [Z weeks] |
| [Metric 2] | [X] | [Y] | [Z weeks] |

---

## 6. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1: e.g., Regulatory delay] | High | High | Engage FDA early, prepare 510(k) pathway |
| [Risk 2: e.g., Clinician resistance] | Medium | High | Pilot with early adopters, measure time-saved |
| [Risk 3: e.g., Technical complexity] | Medium | Medium | Phase rollout, start with rule-based before AI |

---

## 7. Timeline

### Phase 1: Discovery (Weeks 1-2)
- [ ] User interviews (5-8 clinicians)
- [ ] Workflow observation (2-3 sites)
- [ ] Competitive audit

### Phase 2: Definition (Weeks 3-4)
- [ ] Problem validation
- [ ] Solution sketching
- [ ] Technical feasibility check

### Phase 3: Prototype (Weeks 5-8)
- [ ] Wireframes
- [ ] Clickable prototype
- [ ] User testing (5-8 users)

### Phase 4: Build (Weeks 9-12)
- [ ] MVP development
- [ ] Clinical validation
- [ ] Regulatory documentation

### Phase 5: Launch (Week 13+)
- [ ] Pilot with 2-3 sites
- [ ] Measure outcomes
- [ ] Iterate based on feedback

---

## 8. Dependencies

### Internal
- [Design resources?]
- [Engineering capacity?]
- [Clinical advisory time?]

### External
- [Regulatory approval?]
- [EHR integration?]
- [Partner data access?]

---

## 9. Appendix

### Research Notes
[Links to interview notes, data analysis, etc.]

### Reference Documents
[Links to related PRDs, strategy docs, etc.]

### Decision Log
| Date | Decision | Context | Made By |
|------|----------|---------|---------|
| [Date] | [What was decided] | [Why] | [Who] |

---

## PRD Checklist

Before marking this PRD complete:
- [ ] Problem is validated with evidence, not assumed
- [ ] Goals are measurable, not vague
- [ ] Users are specific, not generic
- [ ] Solution addresses the stated problem
- [ ] Success metrics include leading and lagging indicators
- [ ] Risks include regulatory/clinical, not just technical
- [ ] Timeline accounts for validation, not just building
- [ ] A clinician could read this and understand what's being built

---

**Status:** [Draft / Review / Approved / Archived]
**Author:** [Name]
**Last Updated:** [Date]
**App:** [HeartGuide / GlucoWise / BreathEasy / DocuFlow]
**Stakeholders:** [Names]
