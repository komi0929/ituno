
"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * PhoneFrame - Immersive iOS Experience
 * 
 * - Mobile: 100% Fullscreen, no borders.
 * - Desktop: Centered content max-width, full-height.
 * - Background is transparent to allow wallpaper to show through.
 */
export function PhoneFrame({ children, className, ...props }: PhoneFrameProps) {
  return (
    <div className={cn("relative flex h-full min-h-screen w-full justify-center overflow-hidden", className)} {...props}>
      {/* Content Container - TRANSPARENT to show wallpaper */}
      <div className="relative h-full min-h-screen w-full max-w-[430px] overflow-hidden">
        {/* Main Content Area */}
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  )
}
