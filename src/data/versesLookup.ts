import { allCourses } from "./courses";
import { Language } from "@/types/course";

export interface VerseDetail {
  reference: string;
  translation: string;
  text: string;
  theme?: string;
  book?: string;
  chapter?: number;
  verse?: string;
}

// Additional verses cited in course discussions that might not be in the primary memory verse list
const SUPPLEMENTARY_VERSES: Record<
  string,
  {
    reference: { fr: string; en: string };
    translation: { fr: string; en: string };
    text: { fr: string; en: string };
    theme?: { fr: string; en: string };
  }
> = {
  "Ésaïe 59:1-2": {
    reference: { fr: "Ésaïe 59:1-2", en: "Isaiah 59:1-2" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Non, la main de l'Éternel n'est pas trop courte pour sauver, ni son oreille trop dure pour entendre. Mais ce sont vos fautes qui mettent une séparation entre vous et votre Dieu; ce sont vos péchés qui vous cachent sa face et l'empêchent de vous écouter.",
      en: "Surely the arm of the Lord is not too short to save, nor his ear too dull to hear. But your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear.",
    },
    theme: { fr: "Séparation causée par le péché", en: "Separation caused by sin" },
  },
  "1 Pierre 1:19-20": {
    reference: { fr: "1 Pierre 1:19-20", en: "1 Peter 1:19-20" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "mais par le sang précieux de Christ, comme d'un agneau sans défaut et sans tache; prédestiné avant la fondation du monde, il a été manifesté à la fin des temps à cause de vous.",
      en: "but with the precious blood of Christ, a lamb without blemish or defect. He was chosen before the creation of the world, but was revealed in these last times for your sake.",
    },
    theme: { fr: "Le sang précieux de Christ", en: "The precious blood of Christ" },
  },
  "Genèse 2:16-17": {
    reference: { fr: "Genèse 2:16-17", en: "Genesis 2:16-17" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "L'Éternel Dieu donna cet ordre à l'homme : Tu pourras manger les fruits de tous les arbres du jardin; mais tu ne mangeras pas de l'arbre de la connaissance du bien et du mal, car le jour où tu en mangeras, tu mourras certainement.",
      en: "And the Lord God commanded the man, 'You are free to eat from any tree in the garden; but you must not eat from the tree of the knowledge of good and evil, for when you eat from it you will certainly die.'",
    },
    theme: { fr: "L'ordre initial et le choix", en: "The original commandment & choice" },
  },
  "Genèse 3:7-10": {
    reference: { fr: "Genèse 3:7-10", en: "Genesis 3:7-10" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Les yeux de l'un et de l'autre s'ouvrirent, ils connurent qu'ils étaient nus... Ils entendirent la voix de l'Éternel Dieu qui parcourait le jardin vers le soir, et l'homme et sa femme se cachèrent loin de la face de l'Éternel Dieu parmi les arbres du jardin.",
      en: "Then the eyes of both of them were opened, and they realized they were naked... Then the man and his wife heard the sound of the Lord God as he was walking in the garden in the cool of the day, and they hid from the Lord God among the trees of the garden.",
    },
    theme: { fr: "La rupture et la peur", en: "The fall and fear" },
  },
  "Jean 14:6": {
    reference: { fr: "Jean 14:6", en: "John 14:6" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Jésus lui dit : C'est moi qui suis le chemin, la vérité et la vie. On ne vient au Père qu'en passant par moi.",
      en: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
    },
    theme: { fr: "Jésus, le seul chemin", en: "Jesus, the only way" },
  },
  "1 Timothée 2:5": {
    reference: { fr: "1 Timothée 2:5", en: "1 Timothy 2:5" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "En effet, il y a un seul Dieu et un seul médiateur entre Dieu et les hommes : un homme, Jésus-Christ.",
      en: "For there is one God and one mediator between God and mankind, the man Christ Jesus.",
    },
    theme: { fr: "Un seul médiateur", en: "One mediator" },
  },
  "Actes 3:19": {
    reference: { fr: "Actes 3:19", en: "Acts 3:19" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Repentez-vous donc et convertissez-vous, pour que vos péchés soient effacés, afin que des temps de rafraîchissement viennent de la part du Seigneur.",
      en: "Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord.",
    },
    theme: { fr: "Repentance et rafraîchissement", en: "Repentance and refreshing" },
  },
  "2 Corinthiens 7:10": {
    reference: { fr: "2 Corinthiens 7:10", en: "2 Corinthians 7:10" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "En effet, la tristesse selon Dieu produit une repentance qui mène au salut et qu'on ne regrette jamais, tandis que la tristesse du monde produit la mort.",
      en: "Godly sorrow brings repentance that leads to salvation and leaves no regret, but worldly sorrow brings death.",
    },
    theme: { fr: "La tristesse selon Dieu", en: "Godly sorrow leading to salvation" },
  },
  "1 Jean 1:9": {
    reference: { fr: "1 Jean 1:9", en: "1 John 1:9" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Si nous reconnaissons nos péchés, il est fidèle et juste pour nous les pardonner et pour nous purifier de tout mal.",
      en: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
    },
    theme: { fr: "Fidélité et pardon de Dieu", en: "God's faithfulness and forgiveness" },
  },
  "Hébreux 4:16": {
    reference: { fr: "Hébreux 4:16", en: "Hebrews 4:16" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Approchons-nous donc avec assurance du trône de la grâce, afin d'obtenir miséricorde et de trouver grâce pour être secourus dans nos besoins.",
      en: "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.",
    },
    theme: { fr: "Le trône de la grâce", en: "The throne of grace" },
  },
  "Romains 8:16": {
    reference: { fr: "Romains 8:16", en: "Romans 8:16" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "L'Esprit lui-même rend témoignage à notre esprit que nous sommes enfants de Dieu.",
      en: "The Spirit himself testifies with our spirit that we are God's children.",
    },
    theme: { fr: "Témoignage intérieur de l'Esprit", en: "The Spirit's inner testimony" },
  },
  "1 Jean 5:13": {
    reference: { fr: "1 Jean 5:13", en: "1 John 5:13" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Je vous ai écrit cela, à vous qui croyez au nom du Fils de Dieu, afin que vous sachiez que vous avez la vie éternelle.",
      en: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.",
    },
    theme: { fr: "Certitude de la vie éternelle", en: "Assurance of eternal life" },
  },
  "Éphésiens 1:22-23": {
    reference: { fr: "Éphésiens 1:22-23", en: "Ephesians 1:22-23" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Il a tout mis sous ses pieds et il l'a donné pour chef suprême à l'Église, qui est son corps, la plénitude de celui qui remplit tout en tous.",
      en: "And God placed all things under his feet and appointed him to be head over everything for the church, which is his body, the fullness of him who fills everything in every way.",
    },
    theme: { fr: "L'Église, corps du Christ", en: "The Church, Christ's body" },
  },
  "Jean 17:15-18": {
    reference: { fr: "Jean 17:15-18", en: "John 17:15-18" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Je ne te prie pas de les ôter du monde, mais de les préserver du mal. Ils ne sont pas du monde, comme moi je ne suis pas du monde. Comme tu m'as envoyé dans le monde, moi aussi je les ai envoyés dans le monde.",
      en: "My prayer is not that you take them out of the world but that you protect them from the evil one. They are not of the world, even as I am not of it. As you sent me into the world, I have sent them into the world.",
    },
    theme: { fr: "Dans le monde, mais pas du monde", en: "In the world, not of the world" },
  },
  "1 Jean 2:15-17": {
    reference: { fr: "1 Jean 2:15-17", en: "1 John 2:15-17" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "N'aimez pas le monde ni ce qui est dans le monde... Et le monde passe, et sa convoitise aussi; mais celui qui fait la volonté de Dieu demeure éternellement.",
      en: "Do not love the world or anything in the world... The world and its desires pass away, but whoever does the will of God lives forever.",
    },
    theme: { fr: "Ne pas aimer le monde déchu", en: "Do not love the fallen world" },
  },
  "1 Corinthiens 12:12-14": {
    reference: { fr: "1 Corinthiens 12:12-14", en: "1 Corinthians 12:12-14" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "En effet, tout comme le corps est un, tout en ayant beaucoup de membres, et comme tous les membres du corps, malgré leur nombre, ne forment qu'un seul corps, ainsi en est-il de Christ... Le corps n'est pas formé d'un seul membre, mais de plusieurs.",
      en: "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ... Even so the body is not made up of one part but of many.",
    },
    theme: { fr: "Unité dans la diversité", en: "Unity in diversity" },
  },
  "Éphésiens 4:3-4": {
    reference: { fr: "Éphésiens 4:3-4", en: "Ephesians 4:3-4" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "efforcez-vous de conserver l'unité de l'Esprit par le lien de la paix. Il y a un seul corps et un seul Esprit, de même que vous avez été appelés à une seule espérance.",
      en: "Make every effort to keep the unity of the Spirit through the bond of peace. There is one body and one Spirit, just as you were called to one hope when you were called.",
    },
    theme: { fr: "L'unité de l'Esprit", en: "The unity of the Spirit" },
  },
  "Actes 1:8": {
    reference: { fr: "Actes 1:8", en: "Acts 1:8" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu'aux extrémités de la terre.",
      en: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
    },
    theme: { fr: "Puissance et mission", en: "Power and mission" },
  },
  "1 Jean 4:4": {
    reference: { fr: "1 Jean 4:4", en: "1 John 4:4" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Vous, petits enfants, vous êtes de Dieu, et vous les avez vaincus, parce que celui qui est en vous est plus grand que celui qui est dans le monde.",
      en: "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.",
    },
    theme: { fr: "Plus grand que le monde", en: "Greater is He that is in you" },
  },
  "Romains 8:37": {
    reference: { fr: "Romains 8:37", en: "Romans 8:37" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.",
      en: "No, in all these things we are more than conquerors through him who loved us.",
    },
    theme: { fr: "Plus que vainqueurs", en: "More than conquerors" },
  },
  "Romains 8:1": {
    reference: { fr: "Romains 8:1", en: "Romans 8:1" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ.",
      en: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    },
    theme: { fr: "Aucune condamnation", en: "No condemnation" },
  },
  "Psaume 27:10": {
    reference: { fr: "Psaume 27:10", en: "Psalm 27:10" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Même si mon père et ma mère m'abandonnent, l'Éternel me recueillera.",
      en: "Though my father and mother forsake me, the Lord will receive me.",
    },
    theme: { fr: "L'Éternel me recueille", en: "The Lord will receive me" },
  },
  "Jacques 4:8": {
    reference: { fr: "Jacques 4:8", en: "James 4:8" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Approchez-vous de Dieu et il s'approchera de vous.",
      en: "Come near to God and he will come near to you.",
    },
    theme: { fr: "S'approcher de Dieu", en: "Draw near to God" },
  },
  "Jérémie 29:13": {
    reference: { fr: "Jérémie 29:13", en: "Jeremiah 29:13" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Vous me chercherez et vous me trouverez, si vous me cherchez de tout votre cœur.",
      en: "You will seek me and find me when you seek me with all your heart.",
    },
    theme: { fr: "Chercher de tout son cœur", en: "Seek with all your heart" },
  },
  "Éphésiens 2:4-5": {
    reference: { fr: "Éphésiens 2:4-5", en: "Ephesians 2:4-5" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Mais Dieu est riche en compassion. À cause du grand amour dont il nous a aimés, nous qui étions morts en raison de nos fautes, il nous a rendus à la vie avec Christ.",
      en: "But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions.",
    },
    theme: { fr: "Riche en compassion", en: "Rich in mercy" },
  },
  "Ézéchiel 34:11-12": {
    reference: { fr: "Ézéchiel 34:11-12", en: "Ezekiel 34:11-12" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "En effet, ainsi parle le Seigneur, l'Éternel : Voici que je m'occuperai moi-même de mes brebis, j'en prendrai soin.",
      en: "For this is what the Sovereign Lord says: I myself will search for my sheep and look after them.",
    },
    theme: { fr: "Dieu prend soin de Ses brebis", en: "God looks after His sheep" },
  },
  "1 Jean 4:18": {
    reference: { fr: "1 Jean 4:18", en: "1 John 4:18" },
    translation: { fr: "S21", en: "NIV" },
    text: {
      fr: "Il n'y a pas de peur dans l'amour, mais l'amour parfait bannit la peur, car la peur implique un châtiment.",
      en: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment.",
    },
    theme: { fr: "L'amour parfait bannit la peur", en: "Perfect love drives out fear" },
  },
};

