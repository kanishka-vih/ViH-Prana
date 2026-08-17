import iconArrowOutlined from '../../assets/messenger-figma/icon-arrow-outlined.svg'
import iconQuoteFill from '../../assets/messenger-figma/icon-quote-fill.svg'
import iconArrowUpOutline from '../../assets/messenger-figma/icon-arrow-up-outline.svg'
import { images11, images21, images31, images41, images2, a5e5bd2a, bsnlLogo1 } from '../../assets'
import { scrollToContact } from './utils/scrollToContact'

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

        {/* Partner logos — same canonical block as HomeBottomSections.tsx
            (Figma node 82:246), reusing the shared asset set instead of this
            section's own separately-cropped logo files, so this exact
            designer-updated layout is identical across Home/Shruti and
            Messenger rather than drifting into its own grid/spacing. */}
        <div className="flex flex-col gap-6 items-start justify-center opacity-90 w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0 opacity-80 w-full">
            <img alt="" className="h-[106px] w-[205px] object-contain" src={images11} />
            <img alt="" className="h-[70px] w-[197px] object-contain" src={images21} />
            <img alt="" className="h-[90px] w-[166px] object-contain" src={images31} />
            <img alt="" className="h-[93px] w-[188px] object-contain" src={images41} />
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-0 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-0 opacity-80 w-full md:w-[867px]">
              <img alt="" className="h-[83px] w-[167px] object-contain" src={images2} />
              <img alt="" className="h-[66px] w-[205px] object-contain" src={a5e5bd2a} />
              <img alt="" className="h-[87px] w-[160px] object-contain" src={bsnlLogo1} />
            </div>
            <p className="font-mono font-semibold text-[#9f3bf6] text-3xl md:text-[40px] tracking-[-1px] leading-[33px] m-0">
              and 100+
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
