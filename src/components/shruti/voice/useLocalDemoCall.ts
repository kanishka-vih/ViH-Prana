import { useCallback, useEffect, useRef, useState } from "react";
import type { CallState, Turn } from "./useVoiceCall";
import { getSpeechTuning, loadVoice, type SpeechLang } from "../../../lib/pickVoice";

// Fully client-side voice/chat demo — no network call, no external API, so
// nothing here can be blocked by CORS or an unreachable backend. Voice mode
// uses the browser's own speech-to-text (SpeechRecognition) and
// text-to-speech (SpeechSynthesis); chat mode reuses the same scripted
// conversation as plain typed text, no audio involved. Each vertical has a
// short fixed script that advances one line per turn regardless of the
// exact words said — reliable for a live client demo, where "the bot gives
// a sensible answer every time" matters more than true understanding.
// Scripts exist in English and Hindi; saying/typing "speak in hindi" (or
// "english") mid-call switches language on the fly without restarting.
export type Lang = SpeechLang;
export type DemoScript = { greeting: string; steps: string[] };
export type LocalizedScript = Record<Lang, DemoScript>;
export type InputMode = "voice" | "chat";

export const DEMO_SCRIPTS: Record<string, LocalizedScript> = {
  nbfc: {
    en: {
      greeting:
        "Hi, this is Maya calling on behalf of your lender regarding your upcoming loan repayment. Am I speaking with the right person?",
      steps: [
        "Great! Just a quick reminder that your repayment of twelve thousand rupees is due on the twenty fifth. Would you be able to pay by then?",
        "Perfect, I've noted that down. You'll get a confirmation on SMS. Thank you and have a great day!",
      ],
    },
    hi: {
      greeting:
        "नमस्ते, मैं माया बोल रही हूँ, आपके लोन की आने वाली किस्त के बारे में कॉल कर रही हूँ। क्या मेरी बात सही व्यक्ति से हो रही है?",
      steps: [
        "बहुत बढ़िया! बस एक याद दिलाना चाहती हूँ कि आपकी बारह हज़ार रुपये की किस्त पच्चीस तारीख को देय है। क्या आप तब तक भुगतान कर पाएंगे?",
        "बहुत अच्छा, मैंने नोट कर लिया है। आपको एस एम एस पर पुष्टि मिल जाएगी। धन्यवाद, आपका दिन शुभ हो!",
      ],
    },
  },
  education: {
    en: {
      greeting:
        "Hi! Thanks for your interest in our undergraduate program. I'm calling to help with your admission enquiry. Do you have a few minutes?",
      steps: [
        "Great! Which course are you interested in — Engineering, Business, or Design?",
        "Wonderful choice! Our next counselling session is this Saturday at eleven A.M. Should I book a slot for you?",
        "You're all set! You'll receive a confirmation email shortly. Good luck!",
      ],
    },
    hi: {
      greeting:
        "नमस्ते! हमारे स्नातक प्रोग्राम में रुचि दिखाने के लिए धन्यवाद। मैं आपकी दाखिले से जुड़ी जानकारी में मदद करने के लिए कॉल कर रही हूँ। क्या आपके पास कुछ मिनट हैं?",
      steps: [
        "बहुत बढ़िया! आपको किस कोर्स में रुचि है — इंजीनियरिंग, बिजनेस, या डिज़ाइन?",
        "शानदार चुनाव! हमारा अगला काउंसलिंग सेशन इस शनिवार सुबह ग्यारह बजे है। क्या मैं आपके लिए स्लॉट बुक कर दूँ?",
        "सब कुछ तय हो गया है! आपको जल्द ही एक पुष्टिकरण ईमेल मिलेगा। शुभकामनाएं!",
      ],
    },
  },
  realestate: {
    en: {
      greeting:
        "Hi, I'm calling to confirm your site visit booking for this weekend. Is that still convenient for you?",
      steps: [
        "Perfect, I've confirmed your slot for Saturday at four P.M. I'll send the address details over WhatsApp.",
        "Looking forward to seeing you there. Have a great day!",
      ],
    },
    hi: {
      greeting:
        "नमस्ते, मैं इस वीकेंड के लिए आपकी साइट विज़िट बुकिंग को कन्फर्म करने के लिए कॉल कर रही हूँ। क्या यह समय अभी भी आपके लिए सही है?",
      steps: [
        "बहुत अच्छा, मैंने शनिवार शाम चार बजे के लिए आपका स्लॉट कन्फर्म कर दिया है। मैं आपको पता व्हाट्सएप पर भेज दूँगी।",
        "आपसे वहाँ मिलने का इंतज़ार रहेगा। आपका दिन शुभ हो!",
      ],
    },
  },
  healthcare: {
    en: {
      greeting:
        "Hi, this is a reminder call about your upcoming appointment with Doctor Sharma tomorrow at ten A.M. Will you be able to make it?",
      steps: [
        "Great, see you then! Please carry your previous reports.",
        "Take care, and see you at the clinic!",
      ],
    },
    hi: {
      greeting:
        "नमस्ते, यह डॉक्टर शर्मा के साथ कल सुबह दस बजे आपकी अपॉइंटमेंट की याद दिलाने वाली कॉल है। क्या आप आ पाएंगे?",
      steps: [
        "बहुत बढ़िया, तो कल मिलते हैं! कृपया अपनी पिछली रिपोर्ट्स साथ लाएं।",
        "अपना ख्याल रखें, क्लिनिक में मिलते हैं!",
      ],
    },
  },
};

