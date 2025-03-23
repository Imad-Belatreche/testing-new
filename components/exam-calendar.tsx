"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ExamCalendar() {
  const [currentMonth, setCurrentMonth] = useState("March 2025")
  const [selectedDate, setSelectedDate] = useState("3/23/2025")

  // Mock calendar data
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const dates = [
    [23, 24, 25, 26, 27, 28, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, 1, 2, 3, 4, 5],
  ]

  // Mock exams data
  const exams = [
    {
      id: 1,
      name: "Database Systems",
      time: "09:00 - 11:00",
      room: "Room A104",
      level: "L1",
      mainInvigilator: "Main: Dr. Smith",
      assistant: "Assistant: Dr. Johnson",
    },
    {
      id: 2,
      name: "Software Engineering",
      time: "14:00 - 16:00",
      room: "Room B201",
      level: "M1",
      mainInvigilator: "Main: Dr. Williams",
      assistant: "Assistant: Unassigned",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">{currentMonth}</h3>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium py-1">
            {day}
          </div>
        ))}

        {dates.flat().map((date, index) => (
          <Button
            key={index}
            variant={date === 23 && index >= 28 ? "default" : "outline"}
            className={`h-10 ${date === 23 && index >= 28 ? "bg-blue-600" : ""}`}
          >
            {date}
          </Button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Exams on {selectedDate}</h3>

        <div className="space-y-4">
          {exams.map((exam) => (
            <div key={exam.id} className="border rounded-lg p-4 bg-blue-50 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{exam.name}</h4>
                  <p className="text-sm text-gray-600">{exam.time}</p>
                </div>
                <Badge variant="outline" className={`${exam.level === "L1" ? "bg-black" : "bg-gray-700"} text-white`}>
                  {exam.level}
                </Badge>
              </div>
              <div className="mt-2 text-sm flex justify-between">
                <div className="text-right text-sm">{exam.room}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {exam.mainInvigilator}
                </Badge>
                <Badge
                  variant={exam.assistant.includes("Unassigned") ? "destructive" : "secondary"}
                  className={
                    exam.assistant.includes("Unassigned")
                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }
                >
                  {exam.assistant}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

