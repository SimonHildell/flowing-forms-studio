import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  srcs: string[];
  alt: string;
}

/**
 * Several images sharing one spot on the page. Arrows sit on the image itself,
 * it wraps around at the ends, and you can swipe on a phone or use the
 * arrow keys once it has focus.
 */
const Gallery = ({ srcs, alt }: GalleryProps) => {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = srcs.length;

  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <div
      className="ffs-gallery group relative select-none outline-none"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={`${alt} gallery`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* The first image sets the height; the rest stack on top of it. */}
      <div className="relative overflow-hidden">
        {srcs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} - ${i + 1} of ${count}`}
            loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className={`w-full h-auto object-cover transition-opacity duration-500 ease-out ${
              i === 0 ? "relative" : "absolute inset-0 h-full"
            } ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground backdrop-blur-sm transition-opacity duration-300 md:opacity-60 md:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {srcs.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                  i === index ? "w-5 opacity-100" : "w-1.5 opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
