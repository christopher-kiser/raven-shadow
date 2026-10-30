import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { founderView } from '../demo/founder.js';
import { buildReport, getScenario, hashSources } from '../demo/acme.js';

const prepared = async variant => {
  const scenario = getScenario(variant);
  const report = await buildReport(scenario, { generatedAt: '2026-10-30T12:00:00Z' });
  return { loaded: true, scenario, sources: report.sources, report };
};
const gate = (view, id) => view.gates.find(item => item.id === id);
const assertBoundCitations = (view, sources) => {
  for (const briefing of view.briefings) for (const ref of briefing.citations) {
    const source = sources.find(item => item.id === ref.sourceId);
    assert.ok(source, `Available source for ${ref.sourceId}`);
    assert.equal(ref.sourceName, source.name);
    assert.equal(ref.quote, source.text.split('\n').slice(ref.startLine - 1, ref.endLine).join('\n'));
  }
};

test('initial state is NOT RUN with no evidence citations or invented completion', () => {
  const view = founderView();
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.next.action, 'open-scope');
  assert.equal(view.canCheck, false);
  assert.equal(gate(view, 'integrity').value, 'NOT PREPARED');
  assert.equal(gate(view, 'integrity').state, 'NOT LOADED');
  assert.ok(view.briefings.every(item => item.citations.length === 0));
  assert.ok(view.steps.every(item => item.state !== 'complete'));
});

test('loaded fingerprints do not imply a check, authenticity, or approval', async () => {
  const scenario = getScenario();
  const sources = await hashSources(scenario.sources);
  const view = founderView({ loaded: true, scenario, sources });
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.next.action, 'verify');
  assert.equal(view.canCheck, true);
  assert.equal(gate(view, 'integrity').value, '3 OF 3 AVAILABLE');
  assert.equal(gate(view, 'integrity').state, 'HASHED');
  assert.equal(gate(view, 'authenticity').value, 'NOT AUTHENTICATED');
  assert.equal(gate(view, 'comparison').value, 'NOT RUN');
  assertBoundCitations(view, sources);
});

test('fingerprint availability counts supplied hashes without inventing them', () => {
  const scenario = getScenario();
  const sources = scenario.sources.map((source, index) => ({ ...source, sha256: index === 0 ? 'a'.repeat(64) : 'not-a-hash' }));
  const view = founderView({ loaded: true, scenario, sources });
  assert.equal(gate(view, 'integrity').value, '1 OF 3 AVAILABLE');
  assert.equal(gate(view, 'integrity').state, 'INCOMPLETE');
  assert.match(gate(view, 'integrity').detail, /does not prove truth/);
});

test('empty sources after a cancelled recovery require preparation, not an inert check', () => {
  const view = founderView({ loaded: true, scenario: getScenario(), sources: [], error: null });
  assert.equal(view.phase.code, 'unprepared');
  assert.equal(view.canCheck, false);
  assert.equal(view.next.action, 'prepare-sources');
  assert.equal(view.next.label, 'Retry source preparation');
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.steps.find(step => step.id === 'check').state, 'waiting');
  assert.equal(gate(view, 'release').state, 'NOT APPROVED');
});

test('partly prepared fingerprints require preparation even with an older complete report', async () => {
  const input = await prepared('satisfied');
  const sources = input.sources.map((source, index) => ({ ...source, sha256: index === 0 ? source.sha256 : undefined }));
  const view = founderView({ ...input, sources });
  assert.equal(view.phase.code, 'unprepared');
  assert.equal(view.canCheck, false);
  assert.equal(view.next.action, 'prepare-sources');
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.steps.find(step => step.id === 'check').state, 'waiting');
  assert.equal(gate(view, 'integrity').value, '1 OF 3 AVAILABLE');
});

