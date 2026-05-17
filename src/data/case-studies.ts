export interface CaseStudy {
  slug: string;
  name: string;
  outcome: string;
  problem: string;
  capability: string;
  stack: string[];
  link?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hydra',
    name: 'Hydra',
    outcome:
      'Multi-agent orchestration POC coordinating retrieval, planning and execution across heterogeneous tools.',
    problem:
      'Single-agent flows hit ceilings on real product tasks that need parallel tool use, branching and recovery.',
    capability: 'Multi-agent orchestration with tool-aware routing.',
    stack: ['Anthropic Claude', 'LangGraph', 'TypeScript', 'Node.js'],
    link: 'https://github.com/yannvr/hyperdrift/tree/main/apps/poc/hydra',
  },
  {
    slug: 'hyper-video-mesh',
    name: 'Hyper Video Mesh',
    outcome:
      'Video understanding pipeline that turns long-form footage into queryable, agent-actionable segments.',
    problem:
      'Long-form video is opaque to product workflows — search and retrieval stop at titles and tags.',
    capability: 'Semantic segmentation + retrieval-augmented agent flow over video.',
    stack: ['OpenAI Whisper', 'Embeddings', 'Vector search', 'TypeScript'],
    link: 'https://github.com/yannvr/hyperdrift/tree/main/apps/poc/hyper-video-mesh',
  },
];
