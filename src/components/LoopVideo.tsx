import { useEffect, useRef } from "react";

interface LoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** Pause while off-screen to save battery. Default true. */
  lazy?: boolean;
}

/**
 * A GIF that isn't a GIF.
 *
 * Looks and behaves exactly like an animated GIF — autoplays, loops forever,
 * silent, no controls, no progress bar, not scrubbable — but it's an MP4, so
 * it's an order of magnitude smaller and decodes on the GPU.
 *
 * The retry logic matters: in-app browsers (LinkedIn, Instagram, Facebook) and
 * iOS Low Power Mode refuse the initial autoplay and leave a frozen frame
 * behind. We keep nudging it — on visibility change, on bfcache restore, on the
 * first user gesture — so it recovers instead of sitting dead.
 */
const LoopVideo = ({ src, poster, className, lazy = true }: LoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set imperatively as well as via attribute — some engines only honour the
    // property when deciding whether autoplay is allowed.
    el.muted = true;
    el.defaultMuted = true;

    let onScreen = true;

    const attempt = () => {
      if (!onScreen || document.hidden) return;
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => { /* retried later */ });
    };

    const onVisibility = () => { if (!document.hidden) attempt(); };
    const onPageShow = () => attempt();
    const onGesture = () => attempt();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onGesture);
    // A single user gesture unlocks playback in every browser that blocks it.
    document.addEventListener("touchstart", onGesture, { passive: true });
    document.addEventListener("pointerdown", onGesture, { passive: true });
    el.addEventListener("canplay", attempt);
    el.addEventListener("loadeddata", attempt);
    // Some webviews silently stall mid-clip.
    el.addEventListener("suspend", attempt);

    let observer: IntersectionObserver | undefined;
    if (lazy && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen) attempt();
          else el.pause();
        },
        { rootMargin: "200px" },
      );
      observer.observe(el);
    }

    attempt();
    const kick = window.setTimeout(attempt, 1200);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onGesture);
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("pointerdown", onGesture);
      el.removeEventListener("canplay", attempt);
      el.removeEventListener("loadeddata", attempt);
      el.removeEventListener("suspend", attempt);
      observer?.disconnect();
      window.clearTimeout(kick);
    };
  }, [src, lazy]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- iOS-specific, still needed for older Safari
      webkit-playsinline="true"
      x5-playsinline="true"
      controls={false}
      tabIndex={-1}
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
      className={className}
    />
  );
};

export default LoopVideo;
