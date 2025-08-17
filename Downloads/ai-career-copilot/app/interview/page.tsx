"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  RotateCcw,
  Mic,
  MicOff,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Users,
  Code,
  Briefcase,
} from "lucide-react"

interface InterviewQuestion {
  id: string
  question: string
  type: "behavioral" | "technical" | "situational"
  category: string
  difficulty: "easy" | "medium" | "hard"
  expectedPoints: string[]
  timeLimit: number
}

interface InterviewSession {
  id: string
  type: string
  questions: InterviewQuestion[]
  currentQuestionIndex: number
  responses: InterviewResponse[]
  startTime: Date
  isActive: boolean
  isRecording: boolean
}

interface InterviewResponse {
  questionId: string
  response: string
  timeSpent: number
  score: number
  feedback: string
}

interface InterviewType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  duration: string
  questions: InterviewQuestion[]
}

const interviewTypes: InterviewType[] = [
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "Common behavioral questions to assess soft skills and cultural fit",
    icon: <Users className="h-6 w-6" />,
    color: "accent",
    duration: "30 min",
    questions: [
      {
        id: "behavioral-1",
        question: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
        type: "behavioral",
        category: "Teamwork",
        difficulty: "medium",
        expectedPoints: ["Specific situation", "Actions taken", "Positive outcome", "Lessons learned"],
        timeLimit: 180,
      },
      {
        id: "behavioral-2",
        question: "Describe a challenging project you worked on. What made it challenging and how did you overcome it?",
        type: "behavioral",
        category: "Problem Solving",
        difficulty: "medium",
        expectedPoints: ["Clear challenge description", "Problem-solving approach", "Results achieved"],
        timeLimit: 180,
      },
      {
        id: "behavioral-3",
        question: "Tell me about a time when you had to learn something new quickly. How did you approach it?",
        type: "behavioral",
        category: "Adaptability",
        difficulty: "easy",
        expectedPoints: ["Learning strategy", "Time management", "Application of knowledge"],
        timeLimit: 150,
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Interview",
    description: "Technical questions to assess programming and problem-solving skills",
    icon: <Code className="h-6 w-6" />,
    color: "secondary",
    duration: "45 min",
    questions: [
      {
        id: "technical-1",
        question: "Explain the difference between let, const, and var in JavaScript. When would you use each?",
        type: "technical",
        category: "JavaScript",
        difficulty: "easy",
        expectedPoints: ["Scope differences", "Hoisting behavior", "Reassignment rules", "Use cases"],
        timeLimit: 120,
      },
      {
        id: "technical-2",
        question: "How would you optimize a slow-loading web page? Walk me through your debugging process.",
        type: "technical",
        category: "Performance",
        difficulty: "medium",
        expectedPoints: ["Performance analysis tools", "Common bottlenecks", "Optimization strategies"],
        timeLimit: 240,
      },
      {
        id: "technical-3",
        question: "Design a simple REST API for a todo application. What endpoints would you create?",
        type: "technical",
        category: "System Design",
        difficulty: "medium",
        expectedPoints: ["CRUD operations", "HTTP methods", "Status codes", "Data structure"],
        timeLimit: 300,
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership Interview",
    description: "Questions focused on leadership potential and management skills",
    icon: <Briefcase className="h-6 w-6" />,
    color: "accent",
    duration: "35 min",
    questions: [
      {
        id: "leadership-1",
        question: "Describe your leadership style. How do you motivate team members with different personalities?",
        type: "behavioral",
        category: "Leadership",
        difficulty: "hard",
        expectedPoints: ["Leadership philosophy", "Adaptation strategies", "Specific examples"],
        timeLimit: 200,
      },
      {
        id: "leadership-2",
        question: "Tell me about a time when you had to make a difficult decision with limited information.",
        type: "situational",
        category: "Decision Making",
        difficulty: "hard",
        expectedPoints: ["Decision framework", "Risk assessment", "Stakeholder consideration"],
        timeLimit: 180,
      },
    ],
  },
]

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null)
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [currentResponse, setCurrentResponse] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (session?.isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && session?.isActive) {
      handleNextQuestion()
    }
    return () => clearInterval(interval)
  }, [session?.isActive, timeRemaining])

  const startInterview = (type: InterviewType) => {
    const newSession: InterviewSession = {
      id: `interview-${Date.now()}`,
      type: type.id,
      questions: type.questions,
      currentQuestionIndex: 0,
      responses: [],
      startTime: new Date(),
      isActive: true,
      isRecording: false,
    }
    setSession(newSession)
    setTimeRemaining(type.questions[0].timeLimit)
    setCurrentResponse("")
    setShowResults(false)
  }

  const handleNextQuestion = () => {
    if (!session) return

    // Score current response
    const currentQuestion = session.questions[session.currentQuestionIndex]
    const score = scoreResponse(currentResponse, currentQuestion)
    const feedback = generateFeedback(currentResponse, currentQuestion, score)

    const newResponse: InterviewResponse = {
      questionId: currentQuestion.id,
      response: currentResponse,
      timeSpent: currentQuestion.timeLimit - timeRemaining,
      score,
      feedback,
    }

    const updatedSession = {
      ...session,
      responses: [...session.responses, newResponse],
    }

    if (session.currentQuestionIndex < session.questions.length - 1) {
      // Move to next question
      const nextIndex = session.currentQuestionIndex + 1
      setSession({
        ...updatedSession,
        currentQuestionIndex: nextIndex,
      })
      setTimeRemaining(session.questions[nextIndex].timeLimit)
      setCurrentResponse("")
    } else {
      // Interview complete
      setSession({
        ...updatedSession,
        isActive: false,
      })
      setShowResults(true)
      // Save to localStorage
      const savedInterviews = JSON.parse(localStorage.getItem("interviewHistory") || "[]")
      savedInterviews.push(updatedSession)
      localStorage.setItem("interviewHistory", JSON.stringify(savedInterviews))
    }
  }

  const scoreResponse = (response: string, question: InterviewQuestion): number => {
    if (!response.trim()) return 0

    const words = response.toLowerCase().split(/\s+/)
    const expectedPoints = question.expectedPoints.map((point) => point.toLowerCase())

    let score = 0
    let pointsCovered = 0

    // Check for expected points
    expectedPoints.forEach((point) => {
      const pointWords = point.split(/\s+/)
      const hasPoint = pointWords.some((word) => words.includes(word))
      if (hasPoint) pointsCovered++
    })

    // Base score on coverage of expected points
    score = (pointsCovered / expectedPoints.length) * 70

    // Bonus for response length (indicates detail)
    if (words.length > 50) score += 10
    if (words.length > 100) score += 10
    if (words.length > 150) score += 10

    return Math.min(100, Math.round(score))
  }

  const generateFeedback = (response: string, question: InterviewQuestion, score: number): string => {
    if (score >= 80) {
      return "Excellent response! You covered the key points well and provided good detail. Your answer demonstrates strong understanding and experience."
    } else if (score >= 60) {
      return "Good response! You touched on some important points. Consider adding more specific examples and details to strengthen your answer."
    } else if (score >= 40) {
      return "Decent start, but your response could be more comprehensive. Try to address more of the key points and provide specific examples."
    } else {
      return "Your response needs more development. Focus on providing specific examples and addressing the core aspects of the question."
    }
  }

  const getOverallScore = (): number => {
    if (!session?.responses.length) return 0
    const totalScore = session.responses.reduce((sum, response) => sum + response.score, 0)
    return Math.round(totalScore / session.responses.length)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showResults && session) {
    const overallScore = getOverallScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-slide-in-up">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4 animate-glow">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Interview Complete!</h1>
            <p className="text-lg text-muted-foreground">Here's your detailed performance analysis</p>
          </div>

          <Card className="mb-8 border-2 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Overall Score</CardTitle>
              <div className="text-4xl font-bold text-accent mt-2">{overallScore}/100</div>
              <Progress value={overallScore} className="mt-4" />
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {session.responses.map((response, index) => {
              const question = session.questions.find((q) => q.id === response.questionId)
              return (
                <Card key={response.questionId} className="border-2 border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-serif">Question {index + 1}</CardTitle>
                        <CardDescription className="mt-2">{question?.question}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">{response.score}/100</div>
                        <div className="text-sm text-muted-foreground">Time: {formatTime(response.timeSpent)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Your Response:</h4>
                        <div className="bg-muted/50 p-3 rounded-lg text-sm">{response.response}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Feedback:</h4>
                        <div className="text-sm text-muted-foreground">{response.feedback}</div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Key Points to Cover:</h4>
                        <div className="flex flex-wrap gap-2">
                          {question?.expectedPoints.map((point, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12 space-y-4">
            <Button
              size="lg"
              onClick={() => {
                setSession(null)
                setShowResults(false)
                setSelectedType(null)
              }}
              className="px-8 py-4 text-lg font-medium"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Another Interview
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (session?.isActive) {
    const currentQuestion = session.questions[session.currentQuestionIndex]
    const progress = ((session.currentQuestionIndex + 1) / session.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Interview Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium animate-glow">
              <Brain className="mr-2 h-4 w-4" />
              AI Interview in Progress
            </Badge>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-sm text-muted-foreground">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>

          {/* AI Avatar */}
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center mb-4 animate-glow">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">AI Interviewer</p>
          </div>

          {/* Current Question */}
          <Card className="mb-8 border-2 border-accent/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {currentQuestion.category}
                  </Badge>
                  <CardTitle className="font-serif text-xl">{currentQuestion.question}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Clock className="mr-1 h-4 w-4" />
                    {formatTime(timeRemaining)}
                  </div>
                  <Badge variant={timeRemaining < 30 ? "destructive" : "secondary"}>{currentQuestion.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your response here... (In a real interview, you would speak your answer)"
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">{currentResponse.length} characters</div>
                  <Button onClick={handleNextQuestion} disabled={!currentResponse.trim()} className="px-6">
                    {session.currentQuestionIndex === session.questions.length - 1
                      ? "Finish Interview"
                      : "Next Question"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recording Simulation */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className={`${session.isRecording ? "bg-red-500/10 border-red-500/50" : ""}`}
                onClick={() => setSession({ ...session, isRecording: !session.isRecording })}
              >
                {session.isRecording ? <Mic className="h-4 w-4 text-red-500" /> : <MicOff className="h-4 w-4" />}
                {session.isRecording ? "Recording..." : "Start Recording"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Simulated recording - In a real interview, this would capture your voice
              </p>
            </div>
          </div>
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
            <Brain className="mr-2 h-4 w-4" />
            AI Mock Interview
          </Badge>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Practice with{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              AI Interviewers
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get real-time feedback and improve your interview skills with AI-powered simulations
          </p>
        </div>

        {/* Interview Types */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {interviewTypes.map((type) => (
            <Card
              key={type.id}
              className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg hover:border-accent/50 ${
                selectedType?.id === type.id ? "border-accent animate-glow" : "border-border"
              }`}
              onClick={() => setSelectedType(type)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                  {type.icon}
                </div>
                <CardTitle className="font-serif">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{type.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span className="font-medium">{type.questions.length}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Topics:</div>
                    <div className="flex flex-wrap gap-1">
                      {type.questions.slice(0, 3).map((q, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {q.category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Interview */}
        {selectedType && (
          <div className="text-center animate-slide-in-up">
            <Card className="max-w-2xl mx-auto border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Ready to Start?</CardTitle>
                <CardDescription>
                  You've selected the {selectedType.title}. This will take approximately {selectedType.duration}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      Interview Tips
                    </div>
                    <ul className="text-left space-y-1 max-w-md mx-auto">
                      <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                      <li>• Provide specific examples from your experience</li>
                      <li>• Take your time to think before answering</li>
                      <li>• Be honest and authentic in your responses</li>
                    </ul>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => startInterview(selectedType)}
                    className="group px-8 py-4 text-lg font-medium animate-glow"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start Interview
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
