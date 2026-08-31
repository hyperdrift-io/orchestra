export interface CaseStudy {
  slug: string;
  name: string;
  outcome: string;
  problem: string;
  capability: string;
  stack: string[];
  /** Live demo or source, when it is public. */
  link?: string;
  linkLabel?: string;
  /** The article that documents the build, on the Hyperdrift blog. */
  article?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'helm',
    name: 'Helm',
    outcome:
      'Google "All Things Agentic" hackathon entry: an agent crew commanding a live four-app fleet with scoped authority — the Commander decides, the Watch Officer reads, the Engineer acts only through allow-listed tools. Includes a self-healing drill against a deliberately broken, prompt-injected sandbox service.',
    problem:
      'Handing one agent the production keyboard is how incidents happen; handing it nothing is how nothing ships.',
    capability: 'Fleet-scale orchestration with per-agent scoped authority.',
    stack: ['Claude', 'MCP', 'PostHog signals', 'Cloud Run'],
    article: 'https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals',
  },
  {
    slug: 'fleet-signals',
    name: 'The Fleet Commander',
    outcome:
      'A daily command cycle over four production apps that starts from push-based analytics: PostHog self-driving signals feed the morning read, so the platform speaks before anyone queries it.',
    problem:
      'Pull-based analytics only finds what you thought to ask; a fleet run by one founder cannot afford questions nobody asked.',
    capability: 'Push-based product telemetry wired into agent decision loops.',
    stack: ['PostHog', 'HogQL', 'Python', 'Claude'],
    article: 'https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals',
  },
  {
    slug: 'own-stack',
    name: 'own-stack',
    outcome:
      'Server-rendered React with five production dependencies: typed server functions across the wire, no API routes, pure cascading CSS. The reference stack every new Hyperdrift app inherits.',
    problem:
      'Framework lock-in taxes every feature after the first; most of the dependency tree serves the framework, not the product.',
    capability: 'Owned, minimal full-stack architecture.',
    stack: ['Waku RSC', 'TypeScript', 'Better Auth'],
    link: 'https://own-stack.hyperdrift.io',
    linkLabel: 'Live',
    article: 'https://hyperdrift.io/blog/own-your-stack-server-rendered-react-without-nextjs',
  },
  {
    slug: 'stack-one',
    name: 'CLI meets UI',
    outcome:
      'A log-investigation UI where the command palette, vim navigation and a chart-filtered table make the whole workflow zero-click — terminal speed in the browser, installable as a PWA.',
    problem:
      'Browser devtools are slower than terminals for operators who live in the work.',
    capability: 'Operator-grade interaction design for data-dense tools.',
    stack: ['React', 'URL-synced state', 'PWA'],
    link: 'https://stack-one.hyperdrift.io/logs',
    linkLabel: 'Live',
    article: 'https://hyperdrift.io/blog/web-app-vs-cli-command-palette-pwa-productivity',
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
  },
];
