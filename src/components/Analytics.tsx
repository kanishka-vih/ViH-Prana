import {
  ellipse2292,
  polygon33,
  image10,
  image11,
  img639Dcee3,
  group,
  fluentPeopleCommunity,
  group1,
} from "../assets";

const featureCards = [
  {
    icon: group,
    title: "Call Intelligence",
    description:
      "Track call minutes, recordings, intent, pickup rates, and live performance from one unified dashboard.",
  },
  {
    icon: fluentPeopleCommunity,
    title: "Intent",
    description:
      "Detects customer intent in real time to deliver accurate, contextual, and goal-driven conversations.",
  },
  {
    icon: group1,
    title: "Workflows",
    description:
      "Tailored workflows that align with your business, products, processes, and customer journeys.",
  },
];

export default function Analytics() {
  return (
    <>
      <div className="absolute flex h-[600px] items-center justify-center left-[-266px] top-[2076px] w-[1910px] overflow-hidden pointer-events-none">
        <img alt="" className="block max-w-none w-[1910px] h-[600px] scale-y-[-1] rotate-180" src={ellipse2292} />
      </div>

      <div className="absolute flex flex-col gap-[69px] items-center left-0 top-[2762px] w-[1440px]">
        <div className="flex items-start justify-between tracking-[-1px] w-[1214px]">
          <h2 className="font-light text-[36px] text-black w-[456px] m-0 leading-[36px]">
            Real-Time Visibility Across Every Interaction
          </h2>
          <p className="font-normal text-[#585858] text-[20px] w-[480px] m-0 leading-[24px]">
            Automated documentation, live dashboards, and proactive insights give supervisors
            the clarity to make faster decisions, optimize performance, and protect the
            business.
          </p>
        </div>

        <div className="bg-white h-[979px] overflow-hidden relative w-full">
          <div
            className="absolute left-[209px] size-[1041px] top-[-11px] flex items-center justify-center rotate-[13.57deg] pointer-events-none"
          >
            <img alt="" className="w-[863px] h-[863px]" src={polygon33} />
          </div>

          <div
            className="absolute h-[570px] left-[100px] overflow-hidden rounded-[24px] top-0 w-[701px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.2) 0%, rgba(243,248,255,0.2) 100%)",
            }}
          >
            <div className="absolute h-[441px] left-[22px] rounded-[12px] top-[20px] w-[657px] overflow-hidden">
              <img alt="" className="absolute inset-0 object-cover size-full" src={image10} />
            </div>
            <div className="absolute flex flex-col gap-[8px] items-start left-[25px] text-[#212121] top-[496px] w-[657px]">
              <p className="text-[20px] m-0 leading-[23px]">Analytics </p>
              <p className="text-[18px] m-0 leading-[23px]">
                Easily measure success rates and CX metrics, optimising flows over time.
              </p>
            </div>
          </div>

          <div className="absolute flex items-center justify-between left-[100px] top-[597px] w-[1240px]">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="bg-[rgba(235,235,235,0.68)] border border-[#cfcfcf] border-solid flex flex-col items-start overflow-hidden px-[22px] py-[20px] rounded-[24px] shrink-0 w-[401px]"
              >
                <div className="flex flex-col h-[177px] items-start justify-between w-full">
                  <img alt="" className="size-[24px]" src={card.icon} />
                  <div className="flex flex-col gap-[8px] items-start w-full">
                    <p className="text-[#212121] text-[20px] w-full m-0 leading-[23px]">
                      {card.title}
                    </p>
                    <p className="text-[#121212] text-[18px] w-full m-0 leading-[24px]">
                      {card.description}
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
            <div className="absolute h-[199px] left-[22px] rounded-[12px] top-[20px] w-[472px] overflow-hidden">
              <img alt="" className="absolute inset-0 object-cover size-full" src={image11} />
            </div>
            <div className="absolute h-[309px] left-[22px] rounded-[12px] top-[241px] w-[472px] overflow-hidden">
              <img alt="" className="absolute inset-0 object-cover size-full" src={img639Dcee3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
