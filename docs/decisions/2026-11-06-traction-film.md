# The film on /traction — 6 November 2026

## Decision

/traction plays one narrated film of Traction itself, full width under the promise. Yann ruled on 6 November 2026 that it stays full width. This replaces the hero approved on 4 November (`bdea3ee`), where the clips sat beside the promise: the narration and the app's own text have to be readable.

## The film

About 2 min 27 s at reading pace. It opens on his question and the five pieces of work an app needs around it, then narrates Read, Customers, Email, Plan and Market, and closes on what each side did, "Make Traction work for you, now." and the page's door on its last frame. The same door closes the page.

Yann approved the words on 6 November 2026. `src/data/traction-tour.ts` holds them with the chapter starts, and a narrow screen or a screen reader gets each line under the picture.

## Rules

- The app on screen is one of our apps, renamed Yourapp. Its field is never named, on screen or on the page: sentences that name it are blurred, as are the businesses the research found.
- Counts and durations come from the recording. Replayed chapters say so under the picture.
- A new render replaces the files, the chapter starts, the narration times and the door's box together.

Footage, edit and render live in the HD workspace's `.growth/traction/launch/tour-film/` (`film.json`, `render-film.mjs`, README), outside this repository.

## Release candidate — 10 November 2026

`candidate/traction-film-20261110` ports the film onto the page as it was live that day (`release/orchestra-work-20261110`, `63c5626`). That page keeps its own words and its door beside the promise, so the film's last frame carries that door and no second one closes the page. For a founder back from a free board, it is the enquiry about the next step.

Left on `feat/traction-tour`, for Yann to ask for: the page sections "Why it exists", "Day one" and "You decide", the closing door with its heading, and that branch's lead under the title.
