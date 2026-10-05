// „Cast & Crew" und „Figuren" (horizontal scrollende Galerie).
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$, esc } from '../core/dom.js';
import { t, lang, ageFrom } from '../core/i18n.js';
import { people } from '../data/people.js';
import { characters } from '../data/characters.js';
import { sections, ui } from '../data/site.js';
import { M } from '../data/media.js';

const personUrl = (slug) => `person.html?p=${slug}`;
const charUrl = (slug) => `figur.html?c=${slug}`;

function card(p, i, cls = '') {
  const age = ageFrom(p.born);
  return `
  <a class="pcard ${cls}" href="${personUrl(p.slug)}" data-title="${esc(p.name)}" data-cursor="${esc(t(ui.open))}" data-reveal="fade" data-delay="${(i % 4) * 0.07}">
    <div class="pcard__media" data-tilt="7">
      <img src="${p.img.portrait}" alt="${esc(p.name)}" loading="lazy" data-tilt-inner />
      <span class="pcard__glow"></span>
    </div>
    <div class="pcard__meta">
      <span class="mono pcard__n">${String(i + 1).padStart(2, '0')} / ${String(people.length).padStart(2, '0')}</span>
      <h3 class="pcard__name display">${esc(p.name)}</h3>
      <p class="pcard__role serif-i">${esc(t(p.role))}</p>
      <p class="mono muted pcard__info">${age ? `${age} ${esc(t(ui.years))} · ` : ''}${esc(t(p.birthplace) || t(p.country))}</p>
    </div>
  </a>`;
}

export function castHTML() {
  const s = sections.cast;
  const leads = people.slice(0, 2);
  const support = people.filter((p) => !p.director).slice(2);
  const director = people.find((p) => p.director);
  const di = people.indexOf(director);
  return `
  <section class="section cast" id="cast">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
        <p class="sec-lead body-l" data-reveal="fade">${esc(t(s.lead))}</p>
      </div>
      <div class="cast__leads">${leads.map((p, i) => card(p, i, 'pcard--lead')).join('')}</div>
      <div class="cast__support">${support.map((p, i) => card(p, i + 2)).join('')}</div>

      <a class="director" href="${personUrl(director.slug)}" data-title="${esc(director.name)}" data-cursor="${esc(t(ui.open))}">
        <div class="director__media media" data-reveal="img"><img src="${M.commons.trio}" alt="Michael Johnston, Curry Barker, Inde Navarrette" loading="lazy" data-parallax="0.06" /></div>
        <div class="director__text">
          <p class="kicker"><span class="num">${String(di + 1).padStart(2, '0')}</span>${esc(t(ui.director))}</p>
          <h3 class="h-xl" data-reveal="lines">${esc(director.name)}</h3>
          <p class="lead" data-reveal="fade">${esc(t(director.tagline))}</p>
          <span class="btn" data-magnet="0.25">${lang === 'de' ? 'Zum Profil' : 'View profile'} <span class="arrow">→</span></span>
        </div>
      </a>
    </div>
  </section>`;
}

export function charactersHTML() {
  const s = sections.figuren;
  return `
  <section class="chars" id="figuren">
    <div class="chars__pin">
      <div class="chars__head wrap">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-l">${esc(t(s.title))}</h2>
        <p class="mono muted chars__progress"><span class="chars__cur">01</span> / ${String(characters.length).padStart(2, '0')}</p>
      </div>
      <div class="chars__track">
        <div class="chars__intro">
          <p class="lead">${esc(t(s.lead))}</p>
          <p class="mono muted">${lang === 'de' ? 'Scrollen →' : 'Scroll →'}</p>
        </div>
        ${characters
          .map((c, i) => {
            const actor = people.find((p) => p.slug === c.actor);
            return `
          <a class="ccard" href="${charUrl(c.slug)}" data-title="${esc(t(c.name))}" data-cursor="${esc(t(ui.open))}" style="--d:${i}">
            <div class="ccard__media"><img src="${c.hero}" alt="" loading="lazy" /></div>
            <span class="ccard__n mono">${String(i + 1).padStart(2, '0')}</span>
            <div class="ccard__body">
              <h3 class="ccard__name display">${esc(t(c.name))}</h3>
              <p class="ccard__tag serif-i">${esc(t(c.tagline))}</p>
              <p class="mono ccard__actor">${actor ? `${esc(t(ui.playedBy))} ${esc(actor.name)}` : '—'}</p>
            </div>
          </a>`;
          })
          .join('')}
        <div class="chars__end"><a class="btn" href="#willow">${lang === 'de' ? 'Weiter zum Willow' : 'On to the Willow'} <span class="arrow">↓</span></a></div>
      </div>
    </div>
  </section>`;
}

export function initCharacters() {
  const track = $('.chars__track');
  const cur = $('.chars__cur');
  const cards = $$('.ccard');
  const dist = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, {
    x: () => -dist(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.chars',
      start: 'top top',
      end: () => `+=${dist()}`,
      pin: '.chars__pin',
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
        cur.textContent = String(i + 1).padStart(2, '0');
      },
    },
  });
  // Parallax im Bild jeder Karte
  cards.forEach((c) => {
    const img = c.querySelector('img');
    gsap.fromTo(img, { xPercent: -12 }, { xPercent: 12, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    gsap.from(c.querySelector('.ccard__name'), { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 80%' } });
  });
}

export { ScrollTrigger };
