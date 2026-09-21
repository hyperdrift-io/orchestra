'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/** Founder comparison controls. Rendered only in local development/editorial preview. */
export function PreviewControls() {
  const path = usePathname();
  const query = useSearchParams();
  const router = useRouter();
  const landing = path === '/' || path === '/system';
  const art = query.get('art') !== 'off';
  if (!landing) return null;
  const suffix = art ? '' : '?art=off';
  return <aside id="preview-controls" aria-label="Local landing comparison">
    <strong>Local comparison</strong>
    <nav aria-label="Graph version">
      <a href={`/${suffix}`} aria-current={path === '/' ? 'page' : undefined}>Organisation diagram</a>
      <a href={`/system${suffix}`} aria-current={path === '/system' ? 'page' : undefined}>WebGL system</a>
    </nav>
    <label><input type="checkbox" checked={art} onChange={(event) => router.replace(`${path}${event.target.checked ? '' : '?art=off'}`, { scroll: false })} />Show giant artwork</label>
  </aside>;
}
