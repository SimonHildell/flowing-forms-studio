import { useRef } from "react";

interface PlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * A real video: has sound, has controls, the visitor is meant to watch it.
 * Starts muted so it can autoplay; clicking unmutes it and mutes every other
 * video on the page.
 */
const Player = ({ src, poster, className }: PlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
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
