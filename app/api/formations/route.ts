import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  try {
    const formations = await query(`
      SELECT 
        formation_id, 
        formation_code, 
        formation_name,
        level
      FROM 
        formation
      ORDER BY 
        level, formation_name
    `)

    return NextResponse.json(formations)
  } catch (error) {
    console.error("Error fetching formations:", error)
    return NextResponse.json({ error: "Failed to fetch formations" }, { status: 500 })
  }
}

