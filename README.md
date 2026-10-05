# OBSESSION – Fan-Website

Inoffizielle, interaktive Fan-Website zum Horrorfilm **„Obsession“** (2025) von Curry Barker – mit Michael Johnston und Inde Navarrette.
Desktop-first, Deutsch als Standardsprache, per Knopfdruck auf Englisch umschaltbar.

> Nicht-kommerzielles Fanprojekt. Alle Rechte an Film, Bildern, Logo und Trailer liegen bei den jeweiligen Rechteinhabern
> (Focus Features, Universal Pictures, Blumhouse, Tea Shop Productions, Capstone Studios).

## Inhalte

| Bereich | Was passiert |
| --- | --- |
| **Hero** | Filmclip als WebGL-Shader: Maus-Linse, chromatische Aberration wie im Logo, Gedrückthalten = Zeitlupe + Glitch. Beim Scrollen wird das Bild unscharf und dunkel, das Logo fliegt in die Navigation. |
| **Der Film** | Prämisse, Eckdaten, Credits, Handlung in zehn Kapiteln mit Sticky-Bildern, Themen, selbst drehender 3D-Galerie-Ring (ziehen / wischen, Klick vergrößert), Trailer & Clips (YouTube erst nach Klick). |
| **Cast & Crew** | Hauptrollen, Freundeskreis, Regisseur. Klick öffnet das Profil im selben Tab mit Übergangsanimation; Weiterscrollen lädt automatisch die nächste Person. |
| **Profile** | Fotos, Geburtstag, Alter, Geburtsort/Land, Filmografie mit IMDb-Links, kommende Projekte, was „Obsession“ für die Person verändert hat. |
| **Figuren** | Bear, Nikki, Freaky Nikki, Ian, Sarah, Carter, Viola & Harry, Kundenservice, Sandy, One Wish Willow – Motive, Beziehungen, Schicksal, Interpretation. |
| **One Wish Willow** | 3D-Modell zum Drehen; gedrückt halten zerbricht es. Danach einen Wunsch eintippen – er wird „wörtlich“ erfüllt. |
| **Das Phänomen** | Zähler von 750.000 $ auf 519 Mio. $, Wochenend-Kurve, Rekorde, Top-Märkte, Vergleich mit anderen Low-Budget-Hits, Zeitleiste. |
| **Hinter den Kulissen** | Produktion, Drehorte (Karte erst nach Klick), alternatives Ende, Musik, Trivia-Karten. |
| **Fans, Theorien, Zukunft** | Kritiken und Auszeichnungen, Fankultur, Theorien mit Wahrscheinlichkeit, Barkers nächste Filme mit Countdown, Projekte des Casts. |
| **Quiz** | Wissensquiz und „Welche Figur bist du?“. |
| **Ansehen** | Streaming DE/USA, 4K/Blu-ray/DVD/Vinyl mit Original-Covern, Kino-Finder in deiner Nähe, alle Termine. |

Extras: Preloader, Filmkorn, weiches Scrollen, synthetischer Sound (aus, bis man ihn einschaltet), Vollbild-Menü.

## Datenschutz

- Keine Cookies, kein Tracking, Schriften lokal eingebunden.
- Standort für den Kino-Finder nur nach Klick und Browser-Freigabe, auf ca. 1 km gerundet, nur an OpenStreetMap (Overpass/Nominatim) gesendet.
- Karten (OpenStreetMap, ohne API-Schlüssel) und YouTube-Videos laden erst nach ausdrücklichem Klick.
- Keine Privatadressen – Drehorte nur als ungefähre Lage.

## Technik

- [Vite](https://vitejs.dev) (Multi-Page: `index.html`, `person.html`, `figur.html`)
- [GSAP](https://gsap.com) + ScrollTrigger + SplitText, [Lenis](https://lenis.darkroom.engineering) für weiches Scrollen
- [three.js](https://threejs.org) für Hero-Shader und den 3D-Willow
- [Leaflet](https://leafletjs.com) für Karten
- Schriften: Fira Sans Extra Condensed (nah an der Obsession-Typo), Instrument Serif, Inter, JetBrains Mono

```
src/
  core/       Grundbausteine (i18n, Scrollen, Layout/Navigation, Sound, Effekte, Karten)
  three/      WebGL: Hero-Shader, One Wish Willow
  sections/   Abschnitte der Startseite
  pages/      Einstiegspunkte (Startseite, Personen, Figuren, Endlos-Feed)
  data/       Alle Inhalte zweisprachig ({ de, en })
  styles/     CSS
public/media/ Bilder, Videoclips, Logos
tools/assets/ Skripte + Workflow zum Herunterladen der Medien
```

## Lokal starten

```bash
npm install
npm run dev       # Entwicklungsserver
npm run build     # fertige Seite nach dist/
npm run preview   # gebaute Seite ansehen
```

## Veröffentlichen (GitHub Pages)

Der Workflow `.github/workflows/deploy.yml` baut die Seite bei jedem Push und veröffentlicht sie.
Einmalig nötig: **Settings → Pages → Build and deployment → Source: „GitHub Actions“**.
Danach den Workflow unter **Actions → Deploy to GitHub Pages → Run workflow** starten (oder etwas pushen).
Adresse: `https://vrtomsky.github.io/Obsession-Website/`

## Inhalte ändern

Alle Texte liegen in `src/data/*.js` als `{ de: '…', en: '…' }`. Bilder und Clips sind in `src/data/media.js` zugeordnet.
Neue Medien: Eintrag in `tools/assets/build_manifest.py`, dann `python3 tools/assets/build_manifest.py` – der Workflow
„Fetch media assets“ lädt sie herunter und committet sie.

## Geräte

Desktop-first, mit eigenen Layouts für iPad (hoch und quer) und Smartphones: einspaltige Raster, senkrechte Zeitleiste,
wischbare Galerie, Personenleiste unten statt rechts. Getestet bei 1600×900, 1180×820, 820×1180 und 390×844.
