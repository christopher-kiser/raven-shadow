# Dependency-based implementation roadmap

Design backward from a paid, repeatable assurance engagement: scoped promise → authorized intake → cited investigation → independent observation → reviewed deliverable → explicit client release → separately authorized remediation → new observation → retention/support. Build the shared trust foundation first. The full layer/business-process map is in PRODUCT_BLUEPRINT.md; the original ledger remains authoritative for cumulative scope.

| Milestone | Depends on | Deliverable and acceptance | Current state |
| --- | --- | --- | --- |
| RS-000 Repository/evidence baseline | Owner scope | Separate public/private repositories, clean import manifest, baseline tests, no private public content | Published; repository visibility and baseline commits verified |
| RS-001 Native reuse audit | RS-000 | File/symbol/test matrix, exact policy state, classify every major native/v0.7 component; one canonical brain | Audit complete; isolated adapter review pending |
| RS-002 Canonical intake and source snapshots | RS-001 | Explicit artifact selection, tenant scope, original bytes/hash and citations; duplicate/restart/tamper/poison tests; no second Store | Read-only snapshot verified in isolated tests; authenticated intake/parser work pending |
| RS-003 Scoped Queen and worker bridge | RS-002 | Existing assignments, role inheritance, peer receipts, fencing, budgets, recovery; duplicate/crash/escalation tests | Pending, do not replace Queen |
| RS-004 Independent Shadow observation | RS-002, RS-003 | Independent authorized read-only observer; settlement contracts; PASS/FAIL/NOT ASSESSED; fake-success and cross-tenant negatives | Synthetic oracle available; live observation blocked |
| RS-005 Novel-case investigation and report | RS-004, qualified native reasoning | Acme plus distinct held-out case, cited hypotheses/unknowns, full Quality then Queen acceptance; owner release separate | Synthetic source/oracle seam only; real-model qualification blocked |
| RS-006 Gated remediation and learning | RS-005 | Versioned proposal, isolated test, independently observed canary, exact authority, rollback drill, reviewed lesson promotion | Pending; no production actions |
| RS-007 Permissioned commercial pilot | RS-005, data/security/operations gates | Customer IAM/consent, privacy/retention, backup/incident playbooks, scope/pricing validation, reviewed delivery/support/billing | Pending; no customer service claim |

Cross-cutting work: provider-neutral context and Archive ownership, opt-in voice/phone, real event-backed neural view and portals. These remain requirements; none outranks the trustworthy investigation path. Do not expand UI before native evidence and permissions qualify.

Business operations owners: founder approves customer scope/pricing/release; Queen coordinates bounded work; Quality reviews complete artifacts; Shadow tests outcome claims against independent observations; Archive retains protected originals. Sales/CRM, contracting, support/SLA, billing, incident response, access review and privacy requests each require explicit lifecycle records and release gates before a pilot.

## GitHub tracking

- [RS-000](https://github.com/christopher-kiser/raven-shadow/issues/1)
- [RS-001](https://github.com/christopher-kiser/raven-shadow/issues/2)
- [RS-002](https://github.com/christopher-kiser/raven-shadow/issues/3)
- [RS-003](https://github.com/christopher-kiser/raven-shadow/issues/4)
- [RS-004](https://github.com/christopher-kiser/raven-shadow/issues/5)
- [RS-005](https://github.com/christopher-kiser/raven-shadow/issues/6)
- [RS-006](https://github.com/christopher-kiser/raven-shadow/issues/7)
- [RS-007](https://github.com/christopher-kiser/raven-shadow/issues/8)

## Campaign 002 milestone update

RS-002 now has a tested local-owner intake boundary and deterministic end-to-end source/contract/Shadow/internal-report workflow. Enterprise identity, delegated tenant sessions and legacy intake migration remain open. All later colony, recovery, Archive, communications and company requirements remain preserved. Tests are engineering evidence, not business readiness.

## Campaign 003 milestone update

Local owner-upload consolidation and protected workspace admission are implemented and adversarially tested. RS-002 stays open for remaining identity and investigation-source integration gates. Next: bind selected authorized source snapshots to the existing mission/task/worker read boundary before live reasoning qualification. No parallel Store, Queen, router or orchestration system is introduced.
