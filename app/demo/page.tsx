"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowLeft, Send, Bot, User } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant" as const,
      content:
        "👋 Welcome to TradeGenie AI Demo! I can help you with:\n\n🧾 Document generation\n🤝 Partner matching\n🛡️ Risk analysis\n📋 Compliance checking\n\nTry asking: 'Generate a commercial invoice for Germany export'",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const demoResponses = [
    "I can help you generate a commercial invoice! For a complete document generation experience with forms and templates, please sign up for a free account.",
    "Great question about partner matching! Our AI can find verified partners in 200+ countries. Sign up to access our full partner database.",
    "Risk analysis is one of our key features! I can analyze political, economic, and compliance risks for any country-product combination. Create an account to get detailed risk reports.",
    "For compliance checking, you can upload documents and get instant feedback. Our full compliance advisor is available after registration.",
    "I'd be happy to help with that! For the complete TradeGenie experience with all features, please create your free account.",
  ]

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: randomResponse,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-purple-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                  TradeGenie AI Demo
                </h1>
                <p className="text-xs text-gray-500">Try our AI assistant</p>
              </div>
            </div>
          </div>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white">
              Get Full Access
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Demo
          </Badge>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Experience TradeGenie AI</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chat with our AI assistant to see how TradeGenie can transform your global trade operations. Sign up for
            full access to all features!
          </p>
        </motion.div>

        <Card className="border-purple-100 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  } items-start space-x-3`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {message.role === "user" ? (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gold-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-gold-600 text-white"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs mt-2 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gold-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-100 p-4">
            <div className="flex items-center space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about trade documents, partners, risks..."
                className="flex-1 border-purple-200 focus:border-purple-400"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              This is a demo. Sign up for full AI capabilities and all features!
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Card className="border-purple-100 bg-gradient-to-r from-purple-50 to-gold-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for the Full Experience?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Unlock all TradeGenie features including document generation, partner matching, risk analysis,
                compliance checking, and market analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white px-8 py-3"
                  >
                    Start Free Trial
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
