# First screen — the walk (6C-c1)

Approved by the founder on 14 September 2026. Desktop first screen: the statement and question over the giant walking toward the city, footprints grown into villages.

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

### giant: Granite giant in mid-stride

Proposed selector: `section > img`

- Observed: Seen from behind, blocky monolith, one foot lifting, centred slightly left of middle.
- Inferred: Keep centred at desktop; at narrower widths keep the giant and founder inside the crop.

### founder: Founder on the right shoulder, pointing

Proposed selector: `section > img`

- Observed: Tiny figure on the giant's right shoulder, arm toward the city.
- Inferred: The focal point; never covered by text or masthead.

### footprint-villages: Villages grown in the footprints

Proposed selector: `section > img`

- Observed: Three footprints in the foreground each hold houses and orchards.
- Inferred: The proof, seeded in the first screen.

### city: The waking city

Proposed selector: `section > img`

- Observed: Skyline on the horizon to the right, where the founder points.
- Inferred: Where prosperity lies; keep visible to the right of the text column.

### statement: Statement

Proposed selector: `section[aria-labelledby='hero-title'] h1`

- Observed: Large cream serif across the width; in the image it crosses the giant's torso.
- Inferred: Set as h1 in a left column so it no longer crosses the giant; soft shadow for contrast over mid-tone land.

### question: Question

Proposed selector: `section[aria-labelledby='hero-title'] h1 + p`

- Observed: Smaller cream serif, left aligned beneath the statement.
- Inferred: Leads to the four places.

### primary-action: Choose where you are

Proposed selector: `section[aria-labelledby='hero-title'] a`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: One primary action moving focus to the four places.

### masthead: Minimal masthead

Proposed selector: `body > header`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Wordmark and Start a project only, transparent over the sky, never over the founder.

## Browser behaviour

### go-to-places (proposed)

Take the visitor to the four places Regions: primary-action.

- Trigger: Activate the primary action
- Before: First screen
- After: Four places in view with focus on the first place
- Primitive: in-page anchor link
- Timing: Immediate; smooth scroll only without reduced motion
- Keyboard: Enter on the link; focus moves to the places heading
- Touch: 44px target
- Reduced motion: Instant jump
- Fallback: Plain anchor navigation

## Open decisions

- The approved statement crosses the giant; implementation moves it to a left column (confirm on first preview).
- Masthead and primary action are proposals, absent from the image by design.
- Serif family is a candidate, not identified.
