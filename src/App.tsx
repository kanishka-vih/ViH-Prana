import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import NavBar from "@/components/NavBar/NavBar";
import Hero from "@/components/Hero/Hero";
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import Products from "@/components/Products/Products";
import Prana from "@/components/Prana/Prana";
import Story from "@/components/Story/Story";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";

const App: React.FC = () => {
  useScrollReveal(".rv");
  return (
    <>
      <NavBar />
      <Hero />
      <WhatWeDo />
      <Products />
      <Prana />
      <Story />
      <CTA />
      <Footer />
    </>
  );
};

export default App;
