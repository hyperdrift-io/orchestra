Mermaid got the important idea right: write a diagram as text, keep it with your work and let a renderer draw it. We want the result to be just as easy for a person to read.

A diagram can render successfully and still make its reader work too hard. A long question gets squeezed into a shape. A return path disappears among other lines. Zooming out fits everything on screen but makes the words too small. A new colour theme does little to solve those problems.

Clear Mermaid keeps the Mermaid source and changes how people read and explore it in the browser. Here is the difference on the same diagrams.

## Follow the same connection in both

Choose nested domains, a decision, a retry or a shared dependency below. Both renderers receive exactly the same source. Start with one question: where does this connection lead?

{{visual:primary}}

In Clear Mermaid, select a step to inspect what leads into it and what happens next. Follow a connection, then return to the previous step. Switch to the text view to read those relationships without tracing lines. Use the overview to find your place and readable size to inspect the words.

That is the improvement we care about: helping someone answer a question about the diagram. Compare it yourself. A compact Mermaid drawing may already be enough for a small flow.

## What we changed after getting it wrong

We tested seven difficult diagrams through eight rounds, comparing Mermaid, [Beautiful Mermaid](https://github.com/lukilabs/beautiful-mermaid) and our reader. Beautiful Mermaid's branching was often clearer than our early attempts. We dropped the rule that stacked every branch vertically. Horizontal layouts made better use of the screen in several cases.

We also removed competing arrowheads, decorative connector colours and labels that repeated what a shape already showed. A decision needs a clear question and a route for each answer. A retry needs a visible return to the right step. Groups need boundaries people can distinguish.

## Let the browser help people read

Clear Mermaid uses normal browser text, CSS and SVG connections. Text stays selectable. Controls can receive keyboard focus. Readers can search for a step and inspect its relationships as text.

[Mermaid already supports accessible titles and descriptions](https://mermaid.js.org/config/accessibility.html). Our aim is to make the relationships themselves easier to explore. Colour helps, but labels, boundaries and text relationships carry meaning too. The reader should not have to distinguish two colours to understand a branch.

Before drawing it, we check that its steps and connections agree with Mermaid. Unsupported input fails visibly. A better-looking diagram that changes a connection would be a worse explanation.

## Try changing the diagram

The next article, [Clear Mermaid in action](/articles/clear-mermaid-in-action), lets you edit a step and connect it to another without writing syntax. The Mermaid source updates with your changes, so you can take the result with you.

Clear Mermaid already renders [two diagrams on the HD blog](https://hyperdrift.io/blog/own-your-stack-types-all-the-way-down). It supports a checked flowchart subset, not every Mermaid diagram family. Our reviews and automated checks support this release; they do not establish full accessibility conformance or independent gains in comprehension.

This is part of Orchestra's work on open source and better standards: keep what people already use, improve a specific experience and give them enough evidence to judge the result.
