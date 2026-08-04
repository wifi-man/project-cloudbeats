import { Drum, Music2, Piano } from "lucide-react";
import { useStudio } from "@/lib/studioContext";

export default function InstrumentTabs({ active, onChange }) {
  const { t } = useStudio();
  const tabs = [
    { id: "piano", label: t("piano"), icon: Piano },
    { id: "drums", label: t("drums"), icon: Drum },
    { id: "xylo", label: t("xylophone"), icon: Music2 },
  ];
  return (
    <nav className="mx-auto flex w-full max-w-xl gap-2 rounded-2xl border border-border bg-card p-1.5">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${active === id ? "bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
          <Icon size={17} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}