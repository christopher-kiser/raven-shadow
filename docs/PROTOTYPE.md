# Assurance Prototype — operator guide and proof boundaries

A static, browser-based presentation of the fictional Acme `req-101` discrepancy.
The app explains the customer value of comparing a completion claim with an
independent outcome contract. It does not connect to the native Raven engine.

The published URL serves the existing `prototype/assurance-workspace` baseline.
The separate `prototype/founder-cockpit-audit` candidate adds the founder views
described below and has passed local browser acceptance. It remains a review
candidate and has not replaced the published presentation.
No candidate deployment or native-engine qualification is implied.

## Launch locally

From the root of this public repository, with Python 3 installed:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

On Linux/WSL installations that name the executable `python3`, use `python3`
in place of `python`.

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). Stop the local server with
Ctrl+C. The app requires a modern browser with JavaScript and Web Crypto. Use the
loopback URL or HTTPS; opening `index.html` directly as a `file:` URL is not the
supported launch method for JavaScript modules and source hashing.

There is no package installation, build service, model, API key, customer account
or production backend. Everything required for the demonstration is served from
this public repository. Do not place private files in this static hosting folder.

## One complete demonstration

1. Open the operator dashboard and load the built-in fictional Acme sample under
   its demonstration scope. This does not grant access to a real organization.
2. Inspect the supplied source set, its exact text, provenance labels and hashes.
   Follow citation links back to the relevant source lines.
3. Step through or replay the labeled synthetic investigation history. Select a
   colony node to understand its illustrated role and the associated evidence.
4. Run the deterministic fictional comparison. The baseline claim says the request
   is complete, while the supplied deadline observation lacks the required state.
   The expected business-contract result is `FAIL`.
5. Inspect the report's discrepancy, cited evidence, proof boundary and unknowns.
   Exporting this report creates a local demonstration file; it is not approval or
   customer delivery.
6. Select an explicitly hypothetical changed observation or an insufficient
   observation to explore `PASS` and `NOT ASSESSED`. Run the comparison again.
   The original source set remains preserved and the report identifies the selected
   variant, preventing a hypothetical pass from overwriting the baseline failure.
7. Explore the architecture and roadmap views to see the intended commercial
   platform and the separate engineering, security and customer-release gates.

## Founder cockpit candidate

Run the checked-out `prototype/founder-cockpit-audit` branch with the local launch
command above. This candidate reuses the original fictional sources, comparison
logic and report generator. Its new presentation state does not schedule workers,
grant access, perform native reviews or authorize release.

1. Start in **Command center**. Read the Acme question, fixed deadline and read-only
   scope together. The current sample stage and next permitted demo action explain
   whether sources need loading or a comparison needs running. NOT RUN does not
   mean that insufficient evidence has already been assessed.
2. Open **Engagement** from the navigation or fictional workspace label. Inspect the
   source-linked contract, ordered engagement path and open obligations. There is
   one fixed fictional engagement; the page cannot onboard a company or define a
   real mission.
3. Use the three **Raven briefing** topics to inspect what needs attention, what the
   available proof means and why release remains unapproved. The answers are
   deterministic explanations, with citations, rather than AI conversation or
   recorded worker messages.
4. Run the original fictional check, inspect **Evidence**, and compare the selected
   variant's outcome with its separate fingerprint, authenticity, investigation,
   Quality, Queen and release states. A business FAIL can be a valid discrepancy
   finding; neither FAIL nor PASS grants review or human approval.
5. Inspect the **Colony map** role inputs/outputs and the labeled synthetic timeline.
   Then open the **Internal report** to review its sources, unknowns and export.
   The adjacent review prerequisites do not modify the report or create approval.
6. Expand **Connections and business operations** on Engagement. Native health,
   worker reliability, costs, customer records and delivery are not connected by
   this browser demo. The panel makes no claim about the private runtime's health.

The [founder audit](FOUNDER_COCKPIT_AUDIT.md) retains the initial browser findings,
controlled failure evidence, selected changes and verification status. The
[business-readiness assessment](FOUNDER_BUSINESS_READINESS.md) ranks what a real
supervised pilot still requires. [Focused reuse research](FOUNDER_REUSE_REVIEW.md)
explains why the existing plain HTML/CSS/JavaScript was retained without new
libraries or backend components.

### Verified candidate results — 2026-10-30

The qualified application source is commit
`7e1319d5cbcebfcab16813d261922e952b1ae576`:

- [Unit checks](../tests/founder/unit-results.txt): **34/34 PASS**, comprising the
  original 12 and 22 founder-projection checks.
- [Founder A–H browser acceptance](../tests/founder/after-final/walkthrough.json):
  **37/37 PASS**, with 18 screenshots.
- [Existing browser regression](../tests/founder/regression-verified/browser-results.json):
  **37/37 PASS**, with six screenshots.

