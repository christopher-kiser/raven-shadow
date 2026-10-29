# Target product specification: what the operator actually uses

This is a **future-facing product specification**, not a list of currently deployed screens. The v0.7 local staging console already has some early operator, intake, mission and neural activity views; the customer-facing, secure and commercial capabilities below require further engineering.

## Target founder workspace

| Area | What the founder should see and do | Information source and safeguard |
| --- | --- | --- |
| **Command Center** | Client engagements; active or blocked missions; Shadow verdicts; owner approvals; cost, latency and reliability; urgent discrepancies | Native task/evidence/telemetry and policy Store; never fake activity |
| **Client & Scope Manager** | Leads, intake stage, contract/permission scope, systems allowed, retention dates, owner/contact, next action | Authenticated organization records; separate billing and sales data where appropriate |
| **Raven Conversation** | Top-fed interactive Raven chat tied to one company/mission; 'why did Queen choose this?', 'what remains unverified?', 'what should I approve?' | Current canonical context, exact event IDs, source references and authority-aware action controls |
| **Queen Mission & Colony View** | Dynamic neural network without crown; worker families, peer messages, progress, attempts, failures, queues, costs | Event-backed worker registry and message trace; visually distinguish stale and idle nodes |
| **Sources & Context** | Approved uploads/connectors, provenance, source hashes, permissions, excerpt citations, freshness, revocation | Secure intake gateway and scoped canonical Store; no unauthorized source leakage |
| **Shadow Verification** | Intended contract, claimed result, independent observation, `PASS / FAIL / NOT ASSESSED`, proof class, discrepancies | Separately attributable verifier and authenticated observational evidence |
| **Recommendations & Change Control** | Compare proposed options; see risk, test results, approval scope, costs, rollout/canary and rollback | Policy engine; workers may propose but not silently promote consequential changes |
| **Reports & Deliverables** | Draft review, approved export, client-ready package, timeline and measured outcome | Evidence/approval manifest, review identity and secure delivery controls |
| **Business Operations** | Proposal pipeline, fees/invoices, customer support, service cases, renewal and unit economics | Auditable business records and appropriate payment/accounting integrations |
| **Administration** | Roles, devices, keys/connectors, permission policies, retention, incident logs, backups, service settings | Least privilege and multi-tenant controls; no secrets rendered in agent chat |

## A typical day after qualification

1. Founder opens Command Center and sees a client mission flagged for an unsupported AI success claim.
2. Raven summarizes the discrepancy using evidence citations and the mission's last verified state.
3. Founder asks Raven why Queen dispatched a specialist. Raven retrieves the actual handoff and alternate options.
4. Workers can investigate and message one another while the UI displays real transmission records. If an agent stalls, safe retry/escalation is visible.
5. Shadow independently compares the claim with a permitted observed outcome; missing evidence remains NOT ASSESSED.
6. Founder reviews a source-linked report and, if appropriate, authorizes a bounded follow-up. No arbitrary production write happens merely because Queen recommended it.
7. The system records approved delivery, outcome measurements, next review and any business follow-up.

## Customer portal (later milestone)

Start narrowly: access grant and expiry; sources submitted; clear investigation question and approved scope; read-only status; requests for missing evidence; signed/reviewed deliverable; support contact. Add detailed live-agent visibility only if it benefits customer trust, not because the interface can animate it.

## Essential acceptance criteria

- Every on-screen assertion has a resolvable canonical ID and provenance.
- No customer's data can appear inside another customer's workspace or Raven query.
- Shadow is not overwritten by Research or Queen narratives.
- Controls make it obvious whether an action is a **proposal**, an **approved action**, or an **observed outcome**.
- Local performance and model usage can be measured without keeping several expensive agents active.
- Interface failure cannot damage missions, evidence, permissions or durable worker messages.
