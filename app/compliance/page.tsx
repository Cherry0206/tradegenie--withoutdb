"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ComplianceIssue {
  id: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  regulation: string
  suggestion: string
}

interface ComplianceReport {
  id: string
  fileName: string
  uploadedAt: string
  status: "processing" | "completed" | "failed"
  overallScore: number
  issues: ComplianceIssue[]
  country: string
  documentType: string
}

export default function CompliancePage() {
  const [user, setUser] = useState<any>(null)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedDocType, setSelectedDocType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [reports, setReports] = useState<ComplianceReport[]>([])
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !selectedCountry || !selectedDocType) return

    setIsUploading(true)
    setIsAnalyzing(true)

    const file = files[0]

    // Simulate file upload and analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockReport: ComplianceReport = {
      id: `report_${Date.now()}`,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      status: "completed",
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      country: selectedCountry,
      documentType: selectedDocType,
      issues: [
        {
          id: "1",
          severity: "high",
          title: "Missing Certificate of Origin",
          description: "The document lacks a proper certificate of origin which is required for customs clearance.",
          regulation: "EU Customs Code Article 59",
          suggestion: "Include a valid certificate of origin issued by an authorized chamber of commerce.",
        },
        {
          id: "2",
          severity: "medium",
          title: "Incomplete Product Description",
          description: "Product description should include more specific details about materials and composition.",
          regulation: "WTO Trade Facilitation Agreement",
          suggestion: "Add detailed product specifications including materials, dimensions, and intended use.",
        },
        {
          id: "3",
          severity: "low",
          title: "Date Format Inconsistency",
          description: "Date formats should be consistent throughout the document.",
          regulation: "ISO 8601 Standard",
          suggestion: "Use YYYY-MM-DD format for all dates in the document.",
        },
      ],
    }

    setReports((prev) => [mockReport, ...prev])
    setIsUploading(false)
    setIsAnalyzing(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-orange-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100"
      case "medium":
        return "bg-yellow-100"
      case "high":
        return "bg-orange-100"
      case "critical":
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return CheckCircle
      case "medium":
        return AlertTriangle
      case "high":
        return AlertTriangle
      case "critical":
        return XCircle
      default:
        return AlertTriangle
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-16 h-16 text-purple-600 animate-pulse mx-auto mb-4" />
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
              <Scale className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                Compliance Advisor
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="border-purple-100 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-purple-600" />
                  Document Upload
                </CardTitle>
                <CardDescription>Upload your trade documents for compliance analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="country">Target Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="docType">Document Type</Label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial_invoice">Commercial Invoice</SelectItem>
                      <SelectItem value="bill_of_lading">Bill of Lading</SelectItem>
                      <SelectItem value="certificate_origin">Certificate of Origin</SelectItem>
                      <SelectItem value="packing_list">Packing List</SelectItem>
                      <SelectItem value="insurance_certificate">Insurance Certificate</SelectItem>
                      <SelectItem value="export_license">Export License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your document here, or</p>
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={!selectedCountry || !selectedDocType}
                  >
                    Browse Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, DOCX (Max 10MB)</p>
                </div>

                {isAnalyzing && (
                  <div className="text-center py-4">
                    <RefreshCw className="w-6 h-6 text-purple-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Analyzing document for compliance...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {reports.length > 0 ? (
              <div className="space-y-6">
                {reports.map((report) => (
                  <Card key={report.id} className="border-purple-100">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-purple-600" />
                          {report.fileName}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {report.country} - {report.documentType}
                          </Badge>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Uploaded {new Date(report.uploadedAt).toLocaleDateString()} • Compliance Score:{" "}
                        {report.overallScore}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Compliance Score */}
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center px-6 py-3 rounded-full ${
                            report.overallScore >= 90
                              ? "bg-green-100"
                              : report.overallScore >= 70
                                ? "bg-yellow-100"
                                : "bg-red-100"
                          }`}
                        >
                          <span
                            className={`text-3xl font-bold ${
                              report.overallScore >= 90
                                ? "text-green-600"
                                : report.overallScore >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {report.overallScore}%
                          </span>
                          <span
                            className={`ml-2 font-semibold ${
                              report.overallScore >= 90
                                ? "text-green-600"
                                : report.overallScore >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {report.overallScore >= 90
                              ? "Excellent"
                              : report.overallScore >= 70
                                ? "Good"
                                : "Needs Improvement"}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">Overall Compliance Score</p>
                      </div>

                      {/* Issues List */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Compliance Issues ({report.issues.length})
                        </h3>
                        <div className="space-y-4">
                          {report.issues.map((issue) => {
                            const SeverityIcon = getSeverityIcon(issue.severity)
                            return (
                              <Card
                                key={issue.id}
                                className={`border-l-4 ${
                                  issue.severity === "critical"
                                    ? "border-l-red-500"
                                    : issue.severity === "high"
                                      ? "border-l-orange-500"
                                      : issue.severity === "medium"
                                        ? "border-l-yellow-500"
                                        : "border-l-green-500"
                                }`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-full ${getSeverityBg(issue.severity)}`}>
                                      <SeverityIcon className={`w-4 h-4 ${getSeverityColor(issue.severity)}`} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-800">{issue.title}</h4>
                                        <Badge
                                          variant="outline"
                                          className={`${getSeverityColor(issue.severity)} border-current`}
                                        >
                                          {issue.severity.toUpperCase()}
                                        </Badge>
                                      </div>
                                      <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                                      <div className="bg-gray-50 p-3 rounded-lg mb-2">
                                        <p className="text-xs text-gray-500 mb-1">Regulation:</p>
                                        <p className="text-sm font-medium text-gray-700">{issue.regulation}</p>
                                      </div>
                                      <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-xs text-blue-600 mb-1">Suggested Fix:</p>
                                        <p className="text-sm text-blue-800">{issue.suggestion}</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-4 border-t border-gray-200">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          View Original Document
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Re-upload Fixed Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-purple-100 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Documents Analyzed</h3>
                  <p className="text-gray-500">Upload a document to get started with compliance checking</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
