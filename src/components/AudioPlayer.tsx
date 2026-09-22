"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Ambient Audio Synthesizer utilizing Web Audio API
 * Generates soft, peaceful ambient pad chords (D major / A major contemplative spiritual resonance)
 * Completely safe across all browsers (WebKit, Safari, Chromium, Firefox).
 */
export const AudioPlayer: React.FC = () => {
  const { settings } = useLanguage();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  const stopAndCleanupAudio = () => {
    // Stop and disconnect all oscillators
    try {
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore if already stopped
        }
      });
    } catch {
      // Ignore
    }
    oscNodesRef.current = [];

    // Disconnect master gain
    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
      } catch {
        // Ignore
      }
      gainNodeRef.current = null;
    }

    // Safely close audio context
    if (audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        if (ctx.state !== "closed") {
          const closePromise = ctx.close();
          if (closePromise && typeof closePromise.catch === "function") {
            closePromise.catch(() => {});
          }
        }
      } catch {
        // Ignore
      }
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    if (!settings.soundEnabled) {
      stopAndCleanupAudio();
      return;
    }

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(settings.soundVolume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soothing D major chord frequencies: D3 (146.83 Hz), A3 (220 Hz), F#4 (369.99 Hz), D4 (293.66 Hz)
      const freqs = [146.83, 220.0, 293.66, 369.99];
      const oscillators: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Soft sine wave for ethereal peaceful sound
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle vibrato / slow modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        oscillators.push(osc);
        oscillators.push(lfo);
      });

      oscNodesRef.current = oscillators;
    } catch {
      // AudioContext might require user gesture on some browsers
    }

    return () => {
      stopAndCleanupAudio();
    };
  }, [settings.soundEnabled]);

  // Adjust volume dynamically
  useEffect(() => {
    if (
      gainNodeRef.current &&
      audioCtxRef.current &&
      audioCtxRef.current.state === "running"
    ) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(
          settings.soundVolume * 0.15,
          audioCtxRef.current.currentTime,
          0.1
        );
      } catch {
        // Ignore
      }
    }
  }, [settings.soundVolume]);

  return null;
};

