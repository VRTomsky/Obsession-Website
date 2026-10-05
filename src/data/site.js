// Oberflächen-Texte, Navigation, Hinter-den-Kulissen-Daten und Quellen.
import { M } from './media.js';

export const nav = [
  { id: 'film', label: { de: 'Der Film', en: 'The Film' } },
  { id: 'cast', label: { de: 'Cast & Crew', en: 'Cast & Crew' } },
  { id: 'figuren', label: { de: 'Figuren', en: 'Characters' } },
  { id: 'phaenomen', label: { de: 'Das Phänomen', en: 'The Phenomenon' } },
  { id: 'kulissen', label: { de: 'Hinter den Kulissen', en: 'Behind the Scenes' } },
  { id: 'zukunft', label: { de: 'Was kommt', en: 'What\'s Next' } },
  { id: 'ansehen', label: { de: 'Ansehen', en: 'Watch' } },
];

// Vollbild-Menü (alle Bereiche, mit Vorschaubild)
export const menu = [
  { id: 'top', label: { de: 'Start', en: 'Home' }, img: M.still.wish },
  { id: 'film', label: { de: 'Der Film', en: 'The Film' }, img: M.still.storeCouple },
  { id: 'cast', label: { de: 'Cast & Crew', en: 'Cast & Crew' }, img: M.commons.castTiff },
  { id: 'figuren', label: { de: 'Figuren', en: 'Characters' }, img: M.still.watching },
  { id: 'willow', label: { de: 'Der Willow', en: 'The Willow' }, img: M.still.willow },
  { id: 'phaenomen', label: { de: 'Das Phänomen', en: 'The Phenomenon' }, img: M.still.friends },
  { id: 'kulissen', label: { de: 'Hinter den Kulissen', en: 'Behind the Scenes' }, img: M.still.btsCamera },
  { id: 'fans', label: { de: 'Fans & Kritiken', en: 'Fans & Reviews' }, img: M.still.date },
  { id: 'theorien', label: { de: 'Theorien', en: 'Theories' }, img: M.still.phone },
  { id: 'zukunft', label: { de: 'Was kommt', en: 'What\'s Next' }, img: M.still.redDoorScratch },
  { id: 'quiz', label: { de: 'Quiz', en: 'Quiz' }, img: M.still.party },
  { id: 'ansehen', label: { de: 'Ansehen', en: 'Watch' }, img: M.poster.main },
];

