// Alles rund um den Film selbst: Eckdaten, Handlung, Themen, Trivia, Musik, Kritiken.
import { M } from './media.js';

export const facts = [
  { label: { de: 'Regie & Buch', en: 'Written & directed by' }, value: 'Curry Barker' },
  { label: { de: 'Laufzeit', en: 'Runtime' }, value: { de: '109 Minuten', en: '109 minutes' } },
  { label: { de: 'Altersfreigabe', en: 'Rating' }, value: { de: 'FSK 16', en: 'FSK 16 · MPA R' } },
  { label: { de: 'Weltpremiere', en: 'World premiere' }, value: { de: 'TIFF, 5. Sept. 2025', en: 'TIFF, Sept 5, 2025' } },
  { label: { de: 'Kinostart DE', en: 'German release' }, value: { de: '25. Juni 2026', en: 'June 25, 2026' } },
  { label: { de: 'Budget', en: 'Budget' }, value: { de: 'ca. 750.000 $', en: 'approx. $750,000' } },
  { label: { de: 'Einspiel', en: 'Box office' }, value: { de: '519 Mio. $', en: '$519 million' } },
  { label: { de: 'Musik', en: 'Score' }, value: 'Rock Burwell' },
];

export const credits = [
  { role: { de: 'Regie, Drehbuch, Schnitt', en: 'Director, writer, editor' }, name: 'Curry Barker' },
  { role: { de: 'Kamera', en: 'Cinematography' }, name: 'Taylor Clemons' },
  { role: { de: 'Musik', en: 'Music' }, name: 'Rock Burwell' },
  { role: { de: 'Szenenbild', en: 'Production design' }, name: 'Vivian Gray' },
  { role: { de: 'Produktion', en: 'Producers' }, name: 'James Harris · Haley Nicole Johnson · Christian Mercuri · Roman Viaris' },
  { role: { de: 'Ausführender Produzent', en: 'Executive producer' }, name: 'Jason Blum' },
  { role: { de: 'Studios', en: 'Companies' }, name: 'Tea Shop Productions · Capstone Studios · Blumhouse' },
  { role: { de: 'Verleih', en: 'Distribution' }, name: { de: 'Focus Features (USA) · Universal Pictures (international)', en: 'Focus Features (US) · Universal Pictures (international)' } },
];

export const logline = {
  de: 'Ein hoffnungsloser Romantiker zerbricht einen Scherzartikel, der einen einzigen Wunsch erfüllen soll – und wünscht sich, dass seine beste Freundin ihn liebt. Mehr als alles andere auf der Welt. Der Wunsch wird wahr. Genau das ist der Horror.',
  en: 'A hopeless romantic snaps a novelty toy that promises to grant a single wish – and wishes that his best friend loved him. More than anyone in the world. The wish comes true. That is exactly the horror.',
};

export const premise = [
  {
    de: 'Baron „Bear" Bailey arbeitet in einem kleinen Musikladen im Valley von Los Angeles – zusammen mit seiner langjährigen Freundin Nikki, dem sarkastischen Ian und Sarah, der Tochter des Chefs. Bear ist seit Jahren in Nikki verliebt. Gesagt hat er es ihr nie.',
    en: 'Baron "Bear" Bailey works at a small music store in the Los Angeles Valley – alongside his longtime friend Nikki, sarcastic Ian and Sarah, the boss\'s daughter. Bear has been in love with Nikki for years. He has never told her.',
  },
  {
    de: 'Im Kristallladen findet er den „One Wish Willow": ein billiges Spielzeug, das einen Wunsch erfüllen soll, wenn man es zerbricht. Als er wieder einmal nicht den Mut findet, Nikki die Wahrheit zu sagen, zerbricht er es. Und Nikki liebt ihn ab dieser Sekunde mehr als irgendjemanden sonst auf der Welt.',
    en: 'At a crystal shop he finds the "One Wish Willow": a cheap toy that supposedly grants one wish when broken. When he once again fails to tell Nikki the truth, he snaps it. From that second on, Nikki loves him more than anyone else in the world.',
  },
  {
    de: 'Was als Traumbeziehung beginnt, wird zur Gefangenschaft – für beide. Denn der Wunsch kennt kein Maß, keine Pause und keine Rückgabe. Laut Kundenservice endet er erst, wenn Bear stirbt.',
    en: 'What begins as a dream relationship becomes captivity – for both of them. The wish knows no limits, no breaks and no returns. According to customer service, it only ends when Bear dies.',
  },
];

