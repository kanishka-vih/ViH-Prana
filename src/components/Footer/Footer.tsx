import React from "react";
import "./Footer.css";

const FOOTER_LINKS: string[] = ["Messenger", "Shruti", "Buddhi", "Smriti", "Prana"];

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__logo">
      <img src="/logo-icon.png" alt="ViH Metaverse" width="32" height="32" style={{ borderRadius: 6, verticalAlign: 'middle', marginRight: 8 }} />
      ViH <span>Metaverse</span>
    </div>
    <div className="footer__links">
      {FOOTER_LINKS.map((link) => (
        <a key={link} href="#" className="footer__link">{link}</a>
      ))}
    </div>
    <small className="footer__copy">© 2025 ViH Metaverse Pvt. Ltd. All rights reserved.</small>
  </footer>
);

export default Footer;
