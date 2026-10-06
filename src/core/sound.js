// Ton: „Love Is in the Air, Pt. 1" und „Pt. 2" von Rock Burwell (offizieller Obsession-Soundtrack), leise im Hintergrund.
// Quelle sind die offiziellen Hörproben (je ca. 30 Sekunden), die Apple über die iTunes-API bereitstellt.
//
// • Startet erst beim Klick auf „Ton". „Ton aus" pausiert wirklich – beim nächsten „Ton an" geht es an derselben Stelle weiter.
// • Die beiden Titel laufen abwechselnd in Dauerschleife und überblenden weich ineinander (keine Pause dazwischen):
//   der nächste Titel ist vorgeladen und startet schon, während der aktuelle ausklingt.
// • Lautstärke und Blenden laufen über Web Audio (GainNode). Liefert der Server keine CORS-Header, wird automatisch auf
//   die Lautstärke der <audio>-Elemente umgeschaltet. Lässt sich auch die nicht ändern (iOS), wird hart umgeschaltet
//   und sofort pausiert – Hauptsache, „Ton aus" ist wirklich aus.

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
const XF = 3.5; // Überblendung zwischen den Titeln (s)
const LEAD = 0.35; // leisen Einstieg der Hörprobe überspringen (s)
const FADE_IN = 1.2;
const FADE_OUT = 0.45;
const KEY = 'obsession-music';
const AC = window.AudioContext || window.webkitAudioContext;

let on = false;
let mode = null; // 'graph' (Web Audio) | 'element' (audio.volume)
let ctx = null;
let master = null; // GainNode bzw. Hüllkurve im Element-Modus
let masterEnv = { from: 0, to: 0, t0: 0, dur: 0, shape: 'lin' };
let decks = [];
let cur = 0;
let idx = 0;
let crossing = false;
let xfTimer = 0;
let stopTimer = 0;
let pump = 0;
let volumeWorks = true;
const listeners = new Set();

/* ---------- Hüllkurven ---------- */
const now = () => performance.now() / 1000;
const clamp01 = (v) => Math.max(0, Math.min(1, v));
function level(e, t = now()) {
  const x = e.dur > 0 ? clamp01((t - e.t0) / e.dur) : 1;
  if (e.shape === 'in') return e.from + (e.to - e.from) * Math.sin((x * Math.PI) / 2); // gleiche Leistung beim Überblenden
  if (e.shape === 'out') return e.to + (e.from - e.to) * Math.cos((x * Math.PI) / 2);
  return e.from + (e.to - e.from) * x;
}

function rampParam(param, from, to, dur, shape) {
  const t = ctx.currentTime;
  if (param.cancelAndHoldAtTime) param.cancelAndHoldAtTime(t);
  else {
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
  }
  if (dur <= 0.02) {
    param.setValueAtTime(to, t + 0.001);
    return;
  }
  const n = 48;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i += 1) curve[i] = level({ from, to, t0: 0, dur, shape }, (i / (n - 1)) * dur);
  try {
    param.setValueCurveAtTime(curve, t + 0.005, dur);
  } catch {
    param.linearRampToValueAtTime(to, t + dur);
  }
}

// Pegel eines Decks (0…1) bzw. der Gesamtlautstärke ändern
function setDeck(d, to, dur = 0, shape = 'lin') {
  const from = level(d.env);
  d.env = { from, to, t0: now(), dur, shape };
  if (mode === 'graph') rampParam(d.gain.gain, from, to, dur, shape);
}
function setMaster(to, dur) {
  const from = level(masterEnv);
  masterEnv = { from, to, t0: now(), dur, shape: 'lin' };
  if (mode === 'graph') rampParam(master.gain, from, to, dur, 'lin');
}

// Element-Modus: Lautstärken regelmäßig aus den Hüllkurven setzen
function startPump() {
  if (pump || mode !== 'element') return;
  pump = setInterval(() => {
    const m = level(masterEnv);
    decks.forEach((d) => {
      const v = clamp01(level(d.env) * m);
      if (Math.abs(d.el.volume - v) > 0.002) d.el.volume = v;
    });
  }, 40);
}

/* ---------- Decks ---------- */
function makeDeck() {
  const el = new Audio();
  el.preload = 'auto';
  if (mode === 'graph') el.crossOrigin = 'anonymous';
  const d = { el, gain: null, env: { from: 0, to: 0, t0: 0, dur: 0, shape: 'lin' }, track: -1, seek: 0 };
  if (mode === 'graph') {
    d.gain = ctx.createGain();
    d.gain.gain.value = 0;
    ctx.createMediaElementSource(el).connect(d.gain).connect(master);
  } else {
    el.volume = 0;
  }
  el.addEventListener('loadedmetadata', () => {
    if (d.seek) el.currentTime = Math.min(d.seek, Math.max(0, (el.duration || 30) - XF - 1));
    d.seek = 0;
  });
  el.addEventListener('timeupdate', () => onTime(d));
  el.addEventListener('ended', () => onEnded(d));
  el.addEventListener('error', () => onError(d));
  return d;
}

