# Architectural decisions and non-negotiables

| Decision | Reason | Revisit condition |
| --- | --- | --- |
| One canonical Raven context/evidence Store | Prevents divergent agent memory, fabricated continuity and brittle migrations | Only if independently audited architectural evidence demonstrates a necessary migration |
| Native-code inventory before framework adoption | v0.7 already has local runtime, Shadow verification and model-router compatibility designs | A measured missing capability and migration plan justify a new dependency |
| Shadow remains independently attributable | The same reasoning model cannot certify its own consequential effects | No waiver; strengthen proof classes as new connectors arrive |
| Public showcase separated from proprietary runtime | Enables credible portfolio visibility without leaking IP, customer information or secrets | Open-source scope decided explicitly with license review |
| Queen delegates scoped workers with direct messages | Enables autonomous coordination while preserving ownership and auditability | Concurrency/reliability data may refine scheduling, not erase authority boundaries |
| No-crown neural view reflects real saved events | Trust is undermined by decorative 'live' activity that was never performed | No waiver; only change visualization technique |
| Archive needs Queen approval and must protect originals | Prevents autonomous cleanup from destroying user/customer material | No waiver on originals; retention can be strengthened |
| Local staging results are never called enterprise production proof | Synthetic cases cannot demonstrate third-party truth, confidentiality or system security | Advance only after independent pre-pilot and deployment evidence |

New decisions must identify the impacted requirement IDs, evidence and alternatives. Do not lose earlier ideas when priorities change.


## Public presentation decision — 2026-10-30

The owner explicitly authorized a separate interactive presentation workstream.
It may explain the intended customer experience while native qualification remains
incomplete. This changes no earlier architecture, release gate or protected runtime.
The public UI is an in-browser view over fictional static data, not a second
canonical Store, Queen, model router or agent orchestration system.

The existing public product blueprint, operator workspace, Acme proof boundary and
cumulative requirements are reused. There was no public application component to
reuse at the starting commit. Private/native staging code is excluded from this
workstream; the design follows the publicly documented evidence, timeline and
crown-free coordination patterns without copying protected implementation.

React Flow was considered for the colony projection. Its [official quickstart](https://reactflow.dev/learn)
and [component API](https://reactflow.dev/api-reference/react-flow) target a React
application with the `@xyflow/react` package and interactive nodes/edges. Upstream
[repository metadata and license](https://github.com/xyflow/xyflow) identify MIT
licensing and active maintenance at the time of review. This small, fixed example
projection needs selectable nodes and event-linked highlighting, not a general
node editor, canvas state or layout framework. Plain SVG/HTML therefore serves the
current requirement with zero package dependencies or build pipeline. No React Flow
package was installed, executed or performance-qualified. Revisit only if measured
navigation/layout needs justify the added application footprint.

Proof labels are part of the product contract: synthetic history cannot acquire a
verified-event label; an AI completion claim is not an observed result; the browser's
fictional check is not independent authentication of a customer's system; future
capabilities cannot appear as live controls. No original source is altered by a
hypothetical observation, and report export does not imply release approval.

Free static hosting may expose this sanitized presentation only. The public branch
and site must remain separate from private code, model logs, credentials, customer
material and databases. A successful browser test or deployment does not complete
RS-002 through RS-007 or grant production readiness.
