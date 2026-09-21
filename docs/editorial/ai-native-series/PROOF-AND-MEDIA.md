# Proof and media ledger

Research checked against local source on 21 September 2026. This ledger is internal editorial support, not public copy. Workspace-relative paths below start at `/Users/yannvr/dev/hyperdrift` unless stated otherwise. Historical reports are labelled as such; they are not fresh runtime checks.

Public-link checks on 21 September: the Bridge article and screenshot, Helm/Standup/HyperVideoMesh/Radar GitHub repositories, Standup homepage and Radar Explore all returned HTTP 200. These are reachability checks, not fresh functional runs or independent validation of the demonstrations. YouTube recordings were not replayed during this drafting pass.

## 1. The Bridge

- Public artefact: `https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals` and its screenshot at `https://hyperdrift.io/images/blog/fleet-watches-itself-bridge.png`.
- Source: `scripts/bau/dashboard/page.py`; `scripts/commander/mission.py`; `scripts/commander/learn.py`; `meta/AI-NATIVE-ORG.md`.
- Checked: `learn.py` explicitly classifies `moved_metric`, `no_movement`, `needs_more_traffic`, `inconclusive`. It observes available daily metrics. It is not causal inference or proof that recommendations increased revenue.
- Early measurement incident: documented in `meta/AI-NATIVE-ORG.md` and `apps/hyper-drift/content/blog/hyperdrift-turns-one.mdx`.
- Claim limit: daily workflow described from source and documented operation; no fresh production watch was run for this article. No “whole company is autonomous” or human-input count claim.
- Shareable diagram brief: **Evidence → proposed decision → approved work → observed result**, with a visible return to evidence. Mark human decision, distinguish accepted request from confirmed result. Share line: “The useful morning brief ends with a decision you can make.”

## 2. Reusable expertise

- Local artefact: `meta/skills/hyperdrift-blog/SKILL.md` if present via canonical skill symlink; runtime source inspected at `/Users/yannvr/.agents/skills/hyperdrift-blog/SKILL.md`.
- Supporting files: `apps/hyper-drift/TONE.md`, `scripts/foundation/cli.py` (voice-covenant check), `meta/PHILOSOPHY.md` §8.
- Public result: `https://hyperdrift.io/blog/hyperdrift-turns-one`, including article/film/chart links. This proves the artefact exists, not quantified effectiveness of skills.
- Short verbatim extract in article: 12 words from the local skill's TONE instruction. Private full prompts and operational secrets are not published.
- Claim limit: written skills are guidance, not access controls. Foundation checks specific references/patterns; they do not certify writing quality. The current skill's publishing destination predates this approved series.
- Shareable diagram brief: a real job's **context, accepted example, quality check, human handover** surrounding a reviewable piece of work. Annotate the actual publishing task rather than invent another customer's process.

## 3. Authority

- Public source: `https://github.com/hyperdrift-io/helm`.
- Recorded proof: `https://youtu.be/JB2O3WSwH90`.
- Account: `apps/hyper-drift/content/blog/your-error-page-is-a-prompt.mdx`; catalogue in inherited `src/data/case-studies.ts`.
- Claim limit: disruptive tools target designated drill services. Input filtering is a limited defensive measure, not immunity to injection. Contest participation is not an award, endorsement or paid client relationship. The draft uses no new claim about the latest model or SDK version.
- Shareable diagram brief: **route / inspect / act / verify** with authority per role and a clear boundary around sandbox targets. Include an outside-boundary refused operation. No invented success percentage.

## 4. Priorities

- Local source: `apps/poc/standup/README.md`, including dated recorded output, read-only description and separate optional GitHub Action issue-writing step.
- Public source: `https://github.com/hyperdrift-io/standup`; demo: `https://standup.hyperdrift.io`.
- Claim limit: recorded recommendations describe a historical run, not current issues needing action. Model estimates are not measured durations. The optional Action writes an issue; the analysis tools themselves are read-only.
- Shareable diagram brief: a sourced historical recommendation with **who is waiting / evidence / next action**, beside the read audit. Label historical output, redact handles if not necessary to the story. Do not manufacture a current report.

## 5. Conversation

- Source: `apps/poc/bridge-voice/docs/FIRST-OFFICER.md`, `docs/RESUME.md`, `public/voice.js`, `public/router.js`, `public/cockpit.js` and the demo API under that repo.
- Important discrepancy: the resume brief claims root `scripts/commander/ask.py` and voice paths merged on 18 September; `scripts/commander/ask.py` is absent in the current root checkout. Therefore do not infer that production voice is available from the resume brief. Article frames only the local prototype and documented experience.
- Readiness: the resume brief records typed/spoken development checks and still leaves founder microphone validation and public demonstration open. Do not publish a private repo link as a public demo. No new voice video was made for this series.
- Supporting public example: `https://hyperdrift.io/blog/agent-system-video-editing-hyper-video-mesh`, `https://github.com/hyperdrift-io/hyper-video-mesh`, `https://hyperdrift.io/videos/hyper-video-mesh-demo.mp4`.
- HVM claim limit: editor timeline, typed commands and preview. Avoid the old live sales-page description of long-form video retrieval; it describes a different capability from the inspected build account.
- Shareable diagram brief: **question → named item → evidence in view → explicit decision → recorded result**. Label First Officer prototype. A frozen demo record must never look like a production action receipt.

## 6. Integration

- Public artefacts: `https://radar.hyperdrift.io/explore`, `https://github.com/hyperdrift-io/uk-ai-radar`, `https://youtu.be/z4B0gtwbjB4`.
- Source account: `apps/hyper-drift/content/blog/the-agent-is-the-session.mdx`.
- Checked account: registered tools call shared page functions; proposed profile/suggestions require human acceptance; subsequent reads can see human reasons. Browser support is conditional; no current browser-version or universal support claim.
- Secondary example: Standup's README documents web, CLI and MCP entry points.
- Claim limit: this is a shared-page integration demonstration. Do not imply tenant isolation is provided by MCP or WebMCP. Client integration and permissions need their own design and validation.
- Shareable diagram brief: a person and an agent both point to **the same shortlist**. Show proposal, human keep/drop, shared state. Use the published Radar screenshot if it demonstrates the claim more clearly than an illustration.

## Source integrity corrections to carry forward

The older unpublished `.growth/content/drafts/the-ai-native-organisation.md` links “the Bridge” to `the-bridge-should-be-invisible`, a DeFi article. It also treats `the-agent-is-the-session` as support for internal skill/session architecture; that article is actually the Radar browser integration. This series uses the appropriate sources and should supersede those mappings when the old outline is revised. No unrelated draft was overwritten.

## Media production rules

Actual interface and output examples come from actual recorded work. Recraft creates the editorial concept imagery only. Shareable diagrams are produced from verified labels in HTML/CSS or SVG after the article-page direction is selected. Drafts deliberately contain no synthetic product screenshot, fabricated testimonial, unsourced savings figure or inferred customer result.

Hero and shareable infographic approval remain open. The six articles are review drafts, not publish-ready packages. Publication dates and media captions must reflect the actual release and the evidence shown.
