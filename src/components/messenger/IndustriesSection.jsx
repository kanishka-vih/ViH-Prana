import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import industryTelecom from '../../assets/messenger-figma/industry-telecom.webp'
import industryTravel from '../../assets/messenger-figma/industry-travel.webp'
import industryBanking from '../../assets/messenger-figma/industry-banking.webp'
import industryEcommerce from '../../assets/messenger-figma/industry-ecommerce.webp'
import industryHospitality from '../../assets/messenger-figma/industry-hospitality.webp'
import industryHealthcare from '../../assets/messenger-figma/industry-healthcare.webp'

// Append new entries here — the stack/scroll animation below reads this
// array by length and needs no changes when more industries are added.
// Exported for reuse by MobileMessenger.tsx's sliding-carousel version of
// this same section — same 6 industries/copy/images, just a different
// interaction (horizontal swipe instead of vertical scroll-stack) to match
// Figma's own mobile frame (node 91:1025) rather than the desktop one.
export const INDUSTRIES = [
  {
    title: 'Telecom Operators',
    description:
      'Embed ViH Messenger to turn your existing reach into a branded, data-sovereign A2P revenue platform.',
    tags: ['A2P Monetisation', 'Data Localisation', 'Enterprise Onboarding'],
    image: industryTelecom,
    imageCrop: { left: 34.61, top: -8.35, width: 66.99, height: 174.79 },
  },
  {
    title: 'Travel & Airlines',
    description:
      'Boarding passes, gate alerts, reminders, and upgrades, delivered interactively for instant action.',
    tags: ['Boarding Pass', 'Delay Alerts', 'Upsell'],
    image: industryTravel,
    reverse: true,
    // Figma non-uniformly stretches this portrait-shaped photo to fill a
    // landscape slot (confirmed by matching a force-stretched render against
    // the reference pixel-for-pixel) rather than cropping it — the plain
    // imageCrop path below already does exactly that, since an <img> with
    // explicit width/height and no object-fit defaults to stretch-to-fill.
    imageCrop: { left: 0, top: 0, width: 47, height: 100 },
  },
  {
    title: 'Banking & Fintech',
    description:
      'Deliver alerts, fraud flags, offers, and controls securely inside your banking app, no WhatsApp required.',
    tags: ['OTP & Alerts', 'Offers', 'Fraud Detection'],
    image: industryBanking,
    imageCrop: { left: 37.62, top: -39.69, width: 68.86, height: 180.02 },
  },
  {
    title: 'E-Commerce & Retail',
    description: 'Order updates, cart nudges, and flash sales, delivered interactively, right on time.',
    tags: ['Order Updates', 'Flash Sales', 'Returns & Support'],
    image: industryEcommerce,
    imageCrop: { left: 33.95, top: -36.14, width: 66.05, height: 172.28 },
  },
  {
    title: 'Hospitality & Hotels',
    description: 'Bookings, check-ins, concierge, and reviews, all in one owned channel.',
    tags: ['Bookings', 'Concierge', 'Reviews'],
    image: industryHospitality,
    reverse: true,
    imageCrop: { left: -3.82, top: -17.87, width: 56.59, height: 126.54 },
  },
  {
    title: 'Healthcare & Insurance',
    description:
      'Appointments, prescriptions, claims, and renewals, securely delivered through an encrypted, compliant channel.',
    tags: ['Reminders', 'Claims', 'Policy Updates'],
    image: industryHealthcare,
    imageCrop: { left: 40.84, top: -17.73, width: 65.91, height: 171.9 },
  },
]

const CARD_HEIGHT = 289
const STICKY_TOP = 96
// Each card hides 85% of the one before it — only this much (15%) peeks out.
const PEEK = Math.round(CARD_HEIGHT * 0.15)
// Scroll distance (px) it takes for one card to fully arrive and stack.
const SEGMENT_HEIGHT = 500
// How far below its resting spot a card starts, i.e. off-screen below the stack.
const ENTRY_DISTANCE = CARD_HEIGHT + 120

