import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CMYKDivider } from "@/components/ui/CMYKDivider";
import { Reveal } from "@/components/Reveal";
import { getIcon } from "@/lib/icons";
import { business, slogans, stats, whyUs } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About — Your Printing Press in Nigeria",
  description:
    "Adio Prints International is a Nigerian printing and branding business helping small businesses, churches, schools and events look professional. Our story, mission and values.",
  path: "/about",
  keywords: ["printing company Nigeria", "printing press Lagos", "branding company Nigeria"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={slogans.bigDreams}
        description="Adio Prints International exists to help Nigerian businesses look as good as they really are — with prints that are fast, affordable and properly done."
        crumbs={[{ label: "About" }]}
      />

      {/* Story + owner */}
      <section className="bg-white py-16 sm:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-ink via-ink-700 to-brand/70 shadow-card">
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <div>
                  <span className="font-display text-6xl font-extrabold text-white/80">AP</span>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    Founder photo
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">
                    Replace this placeholder with a real photo at{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5">/public/images/founder.jpg</code>{" "}
                    and update the bio in <code className="rounded bg-white/10 px-1.5 py-0.5">/data/site.ts</code>.
                  </p>
                </div>
              </div>
              <CMYKDivider className="absolute inset-x-0 bottom-0" />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-card">
              <p className="font-display text-2xl font-extrabold text-ink">{stats[0].value}</p>
              <p className="text-xs text-ink/55">{stats[0].label}</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="From a small press to a full print & branding partner"
              align="left"
            />
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/65 sm:text-base">
              <p>
                {business.name} started with one goal: make quality printing accessible to every
                Nigerian business — not just the big brands with big budgets. What began as a small
                operation handling flyers and banners has grown into a full-service print and
                branding partner.
              </p>
              <p>
                Today we produce banners, signage, stickers, apparel, business cards, invitations and
                branded materials for businesses, churches, schools, event planners and individuals
                across Nigeria. The equipment has changed; the promise hasn&apos;t —{" "}
                <strong className="text-ink">{business.tagline}</strong>.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border-l-4 border-brand bg-paper p-5">
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-brand">
                Owner&apos;s note
              </p>
              <p className="mt-2 text-[15px] italic leading-relaxed text-ink/70">
                “Every job that leaves our press carries our name. We print as if the whole brand
                depends on it — because for our clients, it does.”
              </p>
              <p className="mt-3 text-sm font-semibold text-ink">— Founder, Adio Prints International</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink py-14 text-white">
        <div className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-brand pl-4">
              <p className="font-display text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + values */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Mission & values"
            title="What we stand for"
            description="Fast. Quality. Affordable. — in that order, every single time."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.title} delay={i * 60}>
                  <article className="h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to work with us?"
        text="Tell us about your project and get a free quote — no obligation, no pressure, just a clear price."
      />
    </>
  );
}
