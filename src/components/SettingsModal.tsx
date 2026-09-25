"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, SlidersHorizontal, Volume2, VolumeX, RotateCcw, Music } from "lucide-react";
import { AUDIO_TRACKS } from "@/components/AudioPlayer";

export const SettingsModal: React.FC = () => {
  const {
    language,
    t,
    isSettingsOpen,
    setIsSettingsOpen,
    settings,
    updateSettings,
  } = useLanguage();

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSettingsOpen(false);
    };
    if (isSettingsOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen, setIsSettingsOpen]);

  if (!isSettingsOpen) return null;

  const handleResetMemorization = () => {
    if (
      confirm(
        language === "fr"
          ? "Réinitialiser la progression de mémorisation des versets ?"
          : "Reset your verse memorization progress?"
      )
    ) {
      try {
        localStorage.removeItem("nd_memorized_verses");
        window.location.reload();
      } catch {
        // Ignore
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Click backdrop to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsSettingsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200/80 dark:border-zinc-800/80 z-10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-700 dark:text-[#d6b26d] flex items-center justify-center border border-amber-500/20">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
                {t("settingsTitle")}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="py-6 space-y-6">
          {/* 1. Ambient Audio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-800 dark:text-zinc-200">{t("soundSetting")}</p>
                <p className="text-xs text-neutral-500 dark:text-zinc-400">
                  {language === "fr"
                    ? "Méditation & louange instrumentale"
                    : "Worship & reflection instrumental track"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
                  settings.soundEnabled
                    ? "bg-amber-500/15 text-amber-700 dark:text-[#d6b26d] border-amber-500/40"
                    : "bg-neutral-100 dark:bg-zinc-900 text-neutral-500 dark:text-zinc-400 border-neutral-200 dark:border-zinc-800 hover:text-neutral-900 dark:hover:text-zinc-200"
                }`}
              >
                {settings.soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>{t("soundPlaying")}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{t("soundMuted")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Track Selector */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                {language === "fr" ? "Piste instrumentale sélectionnée :" : "Selected Instrumental Track:"}
              </label>
              <div className="space-y-1.5">
                {AUDIO_TRACKS.map((track) => {
                  const isSelected = settings.soundTrack === track.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => updateSettings({ soundTrack: track.id })}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all ${
                        isSelected
                          ? "bg-neutral-900 text-white dark:bg-zinc-900 dark:text-white border-neutral-900 dark:border-[#c5a059] shadow-md ring-1 ring-neutral-900 dark:ring-[#c5a059]/40"
                          : "bg-white/80 dark:bg-zinc-900/60 border-neutral-200 dark:border-zinc-800/80 hover:border-neutral-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-white text-neutral-950 dark:bg-[#c5a059] dark:text-zinc-950 font-bold"
                              : "bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
                          }`}
                        >
                          <Music className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span
                            className={`text-xs font-bold block truncate ${
                              isSelected
                                ? "text-white dark:text-[#d6b26d]"
                                : "text-neutral-800 dark:text-zinc-200"
                            }`}
                          >
                            {track.title}
                          </span>
                          <span className={`text-[10px] block truncate ${isSelected ? "text-neutral-300 dark:text-zinc-400" : "text-neutral-500 dark:text-zinc-400"}`}>
                            {track.artist}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          track.sourceType === "local"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {track.sourceType === "local"
                          ? language === "fr" ? "MP3 Local" : "Local MP3"
                          : "YouTube"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {settings.soundEnabled && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-neutral-500 dark:text-zinc-400 min-w-[70px]">
                  {t("soundVolumeLabel")}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) =>
                    updateSettings({ soundVolume: parseFloat(e.target.value) })
                  }
                  className="w-full accent-amber-500 h-1.5 bg-neutral-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-neutral-500 dark:text-zinc-400">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* 2. Reset Memorization Progress */}
          <div className="pt-4 border-t border-neutral-200 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <p className="font-semibold text-neutral-800 dark:text-zinc-200">
                {language === "fr" ? "Mémoire des versets" : "Verse Memory"}
              </p>
              <p className="text-xs text-neutral-500 dark:text-zinc-400">
                {language === "fr"
                  ? "Remettre à zéro les versets cochés"
                  : "Reset marked memorized cards"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetMemorization}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("resetDeckBtn")}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-200 dark:border-zinc-800/80 flex justify-end">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-zinc-950 text-sm font-bold shadow-md transition-all active:scale-95"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};
