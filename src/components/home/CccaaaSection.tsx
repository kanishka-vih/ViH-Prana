import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PANEL_HEIGHT = 684;
// Extra scroll distance the track adds on top of the panel's own height —
// this is how long the panel stays pinned before it releases and normal
// scrolling continues into the next section.
const EXTRA_SCROLL = 1100;
const TRACK_HEIGHT = PANEL_HEIGHT + EXTRA_SCROLL;

// Mobile's panel is a completely different (much taller relative to its
// width) layout than desktop's 1440x684 one. Its real height is measured
// off the actual rendered DOM (see mobilePanelRef below) rather than
// guessed here — a guess that's off even by a little throws off exactly
// when the pin releases, which read as "not working right" even though
// the pin/sweep mechanics themselves were fine. This is just the fallback
// used for one frame before that measurement lands.
const MOBILE_PANEL_HEIGHT_FALLBACK = 460;
const MOBILE_EXTRA_SCROLL = 1400;

const LETTERS = ["C", "C", "C", "A", "A", "A"];
const LETTERS_STRING = LETTERS.join("");
const ACTIVE_COLOR = "rgb(4,4,4)";
const INACTIVE_COLOR = "rgb(194,194,194)";

const STAGES = [
  {
    letters: [0, 1],
    label: "Capture Content : ",
    body: "Collect messages, emails, calls, meetings, documents, and tickets from every communication channel.",
  },
  {
    letters: [2],
    label: "Context : ",
    body: "Connect conversations into a unified timeline, preserving relationships and business context.",
  },
  {
    letters: [3],
    label: "Analyze : ",
    body: "Extract insights, identify intent, detect risks, and surface the next best actions.",
  },
  {
    letters: [4, 5],
    label: "Agentic Action : ",
    body: "AI agents autonomously execute workflows, automate tasks, update systems, and resolve repetitive work with human oversight.",
  },
];

// Same breakpoint ScaledCanvas.tsx uses for the mobile/desktop split.
const MOBILE_BREAKPOINT = 768;

