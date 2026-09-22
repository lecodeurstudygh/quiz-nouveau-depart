export interface CourseModuleSummary {
  id: string; // e.g. "week-01", "week-10"
  weekNumber: number;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  status: "active" | "coming_soon";
  versesCount?: number;
  questionsCount?: number;
  highlightTheme?: { fr: string; en: string };
}

export const ALL_COURSES: CourseModuleSummary[] = [
  {
    id: "week-01",
    weekNumber: 1,
    title: { fr: "Notre besoin d'un Sauveur", en: "Our Need for a Saviour" },
    subtitle: { fr: "La rupture, la croix et la nouvelle naissance", en: "The fall, the cross, and new birth" },
    status: "active",
    versesCount: 28,
    questionsCount: 25,
    highlightTheme: { fr: "Le salut par grâce", en: "Salvation by grace" },
  },
  {
    id: "week-02",
    weekNumber: 2,
    title: { fr: "Qui est Dieu ?", en: "Who is God?" },
    subtitle: { fr: "Le Créateur, la Trinité et Son cœur de Père", en: "The Creator, Trinity, and the Father's heart" },
    status: "active",
    versesCount: 22,
    questionsCount: 25,
    highlightTheme: { fr: "La nature de Dieu", en: "God's nature" },
  },
  {
    id: "week-03",
    weekNumber: 3,
    title: { fr: "Mon identité en Christ", en: "My Identity in Christ" },
    subtitle: { fr: "Nouvelle créature, racheté et aimé sans condition", en: "New creation, redeemed, and unconditionally loved" },
    status: "coming_soon",
    highlightTheme: { fr: "Fils & Fille du Roi", en: "Sons & Daughters" },
  },
  {
    id: "week-04",
    weekNumber: 4,
    title: { fr: "Entendre la voix de Dieu", en: "Hearing God's Voice" },
    subtitle: { fr: "Discerner la direction divine au quotidien", en: "Discerning God's guidance in daily life" },
    status: "coming_soon",
    highlightTheme: { fr: "L'écoute spirituelle", en: "Spiritual discernment" },
  },
  {
    id: "week-05",
    weekNumber: 5,
    title: { fr: "Un amour pour la Parole", en: "A Love for God's Word" },
    subtitle: { fr: "Méditer et s'enraciner dans les Écritures", en: "Meditating and rooting in the Scriptures" },
    status: "coming_soon",
    highlightTheme: { fr: "La vérité vivante", en: "Living truth" },
  },
  {
    id: "week-06",
    weekNumber: 6,
    title: { fr: "Parler à Dieu : la prière", en: "Talking to God: Prayer" },
    subtitle: { fr: "Une conversation vivante, simple et persévérante", en: "Vibrant, constant daily fellowship" },
    status: "coming_soon",
    highlightTheme: { fr: "L'intimité avec Dieu", en: "Intimacy with God" },
  },
  {
    id: "week-07",
    weekNumber: 7,
    title: { fr: "La personne du Saint-Esprit", en: "The Holy Spirit" },
    subtitle: { fr: "Le Consolateur, Ses dons et Sa puissance", en: "The Helper, His gifts, and supernatural power" },
    status: "coming_soon",
    highlightTheme: { fr: "Rempli de l'Esprit", en: "Spirit-filled life" },
  },
  {
    id: "week-08",
    weekNumber: 8,
    title: { fr: "Une vie transformée", en: "A Transformed Life" },
    subtitle: { fr: "Le baptême, la victoire sur les habitudes", en: "Baptism, victory over old habits and renewal" },
    status: "coming_soon",
    highlightTheme: { fr: "Sanctification & Liberté", en: "Freedom & Renewal" },
  },
  {
    id: "week-09",
    weekNumber: 9,
    title: { fr: "Une mission à vivre", en: "A Mission to Live" },
    subtitle: { fr: "Témoigner avec audace et servir notre ville", en: "Sharing the Gospel boldly and loving our city" },
    status: "coming_soon",
    highlightTheme: { fr: "Lumière dans la cité", en: "City light" },
  },
  {
    id: "week-10",
    weekNumber: 10,
    title: { fr: "L'Église – Communauté vivante", en: "The Church – Living Community" },
    subtitle: { fr: "Nous ne venons pas seulement à l'église, nous SOMMES l'Église !", en: "We don't just attend church, we ARE the Church!" },
    status: "active",
    versesCount: 22,
    questionsCount: 25,
    highlightTheme: { fr: "Attractive & Mission", en: "Attractive & Missional" },
  },
];
