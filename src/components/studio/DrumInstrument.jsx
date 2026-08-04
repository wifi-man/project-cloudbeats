import { useEffect } from "react";
import { playSample, playTone } from "@/lib/audioStudio";
import { useStudio } from "@/lib/studioContext";
import DrumPiece from "@/components/studio/DrumPiece";
import KeyColorPicker from "@/components/studio/KeyColorPicker";

const KIT = [
  { id: "crash", labelKey: "crash", key: "Q", kind: "cymbal", size: 84, left: "14%", top: "20%", freq: 900, type: "sawtooth" },
  { id: "ride", labelKey: "ride", key: "W", kind: "cymbal", size: 92, left: "84%", top: "24%", freq: 750, type: "sawtooth" },
  { id: "hihat", labelKey: "charleston", key: "D", kind: "cymbal", size: 68, left: "20%", top: "55%", freq: 650, type: "square" },
  { id: "tom1", labelKey: "tom1", key: "G", kind: "drum", size: 66, left: "42%", top: "32%", freq: 180, type: "triangle" },
  { id: "tom2", labelKey: "tom2", key: "H", kind: "drum", size: 66, left: "58%", top: "32%", freq: 140, type: "triangle" },
  { id: "snare", labelKey: "snare", key: "S", kind: "drum", size: 78, left: "36%", top: "60%", freq: 200, type: "square" },
  { id: "floorTom", labelKey: "floorTom", key: "J", kind: "drum", size: 86, left: "70%", top: "58%", freq: 100, type: "triangle" },
  { id: "kick", labelKey: "kick", key: "A", kind: "kick", size: 116, left: "50%", top: "82%", freq: 55, type: "sine" },
];

const hit = drum => playSample("drums", drum.id, () => playTone(drum.freq, drum.id === "kick" ? 0.35 : 0.14, drum.type));

export default function DrumInstrument() {
  const { t } = useStudio();
  useEffect(() => {
    const h = e => { const d = KIT.find(x => x.key === e.key.toUpperCase()); if (d) hit(d); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  return (
    <section aria-label="Batterie" className="mx-auto w-full max-w-4xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-orange-400">{t("drumMachine")}</p>
          <h2 className="text-3xl font-semibold text-foreground">{t("realKit")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("drumSamples")} <code className="text-foreground">sounds/drums</code></p>
        </div>
        <KeyColorPicker />
      </div>
      <div className="relative h-[340px] rounded-3xl border border-border bg-muted sm:h-[440px]">
        {KIT.map(d => <DrumPiece key={d.id} drum={d} label={t(d.labelKey)} onHit={() => hit(d)} />)}
      </div>
    </section>
  );
}