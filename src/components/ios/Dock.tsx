
"use client"

import { cn } from "@/lib/utils"

interface DockProps {
  children: React.ReactNode
}

export function Dock({ children }: DockProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 mx-auto">
      <div className={cn(
        "flex h-[88px] w-full items-center justify-evenly rounded-[32px] px-4",
        "liquid-dock" // iOS 26 Liquid Glass Dock
      )}>
        {children}
      </div>
    </div>
  )
}
