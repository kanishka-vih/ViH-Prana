import arrowOutlined from '../../assets/messenger-figma/icon-arrow-outlined.svg'
import { scrollToContact } from '../utils/scrollToContact'

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 w-full">
      <div className="flex flex-col items-start gap-6 md:gap-[42px] max-w-[590px]">
        <h1 className="font-light text-[36px] md:text-[52px] leading-[44px] md:leading-[63px] tracking-[-1.2px] md:tracking-[-2.16px] text-black">
          One inbox for everything your business send
        </h1>
        <button
          type="button"
          onClick={scrollToContact}
          className="flex items-center gap-[10px] h-[45px] px-4 py-2 rounded-lg bg-[#232323] text-white transition-all duration-150 hover:bg-black active:scale-95 active:bg-black"
        >
          <span className="text-base font-medium">Contact sales</span>
          <img src={arrowOutlined} alt="" className="h-[33px] w-[16.5px]" />
        </button>
      </div>
      <p className="font-light text-xl md:text-2xl leading-[28px] md:leading-8 tracking-[-1px] text-black max-w-[313px]">
        Integrate with your app. Transform it into an AI-powered communication hub.
      </p>
    </div>
  )
}
