const INTEL = 'https://intel.hyperdrift.io';

/**
 * Intel Weekly, offered after the article's own door and kept visually secondary to it. A native form post:
 * Intel owns the list, the confirmation email and every send, and redirects back to its own page with the
 * outcome. `from` carries the article's full address so Intel records which article brought the reader; nothing
 * about the reader is stored or measured here. The words match Intel's own sign-up.
 */
export function IntelWeekly({ url }: { url: string }) {
  return <section data-intel-weekly="" aria-labelledby="intel-weekly-title">
    <div>
      <h2 id="intel-weekly-title">Get Intel Weekly on Monday mornings</h2>
      <p>The week with hindsight, the reports worth reading in full, and our calls for the week ahead. One email a week. <a href={`${INTEL}/weekly`}>Read the latest issue</a></p>
    </div>
    <form method="post" action={`${INTEL}/api/weekly/subscribe`}>
      <label htmlFor="intel-weekly-email">Email address</label>
      <input id="intel-weekly-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      <input type="hidden" name="from" value={url} />
      <div data-trap="" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit">Subscribe</button>
    </form>
  </section>;
}
