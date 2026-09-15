import { useLayoutEffect } from "react";
import Header from "./components/Header";
import HeroScroll from "./components/HeroScroll";
import IsoCity from "./components/IsoCity";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  // Coming back from a project (button or browser back) should land where you
  // left off, not at the top of the page.
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem("ffs:home-scroll");
    if (saved === null) return;
    sessionStorage.removeItem("ffs:home-scroll");
    const y = Number(saved);
    if (!Number.isFinite(y) || y <= 0) return;
    const restore = () => window.scrollTo(0, y);
    restore();
    // Media loading in above the fold can shift things; re-apply once.
    requestAnimationFrame(restore);
    window.setTimeout(restore, 120);
  }, []);

  return (
    <div className="App">
      {/* Navigation / header */}
      <Header />

      {/* Hero / landing section */}
      <HeroScroll />

      {/* Isometric city of projects */}
      <IsoCity />

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
