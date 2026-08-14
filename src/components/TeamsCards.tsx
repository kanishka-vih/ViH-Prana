import {
  demoOrbWebp,
  demoOrbWebp1,
  streamlineCustomerSupport,
  streamlineDecentWork,
  famiconsCall,
} from "../assets";

const cards = [
  {
    title: "Customer Support",
    description: "Resolve once. Auto-close duplicate tickets and keep every channel informed",
    orb: demoOrbWebp,
    orbGradient:
      "linear-gradient(96.94deg, rgb(255,222,254) 16.091%, rgb(255,103,249) 92.737%, rgb(154,0,255) 146.11%, rgb(149,44,246) 225.38%, rgb(99,40,241) 304.35%, rgb(234,225,255) 383.32%)",
    icon: streamlineCustomerSupport,
    descWidth: 298,
  },
  {
    title: "Sales Pipeline",
    description: "One thread per prospect. AI drafts the next-best reply in your voice.",
    orb: demoOrbWebp1,
    orbGradient:
      "linear-gradient(124.4deg, rgb(255,222,254) 20.569%, rgb(154,0,255) 82.784%, rgb(255,103,249) 171.2%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    icon: streamlineDecentWork,
    descWidth: 237,
  },
  {
    title: "Internal Comms",
    description: "One searchable timeline from Slack, email, and calls.",
    orb: null,
    orbGradient:
      "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%), linear-gradient(90deg, rgb(0,0,0) 0%, rgb(0,0,0) 100%)",
    icon: famiconsCall,
    descWidth: 239,
  },
];

function TeamCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <div className="bg-[#fafafa] border border-[#cfcfcf] border-solid flex flex-col items-start overflow-hidden px-[22px] py-[20px] rounded-[24px] shrink-0 w-[401px]">
      <div className="flex flex-col gap-[10px] items-start w-full">
        <div className="flex h-[42px] items-start justify-between w-full">
          <p className="font-normal text-[20px] text-black tracking-[0.2px] w-[195px] m-0 leading-[34px]">
            {card.title}
          </p>
          <div
            className="relative rounded-[200px] shrink-0 size-[42px] overflow-hidden"
            style={{ backgroundImage: card.orb ? undefined : card.orbGradient }}
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
        <p
          className="font-normal text-[14px] text-black tracking-[0.14px] m-0 leading-[20px]"
          style={{ width: card.descWidth }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function TeamsCards() {
  return (
    <div className="absolute bg-white h-[525px] left-0 overflow-hidden top-[3882px] w-[1440px]">
      <div className="absolute flex items-center justify-center left-[100px] top-0 w-[1240px]">
        <div className="flex flex-col gap-[40px] items-start flex-1">
          <h2 className="font-light text-[36px] text-black tracking-[-1.2px] w-[381px] m-0 leading-[40px]">
            Built for the teams
            <br />
            that actually answer.
          </h2>
          <div className="flex items-center justify-between w-full">
            {cards.map((card) => (
              <TeamCard key={card.title} card={card} />
            ))}
          </div>
          <div className="flex items-center justify-between w-full">
            {cards.map((card) => (
              <TeamCard key={`${card.title}-2`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
