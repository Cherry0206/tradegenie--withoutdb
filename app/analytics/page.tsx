"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart3, TrendingUp, TrendingDown, Globe, DollarSign, ArrowLeft, Download, RefreshCw, Target, FileText, Users, Eye, Zap, Clock } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MarketData {
  country: string
  product: string
  marketSize: string
  growth: number
  competition: "Low" | "Medium" | "High"
  opportunity: number
  trends: string[]
  keyPlayers: string[]
  regulations: string[]
  marketEntry: string
  riskLevel: "Low" | "Medium" | "High"
  timeToMarket: string
  investmentRequired: string
  profitMargin: string
  marketShare: string
  customerSegments: string[]
  distributionChannels: string[]
  seasonality: string
  culturalFactors: string[]
  lastUpdated?: string
  dataSource?: string
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [timeframe, setTimeframe] = useState("12m")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null)
  const [showDetailedReport, setShowDetailedReport] = useState(false)
  const [useRealTimeData, setUseRealTimeData] = useState(true)
  const [statistics, setStatistics] = useState({
    totalMarketSize: 365700000000,
    activeMarkets: 67,
    avgGrowthRate: 9.8,
    highOpportunityMarkets: 31
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
      loadMarketData()
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const loadMarketData = async () => {
    setIsLoading(true)

    try {
      // Use real-time SAP HANA data
      const endpoint = useRealTimeData ? '/api/market-intelligence/real-time' : '/api/market-intelligence'
      const params = new URLSearchParams({
        region: selectedRegion,
        product: selectedProduct,
        timeframe: timeframe
      })

      const response = await fetch(`${endpoint}?${params}`)
      const result = await response.json()

      if (result.success) {
        setMarketData(result.data.markets || [])
        if (result.data.statistics) {
          setStatistics(result.data.statistics)
        }
      } else {
        console.error('Market intelligence failed:', result.message)
        // Fallback to mock data
        await loadMockData()
      }
    } catch (error) {
      console.error('Market intelligence error:', error)
      // Fallback to mock data
      await loadMockData()
    }

    setIsLoading(false)
  }

  const loadMockData = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockData: MarketData[] = [
      {
        country: "Germany",
        product: "Electronics",
        marketSize: "$45.2B",
        growth: 8.5,
        competition: "High",
        opportunity: 78,
        trends: ["IoT Integration", "Sustainable Tech", "5G Adoption"],
        keyPlayers: ["Siemens", "Bosch", "SAP"],
        regulations: ["CE Marking", "GDPR", "RoHS Directive"],
        marketEntry: "Direct Sales & Partnerships",
        riskLevel: "Low",
        timeToMarket: "6-9 months",
        investmentRequired: "$500K - $1M",
        profitMargin: "15-25%",
        marketShare: "Available 12%",
        customerSegments: ["B2B Manufacturing", "Consumer Electronics", "Automotive"],
        distributionChannels: ["Online Platforms", "Retail Chains", "B2B Direct"],
        seasonality: "Q4 peak for consumer electronics",
        culturalFactors: ["Quality-focused", "Environmental consciousness", "Technical precision"],
        lastUpdated: new Date().toISOString(),
        dataSource: "Mock Data - Fallback"
      },
      // Add more mock data as needed...
    ]

    setMarketData(mockData)
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return "text-green-600"
    if (growth > 5) return "text-blue-600"
    return "text-yellow-600"
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getOpportunityColor = (opportunity: number) => {
    if (opportunity > 80) return "text-green-600"
    if (opportunity > 60) return "text-blue-600"
    return "text-yellow-600"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const viewDetailedReport = (market: MarketData) => {
    setSelectedMarket(market)
    setShowDetailedReport(true)
  }

  const findPartners = () => {
    router.push("/partners")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-purple-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                Market Analytics
              </h1>
              {useRealTimeData && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseRealTimeData(!useRealTimeData)}
              className={useRealTimeData ? "bg-green-50 border-green-200" : "bg-gray-50"}
            >
              <Zap className="w-4 h-4 mr-2" />
              {useRealTimeData ? "Real-time ON" : "Real-time OFF"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadMarketData}
              disabled={isLoading}
              className="bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Filters */}
        <Card className="border-purple-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Market Intelligence Dashboard
            </CardTitle>
            <CardDescription>
              {useRealTimeData ? "Real-time trade data powered by SAP HANA Cloud" : "Historical trade data"} across 200+ countries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                    <SelectItem value="latin-america">Latin America</SelectItem>
                    <SelectItem value="middle-east">Middle East</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Product Category</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="food-beverages">Food & Beverages</SelectItem>
                    <SelectItem value="machinery">Machinery</SelectItem>
                    <SelectItem value="chemicals">Chemicals</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="financial-services">Financial Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Timeframe</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="12m">Last 12 Months</SelectItem>
                    <SelectItem value="24m">Last 24 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={loadMarketData}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {useRealTimeData ? "Real-time Analysis" : "Analyze"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Market Size</p>
                  <p className="text-2xl font-bold text-gray-800">${(statistics.totalMarketSize / 1000000000).toFixed(1)}B</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Markets</p>
                  <p className="text-2xl font-bold text-gray-800">{statistics.activeMarkets}</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <Globe className="w-3 h-3 mr-1" />
                    Countries
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Growth Rate</p>
                  <p className="text-2xl font-bold text-gray-800">{statistics.avgGrowthRate}%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    YoY Growth
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Opportunity</p>
                  <p className="text-2xl font-bold text-gray-800">{statistics.highOpportunityMarkets}</p>
                  <p className="text-sm text-gold-600 flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    Markets
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gold-50">
                  <Target className="w-6 h-6 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketData.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-purple-100 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      {market.country} - {market.product}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getOpportunityColor(market.opportunity)}>
                        {market.opportunity}% Opportunity
                      </Badge>
                      {market.dataSource && (
                        <Badge variant="outline" className={market.dataSource.includes("Real-time") ? "text-green-600" : "text-orange-600"}>
                          {market.dataSource.includes("Real-time") ? (
                            <Zap className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {market.dataSource.includes("Real-time") ? "Live" : "Cache"}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {market.lastUpdated && (
                    <CardDescription>
                      Last updated: {new Date(market.lastUpdated).toLocaleString()}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Market Size</p>
                      <p className="text-lg font-bold text-blue-600">{market.marketSize}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Growth Rate</p>
                      <p
                        className={`text-lg font-bold ${getGrowthColor(market.growth)} flex items-center justify-center`}
                      >
                        {market.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {market.growth}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Competition</p>
                      <p className={`text-lg font-bold ${getCompetitionColor(market.competition)}`}>
                        {market.competition}
                      </p>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Risk Level:</p>
                      <p className={`font-semibold ${getRiskColor(market.riskLevel)}`}>{market.riskLevel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time to Market:</p>
                      <p className="font-semibold text-gray-800">{market.timeToMarket}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Investment:</p>
                      <p className="font-semibold text-gray-800">{market.investmentRequired}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Profit Margin:</p>
                      <p className="font-semibold text-green-600">{market.profitMargin}</p>
                    </div>
                  </div>

                  {/* Market Trends */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Trends:</p>
                    <div className="flex flex-wrap gap-2">
                      {market.trends.map((trend, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {trend}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Players */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Players:</p>
                    <div className="flex flex-wrap gap-2">
                      {market.keyPlayers.map((player, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {player}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => viewDetailedReport(market)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detailed Report
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                      onClick={findPartners}
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Find Partners
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {marketData.length === 0 && !isLoading && (
          <Card className="border-purple-100 py-12">
            <CardContent className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Market Data Available</h3>
              <p className="text-gray-500">
                {useRealTimeData ? "Real-time data connection failed. " : ""}
                Adjust your filters and try again
              </p>
              {useRealTimeData && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setUseRealTimeData(false)}
                >
                  Switch to Historical Data
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Report Dialog */}
      <Dialog open={showDetailedReport} onOpenChange={setShowDetailedReport}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMarket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-purple-600" />
                  Market Analysis Report: {selectedMarket.country} - {selectedMarket.product}
                </DialogTitle>
                <DialogDescription>
                  Comprehensive market intelligence and entry strategy
                  {selectedMarket.dataSource && (
                    <Badge variant="outline" className="ml-2">
                      {selectedMarket.dataSource}
                    </Badge>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Market Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Size:</span>
                        <span className="font-semibold">{selectedMarket.marketSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth Rate:</span>
                        <span className={`font-semibold ${getGrowthColor(selectedMarket.growth)}`}>
                          {selectedMarket.growth}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Competition:</span>
                        <span className={`font-semibold ${getCompetitionColor(selectedMarket.competition)}`}>
                          {selectedMarket.competition}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Share Available:</span>
                        <span className="font-semibold text-green-600">{selectedMarket.marketShare}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Entry Strategy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Entry:</span>
                        <span className="font-semibold">{selectedMarket.marketEntry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className={`font-semibold ${getRiskColor(selectedMarket.riskLevel)}`}>
                          {selectedMarket.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time to Market:</span>
                        <span className="font-semibold">{selectedMarket.timeToMarket}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment Required:</span>
                        <span className="font-semibold text-blue-600">{selectedMarket.investmentRequired}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Customer Segments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedMarket.customerSegments.map((segment, i) => (
                        <Badge key={i} variant="secondary">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Distribution Channels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedMarket.distributionChannels.map((channel, i) => (
                        <Badge key={i} variant="outline">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Market Intelligence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedMarket.trends.map((trend, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{trend}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Regulations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedMarket.regulations.map((regulation, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{regulation}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cultural Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cultural Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedMarket.culturalFactors.map((factor, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Seasonality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{selectedMarket.seasonality}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Profit Potential</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedMarket.profitMargin}</p>
                        <p className="text-sm text-gray-600">Expected Profit Margin</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-6 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                    onClick={findPartners}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Find Local Partners
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
