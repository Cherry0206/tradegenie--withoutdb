"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  ArrowLeft,
  Download,
  Globe,
  DollarSign,
  Scale,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface RiskAnalysis {
  country: string
  product: string
  overallRisk: number
  politicalRisk: number
  economicRisk: number
  complianceRisk: number
  marketRisk: number
  tariffRate: string
  marketSize: string
  recommendations: string[]
  warnings: string[]
  opportunities: string[]
}

export default function RiskAnalysisPage() {
  const [user, setUser] = useState<any>(null)
  const [analysisForm, setAnalysisForm] = useState({
    country: "",
    product: "",
    exportValue: "",
    timeline: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null)
  const [recentAnalyses, setRecentAnalyses] = useState<RiskAnalysis[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const analyzeRisk = async () => {
    if (!analysisForm.country || !analysisForm.product) return

    setIsAnalyzing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockAnalysis: RiskAnalysis = {
      country: analysisForm.country,
      product: analysisForm.product,
      overallRisk: Math.floor(Math.random() * 40) + 30, // 30-70%
      politicalRisk: Math.floor(Math.random() * 50) + 25,
      economicRisk: Math.floor(Math.random() * 45) + 20,
      complianceRisk: Math.floor(Math.random() * 60) + 15,
      marketRisk: Math.floor(Math.random() * 55) + 20,
      tariffRate: `${Math.floor(Math.random() * 15) + 2}%`,
      marketSize: `$${Math.floor(Math.random() * 500) + 100}M`,
      recommendations: [
        "Consider trade credit insurance for political risk mitigation",
        "Establish local partnerships to navigate regulatory requirements",
        "Monitor currency fluctuations and consider hedging strategies",
        "Ensure compliance with latest import regulations",
      ],
      warnings: [
        "Recent changes in import duties may affect profitability",
        "Political tensions could impact trade relationships",
        "Currency volatility observed in the past 6 months",
      ],
      opportunities: [
        "Growing demand for your product category",
        "Government incentives for foreign investment",
        "Emerging middle class with increased purchasing power",
      ],
    }

    setAnalysis(mockAnalysis)
    setRecentAnalyses((prev) => [mockAnalysis, ...prev.slice(0, 4)])
    setIsAnalyzing(false)
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-green-600"
    if (risk < 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBgColor = (risk: number) => {
    if (risk < 30) return "bg-green-100"
    if (risk < 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return "Low Risk"
    if (risk < 60) return "Medium Risk"
    return "High Risk"
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-purple-600 animate-pulse mx-auto mb-4" />
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
              <Shield className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                Risk Intelligence
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Analysis Form */}
          <div className="lg:col-span-1">
            <Card className="border-purple-100 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  Analyze Market Risk
                </CardTitle>
                <CardDescription>Get comprehensive risk assessment for any country-product combination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="country">Target Country</Label>
                  <Input
                    id="country"
                    value={analysisForm.country}
                    onChange={(e) => setAnalysisForm((prev) => ({ ...prev, country: e.target.value }))}
                    placeholder="e.g., Brazil, Germany, Japan"
                  />
                </div>
                <div>
                  <Label htmlFor="product">Product Category</Label>
                  <Select
                    value={analysisForm.product}
                    onValueChange={(value) => setAnalysisForm((prev) => ({ ...prev, product: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Textiles">Textiles & Apparel</SelectItem>
                      <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                      <SelectItem value="Machinery">Machinery</SelectItem>
                      <SelectItem value="Chemicals">Chemicals</SelectItem>
                      <SelectItem value="Automotive">Automotive</SelectItem>
                      <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="exportValue">Export Value (USD)</Label>
                  <Input
                    id="exportValue"
                    type="number"
                    value={analysisForm.exportValue}
                    onChange={(e) => setAnalysisForm((prev) => ({ ...prev, exportValue: e.target.value }))}
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select
                    value={analysisForm.timeline}
                    onValueChange={(value) => setAnalysisForm((prev) => ({ ...prev, timeline: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When do you plan to export?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                      <SelectItem value="short">Short term (3-6 months)</SelectItem>
                      <SelectItem value="medium">Medium term (6-12 months)</SelectItem>
                      <SelectItem value="long">Long term (1+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={analyzeRisk}
                  disabled={isAnalyzing || !analysisForm.country || !analysisForm.product}
                  className="w-full bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <Shield className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Risks...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Analyze Risk
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis Results */}
          <div className="lg:col-span-2">
            {analysis ? (
              <div className="space-y-6">
                {/* Overall Risk Score */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-purple-600" />
                        Risk Assessment: {analysis.country} - {analysis.product}
                      </CardTitle>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full ${getRiskBgColor(analysis.overallRisk)}`}
                      >
                        <span className={`text-2xl font-bold ${getRiskColor(analysis.overallRisk)}`}>
                          {analysis.overallRisk}%
                        </span>
                        <span className={`ml-2 font-semibold ${getRiskColor(analysis.overallRisk)}`}>
                          {getRiskLabel(analysis.overallRisk)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">Overall Risk Score</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold">Tariff Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{analysis.tariffRate}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-semibold">Market Size</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{analysis.marketSize}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Breakdown */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Risk Breakdown</CardTitle>
                    <CardDescription>Detailed analysis of different risk factors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Political Risk</span>
                        <span className={`font-semibold ${getRiskColor(analysis.politicalRisk)}`}>
                          {analysis.politicalRisk}%
                        </span>
                      </div>
                      <Progress value={analysis.politicalRisk} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Economic Risk</span>
                        <span className={`font-semibold ${getRiskColor(analysis.economicRisk)}`}>
                          {analysis.economicRisk}%
                        </span>
                      </div>
                      <Progress value={analysis.economicRisk} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Compliance Risk</span>
                        <span className={`font-semibold ${getRiskColor(analysis.complianceRisk)}`}>
                          {analysis.complianceRisk}%
                        </span>
                      </div>
                      <Progress value={analysis.complianceRisk} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Market Risk</span>
                        <span className={`font-semibold ${getRiskColor(analysis.marketRisk)}`}>
                          {analysis.marketRisk}%
                        </span>
                      </div>
                      <Progress value={analysis.marketRisk} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations & Warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.opportunities.map((opportunity, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-green-800 text-sm">{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-red-800 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Warnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-red-800 text-sm">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center">
                      <Scale className="w-5 h-5 mr-2" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-blue-800">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-purple-100 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Risk Analysis</h3>
                  <p className="text-gray-500">Fill in the form to get comprehensive risk assessment</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Analyses */}
        {recentAnalyses.length > 0 && (
          <div className="mt-12">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Risk Analyses
                </CardTitle>
                <CardDescription>Your previously generated risk assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRiskBgColor(analysis.overallRisk)}`}
                        >
                          <Shield className={`w-5 h-5 ${getRiskColor(analysis.overallRisk)}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {analysis.country} - {analysis.product}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Overall Risk: {analysis.overallRisk}% ({getRiskLabel(analysis.overallRisk)})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getRiskColor(analysis.overallRisk)}>
                          {getRiskLabel(analysis.overallRisk)}
                        </Badge>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
