// Wie geht es weiter? Fortsetzung, Anthologie, Barkers nächste Filme, Theorien und Fan-Kultur.
import { M } from './media.js';

export const franchise = [
  {
    t: { de: 'Gibt es eine Fortsetzung?', en: 'Is there a sequel?' },
    x: {
      de: 'Offiziell: nein. 2025 sagte Barker, die Figuren würden wahrscheinlich nicht zurückkehren. Nach dem Mega-Erfolg klang er 2026 offener: Er habe eine Idee für eine Fortsetzung. Inde Navarrette sagte, sie schätze es, dass Obsession für sich allein steht.',
      en: 'Officially: no. In 2025 Barker said the characters were unlikely to return. After the massive success he sounded more open in 2026: he has an idea for a sequel. Inde Navarrette said she appreciates that Obsession stands on its own.',
    },
    tag: { de: 'Möglich', en: 'Possible' },
  },
  {
    t: { de: 'Die One-Wish-Willow-Anthologie', en: 'The One Wish Willow anthology' },
    x: {
      de: 'Was Barker mehr reizt: eine Anthologie-Serie, in der jede Folge einen neuen Wunsch zeigt, der komplett aus dem Ruder läuft. Er würde den Pilotfilm mit demselben Kameramann drehen und andere Filmemacher einladen, ihre eigene Version zu erzählen.',
      en: 'What excites Barker more: an anthology series where each episode shows a new wish going completely off the rails. He would direct the pilot with the same DP and invite other filmmakers to tell their own version.',
    },
    tag: { de: 'Barkers Favorit', en: 'Barker\'s favorite' },
  },
  {
    t: { de: 'Ein geteiltes Universum?', en: 'A shared universe?' },
    x: {
      de: 'In Barkers nächstem Film „Anything but Ghosts" läuft ein Nachrichtenbericht, der auf die Ereignisse von Obsession verweist. Die Welt der Willows existiert also weiter.',
      en: 'Barker\'s next film "Anything but Ghosts" includes a news report referencing the events of Obsession. The world of the Willows lives on.',
    },
    tag: { de: 'Bestätigt', en: 'Confirmed' },
  },
  {
    t: { de: 'Freaky Nikki lebt', en: 'Freaky Nikki lives' },
    x: {
      de: 'Universal machte Nikki 2026 zum Teil der Halloween Horror Nights – ein Ritterschlag, den sonst nur Ikonen wie Chucky oder Freddy bekommen.',
      en: 'Universal made Nikki part of Halloween Horror Nights in 2026 – an honor usually reserved for icons like Chucky or Freddy.',
    },
    tag: { de: 'Halloween Horror Nights', en: 'Halloween Horror Nights' },
  },
];

export const nextFilms = [
  {
    t: 'Anything but Ghosts',
    date: '2027-05-07',
    who: { de: 'Regie, Buch, Schnitt: Curry Barker · mit Barker als „Mouse" und Cooper Tomlinson', en: 'Directed, written, edited by Curry Barker · with Barker as "Mouse" and Cooper Tomlinson' },
    x: {
      de: 'Barkers dritter Horrorfilm, produziert von Jason Blum, Roy Lee und Steven Schneider (Blumhouse-Atomic Monster, Spooky Pictures). Focus Features bringt ihn am 7. Mai 2027 ins Kino – fast genau ein Jahr nach Obsession.',
      en: 'Barker\'s third horror film, produced by Jason Blum, Roy Lee and Steven Schneider (Blumhouse-Atomic Monster, Spooky Pictures). Focus Features releases it on May 7, 2027 – almost exactly a year after Obsession.',
    },
    status: { de: 'Postproduktion', en: 'Post-production' },
    countdown: true,
  },
  {
    t: 'The Texas Chain Saw Massacre',
    date: null,
    who: { de: 'Regie & Buch: Curry Barker · A24', en: 'Written & directed by Curry Barker · A24' },
    x: {
      de: 'Der Film, der Barker mit elf Jahren zum Horror brachte, ist jetzt sein Projekt: Im April 2026 wurde bekannt, dass er die Neuverfilmung von The Texas Chain Saw Massacre für A24 schreibt und inszeniert.',
      en: 'The franchise that got Barker into horror at age eleven is now his project: in April 2026 it was announced that he will write and direct a new Texas Chain Saw Massacre for A24.',
    },
    status: { de: 'Vorproduktion', en: 'Pre-production' },
  },
  {
    t: { de: 'Original-Horrorfilm für Universal', en: 'Original horror film for Universal' },
    date: null,
    who: { de: 'Buch, Regie, Produktion: Curry Barker · mit Jason Blum und James Wan', en: 'Written, directed, produced by Curry Barker · with Jason Blum and James Wan' },
    x: {
      de: 'Im Juni 2026 verkündet: ein neues Original für Universal Pictures, produziert von Blumhouse-Atomic Monster (Jason Blum, James Wan), Spooky Pictures und Divide/Conquer.',
      en: 'Announced June 2026: a new original for Universal Pictures, produced by Blumhouse-Atomic Monster (Jason Blum, James Wan), Spooky Pictures and Divide/Conquer.',
    },
    status: { de: 'In Entwicklung', en: 'In development' },
  },
];

