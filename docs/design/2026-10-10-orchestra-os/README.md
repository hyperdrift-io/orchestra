# An app joins Orchestra OS

The founder approved the operating map and six-scene story on 10 October 2026 with “approved”, in reply to the concrete implementation proposal. The subsequent founder correction selects the homepage’s spherical mesh: rotating by default, clickable in motion, and presented as “Embed your app on Orchestra OS”, the second offering alongside Traction. This supersedes the earlier single-offering presentation and flat radial scene. It does not reopen visual exploration or approve production release.

## Scope

The app arrives; owners and scope connect; services attach; checks establish readiness; one signal becomes authorised work; evidence returns to Traction and, for security repairs, the relevant development baseline. The five service groups explain connections; Notice, Choose, Improve, Release and Learn explain the work.

The source proposition and audit remain in the workspace report `reports/Orchestra operating system offering.md`. This app owns the implementation. Source capabilities and hypothetical outcomes must not become a live readiness claim. The security model is still proposed until its complete repair, reconciliation and regression-admission path is exercised.

## Implementation

`src/data/operating-system.ts` owns the narrative. The React view renders it through `use-operating-system`; `src/lib/operating-scene.ts` owns the GPU lifecycle. The homepage’s spherical geometry language, camera flight and semantic wireframe objects are reused. The ambient sphere keeps rotating after the single illustrated journey ends; it never invents repeated completed work. Clicking a capability focuses it; returning resumes the sphere. Stationary buttons provide the keyboard and static-fallback route. `/how-it-works?view=business` preserves the earlier business scenario. The phone and desktop maps remain downloadable SVGs. The homepage now has exactly two offers: Traction and Orchestra OS. Engineering and product integration belong within the latter, with existing work and contact routes preserved. The latest homepage recording-removal direction is retained from base `c91e510`. No dependency, contact submission behavior or infrastructure policy changed.

## Review

Desktop (1440 px) and phone (390 px) previews render the spherical mesh and two-offering homepage. Browser review verified WebGL capability selection, stationary capability controls, Escape return with focus restoration, pause with stable projected positions, example selection and step navigation; the phone document has no horizontal overflow. Reduced motion, context loss and the static spherical fallback are implemented; these fallback paths have source review, not a forced browser-emulation result. The motion review replaced animated layout positions with transforms and kept camera flights interruptible.

The offer CTA preselects “Embedding my app on Orchestra OS” in the existing enquiry form; no submission was sent. No unit suite or release build was run for this prototype review. Full release checks remain at publication. The preview remains running at `http://127.0.0.1:54770/how-it-works`; homepage offers are at `http://127.0.0.1:54770/#services`. No production deployment is authorised by this record.

## Motion review

| Finding | Resolution |
|---|---|
| The flat arrangement did not share the homepage’s visual language | Replaced with a rotating spherical mesh, outer shell and shared semantic objects |
| Updating label `left` and `top` on each frame caused layout work | Projected labels use transforms and opacity; no per-frame layout reads |
| Pausing the single journey also stopped the expected ambient sphere | Bounded journey and ambient rotation now have separate state |
| Moving targets alone were difficult to use from a keyboard | Stationary native buttons, focus return, pause and reduced-motion support |

Disposition: ready for prototype review. Reduced-motion and WebGL-loss behavior have source inspection only; production release checks remain outstanding.

## Its own page — 17 October 2026

The founder asked to surface Orchestra OS on the homepage, integrate it and “create an amazing page for it”, and for the landing page to show the data-business graph first. Moving the approved experience to its dedicated page stays inside this approval; no concept round was opened.

- `/os` is the page. The first screen sets the promise beside the turning sphere; the sphere then stays pinned while the reader’s scroll moves it through the six scenes, each playing its own transition once. The example choice sits in scene 5 and drives the receipt in scene 6 and the sphere. After the journey: the five jobs as a record, the boundary note, the map, the field notes and one invitation. Every word was already live on `/how-it-works` and the homepage.
- `src/lib/operating-scene.ts` no longer auto-advances; `goTo` plays the reached scene and resumes the sphere after a focused capability. On wide stages a focused capability sits right of its panel. `use-operating-system` reads which scene has crossed the takeover line (56% of the screen, 80% on phones below the pinned sphere).
- Phones pin the sphere to the top half, hide its projected labels (the coloured capability row names each symbol) and open a capability as a bottom sheet.
- `/how-it-works` without `?view` 308-redirects to `/os`, so every shared Orchestra OS link lands on the page; the business loop stays at `/how-it-works?view=business` with the title it carried before Orchestra OS. The nav, the footer, the homepage offer, the second offering, both field notes, the sitemap and `llms.txt` point at `/os`; a `Service` JSON-LD names Orchestra OS.
- The homepage opens on the living business graph; the offer follows, now linking both offerings.

Browser review at 1440 × 900 and 375 × 812: scroll-driven scenes, capability selection from the sphere and the row, Escape with focus return, pause, the enquiry opening in place with Orchestra OS preselected (nothing sent), WebGL context loss falling back to the static sphere, no horizontal overflow. Reduced motion has source review: scenes switch without motion and no animation loop runs.
