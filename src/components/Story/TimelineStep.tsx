import React from "react";
import type { TimelineStepData } from "@/types";

interface TimelineStepProps { step: TimelineStepData; }

const TimelineStep: React.FC<TimelineStepProps> = ({ step }) => {
  const card = (
    <div className="story__tl-card rv">
      <div className="story__card-prod">{step.product}</div>
      <h3>{step.title}</h3>
      <p className="story__tl-scene">{step.scene}</p>
      <p className="story__tl-body">{step.body}</p>
      <div className="story__chips">
        {step.chips.map((c) => <span key={c} className="story__chip">{c}</span>)}
      </div>
    </div>
  );
  const dot = (
    <div className="story__tl-mid">
      <div className="story__tl-dot">{step.step}</div>
      <div className="story__tl-num">STEP</div>
    </div>
  );
  const spacer = <div className="story__tl-spacer" />;

  return (
    <div className={`story__tl-step story__tl-step--${step.side}`}>
      {step.side === "left" ? <>{card}{dot}{spacer}</> : <>{spacer}{dot}{card}</>}
    </div>
  );
};

export default TimelineStep;
