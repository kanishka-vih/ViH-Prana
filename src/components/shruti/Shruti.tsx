import ShrutiHero from "./ShrutiHero";
import ShrutiOutcomes from "./ShrutiOutcomes";
import ShrutiVisibility from "./ShrutiVisibility";
import HomeTrustedBy from "../home/HomeTrustedBy";
import HomeBottomSections from "../home/HomeBottomSections";
import MobileShruti from "./MobileShruti";

export default function Shruti() {
  return (
    <>
      {/* Desktop/tablet — unchanged 1440px canvas, gated so it doesn't also
          render (unshrunk, since ScaledCanvas stops scaling below md) on
          phones. */}
      <div className="hidden md:flex bg-white flex-col gap-[135px] items-center w-full">
        <div className="bg-[#f7f7f8] relative w-full" style={{ paddingTop: 212, paddingBottom: 90 }}>
          <div className="flex flex-col items-center gap-[90px] w-full">
            <ShrutiHero />
            <HomeTrustedBy />
          </div>
        </div>

        <ShrutiOutcomes />

        <ShrutiVisibility />
      </div>

      {/* Mobile — real mobile layout (Figma node 333:1950), not a shrunk
          copy of the desktop canvas. */}
      <div className="md:hidden w-full">
        <MobileShruti />
      </div>

      {/* Rendered once, outside both branches — already splits into its
          own desktop/mobile markup internally (same reasoning as
          Home.tsx: nesting it inside the desktop-only wrapper would mean
          it never mounts on a phone at all). */}
      <HomeBottomSections />
    </>
  );
}
