"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm stagger-in" style={{ animationFillMode: "forwards" }}>
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Logo size={18} className="text-text-primary" />
            <span className="label-eyebrow">patchbay v0.1</span>
          </div>
          <h1 className="font-display text-2xl font-medium text-text-primary">Sign in</h1>
          <p className="text-sm text-text-muted mt-1">Access your workspace</p>
        </div>

        <div className="panel p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-eyebrow block mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="label-eyebrow block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-alert font-mono">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading && <span className="status-live" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <span className="h-px flex-1 bg-line" />
            <span className="label-eyebrow">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="btn-secondary w-full"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          No account?{" "}
          <Link href="/register" className="text-signal hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}