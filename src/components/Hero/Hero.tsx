import React, { useRef } from "react";
import { useStarfield } from "@/hooks/useStarfield";
import "./Hero.css";

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarfield(canvasRef);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__glow-bl" />
      <div className="hero__glow-br" />
      <div className="hero__arc" />

      <div className="hero__text">
        <h1 className="hero__h1">
          Disrupting<br />
          <span className="hero__grad">The Disruptors!</span>
        </h1>
      </div>

      <div className="hero__scroll-hint">
        <span>Let's get to know each other</span>
        <div className="hero__scroll-line" />
        <div className="hero__scroll-circle">↓</div>
      </div>
    </section>
  );
};

export default Hero;
