# Cumulative product requirements — public view

No prior founder requirement is silently discarded as a result of a new idea. This public view summarizes intended capabilities; the **private master ledger** preserves the historical feature-by-feature decisions and implementation evidence.

**Status legend:** `LOCAL` = tested within bounded v0.7 local staging; `PARTIAL` = limited staging or documentation; `PENDING` = not delivered/qualified; `POLICY` = required rule applied or retained. These are **not** assertions of production readiness.

| ID | Requirement | Status | Milestone |
| --- | --- | --- | --- |
| PROD-01 | One company package → Raven investigation → Shadow assurance → reviewed deliverable | LOCAL: fictional only | M3-M4 |
| PROD-02 | Distinct Raven guide, Queen coordinator, independent Shadow engine | PARTIAL: native integration open | M2 |
| PROD-03 | Client workspace, scope, intake, reviewed reports and operator workflow | PARTIAL: local staging | M4-M6 |
| PROD-04 | Founder can ask Raven about Queen decisions within the same inquiry | PARTIAL: deterministic local briefing | M6 |
| PROD-05 | Raven messages displayed newest-first from top of conversation | PARTIAL: local audit briefing | M6 |
| PROD-06 | Optional Raven call/text interfaces with consent and auditable communication | PENDING | M6+ |
| AGENT-01 | Dynamic specialist and nested child workers | LOCAL: bounded controller workers | M2-M3 |
| AGENT-02 | Direct attributable worker-to-worker messages and acknowledgments | LOCAL: stage handoffs | M2-M3 |
| AGENT-03 | Autonomous execution of scoped work without continuous founder guidance | PARTIAL: allowlisted stages | M3-M5 |
| AGENT-04 | Self-detection, replay, safe retries, circuit breaker, DLQ, escalation | LOCAL: staging | M2-M4 |
| AGENT-05 | Controlled workflow learning/optimization from verified outcomes | PENDING | M5 |
| AGENT-06 | No arbitrary worker population cap; require resource/permission budgets and backpressure | POLICY / LOCAL: staged limits on active work | M2+ |
| UI-01 | No crown; Queen is central neural coordination node | LOCAL visualization | M6 |
| UI-02 | Real, expandable worker tree and visible message transmissions | LOCAL event projection | M6 |
| UI-03 | Explain who did what, when, why, using attributable evidence and events | PARTIAL: local | M6 |
| CTX-01 | One canonical project brain; never create a competing memory system | POLICY | M2 |
| CTX-02 | Provider-independent task/context handoff, import/sync by digest, conflict-safe changes | PENDING native integration | M2-M3 |
| CTX-03 | Reuse existing model router, with economical local inference option | POLICY / native route to audit | M2-M3 |
| INTAKE-01 | File/log/repository/diagram/document and controlled-connector gateway | PARTIAL: non-sensitive local files | M4 |
| INTAKE-02 | Preserve originals, source provenance, classification, identity and authorization | LOCAL hashing; enterprise rules pending | M4 |
| TRUST-01 | Independent Shadow checks, typed proof classes and explicit unknown | LOCAL: offline fixture | M3-M4 |
| TRUST-02 | Verify claims and reports against source/effect evidence; block fabricated completion | LOCAL: synthetic checks | M3-M4 |
| TRUST-03 | Distinct tenants, authenticated users, scoped tools, consent and audits | PENDING production | M4 |
| TRUST-04 | Permission-gated external writes, spend, deployment, deletion, notifications | POLICY; external actions disabled | M4-M5 |
| TRUST-05 | Isolated test/proposal/rollback with new independent verification | PENDING | M5 |
| ARCH-01 | Archive may propose cleanup only of identified colony-generated nonessential files | PENDING | M5-M6 |
| ARCH-02 | Queen approval before cleanup; never delete founder-created originals | POLICY, no deletion enabled | M5-M6 |
| OPS-01 | Observability, backup/restore, retention, incident response and change history | PARTIAL local, production pending | M4-M6 |
| OPS-02 | Reliable provider failover without losing canonical task/evidence state | PARTIAL design | M3-M5 |
| BIZ-01 | Repeatable client assessment, pricing and scope, contracts, secure delivery and support | PENDING commercial qualification | M4-M6 |
| BIZ-02 | Measure business outcome, wrongful-success detection and cost before scaling | PENDING pilot evidence | M3-M6 |

When a capability is delivered, update its status with **test evidence, actual source commit, limitations and next verification step**. Do not mark `PENDING` as `DONE` because a mockup or proposal exists.
