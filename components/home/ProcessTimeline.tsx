import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { getIcon } from "@/lib/icons";
import { processSteps } from "@/data/site";

export function ProcessTimeline() {
  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          title="Design → Print → Deliver → Grow"
          description="Four simple steps from your idea to finished prints in your hands."
        />

        <div className="relative mt-14">
          {/* horizontal connector (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dashed border-ink/15 lg:block"
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal as="li" key={item.step} delay={i * 90} className="relative">
                  <div className="flex items-start gap-4 lg:block lg:text-center">
                    <div className="relative lg:mx-auto">
                      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-ink/10 bg-white text-brand shadow-card">
                        <Icon className="h-7 w-7" />
                      </span>
                      <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-ink font-display text-[11px] font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div className="lg:mt-5">
                      <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60 lg:mx-auto">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
