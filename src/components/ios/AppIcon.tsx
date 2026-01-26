
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface AppIconProps {
  id: string
  title: string
  iconUrl?: string | null
  isJiggling?: boolean
  onClick?: () => void
  onLongPress?: () => void
  onRemove?: () => void
  showLabel?: boolean
}

export function AppIcon({
  id,
  title,
  iconUrl,
  isJiggling = false,
  onClick,
  onLongPress,
  onRemove,
  showLabel = true,
}: AppIconProps) {
  const longPressProps = useLongPress(
    onLongPress || (() => {}),
    {
      onCancel: onClick,
    }
  )

  return (
    <div className="relative flex flex-col items-center gap-[6px]">
      <motion.button
        {...longPressProps}
        whileTap={{ scale: isJiggling ? 1 : 0.85 }}
        animate={
          isJiggling
            ? {
                rotate: [-1.5, 1.5, -1.5],
                transition: {
                  repeat: Infinity,
                  duration: 0.15,
                  ease: "easeInOut",
                },
              }
            : {}
        }
        className={cn(
          // Full-bleed icon - NO glass container, NO padding, NO border
          "relative h-[60px] w-[60px] overflow-hidden rounded-[14px]",
          // Shadow for depth
          "shadow-lg",
          "active:brightness-90 transition-all duration-150"
        )}
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            className="h-full w-full object-cover" // Full-bleed, no padding
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.nextElementSibling) {
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'
              }
            }}
          />
        ) : null}
        {/* Fallback letter */}
        <div 
          className={cn(
            "h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white text-2xl",
            iconUrl ? "hidden" : "flex"
          )}
          style={{ display: iconUrl ? 'none' : 'flex' }}
        >
          {title.charAt(0).toUpperCase()}
        </div>

        {/* Remove Button in Jiggle Mode */}
        {isJiggling && onRemove && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="absolute -left-1 -top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-zinc-800/90 border border-white/20 shadow-md"
          >
            <X className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </motion.button>
      
      {/* Icon Label - White with text-shadow */}
      {showLabel && (
        <span 
          className="w-[74px] truncate text-center text-[11px] font-medium leading-tight text-white select-none"
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif',
            textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0px 1px rgba(0,0,0,0.3)'
          }}
        >
          {title}
        </span>
      )}
    </div>
  )
}
