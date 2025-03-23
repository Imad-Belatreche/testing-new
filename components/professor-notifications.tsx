"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Calendar, Check, Mail, Send } from "lucide-react"

export function ProfessorNotifications() {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Surveillance Assignment",
      message:
        "You have been assigned as the Main invigilator for Database Systems exam on June 15, 2025 from 09:00 to 11:00 in room A104.",
      date: "2 hours ago",
      read: false,
      type: "assignment",
    },
    {
      id: 2,
      title: "Schedule Change",
      message: "The Software Engineering exam has been rescheduled to June 18, 2025. Please confirm your availability.",
      date: "Yesterday",
      read: false,
      type: "change",
    },
    {
      id: 3,
      title: "Reminder: Upcoming Exam",
      message:
        "This is a reminder that you are assigned to invigilate the Data Structures exam tomorrow at 09:00 in room B102.",
      date: "3 days ago",
      read: true,
      type: "reminder",
    },
  ]

  // Email template preview
  const emailTemplate = {
    subject: "Exam Surveillance Assignment: Database Systems",
    body: `
Dear Dr. Smith,

You have been assigned as the Main invigilator for the following exam:

Module: Database Systems
Date: June 15, 2025
Time: 09:00 - 11:00
Room: A104
Role: Main Invigilator

Please confirm your availability by clicking the confirmation link below. If you have any conflicts, please contact the exam office as soon as possible.

Best regards,
University Exam Office
    `,
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <p className="text-sm text-muted-foreground">Updates and alerts</p>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="email-preview">Email Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={notification.read ? "border-gray-200" : "border-blue-200 bg-blue-50"}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          notification.type === "assignment"
                            ? "bg-blue-100"
                            : notification.type === "change"
                              ? "bg-amber-100"
                              : "bg-green-100"
                        }`}
                      >
                        {notification.type === "assignment" ? (
                          <Calendar
                            className={`h-4 w-4 ${
                              notification.type === "assignment"
                                ? "text-blue-600"
                                : notification.type === "change"
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          />
                        ) : notification.type === "change" ? (
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        ) : (
                          <Mail className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <div className="flex justify-end mt-2 gap-2">
                          {!notification.read && (
                            <Button variant="outline" size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              Mark as read
                            </Button>
                          )}
                          {notification.type === "assignment" && (
                            <>
                              <Button variant="outline" size="sm">
                                Decline
                              </Button>
                              <Button size="sm">Confirm</Button>
                            </>
                          )}
                          {notification.type === "change" && (
                            <>
                              <Button variant="outline" size="sm">
                                Not Available
                              </Button>
                              <Button size="sm">Confirm</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-4">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <Card key={notification.id} className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "assignment"
                              ? "bg-blue-100"
                              : notification.type === "change"
                                ? "bg-amber-100"
                                : "bg-green-100"
                          }`}
                        >
                          {notification.type === "assignment" ? (
                            <Calendar
                              className={`h-4 w-4 ${
                                notification.type === "assignment"
                                  ? "text-blue-600"
                                  : notification.type === "change"
                                    ? "text-amber-600"
                                    : "text-green-600"
                              }`}
                            />
                          ) : notification.type === "change" ? (
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                          ) : (
                            <Mail className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.date}</span>
                          </div>
                          <p className="text-sm mt-1">{notification.message}</p>
                          <div className="flex justify-end mt-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              Mark as read
                            </Button>
                            {notification.type === "assignment" && (
                              <>
                                <Button variant="outline" size="sm">
                                  Decline
                                </Button>
                                <Button size="sm">Confirm</Button>
                              </>
                            )}
                            {notification.type === "change" && (
                              <>
                                <Button variant="outline" size="sm">
                                  Not Available
                                </Button>
                                <Button size="sm">Confirm</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="email-preview">
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="mb-4 pb-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Subject: {emailTemplate.subject}</h3>
                    <Badge>Preview</Badge>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>From: University Exam Office &lt;exams@university.edu&gt;</span>
                    <span>To: Dr. Smith &lt;smith@university.edu&gt;</span>
                  </div>
                </div>

                <div className="whitespace-pre-line text-sm">{emailTemplate.body}</div>

                <div className="flex justify-end mt-6 gap-2">
                  <Button variant="outline">Edit Template</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