export const theories = [
  {
    q: { de: 'Warum ist die Welt nicht voller Drachen?', en: 'Why isn\'t the world full of dragons?' },
    a: {
      de: 'Barker gibt selbst zu: Wenn Willows funktionieren und frei verkauft werden, müsste die Welt voller verrückter Wünsche sein. Unsere Theorie: Die meisten Willows sind Fälschungen. Nur wenige echte Exemplare kursieren – und sie „finden" Menschen in genau dem Moment, in dem sie verzweifelt genug sind. Bear kam nach Sandys Tod in den Laden. Das war kein Zufall.',
      en: 'Barker admits it himself: if Willows work and are sold openly, the world should be full of crazy wishes. Our theory: most Willows are fakes. Only a few real ones circulate – and they "find" people right when they are desperate enough. Bear walked into the shop after Sandy died. That wasn\'t a coincidence.',
    },
    level: 3,
  },
  {
    q: { de: 'Warum ließ sich kein Willow zerbrechen?', en: 'Why wouldn\'t any Willow break?' },
    a: {
      de: 'Bear kauft alle restlichen Willows, kann aber keinen zerbrechen. Ian dagegen schon – und Nikki auch. Theorie: Ein Willow kann nicht gegen den eigenen, noch laufenden Wunsch eingesetzt werden. Solange Bear lebt, ist er „gebunden". Deshalb musste ein anderer den Wunsch brechen.',
      en: 'Bear buys every remaining Willow but can\'t snap one. Ian can – and so can Nikki. Theory: a Willow can\'t be used against your own active wish. As long as Bear is alive, he is "bound". That\'s why someone else had to break it.',
    },
    level: 4,
  },
  {
    q: { de: 'Was hat Nikki sich gewünscht?', en: 'What did Nikki wish for?' },
    a: {
      de: 'Der Film sagt es nicht. Aber Bear kommt sofort aus dem Bad und küsst sie. Naheliegend: Nikki – noch unter Bears Wunsch – wünschte sich, dass Bear sie genauso liebt wie sie ihn. Damit wird Bear im Moment seines Todes zu dem, was er aus Nikki gemacht hat.',
      en: 'The film doesn\'t say. But Bear immediately walks out of the bathroom and kisses her. Most likely: Nikki – still under Bear\'s wish – wished that Bear loved her as much as she loved him. In the moment of his death, Bear becomes exactly what he made of Nikki.',
    },
    level: 5,
  },
  {
    q: { de: 'Was passiert mit Ians Milliarde?', en: 'What happens to Ian\'s billion?' },
    a: {
      de: 'Ein Wunsch endet mit dem Tod des Wünschenden. Ian stirbt noch in derselben Nacht. Verschwindet das Geld? Oder bleibt die Erfüllung, und nur die „Bindung" endet? Wer zuerst die Polizei ruft, findet jedenfalls einen sehr seltsamen Tatort.',
      en: 'A wish ends when the wisher dies. Ian dies that same night. Does the money vanish? Or does the fulfillment stay and only the "bond" end? Whoever calls the police first is going to find a very strange crime scene.',
    },
    level: 2,
  },
  {
    q: { de: 'Wer sitzt hinter der Hotline?', en: 'Who\'s behind the hotline?' },
    a: {
      de: 'Eine Hotline, die weiß, wo Nikki ist, und sie durchstellen kann, ist kein Callcenter. Die Fan-Lieblingstheorie: Der Kundenservice ist die Instanz, die die Wünsche „verwaltet" – ein höflicher Teufel mit Geschäftsbedingungen. Dass Barker ihn selbst spricht, passt perfekt: Der Autor ist die Stimme, die die Regeln macht.',
      en: 'A hotline that knows where Nikki is and can put her through isn\'t a call center. The fan-favorite theory: customer service is the entity that "manages" the wishes – a polite devil with terms and conditions. That Barker voices him himself fits perfectly: the author is the voice that makes the rules.',
    },
    level: 4,
  },
  {
    q: { de: 'Hat Nikki Bear je geliebt?', en: 'Did Nikki ever love Bear?' },
    a: {
      de: 'Kurz vor dem Wunsch nennt sie ihn ihren „kleinen Bruder", und sie hat eine Affäre mit Ian. Aber sie fragt Bear auch direkt, ob er sie mag. Vielleicht wollte sie Klarheit, vielleicht eine Chance. Die bittere Pointe: Hätte Bear einfach „Ja" gesagt, hätte es nie einen Wunsch gebraucht – wir werden nie erfahren, was sie geantwortet hätte.',
      en: 'Right before the wish she calls him her "little brother", and she is having an affair with Ian. But she also asks Bear directly whether he likes her. Maybe she wanted clarity, maybe a chance. The bitter twist: had Bear simply said "yes", no wish would ever have been needed – we will never know what she would have answered.',
    },
    level: 3,
  },
];

