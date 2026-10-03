import Link from "next/link";
import { cn } from "@/lib/utils";
import { business } from "@/data/site";

/**
 * PLACEHOLDER LOGO — recreate of the Adio Prints brand mark.
 * To swap in the real logo: replace the SVG inside `LogoMark` (or point the
 * <img src> at /public/logo.svg) — the wordmark text lives in `Logo`.
 */

export function LogoMark({ className, title = "Adio Prints International logo" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={cn("h-11 w-11 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* crown */}
      <path
        d="M38 30 L38 13 L47 23 L60 7 L73 23 L82 13 L82 30 Z"
        fill="#FFD500"
        strokeLinejoin="round"
      />
      <rect x="38" y="32" width="44" height="4" rx="2" fill="#FFD500" />

      {/* AP monogram */}
      <text
        x="60"
        y="84"
        textAnchor="middle"
        fontFamily="var(--font-display), Poppins, Arial Black, sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-2"
        fill="currentColor"
      >
        AP
      </text>

      {/* CMYK swoosh */}
      <g fill="none" strokeLinecap="round">
        <path d="M14 98 Q60 110 106 98" stroke="#00AEEF" strokeWidth="5" />
        <path d="M18 105 Q60 116 102 105" stroke="#EC008C" strokeWidth="5" />
        <path d="M24 112 Q60 121 96 112" stroke="#FFD500" strokeWidth="5" />
        <path d="M30 91 Q60 100 90 91" stroke="#E11D2E" strokeWidth="4" />
      </g>
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** "light" = white wordmark (for dark backgrounds), "dark" = ink wordmark */
  theme?: "light" | "dark";
  href?: string;
  compact?: boolean;
}

export function Logo({ className, theme = "dark", href = "/", compact = false }: LogoProps) {
  const wordmarkColor = theme === "light" ? "text-white" : "text-ink";
  return (
    <Link
      href={href}
      aria-label={`${business.name} — home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className={cn(wordmarkColor, "transition-transform duration-300 group-hover:-translate-y-0.5")}>
        <LogoMark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            wordmarkColor,
            compact ? "text-lg" : "text-xl sm:text-[22px]",
          )}
        >
          ADIO PRINTS
        </span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.34em] text-brand">
          International
        </span>
      </span>
    </Link>
  );
}
