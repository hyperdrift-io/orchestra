# Landing and article review — 21 September 2026

## Findings

1. The offer competes with an internal organisation story. The current day sequence needs several viewports before proof and repeats the organisation graph in the audience section. Hypothesis: an outcome-led opening followed by one concrete example improves qualified enquiry rate by reducing the effort required to understand the service.
2. The giant occupies large proof and enquiry bands. The founder explicitly asked whether it is needed. A local show/hide control now makes that comparison reviewable; no permanent removal has been selected.
3. The diagram's WebGL particle overlay crossed stage labels and retained a tinted background. Removed that decorative overlay from the SVG view. Native SVG title text also created the large tooltip seen in the supplied screenshot; replaced it with an accessible description. SVG labels remain visible without depending on scroll animation support.
4. The separate WebGL system lived at /system without a visible route switch. Added a local comparison bar, pause control and keyboard/touch-accessible manual steps. Example brief/output labels distinguish the animation from live activity. Reduced motion stops autoplay; unavailable WebGL keeps the textual explanation and steps available in the page.
5. Article proof was too low in the reading flow. Every article now opens with a labelled visual linked to its working example. The Bridge screenshot, anniversary film poster, Standup poster, HyperVideoMesh poster and Radar image come from published Hyperdrift assets. Helm uses the sourced delegation diagram as its opening image. No generated screenshot is presented as evidence. The First Officer caption explicitly distinguishes the supporting editing demo from a voice recording.

## Local review controls

- Organisation diagram: http://127.0.0.1:3112/
- WebGL system: http://127.0.0.1:3112/system
- WebGL without giant artwork: http://127.0.0.1:3112/system?art=off
- Article openings: http://127.0.0.1:3112/articles

The comparison bar is rendered only in development or an explicit editorial preview build. The art choice travels in the URL. It is a founder review control, not a randomised experiment. Existing / and /system have different copy and structure, so their selection cannot establish a conversion winner.

## Recommended commercial structure for the selected design

1. **Offer:** Put AI to work in your business. We connect agents to your tools, knowledge and workflows. Start with one job worth improving.
2. **Action:** Describe your workflow. Explain that the next step is a personal reply about the workflow and a useful first scope.
3. **Proof:** one real, short Bridge sequence showing evidence → conversation → scoped decision → recorded result. Keep the voice prototype label until a current recording validates it.
4. **Application:** connect the demonstrated pattern to AI inside a product and AI in business operations, using concrete work rather than a catalogue of internal roles.
5. **Depth:** the article series and full organisation graph are optional paths for visitors who want detail.
6. **Enquiry:** one consistent request, retaining article context and the visitor's own message.

Use the giant only if the founder selects C. Prefer A's restrained WebGL object, with B's emphasis on real proof as the next section. Do not combine all three concepts into one crowded page.

## Psychology and measurement

- Jobs to be Done: lead with useful work in the visitor's business.
- Cognitive fluency and Hick's Law: one promise and primary action, with technical depth disclosed on demand.
- Uncertainty reduction: show a real build, its limits and what follows an enquiry.
- Relevant evidence: contest participation is not client endorsement; prototypes are not production outcomes.
- Primary commercial outcome: human-qualified workflow enquiries. Once analytics is configured, evaluate confirmed enquiries per landing session, with qualified conversations per enquiry as the quality guardrail. Do not select a winner from CTA clicks or these manual toggles.

No conversion lift is claimed. The AI site's PostHog project remains unconfigured. Before a public experiment, use the existing HD analytics contract to capture exposure, variant, enquiry submission and human qualification, and hold the copy/content constant when comparing renderers.

## Skills and research used

- Local marketing-psychology and cro skills; HD Speak to Enable covenant takes precedence over fear, false urgency or unsupported persuasion claims.
- [Corey Haines: copywriting](https://github.com/coreyhaines31/marketingskills/blob/main/skills/copywriting/SKILL.md), discovered via [Playbooks](https://playbooks.com/skills/coreyhaines31/marketingskills/copywriting). Applied clear value proposition, concrete next action and one argument per section. No quantitative lift claims from the skill were adopted.
- [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) and [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md). Applied meaningful image dimensions/captions, motion controls, keyboard access and URL-addressable comparison state.
- The local Playbooks CLI requires `find skill`, not the stale `find <query>` invocation; its directory lookup returned 404. Web discovery and upstream source retrieval succeeded. No additional runtime dependencies installed.

## Design state

The user was shown exactly three comparable concept images and asked to select a direction. Recraft credit exhaustion prevented its round; the built-in image generator produced one image per direction through the three design agents. Images remain preview-only. Main concept brief: [CONCEPT.md](CONCEPT.md).

A: /Users/yannvr/.codex/generated_images/01a0c482-0197-7e41-bfb8-5a939c443bec/exec-360fc157-0bd8-45be-8da5-66c2fd219f45.png
B: /Users/yannvr/.codex/generated_images/01a0c482-26ac-7242-8c71-70fdd466f15e/exec-48c1b17e-b8b8-4dca-8e82-40caf6459100.png
C: /Users/yannvr/.codex/generated_images/01a0c482-4906-73f2-bcba-977c02c30b85/exec-163919eb-217d-4839-96da-1ac600e08d26.png

Generated logos, secondary slogans and concept UI are not approved product assets. No new landing layout, giant removal, final film, production deployment or outbound promotion is implied by these repairs.

## Verification — 22 September 2026

Typecheck and diff whitespace checks pass. All six opening image endpoints return 200 with image content types; the expertise poster was inspected in the rendered article. Browser review confirmed WebGL rendering, pause and manual Read selection. The artwork checkbox hides/restores the illustration, and its URL choice survives switching to the organisation diagram. Both no-art variants fit a 390px viewport; the full 800px diagram scrolls inside its own focusable figure. No overlay canvas remains over the SVG. Temporary viewport sizing was reset. No automated product suite or production deployment was run.

The three concepts remain awaiting a founder selection; the local repairs do not select a new landing design.
