export type Language = 'fr' | 'en';

export interface LocalizedString {
  fr: string;
  en: string;
}

export interface LocalizedArray {
  fr: string[];
  en: string[];
}

export interface BibleVerse {
  id: string;
  reference: LocalizedString; // e.g. { fr: "Romains 6:23", en: "Romans 6:23" }
  book: LocalizedString;      // e.g. { fr: "Romains", en: "Romans" }
  chapter: number;
  verse: string;              // e.g. "23", "8-9"
  translation: {
    fr: 'S21' | 'LSG';
    en: 'NIV';
  };
  text: LocalizedString;      // Full scripture text in French S21 and English NIV
  theme: LocalizedString;     // Main topic (e.g. "Le salaire du péché & le don de Dieu")
  context?: LocalizedString;  // How it fits into the week's lesson
  isKeyVerse: boolean;        // Whether it's a primary memory verse for the week
  bgImageIndex?: number;      // Image index for visually appealing backgrounds
}

export type QuestionType =
  | 'mcq'                   // Multiple Choice Question (4 choices)
  | 'fill_in_the_blank'     // Cloze / texte à trous for verse memorization
  | 'true_false'            // Theological True or False
  | 'etymology'             // Biblical Hebrew or Greek words (hhatah, metanoia, shub)
  | 'discussion_reflection';// In-depth reflection based on the Discussion section

export interface QuestionOption {
  id: string;
  text: LocalizedString;
  isCorrect: boolean;
}

export interface FillInTheBlankData {
  template: LocalizedString; // e.g. "En effet, le salaire du péché, c'est la [blank1], mais le don gratuit de Dieu, c'est la [blank2]..."
  answers: {
    blank1: LocalizedString;
    blank2?: LocalizedString;
    blank3?: LocalizedString;
  };
  wordBank: LocalizedArray;   // Selection of choices including correct answers and distractors
}

export interface EtymologyData {
  originalWord: string;       // e.g. "חטאה (hhatah)", "μετάνοια (metanoia)", "שׁוּב (shub)"
  languageOrigin: 'hebrew' | 'greek';
  literalMeaning: LocalizedString;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: LocalizedString;  // e.g. { fr: "Étymologie", en: "Etymology" }, { fr: "Mémorisation", en: "Memorization" }
  question: LocalizedString;
  options?: QuestionOption[]; // Used for mcq, true_false, etymology
  fillInData?: FillInTheBlankData; // Used for fill_in_the_blank
  etymologyData?: EtymologyData;
  correctAnswerSummary: LocalizedString; // Short human-readable answer summary
  explanation: LocalizedString; // Pastoral explanation and Scripture grounding
  associatedVerseRef?: string;  // e.g. "Romains 6:23"
}

export interface DiscussionCard {
  id: string;
  weekNumber: number;
  questionNumber: number;
  theme: LocalizedString;
  question: LocalizedString;
  answer: LocalizedString;
  scriptureRefs?: LocalizedArray;
  practicalTakeaway?: LocalizedString;
}

export interface CourseWeek {
  id: string;                 // e.g. "week-01"
  weekNumber: number;         // 1 to 10
  title: LocalizedString;
  subtitle: LocalizedString;
  summary: LocalizedString;
  bigIdea: LocalizedString;
  targetPrayer: LocalizedString;
  nextStep: LocalizedString;
  verses: BibleVerse[];
  questions: Question[];
  discussionCards?: DiscussionCard[];
}
