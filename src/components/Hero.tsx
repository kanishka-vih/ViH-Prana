import { weuiArrowOutlined, image1436 } from "../assets";

const connectedLabels = ["All calls recorded", "Connected", "Connected", "Connected"];

export default function Hero() {
  return (
    <div className="absolute flex flex-col gap-[70px] items-center left-[100px] top-[212px] w-[1240px]">
      <div className="flex h-[207px] items-start justify-between w-[1241px]">
        <div className="flex flex-col gap-[42px] h-[207px] items-start w-[591px]">
          <h1 className="font-light leading-[63px] text-[52px] text-black tracking-[-2.16px] w-[608px] m-0">
            Viveka turns every sales call into the next step.
          </h1>
          <div className="flex items-start">
            <button className="bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer">
              <span className="font-medium text-[16px] text-white">Contact sales</span>
              <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
            </button>
          </div>
        </div>
        <p className="font-light leading-[32px] text-[24px] text-black tracking-[-1px] w-[358px] m-0">
          Viveka turns thousands of calls into clear priorities who to call, where the risks
          are, and who needs coaching.
        </p>
      </div>

      <div className="bg-[#f4f4f4] border border-[#e8e8e8] border-solid h-[588px] overflow-clip relative rounded-[24px] w-[1240px]">
        <div className="absolute h-[523px] left-[42px] rounded-[24px] top-[31px] w-[1000px]">
          <img
            alt="Dashboard preview"
            className="absolute inset-0 object-cover rounded-[24px] size-full"
            src={image1436}
          />
        </div>
        {[
          { top: 47, bgX: -173, bgY: -92 },
          { top: 175, bgX: -375.8, bgY: -91 },
          { top: 309, bgX: -580.5, bgY: -90 },
          { top: 420, bgX: -779.3, bgY: -91 },
        ].map(({ top, bgX, bgY }, i) => (
          <div
            key={i}
            className="absolute h-[82px] left-[1014px] rounded-[24px] w-[191px] overflow-hidden"
            style={{
              top,
              backgroundImage: `url(${image1436})`,
              backgroundSize: "1000px 523px",
              backgroundPosition: `${bgX}px ${bgY}px`,
            }}
          />
        ))}
        {[145, 277, 404, 522].map((top, i) => (
          <div
            key={i}
            className="-translate-y-1/2 absolute font-light text-[16px] text-black tracking-[-1px] leading-[32px]"
            style={{ left: i === 0 ? 1103 : 1137, top }}
          >
            {connectedLabels[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
