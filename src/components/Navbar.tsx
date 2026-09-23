"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Layers, HelpCircle, Settings, Sparkles, ChevronDown, Compass, Sun, Moon, MessageSquareText, Radio } from "lucide-react";
import { CourseSelectorModal } from "@/components/CourseSelectorModal";
import { ALL_COURSES } from "@/data/curriculum";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t, setIsSettingsOpen, selectedWeekId, settings, toggleTheme } = useLanguage();
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  const currentCourse = ALL_COURSES.find((c) => c.id === selectedWeekId) || ALL_COURSES[0];

  const navLinks = [
    { href: "/", label: t("navCourses"), icon: BookOpen },
    { href: "/discussion", label: t("navDiscussion"), icon: MessageSquareText },
    { href: "/cards", label: t("navCards"), icon: Layers },
    { href: "/quiz", label: t("navQuiz"), icon: HelpCircle },
    { href: "/live", label: t("navLive"), icon: Radio, isLive: true },
  ];

  return (
    <>
      {/* Desktop & Main Header */}
      <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 group transition-transform duration-200 active:scale-95 shrink-0"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black shrink-0">
                  <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                </div>
                <div className="flex flex-col shrink-0">
                  <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors">
                    {t("appName")}
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase whitespace-nowrap">
                    {t("appTagline")}
                  </span>
                </div>
              </Link>

              {/* Course Switcher Pill Button (10 Modules) */}
              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all active:scale-95 shadow-sm shrink-0"
                title={t("openCourseMenu")}
              >
                <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate max-w-[130px] xl:max-w-[190px]">
                  {language === "fr" ? "Semaine" : "Week"} {currentCourse.weekNumber} : {currentCourse.title[language]}
                </span>
                <ChevronDown className="w-3 h-3 text-amber-500/70 shrink-0" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-800/80 shrink-0">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href === "/live" && pathname.startsWith("/live"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                    {link.isLive && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar: Course Menu, Language Selector, Theme Switch & Settings */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile Course Switcher Button */}
              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 shrink-0"
                title={t("openCourseMenu")}
              >
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono">{language === "fr" ? "S" : "W"}{currentCourse.weekNumber}</span>
                <ChevronDown className="w-3 h-3 text-amber-500/70" />
              </button>

              {/* Single Compact Language Toggle Button (FR / EN) */}
              <button
                type="button"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="h-9 sm:h-10 px-2.5 rounded-full flex items-center gap-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-200 active:scale-95 shadow-sm shrink-0"
                title={language === "fr" ? "Passer en anglais (Switch to English)" : "Passer en français (Switch to French)"}
                aria-label="Toggle language FR/EN"
              >
                <span className="text-sm">{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
                <span className="font-black text-amber-600 dark:text-amber-400">
                  {language === "fr" ? "FR" : "EN"}
                </span>
              </button>

              {/* Discrete & Elegant Light / Dark Mode Toggle Icon */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-200/60 dark:hover:bg-zinc-800/80 border border-slate-200 dark:border-zinc-800 transition-all duration-200 active:scale-95 shadow-sm"
                title={settings.theme === "dark" ? (language === "fr" ? "Passer en mode clair" : "Switch to light mode") : (language === "fr" ? "Passer en mode sombre" : "Switch to dark mode")}
                aria-label="Toggle light/dark theme"
              >
                {settings.theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Settings Gear Icon Button */}
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition-all duration-200 active:scale-95"
                title={t("navSettings")}
                aria-label={t("navSettings")}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Course Selection Modal / Drawer */}
      <CourseSelectorModal
        isOpen={isCourseMenuOpen}
        onClose={() => setIsCourseMenuOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar (Hidden during full-screen Live game) */}
      {!pathname.startsWith("/live") && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-xl px-4 py-2 pb-safe">
        <div className="flex items-center justify-between max-w-md mx-auto px-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href === "/live" && pathname.startsWith("/live"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all duration-200 relative ${
                  isActive ? "text-amber-500 dark:text-amber-400 font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all relative ${
                    isActive ? "bg-amber-500/15 text-amber-500 dark:text-amber-400" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {link.isLive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      )}
    </>
  );
};
