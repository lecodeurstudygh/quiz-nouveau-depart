"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface AudioTrackConfig {
  id: "amazing-grace" | "hillsong" | "jesu-joy";
  title: string;
  artist: string;
  sourceType: "local" | "youtube";
  src: string;
}

export const AUDIO_TRACKS: AudioTrackConfig[] = [
  {
    id: "amazing-grace",
    title: "Amazing Grace (Orchestre à cordes doux)",
    artist: "USAFB Strolling Strings • Libre & Domaine Public",
    sourceType: "local",
    src: "/audio/amazing-grace.mp3",
  },
  {
    id: "hillsong",
    title: "I Surrender (Guitar Instrumental)",
    artist: "Hillsong Instrumentals • Album Depths",
    sourceType: "youtube",
    src: "CAbZ1zfa_6w",
  },
  {
    id: "jesu-joy",
    title: "Jésus, que ma joie demeure (Piano & Cordes)",
    artist: "J.S. Bach • Kevin MacLeod (CC-BY)",
    sourceType: "local",
    src: "/audio/jesu-joy-of-mans-desiring.mp3",
  },
];

export const AudioPlayer: React.FC = () => {
  const { settings } = useLanguage();
  const audioTagRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const isYtReadyRef = useRef<boolean>(false);

  const currentTrack =
    AUDIO_TRACKS.find((t) => t.id === settings.soundTrack) || AUDIO_TRACKS[0];

  // 1. Initialize HTML5 Audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioTagRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.preload = "auto";
      audioTagRef.current = audio;
    }

    return () => {
      if (audioTagRef.current) {
        audioTagRef.current.pause();
      }
    };
  }, []);

  // 2. Initialize YouTube Player once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.YT) {
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.body.appendChild(tag);
        }
      }
    }

    const initYt = () => {
      if (ytPlayerRef.current || !window.YT || !window.YT.Player) return;
      const container = document.getElementById("yt-ambient-player");
      if (!container) return;

      try {
        ytPlayerRef.current = new window.YT.Player("yt-ambient-player", {
          height: "1",
          width: "1",
          videoId: "CAbZ1zfa_6w",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: "CAbZ1zfa_6w",
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              isYtReadyRef.current = true;
              event.target.setVolume(Math.round(settings.soundVolume * 100));
              if (settings.soundEnabled && currentTrack.sourceType === "youtube") {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch (err) {
        console.error("YouTube init error", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initYt();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initYt();
      };
    }
  }, []);

  // 3. Coordinate Playback between Local MP3 and YouTube Stream
  useEffect(() => {
    const audio = audioTagRef.current;
    const isLocal = currentTrack.sourceType === "local";

    if (isLocal) {
      // Pause YouTube if running
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          // Ignore
        }
      }

      if (audio) {
        // Change src if needed
        if (!audio.src.endsWith(currentTrack.src)) {
          audio.src = currentTrack.src;
          audio.load();
        }
        audio.volume = settings.soundVolume;

        if (settings.soundEnabled) {
          audio.play().catch(() => {
            // Browser autoplay restrictions until user clicks
          });
        } else {
          audio.pause();
        }
      }
    } else {
      // Current track is YouTube
      if (audio) {
        audio.pause();
      }

      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.setVolume(Math.round(settings.soundVolume * 100));
          if (settings.soundEnabled) {
            ytPlayerRef.current.playVideo();
          } else {
            ytPlayerRef.current.pauseVideo();
          }
        } catch {
          // Ignore
        }
      }
    }
  }, [currentTrack, settings.soundEnabled, settings.soundVolume]);

  // 4. Dynamic Volume updates
  useEffect(() => {
    if (audioTagRef.current) {
      audioTagRef.current.volume = settings.soundVolume;
    }
    if (ytPlayerRef.current && isYtReadyRef.current) {
      try {
        ytPlayerRef.current.setVolume(Math.round(settings.soundVolume * 100));
      } catch {
        // Ignore
      }
    }
  }, [settings.soundVolume]);

  return (
    <div
      style={{
        position: "fixed",
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        opacity: 0.01,
        pointerEvents: "none",
        zIndex: -9999,
      }}
      aria-hidden="true"
    >
      <div id="yt-ambient-player" />
    </div>
  );
};
