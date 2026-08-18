import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import Shruti from "./components/shruti/Shruti";
import MessengerPage from "./components/messenger/MessengerPage";
import ScaledCanvas from "./components/ScaledCanvas";
import VoiceChatWidget from "./components/home/VoiceChatWidget";
import FixedHeader from "./components/FixedHeader";
import ScrollToTop from "./components/ScrollToTop";

// Only these routes have real mobile markup of their own so far — every
// other route still only has desktop-1440px markup, so they need
// ScaledCanvas to keep shrinking them to fit a phone screen until they get
// their own mobile layouts too. Add a route here once it does.
const MOBILE_READY_ROUTES = ["/", "/shruti", "/messenger"];

function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <ScaledCanvas mobileReady={MOBILE_READY_ROUTES.includes(pathname)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shruti" element={<Shruti />} />
        <Route path="/messenger" element={<MessengerPage />} />
      </Routes>
    </ScaledCanvas>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="w-full bg-white">
        {/* Rendered outside ScaledCanvas's transform, for the same reason as
            VoiceChatWidget below: CSS `position: fixed` is relative to the
            nearest transformed ancestor, so a transformed parent here would
            break real viewport-fixed positioning — this needs to actually
            stay pinned across the whole site while scrolling. */}
        <FixedHeader />
        <AppRoutes />
        <VoiceChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
