import { Reveal } from "../home/MobileHome";
import { MobileIndustriesStack } from "./IndustriesSection";
import EnterpriseSection from "./EnterpriseSection";
import WorkflowSection from "./WorkflowSection";
import AnalyticsDashboard from "./AnalyticsDashboard";
import PhoneMockup from "./PhoneMockup";
import polygonBlob from "../../assets/messenger-figma/polygon-blob.webp";
import sectionChordTop from "../../assets/messenger-figma/section-chord-top.png";
import channelIcon from "../../assets/messenger-figma/icon-channel.svg";
import supportIcon from "../../assets/messenger-figma/icon-support.svg";
import timeIcon from "../../assets/messenger-figma/icon-time.svg";
import aiIcon from "../../assets/messenger-figma/icon-ai.svg";
import { streamlineCustomerSupport, streamlineDecentWork, famiconsCall } from "../../assets";

// Same 4 cards FeatureCards.jsx (desktop) renders, just forced to a fixed
// 2x2 grid regardless of viewport — FeatureCards' own grid falls back to a
// single column below Tailwind's `sm` breakpoint (640px), which is wider
// than this whole phone, so reusing it directly would have stacked all 4
// cards in one column instead of Figma's 2x2 (node 247:40, "Features
// Grid"). Same icons/copy, just this page's own grid wrapper.
const heroFeatures = [
  { icon: channelIcon, title: "Four channels", description: "In-app chat, chat bot, messaging and voice bot from a single API" },
  { icon: supportIcon, title: "A2P only", description: "Enterprise traffic never competes with personal chat" },
  { icon: timeIcon, title: "Seconds", description: "Send to device on live delivery, tracked per message" },
  { icon: aiIcon, title: "Self-hosted AI", description: "Chat and voice models run on local ViH infrastructure" },
];

// Same "Built for the teams that actually answer" 3-card block Home/Shruti's
// mobile orchestration section uses (MobileHome.tsx's `useCaseCards`) —
// Figma's mobile flow for Messenger (node 346:47) nests this exact same
// heading/3-card set at the end of "system-flow-benefits-mobile" rather than
// desktop's separate 6-card TeamsSection, so this matches that mobile frame
// instead of reusing TeamsSection.jsx (which Figma's mobile design doesn't
// actually show).
const useCaseCards = [
  {
    title: "Customer Support",
    description: "Resolve once. Auto-close duplicate tickets and keep every channel informed",
    icon: streamlineCustomerSupport,
  },
  {
    title: "Sales Pipeline",
    description: "One thread per prospect. AI drafts the next-best reply in your voice.",
    icon: streamlineDecentWork,
  },
  {
    title: "Internal Comms",
    description: "One searchable timeline from Slack, email, and calls.",
    icon: famiconsCall,
  },
];

function MobileHero() {
  return (
    <div className="relative overflow-hidden bg-white px-[16px] pt-[16px] pb-[32px]">
      <img
        alt=""
        className="pointer-events-none absolute -left-[304px] top-[287px] w-[873px] rotate-[13.57deg] opacity-90"
        src={polygonBlob}
      />
      {/* No hero CTA here — "Contact us" already lives in the nav bar
          (Header.tsx), matching the same change made on Home/Shruti's
          hero. */}
      <div className="relative flex flex-col gap-[12px]">
        <h1 className="font-light leading-[33px] text-[30px] text-[#292941] tracking-[-1.2px] m-0">
          One inbox for everything your business send
        </h1>
        <p className="font-normal leading-[22px] text-[#8a8ca9] text-[16px] m-0">
          Integrate with your app. Transform it into an AI-powered communication hub.
        </p>
      </div>

      <div className="relative flex flex-col gap-[24px] pt-[16px]">
        <div
          className="border border-white rounded-[16px] p-[12px] aspect-[358/242]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.3) 0%, rgba(243,248,255,0.3) 100%)",
          }}
        >
          <AnalyticsDashboard />
        </div>
        <div
          className="border border-white rounded-[20px] p-[12px] aspect-[358/396]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(235,235,235,0.7) 0%, rgba(235,235,235,0.7) 100%), linear-gradient(90deg, rgba(243,248,255,0.3) 0%, rgba(243,248,255,0.3) 100%)",
          }}
        >
          <PhoneMockup />
        </div>

        <div className="grid grid-cols-2 gap-[12px]">
          {heroFeatures.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-[12px] bg-[rgba(235,235,235,0.3)] border border-[#cfcfcf] rounded-[16px] p-[14px]"
            >
              <img alt="" className="size-[20px]" src={f.icon} />
              <div className="flex flex-col gap-[6px]">
                <p className="font-medium leading-[normal] text-[#212121] text-[14px] m-0">{f.title}</p>
                <p className="font-normal leading-[15px] text-[#121212] text-[11px] m-0">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTeamsUseCases() {
  return (
    <div className="flex flex-col gap-[16px] px-[16px] pt-[30px] pb-[48px] bg-white">
      <p className="font-light leading-[28px] text-[#131313] text-[24px] tracking-[-0.5px] max-w-[276px] m-0">
        Built for the teams that actually answer.
      </p>
      <div className="flex flex-col gap-[12px]">
        {useCaseCards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <div className="bg-[#fafafa] border border-[#cfcfcf] rounded-[20px] p-[20px] flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <p className="font-medium leading-[22px] text-[18px] text-[#131313] m-0">{card.title}</p>
                <div
                  className="relative size-[36px] shrink-0 overflow-hidden rounded-[18px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(124.97deg, rgb(255,222,254) 20.579%, rgb(154,0,255) 81.465%, rgb(255,103,249) 169.41%, rgb(149,44,246) 213.39%, rgb(99,40,241) 286.11%, rgb(234,225,255) 358.84%)",
                  }}
                >
                  <img alt="" className="absolute inset-0 m-auto size-[18px]" src={card.icon} />
                </div>
              </div>
              <p className="font-normal leading-[19px] text-[#555] text-[13px] m-0">{card.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function MobileMessenger() {
  return (
    <div className="flex flex-col w-full">
      <MobileHero />

      {/* Same dome-cap technique as Home's SectionChord (Figma node 345:2699,
          "Ellipse 2292") — the seam between the light hero section above and
          EnterpriseSection's dark dome below. */}
      <img alt="" className="pointer-events-none block w-full" src={sectionChordTop} />
      <div className="-mt-[6px]">
        {/* EnterpriseSection is already responsive (`grid-cols-1
            md:grid-cols-3`) and its ring-rise background animation already
            works at any width, so this reuses it directly rather than
            rebuilding the same 3-card dark panel as bespoke mobile markup. */}
        <EnterpriseSection />
      </div>

      {/* WorkflowSection composes WorkflowDiagram + EnterpriseBenefits, both
          of which already stack via their own `flex-col md:flex-row`/
          `lg:flex-row` fallbacks — reused directly for the same reason as
          EnterpriseSection above. */}
      <WorkflowSection />

      <MobileTeamsUseCases />
      <MobileIndustriesStack />
    </div>
  );
}
