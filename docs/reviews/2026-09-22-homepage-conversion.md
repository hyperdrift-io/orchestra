# Homepage conversion review — 22 September 2026

## Decision to make

Keep the homepage focused on a qualified founder enquiry: a clear commercial promise, one compelling interactive example, three inspectable builds, and a concrete first conversation. Move the complete organisation exploration to `/how-it-works`, the full case catalogue to `/work`, and the article grid to the existing `/articles` destination. Implemented after the founder selected A: the route names below are now available in local preview. Preserve useful links between these surfaces.

This is a qualitative review of the local preview, not an observed conversion result. The production PostHog project remains unconfigured. Current article events and durable enquiry records provide part of the attribution plumbing, but they do not establish a homepage conversion baseline.

## What already works

The headline names founder growth and profit. The scenario connects customer behaviour, decisions, improvements and measurement. The primary CTA leads directly to an enquiry. Published builds, recorded demonstrations and a substantial article series support credibility. The enquiry gives a reply expectation and a concrete engagement scope.

The strongest opportunity is hierarchy. The current page gives two substantial system explanations, five projects, six articles and three news links substantial prominence before the form. There is also a second offer, the Traction Partnership, beside the main enquiry.

## Marketing psychology applied

| Observation | Behavioural hypothesis | Recommended change |
| --- | --- | --- |
| Growth is prominent; the delivery offer is less concrete | Jobs to Be Done: founders need to recognise a useful first purchase | Explain that Hyperdrift connects AI to one existing workflow, delivers the agreed improvement and measures its effect |
| Mesh and organisation graph explain the same operating loop twice | Progressive disclosure: detail can be available without being compulsory | Keep one concise mesh scenario on home; give the organisation its own exploration page |
| Five case studies have many similarly weighted outbound links | Choice overload: inspection has too many starting points | Feature Standup, Radar and Helm with one clear demo action each; move source links and challenge details to the full case catalogue |
| Project names and contest credits lead the proof | Concrete evidence helps visitors picture the work in their own business | Lead with the business use, show a real recording, then give accurate project and participation credit |
| Article and news grids interrupt the contact path | Attention and opportunity cost | Keep a compact Articles link; keep full reading and news in their existing destinations |
| The partnership offer competes with the enquiry | Competing offers can make the primary engagement ambiguous | Give partnership terms a dedicated page, linked discreetly near contact; retain the partnership enquiry option |
| The first CTA does not explain the immediate next step | Reduce uncertainty and perceived commitment | Add the existing one-working-day reply expectation beside the first CTA |

These are hypotheses, not universal rules or promises of conversion lift. Preserve the user's choice, truthful status and clear access to detail. All copy inherits `meta/PHILOSOPHY.md` §8, Speak to Enable.

## Proposed homepage order

1. **Promise and first step.** Keep “Grow your business. Keep more of the upside.” Explain the service and repeat one primary enquiry CTA. Name the reply expectation.
2. **One interactive business example.** Five coloured domains; click to see signal, action, business impact and what gets measured. Interaction is optional. The business explanation stays readable without WebGL.
3. **Real work, made tangible.** “See what we can put to work for you.” Three examples: Standup for clear priorities, Radar for opportunity discovery, Helm for scoped action and recovery. Show actual product media, not generated illustrations presented as proof. Participation is not a client endorsement. Voice remains an in-development prototype until an actual voice recording is available.
4. **A concrete engagement.** One workflow, an agreed scope, an inspectable improvement, measurement against an appropriate baseline. Fit this into the contact introduction rather than adding another long section.
5. **Enquiry.** Preserve the current form and durable delivery. Keep the next action dominant. Articles and partnership remain accessible but secondary.

## What moves

| Content | Destination | Homepage presence |
| --- | --- | --- |
| Full organisation exploration and three business scenarios | Proposed `/how-it-works` | One descriptive link next to the mesh |
| Complete case catalogue, repos, challenge entries and technical detail | Proposed `/work` | Three strongest examples, with one demo action each |
| Six article cards | Existing `/articles` | Compact invitation after proof or in navigation |
| Intel daily news | Existing Intel destination | Footer link |
| Anniversary and historical writing | Existing Hyperdrift articles | About/footer link |
| Traction Partnership terms | Proposed `/partnership` | Secondary text link; existing form option preserved |

## Organisation: show propagation and accumulated learning

The new experience should show several signals activating related domains concurrently. A signal branches along visible paths, prepares a decision, enters a scoped action, reaches the customer and returns evidence. The founder can inspect why a branch activated, the decision they own and the commercial measure.

