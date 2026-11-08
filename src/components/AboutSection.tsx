// To change the photo: replace src/assets/portrait.jpg with your own, keeping
// the same filename. Nothing else needs touching. The crop is set by the
// aspect-[4/5] class further down — swap it for aspect-square if you'd rather
// not crop.
import portrait from "@/assets/portrait.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:col-span-5">
            <p className="text-caption mb-2">About</p>
            <h2 className="text-headline">Who I am</h2>

            <div className="mt-8 md:mt-10 max-w-[260px] md:max-w-[300px] overflow-hidden">
              <img
                src={portrait}
                alt="Simon Hildell"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-7">
            <p className="text-body text-lg leading-relaxed mb-8">
              I am an architecture student currently pursuing a Master of Science in 
              Digital Architecture and Emergent Futures at Lund University. 
            </p>
            <div className="space-y-6 text-body text-lg leading-relaxed text-muted-foreground">
              <p>
                I am a curious guy who enjoys movies, boardgames and quiz nights. I have a huge
                passion for creative problem solving through computational design and the use of
                mathematics to inform form structure and spatial logic. I like running into problems
                and understand the underlying logic of systems we use.
              </p>
              <p>
                I stay super up to date with the newest tools available and have in-depth knowledge
                of most of the main tools used in architecture. On this web I have compiled some of
                my favorite works, hope you enjoy it and feel free to reach out to talk!
              </p>
              <p>
                If you still haven't gotten enough,{" "}
                <a
                  href="https://www.simonhildell.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  play my game!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
