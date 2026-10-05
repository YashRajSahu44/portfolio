import { useEffect, useRef } from "react";

export function ClickSounds() {
  const audioContextRef = useRef(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    const playClick = () => {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;

      const now = performance.now();
      if (now - lastClickTimeRef.current < 90) return;
      lastClickTimeRef.current = now;

      try {
        const audioContext = audioContextRef.current ?? new AudioContextConstructor();
        audioContextRef.current = audioContext;

        const playTone = () => {
          const oscillator = audioContext.createOscillator();
          const gain = audioContext.createGain();
          const now = audioContext.currentTime;

          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(1100, now);
          oscillator.frequency.exponentialRampToValueAtTime(650, now + 0.04);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.012, now + 0.002);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

          oscillator.connect(gain);
          gain.connect(audioContext.destination);
          oscillator.start(now);
          oscillator.stop(now + 0.05);
        };

        if (audioContext.state === "suspended") {
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

    window.addEventListener("click", playClick);
    return () => {
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