// Die komplette Handlung in Kapiteln (bewusst ohne Spoiler-Sperre, auf Wunsch des Seiteninhabers).
export const chapters = [
  {
    n: 'I',
    title: { de: 'Sandy', en: 'Sandy' },
    img: M.still.bearHome,
    text: {
      de: 'Bear kommt nach Hause und findet seine Katze Sandy tot – sie hat Oxycodon gefressen. Im Kristallladen will er Nikki eigentlich einen neuen Anhänger kaufen. Stattdessen nimmt er einen One Wish Willow mit: „Zerbrich ihn und wünsch dir was."',
      en: 'Bear comes home to find his cat Sandy dead – she ate oxycodone. At the crystal shop he means to buy Nikki a replacement necklace. Instead he takes a One Wish Willow: "Break it and make a wish."',
    },
  },
  {
    n: 'II',
    title: { de: 'Der Wunsch', en: 'The Wish' },
    img: M.still.wish,
    text: {
      de: 'Im Auto fragt Nikki ihn direkt, ob er sie mag. Bear weicht aus. Allein und wütend auf sich selbst zerbricht er den Willow und wünscht sich, dass Nikki ihn mehr liebt als irgendjemanden auf der Welt. Sekunden später steht sie wieder vor ihm – ihr Vater sei todkrank, sie wolle nicht allein sein. Im Bett küsst sie ihn. Und schreit.',
      en: 'In the car, Nikki asks him point-blank whether he likes her. Bear dodges. Alone and furious with himself, he snaps the Willow and wishes Nikki loved him more than anyone in the world. Seconds later she is back – her father is dying, she doesn\'t want to be alone. In bed she kisses him. And screams.',
    },
  },
  {
    n: 'III',
    title: { de: 'Flitterwochen', en: 'Honeymoon' },
    img: M.still.happy,
    text: {
      de: 'Am nächsten Morgen baut Nikki einen Altar für Sandy. Das Schreien erklärt sie mit MDMA. Sie gesteht ihm ihre Liebe, die beiden werden ein Paar – und für ein paar Tage sieht es aus, als hätte Bear einfach alles richtig gemacht.',
      en: 'The next morning, Nikki builds a shrine for Sandy. She blames the screaming on MDMA. She confesses her love, they become a couple – and for a few days it looks like Bear simply got everything right.',
    },
  },
  {
    n: 'IV',
    title: { de: 'Risse', en: 'Cracks' },
    img: M.still.watching,
    text: {
      de: 'Ian ruft an: Kurz vor dem Wunsch hat Nikki zu Sarah gesagt, Bear sei für sie wie ein „kleiner Bruder". Und der krebskranke Vater? Gelogen. Bear stellt sie zur Rede, Nikki wird wütend. Nachts wacht er auf – sie sitzt neben ihm und sieht ihm beim Schlafen zu. Dann weint sie hysterisch, weil er sie angeblich nicht liebt.',
      en: 'Ian calls: shortly before the wish, Nikki told Sarah that Bear was like a "little brother" to her. And her dying father? A lie. Bear confronts her, Nikki gets angry. At night he wakes up – she is sitting next to him, watching him sleep. Then she sobs hysterically that he doesn\'t love her.',
    },
  },
  {
    n: 'V',
    title: { de: 'Kundenservice', en: 'Customer Service' },
    img: M.still.phone,
    text: {
      de: 'Die Tür ist mit Klebeband zugeklebt. Im Sandwich, das Nikki ihm gemacht hat, steckt Sandy. Bear ruft die Hotline des One Wish Willow an. Die freundliche Stimme erklärt: Der Wunsch läuft erst ab, wenn er stirbt. Dann wird Nikki in die Leitung gestellt – sie schreit. Als Bear abends heimkommt, steht sie noch genau dort, wo er sie verlassen hat. Den ganzen Tag.',
      en: 'The door is taped shut. The sandwich Nikki made him contains Sandy. Bear calls the One Wish Willow hotline. The friendly voice explains: the wish only expires when he dies. Then Nikki is put on the line – screaming. When Bear gets home that evening, she is standing exactly where he left her. All day.',
    },
  },
  {
    n: 'VI',
    title: { de: 'Die Party', en: 'The Party' },
    img: M.still.party,
    text: {
      de: 'Nikki besteht darauf, mit zu Ians Party zu kommen. Beim Jenga-Trinkspiel liest sie eine selbst geschriebene, verstörende Version von „Hänsel und Gretel" vor. Dann zieht Bear den Stein „Küss die Person links von dir" – Sarah. Nikki schiebt Sarah weg, küsst Bear, schreit und rammt sich eine zerbrochene Flasche in den Körper.',
      en: 'Nikki insists on coming to Ian\'s party. During a Jenga drinking game she reads a disturbing version of "Hansel and Gretel" she wrote herself. Then Bear draws the block "kiss the person to your left" – Sarah. Nikki shoves Sarah aside, kisses Bear, screams and stabs herself with a broken bottle.',
    },
  },
  {
    n: 'VII',
    title: { de: 'Die echte Nikki', en: 'The Real Nikki' },
    img: M.still.realNikki,
    text: {
      de: 'Nikki verweigert jede Behandlung. In der Nacht spricht plötzlich die echte Nikki: Der obsessive Teil von ihr schlafe gerade. Sie fleht Bear an, sie zu töten. Er weigert sich – gekränkt, dass sie lieber sterben würde, als mit ihm zusammen zu sein.',
      en: 'Nikki refuses treatment. That night the real Nikki suddenly speaks: the obsessive part of her is asleep right now. She begs Bear to kill her. He refuses – offended that she would rather die than be with him.',
    },
  },
  {
    n: 'VIII',
    title: { de: 'Der Park', en: 'The Park' },
    img: M.still.park,
    text: {
      de: 'Sarah trifft Bear heimlich im Park. Sie erzählt ihm, dass Ian und Nikki zwei Jahre lang etwas miteinander hatten, und dass Nikki ihn vielleicht nur benutzt. Dann deutet Sarah an, dass sie selbst Gefühle für Bear hat. Nikki schlägt die Autoscheibe ein. Sarah überlebt die Nacht nicht.',
      en: 'Sarah secretly meets Bear in the park. She tells him that Ian and Nikki had a thing for two years, and that Nikki might just be using him. Then Sarah hints that she has feelings for Bear herself. Nikki smashes through the car window. Sarah doesn\'t survive the night.',
    },
  },
  {
    n: 'IX',
    title: { de: 'Eine Milliarde', en: 'A Billion' },
    img: M.still.willow,
    text: {
      de: 'Bear kauft alle restlichen Willows, kann aber keinen davon zerbrechen. Er beichtet Ian alles und fleht ihn an, den Wunsch rückgängig zu machen. Ian glaubt ihm kein Wort – und wünscht sich sarkastisch eine Milliarde Dollar. Geld regnet von der Decke.',
      en: 'Bear buys every remaining Willow but can\'t break a single one. He confesses everything to Ian and begs him to undo the wish. Ian doesn\'t believe a word – and sarcastically wishes for a billion dollars. Cash rains from the ceiling.',
    },
  },
  {
    n: 'X',
    title: { de: 'Der letzte Willow', en: 'The Last Willow' },
    img: M.still.finale,
    text: {
      de: 'Zu Hause wartet Nikki in Sarahs Kleidung, die Waffe in der Hand. Ian stirbt. Bear schließt sich im Bad ein, schluckt die restlichen Pillen – und versucht sie sofort wieder zu erbrechen. Da zerbricht Nikki den letzten Willow. Bear kommt heraus, küsst sie und stirbt. Mit seinem Tod ist der Wunsch vorbei. Nikki ist frei – und steht schreiend in dem, was „sie" getan hat.',
      en: 'At home Nikki is waiting in Sarah\'s clothes, gun in hand. Ian dies. Bear locks himself in the bathroom, swallows the remaining pills – and immediately tries to throw them up. That\'s when Nikki breaks the last Willow. Bear walks out, kisses her and dies. With his death the wish is over. Nikki is free – and stands screaming amid everything "she" has done.',
    },
  },
];

