"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1000;
        const start = performance.now();

        function tick(now: number) {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(target);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <p ref={ref} className="font-display text-3xl font-semibold text-signal">
      {value}
      {suffix}
    </p>
  );
}