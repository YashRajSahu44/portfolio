import { useEffect, useRef } from "react";

export function ClickSounds() {
  const audioContextRef = useRef(null);

  useEffect(() => {
    const playClick = () => {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;

      try {
        const audioContext = audioContextRef.current ?? new AudioContextConstructor();
        audioContextRef.current = audioContext;

        const playTone = () => {
          const oscillator = audioContext.createOscillator();
          const gain = audioContext.createGain();
          const now = audioContext.currentTime;

          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(520, now);
          oscillator.frequency.exponentialRampToValueAtTime(260, now + 0.045);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

          oscillator.connect(gain);
          gain.connect(audioContext.destination);
          oscillator.start(now);
          oscillator.stop(now + 0.075);
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
