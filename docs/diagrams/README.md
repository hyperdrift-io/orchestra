# Diagrams

Source-of-truth `.d2` files for Orchestra AI diagrams. Rendered SVGs land in `../../public/diagrams/` so they can be embedded in MDX, articles, and whitepapers via `/diagrams/<name>.svg`.

## Authoring

- One concept per file. Lowercase-kebab filename — matches the SVG output name.
- Files prefixed with `_` are treated as shared / importable and not rendered standalone.
- Stick to Orchestra's palette: ink (`#0c0c10`, `#14141c`, `#11161a`), cream (`#f0e9da`), vermillion (`#FF4A1C`). Avoid hex with alpha — D2 wants 6-digit hex; for opacity use `style.opacity`.
- Prefer `classes:` for repeatable element styling over per-element ad-hoc style blocks.
- Annotate intent with a top comment so the diagram is readable as source.

## Rendering

From `apps/orchestra/`:

```bash
pnpm run diagrams         # renders all .d2 → public/diagrams/*.svg
```

Or directly: `./scripts/render-diagrams.sh`.

The script uses sketch mode + the Origami base theme; per-element styling inside each file overrides the colours to the Orchestra palette.

## Why D2

- Declarative, diffable source — works the same way code does.
- Sketch mode is hand-drawn-pleasant without looking like a child's whiteboard.
- Themable to match the editorial aesthetic (Fraunces / Plex / vermillion-on-ink).
- Clean SVG output — embeds cleanly in MDX and articles.

Mermaid was the alternative; it's been outclassed for this kind of work.

## Embedding

In an MDX article or whitepaper:

```mdx
![Agents vs Automation matrix](/diagrams/agents-vs-automation-matrix.svg)
```

Or, in a React component, use a regular `<img src="/diagrams/agents-vs-automation-matrix.svg" alt="…" />`.
