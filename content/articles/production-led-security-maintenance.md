No. A live app needs a repair path that runs without the feature backlog. Check what is actually running every day, patch from the release in production, carry the fix back to development, and refuse any later release that would undo it. We call this production-led security maintenance. Most of its parts already exist; what's usually missing is the agreement that joins them.

Picture a booking service that shipped in the spring. Customers reserve tables, it does its job, and the team has moved on to a new checkout flow on the development branch. One Tuesday an advisory lands for the HTTP parser the booking API bundles. The fix is a single line in a lockfile.

That lockfile lives on a branch halfway through a feature nobody wants to ship yet. So the team meets the choice every small team meets eventually: wait for the feature, or patch production directly and hope the next release doesn't bring the old parser back.

> A security fix is finished when it survives the next release.

## Why waiting and hot-fixing both fail

Waiting ties security to feature work. The app is only as safe as the next reason someone has to develop it, and a finished app may never get one. The wait is long by design, too: in most teams a production release passes review, staging sign-off and a change approval. [DORA's research](https://dora.dev/capabilities/streamlining-change-approval/) found that heavyweight external approval slows delivery without lowering the rate of failed changes.

Patching the live server by hand is fast and fragile. Most pipelines, ours included, rebuild an app from its main branch and clean the directory before each release. A fix that exists only on the running machine disappears with the next deploy, and nobody gets an alert when it does.

The working answer keeps the speed of the hot fix and the record of the normal release.

## Production leads, development catches up

**Production-led security maintenance** is an operating model in which what is actually deployed drives its own bounded repair loop. Each repair is verified in service, carried back into development and enforced on every later deployment. Three rules carry it.

**Repair from what runs.** Start from the release in production, not from the development branch. Record exactly what is serving: source revision, image digest, runtime version. Make the smallest permitted change and commit it before rollout. Nothing is edited live and forgotten.

**Carry the fix back as an obligation.** "Production is ahead" means one named fix is live and still owed to development. That is a tracked debt with an owner, never an untracked difference. If the development branch has changed the same dependency, the conflict stays visible until someone resolves it.

**Refuse the regression.** Every candidate passes one gate before production: feature releases, maintenance repairs and rollbacks alike. The gate checks today's required fixes rather than commit dates. Version numbers can mislead too: [Red Hat backports security fixes](https://access.redhat.com/security/updates/backporting) without changing the upstream version.

The third rule is the hinge. In the booking story, a feature build from the development branch finishes the day after the repair. Its commit is newer and its tests pass. It still carries the old parser. A gate that only checks which build is newer ships it, and production is exposed again without anyone touching the server. [GitLab's deployment safety controls](https://docs.gitlab.com/ci/environments/deployment_safety/) stop an older job overwriting a newer deployment. That tells you which build is newer, not whether it contains the fix.

## Daily is the floor, not the speed limit

A daily sweep asks what runs, what can restart, what changed in vulnerability data and which carry-back obligations remain open. Dormant jobs, scheduled tasks and rollback images belong in that inventory, because the day they wake up they serve customers. An urgent advisory, or an entry in [CISA's known exploited vulnerabilities catalogue](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), starts the same loop immediately.

Each layer has its own repair route. Host packages follow the operating system's update channel. A library bundled in a container needs a new image; patching the host does not rewrite it. An application dependency needs a lockfile change and a fresh build. A single updater cannot own all three, so the model names who owns each.

## Spend the scanning where customers are

A typical pipeline scans development, every preview, staging and production. One advisory becomes four alerts about the same library, three of them on servers no customer touches, and each needs triage before the one fix that matters starts its trip through the gated release.

Deep runtime monitoring belongs on live, exposed services. Source, secret and dependency checks stay before release, because a build runner holding production credentials is a target in its own right. When the same image runs in several places, reuse its assessment while the image, the scanner rules and the advisory data are unchanged. [Amazon Inspector already rescans images](https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html) when new vulnerabilities appear and maps them to running workloads.

{{visual:effort}}

Repeated read-only scans don't cause drift between environments. Competing patch writers do. Give each finding one owner and keep the evidence for every place it runs.

## None of the parts is new

[AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html) and [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/services/automatic-base-image-updates) already patch managed runtimes without a feature release. Ubuntu applies security updates daily. [Git's own workflow](https://git-scm.com/docs/gitworkflows#_merging_upwards) merges fixes upward from the oldest supported branch. [Flux](https://fluxcd.io/flux/components/image/imageupdateautomations/) commits image updates back to Git.

What is usually missing is the agreement between them: who maintains the live service, what automation may change, how a repair is proven and what stops the next release undoing it. We are naming that combination, not claiming its parts.

## Where we stand

We run our own fleet of apps on the platform we offer to clients, so we checked it against these rules. A daily dependency audit runs and an outside monitor checks every app every few minutes. Applying a patch is still a person's call, and the carry-back and release gate are what we are building next, on our own apps first. That work is part of [running a client's app on Orchestra OS](/articles/app-operations-after-launch).

## Start with one service

Choose one live service whose deploy and recovery paths you understand. Name its maintenance owner and the repairs automation may make alone. Then rehearse the booking story somewhere safe: a repair, a conflicting branch, a feature build that would regress it and a rollback to an affected older image. When the gate catches all four, widen the authority.

Measure the time from exposure to a verified repair, the carry-back obligations still open and the regressions refused against those that escaped. Scan counts and merged pull requests describe activity; repairs that survive releases describe the outcome.

Should a security fix wait for the next feature release? Not when people depend on the app. Give production its own repair path, give every fix a way home and give the gate the final word.

**Which of your apps would lose its last fix on the next deploy?**

[Discuss your security maintenance →](https://orchestra.hyperdrift.io/?article=production-led-security-maintenance#contact)
