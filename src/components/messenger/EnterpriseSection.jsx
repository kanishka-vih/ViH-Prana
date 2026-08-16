import { useEffect, useRef, useState } from 'react'
import sectionBg from '../../assets/messenger-figma/section-bg.webp'
import orb1 from '../../assets/messenger-figma/orb-1.webp'
import orb2 from '../../assets/messenger-figma/orb-2.webp'
import iconSupport from '../../assets/messenger-figma/icon-support-solid.svg'
import iconGrowth from '../../assets/messenger-figma/icon-growth-solid.svg'
import iconFileSystem from '../../assets/messenger-figma/icon-file-system.svg'

// Idle state matching the rise-fade keyframe's 0% frame, held until the
// section scrolls into view.
const HIDDEN_STYLE = { opacity: 0, transform: 'translateY(60px)' }

const GRADIENTS = {
  pink: 'linear-gradient(135deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 35%, rgb(154, 0, 255) 60%, rgb(149, 44, 246) 80%, rgb(99, 40, 241) 100%)',
  violet:
    'linear-gradient(135deg, rgb(255, 222, 254) 0%, rgb(154, 0, 255) 35%, rgb(255, 103, 249) 65%, rgb(149, 44, 246) 85%, rgb(99, 40, 241) 100%)',
  blue: 'linear-gradient(135deg, rgb(234, 225, 255) 0%, rgb(78, 30, 231) 45%, rgb(149, 44, 246) 75%, rgb(172, 57, 248) 90%, rgb(255, 103, 249) 100%)',
}

function OrbIcon({ orbSrc, icon, gradient }) {
  return (
    <div
      className="relative shrink-0 size-[42px] rounded-full overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: gradient }}
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
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={sectionBg}
          alt=""
          className={`absolute left-0 -top-[6%] w-full h-[122%] max-w-none ${active ? 'success-layer-1' : ''}`}
          style={active ? undefined : HIDDEN_STYLE}
        />
      </div>

      <div className="relative flex flex-col items-center gap-16 px-6 md:px-[100px] py-24">
        <h2 className="max-w-[600px] text-center font-light text-3xl md:text-[36px] leading-[40px] tracking-[-1.2px] text-[#fefefe]">
          Enterprise AI built for intelligence and data sovereignty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-310">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col justify-between gap-6 h-[276px] rounded-xl border border-[#8e8e8e] bg-[rgba(54,54,54,0.64)] px-5 py-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-2xl leading-[25px] tracking-[0.24px] text-white">{feature.title}</p>
                <OrbIcon orbSrc={feature.orb} icon={feature.icon} gradient={feature.gradient} />
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
