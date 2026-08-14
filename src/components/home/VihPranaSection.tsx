import { useState } from "react";
import { weuiArrowOutlined, solarArrowUpOutline } from "../../assets";
import { scrollToContactForm } from "../../lib/scrollToContact";
import {
  outputOnlinegiftools1,
  image7,
  shrutiShowcase,
  vivekaShowcase,
  ellipse2286,
  ellipse2283,
  ellipse2285,
  ellipse2284,
} from "../../assets/home";

type ProductId = "prana" | "shruti" | "viveka" | "messenger";

type Media =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string }
  | { kind: "placeholder"; gradient: string };

const PRODUCTS: Record<
  ProductId,
  { name: string; type: string; tech: string; body: string; media: Media }
> = {
  prana: {
    name: "ViH Prana",
    type: "Omnichannel Orchestration",
    tech: "AI",
    body: "Prana is the AI orchestration layer that fuses every email, call, chat, and meeting your customers leave behind into a single coherent reality — so your support, sales, and ops teams stop chasing ghosts across silos and start acting on one truth",
    // TODO: swap for Prana's own image/video once provided.
    media: { kind: "image", src: image7 },
  },
  shruti: {
    name: "ViH Shruti",
    type: "Voice & Speech",
    tech: "ASR",
    body: "Shruti transcribes and understands calls in real time across languages and accents, surfacing the moments that matter while the conversation is still live.",
    media: { kind: "image", src: shrutiShowcase },
  },
  viveka: {
    name: "ViH Viveka",
    type: "Conversational Intelligence",
    tech: "NLU",
    body: "Viveka listens across every channel and turns raw conversation into structured intent, sentiment, and next-best-action — so your teams always know what the customer actually means.",
    media: { kind: "image", src: vivekaShowcase },
  },
  messenger: {
    name: "ViH Messenger",
    type: "Unified Inbox",
    tech: "Messaging",
    body: "Messenger unifies WhatsApp, email, chat, and social into one thread per customer, so every agent picks up exactly where the last conversation left off.",
    // TODO: swap for Messenger's own image/video once provided.
    media: { kind: "image", src: image7 },
  },
};

const PRODUCT_ORDER: ProductId[] = ["prana", "shruti", "viveka", "messenger"];

const floatingLabels: {
  id: ProductId;
  dot: string;
  left: number;
  top: number;
  label: string;
  labelLeft: number;
  labelTop: number;
  labelW: number;
}[] = [
  { id: "messenger", dot: ellipse2286, left: 625, top: 1038, label: "Messenger", labelLeft: 685, labelTop: 1051, labelW: 104 },
  { id: "shruti", dot: ellipse2283, left: 433, top: 735, label: "Shruti", labelLeft: 491, labelTop: 744, labelW: 64 },
  { id: "viveka", dot: ellipse2285, left: 720, top: 521, label: "Viveka", labelLeft: 644, labelTop: 528, labelW: 64 },
  { id: "prana", dot: ellipse2284, left: 676, top: 862, label: "Prana", labelLeft: 739, labelTop: 870, labelW: 64 },
];

