import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import PromoBanner from "./PromoBanner";

const DESIGN_WIDTH = 1440;

// Pins the NAV row (logo + ViH Shruti/Viveka/Messenger + Contact sales) to
// the real viewport top across the whole site — the promo banner above it
// stays a normal, non-fixed part of the page and scrolls away like any
// other content, exactly like a sub-header that "sticks" once the banner
// above it has scrolled out of view.
//
// This can't just use CSS `position: sticky` on the nav: ScaledCanvas wraps
// every page in a `transform: scale(...)` box inside an `overflow: hidden`
// wrapper, and that wrapper never actually scrolls internally (the real
// document/window scrolls, moving the whole thing) — sticky positioning
// resolves against the nearest scrolling ancestor's own scroll offset, and
// since that ancestor's scroll offset never changes, a nested sticky element
// would just never engage. (Same reason `position: fixed` doesn't work
// there either — see VoiceChatWidget's comment in App.tsx.) So this renders
// entirely outside ScaledCanvas, with its own viewport-width scaling, and
// fakes the "sticky below the banner" effect with a scroll-driven transform:
// the banner+nav block rides up 1:1 with real scroll until the banner has
// fully scrolled past, then clamps in place — at which point the nav sits
// exactly flush with the real viewport top and stays there.
// Same mobile breakpoint ScaledCanvas.tsx uses.
const MOBILE_BREAKPOINT = 768;

export default function FixedHeader() {
  const navRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [navHeight, setNavHeight] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const banner = bannerRef.current;
    if (!nav || !banner) return;
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setScale(mobile ? 1 : window.innerWidth / DESIGN_WIDTH);
      setNavHeight(nav.scrollHeight);
      setBannerHeight(banner.scrollHeight);
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(nav);
    ro.observe(banner);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Real (already-scaled) pixels the banner has scrolled up by, clamped to
  // its own height — beyond that point the nav is fully flush and further
  // scrolling shouldn't move it any further.
  const bannerHeightScaled = bannerHeight * scale;
  const risen = isMobile ? 0 : Math.min(scrollY, bannerHeightScaled);
  const scrolled = isMobile ? scrollY > 10 : risen > 0;

  if (isMobile) {
    // On mobile the banner scrolls away normally (not risen/clamped like
    // desktop). The nav can't just use CSS `position: sticky` here: sticky
    // only stays pinned within the height of its own direct parent, and
    // that parent here is just this small banner+nav wrapper (~100px) —
    // once scrolled past that, the "stuck" element scrolls away with it
    // exactly like a non-sticky one would, which is why it disappeared
    // after ~100px of scroll instead of staying pinned for the whole page.
    // Toggling `fixed` via JS once scrolled — with a spacer standing in for
    // the nav's own height so removing it from flow doesn't jump the page
    // content up — works regardless of the parent's height.
    return (
      <div className="relative z-[60] w-full">
        <div ref={bannerRef}>
          <PromoBanner />
        </div>
        {scrolled && <div style={{ height: navHeight }} />}
        <div ref={navRef} className={`w-full z-[60] ${scrolled ? "fixed top-0 left-0" : ""}`}>
          <Header floating={scrolled} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 w-full z-[60] overflow-hidden"
      style={{ height: (bannerHeight + navHeight) * scale - risen }}
    >
      <div
        style={{
          width: DESIGN_WIDTH,
          // `translateY` here is listed before `scale`, so per CSS transform
          // composition order it applies AFTER the scale — meaning `risen`
          // (already a real/post-scale pixel amount) shifts the content by
          // exactly that many real pixels, not a further-scaled amount.
          transform: `translateY(${-risen}px) scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={bannerRef}>
          <PromoBanner />
        </div>
        <div ref={navRef}>
          <Header floating={scrolled} />
        </div>
      </div>
    </div>
  );
}
