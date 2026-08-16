import iconArrowOutlined from '../../assets/messenger-figma/icon-arrow-outlined.svg'
import iconQuoteFill from '../../assets/messenger-figma/icon-quote-fill.svg'
import iconArrowUpOutline from '../../assets/messenger-figma/icon-arrow-up-outline.svg'
import logoStarHealth from '../../assets/messenger-figma/logo-star-health.webp'
import logoChola from '../../assets/messenger-figma/logo-chola.webp'
import logoJain from '../../assets/messenger-figma/logo-jain.webp'
import logoKapston from '../../assets/messenger-figma/logo-kapston.webp'
import logoTataplay from '../../assets/messenger-figma/logo-tataplay.webp'
import logoSmc from '../../assets/messenger-figma/logo-smc.webp'
import logoBsnl from '../../assets/messenger-figma/logo-bsnl.webp'
import { scrollToContact } from '../utils/scrollToContact'

// Each source file has a different amount of built-in padding/canvas shape
// (some are tightly-cropped wide logos, others are square with a lot of
// blank space around the mark) — height is tuned per logo so they read as
// visually consistent instead of all being forced into one box size.
const LOGOS = [
  { src: logoStarHealth, height: 95 },
  { src: logoChola, height: 50 },
  { src: logoJain, height: 125 },
  { src: logoKapston, height: 145 },
  { src: logoTataplay, height: 120, offsetX: 16 },
  { src: logoSmc, height: 50 },
  { src: logoBsnl, height: 140 },
]

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white px-6 md:px-[100px]">
      <div className="flex flex-col gap-[90px] md:gap-[144px] items-center md:items-end w-full md:w-310 mx-auto">
        <div className="flex flex-col gap-16 md:gap-[75px] items-start md:items-end w-full">
          <h2 className="w-full font-light text-3xl md:text-[36px] leading-[44px] tracking-[-1px] text-[#040404]">
            We&apos;re proud to partner with industry leaders and global innovators here&apos;s
            what they&apos;re saying about working with ViH Metaverse
          </h2>

          <button
            type="button"
            onClick={scrollToContact}
            className="flex self-start items-center gap-[10px] h-[45px] px-4 py-2 rounded-lg bg-[#232323] text-white transition-all duration-150 hover:bg-black active:scale-95 active:bg-black"
          >
            <span className="text-base font-medium">Contact sales</span>
            <img src={iconArrowOutlined} alt="" className="h-[33px] w-[16.5px]" />
          </button>

          <div className="flex flex-col md:flex-row items-start justify-between gap-8 w-full max-w-[756px] rounded-lg bg-[rgba(138,138,139,0.03)] px-6 md:px-[45px] py-6">
            <div className="flex flex-col items-center gap-6 w-[161px] shrink-0">
              <div className="flex flex-col items-center">
                <img src={iconQuoteFill} alt="" className="size-20" />
                <div className="flex flex-col items-center text-center text-lg tracking-[-1px] text-[#040404]">
                  <p className="leading-[41px]">Mukesh Ambani</p>
                  <p className="leading-[41px]">Chairman of RIL</p>
                </div>
              </div>
              <div className="flex items-center gap-[13px]">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="flex items-center justify-center rounded-full bg-[rgba(191,191,191,0.25)] p-1.5"
                >
                  <img src={iconArrowUpOutline} alt="" className="size-5 -rotate-90" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="flex items-center justify-center rounded-full bg-[rgba(191,191,191,0.25)] p-1.5"
                >
                  <img src={iconArrowUpOutline} alt="" className="size-5 rotate-90" />
                </button>
              </div>
            </div>

            <p className="text-xl md:text-2xl leading-[33px] tracking-[-1px] text-[#040404] md:text-right">
              ViH&apos;s integration of the Reliance Research Suite was simple, enjoyable, and
              impactful. Their team has a deep technical understanding and knows the AI market
              inside out, which made the entire process smooth and fun.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 items-center justify-items-start w-full opacity-80">
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              className="w-[160px]"
              style={{ height: logo.height, marginLeft: logo.offsetX ?? 0 }}
            >
              <img src={logo.src} alt="" className="h-full w-full object-contain object-left" />
            </div>
          ))}
          <p className="font-mono font-semibold text-3xl md:text-[40px] text-[#9f3bf6]">and 100+</p>
        </div>
      </div>
    </section>
  )
}
