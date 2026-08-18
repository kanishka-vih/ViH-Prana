import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Each letter is the first letter of one word across the four stage labels
// below (Capture, Content, Context, Analyze, Agentic, Action) — CCCAAA.
const LETTERS = ['C', 'C', 'C', 'A', 'A', 'A']
const ACTIVE_COLOR = '#040404'
const INACTIVE_COLOR = '#c2c2c2'

const STAGES = [
  {
    letters: [0, 1],
    label: 'Capture Content',
    description:
      'Collect messages, emails, calls, meetings, documents, and tickets from every communication channel.',
  },
  {
    letters: [2],
    label: 'Context',
    description: 'Connect conversations into a unified timeline, preserving relationships and business context.',
  },
  {
    letters: [3],
    label: 'Analyze',
    description: 'Extract insights, identify intent, detect risks, and surface the next best actions.',
  },
  {
    letters: [4, 5],
    label: 'Agentic Action',
    description:
      'AI agents autonomously execute workflows, automate tasks, update systems, and resolve repetitive work with human oversight.',
  },
]

// CccaaaSection.tsx (Shruti/Prana) pins its panel with `top: 0` — pinning
// this one at 96 instead put it noticeably lower on screen than Shruti's,
// which is exactly where it stayed fixed on scroll instead of sitting right
// under the header like Shruti's does.
const STICKY_TOP = 0
// Scroll distance (px) the highlight dwells on each stage before advancing.
const SEGMENT_HEIGHT = 450
const PIN_DISTANCE = STAGES.length * SEGMENT_HEIGHT

// This mirrors CccaaaSection.tsx's technique exactly (see its comments for
// the full explanation): a `transform`ed ancestor — ScaledCanvas, on
// /messenger — makes itself the containing block for `position: sticky`,
// so sticky nested inside it just scrolls past instead of pinning. Portaling
// the pinned panel straight onto <body> escapes that tree entirely, so
// native sticky (browser-compositor-smooth, no per-frame JS positioning)
// works normally. The portal wrapper is placed at the track's real
// document-space offset — measured on resize/settle, not per scroll frame —
// so it occupies the exact slot the track reserves inside the scaled page.
// Same breakpoint ScaledCanvas.tsx/Header.tsx use for the mobile/desktop
// split site-wide.
const MOBILE_BREAKPOINT = 768

