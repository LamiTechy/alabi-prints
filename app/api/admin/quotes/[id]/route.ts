import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, quoteRequests } from "@/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum(["new", "contacted", "in_progress", "completed"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid status value." }, { status: 422 });
  }

  try {
    const db = getDb();
    const updated = await db
      .update(quoteRequests)
      .set({ status: parsed.data.status })
      .where(eq(quoteRequests.id, id))
      .returning({ id: quoteRequests.id });

    if (updated.length === 0) {
      return NextResponse.json({ ok: false, error: "Request not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin-quotes] update failed:", error);
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
}
