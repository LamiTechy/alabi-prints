"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { nav, business } from "@/data/site";
import { telLink, waLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-white sm:block">
        <div className="shell flex h-9 items-center justify-between text-xs">
          <p className="font-medium tracking-wide text-white/70">
            {business.tagline} — {business.address.city}, Nigeria
          </p>
          <div className="flex items-center gap-5">
            <a href={telLink()} className="flex items-center gap-1.5 font-semibold hover:text-yellow">
              <Phone className="h-3.5 w-3.5" />
              {business.phoneDisplay}
            </a>
            <a
              href={waLink("Hello Adio Prints, I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold text-[#25D366] hover:text-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-white/90 backdrop-blur-md transition-shadow",
          scrolled ? "border-ink/10 shadow-card" : "border-transparent",
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition",
                  isActive(item.href) ? "bg-paper text-ink" : "text-ink/65 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<WhatsAppIcon className="h-4 w-4" />}
            >
              Get a Quote
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[68px] z-40 bg-white transition-all duration-300 sm:top-[104px] lg:hidden",
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="shell flex h-full flex-col gap-1 overflow-y-auto py-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-4 font-display text-2xl font-bold transition",
                isActive(item.href) ? "bg-ink text-white" : "text-ink hover:bg-paper",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/contact" size="lg">
              Get a Free Quote
            </Button>
            <Button
              href={waLink("Hello Adio Prints, I'd like to make an enquiry.")}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Chat on WhatsApp
            </Button>
            <a
              href={telLink()}
              className="mt-1 text-center text-sm font-semibold text-ink/60 hover:text-brand"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
