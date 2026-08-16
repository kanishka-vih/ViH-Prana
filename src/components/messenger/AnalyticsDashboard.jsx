import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Messages Sent', value: '307', delta: '12.4%', up: true, icon: 'send', tint: '#EAF1FE', fg: '#3B82F6' },
  { label: 'Delivered', value: '175', delta: '8.7%', up: true, icon: 'check', tint: '#E7F8EE', fg: '#22B573' },
  { label: 'Failed', value: '32', delta: '3.1%', up: false, icon: 'x', tint: '#FDEAEA', fg: '#EF4444' },
  { label: 'Seen', value: '144', delta: '15.6%', up: true, icon: 'eye', tint: '#EAF1FE', fg: '#3B82F6' },
  { label: 'Seen Ratio', value: '82.9%', delta: '6.3%', up: true, icon: 'pie', tint: '#F3EBFE', fg: '#8B5CF6' },
]

const DATES = ['12 Jul', '15 Jul', '17 Jul', '20 Jul', '22 Jul', '24 Jul', '27 Jul', '29 Jul', '31 Jul', '3 Aug', '5 Aug', '7 Aug']

const SERIES = [
  { key: 'sent', label: 'Sent', color: '#4C8DF6', values: [2, 3, 2, 14, 3, 2, 2, 15, 3, 2, 13, 2] },
  { key: 'delivered', label: 'Delivered', color: '#22B573', values: [1, 2, 1, 10, 2, 1, 1, 10, 2, 1, 9, 1] },
  { key: 'failed', label: 'Failed', color: '#F0555F', values: [0.5, 1, 0.5, 3, 1, 0.5, 0.5, 3, 1, 0.5, 3, 0.5] },
  { key: 'seen', label: 'Seen', color: '#8B5CF6', values: [1.5, 2.5, 1.5, 13, 2.5, 1.5, 1.5, 14, 2.5, 1.5, 12, 1.5] },
]

const CHANNELS = [
  { name: 'ViH Messenger', delivered: 117, seenRatio: '83.2%', tint: '#F3EBFE', fg: '#8B5CF6', icon: 'send' },
  { name: 'Messaging', delivered: 48, seenRatio: '79.1%', tint: '#FDEAEA', fg: '#F0555F', icon: 'message' },
  { name: 'Emails', delivered: 6, seenRatio: '66.7%', tint: '#EAF1FE', fg: '#3B82F6', icon: 'mail' },
  { name: 'Voice', delivered: 4, seenRatio: '75.0%', tint: '#E7F8EE', fg: '#22B573', icon: 'phone' },
]

const DESIGN_WIDTH = 753
const DESIGN_HEIGHT = 517

function Icon({ name, className }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'send':
      return (
        <svg {...common}>
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22 11 13 2 9z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'pie':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="9" opacity="0.25" />
          <path d="M12 3a9 9 0 0 1 9 9h-9z" />
        </svg>
      )
    case 'message':
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    default:
      return null
  }
}

function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      setValue(target * progress)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

function DonutChart({ percent, active }) {
  const r = 60
  const c = 2 * Math.PI * r
  const offset = active ? c * (1 - percent / 100) : c
  return (
    <svg viewBox="0 0 160 160" className="-rotate-90 size-full">
      <circle cx="80" cy="80" r={r} fill="none" stroke="#EDE7FB" strokeWidth="13" />
      <circle
        cx="80"
        cy="80"
        r={r}
        fill="none"
        stroke="#7C5CFC"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25,0.1,0.25,1)' }}
      />
    </svg>
  )
}

