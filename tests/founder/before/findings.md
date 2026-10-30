# Initial founder walkthrough — live baseline

Observed 2026-10-30T18:10:52.371Z to 2026-10-30T18:11:32.910Z in Edge 156.0.4314.50. Fresh session at https://christopher-kiser.github.io/raven-shadow/. The five served application assets match public baseline `23219010e478f3940b78f182c8615b862ead31aa`.

All A–H scenarios completed. Five focused control checks passed; no verified functional bug was found. Eighteen screenshots and exact visible text snapshots are preserved with the raw browser receipt. No private runtime was inspected. Resources are closed.

These findings distinguish UX judgments from missing future integrations. A working control is not proof of founder usefulness, customer readiness or native intelligence.

## F-01 — A: identify the engagement, current stage, blockers and next permitted action

**UX gap · P1 founder-workflow**

State: One fictional Acme workspace; overview before and after sample intake.

Steps: Open the live URL in a fresh browser. → Read the overview and available navigation before loading the sample. → Load the sample and return to the overview.

Expected: A compact engagement brief and lifecycle summary should expose the question, deadline, limits, current stage, blocker and next available action.

Observed: The overview exposes a claim/comparison, sources and generic navigation. The precise question/deadline/read-only constraints are available only after opening the scope source or report. There is no engagement-stage or review-obligation summary.

Status: Information exists but is distributed and difficult to use as a founder cockpit.

Business impact: Founder must reconstruct context across screens before deciding what to inspect or do next.

Smallest safe improvement: Add a single fictional engagement brief and state-derived next action, with links to the original scope and existing workflow.

Evidence: [a-empty-overview.png](a-empty-overview.png), [b-scope-evidence.png](b-scope-evidence.png), [h-day-overview.png](h-day-overview.png)

## F-02 — A/E: distinguish work not yet performed from insufficient evidence

**UX gap · P1 founder-workflow**

State: No sources loaded; internal dataset verdict is NOT RUN.

Steps: Open the fresh overview without loading or checking anything. → Compare the prominent comparison card with the adjacent Shadow panel.

Expected: Every summary should say the comparison has not run until the user runs it.

Observed: The comparison card says Not assessed while the adjacent Shadow verification badge says NOT RUN. The missing/stale cases later use NOT ASSESSED as an actual computed result.

Status: Implemented status labels are inconsistent; no false PASS was observed.

Business impact: Founder can confuse an unexecuted check with an evidence-based inability to establish the outcome.

Smallest safe improvement: Use an explicit Not run state consistently; reserve NOT ASSESSED for a completed comparison with insufficient evidence.

Evidence: [a-empty-overview.png](a-empty-overview.png), [f-missing-evidence.png](f-missing-evidence.png)

## F-03 — F: respond to missing, early or contradictory evidence

**UX gap · P1 founder-workflow**

State: FAIL or NOT ASSESSED displayed with explanatory check details and citations.

Steps: Load the sample and run baseline FAIL. → Select observation unavailable and run the check. → Select observation too early and run the check. → Inspect the overview then the internal report.

Expected: The visible blocker should lead to a clear permitted next step, with a distinction between demo actions and real authorized evidence collection.

Observed: The dashboard explains the reason but retains the same generic Run fictional check and report navigation. The concrete follow-up is lower in the report; the dashboard does not show an outcome-specific next action or evidence request boundary.

Status: Explanations and follow-up prose exist, but actionable guidance is dispersed.

Business impact: Founder can repeatedly rerun unchanged evidence or mistake a hypothetical variant for resolution of the original discrepancy. Existing what-if labels correctly warn that the baseline is unchanged.

Smallest safe improvement: Surface a deterministic source-linked next-step explanation for each state; keep real evidence requests unavailable.

Evidence: [e-baseline-fail.png](e-baseline-fail.png), [f-missing-evidence.png](f-missing-evidence.png), [f-stale-observation.png](f-stale-observation.png), [g-baseline-report.png](g-baseline-report.png)

