"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { allCourses, getAllVerses } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { VerseCard } from "@/components/VerseCard";
import { BibleVerse } from "@/types/course";
import {
  Layers,
  Search,
  Shuffle,
  RotateCcw,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Grid,
  X,
} from "lucide-react";

// Semantic synonym clusters for natural exploration in FR & EN
const SEMANTIC_CLUSTERS: { name: { fr: string; en: string }; terms: string[] }[] = [
  {
    name: { fr: "Salut & Grâce", en: "Salvation & Grace" },
    terms: [
      "salut", "sauveur", "péché", "croix", "grâce", "pardon", "hhatah",
      "metanoia", "justifié", "sang", "sacrifice", "salvation", "saviour",
      "sin", "cross", "grace", "forgiveness", "justified", "redeemed"
    ],
  },
  {
    name: { fr: "Église & Mission", en: "Church & Mission" },
    terms: [
      "église", "ekklesia", "corps", "communion", "assemblée", "bâtir",
      "monde", "témoins", "saint", "peuple", "servir", "church", "body",
      "fellowship", "gathering", "mission", "called", "light", "serve"
    ],
  },
  {
    name: { fr: "Foi & Vie Éternelle", en: "Faith & Eternal Life" },
    terms: [
      "foi", "croire", "vie", "éternelle", "ressuscité", "confiance",
      "espérance", "renaître", "nouveau", "faith", "believe", "life",
      "eternal", "risen", "hope", "born again"
    ],
  },
  {
    name: { fr: "Amour & Vérité", en: "Love & Truth" },
    terms: [
      "amour", "aimé", "vérité", "parole", "lumière", "père", "justice",
      "love", "loved", "truth", "word", "light", "father", "righteousness"
    ],
  },
];

