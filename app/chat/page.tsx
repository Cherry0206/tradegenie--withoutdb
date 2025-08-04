"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Send,
  Sparkles,
  FileText,
  Users,
  Shield,
  Mic,
  Download,
  Copy,
  MoreVertical,
  ArrowLeft,
  Bot,
  User,
  Languages,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  intents?: any
  language?: string
}

interface ChatUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

const LANGUAGES = {
  en: { name: "English", flag: "🇺🇸" },
  hi: { name: "हिंदी", flag: "🇮🇳" },
  te: { name: "తెలుగు", flag: "🇮🇳" },
  ta: { name: "தமிழ்", flag: "🇮🇳" },
  ml: { name: "മലയാളം", flag: "🇮🇳" },
}

const WELCOME_MESSAGES = {
  en: "Hello there! 👋 I'm TradeGenie, your intelligent trade assistant. How can I help you today?",
  hi: "नमस्ते! 👋 मैं ट्रेडजीनी हूं, आपका बुद्धिमान व्यापार सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?",
  te: "హలో! 👋 నేను ట్రేడ్‌జీనీ, మీ తెలివైన వాణిజ్య సహాయకుడు. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
  ta: "வணக்கம்! 👋 நான் டிரேட்ஜீனி, உங்கள் புத்திசாலி வர்த்தக உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
  ml: "ഹലോ! 👋 ഞാൻ ട്രേഡ്ജീനി ആണ്, നിങ്ങളുടെ ബുദ്ധിമാനായ വ്യാപാര സഹായി. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
}

const PLACEHOLDERS = {
  en: "Ask me anything about global trade, tariffs, documentation, or market opportunities...",
  hi: "वैश्विक व्यापार, टैरिफ, दस्तावेज़ीकरण, या बाज़ार के अवसरों के बारे में कुछ भी पूछें...",
  te: "గ్లోబల్ ట్రేడ్, టారిఫ్‌లు, డాక్యుమెంటేషన్ లేదా మార్కెట్ అవకాశాల గురించి ఏదైనా అడగండి...",
  ta: "உலகளாவிய வர்த்தகம், கட்டணங்கள், ஆவணங்கள் அல்லது சந்தை வாய்ப்புகள் பற்றி எதையும் கேளுங்கள்...",
  ml: "ആഗോള വ്യാപാരം, താരിഫുകൾ, ഡോക്യുമെന്റേഷൻ അല്ലെങ്കിൽ മാർക്കറ്റ് അവസരങ്ങൾ എന്നിവയെക്കുറിച്ച് എന്തും ചോദിക്കുക...",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [user, setUser] = useState<ChatUser | null>(null)
  const [chatId, setChatId] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof LANGUAGES>("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }

    // Get saved language preference
    const savedLanguage = localStorage.getItem("chatLanguage") as keyof typeof LANGUAGES
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      setSelectedLanguage(savedLanguage)
    }

    // Initialize chat with welcome message in selected language
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGES[savedLanguage || "en"],
      timestamp: new Date().toISOString(),
      language: savedLanguage || "en",
    }

    setMessages([welcomeMessage])
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Save language preference and update welcome message
    localStorage.setItem("chatLanguage", selectedLanguage)

    // Update welcome message when language changes
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: WELCOME_MESSAGES[selectedLanguage],
        timestamp: new Date().toISOString(),
        language: selectedLanguage,
      },
    ])
  }, [selectedLanguage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message: inputMessage,
          chatId: chatId || undefined,
          userId: user.id,
          language: selectedLanguage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Simulate typing delay
        setTimeout(() => {
          const aiMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: data.response,
            timestamp: data.timestamp,
            intents: data.intents,
            language: selectedLanguage,
          }

          setMessages((prev) => [...prev, aiMessage])
          setChatId(data.chatId)
          setIsTyping(false)
        }, 1500)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessages = {
        en: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        hi: "मुझे खेद है, लेकिन मुझे कुछ तकनीकी कठिनाइयों का सामना करना पड़ रहा है। कृपया एक क्षण में फिर से कोशिश करें।",
        te: "క్షమించండి, కానీ నేను కొన్ని సాంకేతిక ఇబ్బందులను ఎదుర్కొంటున్నాను. దయచేసి ఒక క్షణం తర్వాత మళ్లీ ప్రయత్నించండి.",
        ta: "மன்னிக்கவும், ஆனால் நான் சில தொழில்நுட்ப சிக்கல்களை எதிர்கொள்கிறேன். தயவுசெய்து ஒரு கணம் கழித்து மீண்டும் முயற்சிக்கவும்.",
        ml: "ക്ഷമിക്കണം, പക്ഷേ എനിക്ക് ചില സാങ്കേതിക ബുദ്ധിമുട്ടുകൾ നേരിടുന്നുണ്ട്. ദയവായി ഒരു നിമിഷം കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.",
      }

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: errorMessages[selectedLanguage],
        timestamp: new Date().toISOString(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const exportChat = () => {
    const chatText = messages.map((msg) => `${msg.role.toUpperCase()}: ${msg.content}\n`).join("\n")

    const blob = new Blob([chatText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tradegenie-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-gold-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600">Loading chat...</p>
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

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-gold-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                  TradeGenie AI
                </h1>
                <p className="text-sm text-gray-500">Your intelligent trade assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-purple-600" />
              <Select
                value={selectedLanguage}
                onValueChange={(value: keyof typeof LANGUAGES) => setSelectedLanguage(value)}
              >
                <SelectTrigger className="w-32 bg-transparent border-purple-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([code, lang]) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" onClick={exportChat} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Chat
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Full Width Chat Area */}
      <div className="container mx-auto px-2 py-4 max-w-7xl">
        <Card className="border-purple-100 h-[calc(100vh-120px)] flex flex-col shadow-lg bg-white/70 backdrop-blur-sm">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[85%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    } items-start space-x-4`}
                  >
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      {message.role === "user" ? (
                        <>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                            <User className="w-5 h-5 text-white" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-gold-500">
                          <Bot className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div
                      className={`rounded-2xl p-5 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-gold-600 text-white"
                          : "bg-gray-50 text-gray-800 border border-gray-100"
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        {message.content.split("\n").map((line, index) => (
                          <p
                            key={index}
                            className={`${message.role === "user" ? "text-white" : "text-gray-800"} ${index === 0 ? "mt-0" : ""}`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-opacity-20">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.language && (
                            <Badge variant="outline" className="text-xs">
                              {LANGUAGES[message.language as keyof typeof LANGUAGES]?.flag}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 w-7 p-0 ${
                            message.role === "user"
                              ? "text-white/70 hover:text-white hover:bg-white/10"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Intent Actions */}
                      {message.intents && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.intents.document?.detected && (
                            <Badge variant="secondary" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              Document Intent
                            </Badge>
                          )}
                          {message.intents.partner?.detected && (
                            <Badge variant="secondary" className="text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              Partner Search
                            </Badge>
                          )}
                          {message.intents.risk?.detected && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Risk Analysis
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-gold-500">
                      <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
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

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-100 p-4 bg-white/50">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={PLACEHOLDERS[selectedLanguage]}
                  className="pr-12 border-purple-200 focus:border-purple-400 h-10 text-base rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white h-10 px-6 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              TradeGenie AI provides trade intelligence powered by comprehensive databases and AI. Always verify
              critical information.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
