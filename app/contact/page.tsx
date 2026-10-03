import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { business, slogans } from "@/data/site";
import { telLink, waGreeting, waLink } from "@/lib/links";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Free Quote Request — 0808 843 0235",
  description:
    "Request a free printing quote or contact Adio Prints International on 08088430235 / WhatsApp. Banners, signage, T-shirts, business cards and more, delivered nationwide in Nigeria.",
  path: "/contact",
  keywords: ["printing quote Nigeria", "printer contact Lagos", "banner printing price Nigeria"],
});

const mapQuery = encodeURIComponent(
  `${business.address.line1}, ${business.address.line2}, ${business.address.country}`,
);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact & quotes"
        title="Let's print your next big idea!"
        description="Fill the form below for a free quote, or reach us instantly on WhatsApp or phone. We usually reply within 30 minutes during working hours."
        crumbs={[{ label: "Contact" }]}
      >
        <p className="font-script text-3xl text-yellow">{slogans.fast}</p>
      </PageHero>

      <section className="bg-white py-14 sm:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Quote request"
              title="Tell us what you need"
              align="left"
              description="The more detail you give, the more accurate your quote. Fields marked * are required."
            />
            <div className="mt-7">
              <QuoteForm defaultService={service} />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-ink/10 bg-ink p-6 text-white shadow-card">
              <h2 className="font-display text-lg font-extrabold">Prefer to talk?</h2>
              <p className="mt-2 text-sm text-white/60">
                Call or message us directly — we&apos;re happy to walk you through options and pricing.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={telLink()} variant="outlineLight" size="lg" icon={<Phone className="h-5 w-5" />}>
                  Call {business.phoneDisplay}
                </Button>
                <Button
                  href={waLink(waGreeting)}
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/60">
                Our details
              </h2>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Phone / WhatsApp</span>
                    <a href={telLink()} className="animated-underline text-ink/70 hover:text-brand">
                      {business.phoneDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Email</span>
                    <a href={`mailto:${business.email}`} className="animated-underline text-ink/70 hover:text-brand">
                      {business.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Address</span>
                    <address className="not-italic text-ink/70">
                      {business.address.line1}, {business.address.line2}
                    </address>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Working hours</span>
                    <span className="text-ink/70">
                      {business.hours.map((slot) => (
                        <span key={slot.days} className="block">
                          {slot.days}: {slot.time}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-paper to-white shadow-card">
              <div className="grid h-56 place-items-center p-6 text-center">
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-brand" />
                  <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/60">
                    Map placeholder
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-ink/55">
                    Embed your Google Maps location here (replace this block in{" "}
                    <code className="rounded bg-white px-1.5 py-0.5 text-xs">/app/contact/page.tsx</code>).
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand hover:gap-3"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
