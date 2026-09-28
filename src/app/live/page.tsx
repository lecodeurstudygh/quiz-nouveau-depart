"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useLiveSession } from "@/lib/useLiveSession";
import {
  Sparkles,
  ArrowRight,
  Trophy,
  Clock,
  Flame,
  Check,
  RotateCcw,
  X,
  Crown,
  Play,
  Users,
} from "lucide-react";
import Link from "next/link";
import { WhatsAppShareButton } from "@/components/WhatsAppShareButton";
import { allCourses } from "@/data/courses";
import { CustomDropdown, DropdownOption } from "@/components/CustomDropdown";
import { triggerConfetti } from "@/lib/confetti";

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

function getPublicAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    if (window.location.hostname === "localhost") {
      return origin;
    }
    if (origin.includes(".vercel.app") && origin !== "https://quiz-nouveau-depart.vercel.app") {
      return "https://quiz-nouveau-depart.vercel.app";
    }
    return origin;
  }
  return "https://quiz-nouveau-depart.vercel.app";
}

function LivePlayerContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();

  // Query parameter PIN support (from QR code scan or WhatsApp link)
  const pinFromUrl = (searchParams.get("pin") || "").replace(/\s+/g, "").trim();

  // Join form state
  const [pinInput, setPinInput] = useState<string>(pinFromUrl);
  const [nameInput, setNameInput] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("✨");
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Active tab: Join with PIN vs Launch a Friend Challenge
  const [liveTab, setLiveTab] = useState<"join" | "challenge">(pinFromUrl ? "join" : "join");
  const [challengeWeekId, setChallengeWeekId] = useState<string>("week-10");
  const [challengeQuestionCount, setChallengeQuestionCount] = useState<number>(8);
  const [challengeTimerSeconds, setChallengeTimerSeconds] = useState<number>(20);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState<boolean>(false);

  // Active session player & host token (if user created challenge)
  const [activePin, setActivePin] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [hostToken, setHostToken] = useState<string | null>(null);

  // Load saved name and avatar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("nouveau_depart_player_name");
      const savedAvatar = localStorage.getItem("nouveau_depart_player_avatar");
      if (savedName) setNameInput(savedName);
      if (savedAvatar && AVATARS.includes(savedAvatar)) setAvatar(savedAvatar);
    }
  }, []);

  // Challenge week options
  const challengeWeekOptions: DropdownOption[] = useMemo(() => {
    const list: DropdownOption[] = allCourses.map((c) => ({
      value: c.id,
      label:
        language === "fr"
          ? `Semaine ${c.weekNumber} : ${c.title.fr}`
          : `Week ${c.weekNumber}: ${c.title.en}`,
    }));
    list.push({
      value: "all",
      label:
        language === "fr"
          ? "Toutes les semaines combinées"
          : "All weeks combined",
    });
    return list;
  }, [language]);

  // Live session hook
  const { state, sendPlayerAction, sendHostAction } = useLiveSession({
    pin: activePin,
    playerId,
    hostToken,
    isHost: Boolean(hostToken),
  });

  // Timer countdown management for challenge & player mode
  const [secondsLeft, setSecondsLeft] = useState<number>(20);
  useEffect(() => {
    if (!state || state.status !== "question" || !state.questionStartedAt) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.questionStartedAt!) / 1000);
      const remaining = Math.max(0, state.timerSeconds - elapsed);
      setSecondsLeft(remaining);

      // In challenge mode, if countdown reaches 0 and user is creator, auto-reveal!
      if (remaining === 0 && hostToken) {
        clearInterval(interval);
        sendHostAction({ type: "reveal_answer" });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [state?.status, state?.questionStartedAt, state?.timerSeconds, hostToken, sendHostAction]);

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

  // Handle Challenge Create Submit
  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setJoinError(language === "fr" ? "Veuillez saisir votre prénom ou pseudo." : "Please enter your name or nickname.");
      return;
    }

    setIsCreatingChallenge(true);
    setJoinError(null);

    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_challenge",
          weekId: challengeWeekId,
          questionCount: challengeQuestionCount,
          timerSeconds: challengeTimerSeconds,
          playerName: nameInput.trim(),
          avatar,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setJoinError(data.error || (language === "fr" ? "Impossible de créer le défi." : "Unable to create challenge."));
        setIsCreatingChallenge(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("nouveau_depart_player_name", nameInput.trim());
        localStorage.setItem("nouveau_depart_player_avatar", avatar);
      }

      setActivePin(data.pin);
      setHostToken(data.hostToken);
      setPlayerId(data.playerId);
    } catch {
      setJoinError(language === "fr" ? "Erreur de connexion. Vérifiez votre réseau." : "Connection error. Check your network.");
    } finally {
      setIsCreatingChallenge(false);
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

  // Safe Exit with explicit confirmation for participants
  const handleExitPlayer = () => {
    if (
      window.confirm(
        language === "fr"
          ? "Voulez-vous vraiment quitter la session en direct ? Vos points et votre progression seront perdus."
          : "Do you really want to leave this live session? Your score and progress will be lost."
      )
    ) {
      setActivePin(null);
      setPlayerId(null);
      setHostToken(null);
      window.location.href = "/";
    }
  };

  // 1. JOIN SCREEN / CREATE CHALLENGE
  if (!activePin || !state) {
    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-2 sm:p-6 pb-20 sm:pb-8 select-none relative overflow-hidden [isolation:isolate]">
        {/* Subtle ambient halos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-4 sm:p-7 shadow-2xl space-y-3.5 sm:space-y-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          {/* Header row with badge on left and close button on right */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d] px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full shadow-sm truncate">
              <Sparkles className="w-3 h-3 text-[#c5a059] shrink-0" />
              <span className="truncate">{language === "fr" ? "Quiz Live • Nouveau Départ" : "Live Quiz • New Beginnings"}</span>
            </div>
            <Link
              href="/"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 text-stone-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm"
              title={language === "fr" ? "Fermer et retourner aux cours" : "Close and return to courses"}
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Segmented Mode Selector: Join PIN vs Friend Challenge */}
          <div className="grid grid-cols-2 p-1 bg-stone-100 dark:bg-black/40 rounded-2xl border border-stone-200/80 dark:border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setLiveTab("join")}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                liveTab === "join"
                  ? "bg-white dark:bg-[#1f1f2a] text-neutral-900 dark:text-white shadow-sm border border-stone-200/80 dark:border-white/10"
                  : "text-stone-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span>🔑</span>
              <span>{t("liveTabJoin")}</span>
            </button>
            <button
              type="button"
              onClick={() => setLiveTab("challenge")}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                liveTab === "challenge"
                  ? "bg-white dark:bg-[#1f1f2a] text-[#9e7d32] dark:text-[#d6b26d] shadow-sm border border-stone-200/80 dark:border-white/10"
                  : "text-stone-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span>⚡</span>
              <span>{t("liveTabChallenge")}</span>
            </button>
          </div>

          {liveTab === "join" ? (
            /* TAB 1: JOIN WITH PIN */
            <form onSubmit={handleJoin} className="space-y-3">
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 dark:text-white">
                  <span className="font-semibold">{language === "fr" ? "Rejoindre" : "Join"}</span> {language === "fr" ? "la Partie" : "the Game"}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                  {language === "fr"
                    ? "Entrez le code PIN affiché par l'enseignant ou reçu d'un ami."
                    : "Enter the PIN code displayed by the teacher or received from a friend."}
                </p>
              </div>

              {/* PIN Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Code PIN du Jeu" : "Game PIN Code"}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ex: 742819"
                  className="w-full bg-stone-50 dark:bg-black/60 border border-stone-200 dark:border-white/15 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-2xl px-4 py-2.5 sm:py-3 text-center text-xl sm:text-2xl font-mono font-bold tracking-widest text-neutral-900 dark:text-[#d6b26d] outline-none shadow-inner transition-colors"
                />
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Votre Prénom ou Pseudo" : "Your Name or Nickname"}
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={language === "fr" ? "Ex: David, Sarah..." : "e.g. David, Sarah..."}
                  className="w-full bg-stone-50 dark:bg-black/60 border border-stone-200 dark:border-white/15 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-2xl px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none shadow-inner transition-colors"
                />
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Choisissez votre Avatar" : "Choose your Avatar"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setAvatar(av)}
                      className={`py-1 sm:py-1.5 text-xl sm:text-2xl rounded-2xl border transition-all ${
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
                <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/50 text-rose-700 dark:text-rose-300 text-xs font-semibold text-center">
                  {joinError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isJoining}
                className="w-full py-3 sm:py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
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
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Link to Host Mode for Teachers */}
              <div className="pt-2 text-center border-t border-stone-200/80 dark:border-white/10">
                <Link
                  href="/live/host"
                  className="text-xs text-stone-500 dark:text-neutral-400 hover:text-[#9e7d32] dark:hover:text-[#d6b26d] transition-colors inline-flex items-center justify-center gap-1.5 py-0.5"
                >
                  <span>{language === "fr" ? "Vous animez la session ?" : "Hosting the session?"}</span>
                  <span className="font-bold underline underline-offset-2 text-[#9e7d32] dark:text-[#d6b26d] inline-flex items-center gap-1 whitespace-nowrap">
                    <span>{language === "fr" ? "Écran Enseignant (Code requis) →" : "Teacher Screen (Code required) →"}</span>
                  </span>
                </Link>
              </div>
            </form>
          ) : (
            /* TAB 2: CREATE A FRIEND CHALLENGE */
            <form onSubmit={handleCreateChallenge} className="space-y-3">
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 dark:text-white">
                  <span className="font-semibold">{language === "fr" ? "Défi" : "Friend"}</span> {language === "fr" ? "entre Amis" : "Challenge"}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                  {t("challengeSubtitle")}
                </p>
              </div>

              {/* Week Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Semaine du Quiz" : "Quiz Week"}
                </label>
                <CustomDropdown
                  options={challengeWeekOptions}
                  value={challengeWeekId}
                  onChange={setChallengeWeekId}
                />
              </div>

              {/* Question Count Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Nombre de questions" : "Question count"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 8, 10].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setChallengeQuestionCount(count)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        challengeQuestionCount === count
                          ? "bg-[#c5a059]/20 border-[#c5a059] text-neutral-900 dark:text-[#d6b26d] scale-102 shadow-sm"
                          : "bg-stone-50 dark:bg-black/30 border-stone-200 dark:border-white/10 text-stone-600 dark:text-zinc-400 hover:border-stone-300"
                      }`}
                    >
                      {count} {language === "fr" ? "questions" : "questions"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Timer Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Temps par question" : "Time per question"}
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[15, 20, 30, 45].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setChallengeTimerSeconds(sec)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        challengeTimerSeconds === sec
                          ? "bg-[#c5a059]/20 border-[#c5a059] text-neutral-900 dark:text-[#d6b26d] scale-102 shadow-sm"
                          : "bg-stone-50 dark:bg-black/30 border-stone-200 dark:border-white/10 text-stone-600 dark:text-zinc-400 hover:border-stone-300"
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Player Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Votre Prénom ou Pseudo" : "Your Name or Nickname"}
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={language === "fr" ? "Ex: David, Sarah..." : "e.g. David, Sarah..."}
                  className="w-full bg-stone-50 dark:bg-black/60 border border-stone-200 dark:border-white/15 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-2xl px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none shadow-inner transition-colors"
                />
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  {language === "fr" ? "Choisissez votre Avatar" : "Choose your Avatar"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setAvatar(av)}
                      className={`py-1 sm:py-1.5 text-xl sm:text-2xl rounded-2xl border transition-all ${
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
                <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/50 text-rose-700 dark:text-rose-300 text-xs font-semibold text-center">
                  {joinError}
                </div>
              )}

              {/* Create Challenge Button */}
              <button
                type="submit"
                disabled={isCreatingChallenge}
                className="w-full py-3 sm:py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isCreatingChallenge
                    ? language === "fr"
                      ? "Création du Défi..."
                      : "Creating Challenge..."
                    : t("challengeStartBtn")}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const isChallengeMode = state.mode === "challenge";
  const isHostPlayer = Boolean(hostToken);

  // 2. LOBBY SCREEN (WAITING ROOM)
  if (state.status === "lobby") {
    const formattedPin = state.pin.length === 6 ? `${state.pin.slice(0, 3)} ${state.pin.slice(3)}` : state.pin;
    const playerDirectUrl = `${getPublicAppBaseUrl()}/live?pin=${state.pin}`;

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-3 sm:p-6 pb-24 sm:pb-8 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          {/* Close button with confirmation */}
          <button
            type="button"
            onClick={handleExitPlayer}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 text-stone-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-all active:scale-95 z-20 shadow-sm"
            title={language === "fr" ? "Quitter la salle d'attente" : "Leave waiting room"}
            aria-label="Quitter"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d] px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full shadow-sm">
            <span>{isChallengeMode ? "⚡ DÉFI ENTRE AMIS" : "SALLE D'ATTENTE LIVE"}</span>
          </div>

          {/* PIN Card */}
          <div className="p-3 bg-stone-50 dark:bg-black/40 rounded-2xl border border-stone-200 dark:border-white/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400 mb-0.5">
              {language === "fr" ? "Code PIN de la session" : "Session PIN Code"}
            </span>
            <span className="text-3xl font-mono font-black tracking-widest text-[#9e7d32] dark:text-[#d6b26d]">
              {formattedPin}
            </span>
          </div>

          {/* Connected players counter & avatar list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-zinc-400 px-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{language === "fr" ? "Participants connectés" : "Connected players"}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] font-mono">
                {state.playerCount}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-h-36 overflow-y-auto p-2 bg-stone-50 dark:bg-black/30 rounded-2xl border border-stone-200/80 dark:border-white/10">
              {Object.values(state.players).map((p) => (
                <div
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#16161f] border border-stone-200 dark:border-white/10 text-xs font-semibold shadow-sm"
                >
                  <span className="text-base">{p.avatar}</span>
                  <span className="truncate max-w-[100px] text-neutral-900 dark:text-zinc-100">{p.name}</span>
                  {p.id === playerId && (
                    <span className="text-[10px] text-[#9e7d32] dark:text-[#d6b26d] font-bold">
                      ({language === "fr" ? "Moi" : "Me"})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Invite Button */}
          <div className="pt-1">
            <WhatsAppShareButton
              pin={state.pin}
              playerUrl={playerDirectUrl}
              variant="primary"
              customLabel={language === "fr" ? "Inviter des amis sur WhatsApp" : "Invite friends on WhatsApp"}
              customShareText={
                language === "fr"
                  ? `⚡ *Défi Quiz Nouveau Départ entre Amis !* ⚡\n\nRejoins notre partie en direct dès maintenant !\n\n👉 *Lien direct pour jouer :*\n${playerDirectUrl}\n\n🔑 *Code PIN :* ${formattedPin}\n\nQui sera sur le podium ? 🏆`
                  : `⚡ *New Beginnings Friend Challenge!* ⚡\n\nJoin our live game right now!\n\n👉 *Direct link :*\n${playerDirectUrl}\n\n🔑 *PIN Code :* ${formattedPin}\n\nWho takes the podium? 🏆`
              }
            />
          </div>

          {/* Host launch controls vs participant waiting message */}
          {isHostPlayer ? (
            <div className="space-y-1.5 pt-2 border-t border-stone-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={() => sendHostAction({ type: "start_quiz" })}
                className="w-full py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t("challengeStartQuizHost")} ({state.playerCount})</span>
              </button>
              <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                {language === "fr"
                  ? "Dès que vos amis ont rejoint, cliquez pour lancer la 1ère question !"
                  : "As soon as your friends have joined, click to launch the 1st question!"}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-stone-100 dark:bg-black/50 rounded-2xl border border-stone-200 dark:border-white/10 text-xs text-stone-600 dark:text-neutral-400 leading-relaxed flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-ping shrink-0" />
              <span>
                {isChallengeMode
                  ? language === "fr"
                    ? "En attente que l'organisateur lance le défi..."
                    : "Waiting for the organizer to start the challenge..."
                  : language === "fr"
                  ? "Regardez l'écran de l'enseignant. Le quiz va bientôt commencer !"
                  : "Watch the teacher's screen. The quiz will start soon!"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. QUESTION SCREEN (4 BIG TOUCH BUTTONS + DIRECT QUESTION TEXT)
  if (state.status === "question" && state.currentQuestion) {
    const q = state.currentQuestion;
    const hasAnswered = myPlayer?.answered;

    if (hasAnswered) {
      return (
        <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 pb-24 sm:pb-8 text-center select-none relative overflow-hidden [isolation:isolate]">
          <div className="relative z-10 w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-8 shadow-2xl space-y-4 animate-scale-in before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-lg shadow-emerald-500/15">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">
              {language === "fr" ? "Réponse enregistrée !" : "Answer recorded!"}
            </h2>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-zinc-300 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200/80 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                {language === "fr"
                  ? `${state.answersCount} / ${state.playerCount} réponses reçues`
                  : `${state.answersCount} / ${state.playerCount} answers received`}
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              {language === "fr"
                ? "Dès que tout le monde a répondu ou à la fin du chrono, les résultats s'affichent !"
                : "As soon as everyone answers or time runs out, the results will appear!"}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col justify-between p-2 sm:p-6 pb-24 sm:pb-8 select-none relative overflow-hidden [isolation:isolate]">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between py-2 sm:py-4">
          {/* Top Header with Q counter, Timer and Score */}
          <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-white/10 pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d]">
              Q{state.currentQuestionIndex + 1} / {state.totalQuestions}
            </div>
            <div className="flex items-center gap-2">
              {/* Countdown badge */}
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  secondsLeft <= 5
                    ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse border border-rose-500/30"
                    : "bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] border border-[#c5a059]/30"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{secondsLeft}s</span>
              </div>
              <div className="text-xs font-mono font-semibold text-stone-600 dark:text-neutral-400">
                {myPlayer?.name} • <span className="text-[#9e7d32] dark:text-[#d6b26d] font-bold">{myPlayer?.score} pts</span>
              </div>
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

  // 4. REVEAL / VERDICT SCREEN (PERSONALIZED RESULT + LIVE SCOREBOARD)
  if (state.status === "reveal") {
    const isCorrect = myPlayer?.lastSelectedOptionId === state.correctAnswerId;
    const points = myPlayer?.lastPointsEarned || 0;

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-3 sm:p-6 pb-24 sm:pb-8 text-center select-none relative overflow-hidden [isolation:isolate] space-y-4">
        {/* Personal outcome card */}
        <div
          className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl space-y-3 animate-scale-in before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent relative overflow-hidden ${
            isCorrect
              ? "bg-emerald-50 dark:bg-[#112419] border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 shadow-emerald-500/10 dark:shadow-emerald-950/40"
              : "bg-rose-50 dark:bg-[#251216] border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100 shadow-rose-500/10 dark:shadow-rose-950/40"
          }`}
        >
          <div className="text-4xl">
            {isCorrect ? "🎉" : "😅"}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black">
              {isCorrect
                ? language === "fr"
                  ? "Bonne Réponse !"
                  : "Correct Answer!"
                : language === "fr"
                ? "Pas Tout à Fait..."
                : "Not Quite..."}
            </h2>
            {isCorrect ? (
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                +{points} pts
              </div>
            ) : (
              <div className="text-xs font-semibold text-rose-600 dark:text-rose-300">
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

        {/* Live Standings between friends in Challenge Mode */}
        {isChallengeMode && state.leaderboard.length > 0 && (
          <div className="w-full max-w-sm bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-4 shadow-xl space-y-2.5 mx-auto">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-zinc-400 border-b border-stone-200/80 dark:border-white/10 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{language === "fr" ? "Classement en direct" : "Live Standings"}</span>
              </span>
              <span>Points</span>
            </div>
            <div className="space-y-1.5">
              {state.leaderboard.slice(0, 5).map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all ${
                    p.id === playerId
                      ? "bg-[#c5a059]/15 border border-[#c5a059]/40 text-neutral-900 dark:text-white"
                      : "bg-stone-50 dark:bg-white/5 border border-transparent text-stone-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-center font-bold text-stone-500 dark:text-zinc-400">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                    </span>
                    <span>{p.avatar}</span>
                    <span className="truncate max-w-[120px]">{p.name}</span>
                    {p.streak > 1 && (
                      <span className="text-[10px] text-amber-500 font-bold flex items-center">
                        🔥{p.streak}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d]">
                    {p.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Creator control: Next Question or Final Podium */}
        {isHostPlayer ? (
          <button
            type="button"
            onClick={() => {
              if (state.currentQuestionIndex + 1 < state.totalQuestions) {
                sendHostAction({ type: "next_question" });
              } else {
                sendHostAction({ type: "end_quiz" });
              }
            }}
            className="w-full max-w-sm mx-auto py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span>
              {state.currentQuestionIndex + 1 < state.totalQuestions
                ? t("challengeNextQuestionBtn")
                : language === "fr"
                ? "Découvrir le Podium Final 🏆"
                : "Reveal the Final Podium 🏆"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-stone-500 dark:text-zinc-400 text-center py-1 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
            <span>{language === "fr" ? "En attente de la suite..." : "Waiting for next question..."}</span>
          </div>
        )}
      </div>
    );
  }

  // 5. LEADERBOARD / INTERMEDIATE STANDING
  if (state.status === "leaderboard") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 pb-24 sm:pb-8 text-center select-none relative overflow-hidden [isolation:isolate]">
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

          {isHostPlayer ? (
            <button
              type="button"
              onClick={() => sendHostAction({ type: "next_question" })}
              className="w-full py-3 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              {t("challengeNextQuestionBtn")}
            </button>
          ) : (
            <p className="text-xs text-stone-500 dark:text-neutral-400">
              {language === "fr"
                ? "Regardez l'écran pour la suite !"
                : "Watch the screen for what's next!"}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 6. FINISHED GAME SCREEN (PODIUM & 1-CLICK WHATSAPP SHARE)
  if (state.status === "finished") {
    const myRank = state.leaderboard.find((p) => p.id === playerId)?.rank || "-";
    const winner = state.leaderboard[0];
    const second = state.leaderboard[1];
    const third = state.leaderboard[2];

    const shareResultsText =
      language === "fr"
        ? `🏆 *Résultats du Défi Quiz Nouveau Départ !* 🏆\n\n🥇 1er : ${winner?.avatar || "👑"} ${winner?.name || "Champion"} (${winner?.score || 0} pts)\n${second ? `🥈 2ème : ${second.avatar} ${second.name} (${second.score} pts)\n` : ""}${third ? `🥉 3ème : ${third.avatar} ${third.name} (${third.score} pts)\n` : ""}\nBravo à tous pour ce beau moment ! Qui relève le prochain défi ? 🚀`
        : `🏆 *New Beginnings Friend Challenge Results!* 🏆\n\n🥇 1st : ${winner?.avatar || "👑"} ${winner?.name || "Champion"} (${winner?.score || 0} pts)\n${second ? `🥈 2nd : ${second.avatar} ${second.name} (${second.score} pts)\n` : ""}${third ? `🥉 3rd : ${third.avatar} ${third.name} (${third.score} pts)\n` : ""}\nGreat game everyone! Who wants a rematch? 🚀`;

    return (
      <div className="min-h-[75vh] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-3 sm:p-6 pb-24 sm:pb-8 text-center select-none relative overflow-hidden [isolation:isolate]">
        <div className="w-full max-w-sm sm:max-w-md bg-white/95 dark:bg-[#121217] border border-stone-200/90 dark:border-[#c5a059]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent relative overflow-hidden">
          {/* Close button */}
          <Link
            href="/"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 text-stone-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-all active:scale-95 z-20 shadow-sm"
            title={language === "fr" ? "Retour à l'accueil" : "Back to Home"}
            aria-label="Quitter"
          >
            <X className="w-4 h-4" />
          </Link>

          {/* Crown & Title */}
          <div className="space-y-1">
            <div className="text-4xl">👑</div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              {isChallengeMode ? "Podium du Défi !" : language === "fr" ? "Partie Terminée !" : "Game Over!"}
            </h2>
            {winner && (
              <p className="text-xs font-semibold text-[#9e7d32] dark:text-[#d6b26d]">
                {winner.name} {t("challengeWinnerAnnounce")}
              </p>
            )}
          </div>

          {/* Visual Friend Podium (Top 3) */}
          {state.leaderboard.length > 0 && (
            <div className="grid grid-cols-3 gap-2 items-end pt-3 pb-2 px-1">
              {/* 2nd place (Silver) */}
              <div className="flex flex-col items-center">
                {second ? (
                  <>
                    <div className="text-2xl mb-1">{second.avatar}</div>
                    <span className="text-xs font-bold truncate max-w-[80px]">{second.name}</span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-400">{second.score} pts</span>
                    <div className="w-full h-16 bg-stone-200 dark:bg-white/10 rounded-t-xl mt-1.5 flex items-center justify-center font-bold text-stone-600 dark:text-zinc-300 text-sm">
                      🥈 2
                    </div>
                  </>
                ) : (
                  <div className="w-full h-16 border border-dashed border-stone-200 dark:border-white/10 rounded-t-xl" />
                )}
              </div>

              {/* 1st place (Gold Champion) */}
              <div className="flex flex-col items-center">
                {winner && (
                  <>
                    <Crown className="w-5 h-5 text-amber-500 fill-amber-500 mb-0.5 animate-bounce" />
                    <div className="text-3xl mb-1">{winner.avatar}</div>
                    <span className="text-xs font-bold truncate max-w-[85px] text-[#9e7d32] dark:text-[#d6b26d]">{winner.name}</span>
                    <span className="text-[10px] font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d]">{winner.score} pts</span>
                    <div className="w-full h-24 bg-gradient-to-t from-[#c5a059]/40 to-[#c5a059]/20 border-t-2 border-[#c5a059] rounded-t-xl mt-1.5 flex items-center justify-center font-black text-[#9e7d32] dark:text-[#d6b26d] text-base shadow-lg shadow-[#c5a059]/10">
                      🥇 1
                    </div>
                  </>
                )}
              </div>

              {/* 3rd place (Bronze) */}
              <div className="flex flex-col items-center">
                {third ? (
                  <>
                    <div className="text-2xl mb-1">{third.avatar}</div>
                    <span className="text-xs font-bold truncate max-w-[80px]">{third.name}</span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-400">{third.score} pts</span>
                    <div className="w-full h-12 bg-amber-900/20 dark:bg-amber-950/40 rounded-t-xl mt-1.5 flex items-center justify-center font-bold text-amber-700 dark:text-amber-500 text-sm">
                      🥉 3
                    </div>
                  </>
                ) : (
                  <div className="w-full h-12 border border-dashed border-stone-200 dark:border-white/10 rounded-t-xl" />
                )}
              </div>
            </div>
          )}

          {/* Personal result summary */}
          <div className="p-3 bg-stone-50 dark:bg-black/40 rounded-2xl border border-stone-200/80 dark:border-white/10 text-xs">
            <span className="text-stone-500 dark:text-zinc-400 font-semibold">
              {language === "fr" ? "Votre classement personnel :" : "Your personal rank:"}{" "}
            </span>
            <span className="font-bold text-[#9e7d32] dark:text-[#d6b26d] font-mono">
              #{myRank} ({myPlayer?.score || 0} pts)
            </span>
          </div>

          {/* 1-Click WhatsApp Share of Results */}
          <div>
            <WhatsAppShareButton
              pin={state.pin}
              playerUrl={`${getPublicAppBaseUrl()}/live?pin=${state.pin}`}
              variant="primary"
              customLabel={t("challengeShareResultsWhatsApp")}
              customShareText={shareResultsText}
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-stone-200/80 dark:border-white/10 space-y-2">
            <button
              type="button"
              onClick={() => {
                setActivePin(null);
                setPlayerId(null);
                setHostToken(null);
                setLiveTab("challenge");
              }}
              className="w-full py-3 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("challengeRematchBtn")}</span>
            </button>

            <Link
              href="/"
              className="block w-full py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-zinc-200 font-bold text-xs transition-colors"
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
