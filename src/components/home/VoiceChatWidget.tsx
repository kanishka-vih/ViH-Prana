import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { weuiArrowOutlined } from "../../assets";
import { ellipse2328, voicechatAvatarRing, voicechatMic, voicechatSend } from "../../assets/home";
import { CONTACT_FORM_ID } from "../../lib/scrollToContact";
import { getSpeechTuning, loadVoice, type SpeechLang } from "../../lib/pickVoice";

type Message = { from: "bot" | "user"; text: string };

// Widget stays on screen for the first 4 viewport-heights of scroll (the
// hero/intro), hides through the "globe" (ViH Prana) section so it doesn't
// clutter that visual, then reappears for everything after it — the
// product cards, the CCCAAA sequence, testimonials — right up until the
// contact form, where it hides again so it never sits on top of the
// actual input fields.
const VISIBLE_FOR_PAGES = 4;
const GLOBE_SECTION_ID = "vih-prana-section";

function buildGreeting(botName: string, lang: SpeechLang) {
  return lang === "hi"
    ? `नमस्ते, मैं ${botName} की वॉइस असिस्टेंट हूँ। मुझसे कॉल इंटेलिजेंस, वर्कफ़्लो या एनालिटिक्स के बारे में पूछें।`
    : `Hi, I'm ${botName}'s voice assistant. Ask me about call intelligence, workflows, or analytics.`;
}

function buildReplies(botName: string, lang: SpeechLang) {
  return lang === "hi"
    ? [
        `समझ गई — ${botName} इसे आपके कॉल इंटेलिजेंस डैशबोर्ड से रीयल टाइम में दिखा सकती है।`,
        "बिल्कुल। हमारे एजेंट पूरे वर्कफ़्लो को ह्यूमन ओवरसाइट के साथ ऑटोमेट कर सकते हैं।",
        "यह हर चैनल पर अपने आप ट्रैक होता है, इसलिए कुछ भी छूटता नहीं।",
      ]
    : [
        `Got it — ${botName} can pull that up from your call intelligence dashboard in real time.`,
        "Sure thing. Our agents can automate that workflow end-to-end with human oversight.",
        "That's tracked automatically across every channel, so nothing falls through the cracks.",
      ];
}

