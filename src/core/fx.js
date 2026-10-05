// Wiederverwendbare Effekte: Text-/Bild-Reveals, Parallax, 3D-Tilt, Magnet, Lightbox, YouTube-2-Klick, Marquee.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { $, $$, esc, reducedMotion } from './dom.js';
import { t } from './i18n.js';
import { ui } from '../data/site.js';
import { M } from '../data/media.js';
import { stopScroll, startScroll } from './scroll.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initReveals(root = document) {
  const rm = reducedMotion();

  $$('[data-reveal="lines"]', root).forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    if (rm) return;
    const split = SplitText.create(node, { type: 'lines', mask: 'lines', linesClass: 'split-line-inner' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.25,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: node, start: 'top 88%' },
    });
  });

  $$('[data-reveal="chars"]', root).forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    if (rm) return;
    const split = SplitText.create(node, { type: 'words,chars', mask: 'chars', charsClass: 'split-char', wordsClass: 'split-word' });
    gsap.from(split.chars, {
      yPercent: 115,
      rotate: 6,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.025,
      scrollTrigger: { trigger: node, start: 'top 90%' },
    });
  });

  $$('[data-reveal="fade"]', root).forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    if (rm) return;
    gsap.from(node, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      delay: parseFloat(node.dataset.delay || 0),
      scrollTrigger: { trigger: node, start: 'top 90%' },
    });
  });

  $$('[data-reveal="stagger"]', root).forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    if (rm) return;
    gsap.from(node.children, {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: node, start: 'top 85%' },
    });
  });

  $$('[data-reveal="img"]', root).forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    if (rm) return;
    const inner = node.querySelector('img, video') || node;
    const tl = gsap.timeline({ scrollTrigger: { trigger: node, start: 'top 85%' } });
    tl.fromTo(node, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }).fromTo(
      inner,
      { scale: 1.35 },
      { scale: 1, duration: 1.8, ease: 'expo.out' },
      0.1,
    );
  });

  $$('[data-parallax]', root).forEach((node) => {
    if (node.dataset.pdone || rm) return;
    node.dataset.pdone = '1';
    const amt = parseFloat(node.dataset.parallax) || 0.15;
    gsap.fromTo(
      node,
      { yPercent: -amt * 100 },
      {
        yPercent: amt * 100,
        ease: 'none',
        scrollTrigger: { trigger: node.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  $$('[data-count]', root).forEach((node) => {
    if (node.dataset.cdone) return;
    node.dataset.cdone = '1';
    const to = parseFloat(node.dataset.count);
    const dec = parseInt(node.dataset.dec || '0', 10);
    const fmt = (v) => new Intl.NumberFormat(document.documentElement.lang === 'de' ? 'de-DE' : 'en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
    const obj = { v: 0 };
    if (rm) {
      node.textContent = fmt(to);
      return;
    }
    gsap.to(obj, {
      v: to,
      duration: 2.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: node, start: 'top 90%' },
      onUpdate: () => (node.textContent = fmt(obj.v)),
    });
  });
}

/** 3D-Neigung bei Mausbewegung. */
export function initTilt(root = document) {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('[data-tilt]', root).forEach((node) => {
    if (node.dataset.tdone) return;
    node.dataset.tdone = '1';
    const max = parseFloat(node.dataset.tilt) || 10;
    const inner = node.querySelector('[data-tilt-inner]');
    node.style.transformStyle = 'preserve-3d';
    const rx = gsap.quickTo(node, 'rotationX', { duration: 0.7, ease: 'power3' });
    const ry = gsap.quickTo(node, 'rotationY', { duration: 0.7, ease: 'power3' });
    gsap.set(node, { transformPerspective: 900 });
    node.addEventListener('pointermove', (e) => {
      const r = node.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      rx(-y * max);
      ry(x * max);
      if (inner) gsap.to(inner, { x: x * 18, y: y * 18, duration: 0.7, ease: 'power3' });
      node.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      node.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    });
    node.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.9, ease: 'power3' });
    });
  });
}

/** Magnetische Buttons. */
export function initMagnets(root = document) {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('[data-magnet]', root).forEach((node) => {
    if (node.dataset.mdone) return;
    node.dataset.mdone = '1';
    const s = parseFloat(node.dataset.magnet) || 0.3;
    node.addEventListener('pointermove', (e) => {
      const r = node.getBoundingClientRect();
      gsap.to(node, { x: (e.clientX - r.left - r.width / 2) * s, y: (e.clientY - r.top - r.height / 2) * s, duration: 0.6, ease: 'power3' });
    });
    node.addEventListener('pointerleave', () => gsap.to(node, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }));
  });
}

