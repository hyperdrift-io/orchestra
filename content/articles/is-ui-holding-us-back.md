In 1960, J.C.R. Licklider described spending hours preparing data he could interpret in seconds. His proposal, [Man–Computer Symbiosis](https://www.cl.cam.ac.uk/~pr10/iui/licklider60.pdf), called for computers to take on more of that preparation.

We have changed the interface many times since. How much of that preparation have we removed?

UI becomes a barrier when operating an app demands effort the task itself does not require. Better interfaces remove that effort and give more people a way to finish.

## The menu replaced the memory test

Command-driven systems asked people to remember what to type. Graphical interfaces offered visible objects and actions.

The team behind Xerox Star explained this choice in a [1983 paper](https://www.ece.uvic.ca/~aalbu/CENG%20412%202009/bewley83.pdf). Familiar documents and folders would help office workers understand the system. Seeing and selecting could replace recalling a command. The team tested these ideas with users and revised designs that failed.

That was a change in what people had to learn. A visible control could make an action easier to find. The person still had to choose the sequence of actions.

We recognise that work today: locate the information, move it between apps, check the result. A clearer screen helps. An automatic connection between the apps can remove some of those steps altogether.

APIs and command-line tools provide ways to make those connections. They can automate repeated work, but someone still has to define the operations and handle failures.

These approaches coexist. A command line can still suit an expert. A visual comparison can help someone decide what they want.

## Faster answers can mean more work

Agents offer another division of work. A person can request an outcome; an agent can select and carry out the steps.

Here is the risk: the effort may move into explaining the request, checking the answer and repairing mistakes. A faster first response can still leave you with more work.

> Count the effort it takes to finish.

That is the argument this series will test. Judge the whole task, including corrections. Ask who can complete it independently. An interface can be quick for one person and unusable for another.

The opportunity is larger than saving a few clicks. Someone may be able to do a task that previously required help. An expert may tackle a problem that used to take too much preparation.

## Stop making agents hunt for buttons

An agent that has to find every button inherits some of the same navigation work.

The draft [WebMCP proposal](https://webmachinelearning.github.io/webmcp/) lets a web page declare structured tools for compatible browser agents. This gives the agent an explicit way to act on the page. Our [WebMCP explanation](/articles/webmcp-actions-on-the-page) explores that approach through uk.gov Radar.

Voice is another way to give an instruction. Our Commander work includes [First Officer](/articles/hands-free-app-control), a voice prototype for fleet operations. Its public Cargo sandbox supports a spoken recovery request, a checked result and a cockpit that follows the conversation. The public write is limited to that demo service.

Next, we want to dictate requests to an assistant using [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture). It would call authorised tools across apps. First Officer currently uses its own voice integration; voice through MCP remains our next experiment.

WebMCP and MCP expose ways to act. They do not, by themselves, make an app accessible.

## Progress means more people can finish

A voice-only interface excludes people who cannot use speech. A result shown only as an image can exclude someone using a screen reader. Moving the controls does not remove those barriers.

W3C's draft [natural-language accessibility requirements](https://www.w3.org/TR/naur/) address alternative inputs and recovery from errors. The lesson is practical: people need access to the evidence and a way to correct the result. They should also be able to change input without losing their work.

That gives us a concrete comparison to make. Take one task through direct controls, then through an agent. Record the help needed and the mistakes. Include the effort of checking and correcting. Repeat with people who use the access methods being claimed.

In 1962, Douglas Engelbart set out an ambition to [increase people's ability to solve difficult problems](https://dougengelbart.org/pubs/augment-3906-Framework.html). That is a stronger goal than making each new interface look impressive.

The next advance should leave people able to do more. We should be able to show where it does.

Next, [look at the accessibility barriers still preventing people from finishing](/articles/web-accessibility-can-people-finish).

[Discuss a task your users need to complete independently.](https://ai.hyperdrift.io/?article=is-ui-holding-us-back#contact)
