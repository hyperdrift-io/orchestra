import figureData from '@/data/ui-accessibility-figures.json';

export const interfaceRoutes = [
  { id: 'controls', label: 'Direct controls', note: 'The person chooses controls that trigger app actions, then checks the result.' },
  { id: 'api-cli', label: 'API / CLI', note: 'A person or program specifies operations. An adapter calls the app; the result still needs inspection.' },
  { id: 'webmcp', label: 'WebMCP', note: 'A compatible browser agent calls actions exposed by the page. The person can inspect the shared page state.' },
  { id: 'voice-app', label: 'Voice over an app', note: 'Speech supplies a request. The app-specific voice integration acts and returns feedback.' },
  { id: 'voice-mcp', label: 'Voice through MCP', note: 'Proposed path: speech reaches an assistant, which calls authorised service tools. The result remains reviewable.' },
];

export function interfaceFigure(slug: string) {
  return (figureData as Record<string, { asset: string; title: string; description: string }>)[slug];
}
