"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      const next = searchParams.get("next");
      router.replace(next && next.startsWith("/") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-ink/10 bg-white p-7 shadow-card sm:p-9">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="admin-email">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              className="field pl-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@adioprints.com"
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="admin-password">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              className="field pl-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-5 rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="mt-6 w-full"
        size="lg"
        disabled={loading}
        icon={loading ? <Loader2 className="h-5 w-5 animate-spin" /> : undefined}
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <p className="mt-4 text-center text-xs text-ink/60">
        Admin access only. Credentials come from ADMIN_EMAIL / ADMIN_PASSWORD in your environment.
      </p>
    </form>
  );
}
