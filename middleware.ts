import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

/**
 * Protects /admin (except the login page) and the admin API.
 * Runs at the edge — jose is edge-safe, no database needed.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Both the page and its API endpoint must stay reachable while signed out.
  const isLoginPath = pathname === "/admin/login" || pathname === "/api/admin/login";

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    if (isLoginPath) return NextResponse.next();

    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