Each cycle leaves a trace of what was learned. A successful, measured improvement adds a persistent illuminated layer to the business. An inconclusive or unsuccessful change still teaches the system something, but does not illuminate a growth claim. The next cycle builds from the retained context instead of resetting to zero.

Use one illustrative business scenario throughout. For example: existing buying intent → identify signup uncertainty → approve a clearer onboarding step → release it → compare completed signups, retained customers and contribution margin. The visual can show accumulated capability without inventing percentages, client results or guaranteed revenue.

Three art directions are ready in [the concept review](../design/2026-09-22-business-flow/README.md). Recommend **Living constellation**: it naturally supports branching and the coloured spheres already requested. Keep a visible retained-memory trace between cycles. **Growth rings** expresses retained learning most directly; **Terraces** is the most cinematic but brings greater visual and rendering complexity.

## Changes implemented in this preview

- Five custom coloured WebGL domain spheres with procedural luminous membranes.
- Focused interiors contain branching light trails and distinct signal, action, impact and measurement assets.
- Click outside the focused sphere, Escape or Whole business to return. Keyboard focus returns to the originating node.
- Heartbeat remains a subtle light-only effect. Camera movement occurs only for navigation, viewport fit and explicit zoom.
- Clearer proof heading, explanatory copy and existing Helm/Radar recordings available inline.
- Reply expectation beside the first enquiry CTA.
- Removed unsupported partnership/sponsorship assertions from the partnership terms. This does not dispute any historical client work; it avoids implying those companies back this offer.

Update: the founder selected A. The homepage now contains the promise, mesh, three featured builds and enquiry. The constellation is at `/how-it-works`, the complete case catalogue at `/work`, and the partnership terms at `/partnership`. The six-article grid remains on `/articles`; news and historical writing remain linked through the footer. [Implementation record](../design/2026-09-22-business-flow/SELECTION.md).

## Measurement for the proposed simplification

Primary: confirmed, deliverable homepage enquiries per eligible homepage visitor, excluding preview submissions. Guardrail: proportion of enquiries that the founder qualifies as a concrete workflow with plausible commercial fit. Segment by device and acquisition source. Keep delivery errors visible and preserve article attribution.

Before a production comparison, configure PostHog and confirm the exposure, enquiry start, successful delivery and qualification joins. Existing local article events alone are insufficient. No new tracking or experiment was added during this visual prototype pass.

## Sources and applied skills

- Local `marketing-psychology` and `cro`: outcome framing, progressive disclosure, choice reduction and honest proof.
- Community [Three.js materials](https://github.com/cloudai-x/threejs-skills/blob/main/skills/threejs-materials/SKILL.md) and [animation](https://github.com/cloudai-x/threejs-skills/blob/main/skills/threejs-animation/SKILL.md), discovered via Playbooks. Applied resource reuse/disposal, shader uniforms and time-based procedural motion; no new dependency or skill installation needed.
- [Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html) and [particle sprites](https://threejs.org/examples/webgl_points_sprites.html). Assets in this preview are original procedural geometry/shaders, not downloaded stock models.

## Validation

Typecheck and manual browser inspection. Verified desktop and 390px phone layout, coloured sphere entry, facet detail updates, click-out return and Escape focus restoration. Renderer logs showed no WebGL/shader errors during inspection. Reduced-motion/offscreen behaviour reviewed in code. This is local prototype verification, not a production performance or conversion claim.

## Motion review

| Before | After | Why |
| --- | --- | --- |
| Focused node had only gold connectors and floating points | Persistent domain colour, luminous membrane, four distinct assets and light following shared branch curves | Connect navigation to a recognisable business domain and reveal its own context |
| Background clicks could not leave a focused node | Ray-tested click-out, explicit back control and Escape with focus restoration | Make exploration reversible and keep keyboard users oriented |
| Whole-business mesh competed with the focused content | Dim background nodes, signals and rings while inside | Keep the selected domain and its business detail legible |
| Heartbeat could previously move geometry | Existing light-only correction retained, including new shader strength | Preserve a steady camera and readable interaction targets |

**Verdict: Approve for local prototype review.** Explicit spatial camera entry is the deliberate exception to short UI transition timing; interpolation is interruptible. Mesh time and shader uniforms pause offscreen, while hidden, on Pause and under reduced motion. No new layout animation or recurring pulse zoom was introduced. Source: `src/components/business-mesh.ts`, `src/components/business-domains.ts`, `src/components/SystemGraph.tsx`.
