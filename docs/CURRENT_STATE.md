# Current verified state

## Founder cockpit candidate — 2026-10-30

The public-only `prototype/founder-cockpit-audit` branch starts from `2321901`.
A fresh live A–H founder walkthrough preceded implementation. Its initial evidence
identified five usability/status groups, three deliberately unavailable future
integrations, an intake-recovery defect under injected source-hashing failure and
a timeline keyboard-focus defect. Original observations, failures and screenshots
are retained in the [founder audit](FOUNDER_COCKPIT_AUDIT.md).

The candidate adds a Command Center, one source-bound Engagement view, current
sample stage/next action, deterministic source-linked Raven explanations, separate
assurance/release states, illustrative role handoffs and truthful operational
availability. It reuses the original fictional source/check/report code. The first
source commit `822cb20` is retained; the qualified application source is
`7e1319d5cbcebfcab16813d261922e952b1ae576`. Final checks pass **34/34 unit tests**
(12 original, 22 founder), **37/37 founder A–H browser checks** and **37/37 existing
browser regression checks**. Installed Edge `156.0.4314.50` produced 24 final
screenshots across desktop, tablet and mobile. The final browser runs span
18:38:29–18:39:23 UTC and recorded no uncaught page errors, unexpected external app
requests, backend writes or WebSockets.

Observed intake/keyboard defects and the three additional preparation/export/cancel
recovery cases are corrected and covered by actual browser checks. The original
sample bytes and report generator remain unchanged; new downloads match their
displayed content/hashes, and baseline report content matches apart from its
generation timestamp. [Final acceptance](../tests/founder/acceptance-manifest.json)
and [independent preservation checks](../tests/founder/final-preservation.json)
bind the qualified source, final captures and 27 protected historical files. Initial
failures, intermediate results and a corrected evidence-output routing mistake
remain documented in the [audit](FOUNDER_COCKPIT_AUDIT.md).

The live URL and Pages source remain the earlier `prototype/assurance-workspace`
presentation described below. This candidate has no backend, live model connection,
customer intake, real review, release or delivery. Private engineering claims in
the historical record, including statements about native qualification below,
have not been reverified. This work does not alter the separate native qualification
workstream or its inspection-only boundary.

