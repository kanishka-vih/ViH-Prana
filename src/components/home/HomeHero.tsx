import HeroVideo from "./HeroVideo";
import HomeTrustedBy from "./HomeTrustedBy";
import { weuiArrowOutlined } from "../../assets";
import { scrollToContactForm } from "../../lib/scrollToContact";

export default function HomeHero() {
  return (
    <div className="bg-[#f7f7f8] relative overflow-hidden w-full h-[1689px]">
      <div className="absolute left-[101px] top-[208px] w-[1241px] h-[186px]">
        <div className="flex flex-col gap-[20px] items-start w-[895px]">
          <h1 className="font-light leading-[54px] text-[52px] text-black tracking-[-2.16px] w-[439px] m-0">
            Your Left Brain, Reimagined
          </h1>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] cursor-pointer"
          >
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
        </div>
        <p className="-translate-y-1/2 absolute font-normal leading-[32px] left-[905px] text-[#555] text-[24px] top-[53px] tracking-[-1px] w-[336px] m-0">
          Give your enterprise a lasting memory by curing corporate amnesia and ending brain
          drain.
        </p>
      </div>

      <div className="absolute border border-[#dfdfdf] border-solid h-[627px] left-[101px] rounded-[24px] top-[460px] w-[1237px]">
        <HeroVideo />
      </div>

      <div className="absolute left-[104px] top-[1206px] w-[1221px]">
        <HomeTrustedBy />
      </div>
    </div>
  );
}
