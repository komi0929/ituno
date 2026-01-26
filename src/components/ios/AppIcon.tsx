
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
    <div className="relative flex flex-col items-center gap-1.5">
      <motion.button
        {...longPressProps}
        whileTap={{ scale: isJiggling ? 1 : 0.88 }}
        animate={
          isJiggling
            ? {
                rotate: [-1.5, 1.5, -1.5],
                transition: {
                  repeat: Infinity,
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }
            : {}
        }
        className={cn(
          "relative h-[60px] w-[60px] overflow-hidden rounded-[16px] transition-all duration-200",
          "liquid-icon", // iOS 26 Liquid Glass icon style
          "active:scale-95"
        )}
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            className="h-full w-full object-cover"
            style={{ 
              mixBlendMode: 'normal',
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/30 to-white/10 font-semibold text-white text-2xl">
            {title.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Remove Button in Jiggle Mode */}
        {isJiggling && onRemove && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm shadow-md"
          >
            <X className="h-3 w-3 text-white" />
          </div>
        )}
      </motion.button>
      
      {/* Icon Label */}
      {showLabel && (
        <span 
          className="w-[72px] truncate text-center text-[11px] font-medium leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
        >
          {title}
        </span>
      )}
    </div>
  )
}
