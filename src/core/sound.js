// Atmosphäre: ein synthetischer Drone mit leisem Herzschlag (WebAudio, keine Audiodatei nötig).
// Standardmäßig AUS – startet nur nach Klick.
let ctx = null;
let master = null;
let heartTimer = null;
let on = false;
const listeners = new Set();

function build() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Tiefer, leicht verstimmter Drone
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 420;
  lp.Q.value = 0.7;
  lp.connect(master);
  [
    [55, 'sine', 0.32],
    [55.7, 'triangle', 0.18],
    [82.4, 'sine', 0.08],
    [110.2, 'sine', 0.05],
  ].forEach(([f, type, g]) => {
    const o = ctx.createOscillator();
    const gain = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    gain.gain.value = g;
    o.connect(gain).connect(lp);
    o.start();
  });

  // Langsam atmender Filter
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(lp.frequency);
  lfo.start();

  // Gefiltertes Rauschen wie entfernter Wind
  const len = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 600;
  bp.Q.value = 0.6;
  const ng = ctx.createGain();
  ng.gain.value = 0.22;
  noise.connect(bp).connect(ng).connect(master);
  noise.start();
}

function thump(t, strength) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(62, t);
  o.frequency.exponentialRampToValueAtTime(38, t + 0.18);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.55 * strength, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.32);
}

function heartbeat() {
  if (!ctx || !on) return;
  const t = ctx.currentTime + 0.05;
  thump(t, 1);
  thump(t + 0.24, 0.7);
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
  if (on) {
    if (!ctx) build();
    ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.5);
    heartbeat();
    heartTimer = setInterval(heartbeat, 1700);
  } else if (ctx) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    clearInterval(heartTimer);
  }
  try {
    sessionStorage.setItem('obsession-sound', on ? '1' : '0');
  } catch {
    /* egal */
  }
  document.documentElement.classList.toggle('is-sound', on);
  listeners.forEach((fn) => fn(on));
}

/** Kurzer „Knack"-Effekt (z. B. beim Zerbrechen des Willows). */
export function snapSound() {
  if (!ctx || !on) return;
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
  g.gain.value = 0.9;
  src.connect(hp).connect(g).connect(master);
  src.start(t);
  thump(t + 0.02, 1.4);
}