## F-04 — E/G: understand what a PASS or FAIL does and does not establish

**UX gap · P1 founder-workflow**

State: Hypothetical business outcome PASS; all sample checks pass; native reviews not performed and release not approved.

Steps: Run hypothetical outcome present. → Read the PASS overview. → Open the report and review provenance, unknowns and release limitations.

Expected: Business outcome, sample integrity, external authenticity, investigation completeness, Quality, Queen and human release should be visibly separate.

Observed: The distinction is truthful in source descriptions, panel captions and report prose, but is not presented as a single ordered set of gates. The dominant PASS is easier to find than the outstanding review/authorization obligations.

Status: Correct proof boundaries exist; founder scanning and review eligibility are difficult.

Business impact: Non-engineers may overread a fictional PASS as a reviewed or releasable engagement despite the detailed disclaimers.

Smallest safe improvement: Expose separate outcome, evidence, review and release states; show unavailable/not-performed gates without inventing approvals.

Evidence: [e-hypothetical-pass.png](e-hypothetical-pass.png), [e-pass-report.png](e-pass-report.png), [g-baseline-report.png](g-baseline-report.png)

## F-05 — C/H: understand Queen roles and why the next stage matters

**UX recommendation · P2 enhancement**

State: Five authored timeline stages and six fixed illustrative roles; no live work.

Steps: Open Mission timeline, step once, play/pause and reset. → Open Colony map and select every role. → Inspect Queen and Raven responsibilities.

Expected: A founder should connect each illustrated responsibility to its expected input/output and relevant evidence while understanding that nothing is assigned or executing.

Observed: Role descriptions and synthetic labels are clear and interactive. The Queen inspector explains coordination generically; no compact mission brief, stage evidence handoff or founder decision appears alongside it.

Status: Existing illustration works; actual assignment/progress/peer-message capability is unavailable by design.

Business impact: Founder can learn the architecture but cannot easily map it to the current fictional engagement lifecycle.

Smallest safe improvement: Reuse the existing map and authored timeline; add source-linked illustrated responsibilities if useful. No diagram framework replacement is justified by observed behavior.

Evidence: [c-timeline-one-step.png](c-timeline-one-step.png), [c-queen-role.png](c-queen-role.png)

## F-06 — B/C: onboard a real organization and define a real mission

**Future integration · P1 founder-workflow**

State: One nonselectable fictional workspace and bundled sample intake only.

Steps: Click the Acme workspace label. → Inspect source-intake scope and available form controls. → Inspect Architecture and Roadmap.

Expected: A future real engagement needs authenticated client identity, written scope, source permissions, question, deadline and constraints.

Observed: The label is static and no customer selector, arbitrary upload, authentication or editable mission form exists. The dialog explicitly says no access grant is created. This is a deliberate production boundary, not a broken control.

Status: Not implemented in the public prototype; private implementation not assessed.

Business impact: The public app cannot onboard a customer or authorize a real investigation.

Smallest safe improvement: Clarify the single fictional engagement and the eventual authenticated interface contract; do not create a public client backend.

Evidence: [b-intake-dialog.png](b-intake-dialog.png), [h-architecture.png](h-architecture.png), [h-roadmap.png](h-roadmap.png)

## F-07 — H: supervise service health, costs, worker reliability and pending business obligations

**Future integration · P1 founder-workflow**

State: Source/check counts and zero real model calls; no live service connection.

Steps: Inspect overview metrics and every navigation route. → Read Architecture and Roadmap operational capabilities.

Expected: A real founder console requires attributable workload, cost, reliability, incidents, backups, customer follow-up and pending decisions.

Observed: Those operational records and telemetry do not exist in the public interface. The app honestly states no model/customer connection and labels the business capabilities future functionality.

Status: Unavailable here; private/native status intentionally unknown.

Business impact: The public app is not a business operating system or evidence of operational readiness.

Smallest safe improvement: Show honest connection/availability states; keep numeric telemetry, alerts, costs and customer records absent until canonical authenticated data exists.

