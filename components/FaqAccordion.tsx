"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span className="font-display text-base font-bold text-ink sm:text-lg">{item.q}</span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full transition",
                    isOpen ? "rotate-45 bg-brand text-white" : "bg-paper text-ink/70",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              hidden={!isOpen}
              className="px-5 pb-6 sm:px-7"
            >
              <p className="max-w-3xl text-[15px] leading-relaxed text-ink/65">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
