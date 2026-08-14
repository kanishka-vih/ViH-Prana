import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCountUp } from "./useCountUp";
import { useLiveJitter, jitterValue } from "./useLiveJitter";

const baseData = [
  { day: "20 Jul", current: 3400, previous: 400 },
  { day: "21", current: 1900, previous: 700 },
  { day: "22", current: 1700, previous: 900 },
  { day: "23", current: 1450, previous: 2600 },
  { day: "24", current: 300, previous: 1400 },
  { day: "25", current: 650, previous: 600 },
  { day: "26", current: 750, previous: 700 },
  { day: "27", current: 5915, previous: 2900 },
  { day: "28", current: 3900, previous: 3000 },
  { day: "29", current: 1150, previous: 1500 },
  { day: "30", current: 3350, previous: 1700 },
  { day: "31", current: 3050, previous: 2200 },
  { day: "1 Aug", current: 3400, previous: 1450 },
];

const TABS = ["Call Minutes", "Successful Calls", "Connected Calls"];

export default function CallMinutesChart({ active }: { active: boolean }) {
  const [tab, setTab] = useState(TABS[0]);
  const total = useCountUp(27178, active);
  // Every few seconds, nudge each point a little so the line visibly
  // redraws — makes the dashboard read as live rather than a one-time
  // animation that then just sits still.
  const data = useLiveJitter(
    baseData,
    (prev) =>
      prev.map((d) => ({
        ...d,
        current: jitterValue(d.current, d.current * 0.08, 50),
        previous: jitterValue(d.previous, d.previous * 0.08, 50),
      })),
    active,
    3500,
  );

  return (
    <div className="h-[441px] w-[657px] rounded-[12px] bg-white p-[24px] flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="m-0 text-[18px] font-bold text-[#0b1a3a]">Call Minutes</p>
          <p className="m-0 text-[12px] text-[#8a8f9c]">Daily call duration across all channels</p>
        </div>
        <div className="flex gap-[6px]">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-[10px] py-[5px] text-[11px] cursor-pointer border transition-colors ${
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

      <div className="mt-[10px] flex items-baseline gap-[6px]">
        <span className="text-[30px] font-bold text-[#0b1a3a] tabular-nums">
          {total.toLocaleString()}
        </span>
        <span className="text-[13px] text-[#8a8f9c]">min</span>
      </div>
      <div className="flex items-center gap-[6px] text-[12px]">
        <span className="text-[#1fa971] font-semibold">↑ 18.6%</span>
        <span className="text-[#8a8f9c]">vs last 30 days</span>
      </div>
      <p className="m-0 mt-[2px] text-[11px] text-[#aab0bb]">Last updated 2 min ago</p>

      <div className="mt-[8px] flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 24, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="callMinutesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b6cf0" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#3b6cf0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eef0f4" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "#9aa0ac" }}
              axisLine={{ stroke: "#eef0f4" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              ticks={[0, 2000, 4000, 6000]}
              domain={[0, 6000]}
              tick={{ fontSize: 10, fill: "#9aa0ac" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} min`,
                name === "current" ? "Current Period" : "Previous Period",
              ]}
              labelFormatter={(l) => l}
              contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e3e5ea" }}
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="#c7cbd4"
              strokeDasharray="4 4"
              fill="none"
              strokeWidth={2}
              isAnimationActive={active}
              animationDuration={1400}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#3b6cf0"
              fill="url(#callMinutesFill)"
              strokeWidth={2.5}
              isAnimationActive={active}
              animationDuration={1400}
              dot={{ r: 3, stroke: "#3b6cf0", strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-[16px] text-[11px] text-[#6a6f7a] pl-[8px]">
        <span className="flex items-center gap-[6px]">
          <span className="inline-block h-[2px] w-[14px] bg-[#3b6cf0]" /> Current Period
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="inline-block h-[2px] w-[14px] border-t-2 border-dashed border-[#c7cbd4]" />{" "}
          Previous Period
        </span>
      </div>

      <div className="mt-[10px] flex items-center gap-[32px] border-t border-[#eef0f4] pt-[10px] text-[12px]">
        <div>
          <p className="m-0 text-[#8a8f9c]">Peak</p>
          <p className="m-0 font-semibold text-[#0b1a3a]">5,915 min</p>
        </div>
        <div>
          <p className="m-0 text-[#8a8f9c]">Average</p>
          <p className="m-0 font-semibold text-[#0b1a3a]">2,091 min</p>
        </div>
        <div>
          <p className="m-0 text-[#8a8f9c]">Minimum</p>
          <p className="m-0 font-semibold text-[#0b1a3a]">304 min</p>
        </div>
      </div>
    </div>
  );
}
