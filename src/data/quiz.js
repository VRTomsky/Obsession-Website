// Zwei Quiz-Modi: Wissen und „Welche Figur bist du?"

export const trivia = [
  {
    q: { de: 'Welche Serie brachte Curry Barker auf die Idee mit dem Wunsch?', en: 'Which show gave Curry Barker the idea for the wish?' },
    a: [{ de: 'Die Simpsons', en: 'The Simpsons' }, { de: 'Twilight Zone', en: 'The Twilight Zone' }, { de: 'Stranger Things', en: 'Stranger Things' }, { de: 'Gänsehaut', en: 'Goosebumps' }],
    c: 0,
    x: { de: 'Genauer: „Treehouse of Horror II" – Homer und die Affenpfote.', en: 'Specifically "Treehouse of Horror II" – Homer and the monkey\'s paw.' },
  },
  {
    q: { de: 'Wie hieß Bears Katze?', en: 'What was the name of Bear\'s cat?' },
    a: ['Sandy', 'Willow', 'Pickles', 'Bean'],
    c: 0,
    x: { de: 'Sandy stirbt an Oxycodon – denselben Pillen wie Bear am Ende.', en: 'Sandy dies from oxycodone – the same pills as Bear at the end.' },
  },
  {
    q: { de: 'Wie viel kostete Barkers erster Spielfilm „Milk & Serial"?', en: 'How much did Barker\'s first feature "Milk & Serial" cost?' },
    a: ['800 $', '8.000 $', '80.000 $', '750.000 $'],
    c: 0,
    x: { de: '800 Dollar – und er lief gratis auf YouTube.', en: '$800 – and it was free on YouTube.' },
  },
  {
    q: { de: 'Wer spricht den One-Wish-Willow-Kundenservice?', en: 'Who voices the One Wish Willow customer service?' },
    a: ['Curry Barker', 'Andy Richter', 'Jason Blum', 'Cooper Tomlinson'],
    c: 0,
    x: { de: 'Barker selbst – aufgenommen mit dem Handy im Schlafzimmer.', en: 'Barker himself – recorded on his phone in his bedroom.' },
  },
  {
    q: { de: 'Welches Spiel spielen die Freunde auf Ians Party?', en: 'What game do the friends play at Ian\'s party?' },
    a: [{ de: 'Jenga-Trinkspiel', en: 'Jenga drinking game' }, { de: 'Flaschendrehen', en: 'Spin the bottle' }, { de: 'Wahrheit oder Pflicht', en: 'Truth or dare' }, 'Beer Pong'],
    c: 0,
    x: { de: 'Auf den Steinen stehen Aufgaben – eine davon: Küss die Person links von dir.', en: 'The blocks have dares on them – one: kiss the person to your left.' },
  },
  {
    q: { de: 'Was wünscht sich Ian?', en: 'What does Ian wish for?' },
    a: [{ de: 'Eine Milliarde Dollar', en: 'A billion dollars' }, { de: 'Dass Nikki ihn liebt', en: 'That Nikki loved him' }, { de: 'Dass alles rückgängig wird', en: 'That everything was undone' }, { de: 'Unsterblichkeit', en: 'Immortality' }],
    c: 0,
    x: { de: 'Sarkastisch gemeint – und trotzdem regnet Geld von der Decke.', en: 'Meant sarcastically – and still, cash rains from the ceiling.' },
  },
  {
    q: { de: 'Wie viel spielte Obsession weltweit ein?', en: 'How much did Obsession gross worldwide?' },
    a: [{ de: '519 Mio. $', en: '$519M' }, { de: '219 Mio. $', en: '$219M' }, { de: '1,1 Mrd. $', en: '$1.1B' }, { de: '95 Mio. $', en: '$95M' }],
    c: 0,
    x: { de: 'Fast 700-mal das Produktionsbudget.', en: 'Almost 700 times the production budget.' },
  },
  {
    q: { de: 'Auf welchem Festival feierte Obsession Premiere?', en: 'At which festival did Obsession premiere?' },
    a: [{ de: 'Toronto (TIFF)', en: 'Toronto (TIFF)' }, 'Sundance', 'SXSW', { de: 'Berlinale', en: 'Berlinale' }],
    c: 0,
    x: { de: 'In der Midnight-Madness-Reihe am 5. September 2025.', en: 'In the Midnight Madness program on September 5, 2025.' },
  },
  {
    q: { de: 'Wie nennt Nikki Bear kurz vor dem Wunsch gegenüber Sarah?', en: 'What does Nikki call Bear to Sarah shortly before the wish?' },
    a: [{ de: 'Ihren „kleinen Bruder"', en: 'Her "little brother"' }, { de: 'Ihren „besten Freund"', en: 'Her "best friend"' }, { de: 'Ihren „Teddy"', en: 'Her "teddy"' }, { de: 'Ihren „Seelenverwandten"', en: 'Her "soulmate"' }],
    c: 0,
    x: { de: 'Genau das erzählt Ian später am Telefon.', en: 'That\'s exactly what Ian later reveals on the phone.' },
  },
  {
    q: { de: 'Wie endete Barkers ursprünglich gedrehtes Ende?', en: 'How did Barker\'s originally shot ending go?' },
    a: [{ de: 'Nikki tötet sich selbst', en: 'Nikki kills herself' }, { de: 'Bear überlebt', en: 'Bear survives' }, { de: 'Sarah überlebt', en: 'Sarah survives' }, { de: 'Ian rettet alle', en: 'Ian saves everyone' }],
    c: 0,
    x: { de: 'Ein Romeo-und-Julia-Ende. Sein Vater und Cooper Tomlinson rieten ihm davon ab.', en: 'A Romeo-and-Juliet ending. His father and Cooper Tomlinson talked him out of it.' },
  },
];

