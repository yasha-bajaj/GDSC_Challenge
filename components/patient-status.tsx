import { MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function PatientStatus() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-14 w-14 border-2 border-primary/20">
          <AvatarImage src="/patient.jpg" />
          <AvatarFallback className="text-lg bg-primary/10">RJ</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">Living Room</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Last updated: Just now</p>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-sm font-medium">Active</div>
        <div className="text-xs text-muted-foreground">Since 7:30 AM</div>
      </div>
    </div>
  )
}

