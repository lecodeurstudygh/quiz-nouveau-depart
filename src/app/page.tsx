"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { allCourses, getCourseById, week01 } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { VerseCard } from "@/components/VerseCard";
import { CourseSelectorModal } from "@/components/CourseSelectorModal";
import {
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  HeartHandshake,
  Footprints,
  Compass,
  ArrowRight,
  Flame,
  MessageSquareText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Tailored harmonious metallic styling for Hillsong-style pillar badges
const PILLAR_STYLES = [
  {
    badge: "bg-[#d6b26d]/15 text-[#9e7d32] dark:text-[#d6b26d] border border-[#d6b26d]/30 dark:border-[#d6b26d]/40 shadow-[0_0_12px_rgba(214,178,109,0.12)]",
    halo: "bg-[#d6b26d]/10",
    bgPattern: "/images/cards/piano_strings.jpg",
  },
  {
    badge: "bg-[#c5a059]/15 text-[#8f6e28] dark:text-[#c5a059] border border-[#c5a059]/30 dark:border-[#c5a059]/40 shadow-[0_0_12px_rgba(197,160,89,0.12)]",
    halo: "bg-[#c5a059]/10",
    bgPattern: "/images/cards/cello_wood.jpg",
  },
  {
    badge: "bg-[#b3883b]/15 text-[#7d5d1c] dark:text-[#e5be75] border border-[#b3883b]/30 dark:border-[#b3883b]/40 shadow-[0_0_12px_rgba(179,136,59,0.12)]",
    halo: "bg-[#b3883b]/10",
    bgPattern: "/images/cards/piano_strings.jpg",
  },
];

export default function CourseOverviewPage() {
  const { language, t, selectedWeekId, setSelectedWeekId } = useLanguage();
  const [memorizedIds, setMemorizedIds] = useState<string[]>([]);
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  // Active course selection dynamically resolved from selectedWeekId
  const currentWeek = getCourseById(selectedWeekId) || week01;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nd_memorized_verses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMemorizedIds(parsed);
        }
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

  const keyVerses = currentWeek.verses.filter((v) => v.isKeyVerse);
  const memorizedCount = currentWeek.verses.filter((v) =>
    memorizedIds.includes(v.id)
  ).length;

  const [mobileVerseIdx, setMobileVerseIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Reset mobile carousel when course changes
  useEffect(() => {
    setMobileVerseIdx(0);
  }, [selectedWeekId]);

  const weekPrefix = language === "fr" ? "S" : "W";

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    setTouchStartX(null);
    setTouchStartY(null);

    // Genuine horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      const total = Math.min(4, keyVerses.length);
      if (total <= 1) return;
      if (deltaX < 0) {
        // Swipe left -> Next verse
        setMobileVerseIdx((prev) => (prev + 1) % total);
      } else {
        // Swipe right -> Prev verse
        setMobileVerseIdx((prev) => (prev - 1 + total) % total);
      }
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Course Modal */}
      <CourseSelectorModal
        isOpen={isCourseMenuOpen}
        onClose={() => setIsCourseMenuOpen(false)}
      />

      {/* Week Selector Bar - Highly Scalable for 10 Modules on Mobile & Desktop */}
      <div className="space-y-2">
        {/* Mobile View: Clean Active Card with Drawer Trigger + Quick Numbered Strip */}
        <div className="sm:hidden space-y-2">
          {/* Active Course Card Trigger */}
          <button
            type="button"
            onClick={() => setIsCourseMenuOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/90 dark:bg-[#121217] border border-neutral-200/90 dark:border-white/10 shadow-sm active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] flex items-center justify-center font-bold text-xs shrink-0 border border-[#c5a059]/30">
                {weekPrefix}{currentWeek.weekNumber}
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d] block">
                  {language === "fr" ? `Semaine ${currentWeek.weekNumber} sur 10` : `Week ${currentWeek.weekNumber} of 10`}
                </span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                  {currentWeek.title[language]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 dark:text-zinc-400 pl-2 shrink-0">
              <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === "fr" ? "10 Modules" : "10 Modules"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </button>

          {/* Quick horizontal swipeable numbered pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5">
            {allCourses.map((c) => {
              const isSelected = currentWeek.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedWeekId(c.id)}
                  className={`h-8 px-3 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-[#c5a059] dark:text-zinc-950 shadow-sm"
                      : "bg-white dark:bg-[#15151c] text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {weekPrefix}{c.weekNumber}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setIsCourseMenuOpen(true)}
              className="h-8 px-3 rounded-full text-xs font-semibold text-[#9e7d32] dark:text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/25 hover:bg-[#c5a059]/20 transition-all shrink-0 flex items-center gap-1"
            >
              <Compass className="w-3 h-3" />
              <span>+</span>
            </button>
          </div>
        </div>

        {/* Desktop View: Sleek Segmented Horizontal Strip with Momentum Scroll */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
              {t("chooseCourseWeek")} :
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-neutral-200/80 dark:bg-black/80 backdrop-blur-xl border border-neutral-300/80 dark:border-white/10 shadow-lg overflow-x-auto no-scrollbar max-w-2xl">
            {allCourses.map((c) => {
              const isSelected = currentWeek.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedWeekId(c.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-white/20 dark:text-white dark:border dark:border-white/25 shadow-sm font-semibold"
                      : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/5 font-medium"
                  }`}
                >
                  {language === "fr"
                    ? `Semaine ${c.weekNumber} : ${c.title.fr}`
                    : `Week ${c.weekNumber}: ${c.title.en}`}
                </button>
              );
            })}
            <button
              onClick={() => setIsCourseMenuOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#9e7d32] dark:text-[#c5a059] hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-300/50 dark:hover:bg-white/10 transition-all whitespace-nowrap shrink-0"
              title={t("openCourseMenu")}
            >
              <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{language === "fr" ? "10 Semaines..." : "10 Weeks..."}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header with Hillsong B&W Cinematic Film Photography */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-7 sm:p-12 md:p-14 border border-neutral-200/80 dark:border-white/10 shadow-2xl min-h-[380px] sm:min-h-[420px] flex flex-col justify-end [isolation:isolate]">
        {/* Background B&W Film Photography for Dark Mode */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none select-none">
          <img
            src="/images/hillsong_studio_piano.jpg"
            alt="Hillsong Instrumentals Studio"
            className="w-full h-full object-cover object-[60%_center] grayscale contrast-125 brightness-75 opacity-40 pointer-events-none"
          />
          {/* Negative & Vignette Film Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/75 to-[#0b0b0e]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0e]/90 via-[#0b0b0e]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0b0b0e_90%)] opacity-70" />
        </div>

        {/* Ambient Warm Golden Halos */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-neutral-500/5 rounded-full blur-3xl pointer-events-none" />

        <div key={`hero-info-${currentWeek.id}-${language}`} className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-neutral-100 dark:bg-black/75 text-neutral-800 dark:text-[#d6b26d] border border-neutral-200 dark:border-white/20 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
            <span>{currentWeek.subtitle[language]}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-white tracking-tight leading-tight">
            <span className="font-semibold">{language === "fr" ? `Semaine ${currentWeek.weekNumber}` : `Week ${currentWeek.weekNumber}`}</span>
            <span className="opacity-40 mx-2 sm:mx-3">•</span>
            <span>{currentWeek.title[language]}</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-zinc-300 leading-relaxed font-normal max-w-2xl">
            {currentWeek.summary[language]}
          </p>

          {/* Call to actions in Hillsong Instrumentals style */}
          <div className="pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/cards"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-neutral-900 text-white dark:bg-transparent dark:border dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-[10.5px] sm:text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 backdrop-blur-md whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>
                {language === "fr"
                  ? `Mémoriser les versets (${currentWeek.verses.length})`
                  : `Memorize Verses (${currentWeek.verses.length})`}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </Link>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white dark:bg-black/50 text-neutral-800 dark:text-zinc-200 hover:text-neutral-950 dark:hover:text-white font-semibold text-[10.5px] sm:text-xs uppercase tracking-wider border border-neutral-200 dark:border-white/15 hover:bg-neutral-50 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm backdrop-blur-md whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span>
                {language === "fr"
                  ? `Lancer le Quiz (${currentWeek.questions.length} Q)`
                  : `Start Quiz (${currentWeek.questions.length} Q)`}
              </span>
            </Link>

            <Link
              href="/discussion"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-neutral-100 dark:bg-black/50 text-neutral-800 dark:text-zinc-200 hover:text-neutral-950 dark:hover:text-white font-semibold text-[10.5px] sm:text-xs uppercase tracking-wider border border-neutral-200 dark:border-white/15 hover:bg-neutral-200/80 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm backdrop-blur-md whitespace-nowrap"
            >
              <MessageSquareText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0" />
              <span>
                {language === "fr"
                  ? `Discussion (${currentWeek.discussionCards?.length || 0} Q&A)`
                  : `Discussion (${currentWeek.discussionCards?.length || 0} Q&A)`}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* "La Grande Idée" Highlight Card - Shimmering Glass & Negative Texture */}
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-9 shadow-2xl border border-neutral-200/80 dark:border-white/10 dark:border-t-white/25 bg-white/70 dark:bg-[#0c0c11]/85 backdrop-blur-xl group before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent">
        {/* Subtle B&W Film Texture Layer */}
        <div className="absolute inset-0 hidden dark:block pointer-events-none select-none opacity-15 mix-blend-luminosity">
          <img
            src="/images/cards/cello_wood.jpg"
            alt=""
            className="w-full h-full object-cover grayscale contrast-125 brightness-75 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0e]/95 via-[#0b0b0e]/80 to-[#0b0b0e]/50" />
        </div>

        {/* Ambient Warm Golden Halos */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-black/60 text-[#c5a059] flex-shrink-0 flex items-center justify-center border border-neutral-200 dark:border-white/15 backdrop-blur-md shadow-md shadow-black/20">
            <Flame className="w-6 h-6 text-[#c5a059] fill-[#c5a059]/30" />
          </div>
          <div key={`big-idea-${currentWeek.id}-${language}`} className="space-y-3 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-neutral-100 dark:bg-black/75 text-neutral-800 dark:text-[#d6b26d] border border-neutral-200 dark:border-white/20 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
              <span>{t("bigIdeaTitle")}</span>
            </div>
            <blockquote className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-100 italic leading-relaxed sm:leading-relaxed pb-1.5">
              « {currentWeek.bigIdea[language]} »
            </blockquote>
          </div>
        </div>
      </div>

      {/* Core Lessons / Pillars of the Selected Week - Shimmering Glass Cards */}
      {currentWeek.pillars && currentWeek.pillars.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#9e7d32] dark:text-[#c5a059]" />
            <span>
              {language === "fr"
                ? `Les 3 Piliers de la Semaine ${currentWeek.weekNumber}`
                : `The 3 Pillars of Week ${currentWeek.weekNumber}`}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentWeek.pillars.map((pillar, idx) => {
              const style = PILLAR_STYLES[idx % PILLAR_STYLES.length];
              return (
                <div
                  key={pillar.badgeNumber}
                  className="relative overflow-hidden rounded-3xl p-6 sm:p-7 shadow-xl border border-neutral-200/80 dark:border-white/10 dark:border-t-white/25 hover:border-[#c5a059]/40 bg-white/70 dark:bg-[#0c0c11]/85 backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between space-y-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent [isolation:isolate]"
                >
                  {/* Subtle B&W Film Texture Layer */}
                  <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 mix-blend-luminosity">
                    <img
                      src={style.bgPattern}
                      alt=""
                      className="w-full h-full object-cover grayscale contrast-125 brightness-75 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  {/* Shimmering Ambient Light Halo */}
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 ${style.halo} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                  />

                  <div className="relative z-10 space-y-3">
                    <div
                      className={`w-10 h-10 rounded-2xl ${style.badge} flex items-center justify-center font-bold text-sm tracking-tight backdrop-blur-md transition-transform group-hover:scale-105`}
                    >
                      {pillar.badgeNumber}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
                      {pillar.title[language]}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {pillar.description[language]}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2 text-xs font-mono text-[#9e7d32] dark:text-[#c5a059] font-semibold border-t border-neutral-200/60 dark:border-white/5">
                    {pillar.verses}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Featured 3D Verses Carousel / Cards Preview */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-base sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5 sm:gap-2 truncate">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#9e7d32] dark:text-[#c5a059] shrink-0" />
              <span className="truncate">
                {language === "fr"
                  ? "Versets Clés à Mémoriser"
                  : "Key Memory Verses"}
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-zinc-400 truncate hidden xs:block">
              {t("flipCardInstruction")}
            </p>
          </div>
          <Link
            href="/cards"
            className="text-[11px] sm:text-xs font-bold text-[#9e7d32] dark:text-[#c5a059] hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
          >
            <span>
              {language === "fr"
                ? `Voir les ${currentWeek.verses.length}`
                : `View all ${currentWeek.verses.length}`}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile View: Single Focus Card with Finger Swipe & Dot Pagination */}
        <div className="sm:hidden space-y-3">
          {keyVerses.length > 0 && (
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="touch-pan-y"
            >
              {keyVerses.slice(0, 4)[mobileVerseIdx] && (
                <div key={keyVerses.slice(0, 4)[mobileVerseIdx].id} className="animate-fade-in">
                  <VerseCard
                    verse={keyVerses.slice(0, 4)[mobileVerseIdx]}
                    isMemorized={memorizedIds.includes(keyVerses.slice(0, 4)[mobileVerseIdx].id)}
                    onToggleMemorized={handleToggleMemorized}
                  />
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls: Arrows + Dots + Counter */}
          {keyVerses.length > 1 && (
            <div className="flex items-center justify-between px-2 pt-1">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setMobileVerseIdx((prev) =>
                    (prev - 1 + Math.min(4, keyVerses.length)) % Math.min(4, keyVerses.length)
                  )
                }
                className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-zinc-300 flex items-center justify-center transition-all active:scale-90 shadow-sm"
                aria-label="Verset précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots & Counter */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  {keyVerses.slice(0, 4).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMobileVerseIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === mobileVerseIdx
                          ? "w-6 bg-[#c5a059]"
                          : "w-2 bg-neutral-300 dark:bg-white/20 hover:bg-neutral-400"
                      }`}
                      aria-label={`Aller au verset ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 dark:text-zinc-400 font-semibold">
                  {mobileVerseIdx + 1} / {Math.min(4, keyVerses.length)} • {language === "fr" ? "Glisser ou Tap" : "Swipe or Tap"}
                </span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setMobileVerseIdx((prev) => (prev + 1) % Math.min(4, keyVerses.length))
                }
                className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-zinc-300 flex items-center justify-center transition-all active:scale-90 shadow-sm"
                aria-label="Verset suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop View: 4-Column Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {keyVerses.slice(0, 4).map((verse) => (
            <VerseCard
              key={verse.id}
              verse={verse}
              isMemorized={memorizedIds.includes(verse.id)}
              onToggleMemorized={handleToggleMemorized}
            />
          ))}
        </div>
      </div>

      {/* Pastoral Prayer Goal & Next Step - Shimmering Glass Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {/* Prayer Goal */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-white/10 dark:border-t-white/25 hover:border-[#c5a059]/40 bg-white/70 dark:bg-[#0c0c11]/85 backdrop-blur-xl shadow-xl space-y-3 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent group transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#c5a059]/10 transition-all" />
          <div className="relative z-10 flex items-center gap-2.5 text-[#9e7d32] dark:text-[#c5a059]">
            <HeartHandshake className="w-5 h-5" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
              {t("prayerTargetTitle")}
            </h3>
          </div>
          <p key={`prayer-text-${currentWeek.id}-${language}`} className="relative z-10 text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed italic pb-1">
            {currentWeek.targetPrayer[language]}
          </p>
        </div>

        {/* Next Step */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-white/10 dark:border-t-white/25 hover:border-[#c5a059]/40 bg-white/70 dark:bg-[#0c0c11]/85 backdrop-blur-xl shadow-xl space-y-3 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent group transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#c5a059]/10 transition-all" />
          <div className="relative z-10 flex items-center gap-2.5 text-neutral-700 dark:text-zinc-300">
            <Footprints className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
              {t("nextStepTitle")}
            </h3>
          </div>
          <p key={`nextstep-text-${currentWeek.id}-${language}`} className="relative z-10 text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed pb-1">
            {currentWeek.nextStep[language]}
          </p>
          <div className="relative z-10 pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#9e7d32] dark:text-[#c5a059] hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>{language === "fr" ? "Lancer le Quiz" : "Start Quiz"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
