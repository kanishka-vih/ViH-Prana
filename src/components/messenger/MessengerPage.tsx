import Hero from "./Hero";
import DashboardShowcase from "./DashboardShowcase";
import WorkflowSection from "./WorkflowSection";
import HowWeDoItSection from "./HowWeDoItSection";
import IndustriesSection from "./IndustriesSection";
import EnterpriseSection from "./EnterpriseSection";
import TeamsSection from "./TeamsSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

// Navbar.jsx and AnnouncementBar.jsx are intentionally not rendered here —
// the site already has one global fixed nav (FixedHeader, in App.tsx) shared
// across every route, same as /shruti. Rendering messenger's own copy on top
// would duplicate it with non-functional "#" links instead of real routes.
//
// FeatureCards, AnalyticsDashboard, WorkflowDiagram, and EnterpriseBenefits
// are also skipped as top-level sections — DashboardShowcase and
// WorkflowSection already compose them internally in a specific layout, so
// rendering them again here would show each one twice.
export default function MessengerPage() {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* Hero and DashboardShowcase are the only two sections with no
          padding/max-width of their own (every other section below manages
          its own `px-6 md:px-[100px]` + `md:w-310 mx-auto`), so they share
          one wrapper here providing that, plus the top padding that clears
          the site's fixed header — matching how Shruti.tsx wraps ShrutiHero. */}
      <div className="w-full" style={{ paddingTop: 212 }}>
        <div className="flex flex-col gap-16 md:gap-24 w-full px-6 md:px-[100px] md:w-310 mx-auto">
          <Hero />
          <DashboardShowcase />
        </div>
      </div>

      <WorkflowSection />
      <HowWeDoItSection />
      <IndustriesSection />
      <EnterpriseSection />
      <TeamsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
