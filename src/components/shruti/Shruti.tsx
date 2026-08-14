import Header from "../Header";
import ShrutiHero from "./ShrutiHero";
import ShrutiOutcomes from "./ShrutiOutcomes";
import ShrutiVisibility from "./ShrutiVisibility";
import HomeTrustedBy from "../home/HomeTrustedBy";
import HomeBottomSections from "../home/HomeBottomSections";

export default function Shruti() {
  return (
    <div className="bg-white flex flex-col gap-[135px] items-center w-full">
      <div className="bg-[#f7f7f8] relative w-full" style={{ paddingTop: 212, paddingBottom: 90 }}>
        <Header />
        <div className="flex flex-col items-center gap-[90px] w-full">
          <ShrutiHero />
          <HomeTrustedBy />
        </div>
      </div>

      <ShrutiOutcomes />

      <ShrutiVisibility />

      <HomeBottomSections />
    </div>
  );
}
