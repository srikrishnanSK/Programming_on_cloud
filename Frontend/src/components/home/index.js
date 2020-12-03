import React, { useState } from "react";
import DataSection from "../DataSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "../DataSection/Details";
import Footer from "../Footer";
import MainSection from "../MainSection";
import NavBars from "../NavBars";
import Services from "../Services";
// import SideBars from "../SideBars";

const Home = () => {
  return (
    <>
      {/* <SideBars isOpen={isOpen} toggle={toggle} /> */}
      <NavBars />
      <MainSection />
      <DataSection {...homeObjOne} />
      <Services />
      <DataSection {...homeObjTwo} />
      <DataSection {...homeObjThree} />
      <Footer />
    </>
  );
};

export default Home;
