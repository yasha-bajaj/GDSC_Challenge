"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Shield, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentStep < 3 && !loading) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentStep, loading])

  const handleGetStarted = () => {
    router.push("/")
  }

  const steps = [
    {
      icon: Shield,
      title: "Safety First",
      description: "SafeTrail helps you monitor and ensure the safety of your loved ones with Alzheimer's or dementia.",
      color: "bg-primary text-white",
    },
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "Track location in real-time with customizable safe zones and instant alerts.",
      color: "bg-blue-500 text-white",
    },
    {
      icon: Heart,
      title: "Peace of Mind",
      description: "Get notifications, track activities, and ensure your loved ones are safe and sound.",
      color: "bg-green-500 text-white",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col purple-gradient">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative h-24 w-24 mb-8 animate-pulse">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Safetrail-gZDTvrmW4eZrcexctXkmolsw8jjnKb.png"
              alt="SafeTrail Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-60 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full animate-progress"
              style={{ width: "60%", animation: "progress 1.5s ease-in-out" }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Logo and welcome text */}
          <div className="pt-12 pb-6 px-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative h-20 w-20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Safetrail-gZDTvrmW4eZrcexctXkmolsw8jjnKb.png"
                  alt="SafeTrail Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to SafeTrail</h1>
            <p className="text-white/80">Your partner in caregiving</p>
          </div>

          {/* Steps */}
          <div className="flex-1 flex flex-col justify-center px-6 pb-12">
            <div className="relative h-[300px] mb-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 rounded-3xl p-6 transition-all duration-500 ease-in-out ${
                    currentStep === index
                      ? "opacity-100 translate-x-0 shadow-lg"
                      : currentStep > index
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                  }`}
                  style={{ backgroundColor: "white" }}
                >
                  <div className={`h-16 w-16 rounded-2xl ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}

              {currentStep >= 3 && (
                <div
                  className={`absolute inset-0 rounded-3xl p-6 bg-white shadow-lg flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${
                    currentStep >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                  <p className="text-gray-600 mb-6">Start monitoring and caring for your loved ones with SafeTrail.</p>
                  <Button className="w-full py-6 rounded-xl text-lg" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-white" : "bg-white/30"
                  }`}
                  style={{ width: currentStep === step ? "24px" : "8px" }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

