import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const rooms = await query(`
      SELECT 
        room_id, 
        room_number, 
        building, 
        capacity, 
        room_type
      FROM 
        room
      ORDER BY 
        building, room_number
    `)

    return NextResponse.json(rooms)
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
  }
}

