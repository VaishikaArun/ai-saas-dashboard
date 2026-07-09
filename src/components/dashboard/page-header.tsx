import type { LucideIcon } from "lucide-react";

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
  accent?: "signal" | "data";
  status?: string;
}) {
  const isData = accent === "data";
  return (
    <div className="page-header">
      <div className={`page-header-glow ${isData ? "is-data" : ""}`} />
      <div className={`icon-badge ${isData ? "is-data" : ""}`}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <span className="label-eyebrow">{eyebrow}</span>
        <h1 className="font-display text-2xl font-medium mt-0.5">{title}</h1>
      </div>
      {status && (
        <span className="flex items-center gap-1.5">
          <span className={`live-dot ${isData ? "is-data" : ""}`} />
          <span className="label-eyebrow">{status}</span>
        </span>
      )}
    </div>
  );
}