import { waLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/** Floating WhatsApp button — visible on every page, bottom-right. */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hello Adio Prints, I'd like to make an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Adio Prints on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-ink shadow-[0_12px_30px_-8px_rgba(18,18,20,0.5)] transition-transform duration-300 hover:-translate-y-1 sm:pr-5"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-ink/10">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span className="hidden pr-1 text-sm font-bold sm:block">Chat with us</span>
    </a>
  );
}
