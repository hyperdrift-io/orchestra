Keep the decisions and hand over the jobs. After launch, a live app needs five kinds of work every week: releasing changes, keeping it running, keeping it protected, serving its customers and measuring what changed. A founder can do all five. The price is the week. Running the app inside an operating organisation gives each job a named owner, puts routine work with agents inside agreed limits and keeps evidence for every action. What comes back to you is the decisions.

Take the booking app from our [security maintenance piece](/articles/production-led-security-maintenance). It works. Customers reserve, pay and come back. Its founder now spends Monday on a library advisory, Tuesday on a customer who couldn't finish a booking, Wednesday shipping a small improvement, Thursday working out why fewer people finished sign-up, and Saturday night restarting a server.

Each of those jobs is small and none of them is optional. Together they are the week, and the next customer conversation waits until Monday.

> After launch, keep the decisions and hand over the jobs.

## The five jobs every live app creates

**Build and release.** A change is tested, checked on the live customer path and recorded, so you know exactly what reached people.

**Run and recover.** Someone watches the service from outside, routes a failure to an owner and confirms the recovery. A backup earns trust only through a restore that has actually been exercised.

**Protect and reconcile.** Live exposure is checked daily, a permitted repair is verified in production and the fix is carried back into development so the next release keeps it.

**Reach and serve.** A named person owns customer support and communication. Sending a reply and resolving the customer's problem are recorded as separate facts.

**Measure and decide.** Product analytics show what changed after each release. Evidence reaches the person who decides, along with what remains uncertain.

## Why five suppliers don't add up to one operation

Most founders cover these jobs with a hosting provider, a freelance developer, a support inbox and an analytics dashboard. Each does its part well. None of them sees the whole week.

The hosting dashboard doesn't know that Wednesday's release lowered sign-ups. The developer doesn't read the support inbox. The analytics show the drop without the release that caused it. Each handover passes through you, so the founder becomes the integration layer, and that is the job nobody listed.

The useful unit is one operating record per app: the customer need, the work it caused, the release, the observed result and the next decision. The suppliers can stay. What changes is that their evidence meets in one place, with someone accountable for reading it.

## What embedding an app actually means

Orchestra OS is the operating layer we run behind our own apps, offered to founders who bring a live product or want one built. An app joins through an agreed contract rather than a migration script.

First, people. You name the customer-success owner and the technical owner, and agree what agents may do alone, what needs a person and what stays with you. Then each of the five jobs is connected and checked: a deploy is exercised on the live customer path, an alert is sent and acknowledged, measurement is confirmed against a real event. A connection counts as ready only when its evidence exists.

From then on, one signal becomes one piece of scoped work, and its receipt returns to [Traction](/traction), the board where evidence, accepted commitments and results meet. Traction helps you find customers. Orchestra OS runs the app they use.

## What runs today, and what we are still proving

We are our own first tenant. About a dozen of our apps run on this platform, maintained by one founder working with agents. An outside monitor checks every app every five minutes and daily health checks report each morning. Nothing is called shipped until its launch readiness check passes, and that check includes product analytics.

Sharing one platform has a benefit we did not plan for: what one app learns, the others get. When a React bug left pages blank on one of our apps, the investigation happened once, and on 8 October the fix went into all six apps on that stack the same day. When an npm package was compromised in August, a gate against malicious packages went into our deploy pipelines the next day. An app that joins starts from what the others have already learned.

{{visual:fleet}}

Two pieces are still being proven on our own apps before we promise them to anyone else: automatic enrolment of a new app across every service, and the full security loop where a production repair is carried back to development and enforced on later releases. We describe both as targets, and each client engagement agrees its scope and evidence before it starts.

## Five questions to ask whoever runs your app

These hold whether you work with us, an agency or your own team.

**Who owns each job, by name?** "The platform" cannot answer a customer.

**What evidence shows it worked?** A green status without a dated check is an opinion.

**What may an agent do without asking?** The answer should live in the tools it can call, not in the wording of a prompt.

**How does a fix survive the next release?** If the honest answer is "we'd notice", it won't.

**How would you leave?** Code, configuration, data and credentials should be yours to take, in a form another team can run.

## Who this fits

It fits a founder whose app already has customers and whose week has filled with upkeep, or a team that wants a scoped product built and then run. It fits less well if you need guaranteed uptime figures or revenue promises; we agree measurable objectives instead, and we are honest about what is still being proven.

Your app works. Who runs it now? Ideally a team with names, limits and receipts, so your week goes back to the people the app was built for.

**Which job would you hand over first?**

[Discuss your app →](https://orchestra.hyperdrift.io/?article=app-operations-after-launch#contact)
