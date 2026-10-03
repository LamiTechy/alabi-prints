import { ArrowRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getIcon } from "@/lib/icons";
import { waLink } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/site";

/** Detailed block for one service — used on /services and /services/[slug]. */
export function ServiceDetail({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = getIcon(service.icon);
  const dark = index % 2 === 1;
  const waMessage = `Hello Adio Prints, I'd like a quote for ${service.title}. Please send me prices and turnaround time.`;

  return (
    <article
      id={service.slug}
      className={cn(
        "scroll-mt-28 py-14 sm:py-16 lg:py-20",
        dark ? "bg-paper" : "bg-white",
      )}
    >
      <div className="shell grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-brand">
            <Icon className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-ink sm:text-4xl">{service.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">{service.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
              <Clock className="h-4 w-4" />
              Turnaround: {service.turnaround}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Get a quote for this
            </Button>
            <Button
              href={waLink(waMessage)}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Price on WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/60">
              Typical uses
            </h3>
            <ul className="mt-4 space-y-3">
              {service.uses.map((use) => (
                <li key={use} className="flex items-start gap-2.5 text-sm text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/60">
              Options & materials
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.options.map((option) => (
                <li
                  key={option}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-semibold text-ink/70"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
