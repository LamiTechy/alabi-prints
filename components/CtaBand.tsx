import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CMYKDivider } from "@/components/ui/CMYKDivider";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { slogans } from "@/data/site";
import { waLink } from "@/lib/links";

/** Big conversion band — reusable on any page. */
export function CtaBand({
  title = slogans.nextIdea,
  text = "Tell us what you need and get a free, no-obligation quote today. Banners, signage, shirts, cards and more.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <CMYKDivider />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan/20 blur-3xl"
      />
      <div className="shell relative flex flex-col items-center gap-8 py-16 text-center sm:py-20 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <p className="font-script text-3xl text-yellow">{slogans.speaks}</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-[44px]">
            {title}
          </h2>
          <p className="mt-4 text-white/65">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
          <Button href="/contact" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            Get a Free Quote
          </Button>
          <Button
            href={waLink("Hello Adio Prints, I'd like to print something. Please send me a quote.")}
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
