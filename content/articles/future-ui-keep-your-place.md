The future of UI is often pictured as a new surface. A conversation replaces a form. A voice replaces a keyboard. An agent replaces a sequence of clicks.

The more useful question is what happens when a person needs to change surfaces halfway through.

Our position is that a task should survive that change. Someone should be able to speak a request, inspect the result visually and correct it through the input they can use. The work should remain understandable and editable throughout. That is a direction for design, not a prediction that one interface will win.

> Changing how you work should not mean starting again.

## Keep the task when the conversation ends

Imagine preparing a shortlist of grants. You speak the initial criteria. The app shows three candidates with their deadlines and sources. You use a keyboard to remove one, then ask a screen reader to read the remaining comparison. Later, you return to the same shortlist.

This is a proposed scenario. Its value comes from continuity. The selected candidates, evidence and decisions belong to the task, rather than being trapped in whichever conversation created them.

The distinction becomes visible when something fails. If the voice session disconnects, the shortlist should remain. If an agent is replaced, the person's decisions should remain. If a generated explanation is wrong, the underlying evidence should still be available to inspect.

Our [Radar example](/articles/webmcp-actions-on-the-page) offers a narrower building block: the person and browser agent work on a shared page state. It does not establish that the whole scenario above works across clients or access methods.

## More ways in, the same authority

Direct controls can be excellent for exploration and comparison. Speech can suit a request that would take several navigation steps. A command line can suit repeated operations with precise parameters. An assistant can help compose a task from available actions.

These routes need not have identical layouts. They need consistent meaning. Keeping an item through a button should have the same consequence as keeping it through a tool. A read-only permission should remain read-only when the person uses voice.

That is why the transition diagram in this series shows responsibilities rather than a ladder of progress. Event-driven controls, APIs, command lines, WebMCP and voice occupy different parts of the interaction. New routes can coexist with useful old ones.

The product question becomes more interesting: which part of this task should the person have to operate, and which part could the app handle without taking away their judgement?

## Independence is a demanding ambition

[W3C's natural-language accessibility work](https://www.w3.org/TR/naur/) already describes the need to consider the wider interface and different means of input and output. Our proposal applies that concern to continuity across a task. It does not invent the idea of multimodal access.

The practical goal is that more people can finish independently. That requires more than exposing a new control. A person needs to discover what is possible, inspect an outcome and recover from a mistake using methods available to them.

There are costs to investigate. An agent may add delay, require a paid service or fail without connectivity. A useful direct route may be faster and more dependable. Those conditions should be part of the comparison, not hidden behind a polished recording.

## Build a future you can check

The series leaves us with work to do. [Commander](/articles/hands-free-app-control) supplies a bounded voice example. [Voice through MCP](/articles/voice-through-mcp) proposes a cross-app experiment. Neither settles the question of broader accessibility.

The next evidence should show a task moving between inputs without losing its state, including a correction and a failure. Compare it with the current route. Record where help was needed. Let people with relevant access needs shape the task and judge the experience.

If the new route adds more supervision than it removes, change the design. If it lets someone complete a task that previously required help, show exactly how and for whom.

That is a future worth pursuing. A person's ability to do the work should count for more than their ability to operate every app involved.

[Discuss where your users lose their place.](https://ai.hyperdrift.io/?article=future-ui-keep-your-place#contact)
