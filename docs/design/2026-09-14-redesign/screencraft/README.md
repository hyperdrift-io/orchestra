# ScreenCraft packets — On the shoulder

One packet per approved screen (SELECTION.md, round 6). Maps were written by hand from the approved rasters and imported with `--from-json`, because the Codex vision provider hit its usage cap (resets 19 September 2026). Approval is recorded in each packet's revision 2.

| Packet | Approved image | Revision |
|---|---|---|
| `first-screen` | `../round6-repair/6C-c1.png` | 2 |
| `four-places` | `../round6-repair/6D-b.png` | 2 |
| `proof` | `../round6-repair/6E-a.png` | 2 |
| `enquiry` | `../round6-repair/6F-a.png` | 3 (form region narrowed off the giant's face after the overlay check) |
| `mobile-first-screen` | `../round6-repair/6H-a.png` | 2 |

`briefs/` and `maps/` are the inputs; `handoff/` holds each exported `candidate.css`, `DESIGN.md`, `elements.json` and `interactions.json`. The raster copies are git-ignored and regenerable (see `.gitignore`). Words in the images become live text over the text-free art in `../assets-textfree/`, erased with the masks in `../text-masks/`.
