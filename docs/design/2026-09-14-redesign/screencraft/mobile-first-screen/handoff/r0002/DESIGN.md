# Mobile first screen — two figures, one direction (6H-a)

Approved by the founder on 14 September 2026. Portrait first screen: the giant walks and points, the founder on its shoulder, statement in the sky, question in the grass.

Revision: 2. Source approval: Founder approved this screen as one of the five On-the-shoulder screens to build on 14 September 2026 (SELECTION.md, round 6). Map imported by hand: Codex vision capped until 19 Sep 2026..

## Preserve the character

- On the shoulder: one weathered granite giant, golden dawn country, a waking city; the founder stands on the giant's shoulder and points, the giant goes where they point.
- Full-bleed photographic art under live text; quiet high-contrast serif statements, clean sans small lines, warm cream text with a soft shadow for legibility.
- The tiny founder on the shoulder is the focal point at every width; no text or panel crosses the founder or the giant's face.
- Voice Covenant: enable, never diminish; no invented metrics, endorsements or awards.

## Regions

### art: Text-free photograph

Proposed selector: `section > img`

- Observed: Full-bleed photograph with typography laid over it in the approved image.
- Inferred: Implementation uses a text-free derivative produced by masked erase of the typography only.

### giant: Giant walking and pointing

Proposed selector: `section > img`

- Observed: Full-length granite giant striding up the hillside, right arm pointing ahead.
- Inferred: Centre of the portrait crop.

### founder: Founder on the shoulder

Proposed selector: `section > img`

- Observed: Small figure on the shoulder, arms open.
- Inferred: Focal; keep clear of the statement.

### landscape: River, bridge and city

Proposed selector: `section > img`

- Observed: Mist, river with a bridge and a city beyond the giant.
- Inferred: Background depth.

### footprints: Footprints behind

Proposed selector: `section > img`

- Observed: Footprints climbing the grass at the lower left.
- Inferred: The walk so far.

### statement: Statement

Proposed selector: `section[aria-labelledby='hero-title'] h1`

- Observed: Two-line centred cream serif in the sky.
- Inferred: h1, centred, above the giant's head.

### question: Question

Proposed selector: `section[aria-labelledby='hero-title'] h1 + p`

- Observed: Small centred serif in the grass at the bottom.
- Inferred: Thumb zone; the primary action sits just above it.

### primary-action: Choose where you are

Proposed selector: `section[aria-labelledby='hero-title'] a`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Thumb-reachable action to the four places.

## Browser behaviour

### go-to-places-mobile (proposed)

Take the visitor to the four places Regions: primary-action.

- Trigger: Tap the action
- Before: First screen
- After: Places list in view
- Primitive: in-page anchor link
- Timing: Immediate
- Keyboard: Enter on link
- Touch: 44px target
- Reduced motion: Instant jump
- Fallback: Plain anchor

## Open decisions

- Portrait art is used from 390px until the desktop art takes over; breakpoint confirmed in preview.
- Primary action is a proposal.
