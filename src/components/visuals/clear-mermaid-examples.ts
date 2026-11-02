export type Step = { id: string; label: string; decision?: boolean; domain?: string };
export type Connection = { id: string; from: string; to: string; label: string; bidirectional?: boolean };
export type Domain = { id: string; label: string; parent?: string };
export type Diagram = { steps: Step[]; connections: Connection[]; domains?: Domain[]; direction?: 'LR' | 'TB' };
export type Example = { id: string; title: string; task: string; notice: string; prompts?: { label: string; node?: string; domain?: string }[]; diagram: Diagram };

export const examples: Example[] = [
  {
    id: 'nested', title: 'Nested domains and a payment retry',
    task: 'Find the checkout boundary, follow its request to the payment provider, then trace a failed payment back to the retry.',
    notice: 'Domain titles and boundaries show what belongs together. Select a domain to inspect its contents, or select a step to follow only its connections.',
    prompts: [
      { label: 'Find the checkout boundary', domain: 'checkout_domain' },
      { label: 'Trace the payment request', node: 'charge' },
      { label: 'Follow the retry', node: 'retry' },
    ],
    diagram: {
      direction: 'TB',
      domains: [
        { id: 'channels_domain', label: 'Customer channels' },
        { id: 'platform_domain', label: 'Commerce platform' },
        { id: 'orders_domain', label: 'Order services', parent: 'platform_domain' },
        { id: 'checkout_domain', label: 'Checkout', parent: 'orders_domain' },
        { id: 'shared_domain', label: 'Shared services', parent: 'platform_domain' },
        { id: 'external_domain', label: 'External payment provider' },
      ],
      steps: [
        { id: 'web', label: 'Customer website', domain: 'channels_domain' },
        { id: 'mobile', label: 'Mobile app', domain: 'channels_domain' },
        { id: 'status', label: 'Order confirmation' },
        { id: 'gateway', label: 'Request gateway', domain: 'platform_domain' },
        { id: 'validate', label: 'Check the order', domain: 'orders_domain' },
        { id: 'ledger', label: 'Save the order', domain: 'orders_domain' },
        { id: 'reserve', label: 'Reserve the items', domain: 'checkout_domain' },
        { id: 'charge', label: 'Request payment', domain: 'checkout_domain' },
        { id: 'paid', label: 'Was payment accepted?', decision: true, domain: 'checkout_domain' },
        { id: 'retry', label: 'Wait and retry payment', domain: 'checkout_domain' },
        { id: 'identity', label: 'Identity service', domain: 'shared_domain' },
        { id: 'messages', label: 'Notifications', domain: 'shared_domain' },
        { id: 'provider', label: 'Process the payment', domain: 'external_domain' },
      ],
      connections: [
        { id: 'a', from: 'web', to: 'gateway', label: 'Place order' },
        { id: 'b', from: 'mobile', to: 'gateway', label: 'Place order' },
        { id: 'c', from: 'gateway', to: 'identity', label: 'Sign in' },
        { id: 'd', from: 'gateway', to: 'validate', label: 'Submit order' },
        { id: 'e', from: 'validate', to: 'reserve', label: 'Ready' },
        { id: 'f', from: 'reserve', to: 'charge', label: '' },
        { id: 'g', from: 'charge', to: 'provider', label: 'Payment request / response', bidirectional: true },
        { id: 'h', from: 'charge', to: 'paid', label: 'Read response' },
        { id: 'i', from: 'paid', to: 'ledger', label: 'Accepted' },
        { id: 'j', from: 'paid', to: 'retry', label: 'Temporary failure' },
        { id: 'k', from: 'retry', to: 'charge', label: 'Retry payment' },
        { id: 'l', from: 'ledger', to: 'messages', label: 'Order saved' },
        { id: 'm', from: 'messages', to: 'status', label: 'Send confirmation' },
        { id: 'o', from: 'charge', to: 'identity', label: 'Check payment access' },
      ],
    },
  },
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

export function domainPath(diagram: Diagram, id?: string): string {
  const domain = diagram.domains?.find(item => item.id === id);
  return domain ? [domainPath(diagram, domain.parent), domain.label].filter(Boolean).join(' / ') : '';
}

export function domainMembers(diagram: Diagram, id: string): Step[] {
  const included = new Set([id]);
  for (let pass = 0; pass < (diagram.domains?.length ?? 0); pass++) {
    for (const domain of diagram.domains ?? []) if (domain.parent && included.has(domain.parent)) included.add(domain.id);
  }
  return diagram.steps.filter(step => step.domain && included.has(step.domain));
}

export function toMermaid(diagram: Diagram) {
  const lines: string[] = [];
  const domains = diagram.domains ?? [];
  const writeLevel = (parent?: string, indent = '  ') => {
    for (const domain of domains.filter(item => item.parent === parent)) {
      lines.push(`${indent}subgraph ${domain.id}["${domain.label}"]`);
      writeLevel(domain.id, indent + '  ');
      lines.push(`${indent}end`);
    }
    for (const step of diagram.steps.filter(item => item.domain === parent)) {
      lines.push(`${indent}${step.id}${step.decision ? '{' : '['}"${step.label}"${step.decision ? '}' : ']'}`);
    }
  };
  writeLevel();
  for (const edge of diagram.connections) lines.push(`  ${edge.from} ${edge.bidirectional ? '<-->' : '-->'}${edge.label ? `|"${edge.label}"|` : ''} ${edge.to}`);
  return `flowchart ${diagram.direction ?? 'LR'}\n${lines.join('\n')}\n`;
}

export function labelError(label: string) {
  if (!label.trim()) return 'Give the step a name.';
  if (label.length > 160) return 'Keep the label to 160 characters.';
  if (/["<>\r\n]/.test(label)) return 'Use one line without double quotes or angle brackets.';
  return '';
}
