// Der Erfolg: Zahlen, Rekorde, Zeitleiste. Quellen: Box Office Mojo, Wikipedia, Deadline, THR, Variety.
import { M } from './media.js';

export const headline = {
  budget: 750000,
  gross: 519022133,
  domestic: 263451715,
  international: 255570418,
  rights: 15000000,
};

// Wochenenden USA/Kanada (Fr–So), Box Office Mojo
export const weekends = [
  { w: 1, d: '15.–17.05.', d_en: 'May 15–17', g: 17196855, rank: 3, th: 2615 },
  { w: 2, d: '22.–24.05.', d_en: 'May 22–24', g: 23962340, rank: 2, th: 2655 },
  { w: 3, d: '29.–31.05.', d_en: 'May 29–31', g: 27395480, rank: 2, th: 2781 },
  { w: 4, d: '05.–07.06.', d_en: 'Jun 5–7', g: 25389465, rank: 4, th: 2900 },
  { w: 5, d: '12.–14.06.', d_en: 'Jun 12–14', g: 19008015, rank: 2, th: 3068 },
  { w: 6, d: '19.–21.06.', d_en: 'Jun 19–21', g: 13397205, rank: 3, th: 3053 },
  { w: 7, d: '26.–28.06.', d_en: 'Jun 26–28', g: 9701165, rank: 3, th: 2965 },
  { w: 8, d: '03.–05.07.', d_en: 'Jul 3–5', g: 5201335, rank: 6, th: 2640 },
  { w: 9, d: '10.–12.07.', d_en: 'Jul 10–12', g: 3849365, rank: 7, th: 2069 },
  { w: 10, d: '17.–19.07.', d_en: 'Jul 17–19', g: 2395880, rank: 8, th: 1524 },
  { w: 11, d: '24.–26.07.', d_en: 'Jul 24–26', g: 1547465, rank: 10, th: 1203 },
  { w: 12, d: '31.07.–02.08.', d_en: 'Jul 31–Aug 2', g: 503305, rank: 11, th: 430 },
];

// Top-Märkte international (Box Office Mojo)
export const markets = [
  { c: { de: 'USA & Kanada', en: 'US & Canada' }, g: 263451715 },
  { c: { de: 'China', en: 'China' }, g: 33987778 },
  { c: { de: 'Großbritannien', en: 'United Kingdom' }, g: 26751738 },
  { c: { de: 'Australien', en: 'Australia' }, g: 17932342 },
  { c: { de: 'Deutschland', en: 'Germany' }, g: 16317795, hl: true },
  { c: { de: 'Frankreich', en: 'France' }, g: 13040571 },
  { c: { de: 'Spanien', en: 'Spain' }, g: 10961463 },
  { c: { de: 'Indien', en: 'India' }, g: 10432115 },
  { c: { de: 'Mexiko', en: 'Mexico' }, g: 9564445 },
  { c: { de: 'Russland/GUS', en: 'Russia/CIS' }, g: 7374244 },
];

// Vergleich: Mini-Budget-Horror (Budget → Einspiel weltweit, Quelle: Wikipedia/Box Office Mojo)
export const comparison = [
  { t: 'Obsession', y: 2026, b: 750000, g: 519000000, hl: true },
  { t: 'Enter the Dragon', y: 1973, b: 850000, g: 400000000 },
  { t: 'The Blair Witch Project', y: 1999, b: 60000, g: 248600000 },
  { t: 'Paranormal Activity', y: 2009, b: 15000, g: 193400000 },
  { t: 'Halloween', y: 1978, b: 325000, g: 70000000 },
  { t: 'Saw', y: 2004, b: 1200000, g: 103900000 },
];

