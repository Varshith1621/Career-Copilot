"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calendar,
  CheckCircle,
  Clock,
  BookOpen,
  Code,
  Users,
  Lightbulb,
  ArrowRight,
  Play,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  description: string
  category: string
  level: number
}

interface RoadmapMilestone {
  id: string
  title: string
  description: string
  targetSkills: string[]
  duration: string
  priority: "high" | "medium" | "low"
  completed: boolean
  tasks: DailyTask[]
}

interface DailyTask {
  id: string
  title: string
  description: string
  type: "learn" | "practice" | "project" | "read"
  estimatedTime: string
  completed: boolean
  resources: string[]
}

interface CareerPath {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  requiredSkills: string[]
  averageSalary: string
  growthRate: string
}

const careerPaths: CareerPath[] = [
  {
    id: "ai-developer",
    title: "AI Developer",
    description: "Build intelligent applications using machine learning and AI",
    icon: <Zap className="h-6 w-6" />,
    color: "accent",
    requiredSkills: ["programming", "ai-ml", "data-analysis", "problem-solving"],
    averageSalary: "$95k - $150k",
    growthRate: "+22% (Very High)",
  },
  {
    id: "full-stack-dev",
    title: "Full-Stack Developer",
    description: "Create end-to-end web applications and systems",
    icon: <Code className="h-6 w-6" />,
    color: "secondary",
    requiredSkills: ["programming", "web-dev", "problem-solving", "teamwork"],
    averageSalary: "$75k - $120k",
    growthRate: "+13% (High)",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Lead product strategy and cross-functional teams",
    icon: <Users className="h-6 w-6" />,
    color: "accent",
    requiredSkills: ["leadership", "communication", "problem-solving", "innovation"],
    averageSalary: "$85k - $140k",
    growthRate: "+19% (Very High)",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Design user-centered digital experiences",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "secondary",
    requiredSkills: ["design", "problem-solving", "communication", "innovation"],
    averageSalary: "$70k - $110k",
    growthRate: "+13% (High)",
  },
]

