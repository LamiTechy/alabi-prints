import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceDetail } from "@/components/ServiceDetail";
import { CtaBand } from "@/components/CtaBand";
import { services, slogans } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Printing Services — Banners, Signage, Stickers, T-Shirts & Cards",
  description:
    "Full list of printing services: banner and flex printing, signage and billboards, stickers and labels, custom T-shirt printing, business cards, flyers, invitations and branded materials.",
  path: "/services",
  keywords: ["printing services Nigeria", "flex banner printing", "signage and billboard"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Design → Print → Deliver → Grow"
        description="One team for every print job — with clear options, honest turnaround times and free quotes on everything."
        crumbs={[{ label: "Services" }]}
      >
        <p className="font-script text-3xl text-yellow">{slogans.nextIdea}</p>
      </PageHero>

      <div className="divide-y divide-ink/8">
        {services.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}
      </div>

      <CtaBand
        title="Not sure which service you need?"
        text="Send us your idea — even a photo of what you want. We'll recommend the right material, size and finish, then quote it free."
      />
    </>
  );
}
