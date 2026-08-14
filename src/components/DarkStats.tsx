import { frame2043683721, screenshot60035 } from "../assets";

export default function DarkStats() {
  return (
    <div className="absolute bg-[#171718] h-[862px] left-0 top-[1646px] w-[1440px]">
      <div className="absolute h-[904px] left-[-216px] top-[-363px] w-[1872px]">
        <img alt="" className="block max-w-none size-full" src={frame2043683721} />
      </div>
      <div
        className="absolute flex flex-col gap-[18px] items-center text-center left-[374px]"
        style={{ top: -209 }}
      >
        <h2 className="font-light text-[#fefefe] text-[36px] tracking-[-1.2px] leading-[40px] w-[434px] m-0">
          Stop listening to every call. Start acting on what matters.
        </h2>
        <p className="font-normal text-[20px] text-white tracking-[-1px] leading-[24px] w-[697px] m-0">
          Automated documentation, live dashboards, and proactive insights give supervisors
          the clarity to make faster decisions, optimize performance, and protect the
          business.
        </p>
      </div>
      <div className="absolute h-[777px] left-[108px] top-0 w-[1223px] rounded-[24px] overflow-hidden">
        <img
          alt="Call intelligence dashboard"
          className="absolute inset-0 object-cover size-full"
          src={screenshot60035}
        />
      </div>
    </div>
  );
}
