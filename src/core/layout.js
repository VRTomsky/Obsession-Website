// Gemeinsames Seitengerüst: Navigation, Vollbild-Menü, Footer, Korn, Vorhang, Sprache, Sound.
import { gsap } from 'gsap';
import { lang, t, setLang } from './i18n.js';
import { $, $$, esc } from './dom.js';
import { M } from '../data/media.js';
import { nav, menu, ui, sources } from '../data/site.js';
import { toggleSound, onSoundChange } from './sound.js';
import { scrollTo, stopScroll, startScroll } from './scroll.js';

const isIndex = () => document.body.dataset.page === 'index';
const home = 'index.html';

function sectionHref(id) {
  if (isIndex()) return `#${id}`;
  return id === 'top' ? home : `${home}#${id}`;
}

function navHTML() {
  return `
  <header class="nav" id="nav">
    <a class="nav__logo" href="${isIndex() ? '#top' : home}" data-link="top" aria-label="OBSESSION – ${esc(t(ui.backHome))}">
      <img src="${M.logo.glowSmall}" alt="OBSESSION" width="927" height="220" />
    </a>
    <nav class="nav__links" aria-label="Hauptnavigation">
      ${nav.map((n) => `<a class="nav__link" href="${sectionHref(n.id)}" data-link="${n.id}">${esc(t(n.label))}</a>`).join('')}
    </nav>
    <div class="nav__tools">
      <div class="lang" role="group" aria-label="Sprache / Language">
        <button type="button" data-lang="de" class="${lang === 'de' ? 'is-active' : ''}" aria-pressed="${lang === 'de'}">DE</button>
        <button type="button" data-lang="en" class="${lang === 'en' ? 'is-active' : ''}" aria-pressed="${lang === 'en'}">EN</button>
      </div>
      <button type="button" class="icon-btn" id="sound-btn" aria-pressed="false" title="${esc(t(ui.sound))}">
        <span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span class="sound-label">${esc(t(ui.soundOff))}</span>
      </button>
      <button type="button" class="icon-btn" id="menu-btn" aria-expanded="false" aria-controls="menu">
        <span class="burger" aria-hidden="true"><i></i><i></i></span>${esc(t(ui.menu))}
      </button>
    </div>
  </header>
  <div class="progress" id="progress"></div>`;
}

function menuHTML() {
  return `
  <div class="menu" id="menu" aria-hidden="true">
    <button type="button" class="icon-btn menu__close" id="menu-close">${esc(t(ui.close))} ✕</button>
    <nav class="menu__list">
      ${menu
        .map(
          (m, i) =>
            `<a class="menu__item" href="${sectionHref(m.id)}" data-link="${m.id}" data-i="${i}"><span class="n">${String(i).padStart(2, '0')}</span><span>${esc(t(m.label))}</span></a>`,
        )
        .join('')}
    </nav>
    <div class="menu__preview">${menu.map((m, i) => `<img src="${m.img}" alt="" data-i="${i}" loading="lazy" />`).join('')}</div>
    <p class="menu__foot mono">${esc(t(ui.fanSite))} · Obsession (2025) · Curry Barker</p>
  </div>`;
}

