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
} from "lucide-react";

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

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Course Modal */}
      <CourseSelectorModal
        isOpen={isCourseMenuOpen}
        onClose={() => setIsCourseMenuOpen(false)}
      />

      {/* Week Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
            {t("chooseCourseWeek")} :
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-neutral-200/80 dark:bg-zinc-900 border border-neutral-300/80 dark:border-zinc-800 shadow-inner">
          {allCourses.map((c) => {
            const isSelected = currentWeek.id === c.id;
            const shortTitle =
              c.weekNumber === 1
                ? (language === "fr" ? "Semaine 1 : Sauveur" : "Week 1: Saviour")
                : c.weekNumber === 2
                ? (language === "fr" ? "Semaine 2 : Qui est Dieu ?" : "Week 2: Who is God?")
                : (language === "fr" ? `Semaine ${c.weekNumber} : L'Église` : `Week ${c.weekNumber}: The Church`);
            return (
              <button
                key={c.id}
                onClick={() => setSelectedWeekId(c.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm font-bold"
                    : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-zinc-800/80"
                }`}
              >
                {shortTitle}
              </button>
            );
          })}
          <button
            onClick={() => setIsCourseMenuOpen(true)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold text-[#9e7d32] dark:text-[#c5a059] hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-300/50 dark:hover:bg-zinc-800 transition-all"
            title={t("openCourseMenu")}
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{language === "fr" ? "10 Semaines..." : "10 Weeks..."}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-10 border border-neutral-200/80 dark:border-zinc-800 shadow-lg">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-neutral-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 dark:bg-zinc-800/80 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-700">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
            <span>{currentWeek.subtitle[language]}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            {language === "fr"
              ? `Semaine ${currentWeek.weekNumber} • ${currentWeek.title[language]}`
              : `Week ${currentWeek.weekNumber} • ${currentWeek.title[language]}`}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-zinc-300 leading-relaxed font-normal">
            {currentWeek.summary[language]}
          </p>

          {/* Call to actions */}
          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href="/cards"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold text-sm shadow-sm hover:bg-neutral-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>
                {language === "fr"
                  ? `Mémoriser les versets (${currentWeek.verses.length})`
                  : `Memorize Verses (${currentWeek.verses.length})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-200 hover:text-neutral-950 dark:hover:text-white font-bold text-sm border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 transition-all active:scale-95 shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-[#c5a059]" />
              <span>
                {language === "fr"
                  ? `Lancer le Quiz (${currentWeek.questions.length} Q)`
                  : `Start Quiz (${currentWeek.questions.length} Q)`}
              </span>
            </Link>

            <Link
              href="/discussion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-zinc-800/80 text-neutral-800 dark:text-zinc-200 hover:text-neutral-950 dark:hover:text-white font-bold text-sm border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-200/80 dark:hover:bg-zinc-700 transition-all active:scale-95 shadow-sm"
            >
              <MessageSquareText className="w-4 h-4 text-[#c5a059]" />
              <span>
                {language === "fr"
                  ? `Discussion (${currentWeek.discussionCards?.length || 0} Q&A)`
                  : `Discussion (${currentWeek.discussionCards?.length || 0} Q&A)`}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* "La Grande Idée" Highlight Card */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-100/90 dark:bg-zinc-900/90 p-6 sm:p-8 border border-neutral-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex-shrink-0 flex items-center justify-center font-black shadow-sm border border-neutral-700/20 dark:border-neutral-200">
            <Flame className="w-6 h-6 text-[#c5a059] fill-[#c5a059]" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e7d32] dark:text-[#c5a059]">
              {t("bigIdeaTitle")}
            </span>
            <blockquote className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-100 italic leading-relaxed">
              « {currentWeek.bigIdea[language]} »
            </blockquote>
          </div>
        </div>
      </div>

      {/* Core Lessons / Pillars of the Selected Week */}
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
            {currentWeek.pillars.map((pillar) => (
              <div
                key={pillar.badgeNumber}
                className="rounded-3xl glass-card p-6 border border-neutral-200/80 dark:border-zinc-800 hover:border-neutral-300 dark:hover:border-zinc-700 transition-all space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    pillar.color || "bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white"
                  } flex items-center justify-center font-bold border border-neutral-200 dark:border-zinc-700`}
                >
                  {pillar.badgeNumber}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {pillar.title[language]}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {pillar.description[language]}
                </p>
                <div className="pt-2 text-xs font-mono text-[#9e7d32] dark:text-[#c5a059] font-semibold">
                  {pillar.verses}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured 3D Verses Carousel / Cards Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#9e7d32] dark:text-[#c5a059]" />
              <span>
                {language === "fr"
                  ? "Versets Clés à Mémoriser"
                  : "Key Memory Verses"}
              </span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              {t("flipCardInstruction")}
            </p>
          </div>
          <Link
            href="/cards"
            className="text-xs font-bold text-[#9e7d32] dark:text-[#c5a059] hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>
              {language === "fr"
                ? `Voir les ${currentWeek.verses.length} versets`
                : `View all ${currentWeek.verses.length} verses`}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Pastoral Prayer Goal & Next Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {/* Prayer Goal */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-neutral-200/80 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2.5 text-[#9e7d32] dark:text-[#c5a059]">
            <HeartHandshake className="w-5 h-5" />
            <h3 className="font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs">
              {t("prayerTargetTitle")}
            </h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed italic">
            {currentWeek.targetPrayer[language]}
          </p>
        </div>

        {/* Next Step */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-neutral-200/80 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2.5 text-neutral-700 dark:text-zinc-300">
            <Footprints className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-bold text-base text-neutral-900 dark:text-white uppercase tracking-wider text-xs">
              {t("nextStepTitle")}
            </h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed">
            {currentWeek.nextStep[language]}
          </p>
          <div className="pt-2">
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
