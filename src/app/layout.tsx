import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { SettingsModal } from "@/components/SettingsModal";
import { AudioPlayer } from "@/components/AudioPlayer";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};

export const metadata: Metadata = {
  title: "Nouveau Départ • Hillsong France",
  description:
    "Application interactive d'ancrage biblique pour le parcours Nouveau Départ de Hillsong France. Mémorisation des versets, quiz d'apprentissage et révision bilingue (FR/EN).",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nouveau Départ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-[#f6f6f6] text-neutral-900 dark:bg-[#0b0b0e] dark:text-zinc-100 min-h-screen flex flex-col font-sans antialiased transition-colors duration-200 overflow-x-hidden">
        <LanguageProvider>
          <AudioPlayer />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 md:py-10 pb-28 md:pb-12 overflow-x-hidden">
            {children}
          </main>
          <SettingsModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
