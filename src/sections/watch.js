// „Ansehen": Streaming, Blu-ray/4K/DVD (3D-Hüllen), Veröffentlichungen, Kino-Finder mit Standort.
import { $, $$, esc } from '../core/dom.js';
import { t, lang, fmtDate, fmtNumber } from '../core/i18n.js';
import { sections } from '../data/site.js';
import { streaming, physical, releaseDates, cinemaLinks } from '../data/watch.js';
import { M } from '../data/media.js';

export function watchHTML() {
  const s = sections.ansehen;
  const covers = [M.poster.main, M.poster.blood, M.poster.eyeClose, M.poster.oneWish];
  return `
  <section class="section watch" id="ansehen">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker"><span class="num">${s.n}</span>${esc(t(s.kicker))}</p>
        <h2 class="h-xl" data-reveal="lines">${esc(t(s.title))}</h2>
        <p class="sec-lead body-l" data-reveal="fade">${
          lang === 'de'
            ? 'Am besten im Original mit Untertiteln – die Stimmen von Inde Navarrette und Michael Johnston sind die halbe Miete. Stand: Oktober 2026.'
            : 'Best enjoyed in the original language – Inde Navarrette\'s and Michael Johnston\'s voices are half the experience. As of October 2026.'
        }</p>
      </div>

      <div class="stream">
        <div class="stream__col">
          <p class="mono muted stream__label">${lang === 'de' ? 'Deutschland' : 'Germany'}</p>
          <div class="stream__grid" data-reveal="stagger">
            ${streaming.de.map((p) => `<a class="svc" href="${p.url}" target="_blank" rel="noopener" style="--tone:${p.tone}" data-magnet="0.12"><span class="svc__name">${esc(p.name)}</span><span class="mono muted">${esc(t(p.type))}</span><span class="svc__arrow">↗</span></a>`).join('')}
          </div>
        </div>
        <div class="stream__col">
          <p class="mono muted stream__label">USA</p>
          <div class="stream__grid stream__grid--us" data-reveal="stagger">
            ${streaming.us.map((p) => `<a class="svc" href="${p.url}" target="_blank" rel="noopener" style="--tone:${p.tone}" data-magnet="0.12"><span class="svc__name">${esc(p.name)}</span><span class="mono muted">${esc(t(p.type))}</span><span class="svc__arrow">↗</span></a>`).join('')}
          </div>
          <a class="btn stream__jw" href="${streaming.justwatch}" target="_blank" rel="noopener">${lang === 'de' ? 'Aktuelle Angebote auf JustWatch' : 'Current offers on JustWatch'} <span class="arrow">↗</span></a>
        </div>
      </div>

      <h3 class="h-l watch__sub" data-reveal="lines">${lang === 'de' ? 'Fürs Regal' : 'For the shelf'}</h3>
      <div class="discs">
        ${physical
          .map(
            (p, i) => `
          <a class="disc ${p.best ? 'is-best' : ''}" href="${p.url}" target="_blank" rel="noopener" data-cursor="${lang === 'de' ? 'Ansehen' : 'View'}">
            <div class="case case--${p.fmt === '4K UHD' ? 'uhd' : p.fmt === 'LP' ? 'lp' : p.fmt === 'DVD' ? 'dvd' : 'bd'}">
              <div class="case__front"><span class="case__band">${esc(p.fmt)}</span><img src="${covers[i]}" alt="" loading="lazy" /></div>
              <div class="case__spine"><span>OBSESSION</span></div>
              <div class="case__back"></div>
            </div>
            <div class="disc__meta">
              ${p.best ? `<span class="chip chip--red">${lang === 'de' ? 'Empfehlung' : 'Top pick'}</span>` : ''}
              <h4 class="h-m">${esc(t(p.title))}</h4>
              <p class="muted">${esc(t(p.x))}</p>
            </div>
          </a>`,
          )
          .join('')}
      </div>

      <div class="cinema">
        <div class="cinema__text">
          <p class="kicker">${lang === 'de' ? 'Kino-Finder' : 'Cinema finder'}</p>
          <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Läuft er noch in deiner Nähe?' : 'Is it still playing near you?'}</h3>
          <p class="body-l">${
            lang === 'de'
              ? 'Der reguläre Kinolauf (Start: 25. Juni 2026) ist weitgehend vorbei. Ob ein Kino in deiner Nähe den Film noch oder wieder zeigt – etwa in einer Horror-Nacht –, findest du hier: alle Kinos in deiner Umgebung, mit direktem Link zum Programm.'
              : 'The regular theatrical run is mostly over. Whether a cinema near you still – or again – shows the film, for example at a horror night, you can find out here: every cinema around you, with a direct link to its showtimes.'
          }</p>
          <div class="cinema__actions">
            <button class="btn btn--red" id="geo-btn" type="button">${lang === 'de' ? 'Meinen Standort verwenden' : 'Use my location'} <span class="arrow">⌖</span></button>
            <form class="cinema__form" id="city-form">
              <input name="city" placeholder="${lang === 'de' ? 'oder Stadt eingeben, z. B. Berlin' : 'or enter a city, e.g. Berlin'}" />
              <button class="btn" type="submit">${lang === 'de' ? 'Suchen' : 'Search'}</button>
            </form>
          </div>
          <p class="mono muted cinema__privacy">${
            lang === 'de'
              ? 'Datenschutz: Dein Standort wird nur nach deiner Zustimmung im Browser abgefragt, auf ca. 1 km gerundet und nur an OpenStreetMap (Overpass/Nominatim) gesendet, um Kinos zu finden. Nichts wird gespeichert.'
              : 'Privacy: your location is only requested in the browser after your consent, rounded to about 1 km and only sent to OpenStreetMap (Overpass/Nominatim) to find cinemas. Nothing is stored.'
          }</p>
          <p class="cinema__status mono" aria-live="polite"></p>
          <ul class="cinema__list"></ul>
          <div class="cinema__links">${cinemaLinks('').map((l) => `<a class="chip" href="${l.url}" target="_blank" rel="noopener">${esc(l.name)} ↗</a>`).join('')}</div>
        </div>
        <div class="cinema__map"><div id="cine-map" class="map"></div><div class="cinema__placeholder"><img src="${M.still.carHouse}" alt="" loading="lazy" /><span class="mono">${lang === 'de' ? 'Karte erscheint nach der Suche' : 'Map appears after searching'}</span></div></div>
      </div>

      <div class="dates">
        <h3 class="h-l" data-reveal="lines">${lang === 'de' ? 'Alle Termine' : 'All dates'}</h3>
        <ol class="dates__list" data-reveal="stagger">
          ${releaseDates.map((d) => `<li><span class="mono red">${fmtDate(d.d)}</span><span>${esc(t(d.x))}</span></li>`).join('')}
        </ol>
      </div>
    </div>
  </section>`;
}

