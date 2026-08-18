import { useEffect, useRef, useState } from "react";
import { MobileHero, Reveal, SectionChord } from "../home/MobileHome";
import { CATEGORIES, LANGUAGES, type Lang } from "./ShrutiHero";
import { useVoiceCall } from "./voice/useVoiceCall";
import {
  weuiArrowOutlined,
  demoOrbWebp,
  demoOrbWebp1,
  streamlineCustomerSupport,
  streamlineDecentWork,
  images11,
  images21,
  images31,
  images41,
  images2,
  bsnlLogo1,
  a5e5bd2a,
  polygon33,
} from "../../assets";
import { rectangleAvatar, playRing, playIcon, iconFileSystem } from "../../assets/shruti";
import { sectionChordNavyDotted } from "../../assets/mobile";
import { dashboard1, dashboard2, dashboard3, iconHeadset, iconUsers, iconWorkflow, glowBubble } from "../../assets/shruti-mobile";
import { scrollToContactForm } from "../../lib/scrollToContact";

const trustedByLogos = [images11, images21, images31, images41, images2, bsnlLogo1, a5e5bd2a];

const outcomeCards = [
  {
    title: "Improve customer experience",
    description:
      "Resolve inbound support end to end, at lower cost per resolution. Customers get instant answers; your team focuses on what needs a human.",
    icon: streamlineCustomerSupport,
    orb: demoOrbWebp,
  },
  {
    title: "Drive growth across the funnel",
    description:
      "Qualify leads, recover abandoned carts, and run outbound at scale. Conversational agents convert at rates digital flows can't match.",
    icon: streamlineDecentWork,
    orb: demoOrbWebp1,
  },
  {
    title: "Increase efficiency",
    description:
      "Automate scheduling, reminders, collections, and internal ops. Reach thousands in hours and free your team for higher-impact work.",
    icon: iconFileSystem,
    orb: null,
  },
];

const featureCards = [
  {
    title: "Call Intelligence",
    description: "Track call minutes, recordings, intent, pickup rates, and live performance from one unified dashboard.",
    icon: iconHeadset,
  },
  {
    title: "Intent",
    description: "Detects customer intent in real time to deliver accurate, contextual, and goal-driven conversations.",
    icon: iconUsers,
  },
  {
    title: "Workflows",
    description: "Tailored workflows that align with your business, products, processes, and customer journeys.",
    icon: iconWorkflow,
  },
];

