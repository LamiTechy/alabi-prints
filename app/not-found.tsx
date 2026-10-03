import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/CtaBand";
import { CMYKDivider } from "@/components/ui/CMYKDivider";

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 text-center text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand/30 blur-[100px]" />
          <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan/25 blur-[100px]" />
        </div>
        <div className="shell relative">
          <p className="font-display text-[110px] font-extrabold leading-none text-brand sm:text-[160px]">
            404
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">This page went to press without us.</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            The page you&apos;re looking for doesn&apos;t exist. Head back home or ask us for a quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/contact" variant="outlineLight" size="lg">
              Get a quote
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Or jump to{" "}
            <Link href="/services" className="font-semibold text-yellow underline underline-offset-4">
              our services
            </Link>
            .
          </p>
        </div>
        <CMYKDivider className="mt-14" />
      </section>
      <CtaBand />
    </>
  );
}
