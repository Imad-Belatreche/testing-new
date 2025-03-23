import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email, password } = body

    // Just for testing - hardcoded credentials
    if (email === "john.smith@university.edu" && password === "admin123") {
      return NextResponse.json({
        id: 1,
        email: email,
        role: "admin",
        redirectUrl: "/admin/dashboard",
        message: "This is a test login that bypasses the database",
      })
    } else if (email === "emily.johnson@university.edu" && password === "admin123") {
      return NextResponse.json({
        id: 2,
        email: email,
        role: "professor",
        redirectUrl: "/professor/dashboard",
        message: "This is a test login that bypasses the database",
      })
    } else {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Test login error:", error)
    return NextResponse.json(
      {
        error: "An error occurred during test login",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

