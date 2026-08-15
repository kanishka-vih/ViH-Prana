import React from "react";
import TimelineStep from "./TimelineStep";
import { TIMELINE } from "@/data";
import "./Story.css";

const Story: React.FC = () => (
  <section id="story" className="story">
    <div className="story__gtl" /><div className="story__gbr" />

    <div className="story__header rv">
      <div className="eyebrow">Real-World Use Case</div>
      <h2 className="clash-h">From Fragmented Touchpoints<br />to Seamless Resolution</h2>
      <p>A common enterprise challenge — a customer navigates multiple channels to resolve a single issue.</p>
    </div>

    <div className="story__pain rv">
      <h3>The Challenge</h3>
      <p>A premium customer of a large telecom enterprise raises a billing dispute. The issue bounces across chat, voice, email, and internal meetings — each channel operating in isolation, each interaction losing context.</p>
    </div>

    <div className="story__timeline">
      {TIMELINE.map((step) => <TimelineStep key={step.step} step={step} />)}
    </div>

    <div className="story__resolution rv">
      <h3>The Outcome</h3>
      <p>Within hours, the enterprise's senior support team reaches out proactively with a full resolution — powered by unified intelligence across every channel. The customer is retained, the billing pattern is flagged enterprise-wide, and the team now has data-driven playbooks to prevent recurrence.</p>
    </div>
  </section>
);

export default Story;
