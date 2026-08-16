import { useEffect, useRef, useState } from "react";
import { demoOrbWebp, demoOrbWebp1, streamlineCustomerSupport, streamlineDecentWork } from "../../assets";
import { iconFileSystem } from "../../assets/shruti";

// The 3 concentric domes, rebuilt as plain circles instead of the flattened
// Figma export (a single raster image can't be split into independently
// animated pieces) — outer first so later ones paint on top, each one a
// big circle whose center sits below the section so only its top arc shows.
// Diameter/top for the outer two rings were measured directly off the
// Figma export (fit a circle to its actual boundary curve, sampled at
// ~35 points across the width) rather than eyeballed; the innermost ring
// isn't visible far enough into the reference render to fit the same way,
// so it's scaled down proportionally from the other two.
const RINGS = [
  { diameter: 2385, top: 0, color: "#0a1c38" },
  { diameter: 2100, top: 265, color: "#071428" },
  { diameter: 1550, top: 460, color: "#040c1c" },
];

const cards = [
  {
    title: "Improve customer experience",
    description:
      "Resolve inbound support end to end, at lower cost per resolution. Customers get instant answers; your team focuses on what needs a human.",
    orb: demoOrbWebp,
    orbGradient:
      "linear-gradient(96.94deg, rgb(255,222,254) 16.091%, rgb(255,103,249) 92.737%, rgb(154,0,255) 146.11%, rgb(149,44,246) 225.38%, rgb(99,40,241) 304.35%, rgb(234,225,255) 383.32%)",
    icon: streamlineCustomerSupport,
  },
  {
    title: "Drive growth across the funnel",
    description:
      "Qualify leads, recover abandoned carts, and run outbound at scale. Conversational agents convert at rates digital flows can't match.",
    orb: demoOrbWebp1,
    orbGradient:
      "linear-gradient(124.4deg, rgb(255,222,254) 20.569%, rgb(154,0,255) 82.784%, rgb(255,103,249) 171.2%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    icon: streamlineDecentWork,
  },
  {
    title: "Increase efficiency",
    description:
      "Automate scheduling, reminders, collections, and internal ops. Reach thousands in hours and free your team for higher-impact work.",
    orb: null,
    orbGradient:
      "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%)",
    icon: iconFileSystem,
  },
];

export default function ShrutiOutcomes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bounced, setBounced] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Replays the bounce every time this section re-enters the viewport —
    // scrolling away resets it (back to opacity-0) so scrolling back down
    // to it plays the entrance again, rather than firing only once ever.
    const observer = new IntersectionObserver(
      ([entry]) => setBounced(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-[769px] overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {RINGS.map((ring, i) => (
          <div
            key={ring.color}
            className={`absolute rounded-full left-1/2 ${bounced ? "shruti-ring-rise" : "opacity-0"}`}
            style={{
              width: ring.diameter,
              height: ring.diameter,
              top: ring.top,
              marginLeft: -ring.diameter / 2,
              backgroundColor: ring.color,
              // Staggered so the domes rise up one after another (outer to
              // inner) instead of all snapping into place together.
              animationDelay: bounced ? `${i * 0.18}s` : undefined,
            }}
          />
        ))}
        {/* Dot texture shared across all three rings, same technique as the
            Enterprise Problems section on the home page. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      <p className="absolute -translate-x-1/2 left-1/2 top-[206px] font-light text-[36px] text-[#fefefe] text-center tracking-[-1.2px] w-[697px] m-0 leading-[40px]">
        Voice and chat agents built to improve support, sales and operational outcomes
      </p>

      <div className="absolute left-[109px] top-[335px] flex items-center justify-between w-[1222px]">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="bg-[rgba(54,54,54,0.64)] border border-[#8e8e8e] border-solid flex flex-col h-[276px] items-start justify-center overflow-hidden px-[20px] py-[24px] rounded-[12px] w-[360px]"
          >
            <div className="flex flex-col h-[218px] items-start justify-between w-full">
              <div className="flex h-[45px] items-start justify-between w-full">
                <p className="font-normal text-[24px] text-white tracking-[0.24px] w-[208px] m-0 leading-[25px]">
                  {card.title}
                </p>
                <div
                  className={`relative rounded-full shrink-0 size-[42px] overflow-hidden ${bounced ? "shruti-orb-bounce" : "opacity-0"}`}
                  style={{
                    backgroundImage: card.orb ? undefined : card.orbGradient,
                    // Staggered so the three pop in one after another
                    // (left to right) instead of all at once.
                    animationDelay: bounced ? `${i * 0.15}s` : undefined,
                  }}
                >
                  {card.orb && (
                    <div className="absolute inset-0" style={{ backgroundImage: card.orbGradient }}>
                      <img
                        alt=""
                        className="absolute inset-0 object-cover size-full mix-blend-luminosity opacity-40"
                        src={card.orb}
                      />
                    </div>
                  )}
                  <img
                    alt=""
                    className="absolute size-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src={card.icon}
                  />
                </div>
              </div>
              <p className="font-normal text-[14px] text-white tracking-[0.14px] w-[295px] m-0 leading-[20px]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
