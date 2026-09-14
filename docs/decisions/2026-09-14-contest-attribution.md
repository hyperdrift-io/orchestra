# Contest attribution on the AI site

Founder direction, 14 September 2026: show all contest entries with the organising company visible, including Google and Amazon. The implementation uses a prominent company credit and a linked “Built for” event field in the existing case-study cards. This describes the concrete challenge relationship without suggesting that organisers commissioned or endorsed HD's work.

## Coverage

The workspace ledger currently has five records with an entry repository. All five are represented. Registered or scouted events without a project are not displayed as work.

| Project | Visible company credit | Event / relationship | Displayed stage |
|---|---|---|---|
| Standup | Amazon Web Services | Agents for Humans Hackathon; built with the required Strands Agents SDK | Built for the challenge |
| Helm | Google | All Things Agentic Hackathon; Google's Gemini/ADK/Cloud stack | Submitted |
| uk.gov Radar | OpenAI | The WebMCP Challenge; shared page controls exposed through WebMCP | Submitted |
| unanswered | DEV Community | Weekend Challenge: Generosity Edition; Google AI category, Gemini/Vertex implementation | Submitted |
| Bridge Voice | AssemblyAI · lablab.ai | AssemblyAI Voice Agent Hackathon; voice conversation and tool calling | In development |

Standup's submission is being handled separately; the marketing catalogue does not infer that send-off has occurred. Bridge Voice has no public demo or repository link in this catalogue because its repository is private and its entry is still in development. No result or award is inferred from participation.

The case-study heading changed from “Applied AI, shipped” to “Applied AI, in practice” so the collection can accurately include work in development. Non-contest engineering examples remain present. Fonts, artwork, palette, grid, and stylesheet are unchanged.

## Evidence

Reviewed 14 September 2026:

- [Google All Things Agentic official rules](https://allthingsagentichackathon.devpost.com/rules), section 2: Google LLC is sponsor; Devpost administers the event. The [Google Developer announcement](https://discuss.google.dev/t/the-all-things-agentic-hackathon-is-officially-live/389123) connects the challenge to Google's agent-building technology and GEAR programme. The card uses the unambiguous company name Google.
- [Agents for Humans official rules](https://agentsforhumans.devpost.com/rules), section 2: Amazon Web Services is sponsor; Devpost administers the event. The [AWS Builder announcement](https://builder.aws.com/content/3INJ4miNJzex0c3YRxNY4CDehgQ/agents-for-humans-hackathon-build-ai-agents-that-improve-everyday-life) describes the Strands challenge.
- [OpenAI's WebMCP Challenge page](https://openai.com/webmcp-challenge/) identifies the event and its programme. Project behavior is documented in [The Agent Is the Session](https://hyperdrift.io/blog/the-agent-is-the-session).
- [DEV's Generosity challenge page](https://dev.to/challenges/weekend-2026-09-03) lists Google AI as a category. [The published unanswered submission](https://dev.to/yannvr/somebody-asked-for-help-nobody-came-5c7i) identifies the submission and selected category.
- [AssemblyAI Voice Agent Hackathon](https://lablab.ai/ai-hackathons/assemblyai-voice-agent-hackathon) explicitly describes the challenge as run by lablab.ai together with AssemblyAI. Bridge Voice's private repository description and README identify it as that entry; the more recent workspace ledger records the development work. Private repository access remains internal.
- HD workspace `.growth/contests/ledger.jsonl`: entry/project coverage and recorded phases. The older descriptive text embedded in Helm's `devpost_project` field still mentions a draft; the later `phase`, `submitted`, and dated submission note record send-off. No change to the contest ledger or another entry owner's tasks is included here.

## Verification

- `npm run typecheck`: passed.
- `git diff --check`: passed.
- Rendered homepage HTTP 200, with all five project names, company credits and challenge fields present.
- Safari desktop and responsive 390 × 844: reviewed the case-study section, company credit wrapping, and the linked event/stage details.
- Original styles and assets retained. Preview remains running at [localhost:3108/#case-studies](http://127.0.0.1:3108/#case-studies).
- Production, infra, contest submissions, and public outreach unchanged.
