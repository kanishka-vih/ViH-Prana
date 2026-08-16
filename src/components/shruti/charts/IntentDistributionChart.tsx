import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useCountUp } from "./useCountUp";
import { useLiveJitter } from "./useLiveJitter";

const TABS = ["Intent", "Fresh/Retry"] as const;
type Tab = (typeof TABS)[number];

// Both tabs slice the same 157K total interactions, just by a different
// dimension — call outcome intent vs. whether it was a fresh attempt or a
// retry — so the donut's segments (and legend) change but the headline
// total doesn't.
const SEGMENTS_BY_TAB: Record<Tab, { name: string; value: number; color: string }[]> = {
  Intent: [
    { name: "No Contact", value: 42, color: "#3b49df" },
    { name: "Call Back", value: 12, color: "#f5a742" },
    { name: "Call Disconnected", value: 18, color: "#d7d9e8" },
    { name: "Promise to Pay", value: 9, color: "#aec6f2" },
    { name: "Refuse to Pay", value: 11, color: "#c6b6f5" },
    { name: "Already Paid", value: 8, color: "#a6e3c1" },
  ],
  "Fresh/Retry": [
    { name: "Fresh Call", value: 58, color: "#3b49df" },
    { name: "Retry 1", value: 24, color: "#f5a742" },
    { name: "Retry 2", value: 11, color: "#aec6f2" },
    { name: "Retry 3+", value: 7, color: "#c6b6f5" },
  ],
};

export default function IntentDistributionChart({ active }: { active: boolean }) {
  const [tab, setTab] = useState<Tab>(TABS[0]);
  const total = useCountUp(157, active);
  // Nudges each slice's share by a point or two every few seconds so the
  // donut visibly redraws instead of sitting static after it first appears.
  // Resets to the new tab's segments immediately on switch (via the `tab`
  // resetKey) instead of continuing to jitter the previous tab's shares.
  const segments = useLiveJitter(
    SEGMENTS_BY_TAB[tab],
    (prev) =>
      prev.map((s) => ({
        ...s,
        value: Math.max(2, Math.round((s.value + (Math.random() - 0.5) * 4) * 10) / 10),
      })),
    active,
    3800,
    tab,
  );

  return (
    <div className="h-[199px] w-[472px] rounded-[12px] bg-white p-[20px] flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="m-0 text-[16px] font-bold text-[#0b1a3a]">Intent Distribution</p>
          <p className="m-0 text-[11px] text-[#8a8f9c]">By call outcome intent</p>
        </div>
        <div className="flex gap-[6px]">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-[8px] py-[4px] text-[10px] cursor-pointer border transition-colors ${
                tab === t
                  ? "bg-[#0b1a3a] text-white border-[#0b1a3a]"
                  : "bg-white text-[#3a3f4b] border-[#e3e5ea]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center gap-[16px] min-h-0">
        <div className="relative h-[122px] w-[122px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="value"
                nameKey="name"
                innerRadius={38}
                outerRadius={58}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={active}
                animationDuration={1200}
              >
                {segments.map((s) => (
                  <Cell key={s.name} fill={s.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}.0%`, name]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e3e5ea" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-[#0b1a3a] tabular-nums">{total}K</span>
            <span className="text-[9px] text-[#8a8f9c]">Total intents</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px] text-[11px]">
          {segments.map((s) => (
            <div key={s.name} className="flex items-center gap-[16px] whitespace-nowrap">
              <span className="flex items-center gap-[6px] text-[#3a3f4b]">
                <span className="inline-block size-[8px] rounded-[2px]" style={{ backgroundColor: s.color }} />
                {s.name}
              </span>
              <span className="font-semibold text-[#0b1a3a]">{s.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