/* ---------- Kino-Finder ---------- */
const round = (v) => Math.round(v * 100) / 100;

function distKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

async function findCinemas(lat, lon, radius = 25000) {
  const q = `[out:json][timeout:25];(node["amenity"="cinema"](around:${radius},${lat},${lon});way["amenity"="cinema"](around:${radius},${lat},${lon}););out center 60;`;
  const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: `data=${encodeURIComponent(q)}`, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  if (!res.ok) throw new Error('overpass');
  const data = await res.json();
  return data.elements
    .map((e) => {
      const p = { lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon };
      const tg = e.tags || {};
      return {
        name: tg.name || (lang === 'de' ? 'Kino' : 'Cinema'),
        city: tg['addr:city'] || '',
        street: [tg['addr:street'], tg['addr:housenumber']].filter(Boolean).join(' '),
        web: tg.website || tg['contact:website'] || '',
        ...p,
        d: distKm({ lat, lon }, p),
      };
    })
    .filter((c) => c.lat && c.name)
    .sort((a, b) => a.d - b.d)
    .slice(0, 12);
}

async function reverseCity(lat, lon) {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&lat=${lat}&lon=${lon}&accept-language=${lang}`);
    const j = await r.json();
    return j.address?.city || j.address?.town || j.address?.village || j.address?.county || '';
  } catch {
    return '';
  }
}

async function geocode(city) {
  const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(city)}&accept-language=${lang}`);
  const j = await r.json();
  if (!j[0]) throw new Error('notfound');
  return { lat: parseFloat(j[0].lat), lon: parseFloat(j[0].lon), name: j[0].display_name.split(',')[0] };
}

