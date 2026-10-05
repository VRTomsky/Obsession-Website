// Startbildschirm: interaktives Video (WebGL), Logo, Scroll-Übergang mit Unschärfe & Abdunklung.
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $ } from '../core/dom.js';
import { lang, t } from '../core/i18n.js';
import { M } from '../data/media.js';
import { ui } from '../data/site.js';
import { createHeroGL } from '../three/hero.js';

export function heroHTML() {
  const lines = lang === 'de' ? ['Ein Wunsch.', 'Eine Freundin.', 'Eine Obsession.'] : ['One wish.', 'One friend.', 'One obsession.'];
  return `
  <section class="hero" id="top" aria-label="OBSESSION">
    <div class="hero__pin">
      <div class="hero__stage">
        <div class="hero__gl"></div>
        <video class="hero__video" muted loop playsinline autoplay preload="auto" poster="${M.video.hero}.jpg" aria-hidden="true">
          <source src="${M.video.hero}.webm" type="video/webm" />
          <source src="${M.video.hero}.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="hero__content">
        <p class="hero__kicker mono">${t(ui.fanSite)}</p>
        <h1 class="hero__logo"><img src="${M.logo.glow}" alt="OBSESSION" width="2400" height="573" /></h1>
        ${lang === 'de' ? `<p class="hero__sub">${ui.subtitleDe}</p>` : ''}
        <p class="hero__tag serif-i">${t(ui.tagline)}</p>
      </div>
      <div class="hero__statement" aria-hidden="true">
        ${lines.map((l, i) => `<span class="hero__line l${i}">${l}</span>`).join('')}
      </div>
      <div class="hero__bottom">
        <span class="mono hero__meta">${t(ui.heroMeta)}</span>
        <span class="hero__scroll mono"><i></i>${t(ui.scroll)}</span>
        <span class="mono hero__hint">${lang === 'de' ? 'Maus bewegen · gedrückt halten' : 'Move mouse · press & hold'}</span>
      </div>
    </div>
  </section>`;
}

export function initHero() {
  const section = $('.hero');
  const video = $('.hero__video', section);
  const glBox = $('.hero__gl', section);
  const gl = createHeroGL(glBox, video);
  if (gl) section.classList.add('has-gl');

  const play = () => video.play().catch(() => {});
  play();
  document.addEventListener('visibilitychange', () => !document.hidden && play());

  // Gedrückt halten: Zeitlupe + Glitch
  const stage = $('.hero__pin', section);
  stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return;
    video.playbackRate = 0.35;
    gl?.setGlitch(1);
  });
  const release = () => {
    video.playbackRate = 1;
    gl?.setGlitch(0);
  };
  window.addEventListener('pointerup', release);

  // Logo fliegt in die Navigation (oben links)
  const logo = $('.hero__logo', section);
  const navLogo = $('.nav__logo');
  const flyTo = () => {
    const a = logo.getBoundingClientRect();
    const b = navLogo.getBoundingClientRect();
    return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), s: b.width / a.width };
  };
  let fly = flyTo();

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=190%',
      pin: '.hero__pin',
      scrub: 0.6,
      onRefreshInit: () => {
        gsap.set(logo, { x: 0, y: 0, scale: 1 });
        fly = flyTo();
      },
      onUpdate: (self) => gl?.setProgress(Math.min(1, self.progress * 1.35)),
    },
  });
  tl.to(logo, { x: () => fly.x, y: () => fly.y, scale: () => fly.s, duration: 0.3, ease: 'power2.inOut' }, 0)
    .to('.hero__kicker, .hero__sub, .hero__tag, .hero__bottom', { opacity: 0, y: -30, duration: 0.15 }, 0)
    .to(logo, { opacity: 0, duration: 0.04 }, 0.27)
    .fromTo('.hero__line.l0', { opacity: 0, yPercent: 40, filter: 'blur(14px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.12 }, 0.34)
    .fromTo('.hero__line.l1', { opacity: 0, yPercent: 40, filter: 'blur(14px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.12 }, 0.5)
    .fromTo('.hero__line.l2', { opacity: 0, yPercent: 40, filter: 'blur(14px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.12 }, 0.66)
    .to('.hero__statement', { opacity: 0, yPercent: -12, duration: 0.14 }, 0.88);

  return {
    intro() {
      const tl2 = gsap.timeline();
      if (gl) tl2.to(gl.uniforms.uIntro, { value: 1, duration: 2.4, ease: 'power2.out' }, 0);
      else tl2.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 2 }, 0);
      tl2
        .from(logo, { opacity: 0, scale: 1.08, filter: 'blur(20px)', duration: 1.8, ease: 'expo.out' }, 0.2)
        .from('.hero__kicker, .hero__sub, .hero__tag', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: 0.1 }, 0.6)
        .from('.hero__bottom > *', { opacity: 0, y: 16, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.9)
        .add(() => ScrollTrigger.refresh());
      return tl2;
    },
  };
}
