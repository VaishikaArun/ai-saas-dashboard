import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

const STATS = [
  { target: 4, suffix: "", label: "Modules", dir: "left" as const },
  { target: 128, suffix: "", label: "Tasks / min", dir: "left" as const },
  { target: 99, suffix: ".9%", label: "Uptime", dir: "right" as const },
  { target: 1, suffix: "", label: "Login", dir: "right" as const },
];

export function StatsSection() {
  return (
    <section id="stats" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} direction={s.dir} delay={i * 80}>
            <div className="border border-line bg-panel p-6 text-center">
              <Counter target={s.target} suffix={s.suffix} />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}