
"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import { ICON_SHADOW } from "@/lib/ios-physics"
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

// COMPONENT: App Icon (The "Sticker" Look) - EXACT REFERENCE
export function AppIcon({
  id,
  title,
  iconUrl,
  color = "bg-gray-800",
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
    <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
      <div 
        {...longPressProps}
        className={`${color} flex h-[62px] w-[62px] items-center justify-center rounded-[14px] transition-transform duration-300 active:scale-90 overflow-hidden relative`}
        style={ICON_SHADOW}
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

        {/* Jiggle mode remove button */}
        {isJiggling && onRemove && (
          <div
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 shadow"
          >
            <X className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-white drop-shadow-md tracking-tight">{title}</span>
      )}
    </div>
  )
}

// COMPONENT: Dock Icon (No Label) - EXACT REFERENCE
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
  color = "bg-gray-800",
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
      className={`${color} flex h-[62px] w-[62px] items-center justify-center rounded-[14px] transition-transform duration-300 active:scale-90 active:brightness-90 overflow-hidden cursor-pointer`}
      style={ICON_SHADOW}
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
  )
}
