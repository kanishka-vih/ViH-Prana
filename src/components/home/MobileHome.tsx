import HeroVideo from "./HeroVideo";
import { useNavigate } from "react-router-dom";
import {
  weuiArrowOutlined,
  images11,
  images21,
  images31,
  images41,
  images2,
  bsnlLogo1,
  a5e5bd2a,
  polygon33,
  demoOrbWebp,
  demoOrbWebp1,
  streamlineCustomerSupport,
  streamlineDecentWork,
  famiconsCall,
} from "../../assets";
import { sphereGraphic, polygon34, enterpriseDivider, dotMarker } from "../../assets/mobile";
import { scrollToContactForm } from "../../lib/scrollToContact";

// Same 7-logo set HomeTrustedBy.tsx uses on desktop (Figma node 317:1207),
// just laid out for a narrow viewport instead of that component's fixed
// w-[1221px] label+marquee row.
const trustedByLogos = [images11, images21, images31, images41, images2, bsnlLogo1, a5e5bd2a];

const productCards = [
  {
    title: "ViH Shruti",
    description:
      "Shruti is the real-time, multilingual speech layer for the modern world, making conversations between people, and conversations with systems, clear, natural, and scalable.",
    gradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(255,103,249) 75.309%, rgb(172,57,248) 130.05%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    route: "/shruti" as string | null,
  },
  {
    title: "ViH Viveka",
    description:
      "ViH Viveka is an AI-powered call center and voice analytics platform developed by ViH Metaverse. It is designed to evaluate and enhance customer service interactions using real-time insights",
    gradient:
      "linear-gradient(124.95deg, rgb(255,222,254) 20.569%, rgb(154,0,255) 82.784%, rgb(255,103,249) 171.2%, rgb(149,44,246) 213.42%, rgb(99,40,241) 286.19%, rgb(234,225,255) 358.96%)",
    route: null,
  },
  {
    title: "ViH Messenger",
    description:
      "The enterprise communication layer built for scale. Integrate with your mobile application & transform it to a magnetisable powerful communication hub, powered by AI at its core.",
    gradient:
      "linear-gradient(129.75deg, rgb(234,225,255) 16.142%, rgb(78,30,231) 71.691%, rgb(149,44,246) 124.25%, rgb(172,57,248) 126.14%, rgb(255,103,249) 156.79%, rgb(234,225,255) 356.13%)",
    route: null,
  },
];

const useCaseCards = [
  {
    title: "Customer Support",
    description: "Resolve once. Auto-close duplicate tickets and keep every channel informed",
    icon: streamlineCustomerSupport,
    orb: demoOrbWebp,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
  {
    title: "Sales Pipeline",
    description: "One thread per prospect. AI drafts the next-best reply in your voice.",
    icon: streamlineDecentWork,
    orb: demoOrbWebp1,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
  {
    title: "Internal Comms",
    description: "One searchable timeline from Slack, email, and calls.",
    icon: famiconsCall,
    orb: null,
    gradient:
      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
  },
];

const sphereLabels = [
  { label: "Shruti", left: 40, top: 180 },
  { label: "Prana", left: 240, top: 60 },
  { label: "Viveka", left: 150, top: 280 },
];

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={scrollToContactForm}
      className={`bg-[#232323] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[8px] w-full cursor-pointer hover:bg-black active:scale-[0.98] transition-all ${className}`}
    >
      <span className="font-medium text-[15px] text-white whitespace-nowrap">Contact sales</span>
      <img alt="" className="h-[14px] w-[14px]" src={weuiArrowOutlined} />
    </button>
  );
}

function MobileHero() {
  return (
    <div className="bg-[#f7f7f8] flex flex-col gap-[24px] px-[16px] py-[16px] pb-[24px]">
      <div className="flex flex-col gap-[12px]">
        <h1 className="font-light leading-[42px] text-[38px] text-[#111] tracking-[-1.5px] m-0">
          Your Left Brain, Reimagined
        </h1>
        <p className="font-normal leading-[18px] text-[#555] text-[14px] m-0">
          Give your enterprise a lasting memory by curing corporate amnesia and ending brain drain.
        </p>
      </div>
      <CtaButton />
    </div>
  );
}

