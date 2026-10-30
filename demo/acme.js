/** Public presentation fixture. No native engine, model, Store or authentication. */
const freeze = value => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
const copy = value => JSON.parse(JSON.stringify(value));

export const CASE = freeze({
  id: 'acme-assurance-sample',
  requestId: 'req-101',
  title: 'A completed workflow. An incomplete outcome.',
  question: 'Was access enabled for req-101 by the agreed deadline?',
  company: 'Acme · fictional company',
  claim: '“Request req-101 is complete. Access has been enabled.”',
  deadline: '2026-10-29T10:00:00Z',
  labels: ['Synthetic example', 'Unverified AI claim', 'Internal demonstration'],
  origin: 'Based on the public Acme scenario in docs/DEMO.md. These expanded records and timestamps are synthetic examples, not historical event exports.',
  unknowns: [
    'Why the workflow reported completion.',
    'Whether access was enabled after the observation boundary.',
    'The authenticity of any real external system or customer state.',
    'The effect of a proposed correction; no correction is performed.'
  ],
  limits: [
    'This is a deterministic fictional comparison, not a native model investigation.',
    'Source hashes identify sample bytes; they do not establish external truth.',
    'No customer records, live connectors, worker messages or approval records are used.',
    'The presentation has no connection to the canonical Raven Store or Shadow runtime.'
  ]
});

export const VARIANTS = freeze([
  { id: 'baseline', label: 'Original example · outcome missing', description: 'The supplied snapshot does not contain the required state at the deadline.' },
  { id: 'satisfied', label: 'What if · outcome present', description: 'An explicitly changed synthetic observation contains the required state. This does not repair the original example.' },
  { id: 'missing', label: 'What if · observation unavailable', description: 'Without an observation, the claim cannot be assessed.' },
  { id: 'stale', label: 'What if · observation too early', description: 'An earlier snapshot cannot establish the state at the deadline.' }
]);

export const TIMELINE = freeze([
  { id: 'example-catalog', stage: 'catalog', title: 'Establish the source boundary', detail: 'Illustrated Intake role: identify the three fictional files and the read-only scope. The prototype can hash these bytes locally; no real access grant is created.', role: 'Intake' },
  { id: 'example-investigate', stage: 'investigate', title: 'Separate the claim from the evidence', detail: 'Illustrated Research role: the automation statement says complete. A separate state record is needed to support that assertion. No model or specialist runs during playback.', role: 'Research' },
  { id: 'example-shadow', stage: 'shadow', title: 'Compare the required and observed state', detail: 'Illustrated Shadow role: check request identity, observation time and required state. Use Run fictional check to execute the separate client-side comparison.', role: 'Shadow' },
  { id: 'example-quality', stage: 'quality', title: 'Expose proof limits and unknowns', detail: 'Illustrated Quality checkpoint: a report needs exact source references and honest limits. No native Quality verdict or approval is supplied by this replay.', role: 'Quality' },
  { id: 'example-draft', stage: 'draft', title: 'Prepare an inspectable internal report', detail: 'Illustrated reporting stage: after a local check, the prototype assembles a source-bound sample report. It remains an internal demonstration without release approval.', role: 'Report' }
]);

