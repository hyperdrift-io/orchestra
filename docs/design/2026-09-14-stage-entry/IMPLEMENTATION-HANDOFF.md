# Implementation handoff — after design selection

This is a scoped handoff, not a claim that the new UI is implemented or approved.

## First coherent preview

Reuse `http://127.0.0.1:3108`. Preserve the existing identity and enquiry endpoint. Replace the long top-to-bottom section sequence with a concise introduction, the selected situation-entry layout, current content and a visible partnership invitation. Technical explanation, full work catalogue and terms remain available through closed disclosures. Render the four situation labels and their content from one small data source so copy, evidence and enquiry intent remain aligned.

For the recommended accordion direction, each `<details>` contains its own `<summary>`, who/why paragraph, primary enquiry CTA, two relevant examples and their actions. All start closed. Do not place the response below all four summaries as in the rejected first generated image. Native keyboard behaviour and a clear focus style are required. No horizontally scrolling carousel on mobile.

## Content and enquiry

1. Preserve `src/data/case-studies.ts` as the catalogue source; reference entries by slug from the situation data. Add Deputy/NextRole only with explicit evidence type and real public links. Avoid copying long case text into four separate arrays.
2. Use the existing contact form and include selected situation visibly. Selection must not erase an existing message. Partnership goes through the same honest enquiry route; no promise of automatic acceptance.
3. Add the small published-article feed on the current publishing host; consume it server-side alongside the existing Intel archive feed. Keep the pinned anniversary separate. See CONTENT-CONTRACT.md for publication/staleness rules.
4. Preserve current organiser attribution on every contest example and the complete catalogue. Keep Bridge Voice marked in development. Do not infer Google or AWS endorsement.
5. Apply pure cascading CSS across every touched component; remove existing inline presentation from files when touched. Retain existing typography and colour tokens, rather than adding a parallel theme.

## Review checks

- Four situations reachable using keyboard and touch. Each reveals an appropriate example and a working next action.
- Expanded answer sits beside/inside the selected control according to the approved board; all unrelated long content stays closed.
- Intel, writing, anniversary and partnership remain reachable on narrow mobile layouts without missing sections or horizontal overflow.
- Case, repo and article links point to the correct destination and use accurate labels.
- Stage enquiry is editable and does not submit without the visitor pressing Send.
- Empty, malformed, unavailable and stale content feeds have the documented honest fallback.
- Existing typecheck/build gates only; no new prototype test suite, framework or dependency.
- Inspect the rendered page manually in the browser at desktop and mobile sizes. Use ScreenCraft's selected-image region map for visual relationships; do not claim pixel fidelity from typechecking.

No production deployment, public post or contest submission is part of this preview change. Keep the local server running for founder feedback.
