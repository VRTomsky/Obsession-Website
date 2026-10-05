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

  const first = append(0);
  setActive(items[start]);
  return { first };
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
