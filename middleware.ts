import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get("auth_token")?.value

  // Get the pathname
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedRoute = pathname.startsWith("/admin") || pathname.startsWith("/professor")

  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If token exists, verify it
  if (token) {
    const decoded = verifyToken(token)

    // If token is invalid, redirect to login
    if (!decoded) {
      const response = NextResponse.redirect(new URL("/", request.url))
      response.cookies.delete("auth_token")
      return response
    }

    // Check role-based access
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/professor/dashboard", request.url))
    }

    if (pathname.startsWith("/professor") && decoded.role !== "professor") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}

