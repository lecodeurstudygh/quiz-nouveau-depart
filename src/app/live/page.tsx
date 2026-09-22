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
    bg: "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white border-rose-600",
    badge: "bg-white/20 text-white",
    symbol: "▲",
  },
  {
    bg: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white border-blue-600",
    badge: "bg-white/20 text-white",
    symbol: "◆",
  },
  {
    bg: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-950 border-amber-600",
    badge: "bg-black/20 text-stone-950",
    symbol: "●",
  },
  {
    bg: "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white border-emerald-600",
    badge: "bg-white/20 text-white",
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
      setJoinError("Le code PIN doit comporter 6 chiffres.");
      return;
    }
    if (!nameInput.trim()) {
      setJoinError("Veuillez saisir votre prénom ou pseudo.");
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
        setJoinError(data.error || "Impossible de rejoindre la session.");
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
      setJoinError("Erreur de connexion. Vérifiez votre réseau.");
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
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none">
        <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quiz Live • Nouveau Départ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Rejoindre la Partie
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm">
              Entrez le code PIN affiché par l&apos;enseignant sur Zoom ou à l&apos;écran.
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            {/* PIN Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Code PIN du Jeu
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ex: 742819"
                className="w-full bg-stone-950 border border-stone-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono font-bold tracking-widest text-amber-400 outline-none"
              />
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Votre Prénom ou Pseudo
              </label>
              <input
                type="text"
                maxLength={20}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ex: David, Sarah..."
                className="w-full bg-stone-950 border border-stone-700 focus:border-amber-400 rounded-2xl px-4 py-3 text-base font-semibold text-white outline-none"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Choisissez votre Avatar
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`py-2 text-2xl rounded-xl border transition-all ${
                      avatar === av
                        ? "bg-amber-500/20 border-amber-400 scale-105"
                        : "bg-stone-950 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {joinError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold text-center">
                {joinError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isJoining}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <span>{isJoining ? "Connexion..." : "C'est parti !"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Link to Host Mode for Teachers */}
          <div className="pt-2 text-center border-t border-stone-800/80">
            <Link
              href="/live/host"
              className="text-xs text-stone-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Vous animez la session ?</span>
              <span className="font-bold underline underline-offset-2">Écran Enseignant (Zoom) ➔</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. PLAYER LOBBY (WAITING ROOM)
  if (state.status === "lobby") {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-5xl mx-auto shadow-xl shadow-amber-500/10">
            {myPlayer?.avatar || avatar}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">
              {myPlayer?.name || nameInput}
            </h2>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Connecté à la partie</span>
            </div>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs text-stone-400 leading-relaxed">
            Regardez l&apos;écran de l&apos;enseignant sur Zoom ou dans la salle. Le quiz va bientôt commencer !
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
        <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h2 className="text-xl font-black text-white">
              Réponse enregistrée !
            </h2>
            <p className="text-xs text-stone-400">
              En attente des autres participants... Les résultats arrivent sur l&apos;écran principal.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between py-2 sm:py-4 select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Q{state.currentQuestionIndex + 1} / {state.totalQuestions}
          </div>
          <div className="text-xs font-bold text-stone-400">
            {myPlayer?.name} • {myPlayer?.score} pts
          </div>
        </div>

        {/* Question Title */}
        <div className="my-auto py-2 text-center">
          <h2 className="text-lg sm:text-xl font-black leading-snug">
            {q.text[language] || q.text.fr}
          </h2>
        </div>

        {/* 4 Ergonomic Big Touch Buttons */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full mb-2">
          {q.options?.map((opt, idx) => {
            const style = OPTION_STYLES[idx % OPTION_STYLES.length];
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`h-28 sm:h-36 p-3 rounded-2xl border-b-4 flex flex-col items-center justify-center gap-1.5 text-center transition-transform active:scale-95 shadow-xl ${style.bg}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shadow-md ${style.badge}`}
                >
                  {style.symbol}
                </div>
                <span className="text-xs sm:text-sm font-bold line-clamp-2 leading-tight">
                  {opt.text[language] || opt.text.fr}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. REVEAL / VERDICT SCREEN (PERSONALIZED RESULT)
  if (state.status === "reveal") {
    const isCorrect = myPlayer?.lastSelectedOptionId === state.correctAnswerId;
    const points = myPlayer?.lastPointsEarned || 0;

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div
          className={`w-full max-w-sm rounded-3xl p-8 border-2 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 ${
            isCorrect
              ? "bg-emerald-950/70 border-emerald-400 text-emerald-100"
              : "bg-rose-950/70 border-rose-500 text-rose-100"
          }`}
        >
          <div className="text-5xl">
            {isCorrect ? "🎉" : "😅"}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black">
              {isCorrect ? "Bonne Réponse !" : "Pas Tout à Fait..."}
            </h2>
            {isCorrect ? (
              <div className="text-3xl font-black text-emerald-400 font-mono">
                +{points} pts
              </div>
            ) : (
              <div className="text-sm font-semibold text-rose-300">
                +0 pt pour cette question
              </div>
            )}
          </div>

          {isCorrect && myPlayer && myPlayer.streak > 1 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-950/80 border border-orange-500/50 rounded-full text-xs font-bold text-orange-400">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Série de {myPlayer.streak} d&apos;affilée !</span>
            </div>
          )}

          <div className="pt-2 text-xs text-stone-300 border-t border-white/10">
            Score total : <span className="font-bold">{myPlayer?.score} pts</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. LEADERBOARD / INTERMEDIATE STANDING
  if (state.status === "leaderboard") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
              Votre Position
            </span>
            <div className="text-4xl font-black text-amber-400 font-mono">
              #{myRank}
            </div>
            <div className="text-sm font-bold text-stone-200">
              {myPlayer?.score} points
            </div>
          </div>

          <p className="text-xs text-stone-400">
            Regardez l&apos;écran de l&apos;enseignant pour voir le Top 5 en direct !
          </p>
        </div>
      </div>
    );
  }

  // 6. FINISHED GAME SCREEN
  if (state.status === "finished") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";

    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-sm bg-stone-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-5xl">👑</div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">Partie Terminée !</h2>
            <div className="text-4xl font-black text-amber-400 font-mono">
              #{myRank}
            </div>
            <p className="text-sm font-bold text-stone-300">
              Score final : {myPlayer?.score} pts
            </p>
          </div>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <Link
              href="/"
              className="block w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function LivePlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-400 font-mono text-sm">
          Chargement du mode Live...
        </div>
      }
    >
      <LivePlayerContent />
    </Suspense>
  );
}
