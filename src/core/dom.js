// Kleine DOM-Helfer.
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Erzeugt ein Element aus einem HTML-String. */
export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Lädt Bilder vor; löst immer auf (auch bei Fehlern). */
export function preloadImages(urls, onEach) {
  let done = 0;
  return Promise.all(
    urls.map(
      (u) =>
        new Promise((res) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            done += 1;
            onEach?.(done / urls.length);
            res();
          };
          img.src = u;
        }),
    ),
  );
}

export const imdbTitle = (tt, title) =>
  tt ? `https://www.imdb.com/title/${tt}/` : `https://www.imdb.com/find/?q=${encodeURIComponent(title)}&s=tt`;
export const imdbName = (nm) => `https://www.imdb.com/name/${nm}/`;
