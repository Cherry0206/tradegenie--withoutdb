import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { searchProducts, searchCountries, getComprehensiveTariffData } from "@/lib/comprehensive-trade-database"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Mock chat history storage (replace with database)
const chatHistory: Record<string, any[]> = {}

// Language-specific responses
const LANGUAGE_RESPONSES = {
  en: {
    tariffNotFound:
      "I couldn't find specific tariff information for that product and country combination. Please try with more specific product names or check the spelling.",
    technicalError: "I apologize, but I'm experiencing some technical difficulties right now.",
    capabilities:
      "As your trade assistant, I can help you with:\n• Tariff rates and HS codes for 200+ products\n• Export documentation requirements\n• Market opportunities and analysis\n• Trade regulations and compliance\n• Business partner matching",
    tryAgain: "Please try your question again, and I'll do my best to assist you! 🚀",
  },
  hi: {
    tariffNotFound:
      "मुझे उस उत्पाद और देश के संयोजन के लिए विशिष्ट टैरिफ जानकारी नहीं मिली। कृपया अधिक विशिष्ट उत्पाद नामों के साथ प्रयास करें या वर्तनी की जांच करें।",
    technicalError: "मुझे खेद है, लेकिन मुझे अभी कुछ तकनीकी कठिनाइयों का सामना करना पड़ रहा है।",
    capabilities:
      "आपके व्यापार सहायक के रूप में, मैं आपकी मदद कर सकता हूं:\n• 200+ उत्पादों के लिए टैरिफ दरें और HS कोड\n• निर्यात दस्तावेज़ीकरण आवश्यकताएं\n• बाज़ार के अवसर और विश्लेषण\n• व्यापार नियम और अनुपालन\n• व्यापारिक साझेदार मिलान",
    tryAgain: "कृपया अपना प्रश्न फिर से पूछें, और मैं आपकी सहायता करने की पूरी कोशिश करूंगा! 🚀",
  },
  te: {
    tariffNotFound:
      "ఆ ఉత్పత్తి మరియు దేశ కలయిక కోసం నిర్దిష్ట టారిఫ్ సమాచారం నాకు దొరకలేదు. దయచేసి మరింత నిర్దిష్ట ఉత్పత్తి పేర్లతో ప్రయత్నించండి లేదా స్పెల్లింగ్ తనిఖీ చేయండి.",
    technicalError: "క్షమించండి, కానీ నేను ప్రస్తుతం కొన్ని సాంకేతిక ఇబ్బందులను ఎదుర్కొంటున్నాను.",
    capabilities:
      "మీ వాణిజ్య సహాయకుడిగా, నేను మీకు సహాయం చేయగలను:\n• 200+ ఉత్పత్తుల కోసం టారిఫ్ రేట్లు మరియు HS కోడ్‌లు\n• ఎగుమతి డాక్యుమెంటేషన్ అవసరాలు\n• మార్కెట్ అవకాశాలు మరియు విశ్లేషణ\n• వాణిజ్య నియమాలు మరియు సమ్మతి\n• వ్యాపార భాగస్వామి మ్యాచింగ్",
    tryAgain: "దయచేసి మీ ప్రశ్నను మళ్లీ అడగండి, మరియు నేను మీకు సహాయం చేయడానికి నా వంతు కృషి చేస్తాను! 🚀",
  },
  ta: {
    tariffNotFound:
      "அந்த தயாரிப்பு மற்றும் நாட்டின் கலவைக்கான குறிப்பிட்ட கட்டண தகவல் என்னால் கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து மிகவும் குறிப்பிட்ட தயாரிப்பு பெயர்களுடன் முயற்சிக்கவும் அல்லது எழுத்துப்பிழையை சரிபார்க்கவும்.",
    technicalError: "மன்னிக்கவும், ஆனால் நான் இப்போது சில தொழில்நுட்ப சிக்கல்களை எதிர்கொள்கிறேன்.",
    capabilities:
      "உங்கள் வர்த்தக உதவியாளராக, நான் உங்களுக்கு உதவ முடியும்:\n• 200+ தயாரிப்புகளுக்கான கட்டண விகிதங்கள் மற்றும் HS குறியீடுகள்\n• ஏற்றுமதி ஆவண தேவைகள்\n• சந்தை வாய்ப்புகள் மற்றும் பகுப்பாய்வு\n• வர்த்தக விதிமுறைகள் மற்றும் இணக்கம்\n• வணிக கூட்டாளர் பொருத்தம்",
    tryAgain: "தயவுசெய்து உங்கள் கேள்வியை மீண்டும் கேளுங்கள், நான் உங்களுக்கு உதவ என்னால் முடிந்த அனைத்தையும் செய்வேன்! 🚀",
  },
  ml: {
    tariffNotFound:
      "ആ ഉൽപ്പന്നത്തിനും രാജ്യത്തിനുമുള്ള നിർദ്ദിഷ്ട താരിഫ് വിവരങ്ങൾ എനിക്ക് കണ്ടെത്താൻ കഴിഞ്ഞില്ല. കൂടുതൽ നിർദ്ദിഷ്ട ഉൽപ്പന്ന നാമങ്ങൾ ഉപയോഗിച്ച് ശ്രമിക്കുക അല്ലെങ്കിൽ സ്പെല്ലിംഗ് പരിശോധിക്കുക.",
    technicalError: "ക്ഷമിക്കണം, പക്ഷേ എനിക്ക് ഇപ്പോൾ ചില സാങ്കേതിക ബുദ്ധിമുട്ടുകൾ നേരിടുന്നുണ്ട്.",
    capabilities:
      "നിങ്ങളുടെ വ്യാപാര സഹായിയെന്ന നിലയിൽ, എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയും:\n• 200+ ഉൽപ്പന്നങ്ങൾക്കുള്ള താരിഫ് നിരക്കുകളും HS കോഡുകളും\n• കയറ്റുമതി ഡോക്യുമെന്റേഷൻ ആവശ്യകതകൾ\n• മാർക്കറ്റ് അവസരങ്ങളും വിശകലനവും\n• വ്യാപാര നിയമങ്ങളും പാലിക്കലും\n• ബിസിനസ് പാർട്ണർ മാച്ചിംഗ്",
    tryAgain: "ദയവായി നിങ്ങളുടെ ചോദ്യം വീണ്ടും ചോദിക്കുക, നിങ്ങളെ സഹായിക്കാൻ ഞാൻ പരമാവധി ശ്രമിക്കും! 🚀",
  },
}

