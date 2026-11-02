Ask your assistant for an architecture diagram, then inspect the result in a browser where you can follow its connections. The Clear Mermaid connector lets a desktop AI assistant use the same reader shown in our [diagram comparison](/articles/clear-mermaid-diagrams-people-can-follow).

The assistant writes Mermaid source. The connector gives you a local link to the diagram. You can select a service, inspect what connects to it and read those relationships as text. Ask for a correction in the chat and open the revised diagram.

## Connect it to your assistant

The [Clear Mermaid release](https://github.com/hyperdrift-io/clear-mermaid/releases/tag/v0.1.0) includes a free, open-source connector. Its [installation instructions](https://github.com/hyperdrift-io/clear-mermaid#install-the-connector) provide the configuration to copy into a desktop MCP client. You need Node.js 22 or newer and a client that can run a local command.

This release runs on your computer. It is not a hosted connector URL for a cloud chat service, and it does not claim support for every AI client. The install guide explains the supported connection method.

## Give it a question worth drawing

Try this prompt once the connector is available:

> Use Clear Mermaid to draw a web application architecture. Show the browser, API, sign-in decision and database. Show what happens when the user is not signed in and where they return after signing in. Give me the diagram link.

{{visual:primary}}

Open the link on the same computer. Select the sign-in question and follow each answer. Does signing in return to the access check? Can you see which service checks access and which one stores the result?

Then ask the assistant to add a second client that shares the same API. Select that API in the new diagram to inspect its connections. The source stays available, so you can check whether the assistant drew what you meant.

These reading tasks are why we built Clear Mermaid. A diagram becomes more useful when you can investigate it, rather than relying on the assistant's explanation of its own picture.

## Keep a diagram you can change

Download the Mermaid source from the viewer before you close the connector. The local links last for an hour while it is running; they are temporary views, not published share links. To change nodes and connections directly, try the [visual editor](/articles/clear-mermaid-in-action).

The connector holds diagrams locally and bundles its renderer. It does not upload them to a rendering service. Your chosen AI client still handles the prompts and source you send in the conversation.

This first release supports a checked set of Mermaid flowcharts. If a diagram uses unsupported syntax, the connector or viewer explains the problem. The browser keeps the source available for diagrams it receives. Ask the assistant to simplify it, or inspect the source yourself. The connector helps you read the diagram; you still decide whether it describes the right system.
