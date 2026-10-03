import type { MetadataRoute } from "next";
import { services, siteUrl, sitemapExtraPaths } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = sitemapExtraPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
