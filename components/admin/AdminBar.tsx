"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminBar({ email }: { email: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-ink/55 sm:block">{email}</span>
      <button
        type="button"
        onClick={logout}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand disabled:opacity-50"
      >
        <LogOut className="h-4 w-4" />
        {busy ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
