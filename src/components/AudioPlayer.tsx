"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Default stream: Hillsong Instrumentals - I Surrender (Guitar Instrumental, album Depths)
export const YOUTUBE_AMBIENT_TRACK = {
  id: "CAbZ1zfa_6w",
  title: "I Surrender (Guitar Instrumental)",
  artist: "Hillsong Instrumentals",
  url: "https://www.youtube.com/watch?v=CAbZ1zfa_6w",
};

// Local audio path if user places an MP3 inside /public/audio/
export const LOCAL_AUDIO_PATH = "/audio/instrumental.mp3";

export const AudioPlayer: React.FC = () => {
  const { settings } = useLanguage();
  const [hasLocalFile, setHasLocalFile] = useState<boolean>(false);
  const audioTagRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const isYtReadyRef = useRef<boolean>(false);

  // Check if a local audio file is available in /public/audio/instrumental.mp3
  useEffect(() => {
    if (typeof window === "undefined") return;

    fetch(LOCAL_AUDIO_PATH, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setHasLocalFile(true);
      })
      .catch(() => {
        // Local file not present, YouTube stream will be used
      });
  }, []);

  // 1. LOCAL AUDIO MANAGEMENT (HTML5 <audio>)
  useEffect(() => {
    if (!hasLocalFile) return;

    if (!audioTagRef.current) {
      const audio = new Audio(LOCAL_AUDIO_PATH);
      audio.loop = true;
      audio.volume = settings.soundVolume;
      audioTagRef.current = audio;
    }

    const audio = audioTagRef.current;
    audio.volume = settings.soundVolume;

    if (settings.soundEnabled) {
      audio.play().catch(() => {
        // Autoplay may need user gesture
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [hasLocalFile, settings.soundEnabled]);

  // Adjust local audio volume
  useEffect(() => {
    if (audioTagRef.current) {
      audioTagRef.current.volume = settings.soundVolume;
    }
  }, [settings.soundVolume]);

  // 2. YOUTUBE IFRAME STREAM (Used when no local MP3 file is present)
  useEffect(() => {
    if (hasLocalFile || typeof window === "undefined") return;

    // Load YouTube Iframe API script if not yet loaded
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

    const initYtPlayer = () => {
      if (ytPlayerRef.current || !window.YT || !window.YT.Player) return;

      const playerContainer = document.getElementById("yt-ambient-player");
      if (!playerContainer) return;

      try {
        ytPlayerRef.current = new window.YT.Player("yt-ambient-player", {
          height: "1",
          width: "1",
          videoId: YOUTUBE_AMBIENT_TRACK.id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: YOUTUBE_AMBIENT_TRACK.id, // Required by YouTube for looping
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              isYtReadyRef.current = true;
              event.target.setVolume(Math.round(settings.soundVolume * 100));
              if (settings.soundEnabled) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // Ensure continuous loop when video ends
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch (err) {
        console.error("YouTube Player init error:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initYtPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initYtPlayer();
      };
    }
  }, [hasLocalFile]);

  // Handle Play / Pause for YouTube Player
  useEffect(() => {
    if (hasLocalFile || !ytPlayerRef.current || !isYtReadyRef.current) return;
    try {
      if (settings.soundEnabled) {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
    } catch {
      // Ignore
    }
  }, [hasLocalFile, settings.soundEnabled]);

  // Handle Volume change for YouTube Player
  useEffect(() => {
    if (hasLocalFile || !ytPlayerRef.current || !isYtReadyRef.current) return;
    try {
      ytPlayerRef.current.setVolume(Math.round(settings.soundVolume * 100));
    } catch {
      // Ignore
    }
  }, [hasLocalFile, settings.soundVolume]);

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
