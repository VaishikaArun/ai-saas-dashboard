"use client";

import { useEffect, useState } from "react";

const BOOT_TEXT = "> initializing workspace... ready";

// Dispatches a "console-boot-done" window event when finished, so other
// components (e.g. the hero typewriter) can wait for it instead of guessing
// a fixed delay.
export function BootSequence() {
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setHidden(true);
      window.dispatchEvent(new Event("console-boot-done"));
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setText(BOOT_TEXT.slice(0, i));
      if (i >= BOOT_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          window.dispatchEvent(new Event("console-boot-done"));
        }, 350);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink font-mono text-sm text-text-muted transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <span>{text}</span>
      <span className="blink-cursor ml-1 inline-block h-4 w-2 bg-signal" />
    </div>
  );
}