function prepare(d, i, t = LEAD) {
  d.track = i;
  d.seek = t;
  d.el.src = TRACKS[i].url;
  d.el.load();
}

function rewind(d) {
  // Deck für den nächsten Einsatz auf den Anfang (nach dem leisen Einstieg) stellen
  if (d.el.readyState >= 1) d.el.currentTime = LEAD;
  else d.seek = LEAD;
}

function unlock(d) {
  const el = d.el;
  if (!el.paused) return;
  el.muted = true;
  el.play()
    .then(() => {
      el.pause();
      el.muted = false;
    })
    .catch(() => (el.muted = false));
}

function build() {
  decks = [makeDeck(), makeDeck()];
  const pos = restore();
  idx = pos.i;
  cur = 0;
  prepare(decks[0], idx, Math.max(LEAD, pos.t));
  prepare(decks[1], (idx + 1) % TRACKS.length);
  // Zweites Deck innerhalb des Klicks einmal kurz „entsperren" (iOS erlaubt play() sonst nur nach Nutzeraktion)
  unlock(decks[1]);
  if (mode === 'element') {
    const probe = decks[0].el;
    probe.volume = 0.5;
    volumeWorks = Math.abs(probe.volume - 0.5) < 0.01;
    probe.volume = 0;
    startPump();
  }
}

function init() {
  mode = AC ? 'graph' : 'element';
  if (mode === 'graph') {
    ctx = ctx || new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  build();
}

// Kein CORS beim Hörproben-Server → auf Element-Lautstärke umschalten
function onError(d) {
  if (mode !== 'graph' || !d.el.crossOrigin) return;
  const pos = { i: idx, t: decks[cur]?.el.currentTime || 0 };
  decks.forEach((x) => {
    x.el.pause();
    x.el.removeAttribute('src');
  });
  clearTimeout(xfTimer);
  crossing = false;
  mode = 'element';
  save(pos);
  build();
  masterEnv = { from: 0, to: 0, t0: 0, dur: 0, shape: 'lin' };
  if (on) play();
}

/* ---------- Überblenden ---------- */
function onTime(d) {
  if (!on || crossing || d !== decks[cur]) return;
  if (mode === 'element' && !volumeWorks) return; // ohne Lautstärkeregelung erst am Ende umschalten (onEnded)
  const dur = d.el.duration;
  if (dur && Number.isFinite(dur) && d.el.currentTime >= dur - XF) crossfade();
}

function onEnded(d) {
  if (!on || d !== decks[cur]) return;
  crossfade(true); // Fallback, falls timeupdate nicht rechtzeitig kam
}

function crossfade(hard = false) {
  if (crossing) return;
  const a = decks[cur];
  const b = decks[1 - cur];
  const next = (idx + 1) % TRACKS.length;
  if (b.track !== next) prepare(b, next);
  else rewind(b);
  idx = next;
  cur = 1 - cur;
  const instant = hard || (mode === 'element' && !volumeWorks);
  setDeck(b, 0);
  b.el.play().catch(() => {});
  if (instant) {
    setDeck(b, 1);
    setDeck(a, 0);
    finishCrossfade(a);
    return;
  }
  crossing = true;
  setDeck(b, 1, XF, 'in');
  setDeck(a, 0, XF, 'out');
  clearTimeout(xfTimer);
  xfTimer = setTimeout(() => finishCrossfade(a), XF * 1000 + 120);
}

function finishCrossfade(out) {
  clearTimeout(xfTimer);
  crossing = false;
  out.el.pause();
  setDeck(out, 0);
  // ausgeblendetes Deck gleich mit dem übernächsten Titel vorladen
  const next = (idx + 1) % TRACKS.length;
  if (out.track !== next) prepare(out, next);
  else rewind(out);
}

/* ---------- Ein / Aus ---------- */
function play(fadeIn = FADE_IN) {
  clearTimeout(stopTimer);
  if (!decks.length) init();
  if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {});
  const d = decks[cur];
  if (!crossing) setDeck(d, 1);
  d.el.play().catch((e) => e?.name === 'NotAllowedError' && armResume());
  if (crossing) decks[1 - cur].el.play().catch(() => {});
  if (mode === 'element' && !volumeWorks) return;
  setMaster(VOLUME, fadeIn);
}

