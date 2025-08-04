"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  FileText,
  Users,
  Shield,
  Sparkles,
  TrendingUp,
  Globe,
  Clock,
  Settings,
  LogOut,
  Scale,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  company: string
  country: string
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
  })

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setEditFormData({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        company: parsedUser.company || "",
        country: parsedUser.country || "",
      })
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        // Call logout API
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  const handleEditProfile = () => {
    setEditFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      company: user?.company || "",
      country: user?.country || "",
    })
    setShowEditProfile(true)
  }

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Update user data in localStorage and state
        const updatedUser = data.user
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setShowEditProfile(false)
      } else {
        console.error("Failed to update profile:", data.message)
        alert("Failed to update profile. Please try again.")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Network error. Please try again.")
    }
  }

  const handleProfileSettings = () => {
    setShowUserMenu(false)
    setShowProfileSettings(true)
  }

  const handleAccountSettings = () => {
    setShowUserMenu(false)
    setShowAccountSettings(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { title: "Documents Generated", value: "24", change: "+12%", icon: FileText, color: "text-blue-600" },
    { title: "Chat Conversations", value: "18", change: "+8%", icon: MessageSquare, color: "text-green-600" },
    { title: "Partners Found", value: "7", change: "+3%", icon: Users, color: "text-purple-600" },
    { title: "Risk Reports", value: "5", change: "+2%", icon: Shield, color: "text-orange-600" },
  ]

  const quickActions = [
    {
      title: "Start AI Chat",
      description: "Get instant trade assistance",
      icon: MessageSquare,
      href: "/chat",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Generate Document",
      description: "Create trade documents",
      icon: FileText,
      href: "/documents",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Find Partners",
      description: "Discover business partners",
      icon: Users,
      href: "/partners",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Risk Analysis",
      description: "Analyze market risks",
      icon: Shield,
      href: "/risk-analysis",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Compliance Check",
      description: "Verify document compliance",
      icon: Scale,
      href: "/compliance",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Market Analytics",
      description: "View trade insights",
      icon: BarChart3,
      href: "/analytics",
      color: "from-teal-500 to-teal-600",
    },
  ]

  const recentActivity = [
    { type: "document", title: "Commercial Invoice generated for Germany export", time: "2 hours ago" },
    { type: "chat", title: "AI consultation about EU regulations", time: "4 hours ago" },
    { type: "partner", title: "New partner match found in Netherlands", time: "1 day ago" },
    { type: "risk", title: "Risk report generated for Brazil market", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
              TradeGenie
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-purple-600 font-medium">
              Dashboard
            </Link>
            <Link href="/chat" className="text-gray-600 hover:text-purple-600 transition-colors">
              AI Chat
            </Link>
            <Link href="/documents" className="text-gray-600 hover:text-purple-600 transition-colors">
              Documents
            </Link>
            <Link href="/partners" className="text-gray-600 hover:text-purple-600 transition-colors">
              Partners
            </Link>
            <Link href="/risk-analysis" className="text-gray-600 hover:text-purple-600 transition-colors">
              Risk Analysis
            </Link>
            <Link href="/compliance" className="text-gray-600 hover:text-purple-600 transition-colors">
              Compliance
            </Link>
            <Link href="/analytics" className="text-gray-600 hover:text-purple-600 transition-colors">
              Analytics
            </Link>
          </nav>

          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 p-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">{user.firstName}</span>
            </Button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <Badge className="mt-1 text-xs" variant="secondary">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>

                <div className="py-2">
                  <button
                    onClick={handleProfileSettings}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-3" />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleAccountSettings}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.firstName}! ✨</h1>
          <p className="text-gray-600">Ready to expand your global trade operations? Let's make some magic happen.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-purple-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="border-purple-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & User Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest trade operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Profile Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback className="text-lg">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <Badge variant="secondary" className="text-xs">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>

                  {user.company && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Company:</span>
                      <span className="text-sm font-medium text-gray-800">{user.company}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Country:</span>
                    <span className="text-sm font-medium text-gray-800 flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {user.country}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member since:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleEditProfile}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editFormData.firstName}
                    onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={editFormData.company}
                    onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editFormData.country}
                    onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button onClick={handleSaveProfile} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  Save Changes
                </Button>
                <Button onClick={() => setShowEditProfile(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Settings Modal */}
        {showProfileSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Marketing Updates</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Trade Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Weekly Reports</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Save Settings</Button>
                <Button onClick={() => setShowProfileSettings(false)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Modal */}
        {showAccountSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Enable 2FA</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Account Actions</h4>
                  <Button
                    variant="outline"
                    className="w-full mb-2 text-orange-600 border-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Export Account Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Update Account</Button>
                <Button onClick={() => setShowAccountSettings(false)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
