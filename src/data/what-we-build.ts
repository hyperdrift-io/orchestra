export interface Capability {
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    title: 'Multi-agent orchestration',
    description:
      'Planning, routing, tool use and recovery across multiple specialised agents — designed for production load.',
  },
  {
    title: 'AI copilots',
    description:
      'Embedded chat with scoped tool use over your tenant data, switchable models and audit-ready traces.',
  },
  {
    title: 'Semantic search & retrieval',
    description:
      'Hybrid lexical + vector retrieval with evaluation harnesses so quality is measurable, not folklore.',
  },
  {
    title: 'RAG over product data',
    description:
      'Tenant-scoped retrieval-augmented generation over the data your product already stores.',
  },
  {
    title: 'Summarisation & insight workflows',
    description:
      'Background workflows that turn raw activity into customer-facing summaries, reports or alerts.',
  },
  {
    title: 'Agent observability & audit',
    description:
      'Per-tenant traces, cost attribution and compliance-shaped logging for regulated verticals.',
  },
];