// Browser erlauben Ton nach einem Seitenwechsel nicht immer sofort (v. a. Safari/iOS).
// Dann bleibt „Ton an" stehen und die Musik startet beim ersten Tippen/Klicken irgendwo auf der Seite.
let armed = false;
let swallowUntil = 0;
const RESUME_EVENTS = ['pointerdown', 'pointerup', 'mousedown', 'touchend', 'keydown'];
function onFirstGesture(e) {
  disarm();
  if (!on) return;
  // war der erste Klick auf „Ton", soll er die Musik starten – nicht gleich wieder ausschalten
  if (e.target?.closest?.('#sound-btn')) swallowUntil = performance.now() + 1500;
  setMaster(0, 0);
  play(0.8);
  if (decks.length) unlock(decks[1 - cur]);
}
function armResume() {
  if (armed) return;
  armed = true;
  document.documentElement.classList.add('is-sound-pending');
  RESUME_EVENTS.forEach((t) => window.addEventListener(t, onFirstGesture, { capture: true }));
}
function disarm() {
  if (!armed) return;
  armed = false;
  document.documentElement.classList.remove('is-sound-pending');
  RESUME_EVENTS.forEach((t) => window.removeEventListener(t, onFirstGesture, { capture: true }));
}
function checkBlocked() {
  setTimeout(() => {
    if (!on || !decks.length) return;
    const blocked = decks[cur].el.paused || (mode === 'graph' && ctx.state !== 'running');
    if (blocked) armResume();
  }, 600);
}

function pauseAll() {
  // laufende Überblendung abschließen, damit beim Weiterspielen alles sauber steht
  if (crossing) finishCrossfade(decks[1 - cur]);
  decks.forEach((d) => d.el.pause());
  save();
}

function stop() {
  disarm();
  if (!decks.length) return;
  clearTimeout(stopTimer);
  if (mode === 'element' && !volumeWorks) {
    pauseAll();
    return;
  }
  setMaster(0, FADE_OUT);
  stopTimer = setTimeout(pauseAll, FADE_OUT * 1000 + 60);
}

/* ---------- Position über Seitenwechsel merken ---------- */
function restore() {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (v && Number.isInteger(v.i) && v.i >= 0 && v.i < TRACKS.length) return { i: v.i, t: Number(v.t) || 0 };
  } catch {
    /* egal */
  }
  return { i: 0, t: 0 };
}

function save(pos) {
  if (!pos && !decks.length) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(pos || { i: idx, t: decks[cur].el.currentTime || 0 }));
  } catch {
    /* egal */
  }
}
window.addEventListener('pagehide', () => save());

/* ---------- Öffentliche API ---------- */
export function isSoundOn() {
  return on;
}

export function onSoundChange(fn) {
  listeners.add(fn);
}

/** Beim Laden einer Seite: lief der Ton vorher, an derselben Stelle weiterspielen. */
export function restoreSound() {
  let want = false;
  try {
    want = sessionStorage.getItem('obsession-sound') === '1';
  } catch {
    /* egal */
  }
  if (!want) return;
  setOn(true);
  play(0.8);
  checkBlocked();
}

// Zurück/Vor aus dem Browser-Cache: Stand der anderen Seite übernehmen (Position, an/aus)
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  let want = false;
  try {
    want = sessionStorage.getItem('obsession-sound') === '1';
  } catch {
    /* egal */
  }
  if (decks.length) {
    decks.forEach((d) => {
      d.el.pause();
      d.el.removeAttribute('src');
    });
    decks = [];
    crossing = false;
    clearTimeout(xfTimer);
  }
  if (want) {
    setOn(true);
    play(0.8);
    checkBlocked();
  } else if (on) setOn(false);
});

/** Vor einem Seitenwechsel: Musik läuft während der Übergangsanimation weiter und klingt erst am Ende kurz aus. */
export function soundLeave(totalSeconds) {
  if (!on || !decks.length) return;
  const fade = 0.35;
  setTimeout(() => {
    if (!on) return;
    setMaster(0, fade);
    setTimeout(pauseAll, fade * 1000); // pausieren + Position merken; die neue Seite macht genau hier weiter
  }, Math.max(0, totalSeconds - fade) * 1000);
}

function setOn(v) {
  on = v;
  try {
    sessionStorage.setItem('obsession-sound', on ? '1' : '0');
  } catch {
    /* egal */
  }
  document.documentElement.classList.toggle('is-sound', on);
  listeners.forEach((fn) => fn(on));
}

export function toggleSound(force) {
  if (typeof force !== 'boolean' && performance.now() < swallowUntil) {
    swallowUntil = 0;
    return;
  }
  const next = typeof force === 'boolean' ? force : !on;
  if (next === on) return;
  setOn(next);
  if (on) play();
  else stop();
}

/** Kurzer „Knack"-Effekt (z. B. beim Zerbrechen des Willows) – nur, wenn der Ton an ist. */
export function snapSound() {
  if (!on || !AC) return;
  ctx = ctx || new AC();
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
