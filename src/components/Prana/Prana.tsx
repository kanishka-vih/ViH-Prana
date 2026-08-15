import React from "react";
import { DASH_CARDS, FLOW_PILLS } from "@/data";
import type { DashCard } from "@/types";
import "./Prana.css";

const Prana: React.FC = () => (
  <section id="prana" className="prana">
    <div className="prana__glow" />
    <div className="eyebrow rv">The Unified Intelligence Layer</div>
    <h2 className="clash-h grad-text prana__big rv">ViH Prana</h2>
    <p className="prana__sub rv">The engine powering omnichannel intelligence</p>
    <p className="prana__desc rv">
      Every touchpoint in the journey above — the chat, the voice call, the email, the meeting — feeds
      into <strong>ViH Prana</strong>. Prana stitches them into a single intelligence graph, generates automated
      triggers, and gives the enterprise the <strong>omnichannel analytics</strong> needed to understand not just
      individual cases, but the systemic patterns behind them.
    </p>

    <div className="prana__dash rv">
      {DASH_CARDS.map((card: DashCard) => (
        <div key={card.label} className="prana__dc">
          <div className="prana__dc-lbl">{card.label}</div>
          <div className="prana__dc-val">{card.value}</div>
          <div className="prana__dc-sub">{card.sub}</div>
          {card.trend && (
            <div className={`prana__dc-trend ${card.trendUp ? "prana__dc-trend--up" : "prana__dc-trend--dn"}`}>
              {card.trend}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="prana__flow rv">
      {FLOW_PILLS.map((pill, i) => (
        <React.Fragment key={pill}>
          <div className="prana__fp">{pill}</div>
          {i < FLOW_PILLS.length - 1 && <span className="prana__fa">→</span>}
        </React.Fragment>
      ))}
      <span className="prana__fa">→</span>
      <div className="prana__fc">ViH Prana</div>
    </div>
  </section>
);

export default Prana;
