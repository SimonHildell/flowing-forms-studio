import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroScroll />
        <ProjectsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
