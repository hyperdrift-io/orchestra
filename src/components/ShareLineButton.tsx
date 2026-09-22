'use client';

import { useEffect, useState } from 'react';

type Props = { title: string; text: string; url: string };

/** One tap at the moment of insight: the native share sheet where there is one, the link copied otherwise. */
export function ShareLineButton({ title, text, url }: Props) {
  const [native, setNative] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setNative(typeof navigator.share === 'function'); }, []);

  async function share() {
    try {
      if (native) { await navigator.share({ title, text, url }); return; }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      // No sheet and no clipboard: the end-cap carries every other way to share.
      window.location.hash = '#article-share';
    }
  }

  return <button type="button" data-share-line="" onClick={share} aria-live="polite">{copied ? 'Link copied.' : 'Pass this on'}</button>;
}
