const tabList = document.querySelector('.workflow-tabs');
const tabs = [...tabList.querySelectorAll('button')];
const panels = tabs.map(tab => document.getElementById(tab.dataset.panel));
const timers = new Map();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function stopReplay(panel) {
  (timers.get(panel) || []).forEach(clearTimeout);
  timers.delete(panel);
  const replay = panel.querySelector('.demo-replay');
  replay.innerHTML = '<span aria-hidden="true">↻</span> Watch the handoffs';
  replay.setAttribute('aria-label', replay.dataset.playLabel);
}
function showStep(panel, index) {
  panel.querySelectorAll('[data-step]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.step) === index)));
  panel.querySelectorAll('[data-output]').forEach(output => { output.hidden = Number(output.dataset.output) !== index; });
}
function selectTab(index, updateURL = false) {
  panels.forEach(stopReplay);
  tabs.forEach((tab, current) => {
    const selected = current === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[current].hidden = !selected;
  });
  if (updateURL) history.replaceState(null, '', `#${panels[index].id}`);
}

tabList.setAttribute('role', 'tablist');
tabs.forEach((tab, index) => {
  const panel = panels[index];
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.tabIndex = 0;
  tab.addEventListener('click', () => selectTab(index, true));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight:(index+1)%tabs.length, ArrowLeft:(index-1+tabs.length)%tabs.length, Home:0, End:tabs.length-1}[event.key];
    if (next === undefined) return;
    event.preventDefault(); selectTab(next, true); tabs[next].focus({preventScroll:true});
  });
  panel.querySelector('.demo-steps').hidden = false;
  panel.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    stopReplay(panel); showStep(panel, Number(button.dataset.step));
  }));
  const replay = panel.querySelector('.demo-replay');
  replay.dataset.playLabel = replay.getAttribute('aria-label');
  replay.hidden = reducedMotion.matches;
  replay.addEventListener('click', () => {
    if (timers.has(panel)) { stopReplay(panel); return; }
    if (reducedMotion.matches) { showStep(panel, 2); return; }
    showStep(panel, 0);
    replay.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause the handoffs';
    replay.setAttribute('aria-label', `Pause ${tab.textContent.toLowerCase()} workflow`);
    timers.set(panel,[
      setTimeout(() => showStep(panel, 1), 1800),
      setTimeout(() => { showStep(panel, 2); stopReplay(panel); }, 3600),
    ]);
  });
  showStep(panel, 2);
});
function fromHash() {
  const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
  selectTab(index < 0 ? 0 : index);
}
document.querySelectorAll('.workflow-feed a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const index = panels.findIndex(panel => `#${panel.id}` === link.hash);
  if (index < 0) return;
  event.preventDefault(); selectTab(index, true); tabs[index].focus({preventScroll:true});
  tabList.scrollIntoView({block:'start',behavior:'instant'});
}));
window.addEventListener('hashchange', fromHash);
document.addEventListener('visibilitychange', () => { if (document.hidden) panels.forEach(stopReplay); });
reducedMotion.addEventListener('change', () => {
  panels.forEach(panel => {
    if (reducedMotion.matches) stopReplay(panel);
    panel.querySelector('.demo-replay').hidden = reducedMotion.matches;
  });
});
fromHash();
tabList.hidden = false;