// Figma's mobile "Dark-Vis-Card" mocks up a static "Voice Chat" pill inside
// an empty dark card — this swaps that placeholder for HomeHero's actual
// working demo video (already responsive, no fixed desktop pixels) instead
// of a second non-functional button that duplicates the one right above it.
function MobileDataViz() {
  return (
    <div className="flex flex-col gap-[41px] px-[16px] pb-[40px]">
      <div className="bg-[#171718] border border-[#dfdfdf] h-[280px] rounded-[24px] overflow-hidden">
        <HeroVideo />
      </div>
      <div className="flex flex-col gap-[12px]">
        <p className="font-normal text-[#737373] text-[14px] tracking-[-0.5px] m-0">
          We are trusted by people by multiple domains
        </p>
        <div className="flex gap-[16px] overflow-x-auto pb-[4px] [scrollbar-width:none]">
          {trustedByLogos.map((logo, i) => (
            <div key={i} className="flex h-[64px] w-[110px] shrink-0 items-center justify-center rounded-[12px]">
              <img alt="" className="h-[40px] w-full object-contain" src={logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  stat,
  label,
  description,
  descWidth,
}: {
  stat: string;
  label: string;
  description: string;
  descWidth: number;
}) {
  return (
    <div className="bg-[rgba(88,88,88,0.7)] border border-white/10 flex items-start justify-between gap-[12px] px-[20px] py-[24px] rounded-[24px] w-full">
      <div className="flex flex-col gap-[2px] shrink-0">
        <p className="font-bold text-[42px] text-white m-0 leading-[1]">{stat}</p>
        <p className="font-normal text-[#b6b6b6] text-[13px] m-0 whitespace-nowrap">{label}</p>
      </div>
      <p className="font-normal text-[#d7d7d7] text-[13px] leading-[19px] m-0" style={{ maxWidth: descWidth }}>
        {description}
      </p>
    </div>
  );
}

function MobileEnterpriseProblems() {
  return (
    <div className="relative bg-[#191a1c] overflow-hidden">
      {/* Top glow */}
      <div className="pointer-events-none absolute -top-[100px] left-1/2 -translate-x-1/2 h-[197px] w-[412px] opacity-70">
        <div className="size-full bg-[radial-gradient(closest-side,rgba(177,91,252,0.5),transparent)]" />
      </div>

      <div className="relative flex flex-col items-center pt-[52px] pb-[16px]">
        <div className="bg-white/10 rounded-[12px] px-[24px] py-[10px]">
          <p className="font-normal text-[#c2bdbd] text-[16px] m-0">Enterprise Problems</p>
        </div>
      </div>

      <div className="relative px-[20px] pb-[24px]">
        <img alt="" className="w-full opacity-60" src={enterpriseDivider} />
      </div>

      <div className="relative flex flex-col gap-[32px] px-[20px] pb-[40px]">
        <div className="flex flex-col gap-[12px]">
          <p className="font-normal text-[#b1b1b1] text-[14px] leading-[22px] m-0">
            <span className="font-semibold text-white">Corporate amnesia</span> is the loss of organisational
            knowledge and context, leaving teams with fragmented information and disconnected customer histories.
          </p>
          <StatCard
            stat="$8M"
            label="Annual loss"
            description="Annual loss for a 3,000-employee business from repeating mistakes already made."
            descWidth={161}
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          <StatCard
            stat="42%"
            label="Knowledge Loss"
            description="When people leave, the knowledge they carry leaves with them—creating organizational brain drain."
            descWidth={172}
          />
          <p className="font-normal text-[#b1b1b1] text-[13px] leading-[22px] m-0">
            <span className="font-bold text-white">Brain drain</span> is the loss of critical expertise when
            employees leave, causing knowledge gaps, repeated mistakes, and slower onboarding.
          </p>
        </div>
      </div>

      {/* The ecosystem/sphere panel — same dark-to-blue gradient Figma's
          "component-9-mobile" frame uses. */}
      <div
        className="relative flex flex-col items-center gap-[32px] px-[16px] pt-[30px] pb-[40px]"
        style={{
          backgroundImage:
            "linear-gradient(184deg, rgb(23,23,23) 1.6%, rgb(26,31,37) 45.2%, rgb(3,10,52) 88.7%, rgb(20,52,105) 175.8%)",
        }}
      >
        <p className="font-normal text-[#b1b1b1] text-[13px] text-center leading-[22px] max-w-[312px] m-0">
          A state-of-the-art customer experience ecosystem that connects enterprises with their customers at every
          touchpoint — delivering unparalleled experiences from first contact to lasting loyalty.
        </p>

        <div className="relative w-full max-w-[350px] aspect-square">
          <div className="absolute -left-[30%] -top-[17%] w-[161%] h-[133%] pointer-events-none overflow-hidden">
            <img alt="" className="size-full object-contain" src={sphereGraphic} />
          </div>
          {sphereLabels.map(({ label, left, top }) => (
            <div key={label} className="absolute" style={{ left: `${(left / 350) * 100}%`, top: `${(top / 350) * 100}%` }}>
              <div className="flex items-center gap-[6px]">
                <img alt="" className="size-[12px]" src={dotMarker} />
                <span className="rounded-[8px] bg-white/10 px-[8px] py-[4px] text-[11px] text-white whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full rounded-[24px] bg-white/10 p-[20px] flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <p className="text-[20px] text-white m-0">ViH Prana</p>
          </div>
          <div className="h-px bg-white/15" />
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] text-[#c4c4c4] m-0">Type</p>
              <p className="text-[13px] text-white m-0">Omnichannel Orchestration</p>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] text-[#c4c4c4] m-0">Tech</p>
              <p className="text-[13px] text-white m-0">AI Engine</p>
            </div>
          </div>
          <div className="h-px bg-white/15" />
          <p className="text-[13px] text-white leading-[18px] m-0">
            Prana is the AI orchestration layer that fuses every email, call, chat, and meeting your customers leave
            behind into a single coherent reality — so support and sales teams stop chasing ghosts.
          </p>
        </div>

        <CtaButton />
      </div>
    </div>
  );
}

function MobileOrchestration() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-[#f8f9fb] px-[16px] py-[40px] flex flex-col gap-[44px]">
      <img
        alt=""
        className="pointer-events-none absolute -left-[220px] top-[400px] w-[600px] opacity-70"
        src={polygon33}
      />
      <img
        alt=""
        className="pointer-events-none absolute left-[10px] top-[1100px] w-[350px] opacity-70"
        src={polygon34}
      />

      <div className="relative flex flex-col gap-[14px]">
        <h2 className="font-light leading-[36px] text-[30px] text-[#131313] tracking-[-0.5px] m-0">
          ViH Prana is one Orchestration Layer for every use case
        </h2>
        <p className="font-normal leading-[22px] text-[#737373] text-[15px] m-0">
          Prana brings multiple purpose-built AI tools together into one intelligent layer—each tailored to your
          company, working independently when needed and seamlessly together to create your own unified AI systems
          layer.
        </p>
      </div>

      <div className="relative flex flex-col gap-[16px]">
        {productCards.map((card) => {
          const clickable = card.route !== null;
          return (
            <div
              key={card.title}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => navigate(card.route!) : undefined}
              className={`bg-[#fafafa] border border-[#ededed] rounded-[24px] overflow-hidden relative px-[24px] pt-[28px] pb-[20px] flex flex-col gap-[12px] ${
                clickable ? "cursor-pointer active:scale-[0.99]" : ""
              }`}
            >
              <p className="font-medium leading-[26px] text-[22px] text-[#131313] m-0">{card.title}</p>
              <p className="font-normal leading-[21px] text-[#737373] text-[15px] m-0">{card.description}</p>
              <div
                className="mx-auto mt-[16px] h-[110px] w-[80%] rounded-[263px] opacity-90"
                style={{ backgroundImage: card.gradient }}
              />
              <div className="bg-white/40 border border-[#f6f6f6] flex gap-[10px] h-[38px] items-center justify-center rounded-[24px] px-[16px]">
                <span className="flex-1 text-[#131313] text-[15px]">Hands Free Voice Assistance</span>
                <img alt="" className="h-[16px] w-[8px]" src={weuiArrowOutlined} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative flex flex-col gap-[16px]">
        <h3 className="font-light leading-[28px] text-[24px] text-[#131313] tracking-[-0.5px] m-0 max-w-[276px]">
          Built for the teams that actually answer.
        </h3>
        <div className="flex flex-col gap-[12px]">
          {useCaseCards.map((card) => (
            <div key={card.title} className="bg-[#fafafa] border border-[#cfcfcf] rounded-[20px] p-[20px] flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <p className="font-medium leading-[22px] text-[18px] text-[#131313] m-0">{card.title}</p>
                <div className="relative size-[36px] shrink-0 overflow-hidden rounded-[18px]" style={{ backgroundImage: card.gradient }}>
                  {card.orb && (
                    <img alt="" className="absolute inset-0 size-full object-cover mix-blend-luminosity opacity-40" src={card.orb} />
                  )}
                  <img alt="" className="absolute inset-0 m-auto size-[18px]" src={card.icon} />
                </div>
              </div>
              <p className="font-normal leading-[19px] text-[#555] text-[13px] m-0">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileHome() {
  return (
    <div className="flex flex-col w-full">
      <MobileHero />
      <MobileDataViz />
      <MobileEnterpriseProblems />
      <MobileOrchestration />
    </div>
  );
}
