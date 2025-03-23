import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const exams = await query(`
      SELECT 
        e.exam_id, 
        e.exam_date, 
        e.start_time, 
        e.end_time, 
        e.exam_type,
        m.module_code,
        m.module_name,
        es.session_name,
        GROUP_CONCAT(DISTINCT r.room_number ORDER BY r.room_number SEPARATOR ', ') as rooms,
        GROUP_CONCAT(DISTINCT CONCAT(p.first_name, ' ', p.last_name) ORDER BY p.last_name SEPARATOR ', ') as professors
      FROM 
        exam e
      JOIN 
        module m ON e.module_id = m.module_id
      JOIN 
        exam_session es ON e.session_id = es.session_id
      LEFT JOIN 
        exam_room er ON e.exam_id = er.exam_id
      LEFT JOIN 
        room r ON er.room_id = r.room_id
      LEFT JOIN 
        surveillance s ON e.exam_id = s.exam_id
      LEFT JOIN 
        professor p ON s.professor_id = p.professor_id
      GROUP BY 
        e.exam_id
      ORDER BY 
        e.exam_date, e.start_time
    `)

    return NextResponse.json(exams)
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
  }
}