export const fanCulture = [
  { k: 'Obsession Dance', x: { de: 'TikTok-Trend ab Ende Mai 2026 (gestartet von @sad_i_e) – getanzt zum Audio der Restaurant-Szene, in der Nikki Bear anschreit, er ruiniere ihr Date.', en: 'TikTok trend from late May 2026 (started by @sad_i_e) – danced to the audio of the restaurant scene where Nikki yells that Bear is ruining their date.' } },
  { k: 'Uncanny Valley', x: { de: 'Nikkis Look geht auf einen TikTok-Make-up-Trend von Halloween 2023 zurück (Emilia Blarth). Seit dem Kinostart kursieren unzählige Nikki-Make-up-Tutorials.', en: 'Nikki\'s look traces back to a TikTok makeup trend from Halloween 2023 (Emilia Blarth). Since the release, countless Nikki makeup tutorials have been circulating.' } },
  { k: '„I thought we were having a nice date"', x: { de: 'Das Zitat aus der Restaurant-Szene wurde zum Meme für jede kippende Situation.', en: 'The line from the restaurant scene became a meme for any situation going sideways.' } },
  { k: 'Halloween Horror Nights', x: { de: 'Freaky Nikki ist 2026 Teil von Universals Halloween-Event.', en: 'Freaky Nikki is part of Universal\'s Halloween event in 2026.' } },
  { k: 'SNL', x: { de: 'Inde Navarrette moderiert am 31. Oktober 2026 Saturday Night Live – an Halloween.', en: 'Inde Navarrette hosts Saturday Night Live on October 31, 2026 – on Halloween.' } },
  { k: 'Weezer', x: { de: 'Curry Barker spielt im Musikvideo zu Weezers „C.E.O." mit.', en: 'Curry Barker appears in Weezer\'s "C.E.O." music video.' } },
  { k: '„Heteropessimist Horror"', x: { de: 'Das Magazin Compact erklärte Obsession zum Gründungswerk eines neuen Subgenres. Autor Rob Henderson nannte ihn eine „Moralgeschichte" für junge Männer: Sag, was du fühlst.', en: 'Compact magazine declared Obsession the defining work of a new subgenre. Author Rob Henderson called it a "morality tale" for young men: say what you feel.' } },
  { k: 'Fan-Repliken', x: { de: 'Nachgebaute One Wish Willows tauchen auf Etsy, Conventions und sogar Wikimedia Commons auf.', en: 'Replica One Wish Willows pop up on Etsy, at conventions and even on Wikimedia Commons.' } },
];

export const bg = M.still.redDoorScratch;
