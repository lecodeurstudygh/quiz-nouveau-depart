import { CourseWeek } from "@/types/course";

export const week10: CourseWeek = {
  id: "week-10",
  weekNumber: 10,
  title: {
    fr: "L'Église, une communauté vivante",
    en: "The Church, a Living Community",
  },
  subtitle: {
    fr: "Ce que Jésus est venu bâtir, l'objet de Son amour",
    en: "What Jesus came to build, the object of His love",
  },
  summary: {
    fr: "Découvrir la mission glorieuse de l'Église selon le cœur de Dieu, l'étymologie biblique d'Ekklesia, les 4 dimensions de notre appel saint, les caractéristiques d'une communauté vibrante (attractive, relationnelle, en mission) et comment s'impliquer concrètement dans sa communauté locale.",
    en: "Discover the glorious mission of the Church according to God's heart, the biblical etymology of Ekklesia, the 4 dimensions of our holy calling, the hallmarks of a vibrant community (attractive, relational, missional), and how to actively get involved in your local church family.",
  },
  bigIdea: {
    fr: "L’Église est avant tout une communauté de croyants qui ensemble sont équipés et appelés afin de représenter Christ sur terre et atteindre ce monde avec la bonne nouvelle de l’Evangile. Nous n’allons pas uniquement à l’église, nous sommes l’Église !",
    en: "The Church is primarily a community of believers who are equipped and called together to represent Christ on earth and reach this world with the good news of the Gospel. We don't just go to church, we are the Church!",
  },
  targetPrayer: {
    fr: "« Jésus nous a enseigné comment prier pour que la volonté de Dieu soit faite sur la terre comme au ciel. Suivons cet exemple afin d’être ceux qui veulent manifester la présence de Dieu et la vie du Royaume. Prions que Dieu nous fortifie, nous purifie et nous remplisse pour que nous puissions être la lumière dans ce monde. »",
    en: "“Jesus taught us how to pray for God's will to be done on earth as it is in heaven. Let's follow this example so that we may be those who want to manifest the presence of God and the life of the Kingdom. Let us pray that God strengthens us, purifies us, and fills us so that we can be the light in this world.”",
  },
  nextStep: {
    fr: "Sers-tu dans ou en dehors de l'église ? Vois avec ton leader comment tu pourrais t'impliquer (rejoindre un Connect Group, servir dans une équipe) afin de grandir et faire une différence au sein de ta communauté locale.",
    en: "Do you serve in or outside the church? Talk to your leader about how you could get involved (joining a Connect Group, serving on a team) in order to grow and make a difference in your local community.",
  },
  pillars: [
    {
      badgeNumber: 1,
      title: { fr: "La Mission de l'Église", en: "The Mission of the Church" },
      description: {
        fr: "L'Église n'est pas un lieu passif mais un aimant vivant qui attire les gens vers Dieu. Jésus a promis qu'Il bâtira Son Église et que rien ne l'emportera contre elle.",
        en: "The Church is not a passive gathering but a living magnet drawing people to God. Jesus promised He builds His Church and Hades will not prevail.",
      },
      verses: "Matthieu 16:18 • Jean 17:16",
      color: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    },
    {
      badgeNumber: 2,
      title: { fr: "Appelés Hors du Monde", en: "Called Out of the World" },
      description: {
        fr: "« Ekklesia » signifie appelé hors de. Nous recevons un appel divin, un appel à la communion avec Dieu, des ténèbres à Sa lumière et dans Son nouveau Royaume.",
        en: "“Ekklesia” means called out of. We receive a divine call, into fellowship with God, out of darkness into light and into His new Kingdom.",
      },
      verses: "1 Pierre 2:9 • 1 Thess 2:12",
      color: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    },
    {
      badgeNumber: 3,
      title: { fr: "Une Communauté Vivante", en: "A Living Community" },
      description: {
        fr: "Attractive, relationnelle (l'unité célèbre la diversité) et en mission (restaurer le monde). Nous vivons cette réalité dans les Connect Groups et en servant.",
        en: "Attractive, relational (unity celebrates diversity), and on mission. We live this out through Connect Groups, serving teams and loving our city.",
      },
      verses: "Actes 2:46-47 • Romains 12:2",
      color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
  ],
  verses: [
    {
      id: "mat-16-17-18",
      reference: { fr: "Matthieu 16:17-18", en: "Matthew 16:17-18" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 16,
      verse: "17-18",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Jésus reprit la parole et lui dit: «Tu es heureux, Simon, fils de Jonas, car ce n'est pas une pensée humaine qui t'a révélé cela, mais c'est mon Père céleste. Et moi, je te dis que tu es Pierre et que sur ce rocher je construirai mon Eglise, et les portes du séjour des morts ne l'emporteront pas sur elle.»",
        en: "Jesus replied, “Blessed are you, Simon son of Jonah, for this was not revealed to you by flesh and blood, but by my Father in heaven. And I tell you that you are Peter, and on this rock I will build my church, and the gates of Hades will not overcome it.”",
      },
      theme: {
        fr: "Le fondement inébranlable et la promesse de victoire de l'Église",
        en: "The unshakeable foundation and victory promise of the Church",
      },
      context: {
        fr: "Verset clé du cours : Jésus déclare Lui-même qu'Il bâtira Son Église et que rien ne pourra la détruire.",
        en: "Key memory verse: Jesus Himself proclaims He will build His Church and nothing shall overcome it.",
      },
      isKeyVerse: true,
      bgImageIndex: 1,
    },
    {
      id: "john-17-16",
      reference: { fr: "Jean 17:16", en: "John 17:16" },
      book: { fr: "Jean", en: "John" },
      chapter: 17,
      verse: "16",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Ils ne sont pas du monde, tout comme moi, je ne suis pas du monde.",
        en: "They are not of the world, even as I am not of it.",
      },
      theme: {
        fr: "Dans le monde sans être du monde",
        en: "In the world but not of the world",
      },
      context: {
        fr: "Prière sacerdotale de Jésus affirmant la citoyenneté céleste et la sainte distinction de Ses disciples.",
        en: "Jesus' priestly prayer establishing the heavenly citizenship and distinction of His disciples.",
      },
      isKeyVerse: false,
      bgImageIndex: 2,
    },
    {
      id: "john-15-19",
      reference: { fr: "Jean 15:19", en: "John 15:19" },
      book: { fr: "Jean", en: "John" },
      chapter: 15,
      verse: "19",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Si vous étiez du monde, le monde vous aimerait car vous seriez à lui. Vous n'êtes pas du monde, mais je vous ai choisis du milieu du monde; c'est pour cela que le monde vous déteste.",
        en: "If you belonged to the world, it would love you as its own. As it is, you do not belong to the world, but I have chosen you out of the world. That is why the world hates you.",
      },
      theme: {
        fr: "Choisis et mis à part par Jésus",
        en: "Chosen and set apart by Jesus",
      },
      context: {
        fr: "Jésus explique la nature de notre séparation du système du monde : nous avons été choisis hors du monde.",
        en: "Jesus explains that being chosen out of the world explains why believers have a distinct calling and identity.",
      },
      isKeyVerse: false,
      bgImageIndex: 3,
    },
    {
      id: "1pet-5-10",
      reference: { fr: "1 Pierre 5:10", en: "1 Peter 5:10" },
      book: { fr: "1 Pierre", en: "1 Peter" },
      chapter: 5,
      verse: "10",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Le Dieu de toute grâce, qui vous a appelés en Jésus-Christ à sa gloire éternelle, après que vous aurez souffert un peu de temps, vous perfectionnera lui-même, vous affermira, vous fortifiera, vous rendra inébranlables.",
        en: "And the God of all grace, who called you to his eternal glory in Christ, after you have suffered a little while, will himself restore you and make you strong, firm and steadfast.",
      },
      theme: {
        fr: "L'appel divin et la restauration inébranlable",
        en: "The divine calling and unshakeable restoration",
      },
      context: {
        fr: "Dimension A de l'appel : un appel divin qui vient directement de Dieu Lui-même pour notre affermissement éternel.",
        en: "Dimension A of our calling: a holy calling coming straight from God Himself to establish and strengthen us.",
      },
      isKeyVerse: true,
      bgImageIndex: 4,
    },
    {
      id: "1cor-1-9",
      reference: { fr: "1 Corinthiens 1:9", en: "1 Corinthians 1:9" },
      book: { fr: "1 Corinthiens", en: "1 Corinthians" },
      chapter: 1,
      verse: "9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Dieu est fidèle, lui qui vous a appelés à vivre en communion avec son Fils, Jésus-Christ notre Seigneur.",
        en: "God is faithful, who has called you into fellowship with his Son, Jesus Christ our Lord.",
      },
      theme: {
        fr: "Appelés à la communion intime avec Christ",
        en: "Called into fellowship with Christ",
      },
      context: {
        fr: "Dimension B de l'appel : nous ne sommes pas seulement appelés à une doctrine, mais à demeurer en intimité et en communion avec Jésus.",
        en: "Dimension B of our calling: an invitation to remain and enjoy living communion with God's Son.",
      },
      isKeyVerse: true,
      bgImageIndex: 5,
    },
    {
      id: "1pet-2-9",
      reference: { fr: "1 Pierre 2:9", en: "1 Peter 2:9" },
      book: { fr: "1 Pierre", en: "1 Peter" },
      chapter: 2,
      verse: "9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Vous, au contraire, vous êtes un peuple choisi, des prêtres royaux, une nation sainte, un peuple racheté afin de proclamer les louanges de celui qui vous a appelés des ténèbres à sa merveilleuse lumière.",
        en: "But you are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.",
      },
      theme: {
        fr: "Identité royale et appel des ténèbres à Sa lumière",
        en: "Royal identity and calling out of darkness into light",
      },
      context: {
        fr: "Dimension C de l'appel : le passage glorieux de l'esclavage du péché à la liberté éclatante de la lumière divine.",
        en: "Dimension C of our calling: turning from darkness to light and proclaiming His praises as royal priests.",
      },
      isKeyVerse: true,
      bgImageIndex: 6,
    },
    {
      id: "acts-26-18",
      reference: { fr: "Actes 26:18", en: "Acts 26:18" },
      book: { fr: "Actes", en: "Acts" },
      chapter: 26,
      verse: "18",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Je t'envoie pour leur ouvrir les yeux pour qu'ils passent des ténèbres à la lumière et de la puissance de Satan à Dieu, pour qu'ils reçoivent le pardon des péchés et un héritage avec ceux qui sont sanctifiés par la foi en moi.",
        en: "I am sending you to open their eyes and turn them from darkness to light, and from the power of Satan to God, so that they may receive forgiveness of sins and a place among those who are sanctified by faith in me.",
      },
      theme: {
        fr: "La mission apostolique de délivrance et d'héritage",
        en: "The apostolic mission of deliverance and inheritance",
      },
      context: {
        fr: "Ordre de mission donné par Jésus à Paul : conduire les cœurs des ténèbres à la lumière pour recevoir l'héritage céleste.",
        en: "Jesus' commission to Paul to rescue people from Satan's dominion into God's radiant family.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
    {
      id: "1thess-2-12",
      reference: { fr: "1 Thessaloniciens 2:12", en: "1 Thessalonians 2:12" },
      book: { fr: "1 Thessaloniciens", en: "1 Thessalonians" },
      chapter: 2,
      verse: "12",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Nous vous avons encouragés, réconfortés et suppliés de marcher d'une manière digne de Dieu, qui vous appelle à son royaume et à sa gloire.",
        en: "Encouraging, comforting and urging you to live lives worthy of God, who calls you into his kingdom and glory.",
      },
      theme: {
        fr: "Marcher d'une manière digne du Royaume",
        en: "Walking worthy of the Kingdom",
      },
      context: {
        fr: "Dimension D de l'appel : nous sommes concitoyens du Royaume éternel et appelés à manifester sa gloire.",
        en: "Dimension D of our calling: entering God's Kingdom as fellow citizens and living honorably for His glory.",
      },
      isKeyVerse: true,
      bgImageIndex: 2,
    },
    {
      id: "1pet-3-9",
      reference: { fr: "1 Pierre 3:9", en: "1 Peter 3:9" },
      book: { fr: "1 Pierre", en: "1 Peter" },
      chapter: 3,
      verse: "9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Ne rendez pas le mal pour le mal, ni l'insulte pour l'insulte; bénissez au contraire. Vous le savez, c'est à cela que vous avez été appelés afin d'hériter de la bénédiction.",
        en: "Do not repay evil with evil or insult with insult. On the contrary, repay evil with blessing, because to this you were called so that you may inherit a blessing.",
      },
      theme: {
        fr: "Appelés à bénir pour hériter la bénédiction",
        en: "Called to bless in order to inherit blessing",
      },
      context: {
        fr: "L'éthique du Royaume : répondre au mal par la bénédiction, car nous sommes porteurs d'un héritage de grâce.",
        en: "Kingdom ethics: returning blessing for insult because we are destined to inherit divine blessing.",
      },
      isKeyVerse: false,
      bgImageIndex: 3,
    },
    {
      id: "eph-1-18",
      reference: { fr: "Éphésiens 1:18", en: "Ephesians 1:18" },
      book: { fr: "Éphésiens", en: "Ephesians" },
      chapter: 1,
      verse: "18",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Je prie qu'il illumine les yeux de votre cœur pour que vous sachiez quelle est l'espérance qui s'attache à son appel, quelle est la richesse de son glorieux héritage au milieu des saints.",
        en: "I pray that the eyes of your heart may be enlightened in order that you may know the hope to which he has called you, the riches of his glorious inheritance in his holy people.",
      },
      theme: {
        fr: "L'espérance de Son appel et l'héritage parmi les saints",
        en: "The hope of His calling and the riches of His inheritance",
      },
      context: {
        fr: "Prière d'illumination spirituelle pour comprendre la valeur inestimable de l'Église aux yeux de Dieu.",
        en: "Paul's prayer that our spiritual eyes open to comprehend our glorious eternal inheritance in the saints.",
      },
      isKeyVerse: false,
      bgImageIndex: 4,
    },
    {
      id: "eph-5-25-27",
      reference: { fr: "Éphésiens 5:25-27", en: "Ephesians 5:25-27" },
      book: { fr: "Éphésiens", en: "Ephesians" },
      chapter: 5,
      verse: "25-27",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Maris, aimez votre femme comme Christ a aimé l'Eglise. Il s'est donné lui-même pour elle afin de la conduire à la sainteté après l'avoir purifiée et lavée par l'eau de la parole, pour faire paraître devant lui cette Eglise glorieuse, sans tache, ni ride, ni rien de semblable, mais sainte et irréprochable.",
        en: "Husbands, love your wives, just as Christ loved the church and gave himself up for her to make her holy, cleansing her by the washing with water through the word, and to present her to himself as a radiant church, without stain or wrinkle or any other blemish, but holy and blameless.",
      },
      theme: {
        fr: "L'amour sacrificiel de Christ pour Son Église glorieuse",
        en: "Christ's sacrificial love for His radiant Church",
      },
      context: {
        fr: "L'Église est l'objet de l'amour suprême de Jésus : Il a donné Sa vie pour la rendre pure, belle et sainte.",
        en: "The Church is the supreme object of Christ's devotion; He laid down His life to purify and present her glorious.",
      },
      isKeyVerse: true,
      bgImageIndex: 5,
    },
    {
      id: "acts-2-46-47",
      reference: { fr: "Actes 2:46-47", en: "Acts 2:46-47" },
      book: { fr: "Actes", en: "Acts" },
      chapter: 2,
      verse: "46-47",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Chaque jour, avec persévérance, ils se retrouvaient d'un commun accord au temple; ils rompaient le pain dans les maisons et ils prenaient leur nourriture avec joie et simplicité de cœur. Ils louaient Dieu et avaient la faveur de tout le peuple. Le Seigneur ajoutait chaque jour à l'Eglise ceux qui étaient sauvés.",
        en: "Every day they continued to meet together in the temple courts. They broke bread in their homes and ate together with glad and sincere hearts, praising God and enjoying the favor of all the people. And the Lord added to their number daily those who were being saved.",
      },
      theme: {
        fr: "Le modèle de l'Église primitive : communion, joie et croissance",
        en: "The early church model: fellowship, gladness, and daily growth",
      },
      context: {
        fr: "L'Église attractive par excellence : unité fervente, repas partagés dans les maisons, louange et impact surnaturel.",
        en: "The picture of an attractive church: persevering in prayer, authentic community at home, and drawing the lost to salvation.",
      },
      isKeyVerse: true,
      bgImageIndex: 6,
    },
    {
      id: "acts-1-14",
      reference: { fr: "Actes 1:14", en: "Acts 1:14" },
      book: { fr: "Actes", en: "Acts" },
      chapter: 1,
      verse: "14",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Tous persévéraient d'un commun accord dans la prière avec les femmes, avec Marie la mère de Jésus et avec les frères de Jésus.",
        en: "They all joined together constantly in prayer, along with the women and Mary the mother of Jesus, and with his brothers.",
      },
      theme: {
        fr: "L'unité relationnelle dans la prière et la diversité",
        en: "Relational unity in prayer and diversity",
      },
      context: {
        fr: "La communauté vivante réunie d'un même cœur dans l'attente de la promesse du Saint-Esprit.",
        en: "The living community unified in constant prayer across diverse generations and backgrounds.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
    {
      id: "mat-28-19",
      reference: { fr: "Matthieu 28:19", en: "Matthew 28:19" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 28,
      verse: "19",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit.",
        en: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
      },
      theme: {
        fr: "La Grande Commission : une Église en mission",
        en: "The Great Commission: a church on mission",
      },
      context: {
        fr: "Le mandat universel confié à l'Église : apporter la Bonne Nouvelle et faire grandir des disciples partout sur terre.",
        en: "The ultimate mandate given to the Church: bringing the Gospel and raising disciples of all nations.",
      },
      isKeyVerse: true,
      bgImageIndex: 2,
    },
    {
      id: "mat-5-14",
      reference: { fr: "Matthieu 5:14", en: "Matthew 5:14" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 5,
      verse: "14",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée.",
        en: "You are the light of the world. A town built on a hill cannot be hidden.",
      },
      theme: {
        fr: "Lumière du monde et rayonnement du Royaume",
        en: "Light of the world and shining Kingdom witness",
      },
      context: {
        fr: "L'Église n'est pas appelée à se cacher mais à être une ville éclairée pour guider et illuminer ce monde.",
        en: "Believers are commissioned to illuminate the surrounding world through love, good works, and truth.",
      },
      isKeyVerse: true,
      bgImageIndex: 3,
    },
    {
      id: "luke-6-32",
      reference: { fr: "Luc 6:32", en: "Luke 6:32" },
      book: { fr: "Luc", en: "Luke" },
      chapter: 6,
      verse: "32",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Si vous aimez ceux qui vous aiment, quel gré vous en saura-t-on ? Les pécheurs aussi aiment ceux qui les aiment.",
        en: "If you love those who love you, what credit is that to you? Even sinners love those who love them.",
      },
      theme: {
        fr: "L'amour inconditionnel et contre-culture de Dieu",
        en: "God's unconditional, counter-cultural love",
      },
      context: {
        fr: "L'Église démontre qu'elle marche avec Dieu en aimant au-delà des affinités naturelles et en accueillant tous les cœurs.",
        en: "The church reflects the heart of the Father by loving sacrificially beyond easy social boundaries.",
      },
      isKeyVerse: false,
      bgImageIndex: 4,
    },
    {
      id: "rom-12-2",
      reference: { fr: "Romains 12:2", en: "Romans 12:2" },
      book: { fr: "Romains", en: "Romans" },
      chapter: 12,
      verse: "2",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.",
        en: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.",
      },
      theme: {
        fr: "Être contre-culture et renouvelé dans sa pensée",
        en: "Being counter-cultural and renewed in the mind",
      },
      context: {
        fr: "Verset clé : une église active qui refuse de copier les travers du monde pour devenir un agent de restauration divine.",
        en: "Key memory verse: an active church refusing worldly conformity and acting as God's restorative influence.",
      },
      isKeyVerse: true,
      bgImageIndex: 5,
    },
    {
      id: "1cor-12-27",
      reference: { fr: "1 Corinthiens 12:27", en: "1 Corinthians 12:27" },
      book: { fr: "1 Corinthiens", en: "1 Corinthians" },
      chapter: 12,
      verse: "27",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Vous êtes le corps de Christ et vous êtes ses membres, chacun pour sa part.",
        en: "Now you are the body of Christ, and each one of you is a part of it.",
      },
      theme: {
        fr: "Le Corps de Christ : interdépendance et unité",
        en: "The Body of Christ: interdependence and unity",
      },
      context: {
        fr: "Chaque croyant a une place unique et essentielle dans la communauté locale, sans exception.",
        en: "Every believer is an indispensable part of Christ's physical expression in the local church.",
      },
      isKeyVerse: false,
      bgImageIndex: 6,
    },
    {
      id: "heb-10-24-25",
      reference: { fr: "Hébreux 10:24-25", en: "Hebrews 10:24-25" },
      book: { fr: "Hébreux", en: "Hebrews" },
      chapter: 10,
      verse: "24-25",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Veillons les uns sur les autres pour nous inciter à l'amour et à de belles œuvres. N'abandonnons pas notre assemblée, comme certains en ont l'habitude, mais encourageons-nous mutuellement.",
        en: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.",
      },
      theme: {
        fr: "L'importance vitale du rassemblement et de l'encouragement",
        en: "The vital importance of gathering and mutual encouragement",
      },
      context: {
        fr: "L'Église a besoin de régularité et de proximité : on ne grandit pas seul, mais par l'encouragement réciproque.",
        en: "Christian growth happens in community through faithful gathering and active encouragement.",
      },
      isKeyVerse: false,
      bgImageIndex: 1,
    },
    {
      id: "john-13-34-35",
      reference: { fr: "Jean 13:34-35", en: "John 13:34-35" },
      book: { fr: "Jean", en: "John" },
      chapter: 13,
      verse: "34-35",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Je vous donne un commandement nouveau: Aimez-vous les uns les autres. Comme je vous ai aimés, vous aussi, aimez-vous les uns les autres. C'est à cela que tous reconnaîtront que vous êtes mes disciples: si vous avez de l'amour les uns pour les autres.",
        en: "“A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.”",
      },
      theme: {
        fr: "Le signe distinctif des disciples : l'amour fraternel",
        en: "The distinctive mark of disciples: fraternal love",
      },
      context: {
        fr: "L'amour vécu au sein de l'Église est la démonstration la plus puissante de l'Évangile aux yeux du monde.",
        en: "The genuine love shared in church community is the ultimate proof of Christ's presence to the watching world.",
      },
      isKeyVerse: true,
      bgImageIndex: 2,
    },
    {
      id: "1pet-4-10",
      reference: { fr: "1 Pierre 4:10", en: "1 Peter 4:10" },
      book: { fr: "1 Pierre", en: "1 Peter" },
      chapter: 4,
      verse: "10",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Comme de bons intendants des diverses grâces de Dieu, que chacun de vous mette au service des autres le don qu'il a reçu.",
        en: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms.",
      },
      theme: {
        fr: "Servir les autres avec les dons reçus de Dieu",
        en: "Serving others using the gifts received from God",
      },
      context: {
        fr: "S'impliquer dans une équipe : nous avons tous reçu un don pour enrichir la famille de Dieu.",
        en: "Step into serving: every believer is a steward given unique gifts to build up God's house.",
      },
      isKeyVerse: false,
      bgImageIndex: 3,
    },
    {
      id: "mat-5-3-9",
      reference: { fr: "Matthieu 5:3-9", en: "Matthew 5:3-9" },
      book: { fr: "Matthieu", en: "Matthew" },
      chapter: 5,
      verse: "3-9",
      translation: { fr: "S21", en: "NIV" },
      text: {
        fr: "Heureux ceux qui reconnaissent leur pauvreté spirituelle, car le royaume des cieux leur appartient ! ... Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !",
        en: "Blessed are the poor in spirit, for theirs is the kingdom of heaven... Blessed are the peacemakers, for they will be called children of God.",
      },
      theme: {
        fr: "Les Béatitudes : le caractère du Royaume de Dieu",
        en: "The Beatitudes: character of the Kingdom of God",
      },
      context: {
        fr: "La façon de vivre de l'Église selon le cœur de Jésus : humilité, pureté, compassion et recherche de la paix.",
        en: "The kingdom lifestyle modeled by Jesus for His followers: humility, mercy, peacemaking, and righteousness.",
      },
      isKeyVerse: false,
      bgImageIndex: 4,
    },
  ],
  questions: [
    // 1. Etymology: Ekklesia
    {
      id: "w10-q01-etymology-ekklesia",
      type: "etymology",
      category: { fr: "Étymologie", en: "Etymology" },
      question: {
        fr: "D'où vient le mot grec pour l'Église primitive (« Ekklesia ») et quelle est sa signification littérale ?",
        en: "Where does the Greek word for the early Church (“Ekklesia”) originate, and what is its literal meaning?",
      },
      options: [
        {
          id: "opt-c",
          text: {
            fr: "Composé de « hieros » (sacré) et « polis » (cité) : signifie « cité des saints »",
            en: "Composed of “hieros” (sacred) and “polis” (city): means “city of the saints”",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "Composé de « oikos » (maison) et « nomos » (loi) : signifie « gestionnaire du temple »",
            en: "Composed of “oikos” (house) and “nomos” (law): means “manager of the temple”",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Composé de « kaleo » (appelé) et « ek » (hors de) : signifie « appelé hors de »",
            en: "Composed of “kaleo” (called) and “ek” (out of): means “called out of”",
          },
          isCorrect: true,
        },
        {
          id: "opt-d",
          text: {
            fr: "Composé de « bios » (vie) et « koinos » (commun) : signifie « vie partagée »",
            en: "Composed of “bios” (life) and “koinos” (common): means “shared life”",
          },
          isCorrect: false,
        },
      ],
      etymologyData: {
        originalWord: "ἐκκλησία (Ekklesia)",
        languageOrigin: "greek",
        literalMeaning: {
          fr: "« Appelé hors de » (de ek = hors de, et kaleo = appeler)",
          en: "“Called out of” (from ek = out of, and kaleo = to call)",
        },
      },
      correctAnswerSummary: {
        fr: "« Ekklesia » est composé de « kaleo » (appelé) et « ek » (hors de), signifiant « appelé hors de ».",
        en: "“Ekklesia” is made of “kaleo” (called) and “ek” (out of), literally meaning “called out of”.",
      },
      explanation: {
        fr: "Le livret de cours précise que les croyants sont « appelés hors du monde », séparés pour Dieu mais envoyés avec amour et responsabilité pour restaurer ce monde.",
        en: "The course highlights that believers are “called out of the world”—set apart for God while sent with deep love and responsibility to reach the world.",
      },
      associatedVerseRef: "Jean 17:16",
    },

    // 2. Cloze: Matthieu 16:18
    {
      id: "w10-q02-cloze-mat-16-18",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète la déclaration fondamentale de Jésus sur Son Église dans Matthieu 16:18 (S21) :",
        en: "Complete Jesus' foundational declaration about His Church in Matthew 16:18 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Et moi, je te dis que tu es Pierre et que sur ce [blank1] je construirai mon [blank2], et les portes du séjour des [blank3] ne l'emporteront pas sur elle.",
          en: "And I tell you that you are Peter, and on this [blank1] I will build my [blank2], and the gates of [blank3] will not overcome it.",
        },
        answers: {
          blank1: { fr: "rocher", en: "rock" },
          blank2: { fr: "Eglise", en: "church" },
          blank3: { fr: "morts", en: "Hades" },
        },
        wordBank: {
          fr: ["rocher", "Eglise", "morts", "temple", "saints", "monde", "sable"],
          en: ["rock", "church", "Hades", "temple", "saints", "world", "sand"],
        },
      },
      correctAnswerSummary: {
        fr: "rocher / Eglise / morts",
        en: "rock / church / Hades",
      },
      explanation: {
        fr: "Jésus promet solennellement qu'Il est l'artisan qui bâtit Son Église sur la révélation qu'Il est le Messie, et que rien ne pourra la détruire.",
        en: "Jesus gives the bedrock promise that He builds His Church on the revelation of who He is, and the gates of hell will never prevail against it.",
      },
      associatedVerseRef: "Matthieu 16:18",
    },

    // 3. True/False: Church is just a building
    {
      id: "w10-q03-tf-building-vs-people",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Selon le cours, l'Église a d'abord été pensée par Dieu pour être un bâtiment physique où les gens viennent simplement assister à des réunions.",
        en: "According to the course, the Church was primarily intended by God to be a physical building where people merely come to attend services.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — Le bâtiment du temple est le lieu sacré exclusif de rassemblement.",
            en: "True — The physical temple is the exclusive sacred gathering space.",
          },
          isCorrect: false,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — L'Église est une communauté vivante de croyants; nous n'allons pas seulement à l'église, nous SOMMES l'Église !",
            en: "False — The Church is a living community of believers; we don't just go to church, we ARE the Church!",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Faux : L'Église est une communauté vivante (« Nous sommes l'Église ! »).",
        en: "False: The Church is a living body of people (“We are the Church!”).",
      },
      explanation: {
        fr: "Dieu n'a jamais voulu que l'Église soit uniquement un lieu de rassemblement ponctuel, mais une communauté vivante, fonctionnelle et unie pour servir Dieu.",
        en: "God never meant the Church to be merely a physical meeting place, but a living, functional community united in serving God.",
      },
      associatedVerseRef: "Matthieu 16:18",
    },

    // 4. MCQ: The 4 dimensions of God's calling
    {
      id: "w10-q04-mcq-four-callings",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Quelles sont les 4 dimensions de l'appel saint que nous avons reçu de Dieu, présentées dans le livret ?",
        en: "What are the 4 dimensions of the holy calling we received from God presented in the booklet?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Un appel clérical, un appel financier, un appel politique, un appel rituel",
            en: "A clerical call, a financial call, a political call, a ritual call",
          },
          isCorrect: false,
        },
        {
          id: "opt-c",
          text: {
            fr: "Un appel à la solitude, un appel au jeûne perpétuel, un appel au silence, un appel monastique",
            en: "A call to solitude, a call to perpetual fasting, a call to silence, a monastic call",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Un appel à juger le monde, un appel à la conformité sociale, un appel au repli sur soi, un appel à la loi",
            en: "A call to judge the world, a call to social conformity, a call to retreat, a call to legalism",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Un appel divin, un appel à la communion, un appel des ténèbres à Sa lumière, un appel dans un nouveau royaume",
            en: "A divine call, a call into fellowship, a call from darkness into His light, a call into a new kingdom",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Appel divin, communion avec Dieu, ténèbres à Sa lumière, nouveau royaume céleste.",
        en: "Divine calling, fellowship with God, darkness into light, new heavenly kingdom.",
      },
      explanation: {
        fr: "Le cours structure notre identité en 4 points : A. Appel divin (1 Pierre 5:10), B. Appel à la communion (1 Cor 1:9), C. Des ténèbres à Sa lumière (1 Pierre 2:9), D. Dans un nouveau royaume (1 Thess 2:12).",
        en: "The course systematically unpacks these 4 facets: A. Divine call (1 Pet 5:10), B. Fellowship (1 Cor 1:9), C. Darkness to light (1 Pet 2:9), D. New kingdom (1 Thess 2:12).",
      },
      associatedVerseRef: "1 Pierre 2:9",
    },

    // 5. Cloze: 1 Pierre 2:9
    {
      id: "w10-q05-cloze-1pet-2-9",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète le verset célébrant notre identité royale dans 1 Pierre 2:9 (S21) :",
        en: "Complete the verse celebrating our royal identity in 1 Peter 2:9 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Vous, au contraire, vous êtes un peuple [blank1], des prêtres royaux, une nation [blank2], un peuple racheté afin de proclamer les louanges de celui qui vous a appelés des ténèbres à sa merveilleuse [blank3].",
          en: "But you are a chosen [blank1], a royal priesthood, a holy [blank2], God’s special possession, that you may declare the praises of him who called you out of darkness into his wonderful [blank3].",
        },
        answers: {
          blank1: { fr: "choisi", en: "people" },
          blank2: { fr: "sainte", en: "nation" },
          blank3: { fr: "lumière", en: "light" },
        },
        wordBank: {
          fr: ["choisi", "sainte", "lumière", "parfait", "terre", "gloire", "force"],
          en: ["people", "nation", "light", "tribe", "glory", "strength", "power"],
        },
      },
      correctAnswerSummary: {
        fr: "choisi / sainte / lumière",
        en: "people / nation / light",
      },
      explanation: {
        fr: "1 Pierre 2:9 est l'un des versets piliers de la foi : Dieu a fait de nous un sacerdoce royal pour briller et proclamer Ses hauts faits.",
        en: "1 Peter 2:9 establishes our royal priesthood: called out of spiritual darkness into His marvelous radiant light.",
      },
      associatedVerseRef: "1 Pierre 2:9",
    },

    // 6. True/False: Called out of world means not caring
    {
      id: "w10-q06-tf-called-out-world",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Être « appelé hors du monde » signifie que les chrétiens ne doivent plus être présents dans la société ni se soucier du bien-être du monde.",
        en: "Being “called out of the world” means Christians should withdraw from society and no longer care about the world’s well-being.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — Le chrétien doit se retirer totalement dans un isolement strict.",
            en: "True — Believers must completely isolate themselves from culture.",
          },
          isCorrect: false,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — Cela signifie que nous ne sommes pas « de ce monde », mais nous sommes encore plus responsables de son bien-être !",
            en: "False — It means we are not “of this world,” but we are even more responsible for its well-being!",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Faux : Nous ne sommes pas DE ce monde, mais nous sommes pleinement engagés et responsables de son bien-être.",
        en: "False: We are not OF this world, but we carry even greater responsibility for its flourishing.",
      },
      explanation: {
        fr: "Le cours insiste : « Appelés hors du monde ne signifie pas que nous ne sommes pas dans ce monde, cela signifie que nous ne sommes pas de ce monde ; tu es encore plus responsable de son bien-être ! »",
        en: "The booklet clarifies: “Called out of the world does not mean we are not in this world; it simply means we are not of this world, making us even more responsible for its restoration!”",
      },
      associatedVerseRef: "Jean 17:16",
    },

    // 7. MCQ: 3 Characteristics of the Church
    {
      id: "w10-q07-mcq-three-characteristics",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Quelles sont les trois caractéristiques majeures de l'Église que nous sommes appelés à être et à expérimenter ?",
        en: "What are the three major characteristics of the Church we are called to be and experience?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Une église silencieuse, isolée et rituelle",
            en: "A quiet church, an isolated church, and a ritualistic church",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Une église attractive, relationnelle et en mission",
            en: "An attractive church, a relational church, and a church on mission",
          },
          isCorrect: true,
        },
        {
          id: "opt-c",
          text: {
            fr: "Une église austère, fermée et politique",
            en: "An austere church, a closed church, and a political church",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Une église réservée aux élites, contemplative et passive",
            en: "An elite church, a purely contemplative church, and a passive church",
          },
          isCorrect: false,
        },
      ],

      correctAnswerSummary: {
        fr: "Attractive, relationnelle, et en mission.",
        en: "Attractive, relational, and on mission.",
      },
      explanation: {
        fr: "Le cours détaille ces 3 aspects : attractive (joyeuse, sainte et vivante), relationnelle (amitiés, diversité, Connect groups), et en mission (atteindre et secourir).",
        en: "The lesson highlights these 3 marks: attractive (vibrant, joyful, pure), relational (deep friendships, celebrating diversity), and missional (reaching people).",
      },
      associatedVerseRef: "Actes 2:46-47",
    },

    // 8. Cloze: Romains 12:2
    {
      id: "w10-q08-cloze-rom-12-2",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète le verset sur la transformation de la pensée dans Romains 12:2 (S21) :",
        en: "Complete the memory verse on mind renewal in Romans 12:2 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Ne vous conformez pas au [blank1] présent, mais soyez transformés par le renouvellement de l'[blank2], afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et [blank3].",
          en: "Do not conform to the pattern of this [blank1], but be transformed by the renewing of your [blank2]. Then you will be able to test and approve what God’s will is—his good, pleasing and [blank3] will.",
        },
        answers: {
          blank1: { fr: "siècle", en: "world" },
          blank2: { fr: "intelligence", en: "mind" },
          blank3: { fr: "parfait", en: "perfect" },
        },
        wordBank: {
          fr: ["siècle", "intelligence", "parfait", "monde", "cœur", "esprit", "glorieux"],
          en: ["world", "mind", "perfect", "age", "heart", "spirit", "glorious"],
        },
      },
      correctAnswerSummary: {
        fr: "siècle / intelligence / parfait",
        en: "world / mind / perfect",
      },
      explanation: {
        fr: "Romains 12:2 nous appelle à être « contre-culture » : ne pas nous mouler sur la société, mais laisser l'Esprit renouveler notre intelligence.",
        en: "Romans 12:2 urges believers to be counter-cultural: not conforming to worldly molds, but being transformed by renewed minds.",
      },
      associatedVerseRef: "Romains 12:2",
    },

    // 9. True/False: Unity means cloning
    {
      id: "w10-q09-tf-unity-and-diversity",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Dans le Royaume de Dieu, l'unité signifie que tout le monde doit se ressembler comme des clones pour penser et agir à l'identique.",
        en: "In the Kingdom of God, unity means everyone must be cloned to look, think, and act identically.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — L'unité exige une conformité d'apparence et de personnalité.",
            en: "True — Unity requires identical appearance and personal uniformity.",
          },
          isCorrect: false,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — L'unité selon le cœur de Dieu se trouve dans la diversité et elle célèbre la diversité !",
            en: "False — True godly unity is found in diversity and celebrates diversity!",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Faux : L'unité biblique célèbre et embrasse la diversité.",
        en: "False: Biblical unity celebrates diversity within one shared body.",
      },
      explanation: {
        fr: "Le cours rappelle : « L'unité n'est pas une espèce de clonage afin de tous nous ressembler. L'unité selon le cœur de Dieu est trouvée dans la diversité, et la vraie unité célèbre la diversité ! »",
        en: "The course states: “Unity is not a kind of cloning to make us all resemble each other. Godly unity is found in diversity, and true unity celebrates diversity!”",
      },
      associatedVerseRef: "Actes 1:14",
    },

    // 10. MCQ: The Hillsong Church Mission Statement
    {
      id: "w10-q10-mcq-mission-statement",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Quelle est la déclaration de mission de l'église formulée dans le cours ?",
        en: "What is the mission statement of the church articulated in the course?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "« Organiser des réunions hebdomadaires calmes et préserver les traditions liturgiques inchangées »",
            en: "“To organize quiet weekly gatherings and keep historical liturgical traditions unchanged”",
          },
          isCorrect: false,
        },
        {
          id: "opt-c",
          text: {
            fr: "« Se séparer de la société moderne pour vivre en communauté fermée à la campagne »",
            en: "“To isolate from modern society and live in secluded communes in the countryside”",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "« Atteindre et influencer le monde en construisant une grande église, basée sur la Bible et centrée sur Christ, en changeant les mentalités et en équipant les gens... »",
            en: "“To reach and influence the world by building a large Bible-based, Christ-centred church, changing mindsets and empowering people...”",
          },
          isCorrect: true,
        },
        {
          id: "opt-d",
          text: {
            fr: "« Créer un mouvement politique pour gouverner les lois civiles de la nation »",
            en: "“To create a political lobbying movement to govern civil legislation in the nation”",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Atteindre et influencer le monde en bâtissant une église basée sur la Bible et centrée sur Christ.",
        en: "Reach and influence the world by building a Bible-based, Christ-centred church.",
      },
      explanation: {
        fr: "La déclaration officielle vise à former des disciples qui sont des leaders et des acteurs d'impact dans toutes les sphères de leur vie quotidienne.",
        en: "The mission emphasizes empowering believers to become leaders who impact every area of their personal and professional lives.",
      },
      associatedVerseRef: "Matthieu 28:19",
    },

    // 11. Cloze: Matthieu 28:19
    {
      id: "w10-q11-cloze-mat-28-19",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète la Grande Commission confiée par Jésus dans Matthieu 28:19 (S21) :",
        en: "Complete the Great Commission commanded by Jesus in Matthew 28:19 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Allez, faites de toutes les [blank1] des disciples, les baptisant au nom du [blank2], du Fils et du [blank3].",
          en: "Therefore go and make disciples of all [blank1], baptizing them in the name of the [blank2] and of the Son and of the [blank3].",
        },
        answers: {
          blank1: { fr: "nations", en: "nations" },
          blank2: { fr: "Père", en: "Father" },
          blank3: { fr: "Saint-Esprit", en: "Holy Spirit" },
        },
        wordBank: {
          fr: ["nations", "Père", "Saint-Esprit", "villes", "rois", "temple", "monde"],
          en: ["nations", "Father", "Holy Spirit", "cities", "kings", "temple", "angels"],
        },
      },
      correctAnswerSummary: {
        fr: "nations / Père / Saint-Esprit",
        en: "nations / Father / Holy Spirit",
      },
      explanation: {
        fr: "Une église en mission est portée par cet ordre suprême de Jésus : aller vers tous les peuples, baptiser et former des disciples.",
        en: "A church on mission lives out Jesus' Great Commission: going to all nations, baptizing, and discipling.",
      },
      associatedVerseRef: "Matthieu 28:19",
    },

    // 12. MCQ: Early Church practice in Acts 2:46-47
    {
      id: "w10-q12-mcq-acts-2",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Comment s'exprimait la vie de communauté des premiers chrétiens selon Actes 2:46-47 ?",
        en: "How was community life lived out among the earliest Christians according to Acts 2:46-47?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Ils se réunissaient uniquement une fois par an lors des grandes fêtes religieuses",
            en: "They met only once a year during major religious festivals",
          },
          isCorrect: false,
        },
        {
          id: "opt-c",
          text: {
            fr: "Ils s'enfermaient dans le silence et ne partageaient jamais leurs repas",
            en: "They locked themselves in strict silence and never shared meals",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Ils déléguaient toute la vie de foi à une caste de prêtres sans s'impliquer",
            en: "They outsourced their spiritual journey to a clerical class without personal involvement",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Ils se retrouvaient au temple et dans les maisons, rompaient le pain avec joie et simplicité de cœur",
            en: "They met in temple courts and homes, broke bread together with glad and sincere hearts",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Rassemblements persévérants au temple et dans les maisons avec joie et simplicité.",
        en: "Meeting faithfully in public courts and private homes with sincere joy.",
      },
      explanation: {
        fr: "La première église combine grands rassemblements publics et petits groupes dans les maisons : c'est le modèle biblique des Connect Groups actuels !",
        en: "The early church balanced large temple gatherings with intimate home hospitality—the biblical template for modern Connect Groups!",
      },
      associatedVerseRef: "Actes 2:46-47",
    },

    // 13. True/False: Gates of Hades
    {
      id: "w10-q13-tf-gates-of-hades",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Jésus a affirmé que les portes du séjour des morts ne prévaudront jamais contre Son Église.",
        en: "Jesus declared that the gates of Hades would never prevail against His Church.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — C'est la promesse infaillible du Christ dans Matthieu 16:18.",
            en: "True — This is Christ's unfailing promise in Matthew 16:18.",
          },
          isCorrect: true,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — L'Église est vouée à disparaître sous les assauts de l'ennemi.",
            en: "False — The Church is doomed to eventually be overthrown by darkness.",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Vrai : Rien ne l'emportera sur l'Église de Jésus-Christ.",
        en: "True: The powers of death will never overcome Christ's Church.",
      },
      explanation: {
        fr: "« Les portes du séjour des morts ne l'emporteront pas sur elle » : l'Église est invincible parce que Jésus en est le bâtisseur et la tête victorieuse.",
        en: "“The gates of Hades will not overcome it”: the Church is invincible because Jesus is its triumphant builder and reigning head.",
      },
      associatedVerseRef: "Matthieu 16:18",
    },

    // 14. MCQ: Loving beyond sinners in Luke 6:32
    {
      id: "w10-q14-mcq-luke-6-32",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Que nous enseigne Jésus dans Luc 6:32 concernant la nature de l'amour chrétien ?",
        en: "What does Jesus teach us in Luke 6:32 regarding the distinctive nature of Christian love?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Il faut uniquement fréquenter les personnes qui partagent exactement nos avis",
            en: "We should only associate with people who share identical opinions",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Aimer seulement ceux qui nous aiment n'a rien d'extraordinaire ; nous sommes appelés à aimer même ceux qui ne nous aiment pas",
            en: "Loving only those who love us is nothing special; we are called to love even those who do not love us",
          },
          isCorrect: true,
        },
        {
          id: "opt-c",
          text: {
            fr: "L'amour chrétien doit dépendre des mérites et de la réciprocité d'autrui",
            en: "Christian love should be strictly conditional on reciprocal merits",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Il est impossible d'aimer au-delà de son cercle familial",
            en: "It is impossible to extend genuine love beyond biological family circles",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Aimer au-delà de la réciprocité naturelle, à l'image du Père céleste.",
        en: "Love beyond natural reciprocity, mirroring our heavenly Father.",
      },
      explanation: {
        fr: "Jésus montre que les pécheurs aiment aussi ceux qui les aiment. L'Église reflète Dieu en manifestant un amour désintéressé, accueillant et compatissant.",
        en: "Jesus demonstrates that even sinners love those who love them; the Church reveals God by extending selfless, welcoming grace to everyone.",
      },
      associatedVerseRef: "Luc 6:32",
    },

    // 15. Cloze: Éphésiens 5:25
    {
      id: "w10-q15-cloze-eph-5-25",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète le verset révélant l'amour du Christ pour l'Église dans Éphésiens 5:25 (S21) :",
        en: "Complete the verse revealing Christ's love for the Church in Ephesians 5:25 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Maris, aimez votre femme comme Christ a aimé l'[blank1]. Il s'est donné lui-même pour elle afin de la conduire à la [blank2] après l'avoir purifiée et lavée par l'eau de la [blank3]...",
          en: "Husbands, love your wives, just as Christ loved the [blank1] and gave himself up for her to make her [blank2], cleansing her by the washing with water through the [blank3]...",
        },
        answers: {
          blank1: { fr: "Eglise", en: "church" },
          blank2: { fr: "sainteté", en: "holy" },
          blank3: { fr: "parole", en: "word" },
        },
        wordBank: {
          fr: ["Eglise", "sainteté", "parole", "famille", "gloire", "force", "loi"],
          en: ["church", "holy", "word", "family", "glory", "strength", "power"],
        },
      },
      correctAnswerSummary: {
        fr: "Eglise / sainteté / parole",
        en: "church / holy / word",
      },
      explanation: {
        fr: "L'Église est l'épouse de Christ : Il a versé Son propre sang pour elle afin de la présenter sainte, sans ride et resplendissante.",
        en: "The Church is Christ's cherished bride: He sacrificed His life to present her holy, radiant, and without stain.",
      },
      associatedVerseRef: "Éphésiens 5:25-27",
    },

    // 16. MCQ: 1 Corinthians 1:9
    {
      id: "w10-q16-mcq-1cor-1-9",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "À quoi Dieu nous a-t-il appelés selon 1 Corinthiens 1:9 ?",
        en: "What has God called us into according to 1 Corinthians 1:9?",
      },
      options: [
        {
          id: "opt-c",
          text: {
            fr: "À nous comparer aux autres pour déterminer qui est le plus juste",
            en: "To compare ourselves with others to determine who is most righteous",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "À accomplir une liste de rituels religieux pour apaiser Sa colère",
            en: "To perform a checklist of religious rituals to appease His wrath",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "À vivre en communion avec Son Fils, Jésus-Christ notre Seigneur",
            en: "Into fellowship with His Son, Jesus Christ our Lord",
          },
          isCorrect: true,
        },
        {
          id: "opt-d",
          text: {
            fr: "À rester spectateurs passifs des miracles du passé",
            en: "To remain passive spectators of past miracles",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Vivre en communion quotidienne et intime avec Jésus-Christ.",
        en: "Living in intimate daily fellowship with Jesus Christ our Lord.",
      },
      explanation: {
        fr: "Dieu est fidèle : Son invitation première pour chaque croyant est d'entrer dans une relation de communion vivante avec Jésus.",
        en: "God is faithful: His highest invitation is an ongoing, vibrant communion with Jesus Christ.",
      },
      associatedVerseRef: "1 Corinthiens 1:9",
    },

    // 17. True/False: Connect Groups
    {
      id: "w10-q17-tf-connect-groups",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Selon l'enseignement de cette semaine, s'impliquer dans un Connect Group et servir dans une équipe sont des moyens clés pour bâtir des amitiés solides et transformer sa vie.",
        en: "According to this week's lesson, getting involved in a Connect Group and serving on a team are crucial keys to building lasting friendships and transforming your life.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — C'est dans ces contextes relationnels que nous vivons l'Église au quotidien et grandissons.",
            en: "True — These relational contexts allow us to experience Church life and mature in faith.",
          },
          isCorrect: true,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — Il est préférable de vivre sa foi seul sans jamais s'impliquer avec les autres.",
            en: "False — It is better to experience faith purely alone without getting connected.",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Vrai : Les Connect Groups et le service sont des piliers de croissance spirituelle.",
        en: "True: Connect Groups and serving teams foster genuine spiritual growth and friendships.",
      },
      explanation: {
        fr: "Le cours nous encourage vivement : « Trouve un Connect Group où tu pourras construire des amitiés qui font la différence, commence à servir dans une équipe et vois ta vie être transformée ! »",
        en: "The course urges every participant: “Find a Connect Group to build friendships that make a difference, start serving on a team, and see your life transformed!”",
      },
      associatedVerseRef: "Actes 2:46-47",
    },

    // 18. MCQ: Light of the world
    {
      id: "w10-q18-mcq-light-world",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Que signifie pour l'Église l'affirmation de Jésus : « Vous êtes la lumière du monde » (Matthieu 5:14) ?",
        en: "What does Jesus' statement mean for the Church: “You are the light of the world” (Matthew 5:14)?",
      },
      options: [
        {
          id: "opt-d",
          text: {
            fr: "C'est une métaphore poétique sans application pratique pour aujourd'hui",
            en: "It is purely poetic symbolism without any real-world relevance today",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "Nous devons éblouir les autres par notre supériorité morale",
            en: "We should dazzle others by demonstrating moral superiority",
          },
          isCorrect: false,
        },
        {
          id: "opt-c",
          text: {
            fr: "La lumière est réservée uniquement aux pasteurs lors des cultes",
            en: "Light is exclusively reserved for pastors while on the pulpit",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Nous sommes appelés et équipés pour vivre différemment, refléter Sa bonté et apporter l'espoir là où il y a des ténèbres",
            en: "We are called and equipped to live differently, reflect His goodness, and bring hope into dark situations",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Vivre différemment et apporter l'espoir et la restauration de Dieu dans notre société.",
        en: "Live distinctively and shine God's hope and restoration across society.",
      },
      explanation: {
        fr: "L'Église est comme une ville située sur une montagne : elle ne peut être cachée et doit faire briller l'amour et la vérité de Dieu.",
        en: "The Church is like a city on a hill: placed prominently to shine God's truth, kindness, and saving grace.",
      },
      associatedVerseRef: "Matthieu 5:14",
    },

    // 19. Discussion: "We don't just go to church, we ARE the Church"
    {
      id: "w10-q19-disc-we-are-church",
      type: "discussion_reflection",
      category: { fr: "Réflexion & Discussion", en: "Reflection & Discussion" },
      question: {
        fr: "« La Grande Idée » affirme : « Nous n'allons pas uniquement à l'église, nous sommes l'Église ! » Quelles en sont les répercussions dans notre vie ?",
        en: "“The Big Idea” affirms: “We don't just go to church, we are the Church!” What are the practical implications of this truth in our daily lives?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Cela signifie qu'il n'est plus nécessaire d'avoir des rassemblements communautaires le dimanche",
            en: "It implies that corporate Sunday gatherings are entirely unnecessary",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Je réalise que mon comportement du lundi au samedi représente Christ et que l'Église vit partout où se trouvent les croyants",
            en: "I realize my everyday conduct Monday through Saturday represents Christ, and the Church lives wherever believers are",
          },
          isCorrect: true,
        },
        {
          id: "opt-c",
          text: {
            fr: "Cela veut dire que chaque croyant peut créer sa propre doctrine indépendamment de la Bible",
            en: "It suggests each believer creates personalized doctrines apart from Scripture",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Cela ne change rien puisque la responsabilité repose uniquement sur le pasteur",
            en: "It changes nothing because responsibility falls solely upon pastors",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Être l'Église signifie incarner Jésus et Son amour tous les jours de la semaine.",
        en: "Being the Church means embodying Jesus and His love every single day of the week.",
      },
      explanation: {
        fr: "Quand nous comprenons que nous SOMMES l'Église, notre foi cesse d'être un événement d'une heure le dimanche pour devenir notre identité de chaque instant.",
        en: "Recognizing we ARE the Church shifts faith from a Sunday attendance event to a 24/7 lifestyle representing Christ.",
      },
      associatedVerseRef: "Matthieu 16:18",
    },

    // 20. MCQ: Citizen of the Kingdom in 1 Thessalonians 2:12
    {
      id: "w10-q20-mcq-citizenship",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Selon 1 Thessaloniciens 2:12, comment sommes-nous encouragés à vivre en tant que citoyens du Royaume de Dieu ?",
        en: "According to 1 Thessalonians 2:12, how are we urged to live as citizens of God's Kingdom?",
      },
      options: [
        {
          id: "opt-c",
          text: {
            fr: "À nous inquiéter de l'avenir sans faire confiance aux promesses",
            en: "To worry constantly about the future without trusting His promises",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "À accumuler des richesses matérielles pour prouver notre élection",
            en: "To stockpile worldly wealth to prove our divine election",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "À marcher d'une manière digne de Dieu, qui nous appelle à Son royaume et à Sa gloire",
            en: "To live lives worthy of God, who calls us into His kingdom and glory",
          },
          isCorrect: true,
        },
        {
          id: "opt-d",
          text: {
            fr: "À mépriser ceux qui ne connaissent pas encore l'Évangile",
            en: "To despise those who do not yet know the Gospel",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Marcher dignement pour honorer Celui qui nous a accueillis dans Son Royaume éternel.",
        en: "Live honorably to reflect the King who welcomed us into His eternal Kingdom.",
      },
      explanation: {
        fr: "Nous avons été délivrés de la domination de Satan pour devenir citoyens du Royaume de Jésus : nous jouissons de ses privilèges et marchons avec dignité.",
        en: "Delivered from the kingdom of darkness into Christ's reign, believers inherit heavenly citizenship and walk in accordance with His grace.",
      },
      associatedVerseRef: "1 Thessaloniciens 2:12",
    },

    // 21. Discussion: Counter-culture agent of change
    {
      id: "w10-q21-disc-counter-culture",
      type: "discussion_reflection",
      category: { fr: "Réflexion & Discussion", en: "Reflection & Discussion" },
      question: {
        fr: "Le cours nous invite à « être contre-culture, être un agent du changement ». Comment cela se concrétise-t-il dans notre entourage ?",
        en: "The course invites believers to “be counter-cultural, be an agent of change.” How does this take shape in everyday life?",
      },
      options: [
        {
          id: "opt-d",
          text: {
            fr: "En devenant indifférent aux souffrances des personnes démunies",
            en: "By turning a blind eye to the suffering of marginalized people",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "En se disputant sur les réseaux sociaux pour imposer ses opinions par la force",
            en: "By engaging in harsh online arguments to impose opinions through hostility",
          },
          isCorrect: false,
        },
        {
          id: "opt-c",
          text: {
            fr: "En refusant tout contact amical avec les personnes non croyantes",
            en: "By severing all friendly contact with unbelieving neighbors and colleagues",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "En apportant l'amour, l'intégrité, le pardon et l'espérance de Dieu là où règnent le cynisme, la division et l'égoïsme",
            en: "By demonstrating love, integrity, forgiveness, and hope where cynicism, division, and selfishness prevail",
          },
          isCorrect: true,
        },
      ],
      correctAnswerSummary: {
        fr: "Être un agent d'espérance, de justice et de réconciliation dans sa sphère d'influence.",
        en: "Be an agent of hope, righteousness, and reconciliation in our sphere of influence.",
      },
      explanation: {
        fr: "Être contre-culture ne consiste pas à être agressif, mais à incarner l'éthique du Royaume : servir, aimer, pardonner et restaurer un monde brisé.",
        en: "Being counter-cultural does not mean hostility; it means modeling Jesus' heart: serving, loving, restoring, and uplifting a hurting world.",
      },
      associatedVerseRef: "Romains 12:2",
    },

    // 22. True/False: The Next Step
    {
      id: "w10-q22-tf-next-step",
      type: "true_false",
      category: { fr: "Vrai ou Faux", en: "True or False" },
      question: {
        fr: "Le « Prochain Pas » de cette 10e semaine invite chaque participant à voir avec son leader comment s'impliquer (Connect Group, service) pour grandir et faire une différence.",
        en: "The “Next Step” for this 10th week encourages every participant to speak with their leader about getting involved (Connect Group, serving) to grow and make a difference.",
      },
      options: [
        {
          id: "opt-true",
          text: {
            fr: "Vrai — Le cours Nouveau Départ est un tremplin vers l'engagement actif au sein de la communauté locale.",
            en: "True — The New Beginnings course is a launching pad into active involvement in church community.",
          },
          isCorrect: true,
        },
        {
          id: "opt-false",
          text: {
            fr: "Faux — Après la semaine 10, le parcours se termine et il n'y a plus aucune action recommandée.",
            en: "False — After week 10, everything concludes with no further engagement recommended.",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Vrai : S'impliquer activement pour grandir et faire une différence.",
        en: "True: Step out and actively get involved in the local church family.",
      },
      explanation: {
        fr: "La fin du cours Nouveau Départ marque le début d'une aventure passionnante au service de Dieu et des autres au cœur de l'Église locale !",
        en: "Completing New Beginnings is the launchpad for a lifetime of serving God and flourishing in the spiritual family of the local church!",
      },
      associatedVerseRef: "1 Pierre 4:10",
    },

    // 23. MCQ: Church as a magnet
    {
      id: "w10-q23-mcq-church-magnet",
      type: "mcq",
      category: { fr: "Doctrine & Cours", en: "Doctrine & Course" },
      question: {
        fr: "Selon l'introduction du cours, à quoi l'Église devrait-elle ressembler pour attirer les cœurs vers Dieu ?",
        en: "According to the lesson introduction, what should the Church be like to draw hearts to God?",
      },
      options: [
        {
          id: "opt-b",
          text: {
            fr: "Comme un tribunal qui condamne sévèrement ceux qui ont des doutes",
            en: "Like a courtroom harshly condemning anyone with sincere doubts",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Comme un aimant qui attire les gens et leur donne un sentiment d'appartenance et un but",
            en: "Like a magnet that attracts people and gives them a sense of belonging and purpose",
          },
          isCorrect: true,
        },
        {
          id: "opt-c",
          text: {
            fr: "Comme une forteresse imprenable dont les portes sont closes",
            en: "Like an impenetrable fortress with barred gates",
          },
          isCorrect: false,
        },
        {
          id: "opt-d",
          text: {
            fr: "Comme un club privé réservé à une catégorie sociale précise",
            en: "Like an exclusive private club reserved for a narrow demographic",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Un aimant qui attire et offre appartenance et destinée en Jésus.",
        en: "A magnet that attracts and imparts belonging and purpose in Jesus.",
      },
      explanation: {
        fr: "L'Église est l'expression de Jésus, l'espoir du monde, et l'instrument que Dieu emploie pour ramener les perdus à Lui dans un foyer d'amour.",
        en: "The Church is the expression of Jesus, the hope of the world, drawing hearts into belonging and eternal purpose.",
      },
      associatedVerseRef: "Matthieu 16:18",
    },

    // 24. Discussion: How do you see the Church now?
    {
      id: "w10-q24-disc-how-you-see-church",
      type: "discussion_reflection",
      category: { fr: "Réflexion & Discussion", en: "Reflection & Discussion" },
      question: {
        fr: "La section Discussion pose la question : « Comment vois-tu l'église maintenant ? » Quelle est la vision renouvelée transmise par ce cours ?",
        en: "The Discussion section asks: “How do you see the church now?” What renewed perspective does this course impart?",
      },
      options: [
        {
          id: "opt-c",
          text: {
            fr: "Comme une organisation réservée aux personnes parfaites sans faiblesses",
            en: "As an organization reserved exclusively for flawless people without struggles",
          },
          isCorrect: false,
        },
        {
          id: "opt-b",
          text: {
            fr: "Comme une simple obligation morale du dimanche matin",
            en: "As a mere moral chore to fulfill on Sunday mornings",
          },
          isCorrect: false,
        },
        {
          id: "opt-a",
          text: {
            fr: "Non plus comme une institution rigide, mais comme une famille vivante, chaleureuse et passionnée par la mission de Jésus",
            en: "No longer as a rigid institution, but as a living family, warm and passionate about Jesus' mission",
          },
          isCorrect: true,
        },
        {
          id: "opt-d",
          text: {
            fr: "Comme un lieu sans impact direct sur le monde contemporain",
            en: "As an outdated place with no meaningful relevance to contemporary society",
          },
          isCorrect: false,
        },
      ],
      correctAnswerSummary: {
        fr: "Une famille vivante, aimante et unie pour accomplir la mission de Dieu.",
        en: "A living, loving family united to carry out God's redemptive mission.",
      },
      explanation: {
        fr: "L'Église selon le Nouveau Testament est le Corps du Christ, une communauté où chacun trouve sa place, grandit et apporte sa pierre à l'édifice.",
        en: "The New Testament Church is Christ's living Body where everyone finds a home, matures in love, and contributes their part.",
      },
      associatedVerseRef: "Éphésiens 5:27",
    },

    // 25. Cloze: Actes 2:46-47
    {
      id: "w10-q25-cloze-acts-2-46",
      type: "fill_in_the_blank",
      category: { fr: "Mémorisation", en: "Memorization" },
      question: {
        fr: "Complète le portrait rayonnant de l'Église primitive dans Actes 2:46 (S21) :",
        en: "Complete the inspiring picture of early church life in Acts 2:46 (NIV):",
      },
      fillInData: {
        template: {
          fr: "Chaque jour, avec persévérance, ils se retrouvaient d'un commun accord au [blank1]; ils rompaient le [blank2] dans les maisons et ils prenaient leur nourriture avec [blank3] et simplicité de cœur.",
          en: "Every day they continued to meet together in the [blank1] courts. They broke [blank2] in their homes and ate together with [blank3] and sincere hearts.",
        },
        answers: {
          blank1: { fr: "temple", en: "temple" },
          blank2: { fr: "pain", en: "bread" },
          blank3: { fr: "joie", en: "glad" },
        },
        wordBank: {
          fr: ["temple", "pain", "joie", "désert", "silence", "prière", "repas"],
          en: ["temple", "bread", "glad", "desert", "silence", "wine", "prayer"],
        },
      },
      correctAnswerSummary: {
        fr: "temple / pain / joie",
        en: "temple / bread / glad",
      },
      explanation: {
        fr: "La joie et la simplicité de cœur des croyants attiraient les regards et le Seigneur ajoutait chaque jour à l'Église ceux qui étaient sauvés !",
        en: "Their sincere gladness and generous fellowship caught the attention of their city, and daily people were saved and added!",
      },
      associatedVerseRef: "Actes 2:46-47",
    },
  ],
  discussionCards: [
    {
      id: "w10-disc-01",
      weekNumber: 10,
      questionNumber: 1,
      theme: { fr: "Vision biblique de l'Église", en: "Biblical Vision of the Church" },
      question: {
        fr: "Comment vois-tu l'Église maintenant à la lumière de cette leçon ?",
        en: "How do you see the Church now in light of this lesson?",
      },
      answer: {
        fr: "L'Église n'est pas un bâtiment physique inanimé, un rituel religieux rigide ou un club sélectif, mais le Corps vivant de Jésus-Christ sur terre.\n\nElle est un « aimant vivant » et une famille spirituelle unie pour louer Dieu, s'édifier mutuellement et faire rayonner la lumière du Royaume. Elle est le canal choisi par Dieu pour refléter Sa grâce et manifester Son espérance à toutes les nations (Matthieu 16:18, Jean 17:16).",
        en: "The Church is not a lifeless brick building, a stiff religious ritual, or an exclusive club, but the living Body of Jesus Christ on earth.\n\nIt operates as a 'living magnet' and an authentic spiritual family united to worship God, build one another up, and shine kingdom light into darkness. It is God's chosen agency to embody His grace and proclaim hope to all nations (Matthew 16:18, John 17:16).",
      },
      scriptureRefs: {
        fr: ["Matthieu 16:18", "Jean 17:16", "Éphésiens 1:22-23"],
        en: ["Matthew 16:18", "John 17:16", "Ephesians 1:22-23"],
      },
      practicalTakeaway: {
        fr: "Tu ne vas pas seulement à l'église : avec tes frères et sœurs, tu ES l'Église !",
        en: "You don't just attend church: together with your brothers and sisters, you ARE the Church!",
      },
    },
    {
      id: "w10-disc-02",
      weekNumber: 10,
      questionNumber: 2,
      theme: { fr: "Engagement & Accueil", en: "Involvement & Hospitality" },
      question: {
        fr: "Que peux-tu faire pour aider l’Église locale à être attractive, relationnelle et en mission ?",
        en: "What can you do to help the local church be attractive, relational, and on mission?",
      },
      answer: {
        fr: "1. Être relationnel : Rejoindre un Groupe de Connexion (Connect Group) pour nouer des amitiés solides et prier ensemble (Actes 2:46-47).\n2. Servir activement : Intégrer une équipe bénévole (accueil, louange, logistique, jeunesse) pour bénir la communauté.\n3. Pratiquer un accueil chaleureux : Aller vers les personnes seules ou nouvelles le dimanche pour qu'elles se sentent attendues et aimées.\n4. Vivre en mission au quotidien : Être sel et lumière dans son lieu de travail, ses études et son voisinage (Matthieu 5:14-16).",
        en: "1. Cultivate relationships: Commit to a Connect Group to forge genuine friendships, share life, and pray together (Acts 2:46-47).\n2. Serve on a team: Step into a volunteer team (welcome, production, kids, worship) using your specific gifts.\n3. Practice warm hospitality: Reach out to newcomers or isolated individuals on Sunday so they feel expected and cherished.\n4. Live on mission: Be salt and light in everyday environments—workplace, studies, family—inviting people into God's presence (Matthew 5:14-16).",
      },
      scriptureRefs: {
        fr: ["Actes 2:46-47", "Matthieu 5:14-16", "1 Pierre 4:10"],
        en: ["Acts 2:46-47", "Matthew 5:14-16", "1 Peter 4:10"],
      },
      practicalTakeaway: {
        fr: "Chaque sourire, chaque service et chaque parole d'encouragement rend l'Église irrésistible.",
        en: "Every smile, act of service, and word of encouragement makes the Church irresistible.",
      },
    },
    {
      id: "w10-disc-03",
      weekNumber: 10,
      questionNumber: 3,
      theme: { fr: "Sens biblique d'Ekklesia", en: "Biblical Meaning of Ekklesia" },
      question: {
        fr: "Que signifie le mot grec « Ekklesia » et que veut dire être « appelés hors du monde » ?",
        en: "What does the Greek word 'Ekklesia' mean, and what does it mean to be 'called out of the world'?",
      },
      answer: {
        fr: "« Ekklesia » provient de « ek » (hors de) et « kaleo » (appeler). L'Église est l'assemblée de ceux que Dieu a « appelés hors du monde ».\n\nCela ne signifie nullement fuir la société ou vivre en reclus. Nous demeurons DANS le monde physiquement pour être ses témoins, mais nous ne sommes plus DU monde moralement et spirituellement. Jésus nous envoie dans le monde avec Son autorité pour guérir, réconcilier et relever (Jean 17:15-18, Romains 12:2).",
        en: "'Ekklesia' combines 'ek' (out of) and 'kaleo' (to call). The Church denotes those whom God has summoned 'out of the world'.\n\nThis never means monastic retreat or isolating ourselves from society. We remain IN the world physically as living ambassadors, but we are no longer OF the world in its selfish motives and decaying patterns. Jesus dispatches us into the world to bring healing and restoration (John 17:15-18, Romans 12:2).",
      },
      scriptureRefs: {
        fr: ["Jean 17:15-18", "Romains 12:2", "1 Jean 2:15-17"],
        en: ["John 17:15-18", "Romans 12:2", "1 John 2:15-17"],
      },
      practicalTakeaway: {
        fr: "Nous sommes des ambassadeurs du Ciel en mission sur terre.",
        en: "We are heaven's ambassadors on mission on earth.",
      },
    },
    {
      id: "w10-disc-04",
      weekNumber: 10,
      questionNumber: 4,
      theme: { fr: "Les 4 dimensions de l'appel divin", en: "The 4 Dimensions of the Divine Call" },
      question: {
        fr: "Quelles sont les 4 dimensions de l’appel divin pour l’Église ?",
        en: "What are the 4 dimensions of the divine calling upon the Church?",
      },
      answer: {
        fr: "1. Un appel divin : Initié et soutenu par Dieu le Père Lui-même avec une destinée éternelle (1 Pierre 5:10).\n2. Un appel à la communion : Pour vivre une intimité quotidienne avec Son Fils Jésus-Christ (1 Corinthiens 1:9).\n3. Un appel hors des ténèbres : Pour passer de l'aveuglement spirituel à Son admirable lumière (1 Pierre 2:9, Actes 26:18).\n4. Un appel dans un Royaume nouveau : Pour vivre comme concitoyens des saints et héritiers de Sa gloire (1 Thessaloniciens 2:12, Éphésiens 1:18).",
        en: "1. A divine calling: Originated and sustained by God the Father Himself unto an eternal glory (1 Peter 5:10).\n2. A calling to fellowship: Into intimate, daily communion with His Son Jesus Christ (1 Corinthians 1:9).\n3. A calling out of darkness: Transitioning from spiritual blindness into His marvelous light (1 Peter 2:9, Acts 26:18).\n4. A calling into a new Kingdom: Living as fellow citizens of heaven and co-heirs with Christ (1 Thessalonians 2:12, Ephesians 1:18).",
      },
      scriptureRefs: {
        fr: ["1 Pierre 5:10", "1 Corinthiens 1:9", "1 Pierre 2:9", "1 Thessaloniciens 2:12"],
        en: ["1 Peter 5:10", "1 Corinthians 1:9", "1 Peter 2:9", "1 Thessalonians 2:12"],
      },
      practicalTakeaway: {
        fr: "L'appel de Dieu n'est pas un fardeau, c'est l'invitation la plus noble qui soit.",
        en: "God's call is never a burden; it is the highest honor ever conferred upon mankind.",
      },
    },
    {
      id: "w10-disc-05",
      weekNumber: 10,
      questionNumber: 5,
      theme: { fr: "Unité vs Uniformité", en: "Unity vs Uniformity" },
      question: {
        fr: "Pourquoi l’unité selon Dieu n’est-elle pas une uniformité ou un clonage ?",
        en: "Why is biblical unity not uniformity, cloning, or forced conformity?",
      },
      answer: {
        fr: "L'uniformité exige que tout le monde se ressemble, pense pareil et perde son individualité.\n\nAu contraire, Dieu chérit la diversité : Il réunit des personnes de toutes cultures, générations, sensibilités et talents. La véritable unité biblique consiste à être « d'un commun accord » (Actes 1:14) autour de la personne de Jésus, en mettant nos différences complémentaires au service d'une même vision et d'un amour fraternel sincère (1 Corinthiens 12:12-14, Éphésiens 4:3-4).",
        en: "Uniformity demands that everyone dress, speak, and act identically, extinguishing individuality.\n\nConversely, God celebrates vibrant diversity: gathering people of diverse ethnicities, generations, temperaments, and giftings. True biblical unity means having 'one heart and one accord' (Acts 1:14) around Jesus Christ, allowing our complementary differences to enrich the Body in brotherly love (1 Corinthians 12:12-14, Ephesians 4:3-4).",
      },
      scriptureRefs: {
        fr: ["Actes 1:14", "1 Corinthiens 12:12-14", "Éphésiens 4:3-4"],
        en: ["Acts 1:14", "1 Corinthians 12:12-14", "Ephesians 4:3-4"],
      },
      practicalTakeaway: {
        fr: "La beauté d'une symphonie réside dans l'harmonie d'instruments différents jouant la même partition.",
        en: "The splendor of an orchestra lies in diverse instruments playing the same melody in harmony.",
      },
    },
    {
      id: "w10-disc-06",
      weekNumber: 10,
      questionNumber: 6,
      theme: { fr: "Objectifs d'une Église en Mission", en: "Goals of a Church on Mission" },
      question: {
        fr: "Quels sont les 3 objectifs cardinaux d'une église victorieuse en mission ?",
        en: "What are the 3 cardinal goals of a victorious church on mission?",
      },
      answer: {
        fr: "1. Toucher les personnes là où elles se trouvent : Aller au-devant des gens dans leur réalité sans attendre qu'ils franchissent le seuil de l'église (Matthieu 28:19).\n2. Démontrer une façon meilleure de vivre : Manifester une contre-culture d'intégrité, d'espérance, de générosité et de pardon au cœur d'un monde désabusé (Matthieu 5:14, Luc 6:32).\n3. Restaurer un monde brisé : Apporter la réconciliation, panser les cœurs brisés et relever ceux qui souffrent par la puissance de l'Évangile (Romains 12:2).",
        en: "1. Reach people right where they are: Meet people in their everyday realities rather than waiting passively for them to walk into a building (Matthew 28:19).\n2. Model a better way to live: Embody an uplifting counter-culture of integrity, hope, generosity, and forgiveness amid cynicism (Matthew 5:14, Luke 6:32).\n3. Restore a broken world: Bring reconciliation, heal wounded hearts, and uplift the hurting through the transforming power of the Gospel (Romans 12:2).",
      },
      scriptureRefs: {
        fr: ["Matthieu 28:19", "Matthieu 5:14", "Luc 6:32", "Romains 12:2"],
        en: ["Matthew 28:19", "Matthew 5:14", "Luke 6:32", "Romans 12:2"],
      },
      practicalTakeaway: {
        fr: "L'Église n'existe pas pour elle-même : elle existe pour faire briller Christ dans le monde.",
        en: "The Church does not exist for itself: it exists to make Christ known and loved.",
      },
    },
    {
      id: "w10-disc-07",
      weekNumber: 10,
      questionNumber: 7,
      theme: { fr: "La Déclaration de Mission Hillsong", en: "The Hillsong Mission Statement" },
      question: {
        fr: "Quelle est la déclaration de mission de l'Église Hillsong ?",
        en: "What is the official mission statement of Hillsong Church?",
      },
      answer: {
        fr: "« Toucher et influencer le monde en bâtissant une église centrée sur Jésus et basée sur la Bible, qui change les mentalités et donne aux gens les moyens de conduire et d'influencer chaque sphère de la vie. »\n\nCette mission exprime la conviction que chaque croyant est appelé à exercer une influence positive dans son domaine : arts, affaires, éducation, santé, famille et engagement civique.",
        en: "'To reach and influence the world by building a large Christ-centred, Bible-based church, changing mindsets and empowering people to lead and impact in every sphere of life.'\n\nThis statement emphasizes that every believer is empowered by the Spirit to exert a redemptive impact in their sphere: arts, commerce, education, healthcare, family, and public service.",
      },
      scriptureRefs: {
        fr: ["Matthieu 28:19-20", "Actes 1:8"],
        en: ["Matthew 28:19-20", "Acts 1:8"],
      },
      practicalTakeaway: {
        fr: "Partout où Dieu t'a placé aujourd'hui, tu as été positionné pour influencer et bénir.",
        en: "Wherever God has placed you today, you are positioned to influence and bless.",
      },
    },
    {
      id: "w10-disc-08",
      weekNumber: 10,
      questionNumber: 8,
      theme: { fr: "La Promesse de Victoire de Jésus", en: "Jesus' Promise of Ultimate Victory" },
      question: {
        fr: "Pourquoi la promesse de Jésus dans Matthieu 16:17-18 garantit-elle la victoire finale de l'Église ?",
        en: "Why does Jesus' declaration in Matthew 16:17-18 guarantee the ultimate victory of the Church?",
      },
      answer: {
        fr: "Jésus a proclamé : « Je bâtirai mon Église, et les portes du séjour des morts ne prévaudront point contre elle » (Matthieu 16:18).\n\nCette promesse assure deux vérités fondamentales :\n1. Le Bâtisseur souverain : C'est Jésus Lui-même qui prend la responsabilité personnelle de bâtir Son Église.\n2. Une victoire offensive : Les « portes » sont des défenses de villes assiégées. L'Église n'est pas une forteresse apeurée qui subit le monde, mais une force victorieuse qui avance et devant laquelle les verrous des ténèbres ne peuvent résister !",
        en: "Jesus declared: 'I will build my church, and the gates of Hades will not overcome it' (Matthew 16:18).\n\nThis divine promise guarantees two foundational truths:\n1. The Sovereign Builder: Jesus Himself takes personal, unwavering responsibility for constructing His church.\n2. An advancing posture: In antiquity, 'gates' were defensive fortifications. The Church is not a beleaguered outpost waiting in fear, but an advancing army of grace against which the strongholds of hell crumble!",
      },
      scriptureRefs: {
        fr: ["Matthieu 16:17-18", "1 Jean 4:4", "Romains 8:37"],
        en: ["Matthew 16:17-18", "1 John 4:4", "Romans 8:37"],
      },
      practicalTakeaway: {
        fr: "L'histoire de l'Église ne finira pas dans la défaite : Jésus a déjà remporté la victoire ultime !",
        en: "The story of the Church never ends in defeat: Jesus has already won the ultimate victory!",
      },
    },
  ],
};
