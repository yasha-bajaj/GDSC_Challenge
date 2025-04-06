import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Battery, Bluetooth, AlertCircle } from "lucide-react"

// Define patient data outside of the component
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 78,
    status: "in-zone",
    statusText: "In Safe Zone",
    location: "Living Room",
    batteryLevel: 85,
    connectionType: "bluetooth",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: 2,
    name: "Mary Smith",
    age: 72,
    status: "in-zone",
    statusText: "In Safe Zone",
    location: "Bedroom",
    batteryLevel: 62,
    connectionType: "bluetooth",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 81,
    status: "near-boundary",
    statusText: "Near Boundary",
    location: "Kitchen",
    batteryLevel: 45,
    connectionType: "bluetooth",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RJ",
  },
]

export function PatientList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <CardDescription>All patients currently being monitored</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback>{patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-muted-foreground">Age: {patient.age}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    patient.status === "in-zone"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : patient.status === "near-boundary"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {patient.statusText}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{patient.location}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Battery className="h-4 w-4" />
                  <span>{patient.batteryLevel}%</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Bluetooth className="h-4 w-4" />
                  <span>Connected</span>
                </div>

                <Button variant="outline" size="sm">
                  Details
                </Button>

                {patient.status === "near-boundary" && (
                  <Button variant="outline" size="icon" className="text-yellow-600">
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

