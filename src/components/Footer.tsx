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
              hello@studio.com
            </a>
          </div>

          {/* Right - Links */}
          <div className="md:col-span-6 flex flex-col md:flex-row md:justify-end gap-8 md:gap-16">
            <div>
              <p className="text-caption mb-4">Social</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-body hover:opacity-60 transition-opacity">Instagram</a>
                <a href="#" className="text-body hover:opacity-60 transition-opacity">LinkedIn</a>
                <a href="#" className="text-body hover:opacity-60 transition-opacity">Behance</a>
              </div>
            </div>
            <div>
              <p className="text-caption mb-4">Location</p>
              <p className="text-body text-muted-foreground">
                New York, NY
                <br />
                United States
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <p className="text-caption">© 2025 Studio Name. All rights reserved.</p>
          <p className="text-caption">Architectural & Computational Design</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
