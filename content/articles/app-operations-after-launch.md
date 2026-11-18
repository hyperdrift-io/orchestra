Keep the decisions and hand over the jobs. After launch, a live app needs five kinds of work every week: releasing changes, keeping it running, keeping it protected, serving its customers and measuring what changed. A founder can do all five. The price is the week. Running the app inside an operating organisation gives each job a named owner, puts routine work with agents inside agreed limits and records the work and its results. What comes back to you are the decisions.

Imagine the booking app from our [security maintenance piece](/articles/production-led-security-maintenance). In this illustrative week, its founder spends Monday on a library advisory, Tuesday on a customer who couldn't finish a booking, Wednesday shipping a small improvement, Thursday investigating a drop in completed sign-ups, and Saturday night restarting a server.

Each of those jobs is small and none of them is optional. Together they are the week, and the next customer conversation waits until Monday.

> After launch, keep the decisions and hand over the jobs.

## The five jobs every live app creates

**Build and release.** A change is tested, checked on the live customer path and recorded, so you know exactly what reached people.

**Run and recover.** Someone watches the service from outside, routes a failure to an owner and confirms the recovery. A backup earns trust only through a restore that has actually been exercised.

**Protect and reconcile.** Check live exposure, verify permitted repairs in production and carry fixes back into development so later releases keep them.

**Reach and serve.** A named person owns customer support and communication. Sending a reply and resolving the customer's problem are recorded as separate facts.

**Measure and decide.** Product analytics show what changed after each release. Evidence reaches the person who decides, along with what remains uncertain.

## Why five suppliers don't add up to one operation

These jobs may be spread across a hosting provider, a freelance developer, a support inbox and an analytics dashboard. Each can do its part without seeing the whole week.

A hosting dashboard can show a healthy service while customers struggle to finish sign-up. Support messages, release records and analytics may each hold part of the explanation. A drop after a release is a reason to investigate, not proof that the release caused it. When those records stay separate, the founder has to bring them together.

The useful unit is one operating record per app: the customer need, the work it caused, the release, the observed result and the next decision. The suppliers can stay. What changes is that their evidence meets in one place, with someone accountable for reading it.

## What embedding an app actually means

Orchestra OS is the operating layer we run behind our own apps, offered to founders who bring a live product or want one built. An app joins through an agreed contract rather than a migration script.

First, people. You name the customer-success owner and the technical owner, and agree what agents may do alone, what needs a person and what stays with you. Then each of the five jobs is connected and checked: a deploy is exercised on the live customer path, an alert is sent and acknowledged, measurement is confirmed against a real event. A connection counts as ready only when its evidence exists.

A signal can then lead to scoped work, with its result recorded in [Traction](/traction), the board where evidence, accepted commitments and results meet. Traction helps you find customers. Orchestra OS provides the operating layer for the app they use.

## What runs today, and what we are still proving

We use the platform for our own apps, with one founder working alongside agents. The outside uptime workflow is configured to check enabled apps every five minutes; its scheduler can delay runs. Daily health checks and launch-readiness checks provide further evidence.

Shared tooling gives us a way to reuse an improvement across apps. A deployment check or recovery procedure can be maintained in one place and applied where it fits. Each app needs a check that the improvement works in its own environment.

Two pieces are still being proven on our own apps before we promise them to anyone else: automatic enrolment of a new app across every service, and the full security loop where a production repair is carried back to development and enforced on later releases. We describe both as targets, and each client engagement agrees its scope and evidence before it starts.

## Five questions to ask whoever runs your app

These hold whether you work with us, an agency or your own team.

**Who owns each job, by name?** "The platform" cannot answer a customer.

**What evidence shows it worked?** A green status without a dated check is an opinion.

**What may an agent do without asking?** The answer should live in the tools it can call, not in the wording of a prompt.

**How does a fix survive the next release?** Ask which check would catch its removal or regression.

**How would you leave?** Code, configuration, data and credentials should be yours to take, in a form another team can run.

## Who this fits

It fits a founder whose app already has customers and whose week has filled with upkeep, or a team that wants a scoped product built and then run. It fits less well if you need guaranteed uptime figures or revenue promises; we agree measurable objectives instead, and we are honest about what is still being proven.

Your app works. Who runs it now? Ideally a team with names, limits and receipts, so your week goes back to the people the app was built for.

**Which job would you hand over first?**

[Discuss your app →](https://hyperdrift.io/?article=app-operations-after-launch#contact)
