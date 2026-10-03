import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBand } from "@/components/CtaBand";
import { portfolio } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Portfolio — Banners, Signage, Stickers & Apparel We've Printed",
  description:
    "See recent print projects: flex banners, shop signage, product labels, custom T-shirts, business cards, flyers and branded corporate gifts in Nigeria.",
  path: "/portfolio",
  keywords: ["printing portfolio Nigeria", "banner printing examples", "signage designs"],
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Prints that speak!"
        description="A selection of recent work across banners, signage, stickers, apparel, cards and branded items. Tap any project to view it larger."
        crumbs={[{ label: "Portfolio" }]}
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="shell">
          <PortfolioGrid items={portfolio} />
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-paper px-5 py-4 text-center text-sm text-ink/55">
            Placeholder projects — replace these with real photos in{" "}
            <code className="rounded bg-white px-2 py-0.5 font-semibold text-ink">/data/site.ts</code>{" "}
            (set <code className="rounded bg-white px-2 py-0.5 font-semibold text-ink">image</code> to
            <code className="rounded bg-white px-2 py-0.5 font-semibold text-ink">
              {'"/images/portfolio/your-file.jpg"'}
            </code>
            and upload the file to <code className="rounded bg-white px-2 py-0.5 font-semibold text-ink">/public/images/portfolio/</code>.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want results like these?"
        text="Send us your brief and get a free quote — most jobs are designed, approved and printed within 48 hours."
      />
    </>
  );
}