See the [local candidate walkthrough](PROTOTYPE.md#founder-cockpit-candidate),
[business-readiness gates](FOUNDER_BUSINESS_READINESS.md) and
[focused reuse decisions](FOUNDER_REUSE_REVIEW.md). Existing architecture and
cumulative requirements are preserved.

## Public Assurance Prototype — 2026-10-30

The public repository now includes a standalone static presentation of the Acme
false-completion scenario. It provides source and citation navigation, a labeled
synthetic timeline and colony projection, a deterministic fictional outcome
comparison, and an inspectable internal demonstration report. Architecture and
roadmap views explain the intended commercial platform and its remaining gates.
See the [prototype guide](PROTOTYPE.md) for local execution and validation evidence.

This workstream does not inspect, execute, modify, merge or copy the private native
engine or qualification runtime. The demo uses only public documentation and newly
authored, clearly labeled fictional data. No real model calls, worker messages,
customer approvals or accepted investigations are claimed. Browser checks establish
presentation behavior, not native reasoning, customer authorization or production
security. No native or commercial milestone is promoted by this interface.

The existing native-engine qualification remains a separate engineering workstream.
It is incomplete; protected Raven remains inspection-only. A public presentation
cannot confer Quality/Queen acceptance or customer release.

### Verified presentation checks

The public deterministic suite passed **12/12** checks. Installed Microsoft Edge
156.0.4314.50 passed **37/37** final browser checks across desktop, tablet and mobile.
The run exercised all interactive controls, four fictional observation variants,
exact citations, source/report download integrity, replay, keyboard/dialog and
navigation behavior, reduced motion and stale-result handling. It recorded no
uncaught browser errors, external app requests, backend writes or WebSockets.
Six actual screenshots and the initial/final browser results are retained in this
public repository. See [results and reproduction](PROTOTYPE.md#validation).

The initial browser result was 34/36: a mobile close-control issue was fixed, and
an incorrect test-harness assumption about hash navigation versus reload was
corrected. A desktop menu visibility issue found separately was fixed and added
to the final checks. Neither the corrections nor the passing presentation checks
constitute native-engine, customer-outcome or accessibility certification.

### Verified public delivery

The [Assurance Prototype](https://christopher-kiser.github.io/raven-shadow/) is
published over HTTPS through GitHub Pages from the root of the isolated
`prototype/assurance-workspace` branch. The application build was
[`7028c3620a8e492cb83c22da1e0348448171e3f8`](https://github.com/christopher-kiser/raven-shadow/commit/7028c3620a8e492cb83c22da1e0348448171e3f8).
The [hosted Edge smoke run](../tests/public-smoke-results.json) passed **7/7** checks,
including byte-identical hosted assets, the sample discrepancy, report/download
hash agreement, original citation lines and mobile navigation. It observed zero
page errors, external app requests, backend writes or WebSockets.

[Repository validation passed](https://github.com/christopher-kiser/raven-shadow/actions/runs/41097872551).
[Public PR #9](https://github.com/christopher-kiser/raven-shadow/pull/9) remains open
and unmerged. The [deployment receipt](../tests/deployment-results.json) records
actual source settings and build evidence. This delivery changes no native-engine,
customer-data, approval or production qualification boundary.

## Historical engineering record — published 2026-10-29

The dated record below is preserved as originally published. It describes those
campaign boundaries; it is not a fresh audit of the native installation performed
by the public prototype campaign.

The native candidate remains inspection-only. Missions, conversational inference and actions are disabled. No customer service, production rollout or autonomous business readiness is claimed.

RS-001 audited the canonical Store, Queen, local router, immutable evidence, scoped recovery, Archive and Quality/Queen chain. Native Windows regression baseline: **416 tests, 413 passed, 3 skipped**. The separate supplied v0.7 staging package reproduced **79 + 74 passing tests**; 108 original manifest entries matched. These suites test software contracts, not real business intelligence.

The first private engineering slice is a read-only source snapshot adapter using the existing Store. It preserves artifact identity, hashes and exact citation text, with synthetic tests and no runtime activation. Private feature regression: **436 tests, 433 passed, 3 Windows symlink-fixture skips**; all 20 added tests passed. Two distinct synthetic cases correctly rejected false success in the Python and JavaScript Shadow oracles. This is source/verification infrastructure, not model reasoning or customer outcome proof. Quality and Queen acceptance were not submitted.

Still blocked: native business model qualification, authenticated independent customer observations, enterprise identity/data handling and full reviewed customer delivery. Earlier failed qualification evidence is retained privately. No real customer data or native backup is published here.

At that campaign boundary, the public showcase contained documentation and its validator only. Private engineering work is maintained separately. See [roadmap](ROADMAP.md) and [resource evaluation](OPEN_SOURCE_CANDIDATES.md).

## Campaign 002 — local authenticated intake

A new private draft implements project-scoped, expiring and revocable intake grants using the existing local-owner session, canonical Store, source snapshots and exact citations. Immutable source admission handles concurrent duplicate requests and interrupted writes; unsupported formats and archives are rejected. No new framework, model or dependency was added.

Verification: Windows **466 tests: 463 passed, 3 platform skips**; Linux/WSL **466 tests: 462 passed, 4 platform skips**. Each platform's skipped checks passed on the other. All **30 new tests** passed, including actual loopback HTTP authorization checks. Two fictional cases produced independently checked Shadow **FAIL** results and hash-bound internal reports, preserving unknowns.

**RS-002 is partial.** This is local-owner authorization, not enterprise identity or delegated customer authentication. Existing owner-only legacy imports remain unchanged. Model service connectivity, real-model business qualification, authorized external observations and full Quality/Queen acceptance remain unresolved. The protected native installation remains inspection-only and unchanged. No production activation or customer release occurred.

## Campaign 003 — secure intake consolidation

Legacy owner uploads now use the same canonical permission-controlled intake path as the newer API. A verified inspection-only/frozen-project admission gap was closed for legacy uploads and managed workspace binding. Durable batch identities preserve accepted originals across duplicate requests, interruptions and restarts; expired/revoked retries cannot silently renew authority. The existing file picker keeps retry identities and displays the 1 MiB total limit. Prior text/code formats remain inert source material.

Validation: **489 tests on each platform** — Windows 486 passed/3 platform skips; WSL/Linux 485 passed/4 platform skips. Each platform's skipped checks passed on the other. All 23 new tests passed. Real installed Edge passed 14 checks, including accepted-upload/lost-response retry, source identity preservation and revoked retry denial. An initial browser-harness selector failure and the final result are both retained privately.

**RS-002 remains partial.** No native activation, business qualification, enterprise identity or genuine Quality/Queen acceptance is claimed. Native reasoning is still blocked by absent model-service availability, protected runtime policy and an unresolved historical context failure. The next technical milestone is selected-source enforcement throughout existing mission contracts, Queen planning, handoffs and tool reads. No external component, model weight or paid service was adopted.
