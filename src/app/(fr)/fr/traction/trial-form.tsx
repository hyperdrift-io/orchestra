'use client';
import {journeyStartHref} from '@/lib/journey';
import Script from 'next/script';

export function TrialForm({action}: {action:string}) {
  return <div>
    <form className="pilot-form" data-app-read="" action={action} method="get">
      <label htmlFor="app-url">Adresse du site de votre application</label>
      <div><input id="app-url" name="app" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="monapplication.fr" required minLength={4} maxLength={300}/>
        <input type="hidden" name="lang" value="fr"/><button className="button" type="submit">Obtenir un premier avis</button></div>
      <p>Essai de sept jours, sans carte bancaire.</p>
    </form>
    <div className="pilot-read" data-app-read-result="" onClick={event => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (link) link.href = journeyStartHref(link.href);
    }} role="status" aria-live="polite" hidden/>
    <Script src="/assets/traction-site-read.js?v=1" strategy="afterInteractive"/>
  </div>;
}
