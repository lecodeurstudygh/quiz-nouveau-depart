"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { VerseDetail } from "@/data/versesLookup";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Copy, Check, X } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key & lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !verse || !mounted) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${verse.reference} (${verse.translation}) : « ${verse.text} »`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#111116] border border-[#c5a059]/30 shadow-2xl p-6 sm:p-7 text-zinc-100 animate-scale-in space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#c5a059]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#8a5d3b]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#d6b26d]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  {verse.reference}
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#c5a059]/15 text-[#d6b26d] border border-[#c5a059]/30 font-bold">
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
        <div className="relative z-10 pl-3.5 border-l-2 border-[#c5a059] space-y-2 py-1">
          <blockquote className="text-base sm:text-lg font-serif italic text-zinc-100 leading-relaxed">
            « {verse.text} »
          </blockquote>
          <span className="inline-block text-[11px] font-mono text-[#d6b26d]/80">
            {language === "fr" ? "Version officielle Segond 21" : "Official NIV Translation"}
          </span>
        </div>

        {/* Modal Footer Actions */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#c5a059]/15 hover:bg-[#c5a059]/25 text-[#d6b26d] border border-[#c5a059]/30 transition-all active:scale-95"
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

  return createPortal(modalContent, document.body);
};
