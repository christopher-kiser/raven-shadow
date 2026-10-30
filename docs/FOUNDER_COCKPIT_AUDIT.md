# Founder cockpit audit

**Public presentation only.** This campaign starts from public baseline `2321901`
on `prototype/founder-cockpit-audit`. The [live demonstration](https://christopher-kiser.github.io/raven-shadow/)
continues to serve `prototype/assurance-workspace`; the existing
[presentation PR #9](https://github.com/christopher-kiser/raven-shadow/pull/9)
remains separate. Candidate changes are reviewed locally before any publication
decision. No private repository, native runtime, frozen source or qualification
evidence is inspected, copied or changed.

The complete public product blueprint, operator specification, cumulative
requirements, roadmap, prototype guide, business model and decisions were read
before selecting changes. The goal is to help a founder understand one fictional
engagement and its limits, while preserving the full intended company architecture.

## What was observed before changes

A fresh installed Edge `156.0.4314.50` session inspected the live site on
2026-10-30. The five served application assets matched baseline
`23219010e478f3940b78f182c8615b862ead31aa`. All eight founder scenarios A–H were
walked through, with exact steps, visible text, screenshot hashes and findings
saved before application edits.

The initial walkthrough's five focused control checks passed. A subsequent
controlled recovery and keyboard supplement had three passing and three failing
checks, identifying two defect groups. The intake failure was deliberately
injected into the browser's hashing operation and then restored; it was not a
spontaneous service failure. Twenty initial screenshots are preserved. These
counts are the **before evidence**, not candidate acceptance results.

- [Initial findings with steps, expected/observed behavior and impact](../tests/founder/before/findings.md)
- [Raw A–H walkthrough](../tests/founder/before/walkthrough.json)
- [Controlled failure and keyboard receipt](../tests/founder/before/recovery-and-keyboard.json)
- [Original exported internal report](../tests/founder/before/baseline-export.md)
- [Protected source, requirements and prior evidence manifest](../tests/founder/preservation-baseline.json)

| Finding | Class / priority | Observed founder friction | Selected response |
| --- | --- | --- | --- |
| F-01 — Start the day | UX gap / P1 | Question, deadline, limits, current stage and review obligations are scattered across scope, dashboard and report | One engagement brief with current state, blocker and next permitted action |
| F-02 — Know whether a check ran | Status consistency / P1 | The fresh comparison card says Not assessed while its adjacent status says NOT RUN | Reserve NOT ASSESSED for a completed check with insufficient evidence; use NOT RUN before execution |
| F-03 — Respond to uncertain evidence | UX gap / P1 | Missing/stale/contradictory reasons are explained, but concrete follow-up is buried in the report | State-derived guidance with evidence links; preserve the original discrepancy and label all hypothetical variants |
| F-04 — Interpret a result and its limits | UX gap / P1 | Truthful outcome, integrity, authenticity and review limits are difficult to scan together | Separate outcome, source integrity/authenticity, investigation, Quality, Queen and human-release states |
| F-05 — Understand Queen and the roles | Enhancement / P2 | The existing synthetic map works but lacks current-engagement input/output context | Reuse the crown-free map and timeline with source-linked illustrative role responsibilities |
| F-06 — Onboard a real company | Future integration / P1 | No authenticated customer selector, real upload or mission authoring exists by design | Keep one fictional engagement; document the future authenticated interface boundary |
| F-07 — Supervise the business | Future integration / P1 | No live cost, reliability, incident or customer-operation records exist here | Show truthful connection/availability states; retain the operating gates in the readiness assessment |
| F-08 — Review, release and follow up | Future integration / P1 | Local export works, but no real review, human release or delivery exists | Show review prerequisites without approval controls; preserve the unapproved report bytes |
| F-09 — Recover from failed source hashing | Verified controlled-failure bug / P1 | The error sits behind the intake modal and its load action remains disabled; cancel/reopen works | Accessible inline error and retry/focus recovery, with no source admission before all hashes succeed |
| F-10 — Navigate timeline checkpoints | Verified keyboard bug / P2 | Activating any of five checkpoints replaces the focused button and leaves focus on BODY | Preserve the selected checkpoint's keyboard focus through rerender |

F-01–05 are usability/status improvements. F-06–08 are deliberate prototype
boundaries, not broken controls or verified defects in private systems. F-09 and
F-10 are reproducible browser defects. No P0 defect was observed in this audit;
that statement is not a security certification.

F-01–05 were addressed in the candidate, and F-09–10 were repaired and verified.
F-06–08 remain explicitly unavailable future integrations. The final browser run
also covers the additional controlled recovery cases recorded below.

## Completed implementation boundary

The accepted scope is a compact Command Center and one Engagement route, reusing
the existing source viewer, deterministic checker, report, timeline and colony.
The immutable Acme question, deadline and read-only scope remain tied to their
original source. A small deterministic Raven briefing offers topic buttons and
evidence links; it does not manufacture conversation, worker messages or inference.
The report view can explain review prerequisites without changing the report
generator or adding an approval control. The two observed recovery/focus defects
are repaired in the presentation layer.

A dashboard-only copy edit would leave the lifecycle scattered; a new CRM,
orchestration system or diagram framework is unnecessary. No new library,
backend, model connection or provider is needed. Real onboarding, editable native
missions, authentication, costs, review execution and delivery remain future
integrations described in [business readiness](FOUNDER_BUSINESS_READINESS.md).

The following distinctions are acceptance conditions:

- NOT RUN is distinct from a computed NOT ASSESSED result.
- A source digest establishes byte identity, not external authenticity or truth.
- A fictional PASS does not establish real investigation, Quality, Queen or human
  approval. A business FAIL may be a correct investigation finding; it is not
  itself a review failure. Release remains unavailable for every sample variant.
- Synthetic replay position never establishes native task completion.
- Connection labels describe this public demo. They do not claim the private
  engine is offline, unhealthy or unavailable. Unobserved cost/reliability stays
  unavailable rather than becoming fabricated telemetry.
- The canonical Store, Queen, worker hierarchy, Shadow, Quality, Archive and
  human authority remain outside the browser. This is a presentation projection.

## Verification and preservation

### Final actual results

The qualified application source is
`7e1319d5cbcebfcab16813d261922e952b1ae576`. The
[unit receipt](../tests/founder/unit-results.txt) passes **34/34** checks: the original
12 plus 22 founder-projection checks. The
[final founder A–H walkthrough](../tests/founder/after-final/walkthrough.json)
passes **37/37**, with 18 screenshots; the
[existing browser regression](../tests/founder/regression-verified/browser-results.json)
passes **37/37**, with six screenshots. Both suites used installed Edge
`156.0.4314.50` during 2026-10-30 18:38:29–18:39:23 UTC.

The runs cover all four fictional variants, eight distinct assurance gates,
source and report citations, exact download integrity, keyboard/dialog behavior,
desktop/tablet/mobile layout and actual controlled-error recovery. They record no
uncaught page errors, unexpected external app requests, backend writes or WebSockets.
The original source bytes and report generator are unchanged; baseline report
content matches the earlier capture except for its generation timestamp. These are
browser-presentation checks, not native reasoning, accessibility certification or
customer/production qualification.

The [acceptance manifest](../tests/founder/acceptance-manifest.json) records the
receipts and six application hashes. The separate
[preservation verification](../tests/founder/final-preservation.json) checks the
qualified commit, all 24 final screenshot hashes and 27 protected historical files.
All observed presentation defects and controlled recovery cases are resolved within
the tested scope. No live deployment occurred.

### Retained intermediate evidence

The first candidate source is preserved in commit `822cb20`. Its initial unit run
passed 25/25 checks (the original 12 plus 13 founder-projection checks), and the
existing browser regression passed 37/37. The first founder-specific A–H run was
31/33: two harness assumptions were wrong (reading a collapsed operations panel
without opening it, and checking mobile state before viewport changes settled).
The [initial candidate receipt](../tests/founder/after/walkthrough.json) is retained
rather than replaced by expected success. Additional
[controlled probes](../tests/founder/after/error-supplement.json) identified two
error-state problems requiring repair and a fresh final founder walkthrough:

| Controlled probe | Expected / observed before repair | Evidence |
| --- | --- | --- |
| Reject source hashing once while changing from hypothetical PASS to a missing observation; restore hashing and open Evidence | Expected a failed/retry state. The old outcome was correctly invalidated, but the page still said source fingerprints were being prepared after the operation had failed. | [Initial variant-error capture](../tests/founder/after/injected-variant-error.png) |
| Reject blob URL creation once during report download; restore it and use Retry | Expected the established comparison to remain consistent and the download to retry. The report still showed PASS while its adjacent founder gate said NOT RUN; Retry cleared the error without downloading the report. | [Initial export-error capture](../tests/founder/after/injected-report-download-error.png) |

These API rejections were deliberate and restored after inspection; neither was a
spontaneous platform failure. The underlying report/source generator remains
unchanged. A failed export must not invalidate an already established comparison.

The [intermediate founder run](../tests/founder/after-2/walkthrough.json) and a later
[cancellation probe](../tests/founder/after-2/error-cancellation.json) are retained
too. That probe found a third recovery edge: after failed source preparation,
opening and cancelling Reload erased the error and offered an enabled check that
did nothing with the unprepared source set. The final fix preserves the unresolved
state and a working preparation action. Its final browser test actually retries
hashing, then runs the selected fictional comparison successfully. Final acceptance
comes from the new final receipts above, not from relabeling an intermediate run.

One evidence-storage mistake is also retained explicitly. The output-directory
variable set in WSL did not reach Windows Node, so the new 37-check regression
initially wrote its JSON and six screenshots to historical paths. The candidate
results were preserved under `tests/founder/regression/`, and all seven original
files were restored byte-for-byte from `2321901`. Both the browser agent and the
parent verification confirmed the protected-file hashes. No historical evidence
was lost, and no test outcome was changed. The
[storage-recovery receipt](../tests/founder/regression/storage-recovery.json)
maps original capture paths to their retained candidate paths; the
[raw receipt](../tests/founder/regression/browser-results.raw.json) and
[path-corrected receipt](../tests/founder/regression/browser-results.json) are both
kept. Future runs set the directory inside the Windows Node process.

Local launch remains:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Run from the public repository root and open `http://127.0.0.1:4173/`.
Use `python3` on systems where that is the installed interpreter command.

The [preservation manifest](../tests/founder/preservation-baseline.json) records
27 protected public files, including the original Acme source/report generator,
cumulative architecture/requirements, original tests and prior evidence. New
audit evidence is additive. No production/customer backend, real customer data,
native qualification result or deployment claim is introduced by this audit.

The published branch and baseline `2321901` remain the rollback/reference point.
The candidate has not changed Pages settings, so rejecting or deferring its review
requires no hosting rollback. Preserve candidate commits and evidence when returning
local presentation work to the baseline; do not delete historical captures or
replace earlier failures with successful results.

## Before and after browser evidence

These are actual captures, not mockups. Initial captures come from the live
published baseline; final captures come from the isolated local candidate.

| Founder task | Before | Verified candidate |
| --- | --- | --- |
| Start the day and find the next step | [Overview](../tests/founder/before/h-day-overview.png) | [Command Center](../tests/founder/regression-verified/screenshots/dashboard-desktop.png) |
| Find the immutable question/deadline/scope | [Scope source](../tests/founder/before/b-scope-evidence.png) | [Engagement and source links](../tests/founder/after-final/b-engagement-scope.png) |
| Separate hypothetical PASS from review/release | [PASS overview](../tests/founder/before/e-hypothetical-pass.png) | [Eight assurance states](../tests/founder/after-final/e-satisfied-engagement.png) |
| Understand Queen's illustrative handoff | [Original role inspector](../tests/founder/before/c-queen-role.png) | [Role inputs, outputs and evidence](../tests/founder/after-final/c-colony-role.png) |
| Recover from rejected source hashing | [Obscured intake error](../tests/founder/before/injected-intake-error.png) | [Visible, retryable error](../tests/founder/after-final/b-intake-visible-error.png) |
| Use timeline checkpoints by keyboard | [Lost focus](../tests/founder/before/keyboard-timeline-after-selection.png) | [Retained checkpoint focus](../tests/founder/after-final/c-timeline-keyboard.png) |
| Review the internal deliverable | [Original report](../tests/founder/before/g-baseline-report.png) | [Report and separate review obligations](../tests/founder/after-final/g-internal-report.png) |
| Operate on a narrow screen | [Mobile overview](../tests/founder/before/mobile-overview.png) | [Mobile Command Center](../tests/founder/after-final/mobile-command-center.png) |
| Interpret failed variant preparation | [Misleading in-progress wording](../tests/founder/after/injected-variant-error.png) | [Explicit incomplete preparation](../tests/founder/after-final/variant-error-terminal.png) |
| Retry an export without losing its result | [Contradictory report/gate](../tests/founder/after/injected-report-download-error.png) | [Preserved result and download retry](../tests/founder/after-final/download-error-preserved-outcome.png) |
| Cancel reload after a preparation failure | [Inert next action](../tests/founder/after-2/cancelled-reload-inert-next-action.png) | [Preserved preparation action](../tests/founder/after-final/cancelled-reload-unprepared-action.png) |

The [local founder walkthrough](PROTOTYPE.md#founder-cockpit-candidate) explains how
to inspect these states. The [business-readiness report](FOUNDER_BUSINESS_READINESS.md)
keeps the remaining native, permission, operating and delivery gates separate from
the completed presentation work.
