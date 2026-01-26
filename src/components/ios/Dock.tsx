
"use client"

import { LIQUID_STYLE } from "@/lib/ios-physics"

interface DockProps {
  children: React.ReactNode
}

// DOCK: NO BORDER, JUST VOLUME
export function Dock({ children }: DockProps) {
  return (
    <div className="relative z-50 w-full shrink-0 px-4 pb-8 pt-2 flex justify-center">
      <div 
        className="flex h-[92px] w-full max-w-[360px] items-center justify-evenly rounded-[36px]"
        style={LIQUID_STYLE}
      >
        {children}
      </div>
    </div>
  )
}
