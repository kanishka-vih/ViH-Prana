import HomeHero from "./HomeHero";
import EnterpriseProblems from "./EnterpriseProblems";
import VihPranaSection from "./VihPranaSection";
import ProductOverviewCards from "./ProductOverviewCards";
import HomeBottomSections from "./HomeBottomSections";
import { ellipse2292 } from "../../assets/home";

export default function Home() {
  return (
    <div className="bg-white flex flex-col gap-[135px] items-center w-full">
      <HomeHero />
      {/* min-height reserves the arc's full box (top 1719 + height 600 = 2319,
          matching Figma's "Frame 2043683722" frame height) — EnterpriseProblems
          + VihPranaSection alone only total 2025px, so without this the arc's
          absolutely-positioned box spilled 294px into ProductOverviewCards
          below and painted over its heading. */}
      <div className="relative flex flex-col w-full" style={{ minHeight: 2319 }}>
        <EnterpriseProblems />
        <VihPranaSection />
        {/* Soft glow transition out of the dark VihPrana section, sitting
            right at its bottom edge (matches Figma's "Ellipse 2292"). */}
        <div
          className="absolute pointer-events-none"
          style={{ left: -264, top: 1719, width: 1910, height: 600 }}
        >
          <div className="-scale-y-100 rotate-180 size-full">
            <div className="absolute bottom-0 left-0 right-0 top-1/2">
              <img alt="" className="block max-w-none size-full" src={ellipse2292} />
            </div>
          </div>
        </div>
      </div>
      <ProductOverviewCards />
      <HomeBottomSections />
    </div>
  );
}
