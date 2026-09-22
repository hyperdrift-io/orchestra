# Living constellation — approved A

Founder selected A on 22 September 2026. Five coloured domains connect through branching gold light; cycles retain learning.

Revision: 1. Source approval: not recorded.

## Preserve the character

- Near-black ink with ivory serif text
- Jade, blue, gold, coral and violet spherical domains
- Fine filaments converge and branch around a luminous central memory

## Regions

### experience: Living constellation

Proposed selector: `#organisation`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### headline: Promise

Proposed selector: `#organisation h1`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### subtitle: Retained learning

Proposed selector: `#organisation header p`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### constellation: Branching network

Proposed selector: `[data-constellation-surface]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### notice: Jade sphere

Proposed selector: `[data-domain-label]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### choose: Blue sphere

Proposed selector: `[data-domain-label]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### improve: Gold sphere

Proposed selector: `[data-domain-label]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### release: Coral sphere

Proposed selector: `[data-domain-label]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

### learn: Violet sphere

Proposed selector: `[data-domain-label]`

- Observed: Ink background, luminous fine detail and generous dark negative space.
- Inferred: Live semantic text and procedural WebGL preserve the visual hierarchy.

## Browser behaviour

### enter-domain (specified)

Connect each domain to its signal, action, impact and measure. Regions: notice, choose, improve, release, learn.

- Trigger: Select the sphere or its labelled button.
- Before: Full connected organisation.
- After: Camera enters the selected colour and shows four facets with relevant business detail.
- Primitive: Native buttons over a Three.js canvas.
- Timing: Interruptible exponential camera interpolation; no heartbeat scale.
- Keyboard: Tab and Enter; Escape returns focus to the selected sphere.
- Touch: 44px minimum target; tap surrounding space to return.
- Reduced motion: Static scene and instantaneous navigation.
- Fallback: All business stages and details stay available as HTML.

### retain-learning (specified)

Show a useful cycle contributing retained knowledge and a validated improvement. Regions: constellation.

- Trigger: Play the illustrative sequence or choose Next iteration.
- Before: The selected cycle receives connected business signals.
- After: Signals fan through related domains and return evidence; a successful cycle leaves an illuminated memory ring.
- Primitive: Canvas plus native playback and iteration buttons.
- Timing: A 10 second cycle with concurrent branch activation, paused offscreen.
- Keyboard: All controls available as buttons.
- Touch: Same controls and sphere tap targets.
- Reduced motion: Step through completed static cycles manually.
- Fallback: Three named iterations and their business measures are visible in HTML.

## Open decisions

- Only desktop art supplied; portrait adaptation is inferred without changing the metaphor.
- No quantified client results: illustrated successful cycles accumulate capability; actual growth is measured separately.

## Implementation reconciliation — selected A

Implemented by `src/components/Organisation.tsx`, `src/components/constellation-engine.ts` and `src/app/constellation.css`, with reusable procedural domains in `business-domains.ts`. The title becomes one line on desktop, the five spheres expand to fill the field, and the gold routes branch between actual domain endpoints. Portrait is a proposed compact vertical adaptation preserving colours, labels and native interaction. Focused business context flows below the canvas on phone and sits alongside it on desktop. Existing material/shader time changes create movement; heartbeat never changes camera or geometry scale.

Verified in the local browser at 1440px and 390px. Functional state and deviations are documented in `../SELECTION.md`. The selected art's photographic richness is interpreted procedurally; the result is not claimed to be a pixel-exact recreation.