// The same 4 industry verticals ShrutiHero.tsx (desktop) cycles through,
// with a scaled-down version of the same live call UI instead of the full
// orb-visualization desktop has room for — Figma's own mobile mock only
// shows a simple circular avatar + play button + prev/next arrows, not the
// full call UI.
//
// Voice only — useVoiceCall is a real backend WebSocket-audio integration
// with no text-chat path, unlike the old useLocalDemoCall (fully
// client-side, scripted) this replaced, so the Voice/Chat toggle that used
// to sit here is gone rather than shipping a Chat tab that would silently
// do nothing.
function MobileVoiceChatCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [callOpen, setCallOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>("en");
  const [langOpen, setLangOpen] = useState(false);
  const call = useVoiceCall();

  const len = CATEGORIES.length;
  const active = CATEGORIES[activeIndex];

  // `end()` before `start()` — without it, switching category mid-call
  // would leave the previous WebSocket/mic stream open while a second one
  // starts, rather than cleanly replacing it.
  const switchTo = (index: number) => {
    setActiveIndex(index);
    if (callOpen) {
      call.end();
      call.start(CATEGORIES[index].id, { lang: language });
    }
  };
  const goPrev = () => switchTo((activeIndex - 1 + len) % len);
  const goNext = () => switchTo((activeIndex + 1) % len);

  const handlePlayToggle = () => {
    if (callOpen) {
      call.end();
      setCallOpen(false);
    } else {
      setCallOpen(true);
      call.start(active.id, { lang: language });
    }
  };

  const statusLabel =
    call.state === "connecting"
      ? "Connecting…"
      : call.state === "active"
        ? call.agentSpeaking
          ? "Speaking…"
          : "Listening…"
        : call.state === "ended"
          ? "Call ended"
          : "Something went wrong";

  return (
    <Reveal className="bg-[#f4f4f4] flex flex-col gap-[20px] items-start px-[16px] py-[32px] rounded-[24px] w-full">

      <div className="bg-[#f4f4f4] flex flex-col gap-[24px] items-center px-[20px] py-[32px] rounded-[24px] w-full">
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous industry"
            className="flex size-[36px] items-center justify-center rounded-full cursor-pointer border-none bg-transparent"
          >
            <img alt="" className="h-[32px] w-[16px] rotate-180" src={weuiArrowOutlined} />
          </button>

          <div className="relative flex items-center justify-center size-[180px] rounded-full overflow-hidden shrink-0">
            <img alt="" className="absolute inset-0 size-full object-cover" src={active.image} />
            <div className="absolute inset-0 bg-black/20" />
            {callOpen && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className={`size-[16px] rounded-full bg-white ${call.agentSpeaking ? "voicechat-dot-pulse" : ""}`} />
              </div>
            )}
            <button
              type="button"
              onClick={handlePlayToggle}
              aria-label={callOpen ? "End demo call" : `Talk to the ${active.name} demo`}
              className="absolute left-1/2 top-1/2 size-[48px] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0"
            >
              {!callOpen && (
                <>
                  <img alt="" className="size-full" src={playRing} />
                  <img alt="" className="absolute left-[15px] top-[15px] size-[18px]" src={playIcon} />
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next industry"
            className="flex size-[36px] items-center justify-center rounded-full cursor-pointer border-none bg-transparent"
          >
            <img alt="" className="h-[32px] w-[16px]" src={weuiArrowOutlined} />
          </button>
        </div>

        <div className="flex flex-col gap-[8px] items-center text-center w-full">
          <p className="font-bold leading-[28px] text-[#040404] text-[22px] tracking-[-0.44px] m-0">{active.name}</p>
          <p className="font-normal leading-[20px] text-[#6a6a6a] text-[14px] tracking-[-0.14px] m-0">
            {callOpen ? statusLabel : active.description}
          </p>
        </div>

        {callOpen && (
          <button
            type="button"
            onClick={handlePlayToggle}
            className="flex h-[40px] items-center justify-center gap-[8px] rounded-[12px] bg-[#c0392b] px-[20px] text-white cursor-pointer"
          >
            End call
          </button>
        )}

        <div className="flex gap-[6px] items-center">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => switchTo(i)}
              aria-label={`Show ${c.name}`}
              className={`size-[6px] rounded-full cursor-pointer border-none p-0 transition-colors ${
                i === activeIndex ? "bg-[#040404]" : "bg-[#d4d4d4]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="relative flex gap-[5px] items-center">
          <button
            type="button"
            onClick={() => setLangOpen((o) => !o)}
            aria-label="Change language"
            className="flex gap-[5px] items-center cursor-pointer border-none bg-transparent p-0"
          >
            <span className="size-[38px] rounded-full overflow-hidden border-4 border-white bg-white block">
              <img alt="" className="size-full object-cover" src={rectangleAvatar} />
            </span>
            <span className="text-[18px] text-black tracking-[-0.72px]">{LANGUAGES.find((l) => l.code === language)?.label}</span>
            <img alt="" className="h-[16px] w-[8px] rotate-90" src={weuiArrowOutlined} />
          </button>
          {langOpen && (
            <div className="voicechat-panel-in absolute top-[calc(100%+8px)] left-0 z-40 w-[140px] overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setLangOpen(false);
                    // Same restart-on-change as switchTo above — no live
                    // language switch over an open WebSocket, so this
                    // closes the current call and reopens one with the
                    // new `lang` templateParam instead.
                    if (callOpen) {
                      call.end();
                      call.start(active.id, { lang: l.code });
                    }
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-[14px] py-[10px] text-left text-[14px] hover:bg-[#f4f4f4] ${
                    language === l.code ? "font-semibold text-black" : "text-[#555]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={scrollToContactForm}
          className="bg-[#232323] flex gap-[10px] h-[40px] items-center justify-center px-[12px] py-[8px] rounded-[8px] cursor-pointer"
        >
          <span className="font-medium text-[13px] text-white">Contact sales</span>
          <img alt="" className="h-[16px] w-[8px]" src={weuiArrowOutlined} />
        </button>
      </div>
    </Reveal>
  );
}

function MobileTrustedBy() {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <p className="font-normal text-[#737373] text-[14px] tracking-[-0.5px] m-0">We are trusted by people by multiple domains</p>
      <div className="marquee-mask relative overflow-hidden opacity-80">
        <div className="marquee-track flex items-center gap-[24px] w-max">
          {[...trustedByLogos, ...trustedByLogos].map((logo, i) => (
            <img key={i} alt="" className="h-[40px] w-auto shrink-0" src={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Same 3 concentric domes ShrutiOutcomes.tsx (desktop) rises up on scroll —
// that component built them as plain circles (a flattened Figma export
// can't be split into independently animated pieces) rather than a static
// image, reusing the same `shruti-ring-rise`/`shruti-orb-bounce` keyframes
// this just scales down for mobile's width instead of the desktop 1440px
// canvas (0.2708 = 390/1440, so the same relative arc/curve shows through
// at this width instead of a smaller or larger slice of it).
const MOBILE_RING_SCALE = 390 / 1440;
const RINGS = [
  { diameter: 2385 * MOBILE_RING_SCALE, top: 0, color: "#0a1c38" },
  { diameter: 2100 * MOBILE_RING_SCALE, top: 265 * MOBILE_RING_SCALE, color: "#071428" },
  { diameter: 1550 * MOBILE_RING_SCALE, top: 460 * MOBILE_RING_SCALE, color: "#040c1c" },
];

function MobileOutcomes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bounced, setBounced] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setBounced(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-[#050b14] overflow-hidden flex flex-col gap-[24px] px-[20px] py-[48px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {RINGS.map((ring, i) => (
          <div
            key={ring.color}
            className={`absolute rounded-full left-1/2 ${bounced ? "shruti-ring-rise" : "opacity-0"}`}
            style={{
              width: ring.diameter,
              height: ring.diameter,
              top: ring.top,
              marginLeft: -ring.diameter / 2,
              backgroundColor: ring.color,
              animationDelay: bounced ? `${i * 0.18}s` : undefined,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>
      <p className="relative font-light leading-[32px] text-[#fefefe] text-[26px] text-center tracking-[-0.8px] m-0">
        Voice and chat agents built to improve support, sales and operational outcomes
      </p>
      <div className="relative flex flex-col gap-[16px]">
        {outcomeCards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.15}>
            <div className="backdrop-blur-[8px] bg-[rgba(28,31,38,0.7)] border border-white/15 flex flex-col gap-[16px] p-[20px] rounded-[16px] w-full">
              <div className="flex items-center justify-between w-full">
                <p className="flex-1 font-medium leading-[24px] text-[#fefefe] text-[20px] tracking-[0.1px] m-0">{card.title}</p>
                <div
                  className={`relative shrink-0 size-[42px] rounded-full overflow-hidden flex items-center justify-center ${bounced ? "shruti-orb-bounce" : "opacity-0"}`}
                  style={{
                    backgroundImage: card.orb
                      ? undefined
                      : "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%)",
                    animationDelay: bounced ? `${i * 0.15}s` : undefined,
                  }}
                >
                  {card.orb && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(96.94deg, rgb(255,222,254) 16.091%, rgb(255,103,249) 92.737%, rgb(154,0,255) 146.11%, rgb(149,44,246) 225.38%, rgb(99,40,241) 304.35%, rgb(234,225,255) 383.32%)",
                      }}
                    >
                      <img alt="" className="absolute inset-0 size-full object-cover mix-blend-luminosity opacity-40" src={card.orb} />
                    </div>
                  )}
                  <img alt="" className="relative size-[20px]" src={card.icon} />
                </div>
              </div>
              <p className="font-normal leading-[20px] text-[#b3b9c4] text-[14px] tracking-[0.14px] m-0">{card.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function MobileRealtimeVisibility() {
  return (
    <div className="relative bg-white overflow-hidden flex flex-col gap-[32px] px-[16px] py-[56px]">
      <img alt="" className="pointer-events-none absolute -left-[150px] top-[100px] w-[500px] opacity-50 rotate-[84deg]" src={polygon33} />
      <img alt="" className="pointer-events-none absolute left-[40px] top-[300px] w-[300px] opacity-60" src={glowBubble} />

      <Reveal className="relative flex flex-col gap-[16px]">
        <p className="font-light leading-[34px] text-[#212121] text-[28px] tracking-[-0.8px] m-0">
          Real-Time Visibility Across Every Interaction
        </p>
        <p className="font-normal leading-[20px] text-[#585858] text-[14px] m-0">
          Automated documentation, live dashboards, and proactive insights give supervisors the clarity to make
          faster decisions, optimize performance, and protect the business.
        </p>
      </Reveal>

      <Reveal className="relative bg-[rgba(235,235,235,0.7)] border border-[#e8e8e8] flex flex-col gap-[20px] p-[16px] rounded-[24px] w-full" delay={0.1}>
        <img alt="" className="w-full rounded-[6px] object-cover" src={dashboard1} />
        <div className="flex flex-col gap-[16px] w-full">
          <img alt="" className="w-full rounded-[8px] object-cover" src={dashboard2} />
          <img alt="" className="w-full rounded-[8px] object-cover" src={dashboard3} />
        </div>
        <div className="h-px w-full bg-black/10" />
        <div className="flex flex-col gap-[6px] w-full">
          <p className="font-semibold text-[#212121] text-[14px] m-0">Analytics</p>
          <p className="font-normal text-[#585858] text-[12px] leading-[16px] m-0">
            Easily measure success rates and CX metrics, optimising flows over time.
          </p>
        </div>
      </Reveal>

      <div className="relative flex flex-col gap-[16px]">
        {featureCards.map((card, i) => (
          <Reveal key={card.title} delay={0.2 + i * 0.15}>
            <div className="bg-[rgba(235,235,235,0.41)] border border-[#cfcfcf] flex flex-col gap-[12px] p-[20px] rounded-[20px] w-full">
              <div className="flex items-start p-[8px] rounded-[12px]">
                <img alt="" className="size-[24px]" src={card.icon} />
              </div>
              <div className="flex flex-col gap-[6px] w-full">
                <p className="font-semibold text-[#212121] text-[18px] m-0">{card.title}</p>
                <p className="font-normal text-[#585858] text-[13px] leading-[18px] m-0">{card.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function MobileShruti() {
  return (
    <div className="flex flex-col w-full">
      {/* Figma's mobile frame for this page shows Home's "Your Left Brain,
          Reimagined" copy here too — that's a copy-paste mistake in the
          design itself (confirmed against the actual desktop Shruti hero,
          ShrutiHero.tsx, which uses this heading/subcopy instead), not
          something this page should actually match. */}
      {/* No hero CTA here — "Contact us" already lives in the nav bar
          (Header.tsx), so this doesn't repeat the same action twice on one
          screen, matching the same change made to Home's hero. */}
      <MobileHero
        heading="If it's Speech, it's Shruti"
        subcopy="Real-time speech AI with customised voice bots built for your business."
        showCta={false}
      />
      <div className="px-[16px] pb-[40px] flex flex-col gap-[16px]">
        <MobileVoiceChatCarousel />
        <MobileTrustedBy />
      </div>
      {/* Figma nests a chord cap ("Ellipse 2292", same shape as Enterprise
          Problems' own chord, just recolored to this panel's own navy
          instead of Enterprise Problems' charcoal) right above this panel.
          Without it, the panel was a flat rectangle starting right at the
          white trusted-by section above — reading as extra square dark
          corners poking into the white area that the actual curved dome
          shouldn't have covered.
          Only a small `-mt-[6px]` overlap (same amount Home's own chord
          uses for its analogous seam) — the dome only flares out to the
          panel's full width right at its very bottom edge, so any bigger
          overlap pulls the panel's own flat, square-cornered top edge up
          into the part of the dome that's still narrower than full width,
          which reads as a second, flat-edged block sitting on top of the
          curve instead of the curve just flowing into the panel. */}
      <SectionChord src={sectionChordNavyDotted} />
      <div className="-mt-[6px]">
        <MobileOutcomes />
      </div>
      <MobileRealtimeVisibility />
    </div>
  );
}
