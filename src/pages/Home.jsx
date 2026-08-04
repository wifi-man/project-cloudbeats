import { useState } from "react";
import { StudioProvider, useStudio } from "@/lib/studioContext";
import StudioHeader from "@/components/studio/StudioHeader";
import InstrumentTabs from "@/components/studio/InstrumentTabs";
import Recorder from "@/components/studio/Recorder";
import PianoInstrument from "@/components/studio/PianoInstrument";
import DrumInstrument from "@/components/studio/DrumInstrument";
import XylophoneInstrument from "@/components/studio/XylophoneInstrument";

function HomeContent() {
  const { t } = useStudio();
  const [active, setActive] = useState("piano");
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
      <StudioHeader />
      <main className="px-4 py-7 md:px-10 md:py-10">
        <InstrumentTabs active={active} onChange={setActive} />
        <div className="mt-6"><Recorder /></div>
        <div className="mt-10 md:mt-16">
          {active === "piano" && <PianoInstrument />}
          {active === "drums" && <DrumInstrument />}
          {active === "xylo" && <XylophoneInstrument />}
        </div>
      </main>
      <footer className="px-5 py-8 text-center text-xs text-muted-foreground">QuickPlay by CloudBeats · {t("playHint")}</footer>
    </div>
  );
}

export default function Home() {
  return (
    <StudioProvider>
      <HomeContent />
    </StudioProvider>
  );
}