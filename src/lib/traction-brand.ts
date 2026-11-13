/** Articles centred on Traction; passing mentions retain their own subject identity. */
export const isTractionArticle = (slug: string) => [
  'give-motivated-founders-a-fair-chance',
  'agent-driven-ui-intelligence-and-action',
  'hands-free-app-control',
  'voice-through-mcp',
].includes(slug);
