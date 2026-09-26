"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, LocalizedString } from "@/types/course";

export interface SettingsState {
  theme: "dark" | "light";
  soundEnabled: boolean;
  soundVolume: number;
  soundTrack: string;
  soundShuffle: boolean;
  quizPassThreshold: number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  selectedWeekId: string;
  setSelectedWeekId: (weekId: string) => void;
  t: (key: string) => string;
  localize: (obj: LocalizedString) => string;
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  toggleTheme: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}


const UI_TRANSLATIONS: Record<string, { fr: string; en: string }> = {
  appName: { fr: "Nouveau Départ", en: "New Beginnings" },
  appTagline: { fr: "HILLSONG FRANCE", en: "HILLSONG FRANCE" },
  weekLabel: { fr: "Semaine", en: "Week" },
  weekShortPrefix: { fr: "S", en: "W" },
  scriptureMemTitle: { fr: "Mémorisation & méditation des Écritures", en: "Scripture Memorization & Meditation" },
  navCourses: { fr: "Cours", en: "Lessons" },
  navDiscussion: { fr: "Discussion", en: "Discussion" },
  navCards: { fr: "Versets", en: "Verses" },
  navQuiz: { fr: "Quiz", en: "Quiz" },
  navLive: { fr: "Live", en: "Live" },
  navSettings: { fr: "Réglages", en: "Settings" },
  weekBadge: { fr: "Semaine 1", en: "Week 1" },
  bigIdeaTitle: { fr: "La Grande Idée", en: "The Big Idea" },
  prayerTargetTitle: { fr: "Sujet de Prière Cible", en: "Target Prayer Goal" },
  nextStepTitle: { fr: "Prochain Pas", en: "Next Step" },
  exploreCardsBtn: { fr: "Mémoriser les versets", en: "Memorize Verses" },
  startQuizBtn: { fr: "Lancer le Quiz Semaine 1", en: "Start Week 1 Quiz" },
  memorized: { fr: "Mémorisé", en: "Memorized" },
  toReview: { fr: "À réviser", en: "To Review" },
  flipCardInstruction: { fr: "Cliquer pour retourner", en: "Click to flip card" },
  memorizeBtn: { fr: "Marquer comme mémorisé", en: "Mark as memorized" },
  unmemorizeBtn: { fr: "Retirer des mémorisés", en: "Remove from memorized" },
  copyVerseBtn: { fr: "Copier le verset", en: "Copy verse" },
  copiedSuccess: { fr: "Verset copié !", en: "Verse copied!" },
  allCards: { fr: "Tous les versets", en: "All verses" },
  onlyKeyVerses: { fr: "Versets clés uniquement", en: "Key verses only" },
  shuffleBtn: { fr: "Mélanger", en: "Shuffle" },
  resetDeckBtn: { fr: "Réinitialiser", en: "Reset" },
  settingsTitle: { fr: "Réglages & Préférences", en: "Settings & Preferences" },
  languageSetting: { fr: "Langue de l'application", en: "App Language" },
  themeSetting: { fr: "Thème d'affichage", en: "Display Theme" },
  themeDark: { fr: "Mode Sombre", en: "Dark Mode" },
  themeLight: { fr: "Mode Clair", en: "Light Mode" },
  soundSetting: { fr: "Musique d'ambiance douce", en: "Soft Ambient Music" },
  soundMuted: { fr: "Silencieux", en: "Muted" },
  soundPlaying: { fr: "Actif", en: "Active" },
  soundVolumeLabel: { fr: "Volume sonore", en: "Volume" },
  soundShuffleLabel: { fr: "Lecture aléatoire continue", en: "Continuous Shuffle Play" },
  soundShuffleDesc: { fr: "Enchaîne automatiquement tous les hymnes à l'écoute", en: "Automatically chains all hymns seamlessly" },
  soundShuffleActive: { fr: "Aléatoire Actif", en: "Shuffle On" },
  soundShuffleInactive: { fr: "Piste Unique", en: "Single Track" },
  closeBtn: { fr: "Fermer", en: "Close" },
  quizScore: { fr: "Score", en: "Score" },
  quizQuestion: { fr: "Question", en: "Question" },
  quizNext: { fr: "Question suivante", en: "Next question" },
  quizFinish: { fr: "Terminer le Quiz", en: "Finish Quiz" },
  quizRestart: { fr: "Recommencer", en: "Try Again" },
  quizExplanation: { fr: "Explication pastorale & biblique", en: "Pastoral & Biblical Explanation" },
  congratulations: { fr: "Félicitations !", en: "Congratulations!" },
  quizResultComment: {
    fr: "Tu as validé les acquis fondamentaux de la Semaine 1 !",
    en: "You have completed the foundational milestones of Week 1!",
  },
  wordBankTitle: { fr: "Banque de mots (clique pour remplir) :", en: "Word Bank (click to fill):" },
  resetAnswer: { fr: "Effacer la réponse", en: "Clear answer" },
  validateAnswer: { fr: "Valider ma réponse", en: "Check answer" },
  navPrevious: { fr: "Précédente", en: "Previous" },
  navNextShort: { fr: "Suivante", en: "Next" },
  navRestart: { fr: "Recommencer", en: "Restart" },
  confirmRestart: { fr: "Voulez-vous réinitialiser le quiz et recommencer à la question 1 ?", en: "Do you want to reset the quiz and start over from question 1?" },
  answeredCount: { fr: "répondue(s)", en: "answered" },
  quizValidated: { fr: "Validé", en: "Completed" },
  questionNavTitle: { fr: "NAVIGATION DANS CE CHAPITRE :", en: "CHAPTER NAVIGATION:" },
  goodAnswerBadge: { fr: "Bonne réponse !", en: "Correct answer!" },
  wrongAnswerBadge: { fr: "Réponse incorrecte", en: "Incorrect answer" },
  ofQuestion: { fr: "sur", en: "of" },
  seeFinalResults: { fr: "Voir le bilan final", en: "View Final Results" },
  week1Title: { fr: "Semaine 1 : Notre besoin d'un Sauveur", en: "Week 1: Our Need for a Saviour" },
  week10Title: { fr: "Semaine 10 : L'Église, une communauté vivante", en: "Week 10: The Church, a Living Community" },
  week1Short: { fr: "Semaine 1", en: "Week 1" },
  week10Short: { fr: "Semaine 10", en: "Week 10" },
  allWeeks: { fr: "Toutes les semaines", en: "All Weeks" },
  selectWeek: { fr: "Choisir la semaine", en: "Select Week" },
  chooseCourseWeek: { fr: "Parcours Nouveau Départ", en: "New Beginnings Journey" },
  versesCountLabel: { fr: "versets bibliques", en: "bible verses" },
  questionsCountLabel: { fr: "questions interactives", en: "interactive questions" },
  filterByWeek: { fr: "Filtrer par semaine :", en: "Filter by week:" },
  quizWeekSelector: { fr: "Session du Quiz :", en: "Quiz Session:" },
  allWeeksQuiz: { fr: "Grand Quiz Combiné (Semaines 1 & 10)", en: "Combined Grand Quiz (Weeks 1 & 10)" },
  shuffleOptions: { fr: "Mélanger les choix", en: "Shuffle Choices" },
  versesTitle: { fr: "Versets bibliques", en: "Scripture Verses" },
  versesSubtitle: { fr: "Mémorisation & ancrage de la Parole", en: "Scripture Memorization & Meditation" },
  modeFocus: { fr: "Mode Focus (1 par 1)", en: "Focus Mode (1 by 1)" },
  modeGrid: { fr: "Mode Grille (Tous)", en: "Grid Mode (All)" },
  courseMenuTitle: { fr: "Programme des 10 Semaines", en: "10-Week Journey Programme" },
  openCourseMenu: { fr: "Parcours des 10 Semaines", en: "10-Week Journey" },
  weekAvailable: { fr: "Actif", en: "Active" },
  weekComingSoon: { fr: "Bientôt", en: "Coming soon" },
  verseCounter: { fr: "sur", en: "of" },
  filterSemanticAll: { fr: "Tous les thèmes", en: "All Themes" },
  filterSemanticSalvation: { fr: "Salut & Grâce", en: "Salvation & Grace" },
  filterSemanticIdentity: { fr: "Identité & Foi", en: "Identity & Faith" },
  filterSemanticChurch: { fr: "Église & Mission", en: "Church & Mission" },
  filterSemanticPrayer: { fr: "Prière & Esprit", en: "Prayer & Spirit" },
  discussionTitle: { fr: "Questions de Discussion", en: "Discussion Questions" },
  discussionSubtitle: { fr: "Échange & approfondissement pastoral", en: "Pastoral Reflection & Deep Dive" },
  discussionTag: { fr: "Discussion", en: "Discussion" },
  flipDiscussionInstruction: { fr: "Cliquer pour voir la réponse", en: "Click to reveal answer" },
  copyAnswerBtn: { fr: "Copier la réponse", en: "Copy answer" },
  copiedAnswerSuccess: { fr: "Réponse copiée !", en: "Answer copied!" },
  revealAnswerBtn: { fr: "Voir la réponse", en: "Reveal answer" },
  hideAnswerBtn: { fr: "Masquer la réponse", en: "Hide answer" },
  discussionCounter: { fr: "sur", en: "of" },
  discussionEmpty: { fr: "Aucune question de discussion trouvée.", en: "No discussion questions found." },
  practicalTakeawayLabel: { fr: "À retenir :", en: "Key Takeaway:" },
  scriptureReferencesLabel: { fr: "Références bibliques :", en: "Scripture References:" },
  allDiscussionQuestions: { fr: "Toutes les questions", en: "All Questions" },
  quizThresholdLabel: { fr: "Seuil de réussite du Quiz", en: "Quiz Passing Threshold" },
  quizThresholdDesc: { fr: "Score minimum (%) pour valider les acquis d'une semaine", en: "Minimum score (%) to validate a week's milestones" },
  quizEncouragementTitle: { fr: "Encore un effort !", en: "Keep Practicing!" },
  quizEncouragementSubtitle: { fr: "Tu y es presque, continue tes révisions !", en: "You're getting closer, keep revising!" },
  quizPassCongratulations: { fr: "Félicitations !", en: "Congratulations!" },
  quizPassValidated: { fr: "Tu as validé les acquis avec succès !", en: "You have successfully validated the milestones!" },
};


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fr");
  const [selectedWeekId, setSelectedWeekIdState] = useState<string>("week-01");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsState>({
    theme: "dark",
    soundEnabled: false,
    soundVolume: 0.3,
    soundTrack: "amazing-grace",
    soundShuffle: true,
    quizPassThreshold: 70,
  });

  // Load persisted language, week and settings on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("nd_app_lang");
      if (savedLang === "fr" || savedLang === "en") {
        setLanguageState(savedLang);
      }
      const savedWeek = localStorage.getItem("nd_selected_week");
      if (savedWeek) {
        setSelectedWeekIdState(savedWeek);
      }
      const savedSettings = localStorage.getItem("nd_app_settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setSettings((prev) => ({
            ...prev,
            theme: parsed.theme === "light" ? "light" : "dark",
            soundEnabled: Boolean(parsed.soundEnabled),
            soundVolume:
              typeof parsed.soundVolume === "number" && !isNaN(parsed.soundVolume)
                ? Math.min(Math.max(parsed.soundVolume, 0), 1)
                : 0.3,
            soundTrack:
              typeof parsed.soundTrack === "string" && parsed.soundTrack !== "hillsong"
                ? parsed.soundTrack
                : "amazing-grace",
            soundShuffle:
              parsed.soundShuffle !== undefined ? Boolean(parsed.soundShuffle) : true,
            quizPassThreshold:
              typeof parsed.quizPassThreshold === "number" && !isNaN(parsed.quizPassThreshold)
                ? Math.min(Math.max(parsed.quizPassThreshold, 10), 100)
                : 70,
          }));
        }
      }
    } catch {
      // Ignore localStorage errors in private mode
    }
  }, []);


  // Synchronize theme with HTML document class
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (settings.theme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    }
  }, [settings.theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("nd_app_lang", lang);
    } catch {
      // Ignore
    }
  };

  const setSelectedWeekId = (weekId: string) => {
    setSelectedWeekIdState(weekId);
    try {
      localStorage.setItem("nd_selected_week", weekId);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "fr" ? "en" : "fr";
    setLanguage(nextLang);
  };

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("nd_app_settings", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" });
  };

  const t = (key: string): string => {
    if (UI_TRANSLATIONS[key]) {
      return UI_TRANSLATIONS[key][language] || key;
    }
    return key;
  };

  const localize = (obj: LocalizedString): string => {
    if (!obj) return "";
    return obj[language] || obj.fr || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        selectedWeekId,
        setSelectedWeekId,
        t,
        localize,
        settings,
        updateSettings,
        toggleTheme,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );

};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
