export type SpeechLang = "en" | "hi";

// Picks the best available voice for a language. Chrome/Edge only populate
// the voice list asynchronously (sometimes after a `voiceschanged` event),
// so this resolves once the list is ready and caches the pick per language.
const voicePromises = new Map<SpeechLang, Promise<SpeechSynthesisVoice | null>>();

export function scoreVoice(v: SpeechSynthesisVoice, lang: SpeechLang): number {
  const name = v.name.toLowerCase();
  if (lang === "hi") {
    if (!v.lang.toLowerCase().startsWith("hi")) return -1;
    // Neerja/Swara are Microsoft/Edge's neural Hindi voices — the only ones
    // that read Devanagari with correct stress; legacy Kalpana is female but
    // syllable-choppy, Hemant/other unlabeled voices are often male, so both
    // are ranked well below the neural picks.
    if (/natural/.test(name) && /(neerja|swara)/.test(name)) return 100;
    if (/neerja|swara/.test(name)) return 90;
    if (/kalpana|lekha/.test(name)) return 70;
    if (/female/.test(name)) return 60;
    if (/hemant/.test(name)) return 20;
    return 50;
  }
  if (!v.lang.toLowerCase().startsWith("en")) return -1;
  // Modern "Natural"/neural voices sound far less robotic than the legacy
  // platform ones, so prefer those first; then well-known clear female
  // voices. The Indian-accented legacy voice (Heera) reads as noticeably
  // more robotic than the US/UK ones on this synthesizer, so it's ranked
  // lower — used only if nothing clearer is available.
  if (/natural/.test(name) && /(aria|jenny|emma|ava|michelle)/.test(name)) return 100;
  if (/(zira|samantha|susan|karen|victoria|moira|tessa|google uk english female|google us english)/.test(name))
    return 80;
  if (/female/.test(name)) return 60;
  if (/heera/.test(name)) return 40;
  return 0;
}

// English platform voices read as sluggish at their default rate, so a
// brisker-than-default pace sounds more natural there. Hindi voices are the
// opposite: they read out each syllable more heavily, so that same brisk
// rate rushes and garbles pronunciation — Hindi needs a slower, closer-to-
// natural pace to stay intelligible.
export function getSpeechTuning(lang: SpeechLang): { rate: number; pitch: number } {
  return lang === "hi" ? { rate: 0.9, pitch: 1.0 } : { rate: 1.15, pitch: 1.0 };
}

export function loadVoice(lang: SpeechLang): Promise<SpeechSynthesisVoice | null> {
  const cached = voicePromises.get(lang);
  if (cached) return cached;
  const promise = new Promise<SpeechSynthesisVoice | null>((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return resolve(null);
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return null;
      const ranked = voices.map((v) => ({ v, score: scoreVoice(v, lang) })).sort((a, b) => b.score - a.score);
      if (ranked[0].score >= 0) return ranked[0].v;
      return lang === "en" ? voices[0] : null;
    };
    const existing = pick();
    if (existing) return resolve(existing);
    window.speechSynthesis.onvoiceschanged = () => resolve(pick());
    // Some browsers never fire voiceschanged if the list was already (empty
    // then) populated synchronously — give it one more check shortly after.
    window.setTimeout(() => resolve(pick()), 300);
  });
  voicePromises.set(lang, promise);
  return promise;
}
