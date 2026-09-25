"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { allCourses, getAllDiscussionCards } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { DiscussionCard } from "@/components/DiscussionCard";
import { DiscussionCard as DiscussionCardType } from "@/types/course";
import {
  MessageSquareText,
  Search,
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Grid,
  BookmarkCheck,
  BookOpen,
} from "lucide-react";

export default function DiscussionPage() {
  const { language, t, selectedWeekId, setSelectedWeekId } = useLanguage();

  const [weekFilter, setWeekFilter] = useState<string>(
    selectedWeekId || "week-01"
  );
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<string[] | null>(null);

  // View Mode: 'focus' (1-by-1 large) or 'grid' (all at once)
  const [viewMode, setViewMode] = useState<"focus" | "grid">("focus");
  const [focusIndex, setFocusIndex] = useState(0);

  // Sync weekFilter if selectedWeekId changed externally
  useEffect(() => {
    if (selectedWeekId) {
      setWeekFilter(selectedWeekId);
    }
  }, [selectedWeekId]);

  // Load bookmarks & view mode preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nd_bookmarked_discussions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBookmarkedIds(parsed);
        }
      }
      const savedViewMode = localStorage.getItem("nd_discussion_view_mode");
      if (savedViewMode === "focus" || savedViewMode === "grid") {
        setViewMode(savedViewMode);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      const next = currentList.includes(id)
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];
      try {
        localStorage.setItem("nd_bookmarked_discussions", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleSetViewMode = (mode: "focus" | "grid") => {
    setViewMode(mode);
    try {
      localStorage.setItem("nd_discussion_view_mode", mode);
    } catch {
      // Ignore
    }
  };

  // Base list of cards based on week selection
  const baseCards: DiscussionCardType[] = useMemo(() => {
    if (weekFilter === "all") return getAllDiscussionCards();
    const course = allCourses.find((c) => c.id === weekFilter);
    return course?.discussionCards || [];
  }, [weekFilter]);

  // Unique themes for filter dropdown
  const availableThemes = useMemo(() => {
    const themes = new Set<string>();
    baseCards.forEach((c) => {
      if (c.theme?.[language]) {
        themes.add(c.theme[language]);
      }
    });
    return Array.from(themes);
  }, [baseCards, language]);

  const handleShuffle = () => {
    const ids = baseCards.map((c) => c.id).sort(() => Math.random() - 0.5);
    setShuffledOrder(ids);
    setFocusIndex(0);
  };

  const handleResetOrder = () => {
    setShuffledOrder(null);
    setSearchQuery("");
    setSelectedTheme(null);
    setFocusIndex(0);
  };

  // Ordered cards
  const orderedCards = useMemo(() => {
    if (!shuffledOrder) return baseCards;
    return [...baseCards].sort((a, b) => {
      const indexA = shuffledOrder.indexOf(a.id);
      const indexB = shuffledOrder.indexOf(b.id);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [baseCards, shuffledOrder]);

  // Filtered cards by search & theme
  const filteredCards = useMemo(() => {
    return orderedCards.filter((card) => {
      // Theme filter
      if (selectedTheme && card.theme?.[language] !== selectedTheme) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const questionMatch = card.question[language].toLowerCase().includes(q);
        const answerMatch = card.answer[language].toLowerCase().includes(q);
        const themeMatch = card.theme?.[language]?.toLowerCase().includes(q);
        const scriptureMatch =
          card.scriptureRefs?.[language]?.some((s) => s.toLowerCase().includes(q)) || false;

        if (!questionMatch && !answerMatch && !themeMatch && !scriptureMatch) {
          return false;
        }
      }

      return true;
    });
  }, [orderedCards, selectedTheme, searchQuery, language]);

  // Ensure focusIndex is within bounds
  useEffect(() => {
    if (focusIndex >= filteredCards.length) {
      setFocusIndex(Math.max(0, filteredCards.length - 1));
    }
  }, [filteredCards.length, focusIndex]);

  // Keyboard navigation for Focus mode
  const handlePrevFocus = useCallback(() => {
    setFocusIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextFocus = useCallback(() => {
    setFocusIndex((prev) => Math.min(filteredCards.length - 1, prev + 1));
  }, [filteredCards.length]);

  useEffect(() => {
    if (viewMode !== "focus") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrevFocus();
      } else if (e.key === "ArrowRight") {
        handleNextFocus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handlePrevFocus, handleNextFocus]);

  const currentFocusCard = filteredCards[focusIndex];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Sober Header: Title on Left, Compact Counter on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
        <div>
          <h1 className="text-2xl sm:text-4xl font-light text-neutral-900 dark:text-white tracking-tight">
            <span className="font-semibold">{language === "fr" ? "Questions" : "Discussion"}</span> & {language === "fr" ? "Réflexion spirituelle" : "Spiritual Reflection"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-400 mt-1">
            {t("discussionSubtitle")}
          </p>
        </div>

        {/* Compact Counter Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800 shadow-sm self-start sm:self-auto">
          <MessageSquareText className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs font-semibold text-neutral-700 dark:text-zinc-300">
            {language === "fr" ? "Questions répertoriées :" : "Questions listed:"}
          </span>
          <span className="text-xs font-mono font-bold text-[#9e7d32] dark:text-[#c5a059]">
            {filteredCards.length} / {baseCards.length}
          </span>
        </div>
      </div>

      {/* Unified Single-Line Toolbar: Dropdown Filters, Search, Actions & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-3xl bg-white/90 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Week Select Dropdown */}
          <div className="relative">
            <select
              value={weekFilter}
              onChange={(e) => {
                const val = e.target.value;
                setWeekFilter(val);
                if (val !== "all") setSelectedWeekId(val);
                setShuffledOrder(null);
                setFocusIndex(0);
              }}
              className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] cursor-pointer"
            >
              {allCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === "fr"
                    ? `Semaine ${c.weekNumber} : ${c.title.fr} (${c.discussionCards?.length || 0} Q&A)`
                    : `Week ${c.weekNumber}: ${c.title.en} (${c.discussionCards?.length || 0} Q&A)`}
                </option>
              ))}
              <option value="all">
                {language === "fr"
                  ? `Toutes les semaines (${getAllDiscussionCards().length} Q&A)`
                  : `All Weeks (${getAllDiscussionCards().length} Q&A)`}
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Theme Select Dropdown */}
          {availableThemes.length > 0 && (
            <div className="relative">
              <select
                value={selectedTheme || ""}
                onChange={(e) => {
                  setSelectedTheme(e.target.value ? e.target.value : null);
                  setFocusIndex(0);
                }}
                className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] cursor-pointer max-w-[180px] sm:max-w-[220px] truncate"
              >
                <option value="">
                  {language === "fr" ? "Tous les thèmes" : "All Themes"}
                </option>
                {availableThemes.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Right Tools Group: Search, Shuffle, Reset & View Mode */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-48 md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder={language === "fr" ? "Rechercher Q&A..." : "Search Q&A..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusIndex(0);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-full text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          {/* Shuffle Button */}
          <button
            type="button"
            onClick={handleShuffle}
            className="p-2 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-zinc-700 transition-colors shadow-sm"
            title={t("shuffleBtn")}
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetOrder}
            className="p-2 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-zinc-700 transition-colors shadow-sm"
            title={t("resetDeckBtn")}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* View Mode Toggle: Focus (1 par 1) vs Grille */}
          <div className="flex items-center p-0.5 rounded-full bg-neutral-200/80 dark:bg-zinc-800 border border-neutral-300/80 dark:border-zinc-700 shadow-inner">
            <button
              type="button"
              onClick={() => handleSetViewMode("focus")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === "focus"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                  : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
              title={t("modeFocus")}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Focus</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetViewMode("grid")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                  : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
              title={t("modeGrid")}
            >
              <Grid className="w-3 h-3" />
              <span>{language === "fr" ? "Grille" : "Grid"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16 rounded-3xl glass-card border border-neutral-200 dark:border-zinc-800 space-y-3">
          <MessageSquareText className="w-10 h-10 text-neutral-400 dark:text-zinc-500 mx-auto" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            {t("discussionEmpty")}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-zinc-400">
            {language === "fr"
              ? "Essaie de modifier tes filtres ou ta recherche."
              : "Try adjusting your filters or search query."}
          </p>
          <button
            type="button"
            onClick={handleResetOrder}
            className="mt-2 px-5 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold shadow-sm"
          >
            {t("resetDeckBtn")}
          </button>
        </div>
      ) : viewMode === "focus" && currentFocusCard ? (
        /* ================= MODE FOCUS (1 PAR 1 ÉPURÉ & IMMERSIF) ================= */
        <div className="max-w-2xl mx-auto space-y-6 animate-scale-in py-2">
          {/* Active Card */}
          <div className="w-full">
            <DiscussionCard
              key={currentFocusCard.id}
              card={currentFocusCard}
              isBookmarked={bookmarkedIds.includes(currentFocusCard.id)}
              onToggleBookmark={handleToggleBookmark}
              className="h-[460px] sm:h-[500px]"
            />
          </div>

          {/* Focus Navigation Bar */}
          <div className="flex items-center justify-between gap-3 bg-white/90 dark:bg-zinc-900/90 p-3 rounded-full border border-neutral-200 dark:border-zinc-800 shadow-md backdrop-blur-xl">
            <button
              type="button"
              onClick={handlePrevFocus}
              disabled={focusIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-neutral-100 dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200 hover:bg-neutral-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 shadow-sm"
              title={language === "fr" ? "Question précédente (flèche gauche)" : "Previous question (left arrow)"}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t("navPrevious")}</span>
            </button>

            {/* Step Counter & Dot Jumpers */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-mono font-bold text-neutral-700 dark:text-zinc-300">
                {language === "fr" ? "Question" : "Question"}{" "}
                <span className="text-[#9e7d32] dark:text-[#c5a059] font-black">
                  {focusIndex + 1}
                </span>{" "}
                {t("discussionCounter")} {filteredCards.length}
              </span>

              {/* Progress Line */}
              <div className="w-32 sm:w-48 h-1.5 bg-neutral-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c5a059] rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((focusIndex + 1) / filteredCards.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextFocus}
              disabled={focusIndex === filteredCards.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-zinc-200 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 shadow-sm"
              title={language === "fr" ? "Question suivante (flèche droite)" : "Next question (right arrow)"}
            >
              <span className="hidden sm:inline">{t("navNextShort")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Jump Dot Carousel for Questions */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap px-4 py-2 bg-neutral-100/60 dark:bg-zinc-900/60 rounded-full border border-neutral-200 dark:border-zinc-800/80">
            {filteredCards.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFocusIndex(idx)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all duration-200 ${
                  idx === focusIndex
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm scale-110"
                    : bookmarkedIds.includes(c.id)
                    ? "bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059]/30"
                    : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-zinc-700"
                }`}
                title={`Question ${c.questionNumber}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ================= MODE GRILLE (TOUTES LES CARTES VISIBLES) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
          {filteredCards.map((card) => (
            <DiscussionCard
              key={card.id}
              card={card}
              isBookmarked={bookmarkedIds.includes(card.id)}
              onToggleBookmark={handleToggleBookmark}
              className="h-[430px]"
            />
          ))}
        </div>
      )}
    </div>
  );
}
