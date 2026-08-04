import { useEffect, useState, useCallback } from "react";
import { playPiano } from "@/lib/audioStudio";
import { useStudio } from "@/lib/studioContext";
import KeyColorPicker from "@/components/studio/KeyColorPicker";

const NOTES = [
  { midi: 48, name: "C", oct: 3, type: "white", key: "Z" },
  { midi: 49, name: "C♯", oct: 3, type: "black", key: "S" },
  { midi: 50, name: "D", oct: 3, type: "white", key: "X" },
  { midi: 51, name: "D♯", oct: 3, type: "black", key: "D" },
  { midi: 52, name: "E", oct: 3, type: "white", key: "C" },
  { midi: 53, name: "F", oct: 3, type: "white", key: "V" },
  { midi: 54, name: "F♯", oct: 3, type: "black", key: "G" },
  { midi: 55, name: "G", oct: 3, type: "white", key: "B" },
  { midi: 56, name: "G♯", oct: 3, type: "black", key: "H" },
  { midi: 57, name: "A", oct: 3, type: "white", key: "N" },
  { midi: 58, name: "A♯", oct: 3, type: "black", key: "J" },
  { midi: 59, name: "B", oct: 3, type: "white", key: "M" },
  { midi: 60, name: "C", oct: 4, type: "white", key: "Q" },
  { midi: 61, name: "C♯", oct: 4, type: "black", key: "2" },
  { midi: 62, name: "D", oct: 4, type: "white", key: "W" },
  { midi: 63, name: "D♯", oct: 4, type: "black", key: "3" },
  { midi: 64, name: "E", oct: 4, type: "white", key: "E" },
  { midi: 65, name: "F", oct: 4, type: "white", key: "R" },
  { midi: 66, name: "F♯", oct: 4, type: "black", key: "5" },
  { midi: 67, name: "G", oct: 4, type: "white", key: "T" },
  { midi: 68, name: "G♯", oct: 4, type: "black", key: "6" },
  { midi: 69, name: "A", oct: 4, type: "white", key: "Y" },
  { midi: 70, name: "A♯", oct: 4, type: "black", key: "7" },
  { midi: 71, name: "B", oct: 4, type: "white", key: "U" },
  { midi: 72, name: "C", oct: 5, type: "white", key: "I" },
];

const whites = NOTES.filter(n => n.type === "white");
const blacks = NOTES.filter(n => n.type === "black");
const W = 100 / whites.length;
const BW = W * 0.6;
const blackLeft = bk => (whites.findIndex(w => w.midi === bk.midi - 1) + 1) * W - BW / 2;

export default function PianoInstrument() {
  const { t, accent } = useStudio();
  const [pressed, setPressed] = useState(() => new Set());
  const press = useCallback(midi => { setPressed(p => new Set(p).add(midi)); playPiano(midi); }, []);
  const release = useCallback(midi => setPressed(p => { const n = new Set(p); n.delete(midi); return n; }), []);

  useEffect(() => {
    const down = e => { const n = NOTES.find(x => x.key === e.key.toUpperCase()); if (n) press(n.midi); };
    const up = e => { const n = NOTES.find(x => x.key === e.key.toUpperCase()); if (n) release(n.midi); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [press, release]);

  return (
    <section aria-label="Piano" className="mx-auto w-full max-w-5xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-orange-400">{t("grandPiano")}</p>
          <h2 className="text-3xl font-semibold text-foreground">Alexander Holm</h2>
        </div>
        <KeyColorPicker />
      </div>
      <div className="relative flex h-56 overflow-hidden rounded-2xl border-8 border-orange-900 bg-zinc-800 shadow-2xl sm:h-64">
        {whites.map(n => (
          <button key={n.midi} onPointerDown={() => press(n.midi)} onPointerUp={() => release(n.midi)} onPointerLeave={() => release(n.midi)}
            style={pressed.has(n.midi) ? { background: accent } : undefined}
            className="flex flex-1 items-end justify-center border-r border-zinc-300 bg-gradient-to-b from-white to-zinc-100 pb-2 text-zinc-500 transition">
            <span className="text-center"><b className="block text-zinc-800">{n.name}{n.oct}</b><small className="text-zinc-400">{n.key}</small></span>
          </button>
        ))}
        {blacks.map(n => (
          <button key={n.midi} aria-label={`${n.name}${n.oct}`} onPointerDown={() => press(n.midi)} onPointerUp={() => release(n.midi)} onPointerLeave={() => release(n.midi)}
            style={{ left: `${blackLeft(n)}%`, width: `${BW}%`, ...(pressed.has(n.midi) ? { background: accent } : {}) }}
            className="absolute top-0 z-10 h-3/5 rounded-b-md border-x-2 border-b-4 border-zinc-950 bg-gradient-to-b from-zinc-700 to-zinc-950 text-[10px] text-zinc-500 shadow-xl transition">
            <span className="flex h-full items-center justify-center">{n.key}</span>
          </button>
        ))}
      </div>
    </section>
  );
}