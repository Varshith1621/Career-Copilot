"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Target, Users, Zap, Star, TrendingUp, Award, Rocket } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-secondary/10" />

        <div
          className={`relative mx-auto max-w-7xl text-center transition-all duration-1000 ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
        >
          <div className="mb-8 flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium animate-glow">
              <Rocket className="mr-2 h-4 w-4" />
              AI-Powered Career Intelligence
            </Badge>
          </div>

          <h1 className="mb-6 text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Future-Proof Your{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Career Journey
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Get personalized AI guidance, skill roadmaps, and mock interviews designed for Gen Z professionals.
            Transform confusion into career clarity.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/assessment">
              <Button size="lg" className="group px-8 py-4 text-lg font-medium">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-medium bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-10 top-20 animate-float">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 blur-xl" />
        </div>
        <div className="absolute right-10 top-40 animate-float" style={{ animationDelay: "1s" }}>
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-foreground sm:text-4xl mb-4">
              AI-Powered Career Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced algorithms analyze your potential and guide you toward the perfect career path
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Smart Skill Analysis</CardTitle>
                <CardDescription>AI evaluates your current skills and identifies gaps in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-accent" />
                    Comprehensive skill mapping
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-accent" />
                    Industry benchmarking
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-accent" />
                    Personalized recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-secondary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">Personalized Roadmaps</CardTitle>
                <CardDescription>Custom learning paths tailored to your goals and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-secondary" />
                    6-month skill sprints
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-secondary" />
                    Daily micro-learning
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-secondary" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">AI Mock Interviews</CardTitle>
                <CardDescription>Practice with AI interviewers and get instant feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-accent" />
                    Industry-specific scenarios
                  </li>
                  <li className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-accent" />
                    Real-time feedback
                  </li>
                  <li className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-accent" />
                    Confidence building
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-accent/5 to-secondary/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-serif font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Career clarity improvement</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-serif font-bold text-secondary">6x</div>
              <div className="text-sm text-muted-foreground">Faster skill development</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-serif font-bold text-accent">50k+</div>
              <div className="text-sm text-muted-foreground">Gen Z professionals guided</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-serif font-bold text-foreground sm:text-4xl">
            Ready to Transform Your Career?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of Gen Z professionals who've already future-proofed their careers with AI guidance.
          </p>
          <Button size="lg" className="group px-8 py-4 text-lg font-medium animate-glow">
            <Zap className="mr-2 h-5 w-5" />
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  )
}