// Persönlichkeitstest: jede Antwort vergibt Punkte an Figuren.
export const personality = {
  questions: [
    {
      q: { de: 'Du bist seit Jahren in jemanden verliebt. Was tust du?', en: 'You\'ve been in love with someone for years. What do you do?' },
      a: [
        { t: { de: 'Ich warte auf den perfekten Moment … der nie kommt.', en: 'I wait for the perfect moment … that never comes.' }, s: { bear: 3 } },
        { t: { de: 'Ich frage einfach direkt.', en: 'I just ask directly.' }, s: { nikki: 2, sarah: 1 } },
        { t: { de: 'Ich mache einen Witz drüber und lenke ab.', en: 'I make a joke and change the subject.' }, s: { ian: 3 } },
        { t: { de: 'Ich sage es – und akzeptiere jede Antwort.', en: 'I say it – and accept any answer.' }, s: { sarah: 3 } },
      ],
    },
    {
      q: { de: 'Du findest einen One Wish Willow. Dein erster Gedanke?', en: 'You find a One Wish Willow. Your first thought?' },
      a: [
        { t: { de: 'Endlich eine Lösung für mein Problem.', en: 'Finally a solution to my problem.' }, s: { bear: 3 } },
        { t: { de: 'Lächerlich. Ich wünsch mir eine Milliarde, nur zum Spaß.', en: 'Ridiculous. I\'ll wish for a billion, just for fun.' }, s: { ian: 3 } },
        { t: { de: 'Finger weg. Das fühlt sich falsch an.', en: 'Hands off. This feels wrong.' }, s: { sarah: 2, carter: 1 } },
        { t: { de: 'Ich lese erst mal das Kleingedruckte.', en: 'I read the fine print first.' }, s: { service: 3 } },
      ],
    },
    {
      q: { de: 'Auf einer Party bist du …', en: 'At a party you are …' },
      a: [
        { t: { de: 'der Mittelpunkt. Laut, wild, unberechenbar.', en: 'the center of attention. Loud, wild, unpredictable.' }, s: { nikki: 3 } },
        { t: { de: 'der Gastgeber, der alles kommentiert.', en: 'the host who comments on everything.' }, s: { ian: 3 } },
        { t: { de: 'in der Ecke und beobachtest eine Person.', en: 'in the corner, watching one person.' }, s: { bear: 2, freaky: 1 } },
        { t: { de: 'diejenige, die alle sicher nach Hause bringt.', en: 'the one who makes sure everyone gets home safe.' }, s: { sarah: 3 } },
      ],
    },
    {
      q: { de: 'Wie gehst du mit Eifersucht um?', en: 'How do you handle jealousy?' },
      a: [
        { t: { de: 'Welche Eifersucht? Ich lächle einfach. Sehr breit.', en: 'What jealousy? I just smile. Very widely.' }, s: { freaky: 3 } },
        { t: { de: 'Ich schlucke sie runter und werde passiv-aggressiv.', en: 'I swallow it and turn passive-aggressive.' }, s: { bear: 2, ian: 1 } },
        { t: { de: 'Ich spreche es offen an.', en: 'I address it openly.' }, s: { sarah: 3 } },
        { t: { de: 'Ich habe einen Laden zu führen.', en: 'I have a store to run.' }, s: { carter: 3 } },
      ],
    },
    {
      q: { de: 'Jemand belügt dich. Was tust du?', en: 'Someone lies to you. What do you do?' },
      a: [
        { t: { de: 'Ich erzähle es sofort weiter – jemand muss es wissen.', en: 'I tell someone right away – someone has to know.' }, s: { ian: 3 } },
        { t: { de: 'Ich ignoriere es. Hauptsache, es funktioniert.', en: 'I ignore it. As long as it works.' }, s: { bear: 3 } },
        { t: { de: 'Ich lüge zurück. Besser.', en: 'I lie back. Better.' }, s: { nikki: 2, freaky: 1 } },
        { t: { de: 'Ich höre freundlich zu und notiere alles.', en: 'I listen politely and write everything down.' }, s: { service: 3 } },
      ],
    },
    {
      q: { de: 'Wähle ein Objekt:', en: 'Pick an object:' },
      a: [
        { t: { de: 'Ein Kristall-Anhänger', en: 'A crystal necklace' }, s: { nikki: 3 } },
        { t: { de: 'Ein Jenga-Stein', en: 'A Jenga block' }, s: { ian: 2, sarah: 1 } },
        { t: { de: 'Ein Telefon mit Warteschleife', en: 'A phone on hold' }, s: { service: 3 } },
        { t: { de: 'Eine Rolle Klebeband', en: 'A roll of duct tape' }, s: { freaky: 3 } },
      ],
    },
  ],
  results: {
    bear: { name: 'Bear', slug: 'bear', x: { de: 'Du bist romantisch, loyal und ein bisschen zu vorsichtig. Achtung: Wer nie fragt, greift irgendwann zur Abkürzung. Sag, was du fühlst.', en: 'You\'re romantic, loyal and a little too careful. Warning: those who never ask eventually take shortcuts. Say what you feel.' } },
    nikki: { name: 'Nikki', slug: 'nikki', x: { de: 'Du bist direkt, frech und eigenständig. Du lässt dir von niemandem sagen, wen du zu lieben hast – zumindest, solange niemand einen Willow zerbricht.', en: 'You\'re direct, sassy and independent. Nobody tells you who to love – at least as long as nobody snaps a Willow.' } },
    freaky: { name: 'Freaky Nikki', slug: 'freaky-nikki', x: { de: 'Du liebst intensiv. Sehr intensiv. Vielleicht zu intensiv. Bitte lass die Tür offen und schlaf ab und zu.', en: 'You love intensely. Very intensely. Maybe too intensely. Please leave the door open and sleep once in a while.' } },
    ian: { name: 'Ian', slug: 'ian', x: { de: 'Du bist der Zyniker mit dem großen Herzen. Du durchschaust Menschen schnell – nur deine eigenen Geheimnisse hältst du lieber für dich.', en: 'You\'re the cynic with a big heart. You see through people quickly – you just keep your own secrets to yourself.' } },
    sarah: { name: 'Sarah', slug: 'sarah', x: { de: 'Du bist ehrlich, mutig und kümmerst dich um andere. Du bist die Freundin, die man in einem Horrorfilm braucht – und die leider selten überlebt.', en: 'You\'re honest, brave and caring. You\'re the friend everyone needs in a horror movie – who sadly rarely survives.' } },
    carter: { name: 'Carter', slug: 'carter', x: { de: 'Du bist der ruhende Pol. Freundlich, bodenständig, ein bisschen ahnungslos – und genau deshalb brauchen dich alle.', en: 'You\'re the calm center. Friendly, grounded, a little oblivious – and that\'s exactly why everyone needs you.' } },
    service: { name: { de: 'Der Kundenservice', en: 'Customer Service' }, slug: 'customer-service', x: { de: 'Du bist höflich, geduldig und kennst alle Regeln. Niemand weiß genau, wer du bist. Und genau so gefällt es dir.', en: 'You\'re polite, patient and know every rule. Nobody knows exactly who you are. And that\'s just how you like it.' } },
  },
};
