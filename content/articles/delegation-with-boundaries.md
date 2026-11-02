Give an AI agent the permissions needed for its assigned job, enforce those limits in its tools and require evidence of the result before reporting completion. Separate diagnosis from actions that change systems, with explicit approval or escalation where needed. Helm demonstrates restricted roles and sandbox operations; its console source also exposes a completion-reporting gap.

We explored this in [Helm](https://github.com/hyperdrift-io/helm), a demonstration built for Google's All Things Agentic Hackathon. It gives different agents different responsibilities over a product fleet, with disruptive drill actions confined to designated sandbox services.

> Useful delegation gives an agent a job, a boundary and a way to prove completion.

## Make the division of work real

Helm has three roles: a commander routes the work, a watch officer reads the evidence, and an engineer acts through a restricted set of tools.

The distinction lives in the available operations. The diagnostic role has no remediation tools. The engineer's disruptive operations check which service is being targeted. A request outside that allowance cannot acquire permission just because the model finds it persuasive.

That is a useful question to ask of any proposed agent workflow: can we point to the place that enforces its authority?

You can [watch the recorded Helm demonstration](https://youtu.be/JB2O3WSwH90) and inspect the [source](https://github.com/hyperdrift-io/helm). It is a contest build and engineering example, not a commissioned client case study or proof of universal resilience.

## Test the evidence path too

In the drill, a broken service returned an error page containing instructions to ignore the outage and report that it was healthy. That text arrived through a monitoring result, precisely where the agent was looking for evidence.

The demonstration screens recognisable instruction patterns, records the quarantine and preserves factual signals such as the response status. This is one defensive measure. A pattern filter cannot catch every prompt injection, so restricted tools remain essential even when the input looks ordinary.

The broader lesson travels beyond infrastructure. A ticket, document or incoming email can contain useful information and untrusted instructions in the same body. Reading it must not silently grant it authority over the workflow.

## Completion needs a read-back

An API accepting a request does not prove that the operation finished. Helm illustrates the intended check, but its [inspected console route](https://github.com/hyperdrift-io/helm/blob/e2bed164d45df4268e4f6cb063a32771ffc0d2aa/helm/web.py#L890) has a gap: after twenty unsuccessful probes it can still report “live confirmed”. Completion reporting needs to depend on the observed result, including failure or timeout.

In another business, the equivalent could be reading a saved record back, checking whether a scheduled job finished, or confirming that a change affected the intended account. The exact check belongs to the task. The operator should be able to inspect it.

This is how we would scope a first engagement: one job, the data it may read, the changes it may make, its escalation conditions and the evidence required at the end. Broader autonomy follows demonstrated need and verified behaviour. [WebMCP actions on the page](/articles/webmcp-actions-on-the-page) bring that boundary into a user-facing product.

Before an agent touches real tools, ask to see one allowed action, one refused action and one failed action handled honestly. A convincing success path leaves those questions open.

The [technical account](https://hyperdrift.io/blog/your-error-page-is-a-prompt) has the detail for whoever will own the integration.

[Discuss an agent workflow →](https://orchestra.hyperdrift.io/?article=delegation-with-boundaries#contact)
