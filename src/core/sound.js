// Ton: der offizielle Soundtrack – „Love Is in the Air, Pt. 1" und „Pt. 2" von Rock Burwell – in Dauerschleife.
// Abgespielt über den offiziellen YouTube-Player des Labels (Back Lot Music), daher keine eigenen Audiodateien.
// Standardmäßig AUS: YouTube wird erst geladen, wenn man auf „Ton" klickt. Ein kleiner Player zeigt, was läuft.
import { lang } from './i18n.js';

const TRACKS = [
  { id: 'KzRF5ELw8oU', title: 'Love Is in the Air, Pt. 1' },
  { id: 'KaNI9VilRAA', title: 'Love Is in the Air, Pt. 2' },
];
const VOLUME = 55;
const KEY = 'obsession-music';

let on = false;
let player = null;
let playerReady = false;
let apiPromise = null;
let card = null;
let fadeTimer = 0;
let ctx = null;
const listeners = new Set();

function loadApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT);
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

function saved() {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (v && Number.isInteger(v.i) && v.i >= 0 && v.i < TRACKS.length) return v;
  } catch {
    /* egal */
  }
  return { i: 0, t: 0 };
}

function save() {
  if (!playerReady) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ i: Math.max(0, player.getPlaylistIndex()), t: player.getCurrentTime() || 0 }));
  } catch {
    /* egal */
  }
}

function buildCard() {
  card = document.createElement('aside');
  card.className = 'music-card';
  card.setAttribute('aria-label', lang === 'de' ? 'Musik' : 'Music');
  card.innerHTML = `
    <div class="music-card__player"><div id="music-player"></div></div>
    <div class="music-card__meta">
      <span class="mono music-card__kicker">${lang === 'de' ? 'Offizieller Soundtrack' : 'Official soundtrack'}</span>
      <b class="music-card__title">${TRACKS[0].title}</b>
      <span class="music-card__artist">Rock Burwell · Obsession</span>
      <button type="button" class="music-card__next mono">${lang === 'de' ? 'Nächster Titel' : 'Next track'} →</button>
    </div>`;
  document.body.appendChild(card);
  card.querySelector('.music-card__next').addEventListener('click', () => playerReady && player.nextVideo());
  window.addEventListener('pagehide', save);
}

function setTitle() {
  if (!playerReady || !card) return;
  const i = Math.max(0, player.getPlaylistIndex());
  card.querySelector('.music-card__title').textContent = TRACKS[i]?.title || TRACKS[0].title;
}

function fadeTo(target, done) {
  clearInterval(fadeTimer);
  if (!playerReady) return done?.();
  let v = player.getVolume();
  const step = target > v ? 4 : -6;
  fadeTimer = setInterval(() => {
    v = step > 0 ? Math.min(target, v + step) : Math.max(target, v + step);
    player.setVolume(v);
    if (v === target) {
      clearInterval(fadeTimer);
      done?.();
    }
  }, 50);
}

async function start() {
  if (!card) buildCard();
  card.classList.add('is-on');
  if (player) {
    if (playerReady) {
      player.playVideo();
      fadeTo(VOLUME);
    }
    return;
  }
  const YT = await loadApi();
  const pos = saved();
  player = new YT.Player('music-player', {
    host: 'https://www.youtube-nocookie.com',
    width: 160,
    height: 90,
    playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0, modestbranding: 1, iv_load_policy: 3 },
    events: {
      onReady: () => {
        playerReady = true;
        player.setVolume(0);
        player.loadPlaylist(TRACKS.map((tr) => tr.id), pos.i, Math.floor(pos.t));
        player.setLoop(true);
        if (on) fadeTo(VOLUME);
        else player.pauseVideo();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) {
          setTitle();
          card.classList.remove('needs-tap');
        }
      },
      onError: () => card.classList.add('needs-tap'),
      onAutoplayBlocked: () => card.classList.add('needs-tap'),
    },
  });
}

function stop() {
  card?.classList.remove('is-on');
  if (playerReady) fadeTo(0, () => !on && player.pauseVideo());
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
  g.gain.value = 0.5;
  src.connect(hp).connect(g).connect(ctx.destination);
  src.start(t);
}
