"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Users,
  Shield,
  MessageSquare,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: FileText,
      title: "Document Generator",
      description: "Magical creation of trade documents, contracts, and compliance forms with AI precision",
      color: "bg-purple-500",
      stats: "50+ Templates",
      benefits: [
        "Commercial invoices",
        "Bills of lading",
        "Certificates of origin",
        "Export licenses",
        "Customs declarations",
      ],
    },
    {
      icon: Users,
      title: "Partner Matcher",
      description: "AI-powered global partner discovery and relationship building across 150+ countries",
      color: "bg-orange-500",
      stats: "10K+ Partners",
      benefits: [
        "Verified supplier database",
        "Smart matching algorithm",
        "Risk assessment scores",
        "Communication tools",
        "Contract templates",
      ],
    },
    {
      icon: Shield,
      title: "Risk Analyzer",
      description: "Smart risk assessment and mitigation strategies for safe international trade",
      color: "bg-green-500",
      stats: "98% Accuracy",
      benefits: [
        "Country risk analysis",
        "Payment risk assessment",
        "Political stability monitoring",
        "Currency fluctuation alerts",
        "Insurance recommendations",
      ],
    },
    {
      icon: MessageSquare,
      title: "Genie Chatbot",
      description: "24/7 AI assistant for all your trade questions and personalized guidance",
      color: "bg-blue-500",
      stats: "24/7 Available",
      benefits: [
        "Instant trade advice",
        "Regulation guidance",
        "Document assistance",
        "Market insights",
        "Multilingual support",
      ],
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time market insights and trend analysis for strategic decision making",
      color: "bg-pink-500",
      stats: "Real-time Data",
      benefits: [
        "Price trend analysis",
        "Demand forecasting",
        "Competitor insights",
        "Market opportunities",
        "Custom reports",
      ],
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Navigate international regulations with confidence and automated compliance checking",
      color: "bg-teal-500",
      stats: "200+ Countries",
      benefits: [
        "Regulation updates",
        "Compliance checklists",
        "Tariff calculations",
        "Documentation requirements",
        "Audit trails",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">TradeGenie</h1>
                <p className="text-xs text-gray-500">AI-Powered Trade</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Home
                </Button>
              </Link>
              <Button variant="ghost" className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-6">
                Features
              </Button>
              <Link href="/pricing">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Pricing
                </Button>
              </Link>
              <Link href="/success-stories">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Success Stories
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Resources
                </Button>
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/chat">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask Genie
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-700 flex items-center">
                  Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-purple-600">Magical</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Trade Features
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the complete suite of AI-powered tools designed to transform your international trade journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                  <CardContent className="p-8 space-y-6">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-yellow-600" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      <Badge className="bg-purple-100 text-purple-700">{feature.stats}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Key Benefits:</h4>
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-12 py-4 text-lg rounded-full shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Using These Features
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
