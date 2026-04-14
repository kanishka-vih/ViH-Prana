import React, { useState } from "react";
import LogoSVG from "@/components/common/LogoSVG";
import { NAV_LINKS, PRODUCTS_DROP } from "@/data";
import type { NavItem } from "@/types";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <a className="navbar__logo" href="#">
        <LogoSVG />
        <span className="navbar__logo-name">ViH</span>
      </a>

      <ul className="navbar__links">
        {NAV_LINKS.map((item: NavItem) => (
          <li key={item.label}>
            <a className="navbar__link" href={item.href}>{item.label}</a>
          </li>
        ))}
        <li
          className="navbar__drop"
          onMouseEnter={() => setDropOpen(true)}
          onMouseLeave={() => setDropOpen(false)}
        >
          <button className="navbar__drop-trigger">Products ▾</button>
          <div className={`navbar__dropdown ${dropOpen ? "navbar__dropdown--open" : ""}`}>
            {PRODUCTS_DROP.map((item: NavItem) => (
              <a key={item.label} href={item.href} className="navbar__dropdown-link">
                {item.label}
              </a>
            ))}
          </div>
        </li>
      </ul>

      <div className="navbar__right">
        <button className="navbar__icon" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
        </button>
        <button className="navbar__hamburger" aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
