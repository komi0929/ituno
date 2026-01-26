
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import { ICON_LIFT, SQUIRCLE } from "@/lib/ios-physics"
import { X } from "lucide-react"

interface AppIconProps {
  id: string
  title: string
  iconUrl?: string | null
  color?: string
  isJiggling?: boolean
  onClick?: () => void
  onLongPress?: () => void
  onRemove?: () => void
  showLabel?: boolean
}

/* --- INTERACTION --- */
export function AppIcon({
  id,
  title,
  iconUrl,
  color = "#171515",
  isJiggling = false,
  onClick,
  onLongPress,
  onRemove,
  showLabel = true,
}: AppIconProps) {
  const longPressProps = useLongPress(
    onLongPress || (() => {}),
    { onCancel: onClick }
  )

  return (
    <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
      <div 
        {...longPressProps}
        className="relative transition-transform duration-300 ease-[cubic-bezier(0.25,1.4,0.5,1)] group-active:scale-90"
      >
        <div 
          className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden"
          style={{ 
            background: color, 
            clipPath: SQUIRCLE,
            // REMOVED BORDERS. Added pure lift shadow.
            ...ICON_LIFT
          }}
        >
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={title} 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
          ) : null}
          <div 
            className="h-full w-full items-center justify-center text-white text-2xl font-bold"
            style={{ display: iconUrl ? 'none' : 'flex' }}
          >
            {title.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Jiggle mode remove button */}
        {isJiggling && onRemove && (
          <div
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 shadow z-10"
          >
            <X className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-white drop-shadow-md tracking-tight">
          {title}
        </span>
      )}
    </div>
  )
}

// DOCK ICON (No Label)
interface DockIconProps {
  id: string
  title: string
  iconUrl?: string | null
  color?: string
  onClick?: () => void
  onLongPress?: () => void
  isJiggling?: boolean
}

export function DockIcon({
  id,
  title,
  iconUrl,
  color = "#171515",
  onClick,
  onLongPress,
  isJiggling = false,
}: DockIconProps) {
  const longPressProps = useLongPress(
    onLongPress || (() => {}),
    { onCancel: onClick }
  )

  return (
    <div 
      {...longPressProps}
      className="relative transition-transform duration-300 ease-[cubic-bezier(0.25,1.4,0.5,1)] active:scale-75 hover:-translate-y-2 cursor-pointer"
    >
      <div 
        className="flex h-[58px] w-[58px] items-center justify-center shadow-lg overflow-hidden"
        style={{ background: color, clipPath: SQUIRCLE }}
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <div 
          className="h-full w-full items-center justify-center text-white text-xl font-bold"
          style={{ display: iconUrl ? 'none' : 'flex' }}
        >
          {title.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