export default function VihPranaSection() {
  const [activeId, setActiveId] = useState<ProductId>("prana");
  const active = PRODUCTS[activeId];

  const goToNextProduct = () => {
    setActiveId((current) => {
      const idx = PRODUCT_ORDER.indexOf(current);
      return PRODUCT_ORDER[(idx + 1) % PRODUCT_ORDER.length];
    });
  };

  return (
    <div
      id="vih-prana-section"
      className="relative w-full h-[1293px] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(181.73deg, rgb(23,23,23) 1.63%, rgb(26,31,37) 45.246%, rgb(3,10,52) 88.862%, rgb(20,52,105) 176.09%), linear-gradient(180deg, rgb(23,23,23) 0%, rgb(26,31,37) 43.255%, rgb(31,35,41) 86.51%, rgba(125,125,125,0.8) 125.78%)",
      }}
    >
      <p className="-translate-x-1/2 -translate-y-1/2 absolute font-normal left-[724px] text-[#b1b1b1] text-[20px] text-center top-[226px] tracking-[-1px] w-[566px] m-0 leading-[26px]">
        ViH Metaverse is a state-of-the-art customer experience ecosystem that connects
        enterprises with their customers at every touchpoint — delivering unparalleled
        experiences from first contact to lasting loyalty. Our ecosystem leverages AI to
        redefine how enterprises understand, engage, and serve their customers — through and
        through.
      </p>

      <div className="absolute h-[1082px] left-[326px] top-[211px] w-[985px] overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-52%] max-w-none top-0 w-[183%]" src={outputOnlinegiftools1} />
      </div>

      <div className="absolute flex flex-col gap-[20px] items-end justify-end left-[829px] top-[478px] w-[481px]">
        <div
          key={activeId}
          className="vihprana-card-in bg-[rgba(122,123,127,0.44)] backdrop-blur-md border border-white/10 h-[298px] overflow-hidden relative rounded-[24px] w-full"
        >
          <div className="absolute h-0 left-[24px] top-[69px] w-[417px] border-t border-[rgba(255,255,255,0.2)]" />
          <div className="absolute h-0 left-[22px] top-[156px] w-[427px] border-t border-[rgba(255,255,255,0.2)]" />
          <p className="-translate-y-1/2 absolute font-normal left-[22px] text-[16px] text-white top-[230.5px] w-[419px] m-0 leading-[19px]">
            {active.body}
          </p>
          <div className="absolute flex gap-[107px] items-center left-[24px] top-[87px]">
            <div className="flex flex-col items-start w-[212px]">
              <p className="text-[#c4c4c4] text-[12px] w-full m-0 leading-[26px]">Type</p>
              <p className="text-[16px] text-white w-full m-0 leading-[26px]">{active.type}</p>
            </div>
            <div className="flex flex-col items-start w-[98px]">
              <p className="text-[#c4c4c4] text-[12px] w-full m-0 leading-[26px]">Tech</p>
              <p className="text-[16px] text-white w-full m-0 leading-[26px]">{active.tech}</p>
            </div>
          </div>
          <div className="absolute flex items-center justify-between left-[19px] top-[27px] w-[425px]">
            <p className="text-[24px] text-white whitespace-nowrap m-0 leading-[26px]">
              {active.name}
            </p>
            <button
              type="button"
              onClick={goToNextProduct}
              aria-label="Show next product"
              className="bg-[rgba(0,0,0,0.38)] flex items-center justify-center p-[6px] rounded-[26px] cursor-pointer hover:bg-[rgba(0,0,0,0.6)] transition-colors"
            >
              <img alt="" className="size-[20px] rotate-90" src={solarArrowUpOutline} />
            </button>
          </div>
        </div>
        <div
          key={`${activeId}-media`}
          className="vihprana-card-in rounded-[12px] w-full overflow-hidden"
          style={{ aspectRatio: "474/298" }}
        >
          {active.media.kind === "image" ? (
            <img alt="" className="size-full object-cover" src={active.media.src} />
          ) : active.media.kind === "video" ? (
            <video
              className="size-full object-cover"
              src={active.media.src}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div className="size-full" style={{ background: active.media.gradient }} />
          )}
        </div>
      </div>

      {floatingLabels.map((f) => {
        const isActive = f.id === activeId;
        const DOT_SIZE = 50.9;
        const LABEL_H = 34;
        // The button needs its own real bounding box — a button whose only
        // children are `position: absolute` collapses to 0x0 and silently
        // becomes unclickable/unhoverable even though it still paints fine,
        // so it has to be sized/positioned to cover the union of the dot and
        // its label, with the dot/label positioned relative to that box.
        const unionLeft = Math.min(f.left, f.labelLeft);
        const unionTop = Math.min(f.top, f.labelTop);
        const unionRight = Math.max(f.left + DOT_SIZE, f.labelLeft + f.labelW);
        const unionBottom = Math.max(f.top + DOT_SIZE, f.labelTop + LABEL_H);
        return (
          <button
            key={f.id}
            type="button"
            onMouseEnter={() => setActiveId(f.id)}
            onClick={() => setActiveId(f.id)}
            className="absolute cursor-pointer bg-transparent border-none p-0 appearance-none"
            style={{
              left: unionLeft,
              top: unionTop,
              width: unionRight - unionLeft,
              height: unionBottom - unionTop,
            }}
            aria-label={`Show ${PRODUCTS[f.id].name}`}
          >
            <div
              className="absolute transition-transform duration-200"
              style={{
                left: f.left - unionLeft,
                top: f.top - unionTop,
                width: DOT_SIZE,
                height: DOT_SIZE,
                transform: isActive ? "scale(1.15)" : "scale(1)",
              }}
            >
              <img alt="" className="block max-w-none size-full" src={f.dot} />
            </div>
            <div
              className="absolute flex items-center justify-center p-[6px] rounded-[8px] transition-colors duration-200"
              style={{
                left: f.labelLeft - unionLeft,
                top: f.labelTop - unionTop,
                width: f.labelW,
                backgroundColor: isActive ? "#ffffff" : "#858688",
              }}
            >
              <span className="font-medium text-[14px] text-black tracking-[0.12px] whitespace-nowrap leading-[22px]">
                {f.label}
              </span>
            </div>
          </button>
        );
      })}

      <div className="absolute flex items-center left-[89px] top-[1053px]">
        <button
          type="button"
          onClick={scrollToContactForm}
          className="bg-white flex gap-[10px] h-[45px] items-center justify-center px-[16px] py-[8px] rounded-[8px] cursor-pointer"
        >
          <span className="font-medium text-[16px] text-black">Contact sales</span>
          <img alt="" className="h-[33px] w-[16.5px]" src={weuiArrowOutlined} />
        </button>
      </div>
    </div>
  );
}
