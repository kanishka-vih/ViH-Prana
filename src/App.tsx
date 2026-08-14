import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Shruti from "./components/shruti/Shruti";
import ScaledCanvas from "./components/ScaledCanvas";
import VoiceChatWidget from "./components/home/VoiceChatWidget";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full bg-white">
        <ScaledCanvas>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shruti" element={<Shruti />} />
          </Routes>
        </ScaledCanvas>
        {/* Rendered outside ScaledCanvas's transform: CSS `position: fixed`
            is relative to the nearest transformed ancestor, so a transformed
            parent here would break real viewport-fixed positioning. */}
        <VoiceChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
