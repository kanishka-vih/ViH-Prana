import React from "react";
import "./WhatWeDo.css";

const WhatWeDo: React.FC = () => (
  <section id="what" className="what">
    <div className="what__glow-r" /><div className="what__glow-l" />
    <div className="eyebrow rv">What We Do</div>
    <h2 className="clash-h what__big rv">What We Do</h2>
    <p className="what__body rv">
      ViH Metaverse is a <span className="what__hl">state-of-the-art customer experience ecosystem</span> that connects
      enterprises with their customers at every touchpoint — delivering{" "}
      <span className="what__hl">unparalleled experiences</span> from first contact to lasting loyalty.
      Our ecosystem leverages{" "}
      <span className="what__hlb">AI, Blockchain, and the Metaverse</span> to redefine how enterprises
      understand, engage, and serve their customers — through and through.
    </p>
  </section>
);

export default WhatWeDo;
