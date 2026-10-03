import { BadgeCheck, Sparkles } from "lucide-react";
import { HeroArt } from "@/components/HeroArt";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { business, slogans } from "@/data/site";
import { waGreeting, waLink } from "@/lib/links";

const assurances = ["Same-day options", "Nationwide delivery", "Free file check"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* paint / ink splash accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan/25 blur-[110px]" />
        <div className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-magenta/25 blur-[110px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-yellow/20 blur-[110px]" />
        <div className="absolute bottom-24 right-10 h-56 w-56 rounded-full bg-brand/30 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.35] noise" />
        <svg className="absolute left-0 top-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <path d="M-40 120 C 220 40, 380 220, 640 140 S 1040 60, 1260 160" stroke="#00AEEF" strokeWidth="3" fill="none" />
          <path d="M-40 200 C 240 130, 400 300, 660 220 S 1060 150, 1260 250" stroke="#EC008C" strokeWidth="3" fill="none" />
          <path d="M-40 640 C 260 560, 420 720, 700 630 S 1080 560, 1260 660" stroke="#FFD500" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="shell relative grid items-center gap-14 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-24">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            <Sparkles className="h-4 w-4 text-yellow" />
            {business.tagline}
          </span>

          <h1 className="mt-6 text-[42px] font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[68px]">
            Your Vision.
            <br />
            <span className="bg-gradient-to-r from-brand-light via-brand to-yellow bg-clip-text text-transparent">
              Our Print.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Fast, quality, affordable printing for banners, signage, apparel, business cards and
            more — for businesses, churches, schools and events across Nigeria.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" icon={<BadgeCheck className="h-5 w-5" />}>
              Get a Free Quote
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

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg animate-fade-up lg:max-w-none">
          <HeroArt className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />

          <div className="absolute -left-2 top-6 rounded-2xl border border-white/10 bg-ink-800/90 px-4 py-3 text-left shadow-card backdrop-blur animate-wiggle">
            <p className="text-xs uppercase tracking-wide text-white/60">Turnaround</p>
            <p className="font-display text-lg font-extrabold text-yellow">From 24 hours</p>
          </div>
          <div className="absolute -right-2 bottom-10 rounded-2xl border border-white/10 bg-ink-800/90 px-4 py-3 text-left shadow-card backdrop-blur animate-wiggle [animation-delay:600ms]">
            <p className="text-xs uppercase tracking-wide text-white/60">Delivery</p>
            <p className="font-display text-lg font-extrabold text-cyan">Nationwide</p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <p className="sr-only">{slogans.fast}</p>
    </section>
  );
}
