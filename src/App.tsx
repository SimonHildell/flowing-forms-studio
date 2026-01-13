import React from "react";
import HeroScroll from "./components/HeroScroll";
import ProjectsSection from "./components/ProjectsSection";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      {/* Hero section */}
      <HeroScroll />

      {/* Projects section */}
      <ProjectsSection />

      {/* You can add more sections here, e.g., About, Contact */}
    </div>
  );
};

export default App;