import { useState } from "react";
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
import { hamburger } from "../assets/mobile";
import { scrollToContactForm } from "../lib/scrollToContact";

// "to: null" marks nav items with no page yet — they stay inert until built.
const navLinks: { label: string; to: string | null }[] = [
  { label: "ViH Shruti", to: "/shruti" },
  { label: "ViH Viveka", to: null },
  { label: "ViH Messenger", to: "/messenger" },
  { label: "Our Team", to: null },
];

function LogoMark() {
  return (
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
  );
}

export default function Header({ floating = false }: { floating?: boolean }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop/tablet — unchanged from before. */}
      <div className="relative h-[76px] w-[1440px] hidden md:block">
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
            <LogoMark />
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

      {/* Mobile — Figma's "Mobile-Navigation" (node 324:1405): just the logo
          and a hamburger, no inline nav links/CTA. Those move into a simple
          dropdown panel on tap instead — the Figma mobile frame only shows
          the closed hamburger state, not an open-menu design, so this panel
          is a plain, functional fallback rather than a pixel-matched one.
          `floating` (set once the banner's scrolled at least partly out of
          view — see FixedHeader.tsx) swaps the flat page-bg fill for the
          same iOS-style translucent glass/blur chrome the desktop nav gets
          once it's pinned, instead of a plain opaque bar sitting on top of
          content while scrolling. */}
      <div
        className={`md:hidden relative transition-all duration-300 ease-out ${
          floating ? "bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]" : "bg-[#f7f7f8]"
        }`}
      >
        <div className="flex h-[56px] items-center justify-between px-[16px] py-[12px] gap-[12px]">
          <Link
            to="/"
            className="relative shrink-0 scale-[0.7] origin-left transition-transform duration-150 ease-out active:scale-[0.63]"
            data-name="logo"
          >
            <LogoMark />
          </Link>
          {/* "Contact us" stays put next to the menu toggle whether the menu
              is open or closed — the ElevenLabs mobile pattern this follows
              keeps its own CTA pill there too, rather than swapping it away
              once the panel opens. This is now the ONLY "contact" CTA on
              mobile Home's hero area — MobileHero's own copy of it (right
              under the headline) was removed so there's a single, obvious
              place for it instead of the same action repeated twice. */}
          <div className="flex items-center gap-[10px] ml-auto">
            <button
              type="button"
              onClick={scrollToContactForm}
              className="bg-[#232323] flex h-[36px] items-center justify-center px-[16px] rounded-full cursor-pointer transition-all duration-150 ease-out hover:bg-black active:scale-95 shrink-0"
            >
              <span className="font-medium text-[14px] text-white whitespace-nowrap">Contact us</span>
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="relative size-[36px] shrink-0 cursor-pointer flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <svg viewBox="0 0 24 24" className="size-[20px]" fill="none">
                  <path
                    d="M5 5L19 19M19 5L5 19"
                    stroke="#111"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <img alt="" className="block size-full" src={hamburger} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          // Rounded bottom corners + shadow + a hairline divider ahead of
          // each row (not just between rows) — floating "curvy" card look
          // instead of a flat, edge-to-edge dropdown strip.
          <div className="absolute left-0 right-0 top-full bg-white rounded-b-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] px-[20px] pt-[8px] pb-[20px] flex flex-col z-30">
            {navLinks.map(({ label, to }) => {
              if (!to) {
                return (
                  <span
                    key={label}
                    className="flex items-center justify-between py-[16px] text-[16px] text-[#999] border-b border-black/5 last:border-b-0"
                  >
                    {label}
                  </span>
                );
              }
              const isActive = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-[16px] text-[16px] border-b border-black/5 last:border-b-0 ${
                    isActive ? "font-medium text-black" : "text-black/80"
                  }`}
                >
                  {label}
                  <svg viewBox="0 0 24 24" className="size-[16px] shrink-0 text-[#bbb]" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
