// Figurenseite mit Endlos-Scroll zur nächsten Figur.
import { boot, fontsReady } from './common.js';
import { ScrollTrigger, lenis } from '../core/scroll.js';
import { esc } from '../core/dom.js';
import { t, lang } from '../core/i18n.js';
import { enterPage } from '../core/layout.js';
import { ui } from '../data/site.js';
import { characters, statLabels } from '../data/characters.js';
import { bySlug } from '../data/people.js';
import { createFeed } from './feed.js';

function actorChips(c) {
  return [c.actor, c.actor2]
    .filter(Boolean)
    .map((s) => bySlug[s])
    .filter(Boolean)
    .map((p) => `<a class="chip" href="person.html?p=${p.slug}" data-title="${esc(p.name)}">${esc(t(ui.playedBy))} ${esc(p.name)} →</a>`)
    .join('');
}

function render(c, idx, next) {
  const name = t(c.name);
  const full = t(c.full);
  return `
  <article class="prof prof--char" data-slug="${c.slug}">
    <header class="prof__hero">
      <div class="prof__bg">${
        c.video
          ? `<video muted loop playsinline autoplay poster="${c.video}.jpg"><source src="${c.video}.webm" type="video/webm" /><source src="${c.video}.mp4" type="video/mp4" /></video>`
          : `<img src="${c.hero}" alt="" />`
      }</div>
      <div class="wrap prof__heroin">
        <div class="prof__heading">
          <p class="kicker"><span class="num">${String(idx + 1).padStart(2, '0')} / ${String(characters.length).padStart(2, '0')}</span>${lang === 'de' ? 'Figur' : 'Character'}</p>
          <h1 class="prof__name display" data-reveal="chars">${esc(name)}</h1>
          <p class="lead prof__tagline" data-reveal="fade">${esc(t(c.tagline))}</p>
          <div class="prof__crumbs">${full && full !== name ? `<span class="chip chip--red">${esc(full)}</span>` : ''}${actorChips(c)}</div>
        </div>
        <figure class="prof__portrait" data-tilt="8"><img src="${c.images[1] || c.hero}" alt="" data-tilt-inner /></figure>
      </div>
    </header>

    <div class="wrap">
      <section class="prof__block" style="padding-top:clamp(40px,5vw,80px)">
        <p class="kicker">${esc(t(ui.traits))}</p>
        <div style="display:grid;gap:40px">
          <div class="traits">${c.traits.map((tr) => `<span class="chip">${esc(t(tr))}</span>`).join('')}</div>
          <div class="stats">
            <p class="mono muted">${esc(t(ui.fanRating))}</p>
            ${Object.entries(c.stats)
              .map(([k, v]) => `<div class="stat"><span class="mono">${esc(t(statLabels[k]))}</span><span class="stat__bar"><i style="--v:${v}%"></i></span><span class="mono muted">${k === 'survival' ? (v ? (lang === 'de' ? 'ja' : 'yes') : (lang === 'de' ? 'nein' : 'no')) : v}</span></div>`)
              .join('')}
          </div>
        </div>
      </section>

      <section class="prof__block">
        <p class="kicker">${lang === 'de' ? 'Wer ist das?' : 'Who is this?'}</p>
        <div class="prof__text"><p class="body-l" data-reveal="fade">${esc(t(c.about))}</p></div>
      </section>

      <section class="prof__block">
        <p class="kicker">${esc(t(ui.connection))}</p>
        <div class="prof__text"><p class="lead" data-reveal="lines">${esc(t(c.connection))}</p></div>
      </section>
    </div>

    <section class="prof__impact">
      <div class="wrap">
        <p class="kicker"><span class="num">?</span>${esc(t(ui.why))}</p>
        <p class="lead" data-reveal="lines">${esc(t(c.why))}</p>
      </div>
    </section>

    <section class="prof__gallery">
      <div class="wrap"><p class="kicker">${esc(t(ui.gallery))} · ${c.images.length}</p></div>
      <div class="strip" data-cursor="${esc(t(ui.drag))}">
        ${c.images.map((src) => `<button class="strip__item" data-lb="${src}" type="button"><img src="${src}" alt="" loading="lazy" draggable="false" /></button>`).join('')}
      </div>
    </section>

    <div class="wrap">
      <section class="prof__block">
        <p class="kicker">${esc(t(ui.moments))}</p>
        <ol class="moments" data-reveal="stagger">${c.moments.map((m, i) => `<li><span class="mono red">${String(i + 1).padStart(2, '0')}</span><span>${esc(t(m))}</span></li>`).join('')}</ol>
      </section>

      <section class="prof__block">
        <p class="kicker">${esc(t(ui.fate))}</p>
        <div class="fate" data-reveal="fade"><span class="mono red">✝</span><p>${esc(t(c.fate))}</p></div>
      </section>

      <section class="prof__block">
        <p class="kicker">${esc(t(ui.interpretation))}</p>
        <div class="interp" data-reveal="fade">
          <p class="lead">${esc(t(c.interpretation))}</p>
          <p class="mono interp__note">${esc(t(ui.interpretationNote))}</p>
        </div>
      </section>

      <div class="prof__links" style="margin-top:50px">${actorChips(c).replaceAll('chip', 'btn')}<a class="btn" href="index.html#figuren">${esc(t(ui.allCharacters))} <span class="arrow">↗</span></a></div>
    </div>

    <div class="prof__next" role="button" tabindex="0" aria-label="${esc(t(ui.nextUp))}: ${esc(t(next.name))}">
      <img src="${next.hero}" alt="" loading="lazy" />
      <div class="wrap prof__nextin">
        <p class="kicker">${esc(t(ui.nextUp))}</p>
        <p class="prof__nextname display">${esc(t(next.name))}</p>
        <p class="mono muted">${esc(t(ui.keepScrollingChar))} ↓</p>
        <div class="prof__nextbar"><i></i></div>
      </div>
    </div>
  </article>`;
}

boot({ footer: true });

createFeed({
  items: characters,
  param: 'c',
  href: (c) => `figur.html?c=${c.slug}`,
  title: (c) => t(c.name),
  dock: (c) => c.hero,
  render,
  end: () => `<section class="feed-end wrap"><p class="kicker no-line">${lang === 'de' ? 'Alle Figuren gesehen' : 'You\'ve met every character'}</p><p class="h-xl">OBSESSION</p><a class="btn btn--red" href="index.html#figuren">${esc(t(ui.backHome))} <span class="arrow">→</span></a></section>`,
});

(async () => {
  lenis?.stop();
  await fontsReady();
  ScrollTrigger.refresh();
  await enterPage();
  lenis?.start();
  try {
    sessionStorage.removeItem('obsession-internal');
  } catch {
    /* egal */
  }
})();
window.addEventListener('load', () => ScrollTrigger.refresh());