export default function RoadmapPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null)
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>([])
  const [currentWeek, setCurrentWeek] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Load skills from localStorage
    const savedSkills = localStorage.getItem("skillAssessment")
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills)
      setSkills(parsedSkills)
      // Auto-select best career path based on skills
      const bestPath = findBestCareerPath(parsedSkills)
      setSelectedPath(bestPath)
      generateRoadmap(parsedSkills, bestPath)
    }
  }, [])

  const findBestCareerPath = (userSkills: Skill[]): CareerPath => {
    let bestPath = careerPaths[0]
    let highestScore = 0

    careerPaths.forEach((path) => {
      const score = path.requiredSkills.reduce((total, skillId) => {
        const userSkill = userSkills.find((s) => s.id === skillId)
        return total + (userSkill?.level || 0)
      }, 0)

      if (score > highestScore) {
        highestScore = score
        bestPath = path
      }
    })

    return bestPath
  }

  const generateRoadmap = (userSkills: Skill[], path: CareerPath) => {
    const weakSkills = path.requiredSkills
      .map((skillId) => {
        const skill = userSkills.find((s) => s.id === skillId)
        return { skillId, level: skill?.level || 0, skill }
      })
      .filter((s) => s.level < 4)
      .sort((a, b) => a.level - b.level)

    const milestones: RoadmapMilestone[] = [
      {
        id: "foundation",
        title: "Build Strong Foundation",
        description: "Master the fundamental skills needed for your career path",
        targetSkills: weakSkills.slice(0, 2).map((s) => s.skillId),
        duration: "Weeks 1-8",
        priority: "high",
        completed: false,
        tasks: generateDailyTasks(
          "foundation",
          weakSkills.slice(0, 2).map((s) => s.skillId),
        ),
      },
      {
        id: "intermediate",
        title: "Develop Intermediate Skills",
        description: "Advance your knowledge and start building projects",
        targetSkills: weakSkills.slice(2, 4).map((s) => s.skillId),
        duration: "Weeks 9-16",
        priority: "high",
        completed: false,
        tasks: generateDailyTasks(
          "intermediate",
          weakSkills.slice(2, 4).map((s) => s.skillId),
        ),
      },
      {
        id: "advanced",
        title: "Advanced Specialization",
        description: "Specialize in your chosen field and build a portfolio",
        targetSkills: path.requiredSkills,
        duration: "Weeks 17-24",
        priority: "medium",
        completed: false,
        tasks: generateDailyTasks("advanced", path.requiredSkills),
      },
      {
        id: "portfolio",
        title: "Portfolio & Job Prep",
        description: "Create impressive projects and prepare for interviews",
        targetSkills: ["communication", "leadership"],
        duration: "Weeks 25-26",
        priority: "high",
        completed: false,
        tasks: generateDailyTasks("portfolio", ["communication", "leadership"]),
      },
    ]

    setRoadmap(milestones)
  }

  const generateDailyTasks = (phase: string, skillIds: string[]): DailyTask[] => {
    const taskTemplates = {
      foundation: [
        {
          title: "Complete online course module",
          description: "Study fundamental concepts and take notes",
          type: "learn" as const,
          estimatedTime: "45 min",
          resources: ["Coursera", "edX", "Udemy"],
        },
        {
          title: "Practice coding exercises",
          description: "Solve 3-5 beginner problems",
          type: "practice" as const,
          estimatedTime: "30 min",
          resources: ["LeetCode", "HackerRank", "Codewars"],
        },
        {
          title: "Read industry articles",
          description: "Stay updated with latest trends",
          type: "read" as const,
          estimatedTime: "15 min",
          resources: ["Medium", "Dev.to", "TechCrunch"],
        },
      ],
      intermediate: [
        {
          title: "Build mini-project",
          description: "Apply learned concepts in a small project",
          type: "project" as const,
          estimatedTime: "60 min",
          resources: ["GitHub", "CodePen", "Repl.it"],
        },
        {
          title: "Advanced tutorial",
          description: "Follow intermediate-level tutorials",
          type: "learn" as const,
          estimatedTime: "45 min",
          resources: ["YouTube", "FreeCodeCamp", "Pluralsight"],
        },
      ],
      advanced: [
        {
          title: "Contribute to open source",
          description: "Make contributions to existing projects",
          type: "project" as const,
          estimatedTime: "90 min",
          resources: ["GitHub", "GitLab", "First Timers Only"],
        },
        {
          title: "Advanced specialization",
          description: "Deep dive into specialized topics",
          type: "learn" as const,
          estimatedTime: "60 min",
          resources: ["Advanced courses", "Documentation", "Research papers"],
        },
      ],
      portfolio: [
        {
          title: "Portfolio project",
          description: "Work on showcase project",
          type: "project" as const,
          estimatedTime: "120 min",
          resources: ["Personal website", "GitHub", "Behance"],
        },
        {
          title: "Interview preparation",
          description: "Practice technical and behavioral questions",
          type: "practice" as const,
          estimatedTime: "45 min",
          resources: ["Pramp", "InterviewBit", "Glassdoor"],
        },
      ],
    }

    return (
      taskTemplates[phase as keyof typeof taskTemplates]?.map((template, index) => ({
        id: `${phase}-task-${index}`,
        ...template,
        completed: false,
      })) || []
    )
  }

  const getPathMatch = (path: CareerPath): number => {
    const userSkillLevels = path.requiredSkills.map((skillId) => {
      const skill = skills.find((s) => s.id === skillId)
      return skill?.level || 0
    })
    const totalPossible = path.requiredSkills.length * 5
    const totalActual = userSkillLevels.reduce((sum, level) => sum + level, 0)
    return Math.round((totalActual / totalPossible) * 100)
  }

  const toggleTask = (milestoneId: string, taskId: string) => {
    setRoadmap((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task,
              ),
            }
          : milestone,
      ),
    )
  }

  if (!selectedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Complete Your Assessment First</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We need your skill assessment to generate a personalized roadmap.
          </p>
          <Link href="/assessment">
            <Button size="lg" className="px-8 py-4 text-lg font-medium">
              Take Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium animate-glow">
            <Target className="mr-2 h-4 w-4" />
            AI-Generated Roadmap
          </Badge>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Your Personalized{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Career Roadmap
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">A 6-month journey tailored to your skills and career goals</p>
        </div>

        {/* Career Path Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Recommended Career Paths</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careerPaths.map((path) => {
              const matchPercentage = getPathMatch(path)
              const isSelected = selectedPath?.id === path.id

              return (
                <Card
                  key={path.id}
                  className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                    isSelected ? "border-accent animate-glow" : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => {
                    setSelectedPath(path)
                    generateRoadmap(skills, path)
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {path.icon}
                    </div>
                    <CardTitle className="font-serif text-lg">{path.title}</CardTitle>
                    <CardDescription className="text-sm">{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Skill Match</span>
                          <span className="font-medium">{matchPercentage}%</span>
                        </div>
                        <Progress value={matchPercentage} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Salary: {path.averageSalary}</div>
                        <div>Growth: {path.growthRate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Roadmap Content */}
        <Tabs defaultValue="timeline" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid gap-6">
              {roadmap.map((milestone, index) => (
                <Card
                  key={milestone.id}
                  className="border-2 border-border hover:border-accent/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            milestone.completed ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                          }`}
                        >
                          {milestone.completed ? <CheckCircle className="h-6 w-6" /> : <span>{index + 1}</span>}
                        </div>
                        <div>
                          <CardTitle className="font-serif">{milestone.title}</CardTitle>
                          <CardDescription>{milestone.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={milestone.priority === "high" ? "default" : "secondary"}>
                        {milestone.priority} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Duration
                        </h4>
                        <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Target className="mr-2 h-4 w-4" />
                          Target Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {milestone.targetSkills.map((skillId) => {
                            const skill = skills.find((s) => s.id === skillId)
                            return (
                              <Badge key={skillId} variant="outline" className="text-xs">
                                {skill?.name || skillId}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {milestone.tasks.filter((t) => t.completed).length}/{milestone.tasks.length} tasks
                        </span>
                      </div>
                      <Progress
                        value={(milestone.tasks.filter((t) => t.completed).length / milestone.tasks.length) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold mb-2">Week {currentWeek} Tasks</h3>
              <p className="text-muted-foreground">Complete these daily micro-learning tasks</p>
            </div>

            {roadmap.map((milestone) => (
              <Card key={milestone.id} className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {milestone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestone.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                          task.completed
                            ? "bg-accent/5 border-accent/20"
                            : "bg-card border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleTask(milestone.id, task.id)}
                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                              task.completed
                                ? "bg-accent border-accent text-accent-foreground"
                                : "border-accent hover:bg-accent/10"
                            }`}
                          >
                            {task.completed && <CheckCircle className="h-4 w-4" />}
                          </button>
                          <div>
                            <h4 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {task.estimatedTime}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <Link href="/interview">
            <Button size="lg" className="group px-8 py-4 text-lg font-medium animate-glow">
              <Play className="mr-2 h-5 w-5" />
              Start Mock Interview
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