export const ui = {
  menu: { de: 'Menü', en: 'Menu' },
  close: { de: 'Schließen', en: 'Close' },
  sound: { de: 'Ton: offizieller Soundtrack „Love Is in the Air" (lädt YouTube)', en: 'Sound: official soundtrack "Love Is in the Air" (loads YouTube)' },
  soundOn: { de: 'Ton an', en: 'Sound on' },
  soundOff: { de: 'Ton aus', en: 'Sound off' },
  scroll: { de: 'Scrollen', en: 'Scroll' },
  loading: { de: 'Wird geladen', en: 'Loading' },
  tagline: { de: 'Pass auf, was du dir wünschst …', en: 'Be careful who you wish for…' },
  subtitleDe: 'Du sollst mich lieben',
  heroMeta: { de: 'Ein Film von Curry Barker · 2025 · 109 Min.', en: 'A film by Curry Barker · 2025 · 109 min' },
  fanSite: { de: 'Inoffizielle Fan-Website', en: 'Unofficial fan site' },
  open: { de: 'Öffnen', en: 'Open' },
  drag: { de: 'Ziehen', en: 'Drag' },
  play: { de: 'Abspielen', en: 'Play' },
  more: { de: 'Mehr', en: 'More' },
  back: { de: 'Zurück', en: 'Back' },
  backHome: { de: 'Zur Startseite', en: 'Back home' },
  next: { de: 'Weiter', en: 'Next' },
  nextUp: { de: 'Als Nächstes', en: 'Up next' },
  keepScrolling: { de: 'Weiterscrollen für die nächste Person', en: 'Keep scrolling for the next person' },
  keepScrollingChar: { de: 'Weiterscrollen für die nächste Figur', en: 'Keep scrolling for the next character' },
  born: { de: 'Geboren', en: 'Born' },
  age: { de: 'Alter', en: 'Age' },
  years: { de: 'Jahre', en: 'years' },
  birthplace: { de: 'Geburtsort', en: 'Birthplace' },
  raised: { de: 'Aufgewachsen', en: 'Raised in' },
  country: { de: 'Land', en: 'Country' },
  lives: { de: 'Lebt in', en: 'Based in' },
  notPublic: { de: 'nicht öffentlich', en: 'not public' },
  role: { de: 'Rolle in Obsession', en: 'Role in Obsession' },
  filmography: { de: 'Filme & Serien', en: 'Films & series' },
  filmographyHint: { de: 'Klick öffnet IMDb', en: 'Click opens IMDb' },
  upcoming: { de: 'Kommende Projekte', en: 'Upcoming projects' },
  impact: { de: 'Was Obsession verändert hat', en: 'What Obsession changed' },
  gallery: { de: 'Bilder', en: 'Photos' },
  facts: { de: 'Gut zu wissen', en: 'Good to know' },
  imdbProfile: { de: 'IMDb-Profil', en: 'IMDb profile' },
  playedBy: { de: 'Gespielt von', en: 'Played by' },
  connection: { de: 'Woher sie sich kennen', en: 'How they\'re connected' },
  why: { de: 'Warum handelt die Figur so?', en: 'Why do they act this way?' },
  moments: { de: 'Schlüsselmomente', en: 'Key moments' },
  fate: { de: 'Schicksal', en: 'Fate' },
  interpretation: { de: 'Interpretation', en: 'Interpretation' },
  interpretationNote: { de: 'Unsere Deutung – nicht offiziell bestätigt.', en: 'Our reading – not officially confirmed.' },
  fanRating: { de: 'Fan-Einschätzung', en: 'Fan rating' },
  traits: { de: 'Eigenschaften', en: 'Traits' },
  allCast: { de: 'Alle Personen', en: 'All people' },
  allCharacters: { de: 'Alle Figuren', en: 'All characters' },
  director: { de: 'Regie', en: 'Director' },
  ytConsentTitle: { de: 'Video von YouTube laden?', en: 'Load video from YouTube?' },
  ytConsentText: { de: 'Beim Abspielen werden Daten an YouTube (Google) übertragen. Erst nach deinem Klick wird eine Verbindung aufgebaut.', en: 'Playing sends data to YouTube (Google). A connection is only made after you click.' },
  ytConsentBtn: { de: 'Video laden', en: 'Load video' },
  mapConsentBtn: { de: 'Karte laden', en: 'Load map' },
  mapConsentText: { de: 'Die Karte lädt Satellitenbilder und Kartenkacheln von Esri (ArcGIS). Erst nach deinem Klick wird eine Verbindung aufgebaut.', en: 'The map loads satellite imagery and map tiles from Esri (ArcGIS). A connection is only made after you click.' },
  copyright: { de: 'Alle Rechte an Film, Bildern, Logo und Trailer liegen bei den jeweiligen Rechteinhabern (Focus Features, Universal Pictures, Blumhouse, Tea Shop Productions, Capstone Studios). Diese Seite ist ein nicht-kommerzielles Fanprojekt und steht in keiner Verbindung zu ihnen.', en: 'All rights to the film, images, logo and trailer belong to their respective owners (Focus Features, Universal Pictures, Blumhouse, Tea Shop Productions, Capstone Studios). This site is a non-commercial fan project and is not affiliated with them.' },
};

