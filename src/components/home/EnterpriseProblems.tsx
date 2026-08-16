import { useEffect, useRef, useState } from "react";
import { frame2043683721 } from "../../assets";
import {
  ellipse2323,
  ellipse2349,
  ellipse2335,
  ellipse2338,
  ellipse2342,
  ellipse2324,
  ellipse2325,
  ellipse2329,
} from "../../assets/home";

const bubbles = [
  { img: ellipse2323, left: 575, top: 212 },
  { img: ellipse2349, left: 395, top: 255 },
  { img: ellipse2349, left: 429, top: 126 },
  { img: ellipse2349, left: 352, top: 83 },
  { img: ellipse2349, left: 309, top: -18 },
  { img: ellipse2323, left: 644, top: 140 },
  { img: ellipse2335, left: 687, top: 61 },
  { img: ellipse2335, left: 720, top: -35 },
  { img: ellipse2335, left: 707, top: 204 },
  { img: ellipse2338, left: 936, top: 235 },
  { img: ellipse2338, left: 867, top: 286 },
  { img: ellipse2338, left: 867, top: 376 },
  { img: ellipse2338, left: 793, top: 329 },
  { img: ellipse2342, left: 781, top: 243 },
  { img: ellipse2342, left: 855, top: 200 },
  { img: ellipse2342, left: 858, top: 114 },
  { img: ellipse2342, left: 781, top: 157 },
  { img: ellipse2342, left: 707, top: 204 },
  { img: ellipse2342, left: 707, top: 290 },
  { img: ellipse2324, left: 585, top: 298 },
  { img: ellipse2325, left: 601, top: 61 },
  { img: ellipse2325, left: 628, top: -25 },
  { img: ellipse2329, left: 653, top: -111 },
  { img: ellipse2329, left: 515, top: -3 },
  { img: ellipse2329, left: 515, top: 83 },
  { img: ellipse2329, left: 438, top: 40 },
  { img: ellipse2329, left: 438, top: -46 },
  { img: ellipse2324, left: 499, top: 176 },
  { img: ellipse2324, left: 499, top: 262 },
];

export default function EnterpriseProblems() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Replays every time this section re-enters the viewport, same as the
    // other scroll-reveal sections — scrolling away resets it so scrolling
    // back down plays the reveal again.
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#171718] relative w-full h-[732px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.5) 1.3px, transparent 1.3px)",
        backgroundSize: "37px 37px",
      }}
    >
      <div className="absolute h-[904px] left-[-216px] top-[-363px] w-[1872px]">
        <img alt="" className="block max-w-none size-full" src={frame2043683721} />
      </div>

      <div
        className="absolute flex items-center justify-center left-[608px] p-[10px] rounded-[12px]"
        style={{ top: -272 }}
      >
        <p className="font-normal text-[#c2bdbd] text-[24px] text-center tracking-[-1px] w-[209px] m-0 leading-[16px]">
          Enterprise Problems
        </p>
      </div>

      {bubbles.map((b, i) => (
        <div key={i} className="absolute size-[86px]" style={{ left: b.left, top: b.top }}>
          <img alt="" className="block max-w-none size-full" src={b.img} />
        </div>
      ))}

      <div
        className={`absolute bg-[rgba(88,88,88,0.68)] backdrop-blur-md border border-white/10 flex flex-col h-[214px] items-start left-[909px] overflow-hidden px-[22px] py-[20px] rounded-[24px] w-[401px] ${
          active ? "panel-fade-rise-in" : "opacity-0"
        }`}
        style={{ top: 372, animationDelay: active ? "0.15s" : undefined }}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex gap-[8px] items-start">
            <p className="leading-[23px] text-[60px] text-white w-[131px] m-0">42%</p>
            <p className="leading-[23px] text-[#b6b6b6] text-[12px] w-[119px] m-0">
              Critical knowledge{" "}
            </p>
          </div>
          <p className="font-light leading-[24px] text-[#d6d6d6] text-[18px] w-[322px] m-0">
            When people leave, the knowledge they carry leaves with them—creating
            organizational brain drain.
          </p>
        </div>
      </div>

      <div
        className={`absolute bg-[rgba(88,88,88,0.68)] backdrop-blur-md border border-white/10 flex flex-col h-[214px] items-start left-[89px] overflow-hidden px-[22px] py-[20px] rounded-[24px] w-[401px] ${
          active ? "panel-fade-rise-in" : "opacity-0"
        }`}
        style={{ top: -94, animationDelay: active ? "0s" : undefined }}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex gap-[8px] items-start">
            <p className="leading-[23px] text-[60px] text-white w-[131px] m-0">$8M</p>
            <p className="leading-[23px] text-[#b6b6b6] text-[12px] w-[119px] m-0">
              Annual loss
            </p>
          </div>
          <p className="font-light leading-[24px] text-[#d6d6d6] text-[18px] w-[322px] m-0">
            Annual loss for a 3,000-employee business from repeating mistakes already made.
          </p>
        </div>
      </div>

      <p
        className="-translate-y-1/2 absolute font-normal left-[91px] text-[#b1b1b1] text-[20px] tracking-[-1px] w-[412px] m-0 whitespace-pre-wrap"
        style={{ top: 547 }}
      >
        <span className="leading-[26px] text-white">Brain drain </span>
        <span className="leading-[26px]">
          {" "}
          is the loss of critical expertise when employees leave, causing knowledge gaps,
          repeated mistakes, and slower onboarding.
        </span>
      </p>

      <p
        className="-translate-y-1/2 absolute font-normal left-[909px] text-[#b1b1b1] text-[20px] tracking-[-1px] w-[401px] m-0"
        style={{ top: -46 }}
      >
        <span className="leading-[26px] text-white">Corporate amnesia </span>
        <span className="leading-[26px]">
          Corporate amnesia is the loss of organisational knowledge and context, leaving teams
          with fragmented information and disconnected customer histories.
        </span>
      </p>
    </div>
  );
}
