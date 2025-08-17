"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Brain, Target, Users, BarChart3, Menu } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Assessment", href: "/assessment", icon: Brain },
  { name: "Roadmap", href: "/roadmap", icon: Target },
  { name: "Interview", href: "/interview", icon: Users },
  { name: "Market", href: "/market", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full ${isActive ? "animate-glow" : ""}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-16 left-4 bg-background border border-border rounded-lg p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${isActive ? "animate-glow" : ""}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
