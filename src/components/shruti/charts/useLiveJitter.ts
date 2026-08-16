import { useEffect, useState } from "react";

/**
 * Periodically nudges chart data by a small random amount so the dashboard
 * keeps looking "live" after its entrance animation finishes, instead of
 * sitting frozen — Recharts animates the transition between the old and
 * new data on its own as long as the data reference changes.
 *
 * `jitter` returns a NEW array/object derived from `base` (never mutate
 * base in place, or React won't see a change to animate from).
 */
export function useLiveJitter<T>(
  base: T,
  jitter: (base: T) => T,
  active: boolean,
  intervalMs = 3500,
  // Pass something like the selected tab here when `base` represents a
  // different dataset per tab — without it, switching tabs wouldn't reset
  // `data` since useState only reads its initializer once.
  resetKey?: unknown,
) {
  const [data, setData] = useState(base);

  useEffect(() => {
    setData(base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setData((prev) => jitter(prev));
    }, intervalMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, intervalMs]);

  return data;
}

export function jitterValue(value: number, amplitude: number, min = 0) {
  const next = value + (Math.random() - 0.5) * 2 * amplitude;
  return Math.max(min, Math.round(next));
}
