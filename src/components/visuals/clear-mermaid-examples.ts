export type Step = { id: string; label: string; decision?: boolean };
export type Connection = { id: string; from: string; to: string; label: string };
export type Diagram = { steps: Step[]; connections: Connection[] };
export type Example = { id: string; title: string; task: string; notice: string; diagram: Diagram };

export const examples: Example[] = [
  {
    id: 'decisions', title: 'A decision with a return path',
    task: 'Follow an incomplete application until it is ready for review.',
    notice: 'Select the question in Clear Mermaid. Its incoming and outgoing connections are also available as text.',
    diagram: { steps: [
      { id: 'start', label: 'Receive the application' },
      { id: 'complete', label: 'Does the request include everything needed for a fair review?', decision: true },
      { id: 'review', label: 'Review the evidence against the eligibility criteria' },
      { id: 'ask', label: 'Ask for the missing information' },
      { id: 'update', label: 'Add the applicant’s reply' },
      { id: 'result', label: 'Send the decision and explain the next step' },
    ], connections: [
      { id: 'a', from: 'start', to: 'complete', label: '' },
      { id: 'b', from: 'complete', to: 'review', label: 'Complete' },
      { id: 'c', from: 'complete', to: 'ask', label: 'Incomplete' },
      { id: 'd', from: 'ask', to: 'update', label: '' },
      { id: 'e', from: 'update', to: 'complete', label: 'Check again' },
      { id: 'f', from: 'review', to: 'result', label: '' },
    ] },
  },
  {
    id: 'retry', title: 'A request that needs another attempt',
    task: 'Find what happens after a temporary failure, and where the retry returns.',
    notice: 'Follow a step to concentrate on its immediate connections, then return to the overview.',
    diagram: { steps: [
      { id: 'send', label: 'Send the request' },
      { id: 'response', label: 'Did the service respond?', decision: true },
      { id: 'save', label: 'Save the result' },
      { id: 'temporary', label: 'Is the failure temporary?', decision: true },
      { id: 'wait', label: 'Wait before trying again' },
      { id: 'help', label: 'Explain the problem and ask for help' },
      { id: 'done', label: 'Show the outcome' },
    ], connections: [
      { id: 'a', from: 'send', to: 'response', label: '' },
      { id: 'b', from: 'response', to: 'save', label: 'Yes' },
      { id: 'c', from: 'response', to: 'temporary', label: 'No' },
      { id: 'd', from: 'temporary', to: 'wait', label: 'Try again' },
      { id: 'e', from: 'wait', to: 'send', label: 'Retry the request' },
      { id: 'f', from: 'temporary', to: 'help', label: 'Needs attention' },
      { id: 'g', from: 'save', to: 'done', label: '' },
      { id: 'h', from: 'help', to: 'done', label: '' },
    ] },
  },
  {
    id: 'dependencies', title: 'A service shared by several teams',
    task: 'Select Identity service and find every service that depends on it.',
    notice: 'Clear Mermaid highlights the selected service’s connections. Search and the relationship view provide another route through the same graph.',
    diagram: { steps: [
      { id: 'web', label: 'Customer website' }, { id: 'mobile', label: 'Mobile app' },
      { id: 'support', label: 'Support workspace' }, { id: 'identity', label: 'Identity service' },
      { id: 'orders', label: 'Orders service' }, { id: 'payments', label: 'Payments service' },
      { id: 'records', label: 'Customer records' }, { id: 'messages', label: 'Notifications' },
    ], connections: [
      { id: 'a', from: 'web', to: 'identity', label: 'Sign in' },
      { id: 'b', from: 'mobile', to: 'identity', label: 'Sign in' },
      { id: 'c', from: 'support', to: 'identity', label: 'Check access' },
      { id: 'd', from: 'web', to: 'orders', label: 'Place an order' },
      { id: 'e', from: 'mobile', to: 'orders', label: 'Place an order' },
      { id: 'f', from: 'orders', to: 'identity', label: 'Check access' },
      { id: 'g', from: 'payments', to: 'identity', label: 'Check access' },
      { id: 'h', from: 'orders', to: 'payments', label: 'Take payment' },
      { id: 'i', from: 'support', to: 'records', label: 'Read history' },
      { id: 'j', from: 'orders', to: 'records', label: 'Save order' },
      { id: 'k', from: 'orders', to: 'messages', label: 'Send confirmation' },
    ] },
  },
];

export function toMermaid(diagram: Diagram) {
  const lines = diagram.steps.map(step => `  ${step.id}${step.decision ? '{' : '['}"${step.label}"${step.decision ? '}' : ']'}`);
  for (const edge of diagram.connections) lines.push(`  ${edge.from} -->${edge.label ? `|"${edge.label}"|` : ''} ${edge.to}`);
  return `flowchart LR\n${lines.join('\n')}\n`;
}

export function labelError(label: string) {
  if (!label.trim()) return 'Give the step a name.';
  if (label.length > 160) return 'Keep the label to 160 characters.';
  if (/["<>\r\n]/.test(label)) return 'Use one line without double quotes or angle brackets.';
  return '';
}