Both browser suites used installed Edge `156.0.4314.50`; the final runs span
18:38:29–18:39:23 UTC. They exercised desktop, tablet and mobile navigation, all
four variants, separate assurance gates, exact citations/downloads, keyboard focus
and actual recovery from injected intake, preparation and export failures. Cancelling
a reload after failed preparation preserves a working recovery action; the test
then re-prepares sources and completes the fictional comparison. An export failure
preserves the existing outcome and retries the requested download.

No uncaught browser error, unexpected external app request, backend write or
WebSocket was recorded. The original source/report-generator bytes remain
unchanged. New report downloads match their displayed Markdown and hashes;
baseline report content also matches the earlier capture after excluding its
generation timestamp. The [acceptance manifest](../tests/founder/acceptance-manifest.json)
binds the result receipts and application hashes, while
[independent preservation verification](../tests/founder/final-preservation.json)
checks all six application files against the qualified commit, 24 final screenshots
and 27 protected historical files.

[Before/after screenshots and retained failures](FOUNDER_COCKPIT_AUDIT.md#before-and-after-browser-evidence)
show the change. These checks establish this local fictional presentation's
behavior, not accessibility certification, real worker intelligence, customer
authorization, native review or commercial readiness. The historical results later
in this guide apply to the earlier published presentation.

### Reproduce the candidate checks

The existing Node/Playwright Core/browser requirements described under
[browser acceptance](#reproduce-browser-acceptance) also apply to the founder
runner. Both runners start and close their own public-repository loopback server.
Use fresh result directories to retain every earlier capture:

```sh
node --test tests/*.test.mjs
node -e "process.env.FOUNDER_AUDIT_OUTPUT='tests/founder/recheck-'+Date.now(); process.argv.push('--after'); require('./scripts/founder_walkthrough.cjs')"
node -e "process.env.BROWSER_OUTPUT_DIR='tests/founder/regression-recheck-'+Date.now(); require('./scripts/browser_test.cjs')"
```

The directory is set inside the Node process deliberately: a WSL shell variable
did not propagate to Windows Node during the first candidate regression. The
[audit recovery record](FOUNDER_COCKPIT_AUDIT.md#verification-and-preservation)
documents the retained new results and byte-exact restoration of the originals.
The founder runner refuses to overwrite an existing after-evidence directory.
Do not rerun the initial live-baseline mode over its preserved evidence.

## What each evidence label means

| Label | Meaning here |
| --- | --- |
| **Synthetic example** | Newly authored fictional records and illustrative timeline/colony events. No real model, customer or worker activity is implied. |
| **Unverified AI claim** | A fictional statement that the workflow succeeded. It is a claim inside a source, not the result of an actual model call. |
| **Independently checked outcome** | The browser evaluated the fixed fictional contract against the selected supplied observation, separately from the completion claim. This is not independently authenticated customer truth or execution of canonical Shadow. |
| **Verified event replay** | Reserved for genuine, attributable event records with provenance. No such historical event payload is published here, so the prototype's replay remains synthetic. |
| **Future functionality** | A retained product requirement that this prototype does not implement. It must not masquerade as an available action. |

`FAIL` means the complete supplied fictional observation did not satisfy the
required state at the deadline. `NOT ASSESSED` means the available observation
cannot support the conclusion. Neither result proves why the discrepancy happened.
A hypothetical `PASS` proves only that the selected synthetic observation satisfies
the demonstration contract. It does not qualify the native investigation engine.

## Architecture and data boundary

The public app uses static HTML, CSS, JavaScript and a small SVG/HTML projection.
Its state is presentation state. The original [product blueprint](PRODUCT_BLUEPRINT.md),
[operator specification](OPERATOR_WORKSPACE.md) and [requirements](REQUIREMENTS.md)
continue to govern the intended system. One canonical Store, Queen coordinator,
model router and independent Shadow remain required in the native architecture.
No duplicate backend, durable mission queue, model gateway or agent system is
introduced by the demo.

The example has no real approval record, Quality PASS, Queen acceptance, customer
identity or external state connection. Source hashes establish byte identity, not
truth. The report is an internal, unapproved fictional deliverable. Private source,
model logs, original evidence, credentials, profiles and databases are excluded.

## Validation

Document links can be checked without additional packages:

```sh
python scripts/validate_docs.py
```

The deterministic example checks use Node's built-in test runner:

```sh
node --test tests/*.test.mjs
```

### Published baseline results — 2026-10-30

- Deterministic Node suite: **12/12 PASS**.
- Real Microsoft Edge **156.0.4314.50**: **37/37 PASS**, from
  `2026-10-30T17:11:09Z` to `2026-10-30T17:11:38Z`.
- Viewports: desktop **1440 × 1000**, tablet **768 × 1024**, mobile **390 × 844**.
- Covered: every interactive control, all four observation variants and three
  verdict states, exact citation navigation, original source/report download hashes,
  asynchronous stale-result handling, timeline/colony replay, keyboard/dialog and
  page navigation, mobile menu/focus behavior, and reduced motion.
- Zero uncaught page errors, external app requests, backend writes or WebSockets
  were observed during the browser run.

The [machine-readable browser result](../tests/browser-results.json) retains each
check and the six screenshot hashes. The [initial browser result](../tests/browser-results.initial.json)
is also preserved: 34/36 passed before a mobile close-control interaction was fixed
and a test-harness assumption about hash navigation versus full reload was corrected.
A desktop-only menu visibility issue found during visual review was also fixed and
added to the final acceptance checks. The initial result is not represented as a
clean first run.

| Screen | Actual browser capture |
| --- | --- |
| Operator dashboard | [Desktop](../tests/screenshots/dashboard-desktop.png) |
| Evidence and citations | [Desktop](../tests/screenshots/evidence-desktop.png) |
| Internal fictional report | [Desktop](../tests/screenshots/report-desktop.png) |
| Synthetic colony projection | [Desktop](../tests/screenshots/colony-desktop.png) |
| Architecture | [Tablet](../tests/screenshots/architecture-tablet.png) |
| Operator dashboard | [Mobile](../tests/screenshots/dashboard-mobile.png) |

### Reproduce browser acceptance

The browser harness uses an **already installed** Node runtime, Playwright Core
and Chromium-family browser. It does not install packages or browsers. When
`playwright-core` is resolvable by Node and Edge is installed at its standard
Windows location, run:

```sh
node -e "process.env.BROWSER_OUTPUT_DIR='tests/founder/regression-recheck-'+Date.now(); require('./scripts/browser_test.cjs')"
```

Otherwise point the two environment variables at your existing installations.
For example, in Windows PowerShell:

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\path\to\existing\playwright-core'
$env:BROWSER_EXECUTABLE = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node -e "process.env.BROWSER_OUTPUT_DIR='tests/founder/regression-recheck-'+Date.now(); require('./scripts/browser_test.cjs')"
```

`PLAYWRIGHT_MODULE` must identify the existing module directory, and
`BROWSER_EXECUTABLE` the existing browser executable. The harness starts its own
loopback server for this public repository, exercises the app, and closes its
browser and server. These commands write `browser-results.json` and screenshots
inside a new timestamped result directory, preserving historical evidence.
Running the script without `BROWSER_OUTPUT_DIR` uses the original `tests/` paths;
use the commands above to avoid overwriting them.

These checks establish browser demo behavior, not full accessibility certification,
native reasoning, independently authenticated customer evidence or commercial
qualification. No private native test suite or qualification runtime was run by
this presentation campaign.

## Static hosting — verified public delivery

**[Open the live Assurance Prototype](https://christopher-kiser.github.io/raven-shadow/).**
It is published over HTTPS through GitHub Pages. The source is the root (`/`) of
`prototype/assurance-workspace`; [public PR #9](https://github.com/christopher-kiser/raven-shadow/pull/9)
remains open and unmerged. The tested application build is
[`7028c3620a8e492cb83c22da1e0348448171e3f8`](https://github.com/christopher-kiser/raven-shadow/commit/7028c3620a8e492cb83c22da1e0348448171e3f8).
Only this sanitized public presentation is hosted. The native runtime, customer
systems and any production backend remain disconnected.

The separate [hosted browser smoke run](../tests/public-smoke-results.json) passed
**7/7** checks in Edge 156.0.4314.50 on 2026-10-30. It verified that the five hosted
application assets match their reviewed bytes; the sample loads and detects the
fictional discrepancy; the downloaded report matches its visible content and
SHA-256; citations resolve to original source lines; and mobile navigation/layout
work. It observed no page errors, external app requests, backend writes or
WebSockets. This hosted smoke check complements the local 12 deterministic and
37 real-browser checks; it does not replace them or establish native qualification.

The [deployment receipt](../tests/deployment-results.json) records the actual Pages
source, build and verification details.
[The repository validation workflow passed](https://github.com/christopher-kiser/raven-shadow/actions/runs/41097872551).
The subsequent documentation/evidence commit records delivery without changing the
tested application assets.

At the initial audit on 2026-10-30 there was no Pages site or Cloudflare deployment
configuration. GitHub documents [Pages availability for free public repositories](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
and [publishing from a selected branch and its root](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
The reviewed public prototype branch was selected without merging the public main
branch or modifying private engineering. `.nojekyll` enables plain static delivery.
No paid service, domain purchase or production backend was introduced.

### Updates and rollback

While this prototype branch is the Pages source, pushing it updates the site.
After a future reviewed merge, **retarget Pages to the intended reviewed source
before deleting this branch**. Keep the source and evidence history intact.
Rollback can select an earlier reviewed public presentation source; disabling
Pages withdraws the site while preserving the repository and evidence. Neither
operation calls for changing a native Store, private runtime or customer system.