// Catmull-Rom -> cubic-Bezier smoothing so the curve flows through every
// point instead of the jagged straight-segment zigzag a plain polyline gives.
function smoothLine(points) {
  if (points.length < 3) return `M${points.map((p) => `${p[0]},${p[1]}`).join(' L')}`
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`
  }
  return d
}

function LineChart({ active }) {
  const width = 620
  const height = 220
  const padTop = 14
  const padBottom = 26
  const padX = 4
  const maxY = 15
  const gridValues = [0, 3, 6, 9, 12, 15]
  const [hover, setHover] = useState(null)

  const xFor = (i) => padX + (i / (DATES.length - 1)) * (width - padX * 2)
  const yFor = (v) => padTop + (1 - v / maxY) * (height - padTop - padBottom)
  const baseline = height - padBottom

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {gridValues.map((v) => (
          <line key={v} x1={padX} x2={width - padX} y1={yFor(v)} y2={yFor(v)} stroke="#F0F0F0" strokeWidth="1" />
        ))}

        <defs>
          {SERIES.map((s) => (
            <linearGradient key={s.key} id={`area-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {SERIES.map((s) => {
          const points = s.values.map((v, i) => [xFor(i), yFor(v)])
          const lineD = smoothLine(points)
          const areaD = `${lineD} L${xFor(s.values.length - 1)},${baseline} L${xFor(0)},${baseline} Z`
          return (
            <path
              key={`area-${s.key}`}
              d={areaD}
              fill={`url(#area-${s.key})`}
              style={{ opacity: active ? 1 : 0, transition: 'opacity 1.4s ease' }}
            />
          )
        })}

        {SERIES.map((s) => {
          const points = s.values.map((v, i) => [xFor(i), yFor(v)])
          const d = smoothLine(points)
          return (
            <path
              key={s.key}
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              style={{
                strokeDashoffset: active ? 0 : 1,
                transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25,0.1,0.25,1)',
              }}
            />
          )
        })}

        {SERIES.map((s) =>
          s.values.map((v, i) => (
            <circle
              key={`${s.key}-${i}`}
              cx={xFor(i)}
              cy={yFor(v)}
              r="8"
              fill="transparent"
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onMouseEnter={() => setHover({ seriesKey: s.key, index: i, x: xFor(i), y: yFor(v) })}
              onMouseLeave={() => setHover((h) => (h && h.seriesKey === s.key && h.index === i ? null : h))}
            />
          ))
        )}

        {hover &&
          (() => {
            const s = SERIES.find((s) => s.key === hover.seriesKey)
            return <circle cx={hover.x} cy={hover.y} r="4" fill={s.color} stroke="#fff" strokeWidth="2" />
          })()}
      </svg>

      {hover &&
        (() => {
          const s = SERIES.find((s) => s.key === hover.seriesKey)
          const leftPct = (hover.x / width) * 100
          const topPct = (hover.y / height) * 100
          return (
            <div
              className="absolute z-10 pointer-events-none rounded-lg bg-[#161616] px-2.5 py-1.5 text-[11px] whitespace-nowrap text-white shadow-lg"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: 'translate(-50%, -130%)' }}
            >
              <span className="font-semibold" style={{ color: s.color }}>
                {s.label}
              </span>
              <span className="text-white/60"> · {DATES[hover.index]}</span>
              <div>{s.values[hover.index]}k messages</div>
            </div>
          )
        })()}
    </div>
  )
}

