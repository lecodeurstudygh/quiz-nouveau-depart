import { CourseWeek } from "@/types/course";

export const week01: CourseWeek = {
  id: "week-01",
  weekNumber: 1,
  title: {
    fr: "Notre besoin d’un Sauveur",
    en: "Our Need for a Saviour",
  },
  subtitle: {
    fr: "Les fondements de la foi",
    en: "Foundations of Faith",
  },
  summary: {
    fr: "Découvrir qui est Jésus, pourquoi Il est venu sur terre, la signification de Sa mort sur la croix pour nous et comment recevoir le cadeau du salut et de la vie nouvelle en Lui.",
    en: "Discover who Jesus is, why He came to earth, the meaning of His death on the cross for us, and how to receive the gift of salvation and new life in Him.",
  },
  bigIdea: {
    fr: "Nous avons tous besoin d’un sauveur. Comme dit Jean, nous avons besoin de mourir à notre péché et naître de nouveau. Une nouvelle nature spirituelle peut seulement être trouvée en Jésus. Naître de nouveau signifie que notre Esprit, qui était mort aux choses de Dieu, revient à la vie… et nous recommençons une relation avec Dieu !",
    en: "We all need a Saviour. As John says, we need to die to our sin and be born again. A new spiritual nature can only be found in Jesus. Being born again means that our Spirit, which was dead to the things of God, comes back to life... and we begin a new relationship with God!",
  },
  targetPrayer: {
    fr: "« Demande à Dieu de t’aider à assimiler et t’approprier tout ce qu’Il t’a acquis par Son sacrifice à la croix. Et de te montrer comment appliquer ces enseignements dans ton quotidien, dans tes relations avec les autres et dans ton intimité avec Lui. »",
    en: "“Ask God to help you assimilate and make your own all that He has given you through His sacrifice on the cross. And to show you how to apply these teachings in your daily life, in your relationships with others and in your intimacy with Him.”",
  },
  nextStep: {
    fr: "Continue à assister aux services de l'Église et aux prochaines sessions du cours Nouveau Départ.",
    en: "Continue to attend church services and the upcoming New Beginnings course sessions.",
  },
  pillars: [
    {
      badgeNumber: 1,
      title: { fr: "La Chute & le Péché", en: "The Fall & Sin" },
      description: {
        fr: "L'homme a choisi l'indépendance. Le mot hébreu « hhatah » signifie 'manquer la cible'. Le péché sépare l'homme de son Créateur et produit la mort spirituelle.",
        en: "Man chose independence. The Hebrew word 'hhatah' literally means 'missing the mark'. Sin separates humanity from God and causes spiritual death.",
      },
      verses: "Romains 6:23 • Psaumes 51:5",
      color: "bg-rose-500/15 text-rose-500 dark:text-rose-400",
    },
    {
      badgeNumber: 2,
      title: { fr: "La Provision à la Croix", en: "The Provision on the Cross" },
      description: {
        fr: "Incapable de combler le fossé par la religion ou de bonnes œuvres, Jésus est venu comme sacrifice parfait. Il a pris nos fautes pour nous donner Sa justice.",
        en: "Unable to bridge the gulf by philosophy or good works, Jesus became our flawless substitute, taking our sin to clothe us in His righteousness.",
      },
      verses: "Jean 3:16 • 2 Cor 5:21",
      color: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    },
    {
      badgeNumber: 3,
      title: { fr: "La Repentance & la Foi", en: "Repentance & Faith" },
      description: {
        fr: "Se repentir (« metanoia », changer de mentalité ; « shub », faire demi-tour) et croire de tout son cœur que Jésus est ressuscité pour naître de nouveau.",
        en: "Repenting ('metanoia', mindset shift; 'shub', turning back) and declaring Jesus Lord to receive forgiveness and spiritual new birth.",
      },
      verses: "Romains 10:9 • Éphésiens 2:8-9",
      color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
  ],
  verses: [
    {
      id: "rom-6-23",
      reference: { fr: "Romains 6:23", en: "Romans 6:23" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 6,
      verse: "23",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "En effet, le salaire du péché, c'est la mort, mais le don gratuit de Dieu, c'est la vie éternelle en Jésus-Christ notre Seigneur.",
        en: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
      },
      theme: {
        fr: "Le salaire du péché & le don gratuit de Dieu",
        en: "The wages of sin & the free gift of God",
      },
      context: {
        fr: "Verset clé du cours montrant l'impasse humaine sans Dieu et la délivrance accordée par Jésus.",
        en: "Core verse of the lesson highlighting humanity's dead end without God and the rescue given through Jesus.",
      },
      isKeyVerse: true,
      bgImageIndex: 1,
    },
    {
      id: "john-3-16",
      reference: { fr: "Jean 3:16", en: "John 3:16" },
      book: { fr: "Jean", en: "John" },
      chapter: 3,
      verse: "16",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "En effet, Dieu a tant aimé le monde qu'il a donné son Fils unique afin que quiconque croit en lui ne périsse pas mais ait la vie éternelle.",
        en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      },
      theme: {
        fr: "L'amour inconditionnel du Père & le don du Fils",
        en: "The Father's unconditional love & the gift of the Son",
      },
      context: {
        fr: "La motivation divine suprême du salut : l'amour infini de Dieu pour toute l'humanité.",
        en: "The supreme divine motive for salvation: God's infinite love for all humanity.",
      },
      isKeyVerse: true,
      bgImageIndex: 2,
    },
    {
      id: "eph-2-8-9",
      reference: { fr: "Éphésiens 2:8-9", en: "Ephesians 2:8-9" },
      book: { fr: "Éphésiens", en: "Ephesians" },
      chapter: 2,
      verse: "8-9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "En effet, c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu. Ce n'est pas par les œuvres, afin que personne ne puisse se vanter.",
        en: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
      },
      theme: {
        fr: "Sauvés par grâce au moyen de la foi",
        en: "Saved by grace through faith",
      },
      context: {
        fr: "Le salut ne s'achète ni ne se mérite par les bonnes actions ; c'est un cadeau reçu par la foi.",
        en: "Salvation cannot be bought or earned by good deeds; it is an unmerited gift received by faith.",
      },
      isKeyVerse: true,
      bgImageIndex: 3,
    },
    {
      id: "rom-10-9",
      reference: { fr: "Romains 10:9", en: "Romans 10:9" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 10,
      verse: "9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Si tu reconnais publiquement de ta bouche que Jésus est le Seigneur et si tu crois dans ton cœur que Dieu l'a ressuscité, tu seras sauvé.",
        en: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
      },
      theme: {
        fr: "Confession de la bouche et foi du cœur",
        en: "Confession of the mouth & belief of the heart",
      },
      context: {
        fr: "La réponse pratique pour recevoir le salut et sceller son engagement personnel avec Jésus.",
        en: "The practical response to receive salvation and seal one's personal commitment to Jesus.",
      },
      isKeyVerse: true,
      bgImageIndex: 4,
    },
    {
      id: "ps-51-5",
      reference: { fr: "Psaumes 51:5", en: "Psalms 51:3" },
      book: { fr: "Psaumes", en: "Psalms" },
      chapter: 51,
      verse: "5",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Car je reconnais mes transgressions et mon péché est constamment devant moi.",
        en: "For I know my transgressions, and my sin is always before me.",
      },
      theme: {
        fr: "La lucidité sur notre nature pécheresse",
        en: "Awareness of our sinful nature",
      },
      context: {
        fr: "David reconnaît la réalité et le poids de la transgression humaine devant la sainteté de Dieu.",
        en: "David acknowledges the reality and weight of human transgression before God's holiness.",
      },
      isKeyVerse: false,
      bgImageIndex: 5,
    },
    {
      id: "2cor-5-21",
      reference: { fr: "2 Corinthiens 5:21", en: "2 Corinthians 5:21" },
      book: { fr: "2 Corinthiens", en: "2 Corinthians" },
      chapter: 5,
      verse: "21",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "En effet, celui qui n'a pas connu le péché, il l'a fait devenir péché pour nous afin qu’en lui nous devenions justice de Dieu.",
        en: "God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.",
      },
      theme: {
        fr: "Le grand échange à la croix",
        en: "The divine exchange at the cross",
      },
      context: {
        fr: "Jésus a pris nos péchés pour nous donner en retour Sa justice immaculée devant Dieu.",
        en: "Jesus took our sin upon Himself so that in exchange we receive His flawless righteousness.",
      },
      isKeyVerse: true,
      bgImageIndex: 6,
    },
    {
      id: "matt-16-15-16",
      reference: { fr: "Matthieu 16:15-16", en: "Matthew 16:15-16" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 16,
      verse: "15-16",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "« Et vous, leur demanda-t-il, qui dites-vous que je suis ? » Simon Pierre répondit : « Tu es le Messie, le Fils du Dieu vivant. »",
        en: "“But what about you?” he asked. “Who do you say I am?” Simon Peter answered, “You are the Messiah, the Son of the living God.”",
      },
      theme: {
        fr: "La révélation de l'identité de Jésus",
        en: "The revelation of Jesus' identity",
      },
      context: {
        fr: "La question centrale posée à tout être humain : reconnaître Jésus non comme simple enseignant, mais comme Fils de Dieu.",
        en: "The central question for every human being: recognizing Jesus not just as a teacher, but as the Son of God.",
      },
      isKeyVerse: false,
      bgImageIndex: 7,
    },
    {
      id: "heb-1-3",
      reference: { fr: "Hébreux 1:3", en: "Hebrews 1:3" },
      book: { fr: "Hébreux", en: "Hebrews" },
      chapter: 1,
      verse: "3",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Le Fils est le reflet de sa gloire et l'expression exacte de sa personne. Il soutient tout par sa parole puissante.",
        en: "The Son is the radiance of God’s glory and the exact representation of his being, sustaining all things by his powerful word.",
      },
      theme: {
        fr: "Jésus, reflet de la gloire divine",
        en: "Jesus, radiance of God's glory",
      },
      context: {
        fr: "Jésus révèle parfaitement qui est Dieu : Il n'est pas une figure distante, mais le Dieu vivant venu à nous.",
        en: "Jesus reveals God perfectly: He is not a distant figure, but the living God who came to us.",
      },
      isKeyVerse: false,
      bgImageIndex: 8,
    },
    {
      id: "john-14-9",
      reference: { fr: "Jean 14:9", en: "John 14:9" },
      book: { fr: "Jean", en: "John" },
      chapter: 14,
      verse: "9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Jésus lui dit : « Il y a si longtemps que je suis avec vous et tu ne me connais pas, Philippe ! Celui qui m'a vu a vu le Père. »",
        en: "Jesus answered: 'Don’t you know me, Philip, even after I have been among you such a long time? Anyone who has seen me has seen the Father.'",
      },
      theme: {
        fr: "Voir Jésus, c'est voir le Père",
        en: "Seeing Jesus is seeing the Father",
      },
      context: {
        fr: "L'incarnation rend le Père accessible, proche et personnel.",
        en: "The Incarnation makes the Father accessible, close, and personal.",
      },
      isKeyVerse: false,
      bgImageIndex: 9,
    },
    {
      id: "col-1-15",
      reference: { fr: "Colossiens 1:15", en: "Colossians 1:15" },
      book: { fr: "Colossiens", en: "Colossians" },
      chapter: 1,
      verse: "15",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Le Fils est l'image du Dieu invisible, le premier-né de toute la création.",
        en: "The Son is the image of the invisible God, the firstborn over all creation.",
      },
      theme: {
        fr: "L'image du Dieu invisible",
        en: "The image of the invisible God",
      },
      context: {
        fr: "Jésus rend visible et compréhensible la nature même de Dieu pour nous.",
        en: "Jesus makes God's very nature visible and comprehensible to us.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
    {
      id: "heb-4-15",
      reference: { fr: "Hébreux 4:15", en: "Hebrews 4:15" },
      book: { fr: "Hébreux", en: "Hebrews" },
      chapter: 4,
      verse: "15",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "En effet, nous n'avons pas un grand-prêtre incapable de compatir à nos faiblesses ; au contraire, il a été tenté en tout point comme nous, mais sans commettre de péché.",
        en: "For we do not have a high priest who is unable to empathize with our weaknesses, but we have one who has been tempted in every way, just as we are—yet he did not sin.",
      },
      theme: {
        fr: "Jésus a partagé notre humanité sans péché",
        en: "Jesus shared our humanity without sin",
      },
      context: {
        fr: "Jésus comprend nos épreuves et nos luttes humaines tout en demeurant le sacrifice parfait.",
        en: "Jesus understands our human struggles and trials while remaining the flawless sacrifice.",
      },
      isKeyVerse: false,
      bgImageIndex: 2,
    },
    {
      id: "john-10-10",
      reference: { fr: "Jean 10:10", en: "John 10:10" },
      book: { fr: "Jean", en: "John" },
      chapter: 10,
      verse: "10",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Le voleur ne vient que pour voler, égorger et détruire ; moi, je suis venu afin que les brebis aient la vie et qu'elles l'aient en abondance.",
        en: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.",
      },
      theme: {
        fr: "La vie abondante en Jésus",
        en: "Abundant life in Jesus",
      },
      context: {
        fr: "Le but de Jésus n'est pas de nous imposer des règles rigides, mais de nous donner une vie riche et pleine de sens.",
        en: "Jesus' purpose is not to impose rigid rules, but to give us an abundant and meaningful life.",
      },
      isKeyVerse: true,
      bgImageIndex: 3,
    },
    {
      id: "rom-5-8",
      reference: { fr: "Romains 5:8", en: "Romans 5:8" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 5,
      verse: "8",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Mais Dieu prouve son amour envers nous en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.",
        en: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
      },
      theme: {
        fr: "Un amour prouvé à la croix",
        en: "Love proven at the cross",
      },
      context: {
        fr: "Dieu n'a pas attendu que nous soyons parfaits pour nous sauver : Christ est mort alors que nous étions encore pécheurs.",
        en: "God did not wait for us to be good or clean before saving us: Christ died while we were still sinners.",
      },
      isKeyVerse: true,
      bgImageIndex: 4,
    },
    {
      id: "isa-53-6",
      reference: { fr: "Ésaïe 53:6", en: "Isaiah 53:6" },
      book: { fr: "Ésaïe", en: "Isaiah" },
      chapter: 53,
      verse: "6",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Nous étions tous comme des brebis égarées : chacun suivait sa propre voie, et l'Éternel a fait retomber sur lui nos fautes à tous.",
        en: "We all, like sheep, have gone astray, each of us has turned to our own way; and the Lord has laid on him the iniquity of us all.",
      },
      theme: {
        fr: "Les brebis égarées et le porteur de nos fautes",
        en: "Lost sheep and the bearer of our iniquities",
      },
      context: {
        fr: "Prophétie décrivant notre égarement égoïste et le transfert de nos fautes sur le Messie.",
        en: "Prophecy detailing our selfish wandering and the transfer of our transgressions onto the Messiah.",
      },
      isKeyVerse: false,
      bgImageIndex: 5,
    },
    {
      id: "rev-3-20",
      reference: { fr: "Apocalypse 3:20", en: "Revelation 3:20" },
      book: { fr: "Apocalypse", en: "Revelation" },
      chapter: 3,
      verse: "20",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Voici, je me tiens à la porte et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui et lui avec moi.",
        en: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
      },
      theme: {
        fr: "Jésus frappe à la porte de notre cœur",
        en: "Jesus knocking at the door of our hearts",
      },
      context: {
        fr: "L'invitation personnelle de Jésus à entrer dans une communion intime et chaleureuse.",
        en: "Jesus' personal invitation into intimate fellowship and relationship.",
      },
      isKeyVerse: false,
      bgImageIndex: 6,
    },
    {
      id: "gen-3-21",
      reference: { fr: "Genèse 3:21", en: "Genesis 3:21" },
      book: { fr: "Genèse", en: "Genesis" },
      chapter: 3,
      verse: "21",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "L'Éternel Dieu fit des habits en peau pour Adam et pour sa femme, et il les en revêtit.",
        en: "The Lord God made garments of skin for Adam and his wife and clothed them.",
      },
      theme: {
        fr: "La provision divine pour couvrir la honte",
        en: "God's provision to cover human shame",
      },
      context: {
        fr: "Dès la chute dans le jardin d'Eden, un sacrifice d'animal annonce la couverture définitive apportée par Jésus.",
        en: "Right after the fall, God's animal skins foreshadowed the final covering brought by Jesus' sacrifice.",
      },
      isKeyVerse: false,
      bgImageIndex: 7,
    },
    {
      id: "john-3-3",
      reference: { fr: "Jean 3:3", en: "John 3:3" },
      book: { fr: "Jean", en: "John" },
      chapter: 3,
      verse: "3",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Jésus lui répondit : « En vérité, en vérité, je te le dis, à moins de naître de nouveau, personne ne peut voir le royaume de Dieu. »",
        en: "Jesus replied, 'Very truly I tell you, no one can see the kingdom of God unless they are born again.'",
      },
      theme: {
        fr: "La nouvelle naissance spirituelle",
        en: "Spiritual new birth",
      },
      context: {
        fr: "La base de la « Grande Idée » : notre esprit mort doit renaître à la vie divine par Jésus.",
        en: "The root of 'The Big Idea': our dead human spirit must be made alive again in Christ.",
      },
      isKeyVerse: false,
      bgImageIndex: 8,
    },
    {
      id: "isa-59-2",
      reference: { fr: "Ésaïe 59:2", en: "Isaiah 59:2" },
      book: { fr: "Ésaïe", en: "Isaiah" },
      chapter: 59,
      verse: "2",
      translation: { fr: "LSG", en: "NIV" },
      text: {
        fr: "Mais ce sont vos fautes qui ont fait séparation entre vous et votre Dieu, ce sont vos péchés qui vous l’ont caché et l'ont empêché de vous écouter.",
        en: "But your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear.",
      },
      theme: {
        fr: "Le péché comme barrière de séparation",
        en: "Sin as a wall of separation",
      },
      context: {
        fr: "Explique pourquoi l'humanité ne peut pas vivre en paix avec Dieu sans un Sauveur qui détruit ce fossé.",
        en: "Explains why humanity is estranged from God without a Saviour who bridges the chasm.",
      },
      isKeyVerse: false,
      bgImageIndex: 9,
    },
    {
      id: "rom-5-12",
      reference: { fr: "Romains 5:12", en: "Romans 5:12" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 5,
      verse: "12",
      translation: { fr: "LSG", en: "NIV" },
      text: {
        fr: "C’est pourquoi, comme par un seul homme le péché est entré dans le monde, et par le péché la mort, et qu’ainsi la mort s’est étendue sur tous les hommes, parce que tous ont péché...",
        en: "Therefore, just as sin entered the world through one man, and death through sin, and in this way death came to all people, because all sinned...",
      },
      theme: {
        fr: "L'universalité de la chute",
        en: "The universality of the fall",
      },
      context: {
        fr: "Le péché d'Adam a contaminé toute la race humaine en lui transmettant une nature pécheresse.",
        en: "Adam's rebellion impacted all generations, transmitting an inherited sinful nature.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
    {
      id: "rom-8-19-21",
      reference: { fr: "Romains 8:19-21", en: "Romans 8:19-21" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 8,
      verse: "19-21",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Aussi la création attend-elle avec un ardent désir la révélation des fils de Dieu. Car la création a été soumise à l'inutilité [...] avec l'espérance qu'elle aussi sera libérée de l'esclavage de la corruption pour avoir part à la glorieuse liberté des enfants de Dieu.",
        en: "For the creation waits in eager expectation for the children of God to be revealed. For the creation was subjected to frustration... in hope that the creation itself will be liberated from its bondage to decay.",
      },
      theme: {
        fr: "L'impact du péché sur toute la création",
        en: "Sin's toll on creation & hope of redemption",
      },
      context: {
        fr: "Même la nature physique souffre de la rupture causée par la désobéissance originelle.",
        en: "Even the physical world bears the brunt of the fall and longs for full redemption.",
      },
      isKeyVerse: false,
      bgImageIndex: 2,
    },
    {
      id: "rom-3-23",
      reference: { fr: "Romains 3:23", en: "Romans 3:23" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 3,
      verse: "23",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Car tous ont péché et sont privés de la gloire de Dieu.",
        en: "For all have sinned and fall short of the glory of God.",
      },
      theme: {
        fr: "Tous sans exception ont manqué la cible",
        en: "All have sinned and fall short",
      },
      context: {
        fr: "Devant le standard absolu de sainteté divine, aucun être humain ne peut prétendre être pur par lui-même.",
        en: "Before God's standard of perfect righteousness, no human being qualifies on their own merit.",
      },
      isKeyVerse: true,
      bgImageIndex: 3,
    },
    {
      id: "jas-2-10",
      reference: { fr: "Jacques 2:10", en: "James 2:10" },
      book: { fr: "Jacques", en: "James" },
      chapter: 2,
      verse: "10",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "De fait, la personne qui obéit à toute la loi mais qui pèche contre un seul commandement est coupable envers tous.",
        en: "For whoever keeps the whole law and yet stumbles at just one point is guilty of breaking all of it.",
      },
      theme: {
        fr: "L'indivisibilité de la Loi de Dieu",
        en: "The indivisibility of God's Law",
      },
      context: {
        fr: "Le péché n'est pas une question de quota : une seule infraction suffit à nous rendre coupables devant le Juge saint.",
        en: "Sin is not a scorecard game: stumbling at one single point breaks the integrity of the whole Law.",
      },
      isKeyVerse: false,
      bgImageIndex: 4,
    },
    {
      id: "isa-53-4-5",
      reference: { fr: "Ésaïe 53:4-5", en: "Isaiah 53:4-5" },
      book: { fr: "Ésaïe", en: "Isaiah" },
      chapter: 53,
      verse: "4-5",
      translation: { fr: "LSG", en: "NIV" },
      text: {
        fr: "Cependant, ce sont nos souffrances qu'il a portées, c'est de nos douleurs qu'il s'est chargé [...] Mais il était blessé pour nos péchés, brisé pour nos iniquités ; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris.",
        en: "Surely he took up our pain and bore our suffering... But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
      },
      theme: {
        fr: "La substitution prophétisée à la croix",
        en: "Prophetic substitution at the cross",
      },
      context: {
        fr: "Jésus a absorbé la punition pour que nous puissions recevoir la paix et la guérison avec Dieu.",
        en: "Jesus bore our punishment so that we could receive reconciliation and peace with God.",
      },
      isKeyVerse: false,
      bgImageIndex: 5,
    },
    {
      id: "rom-3-19-20",
      reference: { fr: "Romains 3:19-20", en: "Romans 3:19-20" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 3,
      verse: "19-20",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Or nous savons que tout ce que dit la loi, elle le dit à ceux qui sont sous la loi, afin que toute bouche soit fermée et que le monde entier soit reconnu coupable devant Dieu. En effet, personne ne sera déclaré juste devant lui sur la base des œuvres de la loi...",
        en: "Now we know that whatever the law says, it says to those who are under the law, so that every mouth may be silenced and the whole world held accountable to God. Therefore no one will be declared righteous in God’s sight by the works of the law...",
      },
      theme: {
        fr: "L'impuissance des œuvres pour se justifier",
        en: "Inability of works to justify anyone",
      },
      context: {
        fr: "La loi révèle notre besoin de pardon et démasque l'illusion de se sauver soi-même par de bonnes actions.",
        en: "The law reveals our dire need for forgiveness and disproves self-righteousness.",
      },
      isKeyVerse: false,
      bgImageIndex: 6,
    },
    {
      id: "acts-4-12",
      reference: { fr: "Actes 4:12", en: "Acts 4:12" },
      book: { fr: "Actes", en: "Acts" },
      chapter: 4,
      verse: "12",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Il n'y a de salut en aucun autre, car il n'y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés.",
        en: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
      },
      theme: {
        fr: "Jésus, unique chemin du salut",
        en: "Jesus, the exclusive path to salvation",
      },
      context: {
        fr: "Proclamation apostolique claire : Jésus est le seul médiateur qui réconcilie l'homme avec Dieu.",
        en: "Clear apostolic declaration: Jesus is the sole mediator reconciling humanity to God.",
      },
      isKeyVerse: true,
      bgImageIndex: 7,
    },
    {
      id: "matt-1-21",
      reference: { fr: "Matthieu 1:21", en: "Matthew 1:21" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 1,
      verse: "21",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Elle mettra au monde un fils et tu lui donneras le nom de Jésus, car c'est lui qui sauvera son peuple de ses péchés.",
        en: "She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.",
      },
      theme: {
        fr: "La signification prophétique du nom de Jésus",
        en: "The prophetic meaning of the name Jesus",
      },
      context: {
        fr: "Le nom Yeshoua signifie « L'Éternel sauve » : Sa mission même était de nous délivrer du péché.",
        en: "Yeshua literally means 'Yahweh saves': His very purpose was rescuing His people from sin.",
      },
      isKeyVerse: false,
      bgImageIndex: 8,
    },
    {
      id: "1john-2-1",
      reference: { fr: "1 Jean 2:1", en: "1 John 2:1" },
      book: { fr: "1 Jean", en: "1 John" },
      chapter: 2,
      verse: "1",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Mes petits enfants, je vous écris cela afin que vous ne péchiez pas. Mais si quelqu'un vient à pécher, nous avons un défenseur auprès du Père, Jésus-Christ le juste.",
        en: "My dear children, I write this to you so that you will not sin. But if anybody does sin, we have an advocate with the Father—Jesus Christ, the Righteous One.",
      },
      theme: {
        fr: "Jésus notre avocat auprès du Père",
        en: "Jesus our heavenly advocate with the Father",
      },
      context: {
        fr: "Même après notre conversion, si nous trébuchons, Jésus intercède pour nous avec grâce.",
        en: "Even as believers, when we stumble, Jesus continuously stands as our righteous advocate.",
      },
      isKeyVerse: false,
      bgImageIndex: 9,
    },
    {
      id: "rom-5-1",
      reference: { fr: "Romains 5:1", en: "Romans 5:1" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 5,
      verse: "1",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Ainsi donc, déclarés justes sur la base de la foi, nous avons la paix avec Dieu par notre Seigneur Jésus-Christ.",
        en: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.",
      },
      theme: {
        fr: "La paix avec Dieu par la foi",
        en: "Peace with God through faith",
      },
      context: {
        fr: "La conséquence immédiate du pardon : nous n'avons plus peur du jugement, nous sommes en paix avec le Père.",
        en: "The immediate fruit of forgiveness: free from condemnation, enjoying friendship and peace with God.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
  ],
  questions: [
    // 1. Étymologie : hhatah
    {
      id: "q-01-etym-hhatah",
      type: "etymology",
      category: { fr: "Étymologie Biblique", en: "Biblical Etymology" },
      question: {
        fr: "Que signifie littéralement le mot hébreu « hhatah » (חטאה) utilisé dans l'Ancien Testament pour désigner le péché ?",
        en: "What does the Hebrew word 'hhatah' (חטאה), used in the Old Testament for sin, literally mean?",
      },
      options: [
        { id: "opt-2", text: { fr: "Enfreindre une règle", en: "Breaking a rule" }, isCorrect: false },
        { id: "opt-1", text: { fr: "Manquer la cible", en: "Missing the mark / target" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Avoir de mauvaises pensées", en: "Having bad thoughts" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Être puni par Dieu", en: "Being punished by God" }, isCorrect: false },
      ],
      etymologyData: {
        originalWord: "חטאה (hhatah)",
        languageOrigin: "hebrew",
        literalMeaning: {
          fr: "Manquer la cible (rater la relation avec le Créateur)",
          en: "Missing the target (missing our relationship with the Creator)",
        },
      },
      correctAnswerSummary: { fr: "Manquer la cible", en: "Missing the mark / target" },
      explanation: {
        fr: "Le mot hébreu pour « péché » est (חטאה) hhatah et signifie littéralement 'manquer la cible'. Quand nous péchons, nous manquons la cible, et cette cible est notre relation vitale avec notre Créateur.",
        en: "The Hebrew word for 'sin' is (חטאה) hhatah and literally means 'missing the mark'. When we sin, we miss the target, which is our vital relationship with our Creator.",
      },
      associatedVerseRef: "Psaumes 51:5",
    },

    // 2. Étymologie : metanoia
    {
      id: "q-02-etym-metanoia",
      type: "etymology",
      category: { fr: "Étymologie Biblique", en: "Biblical Etymology" },
      question: {
        fr: "Le terme grec du Nouveau Testament pour la repentance est « metanoia » (μετάνοια). Quel est son sens profond ?",
        en: "The New Testament Greek word for repentance is 'metanoia' (μετάνοια). What is its profound meaning?",
      },
      options: [
        { id: "opt-1", text: { fr: "Se culpabiliser et pleurer sur ses fautes", en: "Feeling guilty and crying over mistakes" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Changer d'état d'esprit et de perspective après mûre réflexion", en: "A change of mindset and perspective after deep reflection" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Payer une pénitence religieuse", en: "Paying a religious penance" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Promettre de ne plus jamais se tromper", en: "Promising never to make another mistake" }, isCorrect: false },
      ],
      etymologyData: {
        originalWord: "μετάνοια (metanoia)",
        languageOrigin: "greek",
        literalMeaning: {
          fr: "Changement d'esprit, nouvelle vision spirituelle",
          en: "Change of mind, transformed perspective",
        },
      },
      correctAnswerSummary: {
        fr: "Changer sa façon de penser et de croire",
        en: "A transformed mindset and belief",
      },
      explanation: {
        fr: "Le mot grec 'metanoia' signifie avoir une autre mentalité, changer de cap après une réflexion profonde et placer sa confiance dans l'œuvre accomplie de Jésus-Christ.",
        en: "The Greek word 'metanoia' means to acquire a new mindset, changing course after deep reflection and putting one's trust in the finished work of Jesus Christ.",
      },
      associatedVerseRef: "Romains 10:9",
    },

    // 3. Étymologie : shub
    {
      id: "q-03-etym-shub",
      type: "etymology",
      category: { fr: "Étymologie Biblique", en: "Biblical Etymology" },
      question: {
        fr: "En hébreu, quel est le mot traduit par 'se repentir' signifiant littéralement 'faire demi-tour complet' ou 'rebrousser chemin' ?",
        en: "In Hebrew, what word translated as 'repent' literally means 'making a complete U-turn' or 'turning back'?",
      },
      options: [
        { id: "opt-1", text: { fr: "Shalom", en: "Shalom" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Shub (שׁוּב)", en: "Shub (שׁוּב)" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Hallelu", en: "Hallelu" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Amen", en: "Amen" }, isCorrect: false },
      ],
      etymologyData: {
        originalWord: "שׁוּב (shub)",
        languageOrigin: "hebrew",
        literalMeaning: {
          fr: "Rebrousser chemin, faire demi-tour vers Dieu",
          en: "Turning back, making a complete U-turn towards God",
        },
      },
      correctAnswerSummary: { fr: "Shub (שׁוּב)", en: "Shub (שׁוּב)" },
      explanation: {
        fr: "En hébreu, l'une des racines majeures de la repentance est 'shub', qui décrit l'acte concret de rebrousser chemin et de revenir vers Dieu.",
        en: "In Hebrew, a primary root for repentance is 'shub', picturing the physical act of turning around and returning to God.",
      },
      associatedVerseRef: "Ésaïe 53:6",
    },

    // 4. Texte à trous : Romains 6:23
    {
      id: "q-04-cloze-rom-6-23",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation de Verset", en: "Verse Memorization" },
      question: {
        fr: "Complète le verset clé de Romains 6:23 (S21) :",
        en: "Complete the key verse from Romans 6:23 (NIV):",
      },
      fillInData: {
        template: {
          fr: "En effet, le salaire du péché, c'est la [blank1], mais le don gratuit de Dieu, c'est la [blank2] en Jésus-Christ notre Seigneur.",
          en: "For the wages of sin is [blank1], but the gift of God is [blank2] in Christ Jesus our Lord.",
        },
        answers: {
          blank1: { fr: "mort", en: "death" },
          blank2: { fr: "vie éternelle", en: "eternal life" },
        },
        wordBank: {
          fr: ["mort", "vie éternelle", "condamnation", "justice", "gloire"],
          en: ["death", "eternal life", "punishment", "righteousness", "reward"],
        },
      },
      correctAnswerSummary: {
        fr: "mort / vie éternelle",
        en: "death / eternal life",
      },
      explanation: {
        fr: "Le péché produit inévitablement la mort spirituelle, mais Dieu offre gratuitement la vie éternelle à tous ceux qui placent leur foi en Jésus.",
        en: "Sin inevitably results in spiritual death, but God freely bestows eternal life on all who trust in Jesus.",
      },
      associatedVerseRef: "Romains 6:23",
    },

    // 5. Texte à trous : Jean 3:16
    {
      id: "q-05-cloze-john-3-16",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation de Verset", en: "Verse Memorization" },
      question: {
        fr: "Complète les paroles de Jésus dans Jean 3:16 (S21) :",
        en: "Complete Jesus' words in John 3:16 (NIV):",
      },
      fillInData: {
        template: {
          fr: "En effet, Dieu a tant [blank1] le monde qu'il a donné son [blank2] unique afin que quiconque croit en lui ne périsse pas mais ait la vie éternelle.",
          en: "For God so [blank1] the world that he gave his one and only [blank2], that whoever believes in him shall not perish but have eternal life.",
        },
        answers: {
          blank1: { fr: "aimé", en: "loved" },
          blank2: { fr: "Fils", en: "Son" },
        },
        wordBank: {
          fr: ["aimé", "Fils", "jugé", "serviteur", "sauvé"],
          en: ["loved", "Son", "judged", "servant", "guided"],
        },
      },
      correctAnswerSummary: { fr: "aimé / Fils", en: "loved / Son" },
      explanation: {
        fr: "Le don du Fils unique découle directement de l'amour sans limite de Dieu pour l'humanité.",
        en: "The sacrifice of the one and only Son stems directly from God's boundless love for humanity.",
      },
      associatedVerseRef: "Jean 3:16",
    },

    // 6. Texte à trous : Éphésiens 2:8-9
    {
      id: "q-06-cloze-eph-2-8",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation de Verset", en: "Verse Memorization" },
      question: {
        fr: "Complète Éphésiens 2:8 (S21) sur la nature du salut :",
        en: "Complete Ephesians 2:8 (NIV) regarding the nature of salvation:",
      },
      fillInData: {
        template: {
          fr: "En effet, c'est par la [blank1] que vous êtes sauvés, par le moyen de la [blank2]. Et cela ne vient pas de vous, c'est le don de Dieu.",
          en: "For it is by [blank1] you have been saved, through [blank2]—and this is not from yourselves, it is the gift of God.",
        },
        answers: {
          blank1: { fr: "grâce", en: "grace" },
          blank2: { fr: "foi", en: "faith" },
        },
        wordBank: {
          fr: ["grâce", "foi", "loi", "prière", "morale"],
          en: ["grace", "faith", "law", "prayer", "effort"],
        },
      },
      correctAnswerSummary: { fr: "grâce / foi", en: "grace / faith" },
      explanation: {
        fr: "Le salut repose entièrement sur la grâce (ce que Dieu a accompli) reçu par la foi (notre confiance personnelle), non sur nos mérites personnels.",
        en: "Salvation rests entirely on grace (what God accomplished) received through faith (our trust), never on our personal merit.",
      },
      associatedVerseRef: "Éphésiens 2:8-9",
    },

    // 7. Texte à trous : Romains 10:9
    {
      id: "q-07-cloze-rom-10-9",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation de Verset", en: "Verse Memorization" },
      question: {
        fr: "Complète l'affirmation de Romains 10:9 (S21) :",
        en: "Complete the declaration in Romans 10:9 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Si tu reconnais publiquement de ta [blank1] que Jésus est le Seigneur et si tu crois dans ton [blank2] que Dieu l'a ressuscité, tu seras sauvé.",
          en: "If you declare with your [blank1], 'Jesus is Lord,' and believe in your [blank2] that God raised him from the dead, you will be saved.",
        },
        answers: {
          blank1: { fr: "bouche", en: "mouth" },
          blank2: { fr: "cœur", en: "heart" },
        },
        wordBank: {
          fr: ["bouche", "cœur", "pensée", "force", "famille"],
          en: ["mouth", "heart", "mind", "deeds", "family"],
        },
      },
      correctAnswerSummary: { fr: "bouche / cœur", en: "mouth / heart" },
      explanation: {
        fr: "Le salut engage à la fois la sincérité intérieure (croire de tout son cœur) et le témoignage authentique (confesser Jésus comme Seigneur).",
        en: "Salvation engages both inner authenticity (heartfelt faith) and genuine public alignment (declaring Jesus as Lord).",
      },
      associatedVerseRef: "Romains 10:9",
    },

    // 8. Vrai ou Faux : Relation vs Règles
    {
      id: "q-08-tf-relation-vs-rules",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Selon l'introduction du cours Nouveau Départ, le christianisme consiste principalement à respecter une liste stricte de règles religieuses.",
        en: "According to the introduction of the New Beginnings course, Christianity is primarily about following a strict list of religious rules.",
      },
      options: [
        { id: "opt-true", text: { fr: "Vrai", en: "True" }, isCorrect: false },
        { id: "opt-false", text: { fr: "Faux", en: "False" }, isCorrect: true },
      ],
      correctAnswerSummary: { fr: "Faux", en: "False" },
      explanation: {
        fr: "Le livret précise : 'il ne s’agit pas de vivre en respectant un certain nombre de règles mais il s’agit de relation, une relation vibrante, pleine de vie et d’espoir.'",
        en: "The course specifically clarifies: 'it is not about living by a certain number of rules, but about a relationship, a vibrant relationship, full of life and hope.'",
      },
      associatedVerseRef: "Apocalypse 3:20",
    },

    // 9. Vrai ou Faux : Bonnes œuvres et effacement du péché
    {
      id: "q-09-tf-good-deeds",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Accomplir 9 bonnes actions peut suffire à effacer un péché commis devant Dieu.",
        en: "Doing 9 good deeds can erase even one sin committed before God.",
      },
      options: [
        { id: "opt-true", text: { fr: "Vrai", en: "True" }, isCorrect: false },
        { id: "opt-false", text: { fr: "Faux", en: "False" }, isCorrect: true },
      ],
      correctAnswerSummary: { fr: "Faux", en: "False" },
      explanation: {
        fr: "Comme le souligne la section Discussion : faire de bonnes actions ne compense pas le péché. Même un criminel peut faire du bien à ses enfants, mais cela n'annule pas sa culpabilité légale devant la justice.",
        en: "As highlighted in the Discussion section: good deeds cannot counterbalance sin. Even a criminal can love their children, but that doesn't erase guilt before the law.",
      },
      associatedVerseRef: "Romains 3:19-20",
    },

    // 10. Vrai ou Faux : Degrés de péché devant Dieu
    {
      id: "q-10-tf-degrees-of-sin",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "S'agissant de notre relation avec Dieu, le péché est une affaire de quantité : il faut accumuler plusieurs fautes graves pour être séparé de Lui.",
        en: "When it comes to our relationship with God, sin is a matter of quantity: you have to accumulate several major faults to be separated from Him.",
      },
      options: [
        { id: "opt-true", text: { fr: "Vrai", en: "True" }, isCorrect: false },
        { id: "opt-false", text: { fr: "Faux", en: "False" }, isCorrect: true },
      ],
      correctAnswerSummary: { fr: "Faux", en: "False" },
      explanation: {
        fr: "Un seul péché dans le jardin d'Eden a suffi pour séparer l'humanité de Dieu. Jacques 2:10 rappelle que trébucher sur un seul commandement nous rend coupables de tous.",
        en: "A single sin in Eden was enough to break fellowship with God. James 2:10 confirms that stumbling at just one point makes someone a lawbreaker of all.",
      },
      associatedVerseRef: "Jacques 2:10",
    },

    // 11. Vrai ou Faux : La colère de Dieu lors d'un péché
    {
      id: "q-11-tf-god-angry-at-you",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "À chaque fois que tu pèches, Dieu devient fâché contre toi personnellement et s'éloigne de ta vie.",
        en: "Every time you sin, God gets personally angry at you and pulls away from your life.",
      },
      options: [
        { id: "opt-true", text: { fr: "Vrai", en: "True" }, isCorrect: false },
        { id: "opt-false", text: { fr: "Faux", en: "False" }, isCorrect: true },
      ],
      correctAnswerSummary: { fr: "Faux", en: "False" },
      explanation: {
        fr: "Le cours précise : Dieu est en colère contre ce qui te blesse et détruit ta vie, non contre toi. En Jésus-Christ, nous avons un avocat parfait auprès du Père (1 Jean 2:1).",
        en: "The course clarifies: God is angry at what harms and destroys you, not at you. In Jesus Christ, we have a faithful advocate with the Father (1 John 2:1).",
      },
      associatedVerseRef: "1 Jean 2:1",
    },

    // 12. Vrai ou Faux : Le libre arbitre et l'amour
    {
      id: "q-12-tf-free-will-love",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Dieu a laissé la liberté de choisir à l'homme parce qu'un amour véritable et sincère est impossible sans liberté de choix.",
        en: "God gave mankind freedom of choice because genuine love cannot exist without the liberty to choose.",
      },
      options: [
        { id: "opt-true", text: { fr: "Vrai", en: "True" }, isCorrect: true },
        { id: "opt-false", text: { fr: "Faux", en: "False" }, isCorrect: false },
      ],
      correctAnswerSummary: { fr: "Vrai", en: "True" },
      explanation: {
        fr: "Il n'y a pas d'amour forcé. Tout comme nous choisissons nos amis et notre conjoint, la liberté de choisir rend la relation avec Dieu infiniment précieuse.",
        en: "Real love cannot be coerced. Just as you freely choose your friends and spouse, liberty gives relationship with God genuine depth.",
      },
      associatedVerseRef: "Genèse 3:21",
    },

    // 13. QCM : Signification de Genèse
    {
      id: "q-13-mcq-genesis-meaning",
      type: "mcq",
      category: { fr: "Compréhension Biblique", en: "Biblical Understanding" },
      question: {
        fr: "Que signifie le nom du premier livre de la Bible, la « Genèse » ?",
        en: "What does the name of the first book of the Bible, 'Genesis', mean?",
      },
      options: [
        { id: "opt-3", text: { fr: "Alliance éternelle", en: "Everlasting Covenant" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Loi sainte", en: "Holy Law" }, isCorrect: false },
        { id: "opt-1", text: { fr: "Commencement / Origine", en: "Beginning / Origin" }, isCorrect: true },
        { id: "opt-4", text: { fr: "Lumière du monde", en: "Light of the World" }, isCorrect: false },
      ],
      correctAnswerSummary: { fr: "Commencement / Origine", en: "Beginning / Origin" },
      explanation: {
        fr: "Le livret rappelle : 'Dans le livre de la Genèse (qui signifie commencement), nous voyons que Dieu a créé le monde...'",
        en: "The course mentions: 'In the book of Genesis (which means beginning), we see that God created the world...'",
      },
      associatedVerseRef: "Genèse 3:21",
    },

    // 14. QCM : Les habits de peau en Genèse 3
    {
      id: "q-14-mcq-coats-of-skins",
      type: "mcq",
      category: { fr: "Compréhension Biblique", en: "Biblical Understanding" },
      question: {
        fr: "Après la désobéissance d'Adam et Ève en Genèse 3, que fit Dieu pour couvrir leur nudité et leur honte ?",
        en: "After Adam and Eve sinned in Genesis 3, what did God provide to cover their nakedness and shame?",
      },
      options: [
        { id: "opt-1", text: { fr: "Il leur demanda de tresser des feuilles de figuier", en: "He told them to sew fig leaves" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Il leur fit des vêtements en peau d'animal", en: "He made garments of animal skins for them" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Il les laissa se débrouiller seuls", en: "He left them on their own" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Il leur donna des vêtements de pourpre", en: "He gave them royal purple robes" }, isCorrect: false },
      ],
      correctAnswerSummary: { fr: "Des vêtements en peau d'animal", en: "Garments of animal skins" },
      explanation: {
        fr: "En Genèse 3:21, Dieu a pourvu des habits de peau. Un animal innocent a dû mourir : c'était une image préfigurant le sacrifice parfait de Jésus.",
        en: "In Genesis 3:21, God clothed them with animal skins. An innocent sacrifice foreshadowed the definitive sacrifice of Jesus.",
      },
      associatedVerseRef: "Genèse 3:21",
    },

    // 15. QCM : La réponse de Pierre dans Matthieu 16
    {
      id: "q-15-mcq-peter-confession",
      type: "mcq",
      category: { fr: "Identité de Jésus", en: "Jesus' Identity" },
      question: {
        fr: "Quand Jésus a demandé à Ses disciples : « Et vous, qui dites-vous que je suis ? » (Matthieu 16), quelle a été la réponse de Pierre ?",
        en: "When Jesus asked His disciples, 'Who do you say I am?' (Matthew 16), what was Peter's reply?",
      },
      options: [
        { id: "opt-1", text: { fr: "Tu es Jean-Baptiste ressuscité", en: "You are John the Baptist raised from the dead" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Tu es un grand prophète comme Élie", en: "You are a great prophet like Elijah" }, isCorrect: false },
        { id: "opt-3", text: { fr: "Tu es le Christ, le Fils du Dieu vivant", en: "You are the Messiah, the Son of the living God" }, isCorrect: true },
        { id: "opt-4", text: { fr: "Tu es un enseignant sage de la Loi", en: "You are a wise teacher of the Law" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Tu es le Christ, le Fils du Dieu vivant",
        en: "You are the Messiah, the Son of the living God",
      },
      explanation: {
        fr: "Pierre a reçu la révélation fondamentale de l'identité de Jésus : Il n'est pas simplement un prophète ou un maître moral, mais le Fils du Dieu vivant.",
        en: "Peter declared the foundational revelation: Jesus is not merely a moral leader or prophet, but the Son of the living God.",
      },
      associatedVerseRef: "Matthieu 16:15-16",
    },

    // 16. QCM : La nature de Jésus selon Hébreux 1:3 & Colossiens 1:15
    {
      id: "q-16-mcq-jesus-nature",
      type: "mcq",
      category: { fr: "Identité de Jésus", en: "Jesus' Identity" },
      question: {
        fr: "Comment le livre aux Hébreux (1:3) et Colossiens (1:15) décrivent-ils la nature de Jésus par rapport à Dieu ?",
        en: "How do Hebrews (1:3) and Colossians (1:15) describe Jesus' nature in relation to God?",
      },
      options: [
        { id: "opt-2", text: { fr: "Un ange supérieur créé avant le monde", en: "A high angel created before the universe" }, isCorrect: false },
        { id: "opt-1", text: { fr: "Le reflet de Sa gloire et l'image du Dieu invisible", en: "The radiance of His glory and image of the invisible God" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Un homme ordinaire choisi pour ses mérites", en: "An ordinary man chosen for exemplary virtues" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Une simple voix céleste sans corps réel", en: "A heavenly voice with no actual body" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Le reflet de Sa gloire et l'image du Dieu invisible",
        en: "The radiance of His glory and image of the invisible God",
      },
      explanation: {
        fr: "Jésus est l'expression parfaite de la personne de Dieu. Comme Il l'a dit à Philippe : 'Celui qui m'a vu a vu le Père' (Jean 14:9).",
        en: "Jesus is the flawless representation of God's being. As He told Philip: 'Anyone who has seen me has seen the Father' (John 14:9).",
      },
      associatedVerseRef: "Hébreux 1:3",
    },

    // 17. QCM : La vie de Jésus sur terre selon Hébreux 4:15
    {
      id: "q-17-mcq-jesus-sinless",
      type: "mcq",
      category: { fr: "Identité de Jésus", en: "Jesus' Identity" },
      question: {
        fr: "Selon Hébreux 4:15, quelle est la caractéristique extraordinaire de la vie humaine de Jésus sur terre ?",
        en: "According to Hebrews 4:15, what was the extraordinary hallmark of Jesus' earthly life?",
      },
      options: [
        { id: "opt-1", text: { fr: "Il n'a jamais connu la souffrance ni la tristesse", en: "He never experienced suffering or sadness" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Il a été tenté en tout point comme nous, mais sans commettre de péché", en: "He was tempted in every way, just as we are, yet without sin" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Il a évité tout contact avec les personnes marginalisées", en: "He avoided contact with sinners and outcasts" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Il utilisait Ses pouvoirs pour ne jamais avoir faim ni soif", en: "He used supernatural powers never to thirst or hunger" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Tenté en tout comme nous, mais sans péché",
        en: "Tempted in all things, yet sinless",
      },
      explanation: {
        fr: "Jésus a connu notre humanité, la tentation et la douleur, mais Il a constamment vécu une vie sans péché, devenant l'agneau sans défaut.",
        en: "Jesus experienced real human temptation and tears, yet remained utterly without sin, qualifying as the unblemished sacrifice.",
      },
      associatedVerseRef: "Hébreux 4:15",
    },

    // 18. QCM : But de la venue de Jésus selon Jean 10:10
    {
      id: "q-18-mcq-john-10-10-purpose",
      type: "mcq",
      category: { fr: "La Mission du Christ", en: "Christ's Mission" },
      question: {
        fr: "Dans Jean 10:10, que promet Jésus à ceux qui Le suivent en opposition au voleur ?",
        en: "In John 10:10, what does Jesus promise to His sheep in contrast to the thief?",
      },
      options: [
        { id: "opt-1", text: { fr: "Une richesse matérielle immédiate", en: "Instant material riches" }, isCorrect: false },
        { id: "opt-2", text: { fr: "La vie, et la vie en abondance", en: "Life, and life to the full / abundant life" }, isCorrect: true },
        { id: "opt-3", text: { fr: "L'absence totale de difficultés dans ce monde", en: "Freedom from any hardship or trial" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Le pouvoir politique sur les nations", en: "Political authority over nations" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "La vie en abondance",
        en: "Life in abundance",
      },
      explanation: {
        fr: "Le voleur ne vient que pour voler, égorger et détruire. Jésus est venu pour nous communiquer Sa vie divine abondante et éternelle.",
        en: "The adversary comes to steal, kill, and destroy. Jesus entered human history so we might experience abundant and eternal life.",
      },
      associatedVerseRef: "Jean 10:10",
    },

    // 19. QCM : Le salut exclusif en Jésus (Actes 4:12)
    {
      id: "q-19-mcq-acts-4-12-salvation",
      type: "mcq",
      category: { fr: "Le Salut", en: "Salvation" },
      question: {
        fr: "Que déclare l'apôtre Pierre avec assurance dans Actes 4:12 concernant le salut ?",
        en: "What does the Apostle Peter boldly declare in Acts 4:12 regarding salvation?",
      },
      options: [
        { id: "opt-1", text: { fr: "Toutes les religions mènent au même sommet", en: "All religions lead up the same mountain" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Il n'y a de salut en aucun autre nom sous le ciel", en: "There is salvation in no other name under heaven" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Chacun doit trouver sa propre vérité intérieure", en: "Everyone must construct their own spiritual truth" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Le salut dépend de notre culture de naissance", en: "Salvation depends on cultural background" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Il n'y a de salut en aucun autre nom",
        en: "Salvation is found in no other name",
      },
      explanation: {
        fr: "La Bible affirme qu'aucun autre être n'a payé la dette du péché. Jésus est le seul médiateur qui réconcilie l'homme et Dieu.",
        en: "Scripture affirms that no other person paid sin's penalty. Jesus is the sole bridge reconciling mankind to God.",
      },
      associatedVerseRef: "Actes 4:12",
    },

    // 20. QCM : La signification du nom Jésus (Matthieu 1:21)
    {
      id: "q-20-mcq-matthew-1-21-name",
      type: "mcq",
      category: { fr: "Identité de Jésus", en: "Jesus' Identity" },
      question: {
        fr: "Pourquoi l'ange demande-t-il à Joseph d'appeler l'enfant « Jésus » dans Matthieu 1:21 ?",
        en: "Why did the angel command Joseph to name the child 'Jesus' in Matthew 1:21?",
      },
      options: [
        { id: "opt-1", text: { fr: "Parce que c'était le prénom du roi David", en: "Because it was King David's first name" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Car c'est lui qui sauvera son peuple de ses péchés", en: "Because he will save his people from their sins" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Pour se conformer à la coutume romaine", en: "To satisfy Roman civil custom" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Parce qu'il sera un souverain militaire", en: "Because he would be a conquering military general" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Car c'est lui qui sauvera son peuple de ses péchés",
        en: "Because he will save his people from their sins",
      },
      explanation: {
        fr: "Le nom Jésus (Yeshoua) signifie 'Dieu sauve'. Sa mission divine était gravée dans Son nom dès Sa conception.",
        en: "The name Jesus (Yeshua) literally means 'God saves'. His redemptive mandate was stamped in His name from conception.",
      },
      associatedVerseRef: "Matthieu 1:21",
    },

    // 21. Discussion / Réflexion : Les 4 conséquences du péché
    {
      id: "q-21-refl-sin-consequences",
      type: "discussion_reflection",
      category: { fr: "Section Discussion", en: "Discussion Section" },
      question: {
        fr: "Dans la section Discussion du cours, quelles sont les 4 grandes conséquences universelles du péché listées ?",
        en: "In the course Discussion section, what are the 4 universal consequences of sin listed?",
      },
      options: [
        {
          id: "opt-3",
          text: {
            fr: "La perte de souvenirs, la vieillesse, la solitude, et l'exil",
            en: "Memory loss, old age, loneliness, and exile",
          },
          isCorrect: false,
        },
        {
          id: "opt-2",
          text: {
            fr: "La pauvreté financière, les maladies physiques, la guerre, et la météo",
            en: "Financial poverty, physical sickness, geopolitical conflict, and harsh weather",
          },
          isCorrect: false,
        },
        {
          id: "opt-1",
          text: {
            fr: "La séparation d’avec Dieu, la mort, la nature pécheresse, et la déchéance du monde créé",
            en: "Separation from God, death, sinful nature, and creation's bondage to decay",
          },
          isCorrect: true,
        },
        {
          id: "opt-4",
          text: {
            fr: "L'obligation d'aller au temple, la dîme, les sacrifices, et le jeûne",
            en: "Obligatory temple attendance, tithing, rituals, and fasts",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Séparation d'avec Dieu, mort, nature pécheresse, création déchue",
        en: "Separation from God, death, sinful nature, fallen creation",
      },
      explanation: {
        fr: "Le livret détaille : 1) La séparation d'avec Dieu (Ésaïe 59:2), 2) La mort spirituelle et physique (Romains 5:12), 3) La transmission de la nature pécheresse, 4) Une création soumise à la vanité et à la corruption (Romains 8:19).",
        en: "The curriculum notes: 1) Separation from God (Isa 59:2), 2) Death (Rom 5:12), 3) Sinful nature passed on, 4) Creation subjected to frustration and decay (Rom 8:19).",
      },
      associatedVerseRef: "Romains 5:12",
    },

    // 22. Discussion / Réflexion : Pourquoi la mort de Jésus était indispensable
    {
      id: "q-22-refl-why-jesus-died",
      type: "discussion_reflection",
      category: { fr: "Section Discussion", en: "Discussion Section" },
      question: {
        fr: "Pourquoi a-t-il fallu que Jésus meure sur une croix plutôt que de simplement annuler le péché par un décret ?",
        en: "Why was it necessary for Jesus to die on a cross rather than simply forgiving sin by decree?",
      },
      options: [
        {
          id: "opt-4",
          text: {
            fr: "Pour créer un symbole que les chrétiens porteraient en bijou",
            en: "To create an emblem for believers to wear as jewelry",
          },
          isCorrect: false,
        },
        {
          id: "opt-2",
          text: {
            fr: "Parce que Jésus a été pris par surprise par les autorités romaines",
            en: "Because Jesus was taken off-guard by the Roman rulers",
          },
          isCorrect: false,
        },
        {
          id: "opt-3",
          text: {
            fr: "Pour montrer Sa force physique devant Ses ennemis",
            en: "To display physical endurance before His opponents",
          },
          isCorrect: false,
        },
        {
          id: "opt-1",
          text: {
            fr: "Parce que la justice de Dieu exige que la dette du péché (la mort) soit payée par un substitut parfait",
            en: "Because God's perfect justice required the penalty of sin (death) to be borne by a flawless substitute",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Le salaire du péché est la mort ; Jésus l'a payé à notre place",
        en: "Wages of sin is death; Jesus fully paid it on our behalf",
      },
      explanation: {
        fr: "Dieu est parfaitement juste et saint : le salaire du péché est la mort. À la croix, Jésus a pris notre châtiment sur Lui (Ésaïe 53:4-5) pour que nous recevions Sa vie sans condamnation.",
        en: "God is holy and just: sin's penalty is death. On the cross, Jesus absorbed our punishment (Isaiah 53:4-5) so that we receive unmerited life.",
      },
      associatedVerseRef: "Ésaïe 53:4-5",
    },

    // 23. Discussion / Réflexion : La « Grande Idée » et la nouvelle naissance
    {
      id: "q-23-refl-big-idea-born-again",
      type: "discussion_reflection",
      category: { fr: "La Grande Idée", en: "The Big Idea" },
      question: {
        fr: "Selon « La Grande Idée » de la Semaine 1, que signifie concrètement l'expression « naître de nouveau » ?",
        en: "According to 'The Big Idea' of Week 1, what does 'being born again' actually mean?",
      },
      options: [
        {
          id: "opt-2",
          text: {
            fr: "Changer de prénom et déménager dans une autre ville",
            en: "Changing one's first name and moving to another town",
          },
          isCorrect: false,
        },
        {
          id: "opt-1",
          text: {
            fr: "Notre esprit, qui était mort aux choses de Dieu, revient à la vie et recommence une relation avec Lui",
            en: "Our human spirit, once dead to the things of God, comes back to life and starts a new relationship with Him",
          },
          isCorrect: true,
        },
        {
          id: "opt-3",
          text: {
            fr: "Rentrer physiquement une seconde fois dans le ventre maternel",
            en: "Physically re-entering the mother's womb a second time",
          },
          isCorrect: false,
        },
        {
          id: "opt-4",
          text: {
            fr: "Oublier complètement tout son passé et ses amis",
            en: "Completely erasing memory of one's past and friends",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Notre esprit revient à la vie pour une relation vivante avec Dieu",
        en: "Our spirit comes alive to enjoy dynamic relationship with God",
      },
      explanation: {
        fr: "La Grande Idée résume : 'Une nouvelle nature spirituelle peut seulement être trouvée en Jésus. Naître de nouveau signifie que notre Esprit, qui était mort aux choses de Dieu, revient à la vie… et nous recommençons une relation avec Dieu !'",
        en: "The Big Idea states: 'A new spiritual nature can only be found in Jesus. Being born again means our Spirit, dead to the things of God, revives to relationship with Him!'",
      },
      associatedVerseRef: "Jean 3:3",
    },

    // 24. QCM : Le moment où Christ est mort pour nous (Romains 5:8)
    {
      id: "q-24-mcq-rom-5-8-timing",
      type: "mcq",
      category: { fr: "La Grâce de Dieu", en: "God's Grace" },
      question: {
        fr: "Dans Romains 5:8, à quel moment précis l'amour de Dieu s'est-il manifesté par le sacrifice du Christ ?",
        en: "In Romans 5:8, when specifically was God's love demonstrated by Christ's sacrifice?",
      },
      options: [
        { id: "opt-3", text: { fr: "Quand nous avons promis de ne plus nous rebeller", en: "Once we signed a vow of full obedience" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Après que nous ayons corrigé toutes nos fautes", en: "After we corrected all of our moral faults" }, isCorrect: false },
        { id: "opt-1", text: { fr: "Lorsque nous étions encore des pécheurs", en: "While we were still sinners" }, isCorrect: true },
        { id: "opt-4", text: { fr: "Uniquement pour les chefs religieux de l'époque", en: "Strictly for the temple religious leadership" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Lorsque nous étions encore des pécheurs",
        en: "While we were still sinners",
      },
      explanation: {
        fr: "Dieu ne nous a pas aimés parce que nous étions justes, mais Il a prouvé Son amour alors que nous étions encore perdus et pécheurs.",
        en: "God did not bestow His love because we proved worthy; He proved it by dying for us when we were still helpless and sinful.",
      },
      associatedVerseRef: "Romains 5:8",
    },

    // 25. QCM : Le rôle de Jésus comme Avocat (1 Jean 2:1)
    {
      id: "q-25-mcq-advocate-1john",
      type: "mcq",
      category: { fr: "Sécurité du Croyant", en: "Believer's Security" },
      question: {
        fr: "Selon 1 Jean 2:1, quel est le titre donné à Jésus si un croyant vient à commettre une faute ?",
        en: "According to 1 John 2:1, what title is given to Jesus if a believer happens to sin?",
      },
      options: [
        { id: "opt-1", text: { fr: "Un juge sévère et inflexible", en: "A severe and inflexible judge" }, isCorrect: false },
        { id: "opt-2", text: { fr: "Un avocat / défenseur auprès du Père", en: "An advocate / defense counselor with the Father" }, isCorrect: true },
        { id: "opt-3", text: { fr: "Un témoin à charge contre nous", en: "A prosecuting witness against us" }, isCorrect: false },
        { id: "opt-4", text: { fr: "Un spectateur neutre", en: "A detached bystander" }, isCorrect: false },
      ],
      correctAnswerSummary: {
        fr: "Un avocat / défenseur auprès du Père",
        en: "An advocate with the Father",
      },
      explanation: {
        fr: "L'apôtre Jean rassure : 'Si quelqu'un a péché, nous avons un avocat auprès du Père, Jésus-Christ le juste.' Il plaide avec Sa propre justice en notre faveur.",
        en: "John comforts believers: 'If anybody does sin, we have an advocate with the Father—Jesus Christ, the Righteous One.' He intercedes on the merit of His cross.",
      },
      associatedVerseRef: "1 Jean 2:1",
    },
  ],
  discussionCards: [
    {
      id: "w01-disc-01",
      weekNumber: 1,
      questionNumber: 1,
      theme: { fr: "Conséquences universelles du péché", en: "Universal Consequences of Sin" },
      question: {
        fr: "Quelles sont les conséquences universelles du péché pour toute l'humanité ?",
        en: "What are the universal consequences of sin for all mankind?",
      },
      answer: {
        fr: "1. La séparation d'avec Dieu : Le péché rompt la communion intime avec notre Créateur (Ésaïe 59:2).\n2. La mort : La mort physique et la mort spirituelle sont entrées dans le monde (Romains 5:12, Romains 6:23).\n3. La nature pécheresse : L'être humain est né avec un cœur captif du péché et incapable de se sauver par ses propres forces.\n4. Un monde déchu : La création entière souffre sous le poids et les conséquences du péché (Romains 8:19-21).",
        en: "1. Separation from God: Sin destroys our intimate relationship and fellowship with God (Isaiah 59:2).\n2. Death: Both spiritual alienation and physical mortality entered creation (Romans 5:12, Romans 6:23).\n3. Sinful nature: Every human being is born with a heart inclined away from God, unable to self-redeem.\n4. A broken world: Creation itself groans under the pain and decay brought by sin (Romans 8:19-21).",
      },
      scriptureRefs: {
        fr: ["Ésaïe 59:2", "Romains 5:12", "Romains 6:23", "Romains 8:19-21"],
        en: ["Isaiah 59:2", "Romans 5:12", "Romans 6:23", "Romans 8:19-21"],
      },
      practicalTakeaway: {
        fr: "Prendre conscience de la gravité du péché nous fait apprécier l'infinie grandeur du salut en Jésus.",
        en: "Recognizing the gravity of sin allows us to marvel at the infinite magnitude of grace in Jesus.",
      },
    },
    {
      id: "w01-disc-02",
      weekNumber: 1,
      questionNumber: 2,
      theme: { fr: "Degrés de péché", en: "Degrees of Sin" },
      question: {
        fr: "Y a-t-il différents degrés de péchés devant Dieu et devant les hommes ?",
        en: "Are there different degrees of sin before God and before mankind?",
      },
      answer: {
        fr: "Sur le plan terrestre et civil, certains actes ont des conséquences humaines ou pénales beaucoup plus lourdes que d'autres.\n\nCependant, devant Dieu et Sa sainteté absolue, tout péché nous rend coupable et nous sépare de Lui. Enfreindre un seul commandement revient à enfreindre toute la loi divine (Jacques 2:10-12, Romains 3:23). Tous ont péché et tous ont un besoin absolu de la même grâce salvatrice.",
        en: "On an earthly and societal level, some behaviors produce significantly more devastating human and legal fallout.\n\nYet before God's absolute holiness, any sin separates us from His presence. Breaking even one commandment makes us guilty of violating the entire divine law (James 2:10-12, Romans 3:23). All have fallen short, and all equally need the same redeeming grace.",
      },
      scriptureRefs: {
        fr: ["Jacques 2:10-12", "Romains 3:23"],
        en: ["James 2:10-12", "Romans 3:23"],
      },
      practicalTakeaway: {
        fr: "Nul ne peut se croire supérieur à un autre : nous dépendons tous de la même miséricorde.",
        en: "No one can boast over another: we all depend wholly on the same divine mercy.",
      },
    },
    {
      id: "w01-disc-03",
      weekNumber: 1,
      questionNumber: 3,
      theme: { fr: "La Croix & la Substitution", en: "The Cross & Substitution" },
      question: {
        fr: "Pourquoi a-t-il fallu que Jésus meure sur la croix ?",
        en: "Why did Jesus have to die on the cross?",
      },
      answer: {
        fr: "Parce que le salaire du péché, c'est la mort (Romains 6:23) et la parfaite justice de Dieu exigeait que cette sentence soit payée.\n\nPar amour infini, Dieu n'a pas voulu que nous soyons condamnés. Jésus, le Fils sans péché, a pris volontairement notre place comme notre substitut. Il a porté notre châtiment afin que nous recevions Son pardon, Sa justice et la vie éternelle (Ésaïe 53:4-5, 2 Corinthiens 5:21).",
        en: "Because the wages of sin is death (Romans 6:23), and God's holy justice required that the debt be paid in full.\n\nOut of boundless love, God did not leave us to condemnation. Jesus, the sinless Son, willingly stepped in as our substitute. He absorbed our judgment so that we could be clothed in His righteousness and receive everlasting life (Isaiah 53:4-5, 2 Corinthians 5:21).",
      },
      scriptureRefs: {
        fr: ["Romains 6:23", "Ésaïe 53:4-5", "2 Corinthiens 5:21"],
        en: ["Romans 6:23", "Isaiah 53:4-5", "2 Corinthians 5:21"],
      },
      practicalTakeaway: {
        fr: "À la croix, la justice parfaite et l'amour parfait de Dieu se sont embrassés.",
        en: "At the cross, God's perfect justice and His unconditional love met together.",
      },
    },
    {
      id: "w01-disc-04",
      weekNumber: 1,
      questionNumber: 4,
      theme: { fr: "Bonne personne & Justification", en: "Good Person & Justification" },
      question: {
        fr: "Peut-on être une « bonne personne » selon le monde tout en restant pécheur devant Dieu ?",
        en: "Can you be a 'good person' by the world's standards and still be a sinner before God?",
      },
      answer: {
        fr: "Oui. Selon les critères de la société, quelqu'un peut être honnête, généreux, travailleur et respectueux.\n\nMais devant la sainteté parfaite de Dieu, nos bonnes actions ne peuvent effacer nos péchés passés ni compenser notre dette morale. La Bible rappelle que personne ne sera justifié par les œuvres de la loi (Romains 3:19-20, Éphésiens 2:8-9). Le salut est un don immérité reçu par la foi seule en Christ.",
        en: "Yes. In the eyes of society, a person may live honorably, give generously, and treat neighbors kindly.\n\nHowever, before God's immaculate standard, good deeds cannot erase guilt or bridge the moral chasm of sin. Scripture confirms that no one is justified through good works (Romans 3:19-20, Ephesians 2:8-9). Salvation is an unearned gift received exclusively through faith in Christ.",
      },
      scriptureRefs: {
        fr: ["Romains 3:19-20", "Éphésiens 2:8-9", "Ésaïe 59:1-2"],
        en: ["Romans 3:19-20", "Ephesians 2:8-9", "Isaiah 59:1-2"],
      },
      practicalTakeaway: {
        fr: "Nous ne faisons pas de bonnes œuvres pour être sauvés, mais parce que nous sommes sauvés !",
        en: "We do not do good works to be saved; we do them because we have already been saved!",
      },
    },
    {
      id: "w01-disc-05",
      weekNumber: 1,
      questionNumber: 5,
      theme: { fr: "Libre arbitre & Amour véritable", en: "Free Will & Genuine Love" },
      question: {
        fr: "Pourquoi Dieu a-t-il laissé le choix à l’homme, s’Il savait d'avance qu’il pécherait ?",
        en: "Why did God grant humans free will if He already knew they would fall into sin?",
      },
      answer: {
        fr: "Parce que le véritable amour est impossible sans liberté. Des créatures programmées pour obéir automatiquement seraient des robots, incapables d'aimer authentiquement ou de vivre une communion sincère avec leur Créateur.\n\nComme dans un mariage ou une amitié profonde, l'amour a de la valeur précisément parce qu'il est librement accordé. Dieu a pris le risque de la liberté tout en préparant déjà le plan de secours de la croix avant la fondation du monde (1 Pierre 1:19-20).",
        en: "Because authentic love cannot exist without freedom of choice. Pre-programmed beings forced to obey would merely be robots, incapable of real relationship or genuine worship.\n\nIn marriage or deep friendship, affection has meaning because it is given freely. God took the risk of genuine freedom, having already planned the cross as the rescue bridge before the dawn of time (1 Peter 1:19-20).",
      },
      scriptureRefs: {
        fr: ["1 Pierre 1:19-20", "Genèse 2:16-17"],
        en: ["1 Peter 1:19-20", "Genesis 2:16-17"],
      },
      practicalTakeaway: {
        fr: "Dieu ne force jamais notre cœur : Il nous invite avec amour à choisir la Vie.",
        en: "God never forces our devotion; He lovingly invites us to choose Life.",
      },
    },
    {
      id: "w01-disc-06",
      weekNumber: 1,
      questionNumber: 6,
      theme: { fr: "La Chute d'Adam et ses répercussions", en: "The Fall of Adam and its Impact" },
      question: {
        fr: "Qu’est-il arrivé à Adam lorsqu’il a péché, et quelles en sont les répercussions pour toute l’humanité ?",
        en: "What happened to Adam when he sinned, and what were the consequences for the human race?",
      },
      answer: {
        fr: "Adam a immédiatement connu la mort spirituelle : son intimité avec Dieu a été brisée, remplacée par la honte, la culpabilité et la fuite (Genèse 3:7-10).\n\nEn tant que premier représentant de l'humanité, sa chute a infecté toute sa descendance : le péché et la mort sont entrés dans le monde et ont atteint chaque génération (Romains 5:12). La création physique elle-même a été soumise à la vanité et à la douleur (Romains 8:19-21).",
        en: "Adam instantly experienced spiritual separation: innocent intimacy with God shattered, replaced by shame, fear, and hiding (Genesis 3:7-10).\n\nAs the father of the human race, his rebellion contaminated humanity: sin and death spread to everyone (Romans 5:12). The physical cosmos itself was subjected to frustration and brokenness (Romans 8:19-21).",
      },
      scriptureRefs: {
        fr: ["Romains 5:12", "Genèse 3:7-10", "Romains 8:19-21"],
        en: ["Romans 5:12", "Genesis 3:7-10", "Romans 8:19-21"],
      },
      practicalTakeaway: {
        fr: "Si par un seul homme (Adam) la mort est entrée, par un seul homme (Jésus) la vie surabonde !",
        en: "If through one man (Adam) death reigned, through one Man (Jesus) life overflows!",
      },
    },
    {
      id: "w01-disc-07",
      weekNumber: 1,
      questionNumber: 7,
      theme: { fr: "L'unicité de Jésus pour le salut", en: "The Uniqueness of Jesus for Salvation" },
      question: {
        fr: "Puis-je être sauvé en dehors de la personne de Jésus ?",
        en: "Can anyone be saved apart from the person of Jesus?",
      },
      answer: {
        fr: "L'Écriture affirme avec clarté qu'il n'y a de salut en aucun autre nom : « Il n'y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés » (Actes 4:12).\n\nJésus a dit : « Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi » (Jean 14:6). Étant seul pleinement Dieu et pleinement homme sans péché, Il est le seul médiateur qualifié capable de réconcilier l'homme avec Dieu (1 Timothée 2:5).",
        en: "Scripture states unequivocally that salvation is found in no other name: 'Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved' (Acts 4:12).\n\nJesus stated: 'I am the way and the truth and the life. No one comes to the Father except through me' (John 14:6). Being uniquely God incarnate and sinless man, He alone bridges humanity and heaven (1 Timothy 2:5).",
      },
      scriptureRefs: {
        fr: ["Actes 4:12", "Jean 14:6", "1 Timothée 2:5"],
        en: ["Acts 4:12", "John 14:6", "1 Timothy 2:5"],
      },
      practicalTakeaway: {
        fr: "Jésus n'est pas un chemin parmi d'autres, Il est la source unique de notre espérance.",
        en: "Jesus is not one path among many; He is the living fountain of our salvation.",
      },
    },
    {
      id: "w01-disc-08",
      weekNumber: 1,
      questionNumber: 8,
      theme: { fr: "La Repentance biblique (Metanoia)", en: "Biblical Repentance (Metanoia)" },
      question: {
        fr: "Que signifie réellement le mot « se repentir » selon la Bible ?",
        en: "What does the word 'repent' truly mean according to the Bible?",
      },
      answer: {
        fr: "Le terme grec est « metanoia » (μετάνοια), qui signifie littéralement « changer de pensée et d'état d'esprit ».\n\nSe repentir n'est pas une culpabilité stérile ou un simple regret émotionnel. C'est un demi-tour volontaire et décisif : reconnaître notre péché, renoncer à mener notre vie selon nos propres désirs, et aligner notre pensée et notre cœur sur Dieu pour Le suivre avec obéissance (Actes 3:19, 2 Corinthiens 7:10).",
        en: "The Greek root is 'metanoia' (μετάνοια), which literally denotes 'a transformation of mind, perspective, and orientation'.\n\nRepentance is not paralyzing guilt or empty remorse. It is an intentional 180-degree turn: acknowledging our sin, renouncing self-rule, and turning wholeheartedly towards God to trust and obey Him (Acts 3:19, 2 Corinthians 7:10).",
      },
      scriptureRefs: {
        fr: ["Actes 3:19", "2 Corinthiens 7:10", "Romains 10:9"],
        en: ["Acts 3:19", "2 Corinthians 7:10", "Romans 10:9"],
      },
      practicalTakeaway: {
        fr: "La repentance n'est pas une punition, c'est la porte ouverte vers la liberté et le renouveau.",
        en: "Repentance is never condemnation; it is the open gateway to liberation and renewal.",
      },
    },
    {
      id: "w01-disc-09",
      weekNumber: 1,
      questionNumber: 9,
      theme: { fr: "Le Cœur du Père envers nos chutes", en: "The Father's Heart When We Stumble" },
      question: {
        fr: "Dieu est-il fâché et distant à chaque fois que je commets un péché ?",
        en: "Is God angry and distant from me every single time I commit a sin?",
      },
      answer: {
        fr: "Dieu hait le péché parce qu'il nous blesse et détruit notre vie, mais Son amour paternel envers nous reste immuable.\n\nEn tant qu'enfants rachetés, notre statut d'enfant de Dieu ne fluctue pas avec nos faiblesses. Si nous péchons, Jésus est notre Avocat auprès du Père (1 Jean 2:1). Au lieu de fuir loin de Dieu par peur, Il nous appelle à nous approcher avec assurance de Son trône de grâce pour recevoir miséricorde et pardon (Hébreux 4:16, 1 Jean 1:9).",
        en: "God hates sin because it wounds us and causes devastation, but His steadfast fatherly love never wavers.\n\nAs redeemed believers, our identity as God's sons and daughters is secure. When we stumble, Jesus stands as our defense Advocate (1 John 2:1). Rather than fleeing in terror, God invites us to run boldly into His arms of grace to receive cleansing and restorative strength (Hebrews 4:16, 1 John 1:9).",
      },
      scriptureRefs: {
        fr: ["1 Jean 2:1", "1 Jean 1:9", "Hébreux 4:16", "Romains 5:1"],
        en: ["1 John 2:1", "1 John 1:9", "Hebrews 4:16", "Romans 5:1"],
      },
      practicalTakeaway: {
        fr: "Quand tu tombes, ne fuis pas loin de Dieu : cours droit dans Ses bras de grâce !",
        en: "When you stumble, do not hide from God: run straight into His arms of grace!",
      },
    },
    {
      id: "w01-disc-10",
      weekNumber: 1,
      questionNumber: 10,
      theme: { fr: "L'Assurance inébranlable du salut", en: "Unshakable Assurance of Salvation" },
      question: {
        fr: "Comment puis-je avoir la certitude absolue d'être sauvé ?",
        en: "How can I have complete confidence and assurance that I am saved?",
      },
      answer: {
        fr: "L'assurance du salut ne dépend pas de nos émotions fluctuantes ou de notre performance religieuse, mais de la fidélité de la Parole de Dieu.\n\n« Si tu confesses de ta bouche le Seigneur Jésus et si tu crois dans ton cœur que Dieu l'a ressuscité des morts, tu seras sauvé » (Romains 10:9). De plus, le Saint-Esprit intérieur rend témoignage à notre esprit que nous sommes enfants de Dieu (Romains 8:16) et rien ne pourra nous séparer de Son amour (Romains 8:38-39).",
        en: "Assurance does not fluctuate with human feelings or subjective performance; it rests entirely on the immutable promises of God's Word.\n\n'If you declare with your mouth, \"Jesus is Lord,\" and believe in your heart that God raised him from the dead, you will be saved' (Romans 10:9). Furthermore, the Holy Spirit witnesses within our spirit that we are God's children (Romans 8:16), and nothing can sever us from His love (Romans 8:38-39).",
      },
      scriptureRefs: {
        fr: ["Romains 10:9", "Romains 8:16", "Romains 8:38-39", "1 Jean 5:13"],
        en: ["Romans 10:9", "Romans 8:16", "Romans 8:38-39", "1 John 5:13"],
      },
      practicalTakeaway: {
        fr: "Ton salut est ancré dans ce que Jésus a accompli à la croix, une fois pour toutes.",
        en: "Your salvation is anchored securely in what Jesus finished on the cross forever.",
      },
    },
  ],
};
