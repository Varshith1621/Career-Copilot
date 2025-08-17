"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
  Search,
  BarChart3,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface JobMarketData {
  role: string
  category: string
  averageSalary: {
    min: number
    max: number
    median: number
  }
  growthRate: number
  demandLevel: "low" | "medium" | "high" | "very-high"
  openPositions: number
  requiredSkills: string[]
  locations: {
    city: string
    state: string
    averageSalary: number
    openings: number
  }[]
  skillMatch?: number
}

interface MarketTrend {
  skill: string
  category: string
  demandChange: number
  currentDemand: number
  projectedGrowth: number
  averageSalaryImpact: number
}

const jobMarketData: JobMarketData[] = [
  {
    role: "AI/ML Engineer",
    category: "Technology",
    averageSalary: { min: 95000, max: 180000, median: 135000 },
    growthRate: 22,
    demandLevel: "very-high",
    openPositions: 15420,
    requiredSkills: ["programming", "ai-ml", "data-analysis", "problem-solving"],
    locations: [
      { city: "San Francisco", state: "CA", averageSalary: 165000, openings: 2840 },
      { city: "Seattle", state: "WA", averageSalary: 145000, openings: 1920 },
      { city: "New York", state: "NY", averageSalary: 155000, openings: 2150 },
      { city: "Austin", state: "TX", averageSalary: 125000, openings: 1680 },
      { city: "Boston", state: "MA", averageSalary: 140000, openings: 1230 },
    ],
  },
  {
    role: "Full Stack Developer",
    category: "Technology",
    averageSalary: { min: 75000, max: 140000, median: 105000 },
    growthRate: 13,
    demandLevel: "high",
    openPositions: 28750,
    requiredSkills: ["programming", "web-dev", "problem-solving", "teamwork"],
    locations: [
      { city: "San Francisco", state: "CA", averageSalary: 135000, openings: 4200 },
      { city: "New York", state: "NY", averageSalary: 120000, openings: 3800 },
      { city: "Seattle", state: "WA", averageSalary: 115000, openings: 2900 },
      { city: "Austin", state: "TX", averageSalary: 95000, openings: 2400 },
      { city: "Denver", state: "CO", averageSalary: 90000, openings: 1850 },
    ],
  },
  {
    role: "Product Manager",
    category: "Business",
    averageSalary: { min: 85000, max: 160000, median: 120000 },
    growthRate: 19,
    demandLevel: "very-high",
    openPositions: 12340,
    requiredSkills: ["leadership", "communication", "problem-solving", "innovation"],
    locations: [
      { city: "San Francisco", state: "CA", averageSalary: 155000, openings: 1840 },
      { city: "New York", state: "NY", averageSalary: 145000, openings: 1620 },
      { city: "Seattle", state: "WA", averageSalary: 135000, openings: 1200 },
      { city: "Los Angeles", state: "CA", averageSalary: 125000, openings: 980 },
      { city: "Chicago", state: "IL", averageSalary: 110000, openings: 850 },
    ],
  },
  {
    role: "UX Designer",
    category: "Design",
    averageSalary: { min: 70000, max: 130000, median: 95000 },
    growthRate: 13,
    demandLevel: "high",
    openPositions: 8920,
    requiredSkills: ["design", "problem-solving", "communication", "innovation"],
    locations: [
      { city: "San Francisco", state: "CA", averageSalary: 125000, openings: 1340 },
      { city: "New York", state: "NY", averageSalary: 115000, openings: 1180 },
      { city: "Los Angeles", state: "CA", averageSalary: 105000, openings: 920 },
      { city: "Seattle", state: "WA", averageSalary: 100000, openings: 780 },
      { city: "Austin", state: "TX", averageSalary: 85000, openings: 640 },
    ],
  },
  {
    role: "Data Scientist",
    category: "Technology",
    averageSalary: { min: 90000, max: 170000, median: 125000 },
    growthRate: 25,
    demandLevel: "very-high",
    openPositions: 11680,
    requiredSkills: ["data-analysis", "programming", "ai-ml", "problem-solving"],
    locations: [
      { city: "San Francisco", state: "CA", averageSalary: 160000, openings: 1920 },
      { city: "New York", state: "NY", averageSalary: 145000, openings: 1680 },
      { city: "Seattle", state: "WA", averageSalary: 135000, openings: 1240 },
      { city: "Boston", state: "MA", averageSalary: 130000, openings: 980 },
      { city: "Austin", state: "TX", averageSalary: 115000, openings: 820 },
    ],
  },
  {
    role: "DevOps Engineer",
    category: "Technology",
    averageSalary: { min: 85000, max: 150000, median: 115000 },
    growthRate: 18,
    demandLevel: "high",
    openPositions: 9840,
    requiredSkills: ["cloud", "programming", "problem-solving", "teamwork"],
    locations: [
      { city: "Seattle", state: "WA", averageSalary: 140000, openings: 1420 },
      { city: "San Francisco", state: "CA", averageSalary: 145000, openings: 1380 },
      { city: "Austin", state: "TX", averageSalary: 110000, openings: 1120 },
      { city: "New York", state: "NY", averageSalary: 125000, openings: 980 },
      { city: "Denver", state: "CO", averageSalary: 105000, openings: 740 },
    ],
  },
]

