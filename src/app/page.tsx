import Link from "next/link";
import { MessageSquare, FileText, Code2, ImageIcon, ArrowRight } from "lucide-react";
import { SignalStrip } from "@/components/dashboard/signal-strip";

const TOOLS = [
  {
    key: "chat",
    label: "Chat",
    href: "/register",
    icon: MessageSquare,
    accent: "signal" as const,
    desc: "Ask questions, draft ideas, think out loud. Context carries across every session.",
  },
  {
    key: "resume",
    label: "Resume Builder",
    href: "/register",
    icon: FileText,
    accent: "data" as const,
    desc: "Turn rough notes into polished, role-targeted bullet points.",
  },
  {
    key: "code",
    label: "Code Reviewer",
    href: "/register",
    icon: Code2,
    accent: "signal" as const,
    desc: "Catches bugs, style drift, and risky patterns before a human has to.",
  },
  {
    key: "image",
    label: "Image Generator",
    href: "/register",
    icon: ImageIcon,
    accent: "data" as const,
    desc: "Describe it, get a finished image back — no separate tool required.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* NAV */}
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2.5">
            <span className="live-dot" />
            <span className="font-display font-medium text-text-primary">Console</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary">
              Sign in
            </Link>
            <Link href="/register" className="btn-primary">
              Start free
            </Link>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            <span className="label-eyebrow">four tools · one console</span>
            <h1 className="font-display text-4xl lg:text-[44px] leading-[1.08] font-medium text-text-primary mt-4 mb-5">
              Chat, review resumes, review code, and generate images — from one workspace.
            </h1>
            <p className="text-text-muted text-base leading-relaxed max-w-md mb-8">
              Console bundles four focused AI tools behind a single login, so your work
              doesn&apos;t get scattered across four different tabs.
            </p>
            <div className="flex items-center gap-3 mb-8">
              <Link href="/register" className="btn-primary flex items-center gap-2">
                Start free
                <ArrowRight size={15} />
              </Link>
              <Link href="/login" className="btn-secondary">
                Sign in
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span
                  key={t.key}
                  className={`tool-chip ${t.key === "chat" ? "is-active" : ""}`}
                  style={{ color: t.key === "chat" ? "#E08D3C" : undefined }}
                >
                  <t.icon size={13} strokeWidth={1.75} />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="panel p-6 relative overflow-hidden">
              <div className="scan-overlay is-active" />
              <div className="flex items-center justify-between mb-6">
                <span className="label-eyebrow">signal</span>
                <span className="flex items-center gap-1.5">
                  <span className="live-dot" />
                  <span className="label-eyebrow">live</span>
                </span>
              </div>
              <svg viewBox="0 0 560 140" className="w-full h-auto" fill="none">
                <path
                  d="M0,70 L60,70 Q80,20 100,70 T140,70 L180,70 Q200,115 220,70 T260,70
                     L300,70 Q320,35 340,70 T380,70 L420,70 Q440,105 460,70 T500,70 L560,70"
                  stroke="#E08D3C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 1200 }}
                  className="animate-trace"
                />
                <line x1="0" y1="70" x2="560" y2="70" stroke="#262A31" strokeWidth="1" />
              </svg>
              <div className="panel-raised p-3.5 mt-4">
                <p className="label-eyebrow mb-1.5">code reviewer · output</p>
                <p className="font-mono text-xs text-text-primary">
                  <span className="text-alert">warning</span> unused variable{" "}
                  <span className="text-data">&apos;userId&apos;</span> on line 42
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE STRIP — the actual console readout, shown here as a preview */}
      <SignalStrip />

      {/* TOOL GRID */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-lg mb-10">
          <span className="label-eyebrow">what&apos;s inside</span>
          <h2 className="font-display text-2xl font-medium text-text-primary mt-2">
            Four instruments, not four apps
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((t, i) => (
            <Link
              key={t.key}
              href={t.href}
              className="panel p-5 stagger-in hover:border-signal/40 transition"
              style={{ animationDelay: `${i * 90}ms`, animationFillMode: "forwards" }}
            >
              <t.icon
                size={18}
                strokeWidth={1.75}
                className={t.accent === "signal" ? "text-signal" : "text-data"}
              />
              <h3 className="font-display text-[15px] font-medium text-text-primary mt-4 mb-1.5">
                {t.label}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="panel p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="scan-overlay is-active" />
          <p className="label-eyebrow mb-3">this week</p>
          <p className="font-mono text-3xl text-signal animate-count-flicker mb-2">
            12,480 reviews run
          </p>
          <h2 className="font-display text-2xl font-medium text-text-primary mt-4 mb-3">
            One login. Four instruments.
          </h2>
          <p className="text-text-muted text-sm mb-7">No credit card required to start.</p>
          <Link href="/register" className="btn-primary inline-flex items-center gap-2">
            Start free
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto px-6 py-8 border-t border-line flex items-center justify-between">
        <span className="text-xs text-text-muted">© 2026 Console</span>
        <div className="flex gap-5 font-mono text-xs text-text-muted">
          <span>Docs</span>
          <span>Status</span>
          <span>Contact</span>
        </div>
      </div>
    </main>
  );
}