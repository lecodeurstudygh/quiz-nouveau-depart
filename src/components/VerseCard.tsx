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

// Nature-inspired gradient themes with Hillsong Preludes depth (warm organic dark undertones)
const CARD_BACKGROUND_THEMES = [
  "from-[#221c17] via-[#16120f] to-[#0c0a08]",   // Warm Amber & Cello
  "from-[#1c1c24] via-[#14141a] to-[#0c0c10]",   // Grand Piano Ebony
  "from-[#241d16] via-[#18130e] to-[#0f0b08]",   // Acoustic Sand & Sun
  "from-[#19201c] via-[#121614] to-[#0b0e0c]",   // Olive Mountain Dusk
  "from-[#231b26] via-[#17111a] to-[#0e0a11]",   // Twilight Meditation
  "from-[#181e24] via-[#11151a] to-[#0a0d11]",   // Quiet Waters Deep
  "from-[#261b1e] via-[#191114] to-[#100a0d]",   // Velvet Evening Bronze
  "from-[#1c1d26] via-[#13141a] to-[#0c0c11]",   // Celestial Horizon
  "from-[#251f16] via-[#19140e] to-[#0f0b08]",   // Sanctuary Hearth
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
        colors: ["#c5a059", "#e4c88e", "#ffffff"],
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
          className={`card-face card-face-front rounded-3xl p-6 flex flex-col justify-between shadow-2xl border border-white/10 border-t-white/20 bg-neutral-950 bg-gradient-to-br ${gradientTheme} hover:border-[#c5a059]/40 transition-all duration-300`}
        >
          {/* Ambient overlay & subtle acoustic glow */}
          <div className="absolute inset-0 bg-neutral-950/45 pointer-events-none rounded-3xl" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c5a059]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar on Card Front */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900/90 text-[#c5a059] border border-white/10 shadow-sm">
              {verse.isKeyVerse && <Sparkles className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />}
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
              className={`p-2 rounded-full transition-all duration-200 ${
                isMemorized
                  ? "bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/25 font-bold"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
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
            <span className="inline-block text-[11px] font-bold text-[#c5a059] tracking-widest uppercase">
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
            <p className="text-xs text-neutral-300/80 font-mono tracking-wider">
              {language === "fr" ? "Version Segond 21" : "NIV Translation"}
            </p>
          </div>

          {/* Bottom hint to flip */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 gap-2">
            <span className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-medium truncate max-w-[60%]">
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span className="truncate">{verse.book[language]} {verse.chapter}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] group-hover:text-[#c5a059] transition-colors shrink-0">
              <Rotate3d className="w-3.5 h-3.5 animate-pulse" />
              <span>{t("flipCardInstruction")}</span>
            </span>
          </div>
        </div>

        {/* ================= VERSO (BACK) ================= */}
        <div
          className={`card-face card-face-back rounded-3xl p-6 flex flex-col justify-between shadow-2xl border border-[#c5a059]/30 border-t-[#c5a059]/50 bg-neutral-950 bg-gradient-to-tr ${gradientTheme}`}
        >
          {/* Contrast-enhancing readability backdrop */}
          <div className="absolute inset-0 bg-[#0c0c0e]/95 pointer-events-none rounded-3xl" />

          {/* Verso Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-sm font-bold text-[#c5a059] tracking-tight truncate">
                {verse.reference[language]}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10 shrink-0">
                {verse.translation[language]}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-full text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
                className={`p-1.5 rounded-full transition-colors ${
                  isMemorized
                    ? "bg-[#c5a059] text-black font-bold"
                    : "text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
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
            <p className="text-base sm:text-lg leading-relaxed font-serif text-neutral-100 italic">
              « {verse.text[language]} »
            </p>
            {verse.context && (
              <p className="mt-3 text-xs text-[#e4c88e]/90 leading-normal border-l-2 border-[#c5a059]/60 pl-2.5 font-sans">
                {verse.context[language]}
              </p>
            )}
          </div>

          {/* Verso Footer Actions */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span
              className={`text-[11px] font-semibold flex items-center gap-1 ${
                isMemorized ? "text-emerald-400" : "text-neutral-400"
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

            <span className="flex items-center gap-1 text-[11px] text-neutral-400 group-hover:text-[#c5a059] transition-colors">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>{t("flipCardInstruction")}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
