import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Always allow these paths
  if (
    path === "/welcome" ||
    path === "/sign-in" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes("/static/") ||
    path.includes("/images/") ||
    path.includes("favicon.ico") ||
    path.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Get the token from cookies
  const token = request.cookies.get("safetrail-auth")?.value

  // If no token and not on a public path, redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Otherwise, allow the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

