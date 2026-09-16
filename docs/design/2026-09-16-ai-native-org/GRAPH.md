# The graph — perception first

17 September 2026. The infographic is the front door; `INVENTORY.md` is only its source. Every choice below is derived from one question: **what must a visitor believe about Hyperdrift after 30 seconds, and after 3 minutes?** Nodes, layers, movements and images are picked for that, not for completeness.

Founder decisions, 17 Sep: the loop is the spine with the founder on top · the graph is the first screen, with one line saying what we do · nodes are chosen for confidence and engagement · tool logos where each vendor's guidelines allow · Recraft stills are not the right tool for the graph; the browser is (WebGL where it earns its weight), and the experience is futurist. Page structure around the three things a visitor relates to: `PAGE.md`.

## The six beliefs, in the order they must land

| # | Belief | What creates it | Weight |
|---|---|---|---|
| 1 | **It runs, today.** A company on agents, not a claim | Dated, live nodes: today's Intel article, this morning's Read, uptime checks | first 10 s |
| 2 | **They think at organisation level.** Strategy, not tooling | Founder on top: the Read, the Mission, the idea gate, autonomy as code | first 30 s |
| 3 | **They get things into production.** | Ship movement: QA, babysitter, one pipeline per app, MCP in the official registry; Vodafone Three | first minute |
| 4 | **It maps onto my organisation.** "That can work for me" | Functions named the way a business names them; the "where you plug in" relabel | when they explore |
| 5 | **They work in my tools.** The integration points are real | Logos on nodes: GitHub, Ansible, PostHog, QuickBooks, Claude, Firecrawl, MCP | when they explore |
| 6 | **Momentum.** "What am I waiting for" | The cadence visible in the graph (06:00, 07:00, every 5 min, Mondays); the ship log | throughout |

Everything that serves none of these strongly goes to a panel or the article.

## The shape: one day at Hyperdrift, as a loop

- **Top: the founder.** One box. Receives one email a day; holds the verdicts.
- **The loop: Sense → Read → Work → Ship → Learn.** The company's day; it closes on itself. Arrel's globe is a metaphor; our loop has a log.
- **Under each column: three jobs**, each a node with a tool logo. More in panels.
- **Below: where you plug in.** The integration surface: MCP servers, the visitor's tools, proof.

Time runs through it: 06:00 the run starts, 07:00 Intel publishes, every 5 minutes uptime, 09:00 books, Mondays Vanguard, on push deploy.

## Movements (what the scroll does)

Left: one punch line and three lines per movement. Right: the graph, sticky, lighting cumulatively. Mobile: the graph fragment sits inline under each movement.

| # | Movement | Lights | Punch line direction (draft, Covenant voice) |
|---|---|---|---|
| 0 | 06:00, the run starts | loop outline, founder box | A company of one wakes up as a company of many |
| 1 | Sense | Signals · Daily Intel · Uptime | Before anyone is at a desk, the fleet has been read |
| 2 | Read | The Read · The Mission · Idea gate | One decision a day, written down, its outcome tracked |
| 3 | Work | Fleet focus · Distribution · Vanguard | Findings become issues; conversations get a drafted reply, never posted alone; the frontier is reviewed weekly |
| 4 | Ship | QA engineer · Babysitter · Pipelines | Review, merge, deploy, in the background, with a human gate where it matters |
| 5 | Learn | Learn loop · Books · Self-heal | The loop closes: decisions learn, the books reconcile, the fleet heals itself |
| 6 | One email | founder box pulses | All of the above arrives as one email |
| 7 | Where you plug in | graph relabels: product team / operations team / consultancy | Same shape, your organisation |

## Node selection: confidence and engagement

Confidence comes from production seriousness and live-ness; engagement from jobs a business owner recognises and did not expect an agent to hold.

