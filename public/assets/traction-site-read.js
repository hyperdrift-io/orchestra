// The first read: a visitor's own app, read while they look, then the door to a board that opens on it. The Traction
// tab offers it after its proposition, the How it works tab after its content.
// Without this script the form still works: it carries the address to the sign-up. The address goes to this
// site's own server and to Traction's sign-up, and never to analytics: `hd:track` carries the step alone.
document.querySelectorAll('[data-app-read]').forEach(readForm => {
  const readResult = readForm.parentElement.querySelector('[data-app-read-result]');
  if (!readResult) return;
  const french = document.documentElement.lang === 'fr';
  const labels = { 'Strength': 'Point fort', 'In the way': 'Frein', 'Next customer move': 'Prochaine action commerciale' };
  const input = readForm.querySelector('input[name="app"]');
  const button = readForm.querySelector('button');
  const told = new Set();
  const tell = step => { if (told.has(step)) return; told.add(step); window.dispatchEvent(new CustomEvent('hd:track', { detail: { event: 'site_read', step } })); };
  const el = (tag, text, attributes = {}) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    return node;
  };
  const door = (address, label) => {
    const url = new URL(readForm.action, location.href);
    url.searchParams.set('app', address);
    if (french) url.searchParams.set('lang','fr');
    return el('a', label, { class: 'button', href: url.toString() });
  };
  const show = (...nodes) => { readResult.replaceChildren(...nodes); readResult.hidden = false; };
  const rest = () => { button.disabled = false; readForm.removeAttribute('aria-busy'); };
  let run = 0;
  const ask = async (address, mine, tries = 0) => {
    let answer;
    try {
      const response = await fetch('/api/traction/site-read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: address, ...(french ? {language:'fr'} : {}) }), cache: 'no-store' });
      answer = await response.json();
    } catch { answer = { state: 'refused', reason: 'unavailable' }; }
    if (mine !== run) return;
    const host = address.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
    if (answer.state === 'ready' && Array.isArray(answer.lines)) {
      tell('ready');
      const list = el('ol');
      for (const line of answer.lines) { const item = el('li'); item.append(el('span', french ? (labels[line.label] || line.label) : line.label), el('strong', line.headline)); list.append(item); }
      show(el('p', french ? `Premier avis sur ${host}` : `First read of ${host}`, { class: 'app-read-title' }), list, door(address, french ? 'Retrouver cet avis dans mon tableau →' : 'Open my board on this read →'),
        el('p', french ? 'L’avis complet et ses sources figurent dans votre tableau.' : 'Your board holds the read in full, with its sources.', { class: 'small' }));
      return rest();
    }
    if ((answer.state === 'queued' || answer.state === 'running') && tries < 180) {
      const pages = (answer.reading || []).join(' · ');
      show(el('p', french ? `Lecture de ${answer.site?.title || host}…` : `Reading ${answer.site?.title || host}…`, { class: 'app-read-title' }), ...(pages ? [el('p', pages, { class: 'small' })] : []));
      setTimeout(() => ask(address, mine, tries + 1), 2000);
      return;
    }
    if (answer.state === 'refused' && answer.reason === 'address') {
      tell('refused');
      show(el('p', french ? 'Cette adresse ne correspond pas à un site public. Exemple : monapplication.fr.' : 'We couldn’t use that address. Enter your app’s public website, like yourapp.com.'));
      rest();
      return input.focus();
    }
    const paused = answer.state === 'refused' && answer.reason === 'paused';
    tell(paused ? 'paused' : 'failed');
    show(el('p', paused ? (french ? 'Tous les avis disponibles pour aujourd’hui ont été demandés. La lecture pourra reprendre dans votre tableau.' : 'We’ve made all of today’s reads from this page. Your board makes yours when it opens.')
      : answer.blocked ? (french ? `${host} n’a pas autorisé la lecture. Un nouvel essai est possible depuis votre tableau.` : `${host} didn’t let us read it just now. Your board reads it again when it opens.`)
        : (french ? 'La lecture n’a pas abouti. Un nouvel essai est possible depuis votre tableau.' : 'We couldn’t finish the read just now. Your board makes it again when it opens.')),
      door(address, french ? 'Commencer mon essai →' : 'Start my free trial →'));
    rest();
  };
  readForm.addEventListener('submit', event => {
    event.preventDefault();
    const address = input.value.trim();
    if (address.length < 4) return input.focus();
    run += 1; told.clear(); tell('asked');
    button.disabled = true; readForm.setAttribute('aria-busy', 'true');
    show(el('p', french ? 'Lecture du site…' : 'Starting the read…', { class: 'app-read-title' }));
    ask(address, run);
  });
});
