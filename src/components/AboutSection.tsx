const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:col-span-5">
            <p className="text-caption mb-2">About</p>
            <h2 className="text-headline">Who I am</h2>
          </div>

          {/* Right column */}
          <div className="md:col-span-7">
            <p className="text-body text-lg leading-relaxed mb-8">
              I am an architecture student currently pursuing a Master of Science in 
              Digital Architecture and Emergent Futures at Lund University. 
            </p>
            <p className="text-body text-lg leading-relaxed mb-12 text-muted-foreground">
              I have a huge passion for creative problem solving through computational design and 
              the use of mathematics to inform form, structure, and spatial logic. My work explores 
              the intersection of technology, materiality and human experience, 
              aiming to create spaces that are both functional and emotionally engaging. I enjoy 
              experimenting with parametric tools, digital fabrication, and interactive environments 
              to push the boundaries of what we can achieve through architecture.
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
                  Concept to construction, all scales, typologies and phases
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Parametric Tools</h3>
                <p className="text-body text-muted-foreground">
                  Scripting and rule-based approaches
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-2">Creative Problem Solving</h3>
                <p className="text-body text-muted-foreground">
                  Algorithmic thinking and inventive solutions
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
