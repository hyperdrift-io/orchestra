export interface Package {
  slug: string;
  name: string;
  summary: string;
  timeline: string;
  highlights: string[];
}

export const packages: Package[] = [
  {
    slug: 'multi-agent-orchestration',
    name: 'Multi-Agent Orchestration',
    summary:
      'Design and deploy a tenant-aware multi-agent flow inside your product — planning, tool use, recovery, cost controls.',
    timeline: 'Typical timeline: 3–4 weeks',
    highlights: [
      'Per-tenant memory and tool scoping',
      'Cost attribution and quotas',
      'Observability and audit-ready traces',
    ],
  },
  {
    slug: 'ai-copilot',
    name: 'AI Copilot',
    summary:
      'Embedded chat copilot with tool use over your own product data. Multi-tenant, audit-ready, model-neutral.',
    timeline: 'Typical timeline: 3–4 weeks',
    highlights: [
      'Tool use scoped to tenant data',
      'Conversation memory + handoff',
      'Switchable models (OpenAI, Anthropic, local)',
    ],
  },
  {
    slug: 'ai-search-retrieval',
    name: 'AI Search & Retrieval',
    summary:
      'Semantic + lexical retrieval over the customer data your product already stores. Hybrid ranking, evaluation harness.',
    timeline: 'Typical timeline: 2 weeks',
    highlights: [
      'Hybrid lexical + vector ranking',
      'Tenant-aware embedding stores',
      'Eval harness so quality is measurable, not vibes',
    ],
  },
];
