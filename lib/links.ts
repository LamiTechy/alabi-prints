import { business } from "@/data/site";

/** Build a pre-filled WhatsApp chat link for 08088430235. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${business.whatsappNumber}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Click-to-call link (international format). */
export function telLink(): string {
  return `tel:${business.phoneIntl.replace(/\s/g, "")}`;
}

/** Standard enquiry opener — reused so every message looks consistent. */
export const waGreeting = "Hello Adio Prints, I'd like to make an enquiry.";
