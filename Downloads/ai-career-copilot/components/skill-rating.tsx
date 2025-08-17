"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface SkillRatingProps {
  skillName: string
  description: string
  value: number
  onChange: (value: number) => void
}

export function SkillRating({ skillName, description, value, onChange }: SkillRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Beginner"
      case 2:
        return "Novice"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Not rated"
    }
  }

  return (
    <div className="space-y-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all duration-200">
      <div>
        <h3 className="font-medium text-foreground">{skillName}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onMouseEnter={() => setHoverValue(rating)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => onChange(rating)}
              className="p-1 rounded transition-all duration-200 hover:scale-110"
            >
              <Star
                className={`h-6 w-6 transition-colors duration-200 ${
                  rating <= (hoverValue || value)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground hover:text-accent/50"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="text-sm font-medium text-accent">{getRatingText(hoverValue || value)}</div>
      </div>
    </div>
  )
}