const scope = {
  id: 'scope', name: 'acme-scope.txt', title: 'Scope & intended outcome', kind: 'Fictional scope brief',
  label: 'Synthetic example',
  text: [
    'ACME — FICTIONAL SCOPE BRIEF',
    'Classification: Synthetic example; not a customer authorization record.',
    'Request: req-101',
    'Objective: Verify that access is enabled by the agreed deadline.',
    'Required state: access_enabled',
    'Deadline (UTC): 2026-10-29T10:00:00Z',
    'Permitted: Read only the fictional files supplied with this sample.',
    'External writes: Not authorized by this presentation.',
    'Release: Internal demonstration only; no approval record exists.'
  ].join('\n')
};
const claim = {
  id: 'claim', name: 'acme-workflow-claim.txt', title: 'Workflow completion claim', kind: 'Unverified AI claim',
  label: 'Synthetic example · unverified claim',
  text: [
    'ACME — SYNTHETIC AUTOMATION CLAIM',
    'Classification: Invented example of an unverified AI claim; no model call occurred.',
    'Request: req-101',
    'Statement: Request req-101 is complete. Access has been enabled.',
    'Claimed state: access_enabled',
    'Claim timestamp (UTC): 2026-10-29T09:58:00Z',
    'Authority: This statement cannot prove the resulting system state.',
    'Approval: No customer or owner approval is represented.'
  ].join('\n')
};
const observations = {
  baseline: { requestId: 'req-101', state: 'pending_activation', observedAt: CASE.deadline },
  satisfied: { requestId: 'req-101', state: 'access_enabled', observedAt: CASE.deadline },
  missing: null,
  stale: { requestId: 'req-101', state: 'pending_activation', observedAt: '2026-10-29T09:45:00Z' }
};
const observationSource = (observation, variantId) => ({
  id: 'observation', name: 'acme-state-observation.txt', title: 'Independent state observation', kind: 'Supplied fictional observation',
  label: variantId === 'baseline' ? 'Synthetic example · original observation' : 'Synthetic example · changed observation',
  text: [
    'ACME — SYNTHETIC STATE OBSERVATION',
    `Classification: ${variantId === 'baseline' ? 'Original public-demo example' : 'Explicit what-if example (' + variantId + ')'}; not authenticated external evidence.`,
    `Request: ${observation.requestId}`,
    `Captured at (UTC): ${observation.observedAt}`,
    `Observed state: ${observation.state}`,
    'Origin: Separately supplied fictional state snapshot, not the automation claim.',
    'Authentication: External authenticity is not assessed.',
    'Coverage: One request at the stated capture time; later state is unknown.'
  ].join('\n')
});

export const SOURCES = freeze([copy(scope), copy(claim), observationSource(observations.baseline, 'baseline')]);

export function getScenario(variantId = 'baseline') {
  const variant = VARIANTS.find(item => item.id === variantId);
  if (!variant) throw new RangeError('Unknown fictional observation variant');
  const observation = copy(observations[variantId]);
  return {
    variantId, label: variant.label, description: variant.description,
    contract: { requestId: CASE.requestId, requiredState: 'access_enabled', deadline: CASE.deadline },
    claim: { requestId: CASE.requestId, state: 'access_enabled', reportedAt: '2026-10-29T09:58:00Z', text: CASE.claim },
    observation,
    sources: [copy(scope), copy(claim), ...(observation ? [observationSource(observation, variantId)] : [])]
  };
}

