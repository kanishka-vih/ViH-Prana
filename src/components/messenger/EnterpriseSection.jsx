import { useEffect, useRef, useState } from 'react'
import sectionBg from '../../assets/messenger-figma/section-bg.webp'
import orb1 from '../../assets/messenger-figma/orb-1.webp'
import orb2 from '../../assets/messenger-figma/orb-2.webp'
import iconSupport from '../../assets/messenger-figma/icon-support-solid.svg'
import iconGrowth from '../../assets/messenger-figma/icon-growth-solid.svg'
import iconFileSystem from '../../assets/messenger-figma/icon-file-system.svg'

const GRADIENTS = {
  pink: 'linear-gradient(135deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 35%, rgb(154, 0, 255) 60%, rgb(149, 44, 246) 80%, rgb(99, 40, 241) 100%)',
  violet:
    'linear-gradient(135deg, rgb(255, 222, 254) 0%, rgb(154, 0, 255) 35%, rgb(255, 103, 249) 65%, rgb(149, 44, 246) 85%, rgb(99, 40, 241) 100%)',
  blue: 'linear-gradient(135deg, rgb(234, 225, 255) 0%, rgb(78, 30, 231) 45%, rgb(149, 44, 246) 75%, rgb(172, 57, 248) 90%, rgb(255, 103, 249) 100%)',
}

// Same shruti-orb-bounce animation ShrutiOutcomes.tsx uses for its own
// card icons, reused here so the two sections feel consistent — staggered
// per index just like there, so the three orbs pop in left to right instead
// of all at once.
function OrbIcon({ orbSrc, icon, gradient, active, delay }) {
  return (
    <div
      className={`relative shrink-0 size-[42px] rounded-full overflow-hidden flex items-center justify-center ${active ? 'shruti-orb-bounce' : 'opacity-0'}`}
      style={{
        backgroundImage: gradient,
        animationDelay: active ? `${delay}s` : undefined,
      }}
    >
      {orbSrc && (
        <img
          src={orbSrc}
          alt=""
          className="absolute inset-0 size-full object-cover mix-blend-overlay opacity-90"
        />
      )}
      <img src={icon} alt="" className="relative size-[19px]" />
    </div>
  )
}

const FEATURES = [
  {
    title: 'Own Your User Communication Channel',
    description:
      'Keep your customer inbox inside your app, under your brand, with no third-party platform in between.',
    orb: orb1,
    icon: iconSupport,
    gradient: GRADIENTS.pink,
  },
  {
    title: 'Reach Customers Every Time',
    description:
      'Deliver in-app first, with SMS, email and voice fallback when customers aren’t reachable.',
    orb: orb2,
    icon: iconGrowth,
    gradient: GRADIENTS.violet,
  },
  {
    title: 'AI With Enterprise Control',
    description:
      'Use self-hosted AI with your data, knowledge base and controls — without handing your data to third parties.',
    orb: null,
    icon: iconFileSystem,
    gradient: GRADIENTS.blue,
  },
]

export default function EnterpriseSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // No extra margin here — DashboardShowcase's own min-h-[979px] already
    // reserves the exact trailing space Figma has after the "Four channels"
    // cards (up through where this section's frame actually starts, which
    // overlaps the tail of the hero frame slightly). Adding a separate gap
    // here on top of that double-counted the same space and produced way
    // too much white area between the two sections.
    // `bg-[#0a1c38]` (the same outer-ring tone ShrutiOutcomes.tsx's RINGS
    // array uses for its own analogous dome) instead of `bg-white` — the
    // dome background image tapers inward toward its top, and on a narrow
    // mobile viewport that taper is narrower than the heading text at the
    // height the text sits at. With a white section bg, wherever the dome's
    // dark pixels don't reach, the white text became invisible against the
    // white page background showing through — reading as "cut off" at both
    // edges when it was actually just unreadable, not clipped. A dark
    // fallback bg (safe on desktop too, where the dome already reaches the
    // edges by then) means there's never a white gap for that to happen in.
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden bg-[#0a1c38]">
      {/* Same shruti-ring-rise bounce ShrutiOutcomes.tsx uses for its own
          three semicircle rings — this dome is one flattened image rather
          than separable ring layers, so the whole thing rises and settles
          as one unit instead of each ring individually, but it's the exact
          same animation/easing. (The class this used before, "success-
          layer-1", was never defined anywhere in this project's CSS, so it
          had no actual animation at all.) */}
      <div className="absolute inset-0 -z-10">
        <img
          src={sectionBg}
          alt=""
          className={`absolute left-0 -top-[6%] w-full h-[122%] max-w-none ${active ? 'shruti-ring-rise' : 'opacity-0'}`}
        />
      </div>

      <div className="relative flex flex-col items-center gap-16 px-6 md:px-[100px] py-24">
        {/* `w-full` (not just `max-w-[600px]`) — a flex child's implicit
            `min-width: auto` otherwise keeps it at its own shrink-to-fit
            content width instead of respecting the flex container's actual
            (narrower, on mobile) width, so it overflowed symmetrically past
            both edges of a phone screen while still centering correctly on
            wide desktop viewports where 600px never exceeded the space
            available. */}
        <h2 className="w-full max-w-[600px] text-center font-light text-3xl md:text-[36px] leading-[40px] tracking-[-1.2px] text-[#fefefe]">
          Enterprise AI built for intelligence and data sovereignty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-310">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col justify-between gap-6 h-[276px] rounded-xl border border-[#8e8e8e] bg-[rgba(54,54,54,0.64)] px-5 py-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-2xl leading-[25px] tracking-[0.24px] text-white">{feature.title}</p>
                <OrbIcon
                  orbSrc={feature.orb}
                  icon={feature.icon}
                  gradient={feature.gradient}
                  active={active}
                  delay={i * 0.15}
                />
              </div>
              <p className="font-inter text-base leading-5 tracking-[0.16px] text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
