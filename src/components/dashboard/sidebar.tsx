"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  FileText,
  Code2,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, accent: "signal" },
  { href: "/chat", label: "AI Chat", icon: MessageSquare, accent: "signal" },
  { href: "/image-generator", label: "Image Gen", icon: ImageIcon, accent: "data" },
  { href: "/resume-builder", label: "Resume Builder", icon: FileText, accent: "data" },
  { href: "/code-reviewer", label: "Code Reviewer", icon: Code2, accent: "signal" },
] as const;

export function Sidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-line bg-panel flex flex-col">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-display font-medium text-text-primary text-[15px]">Patchbay</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, accent }, i) => {
          const active = pathname === href;
          const isData = accent === "data";
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-panel text-sm transition stagger-in ${
                active
                  ? isData
                    ? "text-data"
                    : "text-signal"
                  : "text-text-muted hover:text-text-primary hover:bg-panel-raised/60"
              }`}
              style={{
                animationDelay: `${i * 60}ms`,
                animationFillMode: "forwards",
                background: active
                  ? isData
                    ? "rgba(111,168,181,0.1)"
                    : "rgba(224,141,60,0.1)"
                  : undefined,
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                  style={{ background: isData ? "#4FD1C5" : "#E08D3C" }}
                />
              )}
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-line">
        <p className="text-xs text-text-muted truncate mb-2 flex items-center gap-1.5">
          <span className="live-dot" />
          {userName ?? "Signed in"}
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 text-xs text-text-muted hover:text-alert transition"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}