export async function sha256(text) {
  if (!globalThis.crypto?.subtle) throw new Error('SHA-256 requires a browser secure context. Use the documented localhost launch.');
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function hashSources(sources) {
  const snapshot = copy(sources);
  return Promise.all(snapshot.map(async source => ({ ...source, sha256: await sha256(source.text) })));
}

export function citation(sources, sourceId, startLine, endLine = startLine) {
  const source = sources.find(item => item.id === sourceId);
  if (!source || !Number.isInteger(startLine) || !Number.isInteger(endLine)) throw new Error('Citation source or lines are invalid');
  const lines = source.text.split('\n');
  if (startLine < 1 || endLine < startLine || endLine > lines.length) throw new RangeError('Citation is outside its original source');
  return { sourceId, sourceName: source.name, startLine, endLine, quote: lines.slice(startLine - 1, endLine).join('\n') };
}

const field = (source, key) => {
  const prefix = key + ': ';
  const values = source.text.split('\n').filter(line => line.startsWith(prefix));
  return values.length === 1 ? values[0].slice(prefix.length) : null;
};

/** A small presentation rule, not a copy or replacement of canonical Shadow. */
export function verifyScenario(scenario) {
  const checks = [];
  const citations = [];
  const add = (name, status, detail) => checks.push({ name, status, detail });
  const finish = (status, code, summary) => ({
    status, code, summary, variantId: scenario?.variantId ?? 'unknown', checks, citations,
    proofClass: 'Deterministic fictional check',
    checker: 'Public prototype comparison · no model inference',
    independentOfClaim: true,
    limits: [...CASE.limits], unknowns: [...CASE.unknowns]
  });
  if (!scenario || !VARIANTS.some(item => item.id === scenario.variantId) || !Array.isArray(scenario.sources)) {
    return finish('NOT ASSESSED', 'INVALID_SAMPLE', 'The selected sample is not a recognized fictional scenario.');
  }
  const sources = scenario.sources;
  const ids = sources.map(source => source?.id);
  const names = { scope: 'acme-scope.txt', claim: 'acme-workflow-claim.txt', observation: 'acme-state-observation.txt' };
  if (new Set(ids).size !== ids.length || ids.some(id => !Object.hasOwn(names, id)) || sources.some(source => typeof source?.text !== 'string' || source.name !== names[source.id])) {
    add('Source identity', 'FAIL', 'Sources must have distinct, known identities and exact text.');
    return finish('NOT ASSESSED', 'SOURCE_IDENTITY_INVALID', 'The source set cannot be resolved unambiguously.');
  }
  const brief = sources.find(source => source.id === 'scope');
  const statement = sources.find(source => source.id === 'claim');
  const observed = sources.find(source => source.id === 'observation');
  if (!brief || !statement || brief.text !== scope.text || statement.text !== claim.text) {
    add('Frozen sample scope', 'FAIL', 'The original fictional scope and claim must remain unchanged.');
    return finish('NOT ASSESSED', 'FROZEN_SOURCE_CHANGED', 'The original sample scope or claim has changed. Reload the fictional sample.');
  }
  const requestId = field(brief, 'Request');
  const requiredState = field(brief, 'Required state');
  const deadline = field(brief, 'Deadline (UTC)');
  if (scenario.contract?.requestId !== requestId || scenario.contract?.requiredState !== requiredState || scenario.contract?.deadline !== deadline) {
    add('Contract binding', 'FAIL', 'Contract metadata must match its original source.');
    return finish('NOT ASSESSED', 'CONTRACT_SOURCE_MISMATCH', 'The displayed contract does not match the supplied scope text.');
  }
  add('Frozen sample scope', 'PASS', 'The unchanged fictional scope and claim resolve to req-101.');
  citations.push(citation(sources, 'scope', 3, 6), citation(sources, 'claim', 3, 7));
  if (!observed || !scenario.observation) {
    add('Independent observation', 'NOT ASSESSED', 'No separate state observation is available.');
    return finish('NOT ASSESSED', 'OBSERVATION_UNAVAILABLE', 'The completion claim cannot be assessed without a separate observation.');
  }
  const sourceObservation = { requestId: field(observed, 'Request'), observedAt: field(observed, 'Captured at (UTC)'), state: field(observed, 'Observed state') };
  if (!sourceObservation.state || Object.keys(sourceObservation).some(key => sourceObservation[key] !== scenario.observation[key])) {
    add('Observation binding', 'FAIL', 'Observation metadata must match the exact supplied text.');
    return finish('NOT ASSESSED', 'OBSERVATION_SOURCE_MISMATCH', 'The displayed observation does not match the supplied source.');
  }
  citations.push(citation(sources, 'observation', 3, 5));
  if (sourceObservation.requestId !== requestId) {
    add('Request identity', 'FAIL', 'The observation belongs to a different request.');
    return finish('NOT ASSESSED', 'OBSERVATION_REQUEST_MISMATCH', 'A different request cannot establish the outcome for req-101.');
  }
  add('Request identity', 'PASS', 'The contract, claim and separate observation refer to req-101.');
  if (!Number.isFinite(Date.parse(sourceObservation.observedAt)) || sourceObservation.observedAt !== deadline) {
    add('Deadline coverage', 'NOT ASSESSED', 'This sample requires a snapshot at the exact contractual deadline.');
    return finish('NOT ASSESSED', 'OBSERVATION_OUTSIDE_DEADLINE', 'This observation does not establish the required state at the deadline.');
  }
  add('Deadline coverage', 'PASS', 'The snapshot covers the stated deadline exactly.');
  const originalVariant = observations[scenario.variantId];
  if (!originalVariant || Object.keys(sourceObservation).some(key => sourceObservation[key] !== originalVariant[key]) || observed.text !== observationSource(originalVariant, scenario.variantId).text) {
    add('Selected example binding', 'FAIL', 'The supplied observation must match the explicitly selected original or what-if example.');
    return finish('NOT ASSESSED', 'VARIANT_OBSERVATION_MISMATCH', 'The observation was changed without selecting the corresponding labeled example. Reload the sample.');
  }
  const satisfied = sourceObservation.state === requiredState;
  add('Required outcome', satisfied ? 'PASS' : 'FAIL', `Required: ${requiredState}. Observed: ${sourceObservation.state}.`);
  return satisfied
    ? finish('PASS', 'REQUIRED_STATE_OBSERVED_AT_DEADLINE', 'The changed fictional observation contains the required state at the deadline. This does not change the original example.')
    : finish('FAIL', 'REQUIRED_STATE_NOT_OBSERVED_AT_DEADLINE', 'The supplied fictional state does not support the completion claim at the deadline.');
}

export async function buildReport(scenario, { generatedAt = new Date().toISOString() } = {}) {
  const snapshot = copy(scenario);
  const result = verifyScenario(snapshot);
  const sources = await hashSources(snapshot.sources);
  const rows = result.checks.map(check => `- ${check.name}: **${check.status}** — ${check.detail}`).join('\n');
  const refs = result.citations.map((ref, index) => `### [${index + 1}] ${ref.sourceName}, lines ${ref.startLine}–${ref.endLine}\n\n\`\`\`text\n${ref.quote}\n\`\`\``).join('\n\n');
  const markdown = [
    '# Raven + Shadow — internal assurance demonstration',
    '**SYNTHETIC EXAMPLE · INTERNAL DRAFT · NO RELEASE APPROVAL**',
    `Request: ${CASE.requestId}  \nVariant: ${snapshot.label} (${snapshot.variantId})  \nPrepared locally: ${generatedAt}`,
    '## Result',
    `**${result.status}** — ${result.code}\n\n${result.summary}`,
    `Proof class: ${result.proofClass}. ${result.checker}.`,
    '## Question and unverified claim',
    `${CASE.question}\n\n${CASE.claim}\n\nThe claim is a synthetic example, not a real AI response or proof of completion.`,
    '## Checks performed in this browser', rows || 'No valid sample could be checked.',
    '## Evidence citations', refs || 'No valid citations are available.',
    '## Exact source identities',
    sources.map(source => `- ${source.name} (${source.id})\n  SHA-256: \`${source.sha256}\``).join('\n'),
    '## Unknowns', result.unknowns.map(item => '- ' + item).join('\n'),
    '## Next operator action',
    result.status === 'FAIL'
      ? 'For a real engagement: request an authorized current observation and investigate the discrepancy before proposing a correction. This sample performs no correction.'
      : result.status === 'PASS'
        ? 'Treat this as a changed hypothetical observation only. Real customer assurance would still require authenticated evidence and the native review chain.'
        : 'Obtain an authorized observation covering the actual deadline. Do not convert missing or stale evidence into success.',
    '## Proof and release limitations', result.limits.map(item => '- ' + item).join('\n'),
    '- Native Quality and Queen acceptance: not performed in this presentation.\n- No customer delivery, approval, external action or real workflow repair is authorized.\n- The Acme scenario is documented publicly; expanded records and timelines were authored solely for this prototype.\n- A SHA-256 checksum establishes byte identity, not truth, approval or authenticity.'
  ].join('\n\n') + '\n';
  return { result, sources, markdown, reportSha256: await sha256(markdown) };
}
