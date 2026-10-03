/**
 * Lightweight in-memory rate limiter.
 * Works per server instance on Vercel — good enough for basic spam control.
 * Combine with the honeypot field in the quote form.
 */
type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as unknown as { __adioRate?: Map<string, Bucket> };
const store = (globalStore.__adioRate ??= new Map<string, Bucket>());

export interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    if (store.size > 1000) {
      for (const [k, v] of store) if (v.resetAt < now) store.delete(k);
    }
    return { ok: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
}

/** Best-effort client IP from platform headers. */
export function clientKey(request: Request, prefix = ""): string {
  const fwd = request.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return `${prefix}:${ip}`;
}