/* ---------- Lightbox ---------- */
let lb = null;
function lbShow(i) {
  const list = lb._list;
  lb._i = (i + list.length) % list.length;
  const img = lb.querySelector('img');
  gsap.fromTo(img, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
  img.src = list[lb._i];
  lb.querySelector('.lb-count').textContent = `${lb._i + 1} / ${list.length}`;
}
function lbClose() {
  lb.classList.remove('is-open');
  startScroll();
}
export function openLightbox(list, index = 0) {
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.innerHTML = `<button class="icon-btn lightbox__close" type="button">${esc(t(ui.close))} ✕</button><img alt="" draggable="false" /><div class="lightbox__nav"><button class="icon-btn" data-d="-1" type="button" aria-label="Zurück">←</button><span class="mono lb-count" style="align-self:center"></span><button class="icon-btn" data-d="1" type="button" aria-label="Weiter">→</button></div>`;
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => {
      const d = e.target.closest('[data-d]');
      if (d) return lbShow(lb._i + parseInt(d.dataset.d, 10));
      if (e.target === lb || e.target.closest('.lightbox__close')) lbClose();
    });
    window.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') lbClose();
      if (e.key === 'ArrowRight') lbShow(lb._i + 1);
      if (e.key === 'ArrowLeft') lbShow(lb._i - 1);
    });
    // Wischen auf Touch-Geräten
    let sx = null;
    lb.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) lbShow(lb._i + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }
  lb._list = list;
  lbShow(index);
  lb.classList.add('is-open');
  stopScroll();
}

/* ---------- YouTube (2-Klick) ---------- */
export function ytFacade(v, opts = {}) {
  const thumb = M.yt(v.id);
  return `
  <div class="yt" data-yt="${v.id}" data-cursor="${esc(t(ui.play))}">
    <img src="${thumb}" alt="" loading="lazy" onerror="this.src='${M.ytHq(v.id)}'" />
    <div class="yt__shade"></div>
    <div class="yt__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
    <div class="yt__meta">
      <span class="mono">${esc(v.by)} · ${esc(v.len)}</span>
      <span class="yt__title">${esc(t(v.title))}</span>
    </div>
    ${opts.consent === false ? '' : ''}
  </div>`;
}

export function initYouTube(root = document) {
  root.addEventListener('click', (e) => {
    const box = e.target.closest('[data-yt]');
    if (!box || box.dataset.state === 'consent' || box.querySelector('iframe')) return;
    const id = box.dataset.yt;
    box.dataset.state = 'consent';
    const c = document.createElement('div');
    c.className = 'consent';
    c.innerHTML = `<p class="mono">${esc(t(ui.ytConsentTitle))}</p><p>${esc(t(ui.ytConsentText))}</p><button type="button" class="btn btn--red">${esc(t(ui.ytConsentBtn))} <span class="arrow">→</span></button>`;
    box.appendChild(c);
    c.querySelector('button').addEventListener('click', (ev) => {
      ev.stopPropagation();
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.title = 'YouTube';
      box.innerHTML = '';
      box.appendChild(f);
      box.dataset.state = 'playing';
    });
  });
}

/* ---------- Endlos-Laufband, Tempo reagiert aufs Scrollen ---------- */
export function marquee(items, cls = '') {
  const star = '<svg class="star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0l2.9 8.6H24l-7.3 5.4 2.8 8.7L12 17.3l-7.5 5.4 2.8-8.7L0 8.6h9.1z"/></svg>';
  const row = items.map((it, i) => `<span class="marquee__item"><span class="${i % 2 ? 'o' : ''}">${esc(it)}</span>${star}</span>`).join('');
  return `<div class="marquee ${cls}" aria-hidden="true"><div class="marquee__track">${row}${row}${row}${row}</div></div>`;
}

export function initMarquees(root = document) {
  // Gleichmäßiges Tempo (Pixel pro Sekunde), unabhängig von Bildrate und Scrollen
  const SPEED = 70;
  $$('.marquee', root).forEach((m) => {
    if (m.dataset.done) return;
    m.dataset.done = '1';
    const track = m.querySelector('.marquee__track');
    const dir = m.classList.contains('marquee--rev') ? 1 : -1;
    let x = 0;
    let visible = false;
    new IntersectionObserver((es) => (visible = es[es.length - 1].isIntersecting)).observe(m);
    gsap.ticker.add((time, dtMs) => {
      if (!visible || reducedMotion()) return;
      const w = track.scrollWidth / 4;
      x += dir * SPEED * Math.min(dtMs, 100) / 1000;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}
