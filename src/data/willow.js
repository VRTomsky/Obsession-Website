// „Wünsch dir was" – der Willow erfüllt jeden Wunsch. Wörtlich. Rein lokal, kein Server, keine KI.
const rules = [
  {
    keys: ['lieb', 'love', 'crush', 'freundin', 'freund', 'girlfriend', 'boyfriend', 'friend', 'heirat', 'marry', 'kuss', 'kiss', 'date', 'schwarm', 'mag mich', 'likes me'],
    de: ['Gewährt. Sie wird dich lieben. Mehr als irgendjemanden auf der Welt. Sie wird nie wieder schlafen, damit sie dich nicht verpasst.', 'Gewährt. Sie steht jetzt vor deiner Tür. Seit Stunden. Sie lächelt.', 'Gewährt. Ab heute wird dich jemand lieben, der keine Wahl mehr hat. Herzlichen Glückwunsch.'],
    en: ['Granted. She will love you. More than anyone in the world. She will never sleep again, so she never misses you.', 'Granted. She\'s standing at your door now. Has been for hours. She\'s smiling.', 'Granted. From today, someone will love you who no longer has a choice. Congratulations.'],
  },
  {
    keys: ['geld', 'money', 'reich', 'rich', 'million', 'milliard', 'billion', 'euro', 'dollar', 'lotto', 'cash'],
    de: ['Gewährt. Es regnet Geld von der Decke. Es hört nicht mehr auf. Die Nachbarn rufen die Polizei.', 'Gewährt. Eine Milliarde Dollar. Ian hatte auch eine. Frag ihn, wie es ihm geht.'],
    en: ['Granted. Money rains from the ceiling. It doesn\'t stop. The neighbors call the police.', 'Granted. A billion dollars. Ian had one too. Ask him how he\'s doing.'],
  },
  {
    keys: ['berühmt', 'famous', 'star', 'viral', 'follower', 'influencer', 'bekannt'],
    de: ['Gewährt. Alle kennen jetzt dein Gesicht. Auch die, die dich nachts beim Schlafen beobachten.', 'Gewährt. Du gehst viral. Als Fahndungsfoto.'],
    en: ['Granted. Everyone knows your face now. Including the ones who watch you sleep at night.', 'Granted. You went viral. As a mugshot.'],
  },
  {
    keys: ['gesund', 'health', 'healthy', 'unsterblich', 'immortal', 'ewig', 'forever', 'leben', 'live'],
    de: ['Gewährt. Du wirst ewig leben. Der Wunsch läuft ja erst ab, wenn du stirbst. Viel Spaß.', 'Gewährt. Du bist kerngesund. Die anderen in deinem Haus leider nicht mehr.'],
    en: ['Granted. You will live forever. The wish only expires when you die, after all. Enjoy.', 'Granted. You are perfectly healthy. The others in your house, unfortunately, are not.'],
  },
  {
    keys: ['katze', 'cat', 'hund', 'dog', 'haustier', 'pet', 'sandy'],
    de: ['Gewährt. Sandy ist wieder da. Fast vollständig.', 'Gewährt. Dein Haustier weicht dir nie wieder von der Seite. Niemals. Nicht einmal im Bad.'],
    en: ['Granted. Sandy is back. Almost all of her.', 'Granted. Your pet will never leave your side again. Never. Not even in the bathroom.'],
  },
  {
    keys: ['schule', 'school', 'prüfung', 'exam', 'note', 'grade', 'job', 'arbeit', 'work', 'chef', 'boss'],
    de: ['Gewährt. Du bekommst den Job. Der Musikladen sucht gerade dringend Leute. Die alte Belegschaft ist … nicht mehr verfügbar.', 'Gewährt. Lauter Einsen. Deine Lehrerin schreibt dir jeden Abend. Und jede Nacht.'],
    en: ['Granted. You get the job. The music store urgently needs people. The old staff is … no longer available.', 'Granted. Straight A\'s. Your teacher texts you every evening. And every night.'],
  },
  {
    keys: ['rückgängig', 'undo', 'zurück', 'back', 'aufhören', 'stop', 'ende', 'end'],
    de: ['Abgelehnt. Wünsche können nicht rückgängig gemacht werden. Bitte wenden Sie sich an unseren Kundenservice.', 'Abgelehnt. Dafür bräuchtest du einen neuen Willow. Er wird nicht zerbrechen.'],
    en: ['Denied. Wishes cannot be undone. Please contact our customer service.', 'Denied. You would need a new Willow for that. It won\'t break.'],
  },
  {
    keys: ['pizza', 'essen', 'food', 'burger', 'sandwich', 'hunger', 'hungry'],
    de: ['Gewährt. Jemand hat dir ein Sandwich gemacht. Mit sehr viel Liebe. Frag besser nicht, was drin ist.'],
    en: ['Granted. Someone made you a sandwich. With so much love. Better not ask what\'s in it.'],
  },
];

const generic = {
  de: ['Gewährt. Genau so, wie du es formuliert hast. Wort für Wort.', 'Gewährt. Der Wunsch läuft ab, wenn du stirbst. Einen schönen Tag noch.', 'Gewährt. Du wirst es bereuen, aber erst morgen früh.', 'Gewährt. Lies nächstes Mal das Kleingedruckte.'],
  en: ['Granted. Exactly the way you phrased it. Word for word.', 'Granted. The wish expires when you die. Have a nice day.', 'Granted. You will regret it, but not until tomorrow morning.', 'Granted. Read the fine print next time.'],
};

export function grantWish(text, lang) {
  const s = text.toLowerCase();
  const rule = rules.find((r) => r.keys.some((k) => s.includes(k)));
  const pool = rule ? rule[lang] : generic[lang];
  return pool[Math.floor(Math.random() * pool.length)];
}
