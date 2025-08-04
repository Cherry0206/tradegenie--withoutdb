"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Package,
  Ship,
  Globe,
  Users,
  FileText,
  Shield,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  PieChartIcon,
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

export default function ReportsPage() {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  // Sample data - in real app, this would come from API
  const profitLossData = [
    { month: "Jan", profit: 45000, loss: 12000, net: 33000 },
    { month: "Feb", profit: 52000, loss: 15000, net: 37000 },
    { month: "Mar", profit: 48000, loss: 18000, net: 30000 },
    { month: "Apr", profit: 61000, loss: 14000, net: 47000 },
    { month: "May", profit: 55000, loss: 16000, net: 39000 },
    { month: "Jun", profit: 67000, loss: 13000, net: 54000 },
  ]

  const tradeVolumeData = [
    { month: "Jan", imports: 120000, exports: 95000 },
    { month: "Feb", imports: 135000, exports: 110000 },
    { month: "Mar", imports: 128000, exports: 105000 },
    { month: "Apr", imports: 145000, exports: 125000 },
    { month: "May", imports: 138000, exports: 118000 },
    { month: "Jun", imports: 152000, exports: 135000 },
  ]

  const topProductsData = [
    { name: "Textiles", value: 35, color: "#8B5CF6" },
    { name: "Spices", value: 25, color: "#10B981" },
    { name: "Electronics", value: 20, color: "#F59E0B" },
    { name: "Fruits", value: 12, color: "#EF4444" },
    { name: "Others", value: 8, color: "#6B7280" },
  ]

  const topCountriesData = [
    { country: "United States", volume: 45000, growth: 12.5 },
    { country: "Germany", volume: 38000, growth: 8.3 },
    { country: "United Kingdom", volume: 32000, growth: 15.2 },
    { country: "France", volume: 28000, growth: -2.1 },
    { country: "Japan", volume: 25000, growth: 6.7 },
  ]

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$324,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Net Profit",
      value: "$240,000",
      change: "+8.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Trade Volume",
      value: "1,287 tons",
      change: "+15.2%",
      trend: "up",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Active Partners",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Documents Generated",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Risk Score",
      value: "Low",
      change: "-5%",
      trend: "down",
      icon: Shield,
      color: "text-green-600",
    },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      type: "Export",
      product: "Cotton Fabric",
      country: "Germany",
      amount: "$12,500",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "TXN002",
      type: "Import",
      product: "Electronics",
      country: "Japan",
      amount: "$8,750",
      status: "In Transit",
      date: "2024-01-14",
    },
    {
      id: "TXN003",
      type: "Export",
      product: "Spices",
      country: "United States",
      amount: "$15,200",
      status: "Completed",
      date: "2024-01-13",
    },
    {
      id: "TXN004",
      type: "Import",
      product: "Machinery",
      country: "Germany",
      amount: "$22,800",
      status: "Processing",
      date: "2024-01-12",
    },
  ]

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading your reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                TradeGenie
              </span>
            </Link>
            <Badge variant="secondary" className="ml-4">
              Business Analytics
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Analytics Dashboard 📊</h1>
          <p className="text-gray-600">
            Comprehensive insights into your trade performance, growth metrics, and business analytics.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-purple-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</p>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="trade">Trade Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profit & Loss Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Profit & Loss Trend
                    </CardTitle>
                    <CardDescription>Monthly profit and loss analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        profit: { label: "Profit", color: "hsl(var(--chart-1))" },
                        loss: { label: "Loss", color: "hsl(var(--chart-2))" },
                        net: { label: "Net", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={profitLossData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            stackId="1"
                            stroke="var(--color-profit)"
                            fill="var(--color-profit)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="loss"
                            stackId="2"
                            stroke="var(--color-loss)"
                            fill="var(--color-loss)"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="net"
                            stackId="3"
                            stroke="var(--color-net)"
                            fill="var(--color-net)"
                            fillOpacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Trade Volume Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Ship className="w-5 h-5 mr-2 text-blue-600" />
                      Import vs Export Volume
                    </CardTitle>
                    <CardDescription>Monthly trade volume comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        imports: { label: "Imports", color: "hsl(var(--chart-1))" },
                        exports: { label: "Exports", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={tradeVolumeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="imports" fill="var(--color-imports)" />
                          <Bar dataKey="exports" fill="var(--color-exports)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Products Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" />
                      Top Products
                    </CardTitle>
                    <CardDescription>Product distribution by volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: { label: "Percentage", color: "hsl(var(--chart-1))" },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={topProductsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {topProductsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="mt-4 space-y-2">
                      {topProductsData.map((product, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }}></div>
                            <span>{product.name}</span>
                          </div>
                          <span className="font-medium">{product.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Top Countries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2"
              >
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-600" />
                      Top Trading Partners
                    </CardTitle>
                    <CardDescription>Countries by trade volume and growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topCountriesData.map((country, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-gold-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{country.country}</p>
                              <p className="text-sm text-gray-600">${country.volume.toLocaleString()} volume</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`flex items-center space-x-1 ${
                                country.growth >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {country.growth >= 0 ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              <span className="font-medium">{Math.abs(country.growth)}%</span>
                            </div>
                            <Progress value={Math.abs(country.growth)} className="w-20 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Detailed financial analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gross Revenue</span>
                      <span className="font-bold text-green-600">$324,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Operating Costs</span>
                      <span className="font-bold text-red-600">$84,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Net Profit</span>
                      <span className="font-bold text-blue-600">$240,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Margin</span>
                      <span className="font-bold text-purple-600">73.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>Monthly cash flow trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      cashflow: { label: "Cash Flow", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={profitLossData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="net"
                          stroke="var(--color-cashflow)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-cashflow)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trade" className="space-y-6">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest import and export activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "Export" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {transaction.type === "Export" ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{transaction.product}</p>
                          <p className="text-sm text-gray-600">
                            {transaction.type} to {transaction.country}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{transaction.amount}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              transaction.status === "Completed"
                                ? "default"
                                : transaction.status === "In Transit"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Order Fulfillment Rate</span>
                        <span className="text-sm font-bold">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Customer Satisfaction</span>
                        <span className="text-sm font-bold">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">On-time Delivery</span>
                        <span className="text-sm font-bold">91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Quality Score</span>
                        <span className="text-sm font-bold">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle>Growth Targets</CardTitle>
                  <CardDescription>Progress towards annual goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Revenue Target</span>
                        <span className="text-sm font-bold">$500K</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">$324.5K achieved (65%)</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">New Partners</span>
                        <span className="text-sm font-bold">60</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">47 partners acquired (78%)</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Market Expansion</span>
                        <span className="text-sm font-bold">12 countries</span>
                      </div>
                      <Progress value={42} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">5 new markets entered (42%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
