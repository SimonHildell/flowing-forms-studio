import React from "react";
import Header from "./components/Header";
import HeroScroll from "./components/HeroScroll";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      {/* Navigation / header */}
      <Header />

      {/* Hero / landing section */}
      <HeroScroll />

      {/* Projects section */}
      <ProjectsSection />

      {/* About section */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
