"use client";

import React, { useState } from "react";
import { DiscussionCard as DiscussionCardType } from "@/types/course";
import { useLanguage } from "@/context/LanguageContext";
import {
  Rotate3d,
  BookmarkCheck,
  Bookmark,
  Copy,
  Check,
  MessageSquareText,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { VersePill, InteractiveAnswerText } from "./VersePill";
import { findVerseByReference } from "@/data/versesLookup";

interface DiscussionCardProps {
  card: DiscussionCardType;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  className?: string;
}

// Nature-inspired spiritual gradient themes for visual depth
const DISCUSSION_THEMES = [
  "from-slate-900 via-indigo-950 to-slate-950",
  "from-amber-950/80 via-stone-900 to-slate-950",
  "from-blue-950 via-slate-900 to-slate-950",
  "from-emerald-950 via-stone-900 to-slate-950",
  "from-purple-950 via-slate-900 to-slate-950",
  "from-teal-950 via-slate-900 to-slate-950",
];

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  card,
  isBookmarked = false,
  onToggleBookmark,
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
    const qText = card.question[language];
    const aText = card.answer[language];
    const scriptures = card.scriptureRefs?.[language] || [];

    let scripturesSection = "";
    if (scriptures.length > 0) {
      const header = language === "fr" ? "Références bibliques :" : "Scripture References:";
      const formatted = scriptures
        .map((ref) => {
          const detail = findVerseByReference(ref, language);
          if (detail && detail.text) {
            return `• ${detail.reference} (${detail.translation}) : « ${detail.text} »`;
          }
          return `• ${ref}`;
        })
        .join("\n");
      scripturesSection = `\n\n${header}\n${formatted}`;
    }

    const takeaway = card.practicalTakeaway?.[language];
    const takeawayText = takeaway
      ? `\n\n${language === "fr" ? "À retenir :" : "Key Takeaway:"} ${takeaway}`
      : "";

    const fullText = `Q: ${qText}\n\nR: ${aText}${scripturesSection}${takeawayText}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isBookmarked) {
      triggerConfetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#f59e0b", "#fbbf24", "#38bdf8"],
      });
    }
    onToggleBookmark?.(card.id);
  };

  const gradientTheme = DISCUSSION_THEMES[card.questionNumber % DISCUSSION_THEMES.length];
  const scriptureList = card.scriptureRefs?.[language] || [];

  return (
    <div
      className={`group w-full perspective-1000 select-none ${
        className || "h-[420px] sm:h-[450px]"
      }`}
    >
      <div
        onClick={handleCardClick}
        className={`card-inner ${isFlipped ? "is-flipped" : ""}`}
      >
        {/* ================= RECTO (FRONT - QUESTION) ================= */}
        <div
          className={`card-face card-face-front rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-white/10 bg-slate-950 bg-gradient-to-br ${gradientTheme}`}
        >
          {/* Subtle glow overlays */}
          <div className="absolute inset-0 bg-slate-950/40 pointer-events-none rounded-3xl" />
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar on Front */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-amber-300 border border-white/10 shadow-sm">
                <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === "fr" ? "Semaine" : "Week"} {card.weekNumber} • Q{card.questionNumber}
                </span>
              </span>

              {card.theme && (
                <span className="text-[11px] font-medium text-slate-300/90 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 hidden sm:inline-block">
                  {card.theme[language]}
                </span>
              )}
            </div>

            {onToggleBookmark && (
              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10"
                }`}
                title={isBookmarked ? t("unmemorizeBtn") : t("memorizeBtn")}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Center: Question */}
          <div className="relative z-10 my-auto text-center space-y-4 px-2 sm:px-4 max-w-full">
            <span className="inline-block text-[11px] font-bold text-amber-400/90 tracking-widest uppercase">
              {card.theme ? card.theme[language] : t("discussionTag")}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug drop-shadow-md">
              « {card.question[language]} »
            </h2>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{language === "fr" ? "Question clé du cours" : "Core discussion question"}</span>
            </div>
          </div>

          {/* Bottom Prompt to Flip */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {scriptureList.length > 0
                  ? `${scriptureList.length} ${
                      language === "fr" ? "références bibliques" : "scripture refs"
                    }`
                  : language === "fr"
                  ? "Réflexion pastorale"
                  : "Pastoral reflection"}
              </span>
            </span>
            <span className="flex items-center gap-1 text-[11px] group-hover:text-amber-300 transition-colors shrink-0">
              <Rotate3d className="w-3.5 h-3.5 animate-pulse" />
              <span>{t("flipDiscussionInstruction")}</span>
            </span>
          </div>
        </div>

        {/* ================= VERSO (BACK - ANSWER) ================= */}
        <div
          className={`card-face card-face-back rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-amber-500/30 bg-slate-950 bg-gradient-to-tr ${gradientTheme}`}
        >
          {/* High contrast backdrop */}
          <div className="absolute inset-0 bg-slate-950/95 pointer-events-none rounded-3xl" />

          {/* Top Bar on Back */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-tight truncate">
                {language === "fr" ? "Réponse & Enseignement" : "Answer & Biblical Insight"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10 shrink-0">
                Q{card.questionNumber}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Copy Full Q&A */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1 text-xs"
                title={t("copyAnswerBtn")}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-medium hidden sm:inline">
                      {t("copiedAnswerSuccess")}
                    </span>
                  </>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Bookmark toggle */}
              {onToggleBookmark && (
                <button
                  type="button"
                  onClick={handleToggleBookmark}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                  title={isBookmarked ? t("unmemorizeBtn") : t("memorizeBtn")}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-3.5 h-3.5" />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Center Content: Formatted Answer + Scriptures + Practical Takeaway */}
          <div className="relative z-10 my-auto py-2 overflow-y-auto max-h-[290px] sm:max-h-[350px] pr-1.5 space-y-3.5">
            {/* Structured Answer Text with interactive scripture citations */}
            <InteractiveAnswerText text={card.answer[language]} />

            {/* Scripture Pill Badges */}
            {scriptureList.length > 0 && (
              <div className="pt-2 border-t border-white/10">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{t("scriptureReferencesLabel")}</span>
                  <span className="text-[10px] text-slate-400 font-normal lowercase">
                    {language === "fr" ? "(survoler ou cliquer pour lire)" : "(hover or click to read)"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scriptureList.map((ref, idx) => (
                    <VersePill key={idx} reference={ref} />
                  ))}
                </div>
              </div>
            )}

            {/* Practical Takeaway box */}
            {card.practicalTakeaway && (
              <div className="p-2.5 rounded-xl bg-slate-900/90 border-l-2 border-amber-500 text-xs text-amber-200/90 leading-normal">
                <span className="font-bold text-amber-400 mr-1.5">
                  {t("practicalTakeawayLabel")}
                </span>
                <span>{card.practicalTakeaway[language]}</span>
              </div>
            )}
          </div>

          {/* Bottom Footer Action */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[65%]">
              « {card.question[language]} »
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-amber-300 transition-colors shrink-0">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>{language === "fr" ? "Question" : "Question"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
