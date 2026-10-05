// Personenseite (Cast & Crew) mit Endlos-Scroll zur nächsten Person.
import { boot, fontsReady } from './common.js';
import { ScrollTrigger, lenis } from '../core/scroll.js';
import { esc, imdbTitle, imdbName } from '../core/dom.js';
import { t, lang, fmtDate, ageFrom } from '../core/i18n.js';
import { enterPage } from '../core/layout.js';
import { ui } from '../data/site.js';
import { people } from '../data/people.js';
import { charBySlug } from '../data/characters.js';
import { createFeed } from './feed.js';

const charLink = (p) => {
  const c = charBySlug[p.character] || (p.character === 'viola' || p.character === 'harry' ? charBySlug['crystal-shop'] : null) || (p.character === 'service' ? charBySlug['customer-service'] : null);
  return c ? `figur.html?c=${c.slug}` : null;
};

function nameHTML(name) {
  const parts = name.split(' ');
  const last = parts.pop();
  return `${esc(parts.join(' '))}<span class="l2">${esc(last)}</span>`;
}

function fact(label, value) {
  return `<div class="pfact"><dt class="mono">${esc(t(label))}</dt><dd>${value}</dd></div>`;
}

function render(p, idx, next) {
  const age = ageFrom(p.born);
  const np = `<span class="np">${esc(t(ui.notPublic))}</span>`;
  const cl = charLink(p);
  const photos = [...p.img.photos, ...p.img.stills];
  const bg = p.img.stills[0] || p.img.portrait;
  return `
  <article class="prof" data-slug="${p.slug}">
    <header class="prof__hero">
      <div class="prof__bg"><img src="${bg}" alt="" /></div>
      <div class="wrap prof__heroin">
        <div class="prof__heading">
          <p class="kicker"><span class="num">${String(idx + 1).padStart(2, '0')} / ${String(people.length).padStart(2, '0')}</span>${p.director ? esc(t(ui.director)) : 'Cast'}</p>
          <h1 class="prof__name display" data-reveal="chars">${nameHTML(p.name)}</h1>
          <p class="lead prof__tagline" data-reveal="fade">${esc(t(p.tagline))}</p>
          <div class="prof__crumbs">
            <span class="chip chip--red">${esc(t(p.role))}</span>
            ${p.fullName ? `<span class="chip">${esc(p.fullName)}</span>` : ''}
            <a class="chip" href="${imdbName(p.imdb)}" target="_blank" rel="noopener">IMDb ↗</a>
          </div>
        </div>
        <figure class="prof__portrait" data-tilt="8"><img src="${p.img.portrait}" alt="${esc(p.name)}" data-tilt-inner /></figure>
      </div>
    </header>

    <div class="wrap">
      <dl class="prof__facts" data-reveal="stagger">
        ${fact(ui.born, p.born ? esc(fmtDate(p.born)) : np)}
        ${fact(ui.age, age != null ? `${age} ${esc(t(ui.years))}` : np)}
        ${fact(ui.birthplace, p.birthplace ? esc(t(p.birthplace)) : np)}
        ${fact(ui.raised, p.raised ? esc(t(p.raised)) : p.birthplace ? esc(t(p.birthplace)) : np)}
        ${fact(ui.country, esc(t(p.country)))}
        ${fact(ui.lives, p.lives ? esc(t(p.lives)) : np)}
        ${fact(ui.role, cl ? `<a href="${cl}" data-title="${esc(t(p.role))}">${esc(t(p.role))}</a>` : esc(t(p.role)))}
        ${fact({ de: 'Filme & Serien', en: 'Credits' }, `${p.credits.length}+`)}
      </dl>

      <section class="prof__block">
        <p class="kicker">${lang === 'de' ? 'Biografie' : 'Biography'}</p>
        <div class="prof__text">
          ${p.bio.map((b) => `<p class="body-l" data-reveal="fade">${esc(t(b))}</p>`).join('')}
          ${p.quote ? `<blockquote class="prof__quote" data-reveal="fade">${esc(t(p.quote))}</blockquote>` : ''}
        </div>
      </section>
    </div>

    <section class="prof__impact">
      <div class="wrap">
        <p class="kicker"><span class="num">★</span>${esc(t(ui.impact))}</p>
        <p class="lead" data-reveal="lines">${esc(t(p.impact))}</p>
      </div>
    </section>

    <section class="prof__gallery">
      <div class="wrap"><p class="kicker">${esc(t(ui.gallery))} · ${photos.length}</p></div>
      <div class="strip" data-cursor="${esc(t(ui.drag))}">
        ${photos.map((src) => `<button class="strip__item" data-lb="${src}" type="button"><img src="${src}" alt="" loading="lazy" draggable="false" /></button>`).join('')}
      </div>
    </section>

    <div class="wrap">
      <section class="prof__block">
        <div class="kicker">${esc(t(ui.filmography))}</div>
        <div>
          <p class="mono muted" style="margin-bottom:18px">${esc(t(ui.filmographyHint))}</p>
          <div class="films">
            ${p.credits
              .map(
                (c) => `
              <a class="film-row ${c.tt === 'tt37287335' ? 'is-obs' : ''}" href="${imdbTitle(c.tt, t(c.t))}" target="_blank" rel="noopener">
                <span class="mono muted">${esc(c.y)}</span>
                <span class="film-row__t">${esc(t(c.t))}</span>
                <span class="film-row__r">${esc(t(c.r))}</span>
                <span class="mono muted film-row__k">${esc(t(c.k))}</span>
                <span class="film-row__arrow">↗</span>
              </a>`,
              )
              .join('')}
          </div>
        </div>
      </section>

      ${
        p.upcoming?.length
          ? `<section class="prof__block">
        <div class="kicker">${esc(t(ui.upcoming))}</div>
        <div class="upcoming" data-reveal="stagger">
          ${p.upcoming
            .map(
              (u) => `
            <a class="up" href="${u.tt ? imdbTitle(u.tt) : imdbName(p.imdb)}" target="_blank" rel="noopener">
              <span class="chip chip--red">${esc(t(u.status))}</span>
              <span class="mono muted">${esc(t(u.y))}</span>
              <h4>${esc(t(u.t))}</h4>
              <p>${esc(t(u.r))}</p>
            </a>`,
            )
            .join('')}
        </div>
      </section>`
          : ''
      }

      ${
        p.facts?.length
          ? `<section class="prof__block">
        <div class="kicker">${esc(t(ui.facts))}</div>
        <div>
          <ul class="factlist">${p.facts.map((f, i) => `<li><span class="mono red">${String(i + 1).padStart(2, '0')}</span><span>${esc(t(f))}</span></li>`).join('')}</ul>
          <div class="prof__links">
            <a class="btn" href="${imdbName(p.imdb)}" target="_blank" rel="noopener" data-magnet="0.2">${esc(t(ui.imdbProfile))} <span class="arrow">↗</span></a>
            ${cl ? `<a class="btn" href="${cl}" data-title="${esc(t(p.role))}" data-magnet="0.2">${lang === 'de' ? 'Zur Figur' : 'To the character'} <span class="arrow">→</span></a>` : ''}
            <a class="btn" href="index.html#cast" data-magnet="0.2">${esc(t(ui.allCast))} <span class="arrow">↗</span></a>
          </div>
        </div>
      </section>`
          : `<div class="prof__links" style="margin-top:60px"><a class="btn" href="${imdbName(p.imdb)}" target="_blank" rel="noopener">${esc(t(ui.imdbProfile))} <span class="arrow">↗</span></a><a class="btn" href="index.html#cast">${esc(t(ui.allCast))} <span class="arrow">↗</span></a></div>`
      }
    </div>

    <div class="prof__next" role="button" tabindex="0" aria-label="${esc(t(ui.nextUp))}: ${esc(next.name)}">
      <img src="${next.img.stills[0] || next.img.portrait}" alt="" loading="lazy" />
      <div class="wrap prof__nextin">
        <p class="kicker">${esc(t(ui.nextUp))} · ${esc(t(next.role))}</p>
        <p class="prof__nextname display">${esc(next.name)}</p>
        <p class="mono muted">${esc(t(ui.keepScrolling))} ↓</p>
        <div class="prof__nextbar"><i></i></div>
      </div>
    </div>
  </article>`;
}

boot({ footer: true });

createFeed({
  items: people,
  param: 'p',
  href: (p) => `person.html?p=${p.slug}`,
  title: (p) => p.name,
  dock: (p) => p.img.portrait,
  render,
  end: () => `<section class="feed-end wrap"><p class="kicker no-line">${lang === 'de' ? 'Das war der komplette Cast' : 'That was the full cast'}</p><p class="h-xl">OBSESSION</p><a class="btn btn--red" href="index.html#cast">${esc(t(ui.backHome))} <span class="arrow">→</span></a></section>`,
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
