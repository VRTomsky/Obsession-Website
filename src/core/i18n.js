// Sprache: Deutsch ist Standard, Englisch per Umschalter (bleibt im localStorage gespeichert).
const KEY = 'obsession-lang';

function detect() {
  const param = new URLSearchParams(location.search).get('lang');
  if (param === 'de' || param === 'en') {
    store(param);
    return param;
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'de' || saved === 'en') return saved;
  } catch {
    /* privates Fenster o. Ä. */
  }
  return 'de';
}

function store(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* ignorieren */
  }
}

export const lang = detect();
document.documentElement.lang = lang;

/** Liefert den Text in der aktiven Sprache. Akzeptiert {de, en}, Strings oder Zahlen. */
export function t(value) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (Array.isArray(value)) return value.map(t);
  return value[lang] ?? value.de ?? '';
}

export function setLang(value) {
  store(value);
}

const locale = () => (lang === 'de' ? 'de-DE' : 'en-US');

export function fmtDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat(locale(), opts).format(d);
}

export function fmtNumber(n, opts = {}) {
  return new Intl.NumberFormat(locale(), opts).format(n);
}

export function fmtMoney(n, { compact = false, digits = 1 } = {}) {
  if (compact) {
    const abs = Math.abs(n);
    if (abs >= 1e9) return `${fmtNumber(n / 1e9, { maximumFractionDigits: digits })}${lang === 'de' ? ' Mrd.' : 'B'} $`;
    if (abs >= 1e6) return lang === 'de' ? `${fmtNumber(n / 1e6, { maximumFractionDigits: digits })} Mio. $` : `$${fmtNumber(n / 1e6, { maximumFractionDigits: digits })}M`;
    if (abs >= 1e3) return lang === 'de' ? `${fmtNumber(n / 1e3, { maximumFractionDigits: 0 })} Tsd. $` : `$${fmtNumber(n / 1e3, { maximumFractionDigits: 0 })}K`;
  }
  return lang === 'de' ? `${fmtNumber(n)} $` : `$${fmtNumber(n)}`;
}

/** Alter in Jahren zum heutigen Datum. */
export function ageFrom(iso) {
  if (!iso) return null;
  const b = new Date(`${iso}T12:00:00`);
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age -= 1;
  return age;
}
