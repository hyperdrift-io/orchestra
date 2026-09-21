---
title: "Give an agent enough authority to finish its job"
status: draft-for-founder-review
slug: delegation-with-boundaries
canonical: https://ai.hyperdrift.io/articles/delegation-with-boundaries
series: The AI-native organisation
order: 3
author: Yann VR
excerpt: "Helm separates diagnosis from action and confines disruptive operations to drill services. The demonstration makes agent authority visible, inspectable and worth discussing before deployment."
shareLine: "Useful delegation gives an agent a job, a boundary and a way to prove completion."
primaryExample: Helm
exampleStatus: contest-demonstration
ctaLabel: Discuss an agent workflow
ctaHref: https://ai.hyperdrift.io/?article=delegation-with-boundaries#contact
---

# Give an agent enough authority to finish its job

An operations agent becomes useful when it can carry a task through. Read an incident, investigate, take an allowed action, check the result. The engineering question is how much authority that particular job needs.

We explored that question in [Helm](https://github.com/hyperdrift-io/helm), a demonstration built for Google's All Things Agentic Hackathon. It gives different agents different responsibilities over a product fleet, with disruptive drill actions confined to designated sandbox services.

> Useful delegation gives an agent a job, a boundary and a way to prove completion.

## Make the division of work real

Helm has three roles. The Commander routes the work. The Watch Officer reads the evidence. The Engineer can act through a restricted set of tools.

The distinction lives in the available operations. The diagnostic role has no remediation tools. The engineer's disruptive operations check which service is being targeted. A request outside that allowance cannot acquire permission just because the model finds it persuasive.

That is a useful question to ask of any proposed agent workflow: can we point to the place that enforces its authority?

You can [watch the recorded Helm demonstration](https://youtu.be/JB2O3WSwH90) and inspect the [source](https://github.com/hyperdrift-io/helm). It is a contest build and engineering example, not a commissioned client case study or proof of universal resilience.

## Test the evidence path too

In the drill, a broken service returned an error page containing instructions to ignore the outage and report that it was healthy. That text arrived through a monitoring result, precisely where the agent was looking for evidence.

The demonstration screens recognisable instruction patterns, records the quarantine and preserves factual signals such as the response status. This is one defensive measure. A pattern filter cannot catch every prompt injection, so restricted tools remain essential even when the input looks ordinary.

The broader lesson travels beyond infrastructure. A ticket, document or incoming email can contain useful information and untrusted instructions in the same body. Reading it must not silently grant it authority over the workflow.

## Completion needs a read-back

An API accepting a request is the beginning of an operation. Helm checks the resulting state before reporting the action as complete.

In another business, the equivalent could be reading a saved record back, checking whether a scheduled job finished, or confirming that a change affected the intended account. The exact check belongs to the task. The operator should be able to inspect it.

This is how we would scope a first engagement: one job, the data it may read, the changes it may make, its escalation conditions and the evidence required at the end. Broader autonomy follows demonstrated need and verified behaviour.

**What to watch:** an agent connected to real tools can affect real operations. Ask to see one allowed action, one refused action and one failed action handled honestly. A convincing success path alone leaves important questions unanswered.

Send the [technical account](https://hyperdrift.io/blog/your-error-page-is-a-prompt) to the person who will own the integration. Then tell us which job you want an agent to finish, and where its authority should stop. We can help define and build that boundary with your team.

[Discuss an agent workflow →](https://ai.hyperdrift.io/?article=delegation-with-boundaries#contact)
