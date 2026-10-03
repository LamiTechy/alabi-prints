import { SignJWT, jwtVerify } from "jose";

/** Pure JWT helpers — no Next.js server imports, safe for middleware (edge). */
export const SESSION_COOKIE = "adio_admin_session";
const SESSION_HOURS = 8;

function secretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is missing or too short (min 16 chars). Set it in .env / Vercel.");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = { email: string; role: "admin" };

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());
}

export async function verifySession(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.role !== "admin" || typeof payload.email !== "string") return null;
    return { email: payload.email, role: "admin" };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_HOURS * 60 * 60;
