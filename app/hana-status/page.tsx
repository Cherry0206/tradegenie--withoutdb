"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import Link from "next/link"

interface HANAStatus {
  hasCredentials: boolean
  serverNode: string
  username: string
  connectionStatus: string
  dataSource: string
  lastChecked: string
}

export default function HANAStatusPage() {
  const [status, setStatus] = useState<HANAStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/hana-status')
      const result = await response.json()
      
      if (result.success) {
        setStatus(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch HANA status:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/risk-analysis">
              <Button variant="ghost" size="sm" className="text-purple-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Risk Analysis
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                SAP HANA Status
              </h1>
            </div>
          </div>
          <Button onClick={fetchStatus} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {loading ? (
          <Card className="border-purple-100">
            <CardContent className="p-12 text-center">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-500">Checking HANA connection status...</p>
            </CardContent>
          </Card>
        ) : status ? (
          <div className="space-y-6">
            {/* Connection Status */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {status.hasCredentials ? (
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 mr-2 text-red-600" />
                  )}
                  Connection Status
                </CardTitle>
                <CardDescription>
                  Current SAP HANA Cloud connection configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">
                      <Badge variant={status.hasCredentials ? "default" : "destructive"}>
                        {status.connectionStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data Source</label>
                    <div className="mt-1">
                      <Badge variant={status.hasCredentials ? "default" : "secondary"}>
                        {status.dataSource}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Server Node</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                      {status.serverNode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                      {status.username}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Last Checked</label>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Date(status.lastChecked).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Instructions */}
            {!status.hasCredentials && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">Configuration Required</CardTitle>
                  <CardDescription className="text-orange-700">
                    Add your SAP HANA Cloud credentials to enable real-time data
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-orange-800">
                  <p className="mb-4">Add these environment variables to your deployment:</p>
                  <div className="bg-orange-100 p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>SAP_HANA_SERVER_NODE=your-hana-server:443</div>
                    <div>SAP_HANA_USERNAME=your-username</div>
                    <div>SAP_HANA_PASSWORD=your-password</div>
                  </div>
                  <p className="mt-4 text-sm">
                    Once configured, the system will automatically switch to real-time SAP HANA data.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Real-time Features */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Available Features</CardTitle>
                <CardDescription className="text-green-700">
                  Features available with {status.hasCredentials ? 'real-time' : 'mock'} data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-800">Risk Analysis</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Political risk assessment</li>
                      <li>• Economic indicators</li>
                      <li>• Compliance monitoring</li>
                      <li>• Market volatility analysis</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-800">Market Intelligence</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Real-time trade data</li>
                      <li>• Market opportunities</li>
                      <li>• Competitive analysis</li>
                      <li>• Growth projections</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-12 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Check Status</h3>
              <p className="text-red-600">Unable to retrieve HANA connection status</p>
              <Button onClick={fetchStatus} className="mt-4" variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
