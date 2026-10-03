import { NextResponse } from "next/server";
import { getDb, quoteRequests } from "@/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { quoteFormSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "quote"), 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteFormSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first ? `${first.message}` : "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot filled by a bot → accept silently, store nothing.
  if (data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Submitted suspiciously fast → likely a bot, store nothing.
  if (data.formTime > 0 && Date.now() - data.formTime < 2500) {
    return NextResponse.json({ ok: true });
  }

  try {
    const db = getDb();
    await db.insert(quoteRequests).values({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      sizeQuantity: data.sizeQuantity || null,
      material: data.material || null,
      deadline: data.deadline || null,
      description: data.description,
      fileLink: data.fileLink || null,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quotes] insert failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your request right now. Please send the details on WhatsApp instead.",
      },
      { status: 500 },
    );
  }
}