export function initWatch() {
  const status = $('.cinema__status');
  const list = $('.cinema__list');
  const links = $('.cinema__links');
  let map = null;
  let layer = null;

  async function run(lat, lon, place) {
    status.textContent = lang === 'de' ? 'Suche Kinos im Umkreis von 25 km …' : 'Searching cinemas within 25 km …';
    list.innerHTML = '';
    try {
      const [cinemas, city] = await Promise.all([findCinemas(lat, lon), place ? Promise.resolve(place) : reverseCity(lat, lon)]);
      links.innerHTML = cinemaLinks(city).map((l) => `<a class="chip" href="${l.url}" target="_blank" rel="noopener">${esc(l.name)}${l.name === 'Google' && city ? ` · ${esc(city)}` : ''} ↗</a>`).join('');
      if (!cinemas.length) {
        status.textContent = lang === 'de' ? 'Keine Kinos im Umkreis gefunden.' : 'No cinemas found nearby.';
        return;
      }
      status.textContent = lang === 'de' ? `${cinemas.length} Kinos in der Nähe${city ? ` von ${city}` : ''}` : `${cinemas.length} cinemas near${city ? ` ${city}` : ' you'}`;
      list.innerHTML = cinemas
        .map((c, i) => {
          const search = `https://www.google.com/search?q=${encodeURIComponent(`${c.name} ${c.city} Obsession Spielzeiten`)}`;
          return `<li data-i="${i}"><span class="mono red">${fmtNumber(c.d, { maximumFractionDigits: 1 })} km</span><div><h4>${esc(c.name)}</h4><p class="muted">${esc([c.street, c.city].filter(Boolean).join(', '))}</p></div><div class="cinema__btns">${c.web ? `<a class="chip" href="${esc(c.web)}" target="_blank" rel="noopener">${lang === 'de' ? 'Website' : 'Website'} ↗</a>` : ''}<a class="chip chip--red" href="${search}" target="_blank" rel="noopener">${lang === 'de' ? 'Spielzeiten' : 'Showtimes'} ↗</a></div></li>`;
        })
        .join('');

      const { makeMap, pulseIcon, youIcon } = await import('../core/map.js');
      const L = (await import('leaflet')).default;
      $('.cinema__placeholder')?.remove();
      if (!map) map = await makeMap('cine-map', [lat, lon], 11);
      layer?.remove();
      layer = L.layerGroup().addTo(map);
      L.marker([lat, lon], { icon: youIcon() }).addTo(layer);
      const ms = cinemas.map((c, i) => L.marker([c.lat, c.lon], { icon: pulseIcon(String(i + 1)) }).addTo(layer).bindPopup(`<b>${esc(c.name)}</b><br>${fmtNumber(c.d, { maximumFractionDigits: 1 })} km`));
      map.fitBounds(L.featureGroup(ms).getBounds().pad(0.2));
      $$('li', list).forEach((li) => li.addEventListener('mouseenter', () => ms[li.dataset.i].openPopup()));
    } catch {
      status.textContent = lang === 'de' ? 'Die Kino-Suche ist gerade nicht erreichbar. Nutze die Links unten.' : 'Cinema search is unavailable right now. Use the links below.';
    }
  }

  $('#geo-btn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      status.textContent = lang === 'de' ? 'Dein Browser unterstützt keine Standortabfrage.' : 'Your browser does not support geolocation.';
      return;
    }
    status.textContent = lang === 'de' ? 'Warte auf Freigabe …' : 'Waiting for permission …';
    navigator.geolocation.getCurrentPosition(
      (pos) => run(round(pos.coords.latitude), round(pos.coords.longitude)),
      () => (status.textContent = lang === 'de' ? 'Standort nicht freigegeben – gib alternativ eine Stadt ein.' : 'Location not shared – enter a city instead.'),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 },
    );
  });

  $('#city-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = new FormData(e.currentTarget).get('city')?.toString().trim();
    if (!city) return;
    status.textContent = lang === 'de' ? 'Suche Ort …' : 'Looking up place …';
    try {
      const g = await geocode(city);
      run(round(g.lat), round(g.lon), g.name);
    } catch {
      status.textContent = lang === 'de' ? 'Ort nicht gefunden.' : 'Place not found.';
    }
  });
}
