import { useEffect, useRef, useState } from "react";
import { polygon33, group, fluentPeopleCommunity, group1 } from "../../assets";
import CallMinutesChart from "./charts/CallMinutesChart";
import IntentDistributionChart from "./charts/IntentDistributionChart";
import HourlyDistributionChart from "./charts/HourlyDistributionChart";

const features = [
  {
    title: "Call Intelligence",
    description:
      "Track call minutes, recordings, intent, pickup rates, and live performance from one unified dashboard.",
    icon: group,
  },
  {
    title: "Intent",
    description:
      "Detects customer intent in real time to deliver accurate, contextual, and goal-driven conversations.",
    icon: fluentPeopleCommunity,
  },
  {
    title: "Workflows",
    description:
      "Tailored workflows that align with your business, products, processes, and customer journeys.",
    icon: group1,
  },
];

export default function ShrutiVisibility() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // The charts only start their draw-in / count-up once this section is
    // actually on screen — mounting them off-screen already animated would
    // waste the "coming alive like a live demo" effect scrolling past them.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-[69px] items-center w-full">
      <div className="flex h-[72px] items-start justify-between tracking-[-1px] w-[1214px]">
        <h2 className="font-light text-[36px] text-black w-[456px] m-0 leading-[36px]">
          Real-Time Visibility Across Every Interaction
        </h2>
        <p className="font-normal text-[#585858] text-[20px] w-[480px] m-0 leading-[24px]">
          Automated documentation, live dashboards, and proactive insights give supervisors the
          clarity to make faster decisions, optimize performance, and protect the business.
        </p>
      </div>

      <div className="bg-white h-[979px] overflow-hidden relative w-full">
        <div className="absolute flex items-center justify-center left-[209px] size-[1041px] top-[-11px] rotate-[13.57deg] pointer-events-none">
          <img alt="" className="w-[863px] h-[863px]" src={polygon33} />
        </div>

        <div
          className="absolute h-[570px] left-[100px] overflow-hidden rounded-[24px] top-0 w-[701px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.2) 0%, rgba(243,248,255,0.2) 100%)",
          }}
        >
          <div className="absolute left-[22px] top-[20px]">
            <CallMinutesChart active={active} />
          </div>
          <div className="absolute flex flex-col gap-[8px] items-start left-[25px] text-[#212121] top-[496px] w-[657px]">
            <p className="text-[20px] m-0 leading-[23px]">Analytics</p>
            <p className="text-[18px] m-0 leading-[23px]">
              Easily measure success rates and CX metrics, optimising flows over time.
            </p>
          </div>
        </div>

        <div className="absolute flex items-center justify-between left-[100px] top-[597px] w-[1240px]">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[rgba(235,235,235,0.68)] border border-[#cfcfcf] border-solid flex flex-col items-start overflow-hidden px-[22px] py-[20px] rounded-[24px] w-[401px]"
            >
              <div className="flex flex-col h-[177px] items-start justify-between w-full">
                <img alt="" className="size-[24px]" src={feature.icon} />
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="text-[#212121] text-[20px] w-full m-0 leading-[23px]">
                    {feature.title}
                  </p>
                  <p className="text-[#121212] text-[18px] w-full m-0 leading-[24px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute h-[570px] left-[824px] overflow-hidden rounded-[24px] top-0 w-[516px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.2) 0%, rgba(243,248,255,0.2) 100%)",
          }}
        >
          <div className="absolute left-[22px] top-[20px]">
            <IntentDistributionChart active={active} />
          </div>
          <div className="absolute left-[22px] top-[241px]">
            <HourlyDistributionChart active={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
