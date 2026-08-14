import { useState } from "react";
import { weuiArrowOutlined } from "../../assets";
import {
  rectangleGeneric,
  rectangleGeneric2,
  nbfcShowcase,
  rectangleAvatar,
  playRing,
  playIcon,
} from "../../assets/shruti";
import { scrollToContactForm } from "../../lib/scrollToContact";

type Category = { id: string; name: string; description: string; image: string };

const CATEGORIES: Category[] = [
  {
    id: "education",
    name: "Education",
    description: "Handles admissions enquiries and counselling callbacks.",
    image: rectangleGeneric,
  },
  {
    id: "nbfc",
    name: "NBFC",
    description: "Payment reminders and collections, in the customer's own language.",
    image: nbfcShowcase,
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Confirms bookings and sends itineraries mid-call.",
    image: rectangleAvatar,
  },
];

export default function ShrutiHero() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [tab, setTab] = useState<"voice" | "chat">("voice");

  const len = CATEGORIES.length;
  const leftIndex = (activeIndex - 1 + len) % len;
  const rightIndex = (activeIndex + 1) % len;
  const center = CATEGORIES[activeIndex];
  const left = CATEGORIES[leftIndex];
  const right = CATEGORIES[rightIndex];

  const goPrev = () => setActiveIndex(leftIndex);
  const goNext = () => setActiveIndex(rightIndex);

  return (
    <div className="flex flex-col gap-[70px] items-center w-full">
      <div className="flex h-[207px] items-start justify-between w-[1241px]">
        <div className="flex flex-col gap-[42px] h-[207px] items-start w-[565px]">
          <h1 className="font-light leading-[59px] text-[52px] text-black tracking-[-2.16px] w-[439px] m-0">
            If it's Speech, it's Shruti
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
        <p className="font-normal text-[#555] text-[24px] tracking-[-1px] w-[309px] m-0 leading-[32px]">
          Real-time speech AI with customised voice bots built for your business.
        </p>
      </div>

      <div className="bg-[#f4f4f4] border border-[#e8e8e8] border-solid h-[588px] overflow-hidden relative rounded-[24px] w-[1240px]">
        {/* Decorative edge peeks — hint that the carousel continues past what's shown */}
        <div className="absolute left-[-56px] top-[172px] size-[165px] rounded-full overflow-hidden opacity-60 pointer-events-none">
          <img alt="" className="size-full object-cover" src={rectangleGeneric} />
        </div>
        <div className="absolute left-[1116px] top-[172px] size-[165px] rounded-full overflow-hidden opacity-60 pointer-events-none">
          <img alt="" className="size-full object-cover" src={rectangleGeneric2} />
        </div>

        {/* Left (previous) category */}
        <button
          type="button"
          onClick={goPrev}
          aria-label={`Show ${left.name}`}
          className="absolute left-[203px] top-[153px] size-[199px] rounded-full overflow-hidden cursor-pointer border-none p-0"
        >
          <img alt="" className="size-full object-cover" src={left.image} />
        </button>
        <div className="absolute left-[202px] top-[406px] w-[202px] flex flex-col gap-[10px] items-center text-center">
          <p className="text-[#696969] text-[20px] tracking-[-0.8px] m-0 leading-[24px]">{left.name}</p>
          <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px]">{left.description}</p>
        </div>

        {/* Center (active) category */}
        <div className="absolute left-[485px] top-[120px] size-[257px] rounded-full overflow-hidden">
          <img alt="" className="size-full object-cover" src={center.image} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-[97px] top-[97px] size-[64px]">
            <img alt="" className="size-full" src={playRing} />
            <img alt="" className="absolute left-[20px] top-[20px] size-[24px]" src={playIcon} />
          </div>
        </div>
        <div className="absolute left-[460px] top-[396px] flex gap-[34px] items-center">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous category"
            className="flex items-center justify-center cursor-pointer bg-transparent border-none p-0 rotate-180"
          >
            <img alt="" className="h-[32px] w-[16px]" src={weuiArrowOutlined} />
          </button>
          <div className="flex flex-col gap-[10px] items-center justify-center text-center w-[206px]">
            <p className="text-[20px] text-black tracking-[-0.8px] m-0 leading-[24px]">{center.name}</p>
            <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px] w-[206px]">
              {center.description}
            </p>
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next category"
            className="flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
          >
            <img alt="" className="h-[32px] w-[16px]" src={weuiArrowOutlined} />
          </button>
        </div>

        {/* Right (next) category */}
        <button
          type="button"
          onClick={goNext}
          aria-label={`Show ${right.name}`}
          className="absolute left-[825px] top-[153px] size-[199px] rounded-full overflow-hidden cursor-pointer border-none p-0 bg-white"
        >
          <img alt="" className="size-full object-cover" src={right.image} />
        </button>
        <div className="absolute left-[826px] top-[406px] w-[202px] flex flex-col gap-[10px] items-center text-center">
          <p className="text-[#696969] text-[20px] tracking-[-0.8px] m-0 leading-[24px]">{right.name}</p>
          <p className="text-[#6a6a6a] text-[14px] tracking-[-0.56px] m-0 leading-[18px]">{right.description}</p>
        </div>

        {/* Edge fade masks so the peek circles taper into the card background */}
        <div
          className="absolute left-0 top-0 h-full w-[164px] rounded-l-[24px] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(90deg, #f4f4f4 7.4%, rgba(244,244,244,0) 95%)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-[164px] rounded-r-[24px] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(270deg, #f4f4f4 7.4%, rgba(244,244,244,0) 95%)" }}
        />

        {/* Bottom bar: language + contact sales */}
        <div className="absolute left-[91px] right-[91px] top-[507px] h-[46px] flex items-center justify-between">
          <div className="flex gap-[5px] items-center">
            <span className="size-[38px] rounded-full overflow-hidden border-4 border-white bg-white block">
              <img alt="" className="size-full object-cover" src={rectangleAvatar} />
            </span>
            <span className="text-[20px] text-black text-center tracking-[-0.8px]">English</span>
            <img alt="" className="h-[16px] w-[32px] rotate-90" src={weuiArrowOutlined} />
          </div>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] cursor-pointer"
          >
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
        </div>

        {/* Voice / Chat toggle */}
        <div className="absolute left-[454px] top-[33px] flex gap-[8px] items-end">
          <button
            type="button"
            onClick={() => setTab("voice")}
            className={`h-[40px] w-[128px] flex items-center justify-center rounded-[12px] border cursor-pointer transition-colors ${
              tab === "voice" ? "bg-white border-[#e8e8e8]" : "bg-transparent border-transparent"
            }`}
          >
            <span className="text-[#504e47] text-[20px] tracking-[-0.8px]">Voice</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("chat")}
            className={`h-[37px] w-[129px] flex items-center justify-center rounded-[24px] border cursor-pointer transition-colors ${
              tab === "chat" ? "bg-white border-[#e8e8e8]" : "bg-transparent border-transparent"
            }`}
          >
            <span className="text-[#504e47] text-[20px] tracking-[-0.8px]">Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