export const themes = [
  {
    title: { de: 'Obsession statt Liebe', en: 'Obsession, not love' },
    text: {
      de: 'Barker sagt selbst: Der Film handelt nicht vom Übernatürlichen, sondern davon, wie die Fixierung auf einen anderen Menschen zerstörerisch wird. Der Wunsch ist nur das Werkzeug.',
      en: 'Barker himself says the film isn\'t about the supernatural but about how fixation on another person turns destructive. The wish is just the device.',
    },
  },
  {
    title: { de: 'Der „Nice Guy"', en: 'The "nice guy"' },
    text: {
      de: 'Bear wirkt sympathisch, schüchtern, harmlos. Doch statt ein ehrliches „Ich mag dich" zu riskieren, nimmt er Nikki die Entscheidung ab. Kritiker lasen den Film als Abrechnung mit dem netten Typen, der glaubt, Liebe stünde ihm zu.',
      en: 'Bear seems likable, shy, harmless. But instead of risking an honest "I like you", he takes the choice away from Nikki. Critics read the film as a takedown of the nice guy who thinks love is owed to him.',
    },
  },
  {
    title: { de: 'Einwilligung', en: 'Consent' },
    text: {
      de: 'Nikki ist Täterin und Opfer zugleich. Ihr Körper gehört nicht mehr ihr. Barker schrieb sie bewusst als beides – und Inde Navarrette spielt die Gefangene hinter den Augen in jeder Szene mit.',
      en: 'Nikki is both perpetrator and victim. Her body no longer belongs to her. Barker wrote her as both on purpose – and Inde Navarrette plays the prisoner behind her eyes in every scene.',
    },
  },
  {
    title: { de: 'Feigheit', en: 'Cowardice' },
    text: {
      de: 'Bear kann nicht gestehen, nicht verzichten, nicht töten und nicht einmal konsequent sterben. Sein letzter Akt – die Pillen wieder erbrechen zu wollen – war Michael Johnstons eigene Idee.',
      en: 'Bear can\'t confess, can\'t let go, can\'t kill and can\'t even die decisively. His final act – trying to throw up the pills – was Michael Johnston\'s own idea.',
    },
  },
];

