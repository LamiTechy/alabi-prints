import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { getIcon } from "@/lib/icons";
import { whyUs } from "@/data/site";

export function WhyUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Why choose us"
          title="Bigger. Brighter. Better Prints."
          description="Nigerian businesses keep coming back for one reason: we make them look good, on time and on budget."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="group h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-card-hover">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-white transition group-hover:bg-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
