"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_COURSES, CourseModuleSummary } from "@/data/curriculum";
import {
  X,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Lock,
  ChevronRight,
  Compass,
} from "lucide-react";

interface CourseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CourseSelectorModal: React.FC<CourseSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, selectedWeekId, setSelectedWeekId, t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectCourse = (course: CourseModuleSummary) => {
    if (course.status === "active") {
      setSelectedWeekId(course.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet */}
      <div className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] bg-white dark:bg-zinc-950 text-slate-900 dark:text-white rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col z-10 animate-slide-up sm:animate-scale-in">
        {/* Mobile Pull Bar */}
        <div className="sm:hidden w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/90 dark:bg-zinc-900/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                  HILLSONG FRANCE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-zinc-300 font-medium">
                  10 Modules
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {t("courseMenuTitle")}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/80 dark:border-white/10 flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-all active:scale-95"
            aria-label={t("closeBtn")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Course List Scrollable Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-2.5 divide-y divide-transparent">
          {ALL_COURSES.map((course) => {
            const isActive = course.status === "active";
            const isSelected = selectedWeekId === course.id;

            return (
              <div
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className={`group relative rounded-2xl p-4 transition-all duration-200 border ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/50 shadow-sm ring-1 ring-amber-500/30"
                    : isActive
                    ? "bg-slate-50 hover:bg-slate-100/90 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 cursor-pointer"
                    : "bg-slate-50/50 dark:bg-zinc-900/20 border-slate-200/50 dark:border-white/5 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Number + Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30"
                          : isActive
                          ? "bg-slate-200/80 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 border border-slate-300/80 dark:border-white/10"
                          : "bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-600 border border-slate-200 dark:border-zinc-800"
                      }`}
                    >
                      {String(course.weekNumber).padStart(2, "0")}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`text-sm sm:text-base font-bold tracking-tight truncate ${
                            isSelected
                              ? "text-amber-600 dark:text-amber-300"
                              : isActive
                              ? "text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-200"
                              : "text-slate-500 dark:text-zinc-400"
                          }`}
                        >
                          {course.title[language]}
                        </h3>

                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === "fr" ? "Actuel" : "Current"}
                          </span>
                        )}

                        {!isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-300/80 dark:border-zinc-700/50">
                            <Lock className="w-2.5 h-2.5" />
                            {t("weekComingSoon")}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">
                        {course.subtitle[language]}
                      </p>

                      {/* Course tags/stats for active modules */}
                      {isActive && (
                        <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300/90 font-medium">
                            <BookOpen className="w-3 h-3" />
                            {course.versesCount} {t("versesCountLabel")}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-sky-600 dark:text-sky-300/90 font-medium">
                            <HelpCircle className="w-3 h-3" />
                            {course.questionsCount} {t("questionsCountLabel")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action Chevron */}
                  <div className="shrink-0 pt-1">
                    {isActive ? (
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                          isSelected
                            ? "bg-amber-500 text-slate-950"
                            : "text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 dark:text-zinc-600">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Nouveau Départ • Hillsong France</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-semibold transition-all active:scale-95"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};
