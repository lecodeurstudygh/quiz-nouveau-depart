import { Question } from "@/types/course";
import {
  LiveSessionState,
  LivePlayer,
  LiveHostAction,
  LivePlayerAction,
  SanitizedQuestion,
  LiveAnswerDistribution,
} from "@/types/live";
import { week01, week10, allCourses } from "@/data/courses";
import { getLocalNetworkIp } from "./networkIp";

interface LiveSessionInternal {
  id: string;
  pin: string;
  lanUrl: string;
  weekId: string;
  hostToken: string;
  status: LiveSessionState["status"];
  questions: Question[];
  currentQuestionIndex: number;
  timerSeconds: number;
  questionStartedAt: number | null;
  players: Record<string, LivePlayer>;
  listeners: Set<(state: LiveSessionState) => void>;
  createdAt: number;
}

// Preserve session store across Next.js dev fast-refreshes
const globalForLive = globalThis as unknown as {
  liveSessions?: Map<string, LiveSessionInternal>;
};

const sessions: Map<string, LiveSessionInternal> =
  globalForLive.liveSessions || new Map<string, LiveSessionInternal>();

if (process.env.NODE_ENV !== "production") {
  globalForLive.liveSessions = sessions;
}

// Generate a random 6-digit PIN that is not already taken
function generateUniquePin(): string {
  let pin = "";
  let attempts = 0;
  do {
    pin = Math.floor(100000 + Math.random() * 900000).toString();
    attempts++;
  } while (sessions.has(pin) && attempts < 100);
  return pin;
}

function getCorrectOptionId(q: Question): string | undefined {
  return q.options?.find((opt) => opt.isCorrect)?.id;
}

// Helper to sanitize question and strip correct answer when in 'question' phase
function sanitizeQuestion(q: Question): SanitizedQuestion {
  return {
    id: q.id,
    type: q.type,
    text: q.question,
    options: q.options?.map((opt) => ({
      id: opt.id,
      text: opt.text,
    })),
    theologicalNote: q.explanation,
    biblicalReference: q.associatedVerseRef,
  };
}

// Calculate leaderboard sorted by score desc
function computeLeaderboard(players: Record<string, LivePlayer>) {
  return Object.values(players)
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      streak: p.streak,
      rank: index + 1,
    }));
}

// Compute distribution of answers for the current question
function computeDistribution(
  session: LiveSessionInternal,
  q: Question
): LiveAnswerDistribution {
  const dist: LiveAnswerDistribution = {};
  if (q.options) {
    q.options.forEach((opt) => {
      dist[opt.id] = 0;
    });
  }
  Object.values(session.players).forEach((p) => {
    if (p.lastSelectedOptionId && dist[p.lastSelectedOptionId] !== undefined) {
      dist[p.lastSelectedOptionId]++;
    }
  });
  return dist;
}

export function getPublicState(
  session: LiveSessionInternal,
  isHost: boolean = false
): LiveSessionState {
  const currentQ =
    session.questions[session.currentQuestionIndex] || null;

  const answersCount = Object.values(session.players).filter(
    (p) => p.answered
  ).length;

  const baseState: LiveSessionState = {
    id: session.id,
    pin: session.pin,
    lanUrl: session.lanUrl,
    weekId: session.weekId,
    status: session.status,
    hostToken: isHost ? session.hostToken : "",
    totalQuestions: session.questions.length,
    currentQuestionIndex: session.currentQuestionIndex,
    currentQuestion: currentQ ? sanitizeQuestion(currentQ) : null,
    timerSeconds: session.timerSeconds,
    questionStartedAt: session.questionStartedAt,
    players: session.players,
    playerCount: Object.keys(session.players).length,
    answersCount,
    leaderboard: computeLeaderboard(session.players),
  };

  // Only reveal the correct answer, explanation, and answer distribution during reveal/leaderboard/finished
  if (
    currentQ &&
    (session.status === "reveal" ||
      session.status === "leaderboard" ||
      session.status === "finished")
  ) {
    baseState.correctAnswerId = getCorrectOptionId(currentQ);
    baseState.explanation = currentQ.explanation;
    baseState.biblicalReference = currentQ.associatedVerseRef;
    baseState.distribution = computeDistribution(session, currentQ);
  }

  return baseState;
}

function broadcast(session: LiveSessionInternal) {
  const publicState = getPublicState(session, false);
  session.listeners.forEach((callback) => {
    try {
      callback(publicState);
    } catch (e) {
      console.error("Error in live session listener", e);
    }
  });
}

