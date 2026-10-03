"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { business, deadlineOptions, services } from "@/data/site";
import { waLink } from "@/lib/links";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  defaultService?: string;
  className?: string;
  compact?: boolean;
}

const initialValues: QuoteFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  sizeQuantity: "",
  material: "",
  deadline: "",
  description: "",
  fileLink: "",
  company: "",
  formTime: 0,
};

export function QuoteForm({ defaultService, className, compact = false }: QuoteFormProps) {
  const [values, setValues] = useState<QuoteFormValues>(() => ({
    ...initialValues,
    service: defaultService ?? "",
    deadline: "Flexible / no rush",
    formTime: Date.now(),
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof QuoteFormValues, value: string | number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hello ${business.shortName}, I'd like a quote for: ${values.service || "a print job"}.`,
      "",
      `Name: ${values.name || "-"}`,
      `Phone: ${values.phone || "-"}`,
      values.email ? `Email: ${values.email}` : "",
      values.sizeQuantity ? `Size / Quantity: ${values.sizeQuantity}` : "",
      values.material ? `Material / Finish: ${values.material}` : "",
      values.deadline ? `Deadline: ${values.deadline}` : "",
      `Details: ${values.description || "-"}`,
      values.fileLink ? `File link: ${values.fileLink}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }, [values]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const parsed = quoteFormSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof QuoteFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteFormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please WhatsApp or call us instead.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-card sm:p-10",
          className,
        )}
        role="status"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold text-ink">Request received!</h3>
        <p className="mx-auto mt-3 max-w-md text-ink/65">
          Thanks, {values.name.split(" ")[0] || "friend"} — we&apos;ve saved your quote request and
          will call you on {values.phone} shortly. For an instant reply, send the same details on
          WhatsApp.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href={waLink(whatsappMessage)}
            variant="whatsapp"
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Send details on WhatsApp
          </Button>
          <Button href={`tel:${business.phoneIntl}`} variant="outline" size="lg">
            Call {business.phoneDisplay}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "relative rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="quote-name">
            Your name *
          </label>
          <input
            id="quote-name"
            className="field"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Chinedu Okafor"
          />
          {errors.name ? <p className="mt-1.5 text-xs font-medium text-brand">{errors.name}</p> : null}
        </div>

        <div>
          <label className="label" htmlFor="quote-phone">
            Phone / WhatsApp *
          </label>
          <input
            id="quote-phone"
            className="field"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="0808 843 0235"
          />
          {errors.phone ? <p className="mt-1.5 text-xs font-medium text-brand">{errors.phone}</p> : null}
        </div>

        <div>
          <label className="label" htmlFor="quote-email">
            Email (optional)
          </label>
          <input
            id="quote-email"
            className="field"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
          />
          {errors.email ? <p className="mt-1.5 text-xs font-medium text-brand">{errors.email}</p> : null}
        </div>

        <div>
          <label className="label" htmlFor="quote-service">
            Service needed *
          </label>
          <select
            id="quote-service"
            className="field"
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
          >
            <option value="">Select a service…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Not listed / multiple services">Not listed / multiple services</option>
          </select>
          {errors.service ? (
            <p className="mt-1.5 text-xs font-medium text-brand">{errors.service}</p>
          ) : null}
        </div>

        <div>
          <label className="label" htmlFor="quote-size">
            Size / Quantity
          </label>
          <input
            id="quote-size"
            className="field"
            value={values.sizeQuantity}
            onChange={(e) => set("sizeQuantity", e.target.value)}
            placeholder="e.g. 6ft × 3ft × 2 pieces"
          />
        </div>

        <div>
          <label className="label" htmlFor="quote-material">
            Material / Finish
          </label>
          <input
            id="quote-material"
            className="field"
            value={values.material}
            onChange={(e) => set("material", e.target.value)}
            placeholder="e.g. 500gsm frontlit flex"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="quote-deadline">
            Deadline
          </label>
          <select
            id="quote-deadline"
            className="field"
            value={values.deadline}
            onChange={(e) => set("deadline", e.target.value)}
          >
            {deadlineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="quote-description">
            Project description *
          </label>
          <textarea
            id="quote-description"
            rows={compact ? 3 : 5}
            className="field resize-y"
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Tell us what you need — colours, text, delivery location…"
          />
          {errors.description ? (
            <p className="mt-1.5 text-xs font-medium text-brand">{errors.description}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="quote-file">
            File link (optional — Google Drive, Dropbox, WeTransfer)
          </label>
          <input
            id="quote-file"
            className="field"
            value={values.fileLink}
            onChange={(e) => set("fileLink", e.target.value)}
            placeholder="https://drive.google.com/…"
          />
          {errors.fileLink ? (
            <p className="mt-1.5 text-xs font-medium text-brand">{errors.fileLink}</p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — hidden from humans, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="quote-company">Company</label>
        <input
          id="quote-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      {serverError ? (
        <p className="mt-5 rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand">
          {serverError}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          icon={
            status === "sending" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )
          }
        >
          {status === "sending" ? "Sending…" : "Request my quote"}
        </Button>
        <p className="text-xs leading-relaxed text-ink/60">
          We reply fast — usually within 30 minutes during working hours. Prefer chat?{" "}
          <a
            href={waLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#128C7E] underline underline-offset-2"
          >
            Send it on WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
}
