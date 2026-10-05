// Startseite: alle Bereiche + Preloader.
import { boot, fontsReady } from './common.js';
import { gsap, ScrollTrigger, scrollTo, lenis } from '../core/scroll.js';
import { $, preloadImages } from '../core/dom.js';
import { t } from '../core/i18n.js';
import { initReveals, initTilt, initMagnets, initYouTube, initMarquees, marquee } from '../core/fx.js';
import { enterPage, restoreScroll } from '../core/layout.js';
import { M } from '../data/media.js';
import { ui } from '../data/site.js';
import { heroHTML, initHero } from '../sections/hero.js';
import { filmHTML, initFilm } from '../sections/film.js';
import { castHTML, charactersHTML, initCharacters } from '../sections/cast.js';
import { willowHTML, initWillow } from '../sections/willow.js';
import { phenomenonHTML, initPhenomenon } from '../sections/phenomenon.js';
import { behindHTML, initBehind } from '../sections/behind.js';
import { fansHTML, initFans, theoriesHTML, initTheories, futureHTML, initFuture, quizHTML, initQuiz } from '../sections/more.js';
import { watchHTML, initWatch } from '../sections/watch.js';

const app = $('#app');
app.innerHTML = [
  heroHTML(),
  filmHTML(),
  castHTML(),
  charactersHTML(),
  willowHTML(),
  phenomenonHTML(),
  behindHTML(),
  marquee(['Obsession', 'Curry Barker', 'Inde Navarrette', 'Michael Johnston'], 'marquee--rev'),
  fansHTML(),
  theoriesHTML(),
  futureHTML(),
  quizHTML(),
  watchHTML(),
].join('');

boot();

function preloaderHTML() {
  return `
  <div class="preloader" aria-hidden="true">
    <div class="preloader__logo">
      <img src="${M.logo.glow}" alt="" />
    </div>
    <p class="preloader__tag">${t(ui.tagline)}</p>
    <div class="preloader__meta mono"><span>${t(ui.fanSite)}</span><span class="preloader__count">000</span></div>
    <span class="preloader__bar"></span>
  </div>`;
}

async function runPreloader() {
  document.body.insertAdjacentHTML('beforeend', preloaderHTML());
  const pre = $('.preloader');
  const count = $('.preloader__count');
  const bar = $('.preloader__bar');
  const logo = $('.preloader__logo');
  const state = { p: 0 };
  let loaded = 0;
  const show = () => {
    count.textContent = String(Math.round(state.p * 100)).padStart(3, '0');
    bar.style.transform = `scaleX(${state.p})`;
  };

  gsap.fromTo(logo, { opacity: 0, scale: 0.94, filter: 'blur(18px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' });
  gsap.to('.preloader__tag', { opacity: 1, duration: 1, delay: 0.8 });
  // Flackern wie ein kaputter Bildschirm
  const flicker = gsap.timeline({ repeat: -1, repeatDelay: 0.9 }).to(logo, { x: 6, skewX: 8, duration: 0.05 }).to(logo, { x: -4, skewX: -4, opacity: 0.6, duration: 0.05 }).to(logo, { x: 0, skewX: 0, opacity: 1, duration: 0.05 });

  const video = $('.hero__video');
  const videoReady = new Promise((res) => {
    if (video.readyState >= 3) res();
    video.addEventListener('canplaythrough', res, { once: true });
    video.addEventListener('canplay', res, { once: true });
    setTimeout(res, 7000);
  });
  const imgs = preloadImages([M.logo.glow, M.logo.glowSmall, M.poster.main, M.still.storeCouple, M.still.wish], (p) => (loaded = p));
  const tick = () => {
    const target = Math.min(0.95, loaded * 0.6 + 0.35);
    state.p += (target - state.p) * 0.08;
    show();
  };
  gsap.ticker.add(tick);
  await Promise.all([imgs, videoReady, fontsReady(), new Promise((r) => setTimeout(r, 1600))]);
  gsap.ticker.remove(tick);
  await gsap.to(state, { p: 1, duration: 0.5, ease: 'power2.out', onUpdate: show });
  flicker.kill();
  await gsap
    .timeline()
    .to(logo, { scale: 1.12, opacity: 0, filter: 'blur(14px)', duration: 0.7, ease: 'expo.in' })
    .to('.preloader__meta, .preloader__tag', { opacity: 0, duration: 0.3 }, 0)
    .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, 0.45);
  pre.remove();
}

async function start() {
  const hero = initHero();
  initFilm();
  initCharacters();
  initPhenomenon();
  initBehind();
  initFans();
  initTheories();
  initFuture();
  initQuiz();
  initWatch();
  initWillow();
  initReveals();
  initTilt();
  initMagnets();
  initYouTube(document);
  initMarquees();

  const skip = document.documentElement.classList.contains('skip-intro');
  try {
    sessionStorage.removeItem('obsession-internal');
  } catch {
    /* egal */
  }
  lenis?.stop();
  if (skip) {
    await fontsReady();
    ScrollTrigger.refresh();
    const y = restoreScroll();
    if (y != null) window.scrollTo(0, y);
    else if (location.hash) scrollTo(location.hash, { immediate: true });
    hero.intro();
    await enterPage();
  } else {
    await runPreloader();
    hero.intro();
  }
  document.body.classList.remove('is-loading');
  lenis?.start();
  ScrollTrigger.refresh();
  if (!skip && location.hash) setTimeout(() => scrollTo(location.hash), 400);
}

start();
window.addEventListener('load', () => ScrollTrigger.refresh());
