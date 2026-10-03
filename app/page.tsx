import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyUs } from "@/components/home/WhyUs";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services, slogans, stats } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Printing Press in Nigeria — Banners, Signage, T-Shirts & Business Cards",
  description:
    "Adio Prints International is a printing press in Nigeria for banner and flex printing, signage and billboards, custom T-shirt printing, business cards, stickers and flyers. Fast, quality, affordable — request a free quote.",
  path: "/",
  keywords: [
    "printing company Lagos",
    "flex banner printing",
    "custom T-shirt printing Lagos",
    "signage company Nigeria",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="shell grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-brand pl-4">
              <p className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="What we print"
            title="Everything your brand needs, under one roof"
            description="From one-off business cards to nationwide billboard campaigns — pick a service and request a quote in under a minute."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 4) * 70}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/services" variant="outline" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
              View all services & options
            </Button>
          </div>
        </div>
      </section>

      <ProcessTimeline />

      {/* Featured work */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured work"
            title="Prints that speak for themselves"
            description="A quick look at recent projects — banners, signage, apparel and more."
          />
          <div className="mt-10">
            <PortfolioGrid limit={6} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/portfolio" variant="dark" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
              See the full portfolio
            </Button>
          </div>
        </div>
      </section>

      <WhyUs />
      <ClientLogos />

      {/* Testimonials */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Client love"
            title="Big dreams, bigger prints"
            description="Placeholder testimonials — replace them in /data/site.ts with real client quotes."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBand />
      <p className="sr-only">{slogans.bigDreams}</p>
    </>
  );
}