export const records = [
  {
    k: { de: 'Erfolgreichster Film mit Budget unter 1 Mio. $', en: 'Highest-grossing film with a budget under $1M' },
    v: { de: 'Überholte am 6. Juli 2026 „Enter the Dragon" (1973, 400 Mio. $).', en: 'Passed "Enter the Dragon" (1973, $400M) on July 6, 2026.' },
  },
  {
    k: { de: 'Wochenend-Wachstum wie seit E.T. nicht mehr', en: 'Weekend growth unseen since E.T.' },
    v: { de: 'Erster Wide Release seit „E.T." (1982), der drei Wochenenden in Folge zulegt (außerhalb Weihnachten).', en: 'First wide release since "E.T." (1982) to grow three weekends in a row (outside Christmas).' },
  },
  {
    k: { de: '+39 % am zweiten Wochenende', en: '+39% in weekend two' },
    v: { de: 'Größter Zuwachs am zweiten Wochenende für einen Film in über 2.500 Kinos außerhalb der Weihnachtszeit.', en: 'Biggest second-weekend increase for a film in 2,500+ theaters outside the Christmas season.' },
  },
  {
    k: { de: 'Größter Focus-Features-Hit aller Zeiten', en: 'Focus Features\' biggest hit ever' },
    v: { de: 'In den USA ab Woche 3, weltweit ab Woche 4 – vorher hielt „Downton Abbey" den Rekord.', en: 'Domestically from week 3, worldwide from week 4 – previously held by "Downton Abbey".' },
  },
  {
    k: { de: 'Erfolgreichster Festival-Einkauf', en: 'Top-grossing festival acquisition' },
    v: { de: 'Überholte „The Blair Witch Project" (248,6 Mio. $) in der fünften Woche.', en: 'Passed "The Blair Witch Project" ($248.6M) in its fifth weekend.' },
  },
  {
    k: { de: 'Stärkster Original-Film der 2020er', en: 'Biggest original film of the 2020s' },
    v: { de: 'Erster englischsprachiger Originalfilm des Jahrzehnts über 500 Mio. $ – vor „Sinners" und „Elemental".', en: 'First English-language original film of the decade to pass $500M – ahead of "Sinners" and "Elemental".' },
  },
  {
    k: { de: 'Platz 5 der Horror-Bestenliste', en: '#5 horror film of all time' },
    v: { de: 'Fünfterfolgreichster Horrorfilm aller Zeiten (nicht inflationsbereinigt), Platz 10 des Kinojahres 2026.', en: 'Fifth highest-grossing horror film ever (unadjusted), #10 film of 2026.' },
  },
  {
    k: { de: 'David gegen Grogu', en: 'David vs. Grogu' },
    v: { de: 'Spielte am Ende mehr ein als Disneys „The Mandalorian and Grogu" – trotz dessen 98-Mio.-$-Start.', en: 'Ultimately outgrossed Disney\'s "The Mandalorian and Grogu" – despite its $98M opening.' },
  },
];

export const timeline = [
  { d: '2017', t: { de: '„that\'s a bad idea"', en: '"that\'s a bad idea"' }, x: { de: 'Curry Barker und Cooper Tomlinson lernen sich an der New York Film Academy in LA kennen, brechen ab und starten ihren Sketch-Kanal.', en: 'Curry Barker and Cooper Tomlinson meet at the New York Film Academy in LA, drop out and start their sketch channel.' } },
  { d: '2023', t: { de: 'The Chair', en: 'The Chair' }, x: { de: 'Barkers Horror-Kurzfilm erreicht über 10 Millionen Aufrufe. Produzent James Harris meldet sich.', en: 'Barker\'s horror short passes 10 million views. Producer James Harris reaches out.' } },
  { d: { de: 'Juli 2023', en: 'July 2023' }, t: { de: 'Die Idee', en: 'The idea' }, x: { de: 'Eine Simpsons-Wiederholung („Treehouse of Horror II") bringt Barker auf den Wunsch.', en: 'A Simpsons rerun ("Treehouse of Horror II") gives Barker the wish idea.' } },
  { d: { de: 'Aug. 2024', en: 'Aug 2024' }, t: { de: 'Milk & Serial', en: 'Milk & Serial' }, x: { de: 'Ein Found-Footage-Slasher für 800 $, gratis auf YouTube. Er geht viral – Barker unterschreibt bei UTA.', en: 'An $800 found-footage slasher, free on YouTube. It goes viral – Barker signs with UTA.' } },
  { d: { de: 'Okt. 2024', en: 'Oct 2024' }, t: { de: 'Drehstart', en: 'Shooting' }, x: { de: '26 Drehtage in Los Angeles. Budget: höchstens 750.000 $.', en: '26 shooting days in Los Angeles. Budget: $750,000 at most.' } },
  { d: { de: 'Jan. 2025', en: 'Jan 2025' }, t: { de: 'Feuer', en: 'Fire' }, x: { de: 'Das Party-Haus brennt bei den Waldbränden in Südkalifornien ab.', en: 'The party house burns down in the Southern California wildfires.' } },
  { d: { de: '5. Sept. 2025', en: 'Sept 5, 2025' }, t: { de: 'Toronto', en: 'Toronto' }, x: { de: 'Weltpremiere in der Midnight-Madness-Reihe des TIFF. Zwei Tage später: Bieterkrieg mit A24, Neon und Netflix.', en: 'World premiere in TIFF\'s Midnight Madness. Two days later: a bidding war with A24, Neon and Netflix.' } },
  { d: { de: 'Sept. 2025', en: 'Sept 2025' }, t: { de: '15 Mio. $', en: '$15M' }, x: { de: 'Focus Features zahlt 14–15 Mio. $ – Rekord für einen Genrefilm in der TIFF-Geschichte. Jason Blum steigt ein.', en: 'Focus Features pays $14–15M – a record for a genre film in TIFF history. Jason Blum comes aboard.' } },
  { d: { de: '15. Mai 2026', en: 'May 15, 2026' }, t: { de: 'Kinostart USA', en: 'US release' }, x: { de: '17,2 Mio. $ am Startwochenende. Dann passiert das Unmögliche: Die Zahlen steigen.', en: '$17.2M opening weekend. Then the impossible happens: the numbers go up.' } },
  { d: { de: '25. Juni 2026', en: 'June 25, 2026' }, t: { de: 'Kinostart Deutschland', en: 'German release' }, x: { de: 'Als „Obsession – Du sollst mich lieben". Am Ende: 16,3 Mio. $ in Deutschland.', en: 'As "Obsession – Du sollst mich lieben". Final German gross: $16.3M.' } },
  { d: { de: '23. Aug. 2026', en: 'Aug 23, 2026' }, t: { de: '500 Mio. $', en: '$500M' }, x: { de: 'Der erste englischsprachige Originalfilm der 2020er über einer halben Milliarde.', en: 'The first English-language original film of the 2020s past half a billion.' } },
  { d: { de: 'Sept. 2026', en: 'Sept 2026' }, t: { de: 'TIME100 Next', en: 'TIME100 Next' }, x: { de: 'Curry Barker landet auf der TIME-Liste der einflussreichsten Nachwuchstalente.', en: 'Curry Barker makes TIME\'s list of the most influential rising stars.' } },
];

