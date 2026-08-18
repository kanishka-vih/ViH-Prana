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
import { polygon34, enterpriseDivider, sectionChordTop, sectionChordBottom } from "../../assets/mobile";
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
// Exported for reuse by other mobile pages (e.g. MobileShruti.tsx) that
// want the same scroll-into-view blur-rise reveal.
export function Reveal({
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

// Exported for reuse by other mobile pages.
export function CtaButton({ className = "" }: { className?: string }) {
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

// Exported — the shell/CTA here is genuinely shared, but the copy is
// parameterized rather than hardcoded. Figma's own mobile frame for Shruti
// (node 333:1981/333:1983) shows this exact same "Your Left Brain,
// Reimagined" text, but that's a copy-paste mistake in the design itself
// — Shruti's real desktop hero (ShrutiHero.tsx) uses "If it's Speech, it's
// Shruti" / its own subcopy, and the mobile frame should match that, not
// Home's. MobileShruti.tsx passes its own heading/subcopy accordingly.
export function MobileHero({
  heading = "Your Left Brain, Reimagined",
  subcopy = "Give your enterprise a lasting memory by curing corporate amnesia and ending brain drain.",
  // Home no longer repeats a "Contact sales" CTA on the hero itself —
  // matching the ElevenLabs mobile pattern of keeping that single call to
  // action in the nav bar only, instead of duplicating it on every section.
  // Defaults to shown so Shruti's hero (which wasn't asked to change) keeps
  // its existing CTA.
  showCta = true,
}: {
  heading?: string;
  subcopy?: string;
  showCta?: boolean;
}) {
  return (
    <div className="bg-[#f7f7f8] flex flex-col gap-[24px] px-[16px] py-[16px] pb-[24px]">
      <div className="flex flex-col gap-[12px]">
        <h1 className="font-light leading-[42px] text-[38px] text-[#111] tracking-[-1.5px] m-0">{heading}</h1>
        <p className="font-normal leading-[18px] text-[#555] text-[14px] m-0">{subcopy}</p>
      </div>
      {showCta && <CtaButton />}
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

// The dark panel's own top/bottom caps (Figma nodes 324:1539/324:1540) — a
// shared dome path (the same curve, just two different fills) that bridges
// this section into whatever's above/below it with a smooth hill silhouette
// instead of a hard rectangular edge. Rendered OUTSIDE the panel's own
// `overflow-hidden` (as a sibling, with a negative margin pulling the panel
// underneath it) since a child positioned above y:0 would otherwise just get
// clipped away by that overflow instead of poking into the section before it.
//
// The bottom cap is the SAME dome asset rotated 180° — Figma's own node
// (324:1540) is the identical curve as the top one, just recolored; the
// only way it reads as a matching cap for the panel's EXIT (bulging down
// into the section below) instead of a second entry hill (bulging up) is
// flipped, flat-edge-up/round-edge-down instead of flat-edge-down/
// round-edge-up. Rendering it unflipped (what shipped before) was the
// "chord is placed opposite" bug.
export function SectionChord({ src, flip = false, children }: { src: string; flip?: boolean; children?: ReactNode }) {
  // The downloaded asset is already cropped to just the visible top-half
  // dome (viewBox 412x98.5 — Figma only shows the top half of a full
  // ellipse), so this just renders it directly at its own intrinsic ratio
  // stretched to the page width, no further clipping/positioning needed.
  // `children` overlay it (percentage-positioned against this same box) —
  // used for the "Enterprise Problems" label, which Figma nests INSIDE the
  // top chord's curve (local y:34 of its 98.5-tall visible dome), not
  // below it.
  return (
    <div className={`relative w-full pointer-events-none ${flip ? "rotate-180" : ""}`}>
      <img alt="" className="block w-full" src={src} />
      {children}
    </div>
  );
}

function MobileEnterpriseProblems() {
  return (
    <>
      {/* Figma positions "Enterprise Problems" (node 333:2329) at local
          x:81/y:1072 against the chord's own box at x:-15/y:1038 — i.e.
          horizontally centered (81+229/2 ≈ the 390-wide frame's own
          center) and 34px down from the chord's top, comfortably inside
          its 98.5px-tall visible curve rather than in the panel below it. */}
      <SectionChord src={sectionChordTop}>
        <div
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 rounded-[12px] bg-white/10 px-[24px] py-[10px]"
          style={{ top: "34.5%" }}
        >
          <p className="font-normal text-[#c2bdbd] text-[16px] whitespace-nowrap m-0">Enterprise Problems</p>
        </div>
      </SectionChord>
      {/* The same tiny-dot texture the top chord's own fill uses (Figma's
          `pattern0_0_4`: a repeating 16px grid of ~0.4px dots) — but there
          it's baked into that one SVG asset's own fill, whereas here it's
          Figma's actual PAGE BACKGROUND for the whole "Corporate amnesia →
          Brain drain" block (node 324:1451), not just a small patch behind
          the two stat cards. It was scoped to just a 280px band around the
          cards before, so the rest of the section — the paragraph text top
          and bottom, and the gaps between cards — showed flat `#191a1c`
          instead of this texture. A CSS radial-gradient tile reproduces the
          same look without shipping another raster asset, and naturally
          disappears wherever the ecosystem/globe panel below (which has its
          own opaque gradient fill) sits on top of it — matching the user's
          confirmation that section correctly has no dots. */}
      <div
        className="relative overflow-hidden -mt-[6px]"
        style={{
          backgroundColor: "#191a1c",
          backgroundImage: "radial-gradient(circle, #8b8b8b 0.8px, transparent 0.8px)",
          backgroundSize: "16px 16px",
        }}
      >
      {/* Figma's own local layout (node 324:1451) has ONE dot-cluster
          graphic sitting behind both cards — the $8M card overlaps its top
          edge, the 42% card overlaps its bottom edge — not the graphic
          sandwiched between two separate, non-overlapping card blocks.
          Both cards keep StatCard's `backdrop-blur-md` so the dots read as
          visible-but-frosted behind them (a glass effect) instead of the
          graphic just disappearing wherever a card happened to sit on it. */}
      {/* Figma's own gap between this paragraph and the $8M card (node
          324:1490, a flex-col with gap-[32px]) is 32px, not 24. */}
      <div className="relative px-[20px] pb-[32px]">
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

      {/* The ecosystem/sphere panel — Figma's "component-9-mobile" frame
          (node 324:1497) stacks TWO gradients here, not one: a diagonal
          184deg dark-navy-to-blue wash underneath, plus a second, subtler
          180deg vertical one on top (dark charcoal fading to a pale gray by
          its final stop) that softens the sphere-visualization area lower
          in the panel. Only the first was here before, which read flatter/
          bluer than Figma's actual blended tone. */}
      <div
        className="relative flex flex-col items-center gap-[32px] px-[16px] pt-[30px] pb-[40px]"
        style={{
          backgroundImage:
            "linear-gradient(184deg, rgb(23,23,23) 1.6%, rgb(26,31,37) 45.2%, rgb(3,10,52) 88.7%, rgb(20,52,105) 175.8%), linear-gradient(180deg, rgb(23,23,23) 0%, rgb(26,31,37) 43.25%, rgb(31,35,41) 86.5%, rgba(125,125,125,0.8) 125.75%)",
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
      {/* Bottom cap — same dome, solid navy (sampled from deep in the panel's
          own gradient) instead of the top's dotted charcoal, ROTATED 180°
          so its flat edge meets the panel's bottom edge flush and its
          round edge bulges down into the section below — a mirror of the
          top cap, not a second copy of the same upward-bulging hill. */}
      <SectionChord src={sectionChordBottom} flip />
    </>
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

  // SPHERE_BOX (350) is Figma's own reference box (node 324:1501, "Frame")
  // — rendered here at that exact literal size instead of enlarged, per
  // explicit feedback that the earlier "make it bigger/more stretched"
  // version had gone too far and was now covering almost the full screen
  // width. The sphere image's own bleed (below) is what makes it read as
  // big/immersive — the box itself doesn't need to be inflated on top of
  // that.
  const SPHERE_RENDER_HEIGHT = SPHERE_BOX;

  // Card starts at CARD_TOP_PCT of the sphere's rendered height, so
  // pulling it up by (renderHeight - that offset) from a preceding
  // renderHeight-tall sibling lands its top exactly there — its real
  // height then pushes whatever comes after it down correctly on its
  // own, instead of guessing a fixed buffer for content whose height
  // depends on the active product's text.
  const cardPullUp = SPHERE_RENDER_HEIGHT - (CARD_TOP_PCT / 100) * SPHERE_RENDER_HEIGHT;

  return (
    <Reveal className="relative w-full">
      {/* Sphere + dots box, at Figma's own literal 350x350 reference size
          (node 324:1501) — centered within the panel's normal padding, NOT
          bled past it; only the sphere IMAGE inside bleeds past this box's
          own edges (see below), matching Figma's actual two-level
          structure instead of stretching the whole box itself. */}
      <div className="relative mx-auto mt-[30px]" style={{ width: SPHERE_RENDER_HEIGHT, height: SPHERE_RENDER_HEIGHT }}>
        {/* Figma's own nested bleed, reproduced literally: the graphic's
            own box (324:1502) sits at left:-105/top:-58.51/566x461 relative
            to the 350x350 frame, and the actual <img> inside THAT box is
            further offset by left:-33.33%/top:-22.78%/166.67%x122.78% —
            two separate levels of bleed, not one flattened percentage
            against the 350 box directly (that earlier flattening is what
            had made the sphere balloon out to nearly the full screen
            width). */}
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{ left: -105, top: -58.51, width: 566, height: 461 }}
        >
          <img
            alt=""
            className="absolute max-w-none"
            style={{ left: "-33.33%", top: "-22.78%", width: "166.67%", height: "122.78%" }}
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
      {/* Figma's card (node 324:1512) is a FIXED 320px-tall box with
          `overflow-clip` — not a flex column that grows with whichever
          product's body text is longest. `line-clamp-4` caps the body at
          the same ~4 lines (72px at this leading) Figma's own text box
          allotted it, so the card ends up the same fixed height for every
          product instead of visibly taller/"stretched" for the longer
          ones. */}
      <div className="relative" style={{ marginTop: -cardPullUp }}>
        <div
          key={activeId}
          className="vihprana-card-in relative w-full h-[320px] overflow-hidden rounded-[24px] bg-[rgba(122,123,127,0.44)] backdrop-blur-md border border-white/10 p-[20px] flex flex-col gap-[16px]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[22px] leading-[24px] text-white m-0">{active.name}</p>
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
              <p className="text-[12px] leading-[18px] text-[#c4c4c4] m-0">Type</p>
              <p className="text-[14px] leading-[20px] text-white m-0">{active.type}</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[12px] leading-[18px] text-[#c4c4c4] m-0">Tech</p>
              <p className="text-[14px] leading-[20px] text-white m-0">{active.tech}</p>
            </div>
          </div>
          <div className="h-px bg-white/15" />
          <p className="line-clamp-4 text-[14px] text-white leading-[18px] m-0">{active.body}</p>
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
              {/* Figma's card (node 324:1550/1560/1570) is a FIXED 379px-tall
                  box with the title/description, the orb, and the pill each
                  absolutely positioned at their own exact offsets — not a
                  flex column where the orb/pill shift down whenever a
                  longer description wraps to an extra line. That's what
                  made these read as "not fixed like Figma": Shruti's
                  2-line description sat with its orb higher up than
                  Viveka's/Messenger's 3-line ones, when all three should
                  line up identically. */}
              <div
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={clickable ? () => navigate(card.route!) : undefined}
                className={`relative h-[379px] overflow-hidden rounded-[24px] border border-[#ededed] bg-[#fafafa] ${
                  clickable ? "cursor-pointer active:scale-[0.99]" : ""
                }`}
              >
                <div className="absolute inset-[-1px] flex flex-col items-start gap-[12px] px-[24px] pt-[28px] pb-[20px]">
                  <p className="w-full m-0 font-medium leading-[26px] text-[22px] text-[#131313]">{card.title}</p>
                  <p className="w-full m-0 font-normal leading-[21px] text-[#737373] text-[15px]">
                    {card.description}
                  </p>
                </div>
                <div
                  className="absolute left-[109px] right-[109px] top-[209px] h-[138px] rounded-[263px]"
                  style={{ backgroundImage: card.gradient }}
                />
                <div className="absolute left-[19px] right-[19px] top-[321px] h-[38px] flex items-center justify-center gap-[10px] rounded-[24px] border border-[#f6f6f6] bg-[rgba(255,255,255,0.36)] px-[20px]">
                  <span className="flex-1 text-[#131313] text-[16px] leading-[26px]">
                    Hands Free Voice Assistance
                  </span>
                  <img alt="" className="h-[16px] w-[8px] shrink-0" src={weuiArrowOutlined} />
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
      <MobileHero showCta={false} />
      <MobileDataViz />
      <MobileEnterpriseProblems />
      <MobileOrchestration />
    </div>
  );
}
