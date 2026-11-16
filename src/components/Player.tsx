import { useEffect, useRef, useState } from "react";

interface PlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * A real video: has sound, has controls, the visitor is meant to watch it.
 * Starts muted so it can autoplay; clicking unmutes it and mutes every other
 * video on the page.
 *
 * It only starts downloading once it's about to scroll into view, so a long
 * page doesn't pull every video over a phone connection up front. Until then
 * the poster frame stands in.
 */
const Player = ({ src, poster, className }: PlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) return setNear(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      controls
      preload={near ? "metadata" : "none"}
      className={className}
      onClick={(e) => {
        const self = e.currentTarget;
        document.querySelectorAll("video").forEach((v) => {
          if (v !== self) v.muted = true;
        });
        self.muted = false;
      }}
    />
  );
};

export default Player;
