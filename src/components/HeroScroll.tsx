import heroPanorama from "@/assets/hero-panorama.jpg";

const HeroScroll = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Scrolling container */}
      <div className="absolute inset-0 flex items-center">
        <div className="animate-scroll-left flex">
          {/* Duplicate the image for seamless loop */}
          <img
            src={heroPanorama}
            alt="Architectural panorama"
            className="h-[70vh] w-auto max-w-none object-cover"
          />
          <img
            src={heroPanorama}
            alt="Architectural panorama"
            className="h-[70vh] w-auto max-w-none object-cover"
          />
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
        <div className="container">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
            <p className="text-caption mb-2">Computational Designer</p>
            <h1 className="text-display max-w-3xl">
              Architecture at the
              <br />
              intersection of form
              <br />
              and algorithm
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-caption">Scroll</span>
          <div className="h-12 w-px bg-foreground/30" />
        </div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
};

export default HeroScroll;
