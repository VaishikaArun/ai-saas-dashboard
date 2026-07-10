"use client";

import { ReactNode, useRef } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    card.style.setProperty("--x", `${px}px`);
    card.style.setProperty("--y", `${py}px`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      const rx = (py / r.height - 0.5) * -8;
      const ry = (px / r.width - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    }
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card ${className}`}
      style={{ transition: "transform 0.1s ease-out" }}
    >
      <div className="spotlight" />
      {children}
    </div>
  );
}