"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useLiveSession } from "@/lib/useLiveSession";
import {
  Sparkles,
  ArrowRight,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Check,
  RotateCcw,
  Volume2,
} from "lucide-react";
import Link from "next/link";

const AVATARS = ["✨", "🦁", "🕊️", "🌿", "🌟", "🔥", "⚡", "🎯"];

const OPTION_STYLES = [
  {
    card: "bg-white hover:bg-stone-50 dark:bg-[#16161f] dark:hover:bg-[#1f1f2a] border border-stone-200/90 dark:border-white/10 border-b-4 border-b-[#8a2230] text-neutral-900 dark:text-zinc-100 shadow-md",
    badge: "bg-[#8a2230] text-white shadow-sm",
    symbol: "▲",
  },
  {
    card: "bg-white hover:bg-stone-50 dark:bg-[#16161f] dark:hover:bg-[#1f1f2a] border border-stone-200/90 dark:border-white/10 border-b-4 border-b-[#244c74] text-neutral-900 dark:text-zinc-100 shadow-md",
    badge: "bg-[#244c74] text-white shadow-sm",
    symbol: "◆",
  },
  {
    card: "bg-white hover:bg-stone-50 dark:bg-[#16161f] dark:hover:bg-[#1f1f2a] border border-stone-200/90 dark:border-white/10 border-b-4 border-b-[#c5a059] text-neutral-900 dark:text-zinc-100 shadow-md",
    badge: "bg-[#c5a059] text-zinc-950 font-bold shadow-sm",
    symbol: "●",
  },
  {
    card: "bg-white hover:bg-stone-50 dark:bg-[#16161f] dark:hover:bg-[#1f1f2a] border border-stone-200/90 dark:border-white/10 border-b-4 border-b-[#1d5c41] text-neutral-900 dark:text-zinc-100 shadow-md",
    badge: "bg-[#1d5c41] text-white shadow-sm",
    symbol: "■",
  },
];

function LivePlayerContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();

  // Query parameter PIN support (from QR code scan)
  const pinFromUrl = searchParams.get("pin") || "";

  // Join form state
  const [pinInput, setPinInput] = useState<string>(pinFromUrl);
  const [nameInput, setNameInput] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("✨");
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Active session player state
  const [activePin, setActivePin] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  // Load saved name from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("nouveau_depart_player_name");
      if (savedName) setNameInput(savedName);
      const savedAvatar = localStorage.getItem("nouveau_depart_player_avatar");
      if (savedAvatar) setAvatar(savedAvatar);
    }
  }, []);

  // Update pin input if URL param changes
  useEffect(() => {
    if (pinFromUrl) setPinInput(pinFromUrl);
  }, [pinFromUrl]);

  // Live session hook
  const { state, sendPlayerAction } = useLiveSession({
    pin: activePin,
    playerId,
    isHost: false,
  });

  // Current player data
  const myPlayer = playerId && state?.players ? state.players[playerId] : null;

  // Handle Join Submit
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.replace(/\s+/g, "");
    if (!cleanPin || cleanPin.length !== 6) {
      setJoinError(language === "fr" ? "Le code PIN doit comporter 6 chiffres." : "The PIN code must be 6 digits.");
      return;
    }
    if (!nameInput.trim()) {
      setJoinError(language === "fr" ? "Veuillez saisir votre prénom ou pseudo." : "Please enter your name or nickname.");
      return;
    }

    setIsJoining(true);
    setJoinError(null);

    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join",
          pin: cleanPin,
          playerName: nameInput.trim(),
          avatar,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setJoinError(data.error || (language === "fr" ? "Impossible de rejoindre la session." : "Unable to join the session."));
        setIsJoining(false);
        return;
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("nouveau_depart_player_name", nameInput.trim());
        localStorage.setItem("nouveau_depart_player_avatar", avatar);
      }

      setActivePin(cleanPin);
      setPlayerId(data.playerId);
    } catch {
      setJoinError(language === "fr" ? "Erreur de connexion. Vérifiez votre réseau." : "Connection error. Check your network.");
    } finally {
      setIsJoining(false);
    }
  };

  // Handle Option Click
  const handleSelectOption = (optionId: string) => {
    if (!myPlayer || myPlayer.answered || state?.status !== "question") return;

    // Vibrate if supported on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    sendPlayerAction({
      type: "submit_answer",
      optionId,
    });
  };

  // 1. JOIN SCREEN
  if (!activePin || !state) {
    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-2 sm:p-6 select-none relative overflow-hidden [isolation:isolate]">
        {/* Subtle ambient halos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d] px-3.5 py-1 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === "fr" ? "Quiz Live • Nouveau Départ" : "Live Quiz • New Beginnings"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
              <span className="font-semibold">{language === "fr" ? "Rejoindre" : "Join"}</span> {language === "fr" ? "la Partie" : "the Game"}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
              {language === "fr"
                ? "Entrez le code PIN affiché par l'enseignant sur Zoom ou à l'écran."
                : "Enter the PIN code displayed by the teacher on Zoom or on screen."}
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            {/* PIN Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                {language === "fr" ? "Code PIN du Jeu" : "Game PIN Code"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ex: 742819"
                className="w-full bg-stone-50 dark:bg-black/60 border border-stone-200 dark:border-white/15 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-2xl px-4 py-3.5 text-center text-2xl font-mono font-bold tracking-widest text-neutral-900 dark:text-[#d6b26d] outline-none shadow-inner transition-colors"
              />
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                {language === "fr" ? "Votre Prénom ou Pseudo" : "Your Name or Nickname"}
              </label>
              <input
                type="text"
                maxLength={20}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={language === "fr" ? "Ex: David, Sarah..." : "e.g. David, Sarah..."}
                className="w-full bg-stone-50 dark:bg-black/60 border border-stone-200 dark:border-white/15 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-2xl px-4 py-3 text-base font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none shadow-inner transition-colors"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                {language === "fr" ? "Choisissez votre Avatar" : "Choose your Avatar"}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`py-2 text-2xl rounded-2xl border transition-all ${
                      avatar === av
                        ? "bg-[#c5a059]/20 border-[#c5a059] scale-105 shadow-md shadow-[#c5a059]/15"
                        : "bg-stone-100 dark:bg-black/40 border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/25"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {joinError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/50 text-rose-700 dark:text-rose-300 text-xs font-semibold text-center">
                {joinError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isJoining}
              className="w-full py-4 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              <span>
                {isJoining
                  ? language === "fr"
                    ? "Connexion..."
                    : "Connecting..."
                  : language === "fr"
                  ? "C'est parti !"
                  : "Let's Go!"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Link to Host Mode for Teachers */}
          <div className="pt-2 text-center border-t border-stone-200/80 dark:border-white/10">
            <Link
              href="/live/host"
              className="text-xs text-stone-500 dark:text-neutral-400 hover:text-[#9e7d32] dark:hover:text-[#d6b26d] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{language === "fr" ? "Vous animez la session ?" : "Hosting the session?"}</span>
              <span className="font-bold underline underline-offset-2">
                {language === "fr" ? "Écran Enseignant (Zoom) ➔" : "Teacher Screen (Zoom) ➔"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. PLAYER LOBBY (WAITING ROOM)
  if (state.status === "lobby") {
    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          <div className="w-24 h-24 rounded-full bg-[#c5a059]/15 border-2 border-[#c5a059]/40 flex items-center justify-center text-5xl mx-auto shadow-xl shadow-[#c5a059]/10">
            {myPlayer?.avatar || avatar}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              {myPlayer?.name || nameInput}
            </h2>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{language === "fr" ? "Connecté à la partie" : "Connected to the game"}</span>
            </div>
          </div>

          <div className="p-4 bg-stone-100 dark:bg-black/50 rounded-2xl border border-stone-200 dark:border-white/10 text-xs text-stone-600 dark:text-neutral-400 leading-relaxed">
            {language === "fr"
              ? "Regardez l'écran de l'enseignant sur Zoom ou dans la salle. Le quiz va bientôt commencer !"
              : "Watch the teacher's screen on Zoom or in the room. The quiz will start soon!"}
          </div>
        </div>
      </div>
    );
  }

  // 3. QUESTION SCREEN (4 BIG TOUCH BUTTONS)
  if (state.status === "question" && state.currentQuestion) {
    const q = state.currentQuestion;
    const hasAnswered = myPlayer?.answered;

    if (hasAnswered) {
      return (
        <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none relative overflow-hidden [isolation:isolate]">
          <div className="relative z-10 w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-8 shadow-2xl space-y-4 animate-scale-in before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
            <div className="w-20 h-20 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#9e7d32] dark:text-[#d6b26d] mx-auto shadow-lg shadow-[#c5a059]/15">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">
              {language === "fr" ? "Réponse enregistrée !" : "Answer recorded!"}
            </h2>
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              {language === "fr"
                ? "En attente des autres participants... Les résultats arrivent sur l'écran principal."
                : "Waiting for other players... Results will appear on the main screen."}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col justify-between p-2 sm:p-6 select-none relative overflow-hidden [isolation:isolate]">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between py-2 sm:py-4">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-white/10 pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d]">
              Q{state.currentQuestionIndex + 1} / {state.totalQuestions}
            </div>
            <div className="text-xs font-mono font-semibold text-stone-600 dark:text-neutral-400">
              {myPlayer?.name} • <span className="text-[#9e7d32] dark:text-[#d6b26d] font-bold">{myPlayer?.score} pts</span>
            </div>
          </div>

          {/* Question Title */}
          <div className="my-auto py-3 text-center">
            <h2 className="text-lg sm:text-xl font-bold leading-snug text-neutral-900 dark:text-white drop-shadow-sm">
              {q.text[language] || q.text.fr}
            </h2>
          </div>

          {/* 4 Ergonomic Big Touch Buttons */}
          <div className="grid grid-cols-2 gap-3.5 max-w-md mx-auto w-full mb-2">
            {q.options?.map((opt, idx) => {
              const style = OPTION_STYLES[idx % OPTION_STYLES.length];
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`h-28 sm:h-36 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all active:scale-95 ${style.card}`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg ${style.badge}`}
                  >
                    {style.symbol}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
                    {opt.text[language] || opt.text.fr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. REVEAL / VERDICT SCREEN (PERSONALIZED RESULT)
  if (state.status === "reveal") {
    const isCorrect = myPlayer?.lastSelectedOptionId === state.correctAnswerId;
    const points = myPlayer?.lastPointsEarned || 0;

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div
          className={`w-full max-w-sm rounded-3xl p-8 border shadow-2xl space-y-4 animate-scale-in before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent relative overflow-hidden ${
            isCorrect
              ? "bg-emerald-50 dark:bg-[#112419] border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 shadow-emerald-500/10 dark:shadow-emerald-950/40"
              : "bg-rose-50 dark:bg-[#251216] border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100 shadow-rose-500/10 dark:shadow-rose-950/40"
          }`}
        >
          <div className="text-5xl">
            {isCorrect ? "🎉" : "😅"}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black">
              {isCorrect
                ? language === "fr"
                  ? "Bonne Réponse !"
                  : "Correct Answer!"
                : language === "fr"
                ? "Pas Tout à Fait..."
                : "Not Quite..."}
            </h2>
            {isCorrect ? (
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                +{points} pts
              </div>
            ) : (
              <div className="text-sm font-semibold text-rose-600 dark:text-rose-300">
                {language === "fr" ? "+0 pt pour cette question" : "+0 pts for this question"}
              </div>
            )}
          </div>

          {isCorrect && myPlayer && myPlayer.streak > 1 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c5a059]/15 dark:bg-[#c5a059]/20 border border-[#c5a059]/30 rounded-full text-xs font-bold text-[#9e7d32] dark:text-[#d6b26d]">
              <Flame className="w-3.5 h-3.5 fill-current text-[#c5a059]" />
              <span>
                {language === "fr"
                  ? `Série de ${myPlayer.streak} d'affilée !`
                  : `${myPlayer.streak} streak in a row!`}
              </span>
            </div>
          )}

          <div className="pt-2 text-xs text-stone-500 dark:text-neutral-400 border-t border-stone-200/80 dark:border-white/10">
            {language === "fr" ? "Score total :" : "Total score:"}{" "}
            <span className="font-bold text-[#9e7d32] dark:text-[#d6b26d] font-mono text-sm">{myPlayer?.score} pts</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. LEADERBOARD / INTERMEDIATE STANDING
  if (state.status === "leaderboard") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div className="w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#9e7d32] dark:text-[#d6b26d] mx-auto shadow-lg shadow-[#c5a059]/10">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-neutral-400 font-bold">
              {language === "fr" ? "Votre Position" : "Your Rank"}
            </span>
            <div className="text-4xl font-black text-[#9e7d32] dark:text-[#d6b26d] font-mono">
              #{myRank}
            </div>
            <div className="text-sm font-semibold text-stone-600 dark:text-neutral-300 font-mono">
              {myPlayer?.score} {language === "fr" ? "points" : "points"}
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-neutral-400">
            {language === "fr"
              ? "Regardez l'écran de l'enseignant pour voir le Top 5 en direct !"
              : "Watch the teacher's screen to see the live Top 5!"}
          </p>
        </div>
      </div>
    );
  }

  // 6. FINISHED GAME SCREEN
  if (state.status === "finished") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div className="w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-[#c5a059]/30 rounded-3xl p-8 shadow-2xl space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent relative overflow-hidden">
          <div className="text-5xl">👑</div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              {language === "fr" ? "Partie Terminée !" : "Game Over!"}
            </h2>
            <div className="text-4xl font-black text-[#9e7d32] dark:text-[#d6b26d] font-mono">
              #{myRank}
            </div>
            <p className="text-sm font-bold text-stone-600 dark:text-neutral-300 font-mono">
              {language === "fr" ? `Score final : ${myPlayer?.score} pts` : `Final score: ${myPlayer?.score} pts`}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200/80 dark:border-white/10 space-y-3">
            <Link
              href="/"
              className="block w-full py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm transition-colors shadow-lg active:scale-95"
            >
              {language === "fr" ? "Retour à l'accueil" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function LivePlayerPage() {
  const { language } = useLanguage();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fcfbfa] dark:bg-[#0b0b0e] flex items-center justify-center text-[#9e7d32] dark:text-[#c5a059] font-mono text-sm">
          {language === "fr" ? "Chargement du mode Live..." : "Loading Live Mode..."}
        </div>
      }
    >
      <LivePlayerContent />
    </Suspense>
  );
}
