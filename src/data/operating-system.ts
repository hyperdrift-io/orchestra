/** An illustrative target model, never a live readiness report. */
export const operatingServices = [
  { id: 'build', name: 'Build & release', symbol: 'wrench', colour: '#e3a857', detail: 'Source, preview and relevant checks lead to an authorised release. The record identifies exactly what reached the live app.', evidence: 'Tested revision · release receipt · live customer path' },
  { id: 'run', name: 'Run & recover', symbol: 'clock', colour: '#78dcca', detail: 'Watch the running service, route a problem to its owner and verify recovery. Backups earn confidence through an exercised restore.', evidence: 'Fresh health checks · acknowledged alert · restore evidence' },
  { id: 'protect', name: 'Protect & reconcile', symbol: 'shield', colour: '#8fb9f3', detail: 'Assess live exposure, prepare an allowed repair and verify it in service. Carry the protection into development and block later releases that would undo it.', evidence: 'Finding · verified repair · source reconciliation' },
  { id: 'reach', name: 'Reach & serve', symbol: 'conversation', colour: '#ed9f91', detail: 'A named customer-success owner connects support, communication and accepted customer work. An action receipt and a customer result remain separate facts.', evidence: 'Accepted action · delivery receipt · customer result' },
  { id: 'learn', name: 'Measure & decide', symbol: 'book', colour: '#bca5e5', detail: 'Traction connects context, accepted work and outcomes. Customer, payment and analytics systems remain authoritative; their evidence informs the next decision.', evidence: 'Evidence source · decision · result · next move' },
] as const;

export const operatingScenes = [
  { label: 'The app arrives', title: 'Start with the app people use.', text: 'Bring a live app, or commission a scoped improvement. Its purpose and the customer action worth improving stay at the centre.', record: 'App identity, mission and intended customer', status: 'Scope to agree' },
  { label: 'Ownership connects', title: 'People give the system direction.', text: 'Name the customer-success and technical owners. Agree scope, access, capacity and the decisions agents may carry out.', record: 'Named owners, accepted scope and specific permissions', status: 'Ownership accepted' },
  { label: 'Services connect', title: 'Connect the work around the app.', text: 'Delivery, production care, protection, customer work and evidence join the same operating record. Each connection has its own readiness state.', record: 'Configured connections, missing coverage and next actions', status: 'Setup recorded' },
  { label: 'Readiness is checked', title: 'A connection earns its evidence.', text: 'Exercise the live customer path, check measurement and verify operating ownership. Recovery and security obligations stay visible until their checks pass.', record: 'Dated checks and unresolved obligations', status: 'Evidence inspected' },
  { label: 'A signal becomes work', title: 'One signal becomes scoped work.', text: 'Notice the change, choose a response and carry out the authorised action. Engineering work passes validation and release checks.', record: 'Evidence → decision → permitted action', status: 'Action in the example' },
  { label: 'The result returns', title: 'The next decision starts here.', text: 'Keep the action receipt and the observed result. Traction carries them into the next decision, including what remains uncertain.', record: 'Receipt, observed result and revised next move', status: 'One result retained' },
] as const;

export const operatingScenarios = [
  { id: 'security', label: 'Security repair', service: 2, signal: 'A runtime dependency needs a security repair.', action: 'Prepare a permitted patch from the live release. Validate it and admit the candidate through the shared deployment checks.', result: 'Verify the running repair. Reconcile the recorded change into development; reject a later release that would restore the vulnerability.', receipt: 'Runtime verified → source reconciled → later regression blocked', next: 'Keep assessing live exposure. Escalate any unresolved compatibility or reconciliation work.' },
  { id: 'support', label: 'Customer support', service: 3, signal: 'A customer cannot complete a booking.', action: 'The named support owner accepts the issue. Reproduce it, prepare a response and authorise any needed fix or customer communication.', result: 'Record the delivered response and confirm whether the customer completed the booking. An unanswered follow-up stays open.', receipt: 'Issue accepted → action delivered → customer result recorded', next: 'Use the customer result to decide whether the wider booking flow needs work.' },
  { id: 'growth', label: 'Conversion learning', service: 4, signal: 'Usage evidence suggests people stop before completing the core action.', action: 'Check the measurement and ask what is getting in the way. Agree one improvement, a baseline and the evidence that will decide its value.', result: 'Release the agreed change and retain its measurement plan. The outcome remains awaiting evidence until the relevant customer results arrive.', receipt: 'Change released → measurement connected → awaiting evidence', next: 'Compare credible results with the baseline before expanding the change.' },
] as const;

export function operatingReadiness(scene: number, service: number): string {
  if (scene < 2) return 'Awaiting connection';
  if (scene === 2) return service === 2 ? 'Needs setup' : 'Configured';
  return ['Live path checked', 'Restore evidence needed', 'Repair policy agreed', 'Owner accepted', 'Measurement checked'][service];
}
