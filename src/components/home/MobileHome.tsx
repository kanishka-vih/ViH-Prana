import { useEffect, useRef, useState, type ReactNode } from "react";
import HeroVideo from "./HeroVideo";
import { useNavigate } from "react-router-dom";
import {
  weuiArrowOutlined,
  solarArrowUpOutline,
  images11,
  images21,
  images31,
  images41,
  images2,
  bsnlLogo1,
  a5e5bd2a,
  polygon33,
  demoOrbWebp,
  demoOrbWebp1,
  streamlineCustomerSupport,
  streamlineDecentWork,
  famiconsCall,
} from "../../assets";
import { outputOnlinegiftools1, ellipse2286, ellipse2283, ellipse2285, ellipse2284 } from "../../assets/home";
import { polygon34, enterpriseDivider } from "../../assets/mobile";
import { scrollToContactForm } from "../../lib/scrollToContact";

type ProductId = "prana" | "shruti" | "viveka" | "messenger";

// Same 4 products/copy VihPranaSection.tsx (desktop) cycles through — kept
// in sync with that one rather than inventing separate mobile copy.
const ECOSYSTEM_PRODUCTS: Record<ProductId, { name: string; type: string; tech: string; body: string }> = {
  prana: {
    name: "ViH Prana",
    type: "Omnichannel Orchestration",
    tech: "AI",
    body: "Prana is the AI orchestration layer that fuses every email, call, chat, and meeting your customers leave behind into a single coherent reality — so support and sales teams stop chasing ghosts.",
  },
  shruti: {
    name: "ViH Shruti",
    type: "Voice & Speech",
    tech: "ASR",
    body: "Shruti transcribes and understands calls in real time across languages and accents, surfacing the moments that matter while the conversation is still live.",
  },
  viveka: {
    name: "ViH Viveka",
    type: "Conversational Intelligence",
    tech: "NLU",
    body: "Viveka listens across every channel and turns raw conversation into structured intent, sentiment, and next-best-action — so your teams always know what the customer actually means.",
  },
  messenger: {
    name: "ViH Messenger",
    type: "Unified Inbox",
    tech: "Messaging",
    body: "Messenger unifies WhatsApp, email, chat, and social into one thread per customer, so every agent picks up exactly where the last conversation left off.",
  },
};

const ECOSYSTEM_ORDER: ProductId[] = ["prana", "shruti", "viveka", "messenger"];

// Same relative dot positions VihPranaSection.tsx uses (converted from its
// desktop pixel coordinates, within its 985x1082 gif box, to percentages),
// so the 4 dots sit in the same spots around the sphere on mobile.
// Figma's mobile frame (node 324:1501, "Frame") is a 350x350 box — these
// are its actual Ellipse left/top values (40/180, 240/60, 150/280),
// converted to percentages of that box, not estimated. Messenger has no
// dot in this specific mobile frame (Figma's own mobile mock only shows 3
// of the 4 products), so its position is a reasonable addition placed in
// the same scattered-across-the-upper-half pattern as the other three.
const SPHERE_BOX = 350;
const ecosystemDots: { id: ProductId; dot: string; label: string; leftPct: number; topPct: number }[] = [
  { id: "prana", dot: ellipse2284, label: "Prana", leftPct: (240 / SPHERE_BOX) * 100, topPct: (60 / SPHERE_BOX) * 100 },
  { id: "shruti", dot: ellipse2283, label: "Shruti", leftPct: (40 / SPHERE_BOX) * 100, topPct: (180 / SPHERE_BOX) * 100 },
  { id: "viveka", dot: ellipse2285, label: "Viveka", leftPct: (150 / SPHERE_BOX) * 100, topPct: (280 / SPHERE_BOX) * 100 },
  { id: "messenger", dot: ellipse2286, label: "Messenger", leftPct: (280 / SPHERE_BOX) * 100, topPct: (150 / SPHERE_BOX) * 100 },
];
// Card starts at 207.49/350 of the box (Figma node 324:1512's own top),
// and its own height (320) plus that offset runs well past the box's
// bottom edge — it's meant to overflow below, not be clipped/contained.
const CARD_TOP_PCT = (207.49 / SPHERE_BOX) * 100;

// Same 7-logo set HomeTrustedBy.tsx uses on desktop (Figma node 317:1207).
const trustedByLogos = [images11, images21, images31, images41, images2, bsnlLogo1, a5e5bd2a];

