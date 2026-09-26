"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface AudioTrackConfig {
  id: string;
  title: string;
  artist: string;
  genre: string;
  sourceType: "local";
  src: string;
}

export const AUDIO_TRACKS: AudioTrackConfig[] = [
  {
    id: "amazing-grace",
    title: "Amazing Grace (Orchestre à cordes doux)",
    artist: "USAFB Strolling Strings • Libre & Domaine Public",
    genre: "Hymne classique",
    sourceType: "local",
    src: "/audio/amazing-grace.mp3",
  },
  {
    id: "it-is-well",
    title: "It Is Well With My Soul / Quel repos céleste",
    artist: "Horatio Spafford & Philip Bliss • Domaine Public",
    genre: "Hymne méditatif",
    sourceType: "local",
    src: "/audio/it-is-well-with-my-soul.mp3",
  },
  {
    id: "canon-in-d",
    title: "Canon en Ré majeur (Cordes & Piano)",
    artist: "Johann Pachelbel • Kevin MacLeod (CC-BY 3.0)",
    genre: "Classique sacré",
    sourceType: "local",
    src: "/audio/canon-in-d.mp3",
  },
  {
    id: "jesu-joy",
    title: "Jésus, que ma joie demeure (Piano & Cordes)",
    artist: "J.S. Bach • Kevin MacLeod (CC-BY 3.0)",
    genre: "Classique sacré",
    sourceType: "local",
    src: "/audio/jesu-joy-of-mans-desiring.mp3",
  },
  {
    id: "nearer-my-god",
    title: "Mon Dieu, plus près de Toi / Nearer My God to Thee",
    artist: "Lowell Mason • Joel Rosenberger (CC-BY)",
    genre: "Hymne classique",
    sourceType: "local",
    src: "/audio/nearer-my-god-to-thee.mp3",
  },
];

export const AudioPlayer: React.FC = () => {
  const { settings, updateSettings } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack =
    AUDIO_TRACKS.find((t) => t.id === settings.soundTrack) || AUDIO_TRACKS[0];

  // 1. Initialize HTML5 Audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // 2. Handle track ended -> Auto-chain / Shuffle to next track seamlessly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (settings.soundShuffle) {
        // Pick another track without repeating the current one
        const candidates = AUDIO_TRACKS.filter((t) => t.id !== settings.soundTrack);
        const nextTrack =
          candidates[Math.floor(Math.random() * candidates.length)] || AUDIO_TRACKS[0];
        updateSettings({ soundTrack: nextTrack.id });
      } else {
        // Single track loop
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [settings.soundShuffle, settings.soundTrack, updateSettings]);

  // 3. Synchronize track source, play/pause state and loop mode
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Loop property: if shuffle is disabled, HTML5 audio naturally loops the current track
    audio.loop = !settings.soundShuffle;

    if (!audio.src.endsWith(currentTrack.src)) {
      audio.src = currentTrack.src;
      audio.load();
    }
    audio.volume = settings.soundVolume;

    if (settings.soundEnabled) {
      audio.play().catch(() => {
        // Autoplay may be restricted until first user interaction
      });
    } else {
      audio.pause();
    }
  }, [currentTrack, settings.soundEnabled, settings.soundShuffle]);

  // 4. Dynamic volume updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.soundVolume;
    }
  }, [settings.soundVolume]);

  return null;
};
