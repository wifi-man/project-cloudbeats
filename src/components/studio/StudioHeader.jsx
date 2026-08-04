import { Cloud, Moon, Sun, Languages } from "lucide-react";
import { useStudio } from "@/lib/studioContext";

export default function StudioHeader() {
  const { t, lang, toggleLang, theme, toggleTheme } = useStudio();
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-4 md:px-10">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20"><Cloud size={20} /></div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">QuickPlay</h1>
          <p className="text-xs text-muted-foreground">by CloudBeats</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleLang} className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent">
          <Languages size={14} />{lang.toUpperCase()}
        </button>
        <button onClick={toggleTheme} aria-label="Theme" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-muted text-foreground transition hover:bg-accent">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-muted px-3 py-2 text-xs text-muted-foreground sm:flex">
          <span className="h-2 w-2 rounded-full bg-orange-400" /><span>{t("audioReady")}</span>
        </div>
      </div>
    </header>
  );
}