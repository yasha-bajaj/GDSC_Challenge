"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { Brain, Shield, Lock, Unlock } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ModuleSelectPage() {
  const { user, isPatientModuleLocked, unlockPatientModule, setPatientLock } = useAuth()
  const router = useRouter()
  const [showLockDialog, setShowLockDialog] = useState(false)
  const [showUnlockDialog, setShowUnlockDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handlePatientModule = () => {
    if (user?.role === "caregiver") {
      // Caregivers can always access patient module
      router.push("/patient")
    } else if (isPatientModuleLocked) {
      // If locked, show unlock dialog
      setShowUnlockDialog(true)
    } else {
      // If not locked, go directly to patient module
      router.push("/patient")
    }
  }

  const handleCaregiverModule = () => {
    router.push("/caregiver")
  }

  const handleLock = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters")
      return
    }

    setPatientLock(true, newPassword)
    setShowLockDialog(false)
    setNewPassword("")
    setConfirmPassword("")
    setError("")
  }

  const handleUnlock = () => {
    if (unlockPatientModule(password)) {
      setShowUnlockDialog(false)
      setPassword("")
      setError("")
      router.push("/patient")
    } else {
      setError("Incorrect password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 purple-gradient">
      <div className="w-full max-w-md">
        <Card className="w-full rounded-3xl border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Choose Module</CardTitle>
            <CardDescription>Select which module you want to access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handlePatientModule}
              className="w-full h-auto py-6 justify-start text-left gap-4"
              variant="outline"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Patient Module</p>
                <p className="text-sm text-muted-foreground">Memory games and personal journal</p>
              </div>
              {isPatientModuleLocked ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Unlock className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>

            <Button
              onClick={handleCaregiverModule}
              className="w-full h-auto py-6 justify-start text-left gap-4"
              variant="outline"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Caregiver Module</p>
                <p className="text-sm text-muted-foreground">Monitor progress and manage care</p>
              </div>
            </Button>

            {user?.role === "caregiver" && (
              <Button
                onClick={() => setShowLockDialog(true)}
                className="w-full mt-6"
                variant={isPatientModuleLocked ? "outline" : "default"}
              >
                {isPatientModuleLocked ? (
                  <>
                    <Unlock className="mr-2 h-4 w-4" />
                    Change Patient Module Password
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Set Patient Module Password
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lock Dialog */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isPatientModuleLocked ? "Change Password" : "Set Password"}</DialogTitle>
            <DialogDescription>
              {isPatientModuleLocked
                ? "Change the password for the patient module"
                : "Set a password to protect the patient module"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLock}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unlock Dialog */}
      <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription>Enter the password to access the patient module</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnlockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnlock}>Unlock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

