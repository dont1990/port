import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

// List of protected admin paths
const ADMIN_PATHS = [
  "/admin",
  "/admin/submission",
  "/admin/contact-info",
  "/admin/hero",
  "/admin/about",
  "/admin/skills",
  "/admin/projects",
  "/admin/experiences",
  "/admin/*",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an admin path (you can also do startsWith for all under /admin)
  const isAdminRoute =
    ADMIN_PATHS.some((path) => pathname.startsWith(path)) &&
    pathname != "/auth/login";

  if (!isAdminRoute) {
    // Not an admin path, allow
    return NextResponse.next();
  }

  // Check for a cookie that holds the admin auth token or password
  const authCookie = request.cookies.get("admin-auth");

  if (authCookie?.value === ADMIN_PASSWORD) {
    // Authenticated, allow access
    return NextResponse.next();
  }

  // Not authenticated: redirect to a login page or show an auth required response

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("from", pathname); // save where user wanted to go

  return NextResponse.redirect(loginUrl);
}

// Specify which paths should invoke this middleware
export const config = {
  matcher: ["/admin/:path*"],
};