export const liveSessionStore = {
  createSession(params: {
    weekId: string;
    timerSeconds?: number;
    questionCount?: number;
  }): { session: LiveSessionState; hostToken: string; pin: string } {
    const pin = generateUniquePin();
    const id = `live-${pin}-${Date.now()}`;
    const hostToken = `host-${Math.random().toString(36).substring(2)}${Date.now()}`;

    const localIp = getLocalNetworkIp();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
    const lanUrl = appUrl || `http://${localIp}:3000`;

    // Select and filter questions
    let candidateQuestions: Question[] = [];
    if (params.weekId === "week-01") {
      candidateQuestions = [...week01.questions];
    } else if (params.weekId === "week-10") {
      candidateQuestions = [...week10.questions];
    } else {
      candidateQuestions = allCourses.flatMap((c) => c.questions);
    }

    // Keep questions with at least 2 options and a marked correct option (mcq, true_false, etymology, etc.)
    const validQuestions = candidateQuestions.filter(
      (q) => q.options && q.options.length >= 2 && q.options.some((opt) => opt.isCorrect)
    );

    // Shuffle questions order
    for (let i = validQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validQuestions[i], validQuestions[j]] = [
        validQuestions[j],
        validQuestions[i],
      ];
    }

    const questionCount = params.questionCount || Math.min(10, validQuestions.length);
    const selectedQuestions = validQuestions.slice(0, questionCount);

    const session: LiveSessionInternal = {
      id,
      pin,
      lanUrl,
      weekId: params.weekId,
      hostToken,
      status: "lobby",
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      timerSeconds: params.timerSeconds || 20,
      questionStartedAt: null,
      players: {},
      listeners: new Set(),
      createdAt: Date.now(),
    };

    sessions.set(pin, session);

    return {
      session: getPublicState(session, true),
      hostToken,
      pin,
    };
  },

  getSession(pin: string): LiveSessionInternal | undefined {
    return sessions.get(pin);
  },

  joinSession(
    pin: string,
    playerName: string,
    avatar: string
  ): { player: LivePlayer; playerId: string; state: LiveSessionState } | { error: string } {
    const session = sessions.get(pin);
    if (!session) {
      return { error: "Code PIN introuvable. Vérifiez le numéro affiché par l'enseignant." };
    }

    if (session.status === "finished") {
      return { error: "Cette session est déjà terminée." };
    }

    const playerId = `player-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const trimmedName = playerName.trim().substring(0, 20) || "Disciple";

    const player: LivePlayer = {
      id: playerId,
      name: trimmedName,
      avatar: avatar || "✨",
      score: 0,
      streak: 0,
      lastPointsEarned: 0,
      answered: false,
      lastSelectedOptionId: null,
      lastAnswerTimeMs: null,
      connected: true,
    };

    session.players[playerId] = player;
    broadcast(session);

    return {
      player,
      playerId,
      state: getPublicState(session, false),
    };
  },

  handleHostAction(
    pin: string,
    hostToken: string,
    action: LiveHostAction
  ): { success: boolean; state?: LiveSessionState; error?: string } {
    const session = sessions.get(pin);
    if (!session) return { success: false, error: "Session introuvable" };
    if (session.hostToken !== hostToken) {
      return { success: false, error: "Non autorisé" };
    }

    if (action.type === "start_quiz") {
      session.status = "question";
      session.currentQuestionIndex = 0;
      session.questionStartedAt = Date.now();
      // Reset players answers for question 1
      Object.values(session.players).forEach((p) => {
        p.answered = false;
        p.lastSelectedOptionId = null;
        p.lastAnswerTimeMs = null;
        p.lastPointsEarned = 0;
      });
    } else if (action.type === "next_question") {
      if (session.currentQuestionIndex + 1 < session.questions.length) {
        session.currentQuestionIndex += 1;
        session.status = "question";
        session.questionStartedAt = Date.now();
        // Reset player answers
        Object.values(session.players).forEach((p) => {
          p.answered = false;
          p.lastSelectedOptionId = null;
          p.lastAnswerTimeMs = null;
          p.lastPointsEarned = 0;
        });
      } else {
        session.status = "finished";
      }
    } else if (action.type === "reveal_answer") {
      session.status = "reveal";
    } else if (action.type === "show_leaderboard") {
      session.status = "leaderboard";
    } else if (action.type === "end_quiz") {
      session.status = "finished";
    } else if (action.type === "kick_player") {
      delete session.players[action.playerId];
    }

    broadcast(session);
    return { success: true, state: getPublicState(session, true) };
  },

  handlePlayerAction(
    pin: string,
    playerId: string,
    action: LivePlayerAction
  ): { success: boolean; error?: string } {
    const session = sessions.get(pin);
    if (!session) return { success: false, error: "Session introuvable" };
    if (session.status !== "question") {
      return { success: false, error: "Temps écoulé ou question fermée" };
    }

    const player = session.players[playerId];
    if (!player) return { success: false, error: "Joueur non trouvé" };
    if (player.answered) {
      return { success: false, error: "Réponse déjà enregistrée" };
    }

    const currentQ = session.questions[session.currentQuestionIndex];
    if (!currentQ) return { success: false, error: "Question invalide" };

    const now = Date.now();
    const elapsedMs = session.questionStartedAt ? now - session.questionStartedAt : 0;
    const timeLimitMs = session.timerSeconds * 1000;

    player.answered = true;
    player.lastSelectedOptionId = action.optionId;
    player.lastAnswerTimeMs = elapsedMs;

    // Check correctness using option.isCorrect
    const correctOptionId = getCorrectOptionId(currentQ);
    const isCorrect = Boolean(correctOptionId && action.optionId === correctOptionId);

    if (isCorrect) {
      // Speed bonus: max 1000 pts down to 500 pts linearly based on time taken
      const speedRatio = Math.max(0, 1 - elapsedMs / timeLimitMs);
      const points = Math.round(500 + 500 * speedRatio);
      player.streak += 1;
      // Streak bonus (+100 for each streak >= 2, max +300)
      const streakBonus = Math.min(300, Math.max(0, (player.streak - 1) * 100));
      const totalEarned = points + streakBonus;
      player.score += totalEarned;
      player.lastPointsEarned = totalEarned;
    } else {
      player.streak = 0;
      player.lastPointsEarned = 0;
    }

    broadcast(session);

    // If all players have answered, automatically trigger reveal
    const allAnswered = Object.values(session.players).every((p) => p.answered);
    if (allAnswered && Object.keys(session.players).length > 0) {
      session.status = "reveal";
      broadcast(session);
    }

    return { success: true };
  },

  subscribe(
    pin: string,
    callback: (state: LiveSessionState) => void
  ): () => void {
    const session = sessions.get(pin);
    if (!session) return () => {};

    session.listeners.add(callback);
    return () => {
      session.listeners.delete(callback);
    };
  },
};
