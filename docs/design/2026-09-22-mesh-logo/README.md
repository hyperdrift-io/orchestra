# Orchestra AI — sphere mesh identity exploration

The founder asked whether the logo could reuse the homepage sphere mesh. This is an exploration of that refinement, following the approved Aperture identity and its Open Graph application. The founder selected **B — Mesh Aperture** with “B is good.” This approves the vector refinement, small-size adaptation, website, favicon and Open Graph application.

## Intent

The founder should feel that all the work is connected and contributes to a stronger business. The mark should belong to the same world as the interactive scenario: a spherical network, coordinated signals and a central business. Keep the Orchestra AI name, Hyperdrift attribution, gold/ink palette and existing serif typography.

The homepage implementation has 210 vertices across three shells and nearest-neighbour edges. A literal copy would lose clarity at favicon and header sizes. The selected logo should distil that geometry into a recognisable silhouette and a small number of meaningful connections, retaining equal x/y proportions.

## Three directions

Each concept uses the same square presentation, gold symbol on ink, Orchestra AI wordmark and Hyperdrift attribution. Images are concept studies, not production vector masters.

- **A — Living Core:** the most direct connection to the animation: a sparse spherical mesh around the business core.
- **B — Mesh Aperture:** a spherical mesh shaped around an A-like negative-space aperture, carrying forward the approved monogram.
- **C — Five to One:** five connected mesh regions converge on one core, expressing the domains contributing to the business.

## Application after selection

Derive a deterministic SVG from spherical geometry, rather than deploying the concept bitmap. Use an optically simplified version at 16–32px and the fuller mark at header and social-card sizes. Keep one topology and consistent proportions across applications.

The website can draw the edges on entry or pass one subtle contribution towards the centre on hover. Reduced motion gets the complete static mark. Open Graph cards and favicon use the same static identity. The full WebGL experience remains the place for continuous rotation and richer detail.

Decision: **B approved**. Mesh Aperture supersedes the filled Aperture mark on the website and sharing cards. Original concepts and old vector files remain as the design record.

## Curated review

All three images were generated with the built-in image generation tool by separate design agents and visually inspected. Native outputs are 1254 × 1254; square proportions are preserved. The generation briefs and final prompts accompany each image.

| Direction | Image / prompt | Strength | Trade-off |
|---|---|---|---|
| A — Living Core | [Image](a-living-core.png) · [Brief](a-living-core.md) | Closest visual continuity with the homepage's spherical mesh and central business. | Fine connections need simplification at small sizes; less distinctive as a brand mark. |
| B — Mesh Aperture | [Image](b-mesh-aperture.png) · [Brief](b-mesh-aperture.md) | Combines the mesh with the existing O/A identity; the negative-space A offers recognition beyond a generic network globe. | Less spherical depth; final vector needs optical simplification. |
| C — Convergence | [Image](c-five-to-one.png) · [Brief](c-five-to-one.md) | Clear open centre, with connections visibly converging. | Reads more like a wheel/keyhole than a 3D sphere. The generated image does not resolve exactly five regions, so the initial Five to One brief would need further geometry refinement. |

Recommendation: **B — Mesh Aperture**, for continuity with both the approved negative-space mark and the interactive sphere. The founder subsequently approved B. Implementation follows its spherical silhouette, open A and central node.


## Implemented B

The approved concept is transcribed into symmetric native vector geometry, not deployed as a bitmap. [Geometry map](design-map.json) records the vertices, edges, bounds and asset mappings; [reference overlay](design-overlay.svg) shows the observed mark bounds and symmetry axis.

- Full gold master: `public/brand/orchestra-mesh.svg`; monochrome master: `public/brand/orchestra-mesh-mono.svg`.
- Compact master: `public/brand/orchestra-mesh-compact.svg`, stronger strokes and fewer edges for the header, footer and article cards.
- Favicon: `src/app/icon.svg`, with the fewest edges and an ink background.
- Shared image loader: `src/lib/share-brand.ts`; `/opengraph-image` uses the full master and article images request the compact master. [Rendered social card](opengraph-preview.png).

The vector keeps the circle, A-shaped counterspace and business core. Symmetry, fewer lower-shell crossings and fixed stroke weights are optical refinements of the concept. Proportions are uniformly square. The existing live wordmark, link labels and responsive layout remain in place. This logo adds no animation or motion requirement.

Verification: typecheck and whitespace checks passed. The mark is visible in desktop (1280px) and phone (390px) previews. Header/footer images load at 44 × 44 and 48 × 48; the phone page has no horizontal overflow. Both share-card PNGs render with the new mark at 1200 × 630. Preview: http://127.0.0.1:3112/. Local implementation only; no deployment.
