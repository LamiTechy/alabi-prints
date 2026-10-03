import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceDetail } from "@/components/ServiceDetail";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServiceCard } from "@/components/ServiceCard";
import { business, faqs, getService, services } from "@/data/site";
import { pageMeta } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return pageMeta({
    title: `${service.title} — ${service.short}`,
    description: `${service.description} Turnaround: ${service.turnaround}. Request a free quote from ${business.name}.`,
    path: `/services/${service.slug}`,
    keywords: [...service.keywords],
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.short}
        description={service.description}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?service=${encodeURIComponent(service.title)}`} size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            Get a quote for {service.title}
          </Button>
        </div>
      </PageHero>

      <ServiceDetail service={service} index={0} />

      {/* File requirements */}
      <section className="bg-white py-14 sm:py-16">
        <div className="shell grid gap-8 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-yellow">
            <FileText className="h-8 w-8" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Ready files speed everything up</h2>
            <p className="mt-2 max-w-2xl text-ink/65">
              Send PDF, AI, CDR or high-resolution PNG at 300 DPI in CMYK. No artwork? Our designers
              will set it up for you — just send your logo and the message you want to print.
            </p>
            <Link
              href="/how-it-works"
              className="mt-4 inline-flex items-center gap-2 font-bold text-brand hover:gap-3"
            >
              See file & proofing guidelines <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="shell">
          <SectionHeading eyebrow="More services" title="You may also need" align="left" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <ServiceCard key={item.slug} service={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              align="left"
              description="Still unsure? Message us on WhatsApp — we reply fast."
            />
          </div>
          <FaqAccordion items={faqs.slice(0, 6)} />
        </div>
      </section>

      <CtaBand
        title={`Let's print your ${service.title.toLowerCase()}`}
        text={`Tell us the size, quantity and deadline — we'll send a free quote for ${service.title} within minutes during working hours.`}
      />
    </>
  );
}