function detectTariffQuery(message: string): any {
  const lowerMessage = message.toLowerCase()

  // Enhanced tariff query detection patterns
  const tariffPatterns = [
    /tariff.*for.*export/i,
    /export.*tariff/i,
    /duty.*for.*export/i,
    /what.*is.*the.*tariff/i,
    /tariff.*rate/i,
    /customs.*duty/i,
    /import.*duty/i,
    /export.*duty/i,
    /hs.*code.*for/i,
    /harmonized.*code.*for/i,
    /what.*tariff/i,
    /tariff.*from.*to/i,
    /duty.*from.*to/i,
    /tariff.*to/i,
    /duty.*to/i,
    /tariff.*for.*exporting/i,
    /what.*is.*tariff/i,
  ]

  // Check for explicit tariff mentions with better patterns
  const explicitTariffMention =
    tariffPatterns.some((pattern) => pattern.test(message)) ||
    (lowerMessage.includes("tariff") &&
      (lowerMessage.includes("for") || lowerMessage.includes("to") || lowerMessage.includes("export"))) ||
    (lowerMessage.includes("duty") &&
      (lowerMessage.includes("for") || lowerMessage.includes("to") || lowerMessage.includes("export"))) ||
    (lowerMessage.includes("hs code") && lowerMessage.includes("for"))

  if (!explicitTariffMention) {
    console.log("No explicit tariff mention detected")
    return { detected: false, isTariffQuery: false }
  }

  // Enhanced product detection - look for tea specifically
  let detectedProduct = ""
  let detectedCountry = ""

  // Special handling for tea types
  if (lowerMessage.includes("black tea")) {
    detectedProduct = "black_tea"
  } else if (lowerMessage.includes("green tea")) {
    detectedProduct = "green_tea"
  } else if (lowerMessage.includes("tea")) {
    detectedProduct = "black_tea" // Default to black tea
  }

  // If no specific tea type found, use general product search
  if (!detectedProduct) {
    const words = lowerMessage.split(/\s+/)
    const phrases = []

    // Create 2-word and 3-word phrases for better matching
    for (let i = 0; i < words.length; i++) {
      phrases.push(words[i])
      if (i < words.length - 1) {
        phrases.push(`${words[i]} ${words[i + 1]}`)
      }
      if (i < words.length - 2) {
        phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`)
      }
    }

    // Search for products using phrases
    for (const phrase of phrases) {
      const productMatches = searchProducts(phrase)
      if (productMatches.length > 0) {
        detectedProduct = productMatches[0]
        break
      }
    }
  }

  // Enhanced country detection
  if (lowerMessage.includes("usa") || lowerMessage.includes("united states") || lowerMessage.includes("america")) {
    detectedCountry = "usa"
  } else if (lowerMessage.includes("germany")) {
    detectedCountry = "germany"
  } else if (lowerMessage.includes("uk") || lowerMessage.includes("britain") || lowerMessage.includes("england")) {
    detectedCountry = "uk"
  } else {
    // Use general country search
    const words = lowerMessage.split(/\s+/)
    const phrases = []

    for (let i = 0; i < words.length; i++) {
      phrases.push(words[i])
      if (i < words.length - 1) {
        phrases.push(`${words[i]} ${words[i + 1]}`)
      }
    }

    for (const phrase of phrases) {
      const countryMatches = searchCountries(phrase)
      if (countryMatches.length > 0) {
        detectedCountry = countryMatches[0]
        break
      }
    }
  }

  console.log(
    `Enhanced tariff detection: explicitMention=${explicitTariffMention}, product=${detectedProduct}, country=${detectedCountry}`,
  )

  return {
    detected: explicitTariffMention && !!(detectedProduct && detectedCountry),
    product: detectedProduct,
    fromCountry: "India", // Default
    toCountry: detectedCountry,
    isTariffQuery: explicitTariffMention,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, chatId, userId, language = "en" } = body

    if (!message || !userId) {
      return NextResponse.json({ error: "Message and userId are required" }, { status: 400 })
    }

    const currentChatId = chatId || `chat_${Date.now()}_${userId}`

    // Initialize chat history if not exists
    if (!chatHistory[currentChatId]) {
      chatHistory[currentChatId] = []
    }

    // Add user message to history
    chatHistory[currentChatId].push({
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
      language,
    })

    // Generate AI response
    const aiResponse = await generateGeminiResponse(message, chatHistory[currentChatId], language)

    // Add AI response to history
    chatHistory[currentChatId].push({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date().toISOString(),
      language,
    })

    // Detect intents
    const documentIntent = detectDocumentIntent(message)
    const partnerIntent = detectPartnerIntent(message)
    const riskIntent = detectRiskIntent(message)

    return NextResponse.json({
      response: aiResponse,
      chatId: currentChatId,
      timestamp: new Date().toISOString(),
      intents: {
        document: documentIntent,
        partner: partnerIntent,
        risk: riskIntent,
      },
      language: detectLanguage(message),
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

async function generateGeminiResponse(message: string, history: any[], language = "en"): Promise<string> {
  try {
    // Check if this is a tariff query first
    const tariffQuery = detectTariffQuery(message)

    if (tariffQuery.detected) {
      console.log(
        `Processing tariff query: ${tariffQuery.product} from ${tariffQuery.fromCountry} to ${tariffQuery.toCountry}`,
      )

      // Handle tariff query using comprehensive database
      const tariffData = await getTariffDataDirect(tariffQuery.product, tariffQuery.fromCountry, tariffQuery.toCountry)

      if (tariffData) {
        const response = `🔎 **Tariff Information**

**Product**: ${tariffData.product}
**Export Route**: ${tariffQuery.fromCountry} → ${tariffData.country}
**HS Code**: ${tariffData.hsCode}

💰 **Tariff Details**:
• Import Tariff: ${tariffData.baseTariff}
• Additional Duties: ${tariffData.additionalDuties}
• Total Tariff: ${tariffData.totalTariff}

📋 **Required Documentation**:
${tariffData.documentation.map((doc) => `• ${doc}`).join("\n")}

${
  tariffData.restrictions && tariffData.restrictions.length > 0
    ? `
⚠️ **Import Restrictions**:
${tariffData.restrictions.map((restriction) => `• ${restriction}`).join("\n")}
`
    : ""
}

${
  tariffData.seasonalVariations
    ? `
📅 **Additional Info**: ${tariffData.seasonalVariations}
`
    : ""
}

${
  tariffData.quotas
    ? `
📊 **Quota Information**: ${tariffData.quotas}
`
    : ""
}

*Source: ${tariffData.source} | Updated: ${new Date(tariffData.lastUpdated).toLocaleDateString()}*

Need help with documentation, finding partners, or market analysis? Just ask! 🚀`

        return response
      }
    }

    // For all other queries, use Gemini AI with proper context and language
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const context = history
      .slice(-10)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")

    const languageInstruction = getLanguageInstruction(language)

    const prompt = `You are TradeGenie, an intelligent AI trade assistant. You help with global trade, export-import, market insights, documentation, and business guidance.

${languageInstruction}

Key capabilities:
- Tariff and duty information for 200+ products across 150+ countries
- Export documentation and compliance requirements  
- Market analysis and business opportunities
- Trade regulations and restrictions
- Partner matching and business development
- Risk analysis and market intelligence

Previous conversation:
${context}

Current question: ${message}

Instructions:
1. Provide helpful, accurate trade-related advice in ${getLanguageName(language)}
2. Be conversational and professional
3. For specific tariff queries, encourage users to ask: "What's the tariff for [product] from [country] to [country]?"
4. Offer actionable next steps
5. Keep responses focused and relevant to the user's question
6. Use emojis and formatting to make responses engaging
7. Always end with a helpful follow-up question or suggestion

Respond as TradeGenie in ${getLanguageName(language)}:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Response generation error:", error)
    const langResponses = LANGUAGE_RESPONSES[language as keyof typeof LANGUAGE_RESPONSES] || LANGUAGE_RESPONSES.en

    return `${langResponses.technicalError}

${langResponses.capabilities}

${langResponses.tryAgain}`
  }
}

function getLanguageInstruction(language: string): string {
  const instructions = {
    en: "Respond in English.",
    hi: "हिंदी में उत्तर दें। Use Hindi language for all responses.",
    te: "తెలుగులో సమాధానం ఇవ్వండి। Use Telugu language for all responses.",
    ta: "தமிழில் பதிலளிக்கவும். Use Tamil language for all responses.",
    ml: "മലയാളത്തിൽ ഉത്തരം നൽകുക। Use Malayalam language for all responses.",
  }

  return instructions[language as keyof typeof instructions] || instructions.en
}

function getLanguageName(language: string): string {
  const names = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
    ta: "Tamil",
    ml: "Malayalam",
  }

  return names[language as keyof typeof names] || "English"
}

async function getTariffDataDirect(productKey: string, fromCountry: string, toCountry: string) {
  try {
    const result = getComprehensiveTariffData(productKey, toCountry)

    if (!result) {
      console.log(`No tariff data found for ${productKey} to ${toCountry}`)
      return null
    }

    return {
      product: result.product.name,
      country: result.country,
      hsCode: result.product.hsCode,
      baseTariff: result.tariffData.importTariff,
      additionalDuties: result.tariffData.additionalDuties,
      totalTariff: result.tariffData.totalTariff,
      documentation: result.tariffData.documentation,
      restrictions: result.tariffData.restrictions,
      seasonalVariations: result.tariffData.seasonalVariations,
      quotas: result.tariffData.quotas,
      source: "Official Trade Database",
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Direct tariff data error:", error)
    return null
  }
}

function detectDocumentIntent(message: string): any {
  const lowerMessage = message.toLowerCase()
  const documentKeywords = [
    "paperwork",
    "documentation",
    "documents required",
    "export documents",
    "import documents",
    "certificate",
    "invoice",
    "bill of lading",
    "packing list",
    "what documents",
    "documentation needed",
    "papers needed",
    "export paperwork",
    "import paperwork",
  ]

  for (const keyword of documentKeywords) {
    if (lowerMessage.includes(keyword)) {
      return {
        detected: true,
        type: keyword.includes("invoice")
          ? "invoice"
          : keyword.includes("bill")
            ? "bill_of_lading"
            : keyword.includes("certificate")
              ? "certificate"
              : "general",
        confidence: 0.8,
      }
    }
  }

  return { detected: false }
}

function detectPartnerIntent(message: string): any {
  const lowerMessage = message.toLowerCase()
  const partnerKeywords = [
    "find partner",
    "business partner",
    "supplier",
    "distributor",
    "buyer",
    "importer",
    "exporter",
    "trade partner",
    "business contact",
    "connect with",
    "find buyer",
    "find supplier",
  ]

  for (const keyword of partnerKeywords) {
    if (lowerMessage.includes(keyword)) {
      return {
        detected: true,
        type: "partner_search",
        confidence: 0.8,
      }
    }
  }

  return { detected: false }
}

function detectRiskIntent(message: string): any {
  const lowerMessage = message.toLowerCase()
  const riskKeywords = [
    "risk analysis",
    "market risk",
    "country risk",
    "political risk",
    "export risk",
    "trade risk",
    "business risk",
    "investment risk",
    "analyze risk",
    "risk assessment",
  ]

  for (const keyword of riskKeywords) {
    if (lowerMessage.includes(keyword)) {
      return {
        detected: true,
        type: "risk_analysis",
        confidence: 0.8,
      }
    }
  }

  return { detected: false }
}

function detectLanguage(message: string): string {
  const patterns = {
    es: /[ñáéíóúü]/i,
    fr: /[àâäéèêëïîôöùûüÿç]/i,
    de: /[äöüß]/i,
    it: /[àèéìíîòóóù]/i,
    pt: /[ãâáàçéêíóôõú]/i,
    zh: /[\u4e00-\u9fff]/,
    ja: /[\u3040-\u309f\u30a0-\u30ff]/,
    ar: /[\u0600-\u06ff]/,
    hi: /[\u0900-\u097F]/,
    te: /[\u0C00-\u0C7F]/,
    ta: /[\u0B80-\u0BFF]/,
    ml: /[\u0D00-\u0D7F]/,
  }

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(message)) {
      return lang
    }
  }

  return "en"
}

// Get chat history endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const chatId = searchParams.get("chatId")
  const userId = searchParams.get("userId")

  if (!chatId || !userId) {
    return NextResponse.json({ error: "ChatId and userId are required" }, { status: 400 })
  }

  const history = chatHistory[chatId] || []

  return NextResponse.json({
    chatId,
    history,
    totalMessages: history.length,
  })
}
