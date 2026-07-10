"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { RobotWorker } from "@/components/landing/ActivityFeed";

const LINES = ["Stop switching tabs", "to get work done."];

export function Hero() {
  const [line0, setLine0] = useState("");
  const [line1, setLine1] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function startTyping() {
      if (reduced) {
        setLine0(LINES[0]);
        setLine1(LINES[1]);
        return;
      }
      setTyping(true);
      let li = 0;
      let ci = 0;

      function type() {
        if (li >= LINES.length) {
          setTyping(false);
          return;
        }
        if (ci <= LINES[li].length) {
          const chunk = LINES[li].slice(0, ci);
          li === 0 ? setLine0(chunk) : setLine1(chunk);
          ci++;
          setTimeout(type, 32);
        } else {
          li++;
          ci = 0;
          if (li < LINES.length) setTimeout(type, 100);
          else setTyping(false);
        }
      }
      type();
    }

    window.addEventListener("console-boot-done", startTyping, { once: true });
    return () => window.removeEventListener("console-boot-done", startTyping);
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-8">
        <div>
          <span className="label-eyebrow">one workspace, four tools</span>
          <h1 className="mt-5 min-h-[2.4em] max-w-xl text-4xl font-semibold leading-[1.1] text-text-primary md:min-h-[2.2em] md:text-6xl">
            {line0}
            <br />
            {line1}
            {typing && (
              <span className="blink-cursor ml-1 inline-block h-[0.9em] w-[3px] bg-signal align-middle" />
            )}
          </h1>

          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-text-muted">
              Chat, generate images, build resumes, and review code — without
              four different logins, four different bills, or four different tabs.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#modules" className="btn-primary">
                Explore modules
              </a>
              <a href="/register" className="btn-secondary">
                Start free
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={280} direction="right">
          <RobotWorker />
        </Reveal>
      </div>
    </section>
  );
}