export default function CccaaaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileSweepRef = useRef<HTMLParagraphElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);

  // Real, on-screen (post ScaledCanvas-scale) geometry of the track, used to
  // place the portaled panel below. These only change on resize/layout
  // settle, so they live in React state (a re-render here and then is fine)
  // rather than being written to the DOM every frame.
  const [geo, setGeo] = useState({ docTop: 0, trackHeight: TRACK_HEIGHT, scale: 1 });
  // Lazy-initialized from the real viewport width so there's no flash of
  // the desktop branch before this corrects itself on mount (no SSR here,
  // so window is always available).
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [mobilePanelHeight, setMobilePanelHeight] = useState(MOBILE_PANEL_HEIGHT_FALLBACK);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Measures the mobile panel's real rendered height instead of assuming a
  // fixed number — the panel's content (padding, letter size, caption line
  // count) determines this, and a guess that's off makes the pin
  // release/re-engage at the wrong scroll position.
  useEffect(() => {
    if (!isMobile) return;
    const el = mobilePanelRef.current;
    if (!el) return;
    const measure = () => setMobilePanelHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const settleTimer = window.setTimeout(measure, 500);
    return () => {
      ro.disconnect();
      window.clearTimeout(settleTimer);
    };
  }, [isMobile]);

  // Only one of the mobile/desktop panels is ever mounted at a time (the
  // component returns one branch or the other below), so both branches
  // sharing this same ref set and the same two effects underneath is safe
  // — whichever DOM nodes actually exist are the ones these touch.
  const panelHeight = isMobile ? mobilePanelHeight : PANEL_HEIGHT;
  const trackHeightConst = isMobile ? mobilePanelHeight + MOBILE_EXTRA_SCROLL : TRACK_HEIGHT;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const rect = track.getBoundingClientRect();
      setGeo({
        docTop: rect.top + window.scrollY,
        trackHeight: rect.height,
        scale: isMobile ? 1 : rect.width / 1440,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const settleTimer = window.setTimeout(measure, 500);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.clearTimeout(settleTimer);
    };
    // Re-measure when switching branches, or once the real mobile panel
    // height lands (trackHeightConst depends on it) — otherwise the
    // portal's height/position would stay pinned to the fallback guess.
  }, [isMobile, trackHeightConst]);

  // Stage/color switching + (mobile only) the continuous left-to-right
  // sweep — no position math here at all. The pin itself is native CSS
  // `position: sticky` below, handled entirely by the browser's
  // compositor, so it cannot lag a frame behind the scroll or jitter the
  // way a JS-computed transform can under fast/inertial scrolling (that
  // mismatch was the actual cause of the "vibrating" panel).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let lastStage = -1;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const rect = track.getBoundingClientRect();
      const pinnable = Math.max(1, rect.height - panelHeight * (isMobile ? 1 : rect.width / 1440 || 1));
      const p = Math.max(0, Math.min(1, -rect.top / pinnable));

      // Desktop recolors whole letter-groups at each of the 4 discrete
      // stage boundaries. Mobile instead reveals the active color
      // continuously left-to-right as `p` itself grows (a clip-path wipe
      // over a gray base copy of the same text) — a real sweep tied
      // directly to scroll position, not a snap between 4 fixed states.
      if (isMobile && mobileSweepRef.current) {
        mobileSweepRef.current.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
      }

      const stage = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999));
      if (lastStage !== stage) {
        lastStage = stage;
        if (!isMobile) {
          const active = STAGES[stage].letters;
          letterRefs.current.forEach((el, i) => {
            if (el) el.style.color = active.includes(i) ? ACTIVE_COLOR : INACTIVE_COLOR;
          });
        }
        if (labelRef.current) labelRef.current.textContent = STAGES[stage].label;
        if (bodyRef.current) bodyRef.current.textContent = STAGES[stage].body;
        if (captionRef.current) {
          captionRef.current.style.opacity = "0";
          requestAnimationFrame(() => {
            if (captionRef.current) captionRef.current.style.opacity = "1";
          });
        }
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, panelHeight]);

  const desktopPanel = (
    <div
      className="bg-[#f8f9fb] h-[684px] overflow-hidden relative rounded-[40px] w-[1440px]"
      // `zoom` (not `transform: scale`) — transform doesn't change an
      // element's actual layout box, only how it's painted, so the sticky
      // wrapper around this would still measure it at the unscaled 684px
      // tall and get the release point wrong. zoom really resizes the box.
      style={{ zoom: geo.scale } as React.CSSProperties}
    >
      <button className="absolute flex flex-col gap-[48px] items-center left-[162px] top-[228px] w-[1117px] cursor-pointer bg-transparent border-none">
        <div className="flex flex-col h-[250px] justify-center w-full">
          <p className="font-['Roboto_Condensed'] font-semibold text-[276px] tracking-[28px] m-0 leading-[65px] text-center">
            {LETTERS.map((ch, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                style={{
                  color: i < 2 ? ACTIVE_COLOR : INACTIVE_COLOR,
                  transition: "color 0.4s ease",
                }}
              >
                {ch}
              </span>
            ))}
          </p>
        </div>
        <p
          ref={captionRef}
          className="text-[20px] tracking-[-1px] text-left w-[523px] m-0 leading-[33px]"
          style={{ transition: "opacity 0.3s ease" }}
        >
          <span ref={labelRef} className="text-[#1d1d1d] font-semibold">
            Capture Content :{" "}
          </span>
          <span ref={bodyRef} className="font-normal text-[#5a5a5a]">
            Collect messages, emails, calls, meetings, documents, and tickets from every
            communication channel.
          </span>
        </p>
      </button>
      <div className="absolute bg-white/70 border border-black/10 flex items-center justify-center left-[623px] p-[10px] rounded-[12px] top-[65px]">
        <p className="font-normal text-[18px] text-black text-center tracking-[-1px] w-[174px] m-0 leading-[16px]">
          How we do it
        </p>
      </div>
    </div>
  );

  const letterTextClasses =
    "font-['Roboto_Condensed'] font-semibold tracking-[4px] m-0 leading-none text-center w-full text-[85px]";

  // Mobile version of the same pinned scroll-scrub, sized for a phone
  // instead of scaled down from the 1440px desktop panel. Reuses the exact
  // same refs/stage-tracking effects above — only the JSX/dimensions differ.
  const mobilePanel = (
    <div
      ref={mobilePanelRef}
      className="bg-[#f8f9fb] w-full flex flex-col items-center gap-[32px] px-[24px] pt-[40px] pb-[40px]"
    >
      <div className="bg-[rgba(243,248,255,0.6)] border border-black/10 rounded-[12px] px-[24px] py-[10px]">
        <p className="font-medium text-[#040404] text-[16px] tracking-[-0.5px] m-0">How we do it</p>
      </div>
      {/* Gray base + a black copy clipped to a width driven by scroll
          progress — the black text visibly "fills in" left-to-right as
          you scroll instead of whole letter-groups snapping color at 4
          fixed points. */}
      <div className="relative w-full">
        <p className={`${letterTextClasses} text-[#c2c2c2]`} aria-hidden="true">
          {LETTERS_STRING}
        </p>
        <p
          ref={mobileSweepRef}
          className={`${letterTextClasses} absolute inset-0 text-[#040404]`}
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          {LETTERS_STRING}
        </p>
      </div>
      <p
        ref={captionRef}
        className="font-normal text-[16px] tracking-[-0.5px] text-center m-0 leading-[24px]"
        style={{ transition: "opacity 0.3s ease" }}
      >
        <span ref={labelRef} className="font-semibold text-[#1d1d1d]">
          Capture Content :{" "}
        </span>
        <span ref={bodyRef} className="font-normal text-[#5a5a5a]">
          Collect messages, emails, calls, meetings, documents, and tickets from every communication
          channel.
        </span>
      </p>
    </div>
  );

  const panel = isMobile ? mobilePanel : desktopPanel;
  const trackHeight = isMobile ? trackHeightConst : geo.trackHeight || trackHeightConst;

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: trackHeightConst }}>
      {/*
        The panel is rendered through a portal straight onto <body>, escaping
        ScaledCanvas's `transform: scale()` wrapper entirely — a `transform`
        on an ancestor makes that ancestor sticky's containing block instead
        of the real scrolling viewport, which is why `position: sticky`
        looked broken (just scrolled with the page) when it lived inside
        that transformed tree. Out here, sticky works natively.

        This outer portal wrapper is `position: absolute` at the track's
        real document offset (computed on resize/settle, not per frame), so
        it occupies the exact same document-space slot the track reserves
        inside the scaled page. The inner sticky child then pins within that
        slot exactly like it would if this were a normal (unscaled) page.
        Desktop's 1440px design-px content is scaled back down to match the
        rest of the page via `zoom` on a descendant — that doesn't re-break
        sticky, since transform/zoom on a *descendant* of the sticky element
        doesn't affect its own containing-block/positioning the way it would
        on an *ancestor*. Mobile's panel needs no such scaling — it's
        authored directly in real mobile pixels.
      */}
      {createPortal(
        <div
          style={{
            position: "absolute",
            top: geo.docTop,
            left: 0,
            width: "100%",
            height: trackHeight,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "sticky", top: 0, pointerEvents: "auto" }}>{panel}</div>
        </div>,
        document.body,
      )}
    </div>
  );
}
