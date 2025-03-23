import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/"

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value || ""

  // Verify the token and get the user role
  const decodedToken = token ? verifyToken(token) : null
  const userRole = decodedToken?.role || null

  // If the path is public and the user is logged in, redirect to the appropriate dashboard
  if (isPublicPath && decodedToken) {
    return NextResponse.redirect(
      new URL(userRole === "admin" ? "/admin/dashboard" : "/professor/dashboard", request.url),
    )
  }

  // If the path is not public and the user is not logged in, redirect to the login page
  if (!isPublicPath && !decodedToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the path is for admin routes and the user is not an admin, redirect to the professor dashboard
  if (path.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/professor/dashboard", request.url))
  }

  // If the path is for professor routes and the user is not a professor, redirect to the admin dashboard
  if (path.startsWith("/professor") && userRole !== "professor") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next
     * - public (static files)
     * - favicon.ico (browser icon)
     */
    "/",
    "/admin/:path*",
    "/professor/:path*",
  ],
}

