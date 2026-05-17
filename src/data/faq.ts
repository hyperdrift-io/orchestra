export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Do you work with our existing stack?',
    answer:
      'Yes. We meet your product where it lives — Rails, Django, Next.js, Laravel, Postgres, MongoDB, the lot. Orchestra integrates; it does not displace.',
  },
  {
    question: 'Which models and frameworks do you use?',
    answer:
      'Model-neutral. OpenAI, Anthropic, local models — your choice. Framework-neutral too: LangGraph, CrewAI, Mastra, Claude Agent SDK, OpenAI Agents SDK. We adapt to your constraints.',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do. Everything we ship is yours, in your repo, under your licence. No proprietary runtimes you cannot leave.',
  },
  {
    question: 'How do you handle multi-tenancy?',
    answer:
      'Multi-tenancy is the centre of our methodology, not an afterthought. Per-tenant memory, tool scoping, cost attribution and audit trails are part of every engagement.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We hand off with documentation, runbooks and observability already wired. Optional retainers are available; lock-in is not part of the offer.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Every product is different, so pricing is per engagement. We scope concretely after a short conversation — no decks, no discovery theatre.',
  },
];
