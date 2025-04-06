"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  Heart,
  Activity,
  Save,
  Edit2,
  MapPin,
  AlertTriangle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function PatientProfilePage() {
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [patientData, setPatientData] = useState({
    name: "Robert Johnson",
    age: 78,
    dob: "1947-05-12",
    phone: "(555) 123-4567",
    address: "123 Maple Street, Anytown, USA",
    emergencyContact: "Mary Johnson (Daughter) - (555) 987-6543",
    medicalConditions: "Alzheimer's Disease (Early Stage), Hypertension, Arthritis",
    medications: "Donepezil 10mg daily, Lisinopril 20mg daily, Acetaminophen as needed",
    allergies: "Penicillin, Sulfa drugs",
    notes: "Enjoys walking in the garden. Becomes disoriented in unfamiliar environments. Prefers routine activities.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setEditing(false)
    toast({
      title: "Profile Updated",
      description: "Patient profile has been successfully updated.",
    })
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Page Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-10">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-semibold">Patient Profile</h1>
          <p className="text-xs text-muted-foreground">Manage patient information</p>
        </div>
        <Button
          variant={editing ? "default" : "outline"}
          size="sm"
          className="ml-auto"
          onClick={() => (editing ? handleSave() : setEditing(true))}
        >
          {editing ? (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Basic Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src="/patient.jpg" />
                <AvatarFallback className="text-2xl">RJ</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  {editing ? (
                    <Input id="name" name="name" value={patientData.name} onChange={handleChange} />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{patientData.name}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="age">Age</Label>
                    {editing ? (
                      <Input id="age" name="age" type="number" value={patientData.age} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{patientData.age} years</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="dob">Date of Birth</Label>
                    {editing ? (
                      <Input id="dob" name="dob" type="date" value={patientData.dob} onChange={handleChange} />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{patientData.dob}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  {editing ? (
                    <Input id="phone" name="phone" value={patientData.phone} onChange={handleChange} />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patientData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              {editing ? (
                <Textarea id="address" name="address" value={patientData.address} onChange={handleChange} />
              ) : (
                <div className="flex items-start gap-2 p-2 border rounded-md bg-muted/50">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patientData.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              {editing ? (
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={patientData.emergencyContact}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData.emergencyContact}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              {editing ? (
                <Textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={patientData.medicalConditions}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-start gap-2 p-2 border rounded-md bg-muted/50">
                  <Heart className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patientData.medicalConditions}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="medications">Medications</Label>
              {editing ? (
                <Textarea id="medications" name="medications" value={patientData.medications} onChange={handleChange} />
              ) : (
                <div className="flex items-start gap-2 p-2 border rounded-md bg-muted/50">
                  <Activity className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patientData.medications}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="allergies">Allergies</Label>
              {editing ? (
                <Input id="allergies" name="allergies" value={patientData.allergies} onChange={handleChange} />
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData.allergies}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="notes">Notes</Label>
              {editing ? (
                <Textarea id="notes" name="notes" value={patientData.notes} onChange={handleChange} />
              ) : (
                <div className="flex items-start gap-2 p-2 border rounded-md bg-muted/50">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patientData.notes}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

