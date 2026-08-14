import {
  screenshot50914,
  weuiArrowOutlined,
  siQuoteFill,
  solarArrowUpOutline,
  images2,
  a5e5bd2a,
  bsnlLogo1,
  images11,
  images21,
  images31,
  images41,
  line8,
  vector4,
  group5,
  group6,
  group7,
  vector5,
  vector6,
  vector7,
  group1707491469,
} from "../assets";

const formFields = [
  { label: "Email", optional: false },
  { label: "Full Name", optional: false },
  { label: "Company Name", optional: false },
  { label: "How did you know about us ?", optional: true },
];

const footerLinks = ["About us", "ViH Shruti", "ViH Viveka", "ViH Kshetra "];

export default function BottomSections() {
  return (
    <div className="absolute flex flex-col gap-[135px] items-center left-0 top-[4442px]">
      {/* Product screenshot / "What sets Viveka apart" */}
      <div className="h-[618px] relative shrink-0 w-[1244px]">
        <img
          alt="Product feature comparison"
          className="absolute inset-0 object-cover size-full"
          src={screenshot50914}
        />
      </div>

      {/* CCCAAA panel */}
      <div className="bg-[#f8f9fb] h-[684px] overflow-hidden relative shrink-0 w-[1440px]">
        <button className="absolute flex flex-col gap-[48px] items-center left-[162px] top-[228px] w-[1117px] cursor-pointer bg-transparent border-none">
          <div className="flex flex-col h-[250px] justify-center w-full">
            <p className="font-['Roboto_Condensed'] font-semibold text-[276px] tracking-[28px] m-0 leading-[65px] text-center">
              <span className="text-[#040404]">CC</span>
              <span className="text-[#c2c2c2]">CAAA</span>
            </p>
          </div>
          <p className="text-[20px] tracking-[-1px] text-left w-[523px] m-0 leading-[33px]">
            <span className="text-[#1d1d1d]">Capture Content : </span>
            <span className="font-normal text-[#5a5a5a]">
              Collect messages, emails, calls, meetings, documents, and tickets from every
              communication channel.
            </span>
          </p>
        </button>
        <div className="absolute bg-[rgba(243,248,255,0.23)] flex items-center justify-center left-[623px] p-[10px] rounded-[12px] top-[65px]">
          <p className="font-normal text-[18px] text-black text-center tracking-[-1px] w-[174px] m-0 leading-[16px]">
            How we do it
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <div className="flex flex-col gap-[144px] items-end shrink-0 w-[1240px]">
        <div className="flex flex-col gap-[75px] items-end w-full relative">
          <h2 className="font-light text-[#040404] text-[36px] tracking-[-1px] w-full m-0 leading-[48px]">
            We're proud to partner with industry leaders and global innovators here's what
            they're saying about working with ViH Metaverse
          </h2>
          <button className="absolute bg-[#232323] flex gap-[10px] h-[45px] items-center justify-center left-0 px-[16px] py-[8px] rounded-[8px] top-[126px] cursor-pointer">
            <span className="font-medium text-[16px] text-white">Contact sales</span>
            <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
          </button>
          <div className="bg-[rgba(138,138,139,0.03)] flex items-start justify-between px-[45px] py-[24px] rounded-[8px] shrink-0 w-[756px]">
            <div className="flex flex-col gap-[24px] items-center shrink-0 w-[161px]">
              <div className="flex flex-col items-center w-full">
                <img alt="" className="size-[80px]" src={siQuoteFill} />
                <div className="flex flex-col items-center text-[#040404] text-[18px] text-center tracking-[-1px]">
                  <p className="m-0 leading-[41px]">Mukesh Ambani</p>
                  <p className="m-0 leading-[41px]">Chairman of RIL</p>
                </div>
              </div>
              <div className="flex gap-[13px] items-center">
                <div className="bg-[rgba(191,191,191,0.25)] flex items-center justify-center p-[6px] rounded-[26px]">
                  <img alt="" className="size-[20px] rotate-[270deg]" src={solarArrowUpOutline} />
                </div>
                <div className="bg-[rgba(191,191,191,0.25)] flex items-center justify-center p-[6px] rounded-[26px]">
                  <img alt="" className="size-[20px] rotate-90" src={solarArrowUpOutline} />
                </div>
              </div>
            </div>
            <p className="text-[#040404] text-[24px] text-right tracking-[-1px] w-[476px] m-0 leading-[33px]">
              ViH's integration of the Reliance Research Suite was simple, enjoyable, and
              impactful. Their team has a deep technical understanding and knows the AI market
              inside out, which made the entire process smooth and fun.
            </p>
          </div>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col gap-[24px] items-start justify-center opacity-90 w-full">
          <div className="flex items-start justify-between opacity-80 w-full">
            <img alt="" className="h-[106px] w-[205px] object-contain" src={images11} />
            <img alt="" className="h-[70px] w-[197px] object-contain" src={images21} />
            <img alt="" className="h-[90px] w-[166px] object-contain" src={images31} />
            <img alt="" className="h-[93px] w-[188px] object-contain" src={images41} />
          </div>
          <div className="flex items-end justify-between w-full">
            <div className="flex items-center justify-between opacity-80 w-[867px]">
              <img alt="" className="h-[83px] w-[167px] object-contain" src={images2} />
              <img alt="" className="h-[66px] w-[205px] object-contain" src={a5e5bd2a} />
              <img alt="" className="h-[87px] w-[160px] object-contain" src={bsnlLogo1} />
            </div>
            <p className="font-['Roboto_Mono'] font-semibold text-[#9f3bf6] text-[40px] text-right tracking-[-1px] w-[293px] m-0 leading-[33px]">
              and 100+
            </p>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-[rgba(208,208,208,0.35)] h-[698px] overflow-hidden relative rounded-[24px] shrink-0 w-[1240px]">
        <h2 className="-translate-y-1/2 absolute font-normal text-[#040404] text-[42px] left-[33px] top-[60px] tracking-[-1px] w-[274px] m-0 leading-[44px]">
          Get in touch
        </h2>
        <form className="absolute flex flex-col gap-[56px] items-start left-[534px] top-[60px] w-[612px]">
          {formFields.map((field) => (
            <div className="flex flex-col gap-[16px] items-start w-full" key={field.label}>
              <div className="flex justify-between items-start w-full text-[24px] tracking-[-1px]">
                <span className="text-[#040404] leading-[44px]">{field.label}</span>
                {field.optional && (
                  <span className="text-[#6d6c6c] leading-[44px]">OPTIONAL</span>
                )}
              </div>
              <div className="h-0 w-full relative">
                <img alt="" className="block max-w-none size-full" src={line8} />
              </div>
            </div>
          ))}
        </form>
        <button
          type="submit"
          className="absolute bg-[rgba(0,0,0,0.47)] border border-[#828282] border-solid flex h-[52px] items-center justify-center left-[534px] px-[8px] py-[4px] rounded-[12px] top-[554px] w-[612px] cursor-pointer"
        >
          <span className="font-['Roboto_Mono'] font-normal text-[20px] text-white tracking-[0.12px]">
            Send
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="h-[439px] overflow-hidden relative rounded-[24px] shrink-0 w-[1440px]">
        <div className="absolute flex items-center justify-between left-[99px] top-[40px] w-[1240px]">
          <h2 className="font-['Roboto_Condensed'] font-normal text-[#040404] text-[42px] tracking-[-1px] w-[608px] m-0 leading-[56px] text-center">
            Communication Intelligence, Reimagined.
          </h2>
          <div className="relative shrink-0 w-[161px] h-[80px]">
            <div className="absolute h-[64px] left-0 top-[2px] w-[64px]">
              <img alt="" className="block max-w-none size-full" src={vector4} />
            </div>
            <div className="absolute h-[63px] left-[18px] top-0 w-[70px]">
              <img alt="" className="block max-w-none size-full" src={group5} />
            </div>
            <div
              className="absolute h-[97px] left-[-18px] top-[-16px] w-[97px]"
              style={{ maskImage: `url("${group6}")` }}
            >
              <img alt="" className="block max-w-none size-full" src={group7} />
            </div>
            <div className="absolute h-[39px] left-[108px] top-[26px] w-[36px]">
              <img alt="" className="block max-w-none size-full" src={vector5} />
            </div>
            <div className="absolute h-[42px] left-[88px] top-[23px] w-[8px]">
              <img alt="" className="block max-w-none size-full" src={vector6} />
            </div>
            <div className="absolute h-[39px] left-[27px] top-[26px] w-[53px]">
              <img alt="" className="block max-w-none size-full" src={vector7} />
            </div>
            <div className="absolute h-[9px] left-[47px] top-[75px] w-[97px]">
              <img alt="" className="block max-w-none size-full" src={group1707491469} />
            </div>
          </div>
        </div>

        <div className="absolute flex items-center justify-between left-[100px] top-[246px] w-[1240px]">
          <div className="flex flex-col h-[125px] items-start justify-between">
            <div className="flex gap-[40px] items-center">
              {footerLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-[4px] text-[#080808] text-[20px] tracking-[0.12px]"
                >
                  {label}
                  <span className="rotate-45 inline-block">↗</span>
                </a>
              ))}
            </div>
            <p className="text-[20px] text-black m-0">sales@vihmetaverse.com</p>
          </div>
          <div className="flex flex-col gap-[24px] items-end text-right w-[281px]">
            <p className="font-medium text-[20px] text-black w-[265px] m-0">
              ViH Meteverse Pvt Ltd
            </p>
            <p className="text-[#03124c] text-[20px] w-[265px] m-0 leading-[26px]">
              HQ: Unit 337, JMD Megapolis, Sector 48, Sohna Road,
              <br />
              Gurugram, Haryana 122018
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
