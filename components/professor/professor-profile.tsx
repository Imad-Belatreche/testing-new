"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, Mail, Phone, Save, User } from "lucide-react"

export function ProfessorProfile() {
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock professor data
  const professor = {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    maidenName: "",
    gender: "Male",
    status: "Active",
    grade: "Prof",
    email1: "john.smith@usthb.edu",
    email2: "johnsmith@gmail.com",
    phone1: "+213 555 123 456",
    phone2: "+213 555 789 012",
    departments: ["Computer Science"],
    modules: [
      "CS101 - Introduction to Computer Science",
      "CS201 - Data Structures and Algorithms",
      "CS301 - Database Systems",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  }

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the backend
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={professor.avatar} alt={`${professor.firstName} ${professor.lastName}`} />
                <AvatarFallback>{`${professor.firstName.charAt(0)}${professor.lastName.charAt(0)}`}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{`${professor.firstName} ${professor.lastName}`}</h2>
                <p className="text-muted-foreground">{professor.grade}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {professor.departments.map((department, index) => (
                  <Badge key={index} variant="outline" className="bg-primary-usthb text-white">
                    {department}
                  </Badge>
                ))}
              </div>
              <div className="w-full space-y-2 pt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{professor.email1}</span>
                </div>
                {professor.email2 && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{professor.email2}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{professor.phone1}</span>
                </div>
                {professor.phone2 && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{professor.phone2}</span>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Change Avatar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
                <TabsTrigger value="academic">Academic Information</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={professor.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={professor.lastName} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maidenName">Maiden Name (if applicable)</Label>
                      <Input id="maidenName" defaultValue={professor.maidenName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input id="gender" defaultValue={professor.gender} disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input id="status" defaultValue={professor.status} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" defaultValue={professor.grade} disabled />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email1">Primary Email</Label>
                      <Input id="email1" type="email" defaultValue={professor.email1} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email2">Secondary Email (Optional)</Label>
                      <Input id="email2" type="email" defaultValue={professor.email2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone1">Primary Phone</Label>
                      <Input id="phone1" defaultValue={professor.phone1} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone2">Secondary Phone (Optional)</Label>
                      <Input id="phone2" defaultValue={professor.phone2} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Departments</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex flex-wrap gap-2">
                        {professor.departments.map((department, index) => (
                          <Badge key={index} variant="outline" className="bg-primary-usthb text-white">
                            {department}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Department assignments are managed by administrators.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Teaching Modules</Label>
                    <div className="rounded-md border p-4">
                      <ul className="space-y-2">
                        {professor.modules.map((module, index) => (
                          <li key={index} className="text-sm">
                            {module}
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground">Module assignments are managed by administrators.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

