import { useEffect, useRef } from "react";

export function ClickSounds() {
  const audioContextRef = useRef(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    const playClick = (event) => {
      if (event.type === "pointerdown" && (!event.isPrimary || event.button !== 0)) return;
      if (event.type === "click" && event.detail !== 0) return;

      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;

      const now = performance.now();
      if (now - lastClickTimeRef.current < 150) return;
      lastClickTimeRef.current = now;

      try {
        const audioContext = audioContextRef.current ?? new AudioContextConstructor();
        audioContextRef.current = audioContext;

        const playTone = () => {
          const now = audioContext.currentTime;
          const sampleCount = Math.floor(audioContext.sampleRate * 0.02);
          const noiseBuffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
          const noise = noiseBuffer.getChannelData(0);
          for (let index = 0; index < sampleCount; index += 1) {
            noise[index] = Math.random() * 2 - 1;
          }

          const noiseSource = audioContext.createBufferSource();
          const highPass = audioContext.createBiquadFilter();
          const clickGain = audioContext.createGain();
          noiseSource.buffer = noiseBuffer;
          highPass.type = "highpass";
          highPass.frequency.setValueAtTime(1400, now);
          clickGain.gain.setValueAtTime(0.0001, now);
          clickGain.gain.exponentialRampToValueAtTime(0.05, now + 0.001);
          clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
          noiseSource.connect(highPass);
          highPass.connect(clickGain);
          clickGain.connect(audioContext.destination);
          noiseSource.start(now);
          noiseSource.stop(now + 0.02);

          const thock = audioContext.createOscillator();
          const thockGain = audioContext.createGain();
          thock.type = "triangle";
          thock.frequency.setValueAtTime(190, now);
          thock.frequency.exponentialRampToValueAtTime(95, now + 0.035);
          thockGain.gain.setValueAtTime(0.0001, now);
          thockGain.gain.exponentialRampToValueAtTime(0.035, now + 0.002);
          thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
          thock.connect(thockGain);
          thockGain.connect(audioContext.destination);
          thock.start(now);
          thock.stop(now + 0.04);
        };

        if (audioContext.state !== "running") {
          audioContext
            .resume()
            .then(playTone)
            .catch((error) => {
              console.warn("Unable to resume click sound audio context:", error);
            });
        } else {
          playTone();
        }
      } catch (error) {
        console.warn("Unable to play click sound:", error);
      }
    };

    window.addEventListener("pointerdown", playClick);
    window.addEventListener("click", playClick);
    return () => {
      window.removeEventListener("pointerdown", playClick);
      window.removeEventListener("click", playClick);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch((error) => {
          console.warn("Unable to close click sound audio context:", error);
        });
        audioContextRef.current = null;
      }
    };
  }, []);

  return null;
}
