# Prioritization Frameworks

## 1. RICE Scoring

**Components:**
- **R**each: How many users will this affect? (1-10 scale)
- **I**mpact: How much will it improve outcomes? (0.25-3 scale)
- **C**onfidence: How sure are we? (0-100%)
- **E**ffort: Person-months required

**Formula:**
```
RICE Score = (Reach × Impact × Confidence) / Effort
```

**Scoring Table:**

| Reach | Users Affected | Score |
|-------|----------------|-------|
| 10 | All users (100%) | 10 |
| 7 | Most users (70%) | 7 |
| 5 | Half of users (50%) | 5 |
| 3 | Some users (30%) | 3 |
| 1 | Few users (10%) | 1 |

| Impact | Description | Score |
|--------|-------------|-------|
| 3 | Game-changer (massive outcome improvement) | 3 |
| 2 | Major improvement (significant outcome lift) | 2 |
| 1 | Incremental (nice to have) | 1 |
| 0.5 | Minor (tweak) | 0.5 |
| 0.25 | Minimal (cosmetic) | 0.25 |

| Confidence | Evidence Level | % |
|------------|----------------|---|
| High | Data-backed, proven elsewhere | 100% |
| Medium | Some data, educated guess | 80% |
| Low | Gut feel, hypothesis | 50% |

**When to use:** Comparing features with different scopes and resource requirements

---

## 2. MoSCoW Method

**Categories:**

### Must Have
- Critical for launch/regulatory compliance
- No workarounds exist
- Blocks other work
- **Rule:** If removed, the product fails

### Should Have
- Important but not critical
- Painful to omit but survivable
- Workarounds exist
- **Rule:** Include if resources allow

### Could Have
- Desirable if time permits
- "Nice to have"
- Low impact on outcomes
- **Rule:** First to cut if scope tightens

### Won't Have (This Time)
- Explicitly excluded
- Future consideration
- Acknowledged but deferred
- **Rule:** Document to avoid scope creep

**When to use:** Quick triage, stakeholder alignment, scope negotiations

---

## 3. Impact/Effort Matrix

**Visual 2x2:**

```
            HIGH IMPACT
                 │
    Quick Wins   │   Major Projects
    (Do first)   │   (Plan carefully)
                 │
─────────────────┼─────────────────
                 │
    Fill-ins     │   Time sinks
    (Avoid)      │   (Kill or rethink)
                 │
            LOW IMPACT
         LOW EFFORT    HIGH EFFORT
```

**Quadrants:**

| Quadrant | Action | Examples |
|----------|--------|----------|
| Quick Wins | Do immediately | Security patch, bug fix |
| Major Projects | Plan, resource, execute | New feature launch |
| Fill-ins | Do if bored, otherwise avoid | Refactoring for elegance |
| Time Sinks | Kill or radically rethink | Over-engineered solution |

**When to use:** Visual prioritization sessions, stakeholder presentations

---

## 4. Kano Model

**Categories:**

### Basic (Must-be)
- Expected by users
- Unnoticed when present
- Cause dissatisfaction when absent
- **Examples:** Security, accuracy, reliability

### Performance (One-dimensional)
- More is better
- Linear satisfaction curve
- Competitive differentiation
- **Examples:** Speed, accuracy, more features

### Excitement (Delighters)
- Unexpected but loved
- High satisfaction when present
- No dissatisfaction when absent
- **Examples:** Novel interactions, wow moments

### Indifferent
- Don't care either way
- **Rule:** Don't build these

### Reverse
- Disliked by some users
- **Rule:** Make optional or remove

**When to use:** Understanding user satisfaction drivers, innovation planning

---

## Framework Selection Guide

| Situation | Use This |
|-----------|----------|
| Comparing 5+ features with data | RICE |
| Scope negotiation with stakeholders | MoSCoW |
| Quick visual alignment | Impact/Effort |
| Understanding user satisfaction | Kano |
| Regulatory/compliance prioritization | MoSCoW (Must/Should) |
| Innovation/feature discovery | Kano |
| Sprint planning | Impact/Effort |

---

## My Hybrid Approach

**Step 1:** MoSCoW to separate Must/Should/Could  
**Step 2:** RICE to rank Should-haves  
**Step 3:** Impact/Effort to visualize top candidates  
**Step 4:** Kano check on top 3 to ensure we're building Performance, not just Basic

**Document format:**
```
Feature: [Name]
App: [HeartGuide / GlucoWise / BreathEasy / DocuFlow]
MoSCoW: [Must/Should/Could/Won't]
RICE: [Score] (R: X, I: Y, C: Z%, E: W)
Kano: [Basic/Performance/Excitement]
Impact/Effort: [Quadrant]
Decision: [Build/Defer/Kill]
```
