import { useEffect, useRef, useState } from "react";
import { weuiArrowOutlined } from "../../assets";
import { ellipse2328, voicechatAvatarRing, voicechatMic, voicechatSend } from "../../assets/home";
import { CONTACT_FORM_ID } from "../../lib/scrollToContact";

type Message = { from: "bot" | "user"; text: string };

// Widget stays on screen for the first 4 viewport-heights of scroll (the
// hero/intro), hides through the "globe" (ViH Prana) section so it doesn't
// clutter that visual, then reappears for everything after it — the
// product cards, the CCCAAA sequence, testimonials — right up until the
// contact form, where it hides again so it never sits on top of the
// actual input fields.
const VISIBLE_FOR_PAGES = 4;
const GLOBE_SECTION_ID = "vih-prana-section";

const GREETING =
  "Hi, I'm Prana's voice assistant. Ask me about call intelligence, workflows, or analytics.";

const DEMO_REPLIES = [
  "Got it — Prana can pull that up from your call intelligence dashboard in real time.",
  "Sure thing. Our agents can automate that workflow end-to-end with human oversight.",
  "That's tracked automatically across every channel, so nothing falls through the cracks.",
];

function speak(text: string, onStart: () => void, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onStart();
    window.setTimeout(onEnd, 1200);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export default function VoiceChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"voice" | "chat">("voice");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [visible, setVisible] = useState(true);
  const replyIndex = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: GREETING }]);
      speak(
        GREETING,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  }, [open, messages.length]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, tab]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const replayGreeting = () => {
    const lastBotLine = [...messages].reverse().find((m) => m.from === "bot")?.text ?? GREETING;
    speak(
      lastBotLine,
      () => setSpeaking(true),
      () => setSpeaking(false),
    );
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTab("chat");
    window.setTimeout(() => {
      const reply = DEMO_REPLIES[replyIndex.current % DEMO_REPLIES.length];
      replyIndex.current += 1;
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      speak(
        reply,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }, 900);
  };

  const lastBotLine = [...messages].reverse().find((m) => m.from === "bot")?.text ?? GREETING;

  return (
    <div
      className={`fixed right-[24px] bottom-[24px] z-50 flex flex-col items-end gap-[12px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-[32px] scale-90 opacity-0"
      }`}
    >
      {open && (
        <div className="voicechat-panel-in w-[385px] h-[479px] flex flex-col overflow-hidden rounded-[24px] border border-white/60 bg-white/55 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-center justify-between px-[20px] pt-[16px] shrink-0">
            <div className="flex h-[32px] items-center gap-[6px] rounded-[19px] border border-[#e1e1e1] bg-white/70 px-[14px]">
              <span className="text-[14px] tracking-[-0.56px] text-black">English</span>
              <img alt="" className="h-[11px] w-[22px] -rotate-90" src={weuiArrowOutlined} />
            </div>

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
                onClick={replayGreeting}
                aria-label="Replay voice greeting"
                className="relative flex size-[157px] cursor-pointer items-center justify-center"
              >
                <span className={`absolute inset-0 ${speaking ? "voicechat-ring-pulse" : ""}`} />
                <img alt="" className="absolute inset-0 block size-full" src={voicechatAvatarRing} />
                <img alt="" className="relative size-[47px]" src={voicechatMic} />
              </button>
              <p className="w-[287px] text-center text-[14px] leading-[19px] text-[#5b5348]">
                {lastBotLine}
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

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[56px] w-[156px] cursor-pointer items-center rounded-[36px] border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl"
      >
        <span className="relative ml-[7px] size-[42px] shrink-0 overflow-hidden rounded-full">
          <img alt="" className="size-full" src={ellipse2328} />
          {speaking && (
            <span className="absolute right-[-1px] top-[-1px] size-[10px] voicechat-dot-pulse rounded-full bg-[#B15BFC] ring-2 ring-white" />
          )}
        </span>
        <span className="ml-[14px] whitespace-nowrap text-[16px] text-black">
          {open ? "Close chat" : "Voice Chat"}
        </span>
      </button>
    </div>
  );
}
