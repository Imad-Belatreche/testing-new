"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function ExamSessionPlanner() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Exam Session Planner</CardTitle>
            <CardDescription>Schedule and manage exam sessions</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New Exam
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search-exams">Search Exams</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search-exams" placeholder="Search by module, professor, room..." className="pl-8" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:w-2/3">
            <div>
              <Label htmlFor="program">Program</Label>
              <Select>
                <SelectTrigger id="program">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="l1">L1 - Bachelor</SelectItem>
                  <SelectItem value="m1">M1 - Master</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
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
          </div>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-8 bg-muted p-2 text-sm font-medium border-b">
            <div className="col-span-2">Module</div>
            <div>Program</div>
            <div>Date</div>
            <div>Time</div>
            <div>Room</div>
            <div>Main Invigilator</div>
            <div>Assistant</div>
          </div>

          <div className="divide-y">
            <div className="grid grid-cols-8 p-2 text-sm items-center hover:bg-muted/50">
              <div className="col-span-2 font-medium">Database Systems</div>
              <div>
                <Badge>L1</Badge>
              </div>
              <div>15/06/2025</div>
              <div>09:00-11:00</div>
              <div>A104</div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Smith" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="williams">Dr. Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Johnson" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="williams">Dr. Williams</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-8 p-2 text-sm items-center hover:bg-muted/50">
              <div className="col-span-2 font-medium">Software Engineering</div>
              <div>
                <Badge>M1</Badge>
              </div>
              <div>15/06/2025</div>
              <div>14:00-16:00</div>
              <div>B201</div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Williams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="williams">Dr. Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-8 border-dashed border-red-300">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                    <SelectItem value="davis">Dr. Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-8 p-2 text-sm items-center hover:bg-muted/50">
              <div className="col-span-2 font-medium">Computer Networks</div>
              <div>
                <Badge>L1</Badge>
              </div>
              <div>16/06/2025</div>
              <div>10:00-12:00</div>
              <div>C105</div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Brown" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Davis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="davis">Dr. Davis</SelectItem>
                    <SelectItem value="wilson">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-8 p-2 text-sm items-center hover:bg-muted/50 bg-red-50">
              <div className="col-span-2 font-medium">Artificial Intelligence</div>
              <div>
                <Badge>M1</Badge>
              </div>
              <div>16/06/2025</div>
              <div>14:00-17:00</div>
              <div>A201</div>
              <div>
                <Select>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Dr. Wilson" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="wilson">Dr. Wilson</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-8 border-dashed border-red-300">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="davis">Dr. Davis</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-8 p-2 text-sm items-center hover:bg-muted/50 bg-red-50">
              <div className="col-span-2 font-medium">Data Structures</div>
              <div>
                <Badge>L1</Badge>
              </div>
              <div>17/06/2025</div>
              <div>09:00-11:00</div>
              <div>B102</div>
              <div>
                <Select>
                  <SelectTrigger className="h-8 border-dashed border-red-300">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-8 border-dashed border-red-300">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="davis">Dr. Davis</SelectItem>
                    <SelectItem value="wilson">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm text-muted-foreground">Showing 5 of 24 exam sessions</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

