// „Das Phänomen": Zähler 750 K → 519 Mio., Wochenend-Chart, Rekorde, Märkte, Vergleich, Zeitleiste.
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$, esc } from '../core/dom.js';
import { t, lang, fmtMoney, fmtNumber } from '../core/i18n.js';
import { sections } from '../data/site.js';
import { headline, weekends, markets, comparison, records, timeline, whyItWorked, fairNote } from '../data/phenomenon.js';
import { M } from '../data/media.js';

export function phenomenonHTML() {
  const s = sections.phaenomen;
  const maxW = Math.max(...weekends.map((w) => w.g));
  const maxM = markets[1].g; // USA separat, sonst dominiert der Balken
  const maxC = Math.max(...comparison.map((c) => c.g));
  const mult = Math.round(headline.gross / headline.budget);
  return `
  <section class="section pheno" id="phaenomen">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
    </div>

    <div class="counter">
      <div class="counter__pin">
        <video class="counter__bg" muted loop playsinline preload="none" poster="${M.video.party}.jpg" aria-hidden="true">
          <source src="${M.video.party}.webm" type="video/webm" /><source src="${M.video.party}.mp4" type="video/mp4" />
        </video>
        <div class="counter__inner wrap">
          <p class="mono counter__label">${lang === 'de' ? 'Budget' : 'Budget'} <span class="counter__arrow">→</span> ${lang === 'de' ? 'Einspiel weltweit' : 'Worldwide gross'}</p>
          <p class="counter__num display"><span class="cur">${lang === 'de' ? '' : '$'}</span><span class="counter__val">750.000</span><span class="cur">${lang === 'de' ? ' $' : ''}</span></p>
          <div class="counter__row">
            <div><span class="display counter__mult">×<span class="counter__multv">1</span></span><span class="mono muted">${lang === 'de' ? 'des Budgets' : 'the budget'}</span></div>
            <div><span class="display">${fmtMoney(headline.domestic, { compact: true })}</span><span class="mono muted">${lang === 'de' ? 'USA & Kanada' : 'US & Canada'}</span></div>
            <div><span class="display">${fmtMoney(headline.international, { compact: true })}</span><span class="mono muted">${lang === 'de' ? 'Rest der Welt' : 'Rest of world'}</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="pheno__block">
        <div class="pheno__blockhead">
          <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Die Kurve, die es nicht geben dürfte' : 'The curve that shouldn\'t exist'}</h3>
          <p class="body-l" data-reveal="fade">${
            lang === 'de'
              ? 'Normalerweise verliert ein Horrorfilm am zweiten Wochenende 50–60 %. Obsession legte zu. Und dann noch einmal.'
              : 'A horror film usually drops 50–60% in its second weekend. Obsession went up. And then up again.'
          }</p>
        </div>
        <div class="wchart" role="img" aria-label="${lang === 'de' ? 'Einspiel pro Wochenende in den USA' : 'US weekend grosses'}">
          ${weekends
            .map((w, i) => {
              const ch = i > 0 ? Math.round(((w.g - weekends[i - 1].g) / weekends[i - 1].g) * 100) : null;
              return `
            <div class="wchart__col ${i > 0 && i < 3 ? 'is-up' : ''}">
              <span class="wchart__val mono">${fmtMoney(w.g, { compact: true })}</span>
              <span class="wchart__bar" style="--h:${(w.g / maxW) * 100}%"></span>
              <span class="wchart__ch mono ${ch > 0 ? 'is-pos' : ''}">${ch === null ? (lang === 'de' ? 'Start' : 'Open') : `${ch > 0 ? '+' : ''}${ch}%`}</span>
              <span class="wchart__lbl mono">${lang === 'de' ? 'WE' : 'WK'} ${w.w}</span>
            </div>`;
            })
            .join('')}
        </div>
      </div>

      <div class="records" data-reveal="stagger">
        ${records
          .map(
            (r, i) => `
          <article class="record">
            <span class="mono red">${String(i + 1).padStart(2, '0')}</span>
            <h4 class="h-m">${esc(t(r.k))}</h4>
            <p>${esc(t(r.v))}</p>
          </article>`,
          )
          .join('')}
      </div>

      <div class="pheno__split">
        <div class="pheno__col">
          <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Die Welt ist obsessed' : 'The world is obsessed'}</h3>
          <p class="mono muted" style="margin:14px 0 30px">${lang === 'de' ? 'Top-Märkte · Einspiel in US-Dollar' : 'Top markets · gross in USD'}</p>
          <ul class="hbars">
            ${markets
              .map(
                (m, i) => `
              <li class="hbar ${m.hl ? 'is-hl' : ''}">
                <span class="hbar__c">${esc(t(m.c))}</span>
                <span class="hbar__track"><span class="hbar__fill" style="--w:${i === 0 ? 100 : (m.g / maxM) * 62}%"></span></span>
                <span class="hbar__v mono">${fmtMoney(m.g, { compact: true })}</span>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
        <div class="pheno__col">
          <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Kleines Budget, großer Horror' : 'Small budget, big horror'}</h3>
          <p class="mono muted" style="margin:14px 0 30px">${lang === 'de' ? 'Budget → Einspiel weltweit' : 'Budget → worldwide gross'}</p>
          <ul class="compare">
            ${comparison
              .map(
                (c) => `
              <li class="cmp ${c.hl ? 'is-hl' : ''}">
                <div class="cmp__top"><span class="cmp__t">${esc(c.t)} <span class="muted">(${c.y})</span></span><span class="mono">×${fmtNumber(Math.round(c.g / c.b))}</span></div>
                <div class="cmp__bar"><span class="cmp__fill" style="--w:${(c.g / maxC) * 100}%"></span></div>
                <div class="cmp__nums mono muted"><span>${fmtMoney(c.b, { compact: true })}</span><span>${fmtMoney(c.g, { compact: true })}</span></div>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
      </div>

      <div class="why">
        <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Warum gerade dieser Film?' : 'Why this film?'}</h3>
        <div class="why__grid" data-reveal="stagger">
          ${whyItWorked.map((w, i) => `<article class="why__item"><span class="mono red">0${i + 1}</span><h4 class="h-m">${esc(t(w.t))}</h4><p>${esc(t(w.x))}</p></article>`).join('')}
        </div>
      </div>
    </div>

    <div class="tline">
      <div class="tline__pin">
        <div class="wrap tline__head">
          <p class="kicker">${lang === 'de' ? 'Vom YouTube-Kanal zum Rekord' : 'From YouTube channel to record'}</p>
        </div>
        <div class="tline__track">
          <span class="tline__rail"></span>
          ${timeline
            .map(
              (e) => `
            <article class="tl">
              <span class="tl__dot"></span>
              <p class="mono red tl__d">${esc(t(e.d))}</p>
              <h4 class="h-m">${esc(t(e.t))}</h4>
              <p>${esc(t(e.x))}</p>
            </article>`,
            )
            .join('')}
        </div>
      </div>
    </div>

    <div class="wrap">
      <aside class="fair" data-reveal="fade">
        <p class="mono red">${lang === 'de' ? 'Zur Einordnung' : 'For context'}</p>
        <p>${esc(t(fairNote))}</p>
      </aside>
    </div>
  </section>`;
}

export function initPhenomenon() {
  // Zähler 750.000 → 519.022.133, an den Scroll gekoppelt
  const val = $('.counter__val');
  const mult = $('.counter__multv');
  const bg = $('.counter__bg');
  const obj = { v: headline.budget };
  const fmt = (v) => fmtNumber(Math.round(v));
  ScrollTrigger.create({
    trigger: '.counter',
    start: 'top top',
    end: '+=140%',
    pin: '.counter__pin',
    scrub: 0.4,
    onEnter: () => bg.play().catch(() => {}),
    onEnterBack: () => bg.play().catch(() => {}),
    onLeave: () => bg.pause(),
    onLeaveBack: () => bg.pause(),
    onUpdate: (self) => {
      const p = gsap.parseEase('power2.in')(self.progress);
      obj.v = headline.budget + (headline.gross - headline.budget) * p;
      val.textContent = fmt(obj.v);
      mult.textContent = fmt(obj.v / headline.budget);
      bg.style.opacity = String(0.15 + self.progress * 0.35);
      bg.style.filter = `blur(${8 - self.progress * 6}px) saturate(${0.6 + self.progress * 0.6})`;
    },
  });
  gsap.from('.counter__row > div', { opacity: 0, y: 30, stagger: 0.1, scrollTrigger: { trigger: '.counter', start: 'top top', end: '+=60%', scrub: true } });

  // Balken wachsen
  $$('.wchart__col').forEach((c, i) => {
    gsap.from(c.querySelector('.wchart__bar'), {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 1.4,
      ease: 'expo.out',
      delay: i * 0.06,
      scrollTrigger: { trigger: '.wchart', start: 'top 80%' },
    });
    gsap.from(c.querySelectorAll('.wchart__val, .wchart__ch'), { opacity: 0, y: 10, duration: 0.8, delay: 0.4 + i * 0.06, scrollTrigger: { trigger: '.wchart', start: 'top 80%' } });
  });
  $$('.hbar__fill, .cmp__fill').forEach((f) => {
    gsap.from(f, { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 92%' } });
  });

  // Zeitleiste: am Desktop horizontal gepinnt, auf Tablet-Hochformat und Handy senkrecht
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const track = $('.tline__track');
    const dist = () => track.scrollWidth - window.innerWidth + 80;
    const tw = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: '.tline', start: 'top top', end: () => `+=${dist()}`, pin: '.tline__pin', scrub: 0.8, invalidateOnRefresh: true },
    });
    gsap.fromTo('.tline__rail', { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left', scrollTrigger: { trigger: '.tline', start: 'top top', end: () => `+=${dist()}`, scrub: 0.8, invalidateOnRefresh: true } });
    $$('.tl').forEach((n) => gsap.from(n, { opacity: 0.15, y: 40, duration: 0.8, scrollTrigger: { trigger: n, containerAnimation: tw, start: 'left 85%' } }));
  });
  mm.add('(max-width: 860px)', () => {
    gsap.fromTo('.tline__rail', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.tline__track', start: 'top 70%', end: 'bottom 70%', scrub: true } });
    $$('.tl').forEach((n) => gsap.from(n, { opacity: 0, y: 30, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: n, start: 'top 88%' } }));
  });
}
