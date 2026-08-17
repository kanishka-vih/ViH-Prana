import { useEffect, useRef, useState, type ReactNode } from "react";

const DESIGN_WIDTH = 1440;
// Below this, pages stop being a shrunk-down copy of the 1440px desktop
// canvas and switch to real mobile markup (each page's own `md:hidden` /
// `hidden md:flex` split) rendered at 1:1 scale. Uniformly scaling the
// desktop layout down to a ~390px phone width made every section's text
// roughly a quarter size — technically "fit" the screen, but illegible —
// instead of the deliberately different, larger-text mobile layouts the
// Figma mobile frames actually specify.
const MOBILE_BREAKPOINT = 768;

export default function ScaledCanvas({
  children,
  mobileReady = false,
}: {
  children: ReactNode;
  // Only pages that actually have their own real mobile markup (their own
  // `md:hidden` / `hidden md:flex` split) should opt into skipping the
  // scale-down below MOBILE_BREAKPOINT — for every other page, bypassing it
  // would render their still-desktop-only markup raw and unshrunk on a
  // phone, which is worse than the shrunk-but-at-least-intact fallback.
  mobileReady?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const update = () => {
      const mobile = mobileReady && window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      // Always fills the viewport width edge-to-edge — every section's
      // background (dark panels, nav, footer) is authored assuming the
      // page fills exactly this canvas, so capping the scale below the
      // viewport width leaves the outer app background (plain white)
      // showing as bars down both sides once the browser is wider than
      // 1440px, which reads as a broken/torn layout rather than a
      // deliberate "container" — that's a different, real fix (decoupling
      // full-bleed section backgrounds from the fixed-width canvas so they
      // can stretch independently), not something a single global scale
      // factor can do. Filling edge-to-edge is the correct behavior until
      // that restructuring happens.
      setScale(mobile ? 1 : window.innerWidth / DESIGN_WIDTH);
      setNaturalHeight(content.scrollHeight);
    };

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(content);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
    // `mobileReady` can change on navigation (App.tsx passes a per-route
    // value) without this component remounting, since it wraps <Routes>
    // rather than living inside it — without it in the deps, the closure
    // above would keep using whatever value was true at first mount.
  }, [mobileReady]);

  if (isMobile) {
    // No fixed width/height/transform here — content flows at its own
    // natural width (the viewport's), so ordinary responsive Tailwind
    // classes in each page's mobile markup behave normally instead of
    // being physically laid out inside a 1440px box first.
    return <div ref={contentRef}>{children}</div>;
  }

  return (
    <div style={{ height: naturalHeight * scale, overflow: "hidden" }}>
      <div
        ref={contentRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
