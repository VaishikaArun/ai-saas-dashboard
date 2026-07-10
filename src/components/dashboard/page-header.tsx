import { LucideIcon } from "lucide-react";

const ACCENT_COLORS: Record<string, string> = {
  signal: "#FF2D6C",
  data: "#2F7FFF",
  alert: "#FF4D4D",
};

export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  accent = "signal",
  status,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  accent?: "signal" | "data" | "alert";
  status?: string;
}) {
  const color = ACCENT_COLORS[accent] ?? ACCENT_COLORS.signal;

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel border border-line bg-panel"
          style={{ color }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <div>
          <span className="label-eyebrow">{eyebrow}</span>
          <h1 className="mt-0.5 text-2xl font-semibold text-text-primary">{title}</h1>
        </div>
      </div>

      {status && (
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          <span className="status-live" />
          {status}
        </span>
      )}
    </div>
  );
}