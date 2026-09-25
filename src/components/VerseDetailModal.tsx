"use client";

import React, { useState, useEffect } from "react";
import { VerseDetail } from "@/data/versesLookup";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Copy, Check, X, Sparkles } from "lucide-react";

interface VerseDetailModalProps {
  verse: VerseDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VerseDetailModal: React.FC<VerseDetailModalProps> = ({
  verse,
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !verse) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${verse.reference} (${verse.translation}) : « ${verse.text} »`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#131318] border border-amber-500/30 shadow-2xl p-6 sm:p-7 text-zinc-100 animate-scale-in space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#8a5d3b]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  {verse.reference}
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/10 font-bold">
                  {verse.translation}
                </span>
              </div>
              {verse.theme && (
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  {verse.theme}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title={t("closeBtn")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scripture Text Body */}
        <div className="relative z-10 pl-3.5 border-l-2 border-amber-500 space-y-2 py-1">
          <blockquote className="text-base sm:text-lg font-serif italic text-zinc-100 leading-relaxed">
            « {verse.text} »
          </blockquote>
          <span className="inline-block text-[11px] font-mono text-amber-400/80">
            {language === "fr" ? "Version officielle Segond 21" : "Official NIV Translation"}
          </span>
        </div>

        {/* Modal Footer Actions */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t("copiedSuccess")}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t("copyVerseBtn")}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white transition-all active:scale-95"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};
