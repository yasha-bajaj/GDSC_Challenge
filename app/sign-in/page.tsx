"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Update the handleSignIn function to properly set the authentication cookie
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a new user with no diagnosis completed
      const userData = {
        authenticated: true,
        user: {
          email,
          completedDiagnosis: false,
        },
      }

      // Store in localStorage
      localStorage.setItem("safetrail-auth", JSON.stringify(userData))

      // Also set a cookie for the middleware
      document.cookie = `safetrail-auth=${JSON.stringify(userData)}; path=/; max-age=86400`

      // Redirect to diagnosis page
      router.push("/diagnosis")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center purple-gradient p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="rounded-full p-3 bg-white/10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Safetrail-gZDTvrmW4eZrcexctXkmolsw8jjnKb.png"
                alt="SafeTrail Logo"
                width={80}
                height={80}
                priority
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">MemoryCare</h1>
          <p className="text-white/80">Alzheimer's care and cognitive support</p>
        </div>

        <Card className="w-full rounded-3xl border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full rounded-xl py-6" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" className="text-xs text-muted-foreground">
              Need help? Contact support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

