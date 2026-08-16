import { Link, useLocation } from "react-router-dom";
import {
  vector,
  group2,
  group3,
  group4,
  vector1,
  vector2,
  vector3,
  group1707491468,
} from "../assets";
import { scrollToContactForm } from "../lib/scrollToContact";

// "to: null" marks nav items with no page yet — they stay inert until built.
const navLinks: { label: string; to: string | null }[] = [
  { label: "ViH Shruti", to: "/shruti" },
  { label: "ViH Viveka", to: null },
  { label: "ViH Messenger", to: "/messenger" },
  { label: "Our Team", to: null },
];

export default function Header({ floating = false }: { floating?: boolean }) {
  const location = useLocation();

  return (
    // Nav sits close under the banner (small top offset) and is shorter
    // than the original in-page design (which had a much bigger top-40 gap
    // that only made sense when banner+nav shared one absolute coordinate
    // space — now that they're two separately-stacked blocks, that same
    // offset would land nav well below where the banner actually ends).
    <div className="relative h-[76px] w-[1440px]">
      <div
        className={`absolute flex h-[60px] items-center justify-between left-[101px] top-[8px] w-[1237px] rounded-[24px] transition-all duration-300 ease-out ${
          floating
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 px-[24px]"
            : "border border-transparent px-[24px]"
        }`}
      >
        {/* Aligned with the hero heading/video below at this same left-101
            inset, per design. */}
        <Link
          to="/"
          className="relative shrink-0 transition-transform duration-150 ease-out active:scale-90"
          data-name="logo"
        >
          <div className="relative h-[42px] w-[130px]">
            <div className="absolute h-[27.347px] left-0 top-[0.85px] w-[27.646px]">
              <img alt="" className="block max-w-none size-full" src={vector} />
            </div>
            <div className="absolute h-[27.116px] left-[7.83px] top-0 w-[30.148px]">
              <img alt="" className="block max-w-none size-full" src={group2} />
            </div>
            <div
              className="absolute h-[41.719px] left-[-7.87px] top-[-6.72px] w-[41.718px]"
              style={{ maskImage: `url("${group3}")` }}
            >
              <img alt="" className="block max-w-none size-full" src={group4} />
            </div>
            <div className="absolute h-[16.703px] left-[54.32px] top-[11.13px] w-[15.515px]">
              <img alt="" className="block max-w-none size-full" src={vector1} />
            </div>
            <div className="absolute h-[17.975px] left-[45.73px] top-[9.86px] w-[3.394px]">
              <img alt="" className="block max-w-none size-full" src={vector2} />
            </div>
            <div className="absolute h-[16.732px] left-[19.4px] top-[11.1px] w-[22.591px]">
              <img alt="" className="block max-w-none size-full" src={vector3} />
            </div>
            <div className="absolute h-[3.75px] left-[27.94px] top-[33.13px] w-[41.66px]">
              <img alt="" className="block max-w-none size-full" src={group1707491468} />
            </div>
          </div>
        </Link>

        <nav className="flex gap-[12px] items-center shrink-0">
          {navLinks.map(({ label, to }) => {
            if (!to) {
              return (
                <span
                  key={label}
                  className="flex h-[31px] items-center justify-center p-[10px] rounded-[55px] shrink-0 w-[117px] text-[#999] cursor-default"
                  title="Coming soon"
                >
                  <span className="font-normal text-[16px] whitespace-nowrap">{label}</span>
                </span>
              );
            }
            // Only the route actually being viewed gets the highlighted
            // "selected tab" treatment — otherwise every enabled link used to
            // render in the same solid-black text as the active one, which
            // read as permanently highlighted regardless of what page you
            // were on.
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex h-[31px] items-center justify-center p-[10px] rounded-[55px] shrink-0 w-[117px] cursor-pointer transition-all duration-200 ease-out active:scale-95 ${
                  isActive ? "bg-black" : "hover:bg-black/5"
                }`}
              >
                <span
                  className={`font-normal text-[16px] whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-start shrink-0">
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer transition-all duration-150 ease-out hover:bg-black active:scale-95"
          >
            <span className="font-medium text-[16px] text-white whitespace-nowrap">
              Contact sales
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
