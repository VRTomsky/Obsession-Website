// Wo kann man Obsession sehen? Stand Oktober 2026. Links führen zur Suche des jeweiligen Anbieters.
const q = encodeURIComponent('Obsession Curry Barker');
const qDe = encodeURIComponent('Obsession Du sollst mich lieben');

export const streaming = {
  de: [
    { name: 'Prime Video', type: { de: 'Kaufen & Leihen (OV + DE)', en: 'Buy & rent (OV + German)' }, url: `https://www.amazon.de/s?k=${qDe}&i=instant-video`, tone: '#00a8e1' },
    { name: 'Apple TV', type: { de: 'Kaufen & Leihen · 4K', en: 'Buy & rent · 4K' }, url: 'https://tv.apple.com/de/search?term=Obsession', tone: '#f5f5f7' },
    { name: 'Google TV', type: { de: 'Kaufen & Leihen', en: 'Buy & rent' }, url: `https://play.google.com/store/search?q=${qDe}&c=movies`, tone: '#34a853' },
    { name: 'YouTube', type: { de: 'Kaufen & Leihen', en: 'Buy & rent' }, url: `https://www.youtube.com/results?search_query=${qDe}+film+kaufen`, tone: '#ff0033' },
    { name: 'Sky Store', type: { de: 'Kaufen & Leihen', en: 'Buy & rent' }, url: 'https://www.skystore.com/de', tone: '#e5004c' },
    { name: 'Rakuten TV', type: { de: 'Kaufen & Leihen', en: 'Buy & rent' }, url: `https://www.rakuten.tv/de/search?q=${encodeURIComponent('Obsession')}`, tone: '#bf0000' },
  ],
  us: [
    { name: 'Peacock', type: { de: 'Im Abo (USA)', en: 'Subscription (US)' }, url: 'https://www.peacocktv.com/', tone: '#ffd400' },
    { name: 'Prime Video', type: { de: 'Kaufen & Leihen (USA)', en: 'Buy & rent (US)' }, url: `https://www.amazon.com/s?k=${q}&i=instant-video`, tone: '#00a8e1' },
    { name: 'Apple TV', type: { de: 'Kaufen & Leihen (USA)', en: 'Buy & rent (US)' }, url: 'https://tv.apple.com/us/movie/obsession/umc.cmc.5n9tcj7azek0g9igds7ybcc0s', tone: '#f5f5f7' },
    { name: 'Fandango at Home', type: { de: 'Kaufen & Leihen (USA)', en: 'Buy & rent (US)' }, url: 'https://athome.fandango.com/', tone: '#ff7300' },
  ],
  justwatch: 'https://www.justwatch.com/de/Suche?q=Obsession',
};

export const physical = [
  {
    fmt: '4K UHD',
    title: { de: '4K Ultra HD + Blu-ray', en: '4K Ultra HD + Blu-ray' },
    x: { de: 'Dolby Vision / HDR10, Dolby Atmos (in den USA als Collector\'s Edition). Deutsche Fassung von Universal im Vertrieb von PLAION PICTURES.', en: 'Dolby Vision / HDR10, Dolby Atmos (Collector\'s Edition in the US). German release by Universal, distributed by PLAION PICTURES.' },
    url: 'https://www.amazon.de/dp/B0H6RQPGXD',
    best: true,
  },
  {
    fmt: 'Blu-ray',
    title: { de: 'Blu-ray', en: 'Blu-ray' },
    x: { de: 'Full HD mit Audiokommentar von Curry Barker und Behind-the-Scenes-Featurette.', en: 'Full HD with Curry Barker\'s audio commentary and a behind-the-scenes featurette.' },
    url: `https://www.amazon.de/s?k=${qDe}+Blu-ray`,
  },
  {
    fmt: 'DVD',
    title: { de: 'DVD', en: 'DVD' },
    x: { de: 'Die klassische Fassung – FSK 16.', en: 'The classic edition – rated FSK 16.' },
    url: `https://www.amazon.de/s?k=${qDe}+DVD`,
  },
  {
    fmt: 'LP',
    title: { de: 'Soundtrack auf Vinyl', en: 'Soundtrack on vinyl' },
    x: { de: 'Rock Burwells Score bei Waxwork Records – Vinyl, CD und Kassette.', en: 'Rock Burwell\'s score from Waxwork Records – vinyl, CD and cassette.' },
    url: 'https://waxworkrecords.com/search?q=obsession',
  },
];

export const releaseDates = [
  { d: '2025-09-05', x: { de: 'Weltpremiere, TIFF', en: 'World premiere, TIFF' } },
  { d: '2026-05-15', x: { de: 'Kinostart USA & UK', en: 'US & UK theatrical release' } },
  { d: '2026-06-25', x: { de: 'Kinostart Deutschland & Österreich', en: 'Germany & Austria theatrical release' } },
  { d: '2026-06-30', x: { de: 'Digital (PVOD) in den USA', en: 'Digital (PVOD) in the US' } },
  { d: '2026-07-14', x: { de: '4K, Blu-ray & DVD in den USA', en: '4K, Blu-ray & DVD in the US' } },
  { d: '2026-07-17', x: { de: 'Streaming auf Peacock (USA)', en: 'Streaming on Peacock (US)' } },
  { d: '2026-09-25', x: { de: '4K, Blu-ray, DVD & Stream in Deutschland', en: '4K, Blu-ray, DVD & digital in Germany' } },
];

// Feste Kino-Links (werden mit Ort ergänzt)
export const cinemaLinks = (place) => {
  const p = encodeURIComponent(place || '');
  return [
    { name: 'kino.de', url: 'https://www.kino.de/film/obsession--01KCTX1V9J9F8F0NFFPTAEKXDJ' },
    { name: 'Google', url: `https://www.google.com/search?q=${encodeURIComponent('Obsession Kino')}+${p}` },
    { name: 'Fandango (USA)', url: 'https://www.fandango.com/obsession-2026-242812/movie-overview' },
  ];
};
