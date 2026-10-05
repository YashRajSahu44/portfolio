import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const chords = [
  [261.63, 329.63, 392],
  [220, 261.63, 329.63],
  [174.61, 220, 261.63],
  [196, 246.94, 293.66],
];
const melody = [
  392,
  440,
  523.25,
  440,
  392,
  null,
  329.63,
  392,
  440,
  null,
  523.25,
  587.33,
  523.25,
  440,
  392,
  null,
];

export function AmbientMusic() {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const startMusicRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const oscillators = [];
    const activeNotes = new Set();
    const timers = [];
    const startMusic = () => {
      if (mutedRef.current) return;

      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) {
        console.warn("Background music is not supported by this browser.");
        return;
      }

      try {
        let audioContext = audioContextRef.current;
        if (!audioContext) {
          audioContext = new AudioContextConstructor();
          audioContextRef.current = audioContext;
        }

        if (!startedRef.current) {
          startedRef.current = true;
          setHasStarted(true);

          const masterGain = audioContext.createGain();
          masterGain.gain.setValueAtTime(0.35, audioContext.currentTime);
          masterGain.connect(audioContext.destination);
          masterGainRef.current = masterGain;

          const pad = chords[0].map((frequency) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            gain.gain.setValueAtTime(0.003, audioContext.currentTime);
            oscillator.connect(gain);
            gain.connect(masterGain);
            oscillator.start();
            oscillators.push(oscillator);
            return oscillator;
          });

          let chordIndex = 0;
          const chordTimer = window.setInterval(() => {
            chordIndex = (chordIndex + 1) % chords.length;
            const now = audioContext.currentTime;
            pad.forEach((oscillator, index) => {
              oscillator.frequency.cancelScheduledValues(now);
              oscillator.frequency.setValueAtTime(oscillator.frequency.value, now);
              oscillator.frequency.linearRampToValueAtTime(chords[chordIndex][index], now + 3);
            });
          }, 10000);
          timers.push(chordTimer);

          let melodyIndex = 0;
          const melodyTimer = window.setInterval(() => {
            const frequency = melody[melodyIndex];
            melodyIndex = (melodyIndex + 1) % melody.length;
            if (frequency === null) return;

            const now = audioContext.currentTime;
            const note = audioContext.createOscillator();
            const gain = audioContext.createGain();
            note.type = "sine";
            note.frequency.setValueAtTime(frequency, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.004, now + 0.12);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
            note.connect(gain);
            gain.connect(masterGain);
            note.onended = () => activeNotes.delete(note);
            activeNotes.add(note);
            note.start(now);
            note.stop(now + 1.05);
          }, 1250);
          timers.push(melodyTimer);
        }

        if (audioContext.state === "suspended") {
          audioContext.resume().catch((error) => {
            console.warn("Unable to resume background music:", error);
          });
        }
      } catch (error) {
        console.warn("Unable to start background music:", error);
      }
    };

    startMusicRef.current = startMusic;
    const startOnInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest("[data-ambient-toggle]")) {
        return;
      }
      startMusic();
    };
    window.addEventListener("pointerdown", startOnInteraction, { passive: true });
    window.addEventListener("keydown", startOnInteraction);

    return () => {
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      timers.forEach((timer) => window.clearInterval(timer));
      oscillators.forEach((oscillator) => oscillator.stop());
      activeNotes.forEach((note) => note.stop());
      if (audioContextRef.current) {
        audioContextRef.current.close().catch((error) => {
          console.warn("Unable to close background music audio context:", error);
        });
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!startedRef.current) {
      mutedRef.current = false;
      setIsMuted(false);
      startMusicRef.current?.();
      return;
    }

    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setIsMuted(nextMuted);
    masterGainRef.current?.gain.setTargetAtTime(
      nextMuted ? 0.0001 : 0.35,
      audioContextRef.current.currentTime,
      0.15,
    );
  };

  return (
    <button
      type="button"
      data-ambient-toggle
      onClick={toggleMusic}
      aria-label={
        isMuted
          ? "Turn on background music"
          : hasStarted
            ? "Mute background music"
            : "Start background music"
      }
      aria-pressed={!isMuted}
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary hover:text-foreground"
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
