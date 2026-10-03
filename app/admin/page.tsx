import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { FileText, Inbox, Phone, Search } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getDb, quoteRequests } from "@/db";
import { getSession } from "@/lib/auth";
import { waLink } from "@/lib/links";
import { STATUS_OPTIONS, statusLabels, type StatusValue } from "@/lib/status";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Admin — Quote Requests",
  description: "Manage quote requests.",
  path: "/admin",
});

export const dynamic = "force-dynamic";

function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const session = await getSession();
  const { q = "", status = "" } = await searchParams;

  let rows: (typeof quoteRequests.$inferSelect)[] = [];
  let dbError = "";

  try {
    const db = getDb();
    rows = await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt)).limit(500);
  } catch (error) {
    dbError = error instanceof Error ? error.message : "Database unavailable.";
  }

  const query = q.trim().toLowerCase();
  const filtered = rows.filter((row) => {
    const matchesStatus = !status || row.status === status;
    const haystack = `${row.name} ${row.phone} ${row.email ?? ""} ${row.service} ${row.description}`.toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });

  const counts = {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    in_progress: rows.filter((r) => r.status === "in_progress" || r.status === "contacted").length,
    completed: rows.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Logo href="/admin" compact />
            <span className="hidden rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white sm:inline">
              Admin
            </span>
          </div>
          <AdminBar email={session?.email ?? ""} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-ink">Quote requests</h1>
            <p className="mt-1 text-sm text-ink/55">
              Newest first · showing {filtered.length} of {rows.length}
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-brand hover:underline underline-offset-4"
          >
            View website →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total requests", value: counts.total },
            { label: "New", value: counts.new },
            { label: "Active", value: counts.in_progress },
            { label: "Completed", value: counts.completed },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card">
              <p className="font-display text-3xl font-extrabold text-ink">{card.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/60">{card.label}</p>
            </div>
          ))}
        </div>

        <form
          method="GET"
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-ink/8 bg-white p-4 shadow-card sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by name, phone, service or details…"
              aria-label="Search quote requests"
              className="field pl-11"
            />
          </div>
          <select
            name="status"
            defaultValue={status}
            aria-label="Filter by status"
            className="field sm:max-w-[220px]"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-700"
          >
            Filter
          </button>
        </form>

        {dbError ? (
          <div className="mt-6 rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <h2 className="font-display text-lg font-bold text-ink">Database not reachable</h2>
            <p className="mt-2 text-sm text-ink/65">
              {dbError} — set <code className="rounded bg-white px-1.5 py-0.5">DATABASE_URL</code> in
              your environment, then run <code className="rounded bg-white px-1.5 py-0.5">npm run db:migrate</code>{" "}
              and <code className="rounded bg-white px-1.5 py-0.5">npm run db:seed</code>.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-12 text-center">
            <Inbox className="mx-auto h-10 w-10 text-ink/25" />
            <h2 className="mt-4 font-display text-lg font-bold text-ink">No quote requests yet</h2>
            <p className="mt-1 text-sm text-ink/55">
              {q || status ? "Try clearing your filters." : "New submissions from the website will appear here."}
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {filtered.map((row) => {
              const waMessage = `Hello ${row.name}, this is Adio Prints International responding to your quote request for ${row.service}.`;
              return (
                <li
                  key={row.id}
                  className="rounded-2xl border border-ink/8 bg-white p-5 shadow-card transition hover:shadow-card-hover"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-lg font-extrabold text-ink">{row.name}</h2>
                        <StatusSelect id={row.id} status={row.status as StatusValue} />
                      </div>
                      <p className="mt-1 text-sm text-ink/60">
                        {formatDate(row.createdAt)} · <span className="font-semibold text-ink/70">{row.service}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${row.phone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
                      >
                        <Phone className="h-4 w-4" />
                        {row.phone}
                      </a>
                      <a
                        href={waLink(waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-ink transition hover:bg-[#1EBE5A]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Reply on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 border-t border-ink/8 pt-4 text-sm sm:grid-cols-2">
                    <p className="text-ink/70">
                      <span className="font-semibold text-ink">Size / Qty:</span> {row.sizeQuantity || "—"}
                    </p>
                    <p className="text-ink/70">
                      <span className="font-semibold text-ink">Material:</span> {row.material || "—"}
                    </p>
                    <p className="text-ink/70">
                      <span className="font-semibold text-ink">Deadline:</span> {row.deadline || "—"}
                    </p>
                    <p className="text-ink/70">
                      <span className="font-semibold text-ink">Email:</span>{" "}
                      {row.email ? (
                        <a href={`mailto:${row.email}`} className="text-brand hover:underline">
                          {row.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </p>
                    <p className="text-ink/70 sm:col-span-2">
                      <span className="font-semibold text-ink">Details:</span> {row.description}
                    </p>
                    {row.fileLink ? (
                      <p className="sm:col-span-2">
                        <a
                          href={row.fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          View attached file
                        </a>
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className={cn("mt-8 text-center text-xs text-ink/55")}>
          Statuses: {STATUS_OPTIONS.map((o) => statusLabels[o.value]).join(" · ")}
        </p>
      </main>
    </div>
  );
}
