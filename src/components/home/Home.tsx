import HomeHero from "./HomeHero";
import EnterpriseProblems from "./EnterpriseProblems";
import VihPranaSection from "./VihPranaSection";
import ProductOverviewCards from "./ProductOverviewCards";
import HomeBottomSections from "./HomeBottomSections";
import MobileHome from "./MobileHome";
import { ellipse2292 } from "../../assets/home";

export default function Home() {
  return (
    <>
      {/* Desktop/tablet — unchanged 1440px canvas, gated so it doesn't also
          render (unshrunk, since ScaledCanvas stops scaling below md) on
          phones. */}
      <div className="hidden md:flex bg-white flex-col gap-[135px] items-center w-full">
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
      </div>

      {/* Mobile — real mobile layout (Figma node 324:1401), not a shrunk
          copy of the desktop canvas. */}
      <div className="md:hidden w-full">
        <MobileHome />
      </div>

      {/* Rendered once, outside both branches above — HomeBottomSections
          (CCCAAA, testimonial+partners, contact form, footer) already
          splits into its own desktop/mobile markup internally, so nesting
          it inside the `hidden md:flex` desktop wrapper would mean it
          never mounts at all on a phone (that wrapper is display:none
          there), silently dropping the contact form, footer, and
          everything else below the orchestration cards on mobile. */}
      <HomeBottomSections />
    </>
  );
}
