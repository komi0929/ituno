
"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * PhoneFrame
 * 
 * Renders an iPhone 15/16 Pro style bezel on desktop,
 * and a full-screen view on mobile.
 */
export function PhoneFrame({ children, className, ...props }: PhoneFrameProps) {
  return (
    <div className={cn("relative flex h-full w-full justify-center overflow-hidden bg-gray-100 dark:bg-zinc-900 md:items-center md:py-8", className)} {...props}>
      {/* Mobile Wrapper (Bezel hidden on mobile via CSS/Structure, but effectively fullscreen) */}
      <div className="relative h-full w-full overflow-hidden bg-background md:h-[852px] md:w-[393px] md:rounded-[55px] md:border-[8px] md:border-zinc-900 md:shadow-2xl">
        
        {/* Dynamic Island Area (Placeholder for absolute positioning context) */}
        <div className="pointer-events-none absolute top-0 z-50 flex w-full justify-center pt-2">
           {/* Dynamic Island component will go here */}
        </div>
        
        {/* Screen Content */}
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>

        {/* Hardware Buttons (Decorative, Desktop Only) */}
        <div className="absolute -left-[10px] top-24 hidden h-8 w-[3px] rounded-l-md bg-zinc-800 md:block" /> {/* Action Button */}
        <div className="absolute -left-[10px] top-36 hidden h-16 w-[3px] rounded-l-md bg-zinc-800 md:block" /> {/* Volume Up */}
        <div className="absolute -left-[10px] top-56 hidden h-16 w-[3px] rounded-l-md bg-zinc-800 md:block" /> {/* Volume Down */}
        <div className="absolute -right-[10px] top-44 hidden h-24 w-[3px] rounded-r-md bg-zinc-800 md:block" /> {/* Power */}
      </div>
    </div>
  )
}
