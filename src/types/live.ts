import { Question, LocalizedString } from "./course";

export type LiveSessionStatus =
  | "lobby"
  | "question"
  | "reveal"
  | "leaderboard"
  | "finished";

export interface LivePlayer {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  lastPointsEarned: number;
  answered: boolean;
  lastSelectedOptionId: string | null;
  lastAnswerTimeMs: number | null; // Milliseconds taken to answer
  connected: boolean;
}

export interface LiveAnswerDistribution {
  [optionId: string]: number; // count of players who chose this option
}

export interface SanitizedQuestion {
  id: string;
  type: Question["type"];
  text: LocalizedString;
  options?: {
    id: string;
    text: LocalizedString;
  }[];
  theologicalNote?: LocalizedString;
  biblicalReference?: string;
  // Note: correctAnswerId and explanation are kept secret from players during 'question' state!
}

export interface LiveSessionState {
  id: string;
  pin: string;
  lanUrl?: string;
  weekId: string;
  status: LiveSessionStatus;
  hostToken: string;
  totalQuestions: number;
  currentQuestionIndex: number;
  currentQuestion: SanitizedQuestion | null;
  correctAnswerId?: string; // Only populated during 'reveal', 'leaderboard', 'finished'
  explanation?: LocalizedString; // Only populated during 'reveal'
  biblicalReference?: string;
  timerSeconds: number;
  questionStartedAt: number | null; // Timestamp
  players: Record<string, LivePlayer>;
  playerCount: number;
  answersCount: number;
  distribution?: LiveAnswerDistribution; // Only populated during 'reveal'
  leaderboard: {
    id: string;
    name: string;
    avatar: string;
    score: number;
    streak: number;
    rank: number;
  }[];
}

// Actions from Host
export type LiveHostAction =
  | { type: "start_quiz" }
  | { type: "next_question" }
  | { type: "reveal_answer" }
  | { type: "show_leaderboard" }
  | { type: "end_quiz" }
  | { type: "kick_player"; playerId: string };

// Actions from Player
export type LivePlayerAction = {
  type: "submit_answer";
  optionId: string;
};
