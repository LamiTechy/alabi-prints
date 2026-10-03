import { business, services, siteUrl } from "@/data/site";

/** LocalBusiness JSON-LD schema for search engines. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description: business.description,
    slogan: business.tagline,
    url: siteUrl,
    telephone: business.phoneIntl,
    email: business.email,
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.line2,
      addressRegion: business.address.city,
      addressCountry: business.address.country,
    },
    areaServed: business.areaServed.map((area) => ({ "@type": "Place", name: area })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Printing & Branding Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: `${siteUrl}/services/${service.slug}`,
        },
      })),
    },
    sameAs: business.socials.map((s) => s.href),
  };
}
