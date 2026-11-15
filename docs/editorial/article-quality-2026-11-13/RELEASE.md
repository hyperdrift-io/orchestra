# Orchestra article artwork release — 15 November 2026

Released the approved artwork and article/index/share rendering only. Installed article bodies, publication states and all non-artwork catalogue fields were retained. The five drafts remain unpublished. No form, email or announcement was submitted.

- Source: `ffd13363dc5ea4835ec85caca714eb9904cd9e00`; remote tag `release/orchestra-article-heroes-20261115` verified before building.
- Infra: clean `origin/main` worktree at `7f84b1ccd2fedd8cb185a99d0450196c921f299d`.
- Previous installed release, independently read before build and immediately before activation: `/srv/apps/orchestra/releases/orchestra-8659370725f5-20261115T2027`.
- Artifact: `/Users/yannvr/.hd/releases/orchestra-ffd13363dc5e-20261115T2121.tar.gz`.
- Artifact SHA-256: `80f041a275a7eef5c011bf8d9090d965941950006429b007746af5ce9367c772`.
- Artifact and installed `.hd-build.json` both identify the intended source, built at `2026-11-15T21:22:20+00:00` with Node 22.23.4 on Linux x86_64.
- Installed release: `/srv/apps/orchestra/releases/orchestra-ffd13363dc5e-20261115T2121`.

## Verification

`make build-release app=orchestra ref=release/orchestra-article-heroes-20261115` completed. The production build compiled and typechecked. The build reported eight dependency vulnerabilities already recorded on the preceding release; this release did not change the lockfile.

`make release app=orchestra artifact=… target=hyperdrift_new`: 19 checks, five changes, zero failures. `make verify-releases target=hyperdrift_new apps=orchestra`: 11 checks, zero changes or failures; app active and answering, root-owned code, no code writes, sibling-secret access or root access. `make check-launch-readiness app=orchestra`: 10 passed, zero failed, one existing `gsc_verification` configuration warning. This field warning does not establish the current Domain-property verification state.

Live HTTP checks completed at `2026-11-15T21:25:11+00:00`:

- All 16 published catalogue articles returned 200 and exposed their selected hero and versioned Open Graph URL.
- All 16 share images returned PNG at 1200 × 630.
- All 21 JPEG assets returned 200 with SHA-256 equal to the release source.
- `/articles` returned 200 with 16 index covers, including each published article's chosen asset.
- The five draft routes returned 404 and remained absent from sitemap, llms.txt and both feeds: DSPy programmes, DSPy continuity, Clear Mermaid reading, Clear Mermaid in action, Clear Mermaid in your AI assistant.
- `/articles/ui-accessibility`, `/sitemap.xml`, `/llms.txt`, `/feed.xml` and `/feed.json` returned 200.

The lead verified the live index at 1440 and 390 px, three mobile article heroes and their preselected enquiry contexts, and the separate launch-log trailer poster. No form was submitted. The public index shows 16 covers without article numbers or horizontal overflow. Conversion and indexing outcomes remain unmeasured.

## Recovery and logs

The preceding release is retained. `make rollback app=orchestra target=hyperdrift_new` currently selects `orchestra-8659370725f5-20261115T2027`; re-read retained releases before any later rollback.

Local logs: `/tmp/orchestra-heroes-build.log`, `/tmp/orchestra-heroes-release.log`, `/tmp/orchestra-heroes-isolation.log`, `/tmp/orchestra-heroes-readiness.log`. No infrastructure, credentials or security settings changed. The only authored file from this worker is this evidence record; build and command logs are temporary outputs.

Search discovery: `hd growth sitemap orchestra` resubmitted the sitemap under `sc-domain:hyperdrift.io`; the receipt still reports Google’s last fetch as 13 November. Submission is accepted; new crawling and indexing are not yet observed.