Evidence: [h-day-overview.png](h-day-overview.png), [h-architecture.png](h-architecture.png), [h-roadmap.png](h-roadmap.png)

## F-08 — G/H: obtain review approval, release a report and follow up with a customer

**Future integration · P1 founder-workflow**

State: Local unapproved fictional Markdown export; no review or delivery record.

Steps: Inspect and export the baseline internal report. → Read the release boundary and all available report controls.

Expected: A pilot requires full-artifact Quality, Queen acceptance, exact human release, secure delivery and attributable follow-up.

Observed: Report export works and is labeled INTERNAL DRAFT / NO RELEASE APPROVAL. No approval, secure customer delivery, billing or follow-up actions exist.

Status: Local export implemented; production review/delivery operations unavailable by design.

Business impact: A file download cannot serve as customer-release authorization or a completed paid engagement.

Smallest safe improvement: Explain report eligibility and next authorized review step; document future integration rather than adding mock approval controls.

Evidence: [g-baseline-report.png](g-baseline-report.png), [baseline-export.md](baseline-export.md)

## Confirmed working

- Bundled fictional intake and source scope
- Original source text, SHA-256 display and citation navigation
- Baseline FAIL, explicit hypothetical PASS, missing and stale NOT ASSESSED
- Insufficient-evidence source fallback and original source download
- Internal report export exactly matches displayed Markdown and SHA-256
- Illustrative timeline controls and every colony role
- Seven routes at desktop/tablet/mobile; zero tablet/mobile overflow
- Keyboard skip link, mobile Escape and close/focus behavior
- No page errors, unexpected external app requests, backend writes or WebSockets

[Raw walkthrough](walkthrough.json) · [Structured findings](findings.json)

## Supplemental recovery and keyboard findings

Captured 2026-10-30T18:16:26.826Z to 2026-10-30T18:16:33.620Z before application changes. Six additional checks: three passed and three failed, representing two defect groups. The SHA-256 rejection was deliberately injected and restored; no spontaneous browser error occurred. Original A–H evidence is unchanged.

### F-09 — B/F: understand and recover from a failed source fingerprint operation

**Verified recovery bug under controlled failure · P1 founder-workflow**

Steps: Open sample intake and check consent. → Deliberately reject one SHA-256 operation in this browser only. → Activate Load selected sample. → Restore the original browser hashing implementation. → Inspect error location and retry availability. → Cancel, reopen, consent and retry to confirm successful recovery route.

Expected: A failed intake must expose the actionable error inside the modal and permit a clear retry once the transient failure is gone.

Observed: The error is only in the global toast behind the modal backdrop. The load button remains disabled even after hashing is restored; focus stays on the disabled load control. Cancel/reopen/reconsent succeeds, but the recovery is undisclosed.

Business impact: Founder sees no reason intake stopped and cannot use the visible primary action to recover.

Smallest safe improvement: Show an accessible inline intake error, restore retry state/focus, and preserve non-admission until all hashes succeed.

Evidence: [injected-intake-error.png](injected-intake-error.png), [recovery-and-keyboard.json](recovery-and-keyboard.json)

### F-10 — C: inspect authored timeline stages using the keyboard

**Verified keyboard focus bug · P2 enhancement**

Steps: Open Mission timeline. → Use Tab until a checkpoint button has focus. → Press Enter. → Repeat for each of the five checkpoint buttons.

Expected: Focus should remain on the activated checkpoint so the keyboard user can continue through the timeline.

Observed: All five activations leave document focus on BODY after the focused button is replaced. The next Tab restarts from early page navigation. Role selection retains focus; all source buttons remain keyboard reachable.

Business impact: Keyboard-only founders lose their place and must retraverse page navigation for each stage.

Smallest safe improvement: Preserve the active data-step identity through timeline rerender, as existing action/role controls already do.

Evidence: [keyboard-timeline-after-selection.png](keyboard-timeline-after-selection.png), [recovery-and-keyboard.json](recovery-and-keyboard.json)