async function speak(text: string, lang: SpeechLang, onStart: () => void, onEnd: () => void) {
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

function createRecognizer(lang: SpeechLang): SpeechRecognitionLike | null {
  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec: SpeechRecognitionLike = new Ctor();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
  return rec;
}

export default function VoiceChatWidget() {
  const location = useLocation();
  // This widget lives outside <Routes> so it persists across navigation, but
  // it should introduce itself as Shruti on the Shruti page rather than
  // always as Prana.
  const botName = location.pathname.startsWith("/shruti") ? "Shruti" : "Prana";

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"voice" | "chat">("voice");
  const [lang, setLang] = useState<SpeechLang>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [visible, setVisible] = useState(true);
  const replyIndex = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<SpeechRecognitionLike | null>(null);
  const langRef = useRef<SpeechLang>("en");
  langRef.current = lang;

  const greeting = useMemo(() => buildGreeting(botName, lang), [botName, lang]);

  const stopListening = () => {
    try {
      recognizerRef.current?.abort();
    } catch {
      /* already stopped */
    }
    recognizerRef.current = null;
    setListening(false);
  };

  useEffect(() => {
    const updateVisibility = () => {
      const introVisible = window.scrollY < window.innerHeight * VISIBLE_FOR_PAGES;

      // getBoundingClientRect is viewport-relative and already reflects the
      // page's scale transform, so no unit conversion is needed here — just
      // plain "has this section's box passed above/not yet reached the
      // viewport" checks.
      const globeEl = document.getElementById(GLOBE_SECTION_ID);
      const contactEl = document.getElementById(CONTACT_FORM_ID);
      let midSectionVisible = false;
      if (globeEl && contactEl) {
        const globeRect = globeEl.getBoundingClientRect();
        const contactRect = contactEl.getBoundingClientRect();
        const pastGlobe = globeRect.bottom <= 0;
        const beforeContact = contactRect.top > window.innerHeight;
        midSectionVisible = pastGlobe && beforeContact;
      }

      setVisible(introVisible || midSectionVisible);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  // Close the panel once the widget scrolls out of its visible range, so it
  // doesn't reappear already-open (and re-speak) if the user scrolls back up.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // Whenever the panel closes — via ×, outside click, or scrolling out of
  // range — stop any speech/listening in flight rather than leaving it
  // running in the background.
  useEffect(() => {
    if (open) return;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Clicking anywhere outside the widget (the panel or the toggle button)
  // closes it, same as clicking the × — so it doesn't just sit open over
  // the page while the user is doing something else.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: greeting }]);
      speak(
        greeting,
        lang,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
    // Only fire when the panel first opens — `greeting`/`lang` changing
    // afterwards shouldn't replay it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, messages.length]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, tab]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const respond = (userText: string) => {
    setMessages((m) => [...m, { from: "user", text: userText }]);
    window.setTimeout(() => {
      const replies = buildReplies(botName, langRef.current);
      const reply = replies[replyIndex.current % replies.length];
      replyIndex.current += 1;
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      speak(
        reply,
        langRef.current,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }, 700);
  };

  const startListening = () => {
    if (listening || speaking) return;
    const rec = createRecognizer(langRef.current);
    if (!rec) {
      setTab("voice");
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Speech recognition isn't supported in this browser — try Chrome or Edge, or send a typed message instead.",
        },
      ]);
      return;
    }
    window.speechSynthesis?.cancel();
    recognizerRef.current = rec;
    setListening(true);
    rec.onresult = (e: any) => {
      const text = e.results[e.results.length - 1][0].transcript.trim();
      stopListening();
      if (text) respond(text);
    };
    rec.onerror = () => {
      stopListening();
    };
    rec.onend = () => {
      recognizerRef.current = null;
      setListening(false);
    };
    try {
      rec.start();
    } catch {
      /* already running */
    }
  };

  const handleMicClick = () => {
    if (listening) {
      stopListening();
      return;
    }
    startListening();
  };

  const toggleLanguage = () => {
    const next: SpeechLang = lang === "en" ? "hi" : "en";
    setLang(next);
    stopListening();
    if (messages.length > 0) {
      const ack = next === "hi" ? "ज़रूर, अब मैं हिंदी में बात करती हूँ।" : "Sure, switching back to English.";
      setMessages((m) => [...m, { from: "bot", text: ack }]);
      speak(
        ack,
        next,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setTab("chat");
    respond(text);
  };

  const lastBotLine = [...messages].reverse().find((m) => m.from === "bot")?.text ?? greeting;

  return (
    <div
      ref={containerRef}
      className={`fixed right-[16px] bottom-[16px] md:right-[24px] md:bottom-[24px] z-50 flex flex-col items-end gap-[12px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-[32px] scale-90 opacity-0"
      }`}
    >
      {open && (
        <div className="voicechat-panel-in w-[calc(100vw-32px)] max-w-[385px] h-[min(479px,calc(100vh-140px))] flex flex-col overflow-hidden rounded-[24px] border border-white/60 bg-white/55 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-center justify-between px-[20px] pt-[16px] shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Hindi"
              className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-[19px] border border-[#e1e1e1] bg-white/70 px-[14px] hover:bg-white transition-colors"
            >
              <span className="text-[14px] tracking-[-0.56px] text-black">
                {lang === "hi" ? "हिंदी" : "English"}
              </span>
              <img alt="" className="h-[11px] w-[22px] -rotate-90" src={weuiArrowOutlined} />
            </button>

            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={() => setTab("voice")}
                className={`h-[28px] cursor-pointer rounded-full px-[14px] text-[13px] transition-colors ${
                  tab === "voice" ? "bg-black text-white" : "bg-white/60 text-[#555]"
                }`}
              >
                Voice
              </button>
              <button
                type="button"
                onClick={() => setTab("chat")}
                className={`h-[28px] cursor-pointer rounded-full px-[14px] text-[13px] transition-colors ${
                  tab === "chat" ? "bg-black text-white" : "bg-white/60 text-[#555]"
                }`}
              >
                Chat
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close voice chat"
                className="flex size-[28px] cursor-pointer items-center justify-center rounded-full bg-white/60 text-[16px] text-[#555]"
              >
                ×
              </button>
            </div>
          </div>

          {tab === "voice" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-[24px] px-[24px]">
              <button
                type="button"
                onClick={handleMicClick}
                aria-label={listening ? "Stop listening" : "Speak to the voice assistant"}
                className="relative flex size-[157px] cursor-pointer items-center justify-center"
              >
                <span className={`absolute inset-0 ${speaking || listening ? "voicechat-ring-pulse" : ""}`} />
                <img alt="" className="absolute inset-0 block size-full" src={voicechatAvatarRing} />
                <img alt="" className="relative size-[47px]" src={voicechatMic} />
              </button>
              <p className="w-[287px] text-center text-[14px] leading-[19px] text-[#5b5348]">
                {listening ? (lang === "hi" ? "सुन रही हूँ…" : "Listening…") : lastBotLine}
              </p>
            </div>
          ) : (
            <div ref={listRef} className="flex-1 space-y-[10px] overflow-y-auto px-[20px] py-[16px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[260px] rounded-[16px] px-[14px] py-[10px] text-[14px] leading-[19px] ${
                      m.from === "user"
                        ? "bg-black text-white"
                        : "bg-white/80 text-[#2a2a2a] border border-white/60"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSend}
            className="mx-[24px] mb-[20px] mt-[8px] flex h-[44px] shrink-0 items-center rounded-[35px] border border-[#ddd] bg-white/80 pl-[20px] pr-[3px]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="OR SEND A MESSAGE..."
              className="flex-1 bg-transparent text-[13px] uppercase tracking-[-0.64px] text-[#9d9d9d] outline-none placeholder:text-[#9d9d9d]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex size-[38px] cursor-pointer items-center justify-center"
            >
              <img alt="" className="size-[24px]" src={voicechatSend} />
            </button>
          </form>
        </div>
      )}

      {/* On mobile this collapses to a small circular orb (no text label) —
          the full 156px pill-with-label was sized for a desktop cursor
          target, not a thumb-sized corner bubble, and read as oversized
          relative to everything else on a phone screen. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open voice chat"}
        className="flex size-[52px] md:h-[56px] md:w-[156px] cursor-pointer items-center justify-center md:justify-start rounded-full md:rounded-[36px] border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl"
      >
        <span className="relative md:ml-[7px] size-[36px] md:size-[42px] shrink-0 overflow-hidden rounded-full">
          <img alt="" className="size-full" src={ellipse2328} />
          {speaking && (
            <span className="absolute right-[-1px] top-[-1px] size-[10px] voicechat-dot-pulse rounded-full bg-[#B15BFC] ring-2 ring-white" />
          )}
        </span>
        <span className="hidden md:inline ml-[14px] whitespace-nowrap text-[16px] text-black">
          {open ? "Close chat" : "Voice Chat"}
        </span>
      </button>
    </div>
  );
}