test('a fully hashed subset is incomplete for the three-source baseline', async () => {
  const scenario = getScenario('baseline');
  const sources = await hashSources(scenario.sources.slice(0, 2));
  const view = founderView({ loaded: true, scenario, sources });
  assert.equal(view.phase.code, 'unprepared');
  assert.equal(view.canCheck, false);
  assert.equal(view.next.action, 'prepare-sources');
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.steps.find(step => step.id === 'preparation').state, 'current');
  assert.equal(view.steps.find(step => step.id === 'check').state, 'waiting');
  assert.equal(gate(view, 'integrity').value, '2 OF 2 AVAILABLE');
});

test('the intentionally missing-observation variant is ready with its complete two-source set', async () => {
  const scenario = getScenario('missing');
  const sources = await hashSources(scenario.sources);
  assert.equal(sources.length, 2);
  const view = founderView({ loaded: true, scenario, sources });
  assert.equal(view.phase.code, 'ready');
  assert.equal(view.canCheck, true);
  assert.equal(view.next.action, 'verify');
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.steps.find(step => step.id === 'check').state, 'available');
  assert.ok(view.briefings.every(item => item.citations.every(ref => ref.sourceId !== 'observation')));
});

for (const [variant, status, href] of [
  ['baseline', 'FAIL', '#evidence/observation/L3-L5'],
  ['satisfied', 'PASS', '#report'],
  ['missing', 'NOT ASSESSED', '#evidence/scope/L3-L9'],
  ['stale', 'NOT ASSESSED', '#evidence/scope/L3-L9']
]) test(`${variant}: actual result, exact citations and no approval elevation`, async () => {
  const input = await prepared(variant);
  const originalMarkdown = input.report.markdown;
  const view = founderView(input);
  assert.equal(view.outcome.code, status);
  assert.equal(view.outcome.description, input.report.result.summary);
  assert.equal(view.next.href, href);
  assert.equal(gate(view, 'comparison').value, 'COMPLETED');
  assert.equal(gate(view, 'comparison').state, 'COMPLETE');
  assert.equal(gate(view, 'outcome').state, status);
  assert.equal(gate(view, 'authenticity').state, 'NOT ASSESSED');
  for (const id of ['investigation', 'quality', 'queen']) assert.equal(gate(view, id).state, 'NOT PERFORMED');
  assert.equal(gate(view, 'release').state, 'NOT APPROVED');
  assert.equal(gate(view, 'authenticity').value, 'NOT AUTHENTICATED');
  assert.equal(gate(view, 'investigation').value, 'INCOMPLETE');
  assert.equal(gate(view, 'quality').value, 'NOT PERFORMED');
  assert.equal(gate(view, 'queen').value, 'NOT PERFORMED');
  assert.equal(gate(view, 'release').value, 'NOT APPROVED');
  assert.equal(view.steps.find(item => item.id === 'review').state, 'unavailable');
  assert.equal(view.steps.find(item => item.id === 'report').state, 'available');
  assert.equal(view.steps.find(item => item.id === 'release').state, 'unavailable');
  assert.match(view.briefings.find(item => item.id === 'release').paragraphs.join(' '), /business FAIL may still be a valid reviewed finding/);
  assertBoundCitations(view, input.sources);
  assert.equal(input.report.markdown, originalMarkdown);
  if (variant === 'missing') assert.ok(view.briefings.every(item => item.citations.every(ref => ref.sourceId !== 'observation')));
  if (variant === 'baseline') assert.match(view.next.description, /valid finding/);
  if (variant === 'satisfied') assert.match(view.briefings[0].paragraphs[0], /does not alter the original baseline/);
});

test('selecting another variant invalidates the earlier successful report', async () => {
  const input = await prepared('satisfied');
  const scenario = getScenario('baseline');
  const view = founderView({ ...input, scenario, sources: await hashSources(scenario.sources) });
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.next.action, 'verify');
  assert.equal(gate(view, 'comparison').value, 'NOT RUN');
});

test('same variant with changed loaded bytes cannot retain the earlier result', async () => {
  const input = await prepared('satisfied');
  const sources = input.sources.map(source => source.id === 'observation' ? { ...source, text: source.text + '\nChanged record.' } : source);
  const view = founderView({ ...input, sources });
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.next.action, 'prepare-sources');
  assert.equal(view.canCheck, false);
});

