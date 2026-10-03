import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { display, sans, script } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { business, siteUrl } from "@/data/site";
import { localBusinessSchema } from "@/lib/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Printing Press in Nigeria | Banners, Signage & T-Shirts`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  keywords: [
    "printing press in Nigeria",
    "banner and flex printing",
    "custom T-shirt printing",
    "business card printing",
    "signage and billboard",
    "sticker printing Lagos",
    "flyer printing Nigeria",
  ],
  applicationName: business.name,
  authors: [{ name: business.name }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} — ${business.tagline}`,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — ${business.tagline}`,
    description: business.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </body>
    </html>
  );
}
