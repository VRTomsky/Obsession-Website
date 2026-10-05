// Endlos-Feed für Profilseiten: Weiterscrollen lädt automatisch das nächste Profil.
import { gsap, ScrollTrigger, scrollTo } from '../core/scroll.js';
import { $, $$, el } from '../core/dom.js';
import { initReveals, initTilt, initMagnets, openLightbox } from '../core/fx.js';

/**
 * @param {object} cfg
 *  items: Array mit {slug, ...}
 *  param: URL-Parameter (p | c)
 *  render(item, index, next): HTML eines Artikels
 *  title(item): Seitentitel
 *  dock(item): Bild für die Leiste unten
 */
export function createFeed(cfg) {
  const root = $('#app');
  const { items, param } = cfg;
  const url = new URL(location.href);
  let start = items.findIndex((x) => x.slug === url.searchParams.get(param));
  if (start < 0) start = 0;
  let count = 0;
  const max = items.length * 2;

  // Leiste mit allen Einträgen
  const dock = el(`<nav class="dock" aria-label="Übersicht">${items
    .map((it) => `<a href="${cfg.href(it)}" data-slug="${it.slug}" data-title="${cfg.title(it)}" title="${cfg.title(it)}"><img src="${cfg.dock(it)}" alt="" /></a>`)
    .join('')}</nav>`);
  document.body.appendChild(dock);

  function setActive(item) {
    const u = new URL(location.href);
    u.searchParams.set(param, item.slug);
    history.replaceState(null, '', u);
    document.title = `${cfg.title(item)} – OBSESSION`;
    $$('a', dock).forEach((a) => a.classList.toggle('is-active', a.dataset.slug === item.slug));
  }

  function append(i) {
    const idx = (start + i) % items.length;
    const item = items[idx];
    const next = items[(idx + 1) % items.length];
    const article = el(cfg.render(item, idx, next));
    root.appendChild(article);
    count += 1;

    fitName(article);
    initReveals(article);
    initTilt(article);
    initMagnets(article);

    // Galerie-Lightbox
    const gal = $$('[data-lb]', article);
    const list = gal.map((g) => g.dataset.lb);
    gal.forEach((g, k) => g.addEventListener('click', () => openLightbox(list, k)));

    // Ziehbare Bildleiste
    $$('.strip', article).forEach(dragScroll);

    // Hero-Parallax
    const bg = $('.prof__bg img, .prof__bg video', article);
    if (bg) gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: article, start: 'top top', end: '+=100%', scrub: true } });

    // Stat-Balken
    $$('.stat__bar i', article).forEach((b) => gsap.from(b, { scaleX: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 92%' } }));

    // Aktiver Eintrag (URL, Titel)
    ScrollTrigger.create({
      trigger: article,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActive(item),
    });

    // „Als Nächstes": Fortschrittsbalken + Nachladen
    const nextBox = $('.prof__next', article);
    if (nextBox) {
      const bar = $('.prof__nextbar i', nextBox);
      gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: nextBox, start: 'top bottom', end: 'bottom bottom', scrub: true } });
      nextBox.addEventListener('click', () => {
        const target = article.nextElementSibling;
        if (target) scrollTo(target);
      });
      const io = new IntersectionObserver(
        (es) => {
          if (!es.some((e) => e.isIntersecting)) return;
          io.disconnect();
          if (count < max) append(count);
          else root.appendChild(el(cfg.end()));
          ScrollTrigger.refresh();
        },
        { rootMargin: '0px 0px 900px 0px' },
      );
      io.observe(nextBox);
    }
    return article;
  }

  // Namen nach dem Laden der Schrift und bei Größenänderung neu einpassen
  document.fonts?.ready.then(() => $$('article.prof', root).forEach(fitName));
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => $$('article.prof', root).forEach(fitName), 150);
  });

  const first = append(0);
  setActive(items[start]);
  return { first };
}

// Großer Name: Schriftgröße so wählen, dass kein Wort umbricht
// (Personen: Vorname(n) in Zeile 1, Nachname in Zeile 2)
const measureCtx = document.createElement('canvas').getContext('2d');
function fitName(article) {
  const h = $('.prof__name', article);
  if (!h) return;
  h.style.fontSize = '';
  const cs = getComputedStyle(h);
  const size = parseFloat(cs.fontSize);
  const max = h.clientWidth;
  if (!max) return;
  measureCtx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  const l2 = $('.l2', h);
  const text = (h.getAttribute('aria-label') || h.textContent).replace(/\u00AD/g, '');
  const tokens = l2 ? [text.slice(0, text.length - l2.textContent.length).trim(), l2.textContent] : text.split(/\s+/);
  const widest = Math.max(...tokens.map((w) => measureCtx.measureText(w.toUpperCase()).width));
  if (widest > max * 0.97) h.style.fontSize = `${Math.floor((size * max * 0.97) / widest)}px`;
}

function dragScroll(node) {
  let down = false;
  let sx = 0;
  let sl = 0;
  let moved = 0;
  node.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    moved = 0;
    sx = e.clientX;
    sl = node.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    moved = Math.abs(e.clientX - sx);
    node.scrollLeft = sl - (e.clientX - sx);
  });
  window.addEventListener('pointerup', () => (down = false));
  node.addEventListener(
    'click',
    (e) => {
      if (moved > 6) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    true,
  );
  // Mausrad vertikal bleibt Seiten-Scroll (wichtig für das Endlos-Scrollen)
}