export const trivia = [
  { k: 'Simpsons', de: 'Die Idee entstand, als Barker im Juli 2023 zufällig die Simpsons-Folge „Treehouse of Horror II" sah – Homer und die Affenpfote.', en: 'The idea struck when Barker happened to catch the Simpsons episode "Treehouse of Horror II" in July 2023 – Homer and the monkey\'s paw.' },
  { k: '2.000.000 $', de: 'Barker lehnte 2 Millionen Dollar ab, die ihm geboten wurden, wenn er Bear zum Helden umschreibt.', en: 'Barker turned down $2 million offered on the condition that he rewrote Bear as a hero.' },
  { k: 'Mama', de: 'Das Design des One Wish Willow entwarf Barker gemeinsam mit seiner Mutter, einer Grafikdesignerin.', en: 'Barker designed the One Wish Willow together with his mother, a graphic designer.' },
  { k: 'Papa', de: 'Den verstörenden „Hänsel und Gretel"-Monolog schrieb Barkers Vater – früher Psychiatrie-Pfleger, heute Drehbuchautor. Auch Bruder Riley stand mit an der Kamera: Obsession ist ein Familienprojekt.', en: 'The disturbing "Hansel and Gretel" monologue was written by Barker\'s father – a former psychiatric nurse practitioner turned screenwriter. His brother Riley worked the camera too: Obsession is a family affair.' },
  { k: '26', de: 'Gedreht wurde in nur 26 Tagen (20 Drehtage plus Nachdrehs) – fünf bis sechs Drehbuchseiten pro Tag.', en: 'The shoot lasted just 26 days (20 days plus reshoots) – five to six script pages a day.' },
  { k: '3D', de: 'Barker und Kameramann Taylor Clemons scannten die Drehorte in 3D und planten jede Einstellung vorab am Computer.', en: 'Barker and DP Taylor Clemons 3D-scanned the locations and pre-planned every shot on the computer.' },
  { k: '0 CGI', de: 'Nikkis Schreie, Grimassen und Stimmwechsel entstanden ohne CGI und ohne KI. Ihr „Uncanny Valley"-Look stammt aus einem TikTok-Make-up-Trend.', en: 'Nikki\'s screams, faces and voice shifts were done without CGI or AI. Her "uncanny valley" look came from a TikTok makeup trend.' },
  { k: '☎', de: 'Die Stimme des Kundenservice ist Curry Barker selbst – aufgenommen mit dem Handy in seinem Schlafzimmer, während er schnitt.', en: 'The customer service voice is Curry Barker himself – recorded on his phone in his bedroom while editing.' },
  { k: '🔥', de: 'Das Haus, in dem die Party gedreht wurde, brannte bei den Waldbränden im Januar 2025 ab. Nachdrehs dort waren unmöglich.', en: 'The house where the party was shot burned down in the January 2025 wildfires. Reshoots there were impossible.' },
  { k: 'NC-17', de: 'Die Szene mit Sarah wurde nach dem Festival um „sechs, sieben Schläge" gekürzt, um ein NC-17-Rating zu vermeiden.', en: 'Sarah\'s scene was trimmed by "six or seven smashes" after the festival to avoid an NC-17 rating.' },
  { k: 'Premiere', de: 'Barker schnitt den kompletten Film selbst in Adobe Premiere.', en: 'Barker cut the entire film himself in Adobe Premiere.' },
  { k: 'Ian?', de: 'Bei frühen Probeaufnahmen spielte Cooper Tomlinson – eigentlich schon als Ian besetzt – vorübergehend Bear. Barker überlegte sogar, Bear selbst zu spielen.', en: 'In early test footage, Cooper Tomlinson – already cast as Ian – stood in as Bear. Barker even considered playing Bear himself.' },
];

