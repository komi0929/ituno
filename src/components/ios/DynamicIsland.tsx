
"use client"

import { cn } from "@/lib/utils"

interface DynamicIslandProps {
  state: "idle" | "active" | "expanded"
  className?: string
}

export function DynamicIsland({ state, className }: DynamicIslandProps) {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "liquid-glass-dark rounded-full",
        state === "idle" && "h-[32px] w-[120px]",
        state === "active" && "h-[36px] w-[140px]",
        state === "expanded" && "h-[80px] w-[320px] rounded-[24px]",
        className
      )}
    />
  )
}
