import { clientLogos } from "@/data/site";

/** Social proof strip — placeholder client names, editable in /data/site.ts. */
export function ClientLogos() {
  return (
    <section aria-label="Clients we have worked with" className="border-y border-ink/8 bg-white py-10">
      <div className="shell">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
          Trusted by businesses, churches and schools
        </p>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <ul className="flex min-w-full animate-marquee items-center gap-12 whitespace-nowrap">
            {[...clientLogos, ...clientLogos].map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="font-display text-lg font-bold text-ink/35 transition hover:text-ink/70"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
