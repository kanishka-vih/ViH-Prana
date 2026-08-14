import { useEffect, useRef, useState, type ReactNode } from "react";

const DESIGN_WIDTH = 1440;

export default function ScaledCanvas({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const update = () => {
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
      setScale(window.innerWidth / DESIGN_WIDTH);
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
  }, []);

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
