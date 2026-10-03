"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import {
  portfolio,
  portfolioCategories,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/site";
import { cn } from "@/lib/utils";

interface PortfolioGridProps {
  items?: PortfolioItem[];
  categories?: ReadonlyArray<"All" | PortfolioCategory>;
  limit?: number;
  showFilters?: boolean;
}

export function PortfolioGrid({
  items = portfolio,
  categories = portfolioCategories,
  limit,
  showFilters = true,
}: PortfolioGridProps) {
  const [active, setActive] = useState<"All" | PortfolioCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = (active === "All" ? items : items.filter((i) => i.category === active)).slice(
    0,
    limit ?? items.length,
  );

  const current = lightbox !== null ? filtered[lightbox] : null;

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % filtered.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, filtered.length]);

  return (
    <div>
      {showFilters ? (
        <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter portfolio">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={cn("chip", active === category && "chip-active")}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden rounded-2xl border border-ink/8 bg-white text-left shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.client}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  style={{ background: item.gradient }}
                  aria-hidden="true"
                />
              )}
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                {item.category}
              </span>
              <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink">
                  <Maximize2 className="h-5 w-5" />
                </span>
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink/55">{item.client}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-ink/60">No items in this category yet.</p>
      ) : null}

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              {current.image ? (
                <Image
                  src={current.image}
                  alt={`${current.title} — ${current.client}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full" style={{ background: current.gradient }} aria-hidden="true" />
              )}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-card transition hover:bg-paper"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand">
                  {current.category}
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-ink">{current.title}</h3>
                <p className="mt-1 text-sm text-ink/55">
                  {current.client} — {current.description}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition hover:border-brand hover:text-brand"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => setLightbox((i) => ((i ?? 0) + 1) % filtered.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition hover:border-brand hover:text-brand"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
