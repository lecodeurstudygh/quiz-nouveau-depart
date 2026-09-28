"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9.5c.3 1.2 1.8 2.7 3 3" />
    </svg>
  );
}

interface WhatsAppShareButtonProps {
  pin: string;
  playerUrl: string;
  variant?: "primary" | "compact" | "subtle";
  className?: string;
  customLabel?: string;
  customShareText?: string;
}

export function WhatsAppShareButton({
  pin,
  playerUrl,
  variant = "primary",
  className = "",
  customLabel,
  customShareText,
}: WhatsAppShareButtonProps) {
  const { language, t } = useLanguage();

  const formattedPin = pin.length === 6 ? `${pin.slice(0, 3)} ${pin.slice(3)}` : pin;

  const defaultShareText =
    language === "fr"
      ? `✨ *Quiz Live Nouveau Départ • Hillsong France* ✨\n\nRejoins-nous en direct pour le quiz interactif !\n\n👉 *Lien direct pour jouer :*\n${playerUrl}\n\n🔑 *Code PIN :* ${formattedPin}\n\nÀ tout de suite ! 🚀`
      : `✨ *New Beginnings Live Quiz • Hillsong France* ✨\n\nJoin us live for the interactive quiz!\n\n👉 *Direct link to join :*\n${playerUrl}\n\n🔑 *PIN Code :* ${formattedPin}\n\nSee you inside! 🚀`;

  const shareText = customShareText || defaultShareText;

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  if (variant === "compact") {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-full bg-white dark:bg-[#121217] hover:bg-stone-50 dark:hover:bg-white/10 text-stone-700 dark:text-zinc-200 border border-stone-200 dark:border-white/10 hover:border-[#25D366]/50 transition-all active:scale-95 shadow-sm group ${className}`}
        title={customLabel || t("inviteWhatsAppHeaderBtn")}
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
        <span className="hidden md:inline truncate">{customLabel || t("inviteWhatsAppHeaderBtn")}</span>
      </a>
    );
  }

  if (variant === "subtle") {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-white/10 hover:border-[#25D366]/40 transition-all active:scale-95 group ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
        <span>{customLabel || t("playerInviteWhatsAppBtn")}</span>
      </a>
    );
  }

  // Primary variant: sleek, harmonious card button with only green logo contour
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white dark:bg-[#16161f] hover:bg-stone-50 dark:hover:bg-[#1e1e29] border border-stone-200 dark:border-white/15 hover:border-[#25D366]/60 text-stone-800 dark:text-zinc-100 font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 group ${className}`}
    >
      <div className="w-6 h-6 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/30 group-hover:border-[#25D366] transition-colors">
        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
      </div>
      <span>{customLabel || t("inviteWhatsAppBtn")}</span>
    </a>
  );
}
