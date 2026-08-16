import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import industryTelecom from '../../assets/messenger-figma/industry-telecom.webp'
import industryTravel from '../../assets/messenger-figma/industry-travel.webp'
import industryBanking from '../../assets/messenger-figma/industry-banking.webp'
import industryEcommerce from '../../assets/messenger-figma/industry-ecommerce.webp'
import industryHospitality from '../../assets/messenger-figma/industry-hospitality.webp'
import industryHealthcare from '../../assets/messenger-figma/industry-healthcare.webp'

// Append new entries here — the stack/scroll animation below reads this
// array by length and needs no changes when more industries are added.
const INDUSTRIES = [
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

function IndustryCardVisual({ industry, translateY, overlayOpacity, zIndex }) {
  return (
    <div
      className="absolute inset-x-0 top-0"
      style={{ height: CARD_HEIGHT, transform: `translateY(${translateY}px)`, zIndex }}
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

        <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
      </div>
    </div>
  )
}

export default function IndustriesSection() {
  const trackRef = useRef(null)
  const pinnedRef = useRef(null)
  const n = INDUSTRIES.length
  const pinDistance = (n - 1) * SEGMENT_HEIGHT
  const stackHeight = CARD_HEIGHT + (n - 1) * PEEK

  const [pinnedHeight, setPinnedHeight] = useState(0)
  const trackHeight = pinnedHeight + pinDistance

  const [transforms, setTransforms] = useState(() =>
    INDUSTRIES.map((_, i) => ({
      translateY: i === 0 ? 0 : ENTRY_DISTANCE + i * PEEK,
      overlayOpacity: 0,
    }))
  )

  useLayoutEffect(() => {
    function measure() {
      if (pinnedRef.current) setPinnedHeight(pinnedRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let ticking = false

    function computeTransforms() {
      ticking = false
      const track = trackRef.current
      if (!track) return

      const rect = track.getBoundingClientRect()
      const scrolled = Math.min(Math.max(STICKY_TOP - rect.top, 0), pinDistance)

      const progress = INDUSTRIES.map((_, i) => {
        if (i === 0) return 1
        const segmentStart = (i - 1) * SEGMENT_HEIGHT
        return Math.min(Math.max((scrolled - segmentStart) / SEGMENT_HEIGHT, 0), 1)
      })

      setTransforms(
        INDUSTRIES.map((_, i) => {
          const nextProgress = progress[i + 1] ?? 0
          if (i === 0) return { translateY: 0, overlayOpacity: nextProgress * 0.5 }
          const restY = i * PEEK
          const translateY = restY + (1 - progress[i]) * ENTRY_DISTANCE
          return { translateY, overlayOpacity: nextProgress * 0.5 }
        })
      )
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeTransforms)
      }
    }

    computeTransforms()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n, pinDistance])

  return (
    <section className="w-full bg-white px-6 md:px-[100px]">
      <div className="relative w-full md:w-310 mx-auto" ref={trackRef} style={{ height: trackHeight || undefined }}>
        <div ref={pinnedRef} className="sticky flex flex-col gap-[62px] w-full" style={{ top: STICKY_TOP }}>
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
                translateY={transforms[i]?.translateY ?? 0}
                overlayOpacity={transforms[i]?.overlayOpacity ?? 0}
                zIndex={i + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
