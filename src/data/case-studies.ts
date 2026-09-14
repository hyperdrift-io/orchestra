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
  repo?: string;
  /** The article that documents the build, on the Hyperdrift blog. */
  article?: string;
  /** Event attribution describes participation, not a client or endorsement. */
  challenge?: {
    organiser: string;
    name: string;
    url: string;
    stage: 'Submitted' | 'Built for the challenge' | 'In development';
    entryUrl?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'standup',
    name: 'Standup',
    outcome:
      'A GitHub handle becomes a short brief: who is waiting, what to start with, and how long it may take. Each recommendation links to the evidence the agent read. Available on the web, in the terminal, and through MCP.',
    problem:
      'Returning to a project means reading across repositories and conversations before deciding where to help.',
    capability: 'Read-only repository scouts, structured triage, and an inspectable audit trail.',
    stack: ['Strands Agents SDK', 'Python', 'GitHub GraphQL', 'MCP'],
    link: 'https://standup.hyperdrift.io',
    linkLabel: 'Try the agent',
    repo: 'https://github.com/hyperdrift-io/standup',
    article: 'https://hyperdrift.io/blog/one-evening-who-is-waiting-on-you',
    challenge: {
      organiser: 'Amazon Web Services',
      name: 'Agents for Humans Hackathon',
      url: 'https://agentsforhumans.devpost.com/',
      stage: 'Built for the challenge',
    },
  },
  {
    slug: 'helm',
    name: 'Helm',
    outcome:
      'An agent crew at the wheel of a four-app fleet: the Commander decides, the Watch Officer reads signals, and the Engineer acts through allow-listed tools. A sandbox drill demonstrates diagnosis, prompt-injection isolation, recovery, and verification.',
    problem:
      'An operations agent needs enough access to help, with a clear boundary around every action.',
    capability: 'Fleet-scale orchestration with per-agent scoped authority.',
    stack: ['Gemini 3.5', 'ADK', 'Fleet MCP', 'PostHog signals', 'Cloud Run'],
    link: 'https://helm-294160018950.europe-west1.run.app',
    linkLabel: 'Try fleet diagnosis',
    repo: 'https://github.com/hyperdrift-io/helm',
    article: 'https://hyperdrift.io/blog/your-error-page-is-a-prompt',
    challenge: {
      organiser: 'Google',
      name: 'All Things Agentic Hackathon',
      url: 'https://allthingsagentichackathon.devpost.com/',
      stage: 'Submitted',
    },
  },
  {
    slug: 'uk-gov-radar',
    name: 'uk.gov Radar',
    outcome:
      'A founder and their browser agent explore government opportunities together. The agent proposes a profile and a shortlist; the founder keeps or drops each suggestion, with their reasons available to the agent.',
    problem:
      'A useful opportunity depends on a founder’s context. The page and the agent need to work from the same shortlist.',
    capability: 'Seven WebMCP tools share the page’s controls and preserve the human’s final decision.',
    stack: ['WebMCP', 'TypeScript', 'Shared browser state'],
    link: 'https://radar.hyperdrift.io/explore',
    linkLabel: 'Try with your agent',
    repo: 'https://github.com/hyperdrift-io/uk-ai-radar',
    article: 'https://hyperdrift.io/blog/the-agent-is-the-session',
    challenge: {
      organiser: 'OpenAI',
      name: 'The WebMCP Challenge',
      url: 'https://openai.com/webmcp-challenge/',
      stage: 'Submitted',
    },
  },
  {
    slug: 'unanswered',
    name: 'unanswered',
    outcome:
      'Tell it what you know. Gemini matches you with open-source maintainers asking for help, explains where you can contribute, and drafts an opening reply. You edit and send it yourself.',
    problem:
      'People willing to contribute need a practical way to find the maintainer whose request fits their skills.',
    capability: 'Evidence-based GitHub discovery, Gemini matching, and a reply draft under human control.',
    stack: ['Google Gemini', 'Vertex AI', 'GitHub API', 'Waku', 'MCP'],
    link: 'https://unanswered.hyperdrift.io',
    linkLabel: 'Find someone to help',
    repo: 'https://github.com/hyperdrift-io/unanswered',
    article: 'https://hyperdrift.io/blog/open-source-routing-problem-unanswered-asks',
    challenge: {
      organiser: 'DEV Community',
      name: 'Weekend Challenge: Generosity Edition · Google AI category',
      url: 'https://dev.to/challenges/weekend-2026-09-03',
      stage: 'Submitted',
      entryUrl: 'https://dev.to/yannvr/somebody-asked-for-help-nobody-came-5c7i',
    },
  },
  {
    slug: 'bridge-voice',
    name: 'Bridge Voice',
    outcome:
      'A voice interface for discussing fleet priorities and confirming proposed actions. The prototype explores how a founder can work with the Bridge through a conversation.',
    problem:
      'Operators need to ask about their systems and act on the answer while keeping each consequential decision explicit.',
    capability: 'AssemblyAI conversation and tool calling connected to the fleet’s existing controls.',
    stack: ['AssemblyAI Voice Agent API', 'Fleet MCP', 'WebSocket'],
    challenge: {
      organiser: 'AssemblyAI · lablab.ai',
      name: 'AssemblyAI Voice Agent Hackathon',
      url: 'https://lablab.ai/ai-hackathons/assemblyai-voice-agent-hackathon',
      stage: 'In development',
    },
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
    linkLabel: 'Explore the stack',
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
