export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  name: string;
  tag: string;
  desc: string;
  features: string[];
}

export interface TimelineStepData {
  step: string;
  product: string;
  title: string;
  scene: string;
  body: string;
  chips: string[];
  side: "left" | "right";
}

export interface DashCard {
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendUp: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}
