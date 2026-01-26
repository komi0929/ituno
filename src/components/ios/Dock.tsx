
"use client"

import { LIQUID_PHYSICS } from "@/lib/ios-physics"

interface DockProps {
  children: React.ReactNode
}

// THE DOCK (The Floating Meniscus)
export function Dock({ children }: DockProps) {
  return (
    <div className="relative z-50 px-4 pb-8 pt-4">
      <div 
        className="mx-auto flex h-[96px] w-full max-w-[360px] items-center justify-evenly rounded-[36px]"
        style={LIQUID_PHYSICS}
      >
        {children}
      </div>
    </div>
  )
}
