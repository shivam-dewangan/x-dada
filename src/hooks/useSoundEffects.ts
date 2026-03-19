import { useCallback, useRef } from "react";

const createBeep = (frequency: number, duration: number, volume: number, type: OscillatorType = "sine") => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail if audio not supported
  }
};

export const useSoundEffects = () => {
  const lastHover = useRef(0);

  const playHover = useCallback(() => {
    const now = Date.now();
    if (now - lastHover.current < 80) return;
    lastHover.current = now;
    createBeep(800, 0.08, 0.04, "sine");
  }, []);

  const playClick = useCallback(() => {
    createBeep(600, 0.1, 0.06, "triangle");
    setTimeout(() => createBeep(900, 0.08, 0.04, "sine"), 50);
  }, []);

  const playWelcome = useCallback(() => {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => createBeep(freq, 0.3, 0.05, "sine"), i * 150);
    });
  }, []);

  return { playHover, playClick, playWelcome };
};
