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
            <p className="text-body text-lg leading-relaxed text-muted-foreground">
              I have a huge passion for creative problem solving through computational design and 
              the use of mathematics to inform form, structure, and spatial logic. My work explores 
              the intersection of technology, materiality and human experience, 
              aiming to create spaces that are both functional and emotionally engaging. I enjoy 
              experimenting with parametric tools, digital fabrication, and interactive environments 
              to push the boundaries of what we can achieve through architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
