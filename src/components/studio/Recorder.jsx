import { useState, useRef } from "react";
import { Mic, MicOff, Circle, Square, Download } from "lucide-react";
import { useStudio } from "@/lib/studioContext";
import { getOutputStream } from "@/lib/audioStudio";

export default function Recorder() {
  const { t } = useStudio();
  const [recording, setRecording] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const recRef = useRef(null);
  const chunksRef = useRef([]);
  const micRef = useRef(null);

  const toggleMic = async () => {
    if (!micOn) {
      try {
        micRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicOn(true);
      } catch { setMicOn(false); }
    } else {
      micRef.current?.getTracks().forEach(tr => tr.stop());
      micRef.current = null;
      setMicOn(false);
    }
  };

  const start = () => {
    const out = getOutputStream();
    const tracks = [...out.getAudioTracks()];
    if (micRef.current) tracks.push(...micRef.current.getAudioTracks());
    const rec = new MediaRecorder(new MediaStream(tracks));
    chunksRef.current = [];
    rec.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
    rec.onstop = () => setAudioUrl(URL.createObjectURL(new Blob(chunksRef.current, { type: "audio/webm" })));
    rec.start();
    recRef.current = rec;
    setRecording(true);
  };

  const stop = () => { recRef.current?.stop(); setRecording(false); };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button onClick={recording ? stop : start}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${recording ? "animate-pulse bg-red-500 text-white" : "bg-orange-500 text-zinc-950 hover:bg-orange-400"}`}>
        {recording ? <Square size={16} /> : <Circle size={16} />}{recording ? t("stop") : t("record")}
      </button>
      <button onClick={toggleMic}
        className={`flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition ${micOn ? "border-red-500/30 bg-red-500/10 text-red-400" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
        {micOn ? <Mic size={16} /> : <MicOff size={16} />}{t("mic")}
      </button>
      {audioUrl && <a href={audioUrl} download="quickplay-recording.webm" className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent">
        <Download size={16} />{t("download")}
      </a>}
    </div>
  );
}