test('busy and failed actions cannot display an earlier PASS as current success', async () => {
  const input = await prepared('satisfied');
  const busy = founderView({ ...input, busy: true });
  assert.equal(busy.phase.code, 'working');
  assert.equal(busy.canCheck, false);
  assert.equal(busy.outcome.code, 'NOT RUN');
  assert.equal(busy.next.action, undefined);
  const failed = founderView({ ...input, error: { kind: 'hash', message: 'Local hashing unavailable.' } });
  assert.equal(failed.phase.code, 'error');
  assert.equal(failed.outcome.code, 'NOT RUN');
  assert.equal(failed.next.action, 'retry-local');
  assert.equal(failed.blockers[0].detail, 'Local hashing unavailable.');
  assert.equal(gate(failed, 'release').value, 'NOT APPROVED');
});

for (const kind of ['download-report', 'download-source']) {
  for (const [variant, status] of [['satisfied', 'PASS'], ['baseline', 'FAIL']]) {
    test(`${kind} failure retains the bound ${status}, citations and report bytes for a download retry`, async () => {
      const input = await prepared(variant);
      const before = JSON.stringify(input);
      const normal = founderView(input);
      const failed = founderView({ ...input, error: { kind, message: 'Object URL unavailable.' } });
      assert.equal(failed.phase.code, 'error');
      assert.equal(failed.phase.label, 'Download needs attention');
      assert.equal(failed.outcome.code, status);
      assert.equal(failed.next.label, 'Retry download');
      assert.equal(failed.next.action, 'retry-local');
      assert.deepEqual(failed.gates, normal.gates);
      assert.deepEqual(failed.briefings.map(item => item.citations), normal.briefings.map(item => item.citations));
      assertBoundCitations(failed, input.sources);
      assert.equal(gate(failed, 'comparison').state, 'COMPLETE');
      assert.equal(gate(failed, 'release').state, 'NOT APPROVED');
      assert.equal(JSON.stringify(input), before, 'Original source bytes, report Markdown and report SHA are unchanged');
    });
  }
}

test('preparation and checking errors still suppress the prior bound result', async () => {
  const input = await prepared('satisfied');
  for (const kind of ['intake', 'variant', 'verify']) {
    const view = founderView({ ...input, error: { kind, message: 'Local hashing unavailable.' } });
    assert.equal(view.outcome.code, 'NOT RUN');
    assert.equal(view.next.label, 'Retry local preparation');
    assert.equal(gate(view, 'comparison').state, 'NOT RUN');
    assert.equal(gate(view, 'release').state, 'NOT APPROVED');
  }
});

test('projection is deterministic and leaves scenario, source and report bytes unchanged', async () => {
  const input = await prepared('baseline');
  const freeze = value => {
    if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
    return value;
  };
  const before = JSON.stringify(input);
  freeze(input);
  assert.deepEqual(founderView(input), founderView(input));
  assert.equal(JSON.stringify(input), before);
});

test('unloaded state never exposes a retained report or source citation', async () => {
  const input = await prepared('satisfied');
  const view = founderView({ ...input, loaded: false });
  assert.equal(view.outcome.code, 'NOT RUN');
  assert.equal(view.next.action, 'open-scope');
  assert.ok(view.briefings.every(item => item.citations.length === 0));
});

test('lifecycle links resolve to registered application routes and the actual check location', () => {
  const appSource = readFileSync(new URL('../demo/app.js', import.meta.url), 'utf8');
  const navigation = appSource.match(/const navItems\s*=\s*([^;]+);/);
  assert.ok(navigation, 'Application route registry exists');
  const routes = new Set([...navigation[1].matchAll(/\[\s*'([^']+)'/g)].map(match => match[1]));
  const view = founderView();
  for (const step of view.steps) assert.ok(routes.has(step.href.slice(1).split('/')[0]), `Registered route for ${step.href}`);
  assert.equal(view.steps.find(step => step.id === 'preparation').href, '#evidence/scope/L3-L9');
  assert.equal(view.steps.find(step => step.id === 'check').href, '#dashboard');
});
