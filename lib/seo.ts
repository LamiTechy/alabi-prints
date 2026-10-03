import type { Metadata } from "next";
import { business, siteUrl } from "@/data/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/** Consistent per-page metadata with canonical, Open Graph and Twitter tags. */
export function pageMeta({ title, description, path, keywords = [] }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    title,
    description,
    keywords: [
      "printing press in Nigeria",
      "banner and flex printing",
      "custom T-shirt printing",
      "business card printing",
      "signage and billboard",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url,
      siteName: business.name,
      type: "website",
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
    },
  };
}
