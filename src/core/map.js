// Leaflet-Karte (OpenStreetMap-Kacheln, per CSS abgedunkelt, kein API-Schlüssel nötig) – wird nur nach Einwilligung geladen.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export async function makeMap(id, center, zoom) {
  const map = L.map(id, { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView(center, zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende',
    maxZoom: 19,
    className: 'map-tiles-dark',
  }).addTo(map);
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
