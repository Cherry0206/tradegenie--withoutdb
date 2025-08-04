"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  Search,
  Star,
  MapPin,
  Building,
  ArrowLeft,
  Heart,
  MessageCircle,
  TrendingUp,
  Award,
  Phone,
  Mail,
  Globe,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Partner {
  id: number
  name: string
  country: string
  industry: string
  description: string
  rating: number
  reviews: number
  languages: string[]
  certifications: string[]
  experience: string
  compatibility: number
  avatar: string
  verified: boolean
  responseTime: string
  email: string
  phone: string
  website: string
  establishedYear: number
  employeeCount: string
  annualRevenue: string
  specializations: string[]
  recentProjects: string[]
  clientTestimonials: string[]
}

export default function PartnersPage() {
  const [user, setUser] = useState<any>(null)
  const [searchFilters, setSearchFilters] = useState({
    industry: "",
    country: "",
    language: "any",
    certification: "any",
  })
  const [partners, setPartners] = useState<Partner[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [contactRequests, setContactRequests] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/signin")
    }

    // Load mock partners
    loadMockPartners()
  }, [router])

  const loadMockPartners = () => {
    const mockPartners: Partner[] = [
      {
        id: 1,
        name: "Schmidt Industries GmbH",
        country: "Germany",
        industry: "Organic Textiles",
        description: "Leading organic textile manufacturer with 25+ years experience in sustainable fashion.",
        rating: 4.8,
        reviews: 127,
        languages: ["German", "English", "French"],
        certifications: ["GOTS", "OEKO-TEX", "ISO 14001"],
        experience: "25+ years",
        compatibility: 94,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Schmidt Industries",
        verified: true,
        responseTime: "< 2 hours",
        email: "contact@schmidt-industries.de",
        phone: "+49 30 12345678",
        website: "www.schmidt-industries.de",
        establishedYear: 1998,
        employeeCount: "500-1000",
        annualRevenue: "$50M - $100M",
        specializations: ["Organic Cotton", "Sustainable Dyeing", "Fair Trade Textiles"],
        recentProjects: [
          "Eco-friendly clothing line for major EU retailer",
          "Sustainable textile supply for fashion startup",
        ],
        clientTestimonials: ["Excellent quality and timely delivery", "Best organic textile supplier in Europe"],
      },
      {
        id: 2,
        name: "Tokyo Electronics Co.",
        country: "Japan",
        industry: "Electronics",
        description: "Innovative electronics manufacturer specializing in IoT devices and smart home solutions.",
        rating: 4.9,
        reviews: 203,
        languages: ["Japanese", "English", "Korean"],
        certifications: ["ISO 9001", "CE", "FCC"],
        experience: "15+ years",
        compatibility: 89,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Tokyo Electronics",
        verified: true,
        responseTime: "< 4 hours",
        email: "info@tokyo-electronics.jp",
        phone: "+81 3 1234 5678",
        website: "www.tokyo-electronics.jp",
        establishedYear: 2008,
        employeeCount: "200-500",
        annualRevenue: "$25M - $50M",
        specializations: ["IoT Devices", "Smart Home Technology", "Consumer Electronics"],
        recentProjects: ["Smart home system for residential complex", "IoT sensors for industrial automation"],
        clientTestimonials: ["Cutting-edge technology and reliable support", "Innovative solutions for modern homes"],
      },
      {
        id: 3,
        name: "Brazilian Coffee Exports",
        country: "Brazil",
        industry: "Food & Beverages",
        description: "Premium coffee exporter with direct relationships with local farmers across Brazil.",
        rating: 4.7,
        reviews: 89,
        languages: ["Portuguese", "English", "Spanish"],
        certifications: ["Fair Trade", "Organic", "Rainforest Alliance"],
        experience: "20+ years",
        compatibility: 87,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Brazilian Coffee",
        verified: true,
        responseTime: "< 6 hours",
        email: "export@braziliancoffee.com.br",
        phone: "+55 11 9876 5432",
        website: "www.braziliancoffee.com.br",
        establishedYear: 2003,
        employeeCount: "100-200",
        annualRevenue: "$10M - $25M",
        specializations: ["Arabica Coffee", "Specialty Blends", "Sustainable Farming"],
        recentProjects: ["Premium coffee supply to European cafes", "Organic coffee line for US market"],
        clientTestimonials: ["Best coffee quality in South America", "Reliable supply chain and fair pricing"],
      },
      {
        id: 4,
        name: "Nordic Furniture Design",
        country: "Sweden",
        industry: "Furniture",
        description: "Sustainable furniture manufacturer focusing on Scandinavian design and eco-friendly materials.",
        rating: 4.6,
        reviews: 156,
        languages: ["Swedish", "English", "Norwegian"],
        certifications: ["FSC", "GREENGUARD", "EU Ecolabel"],
        experience: "12+ years",
        compatibility: 82,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Nordic Furniture",
        verified: true,
        responseTime: "< 8 hours",
        email: "sales@nordicfurniture.se",
        phone: "+46 8 123 456 78",
        website: "www.nordicfurniture.se",
        establishedYear: 2011,
        employeeCount: "50-100",
        annualRevenue: "$5M - $10M",
        specializations: ["Scandinavian Design", "Sustainable Materials", "Custom Furniture"],
        recentProjects: ["Office furniture for tech companies", "Sustainable home furniture collection"],
        clientTestimonials: [
          "Beautiful design and excellent craftsmanship",
          "Perfect blend of style and sustainability",
        ],
      },
      {
        id: 5,
        name: "Mumbai Spice Traders",
        country: "India",
        industry: "Spices",
        description:
          "Traditional spice exporters with authentic Indian spices and herbs sourced directly from farmers.",
        rating: 4.5,
        reviews: 234,
        languages: ["Hindi", "English", "Gujarati"],
        certifications: ["FSSAI", "Organic India", "SPICES BOARD"],
        experience: "30+ years",
        compatibility: 91,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Mumbai Spice",
        verified: true,
        responseTime: "< 12 hours",
        email: "export@mumbaispices.in",
        phone: "+91 22 2345 6789",
        website: "www.mumbaispices.in",
        establishedYear: 1993,
        employeeCount: "100-200",
        annualRevenue: "$8M - $15M",
        specializations: ["Whole Spices", "Ground Spices", "Spice Blends"],
        recentProjects: ["Spice supply to Middle East restaurants", "Organic spice line for European market"],
        clientTestimonials: ["Authentic flavors and consistent quality", "Best spice supplier from India"],
      },
      {
        id: 6,
        name: "Australian Wine Co.",
        country: "Australia",
        industry: "Wine & Beverages",
        description: "Premium wine producer from the Barossa Valley with award-winning vintages.",
        rating: 4.8,
        reviews: 178,
        languages: ["English"],
        certifications: ["Organic Wine", "Sustainable Winegrowing", "ISO 22000"],
        experience: "18+ years",
        compatibility: 85,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Australian Wine",
        verified: true,
        responseTime: "< 6 hours",
        email: "export@australianwine.com.au",
        phone: "+61 8 8123 4567",
        website: "www.australianwine.com.au",
        establishedYear: 2005,
        employeeCount: "50-100",
        annualRevenue: "$12M - $20M",
        specializations: ["Red Wine", "White Wine", "Sparkling Wine"],
        recentProjects: ["Wine export to Asian markets", "Premium wine collection for luxury hotels"],
        clientTestimonials: ["Exceptional wine quality", "Professional service and timely delivery"],
      },
    ]
    setPartners(mockPartners)
  }

  const searchPartners = async () => {
    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filter partners based on search criteria
    let filteredPartners = partners

    if (searchFilters.industry) {
      filteredPartners = filteredPartners.filter((p) =>
        p.industry.toLowerCase().includes(searchFilters.industry.toLowerCase()),
      )
    }

    if (searchFilters.country) {
      filteredPartners = filteredPartners.filter((p) =>
        p.country.toLowerCase().includes(searchFilters.country.toLowerCase()),
      )
    }

    setPartners(filteredPartners)
    setIsSearching(false)
  }

  const toggleFavorite = (partnerId: number) => {
    setFavorites((prev) => (prev.includes(partnerId) ? prev.filter((id) => id !== partnerId) : [...prev, partnerId]))
  }

  const viewProfile = (partner: Partner) => {
    setSelectedPartner(partner)
    setShowProfile(true)
  }

  const sendContactRequest = (partnerId: number) => {
    setContactRequests((prev) => [...prev, partnerId])
    // Simulate API call to send contact request
    setTimeout(() => {
      // Show success message or notification
    }, 1000)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-purple-600 animate-pulse mx-auto mb-4" />
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
              <Users className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-gold-600 bg-clip-text text-transparent">
                Partner Matcher
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Filters */}
        <Card className="border-purple-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-purple-600" />
              Find Your Perfect Business Partner
            </CardTitle>
            <CardDescription>Use AI-powered matching to discover verified partners worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={searchFilters.industry}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., Textiles, Electronics"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={searchFilters.country}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, country: e.target.value }))}
                  placeholder="e.g., Germany, Japan"
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={searchFilters.language}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any language</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="certification">Certification</Label>
                <Select
                  value={searchFilters.certification}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, certification: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any certification</SelectItem>
                    <SelectItem value="iso">ISO Certified</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="fair-trade">Fair Trade</SelectItem>
                    <SelectItem value="ce">CE Marking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={searchPartners}
              disabled={isSearching}
              className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
            >
              {isSearching ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  Searching Partners...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Find Partners
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-purple-100 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{partner.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          {partner.name}
                          {partner.verified && <Award className="w-4 h-4 ml-2 text-blue-500" />}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {partner.country}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(partner.id)}
                      className={favorites.includes(partner.id) ? "text-red-500" : "text-gray-400"}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(partner.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {partner.industry}
                    </Badge>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(partner.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {partner.rating} ({partner.reviews})
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm font-semibold">{partner.compatibility}% match</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      {partner.experience} experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Responds in {partner.responseTime}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {partner.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {partner.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => viewProfile(partner)}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                      onClick={() => sendContactRequest(partner.id)}
                      disabled={contactRequests.includes(partner.id)}
                    >
                      {contactRequests.includes(partner.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Request Sent
                        </>
                      ) : (
                        "Contact"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {partners.length === 0 && !isSearching && (
          <Card className="border-purple-100 py-12">
            <CardContent className="text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Partners Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria to find more partners</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Partner Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedPartner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedPartner.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="flex items-center">
                      {selectedPartner.name}
                      {selectedPartner.verified && <Award className="w-5 h-5 ml-2 text-blue-500" />}
                    </DialogTitle>
                    <DialogDescription className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedPartner.country} • {selectedPartner.industry}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Company Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company Overview</h3>
                  <p className="text-gray-600">{selectedPartner.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Established</p>
                      <p className="text-gray-800">{selectedPartner.establishedYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Employees</p>
                      <p className="text-gray-800">{selectedPartner.employeeCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Annual Revenue</p>
                      <p className="text-gray-800">{selectedPartner.annualRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Experience</p>
                      <p className="text-gray-800">{selectedPartner.experience}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{selectedPartner.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{selectedPartner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{selectedPartner.website}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">Responds in {selectedPartner.responseTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.certifications.map((cert) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedPartner.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{selectedPartner.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPartner.reviews} reviews</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 mb-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{selectedPartner.compatibility}%</span>
                      </div>
                      <p className="text-sm text-gray-600">Compatibility</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recent Projects</h3>
                <div className="space-y-2">
                  {selectedPartner.recentProjects.map((project, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{project}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonials */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Client Testimonials</h3>
                <div className="space-y-3">
                  {selectedPartner.clientTestimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-600 italic">"{testimonial}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => toggleFavorite(selectedPartner.id)}
                  className={favorites.includes(selectedPartner.id) ? "text-red-500 border-red-200" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${favorites.includes(selectedPartner.id) ? "fill-current" : ""}`} />
                  {favorites.includes(selectedPartner.id) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-700 hover:to-gold-700 text-white"
                  onClick={() => sendContactRequest(selectedPartner.id)}
                  disabled={contactRequests.includes(selectedPartner.id)}
                >
                  {contactRequests.includes(selectedPartner.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Contact Request Sent
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Contact Request
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
