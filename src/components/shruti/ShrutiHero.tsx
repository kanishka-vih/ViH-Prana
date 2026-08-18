import { useEffect, useRef, useState } from "react";
import { Orb, multiColorPreset, goldenGlowPreset, galaxyPreset, oceanDepthsPreset } from "react-ai-orb";
import { weuiArrowOutlined } from "../../assets";
import {
  rectangleGeneric,
  rectangleGeneric2,
  nbfcShowcase,
  rectangleAvatar,
  playRing,
  playIcon,
} from "../../assets/shruti";
import { scrollToContactForm } from "../../lib/scrollToContact";
import { useLocalDemoCall } from "./voice/useLocalDemoCall";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  orbPreset: typeof multiColorPreset;
  glow: string;
};

// Exported so MobileShruti.tsx can reuse the exact same verticals/copy
// instead of maintaining a second, drifting copy of this data.
export const CATEGORIES: Category[] = [
  {
    id: "education",
    name: "Education",
    description: "Handles admissions enquiries and counselling callbacks.",
    image: rectangleGeneric,
    orbPreset: galaxyPreset,
    glow: "rgba(90,90,220,0.55)",
  },
  {
    id: "nbfc",
    name: "Payment Reminder",
    description: "Payment reminders and collections, in the customer's own language.",
    image: nbfcShowcase,
    orbPreset: multiColorPreset,
    glow: "rgba(166,35,248,0.5)",
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Confirms bookings and sends itineraries mid-call.",
    image: rectangleAvatar,
    orbPreset: goldenGlowPreset,
    glow: "rgba(255,183,77,0.55)",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Books appointments and sends reports and reminders.",
    image: rectangleGeneric2,
    orbPreset: oceanDepthsPreset,
    glow: "rgba(38,166,205,0.5)",
  },
  // Add a 5th vertical here (name/description/image/orbPreset/glow)
  // whenever you have one — the carousel below already lays out 5 positions.
];

export type Lang = "en" | "hi";
export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
];

// The animated center "orb" is one persistent element whose box (position +
// size) is driven entirely by inline style, so switching between idle /
// voice-call / chat-call is a single CSS transition on the same node (a
// FLIP-style shrink/grow) instead of different elements swapping in and
// out. Voice-call keeps the exact idle size — only its content changes
// (image -> animated 3D sphere) — so the carousel's left/right neighbors
// are never crowded out.
const IDLE_BOX = { left: 485, top: 120, width: 257, height: 257 };
// The chat panel is a small fixed-width card centered in the stage, narrow
// enough that the blurred left/right category circles stay visible on
// either side of it (elevenlabs.io's concierge widget is the reference).
const CHAT_PANEL_BOX = { left: 430, top: 70, width: 380, height: 420 };
const CHAT_ORB_BOX = { left: CHAT_PANEL_BOX.left + 20, top: CHAT_PANEL_BOX.top + 18, width: 44, height: 44 };
// react-ai-orb's `size` prop is a multiplier of its own 82px base — the
// sphere is always rendered at the idle/voice box's pixel size, then this
// wrapper is scaled down with a transform for the chat avatar so the
// shrink still animates smoothly (the library's own size prop resizes
// instantly, with no transition).
const ORB_BASE_PX = 82;
const ORB_RENDER_SIZE = IDLE_BOX.width / ORB_BASE_PX;
const ORB_CHAT_SCALE = CHAT_ORB_BOX.width / IDLE_BOX.width;

