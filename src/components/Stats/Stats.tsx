import React from "react";
import { STATS } from "@/data";
import type { StatItem } from "@/types";
import "./Stats.css";

const Stats: React.FC = () => (
  <section id="stats" className="stats">
    <div className="stats__grid">
      {STATS.map((item: StatItem) => (
        <div key={item.label} className="rv">
          <div className="stats__value">{item.value}</div>
          <div className="stats__label">{item.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