export default function CardsPage() {
  const { language, t, selectedWeekId, setSelectedWeekId } = useLanguage();

  const [weekFilter, setWeekFilter] = useState<string>(
    selectedWeekId || "week-01"
  );
  const [filterMode, setFilterMode] = useState<"all" | "key" | "memorized" | "toReview">("all");
  const [selectedSemanticTheme, setSelectedSemanticTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [memorizedIds, setMemorizedIds] = useState<string[]>([]);
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

  // Load memorized & view mode preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nd_memorized_verses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMemorizedIds(parsed);
        }
      }
      const savedViewMode = localStorage.getItem("nd_cards_view_mode");
      if (savedViewMode === "focus" || savedViewMode === "grid") {
        setViewMode(savedViewMode);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleMemorized = (id: string) => {
    setMemorizedIds((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      const next = currentList.includes(id)
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];
      try {
        localStorage.setItem("nd_memorized_verses", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleSetViewMode = (mode: "focus" | "grid") => {
    setViewMode(mode);
    try {
      localStorage.setItem("nd_cards_view_mode", mode);
    } catch {
      // Ignore
    }
  };

  // Base list of verses based on week selection
  const baseVerses: BibleVerse[] = useMemo(() => {
    if (weekFilter === "all") return getAllVerses();
    const course = allCourses.find((c) => c.id === weekFilter);
    return course ? course.verses : getAllVerses();
  }, [weekFilter]);

  const keyCount = baseVerses.filter((v) => v.isKeyVerse).length;

  const handleShuffle = () => {
    const ids = baseVerses.map((v) => v.id).sort(() => Math.random() - 0.5);
    setShuffledOrder(ids);
    setFocusIndex(0);
  };

  const handleResetOrder = () => {
    setShuffledOrder(null);
    setSearchQuery("");
    setSelectedSemanticTheme(null);
    setFilterMode("all");
    setFocusIndex(0);
  };

  const orderedVerses = useMemo(() => {
    if (!shuffledOrder) return baseVerses;
    const map = new Map(baseVerses.map((v) => [v.id, v]));
    const result: BibleVerse[] = [];
    for (const id of shuffledOrder) {
      const found = map.get(id);
      if (found) result.push(found);
    }
    for (const v of baseVerses) {
      if (!shuffledOrder.includes(v.id)) result.push(v);
    }
    return result;
  }, [baseVerses, shuffledOrder]);

  // Enhanced semantic search matching
  const filteredVerses = useMemo(() => {
    return orderedVerses.filter((verse) => {
      // 1. Status Filter
      if (filterMode === "key" && !verse.isKeyVerse) return false;
      if (filterMode === "memorized" && !memorizedIds.includes(verse.id)) return false;
      if (filterMode === "toReview" && memorizedIds.includes(verse.id)) return false;

      // 2. Semantic Theme Filter Dropdown
      if (selectedSemanticTheme) {
        const cluster = SEMANTIC_CLUSTERS.find(
          (c) => c.name[language] === selectedSemanticTheme
        );
        if (cluster) {
          const verseContent = `${verse.reference[language]} ${verse.text[language]} ${verse.theme[language]} ${verse.context?.[language] || ""}`.toLowerCase();
          const hasClusterMatch = cluster.terms.some((term) =>
            verseContent.includes(term.toLowerCase())
          );
          if (!hasClusterMatch) return false;
        }
      }

      // 3. Search query (Keyword + Semantic expansion)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const verseText = verse.text[language].toLowerCase();
        const verseRef = verse.reference[language].toLowerCase();
        const verseTheme = verse.theme[language].toLowerCase();
        const verseBook = verse.book[language].toLowerCase();
        const verseContext = (verse.context?.[language] || "").toLowerCase();

        // Direct substring match
        if (
          verseRef.includes(q) ||
          verseText.includes(q) ||
          verseTheme.includes(q) ||
          verseBook.includes(q) ||
          verseContext.includes(q)
        ) {
          return true;
        }

        // Semantic synonym expansion
        const matchingCluster = SEMANTIC_CLUSTERS.find((c) =>
          c.terms.some((term) => term.includes(q) || q.includes(term))
        );
        if (matchingCluster) {
          const combined = `${verseRef} ${verseText} ${verseTheme} ${verseContext}`;
          return matchingCluster.terms.some((term) => combined.includes(term));
        }

        return false;
      }

      return true;
    });
  }, [orderedVerses, filterMode, selectedSemanticTheme, searchQuery, memorizedIds, language]);

  // Ensure focusIndex is within bounds
  useEffect(() => {
    if (focusIndex >= filteredVerses.length) {
      setFocusIndex(Math.max(0, filteredVerses.length - 1));
    }
  }, [filteredVerses.length, focusIndex]);

  // Keyboard navigation for Focus mode
  const handlePrevFocus = useCallback(() => {
    setFocusIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextFocus = useCallback(() => {
    setFocusIndex((prev) => Math.min(filteredVerses.length - 1, prev + 1));
  }, [filteredVerses.length]);

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

  const currentMemorizedCount = baseVerses.filter((v) => memorizedIds.includes(v.id)).length;
  const memorizedPercentage =
    baseVerses.length > 0 ? Math.round((currentMemorizedCount / baseVerses.length) * 100) : 0;

  const currentFocusVerse = filteredVerses[focusIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sober Header: Clean Title on Left, Compact Counter on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
        <div>
          <h1 className="text-2xl sm:text-4xl font-light text-neutral-900 dark:text-white tracking-tight">
            <span className="font-semibold">{language === "fr" ? "Mémorisation" : "Memorization"}</span> & {language === "fr" ? "méditation des Écritures" : "Scripture Meditation"}
          </h1>
        </div>

        {/* Compact Progress Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800 shadow-sm self-start sm:self-auto">
          <BookmarkCheck className="w-4 h-4 text-[#c5a059]" />
          <span className="text-xs font-semibold text-neutral-700 dark:text-zinc-300">
            {t("memorized")} :
          </span>
          <span className="text-xs font-mono font-bold text-[#9e7d32] dark:text-[#c5a059]">
            {currentMemorizedCount} / {baseVerses.length} ({memorizedPercentage}%)
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
                    ? `Semaine ${c.weekNumber} : ${c.title.fr} (${c.verses.length})`
                    : `Week ${c.weekNumber}: ${c.title.en} (${c.verses.length})`}
                </option>
              ))}
              <option value="all">
                {language === "fr"
                  ? `Toutes les semaines (${getAllVerses().length})`
                  : `All Weeks (${getAllVerses().length})`}
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Theme Select Dropdown */}
          <div className="relative">
            <select
              value={selectedSemanticTheme || ""}
              onChange={(e) => {
                setSelectedSemanticTheme(e.target.value ? e.target.value : null);
                setFocusIndex(0);
              }}
              className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] cursor-pointer"
            >
              <option value="">
                {language === "fr" ? "Tous les thèmes" : "All Themes"}
              </option>
              {SEMANTIC_CLUSTERS.map((cluster) => (
                <option key={cluster.name.fr} value={cluster.name[language]}>
                  {cluster.name[language]}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Verses Status Select Dropdown */}
          <div className="relative">
            <select
              value={filterMode}
              onChange={(e) => {
                setFilterMode(e.target.value as "all" | "key" | "memorized" | "toReview");
                setFocusIndex(0);
              }}
              className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] cursor-pointer"
            >
              <option value="all">
                {language === "fr"
                  ? `Tous les versets (${baseVerses.length})`
                  : `All Verses (${baseVerses.length})`}
              </option>
              <option value="key">
                {language === "fr"
                  ? `Versets Clés (${keyCount})`
                  : `Key Verses (${keyCount})`}
              </option>
              <option value="memorized">
                {language === "fr"
                  ? `Mémorisés (${currentMemorizedCount})`
                  : `Memorized (${currentMemorizedCount})`}
              </option>
              <option value="toReview">
                {language === "fr"
                  ? `À réviser (${baseVerses.length - currentMemorizedCount})`
                  : `To Review (${baseVerses.length - currentMemorizedCount})`}
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Right Search, Actions & Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative w-36 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder={language === "fr" ? "Recherche..." : "Search..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusIndex(0);
              }}
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-full text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFocusIndex(0);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors"
                title={language === "fr" ? "Effacer la recherche" : "Clear search"}
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
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
      {filteredVerses.length === 0 ? (
        <div className="text-center py-16 rounded-3xl glass-card border border-neutral-200 dark:border-zinc-800 space-y-3">
          <Layers className="w-10 h-10 text-neutral-400 dark:text-zinc-500 mx-auto" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            {language === "fr" ? "Aucun verset trouvé" : "No verses found"}
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
      ) : viewMode === "focus" && currentFocusVerse ? (
        /* ================= MODE FOCUS (CARTE MAJESTUEUSE & ÉPURÉE) ================= */
        <div className="max-w-2xl mx-auto space-y-6 animate-scale-in py-2">
          {/* Active Card - Larger height & width occupying the space */}
          <div className="w-full">
            <VerseCard
              key={currentFocusVerse.id}
              verse={currentFocusVerse}
              isMemorized={memorizedIds.includes(currentFocusVerse.id)}
              onToggleMemorized={handleToggleMemorized}
              className="h-[460px] sm:h-[500px]"
            />
          </div>

          {/* Focus Navigation Controls */}
          <div className="flex items-center justify-between gap-3 bg-white/90 dark:bg-zinc-900/90 p-3 rounded-full border border-neutral-200 dark:border-zinc-800 shadow-md backdrop-blur-xl">
            <button
              type="button"
              onClick={handlePrevFocus}
              disabled={focusIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-neutral-800 dark:text-white transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t("navPrevious")}</span>
            </button>

            <div className="text-center">
              <span className="text-xs font-mono font-bold text-[#9e7d32] dark:text-[#c5a059]">
                {focusIndex + 1} {t("ofQuestion")} {filteredVerses.length}
              </span>
              <div className="text-[10px] text-neutral-500 dark:text-zinc-400 font-medium">
                {currentFocusVerse.isKeyVerse
                  ? language === "fr"
                    ? "★ Verset Clé"
                    : "★ Key Verse"
                  : currentFocusVerse.theme[language]}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextFocus}
              disabled={focusIndex >= filteredVerses.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-zinc-200 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <span>{t("navNextShort")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slender Progress Track */}
          <div className="w-full bg-neutral-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#c5a059] h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((focusIndex + 1) / filteredVerses.length) * 100}%`,
              }}
            />
          </div>

          {/* Keyboard hint & Mode switch shortcut */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-zinc-400 px-1">
            <span>
              {language === "fr"
                ? "Touches ← et → pour naviguer • Clic pour retourner"
                : "Use ← and → arrow keys • Click to flip"}
            </span>
            <button
              type="button"
              onClick={() => handleSetViewMode("grid")}
              className="text-[#9e7d32] dark:text-[#c5a059] hover:underline font-semibold"
            >
              {language === "fr" ? "Tout afficher en grille" : "Show all in grid"}
            </button>
          </div>
        </div>
      ) : (
        /* ================= MODE GRILLE (TOUT D'UN COUP) ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredVerses.map((verse) => (
            <VerseCard
              key={verse.id}
              verse={verse}
              isMemorized={memorizedIds.includes(verse.id)}
              onToggleMemorized={handleToggleMemorized}
            />
          ))}
        </div>
      )}
    </div>
  );
}