export const alternateEnding = {
  title: { de: 'Das Ende, das es fast gegeben hätte', en: 'The ending that almost was' },
  text: {
    de: 'Ursprünglich schrieb und drehte Barker ein Romeo-und-Julia-Ende: Nikki erschießt sich, nachdem der Wunsch mit Bears Tod erlischt. Sein Vater, Cooper Tomlinson und andere rieten ihm davon ab. Barker drehte einen einzigen Take einer Version, in der Nikki überlebt – und nahm genau diesen für den Kinofilm. Das Ergebnis ist grausamer: Nikki muss weiterleben.',
    en: 'Barker originally wrote and shot a Romeo-and-Juliet ending: Nikki shoots herself after the wish dies with Bear. His father, Cooper Tomlinson and others talked him out of it. Barker shot a single take of a version where Nikki survives – and used exactly that take in the theatrical cut. The result is crueler: Nikki has to live on.',
  },
};

export const music = {
  composer: 'Rock Burwell',
  text: {
    de: 'Rock Burwell gibt mit Obsession sein Spielfilmdebüt. Barker lernte ihn 2024 über einen Comedy-Song für „that\'s a bad idea" kennen. Sein großes Vorbild: Angelo Badalamenti und der Twin-Peaks-Soundtrack. Die Musik soll im „Uncanny Valley" leben – dort, wo Gefühle verzerrt werden und man nicht mehr weiß, was echt ist.',
    en: 'Obsession is Rock Burwell\'s feature debut. Barker met him in 2024 through a comedy song for "that\'s a bad idea". His big influence: Angelo Badalamenti and the Twin Peaks soundtrack. The score is meant to live in the "uncanny valley" – where emotions get warped and you no longer know what\'s real.',
  },
  facts: [
    { k: '18', v: { de: 'Tracks auf dem Album', en: 'tracks on the album' } },
    { k: '15.05.26', v: { de: 'digital bei Back Lot Music', en: 'digital release via Back Lot Music' } },
    { k: 'LP', v: { de: 'Vinyl, CD & Kassette bei Waxwork Records', en: 'vinyl, CD & cassette by Waxwork Records' } },
  ],
};

