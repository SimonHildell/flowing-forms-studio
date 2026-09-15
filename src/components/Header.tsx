import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import portfolio from "@/assets/PortfolioSimonHildell.pdf";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // The header sits over the dark city banner for a full screen — flip it to a
  // light-on-dark bar while that is behind it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const city = document.getElementById("city");
      if (!city) return setOnDark(false);
      const rect = city.getBoundingClientRect();
      const mid = (window.innerWidth >= 768 ? 80 : 64) / 2;
      setOnDark(rect.top <= mid && rect.bottom >= mid);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  // The router owns the URL hash, so section links scroll rather than navigate.
  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 80);
    } else {
      scroll();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm transition-colors duration-300 ${
        onDark ? "bg-black/30 text-white" : "bg-background/80 text-foreground"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="text-sm md:text-base font-normal tracking-tight">
          Simon Hildell
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={goToSection(s.id)}
              className="text-sm hover:opacity-60 transition-opacity"
            >
              {s.label}
            </a>
          ))}
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-60 transition-opacity"
          >
            Portfolio
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          className={`md:hidden absolute top-16 left-0 right-0 border-b reveal ${
            onDark ? "bg-black/90 border-white/10" : "bg-background border-border"
          }`}
        >
          <div className="container py-6 flex flex-col gap-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-lg hover:opacity-60 transition-opacity"
                onClick={goToSection(s.id)}
              >
                {s.label}
              </a>
            ))}
            <a
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