export default function HowWeDoItSection() {
  const trackRef = useRef(null)
  const pinnedRef = useRef(null)
  const letterRefs = useRef([])
  const labelRef = useRef(null)
  const bodyRef = useRef(null)
  const captionRef = useRef(null)

  const [geo, setGeo] = useState({ docTop: 0, scale: 1 })
  // This is a desktop-only component (mobile uses CccaaaSection.tsx via
  // HomeBottomSections instead) that's still MOUNTED even while its parent
  // wrapper is hidden via `hidden md:flex` — a CSS `display:none` ancestor
  // doesn't stop React from running effects or `createPortal` from
  // inserting into <body>, so without this the portal below still fired,
  // measured its own hidden (zero-size) track, and rendered a phantom
  // "CCCAAA" panel floating at the top of the real mobile page instead of
  // never mounting at all.
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const rect = track.getBoundingClientRect()
      // Same scale ScaledCanvas itself applies to the whole page (it fills
      // the viewport width edge-to-edge, at a fixed 1440px design width) —
      // this panel is portaled out of that transformed tree below, so its
      // own fixed-px Tailwind values (text-[220px], px-[162px], etc.,
      // authored against that same 1440px baseline) need this reapplied via
      // `zoom`, or they render at literal size instead of matching how big
      // everything else on the scaled page appears.
      setGeo({ docTop: rect.top + window.scrollY, scale: window.innerWidth / 1440 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    const settleTimer = window.setTimeout(measure, 500)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      window.clearTimeout(settleTimer)
    }
  }, [])

  // Stage/color switching only — no position math here. The pin itself is
  // native `position: sticky` below, handled by the browser compositor, so
  // it can't lag a frame behind the scroll or jitter under fast/inertial
  // scrolling the way a JS-computed transform did before.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    let lastStage = -1

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const rect = track.getBoundingClientRect()
      const scrolled = Math.min(Math.max(STICKY_TOP - rect.top, 0), PIN_DISTANCE)
      const stage = Math.min(STAGES.length - 1, Math.floor(scrolled / SEGMENT_HEIGHT))

      // Reapplied every frame (not gated behind the stage check below) so
      // this self-heals if something else — e.g. the geo/pinnedHeight
      // measurement effect re-rendering this component on resize/settle —
      // resets these DOM nodes back to their JSX-authored defaults. Gating
      // this behind "only when stage changes" meant a reset could leave the
      // wrong stage's letters/text stuck on screen indefinitely, since
      // `lastStage` (a plain closure variable, untouched by React re-renders)
      // would still match the current stage and skip re-applying it.
      const active = STAGES[stage].letters
      letterRefs.current.forEach((el, i) => {
        if (el) el.style.color = active.includes(i) ? ACTIVE_COLOR : INACTIVE_COLOR
      })
      if (labelRef.current) labelRef.current.textContent = `${STAGES[stage].label} : `
      if (bodyRef.current) bodyRef.current.textContent = STAGES[stage].description

      // The opacity fade, on the other hand, SHOULD only trigger on an
      // actual stage change — not every frame.
      if (lastStage !== stage) {
        lastStage = stage
        if (captionRef.current) {
          captionRef.current.style.opacity = '0'
          requestAnimationFrame(() => {
            if (captionRef.current) captionRef.current.style.opacity = '1'
          })
        }
      }
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // All hooks above are called unconditionally either way (React's rules of
  // hooks) — they just no-op forever since trackRef/pinnedRef never attach
  // to anything when this returns null instead of the JSX below.
  if (isMobile) return null

  // Figma's frame (node 88:831, "Desktop - 5") is 1440x684 — the exact same
  // fixed size as CccaaaSection.tsx's own panel, right down to the button's
  // left-[162px]/top-[228px]/w-[1117px] position, the letters' 276px/28px
  // tracking/65px leading, and the pill's left-[623px]/top-[65px] slot. So
  // this just mirrors that panel's structure/values 1:1 instead of
  // approximating them with responsive Tailwind breakpoints — those
  // breakpoints were never faithful to Figma's actual numbers, which is why
  // the font/size read as "different" even after the centering fix. The
  // fixed 684px height (not measured via offsetHeight) matches how
  // CccaaaSection sizes its own panel.
  const trackHeight = 684 + PIN_DISTANCE

  const panel = (
    <div ref={pinnedRef} className="bg-[#f8f9fb] h-[684px] relative w-[1440px]" style={{ zoom: geo.scale }}>
      <button className="absolute flex flex-col gap-[48px] items-center left-[162px] top-[228px] w-[1117px] cursor-pointer bg-transparent border-none">
        <div className="flex flex-col h-[250px] justify-center w-full">
          <p className="font-roboto-condensed font-semibold text-[276px] tracking-[28px] m-0 leading-[65px] text-center">
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el
                }}
                style={{ color: i < 2 ? ACTIVE_COLOR : INACTIVE_COLOR, transition: 'color 0.4s ease' }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>

        <p ref={captionRef} className="text-[20px] tracking-[-1px] text-left w-[523px] m-0 leading-[33px]" style={{ transition: 'opacity 0.3s ease' }}>
          <span ref={labelRef} className="font-semibold text-[#1d1d1d]">
            Capture Content :{' '}
          </span>
          <span ref={bodyRef} className="font-normal text-[#5a5a5a]">
            Collect messages, emails, calls, meetings, documents, and tickets from every communication channel.
          </span>
        </p>
      </button>

      {/* Same pill chrome as CccaaaSection.tsx's "How we do it" badge on
          Shruti/Prana — white/translucent with a hairline border. */}
      <div className="absolute bg-white/70 border border-black/10 flex items-center justify-center left-[623px] p-[10px] rounded-[12px] top-[65px]">
        <p className="font-normal text-[18px] text-black text-center tracking-[-1px] w-[174px] m-0 leading-[16px]">
          How we do it
        </p>
      </div>
    </div>
  )

  return (
    <section className="w-full bg-[#f8f9fb]">
      <div ref={trackRef} className="relative w-full" style={{ height: trackHeight || undefined }}>
        {createPortal(
          <div
            style={{
              position: 'absolute',
              top: geo.docTop,
              left: 0,
              width: '100%',
              height: trackHeight,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <div style={{ position: 'sticky', top: STICKY_TOP, pointerEvents: 'auto' }}>{panel}</div>
          </div>,
          document.body,
        )}
      </div>
    </section>
  )
}
