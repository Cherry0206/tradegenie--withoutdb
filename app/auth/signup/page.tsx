"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, User, Building, Users, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    company: "",
    country: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const router = useRouter()

  const roles = [
    {
      value: "entrepreneur",
      label: "Entrepreneur",
      icon: User,
      description: "Individual business owner or startup founder",
    },
    {
      value: "partner",
      label: "Business Partner",
      icon: Building,
      description: "Established company seeking partnerships",
    },
    {
      value: "expert",
      label: "Trade Expert",
      icon: Users,
      description: "Consultant or advisor in international trade",
    },
  ]

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.role) newErrors.role = "Please select a role"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    addDebugInfo("Form submission started")

    if (!validateForm()) {
      addDebugInfo("Form validation failed")
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const requestBody = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        company: formData.company.trim(),
        country: formData.country.trim(),
      }

      addDebugInfo(`Making request to /api/auth/register`)
      addDebugInfo(`Request body: ${JSON.stringify({ ...requestBody, password: "[HIDDEN]" })}`)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      addDebugInfo(`Response status: ${response.status}`)
      addDebugInfo(`Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`)

      // Get response text first
      const responseText = await response.text()
      addDebugInfo(`Raw response: ${responseText.substring(0, 200)}...`)

      // Try to parse as JSON
      let data
      try {
        data = JSON.parse(responseText)
        addDebugInfo("Successfully parsed JSON response")
      } catch (parseError) {
        addDebugInfo(`JSON parse error: ${parseError}`)
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`)
      }

      if (response.ok && data.success) {
        addDebugInfo("Registration successful!")
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Small delay to show success
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        addDebugInfo(`Registration failed: ${data.message}`)
        setErrors({ submit: data.message || "Registration failed" })
      }
    } catch (error) {
      addDebugInfo(`Error caught: ${error}`)
      console.error("Registration error:", error)

      let errorMessage = "Registration failed. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }

      setErrors({ submit: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-purple-100 shadow-xl">
              <CardHeader className="text-center pb-8">
                <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                    TradeGenie
                  </span>
                </div>

                <CardTitle className="text-3xl font-bold text-gray-800">Create Your Account</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Join thousands of businesses transforming their global trade
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Choose Your Role</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {roles.map((role) => (
                        <motion.div key={role.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Card
                            className={`cursor-pointer transition-all duration-200 ${
                              formData.role === role.value
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                            onClick={() => handleInputChange("role", role.value)}
                          >
                            <CardContent className="p-4 text-center">
                              <role.icon
                                className={`w-8 h-8 mx-auto mb-2 ${
                                  formData.role === role.value ? "text-purple-600" : "text-gray-400"
                                }`}
                              />
                              <h3 className="font-semibold text-sm">{role.label}</h3>
                              <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className={errors.password ? "border-red-500" : ""}
                          placeholder="Create a password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={errors.confirmPassword ? "border-red-500" : ""}
                          placeholder="Confirm your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {/* Company and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className={errors.country ? "border-red-500" : ""}
                        placeholder="Enter your country"
                      />
                      {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {errors.submit && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.submit}</span>
                    </div>
                  )}
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-purple-600 hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Panel & Demo Info */}
          <div className="space-y-6">
            {/* Demo Account Info */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Demo Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-3">You can also sign in with:</p>
                <div className="text-sm text-blue-800 font-mono bg-white p-3 rounded border">
                  <div>Email: demo@tradegenie.com</div>
                  <div>Password: password123</div>
                </div>
                <Link href="/auth/signin">
                  <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">Use Demo Account</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Debug Info */}
            {debugInfo.length > 0 && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-sm">Debug Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-600 font-mono space-y-1 max-h-60 overflow-y-auto">
                    {debugInfo.map((info, index) => (
                      <div key={index} className="break-all">
                        {info}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
