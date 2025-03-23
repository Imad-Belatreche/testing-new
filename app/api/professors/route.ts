import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const professors = await query(`
      SELECT 
        p.professor_id, 
        p.first_name, 
        p.last_name, 
        p.email_1, 
        p.phone_1, 
        p.status, 
        p.grade,
        d.department_name
      FROM 
        professor p
      LEFT JOIN 
        professor_department pd ON p.professor_id = pd.professor_id
      LEFT JOIN 
        department d ON pd.department_id = d.department_id
      ORDER BY 
        p.last_name, p.first_name
    `)

    return NextResponse.json(professors)
  } catch (error) {
    console.error("Error fetching professors:", error)
    return NextResponse.json({ error: "Failed to fetch professors" }, { status: 500 })
  }
}

