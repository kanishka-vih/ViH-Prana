import { images2, a5e5bd2a, bsnlLogo1, images11 } from "../../assets";

const logos = [images2, a5e5bd2a, bsnlLogo1, images11];

export default function HomeTrustedBy() {
  return (
    <div className="flex items-center gap-[48px] w-[1221px]">
      <p className="font-normal text-[#737373] text-[20px] tracking-[-1px] leading-[26px] w-[217px] shrink-0 m-0">
        We are trusted by people by multiple domains
      </p>
      <div className="marquee-mask relative flex-1 overflow-hidden opacity-[0.76]">
        <div className="marquee-track flex items-center gap-[64px] w-max">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              alt=""
              className="h-[70px] w-[150px] object-contain shrink-0"
              src={logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
