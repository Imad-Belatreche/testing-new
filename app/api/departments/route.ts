import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  try {
    const departments = await query(`
      SELECT 
        department_id, 
        department_code, 
        department_name
      FROM 
        department
      ORDER BY 
        department_name
    `)

    return NextResponse.json(departments)
  } catch (error) {
    console.error("Error fetching departments:", error)
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 })
  }
}

