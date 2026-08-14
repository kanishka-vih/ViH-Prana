import { Link } from "react-router-dom";
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
  { label: "ViH Messenger", to: null },
  { label: "Our Team", to: null },
];

export default function Header() {
  return (
    <div className="absolute contents left-0 top-0">
      <div
        className="absolute flex flex-col items-start left-0 overflow-clip px-[444px] py-[13px] top-0 w-[1440px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255, 222, 254) 0%, rgb(255, 103, 249) 16.177%, rgb(172, 57, 248) 32.354%, rgb(149, 44, 246) 56.991%, rgb(99, 40, 241) 78.495%, rgb(234, 225, 255) 100%)",
        }}
      >
        <div className="flex gap-[12px] items-center font-normal text-[20px] text-white tracking-[-1px] w-full">
          <p className="leading-[26px] w-[442px]">
            Meet us at the Bharat tex event in Delhi on 22nd August{" "}
          </p>
          <p className="leading-[26px] underline decoration-solid [text-underline-position:from-font] w-[97px]">
            Know More
          </p>
        </div>
      </div>

      <div className="absolute flex h-[75px] items-center justify-between left-[101px] top-[40px] w-[1237px]">
        {/* Aligned with the hero heading/video below at this same left-101
            inset, per design. */}
        <Link to="/" className="relative shrink-0" data-name="logo">
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
          {navLinks.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className="flex h-[31px] items-center justify-center p-[10px] rounded-[55px] shrink-0 w-[117px] cursor-pointer"
              >
                <span className="font-normal text-[16px] text-black whitespace-nowrap">
                  {label}
                </span>
              </Link>
            ) : (
              <span
                key={label}
                className="flex h-[31px] items-center justify-center p-[10px] rounded-[55px] shrink-0 w-[117px] text-[#999] cursor-default"
                title="Coming soon"
              >
                <span className="font-normal text-[16px] whitespace-nowrap">{label}</span>
              </span>
            ),
          )}
        </nav>

        <div className="flex items-start shrink-0">
          <button
            type="button"
            onClick={scrollToContactForm}
            className="bg-[#232323] flex h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 cursor-pointer"
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
