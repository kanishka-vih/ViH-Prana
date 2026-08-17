import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  polygon33,
  demoOrbWebp,
  demoOrbWebp1,
  streamlineCustomerSupport,
  streamlineDecentWork,
  famiconsCall,
  weuiArrowOutlined,
} from "../../assets";

const teamCards = [
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

const productCards = [
  {
    title: "ViH Shruti",
    description:
      "Shruti is the real-time, multilingual speech layer for the modern world, making conversations between people, and conversations with systems, clear, natural, and scalable.",
    orbGradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(255,103,249) 75.309%, rgb(172,57,248) 130.05%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    pillLabel: "Hands Free Voice Assistance",
    route: "/shruti",
  },
  {
    title: "ViH Viveka ",
    description:
      "ViH Viveka is an AI-powered call center and voice analytics platform developed by ViH Metaverse. It is designed to evaluate and enhance customer service interactions using real-time insights",
    orbGradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(154,0,255) 82.784%, rgb(255,103,249) 171.2%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    pillLabel: "Voice call analytics",
    // No dedicated ViH Viveka page exists yet — add its route here once one does.
    route: null as string | null,
  },
  {
    title: "ViH Messenger",
    description:
      "The enterprise communication layer built for scale. Integrate with your mobile application & transform it to a magnetisable powerful communication hub, powered by AI at its core.",
    orbGradient:
      "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%)",
    pillLabel: "SDK ",
    // /messenger now exists (MessengerPage.tsx, routed in App.tsx) — this
    // was left as null from before that page was built, so clicking this
    // card silently did nothing even though a real destination exists.
    route: "/messenger" as string | null,
  },
];

export default function ProductOverviewCards() {
  const navigate = useNavigate();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [bounced, setBounced] = useState(false);
  const teamCardsRef = useRef<HTMLDivElement>(null);
  const [teamsActive, setTeamsActive] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    // Replays every time this section re-enters the viewport — scrolling
    // away resets it so scrolling back down plays the bounce again.
    const observer = new IntersectionObserver(
      ([entry]) => setBounced(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = teamCardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTeamsActive(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-[69px] items-center w-full">
      <div className="flex items-center justify-between w-[1240px]">
        <h2 className="font-light text-[36px] w-[492px] m-0 leading-[36px]">
          ViH Prana is one Orchestration Layer for every use case
        </h2>
        <p className="text-[#737373] text-[20px] w-[504px] m-0 leading-[24px]">
          Prana brings multiple purpose-built AI tools together into one intelligent
          layer—each tailored to your company, working independently when needed and
          seamlessly together to create your own unified AI systems layer.
        </p>
      </div>

      <div className="bg-white relative w-full h-[955px] overflow-hidden">
        <div className="absolute flex items-center justify-center left-[209px] size-[1041px] top-[-11px] rotate-[13.57deg] pointer-events-none">
          <img alt="" className="w-[863px] h-[863px]" src={polygon33} />
        </div>

        <div ref={cardsRef} className="absolute flex items-center justify-between left-[100px] top-0 w-[1240px]">
          {productCards.map((card) => {
            const clickable = card.route !== null;
            return (
              <div
                key={card.title}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={clickable ? () => navigate(card.route!) : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") navigate(card.route!);
                      }
                    : undefined
                }
                className={`bg-[#fafafa] border border-[#ededed] border-solid h-[500px] overflow-hidden relative rounded-[24px] w-[380px] transition-transform ${
                  bounced ? "product-card-bounce" : "opacity-0"
                } ${clickable ? "cursor-pointer hover:-translate-y-[4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]" : ""}`}
              >
                <div className="absolute flex flex-col gap-[18px] items-center left-[32px] right-[33px] top-[35px]">
                  <p className="text-[#131313] text-[24px] w-full m-0 leading-[26px]">
                    {card.title}
                  </p>
                  <p className="text-[#737373] text-[16px] w-full m-0 leading-[19px]">
                    {card.description}
                  </p>
                </div>
                <div
                  className="absolute left-[130px] rounded-full size-[138px] top-[326px]"
                  style={{ backgroundImage: card.orbGradient }}
                />
                <div className="absolute bg-[rgba(255,255,255,0.36)] backdrop-blur-md border border-[#f6f6f6] border-solid flex gap-[10px] h-[38px] items-center justify-center left-[32px] px-[20px] py-[6px] right-[33px] rounded-[24px] top-[426px]">
                  <span className="flex-1 text-[#131313] text-[16px] leading-[26px]">
                    {card.pillLabel}
                  </span>
                  <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute flex items-center justify-center left-[100px] top-[677px] w-[1240px]">
          <div className="flex flex-col gap-[40px] items-start flex-1">
            <h3 className="font-light text-[36px] text-black tracking-[-1.2px] w-[381px] m-0 leading-[40px]">
              Built for the teams
              <br />
              that actually answer.
            </h3>
            <div ref={teamCardsRef} className="flex items-center justify-between w-full">
              {teamCards.map((card, i) => (
                <TeamCard key={card.title} card={card} active={teamsActive} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({
  card,
  active,
  delay,
}: {
  card: (typeof teamCards)[number];
  active: boolean;
  delay: number;
}) {
  return (
    <div
      className={`bg-[#fafafa] border border-[#cfcfcf] border-solid flex flex-col items-start overflow-hidden px-[22px] py-[20px] rounded-[24px] shrink-0 w-[401px] ${
        active ? "panel-fade-rise-in" : "opacity-0"
      }`}
      style={{ animationDelay: active ? `${delay}s` : undefined }}
    >
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
