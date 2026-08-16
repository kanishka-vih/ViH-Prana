import { useEffect, useRef, useState } from 'react'
import benefitRing1 from '../../assets/messenger-figma/benefit-real-ring1.svg'
import benefitRing2 from '../../assets/messenger-figma/benefit-real-ring2.svg'
import benefitRing3 from '../../assets/messenger-figma/benefit-real-ring3.svg'
import notificationIconBg from '../../assets/messenger-figma/notification-icon-bg.webp'
import iconTime from '../../assets/messenger-figma/icon-time.svg'

// Idle state matching the rise-fade keyframes' 0% frame, held until the
// mockup scrolls into view — otherwise the animation plays once at page
// load and has long finished by the time a visitor scrolls down to it.
const HIDDEN_STYLE = { opacity: 0, transform: 'translateY(60px)' }

const BENEFITS = [
  {
    title: 'Own the channel',
    description:
      'The inbox lives in your app under your brand — not on a platform that can change its rules, pricing or reach.',
  },
  {
    title: 'Fewer missed messages',
    description:
      "In-app delivery first, with SMS, email and voice fallback when the device can't be reached.",
  },
  {
    title: 'Less OTP friction',
    description:
      'Verification handled silently in the background instead of a code the customer has to copy across apps.',
  },
  {
    title: 'Proof of delivery',
    description:
      'Per-message status and signed callbacks — not a bulk report at the end of the day.',
  },
]

function RingLayer({ src, layer, left, top, width, height, active }) {
  return (
    <img
      src={src}
      alt=""
      className={`absolute -z-10 max-w-none ${active ? `success-layer-${layer}` : ''}`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
        ...(active ? undefined : HIDDEN_STYLE),
      }}
    />
  )
}

function NotificationMockup() {
  const containerRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative isolate size-full overflow-hidden rounded-[30px] bg-gradient-to-b from-[#dce9fc] to-white"
    >
      {/* Positions below are the exact Figma pixel offsets for this mockup
          (Frame 2043683740, node 88:698) converted to percentages of the
          451x449 card — not guessed. Left/width use 451 as basis, top/height
          use 449, so circles stay true circles regardless of render size. */}
      <RingLayer
        src={benefitRing1}
        layer={1}
        left={-145.9}
        top={-64.59}
        width={408.65}
        height={410.47}
        active={active}
      />
      <RingLayer
        src={benefitRing2}
        layer={2}
        left={-62.97}
        top={48.99}
        width={231.29}
        height={232.32}
        active={active}
      />
      <RingLayer
        src={benefitRing3}
        layer={3}
        left={-62.97}
        top={70.16}
        width={231.29}
        height={232.32}
        active={active}
      />

      <div
        className={`absolute rounded-2xl bg-white/90 backdrop-blur-xl p-[10px] shadow-lg ${active ? 'success-layer-4' : ''}`}
        style={{ left: '18.74%', top: '28.29%', width: '67.85%', ...(active ? undefined : HIDDEN_STYLE) }}
      >
        <div className="flex gap-[10px] items-center w-full">
          <div className="relative size-[38px] shrink-0 rounded-[10px] overflow-hidden">
            <img src={notificationIconBg} alt="" className="absolute inset-0 size-full object-cover" />
            <img src={iconTime} alt="" className="absolute inset-0 m-auto size-[20px] invert" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-poppins font-semibold text-[15px] tracking-[-0.5px] text-black">
              OTP for login
            </p>
            <p className="font-poppins text-[13px] tracking-[-0.078px] text-black">123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EnterpriseBenefits() {
  return (
    <div className="flex flex-col items-center gap-[42px] w-full md:w-310 px-6">
      <h2 className="font-light text-3xl md:text-[36px] text-[#131313] text-center">
        What enterprises get out of it
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[52px] items-center justify-center w-full max-w-[1092px] rounded-3xl bg-white p-6">
        <div className="w-full max-w-[451px] aspect-[451/449] shrink-0">
          <NotificationMockup />
        </div>

        <div className="flex flex-col gap-8 w-full max-w-[472px]">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex gap-6 items-start">
              <div className="flex items-center justify-center h-[35px] w-[23px] shrink-0">
                <div className="size-[11px] rounded-full bg-[#5a9bf0]" />
              </div>
              <div className="flex flex-col gap-[9px]">
                <p className="text-2xl tracking-[0.24px] text-black">{benefit.title}</p>
                <p className="font-inter text-sm leading-5 tracking-[0.14px] text-[#454545]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
