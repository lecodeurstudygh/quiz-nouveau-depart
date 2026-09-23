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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      {/* Click backdrop to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsSettingsOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700/60 z-10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t("settingsTitle")}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                <p className="font-semibold text-slate-800 dark:text-slate-200">{t("soundSetting")}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === "fr"
                    ? "Méditation & louange instrumentale"
                    : "Worship & reflection instrumental track"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                  settings.soundEnabled
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
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
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500/50 shadow-sm ring-1 ring-amber-500/40"
                          : "bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-400/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <Music className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span
                            className={`text-xs font-bold block truncate ${
                              isSelected
                                ? "text-amber-600 dark:text-amber-300"
                                : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {track.title}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
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
                <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[70px]">
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
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* 2. Reset Memorization Progress */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === "fr" ? "Mémoire des versets" : "Verse Memory"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === "fr"
                  ? "Remettre à zéro les versets cochés"
                  : "Reset marked memorized cards"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetMemorization}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("resetDeckBtn")}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all active:scale-95"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};
