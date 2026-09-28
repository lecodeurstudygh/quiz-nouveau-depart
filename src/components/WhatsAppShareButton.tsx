"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface WhatsAppShareButtonProps {
  pin: string;
  playerUrl: string;
  variant?: "primary" | "compact" | "subtle";
  className?: string;
  customLabel?: string;
}

export function WhatsAppShareButton({
  pin,
  playerUrl,
  variant = "primary",
  className = "",
  customLabel,
}: WhatsAppShareButtonProps) {
  const { language, t } = useLanguage();

  const formattedPin = pin.length === 6 ? `${pin.slice(0, 3)} ${pin.slice(3)}` : pin;

  const shareText =
    language === "fr"
      ? `✨ *Quiz Live Nouveau Départ • Hillsong France* ✨\n\nRejoins-nous en direct pour le quiz interactif !\n\n👉 *Lien direct pour jouer :*\n${playerUrl}\n\n🔑 *Code PIN :* ${formattedPin}\n\nÀ tout de suite ! 🚀`
      : `✨ *New Beginnings Live Quiz • Hillsong France* ✨\n\nJoin us live for the interactive quiz!\n\n👉 *Direct link to join :*\n${playerUrl}\n\n🔑 *PIN Code :* ${formattedPin}\n\nSee you inside! 🚀`;

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  if (variant === "compact") {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1e7e34] dark:text-[#25D366] border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all active:scale-95 shadow-sm ${className}`}
        title={customLabel || t("inviteWhatsAppHeaderBtn")}
      >
        <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
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
        className={`flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1e7e34] dark:text-[#25D366] border border-[#25D366]/30 transition-all active:scale-95 ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
        <span>{customLabel || t("playerInviteWhatsAppBtn")}</span>
      </a>
    );
  }

  // Primary variant: prominent CTA
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/35 transition-all active:scale-95 ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 fill-current shrink-0" />
      <span>{customLabel || t("inviteWhatsAppBtn")}</span>
    </a>
  );
}
