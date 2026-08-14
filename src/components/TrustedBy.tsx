import { images2, a5e5bd2a, bsnlLogo1 } from "../assets";

export default function TrustedBy() {
  return (
    <div className="absolute flex items-start justify-between left-[100px] top-[1155px] w-[1221px]">
      <p className="font-normal text-[#737373] text-[20px] tracking-[-1px] leading-[26px] w-[217px] m-0">
        We are trusted by people by multiple domains
      </p>
      <div className="flex h-[67px] items-center justify-between opacity-76 w-[826px]">
        <img alt="" className="h-[66.7px] w-[134.4px] object-contain" src={images2} />
        <img alt="" className="h-[53.2px] w-[164.5px] object-contain" src={a5e5bd2a} />
        <img alt="" className="h-[70.1px] w-[128.3px] object-contain" src={bsnlLogo1} />
        <img alt="" className="h-[70.1px] w-[128.3px] object-contain" src={bsnlLogo1} />
      </div>
    </div>
  );
}
