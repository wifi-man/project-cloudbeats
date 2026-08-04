const PIANO_SAMPLE = "https://raw.githubusercontent.com/sfzinstruments/SalamanderGrandPiano/master/Samples/C4v8.flac";
let context, masterGain, streamDest, pianoBuffer;
const sampleCache = {};

const getContext = () => {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = context.createGain();
    masterGain.connect(context.destination);
    streamDest = context.createMediaStreamDestination();
    masterGain.connect(streamDest);
  }
  if (context.state === "suspended") context.resume();
  return context;
};

export const getOutputStream = () => { getContext(); return streamDest.stream; };

export const playTone = (frequency, duration = 1, type = "sine") => {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain).connect(masterGain);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playPiano = async (midi) => {
  const ctx = getContext();
  try {
    if (!pianoBuffer) {
      const res = await fetch(PIANO_SAMPLE);
      pianoBuffer = await ctx.decodeAudioData(await res.arrayBuffer());
    }
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = pianoBuffer;
    src.playbackRate.value = 2 ** ((midi - 60) / 12);
    gain.gain.value = 0.75;
    src.connect(gain).connect(masterGain);
    src.start();
  } catch { playTone(440 * 2 ** ((midi - 69) / 12), 1.4, "triangle"); }
};

export const playSample = async (folder, name, fallback) => {
  const ctx = getContext();
  const tryPlay = async (ext) => {
    const key = `${folder}/${name}.${ext}`;
    if (!sampleCache[key]) {
      const res = await fetch(`/sounds/${folder}/${name}.${ext}`);
      if (!res.ok) throw new Error(ext);
      sampleCache[key] = await ctx.decodeAudioData(await res.arrayBuffer());
    }
    const src = ctx.createBufferSource();
    src.buffer = sampleCache[key];
    src.connect(masterGain);
    src.start();
  };
  try { await tryPlay("wav"); }
  catch { try { await tryPlay("mp3"); } catch { fallback(); } }
};