export const sections = {
  film: { n: '01', kicker: { de: 'Der Film', en: 'The Film' }, title: { de: 'Liebe auf Bestellung.', en: 'Love, made to order.' } },
  story: { kicker: { de: 'Die Handlung', en: 'The Story' }, title: { de: 'Zehn Kapitel bis zum Ende', en: 'Ten chapters to the end' } },
  themes: { kicker: { de: 'Worum es wirklich geht', en: 'What it\'s really about' } },
  videos: { kicker: { de: 'Trailer & Clips', en: 'Trailers & clips' } },
  cast: { n: '02', kicker: { de: 'Cast & Crew', en: 'Cast & Crew' }, title: { de: 'Die Gesichter hinter dem Wunsch', en: 'The faces behind the wish' }, lead: { de: 'Klick auf eine Person, um ihr Profil zu öffnen. Scrollst du dort weiter, kommt automatisch die nächste.', en: 'Click a person to open their profile. Keep scrolling there and the next one follows automatically.' } },
  figuren: { n: '03', kicker: { de: 'Die Figuren', en: 'The Characters' }, title: { de: 'Wer sie sind. Warum sie es taten.', en: 'Who they are. Why they did it.' }, lead: { de: 'Von Bear bis zum Kundenservice: Fakten aus dem Film und unsere Interpretation.', en: 'From Bear to customer service: facts from the film and our interpretation.' } },
  willow: { n: '04', kicker: { de: 'Der One Wish Willow', en: 'The One Wish Willow' }, title: { de: 'Zerbrich ihn. Wünsch dir was.', en: 'Break it. Make a wish.' }, lead: { de: 'Dreh den Willow. Halte ihn gedrückt, um ihn zu zerbrechen – und tipp deinen Wunsch ein. Er wird erfüllt. Wörtlich.', en: 'Spin the Willow. Press and hold to break it – then type your wish. It will be granted. Literally.' }, placeholder: { de: 'Ich wünsche mir …', en: 'I wish …' }, submit: { de: 'Wunsch abschicken', en: 'Make the wish' }, hold: { de: 'Gedrückt halten zum Zerbrechen', en: 'Press & hold to break' }, again: { de: 'Noch ein Wunsch', en: 'Another wish' }, disclaimer: { de: 'Keine Sorge: Dein Wunsch verlässt deinen Browser nicht.', en: 'Don\'t worry: your wish never leaves your browser.' } },
  phaenomen: { n: '05', kicker: { de: 'Das Phänomen', en: 'The Phenomenon' }, title: { de: 'Wie ein 750.000-$-Film die Welt eroberte', en: 'How a $750K film conquered the world' } },
  kulissen: { n: '06', kicker: { de: 'Hinter den Kulissen', en: 'Behind the Scenes' }, title: { de: '26 Drehtage. Ein Haus in Burbank. Kein CGI.', en: '26 shooting days. A house in Burbank. No CGI.' } },
  fans: { n: '07', kicker: { de: 'Fans & Kritiken', en: 'Fans & Reviews' }, title: { de: 'Ein Film, über den alle reden', en: 'A film everyone talks about' } },
  theorien: { n: '08', kicker: { de: 'Theorien', en: 'Theories' }, title: { de: 'Was der Film nicht erzählt', en: 'What the film doesn\'t tell you' }, lead: { de: 'Barker hat die Mythologie des Willows bewusst offen gelassen. Hier ist Raum zum Spekulieren.', en: 'Barker deliberately left the Willow\'s mythology open. Here\'s room to speculate.' } },
  zukunft: { n: '09', kicker: { de: 'Was kommt', en: 'What\'s Next' }, title: { de: 'Nach dem Wunsch', en: 'After the wish' } },
  quiz: { n: '10', kicker: { de: 'Quiz', en: 'Quiz' }, title: { de: 'Wie obsessed bist du?', en: 'How obsessed are you?' } },
  ansehen: { n: '11', kicker: { de: 'Ansehen', en: 'Watch' }, title: { de: 'Wo du Obsession sehen kannst', en: 'Where to watch Obsession' } },
};

export const production = [
  { k: '8', u: { de: 'Monate', en: 'months' }, x: { de: 'schrieb Barker am Drehbuch – nebenbei im Coffeeshop.', en: 'Barker spent writing the script – while working at a coffee shop.' } },
  { k: '26', u: { de: 'Drehtage', en: 'shooting days' }, x: { de: '20 Tage plus Nachdrehs, 5–6 Drehbuchseiten pro Tag.', en: '20 days plus reshoots, 5–6 script pages a day.' } },
  { k: '1½', u: { de: 'Wochen', en: 'weeks' }, x: { de: 'allein in Bears Haus in Burbank – gedreht ganz am Anfang.', en: 'in Bear\'s house in Burbank alone – shot right at the start.' } },
  { k: '0', u: { de: 'CGI für Nikki', en: 'CGI for Nikki' }, x: { de: 'Alles praktisch: Make-up, Schauspiel, Kamera.', en: 'All practical: makeup, performance, camera.' } },
];

