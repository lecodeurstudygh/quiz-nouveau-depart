"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Layers, HelpCircle, Settings, Sparkles, ChevronDown, Compass, Sun, Moon, MessageSquareText, Radio, Music } from "lucide-react";
import { CourseSelectorModal } from "@/components/CourseSelectorModal";
import { ALL_COURSES } from "@/data/curriculum";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t, setIsSettingsOpen, selectedWeekId, settings, updateSettings, toggleTheme } = useLanguage();
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  const currentCourse = ALL_COURSES.find((c) => c.id === selectedWeekId) || ALL_COURSES[0];

  const toggleMusic = () => {
    if (settings.soundEnabled) {
      updateSettings({ soundEnabled: false });
    } else {
      updateSettings({
        soundEnabled: true,
        soundShuffle: true,
      });
    }
  };

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
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-4">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-200 active:scale-95 shrink-0"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shadow-sm shrink-0 border border-neutral-700/20 dark:border-neutral-200">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
                </div>
                <div className="flex flex-col shrink min-w-0">
                  <span className="text-xs sm:text-base md:text-lg font-black tracking-tight text-neutral-900 dark:text-white truncate group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {t("appName")}
                  </span>
                  <span className="text-[8px] sm:text-[10px] md:text-[11px] font-bold text-[#9e7d32] dark:text-[#c5a059] tracking-wider uppercase truncate">
                    {t("appTagline")}
                  </span>
                </div>
              </Link>

              {/* Desktop Course Switcher Pill Button (10 Modules) */}
              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-800 transition-all active:scale-95 shadow-sm shrink-0"
                title={t("openCourseMenu")}
              >
                <Compass className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="truncate max-w-[130px] xl:max-w-[190px]">
                  {language === "fr" ? "Semaine" : "Week"} {currentCourse.weekNumber} : {currentCourse.title[language]}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-zinc-900 p-1.5 rounded-full border border-neutral-200 dark:border-zinc-800 shrink-0">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href === "/live" && pathname.startsWith("/live"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm font-semibold"
                        : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white dark:text-neutral-950" : "text-neutral-400 dark:text-zinc-500"}`} />
                    <span>{link.label}</span>
                    {link.isLive && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar: Course Menu, Language Selector, Theme Switch & Settings */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Mobile Course Switcher Button */}
              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(true)}
                className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 text-neutral-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-800 shrink-0 h-8 sm:h-9 active:scale-95 transition-all shadow-sm"
                title={t("openCourseMenu")}
              >
                <Compass className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="font-mono text-xs">{language === "fr" ? "S" : "W"}{currentCourse.weekNumber}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
              </button>

              {/* Single Compact Language Toggle Button (FR / EN) */}
              <button
                type="button"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-full flex items-center gap-1 text-xs font-bold bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 transition-all duration-200 active:scale-95 shadow-sm shrink-0"
                title={language === "fr" ? "Passer en anglais (Switch to English)" : "Passer en français (Switch to French)"}
                aria-label="Toggle language FR/EN"
              >
                <span className="text-xs">{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
                <span className="font-black text-[11px] sm:text-xs text-neutral-800 dark:text-zinc-200">
                  {language === "fr" ? "FR" : "EN"}
                </span>
              </button>

              {/* Ambient Music Quick Play/Pause Button (Aléatoire par défaut) */}
              <button
                type="button"
                onClick={toggleMusic}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm shrink-0 border ${
                  settings.soundEnabled
                    ? "bg-[#c5a059]/20 border-[#c5a059] text-[#9e7d32] dark:text-[#c5a059] ring-2 ring-[#c5a059]/30"
                    : "bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400"
                }`}
                title={
                  settings.soundEnabled
                    ? (language === "fr" ? "Arrêter la musique d'ambiance" : "Pause ambient music")
                    : (language === "fr" ? "Écouter la musique d'ambiance (aléatoire par défaut)" : "Play ambient music (shuffle by default)")
                }
                aria-label="Toggle ambient music"
              >
                <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${settings.soundEnabled ? "animate-pulse text-[#c5a059]" : ""}`} />
                {settings.soundEnabled && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                )}
              </button>

              {/* Discrete & Elegant Light / Dark Mode Toggle Icon */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 transition-all duration-200 active:scale-95 shadow-sm shrink-0"
                title={settings.theme === "dark" ? (language === "fr" ? "Passer en mode clair" : "Switch to light mode") : (language === "fr" ? "Passer en mode sombre" : "Switch to dark mode")}
                aria-label="Toggle light/dark theme"
              >
                {settings.theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Settings Gear Icon Button */}
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200/70 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 transition-all duration-200 active:scale-95 shadow-sm shrink-0"
                title={t("navSettings")}
                aria-label={t("navSettings")}
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

      {/* Mobile Bottom Navigation Bar (Hidden only during full-screen teacher Zoom host presentation) */}
      {!pathname.startsWith("/live/host") && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c0c11]/95 border-t border-neutral-200/80 dark:border-white/10 backdrop-blur-2xl px-1 py-1 pb-[calc(env(safe-area-inset-bottom,0px)+4px)] shadow-lg">
          <div className="grid grid-cols-5 w-full max-w-md mx-auto items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href === "/live" && pathname.startsWith("/live"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 relative w-full ${
                    isActive ? "text-neutral-950 dark:text-white font-bold" : "text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-full transition-all relative ${
                      isActive ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.isLive && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] leading-tight font-medium tracking-tight truncate max-w-full px-0.5 text-center">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};