export const whyItWorked = [
  {
    t: { de: 'Mundpropaganda statt Marketing', en: 'Word of mouth over marketing' },
    x: { de: 'Ein Startwochenende von 17 Mio. $ ist gut, aber nicht historisch. Historisch wurde, dass Zuschauer ihre Freunde mitbrachten. 70 % sagten in Umfragen, sie würden den Film „definitiv empfehlen".', en: 'A $17M opening is good, not historic. What became historic was audiences bringing their friends back. 70% said they would "definitely recommend" it.' },
  },
  {
    t: { de: 'Gen Z', en: 'Gen Z' },
    x: { de: '75 % des Publikums waren zwischen 18 und 34. Für viele war Obsession ein Gruppen-Event – gemeinsam schreien, gemeinsam lachen.', en: '75% of the audience was 18 to 34. For many, Obsession was a group event – scream together, laugh together.' },
  },
  {
    t: { de: 'TikTok', en: 'TikTok' },
    x: { de: 'Der „Obsession Dance" zur Restaurant-Szene, Uncanny-Valley-Make-up-Tutorials, Reaktionsvideos: Der Film wurde zum Meme, bevor viele ihn gesehen hatten.', en: 'The "Obsession Dance" to the restaurant scene, uncanny valley makeup tutorials, reaction videos: the film became a meme before many had even seen it.' },
  },
  {
    t: { de: 'Original statt Franchise', en: 'Original, not franchise' },
    x: { de: 'Gemeinsam mit A24s „Backrooms" löste Obsession 2026 eine Debatte aus: Will das Publikum wieder neue Geschichten statt Fortsetzungen?', en: 'Together with A24\'s "Backrooms", Obsession sparked a 2026 debate: does the audience want new stories again instead of sequels?' },
  },
  {
    t: { de: 'Ein Regisseur, der alles selbst macht', en: 'A director who does it all' },
    x: { de: 'Barker schrieb, inszenierte und schnitt selbst. Jede Einstellung wurde vorab in 3D geplant – so sieht ein 750.000-$-Film aus wie ein Studiofilm.', en: 'Barker wrote, directed and edited himself. Every shot was pre-planned in 3D – which is how a $750K film looks like a studio picture.' },
  },
];

export const fairNote = {
  de: 'Zur Einordnung: Die 750.000 $ sind nur die Produktionskosten. Focus Features zahlte allein für die Rechte 14–15 Mio. $, dazu kamen Marketingkosten in vermutlich zweistelliger Millionenhöhe. Prozentual haben „Paranormal Activity" und „Blair Witch" sogar höhere Multiplikatoren – aber kein Film unter 1 Mio. $ Budget hat absolut jemals mehr eingespielt. Und auch die Kehrseite gehört dazu: Art Director Sally Choi machte öffentlich, dass sie 300 $ am Tag für mehrere Jobs gleichzeitig bekam; manche Crew-Mitglieder arbeiteten nur gegen Spritgeld.',
  en: 'For context: the $750K covers production only. Focus Features paid $14–15M for the rights alone, plus marketing likely in the tens of millions. In percentage terms, "Paranormal Activity" and "Blair Witch" have even higher multipliers – but no film budgeted under $1M has ever grossed more in absolute terms. The flip side belongs here too: art director Sally Choi publicly said she earned $300 a day while doing several jobs at once; some crew members worked for gas money.',
};

export const bg = M.still.storePhone;
