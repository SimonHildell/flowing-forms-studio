const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:col-span-5">
            <p className="text-caption mb-2">About</p>
            <h2 className="text-headline">Studio Philosophy</h2>
          </div>

          {/* Right column */}
          <div className="md:col-span-7">
            <p className="text-body text-lg leading-relaxed mb-8">
              We operate at the intersection of architecture, computation, and material innovation.
              Our practice embraces algorithmic thinking not as an end in itself, but as a means
              to discover forms and systems that would otherwise remain hidden.
            </p>
            <p className="text-body text-lg leading-relaxed mb-12 text-muted-foreground">
              Every project begins with a question—about space, about structure, about the
              relationship between the built environment and its inhabitants. Through iterative
              computational exploration, we seek answers that are both unexpected and inevitable.
            </p>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Computational Design</h3>
                <p className="text-body text-muted-foreground">
                  Parametric modeling, generative algorithms, optimization
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Architecture</h3>
                <p className="text-body text-muted-foreground">
                  Concept to construction, all scales and typologies
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Facade Engineering</h3>
                <p className="text-body text-muted-foreground">
                  Complex geometries, performance optimization
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Digital Fabrication</h3>
                <p className="text-body text-muted-foreground">
                  CNC, 3D printing, robotic manufacturing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
