import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { admins, getDb } from "@/db";
import { eq } from "drizzle-orm";
import { setSessionCookie, signSession } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "admin-login"), 8, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: { email?: unknown; password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = String(payload.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(payload.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
  }

  try {
    const db = getDb();
    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);

    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signSession({ email: admin.email, role: "admin" });
    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin-login] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Login unavailable. Check server configuration (DATABASE_URL)." },
      { status: 500 },
    );
  }
}
