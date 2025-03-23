import { NextResponse } from "next/server"
import { getRow } from "@/lib/db"
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    console.log("Login API called")

    // Parse the request body
    let body
    try {
      body = await request.json()
      console.log("Request body parsed successfully")
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ error: "Invalid request body format" }, { status: 400 })
    }

    const { email, password } = body
    console.log("Email provided:", email)

    // Validate input
    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    try {
      console.log("Attempting database query")

      // Get user from database
      const user = await getRow(
        `SELECT u.user_id, u.email, u.password_hash, u.role, p.status 
         FROM user u
         JOIN professor p ON u.professor_id = p.professor_id
         WHERE u.email = ?`,
        [email],
      )

      console.log("Database query completed, user found:", !!user)

      // Check if user exists
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // Check if user is active
      if (user.status === "Retired") {
        return NextResponse.json(
          { error: "Your account is inactive. Please contact an administrator." },
          { status: 403 },
        )
      }

      console.log("Verifying password")
      // Verify password
      const isPasswordValid = await comparePassword(password, user.password_hash)
      console.log("Password valid:", isPasswordValid)

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      console.log("Generating token")
      // Generate token
      const token = generateToken(user.user_id, user.role)

      console.log("Setting cookie")
      // Set cookie
      setAuthCookie(token)

      console.log("Returning success response")
      // Return user info (excluding password)
      return NextResponse.json({
        id: user.user_id,
        email: user.email,
        role: user.role,
        redirectUrl: user.role === "admin" ? "/admin/dashboard" : "/professor/dashboard",
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        {
          error: "Database error occurred",
          details: dbError instanceof Error ? dbError.message : String(dbError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        error: "An error occurred during login",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

