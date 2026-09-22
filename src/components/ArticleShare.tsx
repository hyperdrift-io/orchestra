'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { title: string; text: string; url: string; imagePath: string; slug: string; preview: boolean };

/** Sharing is a reader action. Links always use the canonical URL, never a preview host. */
export function ArticleShare({ title, text, url, imagePath, slug, preview }: Props) {
  const [native, setNative] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [manual, setManual] = useState(false);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReady(true);
    setNative(typeof navigator.share === 'function');
  }, []);
  useEffect(() => {
    if (manual) { field.current?.focus(); field.current?.select(); }
  }, [manual]);

  async function copy() {
    setStatus('');
    try {
      await navigator.clipboard.writeText(url);
      setManual(false);
      setStatus('Link copied.');
    } catch {
      setManual(true);
      setStatus('Select and copy the article link below.');
      field.current?.focus(); field.current?.select();
    }
  }

  async function share() {
    setBusy(true);
    setStatus('');
    try {
      await navigator.share({ title, text, url });
    } catch (error) {
      // Closing the share sheet is not an error, and resolving does not prove a post was published.
      if (!(error instanceof Error && error.name === 'AbortError')) {
        setStatus('Sharing is unavailable here. You can copy the link or choose a sharing option.');
      }
    } finally { setBusy(false); }
  }

  return <section id="article-share" aria-labelledby="article-share-label">
    <p id="article-share-label">Know someone working on this? Pass it on.</p>
    {preview && <small>Editorial preview. Public links will work once this article is published.</small>}
    <nav aria-label="Share this article">
      {ready && <button type="button" onClick={copy}>Copy link</button>}
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`}>Email</a>
      {native && <button type="button" onClick={share} disabled={busy}>More ways to share</button>}
      <a href={imagePath} download={`${slug}.png`}>Download card ↓</a>
    </nav>
    <p role="status" aria-live="polite">{status}</p>
    {manual && <label>Article link<input ref={field} readOnly value={url} onFocus={(event) => event.currentTarget.select()} /></label>}
    <noscript><p><a href={url}>Open the public article link</a> to copy it from your address bar.</p></noscript>
  </section>;
}
