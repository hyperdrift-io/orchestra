A diagram becomes harder to read when you have to remember which service owns each step, where a request crosses a boundary and where a failed attempt returns. Clear Mermaid lets you inspect those relationships without keeping the whole route in your head.

Start with the nested architecture below. Customer channels sit outside a commerce platform. Inside the platform, Order services contains Checkout, while Identity and Notifications belong to Shared services. The payment provider sits beyond that platform boundary. The same source is rendered by Clear Mermaid and basic Mermaid, so you can compare the explanation directly.

## Follow the boundaries and the request

{{visual:primary}}

Checkout is selected when the example opens. Choose **Show whole diagram** to see its place in the architecture, or **Find the checkout boundary** to return. Its title, outline and position inside Order services show what belongs there. The domain inspector lists the contained steps and their full path. Colour supports that structure; the words and boundaries carry it too.

Choose **Trace the payment request**. Request payment sits inside Checkout but connects to a provider outside the platform. The two-way connection carries the payment request out and its response back. Checkout then reads that response before deciding whether to save the order or retry. **Follow the retry** brings you to the failed-payment route and its return to the request.

Switch to **Mermaid basic** at any point. It opens with the whole diagram; choose **Show whole diagram** in Clear Mermaid for an overview comparison. It receives the same nodes, nested groups, connections and labels in the same-sized viewport. Use both views to answer the same question: what belongs here, and where does this connection lead?

## Change the architecture and compare the result

Select Notifications and move its Step domain from Shared services to Order services. The boundary changes while its existing connections remain. Switch renderer again to see how each presents your edited architecture.

Add a step inside Checkout, give it a clear name and connect it to the point where it belongs. Name the connection when its purpose would otherwise be ambiguous. Undo restores the previous change; Reset example returns to the starting architecture.

The other examples isolate a decision with named outcomes, a retry loop and a shared dependency. They let you examine one reading problem before returning to the nested architecture.

## Keep less of the diagram in your head

The overview shows the shape of the whole system. Selecting a step highlights its immediate connections. Domain membership tells you where that step belongs. The relationship view gives you the same facts as text, including with a keyboard.

These are different ways to answer a question without repeatedly tracing every line. Compare a route you care about, change it, and check whether the result is easier to explain to someone else.

## Take the source with you

Copy or download the Mermaid text when you have a useful result. The export keeps the nested groups, node membership and connections you edited. Everything happens in this browser; no AI service or account receives the diagram. Export your work before leaving the page.

This editor handles the supplied examples, their existing domains and the steps and connections it exposes. It does not import every Mermaid diagram or create arbitrary domain hierarchies. The source can travel with your documentation and other Mermaid tools.
