"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download, FileSpreadsheet, FileText, Printer } from "lucide-react"

export function ReportGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exams">
          <TabsList className="mb-4">
            <TabsTrigger value="exams">Exam Reports</TabsTrigger>
            <TabsTrigger value="surveillance">Surveillance Reports</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="exams">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="all-exams">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-exams">All Exams</SelectItem>
                    <SelectItem value="by-program">Exams by Program</SelectItem>
                    <SelectItem value="by-date">Exams by Date</SelectItem>
                    <SelectItem value="by-room">Exams by Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-range">Date Range</Label>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Select date range
                </Button>
              </div>

              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium">Include Fields</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="module" defaultChecked />
                  <Label htmlFor="module">Module Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="program" defaultChecked />
                  <Label htmlFor="program">Program</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="date" defaultChecked />
                  <Label htmlFor="date">Date & Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="room" defaultChecked />
                  <Label htmlFor="room">Room</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="main" defaultChecked />
                  <Label htmlFor="main">Main Invigilator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="assistant" defaultChecked />
                  <Label htmlFor="assistant">Assistant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="duration" defaultChecked />
                  <Label htmlFor="duration">Duration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="students" />
                  <Label htmlFor="students">Student Count</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate PDF
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="surveillance">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="professor-report">Professor</Label>
                <Select>
                  <SelectTrigger id="professor-report">
                    <SelectValue placeholder="All Professors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Professors</SelectItem>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department-report">Department</Label>
                <Select>
                  <SelectTrigger id="department-report">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="se">Software Engineering</SelectItem>
                    <SelectItem value="networks">Networks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format-surveillance">Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="format-surveillance">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Surveillance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                    [Bar Chart Visualization]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Exam Room Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                    [Pie Chart Visualization]
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Statistics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

