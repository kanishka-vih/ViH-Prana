import Hero from "./Hero";
import DashboardShowcase from "./DashboardShowcase";
import EnterpriseSection from "./EnterpriseSection";
import WorkflowSection from "./WorkflowSection";
import TeamsSection from "./TeamsSection";
import IndustriesSection from "./IndustriesSection";
import HowWeDoItSection from "./HowWeDoItSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

// Navbar.jsx and AnnouncementBar.jsx are intentionally not rendered here —
// the site already has one global fixed nav (FixedHeader, in App.tsx) shared
// across every route, same as /shruti. Rendering messenger's own copy on top
// would duplicate it with non-functional "#" links instead of real routes.
//
// Section order below matches Figma's actual top-to-bottom layout (node
// 88:466, "VIH metaverse liquid glass") exactly, confirmed via
// get_design_context on each frame:
//   Hero + DashboardShowcase (node 88:478 — the video/dashboard + phone
//   mockup AND the "Four channels" feature-card row, which DashboardShowcase
//   renders internally since Figma puts them in one 979px frame sharing one
//   polygon-blob background) all sit inside ONE hero frame (243:1141). Right
//   after it — node 88:952, a sibling frame easy to miss in metadata since
//   it renders with no expanded children there — is EnterpriseSection's
//   dark dome ("Enterprise AI built for intelligence and data sovereignty",
//   the 3-semicircle background). Then, as separate sections: WorkflowSection
//   (workflow diagram + enterprise benefits), TeamsSection ("Get started in
//   minutes"), IndustriesSection ("Where enterprises put it to work"),
//   HowWeDoItSection (the CCCAAA "How we do it" panel), TestimonialsSection,
//   ContactSection, Footer.
//
// AnalyticsDashboard, PhoneMockup, FeatureCards, WorkflowDiagram, and
// EnterpriseBenefits are not top-level here — DashboardShowcase and
// WorkflowSection already compose them internally in a specific layout, so
// rendering them again would show each one twice.
export default function MessengerPage() {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* Hero and DashboardShowcase are the only two sections with no
          padding of their own (every section below manages its own
          `px-6 md:px-[100px]`) — matching Figma, where both sit inside the
          same hero frame. They share one wrapper here providing that, plus
          the top padding that clears the site's fixed header — matching
          how Shruti.tsx wraps ShrutiHero.

          Deliberately NOT also adding `md:w-310 mx-auto` here like other
          sections' inner content wrapper does — those sections apply it to
          a SEPARATE inner div nested inside an already-padded outer section,
          where it's a no-op safety cap (padded width already equals 1240).
          Doing both on this SAME element compounded: a fixed 1240px width
          auto-centered (adding ~100px each side) got 100px of padding
          added on top of that, insetting content by ~200px instead of the
          intended 100px — which is why the dashboard/phone/cards read as
          shifted right of where the logo/nav above them start. */}
      <div className="w-full" style={{ paddingTop: 212 }}>
        <div className="flex flex-col gap-16 md:gap-24 w-full px-6 md:px-[100px]">
          <Hero />
          <DashboardShowcase />
        </div>
      </div>

      <EnterpriseSection />
      <WorkflowSection />
      <TeamsSection />
      <IndustriesSection />

      {/* Figma groups HowWeDoIt → testimonial+logos → contact form → footer
          into one auto-layout frame (node 82:216, "Frame 2043683732") with
          gap:124px between every child and a 33px padding-bottom after the
          last one — confirmed via its metadata (children sit exactly 124px
          past the previous one's bottom edge). Home/Shruti's
          HomeBottomSections.tsx wraps the equivalent group the same way, so
          this mirrors that instead of leaving these sections to butt up
          against each other with no controlled gap. */}
      <div className="flex flex-col gap-[124px] w-full pb-[33px]">
        <HowWeDoItSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