const productCards = [
  {
    title: "ViH Shruti",
    description:
      "Shruti is the real-time, multilingual speech layer for the modern world, making conversations between people, and conversations with systems, clear, natural, and scalable.",
    gradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(255,103,249) 75.309%, rgb(172,57,248) 130.05%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    route: "/shruti" as string | null,
  },
  {
    title: "ViH Viveka",
    description:
      "ViH Viveka is an AI-powered call center and voice analytics platform developed by ViH Metaverse. It is designed to evaluate and enhance customer service interactions using real-time insights",
    gradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(154,0,255) 82.784%, rgb(255,103,249) 171.2%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    route: null,
  },
  {
    title: "ViH Messenger",
    description:
      "The enterprise communication layer built for scale. Integrate with your mobile application & transform it to a magnetisable powerful communication hub, powered by AI at its core.",
    gradient:
      "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%)",
    // /messenger exists (MessengerPage.tsx, routed in App.tsx) — same fix
    // as ProductOverviewCards.tsx's desktop version.
    route: "/messenger" as string | null,
  },
];

const useCaseCards = [
  {
    title: "Customer Support",
    description: "Resolve once. Auto-close duplicate tickets and keep every channel informed",
    icon: streamlineCustomerSupport,
    orb: demoOrbWebp,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
  {
    title: "Sales Pipeline",
    description: "One thread per prospect. AI drafts the next-best reply in your voice.",
    icon: streamlineDecentWork,
    orb: demoOrbWebp1,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
  {
    title: "Internal Comms",
    description: "One searchable timeline from Slack, email, and calls.",
    icon: famiconsCall,
    orb: null,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
];

// Generic scroll-into-view reveal — replays every time the wrapped element
// re-enters the viewport (toggling on exit too), matching the pattern
// EnterpriseSection/EnterpriseBenefits already use elsewhere in this
// codebase, rather than a one-shot "only plays once ever" animation.
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${active ? "mobile-blur-rise-in" : "opacity-0"} ${className}`}
      style={active ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={scrollToContactForm}
      className={`bg-[#232323] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[8px] w-full cursor-pointer hover:bg-black active:scale-[0.98] transition-all ${className}`}
    >
      <span className="font-medium text-[15px] text-white whitespace-nowrap">Contact sales</span>
      <img alt="" className="h-[14px] w-[14px]" src={weuiArrowOutlined} />
    </button>
  );
}

function MobileHero() {
  return (
    <div className="bg-[#f7f7f8] flex flex-col gap-[24px] px-[16px] py-[16px] pb-[24px]">
      <div className="flex flex-col gap-[12px]">
        <h1 className="font-light leading-[42px] text-[38px] text-[#111] tracking-[-1.5px] m-0">
          Your Left Brain, Reimagined
        </h1>
        <p className="font-normal leading-[18px] text-[#555] text-[14px] m-0">
          Give your enterprise a lasting memory by curing corporate amnesia and ending brain drain.
        </p>
      </div>
      <CtaButton />
    </div>
  );
}

// Figma's mobile "Dark-Vis-Card" mocks up a static "Voice Chat" pill inside
// an empty dark card — this swaps that placeholder for HomeHero's actual
// working demo video (already responsive, no fixed desktop pixels) instead
// of a second non-functional button that duplicates the one right above it.
function MobileDataViz() {
  return (
    <div className="flex flex-col gap-[41px] px-[16px] pb-[40px]">
      <div className="bg-[#171718] border border-[#dfdfdf] h-[280px] rounded-[24px] overflow-hidden">
        <HeroVideo />
      </div>
      <div className="flex flex-col gap-[12px]">
        <p className="font-normal text-[#737373] text-[14px] tracking-[-0.5px] m-0">
          We are trusted by people by multiple domains
        </p>
        {/* Same auto-scrolling marquee HomeTrustedBy.tsx uses on desktop
            (right-to-left, pauses while touched via the `:active` rule in
            index.css) instead of a static row — this used to just sit
            still. */}
        <div className="marquee-mask relative overflow-hidden opacity-[0.85]">
          <div className="marquee-track flex items-center gap-[24px] w-max">
            {[...trustedByLogos, ...trustedByLogos].map((logo, i) => (
              <img key={i} alt="" className="h-[40px] w-auto shrink-0" src={logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  stat,
  label,
  description,
  descWidth,
}: {
  stat: string;
  label: string;
  description: string;
  descWidth: number;
}) {
  return (
    <div className="bg-[rgba(88,88,88,0.7)] backdrop-blur-md border border-white/10 flex items-start justify-between gap-[12px] px-[20px] py-[24px] rounded-[24px] w-full">
      <div className="flex flex-col gap-[2px] shrink-0">
        <p className="font-bold text-[42px] text-white m-0 leading-[1]">{stat}</p>
        <p className="font-normal text-[#b6b6b6] text-[13px] m-0 whitespace-nowrap">{label}</p>
      </div>
      <p className="font-normal text-[#d7d7d7] text-[13px] leading-[19px] m-0" style={{ maxWidth: descWidth }}>
        {description}
      </p>
    </div>
  );
}

function MobileEnterpriseProblems() {
  return (
    <div className="relative bg-[#191a1c] overflow-hidden">
      {/* Top glow */}
      <div className="pointer-events-none absolute -top-[100px] left-1/2 -translate-x-1/2 h-[197px] w-[412px] opacity-70">
        <div className="size-full bg-[radial-gradient(closest-side,rgba(177,91,252,0.5),transparent)]" />
      </div>

      <div className="relative flex flex-col items-center pt-[52px] pb-[16px]">
        <div className="bg-white/10 rounded-[12px] px-[24px] py-[10px]">
          <p className="font-normal text-[#c2bdbd] text-[16px] m-0">Enterprise Problems</p>
        </div>
      </div>

      {/* Figma's own local layout (node 324:1451) has ONE dot-cluster
          graphic sitting behind both cards — the $8M card overlaps its top
          edge, the 42% card overlaps its bottom edge — not the graphic
          sandwiched between two separate, non-overlapping card blocks.
          Both cards keep StatCard's `backdrop-blur-md` so the dots read as
          visible-but-frosted behind them (a glass effect) instead of the
          graphic just disappearing wherever a card happened to sit on it. */}
      <div className="relative px-[20px] pb-[24px]">
        <Reveal>
          <p className="font-normal text-[#b1b1b1] text-[14px] leading-[22px] m-0">
            <span className="font-semibold text-white">Corporate amnesia</span> is the loss of organisational
            knowledge and context, leaving teams with fragmented information and disconnected customer histories.
          </p>
        </Reveal>
      </div>

      <div className="relative px-[20px]">
        <div className="relative h-[280px]">
          <img alt="" className="absolute inset-0 size-full object-contain opacity-70" src={enterpriseDivider} />
        </div>

        <Reveal className="relative -mt-[190px]">
          <StatCard
            stat="$8M"
            label="Annual loss"
            description="Annual loss for a 3,000-employee business from repeating mistakes already made."
            descWidth={161}
          />
        </Reveal>

        {/* A more aggressive pull-up here collided this card's own box with
            the $8M card directly above it (their text visibly overlapped)
            instead of just each independently overlapping the shared image
            — this only needs to clear $8M's real rendered height, not
            match its own pull-up amount. */}
        <Reveal className="relative mt-[16px]" delay={0.15}>
          <StatCard
            stat="42%"
            label="Knowledge Loss"
            description="When people leave, the knowledge they carry leaves with them—creating organizational brain drain."
            descWidth={172}
          />
        </Reveal>
      </div>

      <div className="relative px-[20px] pt-[24px] pb-[40px]">
        <Reveal delay={0.2}>
          <p className="font-normal text-[#b1b1b1] text-[13px] leading-[22px] m-0">
            <span className="font-bold text-white">Brain drain</span> is the loss of critical expertise when
            employees leave, causing knowledge gaps, repeated mistakes, and slower onboarding.
          </p>
        </Reveal>
      </div>

      {/* The ecosystem/sphere panel — same dark-to-blue gradient Figma's
          "component-9-mobile" frame uses. */}
      <div
        className="relative flex flex-col items-center gap-[32px] px-[16px] pt-[30px] pb-[40px]"
        style={{
          backgroundImage:
            "linear-gradient(184deg, rgb(23,23,23) 1.6%, rgb(26,31,37) 45.2%, rgb(3,10,52) 88.7%, rgb(20,52,105) 175.8%)",
        }}
      >
        <p className="font-normal text-[#b1b1b1] text-[13px] text-center leading-[22px] max-w-[312px] m-0">
          A state-of-the-art customer experience ecosystem that connects enterprises with their customers at every
          touchpoint — delivering unparalleled experiences from first contact to lasting loyalty.
        </p>

        <EcosystemSphere />

        <CtaButton />
      </div>
    </div>
  );
}

// Desktop's version (VihPranaSection.tsx) cycles through 4 products —
// Prana (default), Shruti, Viveka, Messenger — via 4 clickable dots plus a
// next-arrow on the info card, using the actual animated sphere GIF
// (outputOnlinegiftools1), not a static screenshot of one frame of it. This
// mirrors that: same 4 products/copy, same relative dot positions (as
// percentages of the sphere box), the same GIF for real motion, and the
// same `key={activeId}` + `vihprana-card-in` crossfade when switching.
function EcosystemSphere() {
  const [activeId, setActiveId] = useState<ProductId>("prana");
  const active = ECOSYSTEM_PRODUCTS[activeId];

  const goToNextProduct = () => {
    setActiveId((current) => {
      const idx = ECOSYSTEM_ORDER.indexOf(current);
      return ECOSYSTEM_ORDER[(idx + 1) % ECOSYSTEM_ORDER.length];
    });
  };

  // Card starts at CARD_TOP_PCT of SPHERE_BOX, so pulling it up by
  // (SPHERE_BOX - that offset) from a preceding SPHERE_BOX-tall sibling
  // lands its top exactly there — its real height then pushes whatever
  // comes after it down correctly on its own, instead of guessing a fixed
  // buffer for content whose height depends on the active product's text.
  const cardPullUp = SPHERE_BOX - (CARD_TOP_PCT / 100) * SPHERE_BOX;

  return (
    <Reveal className="relative w-full">
      {/* Sphere + dots box — fixed at Figma's own 350x350 reference size
          (node 324:1501) so the percentage positions below resolve exactly
          like they do there, instead of drifting on a shorter/taller box.
          `overflow-visible` (default) lets the sphere image's own
          intentional bleed (Figma's Sphere-Graphic sits at left:-105/
          top:-58.51/566x461, well outside this 350 box) show in full. */}
      <div className="relative mx-auto" style={{ width: SPHERE_BOX, height: SPHERE_BOX, maxWidth: "100%" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute max-w-none object-contain"
            style={{ left: "-30%", top: "-16.7%", width: "161.7%", height: "131.7%" }}
            src={outputOnlinegiftools1}
          />
        </div>

        {ecosystemDots.map(({ id, dot, label, leftPct, topPct }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveId(id)}
              aria-label={`Show ${ECOSYSTEM_PRODUCTS[id].name}`}
              className="absolute flex items-center gap-[6px] -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              <img
                alt=""
                className="size-[16px] shrink-0 transition-transform duration-200"
                style={{ transform: isActive ? "scale(1.25)" : "scale(1)" }}
                src={dot}
              />
              <span
                className="rounded-[8px] px-[8px] py-[4px] text-[11px] whitespace-nowrap transition-colors duration-200"
                style={{
                  backgroundColor: isActive ? "#ffffff" : "rgba(133,134,136,0.5)",
                  color: isActive ? "#000000" : "#ffffff",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* The pamphlet/info card — overlaps the sphere's lower portion per
          Figma (node 324:1512 sits at local top:207.49 inside the same
          350px box the sphere/dots occupy, not below it), and the
          `key={activeId}` remount replays the fade-in each time the
          active product changes, giving the arrow/dot switch a smooth
          transition instead of an instant content swap. */}
      <div className="relative" style={{ marginTop: -cardPullUp }}>
        <div
          key={activeId}
          className="vihprana-card-in relative w-full rounded-[24px] bg-[rgba(122,123,127,0.44)] backdrop-blur-md border border-white/10 p-[20px] flex flex-col gap-[16px]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[20px] text-white m-0">{active.name}</p>
            <button
              type="button"
              onClick={goToNextProduct}
              aria-label="Show next product"
              className="bg-black/38 flex items-center justify-center p-[6px] rounded-[26px] cursor-pointer hover:bg-black/60 transition-colors"
            >
              <img alt="" className="size-[16px] rotate-90" src={solarArrowUpOutline} />
            </button>
          </div>
          <div className="h-px bg-white/15" />
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] text-[#c4c4c4] m-0">Type</p>
              <p className="text-[13px] text-white m-0">{active.type}</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] text-[#c4c4c4] m-0">Tech</p>
              <p className="text-[13px] text-white m-0">{active.tech}</p>
            </div>
          </div>
          <div className="h-px bg-white/15" />
          <p className="text-[13px] text-white leading-[18px] m-0">{active.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function MobileOrchestration() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-[#f8f9fb] px-[16px] py-[40px] flex flex-col gap-[44px]">
      <img
        alt=""
        className="pointer-events-none absolute -left-[220px] top-[400px] w-[600px] opacity-70"
        src={polygon33}
      />
      <img
        alt=""
        className="pointer-events-none absolute left-[10px] top-[1100px] w-[350px] opacity-70"
        src={polygon34}
      />

      <div className="relative flex flex-col gap-[14px]">
        <h2 className="font-light leading-[36px] text-[30px] text-[#131313] tracking-[-0.5px] m-0">
          ViH Prana is one Orchestration Layer for every use case
        </h2>
        <p className="font-normal leading-[22px] text-[#737373] text-[15px] m-0">
          Prana brings multiple purpose-built AI tools together into one intelligent layer—each tailored to your
          company, working independently when needed and seamlessly together to create your own unified AI systems
          layer.
        </p>
      </div>

      {/* Same auto-scrolling right-to-left marquee as the trusted-by logos
          strip up top (and desktop's own HomeTrustedBy marquee), instead of
          the cards just sitting stacked and static — pauses on touch via
          the `.marquee-mask:active` rule in index.css. */}
      {/* Each card reveals on its own as it scrolls into view (staggered
          by index) rather than as one continuously-scrolling strip — a
          marquee doesn't give a real "look, read, decide" moment for
          something this text-heavy the way it's fine for a row of partner
          logos. */}
      <div className="relative flex flex-col gap-[16px]">
        {productCards.map((card, i) => {
          const clickable = card.route !== null;
          return (
            <Reveal key={card.title} delay={i * 0.15}>
              <div
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={clickable ? () => navigate(card.route!) : undefined}
                className={`bg-[#fafafa] border border-[#ededed] rounded-[24px] overflow-hidden relative px-[24px] pt-[28px] pb-[20px] flex flex-col gap-[12px] ${
                  clickable ? "cursor-pointer active:scale-[0.99]" : ""
                }`}
              >
                <p className="font-medium leading-[26px] text-[22px] text-[#131313] m-0">{card.title}</p>
                <p className="font-normal leading-[21px] text-[#737373] text-[15px] m-0">{card.description}</p>
                {/* Figma's own orb (node 324:1554) is a 172x138 box at
                    rounded-[263px] — close to a soft circle/blob, not a
                    long flat pill. Using aspect-ratio (rather than a fixed
                    height against a wide percentage width) keeps that same
                    near-circular proportion at any card width instead of
                    stretching it out. */}
                <div
                  className="mx-auto mt-[16px] w-[62%] rounded-[263px] opacity-90"
                  style={{ aspectRatio: "172 / 138", backgroundImage: card.gradient }}
                />
                <div className="bg-white/40 border border-[#f6f6f6] flex gap-[10px] h-[38px] items-center justify-center rounded-[24px] px-[16px]">
                  <span className="flex-1 text-[#131313] text-[15px]">Hands Free Voice Assistance</span>
                  <img alt="" className="h-[16px] w-[8px]" src={weuiArrowOutlined} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="relative flex flex-col gap-[16px]">
        <h3 className="font-light leading-[28px] text-[24px] text-[#131313] tracking-[-0.5px] m-0 max-w-[276px]">
          Built for the teams that actually answer.
        </h3>
        <div className="flex flex-col gap-[12px]">
          {useCaseCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="bg-[#fafafa] border border-[#cfcfcf] rounded-[20px] p-[20px] flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <p className="font-medium leading-[22px] text-[18px] text-[#131313] m-0">{card.title}</p>
                  <div className="relative size-[36px] shrink-0 overflow-hidden rounded-[18px]" style={{ backgroundImage: card.gradient }}>
                    {card.orb && (
                      <img alt="" className="absolute inset-0 size-full object-cover mix-blend-luminosity opacity-40" src={card.orb} />
                    )}
                    <img alt="" className="absolute inset-0 m-auto size-[18px]" src={card.icon} />
                  </div>
                </div>
                <p className="font-normal leading-[19px] text-[#555] text-[13px] m-0">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileHome() {
  return (
    <div className="flex flex-col w-full">
      <MobileHero />
      <MobileDataViz />
      <MobileEnterpriseProblems />
      <MobileOrchestration />
    </div>
  );
}
