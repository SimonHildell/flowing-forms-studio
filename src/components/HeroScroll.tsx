import { useEffect, useRef } from "react";
import heroPanorama from "@/assets/hero-panorama.jpg";

const HeroScroll = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // In-app browsers sometimes hand us a paused animation (backgrounded tab,
  // bfcache restore, a :hover that stuck on a touch screen). Nudge it back.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const resume = () => {
      const anims = (el as HTMLElement & { getAnimations?: () => Animation[] }).getAnimations?.();
      anims?.forEach((a) => {
        if (a.playState === "paused") a.play();
      });
    };

    const onVisibility = () => { if (!document.hidden) resume(); };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onVisibility);
    window.addEventListener("focus", resume);
    document.addEventListener("touchend", resume, { passive: true });
    const t1 = window.setTimeout(resume, 800);
    const t2 = window.setTimeout(resume, 2500);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onVisibility);
      window.removeEventListener("focus", resume);
      document.removeEventListener("touchend", resume);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Scrolling container */}
      <div className="absolute inset-0 flex items-center">
        <div ref={trackRef} className="animate-scroll-left flex">
          {/* Duplicate the image for seamless loop */}
          <img
            src={heroPanorama}
            alt="Architectural panorama"
            fetchPriority="high"
            decoding="async"
            className="h-[70vh] w-auto max-w-none object-cover"
          />
          <img
            src={heroPanorama}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="h-[70vh] w-auto max-w-none object-cover"
          />
        </div>
      </div>

      {/* Overlay content */}
<div className="absolute inset-0 flex flex-col justify-end pb-48 md:pb-64">
  <div className="container">
    <div
      className="reveal text-white"
      style={{ animationDelay: "0.5s" }}
    >
      {/*<p className="text-caption mb-2">TEXT ÖVER STOR TEXT</p>*/}
      <h1 className="text-display max-w-3xl">
        Computational and
        <br />
        architectural design
        <br />
        student
      </h1>
    </div>
  </div>
</div>



      {/* Gradient overlays for smooth edges !!!!!!!!!!!!*/}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
};

export default HeroScroll;
