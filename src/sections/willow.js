// „Der One Wish Willow": 3D-Objekt zum Drehen & Zerbrechen + Wunsch-Eingabe.
import { gsap } from '../core/scroll.js';
import { $, esc } from '../core/dom.js';
import { t, lang } from '../core/i18n.js';
import { sections } from '../data/site.js';
import { M } from '../data/media.js';
import { grantWish } from '../data/willow.js';
import { snapSound } from '../core/sound.js';

export function willowHTML() {
  const s = sections.willow;
  return `
  <section class="section willow" id="willow">
    <video class="willow__bg" muted loop playsinline autoplay preload="none" poster="${M.video.willow}.jpg" aria-hidden="true">
      <source src="${M.video.willow}.webm" type="video/webm" /><source src="${M.video.willow}.mp4" type="video/mp4" />
    </video>
    <div class="wrap willow__grid">
      <div class="willow__text">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
        <p class="body-l" data-reveal="fade">${esc(t(s.lead))}</p>
        <form class="wish" autocomplete="off">
          <label class="mono muted" for="wish-input">${lang === 'de' ? 'Dein Wunsch' : 'Your wish'}</label>
          <div class="wish__row">
            <input id="wish-input" name="wish" maxlength="120" placeholder="${esc(t(s.placeholder))}" disabled />
            <button class="btn btn--red" type="submit" disabled>${esc(t(s.submit))} <span class="arrow">→</span></button>
          </div>
          <p class="wish__answer serif-i" aria-live="polite"></p>
          <button class="btn wish__again" type="button" hidden>${esc(t(s.again))} <span class="arrow">↻</span></button>
          <p class="mono muted wish__note">${esc(t(s.disclaimer))}</p>
        </form>
      </div>
      <div class="willow__stage" data-cursor="${lang === 'de' ? 'Halten' : 'Hold'}">
        <div class="willow__canvas"></div>
        <div class="willow__hold">
          <span class="mono">${esc(t(s.hold))}</span>
          <span class="willow__bar"><i></i></span>
        </div>
        <img class="willow__fallback" src="${M.commons.willowReplica}" alt="One Wish Willow" loading="lazy" />
      </div>
    </div>
  </section>`;
}

export async function initWillow() {
  const sec = $('#willow');
  const box = $('.willow__canvas', sec);
  const bar = $('.willow__bar i', sec);
  const holdUi = $('.willow__hold', sec);
  const input = $('#wish-input');
  const submit = $('.wish button[type=submit]');
  const answer = $('.wish__answer');
  const again = $('.wish__again');
  const form = $('.wish');

  // Erst laden, wenn der Bereich in die Nähe kommt
  await new Promise((res) => {
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          io.disconnect();
          res();
        }
      },
      { rootMargin: '600px' },
    );
    io.observe(sec);
  });

  const { createWillow } = await import('../three/willow.js');
  const w = await createWillow(box);
  if (!w) {
    sec.classList.add('no-gl');
    input.disabled = false;
    submit.disabled = false;
    return;
  }
  sec.classList.add('has-gl');
  w.onProgress((p) => {
    bar.style.transform = `scaleX(${p})`;
  });
  w.onBroken(() => {
    snapSound();
    sec.classList.add('is-broken');
    gsap.to(holdUi, { opacity: 0, duration: 0.4 });
    gsap.fromTo(sec, { '--flash': 1 }, { '--flash': 0, duration: 1.2, ease: 'expo.out' });
    input.disabled = false;
    submit.disabled = false;
    setTimeout(() => input.focus({ preventScroll: true }), 300);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const wish = input.value.trim();
    if (!wish) {
      input.focus();
      return;
    }
    const text = grantWish(wish, lang);
    answer.textContent = '';
    input.disabled = true;
    submit.disabled = true;
    let i = 0;
    const type = () => {
      answer.textContent = text.slice(0, i);
      i += 1;
      if (i <= text.length) setTimeout(type, 22 + Math.random() * 30);
      else again.hidden = false;
    };
    type();
  });

  again.addEventListener('click', () => {
    w.reset();
    sec.classList.remove('is-broken');
    gsap.to(holdUi, { opacity: 1, duration: 0.4 });
    answer.textContent = '';
    input.value = '';
    again.hidden = true;
  });
}
