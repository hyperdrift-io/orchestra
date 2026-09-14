# The four places — stage entry (6D-b)

Approved by the founder on 14 September 2026. The four situations as four places on the horizon, seen past the giant's head with the founder pointing from its shoulder.

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

### giant-head: Giant's head in profile

Proposed selector: `section > img`

- Observed: Weathered head at the left edge, facing right over the land.
- Inferred: Anchors the left; nothing overlays it.

### founder: Founder on the shoulder

Proposed selector: `section > img`

- Observed: Small figure on the shoulder rock, arm raised toward the places.
- Inferred: Focal; the response panel must not cover it.

### places: The four places

Proposed selector: `#places ol`

- Observed: Four serif labels in one row across the middle of the image.
- Inferred: A native list of disclosures, one open at a time; on desktop the labels sit on the art over their places.

### place-first-step: Finding a useful first step

Proposed selector: `#places details[data-place='explore']`

- Observed: Label above the hill with a single warm light.
- Inferred: details name='place' / summary; the hill light is its visual.

### place-workflow: Automating a workflow

Proposed selector: `#places details[data-place='workflow']`

- Observed: Label above the water channels running into fields.
- Inferred: Same primitive; the channels are its visual.

### place-prototype: Taking a prototype live

Proposed selector: `#places details[data-place='prototype']`

- Observed: Label above the stone bridge.
- Inferred: Same primitive; the bridge is its visual.

### place-live: Improving a live product

Proposed selector: `#places details[data-place='live']`

- Observed: Label above the city.
- Inferred: Same primitive; the city is its visual.

### hill-light: Light on the hill

Proposed selector: `section > img`

- Observed: A hill with one warm point of light.
- Inferred: Brightens when the first place is open.

### channels: Water channels

Proposed selector: `section > img`

- Observed: Rivers and channels winding through fields.
- Inferred: Brightens when the workflow place is open.

### bridge: Stone bridge

Proposed selector: `section > img`

- Observed: Arched bridge across the river.
- Inferred: Brightens when the prototype place is open.

### city: City

Proposed selector: `section > img`

- Observed: City in morning haze at the right.
- Inferred: Brightens when the live place is open.

### response: Open place response

Proposed selector: `#places details[open] > div`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Heading, who it serves, one enquiry action, two examples with organiser credit, folded approach — from src/data/situations.ts.

## Browser behaviour

### choose-place (specified)

Show help for where the visitor is Regions: place-first-step, place-workflow, place-prototype, place-live, response.

- Trigger: Activate a place label
- Before: All places closed
- After: The chosen place lights and its response opens; others close
- Primitive: details/summary sharing name='place'
- Timing: State immediate; light fades in 400ms
- Keyboard: Native summary focus and Enter/Space; visible focus ring
- Touch: 44px minimum label targets
- Reduced motion: Light appears without fade
- Fallback: Native details work without JS; exclusive open degrades to independent disclosures

### prefill-enquiry (specified)

Carry the chosen place into the enquiry Regions: response.

- Trigger: Activate the response's enquiry action
- Before: Response open
- After: Enquiry form in view with Where you are preselected, editable
- Primitive: link to /?situation=<slug>#contact
- Timing: Immediate
- Keyboard: Enter on link
- Touch: 44px target
- Reduced motion: Instant
- Fallback: Form usable with no preselection

## Open decisions

- Mobile crop: art above, labels as a stacked list beneath; confirm on preview.
- Response panel placement is a proposal.
- Light-layer positions are approximate and tuned in the preview.
