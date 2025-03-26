"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, Download, Save, Upload } from "lucide-react"

export function AdminSettings() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSaveSettings = () => {
    // In a real app, you would save the settings to the backend
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">System Settings</h1>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">Settings have been updated successfully.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Institution Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name</Label>
                    <Input id="institutionName" defaultValue="USTHB" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Current Academic Year</Label>
                    <Input id="academicYear" defaultValue="2024-2025" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionAddress">Institution Address</Label>
                  <Textarea
                    id="institutionAddress"
                    defaultValue="BP 32, El Alia, Bab Ezzouar, 16111, Algiers, Algeria"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Behavior</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoAssign">Auto-Assign Surveillance</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign professors to surveillance duties based on their availability
                      </p>
                    </div>
                    <Switch id="autoAssign" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoNotify">Automatic Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically send notifications to professors when they are assigned to surveillance duties
                      </p>
                    </div>
                    <Switch id="autoNotify" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="conflictDetection">Conflict Detection</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically detect scheduling conflicts for professors
                      </p>
                    </div>
                    <Switch id="conflictDetection" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Configure email templates for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Assignment Notification</h3>
                <div className="space-y-2">
                  <Label htmlFor="assignmentSubject">Email Subject</Label>
                  <Input id="assignmentSubject" defaultValue="Exam Surveillance Assignment: {exam_name}" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignmentTemplate">Email Template</Label>
                  <Textarea
                    id="assignmentTemplate"
                    className="min-h-[200px]"
                    defaultValue={`Dear {professor_name},

You have been assigned as the {role} invigilator for the following exam:

Module: {exam_name}
Date: {exam_date}
Time: {start_time} - {end_time}
Room: {room_name}
Role: {role} Invigilator

Please confirm your availability by clicking the confirmation link below. If you have any conflicts, please contact the exam office as soon as possible.

Best regards,
University Exam Office`}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reminder Notification</h3>
                <div className="space-y-2">
                  <Label htmlFor="reminderSubject">Email Subject</Label>
                  <Input id="reminderSubject" defaultValue="Reminder: Upcoming Exam Surveillance - {exam_name}" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderTemplate">Email Template</Label>
                  <Textarea
                    id="reminderTemplate"
                    className="min-h-[200px]"
                    defaultValue={`Dear {professor_name},

This is a reminder that you are assigned to invigilate the following exam:

Module: {exam_name}
Date: {exam_date}
Time: {start_time} - {end_time}
Room: {room_name}
Role: {role} Invigilator

Please arrive at the exam room at least 15 minutes before the exam starts.

Best regards,
University Exam Office`}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Manage system backups and restore data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Database Backup</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoBackup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create backups of the database on a schedule
                      </p>
                    </div>
                    <Switch id="autoBackup" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select
                    id="backupFrequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                  <Input id="backupRetention" type="number" defaultValue="30" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Backup
                  </Button>
                  <Button variant="default" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Create Backup Now
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Restore Data</h3>
                <div className="space-y-2">
                  <Label htmlFor="restoreFile">Upload Backup File</Label>
                  <div className="flex gap-2">
                    <Input id="restoreFile" type="file" />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Warning: Restoring a backup will overwrite all current data. This action cannot be undone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Maintenance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the system in maintenance mode. Only administrators will be able to access the system.
                      </p>
                    </div>
                    <Switch id="maintenanceMode" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                  <Textarea
                    id="maintenanceMessage"
                    defaultValue="The system is currently undergoing maintenance. Please try again later."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Clear All Surveillance Assignments
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Reset System to Default Settings
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

