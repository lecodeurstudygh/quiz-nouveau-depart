"use client";

import React, { useState } from "react";
import { BibleVerse } from "@/types/course";
import { useLanguage } from "@/context/LanguageContext";
import {
  Rotate3d,
  BookmarkCheck,
  Bookmark,
  Copy,
  Check,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";

interface VerseCardProps {
  verse: BibleVerse;
  isMemorized: boolean;
  onToggleMemorized: (id: string) => void;
  className?: string;
}

// Nature-inspired gradient themes that provide visual depth behind cards
const CARD_BACKGROUND_THEMES = [
  "from-slate-900 via-indigo-950 to-slate-950", // Midnight mountain
  "from-blue-950 via-cyan-950 to-slate-950",    // Ocean mist
  "from-amber-950/80 via-stone-900 to-slate-950", // Golden dawn
  "from-emerald-950 via-slate-900 to-slate-950", // Forest serenity
  "from-purple-950 via-slate-900 to-slate-950",  // Twilight summit
  "from-teal-950 via-slate-900 to-slate-950",    // Celestial stream
  "from-rose-950/70 via-slate-900 to-slate-950",  // Sunset glow
  "from-sky-950 via-indigo-950 to-slate-950",    // Alpine horizon
  "from-amber-950/60 via-slate-950 to-slate-900", // Sacred desert
];

export const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  isMemorized,
  onToggleMemorized,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const { language, t } = useLanguage();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${verse.reference[language]} (${verse.translation[language]}) : « ${verse.text[language]} »`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleMemorized = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMemorized) {
      // Trigger a gentle celebratory confetti burst safely
      triggerConfetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#f59e0b", "#fbbf24", "#38bdf8"],
      });
    }
    onToggleMemorized(verse.id);
  };

  const bgIndex = (verse.bgImageIndex || 0) % CARD_BACKGROUND_THEMES.length;
  const gradientTheme = CARD_BACKGROUND_THEMES[bgIndex];

  return (
    <div className={`group w-full perspective-1000 select-none ${className || "h-[380px] sm:h-[400px]"}`}>
      <div
        onClick={handleCardClick}
        className={`card-inner ${isFlipped ? "is-flipped" : ""}`}
      >
        {/* ================= RECTO (FRONT) ================= */}
        <div
          className={`card-face card-face-front rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-white/10 bg-slate-950 bg-gradient-to-br ${gradientTheme}`}
        >
          {/* Ambient overlay & subtle glow */}
          <div className="absolute inset-0 bg-slate-950/50 pointer-events-none rounded-3xl" />
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar on Card Front */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-amber-300 border border-white/10">
              {verse.isKeyVerse && <Sparkles className="w-3.5 h-3.5 fill-amber-300" />}
              {verse.isKeyVerse
                ? language === "fr"
                  ? "Verset Clé"
                  : "Key Verse"
                : t("weekBadge")}
            </span>

            {/* Memorized toggle star / bookmark */}
            <button
              type="button"
              onClick={handleToggleMemorized}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isMemorized
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10"
              }`}
              title={isMemorized ? t("unmemorizeBtn") : t("memorizeBtn")}
            >
              {isMemorized ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Center: Prominent Scripture Reference & Theme */}
          <div className="relative z-10 my-auto text-center space-y-2.5 px-3 max-w-full overflow-hidden">
            <span className="inline-block text-[11px] font-bold text-amber-400/90 tracking-widest uppercase">
              {verse.theme[language]}
            </span>
            <h3
              className={`font-serif font-black tracking-tight text-white drop-shadow-md break-words hyphens-auto leading-tight max-w-full ${
                verse.reference[language].length > 18
                  ? "text-xl sm:text-2xl"
                  : verse.reference[language].length > 13
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl"
              }`}
            >
              {verse.reference[language]}
            </h3>
            <p className="text-xs text-slate-300/80 font-mono tracking-wider">
              {language === "fr" ? "Version Segond 21" : "NIV Translation"}
            </p>
          </div>

          {/* Bottom hint to flip */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium truncate max-w-[60%]">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{verse.book[language]} {verse.chapter}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] group-hover:text-amber-300 transition-colors shrink-0">
              <Rotate3d className="w-3.5 h-3.5 animate-pulse" />
              <span>{t("flipCardInstruction")}</span>
            </span>
          </div>
        </div>

        {/* ================= VERSO (BACK) ================= */}
        <div
          className={`card-face card-face-back rounded-3xl p-6 flex flex-col justify-between shadow-2xl border border-amber-500/30 bg-slate-950 bg-gradient-to-tr ${gradientTheme}`}
        >
          {/* Contrast-enhancing readability backdrop */}
          <div className="absolute inset-0 bg-slate-950/95 pointer-events-none rounded-3xl" />

          {/* Verso Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-sm font-bold text-amber-300 tracking-tight truncate">
                {verse.reference[language]}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10 shrink-0">
                {verse.translation[language]}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title={t("copyVerseBtn")}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Memorized toggle */}
              <button
                type="button"
                onClick={handleToggleMemorized}
                className={`p-1.5 rounded-lg transition-colors ${
                  isMemorized
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
                title={isMemorized ? t("unmemorizeBtn") : t("memorizeBtn")}
              >
                {isMemorized ? (
                  <BookmarkCheck className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Verso Scripture Text Content */}
          <div className="relative z-10 my-auto py-2 overflow-y-auto max-h-[260px] sm:max-h-[340px] pr-1">
            <p className="text-base sm:text-lg leading-relaxed font-serif text-slate-100 italic">
              « {verse.text[language]} »
            </p>
            {verse.context && (
              <p className="mt-3 text-xs text-amber-200/80 leading-normal border-l-2 border-amber-500/50 pl-2.5 font-sans">
                {verse.context[language]}
              </p>
            )}
          </div>

          {/* Verso Footer Actions */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span
              className={`text-[11px] font-semibold flex items-center gap-1 ${
                isMemorized ? "text-emerald-400" : "text-slate-400"
              }`}
            >
              {isMemorized ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>{t("memorized")}</span>
                </>
              ) : (
                <span>{t("toReview")}</span>
              )}
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-amber-300 transition-colors">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>{t("flipCardInstruction")}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
