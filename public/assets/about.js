const strip = document.querySelector('.experience-strip');
const toggle = strip.querySelector('.experience-toggle');
strip.removeAttribute('data-static');
toggle.hidden = false;
toggle.setAttribute('aria-pressed', 'false');
toggle.addEventListener('click', () => {
  const showAll = strip.toggleAttribute('data-static');
  toggle.setAttribute('aria-pressed', String(showAll));
});
