import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function POST() {
  try {
    // Clear auth cookie
    clearAuthCookie()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 })
  }
}

