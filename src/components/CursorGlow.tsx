"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[220px] w-[220px]"
      style={{
        // Much smaller, much fainter — reads as a soft depth cue near the
        // cursor rather than a wash of color across the page.
        background:
          "radial-gradient(circle, rgba(255,255,255,0.04), rgba(47,127,255,0.025) 50%, transparent 75%)",
        filter: "blur(24px)",
      }}
    />
  );
}