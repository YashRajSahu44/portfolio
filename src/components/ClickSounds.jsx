import { useEffect } from "react";
function playClick() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    // short high-freq "tick" — mechanical keyboard vibe
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(1800, now);
    o.frequency.exponentialRampToValueAtTime(900, now + 0.04);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    o.connect(g).connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.07);
    // tiny noise burst for the "click" body
    const bufferSize = Math.floor(ctx.sampleRate * 0.03);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.08, now);
    ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    noise.connect(ng).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.03);
    window.setTimeout(() => ctx.close(), 200);
  } catch {
    /* no-op */
  }
}
export function ClickSounds() {
  useEffect(() => {
    const handler = () => playClick();
    window.addEventListener("pointerdown", handler, { passive: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);
  return null;
}
