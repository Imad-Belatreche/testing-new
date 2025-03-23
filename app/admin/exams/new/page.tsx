"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, Clock, Save } from "lucide-react"

export default function CreateExam() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to exams list
    router.push("/admin/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Exam</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Enter the details for the new exam.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="module">Module</Label>
                <Select>
                  <SelectTrigger id="module">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                    <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                    <SelectItem value="cs301">CS301 - Database Systems</SelectItem>
                    <SelectItem value="cs401">CS401 - Software Engineering</SelectItem>
                    <SelectItem value="cs501">CS501 - Artificial Intelligence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session">Exam Session</Label>
                <Select>
                  <SelectTrigger id="session">
                    <SelectValue placeholder="Select exam session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="june2025">June 2025 - Regular Session</SelectItem>
                    <SelectItem value="aug2025">August 2025 - Resit Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Select>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a104">A104 (Capacity: 60)</SelectItem>
                    <SelectItem value="b201">B201 (Capacity: 80)</SelectItem>
                    <SelectItem value="c105">C105 (Capacity: 40)</SelectItem>
                    <SelectItem value="a201">A201 (Capacity: 100)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger id="startTime">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0900">09:00 AM</SelectItem>
                      <SelectItem value="1000">10:00 AM</SelectItem>
                      <SelectItem value="1100">11:00 AM</SelectItem>
                      <SelectItem value="1300">01:00 PM</SelectItem>
                      <SelectItem value="1400">02:00 PM</SelectItem>
                      <SelectItem value="1500">03:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger id="endTime">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1100">11:00 AM</SelectItem>
                      <SelectItem value="1200">12:00 PM</SelectItem>
                      <SelectItem value="1300">01:00 PM</SelectItem>
                      <SelectItem value="1500">03:00 PM</SelectItem>
                      <SelectItem value="1600">04:00 PM</SelectItem>
                      <SelectItem value="1700">05:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainInvigilator">Main Invigilator</Label>
                <Select>
                  <SelectTrigger id="mainInvigilator">
                    <SelectValue placeholder="Select main invigilator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. John Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Emily Johnson</SelectItem>
                    <SelectItem value="williams">Dr. Michael Williams</SelectItem>
                    <SelectItem value="brown">Dr. Sarah Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assistantInvigilator">Assistant Invigilator</Label>
                <Select>
                  <SelectTrigger id="assistantInvigilator">
                    <SelectValue placeholder="Select assistant invigilator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Emily Johnson</SelectItem>
                    <SelectItem value="davis">Dr. Robert Davis</SelectItem>
                    <SelectItem value="wilson">Dr. Jennifer Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="120" min="30" max="240" />
            </div>

            <div className="space-y-2">
              <Label>Additional Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifyProfessors" defaultChecked />
                  <label
                    htmlFor="notifyProfessors"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notify assigned professors
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="specialArrangements" />
                  <label
                    htmlFor="specialArrangements"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Special arrangements required
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any additional notes or requirements for this exam"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Exam
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

