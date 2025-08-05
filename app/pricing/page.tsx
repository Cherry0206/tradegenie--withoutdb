"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Sparkles, Star, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for exploring international trade",
      features: [
        "5 document generations per month",
        "Basic partner search",
        "Country risk overview",
        "Email support",
        "Basic compliance checks",
      ],
      cta: "Get Started Free",
      popular: false,
      color: "border-gray-200",
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited document generation",
        "Advanced partner matching",
        "Detailed risk analysis",
        "Priority support",
        "Full compliance suite",
        "Market intelligence reports",
        "Custom document templates",
        "Multi-language support",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-purple-500",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "White-label options",
        "API access",
        "Custom training",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-gray-200",
    },
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial of our Professional plan with full access to all features.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
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
              <Button variant="ghost" className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full px-6">
                Pricing
              </Button>
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
              <span className="text-purple-600">Simple</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your international trade journey. Start free, scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${plan.color} ${plan.popular ? "scale-105" : ""}`}
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-600">{plan.price}</div>
                        <div className="text-gray-600">{plan.period}</div>
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}>
                        <Button
                          size="lg"
                          className={`w-full py-4 text-lg rounded-full shadow-lg ${
                            plan.popular
                              ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                              : "bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                          }`}
                        >
                          {plan.cta}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-800">Ready to Transform Your Trade?</h2>
            <p className="text-xl text-gray-600">Join thousands of successful entrepreneurs using TradeGenie</p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-12 py-4 text-lg rounded-full shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
