
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { X } from "lucide-react"; // Import X icon

interface AppIconProps {
  id: string
  title: string
  iconUrl?: string | null
  isJiggling?: boolean
  onClick?: () => void
  onLongPress?: () => void
  onRemove?: () => void // New prop for removing icon
}

export function AppIcon({
  id,
  title,
  iconUrl,
  isJiggling = false,
  onClick,
  onLongPress,
  onRemove,
}: AppIconProps) {
  const longPressProps = useLongPress({
    onLongPress: onLongPress || (() => {}),
    onClick: onClick || (() => {}),
  })

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <motion.button
        {...longPressProps}
        whileTap={{ scale: isJiggling ? 1 : 0.88 }} // Native iOS click scale
        animate={
          isJiggling
            ? {
                rotate: [-2, 2, -2],
                transition: {
                  repeat: Infinity,
                  duration: 0.25, // Fast jiggle
                  ease: "easeInOut",
                },
              }
            : {}
        }
        className={cn(
          "relative h-[62px] w-[62px] overflow-hidden rounded-[14px] bg-zinc-800 shadow-sm transition-shadow", // iOS 18 Icon Size approx
          "after:absolute after:inset-0 after:rounded-[14px] after:ring-1 after:ring-inset after:ring-white/10" // Inner stroke for depth
        )}
      >
        {iconUrl ? (
          <img src={iconUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600 font-bold text-white text-xl">
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
            className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 shadow-md"
          >
            <X className="h-3 w-3 text-black" />
          </div>
        )}
      </motion.button>
      
      {/* Icon Label */}
      <span 
        className="w-[70px] truncate text-center text-[11px] font-medium leading-tight text-white drop-shadow-md select-none"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        {title}
      </span>
    </div>
  )
}
