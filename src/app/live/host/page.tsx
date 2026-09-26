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
import { allCourses } from "@/data/courses";

const OPTION_STYLES = [
  {
    card: "bg-white dark:bg-[#121217] border-stone-200/90 dark:border-white/10 hover:border-[#8a2230]/50 shadow-sm",
    badge: "bg-[#8a2230] text-white border border-[#b93849]/50",
    borderAccent: "border-l-4 border-l-[#8a2230]",
    symbol: "▲",
    label: "A",
  },
  {
    card: "bg-white dark:bg-[#121217] border-stone-200/90 dark:border-white/10 hover:border-[#244c74]/50 shadow-sm",
    badge: "bg-[#244c74] text-white border border-[#3b75ab]/50",
    borderAccent: "border-l-4 border-l-[#244c74]",
    symbol: "◆",
    label: "B",
  },
  {
    card: "bg-white dark:bg-[#121217] border-stone-200/90 dark:border-white/10 hover:border-[#c5a059]/60 shadow-sm",
    badge: "bg-[#c5a059] text-zinc-950 border border-[#d6b26d]/60 font-bold",
    borderAccent: "border-l-4 border-l-[#c5a059]",
    symbol: "●",
    label: "C",
  },
  {
    card: "bg-white dark:bg-[#121217] border-stone-200/90 dark:border-white/10 hover:border-[#1d5c41]/50 shadow-sm",
    badge: "bg-[#1d5c41] text-white border border-[#34946b]/50",
    borderAccent: "border-l-4 border-l-[#1d5c41]",
    symbol: "■",
    label: "D",
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
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-scale-in relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d]">
              {language === "fr" ? "Rejoindre en direct" : "Join Live"}
            </span>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-600 dark:text-zinc-400 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-black/60 rounded-2xl border border-stone-200 dark:border-white/10">
            <div className="text-xs text-stone-500 dark:text-neutral-400 mb-1 font-semibold uppercase tracking-wider">
              {language === "fr" ? "Code PIN du Jeu" : "Game PIN Code"}
            </div>
            <div className="text-4xl font-mono font-black text-[#9e7d32] dark:text-[#d6b26d] tracking-widest">
              {state.pin.slice(0, 3)} {state.pin.slice(3)}
            </div>
          </div>

          <div className="flex justify-center py-1">
            <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200 dark:border-white/10">
              <QRCodeDisplay url={playerUrl} size={180} />
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-neutral-400 leading-relaxed">
            {language === "fr"
              ? "Scannez directement avec l'appareil photo ou allez sur :"
              : "Scan directly with your camera or go to:"}<br />
            <span className="font-mono text-stone-800 dark:text-neutral-200 font-bold break-all">{playerUrl}</span>
          </p>

          <button
            type="button"
            onClick={() => setShowQrModal(false)}
            className="w-full py-3 bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold rounded-full text-sm transition-colors shadow-lg active:scale-95"
          >
            {language === "fr" ? "Fermer et continuer" : "Close and continue"}
          </button>
        </div>
      </div>
    );
  };

  // 1. SETUP SCREEN
  if (!pin || !state) {
    return (
      <div className="min-h-[85vh] text-neutral-900 dark:text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden [isolation:isolate]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl bg-white dark:bg-[#121217] border border-stone-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-ping" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#9e7d32] dark:text-[#d6b26d]">
              {language === "fr"
                ? "Session Enseignant • Live Zoom & Présentiel"
                : "Teacher Session • Live Zoom & In-Person"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-light tracking-tight mb-2">
            <span className="font-semibold">{language === "fr" ? "Créer une Session" : "Create a Live"}</span> {language === "fr" ? "Live" : "Session"}
          </h1>
          <p className="text-neutral-500 dark:text-zinc-400 text-sm mb-8">
            {language === "fr"
              ? "Générez un code PIN pour animer un quiz interactif synchronisé avec vos participants sur Zoom ou vidéoprojecteur."
              : "Generate a PIN code to run a synchronized interactive quiz with your participants on Zoom or projector."}
          </p>

          <div className="space-y-6">
            {/* Week selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-300 mb-2">
                {language === "fr" ? "Chapitre / Thématique" : "Chapter / Topic"}
              </label>
              <select
                value={weekId}
                onChange={(e) => setWeekId(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none transition-colors"
              >
                {allCourses.map((c) => (
                  <option key={c.id} value={c.id} className="bg-white dark:bg-[#121217] text-neutral-900 dark:text-zinc-100">
                    {language === "fr" ? "Semaine" : "Week"} {c.weekNumber} : {c.title[language] || c.title.fr}
                  </option>
                ))}
                <option value="all" className="bg-white dark:bg-[#121217] text-neutral-900 dark:text-zinc-100">
                  {language === "en" ? "All weeks combined" : "Toutes les semaines combinées"}
                </option>
              </select>
            </div>

            {/* Timer selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-300 mb-2">
                {language === "fr" ? "Temps de réponse par question" : "Time limit per question"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 20, 30].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setTimerSeconds(sec)}
                    className={`py-3 rounded-2xl border text-sm font-bold transition-all active:scale-95 ${
                      timerSeconds === sec
                        ? "bg-neutral-900 text-white dark:bg-[#c5a059] dark:text-zinc-950 border-neutral-900 dark:border-[#c5a059] shadow-md"
                        : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:border-[#c5a059]/40 text-neutral-700 dark:text-zinc-300"
                    }`}
                  >
                    {sec} {language === "fr" ? "secondes" : "seconds"}
                  </button>
                ))}
              </div>
            </div>

            {/* Question count */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-zinc-300 mb-2">
                {language === "fr" ? "Nombre de questions" : "Number of questions"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 8, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-2xl border text-sm font-bold transition-all active:scale-95 ${
                      questionCount === count
                        ? "bg-neutral-900 text-white dark:bg-[#c5a059] dark:text-zinc-950 border-neutral-900 dark:border-[#c5a059] shadow-md"
                        : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:border-[#c5a059]/40 text-neutral-700 dark:text-zinc-300"
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
              className="w-full mt-4 bg-neutral-900 hover:bg-black text-white dark:bg-[#c5a059] dark:hover:bg-[#d6b26d] dark:text-zinc-950 font-bold py-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-base active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-[#c5a059] dark:text-zinc-950" />
              {language === "fr" ? "Lancer la Salle d'Attente" : "Open Waiting Room"}
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
      <div className="min-h-[85vh] text-neutral-900 dark:text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden [isolation:isolate] bg-white/95 dark:bg-[#0f0f14] border border-stone-200/90 dark:border-white/10 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-pulse" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d]">
              {language === "fr"
                ? "Nouveau Départ • Salle d'Attente Live"
                : "New Beginnings • Live Waiting Room"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white dark:bg-[#121217] border border-stone-200 dark:border-white/10 hover:border-[#c5a059]/40 text-stone-700 dark:text-neutral-300 transition-colors shadow-sm"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedLink
                ? language === "fr" ? "Lien copié !" : "Link copied!"
                : language === "fr" ? "Copier le lien direct" : "Copy direct link"}
            </button>
          </div>
        </div>

        {/* Central Display: Huge PIN & QR Code */}
        <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto w-full py-8">
          {/* Instructions & PIN */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-stone-600 dark:text-neutral-400 text-sm font-medium">
              {language === "fr"
                ? "Sur votre smartphone, rejoignez la partie en saisissant le code PIN :"
                : "On your smartphone, join the game by entering the PIN code:"}
            </p>

            <div className="inline-block p-6 sm:p-8 bg-white dark:bg-[#121217] border border-stone-200 dark:border-[#c5a059]/30 rounded-3xl shadow-xl shadow-stone-200/50 dark:shadow-[#c5a059]/10 backdrop-blur-md relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
              <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-[#d6b26d] font-bold block mb-1">
                {language === "fr" ? "Code PIN du Jeu" : "Game PIN Code"}
              </span>
              <div className="text-5xl sm:text-7xl font-black tracking-widest text-[#9e7d32] dark:text-[#d6b26d] font-mono">
                {state.pin.slice(0, 3)} {state.pin.slice(3)}
              </div>
            </div>

            <div className="text-xs text-stone-500 dark:text-neutral-400">
              {language === "fr" ? "Ou accédez à l'adresse web :" : "Or visit the web address:"}{" "}
              <span className="text-stone-800 dark:text-neutral-200 font-mono font-bold">
                {playerUrl.replace(/https?:\/\//, "")}
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-white rounded-3xl shadow-xl border border-stone-200 dark:border-white/20">
              <QRCodeDisplay url={playerUrl} size={220} />
            </div>
            <p className="text-xs text-stone-500 dark:text-neutral-400 font-medium">
              {language === "fr"
                ? "Scannez directement avec l'appareil photo de votre téléphone"
                : "Scan directly with your phone's camera"}
            </p>
          </div>
        </div>

        {/* Players Waiting List & Start Button */}
        <div className="relative z-10 border-t border-stone-200 dark:border-white/10 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#c5a059]" />
              <span className="text-lg font-bold text-neutral-900 dark:text-white">
                {language === "fr"
                  ? `${playersList.length} participant${playersList.length > 1 ? "s" : ""} connecté${playersList.length > 1 ? "s" : ""}`
                  : `${playersList.length} participant${playersList.length > 1 ? "s" : ""} connected`}
              </span>
            </div>

            <button
              onClick={() => sendHostAction({ type: "start_quiz" })}
              disabled={playersList.length === 0}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-lg transition-all shadow-xl active:scale-95 ${
                playersList.length > 0
                  ? "bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 hover:scale-105 shadow-[#c5a059]/20"
                  : "bg-stone-200 dark:bg-white/10 text-stone-400 dark:text-neutral-500 cursor-not-allowed"
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              {language === "fr"
                ? `Démarrer le Quiz (${playersList.length})`
                : `Start Quiz (${playersList.length})`}
            </button>
          </div>

          {/* Player badges */}
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2">
            {playersList.length === 0 ? (
              <div className="text-stone-400 dark:text-neutral-500 text-sm italic py-2">
                {language === "fr"
                  ? "En attente des premiers participants..."
                  : "Waiting for participants to join..."}
              </div>
            ) : (
              playersList.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#121217] border border-stone-200 dark:border-white/10 rounded-full text-sm font-semibold text-stone-800 dark:text-neutral-200 shadow-sm animate-scale-in"
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
      <div className="min-h-[85vh] text-neutral-900 dark:text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden [isolation:isolate] bg-white/95 dark:bg-[#0f0f14] border border-stone-200/90 dark:border-white/10 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar: Question indicator, Late-joiner PIN, Timer & Answer counter */}
        <div className="relative z-10 flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d]">
              Question {state.currentQuestionIndex + 1} / {state.totalQuestions}
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#121217] hover:bg-stone-50 dark:hover:bg-[#1a1a22] border border-stone-200 dark:border-[#c5a059]/40 rounded-full text-xs font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d] transition-all hover:scale-105 shadow-sm"
              title={language === "fr" ? "Cliquer pour afficher le QR Code pour les retardataires" : "Click to view QR code for late arrivals"}
            >
              <span className="text-[10px] uppercase text-stone-500 dark:text-neutral-400">PIN :</span>
              <span className="tracking-widest">{state.pin}</span>
            </button>
          </div>

          {/* Central Circular / Pill Timer */}
          <div
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-2xl transition-all ${
              secondsLeft <= 5
                ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/40 animate-pulse"
                : "bg-white dark:bg-[#121217] border border-stone-200 dark:border-white/10 text-[#9e7d32] dark:text-[#d6b26d] shadow-sm"
            }`}
          >
            <Clock className="w-5 h-5 text-[#c5a059]" />
            <span>{secondsLeft}s</span>
          </div>

          {/* Answered counter */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-neutral-400 font-semibold">
            <Users className="w-4 h-4 text-[#c5a059]" />
            <span>
              {language === "fr"
                ? `${answeredCount} / ${totalPlayers} ont répondu`
                : `${answeredCount} / ${totalPlayers} answered`}
            </span>
          </div>
        </div>

        {/* Big Question Prompt */}
        <div className="relative z-10 my-auto max-w-4xl mx-auto w-full py-6 text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white drop-shadow-sm">
            {q.text[language] || q.text.fr}
          </h1>

          {q.biblicalReference && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white dark:bg-[#121217] border border-stone-200 dark:border-white/10 rounded-full text-xs text-[#9e7d32] dark:text-[#d6b26d] font-mono shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{q.biblicalReference}</span>
            </div>
          )}
        </div>

        {/* 4 Large Clean Options with Distinctive Badges */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto w-full mb-6">
          {q.options?.map((opt, idx) => {
            const style = OPTION_STYLES[idx % OPTION_STYLES.length];
            return (
              <div
                key={opt.id}
                className={`p-6 sm:p-7 rounded-3xl border flex items-center gap-4 text-left transition-all ${style.card} ${style.borderAccent}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md shrink-0 ${style.badge}`}
                >
                  {style.symbol}
                </div>
                <span className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-zinc-100 leading-snug">
                  {opt.text[language] || opt.text.fr}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom control bar for host */}
        <div className="relative z-10 flex justify-end pt-4 border-t border-stone-200 dark:border-white/10">
          <button
            onClick={() => sendHostAction({ type: "reveal_answer" })}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#121217] hover:bg-stone-50 dark:hover:bg-[#1b1b24] border border-stone-200 dark:border-white/10 hover:border-[#c5a059]/40 text-stone-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white font-bold text-sm transition-colors active:scale-95 shadow-sm"
          >
            {language === "fr" ? "Révéler la réponse" : "Reveal Answer"}
            <ArrowRight className="w-4 h-4 text-[#c5a059]" />
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
      <div className="min-h-[85vh] text-neutral-900 dark:text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden [isolation:isolate] bg-white/95 dark:bg-[#0f0f14] border border-stone-200/90 dark:border-white/10 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d]">
              {language === "fr"
                ? `Résultats • Question ${state.currentQuestionIndex + 1} / ${state.totalQuestions}`
                : `Results • Question ${state.currentQuestionIndex + 1} / ${state.totalQuestions}`}
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#121217] hover:bg-stone-50 dark:hover:bg-[#1a1a22] border border-stone-200 dark:border-[#c5a059]/40 rounded-full text-xs font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d] transition-all hover:scale-105 shadow-sm"
              title={language === "fr" ? "Cliquer pour afficher le QR Code pour les retardataires" : "Click to view QR code for late arrivals"}
            >
              <span className="text-[10px] uppercase text-stone-500 dark:text-neutral-400">PIN :</span>
              <span className="tracking-widest">{state.pin}</span>
            </button>
          </div>

          <button
            onClick={() => sendHostAction({ type: "show_leaderboard" })}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-black text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>{language === "fr" ? "Voir le Classement" : "View Leaderboard"}</span>
            <Trophy className="w-4 h-4" />
          </button>
        </div>

        {/* Central Card: Options with Vote Bars and Correct Answer Highlight */}
        <div className="relative z-10 my-auto max-w-4xl mx-auto w-full py-6 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-neutral-900 dark:text-white drop-shadow-sm">
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
                  className={`relative overflow-hidden p-5 sm:p-6 rounded-3xl border transition-all ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-[#112419] border-emerald-500/70 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/40"
                      : "bg-white dark:bg-[#121217] border-stone-200 dark:border-white/10 opacity-70"
                  }`}
                >
                  {/* Background progress bar of votes */}
                  <div
                    style={{ width: `${percentage}%` }}
                    className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 ${
                      isCorrect ? "bg-emerald-500" : "bg-neutral-400 dark:bg-neutral-500"
                    }`}
                  />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${style.badge}`}
                      >
                        {style.symbol}
                      </div>
                      <span className="font-bold text-base sm:text-lg text-neutral-900 dark:text-zinc-100">
                        {opt.text[language] || opt.text.fr}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      )}
                      <span className="font-mono font-bold text-sm text-stone-600 dark:text-neutral-300">
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
            <div className="p-6 bg-stone-50 dark:bg-[#121217] border border-stone-200 dark:border-[#c5a059]/30 rounded-3xl shadow-lg space-y-2 text-left animate-slide-up relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-300 dark:before:via-white/20 before:to-transparent">
              <div className="flex items-center gap-2 text-[#9e7d32] dark:text-[#d6b26d] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <span>{language === "fr" ? "Éclairage Biblique & Pastoral" : "Biblical & Pastoral Insight"}</span>
                {state.biblicalReference && (
                  <span className="text-stone-500 dark:text-neutral-400">({state.biblicalReference})</span>
                )}
              </div>
              <p className="text-stone-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed font-serif italic">
                « {state.explanation[language] || state.explanation.fr} »
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
      <div className="min-h-[85vh] text-neutral-900 dark:text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden [isolation:isolate] bg-white/95 dark:bg-[#0f0f14] border border-stone-200/90 dark:border-white/10 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#9e7d32] dark:text-[#d6b26d] text-sm font-bold uppercase tracking-widest">
              <Trophy className="w-5 h-5 text-[#c5a059]" />
              <span>
                {language === "fr"
                  ? `Classement Général • Question ${state.currentQuestionIndex + 1} / ${state.totalQuestions}`
                  : `Current Standings • Question ${state.currentQuestionIndex + 1} / ${state.totalQuestions}`}
              </span>
            </div>

            {/* Persistent Late-Joiner PIN badge */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#121217] hover:bg-stone-50 dark:hover:bg-[#1a1a22] border border-stone-200 dark:border-[#c5a059]/40 rounded-full text-xs font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d] transition-all hover:scale-105 shadow-sm"
              title={language === "fr" ? "Cliquer pour afficher le QR Code pour les retardataires" : "Click to view QR code for late arrivals"}
            >
              <span className="text-[10px] uppercase text-stone-500 dark:text-neutral-400">PIN :</span>
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
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-black text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            <span>
              {isLastQuestion
                ? language === "fr" ? "Podium Final !" : "Final Podium!"
                : language === "fr" ? "Question Suivante" : "Next Question"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Central Leaderboard list */}
        <div className="relative z-10 my-auto max-w-2xl mx-auto w-full py-8 space-y-3">
          {topPlayers.map((player, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all ${
                  isFirst
                    ? "bg-[#c5a059]/15 dark:bg-[#c5a059]/20 border-[#c5a059]/40 dark:border-[#c5a059]/50 shadow-lg text-neutral-950 dark:text-white font-extrabold ring-1 ring-[#c5a059]/30"
                    : "bg-stone-50 dark:bg-[#121217] border-stone-200 dark:border-white/10 text-stone-800 dark:text-neutral-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${
                      isFirst
                        ? "bg-[#c5a059] text-zinc-950 font-black"
                        : "bg-stone-200 dark:bg-white/10 text-stone-600 dark:text-neutral-400 font-bold"
                    }`}
                  >
                    #{player.rank}
                  </div>
                  <span className="text-xl">{player.avatar}</span>
                  <span className="text-lg font-bold">{player.name}</span>
                  {player.streak >= 2 && (
                    <span className="flex items-center gap-1 text-xs text-[#9e7d32] dark:text-[#d6b26d] font-bold px-2.5 py-0.5 bg-[#c5a059]/15 dark:bg-[#c5a059]/20 border border-[#c5a059]/30 rounded-full">
                      <Flame className="w-3.5 h-3.5 fill-current text-[#c5a059]" />
                      {player.streak}
                    </span>
                  )}
                </div>

                <div className="font-mono text-xl sm:text-2xl font-black text-[#9e7d32] dark:text-[#d6b26d]">
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
      <div className="min-h-[85vh] text-neutral-900 dark:text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden [isolation:isolate] bg-white/95 dark:bg-[#0f0f14] border border-stone-200/90 dark:border-white/10 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/50 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9e7d32] dark:text-[#d6b26d] px-4 py-1.5 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full shadow-sm">
            <Crown className="w-4 h-4 text-[#c5a059]" />
            <span>{language === "fr" ? "Grand Podium Nouveau Départ" : "New Beginnings Grand Podium"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-white">
            <span className="font-semibold">{language === "fr" ? "Félicitations" : "Congratulations"}</span> {language === "fr" ? "à tous les participants !" : "to all participants!"}
          </h1>
        </div>

        {/* 3D-like Podium */}
        <div className="relative z-10 my-auto max-w-3xl mx-auto w-full flex items-end justify-center gap-4 sm:gap-6 pt-12 pb-6">
          {/* 2nd place (Silver) */}
          {second && (
            <div className="flex flex-col items-center flex-1 max-w-[180px]">
              <div className="text-3xl mb-1">{second.avatar}</div>
              <div className="font-bold text-sm text-stone-800 dark:text-neutral-200 truncate max-w-full mb-1">
                {second.name}
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-neutral-400 mb-2">
                {second.score} pts
              </div>
              <div className="w-full h-44 bg-gradient-to-t from-stone-200 to-stone-100 dark:from-[#1b1b22] dark:to-[#2b2b36] rounded-t-3xl flex items-center justify-center border-t-4 border-stone-400 dark:border-neutral-300 shadow-xl">
                <span className="text-4xl font-black text-stone-600 dark:text-neutral-300">2</span>
              </div>
            </div>
          )}

          {/* 1st place (Gold) */}
          {first && (
            <div className="flex flex-col items-center flex-1 max-w-[200px]">
              <Crown className="w-8 h-8 text-[#d6b26d] animate-bounce mb-1" />
              <div className="text-4xl mb-1">{first.avatar}</div>
              <div className="font-black text-base text-[#9e7d32] dark:text-[#d6b26d] truncate max-w-full mb-1">
                {first.name}
              </div>
              <div className="text-sm font-mono font-bold text-[#9e7d32] dark:text-[#d6b26d] mb-2">
                {first.score} pts
              </div>
              <div className="w-full h-60 bg-gradient-to-t from-[#c5a059] to-[#ebd29b] dark:from-[#8a6825] dark:to-[#c5a059] rounded-t-3xl flex items-center justify-center border-t-4 border-[#9e7d32] dark:border-[#e4c88e] shadow-2xl shadow-[#c5a059]/30">
                <span className="text-6xl font-black text-zinc-950">1</span>
              </div>
            </div>
          )}

          {/* 3rd place (Bronze) */}
          {third && (
            <div className="flex flex-col items-center flex-1 max-w-[180px]">
              <div className="text-3xl mb-1">{third.avatar}</div>
              <div className="font-bold text-sm text-stone-800 dark:text-neutral-200 truncate max-w-full mb-1">
                {third.name}
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-neutral-400 mb-2">
                {third.score} pts
              </div>
              <div className="w-full h-36 bg-gradient-to-t from-amber-100 to-amber-50 dark:from-[#261711] dark:to-[#45281c] rounded-t-3xl flex items-center justify-center border-t-4 border-amber-600/60 dark:border-[#8f522f] shadow-xl">
                <span className="text-4xl font-black text-amber-800 dark:text-[#c5a059]">3</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="relative z-10 flex items-center justify-center gap-4 pt-6 border-t border-stone-200 dark:border-white/10">
          <button
            onClick={() => {
              setPin(null);
              setHostToken(null);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-[#121217] border border-stone-200 dark:border-white/10 hover:border-[#c5a059]/40 text-stone-800 dark:text-neutral-300 font-bold text-sm transition-colors active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-stone-500 dark:text-neutral-400" />
            {language === "fr" ? "Nouvelle Session" : "New Session"}
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#c5a059] hover:bg-[#d6b26d] text-zinc-950 font-bold text-sm transition-colors shadow-lg active:scale-95"
          >
            {language === "fr" ? "Retour aux Cours" : "Back to Courses"}
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
