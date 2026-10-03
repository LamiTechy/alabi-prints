"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
] as const;

export type StatusValue = (typeof STATUS_OPTIONS)[number]["value"];

const statusStyles: Record<StatusValue, string> = {
  new: "bg-brand/10 text-brand",
  contacted: "bg-cyan/15 text-cyan-700",
  in_progress: "bg-yellow/25 text-yellow-700",
  completed: "bg-[#25D366]/15 text-[#0F7A3D]",
};

export function StatusSelect({ id, status }: { id: string; status: StatusValue }) {
  const router = useRouter();
  const [value, setValue] = useState<StatusValue>(status);
  const [saving, setSaving] = useState(false);

  async function onChange(next: StatusValue) {
    const previous = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      setValue(previous);
    } finally {
      setSaving(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
          statusStyles[value],
        )}
      >
        {STATUS_OPTIONS.find((o) => o.value === value)?.label}
      </span>
      <select
        aria-label="Change status"
        value={value}
        disabled={saving}
        onChange={(e) => onChange(e.target.value as StatusValue)}
        className="rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-xs font-semibold text-ink focus:border-brand focus:outline-none"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ink/40" /> : null}
    </span>
  );
}
