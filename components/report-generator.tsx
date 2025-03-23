import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileSpreadsheet, FileIcon as FilePdf, Calendar, Download, Eye } from "lucide-react"

export default function ReportGenerator() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Report Generator</CardTitle>
            <CardDescription>Generate and export exam schedules and surveillance assignments</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exam-schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="exam-schedule">Exam Schedule</TabsTrigger>
            <TabsTrigger value="surveillance">Surveillance Assignments</TabsTrigger>
            <TabsTrigger value="professor">Professor Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="exam-schedule">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="program">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        <SelectItem value="l1">L1 - Bachelor</SelectItem>
                        <SelectItem value="m1">M1 - Master</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select defaultValue="june">
                      <SelectTrigger id="date-range">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="june">June 2025</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Include Information</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rooms" defaultChecked />
                      <label
                        htmlFor="rooms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Room Details
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="professors" defaultChecked />
                      <label
                        htmlFor="professors"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Assigned Professors
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="students" />
                      <label
                        htmlFor="students"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Student Count
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notes" />
                      <label
                        htmlFor="notes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Special Notes
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf" defaultChecked />
                      <label
                        htmlFor="pdf"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <FilePdf className="h-4 w-4 text-red-500" />
                        PDF
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="excel" />
                      <label
                        htmlFor="excel"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Excel
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="calendar" />
                      <label
                        htmlFor="calendar"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <Calendar className="h-4 w-4 text-blue-500" />
                        iCal
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Report Preview</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Type:</strong> Exam Schedule
                  </p>
                  <p>
                    <strong>Programs:</strong> All Programs
                  </p>
                  <p>
                    <strong>Date Range:</strong> June 2025
                  </p>
                  <p>
                    <strong>Includes:</strong> Room Details, Assigned Professors
                  </p>
                  <p>
                    <strong>Format:</strong> PDF
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-xs">
                      This report will include all exams scheduled in June 2025 with their room details and assigned
                      professors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="surveillance">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="is">Information Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-range-surv">Date Range</Label>
                    <Select defaultValue="june">
                      <SelectTrigger id="date-range-surv">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="june">June 2025</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Group By</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="by-professor" defaultChecked />
                      <label
                        htmlFor="by-professor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Professor
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="by-date" />
                      <label
                        htmlFor="by-date"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Date
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="by-role" />
                      <label
                        htmlFor="by-role"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Role (Main/Assistant)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Include Information</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contact" defaultChecked />
                      <label
                        htmlFor="contact"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Contact Information
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="department-info" defaultChecked />
                      <label
                        htmlFor="department-info"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Department
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="workload" />
                      <label
                        htmlFor="workload"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Workload Summary
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf-surv" defaultChecked />
                      <label
                        htmlFor="pdf-surv"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <FilePdf className="h-4 w-4 text-red-500" />
                        PDF
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="excel-surv" />
                      <label
                        htmlFor="excel-surv"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Excel
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Report Preview</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Type:</strong> Surveillance Assignments
                  </p>
                  <p>
                    <strong>Department:</strong> All Departments
                  </p>
                  <p>
                    <strong>Date Range:</strong> June 2025
                  </p>
                  <p>
                    <strong>Group By:</strong> Professor
                  </p>
                  <p>
                    <strong>Includes:</strong> Contact Information, Department
                  </p>
                  <p>
                    <strong>Format:</strong> PDF
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-xs">
                      This report will list all professors and their surveillance assignments for June 2025, including
                      their contact information and department.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="professor">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="professor">Professor</Label>
                    <Select>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="Select professor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Professors</SelectItem>
                        <SelectItem value="smith">Dr. Smith</SelectItem>
                        <SelectItem value="johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="williams">Dr. Williams</SelectItem>
                        <SelectItem value="brown">Dr. Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-range-prof">Date Range</Label>
                    <Select defaultValue="june">
                      <SelectTrigger id="date-range-prof">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="june">June 2025</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Include Information</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exam-details" defaultChecked />
                      <label
                        htmlFor="exam-details"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Exam Details
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-info" defaultChecked />
                      <label
                        htmlFor="room-info"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Room Information
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="role-info" defaultChecked />
                      <label
                        htmlFor="role-info"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Role (Main/Assistant)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="calendar-view" />
                      <label
                        htmlFor="calendar-view"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Calendar View
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Options</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-email" />
                    <label
                      htmlFor="send-email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send schedule to professors via email
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf-prof" defaultChecked />
                      <label
                        htmlFor="pdf-prof"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <FilePdf className="h-4 w-4 text-red-500" />
                        PDF
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="calendar-prof" />
                      <label
                        htmlFor="calendar-prof"
                        className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <Calendar className="h-4 w-4 text-blue-500" />
                        iCal
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Report Preview</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Type:</strong> Professor Schedule
                  </p>
                  <p>
                    <strong>Professor:</strong> All Professors
                  </p>
                  <p>
                    <strong>Date Range:</strong> June 2025
                  </p>
                  <p>
                    <strong>Includes:</strong> Exam Details, Room Information, Role
                  </p>
                  <p>
                    <strong>Email:</strong> No
                  </p>
                  <p>
                    <strong>Format:</strong> PDF
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-xs">
                      This report will generate individual schedules for all professors showing their exam surveillance
                      duties for June 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

