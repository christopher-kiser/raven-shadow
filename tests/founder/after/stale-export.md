# Raven + Shadow — internal assurance demonstration

**SYNTHETIC EXAMPLE · INTERNAL DRAFT · NO RELEASE APPROVAL**

Request: req-101  
Variant: What if · observation too early (stale)  
Prepared locally: 2026-10-30T18:25:46.492Z

## Result

**NOT ASSESSED** — OBSERVATION_OUTSIDE_DEADLINE

This observation does not establish the required state at the deadline.

Proof class: Deterministic fictional check. Public prototype comparison · no model inference.

## Question and unverified claim

Was access enabled for req-101 by the agreed deadline?

“Request req-101 is complete. Access has been enabled.”

The claim is a synthetic example, not a real AI response or proof of completion.

## Checks performed in this browser

- Frozen sample scope: **PASS** — The unchanged fictional scope and claim resolve to req-101.
- Request identity: **PASS** — The contract, claim and separate observation refer to req-101.
- Deadline coverage: **NOT ASSESSED** — This sample requires a snapshot at the exact contractual deadline.

## Evidence citations

### [1] acme-scope.txt, lines 3–6

```text
Request: req-101
Objective: Verify that access is enabled by the agreed deadline.
Required state: access_enabled
Deadline (UTC): 2026-10-29T10:00:00Z
```

### [2] acme-workflow-claim.txt, lines 3–7

```text
Request: req-101
Statement: Request req-101 is complete. Access has been enabled.
Claimed state: access_enabled
Claim timestamp (UTC): 2026-10-29T09:58:00Z
Authority: This statement cannot prove the resulting system state.
```

### [3] acme-state-observation.txt, lines 3–5

```text
Request: req-101
Captured at (UTC): 2026-10-29T09:45:00Z
Observed state: pending_activation
```

## Exact source identities

- acme-scope.txt (scope)
  SHA-256: `41847d65a12dea2ce07283c68d73ab291c303cb4b0058c131978417af6a3c976`
- acme-workflow-claim.txt (claim)
  SHA-256: `6c06afc2eeefdb19efb53dffb3487ee3430654cc8b8e404dc3b9a0e788426eb5`
- acme-state-observation.txt (observation)
  SHA-256: `d7e5d00667339bb9e9cc01ed31ad1913fde98cddb4374aaf9bc6c4b607b766f0`

## Unknowns

- Why the workflow reported completion.
- Whether access was enabled after the observation boundary.
- The authenticity of any real external system or customer state.
- The effect of a proposed correction; no correction is performed.

## Next operator action

Obtain an authorized observation covering the actual deadline. Do not convert missing or stale evidence into success.

## Proof and release limitations

- This is a deterministic fictional comparison, not a native model investigation.
- Source hashes identify sample bytes; they do not establish external truth.
- No customer records, live connectors, worker messages or approval records are used.
- The presentation has no connection to the canonical Raven Store or Shadow runtime.

- Native Quality and Queen acceptance: not performed in this presentation.
- No customer delivery, approval, external action or real workflow repair is authorized.
- The Acme scenario is documented publicly; expanded records and timelines were authored solely for this prototype.
- A SHA-256 checksum establishes byte identity, not truth, approval or authenticity.
