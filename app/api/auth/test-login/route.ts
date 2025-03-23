import { getRow } from "@/lib/db"
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    console.log("Test Login API called")

    // Parse the request body
    let body
    try {
      body = await request.json()
      console.log("Request body parsed successfully:", body)
    } catch (error) {
      console.error("Error parsing request body:", error)
      return new Response(JSON.stringify({ error: "Invalid request body format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { email, password } = body
    console.log("Email provided:", email)

    // Validate input
    if (!email || !password) {
      console.log("Missing email or password")
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
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
        return new Response(JSON.stringify({ error: "Invalid email or password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }

      // Check if user is active
      if (user.status === "Retired") {
        return new Response(JSON.stringify({ error: "Your account is inactive. Please contact an administrator." }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      }

      console.log("Verifying password")
      // Verify password
      const isPasswordValid = await comparePassword(password, user.password_hash)
      console.log("Password valid:", isPasswordValid)

      if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: "Invalid email or password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }

      console.log("Generating token")
      // Generate token
      const token = generateToken(user.user_id, user.role)

      console.log("Setting cookie")
      // Set cookie
      setAuthCookie(token)

      console.log("Returning success response")
      // Return user info (excluding password)
      return new Response(
        JSON.stringify({
          id: user.user_id,
          email: user.email,
          role: user.role,
          redirectUrl: user.role === "admin" ? "/admin/dashboard" : "/professor/dashboard",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (dbError) {
      console.error("Database error:", dbError)
      return new Response(
        JSON.stringify({
          error: "Database error occurred",
          details: dbError instanceof Error ? dbError.message : String(dbError),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return new Response(
      JSON.stringify({
        error: "An error occurred during login",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

