import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Admin Login",
  description: "Adio Prints International admin area.",
  path: "/admin/login",
});

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-68px)] items-center justify-center overflow-hidden bg-ink px-5 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/30 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan/25 blur-[110px]" />
        <div className="absolute inset-0 opacity-30 noise" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-7 flex justify-center">
          <Logo theme="light" href="/" />
        </div>
        <h1 className="text-center text-2xl font-extrabold text-white">Admin sign in</h1>
        <p className="mt-2 text-center text-sm text-white/55">
          View and manage quote requests from the website.
        </p>
        <div className="mt-7">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
