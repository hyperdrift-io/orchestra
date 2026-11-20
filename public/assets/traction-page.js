const panels = [...document.querySelectorAll('.traction-panel')];
const tabs = [...document.querySelectorAll('.traction-tabs a')];
const navigation = document.querySelector('.traction-tabs');
const frame = document.getElementById('traction-example-frame');
const workflowTabs = [...document.querySelectorAll('[data-growth-panel]')];
const workflowPanels = [...document.querySelectorAll('.growth-workflow')];
const workflowList = document.querySelector('.growth-workflow-tabs');
const chooseWorkflow = (id) => {
  workflowTabs.forEach(tab => { const active = tab.dataset.growthPanel === id; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  workflowPanels.forEach(panel => { panel.hidden = panel.id !== id; });
};
workflowList.hidden = false;
workflowList.setAttribute('role','tablist');
workflowTabs.forEach((tab, index) => {
  const panel = document.getElementById(tab.dataset.growthPanel);
  tab.setAttribute('role','tab'); tab.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',tab.id); panel.tabIndex = 0;
  tab.addEventListener('click', () => chooseWorkflow(panel.id));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight:(index+1)%workflowTabs.length, ArrowLeft:(index+workflowTabs.length-1)%workflowTabs.length, Home:0, End:workflowTabs.length-1}[event.key];
    if(next === undefined) return; event.preventDefault(); chooseWorkflow(workflowTabs[next].dataset.growthPanel); workflowTabs[next].focus({preventScroll:true});
  });
});
chooseWorkflow(workflowPanels[0].id);

const selectPage = (hash, scroll = false) => {
  const target = document.getElementById(hash.slice(1));
  const destination = {"traction": "/traction", "how-it-works": "/traction/how-it-works", "partnership": "/traction/partnership", "hd-os-example": "/os"}[target?.closest('.traction-panel')?.id];
  if (destination && destination !== location.pathname) { location.replace(destination + location.search + hash); return; }
  const selected = target?.closest('.traction-panel') || document.getElementById(document.querySelector('.traction-page').dataset.initialPanel) || panels[0];
  if (target?.classList.contains('growth-workflow')) chooseWorkflow(target.id);
  const disclosure = target?.closest('details');
  if (disclosure) disclosure.open = true;
  if (target?.id === 'outreach') target.querySelector('details').open = true;
  panels.forEach(panel => {
    panel.hidden = panel !== selected;
    if (panel.hidden) panel.querySelectorAll('video').forEach(video => video.pause());
  });
  tabs.forEach(tab => {
    const active = tab.id === `tab-${selected.id}`;
    if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
  });
  if (selected.id === 'hd-os-example' && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
  if (scroll) requestAnimationFrame(() => {
    if (target && target !== selected) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    else if (navigation.getBoundingClientRect().top < 0) navigation.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
};
const goTo = (hash) => {
  const previousPanel = document.activeElement.closest('.traction-panel');
  if (location.hash !== hash) history.pushState(null, '', hash);
  selectPage(hash, true);
  if (previousPanel?.hidden) {
    const target = document.getElementById(hash.slice(1));
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
};
document.querySelector('.traction-page').addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target?.closest('.traction-panel')) return;
  event.preventDefault();
  goTo(link.hash);
});
window.addEventListener('hashchange', () => selectPage(location.hash, true));
window.addEventListener('popstate', () => selectPage(location.hash, true));
selectPage(location.hash, Boolean(location.hash));
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
  const { type, height } = event.data ?? {};
  if (type === 'hd-os-height' && Number.isFinite(height)) frame.style.height = `${Math.max(400, Math.min(2400, height))}px`;
});

const players = new Map();
document.querySelectorAll('.traction-film').forEach(figure => {
  const film = figure.querySelector('video');
  const play = figure.querySelector('.film-play');
  const fallback = figure.querySelector('.film-fallback');
  const fail = () => {
    const restoreFocus = document.activeElement === play || document.activeElement === film;
    film.hidden = true;
    play.hidden = false;
    fallback.hidden = false;
    if (restoreFocus) fallback.querySelector('a').focus({ preventScroll: true });
  };
  const start = async (at) => {
    document.querySelectorAll('video').forEach(other => { if (other !== film) other.pause(); });
    play.hidden = true;
    fallback.hidden = true;
    film.hidden = false;
    film.focus({ preventScroll: true });
    try {
      if (Number.isFinite(at)) film.currentTime = at;
      await film.play();
    } catch (error) {
      // Switching tabs can interrupt a pending play without breaking the video.
      if (error.name !== 'AbortError') fail();
    }
  };
  film.hidden = true;
  play.hidden = false;
  play.addEventListener('click', () => start());
  film.addEventListener('error', fail);
  players.set(film, start);
});
const walkthrough = document.querySelector('.outreach-film');
const tourFilm = walkthrough.querySelector('video');
const chapters = [...walkthrough.querySelectorAll('[data-chapter]')];
chapters.forEach(chapter => chapter.addEventListener('click', () => players.get(tourFilm)(Number(chapter.dataset.start))));
walkthrough.addEventListener('toggle', () => { if (!walkthrough.open) tourFilm.pause(); });
// A shared chapter link opens the recording at that segment, paused for the visitor.
const requestedChapter = chapters.find(button => button.dataset.chapter === new URLSearchParams(location.search).get('chapter'));
if (requestedChapter && location.hash === '#outreach') {
  walkthrough.open = true;
  const figure = tourFilm.closest('.traction-film');
  figure.querySelector('.film-play').hidden = true;
  tourFilm.hidden = false;
  tourFilm.preload = 'metadata';
  const at = Number(requestedChapter.dataset.start);
  const seek = () => { tourFilm.currentTime = at; };
  if (tourFilm.readyState >= 1) seek();
  else { tourFilm.addEventListener('loadedmetadata', seek, {once:true}); tourFilm.load(); }
  figure.querySelectorAll('a[href$="film.mp4"]').forEach(link => { link.href += `#t=${at}`; });
}

