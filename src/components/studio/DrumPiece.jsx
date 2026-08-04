import { useStudio } from "@/lib/studioContext";

export default function DrumPiece({ drum, label, onHit }) {
  const { accent } = useStudio();
  const isCymbal = drum.kind === "cymbal";
  return (
    <button onPointerDown={onHit} aria-label={label}
      style={{ left: drum.left, top: drum.top, width: drum.size, height: drum.size }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition active:scale-90">
      <div className={`relative h-full w-full rounded-full shadow-xl ${isCymbal ? "bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600" : "bg-gradient-to-br from-orange-800 to-zinc-900 p-[18%]"}`}
        style={{ boxShadow: `0 0 0 3px ${accent}40` }}>
        {isCymbal ? (
          <>
            <div className="absolute inset-[14%] rounded-full border-2 border-amber-700/40" />
            <div className="absolute inset-[28%] rounded-full border border-amber-700/30" />
            <div className="absolute inset-[42%] rounded-full bg-amber-700/30" />
          </>
        ) : (
          <div className="h-full w-full rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-inner" />
        )}
      </div>
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
        <kbd className="rounded bg-muted-foreground/20 px-1.5 py-0.5 text-foreground">{drum.key}</kbd> {label}
      </span>
    </button>
  );
}