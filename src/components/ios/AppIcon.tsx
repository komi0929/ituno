
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

interface AppIconProps {
  id: string
  title: string
  iconUrl?: string | null
  isJiggling?: boolean
  onClick?: () => void
  onLongPress?: () => void
  onRemove?: () => void
}

/**
 * AppIcon
 * 
 * Replicates iOS App Icon physics.
 * - Squircle shape (approx rounded-[22%])
 * - Spring animation on tap
 * - Jiggle animation (randomized rotation)
 * - Remove button in jiggle mode
 */
export function AppIcon({
  id,
  title,
  iconUrl,
  isJiggling = false,
  onClick,
  onLongPress,
  onRemove,
}: AppIconProps) {
  // Randomize start time of jiggle to avoid robotic sync
  const jiggleDelay = Math.random() * -0.5

  const longPressProps = useLongPress(() => {
    onLongPress?.()
  }, {
    threshold: 500,
  })
  
  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* Remove Badge (Jiggle Mode Only) */}
      <AnimatePresence>
        {isJiggling && onRemove && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="absolute -left-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-white shadow-sm backdrop-blur-sm dark:bg-gray-600"
          >
            <span className="h-[2px] w-3 bg-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={`icon-${id}`}
        whileTap={{ scale: 0.88 }} // Classic iOS press depth
        animate={
          isJiggling
            ? {
                rotate: [-1.5, 1.5],
                transition: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.25,
                  ease: "easeInOut",
                  delay: jiggleDelay,
                },
              }
            : { rotate: 0 }
        }
        onTap={!isJiggling ? onClick : undefined}
        {...longPressProps}
        className="group relative"
      >
        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-[14px] bg-white shadow-sm transition-shadow group-hover:shadow-md dark:bg-zinc-800 md:h-[68px] md:w-[68px] md:rounded-[16px]">
          {iconUrl ? (
            <Image
              src={iconUrl}
              alt={title}
              fill
              className="object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-800 dark:to-zinc-900">
               {/* Default Grid Pattern */}
               <div className="grid grid-cols-2 gap-1 opacity-20">
                 <div className="h-4 w-4 rounded-sm bg-black dark:bg-white" />
                 <div className="h-4 w-4 rounded-sm bg-black dark:bg-white" />
                 <div className="h-4 w-4 rounded-sm bg-black dark:bg-white" />
                 <div className="h-4 w-4 rounded-sm bg-black dark:bg-white" />
               </div>
            </div>
          )}
          {/* Shine effect (subtle) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-white/5 to-white/10 opacity-50" />
        </div>
      </motion.button>

      {/* Label */}
      <span className={cn(
        "max-w-[70px] truncate text-center text-[11px] font-medium leading-none tracking-tight text-white drop-shadow-md md:text-[12px]",
        isJiggling && "animate-pulse" // Subtle hint that labels can change
      )}>
        {title}
      </span>
    </div>
  )
}
