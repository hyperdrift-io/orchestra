Ask your assistant for an architecture diagram, then follow its connections yourself. Clear Mermaid makes that diagram interactive in your chat, with a browser view when you need more room. Our [comparison](/articles/clear-mermaid-diagrams-people-can-follow) shows what changes.

The assistant writes Mermaid source. Clear Mermaid turns it into a diagram you can explore: select a service, inspect what connects to it and read those relationships as text. Ask for a correction in the conversation and inspect the revised diagram.

## Connect it to ChatGPT or Claude

Add Clear Mermaid as a custom connector using this server address: `https://hyperdrift.io/api/clear-mermaid/mcp`. Choose **No authentication** or **No sign in**. You do not need Node.js, a local server or a Clear Mermaid account.

In ChatGPT, open **Plugins**, choose **Add custom MCP server** from the plus menu and enter the address. Create the plugin, then select it in your conversation. [ChatGPT's connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt) covers the current steps and workspace restrictions.

In Claude, open **Customize → Connectors → Add custom connector**. Enter the same address, choose **No sign in** and enable Clear Mermaid in the conversation. [Claude's connector guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) explains access for individual and team accounts.

Connecting by address is separate from appearing in either platform's directory. Your account or workspace must allow custom connectors. The [open-source installation guide](https://github.com/hyperdrift-io/clear-mermaid#install-the-connector) also keeps a local option for desktop clients.

## Give it a question worth drawing

Try this prompt with Clear Mermaid enabled:

> Use Clear Mermaid to draw a web application architecture. Show the browser, API, sign-in decision and database. Show what happens when the user is not signed in and where they return after signing in. Give me a browser link too.

{{visual:primary}}

Select the sign-in question and follow each answer. Does signing in return to the access check? Can you see which service checks access and which one stores the result?

Then ask the assistant to add a second client that shares the same API. Select that API in the new diagram to inspect its connections. The source stays available, so you can check whether the assistant drew what you meant.

## Keep a diagram you can change

Download the Mermaid source from the viewer. It remains ordinary text you can keep with your documentation or use in another Mermaid tool. To change nodes and connections directly, try the [visual editor](/articles/clear-mermaid-in-action).

The hosted connector receives the diagram source to prepare the view. It does not save diagrams or call another AI model. Your chosen assistant still handles the prompts and source in the conversation. The browser link contains the diagram itself: anyone you send that link to can read it.

The connector supports flowcharts within its [documented syntax limits](https://github.com/hyperdrift-io/clear-mermaid#supported-diagrams). Unsupported syntax produces an explanation rather than a substitute diagram. Ask the assistant to simplify it, or inspect the source yourself. Clear Mermaid helps you read the result; you still decide whether it describes the right system.
