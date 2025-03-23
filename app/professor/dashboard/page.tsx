"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CalendarIcon, Download, Mail } from "lucide-react"

export default function ProfessorDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for professor's surveillance duties
  const duties = [
    {
      id: 1,
      module: "Database Systems",
      program: "L1",
      date: "15/06/2025",
      time: "09:00-11:00",
      room: "A104",
      role: "Main",
    },
    {
      id: 2,
      module: "Computer Networks",
      program: "L1",
      date: "16/06/2025",
      time: "10:00-12:00",
      room: "C105",
      role: "Assistant",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Professor Dashboard</h1>
        <Button variant="outline" size="sm">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Export Calendar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">My Profile</CardTitle>
            <CardDescription>Dr. John Smith</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <p className="text-sm">
                <span className="font-medium">Department:</span> Computer Science
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span> john.smith@university.edu
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> (123) 456-7890
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Duties</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Surveillance duties</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">1 as Main, 1 as Assistant</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm">New assignment added (16/06)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/professor/schedule">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Full Schedule
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Calendar
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Contact Admin
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-medium">My Calendar</CardTitle>
            <CardDescription>Surveillance duties schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="flex-1">
                <h3 className="font-medium mb-2">Duties on {date?.toLocaleDateString()}</h3>
                <div className="space-y-2">
                  {date && date.getDate() === 15 && date.getMonth() === 5 && (
                    <div className="p-2 border rounded-md bg-blue-50 border-blue-200">
                      <div className="flex justify-between">
                        <p className="font-medium">Database Systems</p>
                        <Badge>L1</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between mt-1">
                        <span>09:00 - 11:00</span>
                        <span>Room A104</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-blue-700 bg-blue-50">
                          Role: Main Invigilator
                        </Badge>
                      </div>
                    </div>
                  )}

                  {date && date.getDate() === 16 && date.getMonth() === 5 && (
                    <div className="p-2 border rounded-md bg-green-50 border-green-200">
                      <div className="flex justify-between">
                        <p className="font-medium">Computer Networks</p>
                        <Badge>L1</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between mt-1">
                        <span>10:00 - 12:00</span>
                        <span>Room C105</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-green-700 bg-green-50">
                          Role: Assistant Invigilator
                        </Badge>
                      </div>
                    </div>
                  )}

                  {(!date || (date.getDate() !== 15 && date.getDate() !== 16) || date.getMonth() !== 5) && (
                    <div className="p-4 text-center text-muted-foreground">
                      No surveillance duties scheduled for this date
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="notifications">Email Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Surveillance Schedule</CardTitle>
              <CardDescription>Your assigned exam surveillance duties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-6 bg-muted p-2 text-sm font-medium border-b">
                  <div className="col-span-2">Module</div>
                  <div>Date & Time</div>
                  <div>Room</div>
                  <div>Role</div>
                  <div>Actions</div>
                </div>

                <div className="divide-y">
                  {duties.map((duty) => (
                    <div key={duty.id} className="grid grid-cols-6 p-2 text-sm items-center hover:bg-muted/50">
                      <div className="col-span-2 font-medium">{duty.module}</div>
                      <div>
                        {duty.date} <br /> {duty.time}
                      </div>
                      <div>{duty.room}</div>
                      <div>
                        <Badge
                          variant="outline"
                          className={duty.role === "Main" ? "text-blue-700 bg-blue-50" : "text-green-700 bg-green-50"}
                        >
                          {duty.role}
                        </Badge>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Preview and send email notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 bg-card">
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Exam Surveillance Schedule</div>
                    <Badge variant="outline">Preview</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <div>To: john.smith@university.edu</div>
                    <div>From: exams@university.edu</div>
                    <div>Subject: Your Exam Surveillance Schedule - June 2025</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm">Dear Dr. Smith,</p>
                  <p className="text-sm">
                    Please find below your exam surveillance schedule for the upcoming exam period:
                  </p>

                  <div className="border rounded-md p-2 text-sm">
                    <div className="font-medium mb-2">Database Systems (L1)</div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>Date:</div>
                      <div>15/06/2025</div>
                      <div>Time:</div>
                      <div>09:00 - 11:00</div>
                      <div>Room:</div>
                      <div>A104</div>
                      <div>Role:</div>
                      <div>Main Invigilator</div>
                    </div>
                  </div>

                  <div className="border rounded-md p-2 text-sm">
                    <div className="font-medium mb-2">Computer Networks (L1)</div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>Date:</div>
                      <div>16/06/2025</div>
                      <div>Time:</div>
                      <div>10:00 - 12:00</div>
                      <div>Room:</div>
                      <div>C105</div>
                      <div>Role:</div>
                      <div>Assistant Invigilator</div>
                    </div>
                  </div>

                  <p className="text-sm">
                    Please arrive at least 30 minutes before the exam start time. If you have any conflicts or
                    questions, please contact the exam office as soon as possible.
                  </p>

                  <p className="text-sm">Thank you for your cooperation.</p>

                  <p className="text-sm">
                    Best regards,
                    <br />
                    University Exam Office
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <Textarea id="notes" placeholder="Add any additional notes to include in the email..." />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Save Draft</Button>
              <Button className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

