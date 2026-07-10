import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={22} className="text-text-primary" />
          <span className="font-mono text-sm uppercase tracking-widest text-text-primary">
            Patchbay
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#modules" className="font-mono text-xs uppercase tracking-widest text-text-muted transition hover:text-text-primary">
            Modules
          </a>
          <a href="#stats" className="font-mono text-xs uppercase tracking-widest text-text-muted transition hover:text-text-primary">
            Stats
          </a>
          <a href="#pricing" className="font-mono text-xs uppercase tracking-widest text-text-muted transition hover:text-text-primary">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary">
            Sign in
          </Link>
          <Link href="/register" className="btn-primary">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}