function normalizeRef(ref: string): string {
  return ref
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findVerseByReference(
  rawRef: string,
  language: Language
): VerseDetail | null {
  if (!rawRef) return null;

  const normalizedQuery = normalizeRef(rawRef);

  // 1. Search in allCourses verses
  for (const course of allCourses) {
    for (const v of course.verses) {
      const refFR = normalizeRef(v.reference.fr);
      const refEN = normalizeRef(v.reference.en);

      if (
        refFR === normalizedQuery ||
        refEN === normalizedQuery ||
        normalizedQuery.includes(refFR) ||
        refFR.includes(normalizedQuery)
      ) {
        return {
          reference: v.reference[language] || v.reference.fr,
          translation: v.translation[language] || "S21",
          text: v.text[language] || v.text.fr,
          theme: v.theme?.[language],
          book: v.book?.[language],
          chapter: v.chapter,
          verse: v.verse,
        };
      }
    }
  }

  // 2. Search in SUPPLEMENTARY_VERSES
  for (const [key, sup] of Object.entries(SUPPLEMENTARY_VERSES)) {
    const keyNorm = normalizeRef(key);
    const frNorm = normalizeRef(sup.reference.fr);
    const enNorm = normalizeRef(sup.reference.en);

    if (
      keyNorm === normalizedQuery ||
      frNorm === normalizedQuery ||
      enNorm === normalizedQuery ||
      normalizedQuery.includes(keyNorm) ||
      keyNorm.includes(normalizedQuery)
    ) {
      return {
        reference: sup.reference[language] || sup.reference.fr,
        translation: sup.translation[language] || "S21",
        text: sup.text[language] || sup.text.fr,
        theme: sup.theme?.[language],
      };
    }
  }

  return null;
}
