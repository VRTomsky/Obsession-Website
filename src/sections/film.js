// „Der Film": Einleitung, Eckdaten, Handlung in Kapiteln (Sticky-Bilder), Themen, 3D-Galerie, Videos.
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$, esc, reducedMotion } from '../core/dom.js';

const touchUI = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;
import { t, lang } from '../core/i18n.js';
import { M, gallery } from '../data/media.js';
import { sections } from '../data/site.js';
import { facts, logline, premise, chapters, themes, videos, credits } from '../data/film.js';
import { ytFacade, openLightbox, marquee } from '../core/fx.js';

export function filmHTML() {
  const s = sections.film;
  return `
  <section class="section film" id="film">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
      <div class="film__intro grid-12">
        <p class="lead film__logline" data-reveal="lines">${esc(t(logline))}</p>
        <div class="film__premise">
          ${premise.map((p) => `<p class="body-l" data-reveal="fade">${esc(t(p))}</p>`).join('')}
        </div>
      </div>
      <dl class="facts" data-reveal="stagger">
        ${facts.map((f) => `<div class="fact"><dt class="mono">${esc(t(f.label))}</dt><dd>${esc(t(f.value))}</dd></div>`).join('')}
      </dl>
    </div>

    <div class="film__poster-row wrap">
      <figure class="film__poster media" data-reveal="img" data-tilt="6"><img src="${M.poster.main}" alt="Obsession – Kinoplakat" loading="lazy" /></figure>
      <figure class="film__wide media" data-reveal="img"><img src="${M.still.storeCouple}" alt="" loading="lazy" data-parallax="0.08" /></figure>
      <div class="film__credits" data-reveal="stagger">
        ${credits.map((c) => `<div class="credit"><span class="mono muted">${esc(t(c.role))}</span><span>${esc(t(c.name))}</span></div>`).join('')}
      </div>
    </div>
  </section>

  ${marquee(lang === 'de' ? ['Pass auf, was du dir wünschst', 'Be careful who you wish for'] : ['Be careful who you wish for', 'You only get one wish'], 'marquee--red')}

  <section class="section story" id="handlung">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker">${esc(t(sections.story.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(sections.story.title))}</h2>
      </div>
    </div>
    <div class="story__body wrap">
      <div class="story__visual">
        <div class="story__frame">
          ${chapters.map((c, i) => `<img src="${c.img}" alt="" class="${i === 0 ? 'is-on' : ''}" data-i="${i}" loading="lazy" />`).join('')}
          <span class="story__counter mono"><b>I</b> / X</span>
        </div>
      </div>
      <ol class="story__list">
        ${chapters
          .map(
            (c, i) => `
          <li class="chapter" data-i="${i}">
            <span class="chapter__n display">${c.n}</span>
            <h3 class="h-l">${esc(t(c.title))}</h3>
            <p class="body-l">${esc(t(c.text))}</p>
            <figure class="chapter__mobile media"><img src="${c.img}" alt="" loading="lazy" /></figure>
          </li>`,
          )
          .join('')}
      </ol>
    </div>
  </section>

  <section class="section themes">
    <div class="wrap">
      <p class="kicker">${esc(t(sections.themes.kicker))}</p>
      <div class="themes__grid">
        ${themes
          .map(
            (th, i) => `
          <article class="theme" data-reveal="fade" data-delay="${i * 0.08}">
            <span class="theme__n mono">0${i + 1}</span>
            <h3 class="h-m">${esc(t(th.title))}</h3>
            <p>${esc(t(th.text))}</p>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="ring-sec" aria-label="${lang === 'de' ? 'Bilder aus dem Film' : 'Stills from the film'}">
    <div class="ring-sec__pin">
      <div class="ring-sec__title">
        <p class="kicker no-line">${lang === 'de' ? 'Bilder aus dem Film' : 'Stills from the film'}</p>
        <p class="h-mega outline">${lang === 'de' ? 'Galerie' : 'Gallery'}</p>
      </div>
      <div class="ring">
        <div class="ring__spin">
          ${gallery.map((g, i) => `<button class="ring__item" style="--i:${i}" data-g="${i}" aria-label="Bild ${i + 1}"><img src="${g}" alt="" loading="lazy" draggable="false" /></button>`).join('')}
        </div>
      </div>
      <p class="ring-sec__hint mono">${
        touchUI()
          ? lang === 'de' ? 'Wischen zum Drehen · Tippen vergrößert' : 'Swipe to spin · tap to enlarge'
          : lang === 'de' ? 'Mit gedrückter Maus ziehen · Klick vergrößert' : 'Click and drag to spin · click to enlarge'
      }</p>
    </div>
  </section>

  <section class="section videos" id="trailer">
    <div class="wrap">
      <div class="sec-head sec-head--row">
        <p class="kicker">${esc(t(sections.videos.kicker))}</p>
        <p class="mono muted">YouTube · ${lang === 'de' ? 'lädt erst nach Klick' : 'loads only after click'}</p>
      </div>
      <div class="videos__grid">
        ${videos.map((v, i) => `<div class="videos__item ${i === 0 ? 'is-main' : ''}" data-reveal="fade">${ytFacade(v)}</div>`).join('')}
      </div>
    </div>
  </section>`;
}

export function initFilm() {
  // Kapitel: Bild wechselt synchron zum Text
  const imgs = $$('.story__frame img');
  const counter = $('.story__counter b');
  $$('.chapter').forEach((ch) => {
    ScrollTrigger.create({
      trigger: ch,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        ch.classList.toggle('is-active', self.isActive);
        if (!self.isActive) return;
        const i = ch.dataset.i;
        imgs.forEach((im) => im.classList.toggle('is-on', im.dataset.i === i));
        counter.textContent = ch.querySelector('.chapter__n').textContent;
      },
    });
  });

  // 3D-Ring: dreht sich von selbst; Ziehen mit gedrückter Maus beschleunigt ihn, Klick öffnet das Bild.
  // Scrollen bewegt den Ring nicht – die Seite läuft einfach weiter.
  const spin = $('.ring__spin');
  const items = $$('.ring__item');
  const ring = $('.ring');
  const n = items.length;
  const radius = () => {
    const w = items[0].offsetWidth || 280;
    return (w + 22) / 2 / Math.tan(Math.PI / n);
  };
  const layout = () => {
    const r = radius();
    items.forEach((it, i) => {
      it.style.transform = `rotateY(${(i * 360) / n}deg) translateZ(${r}px)`;
    });
    spin.style.setProperty('--r', `${r}px`);
  };
  layout();
  window.addEventListener('resize', layout);
  gsap.fromTo('.ring', { scale: 0.75, rotateX: 16 }, { scale: 1, rotateX: 5, ease: 'none', scrollTrigger: { trigger: '.ring-sec', start: 'top bottom', end: 'center center', scrub: true } });

  const auto = reducedMotion() ? 0 : -0.1; // Grad pro Frame (~60 fps)
  let angle = 0;
  let vel = auto;
  let down = false;
  let lastX = 0;
  let lastT = 0;
  let moved = 0;
  let downItem = null;
  let visible = false;
  new IntersectionObserver((es) => (visible = es[es.length - 1].isIntersecting)).observe(ring);

  // Welches Bild liegt unter dem Zeiger? (3D-Hit-Testing ist unzuverlässig, daher selbst berechnen:
  // unter allen Bildern, deren Fläche den Punkt enthält, gewinnt das, das am weitesten nach vorn zeigt)
  const itemAt = (x, y) => {
    let best = null;
    let bestFacing = 0.2;
    items.forEach((it, i) => {
      const facing = Math.cos((((i * 360) / n + angle) * Math.PI) / 180);
      if (facing <= bestFacing) return;
      const r = it.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        best = it;
        bestFacing = facing;
      }
    });
    return best;
  };

  ring.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault(); // keine Text-/Bildauswahl beim Ziehen
    down = true;
    moved = 0;
    lastX = e.clientX;
    lastT = performance.now();
    downItem = itemAt(e.clientX, e.clientY);
    ring.classList.add('is-dragging');
    ring.setPointerCapture(e.pointerId);
  });
  ring.addEventListener('pointermove', (e) => {
    if (!down) {
      if (e.pointerType === 'mouse') ring.classList.toggle('is-over-item', !!itemAt(e.clientX, e.clientY));
      return;
    }
    const dx = e.clientX - lastX;
    const now = performance.now();
    moved += Math.abs(dx);
    const d = dx * 0.16;
    angle += d;
    vel = d / Math.max((now - lastT) / 16.7, 0.5);
    lastX = e.clientX;
    lastT = now;
  });
  const up = (e) => {
    if (!down) return;
    down = false;
    ring.classList.remove('is-dragging');
    if (moved < 6 && downItem) openLightbox(gallery, parseInt(downItem.dataset.g, 10));
    downItem = null;
    if (e?.pointerId != null && ring.hasPointerCapture(e.pointerId)) ring.releasePointerCapture(e.pointerId);
  };
  ring.addEventListener('pointerup', up);
  ring.addEventListener('pointercancel', up);
  ring.addEventListener('dragstart', (e) => e.preventDefault());
  items.forEach((it) =>
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(gallery, parseInt(it.dataset.g, 10));
      }
    }),
  );

  gsap.ticker.add((time, dtMs) => {
    if (!visible) return;
    const k = Math.min(dtMs / 16.7, 3);
    if (!down) {
      vel += (auto - vel) * 0.03 * k; // Schwung läuft aus, zurück zur Eigenrotation
      angle += vel * k;
    }
    spin.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${angle}deg)`;
  });
}
