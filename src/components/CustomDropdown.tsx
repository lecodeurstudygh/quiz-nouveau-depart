"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, X } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  count?: number;
  badge?: string;
}

interface CustomDropdownProps {
  title?: string;
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  maxTriggerWidth?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  title,
  value,
  options,
  onChange,
  placeholder,
  className = "",
  maxTriggerWidth = "max-w-[260px] sm:max-w-xs",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 pl-3.5 pr-2.5 py-1.5 text-xs font-semibold rounded-full bg-neutral-100 hover:bg-neutral-200/80 dark:bg-zinc-800/90 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-[#c5a059]/60 dark:hover:border-[#c5a059]/60 transition-all active:scale-[0.98] shadow-sm select-none ${maxTriggerWidth}`}
      >
        <span className="truncate text-left">
          {selectedOption ? selectedOption.label : placeholder || ""}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#c5a059]" : ""
          }`}
        />
      </button>

      {/* 1. Desktop Popover (rendered in-place below trigger) */}
      {isOpen && (
        <div className="hidden sm:flex absolute left-0 top-full mt-1.5 z-50 w-72 max-w-xs max-h-80 bg-white/98 dark:bg-[#121217]/98 backdrop-blur-2xl rounded-2xl border border-neutral-200 dark:border-white/10 shadow-2xl overflow-hidden flex-col animate-scale-in">
          <div className="overflow-y-auto p-1.5 space-y-1 divide-y divide-transparent custom-scrollbar max-h-72">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-[#c5a059] dark:text-zinc-950 font-bold shadow-sm"
                      : "text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  <span className="truncate flex-1">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Mobile Bottom Sheet Drawer (Portaled to body to escape parent transform/backdrop-filter) */}
      {isOpen && mounted && createPortal(
        <div className="sm:hidden fixed inset-0 z-[150] flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Luxury Bottom Drawer */}
          <div className="relative z-[160] w-full max-h-[75vh] bg-[#fcfbfa] dark:bg-[#121217] rounded-t-3xl border-t border-neutral-200 dark:border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col pb-[calc(env(safe-area-inset-bottom,0px)+28px)] animate-slide-up">
            {/* Grab handle */}
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-white/20 mx-auto mt-2.5 mb-1" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200/80 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9e7d32] dark:text-[#d6b26d]">
                {title || "Sélectionner"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-200/70 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-zinc-300 hover:text-neutral-950 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options list */}
            <div className="overflow-y-auto p-3 space-y-1.5 custom-scrollbar max-h-[55vh]">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-xs font-medium text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? "bg-[#c5a059] text-zinc-950 font-bold shadow-md shadow-[#c5a059]/20"
                        : "bg-white dark:bg-white/5 border border-neutral-200/80 dark:border-white/5 text-neutral-800 dark:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="truncate flex-1">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
