---
name: Engineering slice
about: Define one business-linked implementation with acceptance evidence
labels: engineering
---

## Requirement IDs / milestone

<!-- Example: RS-001, CTX-01, M2 -->

## Business outcome

What does this let the operator or customer do or verify?

## Existing modules to reuse

Provide source and test references. Classify REUSE / ADAPT / MISSING / REJECT before writing code.

## Typed contract and authority boundary

Who is allowed to request this operation? How does it scope tenant, source and tool permissions?

## Implementation tasks

- [ ] Identify inputs, outputs and failure conditions
- [ ] Implement smallest compatible change
- [ ] Add or update regression tests
- [ ] Update the master requirements ledger and release evidence

## Required negative tests

How do duplicate inputs, restart, unauthorized action, missing observation and falsified success behave?

## Acceptance evidence

Commit, test commands/results, remaining known gaps and reviewer signoff.
