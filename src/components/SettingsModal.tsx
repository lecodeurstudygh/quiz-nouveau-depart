"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  RotateCcw,
  Music,
  Target,
  Shuffle,
  Sparkles,
} from "lucide-react";
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

      <div className="relative w-full max-w-lg glass-panel dark:bg-[#0c0c11]/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200/90 dark:border-white/10 dark:border-t-white/20 z-10 animate-slide-up max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] flex items-center justify-center border border-[#c5a059]/25 shadow-sm">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {t("settingsTitle")}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-zinc-400">
                {language === "fr"
                  ? "Personnalisation & écoute contemplative"
                  : "Customization & ambient reflection"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            aria-label={t("closeBtn")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="py-6 space-y-6">
          {/* 1. Ambient Audio Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#9e7d32] dark:text-[#c5a059]" />
                  <span>{t("soundSetting")}</span>
                </p>
                <p className="text-xs text-neutral-500 dark:text-zinc-400">
                  {language === "fr"
                    ? "Méditation & louange instrumentale locale"
                    : "Worship & reflection offline instrumentals"}
                </p>
              </div>

              {/* Master Mute / Play toggle */}
              <button
                type="button"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all active:scale-95 shadow-sm ${
                  settings.soundEnabled
                    ? "bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] border-[#c5a059]/40 ring-1 ring-[#c5a059]/30"
                    : "bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-zinc-400 border-neutral-200 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {settings.soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-pulse text-[#9e7d32] dark:text-[#c5a059]" />
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

            {/* Shuffle / Auto-chaining Mode Toggle (Active by default) */}
            <div className="p-3.5 rounded-2xl bg-neutral-100/70 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                    settings.soundShuffle
                      ? "bg-[#c5a059]/20 text-[#9e7d32] dark:text-[#d6b26d]"
                      : "bg-neutral-200/70 dark:bg-white/10 text-neutral-500 dark:text-zinc-400"
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-zinc-100 block">
                    {t("soundShuffleLabel")}
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-zinc-400 block">
                    {t("soundShuffleDesc")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateSettings({ soundShuffle: !settings.soundShuffle })}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border active:scale-95 ${
                  settings.soundShuffle
                    ? "bg-[#c5a059] text-neutral-950 border-[#d6b26d] shadow-sm"
                    : "bg-neutral-200/60 dark:bg-white/10 text-neutral-600 dark:text-zinc-400 border-transparent hover:border-neutral-300 dark:hover:border-white/20"
                }`}
              >
                {settings.soundShuffle ? t("soundShuffleActive") : t("soundShuffleInactive")}
              </button>
            </div>

            {/* Track Selector List */}
            <div className="space-y-2 pt-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                {language === "fr" ? "Hymnes & Pièces Sacrées (100% Local) :" : "Sacred Hymns (100% Local) :"}
              </label>

              <div className="space-y-2">
                {AUDIO_TRACKS.map((track) => {
                  const isSelected = settings.soundTrack === track.id;
                  const isCurrentlyPlaying = isSelected && settings.soundEnabled;

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => {
                        updateSettings({ soundTrack: track.id });
                      }}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? "bg-neutral-900 text-white dark:bg-[#121218] dark:text-white border-neutral-900 dark:border-[#c5a059] shadow-md ring-1 ring-neutral-900 dark:ring-[#c5a059]/40"
                          : "bg-white/80 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:border-[#c5a059]/40 dark:hover:border-white/20 hover:bg-neutral-50 dark:hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                            isSelected
                              ? "bg-white text-neutral-950 dark:bg-[#c5a059] dark:text-zinc-950 font-bold scale-105"
                              : "bg-neutral-100 dark:bg-white/10 text-neutral-500 dark:text-zinc-400"
                          }`}
                        >
                          {isCurrentlyPlaying ? (
                            <Volume2 className="w-4 h-4 animate-pulse" />
                          ) : (
                            <Music className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <div className="truncate">
                          <span
                            className={`text-xs sm:text-sm font-semibold block truncate ${
                              isSelected
                                ? "text-white dark:text-[#d6b26d]"
                                : "text-neutral-800 dark:text-zinc-200"
                            }`}
                          >
                            {track.title}
                          </span>
                          <span
                            className={`text-[11px] block truncate ${
                              isSelected
                                ? "text-neutral-300 dark:text-zinc-400"
                                : "text-neutral-500 dark:text-zinc-400"
                            }`}
                          >
                            {track.artist}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium tracking-tight border ${
                            isSelected
                              ? "bg-white/20 text-white border-white/30 dark:bg-[#c5a059]/20 dark:text-[#d6b26d] dark:border-[#c5a059]/40"
                              : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-zinc-400 border-neutral-200 dark:border-white/10"
                          }`}
                        >
                          {track.genre}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume slider */}
            {settings.soundEnabled && (
              <div className="flex items-center gap-3 pt-2 px-1">
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
                  className="w-full accent-[#c5a059] h-1.5 bg-neutral-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-neutral-500 dark:text-zinc-400 min-w-[36px] text-right">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* 2. Quiz Passing Threshold Section */}
          <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#9e7d32] dark:text-[#c5a059]" />
                  <span>{t("quizThresholdLabel")}</span>
                </p>
                <p className="text-xs text-neutral-500 dark:text-zinc-400">
                  {t("quizThresholdDesc")}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#c5a059]/15 text-[#9e7d32] dark:text-[#d6b26d] border border-[#c5a059]/30">
                {settings.quizPassThreshold ?? 70}%
              </span>
            </div>

            {/* Quick preset buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 60, label: "60%" },
                { val: 70, label: language === "fr" ? "70% (Défaut)" : "70% (Default)" },
                { val: 80, label: language === "fr" ? "80% (Excellence)" : "80% (Mastery)" },
              ].map((p) => {
                const isSelected = (settings.quizPassThreshold ?? 70) === p.val;
                return (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => updateSettings({ quizPassThreshold: p.val })}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
                      isSelected
                        ? "bg-[#c5a059] text-neutral-950 border-[#d6b26d] shadow-sm font-bold"
                        : "bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:border-[#c5a059]/40 text-neutral-700 dark:text-zinc-300"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Range slider */}
            <div className="flex items-center gap-3 pt-1 px-1">
              <span className="text-xs text-neutral-400 font-mono">50%</span>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={settings.quizPassThreshold ?? 70}
                onChange={(e) =>
                  updateSettings({ quizPassThreshold: parseInt(e.target.value, 10) })
                }
                className="w-full accent-[#c5a059] h-1.5 bg-neutral-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-neutral-400 font-mono">100%</span>
            </div>
          </div>

          {/* 3. Verse Memorization Progress Reset */}
          <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-sm text-neutral-900 dark:text-white">
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
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 bg-neutral-100 dark:bg-white/5 hover:bg-rose-500/10 border border-neutral-200 dark:border-white/10 hover:border-rose-500/30 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("resetDeckBtn")}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex justify-end">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-7 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};
