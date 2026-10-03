import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CMYKDivider } from "@/components/ui/CMYKDivider";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { business, nav, services, slogans } from "@/data/site";
import { telLink, waLink } from "@/lib/links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white">
      <CMYKDivider />
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo theme="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {business.description}
          </p>
          <p className="mt-5 font-script text-2xl text-yellow">{slogans.process}</p>
          <div className="mt-6 flex items-center gap-3">
            {business.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">Quick links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="animated-underline text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="animated-underline font-semibold text-brand-light hover:text-white">
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="animated-underline text-white/75 hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={telLink()} className="font-semibold text-white hover:text-yellow">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
              <a
                href={waLink("Hello Adio Prints, I'd like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Message us on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={`mailto:${business.email}`} className="hover:text-white">
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <address className="not-italic">
                {business.address.line1}
                <br />
                {business.address.line2}
              </address>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                {business.hours.map((slot) => (
                  <span key={slot.days} className="block">
                    {slot.days}: {slot.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 pb-24 pt-6 text-xs text-white/60 sm:flex-row sm:pb-6 sm:pr-44">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="font-semibold tracking-wide text-white/60">{slogans.fast}</p>
        </div>
      </div>
    </footer>
  );
}
