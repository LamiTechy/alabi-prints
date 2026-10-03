import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Service, ServiceAccent } from "@/data/site";

const accentText: Record<ServiceAccent, string> = {
  cyan: "text-cyan-700",
  magenta: "text-magenta-700",
  yellow: "text-yellow-600",
  red: "text-brand",
};

const accentBg: Record<ServiceAccent, string> = {
  cyan: "bg-cyan/10",
  magenta: "bg-magenta/10",
  yellow: "bg-yellow/20",
  red: "bg-brand/10",
};

const accentBar: Record<ServiceAccent, string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  yellow: "bg-yellow",
  red: "bg-brand",
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = getIcon(service.icon);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
          accentBar[service.accent],
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid h-12 w-12 place-items-center rounded-xl", accentBg[service.accent])}>
          <Icon className={cn("h-6 w-6", accentText[service.accent])} />
        </span>
        <span className="font-display text-xs font-bold text-ink/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{service.short}</p>

      <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
        <Link
          href={`/services/${service.slug}`}
          className="text-sm font-semibold text-ink/70 transition hover:text-brand"
        >
          Details
        </Link>
        <Link
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-brand transition group-hover:gap-2"
        >
          Request this
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
