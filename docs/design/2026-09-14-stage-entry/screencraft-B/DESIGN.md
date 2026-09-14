# B — expandable situations

Manually inspected final B layout imported after automated ScreenCraft inference failed validation. Founder selection pending; no application changes.

Revision: 1. Source approval: not recorded.

## Preserve the character

- Preserve Concert Hall × Lab Notebook identity.
- Fraunces display, IBM Plex Sans and Mono.
- Existing ink#0c0c10, cream#f0e9da, vermillion#ff4a1c and thin staff/hairline motifs.
- Voice Covenant: clear, useful, strengths-first; no fabricated results or endorsements.

## Regions

### masthead: Existing identity and direct links

Proposed selector: `header`

- Observed: Small cream serif wordmark, Hyperdrift attribution, navigation and pinned anniversary.
- Observed: Remove redundant generated mobile hamburger; retain visible direct links.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### introduction: Visitor question

Proposed selector: `#introduction`

- Observed: Fraunces cream question with vermillion italic AI next.
- Observed: One short explanatory sentence.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### stage-first: Finding a useful first step

Proposed selector: `details[data-stage='explore']`

- Observed: Closed first stage row.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### stage-workflow: Automating a workflow

Proposed selector: `details[data-stage='workflow']`

- Observed: Selected stage02 is open; its answer belongs inside the same details element.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### workflow-summary: Selected situation control

Proposed selector: `details[data-stage='workflow'] > summary`

- Observed: Vermillion outlined02 and minus signal expanded state.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### workflow-result: Who and why with editable enquiry action

Proposed selector: `details[data-stage='workflow'] > div`

- Observed: Short response and Map my workflow CTA are immediately visible when opened.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### workflow-evidence: Working examples with public actions

Proposed selector: `details[data-stage='workflow'] section`

- Observed: Desktop Standup and Deputy beside the response; mobile stacked below it.
- Observed: Standup AWS credit is participation; Deputy is a reference integration.
- Observed: Every example has a public action.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### workflow-depth: Collapsed method detail

Proposed selector: `details[data-stage='workflow'] details`

- Observed: Supporting explanation remains closed.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### stage-prototype: Taking a prototype live

Proposed selector: `details[data-stage='prototype']`

- Observed: Closed third stage. Its generated red numeral is a defect: use neutral while closed.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### stage-live: Improving a live product

Proposed selector: `details[data-stage='live']`

- Observed: Closed fourth stage.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### current-content: Dated Intel and latest writing

Proposed selector: `#current-content`

- Observed: Two compact columns desktop; stacked mobile.
- Observed: Use actual publication dates and fallback links, not hardcoded latest claims.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### partnership: Visible invitation with closed terms

Proposed selector: `#partnership`

- Observed: Invitation and Apply to partner visible; terms are closed.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

### supporting-depth: Catalogue, delivery and FAQ

Proposed selector: `#supporting-detail`

- Observed: Three closed disclosures, not a long brochure.
- Observed: Full catalogue includes all five project-backed contest entries.
- Inferred: Responsive behaviour follows BRIEF.md; this still image shows selected stage 02.

## Browser behaviour

### choose-situation (specified)

Show guidance relevant to the visitor Regions: stage-first, stage-workflow, stage-prototype, stage-live.

- Trigger: Activate a situation summary
- Before: All situations closed on initial visit; image depicts selected02
- After: Selected situation reveals who/why, examples and enquiry action; can close again
- Primitive: details/summary
- Timing: Immediate; no decorative delay
- Keyboard: Native keyboard semantics; visible focus
- Touch: Minimum44px interactive targets at implementation size
- Reduced motion: No motion required; respect reduced-motion preference
- Fallback: Native disclosures remain usable without client JavaScript

### enquire (specified)

Start a relevant conversation Regions: workflow-result.

- Trigger: Activate Map my workflow
- Before: Visitor has selected workflow stage
- After: Existing enquiry opens with visible editable situation; previous text preserved
- Primitive: Anchor and form controls
- Timing: Immediate; no decorative delay
- Keyboard: Native keyboard semantics; visible focus
- Touch: Minimum44px interactive targets at implementation size
- Reduced motion: No motion required; respect reduced-motion preference
- Fallback: Direct contact link; no automatic submission

### inspect-proof (specified)

Inspect actual work before enquiring Regions: workflow-evidence.

- Trigger: Activate demo, article or repository link
- Before: Evidence visible inside selected situation
- After: Navigate to canonical public destination
- Primitive: a[href]
- Timing: Immediate; no decorative delay
- Keyboard: Native keyboard semantics; visible focus
- Touch: Minimum44px interactive targets at implementation size
- Reduced motion: No motion required; respect reduced-motion preference
- Fallback: Ordinary links work without JavaScript

### read-current (specified)

Follow current reporting and writing Regions: current-content.

- Trigger: Activate Intel/article link
- Before: Publication date and compact summary visible
- After: Open canonical publication
- Primitive: a[href]
- Timing: Immediate; no decorative delay
- Keyboard: Native keyboard semantics; visible focus
- Touch: Minimum44px interactive targets at implementation size
- Reduced motion: No motion required; respect reduced-motion preference
- Fallback: Permanent Intel/blog links if feed fails

### open-depth (specified)

Reveal detail only when requested Regions: workflow-depth, partnership, supporting-depth.

- Trigger: Activate relevant summary
- Before: Supporting explanation closed
- After: Relevant detail expands in place
- Primitive: details/summary
- Timing: Immediate; no decorative delay
- Keyboard: Native keyboard semantics; visible focus
- Touch: Minimum44px interactive targets at implementation size
- Reduced motion: No motion required; respect reduced-motion preference
- Fallback: Native disclosures

## Open decisions

- Founder must select A/B/C before implementation.
- Image shows02open; first visit startsallclosed.
- Viewport CSS heights are inferred from board aspect ratio, not approved fixed heights.
- Typography measurements and spacing to reconcile against existing CSS in live preview.
- Use neutral stage03 numeral; remove redundant mobile menu; buttons retain existing solid fill.
