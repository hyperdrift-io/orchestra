Dictation usually changes how words get into an app. The next step is to let those words direct work across apps.

Voice through MCP means speaking to an assistant that can call tools through the Model Context Protocol. Speech recognition supplies the request. The assistant interprets it. Connected services perform the authorised operations. MCP provides a connection between the assistant and those services; it does not supply the microphone, judgement or permission to act.

For our Traction work, this is the proposed next experiment. [First Officer's current voice integration](/articles/hands-free-app-control) follows a different path. The cross-app journey below is a design to test, not a result we have already demonstrated.

> Your sentence can cross apps. Your permission should not grow on the way.

## Say the job once

Consider this illustrative request: “Find the release blockers and prepare a note for the team.”

The assistant needs to read the relevant project state, identify which findings meet the agreed definition of a blocker and prepare a draft. It may need more than one app. The person should see the sources behind the note and be able to correct the selection.

Sending the note is a separate action. Nothing in the request to prepare it authorises delivery. A useful assistant carries that distinction through every tool call.

This is where the benefit could appear. The person directs the work using knowledge of the project. They spend less effort moving between trackers, dashboards and a writing surface. The resulting note still has to be right.

## The connection is only part of the job

[MCP's architecture](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture) lets an AI application discover capabilities from connected servers and invoke their tools. A server may wrap an existing service. The tool result returns to the assistant, which can use it in the next step.

For the release example, we would expose a scoped read of blockers before considering any write. Each result should identify the project and observation time. The assistant should retain the source of a finding instead of turning several uncertain inputs into one confident paragraph.

If two sources disagree, the note should show the disagreement or request clarification. If access to one service fails, the result should say which part is missing. Quietly completing a smaller task creates a misleading impression of success.

## A correction must reach the right place

Suppose the person says, “Use the mobile release, not the web release.” The assistant now has to replace the selection, withdraw the irrelevant findings and revise the draft. A reassuring reply is insufficient if the old information remains in the note.

The same is true when the input changes. Someone may speak the first request and type the correction. Both need to operate on the same draft. The app should make the active project and pending actions visible throughout.

This is an application design responsibility. Connecting tools does not automatically preserve a task's meaning, make a write reversible or expose the right status to assistive technology.

## Begin where an error is easy to inspect

Our first proposed POC is a spoken read through Traction's existing MCP tools. Compare the returned evidence with the app's own read for the same scope. Retain the request, tool calls and result so a mismatch can be traced.

Then add the draft in a controlled environment. Try an ambiguous project name, a denied read and a correction after the first response. Compare the effort of checking the output with completing the task directly. Include people who use the input methods being evaluated before making accessibility claims.

Only extend the workflow when the evidence supports it. A second service is useful if it removes a real interruption in the task, not because another connector makes a more impressive diagram.

The ambition is to make ordinary language a practical way to direct work. The standard for success is ordinary too: the right job completed, with the person able to understand and change what happened.

The final article considers [what should survive when the interface changes](/articles/future-ui-keep-your-place).

[Discuss a task that crosses your apps.](https://ai.hyperdrift.io/?article=voice-through-mcp#contact)
