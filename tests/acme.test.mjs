import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, webcrypto } from 'node:crypto';
import { CASE, SOURCES, VARIANTS, TIMELINE, getScenario, hashSources, verifyScenario, buildReport, citation } from '../demo/acme.js';

if (!globalThis.crypto) globalThis.crypto = webcrypto;

test('documented Acme false-success case fails on observed state, not prose confidence', () => {
  const result = verifyScenario(getScenario());
  assert.equal(result.status, 'FAIL');
  assert.equal(result.code, 'REQUIRED_STATE_NOT_OBSERVED_AT_DEADLINE');
  assert.equal(result.checks.at(-1).detail, 'Required: access_enabled. Observed: pending_activation.');
  assert.equal(result.independentOfClaim, true);
});

test('changed observation passes without altering original fixture', () => {
  const before = JSON.stringify(SOURCES);
  const changed = getScenario('satisfied');
  assert.equal(verifyScenario(changed).status, 'PASS');
  assert.match(changed.label, /What if/);
  assert.match(changed.sources.at(-1).text, /Explicit what-if/);
  assert.equal(JSON.stringify(SOURCES), before);
  assert.equal(verifyScenario(getScenario()).status, 'FAIL');
});

test('missing and stale evidence remain not assessed', () => {
  assert.equal(verifyScenario(getScenario('missing')).code, 'OBSERVATION_UNAVAILABLE');
  assert.equal(getScenario('missing').sources.length, 2);
  assert.equal(verifyScenario(getScenario('stale')).code, 'OBSERVATION_OUTSIDE_DEADLINE');
  for (const id of ['missing', 'stale']) assert.equal(verifyScenario(getScenario(id)).status, 'NOT ASSESSED');
});

test('changed metadata cannot override source observation', () => {
  const sample = getScenario();
  sample.observation.state = 'access_enabled';
  assert.equal(verifyScenario(sample).code, 'OBSERVATION_SOURCE_MISMATCH');
});

test('a different request and a later snapshot cannot prove this deadline outcome', () => {
  const wrong = getScenario('satisfied');
  wrong.observation.requestId = 'req-102';
  wrong.sources.at(-1).text = wrong.sources.at(-1).text.replace('Request: req-101', 'Request: req-102');
  assert.equal(verifyScenario(wrong).code, 'OBSERVATION_REQUEST_MISMATCH');
  const late = getScenario('satisfied');
  late.observation.observedAt = '2026-10-29T10:05:00Z';
  late.sources.at(-1).text = late.sources.at(-1).text.replace('Captured at (UTC): 2026-10-29T10:00:00Z', 'Captured at (UTC): 2026-10-29T10:05:00Z');
  assert.equal(verifyScenario(late).code, 'OBSERVATION_OUTSIDE_DEADLINE');
});

test('source identity, frozen scope and metadata mismatches fail closed', () => {
  const duplicate = getScenario(); duplicate.sources.push(duplicate.sources[0]);
  assert.equal(verifyScenario(duplicate).code, 'SOURCE_IDENTITY_INVALID');
  const renamed = getScenario(); renamed.sources[0].name = 'different-scope.txt';
  assert.equal(verifyScenario(renamed).code, 'SOURCE_IDENTITY_INVALID');
  const scope = getScenario(); scope.sources[0].text = scope.sources[0].text.replace('access_enabled', 'pending_activation');
  assert.equal(verifyScenario(scope).code, 'FROZEN_SOURCE_CHANGED');
  const contract = getScenario(); contract.contract.requiredState = 'pending_activation';
  assert.equal(verifyScenario(contract).code, 'CONTRACT_SOURCE_MISMATCH');
  assert.equal(verifyScenario(null).status, 'NOT ASSESSED');
  assert.throws(() => getScenario('invented'), RangeError);
});

test('edited evidence cannot masquerade as the unchanged original example', () => {
  const sample = getScenario();
  sample.observation.state = 'access_enabled';
  sample.sources.at(-1).text = sample.sources.at(-1).text.replace('Observed state: pending_activation', 'Observed state: access_enabled');
  assert.equal(verifyScenario(sample).code, 'VARIANT_OBSERVATION_MISMATCH');
  assert.equal(verifyScenario(sample).status, 'NOT ASSESSED');
});

test('citations resolve exact original line ranges and reject out-of-bounds references', () => {
  const sample = getScenario();
  for (const ref of verifyScenario(sample).citations) {
    const original = sample.sources.find(source => source.id === ref.sourceId);
    assert.equal(ref.quote, original.text.split('\n').slice(ref.startLine - 1, ref.endLine).join('\n'));
  }
  assert.throws(() => citation(sample.sources, 'unknown', 1));
  assert.throws(() => citation(sample.sources, 'scope', 0), RangeError);
  assert.throws(() => citation(sample.sources, 'scope', 1, 500), RangeError);
});

test('SHA-256 hashes exact UTF-8 source bytes and differs for changed observations', async () => {
  const baseline = await hashSources(getScenario().sources);
  const changed = await hashSources(getScenario('satisfied').sources);
  for (const source of baseline) assert.equal(source.sha256, createHash('sha256').update(source.text).digest('hex'));
  assert.equal(baseline[0].sha256, changed[0].sha256);
  assert.notEqual(baseline.at(-1).sha256, changed.at(-1).sha256);
  assert.equal(SOURCES[0].sha256, undefined);
});

test('report binds exact current variant, source hashes and citations without acceptance claims', async () => {
  for (const { id } of VARIANTS) {
    const sample = getScenario(id);
    const report = await buildReport(sample, { generatedAt: '2026-10-30T00:00:00Z' });
    assert.equal(report.result.status, verifyScenario(sample).status);
    assert.ok(report.markdown.includes(`(${id})`));
    for (const source of report.sources) assert.ok(report.markdown.includes(source.sha256));
    for (const ref of report.result.citations) assert.ok(report.markdown.includes(ref.quote));
    assert.match(report.markdown, /NO RELEASE APPROVAL/);
    assert.match(report.markdown, /Native Quality and Queen acceptance: not performed/);
    assert.equal(report.reportSha256, createHash('sha256').update(report.markdown).digest('hex'));
  }
});

test('asynchronous report generation snapshots data rather than drifting with selection changes', async () => {
  const sample = getScenario();
  const pending = buildReport(sample);
  sample.variantId = 'satisfied'; sample.observation.state = 'access_enabled';
  const report = await pending;
  assert.equal(report.result.variantId, 'baseline');
  assert.equal(report.result.status, 'FAIL');
});

test('illustrated timeline carries no actual model, message or approval records', () => {
  assert.deepEqual(TIMELINE.map(row => row.stage), ['catalog', 'investigate', 'shadow', 'quality', 'draft']);
  assert.ok(TIMELINE.every(row => row.id.startsWith('example-') && row.detail.startsWith('Illustrated')));
  assert.ok(Object.isFrozen(CASE) && Object.isFrozen(SOURCES) && Object.isFrozen(SOURCES[0]));
  assert.match(CASE.origin, /not historical event exports/);
});
