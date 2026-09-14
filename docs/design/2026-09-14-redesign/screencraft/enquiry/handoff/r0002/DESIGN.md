# The enquiry — You say where. We go. (6F-a)

Approved by the founder on 14 September 2026. The giant lowers its face toward the founder on its shoulder, who points at the city; the enquiry lives beside them.

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

### giant-face: Giant's lowered face

Proposed selector: `section > img`

- Observed: Huge weathered face filling the upper right, looking down toward its shoulder.
- Inferred: Never overlaid.

### founder: Founder on the shoulder, pointing

Proposed selector: `section > img`

- Observed: Whole small figure on the mossy shoulder, arm toward the city.
- Inferred: Focal; keep clear.

### city: City in the distance

Proposed selector: `section > img`

- Observed: Skyline at the left beyond the fields.
- Inferred: Where the founder points.

### statement: Statement

Proposed selector: `#contact h2`

- Observed: Large cream serif at the lower left over the fields.
- Inferred: h2 of the enquiry section.

### form: Enquiry form

Proposed selector: `#contact form`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Existing form: Where you are, Name, Email, Company, What do you want to ship?, Send enquiry — in the open sky at the upper left on desktop; below the art on mobile.

### partnership: The Traction Partnership

Proposed selector: `#contact aside`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Build together. Share the upside. Apply to partner, terms folded.

## Browser behaviour

### send-enquiry (specified)

Start a project with context carried from the chosen place Regions: form.

- Trigger: Submit the form
- Before: Where you are preselected when arriving from a place, editable
- After: Received confirmation; relay to hyperdrift.io unchanged
- Primitive: native form with required fields
- Timing: Immediate feedback; no auto-submit
- Keyboard: Native form navigation and validation
- Touch: 44px fields and button
- Reduced motion: No motion
- Fallback: Server route validates; form usable without enhancement beyond fetch

## Open decisions

- Form over sky vs below the art on desktop: confirm legibility in preview.
- Partnership placement is a proposal.
