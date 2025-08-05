"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Maria Rodriguez",
      company: "Artisan Export Co.",
      location: "Mexico City, Mexico",
      industry: "Handcrafts & Textiles",
      avatar: "MR",
      growth: "300% revenue increase",
      timeframe: "6 months",
      quote:
        "The compliance wizard saved us months of paperwork. As a small business, having magical AI tools leveled the playing field with larger competitors.",
      results: [
        "Reduced document processing time by 85%",
        "Expanded to 12 new countries",
        "Increased profit margins by 40%",
        "Found 25+ verified suppliers",
      ],
      color: "from-purple-400 to-pink-400",
    },
    {
      name: "Sarah Chen",
      company: "Global Tech Solutions",
      location: "Singapore",
      industry: "Electronics & Technology",
      avatar: "SC",
      growth: "500% order volume",
      timeframe: "8 months",
      quote:
        "TradeGenie's partner matching connected us with suppliers we never would have found. The risk analysis gave us confidence to enter new markets.",
      results: [
        "Connected with 50+ verified partners",
        "Reduced sourcing costs by 30%",
        "Entered 8 new markets safely",
        "Automated 90% of compliance checks",
      ],
      color: "from-blue-400 to-teal-400",
    },
    {
      name: "Amara Okafor",
      company: "African Spice Trading",
      location: "Lagos, Nigeria",
      industry: "Food & Agriculture",
      avatar: "AO",
      growth: "250% market expansion",
      timeframe: "4 months",
      quote:
        "The market intelligence feature helped us identify the perfect timing for expansion. We went from local to international in just 4 months.",
      results: [
        "Expanded to 15 countries",
        "Increased sales by 250%",
        "Reduced shipping costs by 25%",
        "Built network of 100+ buyers",
      ],
      color: "from-green-400 to-emerald-400",
    },
    {
      name: "Elena Petrov",
      company: "European Fashion Hub",
      location: "Prague, Czech Republic",
      industry: "Fashion & Apparel",
      avatar: "EP",
      growth: "400% online sales",
      timeframe: "5 months",
      quote:
        "The document generator and compliance tools made international shipping seamless. We can now focus on design while TradeGenie handles the paperwork.",
      results: [
        "Automated all trade documents",
        "Reduced compliance errors to 0%",
        "Expanded to 20+ countries",
        "Increased customer satisfaction by 95%",
      ],
      color: "from-orange-400 to-red-400",
    },
  ]

  const stats = [
    { number: "2,500+", label: "Success Stories", icon: "🎉" },
    { number: "150+", label: "Countries Served", icon: "🌍" },
    { number: "95%", label: "Customer Satisfaction", icon: "⭐" },
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
              <Button variant="ghost" className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-6">
                Success Stories
              </Button>
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
              <span className="text-purple-600">Success</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real entrepreneurs, real results. See how TradeGenie has transformed businesses worldwide.
            </p>
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

      {/* Success Stories */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${story.color} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">{story.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                        <p className="text-purple-600 font-semibold">{story.company}</p>
                        <p className="text-gray-500 text-sm">{story.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 mb-2">{story.industry}</Badge>
                        <div className="text-sm text-gray-500">{story.timeframe}</div>
                      </div>
                    </div>

                    {/* Growth Metric */}
                    <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{story.growth}</div>
                      <div className="text-gray-600 text-sm">in {story.timeframe}</div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 italic leading-relaxed">"{story.quote}"</blockquote>

                    {/* Results */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Key Results:</h4>
                      {story.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{result}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">Verified Customer</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-800">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-gray-600">Join thousands of entrepreneurs transforming their trade journey</p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-12 py-4 text-lg rounded-full shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
