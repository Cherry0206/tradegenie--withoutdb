"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FileText,
  Video,
  Headphones,
  Download,
  ExternalLink,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Getting Started Guides",
      icon: BookOpen,
      color: "bg-blue-500",
      resources: [
        {
          title: "International Trade Basics",
          type: "Guide",
          duration: "15 min read",
          description: "Everything you need to know to start trading internationally",
          link: "#",
        },
        {
          title: "Setting Up Your First Export",
          type: "Tutorial",
          duration: "20 min read",
          description: "Step-by-step guide to your first international sale",
          link: "#",
        },
        {
          title: "Understanding Trade Documents",
          type: "Guide",
          duration: "12 min read",
          description: "Master the essential documents for international trade",
          link: "#",
        },
      ],
    },
    {
      title: "Video Tutorials",
      icon: Video,
      color: "bg-red-500",
      resources: [
        {
          title: "TradeGenie Platform Overview",
          type: "Video",
          duration: "8 min watch",
          description: "Complete walkthrough of all TradeGenie features",
          link: "#",
        },
        {
          title: "Document Generation Masterclass",
          type: "Video",
          duration: "15 min watch",
          description: "Learn to create professional trade documents in minutes",
          link: "#",
        },
        {
          title: "Partner Matching Best Practices",
          type: "Video",
          duration: "12 min watch",
          description: "How to find and evaluate international partners",
          link: "#",
        },
      ],
    },
    {
      title: "Templates & Tools",
      icon: FileText,
      color: "bg-green-500",
      resources: [
        {
          title: "Commercial Invoice Template",
          type: "Template",
          duration: "Download",
          description: "Professional invoice template for international sales",
          link: "#",
        },
        {
          title: "Export Checklist",
          type: "Checklist",
          duration: "Download",
          description: "Never miss a step with our comprehensive export checklist",
          link: "#",
        },
        {
          title: "Risk Assessment Worksheet",
          type: "Tool",
          duration: "Download",
          description: "Evaluate market risks before entering new territories",
          link: "#",
        },
      ],
    },
    {
      title: "Webinars & Events",
      icon: Headphones,
      color: "bg-purple-500",
      resources: [
        {
          title: "Monthly Trade Insights Webinar",
          type: "Webinar",
          duration: "60 min",
          description: "Live monthly sessions covering global trade trends",
          link: "#",
        },
        {
          title: "Women in Trade Summit 2024",
          type: "Event",
          duration: "2 days",
          description: "Annual conference for women entrepreneurs in international trade",
          link: "#",
        },
        {
          title: "Compliance Workshop Series",
          type: "Workshop",
          duration: "90 min",
          description: "Deep dive into international trade compliance requirements",
          link: "#",
        },
      ],
    },
  ]

  const popularResources = [
    {
      title: "The Complete Guide to International Trade",
      type: "eBook",
      downloads: "25K+",
      description: "Comprehensive 150-page guide covering everything from basics to advanced strategies",
      image: "📚",
    },
    {
      title: "Trade Document Templates Pack",
      type: "Templates",
      downloads: "18K+",
      description: "50+ professional templates for all your international trade documentation needs",
      image: "📄",
    },
    {
      title: "Market Entry Strategy Toolkit",
      type: "Toolkit",
      downloads: "12K+",
      description: "Research templates, analysis frameworks, and planning tools for new markets",
      image: "🎯",
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
              <Link href="/features">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-700 rounded-full px-6">
                  Features
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
              <Button variant="ghost" className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-6">
                Resources
              </Button>
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
              <span className="text-purple-600">Learning</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to master international trade. Guides, templates, videos, and expert insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Most Popular Downloads</h2>
            <p className="text-gray-600">Our top resources trusted by thousands of entrepreneurs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{resource.image}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Badge className="bg-purple-100 text-purple-700">{resource.type}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="w-4 h-4 mr-1" />
                          {resource.downloads}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Free
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <Card
                      key={resourceIndex}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {resource.duration}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full group-hover:bg-purple-100"
                        >
                          View Resource
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-800">Stay Updated</h2>
            <p className="text-xl text-gray-600">
              Get the latest resources, guides, and trade insights delivered to your inbox
            </p>

            <Card className="bg-white rounded-3xl shadow-xl border-0 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full">
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">Join 10,000+ entrepreneurs getting weekly trade insights</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
