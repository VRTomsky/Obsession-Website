// Fans & Kritiken, Theorien, Was kommt (inkl. Countdown), Quiz.
import { gsap } from '../core/scroll.js';
import { $, $$, esc, shuffle } from '../core/dom.js';
import { t, lang, fmtDate } from '../core/i18n.js';
import { sections } from '../data/site.js';
import { reviews, quotes, awards } from '../data/film.js';
import { franchise, nextFilms, theories, fanCulture } from '../data/future.js';
import { trivia as triviaQ, personality } from '../data/quiz.js';
import { people } from '../data/people.js';
import { M } from '../data/media.js';

/* ---------------- Fans & Kritiken ---------------- */
export function fansHTML() {
  const s = sections.fans;
  return `
  <section class="section fans" id="fans">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
      <div class="scores" data-reveal="stagger">
        ${reviews.map((r) => `<div class="score"><span class="score__v display" data-tilt="8">${esc(r.score)}</span><span class="score__s">${esc(r.source)}</span><span class="mono muted">${esc(t(r.note))}</span></div>`).join('')}
      </div>
    </div>

    <div class="quotes">
      <div class="quotes__track">
        ${[...quotes, ...quotes].map((q) => `<blockquote class="quote"><p class="serif-i">“${esc(q.q)}”</p><footer class="mono"><b>${esc(q.who)}</b> · ${esc(q.outlet)}</footer></blockquote>`).join('')}
      </div>
    </div>

    <div class="wrap fans__grid">
      <div>
        <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Auszeichnungen' : 'Awards'}</h3>
        <ul class="awards">
          ${awards
            .map(
              (a) => `
            <li class="award ${a.won === true ? 'is-won' : ''}">
              <span class="mono muted">${esc(a.year)}</span>
              <div><h4>${esc(a.event)}</h4><p class="muted">${esc(t(a.what))}</p></div>
              <span class="chip ${a.won ? 'chip--red' : ''}">${a.won ? '★ ' : ''}${esc(t(a.result))}</span>
            </li>`,
            )
            .join('')}
        </ul>
      </div>
      <div>
        <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Fan-Kultur' : 'Fan culture'}</h3>
        <div class="fanclip media" data-reveal="img">
          <video muted loop playsinline preload="none" poster="${M.video.date}.jpg"><source src="${M.video.date}.webm" type="video/webm" /><source src="${M.video.date}.mp4" type="video/mp4" /></video>
          <span class="fanclip__cap mono">“I thought we were having a nice date.”</span>
        </div>
        <ul class="culture">
          ${fanCulture.map((f) => `<li><h4 class="h-m">${esc(f.k)}</h4><p>${esc(t(f.x))}</p></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>`;
}

export function initFans() {
  const track = $('.quotes__track');
  let x = 0;
  gsap.ticker.add(() => {
    x -= 0.5;
    const w = track.scrollWidth / 2;
    if (-x >= w) x += w;
    track.style.transform = `translate3d(${x}px,0,0)`;
  });
  const v = $('.fanclip video');
  new IntersectionObserver(([en]) => (en.isIntersecting ? v.play().catch(() => {}) : v.pause())).observe(v);
}

/* ---------------- Theorien ---------------- */
export function theoriesHTML() {
  const s = sections.theorien;
  const eye = (n) => Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('');
  return `
  <section class="section theories" id="theorien">
    <div class="wrap theories__grid">
      <div class="theories__side">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
        <p class="body-l" data-reveal="fade">${esc(t(s.lead))}</p>
        <figure class="theories__img media" data-reveal="img"><img src="${M.still.phone}" alt="" loading="lazy" data-parallax="0.08" /></figure>
      </div>
      <div class="acc">
        ${theories
          .map(
            (th, i) => `
          <details class="acc__item" ${i === 0 ? 'open' : ''}>
            <summary>
              <span class="mono red">${String(i + 1).padStart(2, '0')}</span>
              <span class="acc__q h-m">${esc(t(th.q))}</span>
              <span class="acc__plus" aria-hidden="true"></span>
            </summary>
            <div class="acc__body">
              <p class="body-l">${esc(t(th.a))}</p>
              <p class="mono muted acc__meter">${lang === 'de' ? 'Wahrscheinlichkeit' : 'Likelihood'} <span class="meter">${eye(th.level)}</span> · ${lang === 'de' ? 'Fan-Theorie' : 'fan theory'}</p>
            </div>
          </details>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

export function initTheories() {
  $$('.acc__item').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      $$('.acc__item').forEach((o) => o !== d && (o.open = false));
      gsap.from(d.querySelector('.acc__body'), { opacity: 0, y: -10, duration: 0.6, ease: 'expo.out' });
    });
  });
}

/* ---------------- Was kommt ---------------- */
export function futureHTML() {
  const s = sections.zukunft;
  const castNext = people
    .filter((p) => p.upcoming?.length)
    .flatMap((p) => p.upcoming.slice(0, 2).map((u) => ({ ...u, who: p })))
    .slice(0, 12);
  return `
  <section class="section future" id="zukunft">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
      <div class="franchise" data-reveal="stagger">
        ${franchise.map((f) => `<article class="fcard"><span class="chip chip--red">${esc(t(f.tag))}</span><h3 class="h-m">${esc(t(f.t))}</h3><p>${esc(t(f.x))}</p></article>`).join('')}
      </div>
    </div>

    <div class="wrap">
      <h3 class="h-l future__sub" data-reveal="lines">${lang === 'de' ? 'Die nächsten Filme von Curry Barker' : 'Curry Barker\'s next films'}</h3>
      <div class="next">
        ${nextFilms
          .map(
            (f, i) => `
          <article class="nfilm ${f.countdown ? 'nfilm--main' : ''}" data-reveal="fade" data-delay="${i * 0.08}">
            <div class="nfilm__head"><span class="chip">${esc(t(f.status))}</span>${f.date ? `<span class="mono muted">${fmtDate(f.date)}</span>` : '<span class="mono muted">TBA</span>'}</div>
            <h4 class="h-l">${esc(t(f.t))}</h4>
            <p class="mono muted">${esc(t(f.who))}</p>
            <p>${esc(t(f.x))}</p>
            ${
              f.countdown
                ? `<div class="countdown" data-date="${f.date}">
                    ${['d', 'h', 'm', 's'].map((k) => `<div><span class="display" data-k="${k}">00</span><span class="mono muted">${{ d: lang === 'de' ? 'Tage' : 'days', h: lang === 'de' ? 'Std.' : 'hrs', m: 'Min.', s: lang === 'de' ? 'Sek.' : 'sec' }[k]}</span></div>`).join('')}
                  </div>`
                : ''
            }
          </article>`,
          )
          .join('')}
      </div>

      <h3 class="h-l future__sub" data-reveal="lines">${lang === 'de' ? 'Was der Cast als Nächstes macht' : 'What the cast does next'}</h3>
      <div class="castnext" data-reveal="stagger">
        ${castNext
          .map(
            (u) => `
          <a class="cn" href="person.html?p=${u.who.slug}" data-title="${esc(u.who.name)}">
            <img src="${u.who.img.portrait}" alt="" loading="lazy" />
            <div><span class="mono muted">${esc(u.who.name)} · ${esc(t(u.y))}</span><h4>${esc(t(u.t))}</h4><p class="muted">${esc(t(u.r))}</p></div>
          </a>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

export function initFuture() {
  const cd = $('.countdown');
  if (!cd) return;
  const target = new Date(`${cd.dataset.date}T19:00:00`).getTime();
  const els = Object.fromEntries($$('[data-k]', cd).map((e) => [e.dataset.k, e]));
  const tick = () => {
    let d = Math.max(0, target - Date.now()) / 1000;
    const days = Math.floor(d / 86400);
    d -= days * 86400;
    const h = Math.floor(d / 3600);
    d -= h * 3600;
    const m = Math.floor(d / 60);
    const s = Math.floor(d - m * 60);
    els.d.textContent = String(days);
    els.h.textContent = String(h).padStart(2, '0');
    els.m.textContent = String(m).padStart(2, '0');
    els.s.textContent = String(s).padStart(2, '0');
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------------- Quiz ---------------- */
export function quizHTML() {
  const s = sections.quiz;
  return `
  <section class="section quiz" id="quiz">
    <div class="wrap">
      <div class="sec-head sec-head--center">
        <p class="kicker no-line"><span class="num">${s.n}</span> ${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
      </div>
      <div class="quiz__tabs" role="tablist">
        <button class="is-active" data-mode="trivia" role="tab">${lang === 'de' ? 'Wie gut kennst du Obsession?' : 'How well do you know Obsession?'}</button>
        <button data-mode="persona" role="tab">${lang === 'de' ? 'Welche Figur bist du?' : 'Which character are you?'}</button>
      </div>
      <div class="qbox" aria-live="polite"></div>
    </div>
  </section>`;
}

export function initQuiz() {
  const box = $('.qbox');
  const tabs = $$('.quiz__tabs button');
  let mode = 'trivia';

  const swap = (html) => {
    gsap.to(box, {
      opacity: 0,
      y: 12,
      duration: 0.25,
      onComplete: () => {
        box.innerHTML = html;
        gsap.to(box, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
      },
    });
  };

  function startTrivia() {
    const qs = shuffle(triviaQ).slice(0, 8);
    let i = 0;
    let score = 0;
    const show = () => {
      if (i >= qs.length) {
        const verdict =
          score >= 7
            ? { de: 'Du bist offiziell obsessed. Nikki wäre stolz – und ein bisschen eifersüchtig.', en: 'You are officially obsessed. Nikki would be proud – and a little jealous.' }
            : score >= 4
              ? { de: 'Solide! Aber da geht noch was. Zeit für den dritten Kinobesuch?', en: 'Solid! But there\'s room to grow. Time for a third viewing?' }
              : { de: 'Hmm. Vielleicht solltest du den Film noch einmal sehen. Mit offenen Augen.', en: 'Hmm. Maybe watch the film again. With your eyes open.' };
        swap(`<div class="qres"><p class="mono muted">${lang === 'de' ? 'Ergebnis' : 'Result'}</p><p class="display qres__big">${score}/${qs.length}</p><p class="lead">${esc(t(verdict))}</p><button class="btn btn--red" data-act="again">${lang === 'de' ? 'Nochmal' : 'Again'} <span class="arrow">↻</span></button></div>`);
        return;
      }
      const q = qs[i];
      const opts = shuffle(q.a.map((a, idx) => ({ a, ok: idx === q.c })));
      swap(`
        <div class="qcard">
          <div class="qcard__top"><span class="mono red">${String(i + 1).padStart(2, '0')} / ${qs.length}</span><span class="mono muted">${lang === 'de' ? 'Punkte' : 'Score'}: ${score}</span></div>
          <h3 class="h-l">${esc(t(q.q))}</h3>
          <div class="qcard__opts">${opts.map((o, k) => `<button class="qopt" data-ok="${o.ok}"><span class="mono">${'ABCD'[k]}</span>${esc(t(o.a))}</button>`).join('')}</div>
          <p class="qcard__x muted"></p>
        </div>`);
      setTimeout(() => {
        $$('.qopt', box).forEach((b) =>
          b.addEventListener('click', () => {
            if (box.dataset.locked) return;
            box.dataset.locked = '1';
            const ok = b.dataset.ok === 'true';
            if (ok) score += 1;
            $$('.qopt', box).forEach((o) => o.classList.add(o.dataset.ok === 'true' ? 'is-ok' : 'is-no'));
            b.classList.add('is-picked');
            $('.qcard__x', box).textContent = t(q.x);
            setTimeout(() => {
              delete box.dataset.locked;
              i += 1;
              show();
            }, 1900);
          }),
        );
      }, 300);
    };
    show();
  }

  function startPersona() {
    const pts = {};
    let i = 0;
    const qs = personality.questions;
    const show = () => {
      if (i >= qs.length) {
        const best = Object.entries(pts).sort((a, b) => b[1] - a[1])[0][0];
        const r = personality.results[best];
        swap(`<div class="qres"><p class="mono muted">${lang === 'de' ? 'Du bist …' : 'You are …'}</p><p class="display qres__big chroma">${esc(t(r.name))}</p><p class="lead">${esc(t(r.x))}</p><div class="qres__btns"><a class="btn btn--red" href="figur.html?c=${r.slug}" data-title="${esc(t(r.name))}">${lang === 'de' ? 'Zur Figur' : 'Meet the character'} <span class="arrow">→</span></a><button class="btn" data-act="again">${lang === 'de' ? 'Nochmal' : 'Again'} <span class="arrow">↻</span></button></div></div>`);
        return;
      }
      const q = qs[i];
      swap(`
        <div class="qcard">
          <div class="qcard__top"><span class="mono red">${String(i + 1).padStart(2, '0')} / ${qs.length}</span></div>
          <h3 class="h-l">${esc(t(q.q))}</h3>
          <div class="qcard__opts">${q.a.map((o, k) => `<button class="qopt" data-k="${k}"><span class="mono">${'ABCD'[k]}</span>${esc(t(o.t))}</button>`).join('')}</div>
        </div>`);
      setTimeout(() => {
        $$('.qopt', box).forEach((b) =>
          b.addEventListener('click', () => {
            Object.entries(q.a[b.dataset.k].s).forEach(([k, v]) => (pts[k] = (pts[k] || 0) + v));
            b.classList.add('is-picked');
            i += 1;
            setTimeout(show, 350);
          }),
        );
      }, 300);
    };
    show();
  }

  box.addEventListener('click', (e) => {
    if (e.target.closest('[data-act="again"]')) mode === 'trivia' ? startTrivia() : startPersona();
  });
  tabs.forEach((tb) =>
    tb.addEventListener('click', () => {
      tabs.forEach((x) => x.classList.toggle('is-active', x === tb));
      mode = tb.dataset.mode;
      mode === 'trivia' ? startTrivia() : startPersona();
    }),
  );
  startTrivia();
}
