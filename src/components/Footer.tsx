import compPortfolio from "@/assets/ComputationalDesignPortfolio.pdf";
import archPortfolio from "@/assets/ArchitecturalDesignPortfolio.pdf";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left - Contact */}
          <div className="md:col-span-6">
            <h2 className="text-headline mb-6">Let's collaborate</h2>
            <a
              href="mailto:hello@studio.com"
              className="text-display hover:opacity-60 transition-opacity"
            >
              simon@hildell.com
            </a>
          </div>

          {/* Right - Links */}
          <div className="md:col-span-6 flex flex-col md:flex-row md:justify-end gap-8 md:gap-16">
            <div>
              <p className="text-caption mb-4">Social</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/simonhildellworks/" target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-60 transition-opacity">Instagram</a>
                <a href="https://www.linkedin.com/in/simon-hildell-19b078107" target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-60 transition-opacity">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="text-caption mb-4">Portfolios</p>
              <div className="flex flex-col gap-2">
                <a href={compPortfolio} target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-60 transition-opacity">Computational design portfolio</a>
                <a href={archPortfolio} target="_blank" rel="noopener noreferrer" className="text-body hover:opacity-60 transition-opacity">Architectural design portfolio</a>
              </div>
            </div>
            <div>
              <p className="text-caption mb-4">Location</p>
              <p className="text-body text-muted-foreground">
                Lund, Sweden
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <p className="text-caption">© 2026 Simon Hildell</p>
          <p className="text-caption">Architectural & Computational Design student</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
