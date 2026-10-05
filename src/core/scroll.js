// Weiches Scrollen (Lenis) gekoppelt an GSAP ScrollTrigger.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from './dom.js';

gsap.registerPlugin(ScrollTrigger);

export let lenis = null;

export function initScroll() {
  if (reducedMotion()) return null;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  window.__lenis = lenis;
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollTo(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6, offset: 0, ...opts });
  else {
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else node?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function stopScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
}

export function startScroll() {
  lenis?.start();
  document.documentElement.style.overflow = '';
}

export { gsap, ScrollTrigger };
