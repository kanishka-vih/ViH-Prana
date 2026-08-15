import React from "react";
import { PRODUCTS } from "@/data";
import "./Products.css";

const ORBITS = [
  {
    radius: 130, duration: 45, delay: 0, color: "#1E92FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    radius: 190, duration: 60, delay: -15, color: "#C30EFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    radius: 250, duration: 75, delay: -41.67, color: "#F59E0B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    radius: 310, duration: 90, delay: -78.75, color: "#10B981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
  },
];

const Products: React.FC = () => (
  <section id="products" className="products">
    <div className="products__gc" />
    <div className="products__header rv">
      <div className="eyebrow">The Product Suite</div>
      <h2 className="clash-h">Four tools. One unified mission.</h2>
      <p>Purpose-built AI products that work independently — and exponentially better together.</p>
    </div>

    <div className="solar rv">
      <div className="solar__bg-glow" />

      <svg className="solar__rings" viewBox="0 0 700 700">
        {ORBITS.map((o, i) => (
          <circle key={i} cx="350" cy="350" r={o.radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}
      </svg>

      <div className="solar__center">
        <div className="solar__pulse" />
        <div className="solar__pulse solar__pulse--2" />
        <div className="solar__pulse solar__pulse--3" />
        <div className="solar__core">
          <span className="solar__core-sub">ViH</span>
          <span className="solar__core-name">Prana</span>
        </div>
      </div>

      {PRODUCTS.map((product, i) => {
        const o = ORBITS[i];
        return (
          <div key={product.name} className="solar__orbit"
            style={{
              width: o.radius * 2, height: o.radius * 2,
              animationDuration: `${o.duration}s`,
              animationDelay: `${o.delay}s`,
            }}
          >
            <div className="solar__beam" style={{ "--beam-color": o.color } as React.CSSProperties}>
              <div className="solar__beam-line" />
              {[0, 1, 2, 3, 4].map((j) => (
                <span key={j} className="solar__dot"
                  style={{ animationDelay: `${j * 0.7}s` }}
                />
              ))}
              {[0, 1, 2].map((j) => (
                <span key={`r${j}`} className="solar__dot solar__dot--rev"
                  style={{ animationDelay: `${j * 0.9 + 0.4}s` }}
                />
              ))}
            </div>

            <div className="solar__planet"
              style={{
                animationDuration: `${o.duration}s`,
                animationDelay: `${o.delay}s`,
                "--planet-color": o.color,
              } as React.CSSProperties}
            >
              <div className="solar__planet-ico">{o.icon}</div>
              <div className="solar__planet-lbl">{product.name.replace("ViH ", "")}</div>

              {/* Overlay tooltip card */}
              <div className="solar__card">
                <div className="solar__card-arrow" />
                <h4 className="solar__card-name">{product.name}</h4>
                <span className="solar__card-tag">{product.tag}</span>
                <p className="solar__card-desc">{product.desc}</p>
                <ul className="solar__card-feats">
                  {product.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default Products;
