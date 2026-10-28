# DocuFlow — Product Requirements Document

| Field | Value |
| --- | --- |
| Prepared by | Francisco Pinheiro, MD |
| Date | 2026-10-28 |
| Version | 1.0 |
| Status | Draft — case study / prototype |
| Framing | Case study + working UI (not a cleared medical device) |
| Scope | Clinical documentation workflows (not general docs) |

> Time-saved / accuracy numbers are **targets / hypotheses**, not measured results.

---

## 1. Executive Summary

Clinician documentation burden drives burnout and note quality risk. **DocuFlow** specifies a clinical documentation workflow: capture visit context → draft structured notes (e.g. SOAP-style) → **clinician review/edit** before chart use — with privacy-minded processing patterns.

This PRD covers the portfolio prototype used for product storytelling and UX exploration.

---

## 2. Product Overview

- **Problem:** After-hours charting; cloud scribe privacy concerns; inconsistent note structure.
- **Solution framing:** Structured draft generation + mandatory human review + privacy-aware architecture narrative.
- **Users:**
  - Clinicians writing visit notes
  - Clinical ops / quality leads caring about consistency
- **Non-goals:** Fully autonomous charting without review; replacing the legal medical record system of record

---

## 3. Objectives *(targets / hypotheses)*

| Objective | Target / hypothesis |
| --- | --- |
| Time | Reduce documentation minutes per encounter in a future pilot |
| Quality | Higher completeness of required note sections |
| Trust | Clinicians edit rather than blindly accept drafts |
| Privacy | Prefer local/controlled processing patterns in the product story |

---

## 4. Requirements

### 4.1 Personas
- **Dr. Chen (internist):** 20+ patients/day; hates pajama-time charting.
- **Compliance lead:** Needs auditability and no silent PHI exfiltration story.

### 4.2 Core flows

| ID | User story | Priority | Acceptance criteria |
| --- | --- | --- | --- |
| DF-01 | Start from visit transcript/context | Must | Input area for notes/transcript |
| DF-02 | Generate structured draft (SOAP-like) | Must | Sections clearly labeled |
| DF-03 | Edit before finalize | Must | Full edit; no auto-submit to EHR |
| DF-04 | See privacy mode framing | Should | UI copy explains controlled processing intent |
| DF-05 | Export/copy draft | Should | Clinician can copy reviewed text |

### 4.3 Non-functionals
- Explicit human-in-the-loop
- No claim of zero-risk / “never leaks” as a proven guarantee
- Prototype may simulate local SLM behavior in the working UI

---

## 5. Risks

| Risk | Mitigation |
| --- | --- |
| Hallucinated clinical content | Mandatory review; highlight uncertain spans (future) |
| Overclaiming privacy | Soften public copy to “privacy-minded” / controlled processing |
| Workflow mismatch with real EHR | Position as workflow prototype, not EHR replacement |

---

## 6. Roadmap (prototype)

1. Structured draft + review UI (demo)  
2. Stronger evaluation rubric for note quality (skill-building)  
3. FHIR DocumentReference / export themes (future)

**Working UI:** https://docu-flow-franciscos-projects-73f8717a.vercel.app/  
**Showcase:** `/docuflow-showcase` on the portfolio site
