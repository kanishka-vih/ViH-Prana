import type { NavItem, Product, TimelineStepData, DashCard, StatItem } from "@/types";

export const NAV_LINKS: NavItem[] = [
  { label: "Home",       href: "#what"  },
  { label: "Use Case",   href: "#story" },
  { label: "Prana",      href: "#prana" },
  { label: "Contact Us", href: "#cta"   },
];

export const PRODUCTS_DROP: NavItem[] = [
  { label: "ViH Messenger", href: "#products" },
  { label: "ViH Shruti",    href: "#products" },
  { label: "ViH Buddhi",    href: "#products" },
  { label: "ViH Smriti",    href: "#products" },
  { label: "ViH Prana",     href: "#prana"    },
];

export const PRODUCTS: Product[] = [
  {
    name: "ViH Messenger",
    tag: "Messaging SDK",
    desc: "Enterprise-grade IP2IP messaging SDK connecting your brand to customers through intelligent, always-on conversations.",
    features: [
      "Direct IP2IP enterprise messaging infrastructure",
      "Embedded AI chatbot conversations",
      "Real-time customer engagement at scale",
      "SDK-first for seamless enterprise integration",
    ],
  },
  {
    name: "ViH Shruti",
    tag: "AI Voicebot",
    desc: "Intelligent voice AI that handles customer interactions over voice channels with full conversational context.",
    features: [
      "Natural language voice AI interactions",
      "Cross-channel context retention",
      "Multilingual voice support",
      "Seamless human agent handoff",
    ],
  },
  {
    name: "ViH Buddhi",
    tag: "Insight Engine",
    desc: "Mines support emails and documents to surface quality signals — transforming unstructured data into actionable intelligence.",
    features: [
      "Automated email and document analysis",
      "User behaviour pattern extraction",
      "Support quality scoring and reporting",
      "Trend detection across communication streams",
    ],
  },
  {
    name: "ViH Smriti",
    tag: "Meeting Intelligence",
    desc: "AI meeting companion that joins, records, and analyses your meetings — delivering insights no one else catches.",
    features: [
      "Automated recording and transcription",
      "Multi-speaker identification and attribution",
      "Cross-meeting context and target tracking",
      "Actionable key notes and follow-ups",
    ],
  },
];

export const TIMELINE: TimelineStepData[] = [
  {
    step: "01", product: "ViH Messenger", side: "left",
    title: "Customer initiates a chat",
    scene: "A billing discrepancy is raised for the fourth time — via the enterprise messaging channel.",
    body: "ViH Messenger routes the query through the IP2IP SDK to the AI chatbot. The system detects repeated billing complaints, flags frustration, and escalates intelligently.",
    chips: ["Sentiment: Frustrated", "Topic: Billing Dispute", "Escalation Flagged"],
  },
  {
    step: "02", product: "ViH Shruti", side: "right",
    title: "Customer follows up via voice call",
    scene: "Frustrated by the lack of resolution, the customer calls the support line directly.",
    body: "ViH Shruti answers the call with full context from the prior chat interaction. It identifies the caller, retrieves the billing history, and attempts resolution — flagging churn risk in real time.",
    chips: ["Context Linked from Chat", "Churn Risk: High", "Tone Analysis: Negative"],
  },
  {
    step: "03", product: "ViH Buddhi", side: "left",
    title: "Customer escalates via email",
    scene: "A formal complaint is submitted with invoice attachments detailing the discrepancy.",
    body: "ViH Buddhi ingests the email and attached documents, extracting structured data and linking it to the existing case. It detects a pattern of billing failures across multiple customers.",
    chips: ["Invoice Data Extracted", "3x Billing Discrepancy Detected", "Priority Escalated"],
  },
  {
    step: "04", product: "ViH Smriti", side: "right",
    title: "Internal CX review meeting is held",
    scene: "The enterprise's support leadership convenes to understand why high-value customers are churning.",
    body: "ViH Smriti records, transcribes, and analyses the meeting across all speakers. It links discussion points to prior customer interactions and surfaces action items automatically.",
    chips: ["Multi-Speaker Identified", "Linked to Previous Meeting", "Action Items Generated"],
  },
];

export const DASH_CARDS: DashCard[] = [
  { label: "Churn Risk Alerts Identified",     value: "147",  sub: "High-value customers flagged before churn",        trend: "+23%", trendUp: true  },
  { label: "Omnichannel Touchpoints Analysed",  value: "84K",  sub: "Messages, calls, emails, and meetings processed",  trend: "+41%", trendUp: true  },
  { label: "Avg. Resolution Time",              value: "4.2h", sub: "Down from 3.1 days before Prana",                  trend: "-87%", trendUp: false },
  { label: "Top CX Failure Pattern",            value: "#1",   sub: "Billing reconciliation delays across 3 channels",  trend: "",     trendUp: false },
  { label: "Repeat Contact Rate",               value: "↓61%", sub: "Customers who had to reach out more than once",    trend: "-61%", trendUp: false },
  { label: "Actions Triggered Automatically",   value: "2.3K", sub: "Proactive escalations, alerts, and follow-ups",    trend: "+38%", trendUp: true  },
];

export const STATS: StatItem[] = [
  { value: "5+",   label: "AI Products in the Ecosystem" },
  { value: "360°", label: "Omnichannel Customer Coverage" },
  { value: "∞",    label: "Data Sources Prana Can Ingest" },
  { value: "1",    label: "Platform. Zero Blind Spots."   },
];

export const FLOW_PILLS: string[] = ["Messenger", "Shruti", "Buddhi", "Smriti"];
