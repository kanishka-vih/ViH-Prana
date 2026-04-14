import React from "react";
import "./CTA.css";

const CTA: React.FC = () => (
  <section id="cta" className="cta">
    <div className="cta__gt" /><div className="cta__gb" />
    <div className="eyebrow rv">Get Started Today</div>
    <h2 className="clash-h cta__heading rv">
      Ready to experience<br />the full journey?
    </h2>
    <p className="rv">
      Let ViH Metaverse map your entire customer experience — and surface what you haven't been seeing.
    </p>
    <div className="cta__btns rv">
      <button className="cta__btn-primary">Request a Demo</button>
      <button className="cta__btn-ghost">Talk to Sales</button>
    </div>
  </section>
);

export default CTA;
