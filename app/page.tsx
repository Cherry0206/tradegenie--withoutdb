"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  ChevronDown,
  FileText,
  Users,
  Shield,
  MessageSquare,
  TrendingUp,
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: FileText,
      title: "Document Generator",
      description: "Magical creation of trade documents, contracts, and compliance forms with AI precision",
      color: "bg-purple-500",
      stats: "50+ Templates",
      action: "Generate Invoice",
      href: "/documents",
    },
    {
      icon: Users,
      title: "Partner Matcher",
      description: "AI-powered global partner discovery and relationship building across 150+ countries",
      color: "bg-orange-500",
      stats: "10K+ Partners",
      action: "Find Partners",
      href: "/partners",
    },
    {
      icon: Shield,
      title: "Risk Analyzer",
      description: "Smart risk assessment and mitigation strategies for safe international trade",
      color: "bg-green-500",
      stats: "98% Accuracy",
      action: "Analyze Risk",
      href: "/risk-analysis",
    },
    {
      icon: MessageSquare,
      title: "Genie Chatbot",
      description: "24/7 AI assistant for all your trade questions and personalized guidance",
      color: "bg-blue-500",
      stats: "24/7 Available",
      action: "Chat Now",
      href: "/chat",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time market insights and trend analysis for strategic decision making",
      color: "bg-pink-500",
      stats: "Real-time Data",
      action: "View Insights",
      href: "/analytics",
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Navigate international regulations with confidence and automated compliance checking",
      color: "bg-teal-500",
      stats: "200+ Countries",
      action: "Check Compliance",
      href: "/compliance",
    },
  ]

  const stats = [
    { number: "10K+", label: "AI Tools", icon: "⚡" },
    { number: "150+", label: "Countries", icon: "🌍" },
    { number: "98%", label: "Possibilities", icon: "∞" },
  ]

  const benefits = [
    "Generate unlimited trade documents",
    "AI-powered partner matching",
    "Complete market intelligence access",
    "Risk analysis for all markets",
    "Priority customer support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">TradeGenie</h1>
                <p className="text-xs text-gray-500">AI-Powered Trade</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-6">
                Home
              </Button>
              <Link href="/features">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Features <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
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
                  Resources <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/chat">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask Genie
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-700 flex items-center">
                  Demo <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="text-purple-600">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  TradeGenie
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Your Magical Gateway to Global Trade
              </p>

              <p className="text-lg text-gray-500 max-w-5xl mx-auto leading-relaxed">
                Unlock international markets with AI-powered tools designed specifically for women entrepreneurs.
                Transform your trade journey with intelligent automation, global partnerships, and magical insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/demo">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg rounded-full shadow-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Ask the Genie
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg rounded-full bg-white/80 backdrop-blur-sm"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
                    {/* Icon */}
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

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Stats and Action */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm font-semibold text-purple-600">{feature.stats}</div>
                      <Link href={feature.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full"
                        >
                          {feature.action}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Explore All Features Button */}
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
                Explore All Features
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful women entrepreneurs who've transformed their global trade journey with
              TradeGenie.
            </p>

            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl text-gray-700 italic font-light leading-relaxed max-w-4xl mx-auto">
              "The compliance wizard saved us months of paperwork. As a small business, having magical AI tools leveled
              the playing field with larger competitors."
            </blockquote>

            <div className="flex items-center justify-center space-x-4 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MR</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg text-purple-600">Maria Rodriguez</div>
                <div className="text-gray-600">Founder, Artisan Export Co.</div>
                <div className="text-yellow-500 font-medium">Mexico City</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-purple-600">Ready to</span>
                  <br />
                  <span className="text-purple-600">Scale</span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Your Trade?
                  </span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Join thousands of successful women entrepreneurs who've transformed their businesses with TradeGenie's
                  AI-powered platform.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Free Trial Includes</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className="bg-green-100 text-green-700 px-3 py-1">14 Days Free</Badge>
                      <span className="text-purple-600 font-semibold">Full Access</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-6 border-t border-gray-100">
                    <div className="space-y-2 mb-6">
                      <div className="text-4xl font-bold text-gray-800">$0</div>
                      <div className="text-gray-600">for 14 days</div>
                      <div className="text-sm text-gray-500">Then $49/month. Cancel anytime during trial.</div>
                    </div>

                    <Link href="/auth/signup">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 text-lg rounded-full shadow-lg"
                      >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">TradeGenie</div>
                  <div className="text-xs text-gray-400">AI-Powered Trade</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your magical partner for global trade intelligence and business growth.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TradeGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
