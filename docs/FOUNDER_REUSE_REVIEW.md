# Founder cockpit — focused public reuse review

Reviewed **2026-10-30**, before founder-cockpit application changes. This research
addresses the initial live-browser findings: hard-to-discover question/deadline/
constraints; no single engagement/next-action view; inconsistent pre-check status;
and illustrative roles without sufficient founder handoff context. It does not
audit or access private engine source, qualification runtimes or services.

**Decision: reuse presentation concepts, adopt no external code or dependency.**
Keep the existing native HTML, CSS, browser state and deterministic sample checker.
One pure presentation projection can derive wording and eligible browser actions
from that existing state; it must not become another Store, scheduler, permission
authority, Shadow verifier or worker runtime.

## Candidate decisions

| Candidate and official evidence | Fit to the observed problem | Decision, compatibility and rollback |
| --- | --- | --- |
| [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) | Explicit key/value facts suit the question, required state, deadline, source boundary and action exclusions. The documented semantics use a description list; they are not a task engine. | **Conceptual reuse.** Write project-owned `<dl>` markup using the existing styling. Preserve source citations beside material facts. No GOV.UK code, branding, font or asset is copied. Native HTML needs no new build or runtime; revert the presentation commit to roll back. |
| [GOV.UK task list](https://design-system.service.gov.uk/components/task-list/) | Concise task names, visible textual statuses and accessible association between an action and its status are useful. However, upstream advises against the full component when work must occur in a fixed order; this short Acme path is ordered. | **Do not adopt the component.** Use a small ordered lifecycle summary and one next eligible browser action. Keep “not run” separate from a completed “not assessed” check. An inspection/download action is not native review or release. No arbitrary-order task UI or new workflow state machine. |
| [React Flow / xyflow](https://github.com/xyflow/xyflow), [official quick start](https://reactflow.dev/learn) | Offers interactive graph editing, node/edge state and viewport controls. The observed issue is explanation of roles and handoff context, not graph editing, dynamic layout or large-graph navigation. | **Defer code adoption.** Existing SVG/buttons plus a role explanation panel are sufficient. Adoption would introduce React/ReactDOM and additional graph/state dependencies into a plain-JS application. No measured benefit justifies replacement. Retain the current crown-free illustrative map; rollback remains a normal static-file revert. |
| [Hugging Face Gradio Blocks lesson](https://huggingface.co/learn/llm-course/en/chapter9/7), [Gradio Spaces documentation](https://huggingface.co/docs/hub/spaces-sdks-gradio), [Gradio source](https://github.com/gradio-app/gradio) | Blocks demonstrates clear input/output separation, grouped explanations and explicit event-triggered updates. These concepts could inform a fixed, evidence-bound founder explanation, but the audited gaps need neither a model interface nor Python callbacks. | **Conceptual comparison only; no Gradio adoption.** Existing buttons and explanatory HTML can expose the reason, evidence and next action directly. Python/server dependencies, a new launch path and hosted callback/security boundaries would add unrelated work. Do not introduce simulated chat or imply that static guidance is Raven inference. |

Hugging Face also documents [static HTML Spaces](https://huggingface.co/docs/hub/spaces-sdks-static).
That confirms a browser-only presentation does not require Gradio, a model or a
Python server. No Space is created or deployed in this audit; existing hosting is
a separate owner-controlled concern, and no hosting migration is recommended.

## Provenance, licensing and maintenance

The official repositories were public and non-archived when inspected. Recent
commit metadata supports ongoing activity, not a maintenance guarantee:

| Upstream inspection | Observed revision / manifest | Licensing and dependency boundary |
| --- | --- | --- |
| GOV.UK Frontend | [Recent commit `2c2af2d`](https://github.com/alphagov/govuk-frontend/commit/2c2af2d781f10d7008b51289d53fa105ef5d470f), 2026-10-29. [Published-package manifest](https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/package.json) declares version **6.6.0**; inspected file blob `9beeeeefa9aa86e36b66759cf29cce1c1ab4e5df`. | Manifest declares **MIT**; the design-system website identifies its text under **Open Government Licence v3.0**, subject to exceptions. Code, documentation and branded assets have separate considerations. This review copies none of those assets or implementations. The upstream development toolchain is unnecessary for native summary markup. |
| React Flow | [Recent commit `d4bc936`](https://github.com/xyflow/xyflow/commit/d4bc936edad07aba995dbdb8e2c63af8cdd631c9), 2026-10-29. [React package manifest](https://github.com/xyflow/xyflow/blob/main/packages/react/package.json) declares **12.12.0**; blob `567bf310a8ed080d8386422ee1ebb3d6b6a56500`. | **MIT** declaration. React and ReactDOM are peer requirements; `@xyflow/system`, `classcat` and `zustand` add package surface. Package and CSS integration would need separate compatibility/accessibility tests. Commercial license screening is not a security or legal certification. |
| Gradio | [Recent commit `f3bab14`](https://github.com/gradio-app/gradio/commit/f3bab14e9d5a46bb22866a3a9db498c02f4e7ad0), 2026-10-30. [Python manifest](https://github.com/gradio-app/gradio/blob/main/pyproject.toml), blob `3e9447ef5362d92fb7ff47ea5049c3eed3141c3c`; [requirements](https://github.com/gradio-app/gradio/blob/main/requirements.txt), blob `7f2970d081928fe9025409e8a6b532a576638be3`. | **Apache-2.0** declaration; Python **3.10+**. FastAPI, Starlette, Uvicorn, HTTP clients and other runtime dependencies are declared. A server or public embedding would require its own data, endpoint and deployment review. None is installed or exposed here. |

The default-branch manifest versions above are observed source metadata, not
claims that a release was installed, benchmarked or audited. Preserve applicable
license/notices and review separately licensed assets before any future copying.
No new model, dataset, paid service, download, backend or framework was selected.

## What has actually been checked

- Official GOV.UK, React Flow and Hugging Face pages were read successfully over
  HTTPS; official GitHub repository, source-manifest and recent-commit metadata
  were inspected. The HF lesson’s source was also read from the official
  [course repository](https://github.com/huggingface/course/blob/main/chapters/en/chapter9/7.mdx).
- **No upstream package was installed or executed.** No transitive dependency or
  advisory audit, performance benchmark, hardware measurement, accessibility
  certification or package compatibility test was performed. Popularity and a
  license declaration do not establish safety.
- The recommendation adds no dependency or compute requirement. Its actual value
  must be established by the revised founder walkthrough and targeted tests,
  rather than assumed from the upstream design-system reputation.

## Smallest proposed presentation change

1. Show the existing question, contract deadline, constraints and fictional scope
   together, with original-source links.
2. Derive an ordered engagement summary and one available next browser action from
   loaded evidence and the current bound result/report. Keep real investigation,
   Quality, Queen acceptance, human release and customer follow-up visibly outside
   the public demo’s completed work.
3. Provide deterministic founder explanations of the current discrepancy, proof
   limits and role/handoff context. Label them as presentation guidance, never as
   generated worker messages, approvals or live Raven conversation.
4. Test initial/loading/checked states, all four observation variants, stale-result
   invalidation, exact citations and unchanged approval/release boundaries. Any
   new UI must remain a projection of existing sample state.

This recommendation preserves the existing [public architecture decisions](DECISIONS.md),
[cumulative requirements](REQUIREMENTS.md) and [reuse strategy](REUSE_STRATEGY.md).
It does not reopen earlier framework/model deferrals or qualify the pilot gates
in the [founder business assessment](FOUNDER_BUSINESS_READINESS.md).
