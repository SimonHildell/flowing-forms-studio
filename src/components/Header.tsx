import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="text-sm md:text-base font-normal tracking-tight">
          Studio / Name
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm hover:opacity-60 transition-opacity">Work</a>
          <a href="#about" className="text-sm hover:opacity-60 transition-opacity">About</a>
          <a href="#contact" className="text-sm hover:opacity-60 transition-opacity">Contact</a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            <a
              href="#work"
              className="text-lg hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#about"
              className="text-lg hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-lg hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
