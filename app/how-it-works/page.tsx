import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { faqs, services, slogans } from "@/data/site";
import { waGreeting, waLink } from "@/lib/links";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How It Works — Ordering, File Requirements, Proofing & Delivery",
  description:
    "How to order prints: what files we accept (PDF/AI/CDR/PNG, 300 DPI, CMYK), proofing, production times, delivery and what affects price. Plus 9 frequently asked questions.",
  path: "/how-it-works",
  keywords: ["print file requirements", "how to order printing Nigeria", "print proofing"],
});

const steps = [
  {
    n: "01",
    title: "Tell us what you need",
    text: "Fill the quote form or send a WhatsApp message with the service, size, quantity and deadline. No artwork yet? Describe it — we can design it for you.",
  },
  {
    n: "02",
    title: "Get your free quote",
    text: "We reply with price, material options and turnaround. No hidden charges. Happy with it? A 50% deposit confirms the job.",
  },
  {
    n: "03",
    title: "Approve your proof",
    text: "You receive a digital proof showing exactly how the print will look. We don't run anything until you approve it.",
  },
  {
    n: "04",
    title: "We print & finish",
    text: "Your job is printed, laminated, cut, hemmed or fabricated as required, then checked against the approved proof.",
  },
  {
    n: "05",
    title: "Collect or get it delivered",
    text: "Pick up from our Lagos shop or we dispatch nationwide with tracking. Balance is due before delivery.",
  },
];

const fileRules = [
  { label: "Best formats", value: "PDF (press ready), AI, CDR" },
  { label: "Also accepted", value: "PNG / JPG at 300 DPI minimum" },
  { label: "Colour mode", value: "CMYK (we convert RGB free of charge)" },
  { label: "Resolution", value: "300 DPI at actual size" },
  { label: "Fonts", value: "Outlined / embedded" },
  { label: "Margins", value: "3–5mm bleed on banners and flyers" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Simple process. Zero surprises."
        description="From your first message to delivery — here is exactly what happens, what files to send and how pricing works."
        crumbs={[{ label: "How It Works" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Start with a free quote
          </Button>
          <Button href={waLink(waGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon className="h-5 w-5" />}>
            Ask on WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* Steps */}
      <section className="bg-white py-16 sm:py-20">
        <div className="shell">
          <SectionHeading eyebrow="The process" title={slogans.process} />
          <ol className="mt-12 space-y-5">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 60}>
                <div className="grid gap-4 rounded-2xl border border-ink/8 bg-white p-6 shadow-card sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink font-display text-lg font-extrabold text-brand">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink/65">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* File requirements */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Artwork"
            title="File requirements"
            description="Good files mean faster printing and sharper results. If your file isn't ready, we'll fix it — just ask."
          />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fileRules.map((rule) => (
              <div key={rule.label} className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{rule.label}</dt>
                <dd className="mt-2 font-display text-base font-bold text-ink">{rule.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Turnaround + pricing guidance */}
      <section className="bg-white py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Timing" title="Production & delivery" align="left" />
            <table className="mt-7 w-full overflow-hidden rounded-2xl border border-ink/10 text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Typical turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8 bg-white">
                {services.map((service) => (
                  <tr key={service.slug}>
                    <td className="px-4 py-3 font-medium text-ink">{service.title}</td>
                    <td className="px-4 py-3 text-ink/65">{service.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-ink/55">
              Turnaround starts after proof approval. Delivery adds 1–3 days depending on location.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Pricing" title="How your price is worked out" align="left" />
            <div className="mt-7 rounded-3xl border border-ink/10 bg-paper p-7">
              <p className="text-[15px] leading-relaxed text-ink/70">
                We don&apos;t publish a fixed price list because every job is different. Your quote depends
                on three things:
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  { t: "Size & quantity", d: "Bigger runs cost less per piece — bulk discounts start from medium quantities." },
                  { t: "Material & finish", d: "Flex, vinyl, art paper, lamination, spot UV and fabrication all change the price." },
                  { t: "Speed", d: "Same-day rush jobs carry a small priority fee; normal scheduling is standard." },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="block font-bold text-ink">{item.t}</span>
                      <span className="text-sm text-ink/60">{item.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-white px-4 py-3 text-sm text-ink/70">
                Quotes are free and usually arrive within 30 minutes during working hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions people ask us"
            description="Can't find your answer? Message us on WhatsApp — a real person replies."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
