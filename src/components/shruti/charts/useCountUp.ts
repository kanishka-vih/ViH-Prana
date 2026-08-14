import { useEffect, useState } from "react";

/**
 * Animates a number from 0 up to `end` over `durationMs`, but only once
 * `start` flips true — driven by the parent's scroll-into-view observer so
 * the count-up plays the moment the dashboard actually becomes visible,
 * like a live demo rendering in front of the viewer, not a static screenshot.
 */
export function useCountUp(end: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // ease-out cubic — fast start, gentle settle, reads as "counting up"
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, durationMs]);

  return value;
}
