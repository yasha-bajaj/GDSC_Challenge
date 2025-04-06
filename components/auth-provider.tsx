"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserRole = "patient" | "caregiver" | null
type DiagnosisLevel = "mild" | "moderate" | "severe" | null

type UserData = {
  email: string
  role: UserRole
  completedDiagnosis: boolean
  diagnosisLevel?: DiagnosisLevel
  name?: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: UserData | null
  signOut: () => void
  updateUser: (data: Partial<UserData>) => void
  setPatientLock: (isLocked: boolean, password: string) => void
  unlockPatientModule: (password: string) => boolean
  isPatientModuleLocked: boolean
  patientLockPassword: string
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signOut: () => {},
  updateUser: () => {},
  setPatientLock: () => {},
  unlockPatientModule: () => false,
  isPatientModuleLocked: false,
  patientLockPassword: "",
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPatientModuleLocked, setIsPatientModuleLocked] = useState(false)
  const [patientLockPassword, setPatientLockPassword] = useState("1234") // Default password
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  // Load auth state only once on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("safetrail-auth")
        if (authData) {
          const { authenticated, user } = JSON.parse(authData)
          setIsAuthenticated(authenticated)
          setUser(user)

          // Check if patient module lock is set
          const lockData = localStorage.getItem("safetrail-patient-lock")
          if (lockData) {
            const { isLocked, password } = JSON.parse(lockData)
            setIsPatientModuleLocked(isLocked)
            setPatientLockPassword(password)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error("Error loading auth state:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Handle redirects with debouncing to prevent loops
  useEffect(() => {
    if (loading || isNavigating) return

    const handleRedirects = () => {
      setIsNavigating(true)

      // Special case for welcome page - always allow
      if (pathname === "/welcome") {
        setIsNavigating(false)
        return
      }

      // If not authenticated and not on sign-in page, redirect to sign-in
      if (!isAuthenticated && pathname !== "/sign-in") {
        router.push("/sign-in")
        return
      }

      // If authenticated and on sign-in page, redirect to appropriate page
      if (isAuthenticated && pathname === "/sign-in") {
        if (!user?.completedDiagnosis) {
          router.push("/diagnosis")
        } else {
          router.push("/module-select")
        }
        return
      }

      // If authenticated but hasn't completed diagnosis, redirect to diagnosis
      // Only redirect if not already on the diagnosis page to prevent loops
      if (isAuthenticated && !user?.completedDiagnosis && pathname !== "/diagnosis") {
        router.push("/diagnosis")
        return
      }

      // Reset navigation state after a delay
      setTimeout(() => {
        setIsNavigating(false)
      }, 1000)
    }

    handleRedirects()
  }, [isAuthenticated, loading, pathname, router, user, isNavigating])

  const signOut = () => {
    // Clear localStorage
    localStorage.removeItem("safetrail-auth")

    // Clear cookie
    document.cookie = "safetrail-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Update state
    setIsAuthenticated(false)
    setUser(null)

    // Navigate to sign-in
    router.push("/sign-in")
  }

  const updateUser = (data: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)

      const userData = {
        authenticated: true,
        user: updatedUser,
      }

      // Update localStorage
      localStorage.setItem("safetrail-auth", JSON.stringify(userData))

      // Update cookie
      document.cookie = `safetrail-auth=${JSON.stringify(userData)}; path=/; max-age=86400`
    }
  }

  const setPatientLock = (isLocked: boolean, password: string) => {
    setIsPatientModuleLocked(isLocked)
    setPatientLockPassword(password)
    localStorage.setItem(
      "safetrail-patient-lock",
      JSON.stringify({
        isLocked,
        password,
      }),
    )
  }

  const unlockPatientModule = (password: string) => {
    if (password === patientLockPassword) {
      setIsPatientModuleLocked(false)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signOut,
        updateUser,
        setPatientLock,
        unlockPatientModule,
        isPatientModuleLocked,
        patientLockPassword,
      }}
    >
      {loading ? (
        // Show a simple loading state while auth is being determined
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

