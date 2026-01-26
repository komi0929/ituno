
"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * PhoneFrame - Immersive Redesign
 * 
 * - Mobile: 100% Fullscreen, no borders.
 * - Desktop: Centered content max-width, full-height, no fake bezel.
 *   The background should be applied to the inner container or passed down.
 */
export function PhoneFrame({ children, className, ...props }: PhoneFrameProps) {
  return (
    <div className={cn("relative flex h-full min-h-screen w-full justify-center overflow-hidden bg-black", className)} {...props}>
      {/* Content Container */}
      <div className="relative h-full min-h-screen w-full max-w-[430px] overflow-hidden bg-background shadow-2xl">
        
        {/* Dynamic Island Context (Absolute top centered) */}
        <div className="pointer-events-none absolute top-0 z-50 flex w-full justify-center pt-3">
           {/* Dynamic Island component will be injected here by children if needed, 
               or handled inside the page. This is just for structural consistency if we added a slot later.
               For now, we let children handle the absolute positioning of the island. */}
        </div>
        
        {/* Main Content Area */}
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>

      </div>
    </div>
  )
}
