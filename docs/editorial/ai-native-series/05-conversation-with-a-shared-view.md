---
title: "Talk through the decision. Keep the evidence in view."
status: draft-for-founder-review
slug: conversation-with-a-shared-view
canonical: https://ai.hyperdrift.io/articles/conversation-with-a-shared-view
series: The AI-native organisation
order: 5
author: Yann VR
excerpt: "Our First Officer prototype explores a conversation that moves the Bridge to the subject being discussed. HyperVideoMesh shows a related principle: the agent's work should remain visible and editable."
shareLine: "A conversation becomes useful when both sides can point to the same thing."
primaryExample: First Officer
exampleStatus: prototype-in-development
ctaLabel: Discuss a conversational workflow
ctaHref: https://ai.hyperdrift.io/?article=conversation-with-a-shared-view#contact
---

# Talk through the decision. Keep the evidence in view.

“Why is that first?” is an ordinary question when a colleague brings you a recommendation. You expect them to point to the evidence, explain their judgement and hear your correction.

Our First Officer prototype explores that interaction over the Hyperdrift Bridge. The officer discusses fleet priorities while the screen moves to the subject of the conversation. The aim is to let an operator reason through the work with a shared view of it.

> A conversation becomes useful when both sides can point to the same thing.

## A conversation needs an object

The prototype starts with an agenda. An item has a subject, supporting evidence and possible decisions. Asking why should bring back the evidence for that item. Choosing a next step should identify the item being changed.

That sounds obvious until a conversation moves between two products, interrupts a proposal and then resumes with “yes”. The system has to know what is being accepted. A fluent response does not establish that it understood the right object.

First Officer therefore connects the conversation to explicit agenda and decision operations. Its interface can follow the item under discussion. The operator should be able to see which decision a spoken instruction concerns.

## What we have built—and what is still being tested

First Officer is an experimental voice layer built with AssemblyAI for the AssemblyAI and lablab.ai Voice Agent Hackathon. Our development record describes typed and spoken tool turns and a working local conversation. Personal microphone validation and a current public demonstration remain necessary before treating it as a dependable operating interface.

The demo can use a frozen, scrubbed agenda. A decision recorded against that fixture is not evidence that a production change occurred. We keep those environments distinct, and this article does not offer the prototype as a finished voice product.

## Another example: an edit you can inspect

[HyperVideoMesh](https://hyperdrift.io/blog/agent-system-video-editing-hyper-video-mesh) explores the same need for a visible object in a different setting. An agent takes a video brief and proposes changes through typed editor commands. The timeline gives those changes an address: duration, text, tracks and effects.

Its recorded demonstration starts with a request for a six-second launch teaser. The output includes an edit plan and commands that change the timeline. The [public source](https://github.com/hyperdrift-io/hyper-video-mesh) and [demo recording](https://hyperdrift.io/videos/hyper-video-mesh-demo.mp4) let a reader inspect the approach. It is a creative-tool proof of concept, not a claim of production editing quality.

Both examples make a useful design question tangible: after speaking to an agent, can the person locate and revise the thing it changed?

## Where to begin

A planning tool, case-management product or specialist editor could benefit from this pattern. Start with one task that naturally invites discussion, and keep its evidence and proposed changes visible. Add voice where it helps the actual working situation; typed interaction may be the better first step.

**What to watch:** voice makes an instruction easy to give. The work is making its meaning, authority and outcome equally easy to check. Demonstrate a correction or interruption as well as the happy path.

Send the video example to the person designing your product's next interaction. Tell us what your users would like to talk through, and what they need to keep in view. We can discuss a focused prototype with a clear validation path.

[Discuss a conversational workflow →](https://ai.hyperdrift.io/?article=conversation-with-a-shared-view#contact)
