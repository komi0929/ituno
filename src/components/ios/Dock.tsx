
"use client"

import { LIQUID_GLASS_STYLE } from "@/lib/ios-physics"

interface DockProps {
  children: React.ReactNode
}

// THE DOCK (Floating Glass Platter) - EXACT REFERENCE
export function Dock({ children }: DockProps) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div 
        className="flex h-[96px] w-[90%] max-w-md items-center justify-evenly rounded-[34px]"
        style={LIQUID_GLASS_STYLE}
      >
        {children}
      </div>
    </div>
  )
}
