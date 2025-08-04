"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  DollarSign,
  ArrowLeft,
  Download,
  RefreshCw,
  Target,
  FileText,
  Users,
  Eye,
} from "lucide-react"
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
      },
      {
        country: "Japan",
        product: "Automotive",
        marketSize: "$78.9B",
        growth: 5.2,
        competition: "High",
        opportunity: 65,
        trends: ["Electric Vehicles", "Autonomous Driving", "Hybrid Technology"],
        keyPlayers: ["Toyota", "Honda", "Nissan"],
        regulations: ["JIS Standards", "Type Approval", "Safety Regulations"],
        marketEntry: "Joint Ventures Required",
        riskLevel: "Medium",
        timeToMarket: "12-18 months",
        investmentRequired: "$2M - $5M",
        profitMargin: "8-15%",
        marketShare: "Available 5%",
        customerSegments: ["OEM Manufacturers", "Aftermarket", "Fleet Operators"],
        distributionChannels: ["Authorized Dealers", "OEM Partnerships", "Specialty Stores"],
        seasonality: "Steady year-round demand",
        culturalFactors: ["Innovation-driven", "Long-term relationships", "Quality over price"],
      },
      {
        country: "Brazil",
        product: "Food & Beverages",
        marketSize: "$32.1B",
        growth: 12.3,
        competition: "Medium",
        opportunity: 85,
        trends: ["Organic Products", "Health Foods", "Premium Coffee"],
        keyPlayers: ["JBS", "BRF", "Ambev"],
        regulations: ["ANVISA", "MAPA", "Mercosur Standards"],
        marketEntry: "Local Partnerships Recommended",
        riskLevel: "Medium",
        timeToMarket: "4-8 months",
        investmentRequired: "$200K - $800K",
        profitMargin: "20-35%",
        marketShare: "Available 18%",
        customerSegments: ["Retail Chains", "Restaurants", "Export Markets"],
        distributionChannels: ["Supermarket Chains", "Food Service", "E-commerce"],
        seasonality: "Holiday seasons drive 40% of sales",
        culturalFactors: ["Family-oriented consumption", "Price sensitivity", "Local flavor preferences"],
      },
      {
        country: "India",
        product: "Textiles",
        marketSize: "$28.7B",
        growth: 15.8,
        competition: "Medium",
        opportunity: 92,
        trends: ["Sustainable Fashion", "Technical Textiles", "Digital Printing"],
        keyPlayers: ["Reliance", "Aditya Birla", "Welspun"],
        regulations: ["BIS Standards", "Export Promotion", "GST Compliance"],
        marketEntry: "Manufacturing Partnerships",
        riskLevel: "Low",
        timeToMarket: "3-6 months",
        investmentRequired: "$100K - $500K",
        profitMargin: "25-40%",
        marketShare: "Available 22%",
        customerSegments: ["Fashion Brands", "Home Textiles", "Industrial Applications"],
        distributionChannels: ["Export Houses", "Direct B2B", "Online Marketplaces"],
        seasonality: "Festival seasons boost demand by 30%",
        culturalFactors: ["Cost-conscious", "Quality appreciation", "Traditional craftsmanship value"],
      },
      {
        country: "United Kingdom",
        product: "Financial Services",
        marketSize: "$67.4B",
        growth: 6.8,
        competition: "High",
        opportunity: 71,
        trends: ["Fintech Innovation", "Digital Banking", "Cryptocurrency"],
        keyPlayers: ["HSBC", "Barclays", "Lloyds"],
        regulations: ["FCA Compliance", "GDPR", "PCI DSS"],
        marketEntry: "Regulatory Approval Required",
        riskLevel: "Medium",
        timeToMarket: "9-15 months",
        investmentRequired: "$1M - $3M",
        profitMargin: "12-20%",
        marketShare: "Available 8%",
        customerSegments: ["SMEs", "Retail Banking", "Investment Services"],
        distributionChannels: ["Digital Platforms", "Branch Networks", "Partner Banks"],
        seasonality: "Q1 and Q4 peak activity",
        culturalFactors: ["Regulatory compliance focus", "Innovation adoption", "Trust-based relationships"],
      },
      {
        country: "South Korea",
        product: "Technology",
        marketSize: "$41.8B",
        growth: 11.2,
        competition: "High",
        opportunity: 76,
        trends: ["5G Technology", "AI Integration", "Smart Cities"],
        keyPlayers: ["Samsung", "LG", "SK Hynix"],
        regulations: ["K-Mark Certification", "Personal Information Protection Act", "Telecommunications Business Act"],
        marketEntry: "Technology Partnerships",
        riskLevel: "Medium",
        timeToMarket: "8-12 months",
        investmentRequired: "$800K - $2M",
        profitMargin: "18-28%",
        marketShare: "Available 14%",
        customerSegments: ["Enterprise", "Government", "Consumer Electronics"],
        distributionChannels: ["System Integrators", "Direct Sales", "Online Platforms"],
        seasonality: "Consistent demand with Q4 uptick",
        culturalFactors: ["Technology leadership", "Brand loyalty", "Innovation premium"],
      },
      {
        country: "France",
        product: "Luxury Goods",
        marketSize: "$23.9B",
        growth: 7.4,
        competition: "High",
        opportunity: 68,
        trends: ["Sustainable Luxury", "Digital Experience", "Personalization"],
        keyPlayers: ["LVMH", "Kering", "Hermès"],
        regulations: ["EU Product Safety", "Luxury Tax", "Import Duties"],
        marketEntry: "Brand Positioning Critical",
        riskLevel: "Medium",
        timeToMarket: "12-24 months",
        investmentRequired: "$1.5M - $4M",
        profitMargin: "30-50%",
        marketShare: "Available 6%",
        customerSegments: ["High Net Worth", "Millennials", "International Tourists"],
        distributionChannels: ["Flagship Stores", "Department Stores", "E-commerce"],
        seasonality: "Holiday and summer seasons peak",
        culturalFactors: ["Heritage appreciation", "Craftsmanship value", "Exclusivity preference"],
      },
      {
        country: "Australia",
        product: "Mining Equipment",
        marketSize: "$19.6B",
        growth: 9.1,
        competition: "Medium",
        opportunity: 83,
        trends: ["Automation", "Environmental Compliance", "Remote Operations"],
        keyPlayers: ["BHP", "Rio Tinto", "Fortescue"],
        regulations: ["Australian Standards", "Environmental Protection", "Safety Compliance"],
        marketEntry: "Local Presence Required",
        riskLevel: "Low",
        timeToMarket: "6-10 months",
        investmentRequired: "$600K - $1.5M",
        profitMargin: "22-35%",
        marketShare: "Available 16%",
        customerSegments: ["Mining Companies", "Equipment Rental", "Government Projects"],
        distributionChannels: ["Direct Sales", "Authorized Dealers", "Service Networks"],
        seasonality: "Cyclical with commodity prices",
        culturalFactors: ["Safety first culture", "Environmental responsibility", "Long-term partnerships"],
      },
      {
        country: "Canada",
        product: "Healthcare Technology",
        marketSize: "$15.3B",
        growth: 13.7,
        competition: "Medium",
        opportunity: 88,
        trends: ["Telemedicine", "AI Diagnostics", "Digital Health Records"],
        keyPlayers: ["Shoppers Drug Mart", "Telus Health", "Well Health"],
        regulations: ["Health Canada Approval", "PIPEDA", "Provincial Health Acts"],
        marketEntry: "Healthcare Partnerships",
        riskLevel: "Low",
        timeToMarket: "8-14 months",
        investmentRequired: "$400K - $1.2M",
        profitMargin: "20-30%",
        marketShare: "Available 20%",
        customerSegments: ["Hospitals", "Clinics", "Government Health"],
        distributionChannels: ["Healthcare Networks", "Government Procurement", "Private Clinics"],
        seasonality: "Steady with budget cycle influence",
        culturalFactors: ["Universal healthcare system", "Privacy concerns", "Innovation adoption"],
      },
      {
        country: "Singapore",
        product: "Logistics Services",
        marketSize: "$12.8B",
        growth: 10.5,
        competition: "High",
        opportunity: 79,
        trends: ["Digital Logistics", "Green Supply Chain", "Last-Mile Delivery"],
        keyPlayers: ["DHL", "FedEx", "Singapore Post"],
        regulations: ["ACRA Registration", "Customs Compliance", "Environmental Standards"],
        marketEntry: "Strategic Location Advantage",
        riskLevel: "Low",
        timeToMarket: "4-7 months",
        investmentRequired: "$300K - $800K",
        profitMargin: "15-25%",
        marketShare: "Available 12%",
        customerSegments: ["E-commerce", "Manufacturing", "International Trade"],
        distributionChannels: ["B2B Direct", "Digital Platforms", "Partner Networks"],
        seasonality: "Peak during shopping seasons",
        culturalFactors: ["Efficiency focus", "Technology adoption", "Regional hub mentality"],
      },
    ]

    setMarketData(mockData)
    setIsLoading(false)
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
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
            <CardDescription>Real-time trade data and insights across 200+ countries</CardDescription>
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
                      Analyze
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
                  <p className="text-2xl font-bold text-gray-800">$365.7B</p>
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
                  <p className="text-2xl font-bold text-gray-800">67</p>
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
                  <p className="text-2xl font-bold text-gray-800">9.8%</p>
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
                  <p className="text-2xl font-bold text-gray-800">31</p>
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
                    <Badge variant="outline" className={getOpportunityColor(market.opportunity)}>
                      {market.opportunity}% Opportunity
                    </Badge>
                  </div>
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
              <p className="text-gray-500">Adjust your filters and try again</p>
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
                <DialogDescription>Comprehensive market intelligence and entry strategy</DialogDescription>
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
