import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useLiveJitter, jitterValue } from "./useLiveJitter";

type Period = "Morning" | "Midday" | "Afternoon" | "Evening";

const PERIOD_COLOR: Record<Period, string> = {
  Morning: "#7c93f0",
  Midday: "#8b5cf6",
  Afternoon: "#f0857c",
  Evening: "#5fcf8f",
};

const baseData: { hour: string; volume: number; period: Period }[] = [
  { hour: "06", volume: 1200, period: "Morning" },
  { hour: "08", volume: 15800, period: "Morning" },
  { hour: "10", volume: 32000, period: "Midday" },
  { hour: "12", volume: 3200, period: "Midday" },
  { hour: "14", volume: 2600, period: "Midday" },
  { hour: "16", volume: 2200, period: "Afternoon" },
  { hour: "18", volume: 1800, period: "Afternoon" },
  { hour: "20", volume: 900, period: "Evening" },
  { hour: "22", volume: 600, period: "Evening" },
];

export default function HourlyDistributionChart({ active }: { active: boolean }) {
  // Bars grow/shrink a little every few seconds — keeps the chart feeling
  // like it's watching live traffic instead of a frozen snapshot.
  const data = useLiveJitter(
    baseData,
    (prev) => prev.map((d) => ({ ...d, volume: jitterValue(d.volume, d.volume * 0.15, 200) })),
    active,
    3200,
  );

  return (
    <div className="h-[309px] w-[472px] rounded-[12px] bg-white p-[20px] flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="m-0 text-[16px] font-bold text-[#0b1a3a]">Hourly Distribution</p>
          <p className="m-0 text-[11px] text-[#8a8f9c]">Volume by hour · color by time of day</p>
        </div>
        <span className="flex items-center gap-[4px] rounded-full bg-[#e8f8ef] px-[10px] py-[4px] text-[11px] font-semibold text-[#1fa971]">
          ↗ Peak 10:00
        </span>
      </div>

      <div className="mt-[8px] flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#eef0f4" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#9aa0ac" }} axisLine={{ stroke: "#eef0f4" }} tickLine={false} />
            <YAxis
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              ticks={[0, 8000, 16000, 32000]}
              domain={[0, 32000]}
              tick={{ fontSize: 10, fill: "#9aa0ac" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${Number(value).toLocaleString()} calls`, "Volume"]}
              contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #e3e5ea" }}
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]} isAnimationActive={active} animationDuration={1000}>
              {data.map((d) => (
                <Cell key={d.hour} fill={PERIOD_COLOR[d.period]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-[16px] text-[11px] text-[#6a6f7a] pl-[8px]">
        {(Object.keys(PERIOD_COLOR) as Period[]).map((p) => (
          <span key={p} className="flex items-center gap-[6px]">
            <span className="inline-block size-[8px] rounded-[2px]" style={{ backgroundColor: PERIOD_COLOR[p] }} />
            {p}{" "}
            {p === "Morning" ? "06-09" : p === "Midday" ? "10-14" : p === "Afternoon" ? "15-18" : "19-22"}
          </span>
        ))}
      </div>
    </div>
  );
}
