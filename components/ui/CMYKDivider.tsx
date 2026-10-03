import { cn } from "@/lib/utils";

/** Recurring CMYK four-colour divider motif. */
export function CMYKDivider({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex h-1.5 w-full overflow-hidden", className)}
    >
      <span className={cn("h-full flex-1 bg-cyan", animate && "animation-marquee")} />
      <span className="h-full flex-1 bg-magenta" />
      <span className="h-full flex-1 bg-yellow" />
      <span className="h-full flex-1 bg-brand" />
    </div>
  );
}

/** Compact colour-bar used inside cards and above headings. */
export function ColorBars({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex gap-1", className)}>
      <span className="h-2.5 w-6 rounded-full bg-cyan" />
      <span className="h-2.5 w-6 rounded-full bg-magenta" />
      <span className="h-2.5 w-6 rounded-full bg-yellow" />
      <span className="h-2.5 w-6 rounded-full bg-brand" />
    </span>
  );
}
