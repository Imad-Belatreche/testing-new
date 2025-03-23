import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/check-db-connection"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  try {
    const isConnected = await checkDatabaseConnection()

    if (isConnected) {
      return NextResponse.json({
        status: "success",
        message: "Database connection successful with SSL",
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to database",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database check error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while checking database connection",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

