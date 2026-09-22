"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLiveSession } from "@/lib/useLiveSession";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { triggerConfetti } from "@/lib/confetti";
import {
  Users,
  Play,
  ArrowRight,
  Trophy,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Flame,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  Crown,
} from "lucide-react";
import Link from "next/link";

const OPTION_STYLES = [
  {
    bg: "bg-rose-500/15 dark:bg-rose-950/40 border-rose-500/30 text-rose-800 dark:text-rose-200",
    badge: "bg-rose-500 text-white",
    symbol: "▲",
    label: "Rouge",
  },
  {
    bg: "bg-blue-500/15 dark:bg-blue-950/40 border-blue-500/30 text-blue-800 dark:text-blue-200",
    badge: "bg-blue-500 text-white",
    symbol: "◆",
    label: "Bleu",
  },
  {
    bg: "bg-amber-500/15 dark:bg-amber-950/40 border-amber-500/30 text-amber-800 dark:text-amber-200",
    badge: "bg-amber-500 text-white",
    symbol: "●",
    label: "Jaune",
  },
  {
    bg: "bg-emerald-500/15 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-800 dark:text-emerald-200",
    badge: "bg-emerald-500 text-white",
    symbol: "■",
    label: "Vert",
  },
];

export default function LiveHostPage() {
  const { language } = useLanguage();

  // Setup state
  const [weekId, setWeekId] = useState<string>("week-10");
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [questionCount, setQuestionCount] = useState<number>(8);
  const [hostToken, setHostToken] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Time remaining state for host screen
  const [secondsLeft, setSecondsLeft] = useState<number>(timerSeconds);

  // Live session hook
  const { state, sendHostAction } = useLiveSession({
    pin,
    hostToken,
    isHost: true,
  });

  // Create session
  const handleCreateSession = async () => {
    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          weekId,
          timerSeconds,
          questionCount,
        }),
      });
      const data = await res.json();
      if (data.pin && data.hostToken) {
        setPin(data.pin);
        setHostToken(data.hostToken);
      }
    } catch (err) {
      console.error("Failed to create live session", err);
    }
  };

  // Timer countdown management
  useEffect(() => {
    if (!state || state.status !== "question" || !state.questionStartedAt) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.questionStartedAt!) / 1000);
      const remaining = Math.max(0, state.timerSeconds - elapsed);
      setSecondsLeft(remaining);

      // When countdown reaches 0, trigger reveal automatically
      if (remaining === 0) {
        clearInterval(interval);
        sendHostAction({ type: "reveal_answer" });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [state?.status, state?.questionStartedAt, state?.timerSeconds, sendHostAction]);

  // Confetti on final finished state
  const confettiTriggeredRef = useRef(false);
  useEffect(() => {
    if (state?.status === "finished" && !confettiTriggeredRef.current) {
      confettiTriggeredRef.current = true;
      triggerConfetti();
      setTimeout(triggerConfetti, 1000);
    }
    if (state?.status !== "finished") {
      confettiTriggeredRef.current = false;
    }
  }, [state?.status]);

  // Show late-join QR Code modal
  const [showQrModal, setShowQrModal] = useState(false);

  // Copy shareable player link (prioritizes LAN URL or public deployment URL)
  const playerUrl = state?.lanUrl
    ? `${state.lanUrl}/live?pin=${pin || ""}`
    : typeof window !== "undefined"
    ? `${window.location.origin}/live?pin=${pin || ""}`
    : `http://localhost:3000/live?pin=${pin || ""}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(playerUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Modal QR Code & PIN pour les retardataires (accessible en direct à tout moment)
  const renderLateJoinModal = () => {
    if (!showQrModal || !state) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Rejoindre en direct
            </span>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
            <div className="text-xs text-stone-400 mb-1 font-semibold uppercase tracking-wider">
              Code PIN du Jeu
            </div>
            <div className="text-4xl font-mono font-black text-amber-400 tracking-widest">
              {state.pin.slice(0, 3)} {state.pin.slice(3)}
            </div>
          </div>

          <div className="flex justify-center py-1">
            <QRCodeDisplay url={playerUrl} size={180} />
          </div>

          <p className="text-xs text-stone-400 leading-relaxed">
            Scannez directement avec l&apos;appareil photo ou allez sur :<br />
            <span className="font-mono text-stone-200 font-bold break-all">{playerUrl}</span>
          </p>

          <button
            type="button"
            onClick={() => setShowQrModal(false)}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-sm transition-colors shadow-lg"
          >
            Fermer et continuer
          </button>
        </div>
      </div>
    );
  };

  // 1. SETUP SCREEN
  if (!pin || !state) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs uppercase tracking-widest font-bold text-red-600 dark:text-red-400">
              Session Enseignant • Live Zoom & Présentiel
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Créer une Session Live
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
            Générez un code PIN pour animer un quiz interactif synchronisé avec vos participants sur Zoom ou vidéoprojecteur.
          </p>

          <div className="space-y-6">
            {/* Week selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Chapitre / Thématique
              </label>
              <select
                value={weekId}
                onChange={(e) => setWeekId(e.target.value)}
                className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="week-10">Semaine 10 : L&apos;Église, un corps vivant</option>
                <option value="week-01">Semaine 1 : Le Péché, la Séparation et le Salut</option>
                <option value="all">Toutes les semaines combinées</option>
              </select>
            </div>

            {/* Timer selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Temps de réponse par question
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setTimerSeconds(sec)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      timerSeconds === sec
                        ? "bg-amber-500 text-stone-950 border-amber-500 shadow-md"
                        : "bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    {sec} secondes
                  </button>
                ))}
              </div>
            </div>

            {/* Question count */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Nombre de questions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 8, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      questionCount === count
                        ? "bg-amber-500 text-stone-950 border-amber-500 shadow-md"
                        : "bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    {count} questions
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleCreateSession}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5" />
              Lancer la Salle d&apos;Attente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOBBY (WAITING ROOM)
  if (state.status === "lobby") {
    const playersList = Object.values(state.players);

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400">
              Nouveau Départ • Salle d&apos;Attente Live
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-300 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? "Lien copié !" : "Copier le lien direct"}
            </button>
          </div>
        </div>

        {/* Central Display: Huge PIN & QR Code */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto w-full py-8">
          {/* Instructions & PIN */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-stone-400 text-sm font-medium">
              Sur votre smartphone, rejoignez la partie en saisissant le code PIN :
            </p>

            <div className="inline-block p-6 sm:p-8 bg-stone-900/90 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/10 backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Code PIN du Jeu
              </span>
              <div className="text-5xl sm:text-7xl font-black tracking-widest text-amber-400 font-mono">
                {state.pin.slice(0, 3)} {state.pin.slice(3)}
              </div>
            </div>

            <div className="text-xs text-stone-500">
              Ou accédez à l&apos;adresse web :{" "}
              <span className="text-stone-300 font-mono font-bold">
                {playerUrl.replace(/https?:\/\//, "")}
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <QRCodeDisplay url={playerUrl} size={220} />
            <p className="text-xs text-stone-400 font-medium">
              Scannez directement avec l&apos;appareil photo de votre téléphone
            </p>
          </div>
        </div>

        {/* Players Waiting List & Start Button */}
        <div className="border-t border-stone-800/80 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-400" />
              <span className="text-lg font-bold">
                {playersList.length} participant{playersList.length > 1 ? "s" : ""} connecté{playersList.length > 1 ? "s" : ""}
              </span>
            </div>

            <button
              onClick={() => sendHostAction({ type: "start_quiz" })}
              disabled={playersList.length === 0}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl ${
                playersList.length > 0
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 hover:scale-105 shadow-amber-500/20"
                  : "bg-stone-800 text-stone-500 cursor-not-allowed"
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              Démarrer le Quiz ({playersList.length})
            </button>
          </div>

          {/* Player badges */}
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2">
            {playersList.length === 0 ? (
              <div className="text-stone-500 text-sm italic py-2">
                En attente des premiers participants...
              </div>
            ) : (
              playersList.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 border border-stone-800 rounded-full text-sm font-semibold text-stone-200 animate-in fade-in zoom-in-95 duration-200"
                >
                  <span className="text-base">{p.avatar}</span>
                  <span>{p.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. QUESTION PROJECTION SCREEN
  if (state.status === "question" && state.currentQuestion) {
    const q = state.currentQuestion;
    const answeredCount = state.answersCount;
    const totalPlayers = state.playerCount;

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
        {/* Top bar: Question indicator, Late-joiner PIN, Timer & Answer counter */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Question {state.currentQuestionIndex + 1} / {state.totalQuestions}
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-400 transition-all hover:scale-105 shadow-sm"
              title="Cliquer pour afficher le QR Code pour les retardataires"
            >
              <span className="text-[10px] uppercase text-stone-400">PIN :</span>
              <span className="tracking-widest">{state.pin}</span>
            </button>
          </div>

          {/* Central Circular / Pill Timer */}
          <div
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-2xl transition-all ${
              secondsLeft <= 5
                ? "bg-rose-600/30 text-rose-400 border border-rose-500 animate-pulse"
                : "bg-stone-900 border border-stone-800 text-amber-400"
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{secondsLeft}s</span>
          </div>

          {/* Answered counter */}
          <div className="flex items-center gap-2 text-sm text-stone-400 font-semibold">
            <Users className="w-4 h-4" />
            <span>
              {answeredCount} / {totalPlayers} ont répondu
            </span>
          </div>
        </div>

        {/* Big Question Prompt */}
        <div className="my-auto max-w-4xl mx-auto w-full py-6 text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {q.text[language] || q.text.fr}
          </h1>

          {q.biblicalReference && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-xs text-amber-400/90 font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{q.biblicalReference}</span>
            </div>
          )}
        </div>

        {/* 4 Large Color Options (Kahoot-style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto w-full mb-6">
          {q.options?.map((opt, idx) => {
            const style = OPTION_STYLES[idx % OPTION_STYLES.length];
            return (
              <div
                key={opt.id}
                className={`p-6 sm:p-8 rounded-3xl border-2 flex items-center gap-4 text-left transition-all ${style.bg}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md shrink-0 ${style.badge}`}
                >
                  {style.symbol}
                </div>
                <span className="text-lg sm:text-xl font-bold leading-snug">
                  {opt.text[language] || opt.text.fr}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom control bar for host */}
        <div className="flex justify-end pt-4 border-t border-stone-800/80">
          <button
            onClick={() => sendHostAction({ type: "reveal_answer" })}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm transition-colors"
          >
            Révéler la réponse
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Modal QR Code pour les retardataires */}
        {renderLateJoinModal()}
      </div>
    );
  }

  // 4. REVEAL SCREEN (ANSWER & DISTRIBUTION & THEOLOGICAL EXPLANATION)
  if (state.status === "reveal" && state.currentQuestion) {
    const q = state.currentQuestion;
    const dist = state.distribution || {};
    const totalVotes = Object.values(dist).reduce((a, b) => a + b, 0);

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Résultats • Question {state.currentQuestionIndex + 1} / {state.totalQuestions}
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-400 transition-all hover:scale-105 shadow-sm"
              title="Cliquer pour afficher le QR Code pour les retardataires"
            >
              <span className="text-[10px] uppercase text-stone-400">PIN :</span>
              <span className="tracking-widest">{state.pin}</span>
            </button>
          </div>

          <button
            onClick={() => sendHostAction({ type: "show_leaderboard" })}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm shadow-lg transition-transform hover:scale-105"
          >
            <span>Voir le Classement</span>
            <Trophy className="w-4 h-4" />
          </button>
        </div>

        {/* Central Card: Options with Vote Bars and Correct Answer Highlight */}
        <div className="my-auto max-w-4xl mx-auto w-full py-6 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-stone-300">
            {q.text[language] || q.text.fr}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options?.map((opt, idx) => {
              const isCorrect = opt.id === state.correctAnswerId;
              const count = dist[opt.id] || 0;
              const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              const style = OPTION_STYLES[idx % OPTION_STYLES.length];

              return (
                <div
                  key={opt.id}
                  className={`relative overflow-hidden p-5 sm:p-6 rounded-3xl border-2 transition-all ${
                    isCorrect
                      ? "bg-emerald-950/60 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-400/50"
                      : "bg-stone-900/60 border-stone-800 opacity-60"
                  }`}
                >
                  {/* Background progress bar of votes */}
                  <div
                    style={{ width: `${percentage}%` }}
                    className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 ${
                      isCorrect ? "bg-emerald-500" : "bg-stone-500"
                    }`}
                  />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${style.badge}`}
                      >
                        {style.symbol}
                      </div>
                      <span className="font-bold text-base sm:text-lg">
                        {opt.text[language] || opt.text.fr}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      )}
                      <span className="font-mono font-bold text-sm text-stone-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Theological pastoral note for debrief */}
          {state.explanation && (
            <div className="p-6 bg-stone-900 border border-amber-500/30 rounded-3xl shadow-xl space-y-2 text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Éclairage Biblique & Pastoral</span>
                {state.biblicalReference && (
                  <span className="text-stone-400">({state.biblicalReference})</span>
                )}
              </div>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                {state.explanation[language] || state.explanation.fr}
              </p>
            </div>
          )}
        </div>

        {/* Modal QR Code pour les retardataires */}
        {renderLateJoinModal()}
      </div>
    );
  }

  // 5. LEADERBOARD SCREEN (TOP 5)
  if (state.status === "leaderboard") {
    const isLastQuestion = state.currentQuestionIndex + 1 >= state.totalQuestions;
    const topPlayers = state.leaderboard.slice(0, 5);

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-widest">
              <Trophy className="w-5 h-5" />
              <span>Classement Général • Question {state.currentQuestionIndex + 1} / {state.totalQuestions}</span>
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 rounded-full text-xs font-mono font-bold text-amber-400 transition-all hover:scale-105 shadow-sm"
              title="Cliquer pour afficher le QR Code pour les retardataires"
            >
              <span className="text-[10px] uppercase text-stone-400">PIN :</span>
              <span className="tracking-widest">{state.pin}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (isLastQuestion) {
                sendHostAction({ type: "end_quiz" });
              } else {
                sendHostAction({ type: "next_question" });
              }
            }}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-base shadow-xl transition-transform hover:scale-105"
          >
            <span>{isLastQuestion ? "Podium Final !" : "Question Suivante"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Central Leaderboard list */}
        <div className="my-auto max-w-2xl mx-auto w-full py-8 space-y-3">
          {topPlayers.map((player, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all ${
                  isFirst
                    ? "bg-amber-500/20 border-amber-500/50 shadow-xl shadow-amber-500/10 text-white font-extrabold"
                    : "bg-stone-900 border-stone-800 text-stone-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${
                      isFirst
                        ? "bg-amber-400 text-stone-950"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    #{player.rank}
                  </div>
                  <span className="text-xl">{player.avatar}</span>
                  <span className="text-lg font-bold">{player.name}</span>
                  {player.streak >= 2 && (
                    <span className="flex items-center gap-1 text-xs text-orange-400 font-bold px-2 py-0.5 bg-orange-950/60 rounded-full">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {player.streak}
                    </span>
                  )}
                </div>

                <div className="font-mono text-xl sm:text-2xl font-black text-amber-400">
                  {player.score.toLocaleString()} pts
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal QR Code pour les retardataires */}
        {renderLateJoinModal()}
      </div>
    );
  }

  // 6. FINISHED PODIUM SCREEN (1st, 2nd, 3rd)
  if (state.status === "finished") {
    const top3 = state.leaderboard.slice(0, 3);
    const first = top3[0];
    const second = top3[1];
    const third = top3[2];

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 px-4 py-1.5 bg-amber-950/50 border border-amber-500/30 rounded-full">
            <Crown className="w-4 h-4" />
            <span>Grand Podium Nouveau Départ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Félicitations à tous les participants !
          </h1>
        </div>

        {/* 3D-like Podium */}
        <div className="my-auto max-w-3xl mx-auto w-full flex items-end justify-center gap-4 sm:gap-6 pt-12 pb-6">
          {/* 2nd place (Silver) */}
          {second && (
            <div className="flex flex-col items-center flex-1 max-w-[180px]">
              <div className="text-3xl mb-1">{second.avatar}</div>
              <div className="font-bold text-sm text-stone-200 truncate max-w-full mb-1">
                {second.name}
              </div>
              <div className="text-xs font-mono text-stone-400 mb-2">
                {second.score} pts
              </div>
              <div className="w-full h-44 bg-gradient-to-t from-stone-800 to-stone-700 rounded-t-3xl flex items-center justify-center border-t-4 border-stone-400 shadow-xl">
                <span className="text-4xl font-black text-stone-300">2</span>
              </div>
            </div>
          )}

          {/* 1st place (Gold) */}
          {first && (
            <div className="flex flex-col items-center flex-1 max-w-[200px]">
              <Crown className="w-8 h-8 text-amber-400 animate-bounce mb-1" />
              <div className="text-4xl mb-1">{first.avatar}</div>
              <div className="font-black text-base text-amber-300 truncate max-w-full mb-1">
                {first.name}
              </div>
              <div className="text-sm font-mono font-bold text-amber-400 mb-2">
                {first.score} pts
              </div>
              <div className="w-full h-60 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-3xl flex items-center justify-center border-t-4 border-amber-300 shadow-2xl shadow-amber-500/30">
                <span className="text-6xl font-black text-stone-950">1</span>
              </div>
            </div>
          )}

          {/* 3rd place (Bronze) */}
          {third && (
            <div className="flex flex-col items-center flex-1 max-w-[180px]">
              <div className="text-3xl mb-1">{third.avatar}</div>
              <div className="font-bold text-sm text-stone-200 truncate max-w-full mb-1">
                {third.name}
              </div>
              <div className="text-xs font-mono text-stone-400 mb-2">
                {third.score} pts
              </div>
              <div className="w-full h-36 bg-gradient-to-t from-amber-950 to-amber-900 rounded-t-3xl flex items-center justify-center border-t-4 border-amber-700 shadow-xl">
                <span className="text-4xl font-black text-amber-600">3</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-stone-800">
          <button
            onClick={() => {
              setPin(null);
              setHostToken(null);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 font-bold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Nouvelle Session
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors"
          >
            Retour aux Cours
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