document.querySelectorAll('[data-watch-chapter]').forEach(link => link.addEventListener('click', () => {
  walkthrough.open = true;
  const chapter = chapters.find(button => button.dataset.chapter === link.dataset.watchChapter);
  if (chapter) players.get(tourFilm)(Number(chapter.dataset.start));
}));
fetch('/assets/traction-tour.json').then(response => {
  if (!response.ok) throw new Error('Tour captions unavailable');
  return response.json();
}).then(tour => {
  const update = () => {
    const at = tourFilm.currentTime;
    const chapter = [...tour.chapters].reverse().find(item => at >= item.start);
    const ended = at >= tour.close;
    chapters.forEach(button => button.setAttribute('aria-pressed', String(!ended && button.dataset.chapter === chapter?.id)));
    const text = ended ? tour.end : chapter || tour.opening;
    walkthrough.querySelector('[data-tour-title]').textContent = text.title;
    walkthrough.querySelector('[data-tour-line]').textContent = ended ? text.line : chapter?.says.filter(line => at >= line.at).at(-1)?.text || text.line;
    walkthrough.querySelector('[data-tour-source]').textContent = ended ? tour.labels.end : chapter ? tour.labels[chapter.label] : 'Recorded in Traction · one of our apps, renamed Yourapp · businesses blurred';
  };
  tourFilm.addEventListener('timeupdate', update);
  tourFilm.addEventListener('seeked', update);
  update();
}).catch(() => { /* The film and native captions remain available. */ });

// The hero's first read: a visitor's own app, read while they look, then the door to a board that opens on it.
// Without this script the form still works: it carries the address to the sign-up. The address goes to this
// site's own server and to Traction's sign-up, and never to analytics: `hd:track` carries the step alone.
const readForm = document.querySelector('[data-app-read]');
const readResult = document.querySelector('[data-app-read-result]');
if (readForm && readResult) {
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
    return el('a', label, { class: 'button', href: url.toString() });
  };
  const show = (...nodes) => { readResult.replaceChildren(...nodes); readResult.hidden = false; };
  const rest = () => { button.disabled = false; readForm.removeAttribute('aria-busy'); };
  let run = 0;
  const ask = async (address, mine, tries = 0) => {
    let answer;
    try {
      const response = await fetch('/api/traction/site-read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: address }), cache: 'no-store' });
      answer = await response.json();
    } catch { answer = { state: 'refused', reason: 'unavailable' }; }
    if (mine !== run) return;
    const host = address.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
    if (answer.state === 'ready' && Array.isArray(answer.lines)) {
      tell('ready');
      const list = el('ol');
      for (const line of answer.lines) { const item = el('li'); item.append(el('span', line.label), el('strong', line.headline)); list.append(item); }
      show(el('p', `First read of ${host}`, { class: 'app-read-title' }), list, door(address, 'Open my board on this read →'),
        el('p', 'Your board holds the read in full, with its sources.', { class: 'small' }));
      return rest();
    }
    if ((answer.state === 'queued' || answer.state === 'running') && tries < 180) {
      const pages = (answer.reading || []).join(' · ');
      show(el('p', `Reading ${answer.site?.title || host}…`, { class: 'app-read-title' }), ...(pages ? [el('p', pages, { class: 'small' })] : []));
      setTimeout(() => ask(address, mine, tries + 1), 2000);
      return;
    }
    if (answer.state === 'refused' && answer.reason === 'address') {
      tell('refused');
      show(el('p', 'We couldn’t use that address. Enter your app’s public website, like yourapp.com.'));
      rest();
      return input.focus();
    }
    const paused = answer.state === 'refused' && answer.reason === 'paused';
    tell(paused ? 'paused' : 'failed');
    show(el('p', paused ? 'We’ve made all of today’s reads from this page. Your board makes yours when it opens.'
      : answer.blocked ? `${host} didn’t let us read it just now. Your board reads it again when it opens.`
        : 'We couldn’t finish the read just now. Your board makes it again when it opens.'),
      door(address, 'Start my free trial →'));
    rest();
  };
  readForm.addEventListener('submit', event => {
    event.preventDefault();
    const address = input.value.trim();
    if (address.length < 4) return input.focus();
    run += 1; told.clear(); tell('asked');
    button.disabled = true; readForm.setAttribute('aria-busy', 'true');
    show(el('p', 'Starting the read…', { class: 'app-read-title' }));
    ask(address, run);
  });
}