function footerHTML() {
  return `
  <footer class="footer">
    <div class="wrap">
      <p class="kicker no-line">${esc(t(ui.tagline))}</p>
      <div class="footer__logo" data-reveal="fade"><img src="${M.logo.glow}" alt="OBSESSION" loading="lazy" width="2400" height="573" /></div>
      <div class="footer__grid">
        <div>
          <h4 class="mono">${esc(t(ui.fanSite))}</h4>
          <p class="muted" style="max-width:420px">${
            lang === 'de'
              ? 'Gebaut aus Liebe zum Film. Alle Infos sorgfältig recherchiert, Stand Oktober 2026. Interpretationen sind als solche gekennzeichnet.'
              : 'Built out of love for the film. All information carefully researched as of October 2026. Interpretations are marked as such.'
          }</p>
        </div>
        <div>
          <h4 class="mono">${lang === 'de' ? 'Entdecken' : 'Explore'}</h4>
          <ul>${nav.map((n) => `<li><a href="${sectionHref(n.id)}" data-link="${n.id}">${esc(t(n.label))}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4 class="mono">${lang === 'de' ? 'Quellen' : 'Sources'}</h4>
          <ul>${sources.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4 class="mono">${lang === 'de' ? 'Sprache' : 'Language'}</h4>
          <ul>
            <li><a href="#" data-lang="de">Deutsch</a></li>
            <li><a href="#" data-lang="en">English</a></li>
          </ul>
          <h4 class="mono" style="margin-top:28px">${lang === 'de' ? 'Offiziell' : 'Official'}</h4>
          <ul>
            <li><a href="https://www.focusfeatures.com/obsession" target="_blank" rel="noopener">Focus Features</a></li>
            <li><a href="https://www.imdb.com/title/tt37287335/" target="_blank" rel="noopener">IMDb</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__legal">
        <p>${esc(t(ui.copyright))} ${
          lang === 'de'
            ? 'Fotos von Wikimedia Commons unter den jeweiligen Creative-Commons-Lizenzen; Szenenbilder über TMDB. Keine Cookies, kein Tracking. Standort und externe Inhalte (YouTube, Karten) werden nur nach ausdrücklichem Klick geladen.'
            : 'Photos from Wikimedia Commons under their respective Creative Commons licenses; stills via TMDB. No cookies, no tracking. Location and external content (YouTube, maps) are only loaded after an explicit click.'
        }</p>
        <a href="#top" data-link="top" class="mono">↑ ${lang === 'de' ? 'Nach oben' : 'Back to top'}</a>
      </div>
    </div>
  </footer>`;
}

function curtainHTML() {
  return `<div class="curtain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><div class="curtain__title"></div></div>`;
}

function grain() {
  const c = document.createElement('canvas');
  c.width = c.height = 220;
  const g = c.getContext('2d');
  const img = g.createImageData(220, 220);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const node = document.createElement('div');
  node.className = 'grain';
  node.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  document.body.appendChild(node);
}

/* ---------- Seitenwechsel ---------- */
export function leaveTo(url, title = '') {
  const cur = $('.curtain');
  const cols = $$('.curtain i');
  const ttl = $('.curtain__title');
  ttl.textContent = title;
  cur.style.pointerEvents = 'auto';
  gsap
    .timeline({ onComplete: () => (window.location.href = url) })
    .set(cols, { transformOrigin: 'bottom' })
    .to(cols, { scaleY: 1, duration: 0.7, ease: 'expo.inOut', stagger: 0.06 })
    .to(ttl, { opacity: 1, duration: 0.35 }, '-=0.25');
  try {
    sessionStorage.setItem('obsession-internal', '1');
  } catch {
    /* egal */
  }
}

export function enterPage() {
  const cols = $$('.curtain i');
  const html = document.documentElement;
  if (!html.classList.contains('is-entering')) return Promise.resolve();
  gsap.set(cols, { scaleY: 1 });
  html.classList.remove('is-entering');
  return new Promise((res) => {
    gsap.to(cols, { scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'expo.inOut', stagger: 0.06, onComplete: res });
  });
}

/* ---------- Menü ---------- */
function initMenu() {
  const m = $('#menu');
  const btn = $('#menu-btn');
  const imgs = $$('.menu__preview img');
  const items = $$('.menu__item');
  let open = false;

  const show = (i) => imgs.forEach((im) => im.classList.toggle('is-on', im.dataset.i === String(i)));
  items.forEach((it) => it.addEventListener('pointerenter', () => show(it.dataset.i)));

  const setOpen = (v) => {
    open = v;
    btn.setAttribute('aria-expanded', String(v));
    m.setAttribute('aria-hidden', String(!v));
    if (v) {
      stopScroll();
      show(0);
      gsap.set(m, { visibility: 'visible' });
      gsap.to(m, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(items, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.035, delay: 0.35 });
    } else {
      gsap.to(m, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(m, { visibility: 'hidden' }),
      });
      startScroll();
    }
  };
  btn.addEventListener('click', () => setOpen(!open));
  $('#menu-close').addEventListener('click', () => setOpen(false));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && open && setOpen(false));
  return { close: () => open && setOpen(false) };
}

/* ---------- Links (Anker auf der Startseite, Übergang auf Unterseiten) ---------- */
function initLinks(menuApi) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;

    const langBtn = a.dataset.lang;
    if (langBtn) {
      e.preventDefault();
      switchLang(langBtn);
      return;
    }

    const href = a.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#')) {
      e.preventDefault();
      menuApi.close();
      const id = href.slice(1);
      setTimeout(() => scrollTo(id === 'top' ? 0 : `#${id}`), 10);
      return;
    }

    // Interne Seiten: mit Vorhang
    const internal = /^(index|person|figur)\.html/.test(href) || a.dataset.transition !== undefined;
    if (internal) {
      e.preventDefault();
      menuApi.close();
      leaveTo(href, a.dataset.title || '');
    }
  });
}

function switchLang(next) {
  if (next === lang) return;
  setLang(next);
  try {
    sessionStorage.setItem('obsession-scroll', String(window.scrollY));
  } catch {
    /* egal */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('lang');
  leaveTo(url.toString(), next === 'de' ? 'Deutsch' : 'English');
}

function initLangButtons() {
  $$('.lang button').forEach((b) => b.addEventListener('click', () => switchLang(b.dataset.lang)));
}

function initSoundButton() {
  const btn = $('#sound-btn');
  const label = btn.querySelector('.sound-label');
  btn.addEventListener('click', () => toggleSound());
  onSoundChange((on) => {
    btn.setAttribute('aria-pressed', String(on));
    label.textContent = t(on ? ui.soundOn : ui.soundOff);
  });
}

function initNavState() {
  const navEl = $('#nav');
  const prog = $('#progress');
  const onScroll = () => {
    navEl.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.6);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Aktiven Bereich markieren
  if (isIndex()) {
    const links = $$('.nav__link');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.dataset.link === en.target.id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    nav.forEach((n) => {
      const s = document.getElementById(n.id);
      if (s) obs.observe(s);
    });
  }
}

export function initLayout({ footer = true } = {}) {
  document.body.insertAdjacentHTML('afterbegin', navHTML() + menuHTML());
  if (footer) document.body.insertAdjacentHTML('beforeend', footerHTML());
  document.body.insertAdjacentHTML('beforeend', curtainHTML());
  grain();
  const menuApi = initMenu();
  initLinks(menuApi);
  initLangButtons();
  initSoundButton();
  initNavState();
  try {
    if (sessionStorage.getItem('obsession-sound') === '1') {
      // Browser erlauben Audio erst nach Interaktion – beim ersten Klick wieder einschalten.
      window.addEventListener('pointerdown', () => toggleSound(true), { once: true });
    }
  } catch {
    /* egal */
  }
}

export function restoreScroll() {
  try {
    const y = sessionStorage.getItem('obsession-scroll');
    if (y) {
      sessionStorage.removeItem('obsession-scroll');
      return parseFloat(y);
    }
  } catch {
    /* egal */
  }
  return null;
}
