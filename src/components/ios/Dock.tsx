
"use client"

import { cn } from "@/lib/utils"

interface DockProps {
  children: React.ReactNode
}

export function Dock({ children }: DockProps) {
  return (
    <div className="absolute bottom-2 left-2 right-2 z-10">
      {/* Dock - Wide, spans screen, less rounded like real iPhone */}
      <div 
        className={cn(
          "relative flex h-[84px] w-full items-center justify-evenly px-3",
          // Wider dock with less rounded corners
          "rounded-[26px]",
          // Enhanced Liquid Glass with specular highlight
          "bg-white/15 backdrop-blur-2xl",
          "border border-white/25",
          // Shadow for depth
          "shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        )}
        style={{
          // Specular highlight gradient overlay for 3D glossy "wet" look
          backgroundImage: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.25) 0%,
              rgba(255,255,255,0.05) 50%,
              rgba(255,255,255,0.0) 100%
            )
          `,
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Inner highlight line at top */}
        <div 
          className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%)'
          }}
        />
        {children}
      </div>
    </div>
  )
}
