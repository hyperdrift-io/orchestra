Change a diagram by working with the steps it describes. Select a box, give it a clearer name and connect it to what should happen next. Clear Mermaid redraws the flow and keeps the Mermaid source available.

The examples below give you three things to examine: a decision with named answers, a retry that returns to an earlier step, and several services using the same dependency. These are places where the connections carry the explanation.

## Make the connection yourself

{{visual:primary}}

Start with the decision example. Select the question and change its wording. Then add a step and connect it to the outcome it belongs to. Name the connection so another reader knows why that route exists.

For the retry, follow the failure route back to its destination. Replace that connection so it returns to another step, and watch what the new route says about the process. Returning to the original request means something different from returning to the final confirmation.

For shared dependencies, select the common service. Inspect its incoming and outgoing relationships. That view helps answer who relies on it without tracing every line across the diagram.

## Keep the explanation clear as it grows

An extra line is easy to draw. The harder task is helping the next person understand it. Named routes, clear arrow direction and a readable question do more work than assigning every line a different colour.

Use the overview to see the whole flow. Return to readable size when the labels become small. The relationship view gives you another way to check what is connected, including with a keyboard.

Compare the same examples in [Mermaid and Clear Mermaid](/articles/clear-mermaid-diagrams-people-can-follow). The useful difference is what you can understand and change in the diagram, not how much decoration it carries.

## Take the source with you

Copy or download the Mermaid text when you have a useful result. Editing happens in this browser; these examples do not send the diagram to an AI service or save it to an account. Export your work before leaving the page.

This editor handles the examples and the supported steps and connections it exposes. It is not a general importer for every Mermaid diagram. The source remains available so your diagram can travel with your documentation and other Mermaid tools.
