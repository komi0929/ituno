"use client"

import {
    DOCK_BACKGROUND,
    DOCK_BLUR,
    DOCK_BORDER_RADIUS,
    DOCK_HEIGHT,
} from "@/lib/ios-constants"

interface DockProps {
  children: React.ReactNode
}

/**
 * iOS Dock - Frosted glass background
 * - Full width with horizontal padding
 * - 4 icons evenly distributed
 * - No labels on dock icons
 */
export function Dock({ children }: DockProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-2 pb-2">
      <div 
        className="flex w-full items-center justify-evenly"
        style={{
          height: DOCK_HEIGHT,
          borderRadius: DOCK_BORDER_RADIUS,
          background: DOCK_BACKGROUND,
          backdropFilter: `blur(${DOCK_BLUR}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${DOCK_BLUR}px) saturate(180%)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
