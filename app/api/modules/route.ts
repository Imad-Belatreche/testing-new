import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// Add this to disable Edge Runtime
export const runtime = "nodejs"

export async function GET() {
  try {
    const modules = await query(`
      SELECT 
        m.module_id, 
        m.module_code, 
        m.module_name, 
        m.credits,
        f.formation_name,
        d.department_name
      FROM 
        module m
      LEFT JOIN 
        formation_module fm ON m.module_id = fm.module_id
      LEFT JOIN 
        formation f ON fm.formation_id = f.formation_id
      LEFT JOIN 
        department d ON m.department_id = d.department_id
      ORDER BY 
        m.module_code
    `)

    return NextResponse.json(modules)
  } catch (error) {
    console.error("Error fetching modules:", error)
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 })
  }
}

