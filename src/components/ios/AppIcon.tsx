"use client"

import { useLongPress } from "@/lib/hooks/use-long-press"
import {
    ICON_RADIUS,
    ICON_SIZE,
    LABEL_COLOR,
    LABEL_FONT_SIZE,
    LABEL_WIDTH,
    SYSTEM_FONT,
} from "@/lib/ios-constants"
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

/**
 * Standard iOS App Icon
 * - 60x60px with 13px border-radius (squircle)
 * - ALL icons are MASKED to squircle shape (this is iOS standard)
 * - Label centered below (11px gray text)
 */
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
    { onCancel: onClick }
  )

  return (
    <div className="flex flex-col items-center">
      <div 
        {...longPressProps}
        className="relative cursor-pointer transition-transform duration-150 active:scale-90"
        style={{
          animation: isJiggling ? 'jiggle 0.15s ease-in-out infinite alternate' : 'none'
        }}
      >
        {/* Icon Container - 60x60, 13px radius, CLIPS ALL CONTENT */}
        <div 
          className="relative flex items-center justify-center bg-white"
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: ICON_RADIUS,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            overflow: 'hidden', // CRITICAL: clips image to squircle
          }}
        >
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={title} 
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              style={{
                // Ensure image fills the container and gets clipped
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
          ) : null}
          {/* Fallback - gradient with initial letter */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-400 to-gray-500 text-white text-2xl font-semibold"
            style={{ display: iconUrl ? 'none' : 'flex' }}
          >
            {title.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Delete button in jiggle mode */}
        {isJiggling && onRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500/90 shadow"
          >
            <X className="h-3 w-3 text-white" strokeWidth={2.5} />
          </button>
        )}
      </div>
      
      {/* Label - 11px, centered, gray */}
      {showLabel && (
        <span 
          className="mt-1.5 truncate text-center font-normal select-none"
          style={{ 
            fontFamily: SYSTEM_FONT,
            fontSize: LABEL_FONT_SIZE,
            color: LABEL_COLOR,
            width: LABEL_WIDTH,
          }}
        >
          {title}
        </span>
      )}
    </div>
  )
}

/**
 * Dock Icon - Same as AppIcon but without label
 * IMPORTANT: Uses squircle mask to clip all icon images
 */
interface DockIconProps {
  id: string
  title: string
  iconUrl?: string | null
  onClick?: () => void
  onLongPress?: () => void
  isJiggling?: boolean
}

export function DockIcon({
  id,
  title,
  iconUrl,
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
      className="relative cursor-pointer transition-transform duration-150 active:scale-90"
      style={{
        animation: isJiggling ? 'jiggle 0.15s ease-in-out infinite alternate' : 'none'
      }}
    >
      {/* Icon Container - SQUIRCLE MASK applied to ALL icons */}
      <div 
        className="relative flex items-center justify-center bg-white"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: ICON_RADIUS,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          overflow: 'hidden', // CRITICAL: clips circular icons to squircle
        }}
      >
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={title} 
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            style={{
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-400 to-gray-500 text-white text-xl font-semibold"
          style={{ display: iconUrl ? 'none' : 'flex' }}
        >
          {title.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