const SWITCH_TO_HINDI_ACK = "ज़रूर, अब मैं हिंदी में बात करती हूँ। ";
const SWITCH_TO_ENGLISH_ACK = "Sure, switching back to English. ";

async function speak(text: string, lang: Lang, onStart: () => void, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onStart();
    window.setTimeout(onEnd, Math.min(4000, 800 + text.length * 40));
    return;
  }
  const voice = await loadVoice(lang);
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
  const tuning = getSpeechTuning(lang);
  utterance.rate = tuning.rate;
  utterance.pitch = tuning.pitch;
  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

// Chrome ships this under a vendor prefix and it's not in TS's default DOM
// lib, so this is typed loosely on purpose.
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function createRecognizer(lang: Lang): SpeechRecognitionLike | null {
  const Ctor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec: SpeechRecognitionLike = new Ctor();
  rec.continuous = true;
  rec.interimResults = false;
  rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
  return rec;
}

function detectLangSwitch(text: string): Lang | null {
  const lower = text.toLowerCase();
  if (/hindi/.test(lower)) return "hi";
  if (/\benglish\b/.test(lower)) return "en";
  return null;
}

export function useLocalDemoCall() {
  const [state, setState] = useState<CallState>("idle");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [muted, setMuted] = useState(false);

  const recognizerRef = useRef<SpeechRecognitionLike | null>(null);
  const stepRef = useRef(0);
  const lastLineIndexRef = useRef(-1); // -1 = greeting was the last agent line
  const scriptRef = useRef<LocalizedScript | null>(null);
  const langRef = useRef<Lang>("en");
  // Remembers the last language picked from the language dropdown so a new
  // call (or a category switch) starts in it, even before any call is live.
  const preferredLangRef = useRef<Lang>("en");
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const endedRef = useRef(false);
  const stateRef = useRef<CallState>("idle");
  const inputModeRef = useRef<InputMode>("voice");
  const micGrantedRef = useRef(false);

  const stopListening = useCallback(() => {
    try {
      recognizerRef.current?.abort();
    } catch {
      /* already stopped */
    }
    recognizerRef.current = null;
  }, []);

  const end = useCallback(() => {
    endedRef.current = true;
    stopListening();
    window.speechSynthesis?.cancel();
    setAgentSpeaking(false);
    stateRef.current = stateRef.current === "error" ? stateRef.current : "ended";
    setState(stateRef.current);
  }, [stopListening]);

  useEffect(() => end, [end]);

  function startListening() {
    if (endedRef.current || inputModeRef.current !== "voice") return;
    const rec = createRecognizer(langRef.current);
    if (!rec) {
      setWarnings((w) => [
        ...w,
        "Speech recognition isn't supported in this browser — switch to Chat to keep going.",
      ]);
      return;
    }
    recognizerRef.current = rec;
    rec.onresult = (e: any) => {
      if (mutedRef.current) return;
      const text = e.results[e.results.length - 1][0].transcript.trim();
      if (!text) return;
      stopListening();
      advanceScript(text);
    };
    rec.onerror = () => {
      /* mic hiccup — recognition's own onend will fire and we just stop listening */
    };
    rec.onend = () => {
      recognizerRef.current = null;
    };
    try {
      rec.start();
    } catch {
      /* already running */
    }
  }

  const speakAgentLine = useCallback((line: string) => {
    if (inputModeRef.current !== "voice") return;
    speak(
      line,
      langRef.current,
      () => setAgentSpeaking(true),
      () => {
        setAgentSpeaking(false);
        if (!endedRef.current) startListening();
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switches the conversation's language — used both when the user asks for
  // it mid-conversation ("speak in hindi") and when the language dropdown
  // is used directly. Repeats whatever the last agent line was (in the new
  // language) rather than advancing the script, so nothing gets skipped.
  const switchLanguage = useCallback(
    (next: Lang) => {
      preferredLangRef.current = next;
      if (next === langRef.current) return;
      langRef.current = next;
      if (stateRef.current !== "active") return; // no live call — just remembered for the next start()
      const localized = scriptRef.current;
      if (!localized) return;
      const script = localized[next];
      const line = lastLineIndexRef.current === -1 ? script.greeting : script.steps[lastLineIndexRef.current];
      const ack = (next === "hi" ? SWITCH_TO_HINDI_ACK : SWITCH_TO_ENGLISH_ACK) + line;
      setTurns((prev) => [...prev, { from: "agent", text: ack, final: true }]);
      speakAgentLine(ack);
    },
    [speakAgentLine],
  );

  // Shared by both voice (recognized speech) and chat (typed text) input —
  // the script advances the same way either way, only whether the agent's
  // reply is spoken out loud differs.
  const advanceScript = useCallback(
    (userText: string) => {
      setTurns((prev) => [...prev, { from: "user", text: userText, final: true }]);
      const localized = scriptRef.current;
      if (!localized) return;

      const requestedLang = detectLangSwitch(userText);
      if (requestedLang && requestedLang !== langRef.current) {
        switchLanguage(requestedLang);
        return;
      }

      const script = localized[langRef.current];
      const next = stepRef.current;
      if (next >= script.steps.length) {
        end();
        return;
      }
      stepRef.current += 1;
      lastLineIndexRef.current = next;
      const line = script.steps[next];
      setTurns((prev) => [...prev, { from: "agent", text: line, final: true }]);
      speakAgentLine(line);
    },
    [end, speakAgentLine, switchLanguage],
  );

  const sendText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || stateRef.current !== "active") return;
      advanceScript(trimmed);
    },
    [advanceScript],
  );

  const ensureMic = useCallback(async () => {
    if (micGrantedRef.current) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      micGrantedRef.current = true;
      return true;
    } catch {
      return false;
    }
  }, []);

  const setInputMode = useCallback(
    (next: InputMode) => {
      const prev = inputModeRef.current;
      inputModeRef.current = next;
      if (next === prev) return;
      if (next === "chat") {
        stopListening();
        window.speechSynthesis?.cancel();
        setAgentSpeaking(false);
      } else if (next === "voice" && stateRef.current === "active" && !agentSpeaking) {
        ensureMic().then((ok) => {
          if (ok) startListening();
          else setWarnings((w) => [...w, "Microphone permission was denied — you can still type in Chat."]);
        });
      }
    },
    [agentSpeaking, ensureMic, stopListening],
  );

  const start = useCallback(
    async (categoryId: string, mode: InputMode = "voice") => {
      endedRef.current = false;
      inputModeRef.current = mode;
      langRef.current = preferredLangRef.current;
      stateRef.current = "connecting";
      setState("connecting");
      setTurns([]);
      setWarnings([]);
      stepRef.current = 0;
      lastLineIndexRef.current = -1;
      const localized = DEMO_SCRIPTS[categoryId] ?? DEMO_SCRIPTS.nbfc;
      scriptRef.current = localized;

      if (mode === "voice") {
        const ok = await ensureMic();
        if (!ok) {
          setWarnings((w) => [...w, "Microphone permission was denied — you can still type in Chat."]);
        }
      }

      stateRef.current = "active";
      setState("active");
      const greeting = localized[langRef.current].greeting;
      setTurns([{ from: "agent", text: greeting, final: true }]);
      speakAgentLine(greeting);
    },
    [ensureMic, speakAgentLine],
  );

  return {
    state,
    turns,
    agentSpeaking,
    warnings,
    muted,
    setMuted,
    start,
    end,
    setInputMode,
    sendText,
    setLanguage: switchLanguage,
  };
}