export default function AnalyticsDashboard() {
  const containerRef = useRef(null)
  // Scaled by the more limiting dimension — the slot this card sits in
  // doesn't always share the 753:517 design ratio (its own padding eats
  // into the available box unevenly), so a width-only scale can leave the
  // canvas taller than the slot and get clipped by overflow-hidden.
  const [layout, setLayout] = useState({ scale: 1, left: 0, top: 0 })
  const [active, setActive] = useState(false)
  const seenRatio = useCountUp(82.9, active)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const scale = Math.min(el.offsetWidth / DESIGN_WIDTH, el.offsetHeight / DESIGN_HEIGHT)
      const left = (el.offsetWidth - DESIGN_WIDTH * scale) / 2
      const top = (el.offsetHeight - DESIGN_HEIGHT * scale) / 2
      setLayout({ scale, left, top })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative size-full overflow-hidden rounded-xl bg-white">
      <div
        className="absolute flex flex-col gap-2.5 px-6 py-4"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          left: layout.left,
          top: layout.top,
          transform: `scale(${layout.scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-[22px] font-semibold leading-none text-[#0b0b0f]">Dashboard</p>
            <p className="mt-1 text-[13px] text-[#8a8a92]">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-[#e4e4ea] px-3 py-1.5 text-[12px] text-[#3b3b45]">Asia/Kolkata</div>
            <div className="rounded-full border border-[#f3c9c9] bg-[#fdeaea] px-3 py-1.5 text-[12px] text-[#e14848]">-296</div>
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#111] text-[11px] font-semibold text-white">
                ViH
              </div>
              <div className="text-[12px] leading-tight">
                <p className="font-medium text-[#0b0b0f]">Admin</p>
                <p className="text-[#8a8a92]">Owner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-5 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#eee] px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full" style={{ background: s.tint, color: s.fg }}>
                  <Icon name={s.icon} className="size-3.5" />
                </div>
                <span className="truncate text-[11px] text-[#8a8a92]">{s.label}</span>
              </div>
              <p className="mt-1 text-[17px] font-semibold text-[#0b0b0f]">{s.value}</p>
              <p className="mt-0.5 text-[10px]" style={{ color: s.up ? '#22B573' : '#EF4444' }}>
                {s.up ? '↑' : '↓'} {s.delta} vs last 30 days
              </p>
            </div>
          ))}
        </div>

        <div className="flex h-49 shrink-0 gap-4">
          <div className="flex w-64 shrink-0 flex-col rounded-xl border border-[#eee] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#0b0b0f]">ViH Campaign Overview</p>
              <span className="text-[#c4c4cc]">⋯</span>
            </div>
            <div className="mt-1 flex flex-1 items-center gap-3">
              <div className="relative size-28 shrink-0">
                <DonutChart percent={82.9} active={active} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-[#8a8a92]">Seen Ratio</span>
                  <span className="text-[17px] font-semibold text-[#0b0b0f]">{seenRatio.toFixed(1)}%</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="whitespace-nowrap text-[10px] font-normal text-[#8a8a92]">ViH Messages Delivered</p>
                <p className="mt-0.5 text-[16px] font-semibold text-[#0b0b0f]">175</p>
                <p className="text-[10px] font-normal text-[#8a8a92]">Out of 307</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#EDEDED]">
                    <div
                      className="h-full rounded-full bg-[#4C8DF6]"
                      style={{ width: active ? '57%' : '0%', transition: 'width 1.2s cubic-bezier(0.25,0.1,0.25,1)' }}
                    />
                  </div>
                  <span className="shrink-0 text-[9px] text-[#8a8a92]">57%</span>
                </div>
              </div>
            </div>
            <a className="mt-0.5 text-[10px] font-medium text-[#4C8DF6]">View full report →</a>
          </div>

          <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-[#eee] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-[#0b0b0f]">Campaign Performance</p>
              <a className="text-[10px] font-medium text-[#4C8DF6]">View more</a>
            </div>
            <div className="mt-0.5 flex items-center gap-3">
              {SERIES.map((s) => (
                <div key={s.key} className="flex items-center gap-1 text-[10px] text-[#8a8a92]">
                  <span className="size-1.5 rounded-full" style={{ background: s.color }} /> {s.label}
                </div>
              ))}
            </div>
            <div className="mt-1 min-h-0 flex-1">
              <LineChart active={active} />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          <p className="shrink-0 text-[12px] font-medium text-[#0b0b0f]">Channels</p>
          <div className="grid flex-1 grid-cols-4 gap-3">
            {CHANNELS.map((c) => (
              <div key={c.name} className="flex flex-col justify-between rounded-xl border border-[#eee] p-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full" style={{ background: c.tint, color: c.fg }}>
                      <Icon name={c.icon} className="size-2.5" />
                    </div>
                    <p className="truncate text-[11px] font-medium text-[#0b0b0f]">{c.name}</p>
                  </div>
                  <p className="mt-1 text-[9px] text-[#8a8a92]">Transactional | Promotional</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-[#8a8a92]">Delivered</p>
                    <p className="text-[12px] font-semibold text-[#0b0b0f]">{c.delivered}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#8a8a92]">Seen Ratio</p>
                    <p className="text-[12px] font-semibold text-[#0b0b0f]">{c.seenRatio}</p>
                  </div>
                </div>
                <a className="mt-0.5 text-[10px] font-medium text-[#4C8DF6]">View report →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
