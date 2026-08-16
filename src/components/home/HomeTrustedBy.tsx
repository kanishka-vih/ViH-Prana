import { images11, images21, images31, images41, images2, bsnlLogo1, a5e5bd2a } from "../../assets";

// The full 7-logo set from Figma's PartnerLogosGrid (node 317:1207) — Star
// Health, Chola, Jain, Kapston, Tata Play Fiber, BSNL, SMC Insurance — in
// the same order as that frame.
const logos = [images11, images21, images31, images41, images2, bsnlLogo1, a5e5bd2a];

export default function HomeTrustedBy() {
  return (
    <div className="flex items-center gap-[48px] w-[1221px]">
      <p className="font-normal text-[#737373] text-[20px] tracking-[-1px] leading-[26px] w-[217px] shrink-0 m-0">
        We are trusted by people by multiple domains
      </p>
      <div className="marquee-mask relative flex-1 overflow-hidden opacity-[0.76]">
        <div className="marquee-track flex items-center gap-[64px] w-max">
          {[...logos, ...logos].map((logo, i) => (
            // Sized by height only (no fixed-width box) — each logo's own
            // edges are what the flex `gap` measures from, so the visual
            // spacing between logos comes out even. A fixed-width box with
            // object-contain instead would letterbox narrower/squarer logos,
            // making the gap on either side of those look bigger than the
            // gap around a wide banner-shaped logo despite the same gap value.
            <img key={i} alt="" className="h-[56px] w-auto shrink-0" src={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
