// Ton: „Love Is in the Air, Pt. 1" und „Pt. 2" von Rock Burwell (offizieller Obsession-Soundtrack), leise im Hintergrund.
// Quelle sind die offiziellen Hörproben (je ca. 30 Sekunden), die Apple über die iTunes-API bereitstellt –
// ohne Anmeldung, ohne Player-Fenster. Die Titel laufen abwechselnd mit weicher Überblendung in Dauerschleife.
// Standardmäßig AUS: Es wird erst etwas geladen, wenn man auf „Ton" klickt.

const TRACKS = [
  {
    title: 'Love Is in the Air, Pt. 1',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/43/04/48/43044896-6e27-a17e-27ce-07ac03fedf03/mzaf_13464821941238773953.plus.aac.p.m4a',
  },
  {
    title: 'Love Is in the Air, Pt. 2',
    url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/04/83/59/04835994-0182-b0a9-9dbd-c0e7f2d378b2/mzaf_9826407333688075517.plus.aac.p.m4a',
  },
];
const VOLUME = 0.3; // hörbar, aber deutlich im Hintergrund
const FADE = 1.6; // Sekunden Überblendung
const KEY = 'obsession-music';

let on = false;
let decks = null; // zwei <audio>, die sich abwechseln
let cur = 0;
let idx = 0;
let raf = 0;
let ctx = null;
const listeners = new Set();

function makeDeck() {
  const a = new Audio();
  a.preload = 'auto';
  a.volume = 0;
  a.addEventListener('error', () => a.dataset.failed = '1');
  return a;
}

function load(deck, i, t = 0) {
  deck.dataset.failed = '';
  deck.src = TRACKS[i].url;
  deck.currentTime = 0;
  if (t) deck.addEventListener('loadedmetadata', () => (deck.currentTime = Math.min(t, (deck.duration || 30) - FADE * 2)), { once: true });
}

function restore() {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (v && (v.i === 0 || v.i === 1)) return v;
  } catch {
    /* egal */
  }
  return { i: 0, t: 0 };
}

function save() {
  if (!decks) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ i: idx, t: decks[cur].currentTime || 0 }));
  } catch {
    /* egal */
  }
}

// Lautstärke-Regelung und Überblendung in einem rAF-Loop
let target = 0;
let crossing = false;
function tick() {
  raf = requestAnimationFrame(tick);
  const a = decks[cur];
  const b = decks[1 - cur];
  const step = 1 / 60 / FADE;
  // nahe am Ende: nächsten Titel auf dem anderen Deck starten
  if (on && !crossing && a.duration && a.currentTime > a.duration - FADE) {
    crossing = true;
    idx = (idx + 1) % TRACKS.length;
    load(b, idx);
    b.volume = 0;
    b.play().catch(() => {});
  }
  if (crossing) {
    a.volume = Math.max(0, a.volume - step * VOLUME);
    b.volume = Math.min(target, b.volume + step * VOLUME);
    if (a.volume <= 0.001 && (b.volume >= target - 0.001 || !on)) {
      a.pause();
      cur = 1 - cur;
      crossing = false;
    }
  } else {
    const v = a.volume + Math.sign(target - a.volume) * Math.min(Math.abs(target - a.volume), step * VOLUME * 1.5);
    a.volume = Math.max(0, Math.min(1, v));
    if (!on && a.volume <= 0.001) {
      a.pause();
      b.pause();
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
}

function start() {
  if (!decks) {
    decks = [makeDeck(), makeDeck()];
    const pos = restore();
    idx = pos.i;
    load(decks[0], idx, pos.t);
    // falls der Titel ohne Überblendung endet (z. B. Tab im Hintergrund): direkt weiter
    decks.forEach((d, k) =>
      d.addEventListener('ended', () => {
        if (!on || k !== cur || crossing) return;
        idx = (idx + 1) % TRACKS.length;
        load(d, idx);
        d.play().catch(() => {});
      }),
    );
    window.addEventListener('pagehide', save);
  }
  target = VOLUME;
  decks[cur].play().catch(() => {});
  if (!raf) tick();
}

function stop() {
  target = 0;
  save();
}

export function isSoundOn() {
  return on;
}

export function onSoundChange(fn) {
  listeners.add(fn);
}

export function toggleSound(force) {
  const next = typeof force === 'boolean' ? force : !on;
  if (next === on) return;
  on = next;
  if (on) start();
  else stop();
  try {
    sessionStorage.setItem('obsession-sound', on ? '1' : '0');
  } catch {
    /* egal */
  }
  document.documentElement.classList.toggle('is-sound', on);
  listeners.forEach((fn) => fn(on));
}

/** Kurzer „Knack"-Effekt (z. B. beim Zerbrechen des Willows) – nur, wenn der Ton an ist. */
export function snapSound() {
  if (!on) return;
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume();
  const t = ctx.currentTime;
  const len = ctx.sampleRate * 0.25;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i += 1) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1200;
  const g = ctx.createGain();
  g.gain.value = 0.3;
  src.connect(hp).connect(g).connect(ctx.destination);
  src.start(t);
}
