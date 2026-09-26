"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { findVerseByReference, VerseDetail } from "@/data/versesLookup";
import { BookOpen, Eye } from "lucide-react";
import { VerseDetailModal } from "./VerseDetailModal";

interface TooltipPosition {
  top: number;
  left: number;
  arrowLeft: number;
  placement: "above" | "below";
}

interface FloatingTooltipProps {
  verse: VerseDetail;
  pos: TooltipPosition;
  language: string;
}

const FloatingTooltip: React.FC<FloatingTooltipProps> = ({ verse, pos, language }) => {
  return (
    <div
      className="fixed z-[9999] w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0e0e13]/95 border border-[#c5a059]/40 shadow-2xl backdrop-blur-xl pointer-events-none text-left animate-fade-in text-zinc-100"
      style={{
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        transform: pos.placement === "above" ? "translateY(-100%)" : "none",
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.85))",
      }}
    >
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <BookOpen className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
          <span className="text-xs font-bold text-[#d6b26d] truncate">
            {verse.reference}
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 shrink-0">
            {verse.translation}
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase text-zinc-400 font-semibold shrink-0">
          {language === "fr" ? "Aperçu" : "Preview"}
        </span>
      </div>

      <p className="text-xs text-zinc-100 font-serif italic line-clamp-4 leading-relaxed">
        « {verse.text} »
      </p>

      <div className="mt-2 pt-1 border-t border-white/10 text-[10px] text-[#c5a059]/90 text-right font-sans font-medium flex items-center justify-end gap-1">
        <span>{language === "fr" ? "Cliquer pour voir en entier" : "Click to read full verse"}</span>
      </div>

      {/* Arrow indicator positioned relative to pill center */}
      <div
        className={`absolute border-4 border-transparent ${
          pos.placement === "above"
            ? "top-full border-t-[#0e0e13] -mt-0.5"
            : "bottom-full border-b-[#0e0e13] -mb-0.5"
        }`}
        style={{ left: `${pos.arrowLeft}px`, transform: "translateX(-50%)" }}
      />
    </div>
  );
};

// Hook for floating tooltip calculation with strict screen clamping
function useVerseTooltip(reference: string) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const verseData = findVerseByReference(reference, language);

  const handleMouseEnter = () => {
    if (!triggerRef.current || !verseData) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 300; // 300px width
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
    const padding = 12;

    const pillCenter = rect.left + rect.width / 2;
    let left = pillCenter - tooltipWidth / 2;

    // Clamping within visible viewport
    if (left < padding) {
      left = padding;
    } else if (left + tooltipWidth > screenWidth - padding) {
      left = screenWidth - tooltipWidth - padding;
    }

    const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, pillCenter - left));

    let top = rect.top - 10;
    let placement: "above" | "below" = "above";

    // If too close to viewport top, show below the pill
    if (rect.top < 150) {
      top = rect.bottom + 10;
      placement = "below";
    }

    setTooltipPos({ top, left, arrowLeft, placement });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    language,
    isHovered,
    tooltipPos,
    verseData,
    triggerRef,
    isMounted,
    handleMouseEnter,
    handleMouseLeave,
  };
}

// 1. Standalone Verse Pill Component (for bottom pills bar)
interface VersePillProps {
  reference: string;
}

export const VersePill: React.FC<VersePillProps> = ({ reference }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    language,
    isHovered,
    tooltipPos,
    verseData,
    triggerRef,
    isMounted,
    handleMouseEnter,
    handleMouseLeave,
  } = useVerseTooltip(reference);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents flipping the parent flashcard!
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#c5a059]/15 hover:bg-[#c5a059]/25 text-[#d6b26d] border border-[#c5a059]/35 hover:border-[#c5a059]/60 transition-all duration-150 active:scale-95 shadow-sm group/pill cursor-pointer"
        title={
          language === "fr"
            ? `Cliquer pour lire ${reference}`
            : `Click to read ${reference}`
        }
      >
        <BookOpen className="w-3.5 h-3.5 text-[#c5a059] group-hover/pill:scale-110 transition-transform" />
        <span>{reference}</span>
        <Eye className="w-2.5 h-2.5 text-[#c5a059]/70 group-hover/pill:text-[#d6b26d] transition-colors" />
      </button>

      {/* Floating Unclipped Tooltip in Portal */}
      {isMounted &&
        isHovered &&
        verseData &&
        tooltipPos &&
        createPortal(
          <FloatingTooltip
            verse={verseData}
            pos={tooltipPos}
            language={language}
          />,
          document.body
        )}

      {/* Modal on Click (Desktop & Mobile) */}
      <VerseDetailModal
        verse={
          verseData || {
            reference,
            translation: language === "fr" ? "S21" : "NIV",
            text: reference,
          }
        }
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// 2. Inline Verse Citation Component (for clickable citations inside answer text)
interface InlineVerseLinkProps {
  reference: string;
}

export const InlineVerseLink: React.FC<InlineVerseLinkProps> = ({ reference }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    language,
    isHovered,
    tooltipPos,
    verseData,
    triggerRef,
    isMounted,
    handleMouseEnter,
    handleMouseLeave,
  } = useVerseTooltip(reference);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents flipping the parent flashcard!
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center gap-1 text-[#d6b26d] hover:text-[#f3dfb3] font-semibold underline decoration-[#c5a059]/60 hover:decoration-[#d6b26d] underline-offset-2 transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-[#c5a059]/15 active:scale-95"
        title={
          language === "fr"
            ? `Cliquer pour lire ${reference}`
            : `Click to read ${reference}`
        }
      >
        <BookOpen className="w-3 h-3 text-[#c5a059] shrink-0 inline" />
        <span>{reference}</span>
      </button>

      {/* Floating Unclipped Tooltip in Portal */}
      {isMounted &&
        isHovered &&
        verseData &&
        tooltipPos &&
        createPortal(
          <FloatingTooltip
            verse={verseData}
            pos={tooltipPos}
            language={language}
          />,
          document.body
        )}

      {/* Modal on Click */}
      <VerseDetailModal
        verse={
          verseData || {
            reference,
            translation: language === "fr" ? "S21" : "NIV",
            text: reference,
          }
        }
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// 3. Interactive Answer Text Renderer: Detects citations and transforms them into interactive links
const BIBLE_REF_SPLIT_REGEX =
  /((?:[123]\s+)?[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?\s+\d+(?::\d+(?:-\d+)?)?)/g;

interface InteractiveAnswerTextProps {
  text: string;
}

export const InteractiveAnswerText: React.FC<InteractiveAnswerTextProps> = ({ text }) => {
  const { language } = useLanguage();

  if (!text) return null;

  // Split text by bible reference pattern while capturing matches
  const parts = text.split(BIBLE_REF_SPLIT_REGEX);

  return (
    <div className="text-sm sm:text-base text-slate-100 leading-relaxed whitespace-pre-line font-sans">
      {parts.map((part, index) => {
        const trimmed = part ? part.trim() : "";
        // Check if trimmed part corresponds to a known verse in our dictionary
        if (trimmed && trimmed.length >= 4) {
          const matchDetail = findVerseByReference(trimmed, language);
          if (matchDetail) {
            return <InlineVerseLink key={index} reference={trimmed} />;
          }
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </div>
  );
};
