import { Palette } from "lucide-react";
import { useStudio } from "@/lib/studioContext";

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#a855f7", "#ec4899", "#ef4444", "#eab308", "#06b6d4"];

export default function KeyColorPicker() {
  const { t, accent, setAccent } = useStudio();
  return (
    <div className="flex items-center gap-2">
      <Palette size={16} className="text-muted-foreground" />
      <span className="hidden text-xs text-muted-foreground sm:inline">{t("keyColor")}</span>
      <div className="flex gap-1.5">
        {COLORS.map(c => (
          <button key={c} onClick={() => setAccent(c)} aria-label={c}
            style={{ background: c }}
            className={`h-7 w-7 rounded-full ring-2 transition ${accent === c ? "ring-foreground scale-110" : "ring-transparent hover:ring-foreground/40"}`} />
        ))}
      </div>
    </div>
  );
}