import Link from "next/link";
import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

/** Compact dark hero used on every interior page. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-brand/30 blur-[100px]" />
        <div className="absolute -right-16 top-4 h-64 w-64 rounded-full bg-cyan/25 blur-[100px]" />
        <div className="absolute inset-0 opacity-30 noise" />
      </div>

      <div className="shell relative py-14 sm:py-16 lg:py-20">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/65">
            <Link href="/" className="flex items-center gap-1 transition hover:text-white">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/85">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="mt-5 max-w-3xl">
          {eyebrow ? (
            <span className="eyebrow text-brand-light">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className={cn("mt-4 max-w-2xl text-lg leading-relaxed text-white/65")}>{description}</p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>

      <div aria-hidden="true" className="flex h-1.5">
        <span className="h-full flex-1 bg-cyan" />
        <span className="h-full flex-1 bg-magenta" />
        <span className="h-full flex-1 bg-yellow" />
        <span className="h-full flex-1 bg-brand" />
      </div>
    </section>
  );
}
