import type { ArticleSummary } from '@/lib/article-catalogue';

/** The OSS flag: this article reports an upstream open-source contribution. The full flag adds its verified status. */
export function OssFlag({ oss, compact = false }: { oss: NonNullable<ArticleSummary['oss']>; compact?: boolean }) {
  return <span data-oss-flag={compact ? 'compact' : ''}>
    <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.7" /><circle cx="4.5" cy="12.5" r="1.7" /><circle cx="11.5" cy="10" r="1.7" /><path d="M4.5 5.2v5.6M4.5 5.2c0 3 2.6 4.8 5.3 4.8" /></svg>
    <b><abbr title="Open-source software">OSS</abbr></b>
    {!compact && <span>{oss.project} · {oss.status}</span>}
  </span>;
}
