import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  try {
    const examSessions = await query(`
      SELECT 
        session_id, 
        session_name, 
        start_date, 
        end_date, 
        academic_year,
        is_active
      FROM 
        exam_session
      ORDER BY 
        start_date DESC
    `)

    return NextResponse.json(examSessions)
  } catch (error) {
    console.error("Error fetching exam sessions:", error)
    return NextResponse.json({ error: "Failed to fetch exam sessions" }, { status: 500 })
  }
}

