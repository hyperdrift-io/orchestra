# Integrated Fleet article

Approved for release by Yann on 24 October 2026, wording as listed in RELEASE-CANDIDATE.md including the three choices marked as his call; `publishedAt: 2026-10-24T02:11:00Z`. Founder direction: **“Here’s the new deal. UI is for intel. Agents are for operating.”**

The original generic AI essay and the later negative dashboard headline were rejected. They diluted the founder’s reason for building this. Technical checks passed; that did not establish editorial quality. Both earlier texts and their distribution drafts are superseded.

The current candidate, every surface’s exact copy and each change from the 24 October draft are in [RELEASE-CANDIDATE.md](RELEASE-CANDIDATE.md). Yann approves the wording and the release; three choices in that list are marked as his call. Continue from the [article handoff](../../../../../../docs/fleet/HANDOFF.md#5-finish-the-article-about-intel-ui-and-agents). The separate UI/accessibility series remains a distinct set of articles; this one states the operating proposal those articles did not make.

## Purpose and voice

The article proposes a useful division of work: UI presents intel, completed work and agent engagement; agents operate the fleet. It connects that idea to our control of applications and infrastructure, the different needs of experimental and active apps, and the opportunity for smaller self-hosted operators. The headline retains the founder’s wording. Use the canonical `meta/skills/hd-content-writer/SKILL.md` for every revision and adaptation.

The intended reader is a founder or smaller operator running several services. Search demand is unmeasured. The argument originates in the founder’s instructions in the implementation chat, rather than a publishing schedule or generic AI trend.

## Evidence

The visual records the local Stack One recovery test on 24 October: three failed content checks at least thirty seconds apart, automatic rollback to the retained release and a verified Nginx response. It used a fixed policy, without a model or dashboard action. The current record is `apps/traction/.local/integrated-fleet-2026-10-24/rehearsal.json` in the HD workspace. A limited public copy at `public/articles/integrated-fleet/local-recovery.json` omits local paths and operation identifiers.

The replacement VPS has not been commissioned. Fleet-wide operation, resource allocation and a service for other operators remain intended capabilities. No avoided-cost, adoption or customer-result claim is made. The named cloud-provider comparison in the earlier draft had no source in the founder’s records and was removed; the conviction to build the alternative stays. Earlier Google SRE, CrowdSec and W3C references remain background research in the operating work; the article does not use them.

## Assets and release

The existing Orchestra mesh header remains. The main visual is a readable test record placed with `{{visual:primary}}`; no pull quote is required. The PNG at `public/articles/integrated-fleet/intelligence-ui-loop.png` is exported from that same component and was refreshed with the candidate wording. Catalogue title, excerpt, sharing copy and figure text follow the revised argument. The source URL stays stable.

Live since 24 October 2026 at https://orchestra.hyperdrift.io/articles/agent-driven-ui-intelligence-and-action; release checks and the live read-back are in `VERIFICATION.md`. No outreach followed from the release. Discovery follow-through after release is the Traction initiative `f3faab76c4a948a089f53e764def161b` on the Orchestra board (HD handoff, section 4).
