// „Hinter den Kulissen": Zahlen, Prozess, Drehorte-Karte, alternatives Ende, Musik, Trivia.
import { gsap } from '../core/scroll.js';
import { $, $$, esc } from '../core/dom.js';
import { t, lang } from '../core/i18n.js';
import { sections, production, process, locations, ui } from '../data/site.js';
import { trivia, alternateEnding, music } from '../data/film.js';
import { M } from '../data/media.js';

export function behindHTML() {
  const s = sections.kulissen;
  return `
  <section class="section bts" id="kulissen">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
      <div class="bts__nums" data-reveal="stagger">
        ${production.map((p) => `<div class="bnum"><span class="bnum__k display">${esc(p.k)}</span><span class="mono bnum__u">${esc(t(p.u))}</span><p>${esc(t(p.x))}</p></div>`).join('')}
      </div>
    </div>

    <div class="wrap bts__process">
      ${process
        .map(
          (p, i) => `
        <article class="proc ${i % 2 ? 'proc--rev' : ''}">
          <figure class="proc__media media" data-reveal="img"><img src="${p.img}" alt="" loading="lazy" /></figure>
          <div class="proc__text">
            <span class="mono red">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="h-l" data-reveal="lines">${esc(t(p.t))}</h3>
            <p class="body-l" data-reveal="fade">${esc(t(p.x))}</p>
          </div>
        </article>`,
        )
        .join('')}
    </div>

    <div class="wrap">
      <div class="locs">
        <div class="locs__text">
          <p class="kicker">${lang === 'de' ? 'Drehorte' : 'Locations'}</p>
          <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Los Angeles, das San Fernando Valley' : 'Los Angeles, the San Fernando Valley'}</h3>
          <ol class="locs__list">
            ${locations
              .map(
                (l, i) => `<li data-loc="${i}"><span class="mono red">${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(t(l.name))} <span class="muted mono">· ${esc(l.place)}</span></h4><p>${esc(t(l.x))}</p></div></li>`,
              )
              .join('')}
          </ol>
          <p class="mono muted" style="margin-top:20px">${lang === 'de' ? 'Ungefähre Lage – keine Privatadressen.' : 'Approximate areas – no private addresses.'}</p>
        </div>
        <div class="locs__map">
          <div id="loc-map" class="map"></div>
          <div class="consent">
            <p class="mono">${lang === 'de' ? 'Interaktive Karte' : 'Interactive map'}</p>
            <p>${esc(t(ui.mapConsentText))}</p>
            <button type="button" class="btn btn--red" id="loc-map-btn">${esc(t(ui.mapConsentBtn))} <span class="arrow">→</span></button>
          </div>
        </div>
      </div>
    </div>

    <div class="alt">
      <video class="alt__bg" muted loop playsinline preload="none" poster="${M.video.house}.jpg" aria-hidden="true">
        <source src="${M.video.house}.webm" type="video/webm" /><source src="${M.video.house}.mp4" type="video/mp4" />
      </video>
      <div class="wrap alt__inner">
        <p class="kicker">${lang === 'de' ? 'Alternatives Ende' : 'Alternate ending'}</p>
        <h3 class="h-xl" data-reveal="lines">${esc(t(alternateEnding.title))}</h3>
        <p class="lead" data-reveal="fade">${esc(t(alternateEnding.text))}</p>
      </div>
    </div>

    <div class="wrap music">
      <div class="music__disc" data-tilt="10">
        <div class="vinyl"><div class="vinyl__label"><img src="${M.poster.red}" alt="" loading="lazy" /></div></div>
        <img class="music__sleeve" src="${M.poster.roses}" alt="Soundtrack" loading="lazy" />
      </div>
      <div class="music__text">
        <p class="kicker">${lang === 'de' ? 'Musik' : 'Music'}</p>
        <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Der Klang des Uncanny Valley' : 'The sound of the uncanny valley'}</h3>
        <p class="body-l" data-reveal="fade">${esc(t(music.text))}</p>
        <div class="music__facts">
          ${music.facts.map((f) => `<div><span class="display">${esc(f.k)}</span><span class="mono muted">${esc(t(f.v))}</span></div>`).join('')}
        </div>
        <p class="mono muted">${lang === 'de' ? 'Tipp: Oben rechts „Ton" einschalten für die passende Atmosphäre.' : 'Tip: switch on "Sound" (top right) for the right atmosphere.'}</p>
      </div>
    </div>

    <div class="wrap">
      <div class="sec-head sec-head--row" style="margin-top:clamp(80px,10vw,160px)">
        <p class="kicker">${lang === 'de' ? 'Trivia · Fahr mit der Maus über die Karten' : 'Trivia · hover the cards'}</p>
      </div>
      <div class="trivia" data-reveal="stagger">
        ${trivia
          .map(
            (tv) => `
          <div class="tcard" tabindex="0">
            <div class="tcard__in">
              <div class="tcard__front"><span class="display">${esc(tv.k)}</span></div>
              <div class="tcard__back"><p>${esc(lang === 'de' ? tv.de : tv.en)}</p></div>
            </div>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

export function initBehind() {
  // Hintergrundvideos nur im Sichtbereich abspielen
  $$('.alt__bg').forEach((v) => {
    const io = new IntersectionObserver((es) => (es[es.length - 1].isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
  });
  gsap.fromTo('.alt__bg', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.alt', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.to('.vinyl', { rotate: 360 * 3, ease: 'none', scrollTrigger: { trigger: '.music', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.vinyl', { xPercent: 0 }, { xPercent: 38, ease: 'power2.out', scrollTrigger: { trigger: '.music', start: 'top 80%', end: 'top 30%', scrub: true } });

  $('#loc-map-btn').addEventListener('click', async (e) => {
    e.currentTarget.closest('.consent').remove();
    const { makeMap, pulseIcon } = await import('../core/map.js');
    const L = (await import('leaflet')).default;
    const map = await makeMap('loc-map', [34.2, -118.37], 11);
    const markers = locations.map((l, i) =>
      L.marker([l.lat, l.lng], { icon: pulseIcon(String(i + 1)) })
        .addTo(map)
        .bindPopup(`<b>${esc(t(l.name))}</b><br>${esc(l.place)}`),
    );
    $$('.locs__list li').forEach((li) =>
      li.addEventListener('mouseenter', () => {
        const m = markers[li.dataset.loc];
        map.flyTo(m.getLatLng(), 13, { duration: 0.8 });
        m.openPopup();
      }),
    );
  });
}
