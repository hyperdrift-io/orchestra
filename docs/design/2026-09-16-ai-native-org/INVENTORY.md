# The AI-native organisation — map inventory

16 September 2026. Content contract for the next ai.hyperdrift.io front door: an explorable map of Hyperdrift as an organisation that runs on agents, from founder level down through every function. Every node on the map is a real, running integration point backed by an artefact. No node without an artefact; no number tiles. Positioning read: `~/dev/hyperdrift/.growth/strategy/2026-09-16-ai-site-positioning-research.md`.

Founder direction (16 Sep): interactive, expertise showcased in a spectacular way, each fact supported, the AI-native org explained with its integration points all the way to founder level. Quality content and solid use cases over numbers. No prices, terms or legal on the page. The visitor, whoever they are, should think "that can work for me".

Voice Covenant applies to every line drafted from this. Gaps are next steps, not failures.

## How to read a node

`name` · what it automates (the recurring job) · what runs it · cadence · **artefact** (what the panel links to) · client analogue (where the same integration point sits in a visitor's organisation). Visibility: **public** (linkable today) · **showable** (internal, can be shown as a screenshot or excerpt) · internal.

## Layer 0 — Founder

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| The Commander's Read | The founder's morning decision: verdict, pragmatic call, opportunity, per app and fleet | `hd commander today`, `commander-daily` skill, headless agent in `org-bau.yml` | Daily 06:00 | **public** article `the-agent-is-the-session`; showable: the Read on the Bridge | The exec brief nobody has time to write |
| The Mission | One decision object a day, with a log and an outcome loop (`commander learn`) | `scripts/commander/mission.py`, `learn.py` | Daily | showable: Mission Log excerpt | OKR check-in that actually closes the loop |
| The idea gate | GO / REFINE / KILL on any feature before it is built | `hd strategist`, `strategist` + `app-strategist` skills | On demand | showable: a Direction Brief | Product council, portfolio review |
| Autonomy policy as code | What agents may do alone, what needs a human, by risk tier | `meta/HD-AUTONOMY.yml`, `meta/HD-BAU.md` | Continuous | **public** (publishable excerpt) | Delegation matrix, approval policy |

## Layer 1 — Strategy and growth

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| The fleet watches itself | Day-on-day PostHog deltas per app, ranked, surfaced | `scripts/growth/signals.py`, `hd growth brief` | Daily | **public** article `the-fleet-watches-itself-posthog-signals` | Weekly metrics deck |
| Fleet focus | Growth findings become triaged GitHub issues with an agent request block | `hd orchestrator fleet-focus` | Daily | showable: an issue | Backlog grooming from analytics |
| Reply-led distribution | Finds conversations, classifies intent, drafts a disclosed reply, tracks follow-ups; never posts alone | `hd distribution`, `distribution-operator` skill | Daily | showable: the follow-up ledger | Community and social team |
| Search visibility | Sitemaps, Search Console inspection, auto-refresh | `hd growth visibility` | Daily | showable | SEO retainer |
| LinkedIn syndication | Blog to LinkedIn | `scripts/social/linkedin_blog_sync.py` | Weekly | **public** posts | Content scheduling |
| hyper-post | Multi-platform posting and listening | `apps/tools/hyper-post` | On demand | **public** repo + article `hyper-post-multi-platform-social` | Social tooling |
| MCP Maker | Offer pipeline: roadmap, proposition, flagship delivery | `hd growth mcp-maker*`, `meta/offers/mcp-maker/` | Daily refresh | **public** Deputy MCP repo | Product marketing for an integration |
| Contest scouting | Reads organiser mail, ledgers events, walks phases, hard founder gate before submit, 7-day alert | `.growth/contests/ledger.jsonl`, `scripts/bau/contests.py`, `contest` skill | Daily | **public** the entries: `standup`, `unanswered`, `uk-ai-radar`, `helm`, `bridge-voice` | Bid and tender pipeline |

## Layer 2 — Content and research

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| Daily Intel | Research brief written, reviewed and published as an article, every morning | `daily-brief.yml` (Anthropic + Firecrawl), commits as Hyperdrift Bot | Daily 07:00 | **public** intel.hyperdrift.io and ~35 `daily-intel-*` articles | Market intelligence desk |
| Weekly ML digest | Curated digest to the list | `weekly-ml.yml` | Fridays | **public** newsletter | Internal newsletter |
| Research spike | 30-minute go/no-go brief before any new build | `research-spike` skill, `.research/` (30 briefs) | Per idea | showable: one brief | Feasibility study |
| Latest writing | 99 articles, dated feed | `/api/blog/list` (branch `feat/blog-list-feed`) | Live | **public** hyperdrift.io/blog | Thought leadership |

## Layer 3 — Product and engineering

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| The session inherits the values | Every agent session starts with the philosophy and the Voice Covenant | `scripts/hooks/session-philosophy.sh` | Every session | **public** `meta/PHILOSOPHY.md` excerpt | Onboarding, code of conduct that agents actually read |
| Skill contracts | Which skill handles which task, generated into the agent guide | `meta/skills/contracts.yml`, `hd foundation skills sync` | On change | showable: the routing table | Playbooks, RACI |
| Foundation audit and self-heal | Agent-excellence audit, backlog, doctor, heal | `hd foundation *` | Daily heal, monthly audit | showable: Bridge Ops page | Engineering health review |
| Vanguard | Weekly leading-edge review of the fleet's code against the frontier | `org-vanguard.yml`, `scripts/vanguard/` | Mondays | showable: `vanguard` issues | Architecture review board |
| Code health | Silent-failure and oversized-file scan | `hd codehealth` (ast-grep) | Weekly | showable | Static analysis gate |
| Night crew | Per-app nightly diagnosis | `hd nightcrew` | Daily | showable: email block | On-call handover note |
| Tool ledger | Every tool's adoption, usage and obsolescence, recorded on each call | `hd toolchain`, `meta/TOOLING.md`, `get-tool` skill | Continuous | showable | Vendor and tooling review |
| AI PR review | Review on every pull request | `apps/intel/.github/workflows/ai-code-review.yml` | Per PR | showable | Code review |
| own-stack | How new apps are built: RSC, typed server functions, pure CSS, ~5 deps | `new-app` skill, `apps/poc/own-stack` | Per app | **public** own-stack.hyperdrift.io + two `own-your-stack-*` articles | Platform standards |

## Layer 4 — QA and release

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| QA engineer | Critical-path smoke tests scaffolded and run before launch | `qa-engineer` skill | Per release | showable | QA team |
| The babysitter | PR through review, CI, merge, promote, deploy; background agent, server-side merge only | `babysit-review-and-deploy` skill | Per PR | showable | Release manager |
| Release gate | Build, deploy, readiness, launch checklist, growth activation | `release` skill, `make check-launch-readiness` | Per release | showable | Go-live checklist |
| One pipeline per app | test → deploy → release, Ansible does the work | `deploy.yml` × 9 repos, `infra/playbooks/deploy-app.yml` | On push | showable | CI/CD |
| Registry publish | MCP server published to the official registry on change | `publish-mcp.yml` (OIDC) | On change | **public** `io.github.hyperdrift-io/nextrole` | Package release |

## Layer 5 — Operations

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| BAU, one run, one email | Seven stages every morning, one email to the founder | `org-bau.yml`, `scripts/bau/`, `scripts/pulse/` | Daily 06:00 | showable: a daily email (redacted) | The morning stand-up, without the meeting |
| The Bridge | The fleet dashboard and Ops page, rebuilt daily, meant to be invisible | `scripts/bau/dashboard/` → fleet.hyperdrift.io | Daily | **public** article `the-bridge-should-be-invisible`; showable screenshot | Ops dashboard |
| Uptime and error watch | Every app checked every 5 min; conversion-critical errors every 15 min; issues opened | `uptime-check.yml`, `error-watch.yml` | 5 / 15 min | showable: a `downtime` issue | Monitoring and on-call |
| Self-heal | Watchdog, daily maintenance, detect → heal → audit → notify | `setup-app-health-check.yml` | 5 min / daily | showable | SRE runbook automation |
| Housekeeper | Approvals, stale PRs, deploy health swept | `hd housekeeper` | Daily | showable | Ops hygiene |

## Layer 6 — Finance and admin

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| Books | Bank → ledger: pull, post, verify, vendor policy as code | `hd books`, `meta/books/vendor-map.yml` (Monzo → QuickBooks via Composio) | Daily 09:00 | showable: the policy file, redacted run log | Bookkeeping |
| Parity drift | Bank vs books mismatch surfaced to the Bridge | `books.cli verify` | Daily | showable | Month-end reconciliation |
| Admin fact base | Company, tax, property facts answered on demand | `admin` skill | On demand | internal | Office manager |

## Layer 7 — Customer and workforce

| Node | Automates | Runs it | Cadence | Artefact | Client analogue |
|---|---|---|---|---|---|
| Deputy workforce MCP | Five workforce workflows as agent tools, remote, single-tenant | `apps/deputy-workforce-mcp` | Live | **public** repo, reference integration | Rostering, HR operations |
| Next Role MCP | Career tool exposed as an MCP server, in the registry | `apps/hyper-cv` | Live | **public** nextrole.site/api/mcp | Product as an agent surface |
| Crunch accounting MCP | Thirteen accounting tools | `apps/crunch-accounting-mcp` | Parked | **public** repo | Finance system integration |
| Enquiry intake | Crew First Mission form to email, fulfilled by hand | `apps/the-crew` | Per enquiry | internal | Sales inbox |

## Proof at scale

| Node | Artefact |
|---|---|
| Data and AI platform engineering for Vodafone Three, through Tecknuovo | One line, current work. No logo without written permission; no rates or terms, ever |
| Contest builds | `standup` (Built for Amazon Web Services), `unanswered` (DEV, Google AI category), `uk-ai-radar` (OpenAI), `helm` (Google), `bridge-voice` (AssemblyAI with lablab.ai, in development). "Built for" only |
| The fleet | 18 public apps in `infra/group_vars/apps.yml`, one operator |

## The next nodes (gaps, stated as what comes next)

- Enquiry qualification and follow-up: intake is still email to a human. First candidate for the walk's "sales" step, and the one visitors will test.
- Legal and compliance: no contract review or policy-drift job yet.
- Finance runs on the founder's laptop (launchd); moving it to the runner is queued.
- Error watch covers one app; the fleet matrix is a stated TODO.
- Deferred by design: autonomous feature implementation, founder-only decisions.

## What the map shows, and what stays in the article

The map shows the layers and the nodes with one line each; the panel behind a node shows the job, how it runs, and the artefact link. The reasoning (why this shape, the architecture, the research, how a client organisation maps onto it) lives in the flagship article, draft at `~/dev/hyperdrift/.growth/content/drafts/the-ai-native-organisation.md`, which the map links to from its top.

## Next

1. Founder reviews the layers and strikes or promotes nodes.
2. Article draft to a first full version.
3. Concept images for the map: candidates only, founder picks (rule: `meta/skills/design-crafter/SKILL.md` → The gate).
4. ScreenCraft on the pick; implement on a branch from `feat/ai-hd-shoulder`, pure CSS.
