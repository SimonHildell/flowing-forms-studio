import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cityBuildings } from "@/data/cityBuildings";
import { getProjectBySlug } from "@/data/projects";
import citySvgRaw from "@/assets/city/city-outlines.svg?raw";
import city1300 from "@/assets/city/city-1300.webp";
import city2600 from "@/assets/city/city-2600.webp";
import city5196 from "@/assets/city/city-5196.webp";
import cityFallback from "@/assets/city/city-2600.jpg";

/** How far past "cover" we zoom in. 1 = the image exactly fills the banner. */
const ZOOM_POINTER = 1.55;
const ZOOM_TOUCH = 1.0;

const IMAGE_W = 5196;
const IMAGE_H = 3000;

type Box = { cx: number; top: number };

const IsoCity = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgHostRef = useRef<HTMLDivElement>(null);

  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const [anchors, setAnchors] = useState<Record<string, Box>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, baseX: 0, baseY: 0, id: -1 });

  const byId = useMemo(() => {
    const map: Record<string, (typeof cityBuildings)[number]> = {};
    cityBuildings.forEach((b) => {
      // A building pointing at a project that isn't published yet still
      // highlights and shows its title, it just doesn't go anywhere.
      const reachable = b.slug ? Boolean(getProjectBySlug(b.slug)) : true;
      map[b.id] = reachable ? b : { ...b, slug: undefined };
    });
    return map;
  }, []);

  const byIdRef = useRef(byId);
  byIdRef.current = byId;

  // The exported SVG carries an XML prolog; strip it so it can be inlined.
  const svgMarkup = useMemo(() => citySvgRaw.replace(/<\?xml[^>]*\?>/, "").trim(), []);

  const clamp = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width: cw, height: ch } = el.getBoundingClientRect();
    const minX = Math.min(0, cw - stageSize.w);
    const minY = Math.min(0, ch - stageSize.h);
    pos.current.x = Math.min(0, Math.max(minX, pos.current.x));
    pos.current.y = Math.min(0, Math.max(minY, pos.current.y));
    if (stageRef.current) {
      stageRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
  }, [stageSize.w, stageSize.h]);

  // --- size the stage, and centre it on the projects the first time ----------
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width: cw, height: ch } = el.getBoundingClientRect();
      if (!cw || !ch) return;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const zoom = coarse ? ZOOM_TOUCH : ZOOM_POINTER;
      const cover = Math.max(cw / IMAGE_W, ch / IMAGE_H);
      const scale = cover * zoom;
      const w = IMAGE_W * scale;
      const h = IMAGE_H * scale;
      setStageSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      // Keep the current centre of view stable across resizes.
      pos.current.x = (cw - w) / 2;
      pos.current.y = (ch - h) / 2;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  useLayoutEffect(() => { clamp(); }, [clamp, stageSize.w, stageSize.h]);

  // --- read the label anchor (top centre) of every outline -------------------
  useLayoutEffect(() => {
    const host = svgHostRef.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    const vb = svg.getAttribute("viewBox")?.split(/[\s,]+/).map(Number);
    if (!vb || vb.length < 4) return;
    const [, , vbW, vbH] = vb;

    const next: Record<string, Box> = {};
    cityBuildings.forEach((b) => {
      const g = svg.querySelector<SVGGElement>(`#${CSS.escape(b.id)}`);
      if (!g) return;
      let box: DOMRect;
      try { box = g.getBBox(); } catch { return; }
      next[b.id] = {
        cx: ((box.x + box.width / 2) / vbW) * 100,
        top: (box.y / vbH) * 100,
      };
      const entry = byIdRef.current[b.id];
      const isLink = Boolean(entry?.slug || entry?.href);
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", isLink ? "link" : "img");
      g.setAttribute("aria-label", b.title);
      g.classList.add("ffs-bldg");
      g.classList.toggle("is-link", isLink);
    });
    setAnchors(next);
  }, [svgMarkup]);

  // Reflect the active building onto the inlined SVG.
  useEffect(() => {
    const host = svgHostRef.current;
    if (!host) return;
    host.querySelectorAll("g[id]").forEach((g) => {
      g.classList.toggle("is-on", g.id === activeId);
    });
  }, [activeId, anchors]);

  const open = useCallback(
    (id: string) => {
      const b = byId[id];
      if (!b) return;
      if (b.slug) {
        sessionStorage.setItem("ffs:home-scroll", String(window.scrollY));
        navigate(`/project/${b.slug}`, { state: { from: "city" } });
      } else if (b.href) {
        window.open(b.href, "_blank", "noopener,noreferrer");
      }
    },
    [byId, navigate],
  );

  // --- drag to pan -----------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.current.x,
      baseY: pos.current.y,
      id: e.pointerId,
    };
    setHasInteracted(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) > 5) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    if (!d.moved) return;
    pos.current.x = d.baseX + dx;
    pos.current.y = d.baseY + dy;
    clamp();
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || d.id !== e.pointerId) return;
    d.active = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);

    if (d.moved) return; // it was a pan, not a tap

    const hit = (e.target as Element).closest?.("g[id]") as SVGGElement | null;
    const id = hit?.id;
    if (!id || !byId[id]) {
      setActiveId(null);
      return;
    }
    if (e.pointerType === "mouse") {
      open(id);
    } else {
      // touch / pen: first tap reveals the label, second tap opens it
      if (activeId === id) open(id);
      else setActiveId(id);
    }
  };

  // Mouse hover highlights directly.
  const onPointerOver = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const hit = (e.target as Element).closest?.("g[id]") as SVGGElement | null;
    setActiveId(hit?.id && byId[hit.id] ? hit.id : null);
  };

  // Keyboard access.
  useEffect(() => {
    const host = svgHostRef.current;
    if (!host) return;
    const onFocus = (e: FocusEvent) => {
      const g = (e.target as Element)?.closest?.("g[id]") as SVGGElement | null;
      if (g?.id && byId[g.id]) setActiveId(g.id);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const g = (e.target as Element)?.closest?.("g[id]") as SVGGElement | null;
      if (g?.id && byId[g.id]) {
        e.preventDefault();
        open(g.id);
      }
    };
    host.addEventListener("focusin", onFocus);
    host.addEventListener("keydown", onKey);
    return () => {
      host.removeEventListener("focusin", onFocus);
      host.removeEventListener("keydown", onKey);
    };
  }, [byId, open]);

  // Dismiss the active label when tapping outside on touch devices.
  useEffect(() => {
    if (!activeId) return;
    const onDocDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (!containerRef.current?.contains(e.target as Node)) setActiveId(null);
    };
    document.addEventListener("pointerdown", onDocDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDocDown);
  }, [activeId]);

  useEffect(() => {
    if (activeId) setHasInteracted(true);
  }, [activeId]);

  // Cap the effective resolution at 2x so phones with a 3x screen don't pull
  // the 5196px master over cellular for no visible gain.
  const sizesAttr = useMemo(() => {
    if (!stageSize.w) return "100vw";
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const factor = Math.min(dpr, 2) / dpr;
    return `${Math.round(stageSize.w * factor)}px`;
  }, [stageSize.w]);

  return (
    <section
      id="city"
      aria-label="Isometric city of projects"
      className="relative h-screen w-full overflow-hidden bg-[#111]"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerOver={onPointerOver}
        onPointerLeave={() => setActiveId(null)}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={stageRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: stageSize.w || "100%", height: stageSize.h || "100%" }}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${city1300} 1300w, ${city2600} 2600w, ${city5196} 5196w`}
              sizes={sizesAttr}
            />
            <img
              src={cityFallback}
              alt="Isometric city containing Simon Hildell's projects"
              draggable={false}
              decoding="async"
              className="ffs-city-img block h-full w-full select-none"
            />
          </picture>

          <div
            ref={svgHostRef}
            className="ffs-city-svg absolute inset-0"
            data-active={activeId ?? ""}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />

          {/* Labels live inside the stage, so they travel with the image for
              free — but their size is in px, so they never scale with zoom. */}
          <div className="pointer-events-none absolute inset-0">
            {cityBuildings.map((b) => {
              const a = anchors[b.id];
              if (!a) return null;
              const on = activeId === b.id;
              return (
                <div
                  key={b.id}
                  className={`ffs-pin ${on ? "is-on" : ""}`}
                  style={{ left: `${a.cx}%`, top: `${a.top}%` }}
                >
                  <span
                    className="ffs-pin__text"
                    onPointerUp={(e) => {
                      if (!on) return;
                      e.stopPropagation();
                      open(b.id);
                    }}
                  >
                    {b.title}
                  </span>
                  <span className="ffs-pin__line" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* edge vignette, matches the hero's soft edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/60 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/60 to-transparent md:w-32" />

      <div
        className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
          hasInteracted ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-caption text-white/60">Drag to explore, tap a building</p>
      </div>
    </section>
  );
};

export default IsoCity;
