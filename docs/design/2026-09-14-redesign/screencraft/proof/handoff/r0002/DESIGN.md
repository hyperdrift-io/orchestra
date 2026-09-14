# The proof — where the giant has walked (6E-a)

Approved by the founder on 14 September 2026. The work as footprints across the country, the giant's head and the founder on its shoulder at the right.

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

### giant-head: Giant's head and shoulder

Proposed selector: `section > img`

- Observed: Head in profile facing left, shoulder rising from the lower right.
- Inferred: Anchors the right half; statement sits over its shoulder in the image.

### founder: Founder on the shoulder

Proposed selector: `section > img`

- Observed: Small silhouette behind the neck, looking back along the trail.
- Inferred: Focal; keep clear.

### trail: Footprint trail

Proposed selector: `section > img`

- Observed: A curve of footprints from the horizon to the foreground.
- Inferred: The five works map to the five nearest footprints on desktop.

### footprint-harbour: Harbour footprint

Proposed selector: `section > img`

- Observed: Nearest footprint: harbour with boats and a workshop.
- Inferred: Anchor for the first work.

### footprint-orchard: Orchard footprint

Proposed selector: `section > img`

- Observed: Orchard trees.
- Inferred: Anchor for the second work.

### footprint-workshop: Workshop footprint

Proposed selector: `section > img`

- Observed: Small lit building.
- Inferred: Anchor for the third work.

### statement: Statement

Proposed selector: `#proof h2`

- Observed: Spaced cream serif over the giant's shoulder.
- Inferred: h2; moves off the shoulder stone into the field at the left if contrast needs it.

### works: The work

Proposed selector: `#proof ul`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Standup, Helm, uk.gov Radar, unanswered, Bridge Voice from src/data/case-studies.ts, each with Built for <organiser> and its links; a readable list at narrow widths.

### now-playing: Now playing

Proposed selector: `#proof aside`

- Observed: Proposal: not present in the approved image by design; placed where the art leaves room.
- Inferred: Latest Intel edition and latest article from the live feeds, plus Hyperdrift turns one, in the sky at the upper left.

## Browser behaviour

### open-work (specified)

Inspect the real work Regions: works.

- Trigger: Activate a work's demo, source or article link
- Before: Work named on its footprint
- After: Link opens its destination
- Primitive: anchor links
- Timing: Immediate
- Keyboard: Tab through links in list order
- Touch: 44px targets
- Reduced motion: No motion
- Fallback: List reads without the art

## Open decisions

- Seven footprints in the art versus five works: use the five nearest; confirm.
- Now playing placement is a proposal.
- Statement position over stone vs field decided by contrast in preview.
