/** Deterministic presentation guidance. No models, workflow execution or authority. */
import { citation } from './acme.js';

const sameSources = (left, right) => Array.isArray(left) && Array.isArray(right)
  && left.length === right.length
  && left.every(source => right.filter(other => other.id === source.id
    && other.name === source.name && other.text === source.text).length === 1);

const availableCitation = (sources, id, start, end) => {
  if (sources.filter(source => source.id === id).length !== 1) return null;
  try { return citation(sources, id, start, end); } catch { return null; }
};

export function founderView({ loaded = false, busy = false, scenario, sources = [], report = null, error = null } = {}) {
  const currentSources = loaded ? sources : [];
  // A previous report cannot describe a different selection or changed source bytes.
  // This checks display binding only; it does not repeat the fictional verifier.
  const boundReport = loaded && !busy && !error && report
    && report.result?.variantId === scenario?.variantId
    && ['PASS', 'FAIL', 'NOT ASSESSED'].includes(report.result?.status)
    && sameSources(report.sources, currentSources)
    && sameSources(report.sources, scenario?.sources)
    ? report : null;
  const status = boundReport?.result.status ?? 'NOT RUN';
  const fingerprintCount = currentSources.filter(source => /^[a-f0-9]{64}$/i.test(source.sha256 ?? '')).length;
  const allFingerprints = currentSources.length > 0 && fingerprintCount === currentSources.length;
  const scope = availableCitation(currentSources, 'scope', 3, 9);
  const claim = availableCitation(currentSources, 'claim', 3, 7);
  const observation = availableCitation(currentSources, 'observation', 3, 5);
  const refs = (...items) => items.filter(Boolean);
  const outcomeDescription = boundReport?.result.summary ?? (busy
    ? 'The local browser action is in progress. No current outcome has been established.'
    : error
      ? 'The local action failed. No prior result is presented as the current outcome.'
      : 'The selected fictional records have not been checked in this browser.');

  let phase;
  let next;
  if (error) {
    phase = { code: 'error', label: 'Local action needs attention', detail: String(error.message || 'The local action did not complete.') };
    next = { label: 'Retry local preparation', description: 'Retry the failed browser action with the current sample. This does not execute a native investigation.', action: 'retry-local' };
  } else if (busy) {
    phase = { code: 'working', label: 'Preparing the local view', detail: 'The browser is working on the selected fictional records. Native workers are not running.' };
    next = { label: 'Local action in progress', description: 'Wait for the browser action to complete before inspecting a new result.' };
  } else if (!loaded) {
    phase = { code: 'unloaded', label: 'Start with the fictional scope', detail: 'No sample has been loaded or checked in this view.' };
    next = { label: 'Review scope and load sample', description: 'Read the question, deadline and read-only limits before preparing the fictional sources.', action: 'open-scope' };
  } else if (!boundReport) {
    phase = { code: 'ready', label: 'Ready for the fictional check', detail: 'The selected sample is available. Its current outcome has not been checked.' };
    next = { label: 'Run fictional check', description: 'Compare the selected observation with the frozen deadline and required state. No model or native Shadow runtime is called.', action: 'verify' };
  } else {
    phase = { code: 'checked', label: 'Fictional comparison complete', detail: 'A source-bound internal sample report is available. Native investigation, review and release remain incomplete.' };
    next = status === 'FAIL'
      ? { label: 'Inspect the discrepancy', description: 'Compare the observed state with the completion claim. A failed business outcome can be a valid finding; it is not a failed Quality verdict.', href: '#evidence/observation/L3-L5' }
      : status === 'NOT ASSESSED'
        ? { label: 'Inspect the evidence requirement', description: 'The missing or insufficient observation cannot establish the deadline outcome. Review the scope and evidence limits.', href: '#evidence/scope/L3-L9' }
        : { label: 'Inspect the internal sample report', description: 'This changed hypothetical observation satisfies the sample rule. It does not repair the original example or approve customer release.', href: '#report' };
  }

  const gates = [
    { id: 'outcome', label: 'Fictional business outcome', value: status, detail: outcomeDescription, tone: status === 'PASS' ? 'good' : status === 'FAIL' ? 'bad' : 'neutral' },
    { id: 'integrity', label: 'Source fingerprints', value: allFingerprints ? `${fingerprintCount} OF ${currentSources.length} AVAILABLE` : fingerprintCount ? `${fingerprintCount} OF ${currentSources.length} AVAILABLE` : 'NOT PREPARED', detail: 'Available SHA-256 fingerprints identify loaded sample bytes. A fingerprint does not prove truth, external authenticity or approval.', tone: allFingerprints ? 'good' : 'neutral' },
    { id: 'comparison', label: 'Browser comparison', value: boundReport ? 'COMPLETED' : 'NOT RUN', detail: boundReport ? 'The existing deterministic fictional check produced this bound report; it is separate from the unverified claim and uses no model.' : 'No completed comparison is bound to the current selected records.', tone: boundReport ? 'good' : 'neutral' },
    { id: 'authenticity', label: 'External authenticity', value: 'NOT AUTHENTICATED', detail: 'Every supplied record is fictional. No real system, customer record or authorization is authenticated.', tone: 'neutral' },
    { id: 'investigation', label: 'Native investigation', value: 'INCOMPLETE', detail: 'No native specialist work runs here. The public sample cannot complete a real customer investigation.', tone: 'neutral' },
    { id: 'quality', label: 'Independent Quality review', value: 'NOT PERFORMED', detail: 'No native Quality verdict exists in this presentation, including when the fictional business outcome passes or fails.', tone: 'neutral' },
    { id: 'queen', label: 'Queen acceptance', value: 'NOT PERFORMED', detail: 'No native Queen acceptance or authority record is supplied.', tone: 'neutral' },
    { id: 'release', label: 'Human release', value: 'NOT APPROVED', detail: 'The report is an internal demonstration. Downloading or inspecting it does not approve delivery or external action.', tone: 'neutral' }
  ];
  const gateStates = {
    outcome: status, integrity: allFingerprints ? 'HASHED' : loaded ? 'INCOMPLETE' : 'NOT LOADED',
    comparison: boundReport ? 'COMPLETE' : 'NOT RUN', authenticity: 'NOT ASSESSED',
    investigation: 'NOT PERFORMED', quality: 'NOT PERFORMED', queen: 'NOT PERFORMED', release: 'NOT APPROVED'
  };
  for (const gate of gates) gate.state = gateStates[gate.id];

  const steps = [
    { id: 'preparation', label: 'Prepare fictional sources', state: allFingerprints ? 'complete' : loaded ? 'current' : 'available', detail: allFingerprints ? 'The loaded sample has browser-prepared fingerprints for its source texts.' : 'Review the read-only scope and load the supplied sample; no real access grant is created.', href: '#evidence/scope/L3-L9' },
    { id: 'check', label: 'Check the fictional outcome', state: boundReport ? 'complete' : loaded && !busy && !error ? 'available' : 'waiting', detail: boundReport ? `The current source-bound comparison returned ${status}.` : 'A browser comparison must run before an outcome can be shown.', href: '#dashboard' },
    { id: 'report', label: 'Inspect the internal sample report', state: boundReport ? 'available' : 'waiting', detail: boundReport ? 'A report is prepared; the interface does not claim that you have reviewed or approved it.' : 'No current sample report has been prepared.', href: '#report' },
    { id: 'review', label: 'Complete native investigation and reviews', state: 'unavailable', detail: 'Real specialist work, independent Quality review and Queen acceptance are outside this public presentation.', href: '#architecture' },
    { id: 'release', label: 'Obtain human release authority', state: 'unavailable', detail: 'No customer release, remediation, delivery or follow-up is approved or executed here.', href: '#report' }
  ];

  const attention = status === 'FAIL'
    ? 'The fictional completion claim conflicts with the separate observation at the deadline. The discrepancy is a valid sample finding; its cause and any later correction remain unknown.'
    : status === 'PASS'
      ? 'The explicitly changed fictional observation contains the required state. This what-if result does not alter the original baseline or show that a real business workflow succeeded.'
      : status === 'NOT ASSESSED'
        ? 'The selected evidence cannot establish the outcome at the deadline. An absent or early observation is insufficient evidence, not a successful result.'
        : 'No current fictional outcome is established. Review the scope and run the local check before interpreting the completion claim.';
  const briefings = [
    { id: 'attention', label: 'What needs attention?', title: 'Separate the claim from the outcome', paragraphs: [attention, 'This is deterministic presentation guidance derived from the selected sample state. It is not a conversation, model response or worker message.'], citations: refs(scope, claim, observation) },
    { id: 'assurance', label: 'What can I trust?', title: 'Keep the proof boundaries visible', paragraphs: [boundReport ? `The browser comparison returned ${status} for these selected fictional records. Its source references can be inspected; external authenticity remains unassessed.` : 'No completed comparison is currently bound to the selected records.', `${fingerprintCount} source fingerprint${fingerprintCount === 1 ? '' : 's'} available. Fingerprints describe byte identity only; they do not authenticate the underlying business state.`, 'Native investigation, independent Quality review and Queen acceptance have not been performed. A business discrepancy alone does not decide whether a future reviewed report is acceptable.'], citations: refs(scope, observation) },
    { id: 'release', label: 'Can this be released?', title: 'Internal demonstration — release not approved', paragraphs: ['No. Human release is NOT APPROVED in every sample variant. There is no authenticated customer engagement, native review chain or approval record in this presentation.', 'A business FAIL may still be a valid reviewed finding. The absent evidence, reviews and authority prevent release here; the business verdict itself does not decide release.', 'Inspecting or downloading the internal sample report is a working browser action. Customer delivery, correction, external writes and real follow-up remain unavailable.'], citations: refs(scope) }
  ];

  const blockers = [
    { title: 'Real evidence is absent', detail: 'Fictional records and their hashes cannot qualify an authenticated customer investigation.' },
    { title: 'Native work and reviews are unavailable here', detail: 'Specialist investigation, independent Quality review and Queen acceptance have not occurred in this public presentation.' },
    { title: 'Human release is not approved', detail: 'No sample result, including PASS, authorizes customer delivery, remediation or external action.' }
  ];
  if (error) blockers.unshift({ title: 'Local action did not complete', detail: String(error.message || 'Retry the failed local browser action.') });
  return { phase, next, outcome: { code: status, label: status, description: outcomeDescription }, gates, steps, briefings, blockers };
}
