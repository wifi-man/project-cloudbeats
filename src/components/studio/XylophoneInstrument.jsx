import { useEffect, useState, useCallback } from "react";
import { playSample, playTone } from "@/lib/audioStudio";
import { useStudio } from "@/lib/studioContext";
import KeyColorPicker from "@/components/studio/KeyColorPicker";

const BARS = [
  ["c4", "Do", 261.6, "A", "bg-rose-400"],
  ["d4", "Ré", 293.7, "S", "bg-orange-400"],
  ["e4", "Mi", 329.6, "D", "bg-amber-300"],
  ["f4", "Fa", 349.2, "F", "bg-lime-300"],
  ["g4", "Sol", 392, "G", "bg-emerald-400"],
  ["a4", "La", 440, "H", "bg-cyan-400"],
  ["b4", "Si", 493.9, "J", "bg-blue-400"],
  ["c5", "Do", 523.3, "K", "bg-violet-400"],
];

export default function XylophoneInstrument() {
  const { t, accent } = useStudio();
  const [pressed, setPressed] = useState(() => new Set());
  const press = useCallback(id => { setPressed(p => new Set(p).add(id)); playSample("xylophone", id, () => playTone(BARS.find(b => b[0] === id)[2], .65, "sine")); }, []);
  const release = useCallback(id => setPressed(p => { const n = new Set(p); n.delete(id); return n; }), []);

  useEffect(() => {
    const down = e => { const b = BARS.find(x => x[3] === e.key.toUpperCase()); if (b) press(b[0]); };
    const up = e => { const b = BARS.find(x => x[3] === e.key.toUpperCase()); if (b) release(b[0]); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [press, release]);

  return (
    <section aria-label="Xylophone" className="mx-auto w-full max-w-5xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-cyan-300">{t("melodicPercussion")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("harmony")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("xyloSamples")} <code className="text-foreground">sounds/xylophone</code></p>
        </div>
        <KeyColorPicker />
      </div>
      <div className="flex items-center gap-2 overflow-x-auto rounded-3xl border border-border bg-muted p-4 sm:p-7">
        {BARS.map((bar, i) => (
          <button key={bar[0]} onPointerDown={() => press(bar[0])} onPointerUp={() => release(bar[0])} onPointerLeave={() => release(bar[0])}
            style={{ height: `${250 - i * 12}px`, ...(pressed.has(bar[0]) ? { boxShadow: `0 0 0 4px ${accent}` } : {}) }}
            className={`min-w-[58px] flex-1 rounded-2xl ${bar[4]} p-2 text-zinc-950 shadow-lg transition hover:brightness-110 active:translate-y-2 active:shadow-none`}>
            <span className="flex h-full flex-col justify-between">
              <i className="mx-auto mt-2 h-3 w-3 rounded-full bg-zinc-950/30" />
              <b className="text-lg">{bar[1]}</b>
              <kbd className="text-xs opacity-60">{bar[3]}</kbd>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}