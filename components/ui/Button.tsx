import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-cmyk hover:bg-brand-dark active:translate-y-px",
  dark: "bg-ink text-white hover:bg-ink-700 active:translate-y-px",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-paper active:translate-y-px",
  outlineLight:
    "border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
  whatsapp: "bg-[#25D366] text-ink hover:bg-[#1EBE5A] active:translate-y-px",
  ghost: "text-ink hover:bg-paper",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-5 py-3 text-sm gap-2",
  lg: "px-7 py-4 text-base gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, icon, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const linkRest = rest as ComponentPropsWithoutRef<typeof Link>;
    const external = props.href.startsWith("http");
    return (
      <Link
        {...linkRest}
        href={props.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon}
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button {...buttonRest} className={classes}>
      {icon}
      {children}
    </button>
  );
}
