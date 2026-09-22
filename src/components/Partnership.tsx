import Link from 'next/link';

/** The Traction Partnership, beside the enquiry form: invitation visible, terms folded. */
export function Partnership() {
  return (
    <aside id="partnership" aria-labelledby="partnership-title">
      <p className="meta">The Traction Partnership</p>
      <h3 id="partnership-title">
        Build together. <em>Share the upside.</em>
      </h3>
      <p>
        No budget for it yet? Then we partner: we build, traction decides, and
        you keep everything we ship either way.
      </p>
      <p>
        <Link className="btn" href={{ pathname: '/', query: { situation: 'partnership' }, hash: '#contact' }}>
          Apply to partner <span aria-hidden>↗</span>
        </Link>
      </p>
      <details>
        <summary>How the partnership works</summary>
        <p>
          For a small number of products a quarter, we build the automation for
          free and validate the partnership on traction alone: if the work moves
          your numbers, the partnership stands and we share the upside; if it
          does not, you owe nothing and keep everything we shipped. Orchestra is
          the partner in the work. Your team stays focused on profit while the
          automation earns its place.
        </p>
      </details>
    </aside>
  );
}