| Column | Node | Why it is on the graph | Logo | Panel artefact |
|---|---|---|---|---|
| Sense | Signals | live, daily, every app | PostHog | article: the fleet watches itself |
| Sense | Daily Intel | a dated article published this morning: the strongest "it runs today" | Claude, Firecrawl | today's Intel article |
| Sense | Uptime | every app, every 5 minutes: production seriousness | GitHub Actions | a `downtime` issue |
| Read | The Read | the founder-level agent | Claude | article: the agent is the session |
| Read | The Mission | one decision a day with an outcome loop | | Mission Log excerpt |
| Read | Idea gate | GO / REFINE / KILL before anything is built: discipline | | a Direction Brief |
| Work | Fleet focus | analytics become triaged work | GitHub | an issue with its agent request |
| Work | Distribution | finds conversations, drafts, never posts alone: relatable, surprising | Firecrawl | the follow-up ledger |
| Work | Vanguard | weekly review against the frontier: engineering confidence | GitHub Actions | a `vanguard` issue |
| Ship | QA engineer | tests before launch | Playwright | the skill |
| Ship | Babysitter | review → merge → deploy in the background, server-side merge only | GitHub | the skill |
| Ship | Pipelines | one pipeline per app; MCP published to the official registry | GitHub Actions, Ansible | a deploy run; the registry entry |
| Learn | Learn loop | decisions and outcomes recorded | | commander learn |
| Learn | Books | bank to ledger, policy as code, verified daily: every owner relates | QuickBooks | the vendor policy, redacted run |
| Learn | Self-heal | detect → heal → audit → notify | Ansible | Bridge Ops page |

Swapped out since the first cut: Sessions and Tool ledger (internal, abstract) for Distribution and Books (relatable, surprising). Contest scouting moves to the case-studies section, where the contest builds live.

Panel only: Contest scouting, Search visibility, Weekly digest, Research spike, Foundation audit, Code health, Night crew, AI PR review, Release gate, Housekeeper, Parity drift, Sessions, Tool ledger.

Integration surface: MCP servers (Deputy workforce, Next Role in the registry) · your tools (GitHub, PostHog, Ansible, QuickBooks, Claude) · proof (Vodafone Three via Tecknuovo, the contest builds).

## Panel contract

Title · the job in one line · how it runs (agent, cadence) · the artefact link · logos · "read the architecture" link to the flagship article. No numbers. Native `<dialog>` via invoker commands, `:target` fallback: deep-linkable, indexable.

## Logos

Names always; logos where the vendor's brand guidelines allow use by integrators without implying sponsorship (GitHub, PostHog, Anthropic's Claude, Firecrawl, Playwright, Ansible, Intuit QuickBooks each publish guidelines; check each before use). Client and contest logos stay under the 15 Sep rule: written permission or "Built for" text.

## Rendering: the browser, not a still

The graph is data (fifteen labelled, linkable nodes, a live cadence) and motion. A still cannot show it, and an image model gives text we cannot edit and nodes that are not real. So there is no Recraft round for the graph; the candidates are **live prototypes on localhost**, reviewed in the browser.

Two layers, always:

- **The truth layer: SVG in the DOM.** Every node, edge and label as real elements: crawlable, keyboard-reachable, deep-linkable, works with JavaScript off. Scroll-driven lighting in CSS.
- **The experience layer: an island on top**, only where it earns its weight, and the futurist feel lives here: light travelling the loop's edges, nodes pulsing on their real cadence, depth and parallax, the founder's email arriving. Degrades to the truth layer on reduced-motion, low-power, or unsupported clients.

Options for the experience layer, in order of cost:

| | What it gives | Cost | Dependency |
|---|---|---|---|
| **A. Vanilla WebGL2 / canvas field** behind the SVG | signal particles along edges, glow, depth-fog, pulse on cadence; 2.5D feel | ~15–25 KB own code, one island | none |
| **B. Three.js scene** | true 3D loop, camera moves per movement, materials, lighting | ~150 KB gzip + own code | `three` (new dependency, founder approval needed) |
| C. Pure CSS/SVG only | light and motion through scroll-driven animation, no field | 0 KB | none |

Recommendation: **prototype A first** on a branch from `feat/ai-hd-shoulder`. It is a day's work, reviewable live, and futurist enough to judge whether B is needed. If A does not land, B is the upgrade, with the same truth layer underneath. Whatever the layer, the page must still pass: no horizontal overflow at 390, keyboard through every node, `prefers-reduced-motion` respected, first screen under 200 KB before the island.

## Mobile

Five stacked fragments, one per movement, inline; logos stay; panels full-screen. The experience layer runs at reduced density or not at all below 760px.
