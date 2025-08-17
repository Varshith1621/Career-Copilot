"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Code, Users, Target, Lightbulb, ArrowRight, ArrowLeft, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  description: string
  category: string
  level: number
}

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  skills: Omit<Skill, "level">[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "technical",
    name: "Technical Skills",
    icon: <Code className="h-6 w-6" />,
    color: "accent",
    skills: [
      { id: "programming", name: "Programming", description: "Writing and understanding code", category: "technical" },
      {
        id: "web-dev",
        name: "Web Development",
        description: "Building websites and web applications",
        category: "technical",
      },
      {
        id: "data-analysis",
        name: "Data Analysis",
        description: "Interpreting and analyzing data",
        category: "technical",
      },
      {
        id: "ai-ml",
        name: "AI/Machine Learning",
        description: "Understanding AI and ML concepts",
        category: "technical",
      },
      { id: "cloud", name: "Cloud Computing", description: "Working with cloud platforms", category: "technical" },
    ],
  },
  {
    id: "soft-skills",
    name: "Soft Skills",
    icon: <Users className="h-6 w-6" />,
    color: "secondary",
    skills: [
      { id: "communication", name: "Communication", description: "Expressing ideas clearly", category: "soft-skills" },
      { id: "leadership", name: "Leadership", description: "Guiding and inspiring others", category: "soft-skills" },
      { id: "teamwork", name: "Teamwork", description: "Collaborating effectively", category: "soft-skills" },
      {
        id: "problem-solving",
        name: "Problem Solving",
        description: "Finding creative solutions",
        category: "soft-skills",
      },
      { id: "adaptability", name: "Adaptability", description: "Adjusting to change", category: "soft-skills" },
    ],
  },
  {
    id: "creative",
    name: "Creative Skills",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "accent",
    skills: [
      { id: "design", name: "Design", description: "Creating visual solutions", category: "creative" },
      { id: "writing", name: "Writing", description: "Crafting compelling content", category: "creative" },
      { id: "video-editing", name: "Video Editing", description: "Creating and editing videos", category: "creative" },
      { id: "marketing", name: "Marketing", description: "Promoting products and ideas", category: "creative" },
      { id: "innovation", name: "Innovation", description: "Generating new ideas", category: "creative" },
    ],
  },
]

export default function SkillAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [skills, setSkills] = useState<Skill[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Initialize skills with level 0
    const initialSkills: Skill[] = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({ ...skill, level: 0 })),
    )
    setSkills(initialSkills)
  }, [])

  const updateSkillLevel = (skillId: string, level: number) => {
    setSkills((prev) => prev.map((skill) => (skill.id === skillId ? { ...skill, level } : skill)))
  }

  const getCurrentCategory = () => skillCategories[currentStep]
  const getCurrentSkills = () => skills.filter((skill) => skill.category === getCurrentCategory()?.id)

  const handleNext = () => {
    if (currentStep < skillCategories.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
      // Save to localStorage
      localStorage.setItem("skillAssessment", JSON.stringify(skills))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getOverallProgress = () => {
    const totalSkills = skills.length
    const assessedSkills = skills.filter((skill) => skill.level > 0).length
    return totalSkills > 0 ? (assessedSkills / totalSkills) * 100 : 0
  }

  const getAverageLevel = (categoryId: string) => {
    const categorySkills = skills.filter((skill) => skill.category === categoryId)
    const totalLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0)
    return categorySkills.length > 0 ? totalLevel / categorySkills.length : 0
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-slide-in-up">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4 animate-glow">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Assessment Complete!</h1>
            <p className="text-lg text-muted-foreground">
              Your skill profile has been analyzed. Here's your personalized overview.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {skillCategories.map((category) => {
              const avgLevel = getAverageLevel(category.id)
              const percentage = (avgLevel / 5) * 100

              return (
                <Card key={category.id} className="border-2 hover:border-accent/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      {category.icon}
                    </div>
                    <CardTitle className="font-serif">{category.name}</CardTitle>
                    <CardDescription>Average Level: {avgLevel.toFixed(1)}/5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={percentage} className="mb-4" />
                    <div className="space-y-2">
                      {skills
                        .filter((skill) => skill.category === category.id)
                        .slice(0, 3)
                        .map((skill) => (
                          <div key={skill.id} className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= skill.level ? "text-accent fill-accent" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/roadmap">
              <Button size="lg" className="group px-8 py-4 text-lg font-medium animate-glow">
                <Target className="mr-2 h-5 w-5" />
                Generate My Roadmap
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentCategory = getCurrentCategory()
  const currentSkills = getCurrentSkills()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Brain className="mr-2 h-4 w-4" />
            AI Skill Analysis
          </Badge>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Assess Your{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Rate your current skill level to get personalized career recommendations
          </p>
          <Progress value={getOverallProgress()} className="max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">{Math.round(getOverallProgress())}% Complete</p>
        </div>

        {/* Current Category */}
        <Card className="mb-8 border-2 border-accent/20 animate-slide-in-up">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
              {currentCategory?.icon}
            </div>
            <CardTitle className="text-2xl font-serif">{currentCategory?.name}</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {skillCategories.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentSkills.map((skill) => (
              <div key={skill.id} className="space-y-3">
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Skill Level:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => updateSkillLevel(skill.id, level)}
                        className={`p-1 rounded transition-all duration-200 ${
                          skill.level >= level
                            ? "text-accent hover:text-accent/80"
                            : "text-muted-foreground hover:text-accent/50"
                        }`}
                      >
                        <Star className={`h-6 w-6 ${skill.level >= level ? "fill-accent" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {skill.level === 0 && "Click stars to rate your skill level"}
                  {skill.level === 1 && "Beginner - Just getting started"}
                  {skill.level === 2 && "Novice - Some basic knowledge"}
                  {skill.level === 3 && "Intermediate - Comfortable with basics"}
                  {skill.level === 4 && "Advanced - Strong understanding"}
                  {skill.level === 5 && "Expert - Highly proficient"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentSkills.some((skill) => skill.level === 0)} className="px-6">
            {currentStep === skillCategories.length - 1 ? "Complete Assessment" : "Next Category"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
