import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";

export function CtaSection() {
  return (    
    <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <div className="flex flex-col items-center gap-6 border border-line bg-panel p-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <span className="label-eyebrow">no credit card required</span>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
              Every module, one plan.
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a href="/register" className="btn-primary">
              Start free
            </a>
            <a href="#" className="btn-secondary">
              View pricing
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
            {/* <div className="flex w-full items-center justify-between px-8 py-4"> */}

      <div className="flex w-full items-center justify-between flex-col gap-4 px-8 py-4 font-mono text-xs uppercase tracking-widest text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo size={16} className="text-text-primary" />
          Patchbay
        </div>
        <p>© {new Date().getFullYear()} Patchbay. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-text-primary">Privacy</a>
          <a href="#" className="hover:text-text-primary">Terms</a>
        </div>
      </div>
    </footer>
  );
}