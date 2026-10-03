import { z } from "zod";
import { deadlineOptions, services } from "@/data/site";

/** Shared client + server validation for the quote request form. */
export const quoteFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(40)
    .regex(/^[0-9+\-\s()]+$/, "Use digits only, e.g. 08088430235"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(160)
    .or(z.literal(""))
    .optional()
    .default(""),
  service: z.string().min(1, "Choose a service"),
  sizeQuantity: z.string().trim().max(160).optional().default(""),
  material: z.string().trim().max(160).optional().default(""),
  deadline: z.string().max(80).optional().default(""),
  description: z.string().trim().min(10, "Tell us a little more about the job").max(4000),
  fileLink: z
    .string()
    .trim()
    .url("Paste a valid link (drive, dropbox, we transfer)")
    .max(500)
    .or(z.literal(""))
    .optional()
    .default(""),
  /** Honeypot — real users never see this field. */
  company: z.string().max(0).optional().default(""),
  /** Seconds spent on the form — bots submit instantly. */
  formTime: z.coerce.number().optional().default(0),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const serviceOptions = services.map((s) => ({ label: s.title, value: s.title }));
export { deadlineOptions };
