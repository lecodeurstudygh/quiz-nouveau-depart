/**
 * Safe client-side dynamic confetti utility
 * Prevents SSR evaluation issues and Webpack CJS/ESM interop mismatches.
 */
export const triggerConfetti = async (options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
}) => {
  if (typeof window === "undefined") return;
  try {
    const confettiModule = await import("canvas-confetti");
    const confetti =
      (confettiModule as unknown as { default?: (opts?: unknown) => void }).default ||
      (confettiModule as unknown as (opts?: unknown) => void);

    if (typeof confetti === "function") {
      confetti(options);
    }
  } catch {
    // Graceful fallback if canvas is not supported or in test environments
  }
};