export const reviews = [
  { score: '93%', source: 'Rotten Tomatoes', note: { de: '329 Kritiken · Ø 8/10', en: '329 reviews · avg. 8/10' } },
  { score: '77', source: 'Metacritic', note: { de: '38 Kritiken · „generally favorable"', en: '38 critics · "generally favorable"' } },
  { score: 'A−', source: 'CinemaScore', note: { de: 'Publikumsnote', en: 'audience grade' } },
  { score: '70%', source: 'PostTrak', note: { de: '„würde ihn definitiv empfehlen"', en: '"definitely recommend"' } },
];

export const quotes = [
  { q: 'So fresh and exhilarating, one can forgive its familiar origins.', who: 'Lou Thomas', outlet: 'Empire' },
  { q: 'Acing one of the more physically and emotionally taxing horror leads to come down the pike in a while.', who: 'Guy Lodge', outlet: 'Variety' },
  { q: 'Somehow one of the funniest and most terrifying performances of the year.', who: 'David Friend', outlet: 'The Canadian Press' },
  { q: 'Barker\'s execution takes things to the next level.', who: 'Matt Donato', outlet: 'IGN' },
  { q: 'Dauntingly disturbing while also skillfully amusing and thrilling.', who: 'Critics Consensus', outlet: 'Rotten Tomatoes' },
];

export const awards = [
  { year: '2025', event: 'Toronto International Film Festival', what: { de: 'People\'s Choice Award, Midnight Madness', en: 'People\'s Choice Award, Midnight Madness' }, result: { de: '2. Platz', en: 'Runner-up' }, won: false },
  { year: '2025', event: 'Sitges Film Festival', what: { de: 'Spezialpreis der Jury · Publikumspreis · Carnet Jove', en: 'Special Jury Prize · Audience Award · Carnet Jove' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'Seattle International Film Festival', what: { de: 'Beste Darstellung – Inde Navarrette', en: 'Best Performance – Inde Navarrette' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'Astra Midseason Movie Awards', what: { de: 'Bester Horrorfilm · Beste Schauspielerin', en: 'Best Horror · Best Actress' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'Critics\' Choice Super Awards', what: { de: 'Bester Horrorfilm · Beste Schauspielerin Horror (Navarrette)', en: 'Best Horror Movie · Best Actress in a Horror Movie (Navarrette)' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'Critics\' Choice Super Awards', what: { de: 'Bester Schauspieler Horror · Bester Bösewicht (Johnston)', en: 'Best Actor in a Horror Movie · Best Villain (Johnston)' }, result: { de: 'Nominiert', en: 'Nominated' }, won: false },
  { year: '2026', event: 'Celebration of Cinema & Television', what: { de: 'Breakthrough Actress – Inde Navarrette', en: 'Breakthrough Actress – Inde Navarrette' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'IMDb STARmeter Awards', what: { de: 'Breakthrough Star – Inde Navarrette', en: 'Breakthrough Star – Inde Navarrette' }, result: { de: 'Gewonnen', en: 'Won' }, won: true },
  { year: '2026', event: 'Fangoria Chainsaw Awards', what: { de: '4 Nominierungen inkl. Bester Film (Wide Release), Regie, Drehbuch', en: '4 nominations incl. Best Wide Release, Director, Screenplay' }, result: { de: 'Am 25. Oktober', en: 'October 25' }, won: null },
];

// Offizielle Videos (YouTube, werden erst nach Klick geladen).
export const videos = [
  { id: 'gMC8kkwbIQQ', title: { de: 'Offizieller Trailer', en: 'Official Trailer' }, by: 'Blumhouse', len: '2:14' },
  { id: 'HaZsOipO-xE', title: { de: 'Clip: „Freaky Nikki"', en: 'Clip: "Freaky Nikki"' }, by: 'Focus Features', len: '0:57' },
  { id: 'UWVznyWUS-E', title: { de: 'Clip: „Nice Date"', en: 'Clip: "Nice Date"' }, by: 'Focus Features', len: '1:31' },
  { id: 'tYQgZc0N0cY', title: { de: 'Der Moment des Wunsches (Extended Preview)', en: 'The Moment Bear Makes His Wish (Extended Preview)' }, by: 'Universal Pictures', len: '9:56' },
];
