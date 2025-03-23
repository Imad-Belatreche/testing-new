import { NextResponse } from "next/server"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Debug endpoint is working",
    env: {
      // Check if environment variables are set (don't return actual values for security)
      MYSQL_HOST: !!process.env.MYSQL_HOST,
      MYSQL_USER: !!process.env.MYSQL_USER,
      MYSQL_PASSWORD: !!process.env.MYSQL_PASSWORD,
      MYSQL_DATABASE: !!process.env.MYSQL_DATABASE,
      JWT_SECRET: !!process.env.JWT_SECRET,
    },
  })
}

