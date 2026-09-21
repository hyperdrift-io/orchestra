# Selected refinement — 22 September 2026

The founder selected the existing WebGL version, instructed removal of the giant, requested inspirational article imagery and clarified that the full organisation graph must remain. They asked for faster rotation, a denser living mesh with a heartbeat, hover acceleration, camera movement inside selected nodes and business-focused facets. This refines the existing ink/cream/gold direction; it does not select one of the earlier A/B/C image concepts.

## Business story

Mission: help founders grow revenue, protect profit and reclaim time to lead. The home page now leads with that purpose and an illustrative product-growth scenario. Each stage connects a signal to an action, a business impact and a measurement. The organisation section offers product, service and consultancy scenarios. No invented financial results or client endorsements.

The articles retain technical depth and real proof. Their opening images are six cohesive editorial metaphors, created with the built-in image generator and served through existing image optimisation. Source assets and prompts: [ARTICLE-ILLUSTRATIONS.md](ARTICLE-ILLUSTRATIONS.md).

## Interaction

The primary mesh uses 210 instanced nodes across three layers, approximately one thousand connections, 72 travelling signals, an illuminated core and orbital rings. Its heartbeat is a subtle double change in brightness over 1.45 seconds. It never changes geometry size, anchor position or camera distance. Overview rotation is 0.3 radians/second; hover eases rapidly towards the next node. Selecting a node flies the camera towards it and exposes four labelled facets: Signal, Action, Impact and Measure. Each opens its own business explanation. Whole business returns to the overview. Zoom and pause remain available.

The full founder → five stages → fifteen jobs → three outcomes organisation graph is restored. The chart highlights its actual SVG connections in place, including founder decisions, stage handoffs, jobs and outcomes. Each highlight shares the exact path of its underlying line. A 180ms opacity transition and 1.8-second stage cadence replace the independent particle trail. Stages and jobs are clickable and keyboard-operable. The selected column lights up and reveals the scenario's action and impact. The diagram can be enlarged and horizontally scrolled inside its container.

Animations stop offscreen or in a hidden tab. Reduced motion disables continuous movement and applies camera changes immediately. Manual details remain available when WebGL cannot initialise. The native DOM buttons provide keyboard access to the business story.

## Motion review

| Before | After | Why |
|---|---|---|
| Sparse, slow, abstract sphere | Layered instanced mesh, faster rotation, travelling signals and heartbeat | Makes the operating system feel active while retaining bounded GPU draw calls |
| Node selection changed copy only | Camera transition into four business facets | Connects a spatial action with deeper information |
| Five-node substitute for the organisation chart | Full graph restored, with highlights on its actual connecting lines | Preserves the organisation's structure and avoids drawing over labels |
| Tiny tooltip with implementation names | Readable action, impact and measurement beside the mesh on desktop | Supports the founder's decision rather than exposing implementation detail |
| Selected facet inherited dark text on a dark background | Selected facets use dark ink on pale gold | Fixes the contrast collision found during mobile review |

The camera flight is longer than a routine button transition because it explains a change of spatial scale; its exponential easing can retarget mid-flight. DOM control states change immediately. No flashing on/off effects. Remaining performance confidence is limited to local browser observation and code inspection, not a device benchmark. Verdict: ready for founder preview, not a production performance sign-off.

## Verification

Typecheck and whitespace checks pass. Browser review verified node entry, individual impact/measurement facets, return to overview, zoom, service-business selection, organisation stage selection and the associated margin explanation. At 390px the enlarged 1500px diagram scrolls within a 347px container without page overflow. Selected facet foreground/background were inspected after the contrast correction. No browser errors or warnings were recorded during this review. The conversation illustration was visually inspected in its mobile article layout and loads through the responsive image endpoint. Temporary viewport sizing was reset.

Local preview: http://127.0.0.1:3112/ and http://127.0.0.1:3112/articles. No deployment, push, outbound promotion or new test suite. Analytics and existing dependency findings remain publication follow-ups from the article-series review.

## Motion correction — 22 September 2026

The founder requested a subtler, light-only heartbeat and faster, smoother chart connections. Removed all heartbeat-driven scaling and anchor displacement, so the heartbeat cannot move the camera. Replaced OrgPulse’s detached particle trail with shared SVG base/highlight geometry. Verified that selecting Improve lights the founder → Improve connection, incoming/outgoing handoffs, each job link and the outcome connections; the overlay canvas is gone. Typecheck and whitespace checks pass. Existing node-entry and explicit zoom controls are retained.
