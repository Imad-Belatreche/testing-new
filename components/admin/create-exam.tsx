"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calendar, Check, Clock, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CreateExam() {
  const [selectedModule, setSelectedModule] = useState("")
  const [selectedSession, setSelectedSession] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [mainInvigilator, setMainInvigilator] = useState("")
  const [assistantInvigilator, setAssistantInvigilator] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock data
  const modules = [
    { id: "cs101", name: "CS101 - Introduction to Computer Science", program: "L1" },
    { id: "cs201", name: "CS201 - Data Structures and Algorithms", program: "L1" },
    { id: "se301", name: "SE301 - Software Engineering", program: "L1" },
    { id: "db301", name: "DB301 - Database Systems", program: "L1" },
    { id: "ai401", name: "AI401 - Artificial Intelligence", program: "M1" },
  ]

  const examSessions = [
    { id: "1", name: "Spring 2025 - Midterm Exams", program: "L1" },
    { id: "2", name: "Spring 2025 - Final Exams", program: "L1" },
    { id: "3", name: "Spring 2025 - Master's Midterm", program: "M1" },
    { id: "4", name: "Spring 2025 - Master's Final", program: "M1" },
  ]

  const rooms = [
    { id: "a104", name: "A104", capacity: 60, features: ["Projector", "Internet Access"] },
    { id: "b201", name: "B201", capacity: 80, features: ["Projector", "Internet Access", "Smart Board"] },
    { id: "c105", name: "C105", capacity: 40, features: ["Projector"] },
    {
      id: "a201",
      name: "A201",
      capacity: 100,
      features: ["Projector", "Internet Access", "Smart Board", "Computer Lab"],
    },
  ]

  const professors = [
    { id: "1", name: "Dr. John Smith", department: "Computer Science" },
    { id: "2", name: "Dr. Sarah Williams", department: "Software Engineering" },
    { id: "3", name: "Dr. Michael Johnson", department: "Computer Science" },
    { id: "4", name: "Dr. Emily Brown", department: "Networks" },
    { id: "5", name: "Dr. David Wilson", department: "Artificial Intelligence" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to the backend
    console.log({
      module: selectedModule,
      session: selectedSession,
      room: selectedRoom,
      date,
      startTime,
      endTime,
      mainInvigilator,
      assistantInvigilator,
    })

    // Show success message
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  // Get the selected module details
  const selectedModuleDetails = modules.find((module) => module.id === selectedModule)

  // Filter exam sessions based on selected module program
  const filteredExamSessions = selectedModuleDetails
    ? examSessions.filter((session) => session.program === selectedModuleDetails.program)
    : examSessions

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Exam</h1>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">Exam has been created successfully.</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>Select the module and exam session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="module">Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule} required>
                  <SelectTrigger id="module">
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{module.name}</span>
                          <Badge
                            variant="outline"
                            className={`${module.program === "L1" ? "bg-primary-usthb" : "bg-gray-700"} text-white ml-2`}
                          >
                            {module.program}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session">Exam Session</Label>
                <Select value={selectedSession} onValueChange={setSelectedSession} required disabled={!selectedModule}>
                  <SelectTrigger id="session">
                    <SelectValue placeholder="Select exam session" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredExamSessions.map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!selectedModule && <p className="text-sm text-muted-foreground">Please select a module first</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="examName">Exam Name (Optional)</Label>
                <Input id="examName" placeholder="e.g., Midterm Exam" />
                <p className="text-sm text-muted-foreground">If left blank, the module name will be used</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special instructions for this exam"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule & Location</CardTitle>
              <CardDescription>Set the date, time, and room for the exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-8"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-8"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      className="pl-8"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom} required>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} - {room.capacity} seats
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRoom && (
                <div className="rounded-md bg-muted p-3">
                  <h4 className="text-sm font-medium mb-2">Room Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {rooms
                      .find((room) => room.id === selectedRoom)
                      ?.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {feature}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Surveillance</CardTitle>
              <CardDescription>Assign professors for exam surveillance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainInvigilator">Main Invigilator</Label>
                <Select value={mainInvigilator} onValueChange={setMainInvigilator} required>
                  <SelectTrigger id="mainInvigilator">
                    <SelectValue placeholder="Select main invigilator" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors.map((professor) => (
                      <SelectItem key={professor.id} value={professor.id}>
                        {professor.name} - {professor.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assistantInvigilator">Assistant Invigilator (Optional)</Label>
                <Select value={assistantInvigilator} onValueChange={setAssistantInvigilator}>
                  <SelectTrigger id="assistantInvigilator">
                    <SelectValue placeholder="Select assistant invigilator" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors
                      .filter((professor) => professor.id !== mainInvigilator)
                      .map((professor) => (
                        <SelectItem key={professor.id} value={professor.id}>
                          {professor.name} - {professor.department}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify">Notify assigned professors via email</Label>
              </div>

              {mainInvigilator && assistantInvigilator && mainInvigilator === assistantInvigilator && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Main and assistant invigilators cannot be the same person.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
              <CardDescription>Configure additional exam settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowCalculator" />
                  <Label htmlFor="allowCalculator">Allow calculators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allowNotes" />
                  <Label htmlFor="allowNotes">Allow notes/cheat sheets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="requireComputers" />
                  <Label htmlFor="requireComputers">Requires computers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="requireInternet" />
                  <Label htmlFor="requireInternet">Requires internet access</Label>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="estimatedStudents">Estimated Number of Students</Label>
                <Input id="estimatedStudents" type="number" placeholder="e.g., 50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional notes or requirements"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </form>
    </div>
  )
}

