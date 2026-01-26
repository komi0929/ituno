
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
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
    <div className="relative flex flex-col items-center">
      <motion.button
        {...longPressProps}
        whileTap={{ scale: isJiggling ? 1 : 0.9 }}
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
        // EXACT: 60px, rounded-[14px] (squircle), shadow-sm, NO border
        className="relative h-[60px] w-[60px] overflow-hidden rounded-[14px] shadow-sm"
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            // EXACT: object-cover, fill 100%
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        {/* Fallback */}
        <div 
          className="h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white text-2xl"
          style={{ display: iconUrl ? 'none' : 'flex' }}
        >
          {title.charAt(0).toUpperCase()}
        </div>

        {/* Remove button in jiggle mode */}
        {isJiggling && onRemove && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 shadow"
          >
            <X className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </motion.button>
      
      {/* EXACT: text-[11px] text-white drop-shadow-md font-medium mt-1 */}
      {showLabel && (
        <span 
          className="mt-1 w-[70px] truncate text-center text-[11px] font-medium text-white drop-shadow-md"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
        >
          {title}
        </span>
      )}
    </div>
  )
}
