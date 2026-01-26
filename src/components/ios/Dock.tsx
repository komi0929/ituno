
"use client"

import { cn } from "@/lib/utils"

interface DockProps {
  children: React.ReactNode
}

export function Dock({ children }: DockProps) {
  return (
    <div className="absolute bottom-5 left-4 right-4 z-10 mx-auto">
      <div className={cn(
        "flex h-[96px] w-full items-center justify-evenly rounded-[35px]",
        "bg-white/20 backdrop-blur-[25px] saturate-150", // Authentic Glassmorphism
        "border border-white/10 shadow-lg"
      )}>
        {children}
      </div>
    </div>
  )
}
