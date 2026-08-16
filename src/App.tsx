import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Shruti from "./components/shruti/Shruti";
import ScaledCanvas from "./components/ScaledCanvas";
import VoiceChatWidget from "./components/home/VoiceChatWidget";
import FixedHeader from "./components/FixedHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full bg-white">
        {/* Rendered outside ScaledCanvas's transform, for the same reason as
            VoiceChatWidget below: CSS `position: fixed` is relative to the
            nearest transformed ancestor, so a transformed parent here would
            break real viewport-fixed positioning — this needs to actually
            stay pinned across the whole site while scrolling. */}
        <FixedHeader />
        <ScaledCanvas>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shruti" element={<Shruti />} />
          </Routes>
        </ScaledCanvas>
        <VoiceChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