const marketTrends: MarketTrend[] = [
  {
    skill: "AI/Machine Learning",
    category: "Technology",
    demandChange: 45,
    currentDemand: 92,
    projectedGrowth: 38,
    averageSalaryImpact: 25000,
  },
  {
    skill: "Cloud Computing",
    category: "Technology",
    demandChange: 32,
    currentDemand: 88,
    projectedGrowth: 28,
    averageSalaryImpact: 18000,
  },
  {
    skill: "Data Analysis",
    category: "Technology",
    demandChange: 28,
    currentDemand: 85,
    projectedGrowth: 25,
    averageSalaryImpact: 15000,
  },
  {
    skill: "Product Management",
    category: "Business",
    demandChange: 24,
    currentDemand: 78,
    projectedGrowth: 22,
    averageSalaryImpact: 12000,
  },
  {
    skill: "UX Design",
    category: "Design",
    demandChange: 18,
    currentDemand: 72,
    projectedGrowth: 16,
    averageSalaryImpact: 8000,
  },
  {
    skill: "Cybersecurity",
    category: "Technology",
    demandChange: 35,
    currentDemand: 89,
    projectedGrowth: 31,
    averageSalaryImpact: 20000,
  },
]

export default function MarketAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [userSkills, setUserSkills] = useState<any[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Load user skills from localStorage
    const savedSkills = localStorage.getItem("skillAssessment")
    if (savedSkills) {
      setUserSkills(JSON.parse(savedSkills))
    }
  }, [])

  const calculateSkillMatch = (jobSkills: string[]): number => {
    if (!userSkills.length) return 0

    const matchingSkills = jobSkills.filter((jobSkill) =>
      userSkills.some((userSkill) => userSkill.id === jobSkill && userSkill.level >= 3),
    )

    return Math.round((matchingSkills.length / jobSkills.length) * 100)
  }

  const filteredJobs = jobMarketData
    .map((job) => ({
      ...job,
      skillMatch: calculateSkillMatch(job.requiredSkills),
    }))
    .filter((job) => {
      const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || job.category.toLowerCase() === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => (b.skillMatch || 0) - (a.skillMatch || 0))

  const categories = ["all", ...Array.from(new Set(jobMarketData.map((job) => job.category.toLowerCase())))]

  const formatSalary = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDemandColor = (level: string): string => {
    switch (level) {
      case "very-high":
        return "text-green-600 bg-green-50"
      case "high":
        return "text-blue-600 bg-blue-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium animate-glow">
            <BarChart3 className="mr-2 h-4 w-4" />
            AI Market Intelligence
          </Badge>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Job Market{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time insights into job trends, salaries, and opportunities tailored to your skills
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-2 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search job roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="opportunities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opportunities">Job Opportunities</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.role}
                  className="border-2 border-border hover:border-accent/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="font-serif">{job.role}</CardTitle>
                          {job.skillMatch && job.skillMatch > 0 && (
                            <Badge variant="secondary" className="animate-glow">
                              {job.skillMatch}% Match
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span>{job.category}</span>
                          <span className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3" />
                            {job.openPositions.toLocaleString()} openings
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className={getDemandColor(job.demandLevel)}>
                        {job.demandLevel.replace("-", " ")} demand
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Salary Range
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Entry Level:</span>
                            <span className="font-medium">{formatSalary(job.averageSalary.min)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Median:</span>
                            <span className="font-medium">{formatSalary(job.averageSalary.median)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Senior Level:</span>
                            <span className="font-medium">{formatSalary(job.averageSalary.max)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Growth & Demand
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Growth Rate:</span>
                            <span className="font-medium text-green-600">+{job.growthRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Market Demand:</span>
                            <span className="font-medium capitalize">{job.demandLevel.replace("-", " ")}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Target className="mr-2 h-4 w-4" />
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills.map((skill) => {
                            const userSkill = userSkills.find((s) => s.id === skill)
                            const hasSkill = userSkill && userSkill.level >= 3
                            return (
                              <Badge
                                key={skill}
                                variant={hasSkill ? "default" : "outline"}
                                className={`text-xs ${hasSkill ? "bg-accent text-accent-foreground" : ""}`}
                              >
                                {skill.replace("-", " ")}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3 flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Top Locations
                      </h4>
                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {job.locations.slice(0, 6).map((location) => (
                          <div key={`${location.city}-${location.state}`} className="flex justify-between text-sm">
                            <span>
                              {location.city}, {location.state}
                            </span>
                            <span className="font-medium">{formatSalary(location.averageSalary)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {marketTrends.map((trend) => (
                <Card key={trend.skill} className="border-2 border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-serif">{trend.skill}</CardTitle>
                        <CardDescription>{trend.category}</CardDescription>
                      </div>
                      <Badge variant={trend.demandChange > 20 ? "default" : "secondary"}>
                        {trend.demandChange > 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        {Math.abs(trend.demandChange)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Demand</span>
                          <span className="font-medium">{trend.currentDemand}%</span>
                        </div>
                        <Progress value={trend.currentDemand} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Projected Growth</span>
                          <span className="font-medium text-green-600">+{trend.projectedGrowth}%</span>
                        </div>
                        <Progress value={trend.projectedGrowth} className="h-2" />
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span>Salary Impact:</span>
                          <span className="font-medium text-accent">+{formatSalary(trend.averageSalaryImpact)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-accent/20">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-accent" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/5 rounded-lg">
                      <h4 className="font-medium mb-2">High-Growth Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your skills, AI/ML Engineering shows 95% compatibility with 22% projected growth.
                        Consider focusing on machine learning frameworks.
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-medium mb-2">Skill Gap Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Developing cloud computing skills could increase your salary potential by $18,000 and open 40%
                        more opportunities.
                      </p>
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg">
                      <h4 className="font-medium mb-2">Market Timing</h4>
                      <p className="text-sm text-muted-foreground">
                        The current market shows high demand for your skill set. Consider applying to positions in the
                        next 3-6 months for optimal results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center">
                    <Users className="mr-2 h-5 w-5 text-secondary" />
                    Industry Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Fastest Growing Sectors</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AI & Machine Learning</span>
                          <span className="font-medium text-green-600">+25%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cybersecurity</span>
                          <span className="font-medium text-green-600">+31%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cloud Computing</span>
                          <span className="font-medium text-green-600">+28%</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-2">Remote Work Trends</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Fully Remote</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Hybrid</span>
                          <span className="font-medium">38%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>On-site</span>
                          <span className="font-medium">17%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
