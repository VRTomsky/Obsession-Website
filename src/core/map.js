// Leaflet-Karte mit Esri-Kacheln (frei nutzbar, kein API-Schlüssel nötig) – wird nur nach Einwilligung geladen.
// Standard: Satellitenbild mit Straßen- und Ortsnamen; umschaltbar auf eine dunkle Straßenkarte.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { lang } from './i18n.js';

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
const tiles = (path, opts = {}) => L.tileLayer(`${ESRI}/${path}/MapServer/tile/{z}/{y}/{x}`, { maxZoom: 19, maxNativeZoom: 19, ...opts });

export async function makeMap(id, center, zoom) {
  const el = document.getElementById(id);
  // Mausrad soll die Karte zoomen und nicht die Seite (Lenis) scrollen
  el.setAttribute('data-lenis-prevent', '');

  const satellite = L.layerGroup([
    tiles('World_Imagery', { attribution: 'Bilder &copy; Esri, Vantor, Earthstar Geographics' }),
    tiles('Reference/World_Transportation', { opacity: 0.75 }),
    tiles('Reference/World_Boundaries_and_Places'),
  ]);
  const dark = L.layerGroup([
    tiles('Canvas/World_Dark_Gray_Base', { maxNativeZoom: 16, attribution: '&copy; Esri, HERE, Garmin, &copy; OpenStreetMap-Mitwirkende' }),
    tiles('Canvas/World_Dark_Gray_Reference', { maxNativeZoom: 16 }),
  ]);

  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: true,
    wheelPxPerZoomLevel: 90,
    attributionControl: true,
    layers: [satellite],
  }).setView(center, zoom);

  const de = lang === 'de';
  L.control.layers({ [de ? 'Satellit' : 'Satellite']: satellite, [de ? 'Karte' : 'Map']: dark }, null, { position: 'topright', collapsed: false }).addTo(map);

  setTimeout(() => map.invalidateSize(), 100);
  return map;
}

export function pulseIcon(label = '') {
  return L.divIcon({
    className: 'pin',
    html: `<span class="pin__pulse"></span><span class="pin__dot">${label}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export function youIcon() {
  return L.divIcon({ className: 'pin pin--you', html: '<span class="pin__pulse"></span><span class="pin__dot">●</span>', iconSize: [30, 30], iconAnchor: [15, 15] });
}
