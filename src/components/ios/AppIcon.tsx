
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
          "relative flex items-center justify-center h-[60px] w-[60px] overflow-hidden rounded-[14px] transition-all duration-200",
          "bg-white/20 backdrop-blur-xl border border-white/30",
          "shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
          "active:scale-95"
        )}
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            className="h-10 w-10 object-contain"
            onError={(e) => {
              // Fallback to letter if image fails
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        {/* Fallback letter - shown if no icon or icon fails to load */}
        <div className={cn(
          "flex h-full w-full items-center justify-center font-bold text-white text-2xl",
          iconUrl ? "hidden" : ""
        )}>
          {title.charAt(0).toUpperCase()}
        </div>

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
