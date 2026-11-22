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
  const owner = target?.closest('.traction-panel');
  const destination = owner && document.getElementById('tab-' + owner.id)?.getAttribute('href');
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
walkthrough.addEventListener('toggle', () => { if (!walkthrough.open) tourFilm.pause(); });
fetch(document.documentElement.lang==='fr'?'/assets/traction-tour.fr.json':'/assets/traction-tour.json').then(response => {
  if (!response.ok) throw new Error('Tour captions unavailable');
  return response.json();
}).then(tour => {
  const startChapter = (id, play) => {
    const chapter = tour.chapters.find(item=>item.id===id);
    if(!chapter) return;
    walkthrough.open = true;
    if(play) {players.get(tourFilm)(chapter.start);return;}
    const figure=tourFilm.closest('.traction-film');
    figure.querySelector('.film-play').hidden=true;
    tourFilm.hidden=false;
    tourFilm.preload='metadata';
    const seek=()=>{tourFilm.currentTime=chapter.start;};
    if(tourFilm.readyState>=1) seek();
    else {tourFilm.addEventListener('loadedmetadata',seek,{once:true});tourFilm.load();}
    figure.querySelectorAll('a[href$=".mp4"]').forEach(link=>{link.hash='t='+chapter.start;});
  };
  chapters.forEach(button=>button.addEventListener('click',()=>startChapter(button.dataset.chapter,true)));
  document.querySelectorAll('[data-watch-chapter]').forEach(link=>link.addEventListener('click',()=>startChapter(link.dataset.watchChapter,true)));
  if(location.hash==='#outreach') startChapter(new URLSearchParams(location.search).get('chapter'),false);
  const update = () => {
    const at = tourFilm.currentTime;
    const chapter = [...tour.chapters].reverse().find(item => at >= item.start);
    const ended = at >= tour.close;
    chapters.forEach(button => button.setAttribute('aria-pressed', String(!ended && button.dataset.chapter === chapter?.id)));
    const text = ended ? tour.end : chapter || tour.opening;
    walkthrough.querySelector('[data-tour-title]').textContent = text.title;
    walkthrough.querySelector('[data-tour-line]').textContent = ended ? text.line : chapter?.says.filter(line => at >= line.at).at(-1)?.text || text.line;
    walkthrough.querySelector('[data-tour-source]').textContent = ended ? tour.labels.end : chapter ? tour.labels[chapter.label] : tour.labels.recorded;
  };
  tourFilm.addEventListener('timeupdate', update);
  tourFilm.addEventListener('seeked', update);
  update();
}).catch(() => { /* The film and native captions remain available. */ });
