import { createContext, useContext, useState, useCallback, useEffect } from "react";

const StudioContext = createContext(null);
export const useStudio = () => useContext(StudioContext);

const T = {
  fr: {
    audioReady: "Audio prêt", piano: "Piano", drums: "Batterie", xylophone: "Xylophone",
    grandPiano: "Grand Piano · 25 touches", keyColor: "Couleur des touches",
    drumMachine: "Batterie virtuelle", realKit: "Un vrai kit de batterie",
    drumSamples: "Vos sons sont lus depuis",
    melodicPercussion: "Percussion mélodique", harmony: "Couleurs en harmonie",
    xyloSamples: "Déposez c4 à c5 en .wav ou .mp3 dans",
    record: "Enregistrer", stop: "Arrêter", mic: "Micro",
    download: "Télécharger", playHint: "Jouez au clavier, à la souris ou au toucher",
    crash: "Crash", ride: "Ride", charleston: "Charleston",
    tom1: "Tom 1", tom2: "Tom 2", snare: "Caisse claire",
    floorTom: "Tom basse", kick: "Grosse caisse",
  },
  en: {
    audioReady: "Audio ready", piano: "Piano", drums: "Drums", xylophone: "Xylophone",
    grandPiano: "Grand Piano · 25 keys", keyColor: "Key color",
    drumMachine: "Virtual drum kit", realKit: "A real drum kit",
    drumSamples: "Your sounds are loaded from",
    melodicPercussion: "Melodic percussion", harmony: "Colors in harmony",
    xyloSamples: "Drop c4 to c5 as .wav or .mp3 in",
    record: "Record", stop: "Stop", mic: "Mic",
    download: "Download", playHint: "Play with keyboard, mouse or touch",
    crash: "Crash", ride: "Ride", charleston: "Hi-hat",
    tom1: "Tom 1", tom2: "Tom 2", snare: "Snare",
    floorTom: "Floor tom", kick: "Kick drum",
  }
};

export function StudioProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("#f97316");
  const t = useCallback((key) => T[lang][key] || key, [lang]);
  const toggleLang = () => setLang(l => (l === "fr" ? "en" : "fr"));
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);
  return (
    <StudioContext.Provider value={{ lang, toggleLang, theme, toggleTheme, accent, setAccent, t }}>
      {children}
    </StudioContext.Provider>
  );
}