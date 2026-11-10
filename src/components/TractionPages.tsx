import { tractionPages } from '@/data/traction-features';

/** The three pages about Traction as one visible row: each has one job, and all three stay one click apart.
 *  A founder who came from their board keeps it in the address. */
export function TractionPages({ current, trialApp }: { current: (typeof tractionPages)[number]['id']; trialApp?: string }) {
  const from = trialApp ? `?from=${encodeURIComponent(trialApp)}` : '';
  return <nav aria-label="Traction" data-traction-pages="">
    {tractionPages.map((page) => <a key={page.id} href={`${page.href}${from}`} aria-current={page.id === current ? 'page' : undefined}>{page.label}</a>)}
  </nav>;
}