// Exported for MobileIndustriesStack below — same card visual (image crop,
// gradient, title/description/tags layout) at a different `height`, since
// the mobile card (Figma node 345:2682) is proportioned much taller/
// narrower than the desktop one.
export function IndustryCardVisual({ industry, zIndex, initialTranslateY, cardRef, overlayRef, height = CARD_HEIGHT }) {
  return (
    <div
      ref={cardRef}
      className="absolute inset-x-0 top-0"
      style={{ height, transform: `translateY(${initialTranslateY}px)`, zIndex }}
    >
      <div className="relative isolate h-full w-full overflow-hidden rounded-3xl bg-black">
        {industry.imageCrop ? (
          <img
            src={industry.image}
            alt=""
            className="absolute -z-10 max-w-none"
            style={{
              left: `${industry.imageCrop.left}%`,
              top: `${industry.imageCrop.top}%`,
              width: `${industry.imageCrop.width}%`,
              height: `${industry.imageCrop.height}%`,
            }}
          />
        ) : (
          <img
            src={industry.image}
            alt=""
            className={`absolute inset-0 -z-10 size-full ${industry.imageFitClass ?? 'object-cover object-right'}`}
          />
        )}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(to ${industry.reverse ? 'left' : 'right'}, black 0%, black 50%, transparent 75%)`,
          }}
        />

        <div
          className={`absolute top-[30px] flex h-[229px] w-[calc(100%-48px)] md:w-[480px] max-w-[480px] flex-col justify-between ${
            industry.reverse
              ? 'right-6 md:right-[45px] items-end text-right'
              : 'left-6 md:left-[45px] items-start text-left'
          }`}
        >
          <div className="flex flex-col gap-[30px] tracking-[-1px]">
            <h3 className="font-light text-3xl md:text-[36px] leading-[36px] text-white">
              {industry.title}
            </h3>
            <p className="text-lg md:text-xl leading-6 text-[#9e9e9e]">{industry.description}</p>
          </div>
          <div className={`flex flex-wrap gap-2 items-center ${industry.reverse ? 'justify-end' : ''}`}>
            {industry.tags.map((tag) => (
              <span
                key={tag}
                className="flex h-[34px] items-center justify-center rounded-[46px] bg-[rgba(161,161,161,0.1)] px-4 py-2.5 text-xs capitalize tracking-[0.96px] text-white whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: 0 }} />
      </div>
    </div>
  )
}

// This mirrors CccaaaSection.tsx's technique exactly (see its comments for
// the full explanation, and HowWeDoItSection.jsx for the same fix applied
// there): a `transform`ed ancestor — ScaledCanvas, on /messenger — makes
// itself the containing block for `position: sticky`, so sticky nested
// inside it just scrolls past instead of pinning. Portaling the pinned
// panel onto <body> escapes that tree, so native sticky (compositor-smooth,
// no per-frame JS positioning) works normally. The card stack's own
// translateY/opacity are still driven by scroll progress every frame, but
// written directly to each card's DOM node via refs instead of through
// React state, so 6 cards animating at once doesn't mean 6 re-renders per
// frame.
// Same breakpoint ScaledCanvas.tsx/Header.tsx use for the mobile/desktop
// split site-wide.
const MOBILE_BREAKPOINT = 768

export default function IndustriesSection() {
  const trackRef = useRef(null)
  const pinnedRef = useRef(null)
  const cardRefs = useRef([])
  const overlayRefs = useRef([])
  const n = INDUSTRIES.length
  const pinDistance = (n - 1) * SEGMENT_HEIGHT
  const stackHeight = CARD_HEIGHT + (n - 1) * PEEK

  const [pinnedHeight, setPinnedHeight] = useState(0)
  const [geo, setGeo] = useState({ docTop: 0, left: 0, width: 0, scale: 1 })
  const trackHeight = pinnedHeight + pinDistance
  // Desktop-only (mobile uses MobileMessenger.tsx's own sliding-carousel
  // version instead) — but this component stays MOUNTED even inside a
  // `hidden md:flex` wrapper, and a CSS `display:none` ancestor doesn't stop
  // React effects or `createPortal` from still inserting into <body>. Without
  // this guard the portal below fired anyway, measured its own hidden
  // (zero-size) track, and rendered a phantom industry-card stack floating
  // near the top of the real mobile page instead of never mounting.
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
      // Same scale ScaledCanvas itself applies to the whole page (fixed
      // 1440px design width, scaled to fill the real viewport) — this panel
      // is portaled out of that transformed tree below, so its own
      // fixed-px Tailwind values (the 1240px card width, CARD_HEIGHT, etc.,
      // authored against that same 1440px baseline) need this reapplied via
      // `zoom`, or they render at literal size instead of matching how big
      // everything else on the scaled page appears.
      setGeo({ docTop: rect.top + window.scrollY, left: rect.left, width: rect.width, scale: window.innerWidth / 1440 })
      if (pinnedRef.current) setPinnedHeight(pinnedRef.current.offsetHeight)
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

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const rect = track.getBoundingClientRect()
      const scrolled = Math.min(Math.max(STICKY_TOP - rect.top, 0), pinDistance)

      const progress = INDUSTRIES.map((_, i) => {
        if (i === 0) return 1
        const segmentStart = (i - 1) * SEGMENT_HEIGHT
        return Math.min(Math.max((scrolled - segmentStart) / SEGMENT_HEIGHT, 0), 1)
      })

      INDUSTRIES.forEach((_, i) => {
        const card = cardRefs.current[i]
        const overlay = overlayRefs.current[i]
        if (card) {
          const translateY = i === 0 ? 0 : i * PEEK + (1 - progress[i]) * ENTRY_DISTANCE
          card.style.transform = `translateY(${translateY}px)`
        }
        if (overlay) {
          const nextProgress = progress[i + 1] ?? 0
          overlay.style.opacity = String(nextProgress * 0.5)
        }
      })
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [n, pinDistance])

  // All hooks above are called unconditionally either way (React's rules of
  // hooks) — they just no-op forever since trackRef/pinnedRef never attach
  // to anything when this returns null instead of the JSX below.
  if (isMobile) return null

  const panel = (
    <div ref={pinnedRef} className="flex flex-col gap-[62px] w-[1240px] bg-white" style={{ zoom: geo.scale }}>
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        <h2 className="flex-1 font-light text-3xl md:text-[36px] leading-[36px] text-[#131313]">
          Where enterprises put it to work
        </h2>
        <p className="flex-1 text-lg md:text-xl leading-6 text-[#737373]">
          Configured for each enterprise, with tailored templates, channels, AI personas, and
          knowledge bases.
        </p>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: stackHeight }}>
        {INDUSTRIES.map((industry, i) => (
          <IndustryCardVisual
            key={i}
            industry={industry}
            zIndex={i + 1}
            initialTranslateY={i === 0 ? 0 : ENTRY_DISTANCE + i * PEEK}
            cardRef={(el) => {
              cardRefs.current[i] = el
            }}
            overlayRef={(el) => {
              overlayRefs.current[i] = el
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <section className="w-full bg-white px-6 md:px-[100px]">
      <div className="relative w-full md:w-310 mx-auto" ref={trackRef} style={{ height: trackHeight || undefined }}>
        {createPortal(
          <div
            style={{
              position: 'absolute',
              top: geo.docTop,
              left: geo.left,
              width: geo.width,
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

const MOBILE_CARD_HEIGHT = 484
const MOBILE_STICKY_TOP = 72
// Same 15% peek desktop uses.
const MOBILE_PEEK = Math.round(MOBILE_CARD_HEIGHT * 0.15)
const MOBILE_SEGMENT_HEIGHT = 380
const MOBILE_ENTRY_DISTANCE = MOBILE_CARD_HEIGHT + 100

// Mobile version of the same scroll-pin-and-stack effect above, used by
// MobileMessenger.tsx in place of a horizontal swipe carousel — Figma's own
// mobile frame for this section (345:2682) lays these 5 cards out as a
// plain vertical list (all 5 showing the same "Telecom Operators" text —
// a Figma export glitch, not the real intended per-card copy), so this
// reuses the real per-industry INDUSTRIES data and just re-plays the
// desktop stack's exact animation math at mobile's own card size.
//
// No `createPortal`/geo-measurement dance like the desktop version above
// needs — that escape hatch only exists because ScaledCanvas wraps desktop
// widths in a `transform: scale()` ancestor, which breaks `position:
// sticky`'s containing block. This route is `mobileReady` (App.tsx), so
// ScaledCanvas renders mobile widths with no transform at all (see its own
// comments) — plain nested `position: sticky` pins correctly here as-is.
export function MobileIndustriesStack() {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const overlayRefs = useRef([])
  const n = INDUSTRIES.length
  const pinDistance = (n - 1) * MOBILE_SEGMENT_HEIGHT
  const stackHeight = MOBILE_CARD_HEIGHT + (n - 1) * MOBILE_PEEK
  const trackHeight = stackHeight + pinDistance

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const rect = track.getBoundingClientRect()
      const scrolled = Math.min(Math.max(MOBILE_STICKY_TOP - rect.top, 0), pinDistance)

      const progress = INDUSTRIES.map((_, i) => {
        if (i === 0) return 1
        const segmentStart = (i - 1) * MOBILE_SEGMENT_HEIGHT
        return Math.min(Math.max((scrolled - segmentStart) / MOBILE_SEGMENT_HEIGHT, 0), 1)
      })

      INDUSTRIES.forEach((_, i) => {
        const card = cardRefs.current[i]
        const overlay = overlayRefs.current[i]
        if (card) {
          const translateY = i === 0 ? 0 : i * MOBILE_PEEK + (1 - progress[i]) * MOBILE_ENTRY_DISTANCE
          card.style.transform = `translateY(${translateY}px)`
        }
        if (overlay) {
          const nextProgress = progress[i + 1] ?? 0
          overlay.style.opacity = String(nextProgress * 0.5)
        }
      })
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [n, pinDistance])

  return (
    <section className="flex flex-col gap-6 w-full bg-white px-4 py-12">
      <div className="flex flex-col gap-3">
        <p className="font-light text-[32px] leading-[36px] text-[#131313] m-0">
          Where enterprises put it to work
        </p>
        <p className="text-[15px] leading-[22px] text-[#737373] m-0">
          Configured for each enterprise, with tailored templates, channels, AI personas, and
          knowledge bases.
        </p>
      </div>

      <div className="relative w-full" ref={trackRef} style={{ height: trackHeight }}>
        <div style={{ position: 'sticky', top: MOBILE_STICKY_TOP }}>
          <div className="relative w-full overflow-hidden" style={{ height: stackHeight }}>
            {INDUSTRIES.map((industry, i) => (
              <IndustryCardVisual
                key={i}
                industry={industry}
                height={MOBILE_CARD_HEIGHT}
                zIndex={i + 1}
                initialTranslateY={i === 0 ? 0 : MOBILE_ENTRY_DISTANCE + i * MOBILE_PEEK}
                cardRef={(el) => {
                  cardRefs.current[i] = el
                }}
                overlayRef={(el) => {
                  overlayRefs.current[i] = el
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
