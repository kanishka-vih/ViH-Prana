import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Each letter is the first letter of one word across the four stage labels
// below (Capture, Content, Context, Analyze, Agentic, Action) — CCCAAA.
const LETTERS = ['C', 'C', 'C', 'A', 'A', 'A']

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

const STICKY_TOP = 96
// Scroll distance (px) the highlight dwells on each stage before advancing.
const SEGMENT_HEIGHT = 450
const PIN_DISTANCE = STAGES.length * SEGMENT_HEIGHT

export default function HowWeDoItSection() {
  const trackRef = useRef(null)
  const pinnedRef = useRef(null)
  const [pinnedHeight, setPinnedHeight] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)

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

    function computeStage() {
      ticking = false
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrolled = Math.min(Math.max(STICKY_TOP - rect.top, 0), PIN_DISTANCE)
      const index = Math.min(STAGES.length - 1, Math.floor(scrolled / SEGMENT_HEIGHT))
      setStageIndex(index)
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeStage)
      }
    }

    computeStage()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const trackHeight = pinnedHeight + PIN_DISTANCE
  const stage = STAGES[stageIndex]

  return (
    <section className="w-full bg-[#f8f9fb]">
      <div className="relative w-full" ref={trackRef} style={{ height: trackHeight || undefined }}>
        <div
          ref={pinnedRef}
          className="sticky flex flex-col items-center gap-12 md:gap-[116px] w-full px-6 md:px-[162px] pt-16 md:pt-[65px] pb-16 md:pb-[92px]"
          style={{ top: STICKY_TOP }}
        >
          <span className="rounded-xl bg-[rgba(243,248,255,0.6)] px-4 py-2.5 text-lg tracking-[-1px] text-black">
            How we do it
          </span>

          <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-[1117px]">
            <div className="flex flex-wrap justify-center gap-1 md:gap-0 font-condensed font-semibold text-[100px] md:text-[180px] lg:text-[220px] leading-none tracking-[10px] md:tracking-[20px]">
              {LETTERS.map((letter, i) => (
                <span
                  key={i}
                  className="transition-colors duration-300"
                  style={{ color: stage.letters.includes(i) ? '#040404' : '#c2c2c2' }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <p key={stageIndex} className="caption-fade-in w-full max-w-[523px] text-left text-xl tracking-[-1px]">
              <span className="font-semibold text-[#1d1d1d]">{stage.label} : </span>
              <span className="text-[#5a5a5a]">{stage.description}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