export const process = [
  { t: { de: 'Vorvisualisierung in 3D', en: '3D previsualization' }, x: { de: 'Barker und Kameramann Taylor Clemons scannten die Drehorte in 3D und planten jede Einstellung digital vor. So brauchten sie weniger Takes und konnten Effekte direkt in der Kamera umsetzen.', en: 'Barker and DP Taylor Clemons 3D-scanned the locations and planned every shot digitally. That meant fewer takes and in-camera effects.' }, img: M.still.btsMonitor },
  { t: { de: 'Unbequeme Bilder', en: 'Uncomfortable frames' }, x: { de: 'Der Film ist „center-composed" mit extra viel Kopfraum gedreht – Bildaufteilungen, die sich bewusst falsch anfühlen.', en: 'The film is shot "center-composed" with extra headroom – framing that deliberately feels off.' }, img: M.still.hallway },
  { t: { de: 'Autos im Studio', en: 'Cars on a stage' }, x: { de: 'Die Gespräche im Auto – etwa vor dem Wunsch – entstanden auf einer Bühne vor LED-Wänden.', en: 'The conversations in the car – like the one before the wish – were shot on a soundstage in front of LED walls.' }, img: M.still.wishClose },
  { t: { de: 'Uncanny Valley', en: 'Uncanny valley' }, x: { de: 'Für Freaky Nikki kombinierte das Make-up-Team einen TikTok-Trend mit praktischen Effekten. Navarrette erarbeitete Nikkis Bewegungen gemeinsam mit Barker.', en: 'For Freaky Nikki, the makeup team combined a TikTok trend with practical effects. Navarrette developed Nikki\'s physicality together with Barker.' }, img: M.still.bloodGrin },
  { t: { de: 'Schnitt im Schlafzimmer', en: 'Editing in the bedroom' }, x: { de: 'Barker schnitt selbst in Adobe Premiere und nahm die Kundenservice-Stimme mit dem Handy auf, während er schnitt – den Text passte er dem Schnitt an.', en: 'Barker edited in Adobe Premiere himself and recorded the customer service voice on his phone while cutting – adapting the lines to the edit.' }, img: M.still.phone },
];

// Drehorte: bewusst nur ungefähre Lage (Stadtteil), keine Privatadressen.
export const locations = [
  { name: { de: 'Bears Haus', en: 'Bear\'s house' }, place: 'Burbank', lat: 34.1808, lng: -118.309, x: { de: 'Ein Wohnhaus in Burbank, umgebaut von Szenenbildnerin Vivian Gray. Privatbesitz – nur ungefähre Lage.', en: 'A house in Burbank, remodeled by production designer Vivian Gray. Private property – approximate area only.' } },
  { name: { de: 'Der Musikladen', en: 'The music store' }, place: 'San Fernando', lat: 34.2819, lng: -118.439, x: { de: 'Gedreht bei Cassell\'s Music in San Fernando. Der Laden schloss ein Jahr nach Drehschluss für immer.', en: 'Shot at Cassell\'s Music in San Fernando. The store closed for good a year after filming wrapped.' } },
  { name: { de: 'Der Kristallladen', en: 'The crystal shop' }, place: 'Burbank', lat: 34.1745, lng: -118.33, x: { de: 'Der Green Man Store – hier kauft Bear den One Wish Willow.', en: 'The Green Man Store – where Bear buys the One Wish Willow.' } },
  { name: { de: 'Die Bar', en: 'The bar' }, place: 'Burbank', lat: 34.1655, lng: -118.3175, x: { de: 'Die Roguelike Tavern in Burbank.', en: 'The Roguelike Tavern in Burbank.' } },
  { name: { de: 'Das Restaurant', en: 'The restaurant' }, place: 'North Hollywood', lat: 34.1595, lng: -118.3705, x: { de: 'Little Toni\'s, eine Pizzeria-Institution in North Hollywood.', en: 'Little Toni\'s, a North Hollywood pizzeria institution.' } },
];

export const sources = [
  ['Wikipedia: Obsession (2025 film)', 'https://en.wikipedia.org/wiki/Obsession_(2025_film)'],
  ['Wikipedia: Curry Barker', 'https://en.wikipedia.org/wiki/Curry_Barker'],
  ['Box Office Mojo', 'https://www.boxofficemojo.com/title/tt37287335/'],
  ['IMDb', 'https://www.imdb.com/title/tt37287335/'],
  ['TMDB (Bilder)', 'https://www.themoviedb.org/movie/1339713-obsession'],
  ['Wikimedia Commons (Fotos, CC-Lizenzen)', 'https://commons.wikimedia.org/wiki/Category:Obsession_(2025_film)'],
  ['Deadline', 'https://deadline.com/2026/05/box-office-obsession-1236914476/'],
  ['The Hollywood Reporter', 'https://www.hollywoodreporter.com/movies/movie-news/box-office-obsession-second-weekend-spike-1236606229/'],
  ['Filmstarts', 'https://www.filmstarts.de/kritiken/1000028234.html'],
];