export default function ShrutiHero() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [tab, setTab] = useState<"voice" | "chat">("voice");
  const [callOpen, setCallOpen] = useState(false);
  const call = useLocalDemoCall();
  const listRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [language, setLanguageState] = useState<Lang>("en");
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [call.turns, tab]);

  useEffect(() => {
    if (!langOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [langOpen]);

  const handleLanguageSelect = (code: Lang) => {
    setLanguageState(code);
    setLangOpen(false);
    call.setLanguage(code);
  };

  const len = CATEGORIES.length;
  const leftIndex = (activeIndex - 1 + len) % len;
  const rightIndex = (activeIndex + 1) % len;
  // The far corner "peeks" show whichever verticals are 2 steps away in
  // each direction — with 4 categories that's the same one on both sides
  // (an unavoidable symmetry at even counts); add a 5th to break that tie.
  const leftPeekIndex = (activeIndex - 2 + len) % len;
  const rightPeekIndex = (activeIndex + 2) % len;
  const center = CATEGORIES[activeIndex];
  const left = CATEGORIES[leftIndex];
  const right = CATEGORIES[rightIndex];
  const leftPeek = CATEGORIES[leftPeekIndex];
  const rightPeek = CATEGORIES[rightPeekIndex];

  const isVoice = tab === "voice";

  // Switching category while a call is live restarts the call for the
  // newly-picked vertical (in whichever mode was active) instead of just
  // changing which image is shown — so the arrows double as an agent
  // switcher mid-conversation.
  const switchTo = (index: number) => {
    setActiveIndex(index);
    if (callOpen) call.start(CATEGORIES[index].id, tab);
  };
  const goPrev = () => switchTo(leftIndex);
  const goNext = () => switchTo(rightIndex);

  const handlePlay = () => {
    setCallOpen(true);
    call.start(center.id, tab);
  };

  const handleClose = () => {
    call.end();
    setCallOpen(false);
    setDraft("");
  };

  const handleModeChange = (m: "voice" | "chat") => {
    setTab(m);
    if (callOpen) call.setInputMode(m);
  };

  const submitDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    call.sendText(draft);
    setDraft("");
  };

  const statusLabel =
    call.state === "connecting"
      ? "Connecting…"
      : call.state === "active"
        ? call.agentSpeaking
          ? "Speaking…"
          : isVoice
            ? "Listening…"
            : "Online"
        : call.state === "ended"
          ? "Call ended"
          : "Something went wrong";
  const statusColor =
    call.state === "error" ? "text-[#c0392b]" : call.state === "ended" ? "text-[#8a8f9c]" : "text-[#1fa971]";

  // The other verticals stay exactly as they are once a call starts —
  // fully visible and clickable, so the arrows/circles can switch the
  // active agent mid-call without the rest of the carousel looking dimmed.
  const sideFade = "";

  return (
    <div className="flex flex-col gap-[70px] items-center w-full">
      <div className="flex h-[207px] items-start justify-between w-[1241px]">
        <div className="flex flex-col gap-[42px] h-[207px] items-start w-[565px]">
          <h1 className="font-light leading-[59px] text-[52px] text-black tracking-[-2.16px] w-[439px] m-0">
            If it's Speech, it's Shruti
          </h1>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] cursor-pointer"
          >
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
        </div>
        <p className="font-normal text-[#555] text-[24px] tracking-[-1px] w-[309px] m-0 leading-[32px]">
          Real-time speech AI with customised voice bots built for your business.
        </p>
      </div>

      <div className="bg-[#f4f4f4] border border-[#e8e8e8] border-solid h-[588px] overflow-hidden relative rounded-[24px] w-[1240px]">
        {/* Edge "peeks" — the 4th/5th verticals, one jump further out on
            each side than the labeled left/right circles. Always clickable,
            just dimmer/blurred while a call is active. */}
        <button
          type="button"
          onClick={() => switchTo(leftPeekIndex)}
          aria-label={`Show ${leftPeek.name}`}
          className={`absolute left-[-56px] top-[172px] size-[165px] cursor-pointer overflow-hidden rounded-full border-none p-0 opacity-60 hover:opacity-80 ${sideFade}`}
        >
          <img alt="" className="size-full object-cover" src={leftPeek.image} />
        </button>
        <button
          type="button"
          onClick={() => switchTo(rightPeekIndex)}
          aria-label={`Show ${rightPeek.name}`}
          className={`absolute left-[1116px] top-[172px] size-[165px] cursor-pointer overflow-hidden rounded-full border-none p-0 opacity-60 hover:opacity-80 ${sideFade}`}
        >
          <img alt="" className="size-full object-cover" src={rightPeek.image} />
        </button>

        {/* Left (previous) category */}
        <button
          type="button"
          onClick={goPrev}
          aria-label={`Show ${left.name}`}
          className={`absolute left-[203px] top-[153px] size-[199px] rounded-full overflow-hidden cursor-pointer border-none p-0 ${sideFade}`}
        >
          <img alt="" className="size-full object-cover" src={left.image} />
        </button>
        <div className={`absolute left-[202px] top-[406px] w-[202px] flex flex-col gap-[10px] items-center text-center ${sideFade}`}>
          <p className="text-[#696969] text-[20px] tracking-[-0.8px] m-0 leading-[24px]">{left.name}</p>
          <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px]">{left.description}</p>
        </div>

        {/* Left/right arrows pinned to the stage edges — always visible and
            clickable, in every mode, so switching the active agent works
            mid-call whether the chat panel or the voice orb is showing. */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous category"
          className="absolute left-[24px] top-[276px] z-20 flex size-[40px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0"
        >
          <img alt="" className="h-[32px] w-[16px] rotate-180" src={weuiArrowOutlined} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next category"
          className="absolute right-[24px] top-[276px] z-20 flex size-[40px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0"
        >
          <img alt="" className="h-[32px] w-[16px]" src={weuiArrowOutlined} />
        </button>

        {/* The orb: a single persistent element that swaps its content
            (category image <-> animated 3D sphere, via react-ai-orb) and
            shrinks into a small chat avatar. It's always rendered at full
            (idle/voice) pixel size and scaled down with a transform for
            the chat avatar, so the shrink still animates smoothly — the
            library's own `size` prop resizes instantly, with no
            transition. z-20 so it always renders above the chat panel. */}
        <div
          className="absolute z-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: callOpen && !isVoice ? CHAT_ORB_BOX.left : IDLE_BOX.left,
            top: callOpen && !isVoice ? CHAT_ORB_BOX.top : IDLE_BOX.top,
            width: IDLE_BOX.width,
            height: IDLE_BOX.height,
            transform: callOpen && !isVoice ? `scale(${ORB_CHAT_SCALE})` : "scale(1)",
            transformOrigin: "top left",
          }}
        >
          {/* Soft ambient glow behind the live sphere — not clipped, so its
              blur can bleed past the orb's own circular edge for depth. */}
          {callOpen && (
            <div
              className={`pointer-events-none absolute inset-[-18%] rounded-full blur-3xl shruti-orb-halo-pulse ${
                call.agentSpeaking ? "shruti-orb-fast" : ""
              }`}
              style={{ background: `radial-gradient(circle, ${center.glow} 0%, transparent 70%)` }}
            />
          )}
          {!callOpen ? (
            <div className="relative size-full overflow-hidden rounded-full">
              <img alt="" className="size-full object-cover" src={center.image} />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : (
            // Not clipped (unlike the idle image) — the orb is already a
            // circle via its own CSS, and clipping would cut it off mid-bob.
            <div
              className={`relative flex size-full items-center justify-center shruti-orb-float ${
                call.agentSpeaking ? "shruti-orb-fast" : ""
              }`}
            >
              <Orb
                {...center.orbPreset}
                size={ORB_RENDER_SIZE}
                {...(call.agentSpeaking ? { animationSpeedBase: 2.6, animationSpeedHue: 1.3 } : {})}
              />
            </div>
          )}
          {!callOpen && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Talk to the ${center.name} demo`}
              className="absolute left-1/2 top-1/2 size-[64px] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0"
            >
              <img alt="" className="size-full" src={playRing} />
              <img alt="" className="absolute left-[20px] top-[20px] size-[24px]" src={playIcon} />
            </button>
          )}
        </div>

        {/* Idle: name + description. In-call voice mode: name + live status.
            Hidden in chat mode — the chat panel already shows both. */}
        <div
          className={`absolute left-0 right-0 top-[398px] flex flex-col items-center gap-[10px] text-center transition-opacity duration-300 ${
            callOpen && !isVoice ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-[20px] text-black tracking-[-0.8px] m-0 leading-[24px]">{center.name}</p>
          {!callOpen ? (
            <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px] w-[280px]">
              {center.description}
            </p>
          ) : (
            <p className={`text-[13px] m-0 ${statusColor}`}>{statusLabel}</p>
          )}
        </div>

        {/* Voice-mode call controls */}
        <div
          className={`absolute left-[420px] right-[420px] top-[470px] flex items-center justify-center gap-[12px] transition-opacity duration-300 ${
            callOpen && isVoice ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => call.setMuted((m) => !m)}
            disabled={call.state !== "active"}
            className={`flex h-[44px] flex-1 items-center justify-center gap-[8px] rounded-[12px] border cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              call.muted ? "border-[#c0392b] bg-[#fdeeec] text-[#c0392b]" : "border-[#e3e5ea] bg-white text-[#131313]"
            }`}
          >
            {call.muted ? "Unmute" : "Mute"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-[44px] flex-1 cursor-pointer items-center justify-center gap-[8px] rounded-[12px] bg-[#c0392b] text-white"
          >
            End call
          </button>
        </div>
        {callOpen && isVoice && call.warnings.length > 0 && (
          <p className="absolute left-[420px] right-[420px] top-[520px] text-center text-[11px] text-[#c0392b]">
            {call.warnings[call.warnings.length - 1]}
          </p>
        )}

        {/* Chat-mode panel: a small glass card (not full-width) so the
            blurred left/right category circles stay visible on either
            side, matching elevenlabs.io's concierge widget. z-10, below
            the orb (z-20) so the shrunk avatar shows in its header. */}
        <div
          className={`absolute z-10 rounded-[20px] border border-white/60 bg-white/60 shadow-[0_20px_50px_rgba(20,10,40,0.18)] backdrop-blur-xl transition-opacity duration-300 ${
            callOpen && !isVoice ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
          style={CHAT_PANEL_BOX}
        >
          <p
            className="absolute left-[84px] top-[18px] m-0 truncate text-[14px] font-semibold text-[#131313]"
            style={{ width: 240 }}
          >
            {center.name}
          </p>
          <p className={`absolute left-[84px] top-[38px] m-0 text-[12px] ${statusColor}`}>{statusLabel}</p>

          <div
            ref={listRef}
            className="absolute left-[20px] right-[20px] top-[78px] h-[270px] space-y-[10px] overflow-y-auto"
          >
            {call.turns.map((t, i) => (
              <div key={i} className={`flex ${t.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-[16px] px-[12px] py-[8px] text-[13px] leading-[18px] backdrop-blur-sm ${
                    t.from === "user"
                      ? "bg-[#131313]/90 text-white"
                      : "border border-white/50 bg-white/70 text-[#232323]"
                  }`}
                >
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          {call.warnings.length > 0 && (
            <p className="absolute left-[20px] right-[20px] top-[352px] m-0 text-[11px] text-[#c0392b]">
              {call.warnings[call.warnings.length - 1]}
            </p>
          )}

          <form
            onSubmit={submitDraft}
            className="absolute left-[20px] right-[20px] top-[364px] flex h-[40px] items-center gap-[8px]"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              disabled={call.state !== "active"}
              className="h-full flex-1 rounded-[10px] border border-white/50 bg-white/70 px-[10px] text-[13px] text-[#131313] outline-none backdrop-blur-sm placeholder:text-[#7a7d87] focus:border-[#9a00ff] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={call.state !== "active" || !draft.trim()}
              className="flex h-full cursor-pointer items-center justify-center rounded-[10px] bg-[#131313]/90 px-[14px] text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right (next) category */}
        <button
          type="button"
          onClick={goNext}
          aria-label={`Show ${right.name}`}
          className={`absolute left-[825px] top-[153px] size-[199px] rounded-full overflow-hidden cursor-pointer border-none p-0 bg-white ${sideFade}`}
        >
          <img alt="" className="size-full object-cover" src={right.image} />
        </button>
        <div className={`absolute left-[826px] top-[406px] w-[202px] flex flex-col gap-[10px] items-center text-center ${sideFade}`}>
          <p className="text-[#696969] text-[20px] tracking-[-0.8px] m-0 leading-[24px]">{right.name}</p>
          <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px]">{right.description}</p>
        </div>

        {/* Edge fade masks so the peek circles taper into the card background */}
        <div
          className="absolute left-0 top-0 h-full w-[164px] rounded-l-[24px] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(90deg, #f4f4f4 7.4%, rgba(244,244,244,0) 95%)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-[164px] rounded-r-[24px] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(270deg, #f4f4f4 7.4%, rgba(244,244,244,0) 95%)" }}
        />

        {/* Bottom bar: language + contact sales — stays visible and
            interactive during a call, same as every other page element. */}
        <div className="absolute left-[91px] right-[91px] top-[507px] h-[46px] flex items-center justify-between">
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Change language"
              aria-expanded={langOpen}
              className="flex gap-[5px] items-center cursor-pointer border-none bg-transparent p-0"
            >
              <span className="size-[38px] rounded-full overflow-hidden border-4 border-white bg-white block">
                <img alt="" className="size-full object-cover" src={rectangleAvatar} />
              </span>
              <span className="text-[20px] text-black text-center tracking-[-0.8px]">
                {LANGUAGES.find((l) => l.code === language)?.label}
              </span>
              <img
                alt=""
                className={`h-[32px] w-[16px] rotate-90 transition-transform duration-200 ${langOpen ? "rotate-[270deg]" : ""}`}
                src={weuiArrowOutlined}
              />
            </button>
            {langOpen && (
              <div className="voicechat-panel-in absolute bottom-[calc(100%+10px)] left-0 z-40 w-[160px] overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLanguageSelect(l.code)}
                    className={`flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-[16px] py-[10px] text-left text-[15px] transition-colors hover:bg-[#f4f4f4] ${
                      language === l.code ? "font-semibold text-black" : "text-[#555]"
                    }`}
                  >
                    {l.label}
                    {language === l.code && <span className="text-[#9a00ff]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] cursor-pointer"
          >
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
        </div>

        {/* Voice / Chat toggle — always available, also drives the live
            call's input mode once a call is open. */}
        <div className="absolute left-[454px] top-[33px] flex gap-[8px] items-end z-30">
          <button
            type="button"
            onClick={() => handleModeChange("voice")}
            className={`h-[40px] w-[128px] flex items-center justify-center rounded-[12px] border cursor-pointer transition-colors ${
              tab === "voice" ? "bg-white border-[#e8e8e8]" : "bg-transparent border-transparent"
            }`}
          >
            <span className="text-[#504e47] text-[20px] tracking-[-0.8px]">Voice</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("chat")}
            className={`h-[37px] w-[129px] flex items-center justify-center rounded-[24px] border cursor-pointer transition-colors ${
              tab === "chat" ? "bg-white border-[#e8e8e8]" : "bg-transparent border-transparent"
            }`}
          >
            <span className="text-[#504e47] text-[20px] tracking-[-0.8px]">Chat</span>
          </button>
        </div>

        {/* Close call */}
        {callOpen && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close call"
            className="absolute right-[40px] top-[33px] z-30 flex size-[32px] cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/50 text-[16px] text-[#555] backdrop-blur-md"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
